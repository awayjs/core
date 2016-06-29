"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetBase_1 = require("../library/AssetBase");
/**
 *
 */
var SamplerBase = (function (_super) {
    __extends(SamplerBase, _super);
    /**
     *
     */
    function SamplerBase(smooth, mipmap) {
        if (smooth === void 0) { smooth = false; }
        if (mipmap === void 0) { mipmap = false; }
        _super.call(this);
        this._smooth = smooth;
        this._mipmap = mipmap;
    }
    Object.defineProperty(SamplerBase.prototype, "smooth", {
        /**
         *
         */
        get: function () {
            return this._smooth;
        },
        set: function (value) {
            if (this._smooth == value)
                return;
            this._smooth = value;
            //TODO: update dependencies
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SamplerBase.prototype, "mipmap", {
        /**
         *
         */
        get: function () {
            return this._mipmap;
        },
        set: function (value) {
            if (this._mipmap == value)
                return;
            this._mipmap = value;
            //TODO: update dependencies
        },
        enumerable: true,
        configurable: true
    });
    return SamplerBase;
}(AssetBase_1.AssetBase));
exports.SamplerBase = SamplerBase;
