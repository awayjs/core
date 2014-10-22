var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var URLLoaderDataFormat = require("awayjs-core/lib/core/net/URLLoaderDataFormat");

var URLRequestMethod = require("awayjs-core/lib/core/net/URLRequestMethod");
var URLVariables = require("awayjs-core/lib/core/net/URLVariables");
var AwayEvent = require("awayjs-core/lib/events/Event");
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var HTTPStatusEvent = require("awayjs-core/lib/events/HTTPStatusEvent");
var IOErrorEvent = require("awayjs-core/lib/events/IOErrorEvent");
var AwayProgressEvent = require("awayjs-core/lib/events/ProgressEvent");

/**
* The URLLoader is used to load a single file, as part of a resource.
*
* While URLLoader can be used directly, e.g. to create a third-party asset
* management system, it's recommended to use any of the classes Loader3D, AssetLoader
* and AssetLibrary instead in most cases.
*
* @see AssetLoader
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
        this._dataFormat = URLLoaderDataFormat.TEXT;
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

        if (request.method === URLRequestMethod.POST)
            this.postRequest(request);
        else
            this.getRequest(request);
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

        this._data = null;
        this._dataFormat = null;
        this._bytesLoaded = null;
        this._bytesTotal = null;
    };

    /**
    *
    * @param xhr
    * @param responseType
    */
    URLLoader.prototype.setResponseType = function (xhr, responseType) {
        switch (responseType) {
            case URLLoaderDataFormat.ARRAY_BUFFER:
            case URLLoaderDataFormat.BLOB:
            case URLLoaderDataFormat.TEXT:
                xhr.responseType = responseType;
                break;

            case URLLoaderDataFormat.VARIABLES:
                xhr.responseType = URLLoaderDataFormat.TEXT;
                break;

            case URLLoaderDataFormat.BINARY:
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
        try  {
            this._XHR.open(request.method, request.url, request.async);
            this.setResponseType(this._XHR, this._dataFormat);
            this._XHR.send(); // No data to send
        } catch (e) {
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
            if (request.data instanceof URLVariables) {
                var urlVars = request.data;

                try  {
                    this._XHR.responseType = 'text';
                    this._XHR.send(urlVars.formData);
                } catch (e) {
                    this.handleXmlHttpRequestException(e);
                }
            } else {
                this.setResponseType(this._XHR, this._dataFormat);

                if (request.data)
                    this._XHR.send(request.data); // TODO: Test
                else
                    this._XHR.send(); // no data to send
            }
        } else {
            this._XHR.send(); // No data to send
        }
    };

    /**
    *
    * @param error {XMLHttpRequestException}
    */
    URLLoader.prototype.handleXmlHttpRequestException = function (error /* <XMLHttpRequestException> */ ) {
        switch (error.code) {
            case 101:
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

            this._XHR.onloadstart = function (event) {
                return _this.onLoadStart(event);
            }; // loadstart	        - When the request starts.
            this._XHR.onprogress = function (event) {
                return _this.onProgress(event);
            }; // progress	            - While loading and sending data.
            this._XHR.onabort = function (event) {
                return _this.onAbort(event);
            }; // abort	            - When the request has been aborted, either by invoking the abort() method or navigating away from the page.
            this._XHR.onerror = function (event) {
                return _this.onLoadError(event);
            }; // error	            - When the request has failed.
            this._XHR.onload = function (event) {
                return _this.onLoadComplete(event);
            }; // load	                - When the request has successfully completed.
            this._XHR.ontimeout = function (event) {
                return _this.onTimeOut(event);
            }; // timeout	            - When the author specified timeout has passed before the request could complete.
            this._XHR.onloadend = function (event) {
                return _this.onLoadEnd(event);
            }; // loadend	            - When the request has completed, regardless of whether or not it was successful.
            this._XHR.onreadystatechange = function (event) {
                return _this.onReadyStateChange(event);
            }; // onreadystatechange   - When XHR state changes
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
            if (this._XHR.status == 404) {
                this._loadError = true;

                if (!this._loadErrorEvent)
                    this._loadErrorEvent = new IOErrorEvent(IOErrorEvent.IO_ERROR);

                this.dispatchEvent(this._loadErrorEvent);
            }

            this.dispatchEvent(new HTTPStatusEvent(HTTPStatusEvent.HTTP_STATUS, this._XHR.status));
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
        if (!this._progressEvent)
            this._progressEvent = new AwayProgressEvent(AwayProgressEvent.PROGRESS);

        this._progressEvent.bytesTotal = event.total;
        this._progressEvent.bytesLoaded = event.loaded;

        this.dispatchEvent(this._progressEvent);
    };

    /**
    * When the request starts.
    * @param event
    */
    URLLoader.prototype.onLoadStart = function (event) {
        if (!this._loadStartEvent)
            this._loadStartEvent = new AwayEvent(AwayEvent.OPEN);

        this.dispatchEvent(this._loadStartEvent);
    };

    /**
    * When the request has successfully completed.
    * @param event
    */
    URLLoader.prototype.onLoadComplete = function (event) {
        if (this._loadError === true)
            return;

        switch (this._dataFormat) {
            case URLLoaderDataFormat.TEXT:
                this._data = this._XHR.responseText;
                break;

            case URLLoaderDataFormat.VARIABLES:
                this._data = this.decodeURLVariables(this._XHR.responseText);
                break;

            case URLLoaderDataFormat.BLOB:
            case URLLoaderDataFormat.ARRAY_BUFFER:
            case URLLoaderDataFormat.BINARY:
                this._data = this._XHR.response;
                break;

            default:
                this._data = this._XHR.responseText;
                break;
        }

        if (!this._loadCompleteEvent)
            this._loadCompleteEvent = new AwayEvent(AwayEvent.COMPLETE);

        this.dispatchEvent(this._loadCompleteEvent);
    };

    /**
    * When the request has failed. ( due to network issues ).
    * @param event
    */
    URLLoader.prototype.onLoadError = function (event) {
        this._loadError = true;

        if (!this._loadErrorEvent)
            this._loadErrorEvent = new IOErrorEvent(IOErrorEvent.IO_ERROR);

        this.dispatchEvent(this._loadErrorEvent);
    };
    return URLLoader;
})(EventDispatcher);

