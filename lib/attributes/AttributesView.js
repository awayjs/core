"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributesBuffer_1 = require("../attributes/AttributesBuffer");
var AssetBase_1 = require("../library/AssetBase");
var AttributesView = (function (_super) {
    __extends(AttributesView, _super);
    function AttributesView(arrayClass, dimensions, attributesBufferCount, unsigned) {
        if (attributesBufferCount === void 0) { attributesBufferCount = 0; }
        if (unsigned === void 0) { unsigned = false; }
        _super.call(this);
        this._arrayClass = arrayClass;
        this._size = arrayClass.BYTES_PER_ELEMENT;
        this._dimensions = dimensions;
        this._attributesBuffer = (attributesBufferCount instanceof AttributesBuffer_1.AttributesBuffer) ? attributesBufferCount : new AttributesBuffer_1.AttributesBuffer(this._dimensions * this._size, attributesBufferCount);
        this._attributesBuffer._addView(this);
        this._unsigned = unsigned;
    }
    Object.defineProperty(AttributesView.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return AttributesView.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributesView.prototype, "attributesBuffer", {
        get: function () {
            return this._attributesBuffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributesView.prototype, "size", {
        /**
         *
         * @returns {number}
         */
        get: function () {
            return this._size;
        },
        set: function (value) {
            if (this._size == value)
                return;
            this._size = value;
            this._attributesBuffer._removeView(this);
            this._attributesBuffer._addView(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributesView.prototype, "dimensions", {
        /**
         *
         * @returns {number}
         */
        get: function () {
            return this._dimensions;
        },
        set: function (value) {
            if (this._dimensions == value)
                return;
            this._dimensions = value;
            //reset view
            this._attributesBuffer._removeView(this);
            this._attributesBuffer._addView(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributesView.prototype, "unsigned", {
        get: function () {
            return this._unsigned;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributesView.prototype, "count", {
        get: function () {
            return this._attributesBuffer.count;
        },
        set: function (value) {
            this._attributesBuffer.count = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributesView.prototype, "offset", {
        get: function () {
            return this._attributesBuffer._getOffset(this._index);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributesView.prototype, "length", {
        get: function () {
            return this._attributesBuffer.count * this._dimensions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributesView.prototype, "stride", {
        get: function () {
            return this._attributesBuffer.stride / this._size;
        },
        enumerable: true,
        configurable: true
    });
    AttributesView.prototype.set = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        this._attributesBuffer._setAttributes(this._index, (values instanceof Array) ? new (this._arrayClass)(values) : values, offset);
    };
    AttributesView.prototype.get = function (count, offset) {
        if (offset === void 0) { offset = 0; }
        return new (this._arrayClass)(this._attributesBuffer.buffer, offset * this._attributesBuffer.stride + this.offset, count * this.stride - this.offset / this.size);
    };
    AttributesView.prototype._internalClone = function (attributesBuffer) {
        return (this._cloneCache = new AttributesView(this._arrayClass, this._dimensions, attributesBuffer, this._unsigned));
    };
    AttributesView.prototype.clone = function (attributesBuffer) {
        if (attributesBuffer === void 0) { attributesBuffer = null; }
        if (attributesBuffer)
            this._internalClone(attributesBuffer);
        if (!this._cloneCache)
            this._attributesBuffer.clone();
        var cloneCache = this._cloneCache;
        this._cloneCache = null;
        return cloneCache;
    };
    /**
     * @inheritDoc
     */
    AttributesView.prototype.dispose = function () {
        if (!this._attributesBuffer)
            return;
        this._attributesBuffer._removeView(this);
        this._attributesBuffer = null;
    };
    AttributesView.assetType = "[attributes AttributesView]";
    return AttributesView;
}(AssetBase_1.AssetBase));
exports.AttributesView = AttributesView;
