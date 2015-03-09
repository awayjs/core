var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var SubGeometryEvent = require("awayjs-core/lib/events/SubGeometryEvent");
var NamedAssetBase = require("awayjs-core/lib/library/NamedAssetBase");
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
    Object.defineProperty(SubGeometryBase.prototype, "subGeometryType", {
        get: function () {
            throw new AbstractMethodError();
        },
        enumerable: true,
        configurable: true
    });
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
})(NamedAssetBase);
module.exports = SubGeometryBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9kYXRhL1N1Ykdlb21ldHJ5QmFzZS50cyJdLCJuYW1lcyI6WyJTdWJHZW9tZXRyeUJhc2UiLCJTdWJHZW9tZXRyeUJhc2UuY29uc3RydWN0b3IiLCJTdWJHZW9tZXRyeUJhc2UuX3BVcGRhdGVTdHJpZGVPZmZzZXQiLCJTdWJHZW9tZXRyeUJhc2Uuc3ViR2VvbWV0cnlUeXBlIiwiU3ViR2VvbWV0cnlCYXNlLmNvbmNhdGVuYXRlQXJyYXlzIiwiU3ViR2VvbWV0cnlCYXNlLmluZGljZXMiLCJTdWJHZW9tZXRyeUJhc2UudmVydGljZXMiLCJTdWJHZW9tZXRyeUJhc2UubnVtVHJpYW5nbGVzIiwiU3ViR2VvbWV0cnlCYXNlLm51bVZlcnRpY2VzIiwiU3ViR2VvbWV0cnlCYXNlLmdldFN0cmlkZSIsIlN1Ykdlb21ldHJ5QmFzZS5nZXRPZmZzZXQiLCJTdWJHZW9tZXRyeUJhc2UudXBkYXRlVmVydGljZXMiLCJTdWJHZW9tZXRyeUJhc2UuZGlzcG9zZSIsIlN1Ykdlb21ldHJ5QmFzZS51cGRhdGVJbmRpY2VzIiwiU3ViR2VvbWV0cnlCYXNlLnBJbnZhbGlkYXRlQm91bmRzIiwiU3ViR2VvbWV0cnlCYXNlLmNsb25lIiwiU3ViR2VvbWV0cnlCYXNlLmFwcGx5VHJhbnNmb3JtYXRpb24iLCJTdWJHZW9tZXRyeUJhc2Uuc2NhbGUiLCJTdWJHZW9tZXRyeUJhc2Uuc2NhbGVVViIsIlN1Ykdlb21ldHJ5QmFzZS5nZXRCb3VuZGluZ1Bvc2l0aW9ucyIsIlN1Ykdlb21ldHJ5QmFzZS5ub3RpZnlJbmRpY2VzVXBkYXRlIiwiU3ViR2VvbWV0cnlCYXNlLl9wTm90aWZ5VmVydGljZXNVcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sbUJBQW1CLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUNwRixJQUFPLGdCQUFnQixXQUFhLHlDQUF5QyxDQUFDLENBQUM7QUFHL0UsSUFBTyxjQUFjLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQUU1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TUEsSUFBSUEsbUJBQW1CQSxFQUFFQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFFT25CLDZDQUFtQkEsR0FBM0JBO1FBRUNvQixFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQTtZQUN6QkEsSUFBSUEsQ0FBQ0EsZUFBZUEsR0FBR0EsSUFBSUEsZ0JBQWdCQSxDQUFDQSxnQkFBZ0JBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO1FBRS9FQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTtJQUMxQ0EsQ0FBQ0E7SUFFTXBCLGdEQUFzQkEsR0FBN0JBO1FBRUNxQixNQUFNQSxJQUFJQSxtQkFBbUJBLEVBQUVBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQXpNYXJCLDJCQUFXQSxHQUFVQSxVQUFVQSxDQUFDQTtJQTBNL0NBLHNCQUFDQTtBQUFEQSxDQTVNQSxBQTRNQ0EsRUE1TTZCLGNBQWMsRUE0TTNDO0FBRUQsQUFBeUIsaUJBQWhCLGVBQWUsQ0FBQyIsImZpbGUiOiJkYXRhL1N1Ykdlb21ldHJ5QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2VvbWV0cnlcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvR2VvbWV0cnlcIik7XG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XG5pbXBvcnQgU3ViR2VvbWV0cnlFdmVudFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvU3ViR2VvbWV0cnlFdmVudFwiKTtcbmltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBSZWN0YW5nbGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1JlY3RhbmdsZVwiKTtcbmltcG9ydCBOYW1lZEFzc2V0QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xuXG4vKipcbiAqIEBjbGFzcyBhd2F5LmJhc2UuVHJpYW5nbGVTdWJHZW9tZXRyeVxuICovXG5jbGFzcyBTdWJHZW9tZXRyeUJhc2UgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZVxue1xuXHRwdWJsaWMgc3RhdGljIFZFUlRFWF9EQVRBOnN0cmluZyA9IFwidmVydGljZXNcIjtcblxuXHRwdWJsaWMgX3BTdHJpZGVPZmZzZXREaXJ0eTpib29sZWFuID0gdHJ1ZTtcblxuXHRwdWJsaWMgX3BJbmRpY2VzOkFycmF5PG51bWJlcj4gLyp1aW50Ki87XG5cdHB1YmxpYyBfcFZlcnRpY2VzOkFycmF5PG51bWJlcj47XG5cblx0cHJpdmF0ZSBfbnVtSW5kaWNlczpudW1iZXI7XG5cdHByaXZhdGUgX251bVRyaWFuZ2xlczpudW1iZXI7XG5cdHB1YmxpYyBfcE51bVZlcnRpY2VzOm51bWJlcjtcblxuXHRwdWJsaWMgX3BDb25jYXRlbmF0ZUFycmF5czpib29sZWFuID0gdHJ1ZTtcblxuXHRwcml2YXRlIF9pbmRpY2VzVXBkYXRlZDpTdWJHZW9tZXRyeUV2ZW50O1xuXG5cdHB1YmxpYyBfcFN0cmlkZTpPYmplY3QgPSBuZXcgT2JqZWN0KCk7XG5cdHB1YmxpYyBfcE9mZnNldDpPYmplY3QgPSBuZXcgT2JqZWN0KCk7XG5cblx0cHVibGljIF9wVXBkYXRlU3RyaWRlT2Zmc2V0KClcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHN1Ykdlb21ldHJ5VHlwZSgpOnN0cmluZ1xuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBjb25jYXRlbmF0ZUFycmF5cygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQ29uY2F0ZW5hdGVBcnJheXM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGNvbmNhdGVuYXRlQXJyYXlzKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fcENvbmNhdGVuYXRlQXJyYXlzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcENvbmNhdGVuYXRlQXJyYXlzID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKHZhbHVlKVxuXHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHJhdyBpbmRleCBkYXRhIHRoYXQgZGVmaW5lIHRoZSBmYWNlcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgaW5kaWNlcygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSW5kaWNlcztcblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICovXG5cdHB1YmxpYyBnZXQgdmVydGljZXMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHR0aGlzLnVwZGF0ZVZlcnRpY2VzKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcFZlcnRpY2VzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB0b3RhbCBhbW91bnQgb2YgdHJpYW5nbGVzIGluIHRoZSBUcmlhbmdsZVN1Ykdlb21ldHJ5LlxuXHQgKi9cblx0cHVibGljIGdldCBudW1UcmlhbmdsZXMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9udW1UcmlhbmdsZXM7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IG51bVZlcnRpY2VzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcE51bVZlcnRpY2VzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihjb25jYXRlbmF0ZWRBcnJheXM6Ym9vbGVhbilcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9wQ29uY2F0ZW5hdGVBcnJheXMgPSBjb25jYXRlbmF0ZWRBcnJheXM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXRTdHJpZGUoZGF0YVR5cGU6c3RyaW5nKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSlcblx0XHRcdHRoaXMuX3BVcGRhdGVTdHJpZGVPZmZzZXQoKTtcblxuXHRcdHJldHVybiB0aGlzLl9wU3RyaWRlW2RhdGFUeXBlXTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldE9mZnNldChkYXRhVHlwZTpzdHJpbmcpXG5cdHtcblx0XHRpZiAodGhpcy5fcFN0cmlkZU9mZnNldERpcnR5KVxuXHRcdFx0dGhpcy5fcFVwZGF0ZVN0cmlkZU9mZnNldCgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3BPZmZzZXRbZGF0YVR5cGVdO1xuXHR9XG5cblx0cHVibGljIHVwZGF0ZVZlcnRpY2VzKClcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHRoaXMuX3BJbmRpY2VzID0gbnVsbDtcblx0XHR0aGlzLl9wVmVydGljZXMgPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIGZhY2UgaW5kaWNlcyBvZiB0aGUgVHJpYW5nbGVTdWJHZW9tZXRyeS5cblx0ICpcblx0ICogQHBhcmFtIGluZGljZXMgVGhlIGZhY2UgaW5kaWNlcyB0byB1cGxvYWQuXG5cdCAqL1xuXHRwdWJsaWMgdXBkYXRlSW5kaWNlcyhpbmRpY2VzOkFycmF5PG51bWJlcj4pXG5cdHtcblx0XHR0aGlzLl9wSW5kaWNlcyA9IGluZGljZXM7XG5cdFx0dGhpcy5fbnVtSW5kaWNlcyA9IGluZGljZXMubGVuZ3RoO1xuXG5cdFx0dGhpcy5fbnVtVHJpYW5nbGVzID0gdGhpcy5fbnVtSW5kaWNlcy8zO1xuXG5cdFx0dGhpcy5ub3RpZnlJbmRpY2VzVXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBJbnZhbGlkYXRlQm91bmRzKClcblx0e1xuXHRcdGlmICh0aGlzLnBhcmVudEdlb21ldHJ5KVxuXHRcdFx0dGhpcy5wYXJlbnRHZW9tZXRyeS5pSW52YWxpZGF0ZUJvdW5kcyh0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgR2VvbWV0cnkgb2JqZWN0IHRoYXQgJ293bnMnIHRoaXMgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgcGFyZW50R2VvbWV0cnk6R2VvbWV0cnk7XG5cblx0LyoqXG5cdCAqIENsb25lcyB0aGUgY3VycmVudCBvYmplY3Rcblx0ICogQHJldHVybiBBbiBleGFjdCBkdXBsaWNhdGUgb2YgdGhlIGN1cnJlbnQgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6U3ViR2VvbWV0cnlCYXNlXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0cHVibGljIGFwcGx5VHJhbnNmb3JtYXRpb24odHJhbnNmb3JtOk1hdHJpeDNEKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBTY2FsZXMgdGhlIGdlb21ldHJ5LlxuXHQgKiBAcGFyYW0gc2NhbGUgVGhlIGFtb3VudCBieSB3aGljaCB0byBzY2FsZS5cblx0ICovXG5cdHB1YmxpYyBzY2FsZShzY2FsZTpudW1iZXIpXG5cdHtcblxuXHR9XG5cblx0cHVibGljIHNjYWxlVVYoc2NhbGVVOm51bWJlciA9IDEsIHNjYWxlVjpudW1iZXIgPSAxKVxuXHR7XG5cblx0fVxuXG5cdHB1YmxpYyBnZXRCb3VuZGluZ1Bvc2l0aW9ucygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwcml2YXRlIG5vdGlmeUluZGljZXNVcGRhdGUoKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9pbmRpY2VzVXBkYXRlZClcblx0XHRcdHRoaXMuX2luZGljZXNVcGRhdGVkID0gbmV3IFN1Ykdlb21ldHJ5RXZlbnQoU3ViR2VvbWV0cnlFdmVudC5JTkRJQ0VTX1VQREFURUQpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX2luZGljZXNVcGRhdGVkKTtcblx0fVxuXG5cdHB1YmxpYyBfcE5vdGlmeVZlcnRpY2VzVXBkYXRlKClcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gU3ViR2VvbWV0cnlCYXNlOyJdfQ==