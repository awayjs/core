"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributesView_1 = require("../attributes/AttributesView");
var Byte4Attributes = (function (_super) {
    __extends(Byte4Attributes, _super);
    function Byte4Attributes(attributesBufferLength, unsigned) {
        if (unsigned === void 0) { unsigned = true; }
        _super.call(this, unsigned ? Uint8Array : Int8Array, 4, attributesBufferLength, unsigned);
    }
    Object.defineProperty(Byte4Attributes.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return Byte4Attributes.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Byte4Attributes.prototype.set = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        _super.prototype.set.call(this, values, offset);
    };
    Byte4Attributes.prototype.get = function (count, offset) {
        if (offset === void 0) { offset = 0; }
        return _super.prototype.get.call(this, count, offset);
    };
    Byte4Attributes.prototype._internalClone = function (attributesBuffer) {
        return (this._cloneCache = new Byte4Attributes(attributesBuffer, this._arrayClass == Uint8Array));
    };
    Byte4Attributes.prototype.clone = function (attributesBuffer) {
        if (attributesBuffer === void 0) { attributesBuffer = null; }
        return _super.prototype.clone.call(this, attributesBuffer);
    };
    Byte4Attributes.assetType = "[attributes Byte4Attributes]";
    return Byte4Attributes;
}(AttributesView_1.AttributesView));
exports.Byte4Attributes = Byte4Attributes;
