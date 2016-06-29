"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Matrix3D_1 = require("../geom/Matrix3D");
var Rectangle_1 = require("../geom/Rectangle");
var EventDispatcher_1 = require("../events/EventDispatcher");
var ProjectionEvent_1 = require("../events/ProjectionEvent");
var AbstractMethodError_1 = require("../errors/AbstractMethodError");
var ProjectionBase = (function (_super) {
    __extends(ProjectionBase, _super);
    function ProjectionBase(coordinateSystem) {
        if (coordinateSystem === void 0) { coordinateSystem = "leftHanded"; }
        _super.call(this);
        this._pMatrix = new Matrix3D_1.Matrix3D();
        this._pScissorRect = new Rectangle_1.Rectangle();
        this._pViewPort = new Rectangle_1.Rectangle();
        this._pNear = 20;
        this._pFar = 3000;
        this._pAspectRatio = 1;
        this._pMatrixInvalid = true;
        this._pFrustumCorners = [];
        this._pOriginX = 0.5;
        this._pOriginY = 0.5;
        this._unprojectionInvalid = true;
        this.coordinateSystem = coordinateSystem;
    }
    Object.defineProperty(ProjectionBase.prototype, "coordinateSystem", {
        /**
         * The handedness of the coordinate system projection. The default is LEFT_HANDED.
         */
        get: function () {
            return this._pCoordinateSystem;
        },
        set: function (value) {
            if (this._pCoordinateSystem == value)
                return;
            this._pCoordinateSystem = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectionBase.prototype, "frustumCorners", {
        get: function () {
            return this._pFrustumCorners;
        },
        set: function (frustumCorners) {
            this._pFrustumCorners = frustumCorners;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectionBase.prototype, "matrix", {
        get: function () {
            if (this._pMatrixInvalid) {
                this.pUpdateMatrix();
                this._pMatrixInvalid = false;
            }
            return this._pMatrix;
        },
        set: function (value) {
            this._pMatrix = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectionBase.prototype, "near", {
        get: function () {
            return this._pNear;
        },
        set: function (value) {
            if (value == this._pNear) {
                return;
            }
            this._pNear = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectionBase.prototype, "originX", {
        get: function () {
            return this._pOriginX;
        },
        set: function (value) {
            if (this._pOriginX == value)
                return;
            this._pOriginX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectionBase.prototype, "originY", {
        get: function () {
            return this._pOriginY;
        },
        set: function (value) {
            if (this._pOriginY == value)
                return;
            this._pOriginY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectionBase.prototype, "far", {
        get: function () {
            return this._pFar;
        },
        set: function (value) {
            if (value == this._pFar) {
                return;
            }
            this._pFar = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    ProjectionBase.prototype.project = function (point3d) {
        var v = this.matrix.transformVector(point3d);
        v.x = v.x / v.w;
        v.y = -v.y / v.w;
        //z is unaffected by transform
        v.z = point3d.z;
        return v;
    };
    Object.defineProperty(ProjectionBase.prototype, "unprojectionMatrix", {
        get: function () {
            if (this._unprojectionInvalid) {
                if (!this._unprojection)
                    this._unprojection = new Matrix3D_1.Matrix3D();
                this._unprojection.copyFrom(this.matrix);
                this._unprojection.invert();
                this._unprojectionInvalid = false;
            }
            return this._unprojection;
        },
        enumerable: true,
        configurable: true
    });
    ProjectionBase.prototype.unproject = function (nX, nY, sZ) {
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    ProjectionBase.prototype.clone = function () {
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    Object.defineProperty(ProjectionBase.prototype, "_iAspectRatio", {
        get: function () {
            return this._pAspectRatio;
        },
        set: function (value) {
            if (this._pAspectRatio == value)
                return;
            this._pAspectRatio = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    ProjectionBase.prototype.pInvalidateMatrix = function () {
        this._pMatrixInvalid = true;
        this._unprojectionInvalid = true;
        this.dispatchEvent(new ProjectionEvent_1.ProjectionEvent(ProjectionEvent_1.ProjectionEvent.MATRIX_CHANGED, this));
    };
    ProjectionBase.prototype.pUpdateMatrix = function () {
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    ProjectionBase.prototype._iUpdateScissorRect = function (x, y, width, height) {
        this._pScissorRect.x = x;
        this._pScissorRect.y = y;
        this._pScissorRect.width = width;
        this._pScissorRect.height = height;
        this.pInvalidateMatrix();
    };
    ProjectionBase.prototype._iUpdateViewport = function (x, y, width, height) {
        this._pViewPort.x = x;
        this._pViewPort.y = y;
        this._pViewPort.width = width;
        this._pViewPort.height = height;
        this.pInvalidateMatrix();
    };
    return ProjectionBase;
}(EventDispatcher_1.EventDispatcher));
exports.ProjectionBase = ProjectionBase;
