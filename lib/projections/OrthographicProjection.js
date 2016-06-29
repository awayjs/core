"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Matrix3DUtils_1 = require("../geom/Matrix3DUtils");
var Vector3D_1 = require("../geom/Vector3D");
var ProjectionBase_1 = require("../projections/ProjectionBase");
var OrthographicProjection = (function (_super) {
    __extends(OrthographicProjection, _super);
    function OrthographicProjection(projectionHeight) {
        if (projectionHeight === void 0) { projectionHeight = 500; }
        _super.call(this);
        this._projectionHeight = projectionHeight;
    }
    Object.defineProperty(OrthographicProjection.prototype, "projectionHeight", {
        get: function () {
            return this._projectionHeight;
        },
        set: function (value) {
            if (value == this._projectionHeight) {
                return;
            }
            this._projectionHeight = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    //@override
    OrthographicProjection.prototype.unproject = function (nX, nY, sZ) {
        var v = new Vector3D_1.Vector3D(nX + this.matrix.rawData[12], -nY + this.matrix.rawData[13], sZ, 1.0);
        v = this.unprojectionMatrix.transformVector(v);
        //z is unaffected by transform
        v.z = sZ;
        return v;
    };
    //@override
    OrthographicProjection.prototype.clone = function () {
        var clone = new OrthographicProjection();
        clone._pNear = this._pNear;
        clone._pFar = this._pFar;
        clone._pAspectRatio = this._pAspectRatio;
        clone.projectionHeight = this._projectionHeight;
        return clone;
    };
    //@override
    OrthographicProjection.prototype.pUpdateMatrix = function () {
        var raw = Matrix3DUtils_1.Matrix3DUtils.RAW_DATA_CONTAINER;
        this._yMax = this._projectionHeight * .5;
        this._xMax = this._yMax * this._pAspectRatio;
        var left;
        var right;
        var top;
        var bottom;
        if (this._pScissorRect.x == 0 && this._pScissorRect.y == 0 && this._pScissorRect.width == this._pViewPort.width && this._pScissorRect.height == this._pViewPort.height) {
            // assume symmetric frustum
            left = -this._xMax;
            right = this._xMax;
            top = -this._yMax;
            bottom = this._yMax;
            raw[0] = 2 / (this._projectionHeight * this._pAspectRatio);
            raw[5] = 2 / this._projectionHeight;
            raw[10] = 1 / (this._pFar - this._pNear);
            raw[14] = this._pNear / (this._pNear - this._pFar);
            raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[11] = raw[12] = raw[13] = 0;
            raw[15] = 1;
        }
        else {
            var xWidth = this._xMax * (this._pViewPort.width / this._pScissorRect.width);
            var yHgt = this._yMax * (this._pViewPort.height / this._pScissorRect.height);
            var center = this._xMax * (this._pScissorRect.x * 2 - this._pViewPort.width) / this._pScissorRect.width + this._xMax;
            var middle = -this._yMax * (this._pScissorRect.y * 2 - this._pViewPort.height) / this._pScissorRect.height - this._yMax;
            left = center - xWidth;
            right = center + xWidth;
            top = middle - yHgt;
            bottom = middle + yHgt;
            raw[0] = 2 * 1 / (right - left);
            raw[5] = -2 * 1 / (top - bottom);
            raw[10] = 1 / (this._pFar - this._pNear);
            raw[12] = (right + left) / (right - left);
            raw[13] = (bottom + top) / (bottom - top);
            raw[14] = this._pNear / (this.near - this.far);
            raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[11] = 0;
            raw[15] = 1;
        }
        this._pFrustumCorners[0] = this._pFrustumCorners[9] = this._pFrustumCorners[12] = this._pFrustumCorners[21] = left;
        this._pFrustumCorners[3] = this._pFrustumCorners[6] = this._pFrustumCorners[15] = this._pFrustumCorners[18] = right;
        this._pFrustumCorners[1] = this._pFrustumCorners[4] = this._pFrustumCorners[13] = this._pFrustumCorners[16] = top;
        this._pFrustumCorners[7] = this._pFrustumCorners[10] = this._pFrustumCorners[19] = this._pFrustumCorners[22] = bottom;
        this._pFrustumCorners[2] = this._pFrustumCorners[5] = this._pFrustumCorners[8] = this._pFrustumCorners[11] = this._pNear;
        this._pFrustumCorners[14] = this._pFrustumCorners[17] = this._pFrustumCorners[20] = this._pFrustumCorners[23] = this._pFar;
        this._pMatrix.copyRawDataFrom(raw);
        this._pMatrixInvalid = false;
    };
    return OrthographicProjection;
}(ProjectionBase_1.ProjectionBase));
exports.OrthographicProjection = OrthographicProjection;
