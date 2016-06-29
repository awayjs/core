"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PerspectiveProjection_1 = require("../projections/PerspectiveProjection");
var ProjectionBase_1 = require("../projections/ProjectionBase");
var FreeMatrixProjection = (function (_super) {
    __extends(FreeMatrixProjection, _super);
    function FreeMatrixProjection() {
        _super.call(this);
        this._pMatrix.copyFrom(new PerspectiveProjection_1.PerspectiveProjection().matrix);
    }
    Object.defineProperty(FreeMatrixProjection.prototype, "near", {
        //@override
        set: function (value) {
            this._pNear = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FreeMatrixProjection.prototype, "far", {
        //@override
        set: function (value) {
            this._pFar = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FreeMatrixProjection.prototype, "iAspectRatio", {
        //@override
        set: function (value) {
            this._pAspectRatio = value;
        },
        enumerable: true,
        configurable: true
    });
    //@override
    FreeMatrixProjection.prototype.clone = function () {
        var clone = new FreeMatrixProjection();
        clone._pMatrix.copyFrom(this._pMatrix);
        clone._pNear = this._pNear;
        clone._pFar = this._pFar;
        clone._pAspectRatio = this._pAspectRatio;
        clone.pInvalidateMatrix();
        return clone;
    };
    //@override
    FreeMatrixProjection.prototype.pUpdateMatrix = function () {
        this._pMatrixInvalid = false;
    };
    return FreeMatrixProjection;
}(ProjectionBase_1.ProjectionBase));
exports.FreeMatrixProjection = FreeMatrixProjection;
