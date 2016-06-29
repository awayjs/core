"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase_1 = require("../events/EventBase");
var URLLoaderEvent = (function (_super) {
    __extends(URLLoaderEvent, _super);
    function URLLoaderEvent(type, urlLoader) {
        _super.call(this, type);
        this._urlLoader = urlLoader;
    }
    Object.defineProperty(URLLoaderEvent.prototype, "urlLoader", {
        /**
         *
         */
        get: function () {
            return this._urlLoader;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    URLLoaderEvent.prototype.clone = function () {
        return new URLLoaderEvent(this.type, this._urlLoader);
    };
    URLLoaderEvent.HTTP_STATUS = "httpStatus";
    URLLoaderEvent.LOAD_ERROR = "loadError";
    URLLoaderEvent.LOAD_PROGRESS = "loadProgress";
    URLLoaderEvent.LOAD_START = "loadStart";
    URLLoaderEvent.LOAD_COMPLETE = "loadComplete";
    return URLLoaderEvent;
}(EventBase_1.EventBase));
exports.URLLoaderEvent = URLLoaderEvent;
