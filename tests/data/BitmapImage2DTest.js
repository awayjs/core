"use strict";
var BitmapImage2D_1 = require("awayjs-core/lib/image/BitmapImage2D");
var Matrix_1 = require("awayjs-core/lib/geom/Matrix");
var Rectangle_1 = require("awayjs-core/lib/geom/Rectangle");
var URLLoader_1 = require("awayjs-core/lib/net/URLLoader");
var URLLoaderDataFormat_1 = require("awayjs-core/lib/net/URLLoaderDataFormat");
var URLRequest_1 = require("awayjs-core/lib/net/URLRequest");
var URLLoaderEvent_1 = require("awayjs-core/lib/events/URLLoaderEvent");
var ParserUtils_1 = require("awayjs-core/lib/parsers/ParserUtils");
var ColorUtils_1 = require("awayjs-core/lib/utils/ColorUtils");
var BitmapImage2DTest = (function () {
    function BitmapImage2DTest() {
        var _this = this;
        var transparent = true;
        var initcolour = 0xffffffff;
        //---------------------------------------
        // Load a PNG
        this.urlRequest = new URLRequest_1.default('assets/256x256.png');
        this.urlLoader = new URLLoader_1.default();
        this.urlLoader.dataFormat = URLLoaderDataFormat_1.default.BLOB;
        this.urlLoader.load(this.urlRequest);
        this.urlLoader.addEventListener(URLLoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.imgLoaded(event); });
        this.urlLoader.addEventListener(URLLoaderEvent_1.default.LOAD_ERROR, function (event) { return _this.imgLoadedError(event); });
        //---------------------------------------
        // BitmapImage2D Object - 1
        this.bitmapData = new BitmapImage2D_1.default(256, 256, transparent, initcolour);
        document.body.appendChild(this.bitmapData.getCanvas());
        //---------------------------------------
        // BitmapImage2D Object - 2
        this.bitmapDataB = new BitmapImage2D_1.default(256, 256, transparent, initcolour);
        this.bitmapDataB.getCanvas().style.position = 'absolute';
        this.bitmapDataB.getCanvas().style.left = '540px';
        document.body.appendChild(this.bitmapDataB.getCanvas());
        //---------------------------------------
        // BitmapImage2D - setPixel test
        console['time']("bitmapdata"); // start setPixel operation benchmark ( TypeScript does not support console.time - so hacking it in ) .
        this.bitmapDataB.lock();
        for (var i = 0; i < 10000; i++) {
            var x = Math.random() * this.bitmapDataB.width | 0; // |0 to truncate to Int32
            var y = Math.random() * this.bitmapDataB.height | 0;
            this.bitmapDataB.setPixel(x, y, Math.random() * 0xffFFFFFF); // 255 opaque
        }
        this.bitmapDataB.unlock();
        console['timeEnd']("bitmapdata"); // benchmark the setPixel operation
        document.onmousedown = function (event) { return _this.onMouseDown(event); };
    }
    BitmapImage2DTest.prototype.onMouseDown = function (event) {
        if (this.bitmapData.width === 512) {
            if (this.image.complete) {
                this.bitmapDataB.lock(); // Lock bitmap - speeds up setPixelOperations
                //---------------------------------------
                // Resize BitmapImage2D
                this.bitmapData.width = 256;
                this.bitmapData.height = 256;
                //---------------------------------------
                // copy loaded image to first BitmapImage2D
                var rect = new Rectangle_1.default(0, 0, this.image.width, this.image.height);
                this.bitmapData.draw(this.image);
                //---------------------------------------
                // copy image into second bitmap data ( and scale it up 2X )
                rect.width = rect.width * 2;
                rect.height = rect.height * 2;
                this.bitmapDataB.copyPixels(this.bitmapData, this.bitmapData.rect, rect);
                //---------------------------------------
                // draw random pixels
                for (var d = 0; d < 1000; d++) {
                    var x = Math.random() * this.bitmapDataB.width | 0; // |0 to truncate to Int32
                    var y = Math.random() * this.bitmapDataB.height | 0;
                    this.bitmapDataB.setPixel(x, y, Math.random() * 0xFFFFFFFF); // 255 opaque
                }
                this.bitmapDataB.unlock(); // Unlock bitmapdata
            }
            else {
                //---------------------------------------
                // image is not loaded - fill bitmapdata with red
                this.bitmapData.width = 256;
                this.bitmapData.height = 256;
                this.bitmapData.fillRect(this.bitmapData.rect, 0xffff0000);
            }
        }
        else {
            //---------------------------------------
            // resize bitmapdata;
            this.bitmapData.lock();
            this.bitmapData.width = 512;
            this.bitmapData.height = 512;
            this.bitmapData.fillRect(this.bitmapData.rect, 0xffff0000); // fill it RED
            for (var d = 0; d < 1000; d++) {
                var x = Math.random() * this.bitmapData.width | 0; // |0 to truncate to Int32
                var y = Math.random() * this.bitmapData.height | 0;
                this.bitmapData.setPixel(x, y, Math.random() * 0xFFFFFFFF);
            }
            this.bitmapData.unlock();
            //---------------------------------------
            // copy bitmapdata
            var targetRect = this.bitmapDataB.rect.clone();
            targetRect.width = targetRect.width / 2;
            targetRect.height = targetRect.height / 2;
            this.bitmapDataB.copyPixels(this.bitmapData, this.bitmapDataB.rect, targetRect); // copy first bitmapdata object into the second one
        }
        var m = new Matrix_1.default(.5, .08, .08, .5, this.image.width / 2, this.image.height / 2);
        this.bitmapData.draw(this.bitmapData, m);
        this.bitmapData.setPixel32(0, 0, 0xccff0000);
        this.bitmapData.setPixel32(1, 0, 0xcc00ff00);
        this.bitmapData.setPixel32(2, 0, 0xcc0000ff);
        this.bitmapDataB.draw(this.bitmapData, m);
        console.log('GetPixel 0,0: ', ColorUtils_1.default.ARGBToHexString(ColorUtils_1.default.float32ColorToARGB(this.bitmapData.getPixel(0, 0))));
        console.log('GetPixel 1,0: ', ColorUtils_1.default.ARGBToHexString(ColorUtils_1.default.float32ColorToARGB(this.bitmapData.getPixel(1, 0))));
        console.log('GetPixel 2,0: ', ColorUtils_1.default.ARGBToHexString(ColorUtils_1.default.float32ColorToARGB(this.bitmapData.getPixel(2, 0))));
    };
    BitmapImage2DTest.prototype.imgLoadedError = function (event) {
        console.log('error');
    };
    BitmapImage2DTest.prototype.imgLoaded = function (event) {
        var _this = this;
        var loader = event.target;
        this.image = ParserUtils_1.default.blobToImage(loader.data);
        this.image.onload = function (event) { return _this.onImageLoad(event); };
    };
    BitmapImage2DTest.prototype.onImageLoad = function (event) {
        this.bitmapData.draw(this.image, null, null, null, new Rectangle_1.default(0, 0, this.image.width / 2, this.image.height / 2));
        this.bitmapData.draw(this.bitmapData, new Matrix_1.default(.5, .08, .08, .5, this.image.width / 2, this.image.height / 2));
    };
    return BitmapImage2DTest;
}());
