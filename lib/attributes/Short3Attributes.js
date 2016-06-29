"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributesView_1 = require("../attributes/AttributesView");
var Short3Attributes = (function (_super) {
    __extends(Short3Attributes, _super);
    function Short3Attributes(attributesBufferLength, unsigned) {
        if (unsigned === void 0) { unsigned = true; }
        _super.call(this, unsigned ? Uint16Array : Int16Array, 3, attributesBufferLength, unsigned);
    }
    Object.defineProperty(Short3Attributes.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return Short3Attributes.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Short3Attributes.prototype.set = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        _super.prototype.set.call(this, values, offset);
    };
    Short3Attributes.prototype.get = function (count, offset) {
        if (offset === void 0) { offset = 0; }
        return _super.prototype.get.call(this, count, offset);
    };
    Short3Attributes.prototype._internalClone = function (attributesBuffer) {
        return (this._cloneCache = new Short3Attributes(attributesBuffer, this._arrayClass == Uint16Array));
    };
    Short3Attributes.prototype.clone = function (attributesBuffer) {
        if (attributesBuffer === void 0) { attributesBuffer = null; }
        return _super.prototype.clone.call(this, attributesBuffer);
    };
    Short3Attributes.assetType = "[attributes Short3Attributes]";
    return Short3Attributes;
}(AttributesView_1.AttributesView));
exports.Short3Attributes = Short3Attributes;
