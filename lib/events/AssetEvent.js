"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase_1 = require("../events/EventBase");
/**
 * @export class away.events.AssetEvent
 */
var AssetEvent = (function (_super) {
    __extends(AssetEvent, _super);
    /**
     *
     */
    function AssetEvent(type, asset, prevName) {
        if (prevName === void 0) { prevName = null; }
        _super.call(this, type);
        this._asset = asset;
        this._prevName = prevName || this._asset.name;
    }
    Object.defineProperty(AssetEvent.prototype, "asset", {
        /**
         *
         */
        get: function () {
            return this._asset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetEvent.prototype, "prevName", {
        /**
         *
         */
        get: function () {
            return this._prevName;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    AssetEvent.prototype.clone = function () {
        return new AssetEvent(this.type, this._asset, this._prevName);
    };
    /**
     * Dispatched when the content of an asset is invalidated
     */
    AssetEvent.INVALIDATE = "invalidate";
    /**
     * Dispatched when an asset is diposed
     */
    AssetEvent.DISPOSE = "dispose";
    /**
     * Dispatched when an asset is cleared
     */
    AssetEvent.CLEAR = "clear";
    /**
     *
     */
    AssetEvent.RENAME = 'rename';
    /**
     *
     */
    AssetEvent.ENTER_FRAME = 'enterFrame';
    /**
     *
     */
    AssetEvent.EXIT_FRAME = 'exitFrame';
    /**
     *
     */
    AssetEvent.ASSET_CONFLICT_RESOLVED = 'assetConflictResolved';
    /**
     * Dispatched when the loading of an asset and all of its dependencies is complete.
     */
    AssetEvent.ASSET_COMPLETE = "assetComplete";
    /**
     *
     */
    AssetEvent.TEXTURE_SIZE_ERROR = 'textureSizeError';
    return AssetEvent;
}(EventBase_1.EventBase));
exports.AssetEvent = AssetEvent;
