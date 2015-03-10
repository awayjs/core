var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var SubGeometryEvent = require("awayjs-core/lib/events/SubGeometryEvent");
var AssetBase = require("awayjs-core/lib/library/AssetBase");
/**
 * @class away.base.TriangleSubGeometry
 */
var SubGeometryBase = (function (_super) {
    __extends(SubGeometryBase, _super);
    /**
     *
     */
    function SubGeometryBase(concatenatedArrays) {
        _super.call(this);
        this._pStrideOffsetDirty = true;
        this._pConcatenateArrays = true;
        this._pStride = new Object();
        this._pOffset = new Object();
        this._pConcatenateArrays = concatenatedArrays;
    }
    SubGeometryBase.prototype._pUpdateStrideOffset = function () {
        throw new AbstractMethodError();
    };
    Object.defineProperty(SubGeometryBase.prototype, "concatenateArrays", {
        /**
         *
         */
        get: function () {
            return this._pConcatenateArrays;
        },
        set: function (value) {
            if (this._pConcatenateArrays == value)
                return;
            this._pConcatenateArrays = value;
            this._pStrideOffsetDirty = true;
            if (value)
                this._pNotifyVerticesUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubGeometryBase.prototype, "indices", {
        /**
         * The raw index data that define the faces.
         */
        get: function () {
            return this._pIndices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubGeometryBase.prototype, "vertices", {
        /**
         *
         */
        get: function () {
            this.updateVertices();
            return this._pVertices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubGeometryBase.prototype, "numTriangles", {
        /**
         * The total amount of triangles in the TriangleSubGeometry.
         */
        get: function () {
            return this._numTriangles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubGeometryBase.prototype, "numVertices", {
        get: function () {
            return this._pNumVertices;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    SubGeometryBase.prototype.getStride = function (dataType) {
        if (this._pStrideOffsetDirty)
            this._pUpdateStrideOffset();
        return this._pStride[dataType];
    };
    /**
     *
     */
    SubGeometryBase.prototype.getOffset = function (dataType) {
        if (this._pStrideOffsetDirty)
            this._pUpdateStrideOffset();
        return this._pOffset[dataType];
    };
    SubGeometryBase.prototype.updateVertices = function () {
        throw new AbstractMethodError();
    };
    /**
     *
     */
    SubGeometryBase.prototype.dispose = function () {
        this._pIndices = null;
        this._pVertices = null;
    };
    /**
     * Updates the face indices of the TriangleSubGeometry.
     *
     * @param indices The face indices to upload.
     */
    SubGeometryBase.prototype.updateIndices = function (indices) {
        this._pIndices = indices;
        this._numIndices = indices.length;
        this._numTriangles = this._numIndices / 3;
        this.notifyIndicesUpdate();
    };
    /**
     * @protected
     */
    SubGeometryBase.prototype.pInvalidateBounds = function () {
        if (this.parentGeometry)
            this.parentGeometry.iInvalidateBounds(this);
    };
    /**
     * Clones the current object
     * @return An exact duplicate of the current object.
     */
    SubGeometryBase.prototype.clone = function () {
        throw new AbstractMethodError();
    };
    SubGeometryBase.prototype.applyTransformation = function (transform) {
    };
    /**
     * Scales the geometry.
     * @param scale The amount by which to scale.
     */
    SubGeometryBase.prototype.scale = function (scale) {
    };
    SubGeometryBase.prototype.scaleUV = function (scaleU, scaleV) {
        if (scaleU === void 0) { scaleU = 1; }
        if (scaleV === void 0) { scaleV = 1; }
    };
    SubGeometryBase.prototype.getBoundingPositions = function () {
        throw new AbstractMethodError();
    };
    SubGeometryBase.prototype.notifyIndicesUpdate = function () {
        if (!this._indicesUpdated)
            this._indicesUpdated = new SubGeometryEvent(SubGeometryEvent.INDICES_UPDATED);
        this.dispatchEvent(this._indicesUpdated);
    };
    SubGeometryBase.prototype._pNotifyVerticesUpdate = function () {
        throw new AbstractMethodError();
    };
    SubGeometryBase.VERTEX_DATA = "vertices";
    return SubGeometryBase;
})(AssetBase);
module.exports = SubGeometryBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9kYXRhL1N1Ykdlb21ldHJ5QmFzZS50cyJdLCJuYW1lcyI6WyJTdWJHZW9tZXRyeUJhc2UiLCJTdWJHZW9tZXRyeUJhc2UuY29uc3RydWN0b3IiLCJTdWJHZW9tZXRyeUJhc2UuX3BVcGRhdGVTdHJpZGVPZmZzZXQiLCJTdWJHZW9tZXRyeUJhc2UuY29uY2F0ZW5hdGVBcnJheXMiLCJTdWJHZW9tZXRyeUJhc2UuaW5kaWNlcyIsIlN1Ykdlb21ldHJ5QmFzZS52ZXJ0aWNlcyIsIlN1Ykdlb21ldHJ5QmFzZS5udW1UcmlhbmdsZXMiLCJTdWJHZW9tZXRyeUJhc2UubnVtVmVydGljZXMiLCJTdWJHZW9tZXRyeUJhc2UuZ2V0U3RyaWRlIiwiU3ViR2VvbWV0cnlCYXNlLmdldE9mZnNldCIsIlN1Ykdlb21ldHJ5QmFzZS51cGRhdGVWZXJ0aWNlcyIsIlN1Ykdlb21ldHJ5QmFzZS5kaXNwb3NlIiwiU3ViR2VvbWV0cnlCYXNlLnVwZGF0ZUluZGljZXMiLCJTdWJHZW9tZXRyeUJhc2UucEludmFsaWRhdGVCb3VuZHMiLCJTdWJHZW9tZXRyeUJhc2UuY2xvbmUiLCJTdWJHZW9tZXRyeUJhc2UuYXBwbHlUcmFuc2Zvcm1hdGlvbiIsIlN1Ykdlb21ldHJ5QmFzZS5zY2FsZSIsIlN1Ykdlb21ldHJ5QmFzZS5zY2FsZVVWIiwiU3ViR2VvbWV0cnlCYXNlLmdldEJvdW5kaW5nUG9zaXRpb25zIiwiU3ViR2VvbWV0cnlCYXNlLm5vdGlmeUluZGljZXNVcGRhdGUiLCJTdWJHZW9tZXRyeUJhc2UuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxtQkFBbUIsV0FBWSw0Q0FBNEMsQ0FBQyxDQUFDO0FBQ3BGLElBQU8sZ0JBQWdCLFdBQWEseUNBQXlDLENBQUMsQ0FBQztBQUcvRSxJQUFPLFNBQVMsV0FBYyxtQ0FBbUMsQ0FBQyxDQUFDO0FBRW5FLEFBR0E7O0dBREc7SUFDRyxlQUFlO0lBQVNBLFVBQXhC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ekJBLElBQUlBLENBQUNBLGVBQWVBLEdBQUdBLElBQUlBLGdCQUFnQkEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTtRQUUvRUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7SUFDMUNBLENBQUNBO0lBRU1uQixnREFBc0JBLEdBQTdCQTtRQUVDb0IsTUFBTUEsSUFBSUEsbUJBQW1CQSxFQUFFQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFwTWFwQiwyQkFBV0EsR0FBVUEsVUFBVUEsQ0FBQ0E7SUFxTS9DQSxzQkFBQ0E7QUFBREEsQ0F2TUEsQUF1TUNBLEVBdk02QixTQUFTLEVBdU10QztBQUVELEFBQXlCLGlCQUFoQixlQUFlLENBQUMiLCJmaWxlIjoiZGF0YS9TdWJHZW9tZXRyeUJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdlb21ldHJ5XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0dlb21ldHJ5XCIpO1xuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xuaW1wb3J0IFN1Ykdlb21ldHJ5RXZlbnRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL1N1Ykdlb21ldHJ5RXZlbnRcIik7XG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgUmVjdGFuZ2xlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9SZWN0YW5nbGVcIik7XG5pbXBvcnQgQXNzZXRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldEJhc2VcIik7XG5cbi8qKlxuICogQGNsYXNzIGF3YXkuYmFzZS5UcmlhbmdsZVN1Ykdlb21ldHJ5XG4gKi9cbmNsYXNzIFN1Ykdlb21ldHJ5QmFzZSBleHRlbmRzIEFzc2V0QmFzZVxue1xuXHRwdWJsaWMgc3RhdGljIFZFUlRFWF9EQVRBOnN0cmluZyA9IFwidmVydGljZXNcIjtcblxuXHRwdWJsaWMgX3BTdHJpZGVPZmZzZXREaXJ0eTpib29sZWFuID0gdHJ1ZTtcblxuXHRwdWJsaWMgX3BJbmRpY2VzOkFycmF5PG51bWJlcj4gLyp1aW50Ki87XG5cdHB1YmxpYyBfcFZlcnRpY2VzOkFycmF5PG51bWJlcj47XG5cblx0cHJpdmF0ZSBfbnVtSW5kaWNlczpudW1iZXI7XG5cdHByaXZhdGUgX251bVRyaWFuZ2xlczpudW1iZXI7XG5cdHB1YmxpYyBfcE51bVZlcnRpY2VzOm51bWJlcjtcblxuXHRwdWJsaWMgX3BDb25jYXRlbmF0ZUFycmF5czpib29sZWFuID0gdHJ1ZTtcblxuXHRwcml2YXRlIF9pbmRpY2VzVXBkYXRlZDpTdWJHZW9tZXRyeUV2ZW50O1xuXG5cdHB1YmxpYyBfcFN0cmlkZTpPYmplY3QgPSBuZXcgT2JqZWN0KCk7XG5cdHB1YmxpYyBfcE9mZnNldDpPYmplY3QgPSBuZXcgT2JqZWN0KCk7XG5cblx0cHVibGljIF9wVXBkYXRlU3RyaWRlT2Zmc2V0KClcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgY29uY2F0ZW5hdGVBcnJheXMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcENvbmNhdGVuYXRlQXJyYXlzO1xuXHR9XG5cblx0cHVibGljIHNldCBjb25jYXRlbmF0ZUFycmF5cyh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BDb25jYXRlbmF0ZUFycmF5cyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BDb25jYXRlbmF0ZUFycmF5cyA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gdHJ1ZTtcblxuXHRcdGlmICh2YWx1ZSlcblx0XHRcdHRoaXMuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSByYXcgaW5kZXggZGF0YSB0aGF0IGRlZmluZSB0aGUgZmFjZXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGluZGljZXMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEluZGljZXM7XG5cdH1cblxuXHQvKipcblx0ICogXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHZlcnRpY2VzKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0dGhpcy51cGRhdGVWZXJ0aWNlcygpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3BWZXJ0aWNlcztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgdG90YWwgYW1vdW50IG9mIHRyaWFuZ2xlcyBpbiB0aGUgVHJpYW5nbGVTdWJHZW9tZXRyeS5cblx0ICovXG5cdHB1YmxpYyBnZXQgbnVtVHJpYW5nbGVzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbnVtVHJpYW5nbGVzO1xuXHR9XG5cblx0cHVibGljIGdldCBudW1WZXJ0aWNlcygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BOdW1WZXJ0aWNlcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0Y29uc3RydWN0b3IoY29uY2F0ZW5hdGVkQXJyYXlzOmJvb2xlYW4pXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fcENvbmNhdGVuYXRlQXJyYXlzID0gY29uY2F0ZW5hdGVkQXJyYXlzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0U3RyaWRlKGRhdGFUeXBlOnN0cmluZylcblx0e1xuXHRcdGlmICh0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkpXG5cdFx0XHR0aGlzLl9wVXBkYXRlU3RyaWRlT2Zmc2V0KCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcFN0cmlkZVtkYXRhVHlwZV07XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXRPZmZzZXQoZGF0YVR5cGU6c3RyaW5nKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSlcblx0XHRcdHRoaXMuX3BVcGRhdGVTdHJpZGVPZmZzZXQoKTtcblxuXHRcdHJldHVybiB0aGlzLl9wT2Zmc2V0W2RhdGFUeXBlXTtcblx0fVxuXG5cdHB1YmxpYyB1cGRhdGVWZXJ0aWNlcygpXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHR0aGlzLl9wSW5kaWNlcyA9IG51bGw7XG5cdFx0dGhpcy5fcFZlcnRpY2VzID0gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSBmYWNlIGluZGljZXMgb2YgdGhlIFRyaWFuZ2xlU3ViR2VvbWV0cnkuXG5cdCAqXG5cdCAqIEBwYXJhbSBpbmRpY2VzIFRoZSBmYWNlIGluZGljZXMgdG8gdXBsb2FkLlxuXHQgKi9cblx0cHVibGljIHVwZGF0ZUluZGljZXMoaW5kaWNlczpBcnJheTxudW1iZXI+KVxuXHR7XG5cdFx0dGhpcy5fcEluZGljZXMgPSBpbmRpY2VzO1xuXHRcdHRoaXMuX251bUluZGljZXMgPSBpbmRpY2VzLmxlbmd0aDtcblxuXHRcdHRoaXMuX251bVRyaWFuZ2xlcyA9IHRoaXMuX251bUluZGljZXMvMztcblxuXHRcdHRoaXMubm90aWZ5SW5kaWNlc1VwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBwSW52YWxpZGF0ZUJvdW5kcygpXG5cdHtcblx0XHRpZiAodGhpcy5wYXJlbnRHZW9tZXRyeSlcblx0XHRcdHRoaXMucGFyZW50R2VvbWV0cnkuaUludmFsaWRhdGVCb3VuZHModGhpcyk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIEdlb21ldHJ5IG9iamVjdCB0aGF0ICdvd25zJyB0aGlzIFRyaWFuZ2xlU3ViR2VvbWV0cnkgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHVibGljIHBhcmVudEdlb21ldHJ5Okdlb21ldHJ5O1xuXG5cdC8qKlxuXHQgKiBDbG9uZXMgdGhlIGN1cnJlbnQgb2JqZWN0XG5cdCAqIEByZXR1cm4gQW4gZXhhY3QgZHVwbGljYXRlIG9mIHRoZSBjdXJyZW50IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOlN1Ykdlb21ldHJ5QmFzZVxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdHB1YmxpYyBhcHBseVRyYW5zZm9ybWF0aW9uKHRyYW5zZm9ybTpNYXRyaXgzRClcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogU2NhbGVzIHRoZSBnZW9tZXRyeS5cblx0ICogQHBhcmFtIHNjYWxlIFRoZSBhbW91bnQgYnkgd2hpY2ggdG8gc2NhbGUuXG5cdCAqL1xuXHRwdWJsaWMgc2NhbGUoc2NhbGU6bnVtYmVyKVxuXHR7XG5cblx0fVxuXG5cdHB1YmxpYyBzY2FsZVVWKHNjYWxlVTpudW1iZXIgPSAxLCBzY2FsZVY6bnVtYmVyID0gMSlcblx0e1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0Qm91bmRpbmdQb3NpdGlvbnMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0cHJpdmF0ZSBub3RpZnlJbmRpY2VzVXBkYXRlKClcblx0e1xuXHRcdGlmICghdGhpcy5faW5kaWNlc1VwZGF0ZWQpXG5cdFx0XHR0aGlzLl9pbmRpY2VzVXBkYXRlZCA9IG5ldyBTdWJHZW9tZXRyeUV2ZW50KFN1Ykdlb21ldHJ5RXZlbnQuSU5ESUNFU19VUERBVEVEKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9pbmRpY2VzVXBkYXRlZCk7XG5cdH1cblxuXHRwdWJsaWMgX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG59XG5cbmV4cG9ydCA9IFN1Ykdlb21ldHJ5QmFzZTsiXX0=