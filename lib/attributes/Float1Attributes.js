"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributesView_1 = require("../attributes/AttributesView");
var Float1Attributes = (function (_super) {
    __extends(Float1Attributes, _super);
    function Float1Attributes(attributesBufferLength) {
        _super.call(this, Float32Array, 1, attributesBufferLength);
    }
    Object.defineProperty(Float1Attributes.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return Float1Attributes.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Float1Attributes.prototype.set = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        _super.prototype.set.call(this, values, offset);
    };
    Float1Attributes.prototype.get = function (count, offset) {
        if (offset === void 0) { offset = 0; }
        return _super.prototype.get.call(this, count, offset);
    };
    Float1Attributes.prototype._internalClone = function (attributesBuffer) {
        return (this._cloneCache = new Float1Attributes(attributesBuffer));
    };
    Float1Attributes.prototype.clone = function (attributesBuffer) {
        if (attributesBuffer === void 0) { attributesBuffer = null; }
        return _super.prototype.clone.call(this, attributesBuffer);
    };
    Float1Attributes.assetType = "[attributes Float1Attributes]";
    return Float1Attributes;
}(AttributesView_1.AttributesView));
exports.Float1Attributes = Float1Attributes;
