"use strict";
var PlaneClassification_1 = require("../geom/PlaneClassification");
var Plane3D = (function () {
    /**
     * Create a Plane3D with ABCD coefficients
     */
    function Plane3D(a, b, c, d) {
        if (a === void 0) { a = 0; }
        if (b === void 0) { b = 0; }
        if (c === void 0) { c = 0; }
        if (d === void 0) { d = 0; }
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        if (a == 0 && b == 0) {
            this._iAlignment = Plane3D.ALIGN_XY_AXIS;
        }
        else if (b == 0 && c == 0) {
            this._iAlignment = Plane3D.ALIGN_YZ_AXIS;
        }
        else if (a == 0 && c == 0) {
            this._iAlignment = Plane3D.ALIGN_XZ_AXIS;
        }
        else {
            this._iAlignment = Plane3D.ALIGN_ANY;
        }
    }
    /**
     * Fills this Plane3D with the coefficients from 3 points in 3d space.
     * @param p0 Vector3D
     * @param p1 Vector3D
     * @param p2 Vector3D
     */
    Plane3D.prototype.fromPoints = function (p0, p1, p2) {
        var d1x = p1.x - p0.x;
        var d1y = p1.y - p0.y;
        var d1z = p1.z - p0.z;
        var d2x = p2.x - p0.x;
        var d2y = p2.y - p0.y;
        var d2z = p2.z - p0.z;
        this.a = d1y * d2z - d1z * d2y;
        this.b = d1z * d2x - d1x * d2z;
        this.c = d1x * d2y - d1y * d2x;
        this.d = this.a * p0.x + this.b * p0.y + this.c * p0.z;
        // not using epsilon, since a plane is infinite and a small incorrection can grow very large
        if (this.a == 0 && this.b == 0) {
            this._iAlignment = Plane3D.ALIGN_XY_AXIS;
        }
        else if (this.b == 0 && this.c == 0) {
            this._iAlignment = Plane3D.ALIGN_YZ_AXIS;
        }
        else if (this.a == 0 && this.c == 0) {
            this._iAlignment = Plane3D.ALIGN_XZ_AXIS;
        }
        else {
            this._iAlignment = Plane3D.ALIGN_ANY;
        }
    };
    /**
     * Fills this Plane3D with the coefficients from the plane's normal and a point in 3d space.
     * @param normal Vector3D
     * @param point  Vector3D
     */
    Plane3D.prototype.fromNormalAndPoint = function (normal, point) {
        this.a = normal.x;
        this.b = normal.y;
        this.c = normal.z;
        this.d = this.a * point.x + this.b * point.y + this.c * point.z;
        if (this.a == 0 && this.b == 0) {
            this._iAlignment = Plane3D.ALIGN_XY_AXIS;
        }
        else if (this.b == 0 && this.c == 0) {
            this._iAlignment = Plane3D.ALIGN_YZ_AXIS;
        }
        else if (this.a == 0 && this.c == 0) {
            this._iAlignment = Plane3D.ALIGN_XZ_AXIS;
        }
        else {
            this._iAlignment = Plane3D.ALIGN_ANY;
        }
    };
    /**
     * Normalize this Plane3D
     * @return Plane3D This Plane3D.
     */
    Plane3D.prototype.normalize = function () {
        var len = 1 / Math.sqrt(this.a * this.a + this.b * this.b + this.c * this.c);
        this.a *= len;
        this.b *= len;
        this.c *= len;
        this.d *= len;
        return this;
    };
    /**
     * Returns the signed distance between this Plane3D and the point p.
     * @param p Vector3D
     * @returns Number
     */
    Plane3D.prototype.distance = function (p) {
        if (this._iAlignment == Plane3D.ALIGN_YZ_AXIS) {
            return this.a * p.x - this.d;
        }
        else if (this._iAlignment == Plane3D.ALIGN_XZ_AXIS) {
            return this.b * p.y - this.d;
        }
        else if (this._iAlignment == Plane3D.ALIGN_XY_AXIS) {
            return this.c * p.z - this.d;
        }
        else {
            return this.a * p.x + this.b * p.y + this.c * p.z - this.d;
        }
    };
    /**
     * Classify a point against this Plane3D. (in front, back or intersecting)
     * @param p Vector3D
     * @return int Plane3.FRONT or Plane3D.BACK or Plane3D.INTERSECT
     */
    Plane3D.prototype.classifyPoint = function (p, epsilon) {
        if (epsilon === void 0) { epsilon = 0.01; }
        // check NaN
        if (this.d != this.d)
            return PlaneClassification_1.PlaneClassification.FRONT;
        var len;
        if (this._iAlignment == Plane3D.ALIGN_YZ_AXIS)
            len = this.a * p.x - this.d;
        else if (this._iAlignment == Plane3D.ALIGN_XZ_AXIS)
            len = this.b * p.y - this.d;
        else if (this._iAlignment == Plane3D.ALIGN_XY_AXIS)
            len = this.c * p.z - this.d;
        else
            len = this.a * p.x + this.b * p.y + this.c * p.z - this.d;
        if (len < -epsilon)
            return PlaneClassification_1.PlaneClassification.BACK;
        else if (len > epsilon)
            return PlaneClassification_1.PlaneClassification.FRONT;
        else
            return PlaneClassification_1.PlaneClassification.INTERSECT;
    };
    Plane3D.prototype.toString = function () {
        return "Plane3D [a:" + this.a + ", b:" + this.b + ", c:" + this.c + ", d:" + this.d + "]";
    };
    // indicates the alignment of the plane
    Plane3D.ALIGN_ANY = 0;
    Plane3D.ALIGN_XY_AXIS = 1;
    Plane3D.ALIGN_YZ_AXIS = 2;
    Plane3D.ALIGN_XZ_AXIS = 3;
    return Plane3D;
}());
exports.Plane3D = Plane3D;
