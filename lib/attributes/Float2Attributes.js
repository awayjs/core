"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributesView_1 = require("../attributes/AttributesView");
var Float2Attributes = (function (_super) {
    __extends(Float2Attributes, _super);
    function Float2Attributes(attributesBufferLength) {
        _super.call(this, Float32Array, 2, attributesBufferLength);
    }
    Object.defineProperty(Float2Attributes.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return Float2Attributes.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Float2Attributes.prototype.set = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        _super.prototype.set.call(this, values, offset);
    };
    Float2Attributes.prototype.get = function (count, offset) {
        if (offset === void 0) { offset = 0; }
        return _super.prototype.get.call(this, count, offset);
    };
    Float2Attributes.prototype._internalClone = function (attributesBuffer) {
        return (this._cloneCache = new Float2Attributes(attributesBuffer));
    };
    Float2Attributes.prototype.clone = function (attributesBuffer) {
        if (attributesBuffer === void 0) { attributesBuffer = null; }
        return _super.prototype.clone.call(this, attributesBuffer);
    };
    Float2Attributes.assetType = "[attributes Float2Attributes]";
    return Float2Attributes;
}(AttributesView_1.AttributesView));
exports.Float2Attributes = Float2Attributes;
