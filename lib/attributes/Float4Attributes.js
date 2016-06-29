"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributesView_1 = require("../attributes/AttributesView");
var Float4Attributes = (function (_super) {
    __extends(Float4Attributes, _super);
    function Float4Attributes(attributesBufferLength) {
        _super.call(this, Float32Array, 4, attributesBufferLength);
    }
    Object.defineProperty(Float4Attributes.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return Float4Attributes.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Float4Attributes.prototype.set = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        _super.prototype.set.call(this, values, offset);
    };
    Float4Attributes.prototype.get = function (count, offset) {
        if (offset === void 0) { offset = 0; }
        return _super.prototype.get.call(this, count, offset);
    };
    Float4Attributes.prototype._internalClone = function (attributesBuffer) {
        return (this._cloneCache = new Float4Attributes(attributesBuffer));
    };
    Float4Attributes.prototype.clone = function (attributesBuffer) {
        if (attributesBuffer === void 0) { attributesBuffer = null; }
        return _super.prototype.clone.call(this, attributesBuffer);
    };
    Float4Attributes.assetType = "[attributes Float4Attributes]";
    return Float4Attributes;
}(AttributesView_1.AttributesView));
exports.Float4Attributes = Float4Attributes;
