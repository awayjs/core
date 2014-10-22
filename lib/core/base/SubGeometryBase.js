var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NamedAssetBase = require("awayjs-core/lib/core/library/NamedAssetBase");

var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var SubGeometryEvent = require("awayjs-core/lib/events/SubGeometryEvent");

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

    Object.defineProperty(SubGeometryBase.prototype, "subMeshClass", {
        get: function () {
            return this._pSubMeshClass;
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
        if (typeof scaleU === "undefined") { scaleU = 1; }
        if (typeof scaleV === "undefined") { scaleV = 1; }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvYmFzZS9TdWJHZW9tZXRyeUJhc2UudHMiXSwibmFtZXMiOlsiU3ViR2VvbWV0cnlCYXNlIiwiU3ViR2VvbWV0cnlCYXNlLmNvbnN0cnVjdG9yIiwiU3ViR2VvbWV0cnlCYXNlLl9wVXBkYXRlU3RyaWRlT2Zmc2V0IiwiU3ViR2VvbWV0cnlCYXNlLmdldFN0cmlkZSIsIlN1Ykdlb21ldHJ5QmFzZS5nZXRPZmZzZXQiLCJTdWJHZW9tZXRyeUJhc2UudXBkYXRlVmVydGljZXMiLCJTdWJHZW9tZXRyeUJhc2UuZGlzcG9zZSIsIlN1Ykdlb21ldHJ5QmFzZS51cGRhdGVJbmRpY2VzIiwiU3ViR2VvbWV0cnlCYXNlLnBJbnZhbGlkYXRlQm91bmRzIiwiU3ViR2VvbWV0cnlCYXNlLmNsb25lIiwiU3ViR2VvbWV0cnlCYXNlLmFwcGx5VHJhbnNmb3JtYXRpb24iLCJTdWJHZW9tZXRyeUJhc2Uuc2NhbGUiLCJTdWJHZW9tZXRyeUJhc2Uuc2NhbGVVViIsIlN1Ykdlb21ldHJ5QmFzZS5nZXRCb3VuZGluZ1Bvc2l0aW9ucyIsIlN1Ykdlb21ldHJ5QmFzZS5ub3RpZnlJbmRpY2VzVXBkYXRlIiwiU3ViR2VvbWV0cnlCYXNlLl9wTm90aWZ5VmVydGljZXNVcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJFQUVpRjs7QUFHakYsK0VBQW9GO0FBQ3BGLHlFQUErRTs7QUFFL0U7O0VBRUc7QUFDSDtJQUE4QkEsa0NBQWNBO0lBdUYzQ0E7O01BREdBO0lBQ0hBLHlCQUFZQSxrQkFBMEJBO1FBRXJDQyxXQUFNQSxLQUFBQSxDQUFDQTtRQXJGUkEsS0FBT0EsbUJBQW1CQSxHQUFXQSxJQUFJQSxDQUFDQTtRQVMxQ0EsS0FBT0EsbUJBQW1CQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUkxQ0EsS0FBT0EsUUFBUUEsR0FBVUEsSUFBSUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDdENBLEtBQU9BLFFBQVFBLEdBQVVBLElBQUlBLE1BQU1BLENBQUNBLENBQUNBLENB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Q0EsQ0FBQ0E7SUFDaENBLENBQUNBOztJQUVEVCxnREFBQUEsVUFBMkJBLFNBQWtCQTtJQUc3Q1UsQ0FBQ0E7O0lBTURWOzs7TUFER0E7c0NBQ0hBLFVBQWFBLEtBQVlBO0lBR3pCVyxDQUFDQTs7SUFFRFgsb0NBQUFBLFVBQWVBLE1BQWlCQSxFQUFFQSxNQUFpQkE7UUFBcENZLHFDQUFBQSxNQUFNQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFFQSxxQ0FBQUEsTUFBTUEsR0FBVUEsQ0FBQ0E7QUFBQUEsSUFHbkRBLENBQUNBOztJQUVEWixpREFBQUE7UUFFQ2EsTUFBTUEsSUFBSUEsbUJBQW1CQSxDQUFDQSxDQUFDQTtJQUNoQ0EsQ0FBQ0E7O0lBRURiLGdEQUFBQTtRQUVDYyxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxlQUFlQTtZQUN4QkEsSUFBSUEsQ0FBQ0EsZUFBZUEsR0FBR0EsSUFBSUEsZ0JBQWdCQSxDQUFDQSxnQkFBZ0JBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBOztRQUUvRUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0E7SUFDekNBLENBQUNBOztJQUVEZCxtREFBQUE7UUFFQ2UsTUFBTUEsSUFBSUEsbUJBQW1CQSxDQUFDQSxDQUFDQTtJQUNoQ0EsQ0FBQ0E7SUEzTURmLDhCQUFtQ0EsVUFBVUE7SUE0TTlDQSx1QkFBQ0E7QUFBREEsQ0FBQ0EsRUE5TTZCLGNBQWMsRUE4TTNDOztBQUVELGdDQUF5QixDQUFBIiwiZmlsZSI6ImNvcmUvYmFzZS9TdWJHZW9tZXRyeUJhc2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2VvbWV0cnlcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9HZW9tZXRyeVwiKTtcbmltcG9ydCBJU3ViTWVzaENsYXNzXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9JU3ViTWVzaENsYXNzXCIpO1xuaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcbmltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9nZW9tL01hdHJpeDNEXCIpO1xuaW1wb3J0IFJlY3RhbmdsZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9SZWN0YW5nbGVcIik7XG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XG5pbXBvcnQgU3ViR2VvbWV0cnlFdmVudFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvU3ViR2VvbWV0cnlFdmVudFwiKTtcblxuLyoqXG4gKiBAY2xhc3MgYXdheS5iYXNlLlRyaWFuZ2xlU3ViR2VvbWV0cnlcbiAqL1xuY2xhc3MgU3ViR2VvbWV0cnlCYXNlIGV4dGVuZHMgTmFtZWRBc3NldEJhc2Vcbntcblx0cHVibGljIHN0YXRpYyBWRVJURVhfREFUQTpzdHJpbmcgPSBcInZlcnRpY2VzXCI7XG5cblx0cHVibGljIF9wU3RyaWRlT2Zmc2V0RGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cblx0cHVibGljIF9wSW5kaWNlczpBcnJheTxudW1iZXI+IC8qdWludCovO1xuXHRwdWJsaWMgX3BWZXJ0aWNlczpBcnJheTxudW1iZXI+O1xuXG5cdHByaXZhdGUgX251bUluZGljZXM6bnVtYmVyO1xuXHRwcml2YXRlIF9udW1UcmlhbmdsZXM6bnVtYmVyO1xuXHRwdWJsaWMgX3BOdW1WZXJ0aWNlczpudW1iZXI7XG5cblx0cHVibGljIF9wQ29uY2F0ZW5hdGVBcnJheXM6Ym9vbGVhbiA9IHRydWU7XG5cblx0cHJpdmF0ZSBfaW5kaWNlc1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcblxuXHRwdWJsaWMgX3BTdHJpZGU6T2JqZWN0ID0gbmV3IE9iamVjdCgpO1xuXHRwdWJsaWMgX3BPZmZzZXQ6T2JqZWN0ID0gbmV3IE9iamVjdCgpO1xuXG5cdHB1YmxpYyBfcFVwZGF0ZVN0cmlkZU9mZnNldCgpXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0cHVibGljIF9wU3ViTWVzaENsYXNzOklTdWJNZXNoQ2xhc3M7XG5cblx0cHVibGljIGdldCBzdWJNZXNoQ2xhc3MoKTpJU3ViTWVzaENsYXNzXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFN1Yk1lc2hDbGFzcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBjb25jYXRlbmF0ZUFycmF5cygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQ29uY2F0ZW5hdGVBcnJheXM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGNvbmNhdGVuYXRlQXJyYXlzKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fcENvbmNhdGVuYXRlQXJyYXlzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcENvbmNhdGVuYXRlQXJyYXlzID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKHZhbHVlKVxuXHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHJhdyBpbmRleCBkYXRhIHRoYXQgZGVmaW5lIHRoZSBmYWNlcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgaW5kaWNlcygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSW5kaWNlcztcblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICovXG5cdHB1YmxpYyBnZXQgdmVydGljZXMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHR0aGlzLnVwZGF0ZVZlcnRpY2VzKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcFZlcnRpY2VzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB0b3RhbCBhbW91bnQgb2YgdHJpYW5nbGVzIGluIHRoZSBUcmlhbmdsZVN1Ykdlb21ldHJ5LlxuXHQgKi9cblx0cHVibGljIGdldCBudW1UcmlhbmdsZXMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9udW1UcmlhbmdsZXM7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IG51bVZlcnRpY2VzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcE51bVZlcnRpY2VzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihjb25jYXRlbmF0ZWRBcnJheXM6Ym9vbGVhbilcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9wQ29uY2F0ZW5hdGVBcnJheXMgPSBjb25jYXRlbmF0ZWRBcnJheXM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXRTdHJpZGUoZGF0YVR5cGU6c3RyaW5nKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSlcblx0XHRcdHRoaXMuX3BVcGRhdGVTdHJpZGVPZmZzZXQoKTtcblxuXHRcdHJldHVybiB0aGlzLl9wU3RyaWRlW2RhdGFUeXBlXTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldE9mZnNldChkYXRhVHlwZTpzdHJpbmcpXG5cdHtcblx0XHRpZiAodGhpcy5fcFN0cmlkZU9mZnNldERpcnR5KVxuXHRcdFx0dGhpcy5fcFVwZGF0ZVN0cmlkZU9mZnNldCgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3BPZmZzZXRbZGF0YVR5cGVdO1xuXHR9XG5cblx0cHVibGljIHVwZGF0ZVZlcnRpY2VzKClcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHRoaXMuX3BJbmRpY2VzID0gbnVsbDtcblx0XHR0aGlzLl9wVmVydGljZXMgPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIGZhY2UgaW5kaWNlcyBvZiB0aGUgVHJpYW5nbGVTdWJHZW9tZXRyeS5cblx0ICpcblx0ICogQHBhcmFtIGluZGljZXMgVGhlIGZhY2UgaW5kaWNlcyB0byB1cGxvYWQuXG5cdCAqL1xuXHRwdWJsaWMgdXBkYXRlSW5kaWNlcyhpbmRpY2VzOkFycmF5PG51bWJlcj4pXG5cdHtcblx0XHR0aGlzLl9wSW5kaWNlcyA9IGluZGljZXM7XG5cdFx0dGhpcy5fbnVtSW5kaWNlcyA9IGluZGljZXMubGVuZ3RoO1xuXG5cdFx0dGhpcy5fbnVtVHJpYW5nbGVzID0gdGhpcy5fbnVtSW5kaWNlcy8zO1xuXG5cdFx0dGhpcy5ub3RpZnlJbmRpY2VzVXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBJbnZhbGlkYXRlQm91bmRzKClcblx0e1xuXHRcdGlmICh0aGlzLnBhcmVudEdlb21ldHJ5KVxuXHRcdFx0dGhpcy5wYXJlbnRHZW9tZXRyeS5pSW52YWxpZGF0ZUJvdW5kcyh0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgR2VvbWV0cnkgb2JqZWN0IHRoYXQgJ293bnMnIHRoaXMgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgcGFyZW50R2VvbWV0cnk6R2VvbWV0cnk7XG5cblx0LyoqXG5cdCAqIENsb25lcyB0aGUgY3VycmVudCBvYmplY3Rcblx0ICogQHJldHVybiBBbiBleGFjdCBkdXBsaWNhdGUgb2YgdGhlIGN1cnJlbnQgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6U3ViR2VvbWV0cnlCYXNlXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0cHVibGljIGFwcGx5VHJhbnNmb3JtYXRpb24odHJhbnNmb3JtOk1hdHJpeDNEKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBTY2FsZXMgdGhlIGdlb21ldHJ5LlxuXHQgKiBAcGFyYW0gc2NhbGUgVGhlIGFtb3VudCBieSB3aGljaCB0byBzY2FsZS5cblx0ICovXG5cdHB1YmxpYyBzY2FsZShzY2FsZTpudW1iZXIpXG5cdHtcblxuXHR9XG5cblx0cHVibGljIHNjYWxlVVYoc2NhbGVVOm51bWJlciA9IDEsIHNjYWxlVjpudW1iZXIgPSAxKVxuXHR7XG5cblx0fVxuXG5cdHB1YmxpYyBnZXRCb3VuZGluZ1Bvc2l0aW9ucygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwcml2YXRlIG5vdGlmeUluZGljZXNVcGRhdGUoKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9pbmRpY2VzVXBkYXRlZClcblx0XHRcdHRoaXMuX2luZGljZXNVcGRhdGVkID0gbmV3IFN1Ykdlb21ldHJ5RXZlbnQoU3ViR2VvbWV0cnlFdmVudC5JTkRJQ0VTX1VQREFURUQpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX2luZGljZXNVcGRhdGVkKTtcblx0fVxuXG5cdHB1YmxpYyBfcE5vdGlmeVZlcnRpY2VzVXBkYXRlKClcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gU3ViR2VvbWV0cnlCYXNlOyJdfQ==