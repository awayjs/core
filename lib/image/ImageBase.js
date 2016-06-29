"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetBase_1 = require("../library/AssetBase");
var ImageBase = (function (_super) {
    __extends(ImageBase, _super);
    /**
     *
     */
    function ImageBase() {
        _super.call(this);
        this._pFormat = "bgra";
    }
    Object.defineProperty(ImageBase.prototype, "format", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return this._pFormat;
        },
        enumerable: true,
        configurable: true
    });
    return ImageBase;
}(AssetBase_1.AssetBase));
exports.ImageBase = ImageBase;
