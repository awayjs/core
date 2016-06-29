"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetEvent_1 = require("../events/AssetEvent");
var EventDispatcher_1 = require("../events/EventDispatcher");
/**
 *
 * @export class away.pool.AbstractionBase
 */
var AbstractionBase = (function (_super) {
    __extends(AbstractionBase, _super);
    function AbstractionBase(asset, pool) {
        var _this = this;
        _super.call(this);
        this._invalid = true;
        this._asset = asset;
        this._pool = pool;
        this._onClearDelegate = function (event) { return _this.onClear(event); };
        this._onInvalidateDelegate = function (event) { return _this.onInvalidate(event); };
        this._asset.addEventListener(AssetEvent_1.AssetEvent.CLEAR, this._onClearDelegate);
        this._asset.addEventListener(AssetEvent_1.AssetEvent.INVALIDATE, this._onInvalidateDelegate);
    }
    /**
     *
     */
    AbstractionBase.prototype.onClear = function (event) {
        this._asset.removeEventListener(AssetEvent_1.AssetEvent.CLEAR, this._onClearDelegate);
        this._asset.removeEventListener(AssetEvent_1.AssetEvent.INVALIDATE, this._onInvalidateDelegate);
        this._pool.clearAbstraction(this._asset);
        this._pool = null;
        this._asset = null;
    };
    /**
     *
     */
    AbstractionBase.prototype.onInvalidate = function (event) {
        this._invalid = true;
    };
    return AbstractionBase;
}(EventDispatcher_1.EventDispatcher));
exports.AbstractionBase = AbstractionBase;