module.exports = URLLoader;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbmV0L1VSTExvYWRlci50cyJdLCJuYW1lcyI6WyJVUkxMb2FkZXIiLCJVUkxMb2FkZXIuY29uc3RydWN0b3IiLCJVUkxMb2FkZXIubG9hZCIsIlVSTExvYWRlci5jbG9zZSIsIlVSTExvYWRlci5kaXNwb3NlIiwiVVJMTG9hZGVyLnNldFJlc3BvbnNlVHlwZSIsIlVSTExvYWRlci5nZXRSZXF1ZXN0IiwiVVJMTG9hZGVyLnBvc3RSZXF1ZXN0IiwiVVJMTG9hZGVyLmhhbmRsZVhtbEh0dHBSZXF1ZXN0RXhjZXB0aW9uIiwiVVJMTG9hZGVyLmluaXRYSFIiLCJVUkxMb2FkZXIuZGlzcG9zZVhIUiIsIlVSTExvYWRlci5kZWNvZGVVUkxWYXJpYWJsZXMiLCJVUkxMb2FkZXIub25SZWFkeVN0YXRlQ2hhbmdlIiwiVVJMTG9hZGVyLm9uTG9hZEVuZCIsIlVSTExvYWRlci5vblRpbWVPdXQiLCJVUkxMb2FkZXIub25BYm9ydCIsIlVSTExvYWRlci5vblByb2dyZXNzIiwiVVJMTG9hZGVyLm9uTG9hZFN0YXJ0IiwiVVJMTG9hZGVyLm9uTG9hZENvbXBsZXRlIiwiVVJMTG9hZGVyLm9uTG9hZEVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpRkFBdUY7O0FBRXZGLDJFQUFrRjtBQUNsRixtRUFBMkU7QUFDM0UsdURBQStEO0FBQy9ELHVFQUE4RTtBQUM5RSx1RUFBOEU7QUFDOUUsaUVBQXlFO0FBQ3pFLHVFQUE2RTs7QUFFN0U7Ozs7Ozs7OztFQVNHO0FBQ0g7SUFBd0JBLDRCQUFlQTtJQW1CdENBOztNQURHQTtJQUNIQTtRQUVDQyxXQUFNQSxLQUFBQSxDQUFDQTtRQWxCUkEsS0FBUUEsWUFBWUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDaENBLEtBQVFBLFdBQVdBLEdBQVVBLENBQUNBLENBQUNBO1FBQy9CQSxLQUFRQSxXQUFXQSxHQUFVQSxtQkFBbUJBLENBQUNBLElBQUlBLENBQUNBO1FBQ3REQSxLQUFRQSxVQUFVQSxHQUFXQSxLQUFLQSxDQUFD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QUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQTtnQkFDbkNBLEtBQU1BO0FBQUFBLFNBQ1BBOztRQUVEQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxrQkFBa0JBO1lBQzNCQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEdBQUdBLElBQUlBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBOztRQUU3REEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtJQUM1Q0EsQ0FBQ0E7O0lBTURsQjs7O01BREdBO3NDQUNIQSxVQUFvQkEsS0FBV0E7UUFFOUJtQixJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQTs7UUFFdEJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLGVBQWVBO1lBQ3hCQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxJQUFJQSxZQUFZQSxDQUFDQSxZQUFZQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTs7UUFFaEVBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBO0lBQ3pDQSxDQUFDQTtJQUNGbkIsaUJBQUNBO0FBQURBLENBQUNBLEVBM1l1QixlQUFlLEVBMll0Qzs7QUFFRCwwQkFBbUIsQ0FBQSIsImZpbGUiOiJjb3JlL25ldC9VUkxMb2FkZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVVJMTG9hZGVyRGF0YUZvcm1hdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL25ldC9VUkxMb2FkZXJEYXRhRm9ybWF0XCIpO1xuaW1wb3J0IFVSTFJlcXVlc3RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbmV0L1VSTFJlcXVlc3RcIik7XG5pbXBvcnQgVVJMUmVxdWVzdE1ldGhvZFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbmV0L1VSTFJlcXVlc3RNZXRob2RcIik7XG5pbXBvcnQgVVJMVmFyaWFibGVzXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL25ldC9VUkxWYXJpYWJsZXNcIik7XG5pbXBvcnQgQXdheUV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnRcIik7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiKTtcbmltcG9ydCBIVFRQU3RhdHVzRXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvSFRUUFN0YXR1c0V2ZW50XCIpO1xuaW1wb3J0IElPRXJyb3JFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0lPRXJyb3JFdmVudFwiKTtcbmltcG9ydCBBd2F5UHJvZ3Jlc3NFdmVudFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvUHJvZ3Jlc3NFdmVudFwiKTtcblxuLyoqXG4gKiBUaGUgVVJMTG9hZGVyIGlzIHVzZWQgdG8gbG9hZCBhIHNpbmdsZSBmaWxlLCBhcyBwYXJ0IG9mIGEgcmVzb3VyY2UuXG4gKlxuICogV2hpbGUgVVJMTG9hZGVyIGNhbiBiZSB1c2VkIGRpcmVjdGx5LCBlLmcuIHRvIGNyZWF0ZSBhIHRoaXJkLXBhcnR5IGFzc2V0XG4gKiBtYW5hZ2VtZW50IHN5c3RlbSwgaXQncyByZWNvbW1lbmRlZCB0byB1c2UgYW55IG9mIHRoZSBjbGFzc2VzIExvYWRlcjNELCBBc3NldExvYWRlclxuICogYW5kIEFzc2V0TGlicmFyeSBpbnN0ZWFkIGluIG1vc3QgY2FzZXMuXG4gKlxuICogQHNlZSBBc3NldExvYWRlclxuICogQHNlZSBhd2F5LmxpYnJhcnkuQXNzZXRMaWJyYXJ5XG4gKi9cbmNsYXNzIFVSTExvYWRlciBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxue1xuXHRwcml2YXRlIF9YSFI6WE1MSHR0cFJlcXVlc3Q7XG5cdHByaXZhdGUgX2J5dGVzTG9hZGVkOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX2J5dGVzVG90YWw6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfZGF0YUZvcm1hdDpzdHJpbmcgPSBVUkxMb2FkZXJEYXRhRm9ybWF0LlRFWFQ7XG5cdHByaXZhdGUgX2xvYWRFcnJvcjpib29sZWFuID0gZmFsc2U7XG5cblx0cHJpdmF0ZSBfcmVxdWVzdDpVUkxSZXF1ZXN0O1xuXHRwcml2YXRlIF9kYXRhOmFueTtcblxuXHRwcml2YXRlIF9sb2FkU3RhcnRFdmVudDpBd2F5RXZlbnQ7XG5cdHByaXZhdGUgX2xvYWRFcnJvckV2ZW50OklPRXJyb3JFdmVudDtcblx0cHJpdmF0ZSBfbG9hZENvbXBsZXRlRXZlbnQ6QXdheUV2ZW50O1xuXHRwcml2YXRlIF9wcm9ncmVzc0V2ZW50OkF3YXlQcm9ncmVzc0V2ZW50O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IFVSTExvYWRlciBvYmplY3QuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHVybCgpOnN0cmluZ1xuXHR7XG5cblx0XHRyZXR1cm4gdGhpcy5fcmVxdWVzdD8gdGhpcy5fcmVxdWVzdC51cmwgOiAnJztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBkYXRhKCk6YW55XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGF0YTtcblx0fVxuXG5cblx0LyoqXG5cdCAqXG5cdCAqIFVSTExvYWRlckRhdGFGb3JtYXQuQklOQVJZXG5cdCAqIFVSTExvYWRlckRhdGFGb3JtYXQuVEVYVFxuXHQgKiBVUkxMb2FkZXJEYXRhRm9ybWF0LlZBUklBQkxFU1xuXHQgKlxuXHQgKiBAcGFyYW0gZm9ybWF0XG5cdCAqL1xuXHRwdWJsaWMgc2V0IGRhdGFGb3JtYXQoZm9ybWF0OnN0cmluZylcblx0e1xuXHRcdHRoaXMuX2RhdGFGb3JtYXQgPSBmb3JtYXQ7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGRhdGFGb3JtYXQoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kYXRhRm9ybWF0O1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJ5dGVzTG9hZGVkKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYnl0ZXNMb2FkZWQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdHB1YmxpYyBnZXQgYnl0ZXNUb3RhbCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2J5dGVzVG90YWw7XG5cdH1cblxuXHQvKipcblx0ICogTG9hZCBhIHJlc291cmNlIGZyb20gYSBmaWxlLlxuXHQgKlxuXHQgKiBAcGFyYW0gcmVxdWVzdCBUaGUgVVJMUmVxdWVzdCBvYmplY3QgY29udGFpbmluZyB0aGUgVVJMIG9mIHRoZSBvYmplY3QgdG8gYmUgbG9hZGVkLlxuXHQgKi9cblx0cHVibGljIGxvYWQocmVxdWVzdDpVUkxSZXF1ZXN0KTp2b2lkXG5cdHtcblx0XHR0aGlzLl9yZXF1ZXN0ID0gcmVxdWVzdDtcblxuXHRcdHRoaXMuaW5pdFhIUigpO1xuXG5cdFx0aWYgKHJlcXVlc3QubWV0aG9kID09PSBVUkxSZXF1ZXN0TWV0aG9kLlBPU1QpXG5cdFx0XHR0aGlzLnBvc3RSZXF1ZXN0KHJlcXVlc3QpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMuZ2V0UmVxdWVzdChyZXF1ZXN0KTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGNsb3NlKCk6dm9pZFxuXHR7XG5cdFx0dGhpcy5fWEhSLmFib3J0KCk7XG5cdFx0dGhpcy5kaXNwb3NlWEhSKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKCk6dm9pZFxuXHR7XG5cdFx0aWYgKHRoaXMuX1hIUilcblx0XHRcdHRoaXMuX1hIUi5hYm9ydCgpO1xuXG5cdFx0dGhpcy5kaXNwb3NlWEhSKCk7XG5cblx0XHR0aGlzLl9kYXRhID0gbnVsbDtcblx0XHR0aGlzLl9kYXRhRm9ybWF0ID0gbnVsbDtcblx0XHR0aGlzLl9ieXRlc0xvYWRlZCA9IG51bGw7XG5cdFx0dGhpcy5fYnl0ZXNUb3RhbCA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHhoclxuXHQgKiBAcGFyYW0gcmVzcG9uc2VUeXBlXG5cdCAqL1xuXHRwcml2YXRlIHNldFJlc3BvbnNlVHlwZSh4aHI6WE1MSHR0cFJlcXVlc3QsIHJlc3BvbnNlVHlwZTpzdHJpbmcpOnZvaWRcblx0e1xuXHRcdHN3aXRjaCAocmVzcG9uc2VUeXBlKSB7XG5cdFx0XHRjYXNlIFVSTExvYWRlckRhdGFGb3JtYXQuQVJSQVlfQlVGRkVSOlxuXHRcdFx0Y2FzZSBVUkxMb2FkZXJEYXRhRm9ybWF0LkJMT0I6XG5cdFx0XHRjYXNlIFVSTExvYWRlckRhdGFGb3JtYXQuVEVYVDpcblx0XHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgVVJMTG9hZGVyRGF0YUZvcm1hdC5WQVJJQUJMRVM6XG5cdFx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSBVUkxMb2FkZXJEYXRhRm9ybWF0LlRFWFQ7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIFVSTExvYWRlckRhdGFGb3JtYXQuQklOQVJZOlxuXHRcdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJyc7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gcmVxdWVzdCB7VVJMUmVxdWVzdH1cblx0ICovXG5cdHByaXZhdGUgZ2V0UmVxdWVzdChyZXF1ZXN0OlVSTFJlcXVlc3QpOnZvaWRcblx0e1xuXHRcdHRyeSB7XG5cdFx0XHR0aGlzLl9YSFIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHJlcXVlc3QuYXN5bmMpO1xuXHRcdFx0dGhpcy5zZXRSZXNwb25zZVR5cGUodGhpcy5fWEhSLCB0aGlzLl9kYXRhRm9ybWF0KTtcblx0XHRcdHRoaXMuX1hIUi5zZW5kKCk7IC8vIE5vIGRhdGEgdG8gc2VuZFxuXHRcdH0gY2F0Y2ggKGUgLyogPFhNTEh0dHBSZXF1ZXN0RXhjZXB0aW9uPiAqLykge1xuXHRcdFx0dGhpcy5oYW5kbGVYbWxIdHRwUmVxdWVzdEV4Y2VwdGlvbihlKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHJlcXVlc3Qge1VSTFJlcXVlc3R9XG5cdCAqL1xuXHRwcml2YXRlIHBvc3RSZXF1ZXN0KHJlcXVlc3Q6VVJMUmVxdWVzdCk6dm9pZFxuXHR7XG5cdFx0dGhpcy5fbG9hZEVycm9yID0gZmFsc2U7XG5cblx0XHR0aGlzLl9YSFIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHJlcXVlc3QuYXN5bmMpO1xuXG5cdFx0aWYgKHJlcXVlc3QuZGF0YSAhPSBudWxsKSB7XG5cdFx0XHRpZiAocmVxdWVzdC5kYXRhIGluc3RhbmNlb2YgVVJMVmFyaWFibGVzKSB7XG5cdFx0XHRcdHZhciB1cmxWYXJzOlVSTFZhcmlhYmxlcyA9IDxVUkxWYXJpYWJsZXM+IHJlcXVlc3QuZGF0YTtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHRoaXMuX1hIUi5yZXNwb25zZVR5cGUgPSAndGV4dCc7XG5cdFx0XHRcdFx0dGhpcy5fWEhSLnNlbmQodXJsVmFycy5mb3JtRGF0YSk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUgLyogPFhNTEh0dHBSZXF1ZXN0RXhjZXB0aW9uPiAqLykge1xuXHRcdFx0XHRcdHRoaXMuaGFuZGxlWG1sSHR0cFJlcXVlc3RFeGNlcHRpb24oZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc2V0UmVzcG9uc2VUeXBlKHRoaXMuX1hIUiwgdGhpcy5fZGF0YUZvcm1hdCk7XG5cblx0XHRcdFx0aWYgKHJlcXVlc3QuZGF0YSlcblx0XHRcdFx0XHR0aGlzLl9YSFIuc2VuZChyZXF1ZXN0LmRhdGEpOyAvLyBUT0RPOiBUZXN0XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0aGlzLl9YSFIuc2VuZCgpOyAvLyBubyBkYXRhIHRvIHNlbmRcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fWEhSLnNlbmQoKTsgLy8gTm8gZGF0YSB0byBzZW5kXG5cdFx0fVxuXG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGVycm9yIHtYTUxIdHRwUmVxdWVzdEV4Y2VwdGlvbn1cblx0ICovXG5cdHByaXZhdGUgaGFuZGxlWG1sSHR0cFJlcXVlc3RFeGNlcHRpb24oZXJyb3I6YW55IC8qIDxYTUxIdHRwUmVxdWVzdEV4Y2VwdGlvbj4gKi8pOnZvaWRcblx0e1xuXHRcdHN3aXRjaCAoZXJyb3IuY29kZSkge1xuXG5cdFx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHRcdCAqXG5cdFx0ICogIFhNTEh0dHBSZXF1ZXN0RXhjZXB0aW9uIHsgbWVzc2FnZTogXCJORVRXT1JLX0VSUjogWE1MSHR0cFJlcXVlc3QgRXhjZXB0aW9uIDEwMVwiLCBuYW1lOiBcIk5FVFdPUktfRVJSXCIsIGNvZGU6IDEwMSwgc3RhY2s6IFwiRXJyb3I6IEEgbmV0d29yayBlcnJvciBvY2N1cnJlZCBpbiBzeW5jaHJvbm91cyByZXHigKZcIixORVRXT1JLX0VSUjogMTAx4oCmIH1cblx0XHQgKiAgY29kZTogMTAxICwgbWVzc2FnZTogXCJORVRXT1JLX0VSUjogWE1MSHR0cFJlcXVlc3QgRXhjZXB0aW9uIDEwMVwiICwgIG5hbWU6IFwiTkVUV09SS19FUlJcIlxuXHRcdCAqXG5cdFx0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRcdFx0Y2FzZSAxMDE6XG5cdFx0XHRcdC8vIE5vdGU6IG9uTG9hZEVycm9yIGV2ZW50IHRocm93cyBJT19FUlJPUiBldmVudCAtIHRoaXMgY2FzZSBpcyBhbHJlYWR5IENvdmVyZWRcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwcml2YXRlIGluaXRYSFIoKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9YSFIpIHtcblx0XHRcdHRoaXMuX1hIUiA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG5cdFx0XHR0aGlzLl9YSFIub25sb2Fkc3RhcnQgPSAoZXZlbnQ6UHJvZ3Jlc3NFdmVudCkgPT4gdGhpcy5vbkxvYWRTdGFydChldmVudCk7ICAgICAgICAgICAgICAgICAvLyBsb2Fkc3RhcnRcdCAgICAgICAgLSBXaGVuIHRoZSByZXF1ZXN0IHN0YXJ0cy5cblx0XHRcdHRoaXMuX1hIUi5vbnByb2dyZXNzID0gKGV2ZW50OlByb2dyZXNzRXZlbnQpID0+IHRoaXMub25Qcm9ncmVzcyhldmVudCk7XHQgICAgICAgICAgICAgICAgLy8gcHJvZ3Jlc3NcdCAgICAgICAgICAgIC0gV2hpbGUgbG9hZGluZyBhbmQgc2VuZGluZyBkYXRhLlxuXHRcdFx0dGhpcy5fWEhSLm9uYWJvcnQgPSAoZXZlbnQ6VUlFdmVudCkgPT4gdGhpcy5vbkFib3J0KGV2ZW50KTtcdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFib3J0XHQgICAgICAgICAgICAtIFdoZW4gdGhlIHJlcXVlc3QgaGFzIGJlZW4gYWJvcnRlZCwgZWl0aGVyIGJ5IGludm9raW5nIHRoZSBhYm9ydCgpIG1ldGhvZCBvciBuYXZpZ2F0aW5nIGF3YXkgZnJvbSB0aGUgcGFnZS5cblx0XHRcdHRoaXMuX1hIUi5vbmVycm9yID0gKGV2ZW50OkVycm9yRXZlbnQpID0+IHRoaXMub25Mb2FkRXJyb3IoZXZlbnQpOyAgICAgICAgICAgICAgICAgICAgIC8vIGVycm9yXHQgICAgICAgICAgICAtIFdoZW4gdGhlIHJlcXVlc3QgaGFzIGZhaWxlZC5cblx0XHRcdHRoaXMuX1hIUi5vbmxvYWQgPSAoZXZlbnQ6RXZlbnQpID0+IHRoaXMub25Mb2FkQ29tcGxldGUoZXZlbnQpOyAgICAgICAgICAgICAgICAgICAvLyBsb2FkXHQgICAgICAgICAgICAgICAgLSBXaGVuIHRoZSByZXF1ZXN0IGhhcyBzdWNjZXNzZnVsbHkgY29tcGxldGVkLlxuXHRcdFx0dGhpcy5fWEhSLm9udGltZW91dCA9IChldmVudDpFdmVudCkgPT4gdGhpcy5vblRpbWVPdXQoZXZlbnQpOyAgICAgICAgICAgICAgICAgICAgIC8vIHRpbWVvdXRcdCAgICAgICAgICAgIC0gV2hlbiB0aGUgYXV0aG9yIHNwZWNpZmllZCB0aW1lb3V0IGhhcyBwYXNzZWQgYmVmb3JlIHRoZSByZXF1ZXN0IGNvdWxkIGNvbXBsZXRlLlxuXHRcdFx0dGhpcy5fWEhSLm9ubG9hZGVuZCA9IChldmVudDpQcm9ncmVzc0V2ZW50KSA9PiB0aGlzLm9uTG9hZEVuZChldmVudCk7ICAgICAgICAgICAgICAgICAgICAgLy8gbG9hZGVuZFx0ICAgICAgICAgICAgLSBXaGVuIHRoZSByZXF1ZXN0IGhhcyBjb21wbGV0ZWQsIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciBvciBub3QgaXQgd2FzIHN1Y2Nlc3NmdWwuXG5cdFx0XHR0aGlzLl9YSFIub25yZWFkeXN0YXRlY2hhbmdlID0gKGV2ZW50OkV2ZW50KSA9PiB0aGlzLm9uUmVhZHlTdGF0ZUNoYW5nZShldmVudCk7ICAgLy8gb25yZWFkeXN0YXRlY2hhbmdlICAgLSBXaGVuIFhIUiBzdGF0ZSBjaGFuZ2VzXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwcml2YXRlIGRpc3Bvc2VYSFIoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX1hIUiAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fWEhSLm9ubG9hZHN0YXJ0ID0gbnVsbDtcblx0XHRcdHRoaXMuX1hIUi5vbnByb2dyZXNzID0gbnVsbDtcblx0XHRcdHRoaXMuX1hIUi5vbmFib3J0ID0gbnVsbDtcblx0XHRcdHRoaXMuX1hIUi5vbmVycm9yID0gbnVsbDtcblx0XHRcdHRoaXMuX1hIUi5vbmxvYWQgPSBudWxsO1xuXHRcdFx0dGhpcy5fWEhSLm9udGltZW91dCA9IG51bGw7XG5cdFx0XHR0aGlzLl9YSFIub25sb2FkZW5kID0gbnVsbDtcblx0XHRcdHRoaXMuX1hIUiA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBzb3VyY2Vcblx0ICovXG5cdHB1YmxpYyBkZWNvZGVVUkxWYXJpYWJsZXMoc291cmNlOnN0cmluZyk6T2JqZWN0XG5cdHtcblx0XHR2YXIgcmVzdWx0Ok9iamVjdCA9IG5ldyBPYmplY3QoKTtcblxuXHRcdHNvdXJjZSA9IHNvdXJjZS5zcGxpdChcIitcIikuam9pbihcIiBcIik7XG5cblx0XHR2YXIgdG9rZW5zLCByZSA9IC9bPyZdPyhbXj1dKyk9KFteJl0qKS9nO1xuXG5cdFx0d2hpbGUgKHRva2VucyA9IHJlLmV4ZWMoc291cmNlKSlcblx0XHRcdHJlc3VsdFtkZWNvZGVVUklDb21wb25lbnQodG9rZW5zWzFdKV0gPSBkZWNvZGVVUklDb21wb25lbnQodG9rZW5zWzJdKTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvLyBYTUxIdHRwUmVxdWVzdCAtIEV2ZW50IEhhbmRsZXJzXG5cblx0LyoqXG5cdCAqIFdoZW4gWEhSIHN0YXRlIGNoYW5nZXNcblx0ICogQHBhcmFtIGV2ZW50XG5cdCAqL1xuXHRwcml2YXRlIG9uUmVhZHlTdGF0ZUNoYW5nZShldmVudDpFdmVudClcblx0e1xuXHRcdGlmICh0aGlzLl9YSFIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRpZiAodGhpcy5fWEhSLnN0YXR1cyA9PSA0MDQpIHtcblx0XHRcdFx0dGhpcy5fbG9hZEVycm9yID0gdHJ1ZTtcblxuXHRcdFx0XHRpZiAoIXRoaXMuX2xvYWRFcnJvckV2ZW50KVxuXHRcdFx0XHRcdHRoaXMuX2xvYWRFcnJvckV2ZW50ID0gbmV3IElPRXJyb3JFdmVudChJT0Vycm9yRXZlbnQuSU9fRVJST1IpO1xuXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9sb2FkRXJyb3JFdmVudCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgSFRUUFN0YXR1c0V2ZW50KEhUVFBTdGF0dXNFdmVudC5IVFRQX1NUQVRVUywgdGhpcy5fWEhSLnN0YXR1cykpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBXaGVuIHRoZSByZXF1ZXN0IGhhcyBjb21wbGV0ZWQsIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciBvciBub3QgaXQgd2FzIHN1Y2Nlc3NmdWwuXG5cdCAqIEBwYXJhbSBldmVudFxuXHQgKi9cblx0cHJpdmF0ZSBvbkxvYWRFbmQoZXZlbnQ6UHJvZ3Jlc3NFdmVudClcblx0e1xuXHRcdGlmICh0aGlzLl9sb2FkRXJyb3IgPT09IHRydWUpXG5cdFx0XHRyZXR1cm47XG5cdH1cblxuXHQvKipcblx0ICogV2hlbiB0aGUgYXV0aG9yIHNwZWNpZmllZCB0aW1lb3V0IGhhcyBwYXNzZWQgYmVmb3JlIHRoZSByZXF1ZXN0IGNvdWxkIGNvbXBsZXRlLlxuXHQgKiBAcGFyYW0gZXZlbnRcblx0ICovXG5cdHByaXZhdGUgb25UaW1lT3V0KGV2ZW50OkV2ZW50KVxuXHR7XG5cdFx0Ly9UT0RPOiBUaW1lb3V0IG5vdCBjdXJyZW50bHkgaW1wbGVtZW50ZWQgKCBhbHNvIG5vdCBwYXJ0IG9mIEFTMyBBUEkgKVxuXHR9XG5cblx0LyoqXG5cdCAqIFdoZW4gdGhlIHJlcXVlc3QgaGFzIGJlZW4gYWJvcnRlZCwgZWl0aGVyIGJ5IGludm9raW5nIHRoZSBhYm9ydCgpIG1ldGhvZCBvciBuYXZpZ2F0aW5nIGF3YXkgZnJvbSB0aGUgcGFnZS5cblx0ICogQHBhcmFtIGV2ZW50XG5cdCAqL1xuXHRwcml2YXRlIG9uQWJvcnQoZXZlbnQ6VUlFdmVudClcblx0e1xuXHRcdC8vIFRPRE86IGludmVzdGlnYXRlIHdoZXRoZXIgdGhpcyBuZWVkcyB0byBiZSBhbiBJT0Vycm9yXG5cdH1cblxuXHQvKipcblx0ICogV2hpbGUgbG9hZGluZyBhbmQgc2VuZGluZyBkYXRhLlxuXHQgKiBAcGFyYW0gZXZlbnRcblx0ICovXG5cdHByaXZhdGUgb25Qcm9ncmVzcyhldmVudDpQcm9ncmVzc0V2ZW50KVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9wcm9ncmVzc0V2ZW50KVxuXHRcdFx0dGhpcy5fcHJvZ3Jlc3NFdmVudCA9IG5ldyBBd2F5UHJvZ3Jlc3NFdmVudChBd2F5UHJvZ3Jlc3NFdmVudC5QUk9HUkVTUyk7XG5cblx0XHR0aGlzLl9wcm9ncmVzc0V2ZW50LmJ5dGVzVG90YWwgPSBldmVudC50b3RhbDtcblx0XHR0aGlzLl9wcm9ncmVzc0V2ZW50LmJ5dGVzTG9hZGVkID0gZXZlbnQubG9hZGVkO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3Byb2dyZXNzRXZlbnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZW4gdGhlIHJlcXVlc3Qgc3RhcnRzLlxuXHQgKiBAcGFyYW0gZXZlbnRcblx0ICovXG5cdHByaXZhdGUgb25Mb2FkU3RhcnQoZXZlbnQ6UHJvZ3Jlc3NFdmVudClcblx0e1xuXHRcdGlmICghdGhpcy5fbG9hZFN0YXJ0RXZlbnQpXG5cdFx0XHR0aGlzLl9sb2FkU3RhcnRFdmVudCA9IG5ldyBBd2F5RXZlbnQoQXdheUV2ZW50Lk9QRU4pO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX2xvYWRTdGFydEV2ZW50KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGVuIHRoZSByZXF1ZXN0IGhhcyBzdWNjZXNzZnVsbHkgY29tcGxldGVkLlxuXHQgKiBAcGFyYW0gZXZlbnRcblx0ICovXG5cdHByaXZhdGUgb25Mb2FkQ29tcGxldGUoZXZlbnQ6RXZlbnQpXG5cdHtcblx0XHRpZiAodGhpcy5fbG9hZEVycm9yID09PSB0cnVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0c3dpdGNoICh0aGlzLl9kYXRhRm9ybWF0KSB7XG5cdFx0XHRjYXNlIFVSTExvYWRlckRhdGFGb3JtYXQuVEVYVDpcblx0XHRcdFx0dGhpcy5fZGF0YSA9IHRoaXMuX1hIUi5yZXNwb25zZVRleHQ7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIFVSTExvYWRlckRhdGFGb3JtYXQuVkFSSUFCTEVTOlxuXHRcdFx0XHR0aGlzLl9kYXRhID0gdGhpcy5kZWNvZGVVUkxWYXJpYWJsZXModGhpcy5fWEhSLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIFVSTExvYWRlckRhdGFGb3JtYXQuQkxPQjpcblx0XHRcdGNhc2UgVVJMTG9hZGVyRGF0YUZvcm1hdC5BUlJBWV9CVUZGRVI6XG5cdFx0XHRjYXNlIFVSTExvYWRlckRhdGFGb3JtYXQuQklOQVJZOlxuXHRcdFx0XHR0aGlzLl9kYXRhID0gdGhpcy5fWEhSLnJlc3BvbnNlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhpcy5fZGF0YSA9IHRoaXMuX1hIUi5yZXNwb25zZVRleHQ7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5fbG9hZENvbXBsZXRlRXZlbnQpXG5cdFx0XHR0aGlzLl9sb2FkQ29tcGxldGVFdmVudCA9IG5ldyBBd2F5RXZlbnQoQXdheUV2ZW50LkNPTVBMRVRFKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9sb2FkQ29tcGxldGVFdmVudCk7XG5cdH1cblxuXHQvKipcblx0ICogV2hlbiB0aGUgcmVxdWVzdCBoYXMgZmFpbGVkLiAoIGR1ZSB0byBuZXR3b3JrIGlzc3VlcyApLlxuXHQgKiBAcGFyYW0gZXZlbnRcblx0ICovXG5cdHByaXZhdGUgb25Mb2FkRXJyb3IoZXZlbnQ6RXZlbnQpXG5cdHtcblx0XHR0aGlzLl9sb2FkRXJyb3IgPSB0cnVlO1xuXG5cdFx0aWYgKCF0aGlzLl9sb2FkRXJyb3JFdmVudClcblx0XHRcdHRoaXMuX2xvYWRFcnJvckV2ZW50ID0gbmV3IElPRXJyb3JFdmVudChJT0Vycm9yRXZlbnQuSU9fRVJST1IpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX2xvYWRFcnJvckV2ZW50KTtcblx0fVxufVxuXG5leHBvcnQgPSBVUkxMb2FkZXI7Il19