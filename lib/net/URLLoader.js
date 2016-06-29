"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var URLLoaderDataFormat_1 = require("../net/URLLoaderDataFormat");
var URLRequestMethod_1 = require("../net/URLRequestMethod");
var URLVariables_1 = require("../net/URLVariables");
var EventDispatcher_1 = require("../events/EventDispatcher");
var URLLoaderEvent_1 = require("../events/URLLoaderEvent");
/**
 * The URLLoader is used to load a single file, as part of a resource.
 *
 * While URLLoader can be used directly, e.g. to create a third-party asset
 * management system, it's recommended to use any of the classes Loader3D, Loader
 * and AssetLibrary instead in most cases.
 *
 * @see Loader
 * @see away.library.AssetLibrary
 */
var URLLoader = (function (_super) {
    __extends(URLLoader, _super);
    /**
     * Creates a new URLLoader object.
     */
    function URLLoader() {
        _super.call(this);
        this._bytesLoaded = 0;
        this._bytesTotal = 0;
        this._dataFormat = URLLoaderDataFormat_1.URLLoaderDataFormat.TEXT;
        this._loadError = false;
    }
    Object.defineProperty(URLLoader.prototype, "url", {
        /**
         *
         */
        get: function () {
            return this._request ? this._request.url : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URLLoader.prototype, "data", {
        /**
         *
         */
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URLLoader.prototype, "dataFormat", {
        get: function () {
            return this._dataFormat;
        },
        /**
         *
         * URLLoaderDataFormat.BINARY
         * URLLoaderDataFormat.TEXT
         * URLLoaderDataFormat.VARIABLES
         *
         * @param format
         */
        set: function (format) {
            this._dataFormat = format;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URLLoader.prototype, "bytesLoaded", {
        /**
         *
         * @returns {number}
         */
        get: function () {
            return this._bytesLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URLLoader.prototype, "bytesTotal", {
        /**
         *
         * @returns {number}
         */
        get: function () {
            return this._bytesTotal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Load a resource from a file.
     *
     * @param request The URLRequest object containing the URL of the object to be loaded.
     */
    URLLoader.prototype.load = function (request) {
        this._request = request;
        this.initXHR();
        if (request.method === URLRequestMethod_1.URLRequestMethod.POST)
            this.postRequest(request);
        else
            this.getRequest(request);
    };
    URLLoader.prototype.isSupported = function () {
        return window != null;
    };
    /**
     *
     */
    URLLoader.prototype.close = function () {
        this._XHR.abort();
        this.disposeXHR();
    };
    /**
     *
     */
    URLLoader.prototype.dispose = function () {
        if (this._XHR)
            this._XHR.abort();
        this.disposeXHR();
    };
    /**
     *
     * @param xhr
     * @param responseType
     */
    URLLoader.prototype.setResponseType = function (xhr, responseType) {
        switch (responseType) {
            case URLLoaderDataFormat_1.URLLoaderDataFormat.ARRAY_BUFFER:
            case URLLoaderDataFormat_1.URLLoaderDataFormat.BLOB:
            case URLLoaderDataFormat_1.URLLoaderDataFormat.TEXT:
                xhr.responseType = responseType;
                break;
            case URLLoaderDataFormat_1.URLLoaderDataFormat.VARIABLES:
                xhr.responseType = URLLoaderDataFormat_1.URLLoaderDataFormat.TEXT;
                break;
            case URLLoaderDataFormat_1.URLLoaderDataFormat.BINARY:
                xhr.responseType = '';
                break;
            default:
        }
    };
    /**
     *
     * @param request {URLRequest}
     */
    URLLoader.prototype.getRequest = function (request) {
        try {
            this._XHR.open(request.method, request.url, request.async);
            this.setResponseType(this._XHR, this._dataFormat);
            this._XHR.send(); // No data to send
        }
        catch (e /* <XMLHttpRequestException> */) {
            this.handleXmlHttpRequestException(e);
        }
    };
    /**
     *
     * @param request {URLRequest}
     */
    URLLoader.prototype.postRequest = function (request) {
        this._loadError = false;
        this._XHR.open(request.method, request.url, request.async);
        if (request.data != null) {
            if (request.data instanceof URLVariables_1.URLVariables) {
                var urlVars = request.data;
                try {
                    this._XHR.responseType = 'text';
                    this._XHR.send(urlVars.formData);
                }
                catch (e /* <XMLHttpRequestException> */) {
                    this.handleXmlHttpRequestException(e);
                }
            }
            else {
                this.setResponseType(this._XHR, this._dataFormat);
                if (request.data)
                    this._XHR.send(request.data); // TODO: Test
                else
                    this._XHR.send(); // no data to send
            }
        }
        else {
            this._XHR.send(); // No data to send
        }
    };
    /**
     *
     * @param error {XMLHttpRequestException}
     */
    URLLoader.prototype.handleXmlHttpRequestException = function (error /* <XMLHttpRequestException> */) {
        switch (error.code) {
            /******************************************************************************************************************************************************************************************************
             *
             *  XMLHttpRequestException { message: "NETWORK_ERR: XMLHttpRequest Exception 101", name: "NETWORK_ERR", code: 101, stack: "Error: A network error occurred in synchronous req…",NETWORK_ERR: 101… }
             *  code: 101 , message: "NETWORK_ERR: XMLHttpRequest Exception 101" ,  name: "NETWORK_ERR"
             *
             ******************************************************************************************************************************************************************************************************/
            case 101:
                // Note: onLoadError event throws IO_ERROR event - this case is already Covered
                break;
        }
    };
    /**
     *
     */
    URLLoader.prototype.initXHR = function () {
        var _this = this;
        if (!this._XHR) {
            this._XHR = new XMLHttpRequest();
            this._XHR.onloadstart = function (event) { return _this.onLoadStart(event); }; // loadstart	        - When the request starts.
            this._XHR.onprogress = function (event) { return _this.onProgress(event); }; // progress	            - While loading and sending data.
            this._XHR.onabort = function (event) { return _this.onAbort(event); }; // abort	            - When the request has been aborted, either by invoking the abort() method or navigating away from the page.
            this._XHR.onerror = function (event) { return _this.onLoadError(event); }; // error	            - When the request has failed.
            this._XHR.onload = function (event) { return _this.onLoadComplete(event); }; // load	                - When the request has successfully completed.
            this._XHR.ontimeout = function (event) { return _this.onTimeOut(event); }; // timeout	            - When the author specified timeout has passed before the request could complete.
            this._XHR.onloadend = function (event) { return _this.onLoadEnd(event); }; // loadend	            - When the request has completed, regardless of whether or not it was successful.
            this._XHR.onreadystatechange = function (event) { return _this.onReadyStateChange(event); }; // onreadystatechange   - When XHR state changes
        }
    };
    /**
     *
     */
    URLLoader.prototype.disposeXHR = function () {
        if (this._XHR !== null) {
            this._XHR.onloadstart = null;
            this._XHR.onprogress = null;
            this._XHR.onabort = null;
            this._XHR.onerror = null;
            this._XHR.onload = null;
            this._XHR.ontimeout = null;
            this._XHR.onloadend = null;
            this._XHR = null;
        }
    };
    /**
     *
     * @param source
     */
    URLLoader.prototype.decodeURLVariables = function (source) {
        var result = new Object();
        source = source.split("+").join(" ");
        var tokens, re = /[?&]?([^=]+)=([^&]*)/g;
        while (tokens = re.exec(source))
            result[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        return result;
    };
    // XMLHttpRequest - Event Handlers
    /**
     * When XHR state changes
     * @param event
     */
    URLLoader.prototype.onReadyStateChange = function (event) {
        if (this._XHR.readyState == 4) {
            this._status = this._XHR.status;
            if (this._status == 404) {
                this._loadError = true;
                this.dispatchEvent(this._loadErrorEvent || (this._loadErrorEvent = new URLLoaderEvent_1.URLLoaderEvent(URLLoaderEvent_1.URLLoaderEvent.LOAD_ERROR, this)));
            }
            this.dispatchEvent(this._statusEvent || (this._statusEvent = new URLLoaderEvent_1.URLLoaderEvent(URLLoaderEvent_1.URLLoaderEvent.HTTP_STATUS, this)));
        }
    };
    /**
     * When the request has completed, regardless of whether or not it was successful.
     * @param event
     */
    URLLoader.prototype.onLoadEnd = function (event) {
        if (this._loadError === true)
            return;
    };
    /**
     * When the author specified timeout has passed before the request could complete.
     * @param event
     */
    URLLoader.prototype.onTimeOut = function (event) {
        //TODO: Timeout not currently implemented ( also not part of AS3 API )
    };
    /**
     * When the request has been aborted, either by invoking the abort() method or navigating away from the page.
     * @param event
     */
    URLLoader.prototype.onAbort = function (event) {
        // TODO: investigate whether this needs to be an IOError
    };
    /**
     * While loading and sending data.
     * @param event
     */
    URLLoader.prototype.onProgress = function (event) {
        this._bytesTotal = event.total;
        this._bytesLoaded = event.loaded;
        this.dispatchEvent(this._progressEvent || (this._progressEvent = new URLLoaderEvent_1.URLLoaderEvent(URLLoaderEvent_1.URLLoaderEvent.LOAD_PROGRESS, this)));
    };
    /**
     * When the request starts.
     * @param event
     */
    URLLoader.prototype.onLoadStart = function (event) {
        this.dispatchEvent(this._loadStartEvent || (this._loadStartEvent = new URLLoaderEvent_1.URLLoaderEvent(URLLoaderEvent_1.URLLoaderEvent.LOAD_START, this)));
    };
    /**
     * When the request has successfully completed.
     * @param event
     */
    URLLoader.prototype.onLoadComplete = function (event) {
        if (this._loadError === true)
            return;
        switch (this._dataFormat) {
            case URLLoaderDataFormat_1.URLLoaderDataFormat.TEXT:
                this._data = this._XHR.responseText;
                break;
            case URLLoaderDataFormat_1.URLLoaderDataFormat.VARIABLES:
                this._data = this.decodeURLVariables(this._XHR.responseText);
                break;
            case URLLoaderDataFormat_1.URLLoaderDataFormat.BLOB:
            case URLLoaderDataFormat_1.URLLoaderDataFormat.ARRAY_BUFFER:
            case URLLoaderDataFormat_1.URLLoaderDataFormat.BINARY:
                this._data = this._XHR.response;
                break;
            default:
                this._data = this._XHR.responseText;
                break;
        }
        this.dispatchEvent(this._loadCompleteEvent || (this._loadCompleteEvent = new URLLoaderEvent_1.URLLoaderEvent(URLLoaderEvent_1.URLLoaderEvent.LOAD_COMPLETE, this)));
    };
    /**
     * When the request has failed. ( due to network issues ).
     * @param event
     */
    URLLoader.prototype.onLoadError = function (event) {
        this._loadError = true;
        this.dispatchEvent(this._loadErrorEvent || (this._loadErrorEvent = new URLLoaderEvent_1.URLLoaderEvent(URLLoaderEvent_1.URLLoaderEvent.LOAD_ERROR, this)));
    };
    return URLLoader;
}(EventDispatcher_1.EventDispatcher));
exports.URLLoader = URLLoader;
