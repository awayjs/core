"use strict";
var URLLoader_1 = require("awayjs-core/lib/net/URLLoader");
var URLLoaderDataFormat_1 = require("awayjs-core/lib/net/URLLoaderDataFormat");
var URLRequest_1 = require("awayjs-core/lib/net/URLRequest");
var URLRequestMethod_1 = require("awayjs-core/lib/net/URLRequestMethod");
var URLVariables_1 = require("awayjs-core/lib/net/URLVariables");
var URLLoaderEvent_1 = require("awayjs-core/lib/events/URLLoaderEvent");
/**
 *
 */
var URLLoaderTests = (function () {
    function URLLoaderTests() {
        var _this = this;
        console.log('start');
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        // POST URL Variables to PHP script
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        this.urlLoaderPostURLVars = new URLLoader_1.default();
        this.urlLoaderPostURLVars.dataFormat = URLLoaderDataFormat_1.default.VARIABLES;
        var urlStr = 'fname=karim&lname=' + Math.floor(Math.random() * 100);
        var urlVars = new URLVariables_1.default(urlStr);
        var req = new URLRequest_1.default('assets/saveData.php');
        req.method = URLRequestMethod_1.default.POST;
        req.data = urlVars;
        this.urlLoaderPostURLVars.addEventListener(URLLoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.postURLTestComplete(event); });
        this.urlLoaderPostURLVars.addEventListener(URLLoaderEvent_1.default.LOAD_ERROR, function (event) { return _this.ioError(event); });
        this.urlLoaderPostURLVars.load(req);
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        // GET CSV File
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        var csrReq = new URLRequest_1.default('assets/airports.csv');
        this.urlLoaderGetCSV = new URLLoader_1.default();
        this.urlLoaderGetCSV.dataFormat = URLLoaderDataFormat_1.default.TEXT;
        this.urlLoaderGetCSV.addEventListener(URLLoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.getCsvComplete(event); });
        this.urlLoaderGetCSV.addEventListener(URLLoaderEvent_1.default.LOAD_START, function (event) { return _this.getCsvOpen(event); });
        this.urlLoaderGetCSV.addEventListener(URLLoaderEvent_1.default.LOAD_ERROR, function (event) { return _this.ioError(event); });
        this.urlLoaderGetCSV.load(csrReq);
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        // ERROR test - load a non-existing object
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        var errorReq = new URLRequest_1.default('assets/generatingError');
        this.urlLoaderErrorTest = new URLLoader_1.default();
        this.urlLoaderErrorTest.dataFormat = URLLoaderDataFormat_1.default.TEXT;
        this.urlLoaderErrorTest.addEventListener(URLLoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.errorComplete(event); });
        this.urlLoaderErrorTest.addEventListener(URLLoaderEvent_1.default.LOAD_ERROR, function (event) { return _this.ioError(event); });
        this.urlLoaderErrorTest.addEventListener(URLLoaderEvent_1.default.HTTP_STATUS, function (event) { return _this.httpStatusChange(event); });
        this.urlLoaderErrorTest.load(errorReq);
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        // GET URL Vars - get URL variables
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        var csrReq = new URLRequest_1.default('assets/getUrlVars.php');
        this.urlLoaderGetURLVars = new URLLoader_1.default();
        this.urlLoaderGetURLVars.dataFormat = URLLoaderDataFormat_1.default.VARIABLES;
        this.urlLoaderGetURLVars.addEventListener(URLLoaderEvent_1.default.LOAD_ERROR, function (event) { return _this.ioError(event); });
        this.urlLoaderGetURLVars.addEventListener(URLLoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.getURLVarsComplete(event); });
        this.urlLoaderGetURLVars.load(csrReq);
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        // LOAD Binary file
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        var binReq = new URLRequest_1.default('assets/suzanne.awd');
        this.urlLoaderBinary = new URLLoader_1.default();
        this.urlLoaderBinary.dataFormat = URLLoaderDataFormat_1.default.BINARY;
        this.urlLoaderBinary.addEventListener(URLLoaderEvent_1.default.LOAD_ERROR, function (event) { return _this.ioError(event); });
        this.urlLoaderBinary.addEventListener(URLLoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.binFileLoaded(event); });
        this.urlLoaderBinary.load(binReq);
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        // LOAD Blob file
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        var blobReq = new URLRequest_1.default('assets/2.png');
        this.urlLoaderBlob = new URLLoader_1.default();
        this.urlLoaderBlob.dataFormat = URLLoaderDataFormat_1.default.BLOB;
        this.urlLoaderBlob.addEventListener(URLLoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.blobFileLoaded(event); });
        this.urlLoaderBlob.load(blobReq);
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        // ARRAY_BUFFER Test
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        var arrBReq = new URLRequest_1.default('assets/1.jpg');
        this.urlLoaderArrb = new URLLoader_1.default();
        this.urlLoaderArrb.dataFormat = URLLoaderDataFormat_1.default.ARRAY_BUFFER;
        this.urlLoaderArrb.addEventListener(URLLoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.arrayBufferLoaded(event); });
        this.urlLoaderArrb.load(arrBReq);
    }
    URLLoaderTests.prototype.arrayBufferLoaded = function (event) {
        var arrayBuffer = this.urlLoaderArrb.data;
        var byteArray = new Uint8Array(arrayBuffer);
        console.log('URLLoaderTests.arrayBufferLoaded', byteArray[1]);
        for (var i = 0; i < byteArray.byteLength; i++) {
        }
    };
    URLLoaderTests.prototype.blobFileLoaded = function (event) {
        var blob = new Blob([this.urlLoaderBlob.data], { type: 'image/png' });
        var img = document.createElement('img');
        img.src = this.createObjectURL(blob); //window['URL']['createObjectURL'](blob);
        img.onload = function (e) {
            window['URL']['revokeObjectURL'](img.src); // Clean up after yourself.
        };
        console.log('URLLoaderTests.blobFileLoaded', blob);
        document.body.appendChild(img);
    };
    URLLoaderTests.prototype.createObjectURL = function (fileBlob) {
        // For some reason TypeScript has "window.URL.createObjectURL" in it's dictionary -
        // but window.URL causes an error
        // cannot make my own .d.ts file either ( results in duplicate definition error )
        // This HACK gets it to work: window['URL']['createObjectURL']
        if (window['URL']) {
            if (window['URL']['createObjectURL']) {
                return window['URL']['createObjectURL'](fileBlob);
            }
        }
        else {
            if (window['webkitURL']) {
                return window['webkitURL']['createObjectURL'](fileBlob);
            }
        }
        return null;
    };
    URLLoaderTests.prototype.binFileLoaded = function (event) {
        var loader = event.target;
        console.log('URLLoaderTests.binFileLoaded', loader.data.length);
    };
    URLLoaderTests.prototype.getURLVarsComplete = function (event) {
        var loader = event.target;
        console.log('URLLoaderTests.getURLVarsComplete', loader.data);
    };
    URLLoaderTests.prototype.httpStatusChange = function (event) {
        console.log('URLLoaderTests.httpStatusChange', event.target.status);
    };
    URLLoaderTests.prototype.ioError = function (event) {
        var loader = event.target;
        console.log('URLLoaderTests.ioError', loader.url);
    };
    URLLoaderTests.prototype.errorComplete = function (event) {
        var loader = event.target;
        console.log('Loader.errorComplete'); //, loader.data );
    };
    URLLoaderTests.prototype.postURLTestComplete = function (event) {
        var loader = event.target;
        console.log('URLLoaderTests.postURLTestComplete', loader.data);
    };
    URLLoaderTests.prototype.getCsvComplete = function (event) {
        var loader = event.target;
        console.log('URLLoaderTests.getCsvComplete'); //, loader.data );
    };
    URLLoaderTests.prototype.getCsvOpen = function (event) {
        var loader = event.target;
        console.log('URLLoaderTests.getCsvStart');
    };
    return URLLoaderTests;
}());
