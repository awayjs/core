var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Geometry = require("awayjs-core/lib/core/base/Geometry");

var TriangleSubGeometry = require("awayjs-core/lib/core/base/TriangleSubGeometry");
var LineSubGeometry = require("awayjs-core/lib/core/base/LineSubGeometry");
var AssetType = require("awayjs-core/lib/core/library/AssetType");
var Mesh = require("awayjs-core/lib/entities/Mesh");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");

var PrefabBase = require("awayjs-core/lib/prefabs/PrefabBase");

/**
* PrimitivePrefabBase is an abstract base class for polytope prefabs, which are simple pre-built geometric shapes
*/
var PrimitivePrefabBase = (function (_super) {
    __extends(PrimitivePrefabBase, _super);
    /**
    * Creates a new PrimitivePrefabBase object.
    *
    * @param material The material with which to render the object
    */
    function PrimitivePrefabBase(material, geometryType) {
        if (typeof material === "undefined") { material = null; }
        if (typeof geometryType === "undefined") { geometryType = "triangleSubGeometry"; }
        _super.call(this);
        this._geomDirty = true;
        this._uvDirty = true;
        this._geometryTypeDirty = true;

        this._geometry = new Geometry();
        this._material = material;
        this._geometryType = geometryType;
    }
    Object.defineProperty(PrimitivePrefabBase.prototype, "assetType", {
        /**
        *
        */
        get: function () {
            return AssetType.PRIMITIVE_PREFAB;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(PrimitivePrefabBase.prototype, "geometryType", {
        /**
        *
        */
        get: function () {
            return this._geometryType;
        },
        set: function (value) {
            if (this._geometryType == value)
                return;

            this._geometryType = value;

            this.invalidateGeometryType();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitivePrefabBase.prototype, "geometry", {
        get: function () {
            this._iValidate();

            return this._geometry;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(PrimitivePrefabBase.prototype, "material", {
        /**
        * The material with which to render the primitive.
        */
        get: function () {
            return this._material;
        },
        set: function (value) {
            if (value == this._material)
                return;

            this._material = value;

            var len = this._pObjects.length;
            for (var i = 0; i < len; i++)
                this._pObjects[i].material = this._material;
        },
        enumerable: true,
        configurable: true
    });


    /**
    * Builds the primitive's geometry when invalid. This method should not be called directly. The calling should
    * be triggered by the invalidateGeometry method (and in turn by updateGeometry).
    */
    PrimitivePrefabBase.prototype._pBuildGeometry = function (target, geometryType) {
        throw new AbstractMethodError();
    };

    /**
    * Builds the primitive's uv coordinates when invalid. This method should not be called directly. The calling
    * should be triggered by the invalidateUVs method (and in turn by updateUVs).
    */
    PrimitivePrefabBase.prototype._pBuildUVs = function (target, geometryType) {
        throw new AbstractMethodError();
    };

    /**
    * Invalidates the primitive's geometry type, causing it to be updated when requested.
    */
    PrimitivePrefabBase.prototype.invalidateGeometryType = function () {
        this._geometryTypeDirty = true;
        this._geomDirty = true;
        this._uvDirty = true;
    };

    /**
    * Invalidates the primitive's geometry, causing it to be updated when requested.
    */
    PrimitivePrefabBase.prototype._pInvalidateGeometry = function () {
        this._geomDirty = true;
    };

    /**
    * Invalidates the primitive's uv coordinates, causing them to be updated when requested.
    */
    PrimitivePrefabBase.prototype._pInvalidateUVs = function () {
        this._uvDirty = true;
    };

    /**
    * Updates the subgeometry when invalid.
    */
    PrimitivePrefabBase.prototype.updateGeometryType = function () {
        //remove any existing sub geometry
        if (this._subGeometry)
            this._geometry.removeSubGeometry(this._subGeometry);

        if (this._geometryType == "triangleSubGeometry") {
            var triangleGeometry = new TriangleSubGeometry(true);
            triangleGeometry.autoDeriveNormals = false;
            triangleGeometry.autoDeriveTangents = false;
            triangleGeometry.autoDeriveUVs = false;
            this._geometry.addSubGeometry(triangleGeometry);
            this._subGeometry = triangleGeometry;
        } else if (this._geometryType == "lineSubGeometry") {
            this._geometry.addSubGeometry(this._subGeometry = new LineSubGeometry());
        }

        this._geometryTypeDirty = false;
    };

    /**
    * Updates the geometry when invalid.
    */
    PrimitivePrefabBase.prototype.updateGeometry = function () {
        this._pBuildGeometry(this._subGeometry, this._geometryType);

        this._geomDirty = false;
    };

    /**
    * Updates the uv coordinates when invalid.
    */
    PrimitivePrefabBase.prototype.updateUVs = function () {
        this._pBuildUVs(this._subGeometry, this._geometryType);

        this._uvDirty = false;
    };

    PrimitivePrefabBase.prototype._iValidate = function () {
        if (this._geometryTypeDirty)
            this.updateGeometryType();

        if (this._geomDirty)
            this.updateGeometry();

        if (this._uvDirty)
            this.updateUVs();
    };

    PrimitivePrefabBase.prototype._pCreateObject = function () {
        var mesh = new Mesh(this._geometry, this._material);
        mesh._iSourcePrefab = this;

        return mesh;
    };
    return PrimitivePrefabBase;
})(PrefabBase);

module.exports = PrimitivePrefabBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZWZhYnMvUHJpbWl0aXZlUHJlZmFiQmFzZS50cyJdLCJuYW1lcyI6WyJQcmltaXRpdmVQcmVmYWJCYXNlIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS5jb25zdHJ1Y3RvciIsIlByaW1pdGl2ZVByZWZhYkJhc2UuX3BCdWlsZEdlb21ldHJ5IiwiUHJpbWl0aXZlUHJlZmFiQmFzZS5fcEJ1aWxkVVZzIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS5pbnZhbGlkYXRlR2VvbWV0cnlUeXBlIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS5fcEludmFsaWRhdGVHZW9tZXRyeSIsIlByaW1pdGl2ZVByZWZhYkJhc2UuX3BJbnZhbGlkYXRlVVZzIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS51cGRhdGVHZW9tZXRyeVR5cGUiLCJQcmltaXRpdmVQcmVmYWJCYXNlLnVwZGF0ZUdlb21ldHJ5IiwiUHJpbWl0aXZlUHJlZmFiQmFzZS51cGRhdGVVVnMiLCJQcmltaXRpdmVQcmVmYWJCYXNlLl9pVmFsaWRhdGUiLCJQcmltaXRpdmVQcmVmYWJCYXNlLl9wQ3JlYXRlT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0REFDb0U7O0FBRXBFLGtGQUF1RjtBQUN2RiwwRUFBZ0Y7QUFDaEYsaUVBQXdFO0FBQ3hFLG1EQUE0RDtBQUM1RCwrRUFBb0Y7O0FBRXBGLDhEQUFxRTs7QUFFckU7O0VBRUc7QUFDSDtJQUFrQ0Esc0NBQVVBO0lBc0UzQ0E7Ozs7TUFER0E7SUFDSEEsNkJBQVlBLFFBQTRCQSxFQUFFQSxZQUEyQ0E7UUFBekVDLHVDQUFBQSxRQUFRQSxHQUFnQkEsSUFBSUE7QUFBQUEsUUFBRUEsMkNBQUFBLFlBQVlBLEdBQVVBLHFCQUFxQkE7QUFBQUEsUUFFcEZBLFdBQU1BLEtBQUFBLENBQUNBO1FBdEVSQSxLQUFPQSxVQUFVQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUNqQ0EsS0FBT0EsUUFBUUEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFNL0JBLEtBQVFBLGtCQUFrQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7O1FBaUV6Q0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDL0JBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFFBQVFBO1FBQ3pCQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxZQUFZQTtJQUNsQ0EsQ0FBQ0E7SUE5REREO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxTQUFTQSxDQUFDQSxnQkFBZ0JBO1FBQ2xDQSxDQUFDQTs7OztBQUFBQTtJQUtEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsYUFBYUE7UUFDMUJBLENBQUNBO1FBRURBLEtBQUFBLFVBQXdCQSxLQUFZQTtZQUVuQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsS0FBS0E7Z0JBQzlCQSxNQUFPQSxDQUFBQTs7WUFFUkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsS0FBS0E7O1lBRTFCQSxJQUFJQSxDQUFDQSxzQkFBc0JBLENBQUNBLENBQUNBO1FBQzlCQSxDQUFDQTs7OztBQVZBQTs7SUFZREE7UUFBQUEsS0FBQUE7WUFFQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7O1lBRWpCQSxPQUFPQSxJQUFJQSxDQUFDQSxTQUFTQTtRQUN0QkEsQ0FBQ0E7Ozs7QUFBQUE7SUFLREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFNBQVNBO1FBQ3RCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUFvQkEsS0FBa0JBO1lBRXJDQSxJQUFJQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxTQUFTQTtnQkFDMUJBLE1BQU9BLENBQUFBOztZQUVSQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxLQUFLQTs7WUFFdEJBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BO1lBQ3RDQSxLQUFLQSxJQUFJQSxDQUFDQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQTtnQkFDbENBLElBQVlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUVBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO1FBQ3ZEQSxDQUFDQTs7OztBQVpBQTs7SUFnQ0RBOzs7TUFER0E7b0RBQ0hBLFVBQXVCQSxNQUFzQkEsRUFBRUEsWUFBbUJBO1FBRWpFRSxNQUFNQSxJQUFJQSxtQkFBbUJBLENBQUNBLENBQUNBO0lBQ2hDQSxDQUFDQTs7SUFNREY7OztNQURHQTsrQ0FDSEEsVUFBa0JBLE1BQXNCQSxFQUFFQSxZQUFtQkE7UUFFNURHLE1BQU1BLElBQUlBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7SUFDaENBLENBQUNBOztJQUtESDs7TUFER0E7MkRBQ0hBO1FBRUNJLElBQUlBLENBQUNBLGtCQUFrQkEsR0FBR0EsSUFBSUE7UUFDOUJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBO1FBQ3RCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQTtJQUNyQkEsQ0FBQ0E7O0lBS0RKOztNQURHQTt5REFDSEE7UUFFQ0ssSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUE7SUFDdkJBLENBQUNBOztJQUtETDs7TUFER0E7b0RBQ0hBO1FBRUNNLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBO0lBQ3JCQSxDQUFDQTs7SUFLRE47O01BREdBO3VEQUNIQTtRQUVDTyxrQ0FBa0NBO1FBQ2xDQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQTtZQUNwQkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTs7UUFFckRBLElBQUlBLElBQUlBLENBQUNBLGFBQWFBLElBQUlBLHFCQUFxQkEsQ0FBRUE7WUFDaERBLElBQUlBLGdCQUFnQkEsR0FBdUJBLElBQUlBLG1CQUFtQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDeEVBLGdCQUFnQkEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxLQUFLQTtZQUMxQ0EsZ0JBQWdCQSxDQUFDQSxrQkFBa0JBLEdBQUdBLEtBQUtBO1lBQzNDQSxnQkFBZ0JBLENBQUNBLGFBQWFBLEdBQUdBLEtBQUtBO1lBQ3RDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxjQUFjQSxDQUFDQSxnQkFBZ0JBLENBQUNBO1lBQy9DQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxnQkFBZ0JBO1NBQ3BDQSxNQUFNQSxJQUFJQSxJQUFJQSxDQUFDQSxhQUFhQSxJQUFJQSxpQkFBaUJBLENBQUVBO1lBQ25EQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxlQUFlQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUN4RUE7O1FBRURBLElBQUlBLENBQUNBLGtCQUFrQkEsR0FBR0EsS0FBS0E7SUFDaENBLENBQUNBOztJQU1EUDs7TUFER0E7bURBQ0hBO1FBRUNRLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLEVBQUVBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBOztRQUUzREEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsS0FBS0E7SUFDeEJBLENBQUNBOztJQUtEUjs7TUFER0E7OENBQ0hBO1FBRUNTLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLEVBQUVBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBOztRQUV0REEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsS0FBS0E7SUFDdEJBLENBQUNBOztJQUVEVCwyQ0FBQUE7UUFFQ1UsSUFBSUEsSUFBSUEsQ0FBQ0Esa0JBQWtCQTtZQUMxQkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxDQUFDQTs7UUFFM0JBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBO1lBQ2xCQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQTs7UUFFdkJBLElBQUlBLElBQUlBLENBQUNBLFFBQVFBO1lBQ2hCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNuQkEsQ0FBQ0E7O0lBR0RWLCtDQUFBQTtRQUVDVyxJQUFJQSxJQUFJQSxHQUFRQSxJQUFJQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUN4REEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUE7O1FBRTFCQSxPQUFPQSxJQUFJQTtJQUNaQSxDQUFDQTtJQVVGWCwyQkFBQ0E7QUFBREEsQ0FBQ0EsRUFwTWlDLFVBQVUsRUFvTTNDOztBQUVELG9DQUE2QixDQUFBIiwiZmlsZSI6InByZWZhYnMvUHJpbWl0aXZlUHJlZmFiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuaW1wb3J0IEdlb21ldHJ5XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvR2VvbWV0cnlcIik7XG5pbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9TdWJHZW9tZXRyeUJhc2VcIik7XG5pbXBvcnQgVHJpYW5nbGVTdWJHZW9tZXRyeVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL1RyaWFuZ2xlU3ViR2VvbWV0cnlcIik7XG5pbXBvcnQgTGluZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9MaW5lU3ViR2VvbWV0cnlcIik7XG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcbmltcG9ydCBNZXNoXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL01lc2hcIik7XG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XG5pbXBvcnQgTWF0ZXJpYWxCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcbmltcG9ydCBQcmVmYWJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcHJlZmFicy9QcmVmYWJCYXNlXCIpO1xuXG4vKipcbiAqIFByaW1pdGl2ZVByZWZhYkJhc2UgaXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzcyBmb3IgcG9seXRvcGUgcHJlZmFicywgd2hpY2ggYXJlIHNpbXBsZSBwcmUtYnVpbHQgZ2VvbWV0cmljIHNoYXBlc1xuICovXG5jbGFzcyBQcmltaXRpdmVQcmVmYWJCYXNlIGV4dGVuZHMgUHJlZmFiQmFzZVxue1xuXHRwdWJsaWMgX2dlb21EaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHVibGljIF91dkRpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXG5cdHByaXZhdGUgX21hdGVyaWFsOk1hdGVyaWFsQmFzZTtcblx0cHJpdmF0ZSBfZ2VvbWV0cnk6R2VvbWV0cnk7XG5cdHByaXZhdGUgX3N1Ykdlb21ldHJ5OlN1Ykdlb21ldHJ5QmFzZTtcblx0cHJpdmF0ZSBfZ2VvbWV0cnlUeXBlOnN0cmluZztcblx0cHJpdmF0ZSBfZ2VvbWV0cnlUeXBlRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLlBSSU1JVElWRV9QUkVGQUI7XG5cdH1cblxuXHQvKipcblx0ICogXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGdlb21ldHJ5VHlwZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2dlb21ldHJ5VHlwZTtcblx0fVxuXHRcblx0cHVibGljIHNldCBnZW9tZXRyeVR5cGUodmFsdWU6c3RyaW5nKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2dlb21ldHJ5VHlwZSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2dlb21ldHJ5VHlwZSA9IHZhbHVlO1xuXHRcdFxuXHRcdHRoaXMuaW52YWxpZGF0ZUdlb21ldHJ5VHlwZSgpO1xuXHR9XG5cblx0cHVibGljIGdldCBnZW9tZXRyeSgpOkdlb21ldHJ5XG5cdHtcblx0XHR0aGlzLl9pVmFsaWRhdGUoKTtcblxuXHRcdHJldHVybiB0aGlzLl9nZW9tZXRyeTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbWF0ZXJpYWwgd2l0aCB3aGljaCB0byByZW5kZXIgdGhlIHByaW1pdGl2ZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgbWF0ZXJpYWwoKTpNYXRlcmlhbEJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9tYXRlcmlhbDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbWF0ZXJpYWwodmFsdWU6TWF0ZXJpYWxCYXNlKVxuXHR7XG5cdFx0aWYgKHZhbHVlID09IHRoaXMuX21hdGVyaWFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fbWF0ZXJpYWwgPSB2YWx1ZTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcE9iamVjdHMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0KDxNZXNoPiB0aGlzLl9wT2JqZWN0c1tpXSkubWF0ZXJpYWwgPSB0aGlzLl9tYXRlcmlhbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IFByaW1pdGl2ZVByZWZhYkJhc2Ugb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gbWF0ZXJpYWwgVGhlIG1hdGVyaWFsIHdpdGggd2hpY2ggdG8gcmVuZGVyIHRoZSBvYmplY3Rcblx0ICovXG5cdGNvbnN0cnVjdG9yKG1hdGVyaWFsOk1hdGVyaWFsQmFzZSA9IG51bGwsIGdlb21ldHJ5VHlwZTpzdHJpbmcgPSBcInRyaWFuZ2xlU3ViR2VvbWV0cnlcIilcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9nZW9tZXRyeSA9IG5ldyBHZW9tZXRyeSgpO1xuXHRcdHRoaXMuX21hdGVyaWFsID0gbWF0ZXJpYWw7XG5cdFx0dGhpcy5fZ2VvbWV0cnlUeXBlID0gZ2VvbWV0cnlUeXBlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkcyB0aGUgcHJpbWl0aXZlJ3MgZ2VvbWV0cnkgd2hlbiBpbnZhbGlkLiBUaGlzIG1ldGhvZCBzaG91bGQgbm90IGJlIGNhbGxlZCBkaXJlY3RseS4gVGhlIGNhbGxpbmcgc2hvdWxkXG5cdCAqIGJlIHRyaWdnZXJlZCBieSB0aGUgaW52YWxpZGF0ZUdlb21ldHJ5IG1ldGhvZCAoYW5kIGluIHR1cm4gYnkgdXBkYXRlR2VvbWV0cnkpLlxuXHQgKi9cblx0cHVibGljIF9wQnVpbGRHZW9tZXRyeSh0YXJnZXQ6U3ViR2VvbWV0cnlCYXNlLCBnZW9tZXRyeVR5cGU6c3RyaW5nKVxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBCdWlsZHMgdGhlIHByaW1pdGl2ZSdzIHV2IGNvb3JkaW5hdGVzIHdoZW4gaW52YWxpZC4gVGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBiZSBjYWxsZWQgZGlyZWN0bHkuIFRoZSBjYWxsaW5nXG5cdCAqIHNob3VsZCBiZSB0cmlnZ2VyZWQgYnkgdGhlIGludmFsaWRhdGVVVnMgbWV0aG9kIChhbmQgaW4gdHVybiBieSB1cGRhdGVVVnMpLlxuXHQgKi9cblx0cHVibGljIF9wQnVpbGRVVnModGFyZ2V0OlN1Ykdlb21ldHJ5QmFzZSwgZ2VvbWV0cnlUeXBlOnN0cmluZylcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW52YWxpZGF0ZXMgdGhlIHByaW1pdGl2ZSdzIGdlb21ldHJ5IHR5cGUsIGNhdXNpbmcgaXQgdG8gYmUgdXBkYXRlZCB3aGVuIHJlcXVlc3RlZC5cblx0ICovXG5cdHB1YmxpYyBpbnZhbGlkYXRlR2VvbWV0cnlUeXBlKClcblx0e1xuXHRcdHRoaXMuX2dlb21ldHJ5VHlwZURpcnR5ID0gdHJ1ZTtcblx0XHR0aGlzLl9nZW9tRGlydHkgPSB0cnVlO1xuXHRcdHRoaXMuX3V2RGlydHkgPSB0cnVlO1xuXHR9XG5cdFxuXHQvKipcblx0ICogSW52YWxpZGF0ZXMgdGhlIHByaW1pdGl2ZSdzIGdlb21ldHJ5LCBjYXVzaW5nIGl0IHRvIGJlIHVwZGF0ZWQgd2hlbiByZXF1ZXN0ZWQuXG5cdCAqL1xuXHRwdWJsaWMgX3BJbnZhbGlkYXRlR2VvbWV0cnkoKVxuXHR7XG5cdFx0dGhpcy5fZ2VvbURpcnR5ID0gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbnZhbGlkYXRlcyB0aGUgcHJpbWl0aXZlJ3MgdXYgY29vcmRpbmF0ZXMsIGNhdXNpbmcgdGhlbSB0byBiZSB1cGRhdGVkIHdoZW4gcmVxdWVzdGVkLlxuXHQgKi9cblx0cHVibGljIF9wSW52YWxpZGF0ZVVWcygpXG5cdHtcblx0XHR0aGlzLl91dkRpcnR5ID0gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSBzdWJnZW9tZXRyeSB3aGVuIGludmFsaWQuXG5cdCAqL1xuXHRwcml2YXRlIHVwZGF0ZUdlb21ldHJ5VHlwZSgpXG5cdHtcblx0XHQvL3JlbW92ZSBhbnkgZXhpc3Rpbmcgc3ViIGdlb21ldHJ5XG5cdFx0aWYgKHRoaXMuX3N1Ykdlb21ldHJ5KVxuXHRcdFx0dGhpcy5fZ2VvbWV0cnkucmVtb3ZlU3ViR2VvbWV0cnkodGhpcy5fc3ViR2VvbWV0cnkpO1xuXG5cdFx0aWYgKHRoaXMuX2dlb21ldHJ5VHlwZSA9PSBcInRyaWFuZ2xlU3ViR2VvbWV0cnlcIikge1xuXHRcdFx0dmFyIHRyaWFuZ2xlR2VvbWV0cnk6VHJpYW5nbGVTdWJHZW9tZXRyeSA9IG5ldyBUcmlhbmdsZVN1Ykdlb21ldHJ5KHRydWUpO1xuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS5hdXRvRGVyaXZlTm9ybWFscyA9IGZhbHNlO1xuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS5hdXRvRGVyaXZlVGFuZ2VudHMgPSBmYWxzZTtcblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkuYXV0b0Rlcml2ZVVWcyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5fZ2VvbWV0cnkuYWRkU3ViR2VvbWV0cnkodHJpYW5nbGVHZW9tZXRyeSk7XG5cdFx0XHR0aGlzLl9zdWJHZW9tZXRyeSA9IHRyaWFuZ2xlR2VvbWV0cnk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLl9nZW9tZXRyeVR5cGUgPT0gXCJsaW5lU3ViR2VvbWV0cnlcIikge1xuXHRcdFx0dGhpcy5fZ2VvbWV0cnkuYWRkU3ViR2VvbWV0cnkodGhpcy5fc3ViR2VvbWV0cnkgPSBuZXcgTGluZVN1Ykdlb21ldHJ5KCkpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2dlb21ldHJ5VHlwZURpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHRcblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIGdlb21ldHJ5IHdoZW4gaW52YWxpZC5cblx0ICovXG5cdHByaXZhdGUgdXBkYXRlR2VvbWV0cnkoKVxuXHR7XG5cdFx0dGhpcy5fcEJ1aWxkR2VvbWV0cnkodGhpcy5fc3ViR2VvbWV0cnksIHRoaXMuX2dlb21ldHJ5VHlwZSk7XG5cblx0XHR0aGlzLl9nZW9tRGlydHkgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSB1diBjb29yZGluYXRlcyB3aGVuIGludmFsaWQuXG5cdCAqL1xuXHRwcml2YXRlIHVwZGF0ZVVWcygpXG5cdHtcblx0XHR0aGlzLl9wQnVpbGRVVnModGhpcy5fc3ViR2VvbWV0cnksIHRoaXMuX2dlb21ldHJ5VHlwZSk7XG5cblx0XHR0aGlzLl91dkRpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgX2lWYWxpZGF0ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fZ2VvbWV0cnlUeXBlRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZUdlb21ldHJ5VHlwZSgpO1xuXHRcdFxuXHRcdGlmICh0aGlzLl9nZW9tRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZUdlb21ldHJ5KCk7XG5cblx0XHRpZiAodGhpcy5fdXZEaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlVVZzKCk7XG5cdH1cblxuXG5cdHB1YmxpYyBfcENyZWF0ZU9iamVjdCgpOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHZhciBtZXNoOk1lc2ggPSBuZXcgTWVzaCh0aGlzLl9nZW9tZXRyeSwgdGhpcy5fbWF0ZXJpYWwpO1xuXHRcdG1lc2guX2lTb3VyY2VQcmVmYWIgPSB0aGlzO1xuXG5cdFx0cmV0dXJuIG1lc2g7XG5cdH1cblxuXG4vL1x0XHRwdWJsaWMgX3BDcmVhdGVCYXRjaE9iamVjdCgpOkJhdGNoT2JqZWN0XG4vL1x0XHR7XG4vL1x0XHRcdHZhciBiYXRjaDpCYXRjaE9iamVjdCA9IG5ldyBCYXRjaE9iamVjdCh0aGlzLl9nZW9tZXRyeSwgdGhpcy5fbWF0ZXJpYWwpO1xuLy9cdFx0XHRiYXRjaC5faVNvdXJjZVByZWZhYiA9IHRoaXM7XG4vL1xuLy9cdFx0XHRyZXR1cm4gYmF0Y2g7XG4vL1x0XHR9XG59XG5cbmV4cG9ydCA9IFByaW1pdGl2ZVByZWZhYkJhc2U7Il19