"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Vector3D_1 = require("../geom/Vector3D");
var ProjectionEvent_1 = require("../events/ProjectionEvent");
var ProjectionBase_1 = require("../projections/ProjectionBase");
var ObliqueNearPlaneProjection = (function (_super) {
    __extends(ObliqueNearPlaneProjection, _super);
    function ObliqueNearPlaneProjection(baseProjection, plane) {
        var _this = this;
        _super.call(this);
        this.baseProjection = baseProjection;
        this.plane = plane;
        this._onProjectionMatrixChangedDelegate = function (event) { return _this.onProjectionMatrixChanged(event); };
    }
    Object.defineProperty(ObliqueNearPlaneProjection.prototype, "frustumCorners", {
        //@override
        get: function () {
            return this._baseProjection.frustumCorners;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObliqueNearPlaneProjection.prototype, "near", {
        //@override
        get: function () {
            return this._baseProjection.near;
        },
        //@override
        set: function (value) {
            this._baseProjection.near = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObliqueNearPlaneProjection.prototype, "far", {
        //@override
        get: function () {
            return this._baseProjection.far;
        },
        //@override
        set: function (value) {
            this._baseProjection.far = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObliqueNearPlaneProjection.prototype, "iAspectRatio", {
        //@override
        get: function () {
            return this._baseProjection._iAspectRatio;
        },
        //@override
        set: function (value) {
            this._baseProjection._iAspectRatio = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObliqueNearPlaneProjection.prototype, "plane", {
        get: function () {
            return this._plane;
        },
        set: function (value) {
            this._plane = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObliqueNearPlaneProjection.prototype, "baseProjection", {
        set: function (value) {
            if (this._baseProjection) {
                this._baseProjection.removeEventListener(ProjectionEvent_1.ProjectionEvent.MATRIX_CHANGED, this._onProjectionMatrixChangedDelegate);
            }
            this._baseProjection = value;
            if (this._baseProjection) {
                this._baseProjection.addEventListener(ProjectionEvent_1.ProjectionEvent.MATRIX_CHANGED, this._onProjectionMatrixChangedDelegate);
            }
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    ObliqueNearPlaneProjection.prototype.onProjectionMatrixChanged = function (event) {
        this.pInvalidateMatrix();
    };
    //@override
    ObliqueNearPlaneProjection.prototype.pUpdateMatrix = function () {
        this._pMatrix.copyFrom(this._baseProjection.matrix);
        var cx = this._plane.a;
        var cy = this._plane.b;
        var cz = this._plane.c;
        var cw = -this._plane.d + .05;
        var signX = cx >= 0 ? 1 : -1;
        var signY = cy >= 0 ? 1 : -1;
        var p = new Vector3D_1.Vector3D(signX, signY, 1, 1);
        var inverse = this._pMatrix.clone();
        inverse.invert();
        var q = inverse.transformVector(p);
        this._pMatrix.copyRowTo(3, p);
        var a = (q.x * p.x + q.y * p.y + q.z * p.z + q.w * p.w) / (cx * q.x + cy * q.y + cz * q.z + cw * q.w);
        this._pMatrix.copyRowFrom(2, new Vector3D_1.Vector3D(cx * a, cy * a, cz * a, cw * a));
    };
    return ObliqueNearPlaneProjection;
}(ProjectionBase_1.ProjectionBase));
exports.ObliqueNearPlaneProjection = ObliqueNearPlaneProjection;
