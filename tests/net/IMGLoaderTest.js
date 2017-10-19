"use strict";
var URLLoader_1 = require("awayjs-core/lib/net/URLLoader");
var URLLoaderDataFormat_1 = require("awayjs-core/lib/net/URLLoaderDataFormat");
var URLRequest_1 = require("awayjs-core/lib/net/URLRequest");
var URLLoaderEvent_1 = require("awayjs-core/lib/events/URLLoaderEvent");
var ParserUtils_1 = require("awayjs-core/lib/parsers/ParserUtils");
var IMGLoaderTest = (function () {
    function IMGLoaderTest() {
        //-----------------------------------------------------------------------------------------------
        // load a png
        //-----------------------------------------------------------------------------------------------
        var _this = this;
        this.pngLoader = new URLLoader_1.default();
        this.pngLoader.dataFormat = URLLoaderDataFormat_1.default.BLOB;
        this.pngLoader.addEventListener(URLLoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.pngLoaderComplete(event); });
        this.pngLoader.addEventListener(URLLoaderEvent_1.default.LOAD_ERROR, function (event) { return _this.ioError(event); });
        this.pngLoader.load(new URLRequest_1.default('assets/2.png'));
        //-----------------------------------------------------------------------------------------------
        // Load a jpg
        //-----------------------------------------------------------------------------------------------
        this.jpgLoader = new URLLoader_1.default();
        this.jpgLoader.dataFormat = URLLoaderDataFormat_1.default.BLOB;
        this.jpgLoader.addEventListener(URLLoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.jpgLoaderComplete(event); });
        this.jpgLoader.addEventListener(URLLoaderEvent_1.default.LOAD_ERROR, function (event) { return _this.ioError(event); });
        this.jpgLoader.load(new URLRequest_1.default('assets/1.jpg'));
        //-----------------------------------------------------------------------------------------------
        // Load file of wrong format
        //-----------------------------------------------------------------------------------------------
        this.noAnImageLoader = new URLLoader_1.default();
        this.noAnImageLoader.dataFormat = URLLoaderDataFormat_1.default.BLOB;
        this.noAnImageLoader.addEventListener(URLLoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.noAnImageLoaderComplete(event); });
        this.noAnImageLoader.addEventListener(URLLoaderEvent_1.default.LOAD_ERROR, function (event) { return _this.ioError(event); });
        this.noAnImageLoader.load(new URLRequest_1.default('assets/data.txt'));
        //-----------------------------------------------------------------------------------------------
        // Load image that does not exist
        //-----------------------------------------------------------------------------------------------
        this.wrongURLLoader = new URLLoader_1.default();
        this.wrongURLLoader.dataFormat = URLLoaderDataFormat_1.default.BLOB;
        this.wrongURLLoader.addEventListener(URLLoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.wrongURLLoaderComplete(event); });
        this.wrongURLLoader.addEventListener(URLLoaderEvent_1.default.LOAD_ERROR, function (event) { return _this.ioError(event); });
        this.wrongURLLoader.load(new URLRequest_1.default('assets/iDontExist.png'));
    }
    IMGLoaderTest.prototype.pngLoaderComplete = function (e) {
        this.logSuccessfullLoad(e);
        var imgLoader = e.target;
        document.body.appendChild(ParserUtils_1.default.blobToImage(imgLoader.data));
    };
    IMGLoaderTest.prototype.jpgLoaderComplete = function (e) {
        this.logSuccessfullLoad(e);
        var imgLoader = e.target;
        document.body.appendChild(ParserUtils_1.default.blobToImage(imgLoader.data));
    };
    IMGLoaderTest.prototype.noAnImageLoaderComplete = function (e) {
        this.logSuccessfullLoad(e);
    };
    IMGLoaderTest.prototype.wrongURLLoaderComplete = function (e) {
        this.logSuccessfullLoad(e);
    };
    IMGLoaderTest.prototype.logSuccessfullLoad = function (event) {
        var imgLoader = event.target;
        console.log('IMG.Event.Complete', imgLoader.url);
    };
    IMGLoaderTest.prototype.ioError = function (event) {
        var imgLoader = event.target;
        console.log('ioError', imgLoader.url);
    };
    IMGLoaderTest.prototype.abortError = function (event) {
        var imgLoader = event.target;
        console.log('abortError', imgLoader.url);
    };
    return IMGLoaderTest;
}());
