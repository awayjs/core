"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Matrix3DUtils_1 = require("../geom/Matrix3DUtils");
var Vector3D_1 = require("../geom/Vector3D");
var CoordinateSystem_1 = require("../projections/CoordinateSystem");
var ProjectionBase_1 = require("../projections/ProjectionBase");
var PerspectiveProjection = (function (_super) {
    __extends(PerspectiveProjection, _super);
    function PerspectiveProjection(fieldOfView, coordinateSystem) {
        if (fieldOfView === void 0) { fieldOfView = 60; }
        if (coordinateSystem === void 0) { coordinateSystem = "leftHanded"; }
        _super.call(this, coordinateSystem);
        this._fieldOfView = 60;
        this._focalLength = 1000;
        this._hFieldOfView = 60;
        this._hFocalLength = 1000;
        this._preserveAspectRatio = true;
        this._preserveFocalLength = false;
        this.fieldOfView = fieldOfView;
    }
    Object.defineProperty(PerspectiveProjection.prototype, "preserveAspectRatio", {
        /**
         *
         */
        get: function () {
            return this._preserveAspectRatio;
        },
        set: function (value) {
            if (this._preserveAspectRatio == value)
                return;
            this._preserveAspectRatio = value;
            if (this._preserveAspectRatio)
                this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerspectiveProjection.prototype, "preserveFocalLength", {
        /**
         *
         */
        get: function () {
            return this._preserveFocalLength;
        },
        set: function (value) {
            if (this._preserveFocalLength == value)
                return;
            this._preserveFocalLength = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerspectiveProjection.prototype, "fieldOfView", {
        /**
         *
         */
        get: function () {
            return this._fieldOfView;
        },
        set: function (value) {
            if (this._fieldOfView == value)
                return;
            this._fieldOfView = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerspectiveProjection.prototype, "focalLength", {
        /**
         *
         */
        get: function () {
            return this._focalLength;
        },
        set: function (value) {
            if (this._focalLength == value)
                return;
            this._focalLength = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerspectiveProjection.prototype, "hFieldOfView", {
        /**
         *
         */
        get: function () {
            return this._hFieldOfView;
        },
        set: function (value) {
            if (this._hFieldOfView == value)
                return;
            this._hFieldOfView = value;
            this._hFocalLength = 1 / Math.tan(this._hFieldOfView * Math.PI / 360);
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerspectiveProjection.prototype, "hFocalLength", {
        /**
         *
         */
        get: function () {
            return this._hFocalLength;
        },
        set: function (value) {
            if (this._hFocalLength == value)
                return;
            this._hFocalLength = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    //@override
    PerspectiveProjection.prototype.unproject = function (nX, nY, sZ) {
        var v = new Vector3D_1.Vector3D(nX, -nY, sZ, 1.0);
        v.x *= sZ;
        v.y *= sZ;
        v = this.unprojectionMatrix.transformVector(v);
        //z is unaffected by transform
        v.z = sZ;
        return v;
    };
    //@override
    PerspectiveProjection.prototype.clone = function () {
        var clone = new PerspectiveProjection(this._fieldOfView);
        clone._pNear = this._pNear;
        clone._pFar = this._pFar;
        clone._pAspectRatio = this._pAspectRatio;
        clone._pCoordinateSystem = this._pCoordinateSystem;
        return clone;
    };
    //@override
    PerspectiveProjection.prototype.pUpdateMatrix = function () {
        var raw = Matrix3DUtils_1.Matrix3DUtils.RAW_DATA_CONTAINER;
        if (this._preserveFocalLength) {
            if (this._preserveAspectRatio)
                this._hFocalLength = this._focalLength;
            this._fieldOfView = Math.atan(0.5 * this._pScissorRect.height / this._focalLength) * 360 / Math.PI;
            this._hFieldOfView = Math.atan(0.5 * this._pScissorRect.width / this._hFocalLength) * 360 / Math.PI;
        }
        else {
            this._focalLength = 0.5 * this._pScissorRect.height / Math.tan(this._fieldOfView * Math.PI / 360);
            if (this._preserveAspectRatio)
                this._hFocalLength = this._focalLength;
            else
                this._hFocalLength = 0.5 * this._pScissorRect.width / Math.tan(this._hFieldOfView * Math.PI / 360);
        }
        var tanMinX = -this._pOriginX / this._hFocalLength;
        var tanMaxX = (1 - this._pOriginX) / this._hFocalLength;
        var tanMinY = -this._pOriginY / this._focalLength;
        var tanMaxY = (1 - this._pOriginY) / this._focalLength;
        var left;
        var right;
        var top;
        var bottom;
        // assume scissored frustum
        var center = -((tanMinX - tanMaxX) * this._pScissorRect.x + tanMinX * this._pScissorRect.width);
        var middle = ((tanMinY - tanMaxY) * this._pScissorRect.y + tanMinY * this._pScissorRect.height);
        left = center - (tanMaxX - tanMinX) * this._pViewPort.width;
        right = center;
        top = middle;
        bottom = middle + (tanMaxY - tanMinY) * this._pViewPort.height;
        raw[0] = 2 / (right - left);
        raw[5] = 2 / (bottom - top);
        raw[8] = (right + left) / (right - left);
        raw[9] = (bottom + top) / (bottom - top);
        raw[10] = (this._pFar + this._pNear) / (this._pFar - this._pNear);
        raw[11] = 1;
        raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[12] = raw[13] = raw[15] = 0;
        raw[14] = -2 * this._pFar * this._pNear / (this._pFar - this._pNear);
        if (this._pCoordinateSystem == CoordinateSystem_1.CoordinateSystem.RIGHT_HANDED)
            raw[5] = -raw[5];
        this._pMatrix.copyRawDataFrom(raw);
        this._pFrustumCorners[0] = this._pFrustumCorners[9] = this._pNear * left;
        this._pFrustumCorners[3] = this._pFrustumCorners[6] = this._pNear * right;
        this._pFrustumCorners[1] = this._pFrustumCorners[4] = this._pNear * top;
        this._pFrustumCorners[7] = this._pFrustumCorners[10] = this._pNear * bottom;
        this._pFrustumCorners[12] = this._pFrustumCorners[21] = this._pFar * left;
        this._pFrustumCorners[15] = this._pFrustumCorners[18] = this._pFar * right;
        this._pFrustumCorners[13] = this._pFrustumCorners[16] = this._pFar * top;
        this._pFrustumCorners[19] = this._pFrustumCorners[22] = this._pFar * bottom;
        this._pFrustumCorners[2] = this._pFrustumCorners[5] = this._pFrustumCorners[8] = this._pFrustumCorners[11] = this._pNear;
        this._pFrustumCorners[14] = this._pFrustumCorners[17] = this._pFrustumCorners[20] = this._pFrustumCorners[23] = this._pFar;
        this._pMatrixInvalid = false;
    };
    return PerspectiveProjection;
}(ProjectionBase_1.ProjectionBase));
exports.PerspectiveProjection = PerspectiveProjection;
