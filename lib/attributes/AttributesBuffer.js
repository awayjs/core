"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetBase_1 = require("../library/AssetBase");
var AttributesBuffer = (function (_super) {
    __extends(AttributesBuffer, _super);
    /**
     *
     */
    function AttributesBuffer(stride, count) {
        if (stride === void 0) { stride = 0; }
        if (count === void 0) { count = 0; }
        _super.call(this);
        this._count = 0;
        this._stride = 0;
        this._newStride = 0;
        this._viewVOs = new Array();
        this._stride = this._newStride = stride;
        this._count = count;
        this._buffer = new ArrayBuffer(this._stride * this._count);
        this._bufferView = new Uint8Array(this._buffer, 0, this._buffer.byteLength);
    }
    Object.defineProperty(AttributesBuffer.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return AttributesBuffer.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributesBuffer.prototype, "stride", {
        get: function () {
            if (this._lengthDirty)
                this._updateLength();
            return this._stride;
        },
        set: function (value) {
            if (this._newStride == value)
                return;
            this._newStride = value;
            this.resize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributesBuffer.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (value) {
            if (this._count == value)
                return;
            this._count = value;
            this.resize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributesBuffer.prototype, "buffer", {
        get: function () {
            if (this._lengthDirty)
                this._updateLength();
            this._contentDirty = false;
            return this._buffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributesBuffer.prototype, "bufferView", {
        get: function () {
            if (this._lengthDirty)
                this._updateLength();
            this._contentDirty = false;
            return this._bufferView;
        },
        set: function (value) {
            this._bufferView = value;
            this._buffer = this._bufferView.buffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributesBuffer.prototype, "length", {
        get: function () {
            return this._count * this.stride;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    AttributesBuffer.prototype.invalidate = function () {
        if (this._contentDirty)
            return;
        _super.prototype.invalidate.call(this);
        this._contentDirty = true;
    };
    /**
     *
     * @private
     */
    AttributesBuffer.prototype.resize = function () {
        if (this._lengthDirty)
            return;
        this.clear();
        this._lengthDirty = true;
        //dispose buffer if stride is 0
        if (!this._newStride) {
            this._buffer = null;
            this._bufferView = null;
        }
    };
    AttributesBuffer.prototype.clone = function () {
        var attributesBuffer = new AttributesBuffer(this._stride, this._count);
        attributesBuffer.bufferView.set(this.bufferView);
        var len = this._viewVOs.length;
        for (var i = 0; i < len; i++)
            this._viewVOs[i].view._internalClone(attributesBuffer);
        return attributesBuffer;
    };
    AttributesBuffer.prototype.getView = function (index) {
        if (index < this._viewVOs.length)
            return this._viewVOs[index].view;
        return null;
    };
    AttributesBuffer.prototype._setAttributes = function (viewIndex, arrayBufferView, offset) {
        if (offset === void 0) { offset = 0; }
        var array = (arrayBufferView instanceof Uint8Array) ? arrayBufferView : new Uint8Array(arrayBufferView.buffer);
        var viewVO = this._viewVOs[viewIndex];
        var vLength = viewVO.length;
        var vOffset = viewVO.offset;
        var vCount = array.length / vLength;
        //make sure there is enough space in the buffer
        if (this.count < vCount + offset)
            this.count = vCount + offset;
        if (this._lengthDirty)
            this._updateLength();
        //fast path for separate buffers
        if (this._viewVOs.length == 1) {
            this._bufferView.set(array);
        }
        else {
            for (var i = 0; i < vCount; i++)
                this._bufferView.set(array.subarray(i * vLength, (i + 1) * vLength), (i + offset) * this._stride + vOffset);
        }
        this.invalidate();
    };
    AttributesBuffer.prototype._addView = function (view) {
        var viewVO = new ViewVO(view);
        var len = this._viewVOs.length;
        viewVO.offset = len ? this._viewVOs[len - 1].offset + this._viewVOs[len - 1].length : 0;
        this._viewVOs.push(viewVO);
        if (this._newStride < viewVO.offset + viewVO.length) {
            this._newStride = viewVO.offset + viewVO.length;
            this.resize();
        }
        view._index = len;
    };
    AttributesBuffer.prototype._removeView = function (view) {
        var viewIndex = view._index;
        var viewVO = this._viewVOs.splice(viewIndex, 1)[0];
        var len = this._viewVOs.length;
        viewVO.dispose();
        for (var i = viewIndex; i < len; i++) {
            viewVO = this._viewVOs[i];
            viewVO.offset = i ? this._viewVOs[i - 1].offset + this._viewVOs[i - 1].length : 0;
            viewVO.view._index = i;
        }
        this._newStride = viewVO.offset + viewVO.length;
        this.resize();
    };
    AttributesBuffer.prototype._getOffset = function (viewIndex) {
        return this._viewVOs[viewIndex].offset;
    };
    AttributesBuffer.prototype._updateLength = function () {
        this._lengthDirty = false;
        var i;
        var j;
        var len = this._viewVOs.length;
        var newLength = this._newStride * this._count;
        if (!this._buffer || this._buffer.byteLength != newLength) {
            var newBuffer = new ArrayBuffer(newLength);
            var newView = new Uint8Array(newBuffer, 0, newBuffer.byteLength);
            var viewVO;
            var vLength;
            var vOffset;
            var vOldOffset;
            if (this._stride != this._newStride) {
                for (i = 0; i < len; i++) {
                    viewVO = this._viewVOs[i];
                    vLength = viewVO.length;
                    vOffset = viewVO.offset;
                    vOldOffset = viewVO.oldOffset;
                    for (j = 0; j < this._count; j++)
                        if (vOldOffset != null)
                            newView.set(new Uint8Array(this._buffer, j * this._stride + vOldOffset, vLength), j * this._newStride + vOffset);
                    viewVO.oldOffset = viewVO.offset;
                }
                this._stride = this._newStride;
            }
            else {
                newView.set(new Uint8Array(this._buffer, 0, Math.min(newLength, this._buffer.byteLength))); //TODO: bypass quantisation of bytearray on instantiation
            }
            this._buffer = newBuffer;
            this._bufferView = newView;
        }
    };
    AttributesBuffer.assetType = "[assets AttributesBuffer]";
    return AttributesBuffer;
}(AssetBase_1.AssetBase));
exports.AttributesBuffer = AttributesBuffer;
var ViewVO = (function () {
    function ViewVO(view) {
        this.view = view;
        this.length = view.size * view.dimensions;
    }
    ViewVO.prototype.dispose = function () {
        this.view = null;
    };
    ViewVO.prototype.clone = function () {
        return new ViewVO(this.view);
    };
    return ViewVO;
}());
