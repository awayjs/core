"use strict";
var BitmapImage2D_1 = require("../image/BitmapImage2D");
var Matrix_1 = require("../geom/Matrix");
var Rectangle_1 = require("../geom/Rectangle");
var MipmapGenerator = (function () {
    function MipmapGenerator() {
    }
    MipmapGenerator._generateMipMaps = function (source, output, alpha) {
        if (alpha === void 0) { alpha = false; }
        var w = source.width;
        var h = source.height;
        var i = 0;
        var mipmap;
        MipmapGenerator._rect.width = w;
        MipmapGenerator._rect.height = h;
        //use (OR) to create non-square texture mipmaps
        while (w >= 1 || h >= 1) {
            mipmap = output[i] = MipmapGenerator._getMipmapHolder(output[i], MipmapGenerator._rect.width, MipmapGenerator._rect.height);
            if (alpha)
                mipmap.fillRect(MipmapGenerator._rect, 0);
            MipmapGenerator._matrix.a = MipmapGenerator._rect.width / source.width;
            MipmapGenerator._matrix.d = MipmapGenerator._rect.height / source.height;
            //todo: add support for NPOT textures
            if (document) {
                mipmap.draw(source, MipmapGenerator._matrix); //TODO: smoothing?
            }
            else {
                if (source.constructor.toString().indexOf("BitmapImage2D") > -1) {
                    //for BitmapImage2D
                    var bitmapImage = source;
                    bitmapImage.lock();
                    mipmap.lock();
                    this.downsampleImage(bitmapImage.getImageData(), mipmap.getImageData());
                    mipmap.unlock();
                    bitmapImage.unlock();
                }
                else if (source.constructor.toString().indexOf("CPUCanvas") > -1) {
                    this.downsampleImage(source.getImageData(), mipmap.getImageData());
                }
                else {
                    //for imageData
                    this.downsampleImage(source, mipmap.getImageData());
                }
            }
            w >>= 1;
            h >>= 1;
            MipmapGenerator._rect.width = w > 1 ? w : 1;
            MipmapGenerator._rect.height = h > 1 ? h : 1;
            i++;
        }
    };
    MipmapGenerator._getMipmapHolder = function (mipMapHolder, newW, newH) {
        if (mipMapHolder) {
            if (mipMapHolder.width == newW && mipMapHolder.height == newH)
                return mipMapHolder;
            MipmapGenerator._freeMipMapHolder(mipMapHolder);
        }
        if (!MipmapGenerator._mipMaps[newW]) {
            MipmapGenerator._mipMaps[newW] = [];
            MipmapGenerator._mipMapUses[newW] = [];
        }
        if (!MipmapGenerator._mipMaps[newW][newH]) {
            mipMapHolder = MipmapGenerator._mipMaps[newW][newH] = new BitmapImage2D_1.BitmapImage2D(newW, newH, true);
            MipmapGenerator._mipMapUses[newW][newH] = 1;
        }
        else {
            MipmapGenerator._mipMapUses[newW][newH] = MipmapGenerator._mipMapUses[newW][newH] + 1;
            mipMapHolder = MipmapGenerator._mipMaps[newW][newH];
        }
        return mipMapHolder;
    };
    MipmapGenerator._freeMipMapHolder = function (mipMapHolder) {
        var holderWidth = mipMapHolder.width;
        var holderHeight = mipMapHolder.height;
        if (--MipmapGenerator._mipMapUses[holderWidth][holderHeight] == 0) {
            MipmapGenerator._mipMaps[holderWidth][holderHeight].dispose();
            MipmapGenerator._mipMaps[holderWidth][holderHeight] = null;
        }
    };
    MipmapGenerator.downsampleImage = function (bitmap, destBitmap) {
        var box = new BoxFilter();
        var xkernel = new PolyphaseKernel(box, bitmap.width, destBitmap.width, 4);
        var ykernel = new PolyphaseKernel(box, bitmap.height, destBitmap.height, 4);
        var tempBitmap = []; //destBitmap.width, bitmap.height
        var scale = 0;
        var iscale = 0;
        var kernelLength = 0;
        var kernelWidth = 0;
        var kernelWindowSize = 0;
        var sumR = 0;
        var sumG = 0;
        var sumB = 0;
        var sumA = 0;
        var center;
        var left;
        var i = 0;
        var j = 0;
        var index = 0;
        for (var y = 0; y < bitmap.height; y++) {
            kernelLength = xkernel.len;
            scale = kernelLength / bitmap.width;
            iscale = 1.0 / scale;
            kernelWidth = xkernel.width;
            kernelWindowSize = xkernel.windowSize;
            for (i = 0; i < kernelLength; i++) {
                center = (0.5 + i) * iscale;
                left = Math.floor(center - kernelWidth);
                sumR = 0;
                sumG = 0;
                sumB = 0;
                sumA = 0;
                for (var j = 0; j < kernelWindowSize; ++j) {
                    index = (y * bitmap.width + (left + j)) * 4;
                    var colorR = bitmap.data[index];
                    var colorG = bitmap.data[index + 1];
                    var colorB = bitmap.data[index + 2];
                    var colorA = bitmap.data[index + 3];
                    var value = xkernel.valueAt(i, j);
                    sumR += value * colorR;
                    sumG += value * colorG;
                    sumB += value * colorB;
                    sumA += value * colorA;
                }
                index = (y * destBitmap.width + i) * 4;
                tempBitmap[index] = sumR;
                tempBitmap[index + 1] = sumG;
                tempBitmap[index + 2] = sumB;
                tempBitmap[index + 3] = sumA;
            }
        }
        for (var x = 0; x < destBitmap.width; x++) {
            kernelLength = ykernel.len;
            scale = kernelLength / bitmap.height;
            iscale = 1.0 / scale;
            kernelWidth = ykernel.width;
            kernelWindowSize = ykernel.windowSize;
            for (i = 0; i < kernelLength; i++) {
                center = (0.5 + i) * iscale;
                left = Math.floor(center - kernelWidth);
                sumR = 0;
                sumG = 0;
                sumB = 0;
                sumA = 0;
                for (j = 0; j < kernelWindowSize; ++j) {
                    index = ((j + left) * destBitmap.width + x) * 4;
                    var colorR = tempBitmap[index];
                    var colorG = tempBitmap[index + 1];
                    var colorB = tempBitmap[index + 2];
                    var colorA = tempBitmap[index + 3];
                    var value = ykernel.valueAt(i, j);
                    sumR += value * colorR;
                    sumG += value * colorG;
                    sumB += value * colorB;
                    sumA += value * colorA;
                }
                index = (i * destBitmap.width + x) * 4;
                destBitmap.data[index] = sumR;
                destBitmap.data[index + 1] = sumG;
                destBitmap.data[index + 2] = sumB;
                destBitmap.data[index + 3] = sumA;
            }
        }
        return destBitmap;
    };
    MipmapGenerator._mipMaps = [];
    MipmapGenerator._mipMapUses = [];
    MipmapGenerator._matrix = new Matrix_1.Matrix();
    MipmapGenerator._rect = new Rectangle_1.Rectangle();
    return MipmapGenerator;
}());
exports.MipmapGenerator = MipmapGenerator;
var PolyphaseKernel = (function () {
    function PolyphaseKernel(f, srcLength, dstLength, samples) {
        var scale = dstLength / srcLength;
        var iscale = 1.0 / scale;
        if (scale > 1) {
            // Upsampling.
            samples = 1;
            scale = 1;
        }
        this.len = dstLength;
        this.width = f.width * iscale;
        this.windowSize = Math.ceil(this.width * 2);
        this.data = [];
        for (var i = 0; i < this.len; i++) {
            var center = (0.5 + i) * iscale;
            var left = Math.floor(center - this.width);
            var total = 0.0;
            for (var j = 0; j < this.windowSize; j++) {
                var sample = f.sampleBox(left + j - center, scale, samples);
                //printf("%f %X\n", sample, *(uint32 *)&sample);
                this.data[i * this.windowSize + j] = sample;
                total += sample;
            }
            // normalize weights.
            for (var j = 0; j < this.windowSize; j++) {
                this.data[i * this.windowSize + j] /= total;
            }
        }
    }
    PolyphaseKernel.prototype.valueAt = function (column, x) {
        return this.data[column * this.windowSize + x];
    };
    return PolyphaseKernel;
}());
exports.PolyphaseKernel = PolyphaseKernel;
var BoxFilter = (function () {
    function BoxFilter() {
    }
    Object.defineProperty(BoxFilter.prototype, "width", {
        get: function () {
            return 0.5;
        },
        enumerable: true,
        configurable: true
    });
    BoxFilter.prototype.sampleBox = function (x, scale, samples) {
        var sum = 0;
        var isamples = 1.0 / samples;
        for (var s = 0; s < samples; s++) {
            var p = (x + (s + 0.5) * isamples) * scale;
            var value = this.evaluate(p);
            sum += value;
        }
        return sum * isamples;
    };
    BoxFilter.prototype.evaluate = function (x) {
        if (Math.abs(x) <= this.width)
            return 1.0;
        else
            return 0.0;
    };
    return BoxFilter;
}());
exports.BoxFilter = BoxFilter;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MipmapGenerator;
