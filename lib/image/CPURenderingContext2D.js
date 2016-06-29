"use strict";
var BitmapImage2D_1 = require("../image/BitmapImage2D");
var Matrix_1 = require("../geom/Matrix");
var Point_1 = require("../geom/Point");
//TODO: implement all methods
var CPURenderingContext2D = (function () {
    function CPURenderingContext2D(cpuCanvas) {
        this.point = new Point_1.Point();
        this.point2 = new Point_1.Point();
        this.cpuCanvas = cpuCanvas;
    }
    CPURenderingContext2D.prototype.restore = function () {
        this.matrix = null;
    };
    CPURenderingContext2D.prototype.setTransform = function (m11, m12, m21, m22, dx, dy) {
        this.matrix = new Matrix_1.Matrix(m11, m12, m21, m22, dx, dy);
    };
    CPURenderingContext2D.prototype.save = function () {
    };
    CPURenderingContext2D.prototype.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
    };
    CPURenderingContext2D.prototype.measureText = function (text) {
        return undefined;
    };
    CPURenderingContext2D.prototype.isPointInPath = function (x, y, fillRule) {
        return undefined;
    };
    CPURenderingContext2D.prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
    };
    CPURenderingContext2D.prototype.putImageData = function (imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
    };
    CPURenderingContext2D.prototype.rotate = function (angle) {
    };
    CPURenderingContext2D.prototype.fillText = function (text, x, y, maxWidth) {
    };
    CPURenderingContext2D.prototype.translate = function (x, y) {
    };
    CPURenderingContext2D.prototype.scale = function (x, y) {
    };
    CPURenderingContext2D.prototype.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
        return undefined;
    };
    CPURenderingContext2D.prototype.ellipse = function (x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
    };
    CPURenderingContext2D.prototype.lineTo = function (x, y) {
    };
    CPURenderingContext2D.prototype.getLineDash = function () {
        return undefined;
    };
    CPURenderingContext2D.prototype.fill = function (fillRule) {
    };
    CPURenderingContext2D.prototype.createImageData = function (imageDataOrSw, sh) {
        return undefined;
    };
    CPURenderingContext2D.prototype.createPattern = function (image, repetition) {
        return undefined;
    };
    CPURenderingContext2D.prototype.closePath = function () {
    };
    CPURenderingContext2D.prototype.rect = function (x, y, w, h) {
    };
    CPURenderingContext2D.prototype.clip = function (fillRule) {
    };
    CPURenderingContext2D.prototype.clearRect = function (x, y, w, h) {
        var imageData = this.cpuCanvas.getImageData();
        for (var i = x; i < x + w; i++) {
            for (var j = y; j < y + h; j++) {
                var index = (i + j * imageData.width) * 4;
                imageData.data[index] = 0;
                imageData.data[index + 1] = 0;
                imageData.data[index + 2] = 0;
                imageData.data[index + 3] = 0;
            }
        }
    };
    CPURenderingContext2D.prototype.moveTo = function (x, y) {
    };
    CPURenderingContext2D.prototype.getImageData = function (sx, sy, sw, sh) {
        //var result:ImageData = new ImageData(sw, sh);
        //var i:number = 0;
        //
        //for (i = 0; i < sw * sh * 4; i += 4) {
        //    result.data[i] = 255;
        //    result.data[i + 1] = 255;
        //    result.data[i + 2] = 255;
        //    result.data[i + 3] = 255;
        //}
        //
        //var imageData:ImageData = this.cpuCanvas.getImageData();
        //for (i = sx; i < sx + sw; i++) {
        //    for (var j:number = sy; j < sy + sh; j++) {
        //        this.copyPixel32(result, i - sx, i - sy, imageData, i, j);
        //    }
        //}
        return this.cpuCanvas.getImageData();
    };
    CPURenderingContext2D.prototype.applyPixel32 = function (target, x, y, color) {
        //todo: blending support
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0 || x >= target.width || y >= target.height || y < 0)
            return;
        var index = (x + y * target.width) * 4;
        //var alpha:number = color[3] / 255;
        target.data[index] += color[0];
        target.data[index + 1] += color[1];
        target.data[index + 2] += color[2];
        target.data[index + 3] += color[3];
        //target.data[index] = color[0];
        //target.data[index + 1] = color[1];
        //target.data[index + 2] = color[2];
        //target.data[index + 3] = color[3];
        target.data[index] = target.data[index] & 0xFF;
        target.data[index + 1] = target.data[index + 1] & 0xFF;
        target.data[index + 2] = target.data[index + 2] & 0xFF;
        target.data[index + 3] = target.data[index + 3] & 0xFF;
    };
    CPURenderingContext2D.prototype.copyPixel32 = function (target, x, y, source, fromX, fromY) {
        x = Math.floor(x);
        y = Math.floor(y);
        fromX = Math.floor(fromX);
        fromY = Math.floor(fromY);
        if (x < 0 || x >= target.width || y >= target.height || y < 0)
            return;
        if (fromX < 0 || fromX >= source.width || fromY >= source.height || fromY < 0)
            return;
        var index = (x + y * target.width) * 4;
        var fromIndex = (fromX + fromY * source.width) * 4;
        target.data[index] = source.data[fromIndex];
        target.data[index + 1] = source.data[fromIndex + 1];
        target.data[index + 2] = source.data[fromIndex + 2];
        target.data[index + 3] = source.data[fromIndex + 3];
    };
    CPURenderingContext2D.prototype.fillRect = function (x, y, w, h) {
        if (this.fillStyle) {
            if (this.parsedFillStyle != this.fillStyle) {
                var colorStrings = this.fillStyle.substring(5, this.fillStyle.lastIndexOf(")")).split(",");
                this.parsedA = parseFloat(colorStrings[3]) * 255;
                this.parsedR = parseInt(colorStrings[0]);
                this.parsedG = parseInt(colorStrings[1]);
                this.parsedB = parseInt(colorStrings[2]);
                this.parsedFillStyle = this.fillStyle;
            }
            var imageData = this.cpuCanvas.getImageData();
            for (var i = x; i < x + w; i++) {
                for (var j = y; j < y + h; j++) {
                    var index = (i + j * imageData.width) * 4;
                    imageData.data[index] = this.parsedR;
                    imageData.data[index + 1] = this.parsedG;
                    imageData.data[index + 2] = this.parsedB;
                    imageData.data[index + 3] = this.parsedA;
                }
            }
        }
    };
    CPURenderingContext2D.prototype.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
    };
    CPURenderingContext2D.prototype.drawImage = function (image, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, canvasImageWidth, canvasImageHeight) {
        var b = image;
        if (image.constructor.toString().indexOf("BitmapImage2D") > -1) {
            var bitmap = b;
            bitmap.lock();
            this.drawBitmap(bitmap, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, canvasImageWidth, canvasImageHeight);
            bitmap.unlock();
        }
        else if (image.constructor.toString().indexOf("HTMLImage") > -1) {
            var htmlImage = image;
            var htmlCanvas = document.createElement("canvas");
            htmlCanvas.width = htmlImage.width;
            htmlCanvas.height = htmlImage.height;
            var htmlContext = htmlCanvas.getContext("2d");
            htmlContext.drawImage(htmlImage, 0, 0);
            var htmlImageData = htmlContext.getImageData(0, 0, htmlImage.width, htmlImage.height);
            var resultBitmap = new BitmapImage2D_1.BitmapImage2D(htmlImage.width, htmlImage.height, true, 0, false);
            resultBitmap.getImageData().data = htmlImageData.data;
            var passBitmap = resultBitmap;
            this.drawImage(passBitmap, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, canvasImageWidth, canvasImageHeight);
        }
        else if (image.constructor.toString().indexOf("CPUCanvas") > -1) {
            //
            var canvas = b;
            this.drawBitmap(canvas, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, canvasImageWidth, canvasImageHeight);
        }
    };
    CPURenderingContext2D.prototype.drawBitmap = function (bitmap, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, canvasImageWidth, canvasImageHeight) {
        if (!width || width == 0) {
            width = bitmap.width;
            height = bitmap.height;
        }
        if (!canvasOffsetX || canvasOffsetX == 0) {
            canvasOffsetX = 0;
            canvasOffsetY = 0;
        }
        if (!canvasImageWidth || canvasImageWidth == 0 || this.matrix) {
            canvasImageWidth = width;
            canvasImageHeight = height;
        }
        //console.log("CPURenderingContext2D:drawBitmap(width: " + width + " height: " + height + " canvasImageWidth: " + canvasImageWidth + " canvasImageHeight: " + canvasImageHeight);
        var sourceData = bitmap.getImageData();
        var canvasImageData = this.cpuCanvas.getImageData();
        if (this.matrix || (canvasImageWidth != width || canvasImageHeight != height)) {
            var matrix = this.matrix;
            if (!matrix) {
                matrix = new Matrix_1.Matrix();
                matrix.scale(canvasImageWidth / width, canvasImageHeight / height);
            }
            var scaleX = Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b);
            var scaleY = Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d);
            canvasImageWidth = width * scaleX;
            canvasImageHeight = height * scaleY;
            matrix.tx += canvasOffsetX;
            matrix.ty += canvasOffsetY;
            canvasOffsetX = Math.floor(matrix.tx);
            canvasOffsetY = Math.floor(matrix.ty);
            matrix.invert();
            if (scaleX >= 1 || scaleY >= 1) {
                var p = new Point_1.Point();
                for (var i = canvasOffsetX; i < canvasOffsetX + canvasImageWidth; i++) {
                    for (var j = canvasOffsetY; j < canvasOffsetY + canvasImageHeight; j++) {
                        p.x = i;
                        p.y = j;
                        p = matrix.transformPoint(p);
                        var color = CPURenderingContext2D.sampleBilinear(p.x, p.y, sourceData);
                        this.applyPixel32(canvasImageData, i, j, color);
                    }
                }
            }
            else {
                //decimate
                var p1 = this.point;
                var p2 = this.point2;
                for (var i = canvasOffsetX; i < canvasOffsetX + canvasImageWidth; i++) {
                    for (var j = canvasOffsetY; j < canvasOffsetY + canvasImageHeight; j++) {
                        p1.x = i;
                        p1.y = j;
                        p1 = matrix.transformPoint(p1);
                        p2.x = i + 1;
                        p2.y = j + 1;
                        p2 = matrix.transformPoint(p2);
                        var color = CPURenderingContext2D.sampleBox(p1.x + offsetX, p1.y + offsetY, p2.x + offsetX, p2.y + offsetY, sourceData);
                        this.applyPixel32(canvasImageData, i, j, color);
                    }
                }
            }
            matrix.invert();
        }
        else {
            for (var i = canvasOffsetX; i < canvasOffsetX + canvasImageWidth; i++) {
                for (var j = canvasOffsetY; j < canvasOffsetY + canvasImageHeight; j++) {
                    var color = CPURenderingContext2D.sample(i - canvasOffsetX + offsetX, j - canvasOffsetY + offsetY, sourceData);
                    this.applyPixel32(canvasImageData, i, j, color);
                }
            }
        }
    };
    CPURenderingContext2D.prototype.transform = function (m11, m12, m21, m22, dx, dy) {
    };
    CPURenderingContext2D.prototype.stroke = function () {
    };
    CPURenderingContext2D.prototype.strokeRect = function (x, y, w, h) {
    };
    CPURenderingContext2D.prototype.setLineDash = function (segments) {
    };
    CPURenderingContext2D.prototype.strokeText = function (text, x, y, maxWidth) {
    };
    CPURenderingContext2D.prototype.beginPath = function () {
    };
    CPURenderingContext2D.prototype.arcTo = function (x1, y1, x2, y2, radius) {
    };
    CPURenderingContext2D.prototype.createLinearGradient = function (x0, y0, x1, y1) {
        return undefined;
    };
    CPURenderingContext2D.sampleBilinear = function (u, v, texture, texelSizeX, texelSizeY) {
        if (texelSizeX === void 0) { texelSizeX = 1; }
        if (texelSizeY === void 0) { texelSizeY = 1; }
        var color00 = CPURenderingContext2D.sample(u, v, texture);
        var color10 = CPURenderingContext2D.sample(u + texelSizeX, v, texture);
        var color01 = CPURenderingContext2D.sample(u, v + texelSizeY, texture);
        var color11 = CPURenderingContext2D.sample(u + texelSizeX, v + texelSizeY, texture);
        var a = u;
        a = a - Math.floor(a);
        var interColor0 = CPURenderingContext2D.interpolateColor(color00, color10, a);
        var interColor1 = CPURenderingContext2D.interpolateColor(color01, color11, a);
        var b = v;
        b = b - Math.floor(b);
        return CPURenderingContext2D.interpolateColor(interColor0, interColor1, b);
    };
    CPURenderingContext2D.sample = function (u, v, imageData) {
        u = Math.floor(u);
        v = Math.floor(v);
        var result = [0, 0, 0, 0];
        if (u < 0 || u >= imageData.width || v < 0 || v >= imageData.height) {
            return result;
        }
        var index = (u + v * imageData.width) * 4;
        result[0] = imageData.data[index];
        result[1] = imageData.data[index + 1];
        result[2] = imageData.data[index + 2];
        result[3] = imageData.data[index + 3];
        return result;
    };
    CPURenderingContext2D.sampleBox = function (x0, y0, x1, y1, texture) {
        var area = 0; // -- total area accumulated in pixels
        var result = [0, 0, 0, 0];
        var x;
        var y;
        var xsize;
        var ysize;
        var fromY = Math.floor(y0);
        var toY = Math.ceil(y1);
        fromY = Math.max(Math.min(fromY, texture.height - 1), 0);
        toY = Math.max(Math.min(toY, texture.height - 1), 0);
        for (y = fromY; y < toY; y++) {
            ysize = 1;
            if (y < y0) {
                ysize = ysize * (1.0 - (y0 - y));
            }
            if (y > y1) {
                ysize = ysize * (1.0 - (y - y1));
            }
            var fromX = Math.floor(x0);
            var toX = Math.ceil(x1);
            fromX = Math.max(Math.min(fromX, texture.width - 1), 0);
            toX = Math.max(Math.min(toX, texture.width - 1), 0);
            for (x = fromX; x < toX; x++) {
                xsize = ysize;
                var color = CPURenderingContext2D.sample(x, y, texture);
                if (x < x0) {
                    xsize = xsize * (1.0 - (x0 - x));
                }
                if (x > x1) {
                    xsize = xsize * (1.0 - (x - x1));
                }
                result[0] += color[0] * xsize;
                result[1] += color[1] * xsize;
                result[2] += color[2] * xsize;
                result[3] += color[3] * xsize;
                area = area + xsize;
            }
        }
        result[0] /= area;
        result[1] /= area;
        result[2] /= area;
        result[3] /= area;
        result[0] = result[0] & 0xFF;
        result[1] = result[1] & 0xFF;
        result[2] = result[2] & 0xFF;
        result[3] = result[3] & 0xFF;
        return result;
    };
    CPURenderingContext2D.interpolateColor = function (source, target, a) {
        var result = [];
        result[0] = source[0] + (target[0] - source[0]) * a;
        result[1] = source[1] + (target[1] - source[1]) * a;
        result[2] = source[2] + (target[2] - source[2]) * a;
        result[3] = source[3] + (target[3] - source[3]) * a;
        return result;
    };
    return CPURenderingContext2D;
}());
exports.CPURenderingContext2D = CPURenderingContext2D;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CPURenderingContext2D;
