"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase_1 = require("../events/EventBase");
var LoaderEvent = (function (_super) {
    __extends(LoaderEvent, _super);
    /**
     * Create a new LoaderEvent object.
     *
     * @param type The event type.
     * @param url The url of the loaded resource.
     * @param assets The assets of the loaded resource.
     */
    function LoaderEvent(type, url, content, assets) {
        if (url === void 0) { url = null; }
        if (content === void 0) { content = null; }
        if (assets === void 0) { assets = null; }
        _super.call(this, type);
        this._url = url;
        this._content = content;
        this._assets = assets;
    }
    Object.defineProperty(LoaderEvent.prototype, "content", {
        /**
         * The content returned if the resource has been loaded inside a <code>Loader</code> object.
         */
        get: function () {
            return this._content;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderEvent.prototype, "url", {
        /**
         * The url of the loaded resource.
         */
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderEvent.prototype, "assets", {
        /**
         * The error string on loadError.
         */
        get: function () {
            return this._assets;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clones the current event.
     * @return An exact duplicate of the current event.
     */
    LoaderEvent.prototype.clone = function () {
        return new LoaderEvent(this.type, this._url, this._content, this._assets);
    };
    /**
     * Dispatched when the loading of a session and all of its dependencies is complete.
     */
    LoaderEvent.LOAD_COMPLETE = "loadComplete";
    return LoaderEvent;
}(EventBase_1.EventBase));
exports.LoaderEvent = LoaderEvent;
