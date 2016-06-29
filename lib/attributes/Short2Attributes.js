"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributesView_1 = require("../attributes/AttributesView");
var Short2Attributes = (function (_super) {
    __extends(Short2Attributes, _super);
    function Short2Attributes(attributesBufferLength, unsigned) {
        if (unsigned === void 0) { unsigned = true; }
        _super.call(this, unsigned ? Uint16Array : Int16Array, 2, attributesBufferLength, unsigned);
    }
    Object.defineProperty(Short2Attributes.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return Short2Attributes.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Short2Attributes.prototype.set = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        _super.prototype.set.call(this, values, offset);
    };
    Short2Attributes.prototype.get = function (count, offset) {
        if (offset === void 0) { offset = 0; }
        return _super.prototype.get.call(this, count, offset);
    };
    Short2Attributes.prototype._internalClone = function (attributesBuffer) {
        return (this._cloneCache = new Short2Attributes(attributesBuffer, this._arrayClass == Uint16Array));
    };
    Short2Attributes.prototype.clone = function (attributesBuffer) {
        if (attributesBuffer === void 0) { attributesBuffer = null; }
        return _super.prototype.clone.call(this, attributesBuffer);
    };
    Short2Attributes.assetType = "[attributes Short2Attributes]";
    return Short2Attributes;
}(AttributesView_1.AttributesView));
exports.Short2Attributes = Short2Attributes;
