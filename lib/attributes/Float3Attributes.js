"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributesView_1 = require("../attributes/AttributesView");
var Float3Attributes = (function (_super) {
    __extends(Float3Attributes, _super);
    function Float3Attributes(attributesBufferLength) {
        _super.call(this, Float32Array, 3, attributesBufferLength);
    }
    Object.defineProperty(Float3Attributes.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return Float3Attributes.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Float3Attributes.prototype.set = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        _super.prototype.set.call(this, values, offset);
    };
    Float3Attributes.prototype.get = function (count, offset) {
        if (offset === void 0) { offset = 0; }
        return _super.prototype.get.call(this, count, offset);
    };
    Float3Attributes.prototype._internalClone = function (attributesBuffer) {
        return (this._cloneCache = new Float3Attributes(attributesBuffer));
    };
    Float3Attributes.prototype.clone = function (attributesBuffer) {
        if (attributesBuffer === void 0) { attributesBuffer = null; }
        return _super.prototype.clone.call(this, attributesBuffer);
    };
    Float3Attributes.assetType = "[attributes Float3Attributes]";
    return Float3Attributes;
}(AttributesView_1.AttributesView));
exports.Float3Attributes = Float3Attributes;
