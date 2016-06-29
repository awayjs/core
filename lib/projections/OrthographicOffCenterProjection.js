"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Matrix3DUtils_1 = require("../geom/Matrix3DUtils");
var Vector3D_1 = require("../geom/Vector3D");
var ProjectionBase_1 = require("../projections/ProjectionBase");
var OrthographicOffCenterProjection = (function (_super) {
    __extends(OrthographicOffCenterProjection, _super);
    function OrthographicOffCenterProjection(minX, maxX, minY, maxY) {
        _super.call(this);
        this._minX = minX;
        this._maxX = maxX;
        this._minY = minY;
        this._maxY = maxY;
    }
    Object.defineProperty(OrthographicOffCenterProjection.prototype, "minX", {
        get: function () {
            return this._minX;
        },
        set: function (value) {
            this._minX = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrthographicOffCenterProjection.prototype, "maxX", {
        get: function () {
            return this._maxX;
        },
        set: function (value) {
            this._maxX = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrthographicOffCenterProjection.prototype, "minY", {
        get: function () {
            return this._minY;
        },
        set: function (value) {
            this._minY = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrthographicOffCenterProjection.prototype, "maxY", {
        get: function () {
            return this._maxY;
        },
        set: function (value) {
            this._maxY = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    //@override
    OrthographicOffCenterProjection.prototype.unproject = function (nX, nY, sZ) {
        var v = new Vector3D_1.Vector3D(nX, -nY, sZ, 1.0);
        v = this.unprojectionMatrix.transformVector(v);
        //z is unaffected by transform
        v.z = sZ;
        return v;
    };
    //@override
    OrthographicOffCenterProjection.prototype.clone = function () {
        var clone = new OrthographicOffCenterProjection(this._minX, this._maxX, this._minY, this._maxY);
        clone._pNear = this._pNear;
        clone._pFar = this._pFar;
        clone._pAspectRatio = this._pAspectRatio;
        return clone;
    };
    //@override
    OrthographicOffCenterProjection.prototype.pUpdateMatrix = function () {
        var raw = Matrix3DUtils_1.Matrix3DUtils.RAW_DATA_CONTAINER;
        var w = 1 / (this._maxX - this._minX);
        var h = 1 / (this._maxY - this._minY);
        var d = 1 / (this._pFar - this._pNear);
        raw[0] = 2 * w;
        raw[5] = 2 * h;
        raw[10] = d;
        raw[12] = -(this._maxX + this._minX) * w;
        raw[13] = -(this._maxY + this._minY) * h;
        raw[14] = -this._pNear * d;
        raw[15] = 1;
        raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[11] = 0;
        this._pMatrix.copyRawDataFrom(raw);
        this._pFrustumCorners[0] = this._pFrustumCorners[9] = this._pFrustumCorners[12] = this._pFrustumCorners[21] = this._minX;
        this._pFrustumCorners[3] = this._pFrustumCorners[6] = this._pFrustumCorners[15] = this._pFrustumCorners[18] = this._maxX;
        this._pFrustumCorners[1] = this._pFrustumCorners[4] = this._pFrustumCorners[13] = this._pFrustumCorners[16] = this._minY;
        this._pFrustumCorners[7] = this._pFrustumCorners[10] = this._pFrustumCorners[19] = this._pFrustumCorners[22] = this._maxY;
        this._pFrustumCorners[2] = this._pFrustumCorners[5] = this._pFrustumCorners[8] = this._pFrustumCorners[11] = this._pNear;
        this._pFrustumCorners[14] = this._pFrustumCorners[17] = this._pFrustumCorners[20] = this._pFrustumCorners[23] = this._pFar;
        this._pMatrixInvalid = false;
    };
    return OrthographicOffCenterProjection;
}(ProjectionBase_1.ProjectionBase));
exports.OrthographicOffCenterProjection = OrthographicOffCenterProjection;
