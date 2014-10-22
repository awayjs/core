var Orientation3D = require("awayjs-core/lib/core/geom/Orientation3D");

var Vector3D = require("awayjs-core/lib/core/geom/Vector3D");
var ArgumentError = require("awayjs-core/lib/errors/ArgumentError");

var Matrix3D = (function () {
    /**
    * Creates a Matrix3D object.
    */
    function Matrix3D(v) {
        if (typeof v === "undefined") { v = null; }
        if (v != null && v.length == 16)
            this.rawData = v.concat();
        else
            this.rawData = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }
    /**
    * Appends the matrix by multiplying another Matrix3D object by the current Matrix3D object.
    */
    Matrix3D.prototype.append = function (lhs) {
        var m111 = this.rawData[0], m121 = this.rawData[4], m131 = this.rawData[8], m141 = this.rawData[12], m112 = this.rawData[1], m122 = this.rawData[5], m132 = this.rawData[9], m142 = this.rawData[13], m113 = this.rawData[2], m123 = this.rawData[6], m133 = this.rawData[10], m143 = this.rawData[14], m114 = this.rawData[3], m124 = this.rawData[7], m134 = this.rawData[11], m144 = this.rawData[15], m211 = lhs.rawData[0], m221 = lhs.rawData[4], m231 = lhs.rawData[8], m241 = lhs.rawData[12], m212 = lhs.rawData[1], m222 = lhs.rawData[5], m232 = lhs.rawData[9], m242 = lhs.rawData[13], m213 = lhs.rawData[2], m223 = lhs.rawData[6], m233 = lhs.rawData[10], m243 = lhs.rawData[14], m214 = lhs.rawData[3], m224 = lhs.rawData[7], m234 = lhs.rawData[11], m244 = lhs.rawData[15];

        this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
        this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
        this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
        this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;

        this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
        this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
        this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
        this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;

        this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
        this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
        this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
        this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;

        this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
        this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
        this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
        this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
    };

    /**
    * Appends an incremental rotation to a Matrix3D object.
    */
    Matrix3D.prototype.appendRotation = function (degrees, axis) {
        var m = Matrix3D.getAxisRotation(axis.x, axis.y, axis.z, degrees);

        this.append(m);
    };

    /**
    * Appends an incremental scale change along the x, y, and z axes to a Matrix3D object.
    */
    Matrix3D.prototype.appendScale = function (xScale, yScale, zScale) {
        this.append(new Matrix3D([xScale, 0.0, 0.0, 0.0, 0.0, yScale, 0.0, 0.0, 0.0, 0.0, zScale, 0.0, 0.0, 0.0, 0.0, 1.0]));
    };

    /**
    * Appends an incremental translation, a repositioning along the x, y, and z axes, to a Matrix3D object.
    */
    Matrix3D.prototype.appendTranslation = function (x, y, z) {
        this.rawData[12] += x;
        this.rawData[13] += y;
        this.rawData[14] += z;
    };

    /**
    * Returns a new Matrix3D object that is an exact copy of the current Matrix3D object.
    */
    Matrix3D.prototype.clone = function () {
        return new Matrix3D(this.rawData.slice(0));
    };

    /**
    * Copies a Vector3D object into specific column of the calling Matrix3D object.
    */
    Matrix3D.prototype.copyColumnFrom = function (column, vector3D) {
        switch (column) {
            case 0:
                this.rawData[0] = vector3D.x;
                this.rawData[1] = vector3D.y;
                this.rawData[2] = vector3D.z;
                this.rawData[3] = vector3D.w;
                break;
            case 1:
                this.rawData[4] = vector3D.x;
                this.rawData[5] = vector3D.y;
                this.rawData[6] = vector3D.z;
                this.rawData[7] = vector3D.w;
                break;
            case 2:
                this.rawData[8] = vector3D.x;
                this.rawData[9] = vector3D.y;
                this.rawData[10] = vector3D.z;
                this.rawData[11] = vector3D.w;
                break;
            case 3:
                this.rawData[12] = vector3D.x;
                this.rawData[13] = vector3D.y;
                this.rawData[14] = vector3D.z;
                this.rawData[15] = vector3D.w;
                break;
            default:
                throw new ArgumentError("ArgumentError, Column " + column + " out of bounds [0, ..., 3]");
        }
    };

    /**
    * Copies specific column of the calling Matrix3D object into the Vector3D object.
    */
    Matrix3D.prototype.copyColumnTo = function (column, vector3D) {
        switch (column) {
            case 0:
                vector3D.x = this.rawData[0];
                vector3D.y = this.rawData[1];
                vector3D.z = this.rawData[2];
                vector3D.w = this.rawData[3];
                break;
            case 1:
                vector3D.x = this.rawData[4];
                vector3D.y = this.rawData[5];
                vector3D.z = this.rawData[6];
                vector3D.w = this.rawData[7];
                break;
            case 2:
                vector3D.x = this.rawData[8];
                vector3D.y = this.rawData[9];
                vector3D.z = this.rawData[10];
                vector3D.w = this.rawData[11];
                break;
            case 3:
                vector3D.x = this.rawData[12];
                vector3D.y = this.rawData[13];
                vector3D.z = this.rawData[14];
                vector3D.w = this.rawData[15];
                break;
            default:
                throw new ArgumentError("ArgumentError, Column " + column + " out of bounds [0, ..., 3]");
        }
    };

    /**
    * Copies all of the matrix data from the source Matrix3D object into the calling Matrix3D object.
    */
    Matrix3D.prototype.copyFrom = function (sourceMatrix3D) {
        var len = sourceMatrix3D.rawData.length;
        for (var c = 0; c < len; c++)
            this.rawData[c] = sourceMatrix3D.rawData[c];
    };

    Matrix3D.prototype.copyRawDataFrom = function (vector, index, transpose) {
        if (typeof index === "undefined") { index = 0; }
        if (typeof transpose === "undefined") { transpose = false; }
        if (transpose)
            this.transpose();

        var len = vector.length - index;
        for (var c = 0; c < len; c++)
            this.rawData[c] = vector[c + index];

        if (transpose)
            this.transpose();
    };

    Matrix3D.prototype.copyRawDataTo = function (vector, index, transpose) {
        if (typeof index === "undefined") { index = 0; }
        if (typeof transpose === "undefined") { transpose = false; }
        if (transpose)
            this.transpose();

        var len = this.rawData.length;
        for (var c = 0; c < len; c++)
            vector[c + index] = this.rawData[c];

        if (transpose)
            this.transpose();
    };

    /**
    * Copies a Vector3D object into specific row of the calling Matrix3D object.
    */
    Matrix3D.prototype.copyRowFrom = function (row, vector3D) {
        switch (row) {
            case 0:
                this.rawData[0] = vector3D.x;
                this.rawData[4] = vector3D.y;
                this.rawData[8] = vector3D.z;
                this.rawData[12] = vector3D.w;
                break;
            case 1:
                this.rawData[1] = vector3D.x;
                this.rawData[5] = vector3D.y;
                this.rawData[9] = vector3D.z;
                this.rawData[13] = vector3D.w;
                break;
            case 2:
                this.rawData[2] = vector3D.x;
                this.rawData[6] = vector3D.y;
                this.rawData[10] = vector3D.z;
                this.rawData[14] = vector3D.w;
                break;
            case 3:
                this.rawData[3] = vector3D.x;
                this.rawData[7] = vector3D.y;
                this.rawData[11] = vector3D.z;
                this.rawData[15] = vector3D.w;
                break;
            default:
                throw new ArgumentError("ArgumentError, Row " + row + " out of bounds [0, ..., 3]");
        }
    };

    /**
    * Copies specific row of the calling Matrix3D object into the Vector3D object.
    */
    Matrix3D.prototype.copyRowTo = function (row, vector3D) {
        switch (row) {
            case 0:
                vector3D.x = this.rawData[0];
                vector3D.y = this.rawData[4];
                vector3D.z = this.rawData[8];
                vector3D.w = this.rawData[12];
                break;
            case 1:
                vector3D.x = this.rawData[1];
                vector3D.y = this.rawData[5];
                vector3D.z = this.rawData[9];
                vector3D.w = this.rawData[13];
                break;
            case 2:
                vector3D.x = this.rawData[2];
                vector3D.y = this.rawData[6];
                vector3D.z = this.rawData[10];
                vector3D.w = this.rawData[14];
                break;
            case 3:
                vector3D.x = this.rawData[3];
                vector3D.y = this.rawData[7];
                vector3D.z = this.rawData[11];
                vector3D.w = this.rawData[15];
                break;
            default:
                throw new ArgumentError("ArgumentError, Row " + row + " out of bounds [0, ..., 3]");
        }
    };

    /**
    * Copies this Matrix3D object into a destination Matrix3D object.
    */
    Matrix3D.prototype.copyToMatrix3D = function (dest) {
        dest.rawData = this.rawData.slice(0);
    };

    /**
    * Returns the transformation matrix's translation, rotation, and scale settings as a Vector of three Vector3D objects.
    */
    Matrix3D.prototype.decompose = function (orientationStyle) {
        if (typeof orientationStyle === "undefined") { orientationStyle = "eulerAngles"; }
        var q;

        // Initial Tests - Not OK
        var vec = [];
        var m = this.clone();
        var mr = m.rawData;

        var pos = new Vector3D(mr[12], mr[13], mr[14]);
        mr[12] = 0;
        mr[13] = 0;
        mr[14] = 0;

        var scale = new Vector3D();

        scale.x = Math.sqrt(mr[0] * mr[0] + mr[1] * mr[1] + mr[2] * mr[2]);
        scale.y = Math.sqrt(mr[4] * mr[4] + mr[5] * mr[5] + mr[6] * mr[6]);
        scale.z = Math.sqrt(mr[8] * mr[8] + mr[9] * mr[9] + mr[10] * mr[10]);

        if (mr[0] * (mr[5] * mr[10] - mr[6] * mr[9]) - mr[1] * (mr[4] * mr[10] - mr[6] * mr[8]) + mr[2] * (mr[4] * mr[9] - mr[5] * mr[8]) < 0)
            scale.z = -scale.z;

        mr[0] /= scale.x;
        mr[1] /= scale.x;
        mr[2] /= scale.x;
        mr[4] /= scale.y;
        mr[5] /= scale.y;
        mr[6] /= scale.y;
        mr[8] /= scale.z;
        mr[9] /= scale.z;
        mr[10] /= scale.z;

        var rot = new Vector3D();

        switch (orientationStyle) {
            case Orientation3D.AXIS_ANGLE:
                rot.w = Math.acos((mr[0] + mr[5] + mr[10] - 1) / 2);

                var len = Math.sqrt((mr[6] - mr[9]) * (mr[6] - mr[9]) + (mr[8] - mr[2]) * (mr[8] - mr[2]) + (mr[1] - mr[4]) * (mr[1] - mr[4]));
                rot.x = (mr[6] - mr[9]) / len;
                rot.y = (mr[8] - mr[2]) / len;
                rot.z = (mr[1] - mr[4]) / len;

                break;
            case Orientation3D.QUATERNION:
                var tr = mr[0] + mr[5] + mr[10];

                if (tr > 0) {
                    rot.w = Math.sqrt(1 + tr) / 2;

                    rot.x = (mr[6] - mr[9]) / (4 * rot.w);
                    rot.y = (mr[8] - mr[2]) / (4 * rot.w);
                    rot.z = (mr[1] - mr[4]) / (4 * rot.w);
                } else if ((mr[0] > mr[5]) && (mr[0] > mr[10])) {
                    rot.x = Math.sqrt(1 + mr[0] - mr[5] - mr[10]) / 2;

                    rot.w = (mr[6] - mr[9]) / (4 * rot.x);
                    rot.y = (mr[1] + mr[4]) / (4 * rot.x);
                    rot.z = (mr[8] + mr[2]) / (4 * rot.x);
                } else if (mr[5] > mr[10]) {
                    rot.y = Math.sqrt(1 + mr[5] - mr[0] - mr[10]) / 2;

                    rot.x = (mr[1] + mr[4]) / (4 * rot.y);
                    rot.w = (mr[8] - mr[2]) / (4 * rot.y);
                    rot.z = (mr[6] + mr[9]) / (4 * rot.y);
                } else {
                    rot.z = Math.sqrt(1 + mr[10] - mr[0] - mr[5]) / 2;

                    rot.x = (mr[8] + mr[2]) / (4 * rot.z);
                    rot.y = (mr[6] + mr[9]) / (4 * rot.z);
                    rot.w = (mr[1] - mr[4]) / (4 * rot.z);
                }

                break;
            case Orientation3D.EULER_ANGLES:
                rot.y = Math.asin(-mr[2]);

                //var cos:number = Math.cos(rot.y);
                if (mr[2] != 1 && mr[2] != -1) {
                    rot.x = Math.atan2(mr[6], mr[10]);
                    rot.z = Math.atan2(mr[1], mr[0]);
                } else {
                    rot.z = 0;
                    rot.x = Math.atan2(mr[4], mr[5]);
                }

                break;
        }

        vec.push(pos);
        vec.push(rot);
        vec.push(scale);

        return vec;
    };

    /**
    * Uses the transformation matrix without its translation elements to transform a Vector3D object from one space
    * coordinate to another.
    */
    Matrix3D.prototype.deltaTransformVector = function (v) {
        var x = v.x;
        var y = v.y;
        var z = v.z;

        return new Vector3D((x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8]), (x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9]), (x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10]), (x * this.rawData[3] + y * this.rawData[7] + z * this.rawData[11]));
    };

    /**
    * Converts the current matrix to an identity or unit matrix.
    */
    Matrix3D.prototype.identity = function () {
        this.rawData = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    };

    /**
    * [static] Interpolates the translation, rotation, and scale transformation of one matrix toward those of the target matrix.
    */
    Matrix3D.interpolate = function (thisMat, toMat, percent) {
        var m = new Matrix3D();
        for (var i = 0; i < 16; ++i)
            m.rawData[i] = thisMat.rawData[i] + (toMat.rawData[i] - thisMat.rawData[i]) * percent;

        return m;
    };

    /**
    * Interpolates this matrix towards the translation, rotation, and scale transformations of the target matrix.
    */
    Matrix3D.prototype.interpolateTo = function (toMat, percent) {
        for (var i = 0; i < 16; ++i)
            this.rawData[i] = this.rawData[i] + (toMat.rawData[i] - this.rawData[i]) * percent;
    };

    /**
    * Inverts the current matrix.
    */
    Matrix3D.prototype.invert = function () {
        var d = this.determinant;
        var invertable = Math.abs(d) > 0.00000000001;

        if (invertable) {
            d = 1 / d;
            var m11 = this.rawData[0];
            var m21 = this.rawData[4];
            var m31 = this.rawData[8];
            var m41 = this.rawData[12];
            var m12 = this.rawData[1];
            var m22 = this.rawData[5];
            var m32 = this.rawData[9];
            var m42 = this.rawData[13];
            var m13 = this.rawData[2];
            var m23 = this.rawData[6];
            var m33 = this.rawData[10];
            var m43 = this.rawData[14];
            var m14 = this.rawData[3];
            var m24 = this.rawData[7];
            var m34 = this.rawData[11];
            var m44 = this.rawData[15];

            this.rawData[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
            this.rawData[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
            this.rawData[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
            this.rawData[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
            this.rawData[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
            this.rawData[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
            this.rawData[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
            this.rawData[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
            this.rawData[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
            this.rawData[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
            this.rawData[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
            this.rawData[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
            this.rawData[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
            this.rawData[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
            this.rawData[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
            this.rawData[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
        }
        return invertable;
    };

    /* TODO implement pointAt
    public pointAt( pos:Vector3D, at:Vector3D = null, up:Vector3D = null )
    {
    }
    */
    /**
    * Prepends a matrix by multiplying the current Matrix3D object by another Matrix3D object.
    */
    Matrix3D.prototype.prepend = function (rhs) {
        var m111 = rhs.rawData[0], m121 = rhs.rawData[4], m131 = rhs.rawData[8], m141 = rhs.rawData[12], m112 = rhs.rawData[1], m122 = rhs.rawData[5], m132 = rhs.rawData[9], m142 = rhs.rawData[13], m113 = rhs.rawData[2], m123 = rhs.rawData[6], m133 = rhs.rawData[10], m143 = rhs.rawData[14], m114 = rhs.rawData[3], m124 = rhs.rawData[7], m134 = rhs.rawData[11], m144 = rhs.rawData[15], m211 = this.rawData[0], m221 = this.rawData[4], m231 = this.rawData[8], m241 = this.rawData[12], m212 = this.rawData[1], m222 = this.rawData[5], m232 = this.rawData[9], m242 = this.rawData[13], m213 = this.rawData[2], m223 = this.rawData[6], m233 = this.rawData[10], m243 = this.rawData[14], m214 = this.rawData[3], m224 = this.rawData[7], m234 = this.rawData[11], m244 = this.rawData[15];

        this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
        this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
        this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
        this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;

        this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
        this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
        this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
        this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;

        this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
        this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
        this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
        this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;

        this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
        this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
        this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
        this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
    };

    /**
    * Prepends an incremental rotation to a Matrix3D object.
    */
    Matrix3D.prototype.prependRotation = function (degrees, axis) {
        var m = Matrix3D.getAxisRotation(axis.x, axis.y, axis.z, degrees);

        /*
        if ( pivot != null )
        {
        var p:Vector3D = pivot;
        m.appendTranslation( p.x, p.y, p.z );
        }
        */
        this.prepend(m);
    };

    /**
    * Prepends an incremental scale change along the x, y, and z axes to a Matrix3D object.
    */
    Matrix3D.prototype.prependScale = function (xScale, yScale, zScale) {
        // Initial Tests - OK
        this.prepend(new Matrix3D([xScale, 0, 0, 0, 0, yScale, 0, 0, 0, 0, zScale, 0, 0, 0, 0, 1]));
    };

    /**
    * Prepends an incremental translation, a repositioning along the x, y, and z axes, to a Matrix3D object.
    */
    Matrix3D.prototype.prependTranslation = function (x, y, z) {
        // Initial Tests - OK
        var m = new Matrix3D();
        m.position = new Vector3D(x, y, z);
        this.prepend(m);
    };

    // TODO orientationStyle
    /**
    * Sets the transformation matrix's translation, rotation, and scale settings.
    */
    Matrix3D.prototype.recompose = function (components) {
        // Initial Tests - OK
        if (components.length < 3)
            return false;

        //components[2].x == 0 || components[2].y == 0 || components[2].z == 0) return false;
        this.identity();
        this.appendScale(components[2].x, components[2].y, components[2].z);

        var angle;
        angle = -components[1].x;
        this.append(new Matrix3D([1, 0, 0, 0, 0, Math.cos(angle), -Math.sin(angle), 0, 0, Math.sin(angle), Math.cos(angle), 0, 0, 0, 0, 0]));
        angle = -components[1].y;
        this.append(new Matrix3D([Math.cos(angle), 0, Math.sin(angle), 0, 0, 1, 0, 0, -Math.sin(angle), 0, Math.cos(angle), 0, 0, 0, 0, 0]));
        angle = -components[1].z;
        this.append(new Matrix3D([Math.cos(angle), -Math.sin(angle), 0, 0, Math.sin(angle), Math.cos(angle), 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]));

        this.position = components[0];
        this.rawData[15] = 1;

        return true;
    };

    Matrix3D.prototype.transformVector = function (v) {
        var x = v.x;
        var y = v.y;
        var z = v.z;

        return new Vector3D((x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12]), (x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13]), (x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14]), (x * this.rawData[3] + y * this.rawData[7] + z * this.rawData[11] + this.rawData[15]));
    };

    /**
    * Uses the transformation matrix to transform a Vector of Numbers from one coordinate space to another.
    */
    Matrix3D.prototype.transformVectors = function (vin, vout) {
        // Initial Tests - OK
        var i = 0;
        var x = 0, y = 0, z = 0;

        while (i + 3 <= vin.length) {
            x = vin[i];
            y = vin[i + 1];
            z = vin[i + 2];
            vout[i] = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12];
            vout[i + 1] = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13];
            vout[i + 2] = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14];
            i += 3;
        }
    };

    /**
    * Converts the current Matrix3D object to a matrix where the rows and columns are swapped.
    */
    Matrix3D.prototype.transpose = function () {
        // Initial Tests - OK
        var oRawData = this.rawData.slice(0);

        this.rawData[1] = oRawData[4];
        this.rawData[2] = oRawData[8];
        this.rawData[3] = oRawData[12];
        this.rawData[4] = oRawData[1];
        this.rawData[6] = oRawData[9];
        this.rawData[7] = oRawData[13];
        this.rawData[8] = oRawData[2];
        this.rawData[9] = oRawData[6];
        this.rawData[11] = oRawData[14];
        this.rawData[12] = oRawData[3];
        this.rawData[13] = oRawData[7];
        this.rawData[14] = oRawData[11];
    };

    Matrix3D.getAxisRotation = function (x, y, z, degrees) {
        // internal class use by rotations which have been tested
        var m = new Matrix3D();

        var rad = degrees * (Math.PI / 180);
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var t = 1 - c;
        var tmp1, tmp2;

        m.rawData[0] = c + x * x * t;
        m.rawData[5] = c + y * y * t;
        m.rawData[10] = c + z * z * t;

        tmp1 = x * y * t;
        tmp2 = z * s;
        m.rawData[1] = tmp1 + tmp2;
        m.rawData[4] = tmp1 - tmp2;
        tmp1 = x * z * t;
        tmp2 = y * s;
        m.rawData[8] = tmp1 + tmp2;
        m.rawData[2] = tmp1 - tmp2;
        tmp1 = y * z * t;
        tmp2 = x * s;
        m.rawData[9] = tmp1 - tmp2;
        m.rawData[6] = tmp1 + tmp2;

        return m;
    };

    Object.defineProperty(Matrix3D.prototype, "determinant", {
        /**
        * [read-only] A Number that determines whether a matrix is invertible.
        */
        get: function () {
            return ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7]) + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7]) + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3]) - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3]) + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]));
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Matrix3D.prototype, "position", {
        /**
        * A Vector3D object that holds the position, the 3D coordinate (x,y,z) of a display object within the
        * transformation's frame of reference.
        */
        get: function () {
            return new Vector3D(this.rawData[12], this.rawData[13], this.rawData[14]);
        },
        set: function (value) {
            this.rawData[12] = value.x;
            this.rawData[13] = value.y;
            this.rawData[14] = value.z;
        },
        enumerable: true,
        configurable: true
    });


    Matrix3D.prototype.toFixed = function (decimalPlace) {
        var magnitude = Math.pow(10, decimalPlace);
        return "matrix3d(" + Math.round(this.rawData[0] * magnitude) / magnitude + "," + Math.round(this.rawData[1] * magnitude) / magnitude + "," + Math.round(this.rawData[2] * magnitude) / magnitude + "," + Math.round(this.rawData[3] * magnitude) / magnitude + "," + Math.round(this.rawData[4] * magnitude) / magnitude + "," + Math.round(this.rawData[5] * magnitude) / magnitude + "," + Math.round(this.rawData[6] * magnitude) / magnitude + "," + Math.round(this.rawData[7] * magnitude) / magnitude + "," + Math.round(this.rawData[8] * magnitude) / magnitude + "," + Math.round(this.rawData[9] * magnitude) / magnitude + "," + Math.round(this.rawData[10] * magnitude) / magnitude + "," + Math.round(this.rawData[11] * magnitude) / magnitude + "," + Math.round(this.rawData[12] * magnitude) / magnitude + "," + Math.round(this.rawData[13] * magnitude) / magnitude + "," + Math.round(this.rawData[14] * magnitude) / magnitude + "," + Math.round(this.rawData[15] * magnitude) / magnitude + ")";
    };

    Matrix3D.prototype.toString = function () {
        return "matrix3d(" + Math.round(this.rawData[0] * 1000) / 1000 + "," + Math.round(this.rawData[1] * 1000) / 1000 + "," + Math.round(this.rawData[2] * 1000) / 1000 + "," + Math.round(this.rawData[3] * 1000) / 1000 + "," + Math.round(this.rawData[4] * 1000) / 1000 + "," + Math.round(this.rawData[5] * 1000) / 1000 + "," + Math.round(this.rawData[6] * 1000) / 1000 + "," + Math.round(this.rawData[7] * 1000) / 1000 + "," + Math.round(this.rawData[8] * 1000) / 1000 + "," + Math.round(this.rawData[9] * 1000) / 1000 + "," + Math.round(this.rawData[10] * 1000) / 1000 + "," + Math.round(this.rawData[11] * 1000) / 1000 + "," + Math.round(this.rawData[12] * 1000) / 1000 + "," + Math.round(this.rawData[13] * 1000) / 1000 + "," + Math.round(this.rawData[14] * 1000) / 1000 + "," + Math.round(this.rawData[15] * 1000) / 1000 + ")";
    };
    return Matrix3D;
})();

module.exports = Matrix3D;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZ2VvbS9NYXRyaXgzRC50cyJdLCJuYW1lcyI6WyJNYXRyaXgzRCIsIk1hdHJpeDNELmNvbnN0cnVjdG9yIiwiTWF0cml4M0QuYXBwZW5kIiwiTWF0cml4M0QuYXBwZW5kUm90YXRpb24iLCJNYXRyaXgzRC5hcHBlbmRTY2FsZSIsIk1hdHJpeDNELmFwcGVuZFRyYW5zbGF0aW9uIiwiTWF0cml4M0QuY2xvbmUiLCJNYXRyaXgzRC5jb3B5Q29sdW1uRnJvbSIsIk1hdHJpeDNELmNvcHlDb2x1bW5UbyIsIk1hdHJpeDNELmNvcHlGcm9tIiwiTWF0cml4M0QuY29weVJhd0RhdGFGcm9tIiwiTWF0cml4M0QuY29weVJhd0RhdGFUbyIsIk1hdHJpeDNELmNvcHlSb3dGcm9tIiwiTWF0cml4M0QuY29weVJvd1RvIiwiTWF0cml4M0QuY29weVRvTWF0cml4M0QiLCJNYXRyaXgzRC5kZWNvbXBvc2UiLCJNYXRyaXgzRC5kZWx0YVRyYW5zZm9ybVZlY3RvciIsIk1hdHJpeDNELmlkZW50aXR5IiwiTWF0cml4M0QuaW50ZXJwb2xhdGUiLCJNYXRyaXgzRC5pbnRlcnBvbGF0ZVRvIiwiTWF0cml4M0QuaW52ZXJ0IiwiTWF0cml4M0QucHJlcGVuZCIsIk1hdHJpeDNELnByZXBlbmRSb3RhdGlvbiIsIk1hdHJpeDNELnByZXBlbmRTY2FsZSIsIk1hdHJpeDNELnByZXBlbmRUcmFuc2xhdGlvbiIsIk1hdHJpeDNELnJlY29tcG9zZSIsIk1hdHJpeDNELnRyYW5zZm9ybVZlY3RvciIsIk1hdHJpeDNELnRyYW5zZm9ybVZlY3RvcnMiLCJNYXRyaXgzRC50cmFuc3Bvc2UiLCJNYXRyaXgzRC5nZXRBeGlzUm90YXRpb24iLCJNYXRyaXgzRC50b0ZpeGVkIiwiTWF0cml4M0QudG9TdHJpbmciXSwibWFwcGluZ3MiOiJBQUFBLHNFQUE0RTs7QUFFNUUsNERBQW9FO0FBQ3BFLG1FQUF5RTs7QUFFekU7SUFhQ0E7O01BREdBO0lBQ0hBLGtCQUFZQSxDQUFpQkE7UUFBakJDLGdDQUFBQSxDQUFDQSxHQUFZQSxJQUFJQTtBQUFBQSxRQUU1QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsSUFBSUEsRUFBRUE7WUFDOUJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBOztZQUV6QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsQ0FBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0E7SUFDcEVBLENBQUNBO0lBS0REOztNQURHQTtnQ0FDSEEsVUFBY0EsR0FBWUE7UUFFekJFLElBQUlBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBOztRQUU5OUJBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBO1FBQy9EQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQTtRQUMvREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUE7UUFDL0RBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBOztRQUUvREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUE7UUFDL0RBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBO1FBQy9EQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQTtRQUMvREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUE7O1FBRS9EQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQTtRQUMvREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUE7UUFDL0RBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBO1FBQ2hFQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQTs7UUFFaEVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBO1FBQ2hFQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQTtRQUNoRUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUE7UUFDaEVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBO0lBQ2pFQSxDQUFDQTs7SUFLREY7O01BREdBO3dDQUNIQSxVQUFzQkEsT0FBY0EsRUFBRUEsSUFBYUE7UUFFbERHLElBQUlBLENBQUNBLEdBQVlBLFFBQVFBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLE9BQU9BLENBQUNBOztRQUUxRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDZkEsQ0FBQ0E7O0lBS0RIOztNQURHQTtxQ0FDSEEsVUFBbUJBLE1BQWFBLEVBQUVBLE1BQWFBLEVBQUVBLE1BQWFBO1FBRTdESSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFFQSxNQUFNQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxNQUFNQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxNQUFNQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFFQSxDQUFDQSxDQUFDQTtJQUN2SEEsQ0FBQ0E7O0lBS0RKOztNQURHQTsyQ0FDSEEsVUFBeUJBLENBQVFBLEVBQUVBLENBQVFBLEVBQUVBLENBQVFBO1FBRXBESyxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNyQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDckJBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBO0lBQ3RCQSxDQUFDQTs7SUFLREw7O01BREdBOytCQUNIQTtRQUVDTSxPQUFPQSxJQUFJQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUMzQ0EsQ0FBQ0E7O0lBS0ROOztNQURHQTt3Q0FDSEEsVUFBc0JBLE1BQWFBLEVBQUVBLFFBQWlCQTtRQUVyRE8sUUFBUUEsTUFBTUEsQ0FBQ0E7WUFDZEEsS0FBS0EsQ0FBQ0E7Z0JBQ0xBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLENBQUNBLENBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBO2dCQUM5QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsQ0FBQ0EsQ0FBRUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzlCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFFQSxDQUFDQSxDQUFFQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQTtnQkFDOUJBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLENBQUNBLENBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBO2dCQUM5QkEsS0FBTUE7QUFBQUEsWUFDUEEsS0FBS0EsQ0FBQ0E7Z0JBQ0xBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLENBQUNBLENBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBO2dCQUM5QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsQ0FBQ0EsQ0FBRUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzlCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFFQSxDQUFDQSxDQUFFQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQTtnQkFDOUJBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLENBQUNBLENBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBO2dCQUM5QkEsS0FBTUE7QUFBQUEsWUFDUEEsS0FBS0EsQ0FBQ0E7Z0JBQ0xBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLENBQUNBLENBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBO2dCQUM5QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsQ0FBQ0EsQ0FBRUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzlCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFFQSxFQUFFQSxDQUFFQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQTtnQkFDL0JBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLEVBQUVBLENBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBO2dCQUMvQkEsS0FBTUE7QUFBQUEsWUFDUEEsS0FBS0EsQ0FBQ0E7Z0JBQ0xBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLEVBQUVBLENBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBO2dCQUMvQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsRUFBRUEsQ0FBRUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQy9CQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFFQSxFQUFFQSxDQUFFQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQTtnQkFDL0JBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLEVBQUVBLENBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBO2dCQUMvQkEsS0FBTUE7QUFBQUEsWUFDUEE7Z0JBQ0NBLE1BQU1BLElBQUlBLGFBQWFBLENBQUNBLHdCQUF3QkEsR0FBR0EsTUFBTUEsR0FBR0EsNEJBQTRCQSxDQUFDQTtBQUFDQSxTQUMzRkE7SUFDRkEsQ0FBQ0E7O0lBS0RQOztNQURHQTtzQ0FDSEEsVUFBb0JBLE1BQWFBLEVBQUVBLFFBQWlCQTtRQUVuRFEsUUFBUUEsTUFBTUEsQ0FBQ0E7WUFDZEEsS0FBS0EsQ0FBQ0E7Z0JBQ0xBLFFBQVFBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLENBQUNBLENBQUVBO2dCQUM5QkEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsQ0FBQ0EsQ0FBRUE7Z0JBQzlCQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFFQSxDQUFDQSxDQUFFQTtnQkFDOUJBLFFBQVFBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLENBQUNBLENBQUVBO2dCQUM5QkEsS0FBTUE7QUFBQUEsWUFDUEEsS0FBS0EsQ0FBQ0E7Z0JBQ0xBLFFBQVFBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLENBQUNBLENBQUVBO2dCQUM5QkEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsQ0FBQ0EsQ0FBRUE7Z0JBQzlCQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFFQSxDQUFDQSxDQUFFQTtnQkFDOUJBLFFBQVFBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLENBQUNBLENBQUVBO2dCQUM5QkEsS0FBTUE7QUFBQUEsWUFDUEEsS0FBS0EsQ0FBQ0E7Z0JBQ0xBLFFBQVFBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLENBQUNBLENBQUVBO2dCQUM5QkEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsQ0FBQ0EsQ0FBRUE7Z0JBQzlCQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFFQSxFQUFFQSxDQUFFQTtnQkFDL0JBLFFBQVFBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLEVBQUVBLENBQUVBO2dCQUMvQkEsS0FBTUE7QUFBQUEsWUFDUEEsS0FBS0EsQ0FBQ0E7Z0JBQ0xBLFFBQVFBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLEVBQUVBLENBQUVBO2dCQUMvQkEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsRUFBRUEsQ0FBRUE7Z0JBQy9CQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFFQSxFQUFFQSxDQUFFQTtnQkFDL0JBLFFBQVFBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLEVBQUVBLENBQUVBO2dCQUMvQkEsS0FBTUE7QUFBQUEsWUFDUEE7Z0JBQ0NBLE1BQU1BLElBQUlBLGFBQWFBLENBQUNBLHdCQUF3QkEsR0FBR0EsTUFBTUEsR0FBR0EsNEJBQTRCQSxDQUFDQTtBQUFDQSxTQUMzRkE7SUFDRkEsQ0FBQ0E7O0lBS0RSOztNQURHQTtrQ0FDSEEsVUFBZ0JBLGNBQXVCQTtRQUV0Q1MsSUFBSUEsR0FBR0EsR0FBVUEsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUE7UUFDOUNBLEtBQUtBLElBQUlBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBO1lBQ2xDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxjQUFjQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUM5Q0EsQ0FBQ0E7O0lBRURULHFDQUFBQSxVQUF1QkEsTUFBZUEsRUFBRUEsS0FBZ0JBLEVBQUVBLFNBQXlCQTtRQUEzQ1Usb0NBQUFBLEtBQUtBLEdBQVVBLENBQUNBO0FBQUFBLFFBQUVBLHdDQUFBQSxTQUFTQSxHQUFXQSxLQUFLQTtBQUFBQSxRQUVsRkEsSUFBSUEsU0FBU0E7WUFDWkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O1FBRWxCQSxJQUFJQSxHQUFHQSxHQUFVQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQTtRQUN0Q0EsS0FBS0EsSUFBSUEsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUE7WUFDbENBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBOztRQUVyQ0EsSUFBSUEsU0FBU0E7WUFDWkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDbkJBLENBQUNBOztJQUVEVixtQ0FBQUEsVUFBcUJBLE1BQWVBLEVBQUVBLEtBQWdCQSxFQUFFQSxTQUF5QkE7UUFBM0NXLG9DQUFBQSxLQUFLQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFFQSx3Q0FBQUEsU0FBU0EsR0FBV0EsS0FBS0E7QUFBQUEsUUFFaEZBLElBQUlBLFNBQVNBO1lBQ1pBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBOztRQUVsQkEsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUE7UUFDcENBLEtBQUtBLElBQUlBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBO1lBQ2xDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs7UUFFdENBLElBQUlBLFNBQVNBO1lBQ1pBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO0lBQ25CQSxDQUFDQTs7SUFLRFg7O01BREdBO3FDQUNIQSxVQUFtQkEsR0FBVUEsRUFBRUEsUUFBaUJBO1FBRS9DWSxRQUFRQSxHQUFHQSxDQUFDQTtZQUNYQSxLQUFLQSxDQUFDQTtnQkFDTEEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsQ0FBQ0EsQ0FBRUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzlCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFFQSxDQUFDQSxDQUFFQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQTtnQkFDOUJBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLENBQUNBLENBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBO2dCQUM5QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsRUFBRUEsQ0FBRUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQy9CQSxLQUFNQTtBQUFBQSxZQUNQQSxLQUFLQSxDQUFDQTtnQkFDTEEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsQ0FBQ0EsQ0FBRUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzlCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFFQSxDQUFDQSxDQUFFQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQTtnQkFDOUJBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLENBQUNBLENBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBO2dCQUM5QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsRUFBRUEsQ0FBRUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQy9CQSxLQUFNQTtBQUFBQSxZQUNQQSxLQUFLQSxDQUFDQTtnQkFDTEEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsQ0FBQ0EsQ0FBRUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzlCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFFQSxDQUFDQSxDQUFFQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQTtnQkFDOUJBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLEVBQUVBLENBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBO2dCQUMvQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsRUFBRUEsQ0FBRUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQy9CQSxLQUFNQTtBQUFBQSxZQUNQQSxLQUFLQSxDQUFDQTtnQkFDTEEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsQ0FBQ0EsQ0FBRUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzlCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFFQSxDQUFDQSxDQUFFQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQTtnQkFDOUJBLElBQUlBLENBQUNBLE9BQU9BLENBQUVBLEVBQUVBLENBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBO2dCQUMvQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUEsRUFBRUEsQ0FBRUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQy9CQSxLQUFNQTtBQUFBQSxZQUNQQTtnQkFDQ0EsTUFBTUEsSUFBSUEsYUFBYUEsQ0FBQ0EscUJBQXFCQSxHQUFHQSxHQUFHQSxHQUFHQSw0QkFBNEJBLENBQUNBO0FBQUNBLFNB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SUFBSUEsR0FBR0EsR0FBWUEsSUFBSUEsUUFBUUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDdkRBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBO1FBQ1ZBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBO1FBQ1ZBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBOztRQUVWQSxJQUFJQSxLQUFLQSxHQUFZQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQTs7UUFFbkNBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzVEQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM1REEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7O1FBRTlEQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtZQUNsSEEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O1FBRXBCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUNoQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDaEJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLENBQUNBO1FBQ2hCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUNoQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDaEJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLENBQUNBO1FBQ2hCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUNoQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDaEJBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLENBQUNBOztRQUVqQkEsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7O1FBRXhCQSxRQUFRQSxnQkFBZ0JBLENBQUNBO1lBQ3hCQSxLQUFLQSxhQUFhQSxDQUFDQSxVQUFVQTtnQkFFNUJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBOztnQkFFakRBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUMvSEEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0E7Z0JBQzNCQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQTtnQkFDM0JBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBOztnQkFFM0JBLEtBQU1BO0FBQUFBLFlBQ1BBLEtBQUtBLGFBQWFBLENBQUNBLFVBQVVBO2dCQUU1QkEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7O2dCQUUvQkEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBRUE7b0JBQ1hBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBOztvQkFFM0JBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUNqQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2pDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDakNBLE1BQU1BLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUVBO29CQUMvQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0E7O29CQUUvQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2pDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDakNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2lCQUNqQ0EsTUFBTUEsSUFBSUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBRUE7b0JBQzFCQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQTs7b0JBRS9DQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDakNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUNqQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7aUJBQ2pDQSxLQUFNQTtvQkFDTkEsR0FBR0EsQ0FBQ0Es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Q0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDMVFBLENBQUNBOztJQUtEaEI7O01BREdBO2tDQUNIQTtRQUVDaUIsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBRUE7SUFDakVBLENBQUNBOztJQUtEakI7O01BREdBOzJCQUNIQSxVQUFtQkEsT0FBZ0JBLEVBQUVBLEtBQWNBLEVBQUVBLE9BQWNBO1FBRWxFa0IsSUFBSUEsQ0FBQ0EsR0FBWUEsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDL0JBLEtBQUtBLElBQUlBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO1lBQ2pDQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxPQUFPQSxDQUFDQTs7UUFFckZBLE9BQU9BLENBQUNBO0lBQ1RBLENBQUNBOztJQUtEbEI7O01BREdBO3VDQUNIQSxVQUFxQkEsS0FBY0EsRUFBRUEsT0FBY0E7UUFFbERtQixLQUFLQSxJQUFJQSxDQUFDQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtZQUNqQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsT0FBT0EsQ0FBQ0E7SUFDbkZBLENBQUNBOztJQUtEbkI7O01BREdBO2dDQUNIQTtRQUVDb0IsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0E7UUFDeEJBLElBQUlBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLGFBQWFBOztRQUU1Q0EsSUFBSUEsVUFBVUEsQ0FBRUE7WUFDZkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0E7WUFDUEEsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO1lBQ2hDQSxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNoQ0EsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDakNBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO1lBQ2hDQSxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNoQ0EsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBO1lBQ2pDQSxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNoQ0EsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBO1lBQ2pDQSxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNqQ0EsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO1lBQ2hDQSxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNqQ0EsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7O1lBRWpDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNqR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDbEdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2pHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNsR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDbEdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2pHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNsR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDakdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2pHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNsR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDbEdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ25HQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNuR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDbEdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUNBLENBQUNBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ25HQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtTQUNsR0E7UUFDREEsT0FBT0EsVUFBVUE7SUFDbEJBLENBQUNBOztJQVdEcEI7Ozs7TUFMR0E7SUFFSEE7O01BRUdBO2lDQUNIQSxVQUFlQSxHQUFZQTtRQUUxQnFCLElBQUlBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBOztRQUU5OUJBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBO1FBQy9EQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQTtRQUMvREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUE7UUFDL0RBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBOztRQUUvREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUE7UUFDL0RBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBO1FBQy9EQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQTtRQUMvREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUE7O1FBRS9EQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQTtRQUMvREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUE7UUFDL0RBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBO1FBQ2hFQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQTs7UUFFaEVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBO1FBQ2hFQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQTtRQUNoRUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBQ0EsSUFBSUE7UUFDaEVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBO0lBQ2pFQSxDQUFDQTs7SUFLRHJCOztNQURHQTt5Q0FDSEEsVUFBdUJBLE9BQWNBLEVBQUVBLElBQWFBO1FBRW5Ec0IsSUFBSUEsQ0FBQ0EsR0FBWUEsUUFBUUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsT0FBT0EsQ0FBQ0E7O1FBRTFFQTs7Ozs7O1VBTUdBO1FBQ0hBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO0lBQ2hCQSxDQUFDQTs7SUFLRHRCOztNQURHQTtzQ0FDSEEsVUFBb0JBLE1BQWFBLEVBQUVBLE1BQWFBLEVBQUVBLE1BQWFBO1FBRzlEdUIscUJBQXFCQTtRQUVyQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBRUEsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0E7SUFDOUZBLENBQUNBOztJQUtEdkI7O01BREdBOzRDQUNIQSxVQUEwQkEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsQ0FBUUE7UUFHckR3QixxQkFBcUJBO1FBRXJCQSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUN0QkEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDbENBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO0lBQ2hCQSxDQUFDQTs7SUFNRHhCLHdCQUp3QkE7SUFDeEJBOztNQUVHQTttQ0FDSEEsVUFBaUJBLFVBQXFCQTtRQUdyQ3lCLHFCQUFxQkE7UUFFckJBLElBQUlBLFVBQVVBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBO1lBQUVBLE9BQU9BLEtBQUtBLENBQUFBOztRQUV2Q0EscUZBQXFGQTtRQUVyRkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDZkEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O1FBRW5FQSxJQUFJQSxLQUFLQTtRQUNUQSxLQUFLQSxHQUFHQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN4QkEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDcklBLEtBQUtBLEdBQUdBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQ3hCQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNwSUEsS0FBS0EsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDeEJBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOztRQUVwSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBOztRQUVwQkEsT0FBT0EsSUFBSUE7SUFDWkEsQ0FBQ0E7O0lBRUR6QixxQ0FBQUEsVUFBdUJBLENBQVVBO1FBRWhDMEIsSUFBSUEsQ0FBQ0EsR0FBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDbEJBLElBQUlBLENBQUNBLEdBQVVBLENBQUNBLENBQUNBLENBQUNBO1FBQ2xCQSxJQUFJQSxDQUFDQSxHQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTs7UUFFbEJBLE9BQU9BLElBQUlBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO0lBQ3RWQSxDQUFDQTs7SUFLRDFCOztNQURHQTswQ0FDSEEsVUFBd0JBLEdBQVlBLEVBQUVBLElBQWFBO1FBR2xEMkIscUJBQXFCQTtRQUVyQkEsSUFBSUEsQ0FBQ0EsR0FBVUEsQ0FBQ0E7UUFDaEJBLElBQUlBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQVVBLENBQUNBOztRQUU1Q0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBRUE7WUFDM0JBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2RBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2RBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBO1lBQ3RGQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUMxRkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDM0ZBLENBQUNBLElBQUlBLENBQUNBO1NBQ05BO0lBQ0ZBLENBQUNBOztJQUtEM0I7O01BREdBO21DQUNIQTtRQUdDNEIscUJBQXFCQTtRQUVyQkEsSUFBSUEsUUFBUUEsR0FBWUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O1FBRTdDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM3QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLFFBQVFBLENBQUNBLEVBQUVBLENBQUNBO1FBQzlCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM3QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLFFBQVFBLENBQUNBLEVBQUVBLENBQUNBO1FBQzlCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM3QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFFBQVFBLENBQUNBLEVBQUVBLENBQUNBO1FBQy9CQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM5QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFFBQVFBLENBQUNBLEVBQUVBLENBQUNBO0lBQ2hDQSxDQUFDQTs7SUFFRDVCLDJCQUFBQSxVQUF1QkEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsT0FBY0E7UUFHbEU2Qix5REFBeURBO1FBRXpEQSxJQUFJQSxDQUFDQSxHQUFZQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQTs7UUFFL0JBLElBQUlBLEdBQUdBLEdBQUdBLE9BQU9BLEdBQUNBLENBQUVBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLEdBQUdBLENBQUVBO1FBQ2pDQSxJQUFJQSxDQUFDQSxHQUFVQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUM1QkEsSUFBSUEsQ0FBQ0EsR0FBVUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDNUJBLElBQUlBLENBQUNBLEdBQVVBLENBQUNBLEdBQUdBLENBQUNBO1FBQ3BCQSxJQUFJQSxJQUFJQSxFQUFTQSxJQUFJQTs7UUFFckJBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLEdBQUNBLENBQUNBO1FBQ3hCQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQSxHQUFDQSxDQUFDQTtRQUN4QkEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0E7O1FBRXpCQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQSxHQUFDQSxDQUFDQTtRQUNaQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQTtRQUNWQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFHQSxJQUFJQTtRQUMxQkEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBR0EsSUFBSUE7UUFDMUJBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLEdBQUNBLENBQUNBO1FBQ1pBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBO1FBQ1ZBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLEdBQUdBLElBQUlBO1FBQzFCQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFHQSxJQUFJQTtRQUMxQkEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0E7UUFDWkEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0E7UUFDVkEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBR0EsSUFBSUE7UUFDMUJBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLEdBQUdBLElBQUlBOztRQUUxQkEsT0FBT0EsQ0FBQ0E7SUFDVEEsQ0FBQ0E7O0lBS0Q3QjtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBVUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDeDFCQSxDQUFDQTs7OztBQUFBQTtJQU1EQTtRQUFBQTs7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1FBQzFFQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUFvQkEsS0FBY0E7WUFFakNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBO1lBQzFCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUMxQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDM0JBLENBQUNBOzs7O0FBUEFBOztJQVNEQSw2QkFBQUEsVUFBZUEsWUFBbUJBO1FBRWpDOEIsSUFBSUEsU0FBU0EsR0FBVUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsRUFBRUEsWUFBWUEsQ0FBQ0E7UUFDakRBLE9BQU9BLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLFNBQVNBLENBQUNBLEdBQUNBLFNBQVNBLEdBQUdBLEdBQUdBO0lBQ3o1QkEsQ0FBQ0E7O0lBRUQ5Qiw4QkFBQUE7UUFFQytCLE9BQU9BLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLEdBQUdBO0lBQ3p2QkEsQ0FBQ0E7SUFDRi9CLGdCQUFDQTtBQUFEQSxDQUFDQSxJQUFBOztBQUVELHlCQUFrQixDQUFBIiwiZmlsZSI6ImNvcmUvZ2VvbS9NYXRyaXgzRC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPcmllbnRhdGlvbjNEXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9PcmllbnRhdGlvbjNEXCIpO1xuaW1wb3J0IFF1YXRlcm5pb25cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vUXVhdGVybmlvblwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IEFyZ3VtZW50RXJyb3JcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0FyZ3VtZW50RXJyb3JcIik7XG5cbmNsYXNzIE1hdHJpeDNEXG57XG5cdC8qKlxuXHQgKiBBIFZlY3RvciBvZiAxNiBOdW1iZXJzLCB3aGVyZSBldmVyeSBmb3VyIGVsZW1lbnRzIGlzIGEgY29sdW1uIG9mIGEgNHg0IG1hdHJpeC5cblx0ICpcblx0ICogPHA+QW4gZXhjZXB0aW9uIGlzIHRocm93biBpZiB0aGUgcmF3RGF0YSBwcm9wZXJ0eSBpcyBzZXQgdG8gYSBtYXRyaXggdGhhdCBpcyBub3QgaW52ZXJ0aWJsZS4gVGhlIE1hdHJpeDNEXG5cdCAqIG9iamVjdCBtdXN0IGJlIGludmVydGlibGUuIElmIGEgbm9uLWludmVydGlibGUgbWF0cml4IGlzIG5lZWRlZCwgY3JlYXRlIGEgc3ViY2xhc3Mgb2YgdGhlIE1hdHJpeDNEIG9iamVjdC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgcmF3RGF0YTpudW1iZXJbXTtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIE1hdHJpeDNEIG9iamVjdC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHY6bnVtYmVyW10gPSBudWxsKVxuXHR7XG5cdFx0aWYgKHYgIT0gbnVsbCAmJiB2Lmxlbmd0aCA9PSAxNilcblx0XHRcdHRoaXMucmF3RGF0YSA9IHYuY29uY2F0KCk7XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5yYXdEYXRhID0gWyAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxIF07XG5cdH1cblxuXHQvKipcblx0ICogQXBwZW5kcyB0aGUgbWF0cml4IGJ5IG11bHRpcGx5aW5nIGFub3RoZXIgTWF0cml4M0Qgb2JqZWN0IGJ5IHRoZSBjdXJyZW50IE1hdHJpeDNEIG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBhcHBlbmQobGhzOk1hdHJpeDNEKVxuXHR7XG5cdFx0dmFyIG0xMTE6bnVtYmVyID0gdGhpcy5yYXdEYXRhWzBdLCBtMTIxOm51bWJlciA9IHRoaXMucmF3RGF0YVs0XSwgbTEzMTpudW1iZXIgPSB0aGlzLnJhd0RhdGFbOF0sIG0xNDE6bnVtYmVyID0gdGhpcy5yYXdEYXRhWzEyXSwgbTExMjpudW1iZXIgPSB0aGlzLnJhd0RhdGFbMV0sIG0xMjI6bnVtYmVyID0gdGhpcy5yYXdEYXRhWzVdLCBtMTMyOm51bWJlciA9IHRoaXMucmF3RGF0YVs5XSwgbTE0MjpudW1iZXIgPSB0aGlzLnJhd0RhdGFbMTNdLCBtMTEzOm51bWJlciA9IHRoaXMucmF3RGF0YVsyXSwgbTEyMzpudW1iZXIgPSB0aGlzLnJhd0RhdGFbNl0sIG0xMzM6bnVtYmVyID0gdGhpcy5yYXdEYXRhWzEwXSwgbTE0MzpudW1iZXIgPSB0aGlzLnJhd0RhdGFbMTRdLCBtMTE0Om51bWJlciA9IHRoaXMucmF3RGF0YVszXSwgbTEyNDpudW1iZXIgPSB0aGlzLnJhd0RhdGFbN10sIG0xMzQ6bnVtYmVyID0gdGhpcy5yYXdEYXRhWzExXSwgbTE0NDpudW1iZXIgPSB0aGlzLnJhd0RhdGFbMTVdLCBtMjExOm51bWJlciA9IGxocy5yYXdEYXRhWzBdLCBtMjIxOm51bWJlciA9IGxocy5yYXdEYXRhWzRdLCBtMjMxOm51bWJlciA9IGxocy5yYXdEYXRhWzhdLCBtMjQxOm51bWJlciA9IGxocy5yYXdEYXRhWzEyXSwgbTIxMjpudW1iZXIgPSBsaHMucmF3RGF0YVsxXSwgbTIyMjpudW1iZXIgPSBsaHMucmF3RGF0YVs1XSwgbTIzMjpudW1iZXIgPSBsaHMucmF3RGF0YVs5XSwgbTI0MjpudW1iZXIgPSBsaHMucmF3RGF0YVsxM10sIG0yMTM6bnVtYmVyID0gbGhzLnJhd0RhdGFbMl0sIG0yMjM6bnVtYmVyID0gbGhzLnJhd0RhdGFbNl0sIG0yMzM6bnVtYmVyID0gbGhzLnJhd0RhdGFbMTBdLCBtMjQzOm51bWJlciA9IGxocy5yYXdEYXRhWzE0XSwgbTIxNDpudW1iZXIgPSBsaHMucmF3RGF0YVszXSwgbTIyNDpudW1iZXIgPSBsaHMucmF3RGF0YVs3XSwgbTIzNDpudW1iZXIgPSBsaHMucmF3RGF0YVsxMV0sIG0yNDQ6bnVtYmVyID0gbGhzLnJhd0RhdGFbMTVdO1xuXG5cdFx0dGhpcy5yYXdEYXRhWzBdID0gbTExMSptMjExICsgbTExMiptMjIxICsgbTExMyptMjMxICsgbTExNCptMjQxO1xuXHRcdHRoaXMucmF3RGF0YVsxXSA9IG0xMTEqbTIxMiArIG0xMTIqbTIyMiArIG0xMTMqbTIzMiArIG0xMTQqbTI0Mjtcblx0XHR0aGlzLnJhd0RhdGFbMl0gPSBtMTExKm0yMTMgKyBtMTEyKm0yMjMgKyBtMTEzKm0yMzMgKyBtMTE0Km0yNDM7XG5cdFx0dGhpcy5yYXdEYXRhWzNdID0gbTExMSptMjE0ICsgbTExMiptMjI0ICsgbTExMyptMjM0ICsgbTExNCptMjQ0O1xuXG5cdFx0dGhpcy5yYXdEYXRhWzRdID0gbTEyMSptMjExICsgbTEyMiptMjIxICsgbTEyMyptMjMxICsgbTEyNCptMjQxO1xuXHRcdHRoaXMucmF3RGF0YVs1XSA9IG0xMjEqbTIxMiArIG0xMjIqbTIyMiArIG0xMjMqbTIzMiArIG0xMjQqbTI0Mjtcblx0XHR0aGlzLnJhd0RhdGFbNl0gPSBtMTIxKm0yMTMgKyBtMTIyKm0yMjMgKyBtMTIzKm0yMzMgKyBtMTI0Km0yNDM7XG5cdFx0dGhpcy5yYXdEYXRhWzddID0gbTEyMSptMjE0ICsgbTEyMiptMjI0ICsgbTEyMyptMjM0ICsgbTEyNCptMjQ0O1xuXG5cdFx0dGhpcy5yYXdEYXRhWzhdID0gbTEzMSptMjExICsgbTEzMiptMjIxICsgbTEzMyptMjMxICsgbTEzNCptMjQxO1xuXHRcdHRoaXMucmF3RGF0YVs5XSA9IG0xMzEqbTIxMiArIG0xMzIqbTIyMiArIG0xMzMqbTIzMiArIG0xMzQqbTI0Mjtcblx0XHR0aGlzLnJhd0RhdGFbMTBdID0gbTEzMSptMjEzICsgbTEzMiptMjIzICsgbTEzMyptMjMzICsgbTEzNCptMjQzO1xuXHRcdHRoaXMucmF3RGF0YVsxMV0gPSBtMTMxKm0yMTQgKyBtMTMyKm0yMjQgKyBtMTMzKm0yMzQgKyBtMTM0Km0yNDQ7XG5cblx0XHR0aGlzLnJhd0RhdGFbMTJdID0gbTE0MSptMjExICsgbTE0MiptMjIxICsgbTE0MyptMjMxICsgbTE0NCptMjQxO1xuXHRcdHRoaXMucmF3RGF0YVsxM10gPSBtMTQxKm0yMTIgKyBtMTQyKm0yMjIgKyBtMTQzKm0yMzIgKyBtMTQ0Km0yNDI7XG5cdFx0dGhpcy5yYXdEYXRhWzE0XSA9IG0xNDEqbTIxMyArIG0xNDIqbTIyMyArIG0xNDMqbTIzMyArIG0xNDQqbTI0Mztcblx0XHR0aGlzLnJhd0RhdGFbMTVdID0gbTE0MSptMjE0ICsgbTE0MiptMjI0ICsgbTE0MyptMjM0ICsgbTE0NCptMjQ0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGVuZHMgYW4gaW5jcmVtZW50YWwgcm90YXRpb24gdG8gYSBNYXRyaXgzRCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgYXBwZW5kUm90YXRpb24oZGVncmVlczpudW1iZXIsIGF4aXM6VmVjdG9yM0QpOnZvaWQgLy8sIHBpdm90OlZlY3RvcjNEID0gbnVsbCApXG5cdHtcblx0XHR2YXIgbTpNYXRyaXgzRCA9IE1hdHJpeDNELmdldEF4aXNSb3RhdGlvbihheGlzLngsIGF4aXMueSwgYXhpcy56LCBkZWdyZWVzKTtcblxuXHRcdHRoaXMuYXBwZW5kKG0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGVuZHMgYW4gaW5jcmVtZW50YWwgc2NhbGUgY2hhbmdlIGFsb25nIHRoZSB4LCB5LCBhbmQgeiBheGVzIHRvIGEgTWF0cml4M0Qgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGFwcGVuZFNjYWxlKHhTY2FsZTpudW1iZXIsIHlTY2FsZTpudW1iZXIsIHpTY2FsZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLmFwcGVuZChuZXcgTWF0cml4M0QoWyB4U2NhbGUsIDAuMCwgMC4wLCAwLjAsIDAuMCwgeVNjYWxlLCAwLjAsIDAuMCwgMC4wLCAwLjAsIHpTY2FsZSwgMC4wLCAwLjAsIDAuMCwgMC4wLCAxLjAgXSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGVuZHMgYW4gaW5jcmVtZW50YWwgdHJhbnNsYXRpb24sIGEgcmVwb3NpdGlvbmluZyBhbG9uZyB0aGUgeCwgeSwgYW5kIHogYXhlcywgdG8gYSBNYXRyaXgzRCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgYXBwZW5kVHJhbnNsYXRpb24oeDpudW1iZXIsIHk6bnVtYmVyLCB6Om51bWJlcilcblx0e1xuXHRcdHRoaXMucmF3RGF0YVsxMl0gKz0geDtcblx0XHR0aGlzLnJhd0RhdGFbMTNdICs9IHk7XG5cdFx0dGhpcy5yYXdEYXRhWzE0XSArPSB6O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBuZXcgTWF0cml4M0Qgb2JqZWN0IHRoYXQgaXMgYW4gZXhhY3QgY29weSBvZiB0aGUgY3VycmVudCBNYXRyaXgzRCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgY2xvbmUoKTpNYXRyaXgzRFxuXHR7XG5cdFx0cmV0dXJuIG5ldyBNYXRyaXgzRCh0aGlzLnJhd0RhdGEuc2xpY2UoMCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvcGllcyBhIFZlY3RvcjNEIG9iamVjdCBpbnRvIHNwZWNpZmljIGNvbHVtbiBvZiB0aGUgY2FsbGluZyBNYXRyaXgzRCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgY29weUNvbHVtbkZyb20oY29sdW1uOm51bWJlciwgdmVjdG9yM0Q6VmVjdG9yM0QpXG5cdHtcblx0XHRzd2l0Y2ggKGNvbHVtbikge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHR0aGlzLnJhd0RhdGFbIDAgXSA9IHZlY3RvcjNELng7XG5cdFx0XHRcdHRoaXMucmF3RGF0YVsgMSBdID0gdmVjdG9yM0QueTtcblx0XHRcdFx0dGhpcy5yYXdEYXRhWyAyIF0gPSB2ZWN0b3IzRC56O1xuXHRcdFx0XHR0aGlzLnJhd0RhdGFbIDMgXSA9IHZlY3RvcjNELnc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHR0aGlzLnJhd0RhdGFbIDQgXSA9IHZlY3RvcjNELng7XG5cdFx0XHRcdHRoaXMucmF3RGF0YVsgNSBdID0gdmVjdG9yM0QueTtcblx0XHRcdFx0dGhpcy5yYXdEYXRhWyA2IF0gPSB2ZWN0b3IzRC56O1xuXHRcdFx0XHR0aGlzLnJhd0RhdGFbIDcgXSA9IHZlY3RvcjNELnc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHR0aGlzLnJhd0RhdGFbIDggXSA9IHZlY3RvcjNELng7XG5cdFx0XHRcdHRoaXMucmF3RGF0YVsgOSBdID0gdmVjdG9yM0QueTtcblx0XHRcdFx0dGhpcy5yYXdEYXRhWyAxMCBdID0gdmVjdG9yM0Quejtcblx0XHRcdFx0dGhpcy5yYXdEYXRhWyAxMSBdID0gdmVjdG9yM0Qudztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDM6XG5cdFx0XHRcdHRoaXMucmF3RGF0YVsgMTIgXSA9IHZlY3RvcjNELng7XG5cdFx0XHRcdHRoaXMucmF3RGF0YVsgMTMgXSA9IHZlY3RvcjNELnk7XG5cdFx0XHRcdHRoaXMucmF3RGF0YVsgMTQgXSA9IHZlY3RvcjNELno7XG5cdFx0XHRcdHRoaXMucmF3RGF0YVsgMTUgXSA9IHZlY3RvcjNELnc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgbmV3IEFyZ3VtZW50RXJyb3IoXCJBcmd1bWVudEVycm9yLCBDb2x1bW4gXCIgKyBjb2x1bW4gKyBcIiBvdXQgb2YgYm91bmRzIFswLCAuLi4sIDNdXCIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb3BpZXMgc3BlY2lmaWMgY29sdW1uIG9mIHRoZSBjYWxsaW5nIE1hdHJpeDNEIG9iamVjdCBpbnRvIHRoZSBWZWN0b3IzRCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgY29weUNvbHVtblRvKGNvbHVtbjpudW1iZXIsIHZlY3RvcjNEOlZlY3RvcjNEKVxuXHR7XG5cdFx0c3dpdGNoIChjb2x1bW4pIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0dmVjdG9yM0QueCA9IHRoaXMucmF3RGF0YVsgMCBdO1xuXHRcdFx0XHR2ZWN0b3IzRC55ID0gdGhpcy5yYXdEYXRhWyAxIF07XG5cdFx0XHRcdHZlY3RvcjNELnogPSB0aGlzLnJhd0RhdGFbIDIgXTtcblx0XHRcdFx0dmVjdG9yM0QudyA9IHRoaXMucmF3RGF0YVsgMyBdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0dmVjdG9yM0QueCA9IHRoaXMucmF3RGF0YVsgNCBdO1xuXHRcdFx0XHR2ZWN0b3IzRC55ID0gdGhpcy5yYXdEYXRhWyA1IF07XG5cdFx0XHRcdHZlY3RvcjNELnogPSB0aGlzLnJhd0RhdGFbIDYgXTtcblx0XHRcdFx0dmVjdG9yM0QudyA9IHRoaXMucmF3RGF0YVsgNyBdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0dmVjdG9yM0QueCA9IHRoaXMucmF3RGF0YVsgOCBdO1xuXHRcdFx0XHR2ZWN0b3IzRC55ID0gdGhpcy5yYXdEYXRhWyA5IF07XG5cdFx0XHRcdHZlY3RvcjNELnogPSB0aGlzLnJhd0RhdGFbIDEwIF07XG5cdFx0XHRcdHZlY3RvcjNELncgPSB0aGlzLnJhd0RhdGFbIDExIF07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHR2ZWN0b3IzRC54ID0gdGhpcy5yYXdEYXRhWyAxMiBdO1xuXHRcdFx0XHR2ZWN0b3IzRC55ID0gdGhpcy5yYXdEYXRhWyAxMyBdO1xuXHRcdFx0XHR2ZWN0b3IzRC56ID0gdGhpcy5yYXdEYXRhWyAxNCBdO1xuXHRcdFx0XHR2ZWN0b3IzRC53ID0gdGhpcy5yYXdEYXRhWyAxNSBdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IG5ldyBBcmd1bWVudEVycm9yKFwiQXJndW1lbnRFcnJvciwgQ29sdW1uIFwiICsgY29sdW1uICsgXCIgb3V0IG9mIGJvdW5kcyBbMCwgLi4uLCAzXVwiKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ29waWVzIGFsbCBvZiB0aGUgbWF0cml4IGRhdGEgZnJvbSB0aGUgc291cmNlIE1hdHJpeDNEIG9iamVjdCBpbnRvIHRoZSBjYWxsaW5nIE1hdHJpeDNEIG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBjb3B5RnJvbShzb3VyY2VNYXRyaXgzRDpNYXRyaXgzRClcblx0e1xuXHRcdHZhciBsZW46bnVtYmVyID0gc291cmNlTWF0cml4M0QucmF3RGF0YS5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgYzpudW1iZXIgPSAwOyBjIDwgbGVuOyBjKyspXG5cdFx0XHR0aGlzLnJhd0RhdGFbY10gPSBzb3VyY2VNYXRyaXgzRC5yYXdEYXRhW2NdO1xuXHR9XG5cblx0cHVibGljIGNvcHlSYXdEYXRhRnJvbSh2ZWN0b3I6bnVtYmVyW10sIGluZGV4Om51bWJlciA9IDAsIHRyYW5zcG9zZTpib29sZWFuID0gZmFsc2UpOnZvaWRcblx0e1xuXHRcdGlmICh0cmFuc3Bvc2UpXG5cdFx0XHR0aGlzLnRyYW5zcG9zZSgpO1xuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB2ZWN0b3IubGVuZ3RoIC0gaW5kZXg7XG5cdFx0Zm9yICh2YXIgYzpudW1iZXIgPSAwOyBjIDwgbGVuOyBjKyspXG5cdFx0XHR0aGlzLnJhd0RhdGFbY10gPSB2ZWN0b3JbYyArIGluZGV4XTtcblxuXHRcdGlmICh0cmFuc3Bvc2UpXG5cdFx0XHR0aGlzLnRyYW5zcG9zZSgpO1xuXHR9XG5cblx0cHVibGljIGNvcHlSYXdEYXRhVG8odmVjdG9yOm51bWJlcltdLCBpbmRleDpudW1iZXIgPSAwLCB0cmFuc3Bvc2U6Ym9vbGVhbiA9IGZhbHNlKVxuXHR7XG5cdFx0aWYgKHRyYW5zcG9zZSlcblx0XHRcdHRoaXMudHJhbnNwb3NlKCk7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMucmF3RGF0YS5sZW5ndGhcblx0XHRmb3IgKHZhciBjOm51bWJlciA9IDA7IGMgPCBsZW47IGMrKylcblx0XHRcdHZlY3RvcltjICsgaW5kZXggXSA9IHRoaXMucmF3RGF0YVtjXTtcblxuXHRcdGlmICh0cmFuc3Bvc2UpXG5cdFx0XHR0aGlzLnRyYW5zcG9zZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvcGllcyBhIFZlY3RvcjNEIG9iamVjdCBpbnRvIHNwZWNpZmljIHJvdyBvZiB0aGUgY2FsbGluZyBNYXRyaXgzRCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgY29weVJvd0Zyb20ocm93Om51bWJlciwgdmVjdG9yM0Q6VmVjdG9yM0QpXG5cdHtcblx0XHRzd2l0Y2ggKHJvdykge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHR0aGlzLnJhd0RhdGFbIDAgXSA9IHZlY3RvcjNELng7XG5cdFx0XHRcdHRoaXMucmF3RGF0YVsgNCBdID0gdmVjdG9yM0QueTtcblx0XHRcdFx0dGhpcy5yYXdEYXRhWyA4IF0gPSB2ZWN0b3IzRC56O1xuXHRcdFx0XHR0aGlzLnJhd0RhdGFbIDEyIF0gPSB2ZWN0b3IzRC53O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0dGhpcy5yYXdEYXRhWyAxIF0gPSB2ZWN0b3IzRC54O1xuXHRcdFx0XHR0aGlzLnJhd0RhdGFbIDUgXSA9IHZlY3RvcjNELnk7XG5cdFx0XHRcdHRoaXMucmF3RGF0YVsgOSBdID0gdmVjdG9yM0Quejtcblx0XHRcdFx0dGhpcy5yYXdEYXRhWyAxMyBdID0gdmVjdG9yM0Qudztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHRoaXMucmF3RGF0YVsgMiBdID0gdmVjdG9yM0QueDtcblx0XHRcdFx0dGhpcy5yYXdEYXRhWyA2IF0gPSB2ZWN0b3IzRC55O1xuXHRcdFx0XHR0aGlzLnJhd0RhdGFbIDEwIF0gPSB2ZWN0b3IzRC56O1xuXHRcdFx0XHR0aGlzLnJhd0RhdGFbIDE0IF0gPSB2ZWN0b3IzRC53O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzpcblx0XHRcdFx0dGhpcy5yYXdEYXRhWyAzIF0gPSB2ZWN0b3IzRC54O1xuXHRcdFx0XHR0aGlzLnJhd0RhdGFbIDcgXSA9IHZlY3RvcjNELnk7XG5cdFx0XHRcdHRoaXMucmF3RGF0YVsgMTEgXSA9IHZlY3RvcjNELno7XG5cdFx0XHRcdHRoaXMucmF3RGF0YVsgMTUgXSA9IHZlY3RvcjNELnc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgbmV3IEFyZ3VtZW50RXJyb3IoXCJBcmd1bWVudEVycm9yLCBSb3cgXCIgKyByb3cgKyBcIiBvdXQgb2YgYm91bmRzIFswLCAuLi4sIDNdXCIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb3BpZXMgc3BlY2lmaWMgcm93IG9mIHRoZSBjYWxsaW5nIE1hdHJpeDNEIG9iamVjdCBpbnRvIHRoZSBWZWN0b3IzRCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgY29weVJvd1RvKHJvdzpudW1iZXIsIHZlY3RvcjNEOlZlY3RvcjNEKVxuXHR7XG5cdFx0c3dpdGNoIChyb3cpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0dmVjdG9yM0QueCA9IHRoaXMucmF3RGF0YVsgMCBdO1xuXHRcdFx0XHR2ZWN0b3IzRC55ID0gdGhpcy5yYXdEYXRhWyA0IF07XG5cdFx0XHRcdHZlY3RvcjNELnogPSB0aGlzLnJhd0RhdGFbIDggXTtcblx0XHRcdFx0dmVjdG9yM0QudyA9IHRoaXMucmF3RGF0YVsgMTIgXTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHZlY3RvcjNELnggPSB0aGlzLnJhd0RhdGFbIDEgXTtcblx0XHRcdFx0dmVjdG9yM0QueSA9IHRoaXMucmF3RGF0YVsgNSBdO1xuXHRcdFx0XHR2ZWN0b3IzRC56ID0gdGhpcy5yYXdEYXRhWyA5IF07XG5cdFx0XHRcdHZlY3RvcjNELncgPSB0aGlzLnJhd0RhdGFbIDEzIF07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHR2ZWN0b3IzRC54ID0gdGhpcy5yYXdEYXRhWyAyIF07XG5cdFx0XHRcdHZlY3RvcjNELnkgPSB0aGlzLnJhd0RhdGFbIDYgXTtcblx0XHRcdFx0dmVjdG9yM0QueiA9IHRoaXMucmF3RGF0YVsgMTAgXTtcblx0XHRcdFx0dmVjdG9yM0QudyA9IHRoaXMucmF3RGF0YVsgMTQgXTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDM6XG5cdFx0XHRcdHZlY3RvcjNELnggPSB0aGlzLnJhd0RhdGFbIDMgXTtcblx0XHRcdFx0dmVjdG9yM0QueSA9IHRoaXMucmF3RGF0YVsgNyBdO1xuXHRcdFx0XHR2ZWN0b3IzRC56ID0gdGhpcy5yYXdEYXRhWyAxMSBdO1xuXHRcdFx0XHR2ZWN0b3IzRC53ID0gdGhpcy5yYXdEYXRhWyAxNSBdXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgbmV3IEFyZ3VtZW50RXJyb3IoXCJBcmd1bWVudEVycm9yLCBSb3cgXCIgKyByb3cgKyBcIiBvdXQgb2YgYm91bmRzIFswLCAuLi4sIDNdXCIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb3BpZXMgdGhpcyBNYXRyaXgzRCBvYmplY3QgaW50byBhIGRlc3RpbmF0aW9uIE1hdHJpeDNEIG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBjb3B5VG9NYXRyaXgzRChkZXN0Ok1hdHJpeDNEKVxuXHR7XG5cdFx0ZGVzdC5yYXdEYXRhID0gdGhpcy5yYXdEYXRhLnNsaWNlKDApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCdzIHRyYW5zbGF0aW9uLCByb3RhdGlvbiwgYW5kIHNjYWxlIHNldHRpbmdzIGFzIGEgVmVjdG9yIG9mIHRocmVlIFZlY3RvcjNEIG9iamVjdHMuXG5cdCAqL1xuXHRwdWJsaWMgZGVjb21wb3NlKG9yaWVudGF0aW9uU3R5bGU6c3RyaW5nID0gXCJldWxlckFuZ2xlc1wiKTpWZWN0b3IzRFtdXG5cdHtcblx0XHR2YXIgcTpRdWF0ZXJuaW9uO1xuXG5cdFx0Ly8gSW5pdGlhbCBUZXN0cyAtIE5vdCBPS1xuXG5cdFx0dmFyIHZlYzpWZWN0b3IzRFtdID0gW107XG5cdFx0dmFyIG0gPSB0aGlzLmNsb25lKCk7XG5cdFx0dmFyIG1yID0gbS5yYXdEYXRhO1xuXG5cdFx0dmFyIHBvczpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRChtclsxMl0sIG1yWzEzXSwgbXJbMTRdKTtcblx0XHRtclsxMl0gPSAwO1xuXHRcdG1yWzEzXSA9IDA7XG5cdFx0bXJbMTRdID0gMDtcblxuXHRcdHZhciBzY2FsZTpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXG5cdFx0c2NhbGUueCA9IE1hdGguc3FydChtclswXSptclswXSArIG1yWzFdKm1yWzFdICsgbXJbMl0qbXJbMl0pO1xuXHRcdHNjYWxlLnkgPSBNYXRoLnNxcnQobXJbNF0qbXJbNF0gKyBtcls1XSptcls1XSArIG1yWzZdKm1yWzZdKTtcblx0XHRzY2FsZS56ID0gTWF0aC5zcXJ0KG1yWzhdKm1yWzhdICsgbXJbOV0qbXJbOV0gKyBtclsxMF0qbXJbMTBdKTtcblxuXHRcdGlmIChtclswXSoobXJbNV0qbXJbMTBdIC0gbXJbNl0qbXJbOV0pIC0gbXJbMV0qKG1yWzRdKm1yWzEwXSAtIG1yWzZdKm1yWzhdKSArIG1yWzJdKihtcls0XSptcls5XSAtIG1yWzVdKm1yWzhdKSA8IDApXG5cdFx0XHRzY2FsZS56ID0gLXNjYWxlLno7XG5cblx0XHRtclswXSAvPSBzY2FsZS54O1xuXHRcdG1yWzFdIC89IHNjYWxlLng7XG5cdFx0bXJbMl0gLz0gc2NhbGUueDtcblx0XHRtcls0XSAvPSBzY2FsZS55O1xuXHRcdG1yWzVdIC89IHNjYWxlLnk7XG5cdFx0bXJbNl0gLz0gc2NhbGUueTtcblx0XHRtcls4XSAvPSBzY2FsZS56O1xuXHRcdG1yWzldIC89IHNjYWxlLno7XG5cdFx0bXJbMTBdIC89IHNjYWxlLno7XG5cblx0XHR2YXIgcm90ID0gbmV3IFZlY3RvcjNEKCk7XG5cblx0XHRzd2l0Y2ggKG9yaWVudGF0aW9uU3R5bGUpIHtcblx0XHRcdGNhc2UgT3JpZW50YXRpb24zRC5BWElTX0FOR0xFOlxuXG5cdFx0XHRcdHJvdC53ID0gTWF0aC5hY29zKChtclswXSArIG1yWzVdICsgbXJbMTBdIC0gMSkvMik7XG5cblx0XHRcdFx0dmFyIGxlbjpudW1iZXIgPSBNYXRoLnNxcnQoKG1yWzZdIC0gbXJbOV0pKihtcls2XSAtIG1yWzldKSArIChtcls4XSAtIG1yWzJdKSoobXJbOF0gLSBtclsyXSkgKyAobXJbMV0gLSBtcls0XSkqKG1yWzFdIC0gbXJbNF0pKTtcblx0XHRcdFx0cm90LnggPSAobXJbNl0gLSBtcls5XSkvbGVuO1xuXHRcdFx0XHRyb3QueSA9IChtcls4XSAtIG1yWzJdKS9sZW47XG5cdFx0XHRcdHJvdC56ID0gKG1yWzFdIC0gbXJbNF0pL2xlbjtcblxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgT3JpZW50YXRpb24zRC5RVUFURVJOSU9OOlxuXG5cdFx0XHRcdHZhciB0ciA9IG1yWzBdICsgbXJbNV0gKyBtclsxMF07XG5cblx0XHRcdFx0aWYgKHRyID4gMCkge1xuXHRcdFx0XHRcdHJvdC53ID0gTWF0aC5zcXJ0KDEgKyB0cikvMjtcblxuXHRcdFx0XHRcdHJvdC54ID0gKG1yWzZdIC0gbXJbOV0pLyg0KnJvdC53KTtcblx0XHRcdFx0XHRyb3QueSA9IChtcls4XSAtIG1yWzJdKS8oNCpyb3Qudyk7XG5cdFx0XHRcdFx0cm90LnogPSAobXJbMV0gLSBtcls0XSkvKDQqcm90LncpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKChtclswXSA+IG1yWzVdKSAmJiAobXJbMF0gPiBtclsxMF0pKSB7XG5cdFx0XHRcdFx0cm90LnggPSBNYXRoLnNxcnQoMSArIG1yWzBdIC0gbXJbNV0gLSBtclsxMF0pLzI7XG5cblx0XHRcdFx0XHRyb3QudyA9IChtcls2XSAtIG1yWzldKS8oNCpyb3QueCk7XG5cdFx0XHRcdFx0cm90LnkgPSAobXJbMV0gKyBtcls0XSkvKDQqcm90LngpO1xuXHRcdFx0XHRcdHJvdC56ID0gKG1yWzhdICsgbXJbMl0pLyg0KnJvdC54KTtcblx0XHRcdFx0fSBlbHNlIGlmIChtcls1XSA+IG1yWzEwXSkge1xuXHRcdFx0XHRcdHJvdC55ID0gTWF0aC5zcXJ0KDEgKyBtcls1XSAtIG1yWzBdIC0gbXJbMTBdKS8yO1xuXG5cdFx0XHRcdFx0cm90LnggPSAobXJbMV0gKyBtcls0XSkvKDQqcm90LnkpO1xuXHRcdFx0XHRcdHJvdC53ID0gKG1yWzhdIC0gbXJbMl0pLyg0KnJvdC55KTtcblx0XHRcdFx0XHRyb3QueiA9IChtcls2XSArIG1yWzldKS8oNCpyb3QueSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cm90LnogPSBNYXRoLnNxcnQoMSArIG1yWzEwXSAtIG1yWzBdIC0gbXJbNV0pLzI7XG5cblx0XHRcdFx0XHRyb3QueCA9IChtcls4XSArIG1yWzJdKS8oNCpyb3Queik7XG5cdFx0XHRcdFx0cm90LnkgPSAobXJbNl0gKyBtcls5XSkvKDQqcm90LnopO1xuXHRcdFx0XHRcdHJvdC53ID0gKG1yWzFdIC0gbXJbNF0pLyg0KnJvdC56KTtcblx0XHRcdFx0fVxuXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIE9yaWVudGF0aW9uM0QuRVVMRVJfQU5HTEVTOlxuXG5cdFx0XHRcdHJvdC55ID0gTWF0aC5hc2luKC1tclsyXSk7XG5cblx0XHRcdFx0Ly92YXIgY29zOm51bWJlciA9IE1hdGguY29zKHJvdC55KTtcblxuXHRcdFx0XHRpZiAobXJbMl0gIT0gMSAmJiBtclsyXSAhPSAtMSkge1xuXHRcdFx0XHRcdHJvdC54ID0gTWF0aC5hdGFuMihtcls2XSwgbXJbMTBdKTtcblx0XHRcdFx0XHRyb3QueiA9IE1hdGguYXRhbjIobXJbMV0sIG1yWzBdKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyb3QueiA9IDA7XG5cdFx0XHRcdFx0cm90LnggPSBNYXRoLmF0YW4yKG1yWzRdLCBtcls1XSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHR2ZWMucHVzaChwb3MpO1xuXHRcdHZlYy5wdXNoKHJvdCk7XG5cdFx0dmVjLnB1c2goc2NhbGUpO1xuXG5cdFx0cmV0dXJuIHZlYztcblx0fVxuXG5cdC8qKlxuXHQgKiBVc2VzIHRoZSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggd2l0aG91dCBpdHMgdHJhbnNsYXRpb24gZWxlbWVudHMgdG8gdHJhbnNmb3JtIGEgVmVjdG9yM0Qgb2JqZWN0IGZyb20gb25lIHNwYWNlXG5cdCAqIGNvb3JkaW5hdGUgdG8gYW5vdGhlci5cblx0ICovXG5cdHB1YmxpYyBkZWx0YVRyYW5zZm9ybVZlY3Rvcih2OlZlY3RvcjNEKTpWZWN0b3IzRFxuXHR7XG5cdFx0dmFyIHg6bnVtYmVyID0gdi54O1xuXHRcdHZhciB5Om51bWJlciA9IHYueTtcblx0XHR2YXIgejpudW1iZXIgPSB2Lno7XG5cblx0XHRyZXR1cm4gbmV3IFZlY3RvcjNEKCh4KnRoaXMucmF3RGF0YVswXSArIHkqdGhpcy5yYXdEYXRhWzRdICsgeip0aGlzLnJhd0RhdGFbOF0pLCAoeCp0aGlzLnJhd0RhdGFbMV0gKyB5KnRoaXMucmF3RGF0YVs1XSArIHoqdGhpcy5yYXdEYXRhWzldKSwgKHgqdGhpcy5yYXdEYXRhWzJdICsgeSp0aGlzLnJhd0RhdGFbNl0gKyB6KnRoaXMucmF3RGF0YVsxMF0pLCAoeCp0aGlzLnJhd0RhdGFbM10gKyB5KnRoaXMucmF3RGF0YVs3XSArIHoqdGhpcy5yYXdEYXRhWzExXSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIHRoZSBjdXJyZW50IG1hdHJpeCB0byBhbiBpZGVudGl0eSBvciB1bml0IG1hdHJpeC5cblx0ICovXG5cdHB1YmxpYyBpZGVudGl0eSgpXG5cdHtcblx0XHR0aGlzLnJhd0RhdGEgPSBbMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSBdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFtzdGF0aWNdIEludGVycG9sYXRlcyB0aGUgdHJhbnNsYXRpb24sIHJvdGF0aW9uLCBhbmQgc2NhbGUgdHJhbnNmb3JtYXRpb24gb2Ygb25lIG1hdHJpeCB0b3dhcmQgdGhvc2Ugb2YgdGhlIHRhcmdldCBtYXRyaXguXG5cdCAqL1xuXHRzdGF0aWMgaW50ZXJwb2xhdGUodGhpc01hdDpNYXRyaXgzRCwgdG9NYXQ6TWF0cml4M0QsIHBlcmNlbnQ6bnVtYmVyKTpNYXRyaXgzRFxuXHR7XG5cdFx0dmFyIG06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCAxNjsgKytpKVxuXHRcdFx0bS5yYXdEYXRhW2ldID0gdGhpc01hdC5yYXdEYXRhW2ldICsgKHRvTWF0LnJhd0RhdGFbaV0gLSB0aGlzTWF0LnJhd0RhdGFbaV0pKnBlcmNlbnQ7XG5cblx0XHRyZXR1cm4gbTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbnRlcnBvbGF0ZXMgdGhpcyBtYXRyaXggdG93YXJkcyB0aGUgdHJhbnNsYXRpb24sIHJvdGF0aW9uLCBhbmQgc2NhbGUgdHJhbnNmb3JtYXRpb25zIG9mIHRoZSB0YXJnZXQgbWF0cml4LlxuXHQgKi9cblx0cHVibGljIGludGVycG9sYXRlVG8odG9NYXQ6TWF0cml4M0QsIHBlcmNlbnQ6bnVtYmVyKVxuXHR7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgMTY7ICsraSlcblx0XHRcdHRoaXMucmF3RGF0YVtpXSA9IHRoaXMucmF3RGF0YVtpXSArICh0b01hdC5yYXdEYXRhW2ldIC0gdGhpcy5yYXdEYXRhW2ldKSpwZXJjZW50O1xuXHR9XG5cblx0LyoqXG5cdCAqIEludmVydHMgdGhlIGN1cnJlbnQgbWF0cml4LlxuXHQgKi9cblx0cHVibGljIGludmVydCgpOmJvb2xlYW5cblx0e1xuXHRcdHZhciBkID0gdGhpcy5kZXRlcm1pbmFudDtcblx0XHR2YXIgaW52ZXJ0YWJsZSA9IE1hdGguYWJzKGQpID4gMC4wMDAwMDAwMDAwMTtcblxuXHRcdGlmIChpbnZlcnRhYmxlKSB7XG5cdFx0XHRkID0gMS9kO1xuXHRcdFx0dmFyIG0xMTpudW1iZXIgPSB0aGlzLnJhd0RhdGFbMF07XG5cdFx0XHR2YXIgbTIxOm51bWJlciA9IHRoaXMucmF3RGF0YVs0XTtcblx0XHRcdHZhciBtMzE6bnVtYmVyID0gdGhpcy5yYXdEYXRhWzhdO1xuXHRcdFx0dmFyIG00MTpudW1iZXIgPSB0aGlzLnJhd0RhdGFbMTJdO1xuXHRcdFx0dmFyIG0xMjpudW1iZXIgPSB0aGlzLnJhd0RhdGFbMV07XG5cdFx0XHR2YXIgbTIyOm51bWJlciA9IHRoaXMucmF3RGF0YVs1XTtcblx0XHRcdHZhciBtMzI6bnVtYmVyID0gdGhpcy5yYXdEYXRhWzldO1xuXHRcdFx0dmFyIG00MjpudW1iZXIgPSB0aGlzLnJhd0RhdGFbMTNdO1xuXHRcdFx0dmFyIG0xMzpudW1iZXIgPSB0aGlzLnJhd0RhdGFbMl07XG5cdFx0XHR2YXIgbTIzOm51bWJlciA9IHRoaXMucmF3RGF0YVs2XTtcblx0XHRcdHZhciBtMzM6bnVtYmVyID0gdGhpcy5yYXdEYXRhWzEwXTtcblx0XHRcdHZhciBtNDM6bnVtYmVyID0gdGhpcy5yYXdEYXRhWzE0XTtcblx0XHRcdHZhciBtMTQ6bnVtYmVyID0gdGhpcy5yYXdEYXRhWzNdO1xuXHRcdFx0dmFyIG0yNDpudW1iZXIgPSB0aGlzLnJhd0RhdGFbN107XG5cdFx0XHR2YXIgbTM0Om51bWJlciA9IHRoaXMucmF3RGF0YVsxMV07XG5cdFx0XHR2YXIgbTQ0Om51bWJlciA9IHRoaXMucmF3RGF0YVsxNV07XG5cblx0XHRcdHRoaXMucmF3RGF0YVswXSA9IGQqKG0yMioobTMzKm00NCAtIG00MyptMzQpIC0gbTMyKihtMjMqbTQ0IC0gbTQzKm0yNCkgKyBtNDIqKG0yMyptMzQgLSBtMzMqbTI0KSk7XG5cdFx0XHR0aGlzLnJhd0RhdGFbMV0gPSAtZCoobTEyKihtMzMqbTQ0IC0gbTQzKm0zNCkgLSBtMzIqKG0xMyptNDQgLSBtNDMqbTE0KSArIG00MioobTEzKm0zNCAtIG0zMyptMTQpKTtcblx0XHRcdHRoaXMucmF3RGF0YVsyXSA9IGQqKG0xMioobTIzKm00NCAtIG00MyptMjQpIC0gbTIyKihtMTMqbTQ0IC0gbTQzKm0xNCkgKyBtNDIqKG0xMyptMjQgLSBtMjMqbTE0KSk7XG5cdFx0XHR0aGlzLnJhd0RhdGFbM10gPSAtZCoobTEyKihtMjMqbTM0IC0gbTMzKm0yNCkgLSBtMjIqKG0xMyptMzQgLSBtMzMqbTE0KSArIG0zMioobTEzKm0yNCAtIG0yMyptMTQpKTtcblx0XHRcdHRoaXMucmF3RGF0YVs0XSA9IC1kKihtMjEqKG0zMyptNDQgLSBtNDMqbTM0KSAtIG0zMSoobTIzKm00NCAtIG00MyptMjQpICsgbTQxKihtMjMqbTM0IC0gbTMzKm0yNCkpO1xuXHRcdFx0dGhpcy5yYXdEYXRhWzVdID0gZCoobTExKihtMzMqbTQ0IC0gbTQzKm0zNCkgLSBtMzEqKG0xMyptNDQgLSBtNDMqbTE0KSArIG00MSoobTEzKm0zNCAtIG0zMyptMTQpKTtcblx0XHRcdHRoaXMucmF3RGF0YVs2XSA9IC1kKihtMTEqKG0yMyptNDQgLSBtNDMqbTI0KSAtIG0yMSoobTEzKm00NCAtIG00MyptMTQpICsgbTQxKihtMTMqbTI0IC0gbTIzKm0xNCkpO1xuXHRcdFx0dGhpcy5yYXdEYXRhWzddID0gZCoobTExKihtMjMqbTM0IC0gbTMzKm0yNCkgLSBtMjEqKG0xMyptMzQgLSBtMzMqbTE0KSArIG0zMSoobTEzKm0yNCAtIG0yMyptMTQpKTtcblx0XHRcdHRoaXMucmF3RGF0YVs4XSA9IGQqKG0yMSoobTMyKm00NCAtIG00MiptMzQpIC0gbTMxKihtMjIqbTQ0IC0gbTQyKm0yNCkgKyBtNDEqKG0yMiptMzQgLSBtMzIqbTI0KSk7XG5cdFx0XHR0aGlzLnJhd0RhdGFbOV0gPSAtZCoobTExKihtMzIqbTQ0IC0gbTQyKm0zNCkgLSBtMzEqKG0xMiptNDQgLSBtNDIqbTE0KSArIG00MSoobTEyKm0zNCAtIG0zMiptMTQpKTtcblx0XHRcdHRoaXMucmF3RGF0YVsxMF0gPSBkKihtMTEqKG0yMiptNDQgLSBtNDIqbTI0KSAtIG0yMSoobTEyKm00NCAtIG00MiptMTQpICsgbTQxKihtMTIqbTI0IC0gbTIyKm0xNCkpO1xuXHRcdFx0dGhpcy5yYXdEYXRhWzExXSA9IC1kKihtMTEqKG0yMiptMzQgLSBtMzIqbTI0KSAtIG0yMSoobTEyKm0zNCAtIG0zMiptMTQpICsgbTMxKihtMTIqbTI0IC0gbTIyKm0xNCkpO1xuXHRcdFx0dGhpcy5yYXdEYXRhWzEyXSA9IC1kKihtMjEqKG0zMiptNDMgLSBtNDIqbTMzKSAtIG0zMSoobTIyKm00MyAtIG00MiptMjMpICsgbTQxKihtMjIqbTMzIC0gbTMyKm0yMykpO1xuXHRcdFx0dGhpcy5yYXdEYXRhWzEzXSA9IGQqKG0xMSoobTMyKm00MyAtIG00MiptMzMpIC0gbTMxKihtMTIqbTQzIC0gbTQyKm0xMykgKyBtNDEqKG0xMiptMzMgLSBtMzIqbTEzKSk7XG5cdFx0XHR0aGlzLnJhd0RhdGFbMTRdID0gLWQqKG0xMSoobTIyKm00MyAtIG00MiptMjMpIC0gbTIxKihtMTIqbTQzIC0gbTQyKm0xMykgKyBtNDEqKG0xMiptMjMgLSBtMjIqbTEzKSk7XG5cdFx0XHR0aGlzLnJhd0RhdGFbMTVdID0gZCoobTExKihtMjIqbTMzIC0gbTMyKm0yMykgLSBtMjEqKG0xMiptMzMgLSBtMzIqbTEzKSArIG0zMSoobTEyKm0yMyAtIG0yMiptMTMpKTtcblx0XHR9XG5cdFx0cmV0dXJuIGludmVydGFibGU7XG5cdH1cblxuXHQvKiBUT0RPIGltcGxlbWVudCBwb2ludEF0XG5cdCBwdWJsaWMgcG9pbnRBdCggcG9zOlZlY3RvcjNELCBhdDpWZWN0b3IzRCA9IG51bGwsIHVwOlZlY3RvcjNEID0gbnVsbCApXG5cdCB7XG5cdCB9XG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBQcmVwZW5kcyBhIG1hdHJpeCBieSBtdWx0aXBseWluZyB0aGUgY3VycmVudCBNYXRyaXgzRCBvYmplY3QgYnkgYW5vdGhlciBNYXRyaXgzRCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgcHJlcGVuZChyaHM6TWF0cml4M0QpXG5cdHtcblx0XHR2YXIgbTExMTpudW1iZXIgPSByaHMucmF3RGF0YVswXSwgbTEyMTpudW1iZXIgPSByaHMucmF3RGF0YVs0XSwgbTEzMTpudW1iZXIgPSByaHMucmF3RGF0YVs4XSwgbTE0MTpudW1iZXIgPSByaHMucmF3RGF0YVsxMl0sIG0xMTI6bnVtYmVyID0gcmhzLnJhd0RhdGFbMV0sIG0xMjI6bnVtYmVyID0gcmhzLnJhd0RhdGFbNV0sIG0xMzI6bnVtYmVyID0gcmhzLnJhd0RhdGFbOV0sIG0xNDI6bnVtYmVyID0gcmhzLnJhd0RhdGFbMTNdLCBtMTEzOm51bWJlciA9IHJocy5yYXdEYXRhWzJdLCBtMTIzOm51bWJlciA9IHJocy5yYXdEYXRhWzZdLCBtMTMzOm51bWJlciA9IHJocy5yYXdEYXRhWzEwXSwgbTE0MzpudW1iZXIgPSByaHMucmF3RGF0YVsxNF0sIG0xMTQ6bnVtYmVyID0gcmhzLnJhd0RhdGFbM10sIG0xMjQ6bnVtYmVyID0gcmhzLnJhd0RhdGFbN10sIG0xMzQ6bnVtYmVyID0gcmhzLnJhd0RhdGFbMTFdLCBtMTQ0Om51bWJlciA9IHJocy5yYXdEYXRhWzE1XSwgbTIxMTpudW1iZXIgPSB0aGlzLnJhd0RhdGFbMF0sIG0yMjE6bnVtYmVyID0gdGhpcy5yYXdEYXRhWzRdLCBtMjMxOm51bWJlciA9IHRoaXMucmF3RGF0YVs4XSwgbTI0MTpudW1iZXIgPSB0aGlzLnJhd0RhdGFbMTJdLCBtMjEyOm51bWJlciA9IHRoaXMucmF3RGF0YVsxXSwgbTIyMjpudW1iZXIgPSB0aGlzLnJhd0RhdGFbNV0sIG0yMzI6bnVtYmVyID0gdGhpcy5yYXdEYXRhWzldLCBtMjQyOm51bWJlciA9IHRoaXMucmF3RGF0YVsxM10sIG0yMTM6bnVtYmVyID0gdGhpcy5yYXdEYXRhWzJdLCBtMjIzOm51bWJlciA9IHRoaXMucmF3RGF0YVs2XSwgbTIzMzpudW1iZXIgPSB0aGlzLnJhd0RhdGFbMTBdLCBtMjQzOm51bWJlciA9IHRoaXMucmF3RGF0YVsxNF0sIG0yMTQ6bnVtYmVyID0gdGhpcy5yYXdEYXRhWzNdLCBtMjI0Om51bWJlciA9IHRoaXMucmF3RGF0YVs3XSwgbTIzNDpudW1iZXIgPSB0aGlzLnJhd0RhdGFbMTFdLCBtMjQ0Om51bWJlciA9IHRoaXMucmF3RGF0YVsxNV07XG5cblx0XHR0aGlzLnJhd0RhdGFbMF0gPSBtMTExKm0yMTEgKyBtMTEyKm0yMjEgKyBtMTEzKm0yMzEgKyBtMTE0Km0yNDE7XG5cdFx0dGhpcy5yYXdEYXRhWzFdID0gbTExMSptMjEyICsgbTExMiptMjIyICsgbTExMyptMjMyICsgbTExNCptMjQyO1xuXHRcdHRoaXMucmF3RGF0YVsyXSA9IG0xMTEqbTIxMyArIG0xMTIqbTIyMyArIG0xMTMqbTIzMyArIG0xMTQqbTI0Mztcblx0XHR0aGlzLnJhd0RhdGFbM10gPSBtMTExKm0yMTQgKyBtMTEyKm0yMjQgKyBtMTEzKm0yMzQgKyBtMTE0Km0yNDQ7XG5cblx0XHR0aGlzLnJhd0RhdGFbNF0gPSBtMTIxKm0yMTEgKyBtMTIyKm0yMjEgKyBtMTIzKm0yMzEgKyBtMTI0Km0yNDE7XG5cdFx0dGhpcy5yYXdEYXRhWzVdID0gbTEyMSptMjEyICsgbTEyMiptMjIyICsgbTEyMyptMjMyICsgbTEyNCptMjQyO1xuXHRcdHRoaXMucmF3RGF0YVs2XSA9IG0xMjEqbTIxMyArIG0xMjIqbTIyMyArIG0xMjMqbTIzMyArIG0xMjQqbTI0Mztcblx0XHR0aGlzLnJhd0RhdGFbN10gPSBtMTIxKm0yMTQgKyBtMTIyKm0yMjQgKyBtMTIzKm0yMzQgKyBtMTI0Km0yNDQ7XG5cblx0XHR0aGlzLnJhd0RhdGFbOF0gPSBtMTMxKm0yMTEgKyBtMTMyKm0yMjEgKyBtMTMzKm0yMzEgKyBtMTM0Km0yNDE7XG5cdFx0dGhpcy5yYXdEYXRhWzldID0gbTEzMSptMjEyICsgbTEzMiptMjIyICsgbTEzMyptMjMyICsgbTEzNCptMjQyO1xuXHRcdHRoaXMucmF3RGF0YVsxMF0gPSBtMTMxKm0yMTMgKyBtMTMyKm0yMjMgKyBtMTMzKm0yMzMgKyBtMTM0Km0yNDM7XG5cdFx0dGhpcy5yYXdEYXRhWzExXSA9IG0xMzEqbTIxNCArIG0xMzIqbTIyNCArIG0xMzMqbTIzNCArIG0xMzQqbTI0NDtcblxuXHRcdHRoaXMucmF3RGF0YVsxMl0gPSBtMTQxKm0yMTEgKyBtMTQyKm0yMjEgKyBtMTQzKm0yMzEgKyBtMTQ0Km0yNDE7XG5cdFx0dGhpcy5yYXdEYXRhWzEzXSA9IG0xNDEqbTIxMiArIG0xNDIqbTIyMiArIG0xNDMqbTIzMiArIG0xNDQqbTI0Mjtcblx0XHR0aGlzLnJhd0RhdGFbMTRdID0gbTE0MSptMjEzICsgbTE0MiptMjIzICsgbTE0MyptMjMzICsgbTE0NCptMjQzO1xuXHRcdHRoaXMucmF3RGF0YVsxNV0gPSBtMTQxKm0yMTQgKyBtMTQyKm0yMjQgKyBtMTQzKm0yMzQgKyBtMTQ0Km0yNDQ7XG5cdH1cblxuXHQvKipcblx0ICogUHJlcGVuZHMgYW4gaW5jcmVtZW50YWwgcm90YXRpb24gdG8gYSBNYXRyaXgzRCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgcHJlcGVuZFJvdGF0aW9uKGRlZ3JlZXM6bnVtYmVyLCBheGlzOlZlY3RvcjNEKSAvLywgcGl2b3Q6VmVjdG9yM0QgPSBudWxsIClcblx0e1xuXHRcdHZhciBtOk1hdHJpeDNEID0gTWF0cml4M0QuZ2V0QXhpc1JvdGF0aW9uKGF4aXMueCwgYXhpcy55LCBheGlzLnosIGRlZ3JlZXMpO1xuXG5cdFx0Lypcblx0XHQgaWYgKCBwaXZvdCAhPSBudWxsIClcblx0XHQge1xuXHRcdCB2YXIgcDpWZWN0b3IzRCA9IHBpdm90O1xuXHRcdCBtLmFwcGVuZFRyYW5zbGF0aW9uKCBwLngsIHAueSwgcC56ICk7XG5cdFx0IH1cblx0XHQgKi9cblx0XHR0aGlzLnByZXBlbmQobSk7XG5cdH1cblxuXHQvKipcblx0ICogUHJlcGVuZHMgYW4gaW5jcmVtZW50YWwgc2NhbGUgY2hhbmdlIGFsb25nIHRoZSB4LCB5LCBhbmQgeiBheGVzIHRvIGEgTWF0cml4M0Qgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIHByZXBlbmRTY2FsZSh4U2NhbGU6bnVtYmVyLCB5U2NhbGU6bnVtYmVyLCB6U2NhbGU6bnVtYmVyKVxuXHR7XG5cblx0XHQvLyBJbml0aWFsIFRlc3RzIC0gT0tcblxuXHRcdHRoaXMucHJlcGVuZChuZXcgTWF0cml4M0QoWyB4U2NhbGUsIDAsIDAsIDAsIDAsIHlTY2FsZSwgMCwgMCwgMCwgMCwgelNjYWxlLCAwLCAwLCAwLCAwLCAxIF0pKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQcmVwZW5kcyBhbiBpbmNyZW1lbnRhbCB0cmFuc2xhdGlvbiwgYSByZXBvc2l0aW9uaW5nIGFsb25nIHRoZSB4LCB5LCBhbmQgeiBheGVzLCB0byBhIE1hdHJpeDNEIG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBwcmVwZW5kVHJhbnNsYXRpb24oeDpudW1iZXIsIHk6bnVtYmVyLCB6Om51bWJlcilcblx0e1xuXG5cdFx0Ly8gSW5pdGlhbCBUZXN0cyAtIE9LXG5cblx0XHR2YXIgbSA9IG5ldyBNYXRyaXgzRCgpO1xuXHRcdG0ucG9zaXRpb24gPSBuZXcgVmVjdG9yM0QoeCwgeSwgeik7XG5cdFx0dGhpcy5wcmVwZW5kKG0pO1xuXHR9XG5cblx0Ly8gVE9ETyBvcmllbnRhdGlvblN0eWxlXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXgncyB0cmFuc2xhdGlvbiwgcm90YXRpb24sIGFuZCBzY2FsZSBzZXR0aW5ncy5cblx0ICovXG5cdHB1YmxpYyByZWNvbXBvc2UoY29tcG9uZW50czpWZWN0b3IzRFtdKTpib29sZWFuXG5cdHtcblxuXHRcdC8vIEluaXRpYWwgVGVzdHMgLSBPS1xuXG5cdFx0aWYgKGNvbXBvbmVudHMubGVuZ3RoIDwgMykgcmV0dXJuIGZhbHNlXG5cblx0XHQvL2NvbXBvbmVudHNbMl0ueCA9PSAwIHx8IGNvbXBvbmVudHNbMl0ueSA9PSAwIHx8IGNvbXBvbmVudHNbMl0ueiA9PSAwKSByZXR1cm4gZmFsc2U7XG5cblx0XHR0aGlzLmlkZW50aXR5KCk7XG5cdFx0dGhpcy5hcHBlbmRTY2FsZShjb21wb25lbnRzWzJdLngsIGNvbXBvbmVudHNbMl0ueSwgY29tcG9uZW50c1syXS56KTtcblxuXHRcdHZhciBhbmdsZTpudW1iZXI7XG5cdFx0YW5nbGUgPSAtY29tcG9uZW50c1sxXS54O1xuXHRcdHRoaXMuYXBwZW5kKG5ldyBNYXRyaXgzRChbMSwgMCwgMCwgMCwgMCwgTWF0aC5jb3MoYW5nbGUpLCAtTWF0aC5zaW4oYW5nbGUpLCAwLCAwLCBNYXRoLnNpbihhbmdsZSksIE1hdGguY29zKGFuZ2xlKSwgMCwgMCwgMCwgMCAsIDBdKSk7XG5cdFx0YW5nbGUgPSAtY29tcG9uZW50c1sxXS55O1xuXHRcdHRoaXMuYXBwZW5kKG5ldyBNYXRyaXgzRChbTWF0aC5jb3MoYW5nbGUpLCAwLCBNYXRoLnNpbihhbmdsZSksIDAsIDAsIDEsIDAsIDAsIC1NYXRoLnNpbihhbmdsZSksIDAsIE1hdGguY29zKGFuZ2xlKSwgMCwgMCwgMCwgMCwgMF0pKTtcblx0XHRhbmdsZSA9IC1jb21wb25lbnRzWzFdLno7XG5cdFx0dGhpcy5hcHBlbmQobmV3IE1hdHJpeDNEKFtNYXRoLmNvcyhhbmdsZSksIC1NYXRoLnNpbihhbmdsZSksIDAsIDAsIE1hdGguc2luKGFuZ2xlKSwgTWF0aC5jb3MoYW5nbGUpLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwXSkpO1xuXG5cdFx0dGhpcy5wb3NpdGlvbiA9IGNvbXBvbmVudHNbMF07XG5cdFx0dGhpcy5yYXdEYXRhWzE1XSA9IDE7XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHB1YmxpYyB0cmFuc2Zvcm1WZWN0b3IodjpWZWN0b3IzRCk6VmVjdG9yM0Rcblx0e1xuXHRcdHZhciB4Om51bWJlciA9IHYueDtcblx0XHR2YXIgeTpudW1iZXIgPSB2Lnk7XG5cdFx0dmFyIHo6bnVtYmVyID0gdi56O1xuXG5cdFx0cmV0dXJuIG5ldyBWZWN0b3IzRCgoeCp0aGlzLnJhd0RhdGFbMF0gKyB5KnRoaXMucmF3RGF0YVs0XSArIHoqdGhpcy5yYXdEYXRhWzhdICsgdGhpcy5yYXdEYXRhWzEyXSksICh4KnRoaXMucmF3RGF0YVsxXSArIHkqdGhpcy5yYXdEYXRhWzVdICsgeip0aGlzLnJhd0RhdGFbOV0gKyB0aGlzLnJhd0RhdGFbMTNdKSwgKHgqdGhpcy5yYXdEYXRhWzJdICsgeSp0aGlzLnJhd0RhdGFbNl0gKyB6KnRoaXMucmF3RGF0YVsxMF0gKyB0aGlzLnJhd0RhdGFbMTRdKSwgKHgqdGhpcy5yYXdEYXRhWzNdICsgeSp0aGlzLnJhd0RhdGFbN10gKyB6KnRoaXMucmF3RGF0YVsxMV0gKyB0aGlzLnJhd0RhdGFbMTVdKSk7XG5cdH1cblxuXHQvKipcblx0ICogVXNlcyB0aGUgdHJhbnNmb3JtYXRpb24gbWF0cml4IHRvIHRyYW5zZm9ybSBhIFZlY3RvciBvZiBOdW1iZXJzIGZyb20gb25lIGNvb3JkaW5hdGUgc3BhY2UgdG8gYW5vdGhlci5cblx0ICovXG5cdHB1YmxpYyB0cmFuc2Zvcm1WZWN0b3JzKHZpbjpudW1iZXJbXSwgdm91dDpudW1iZXJbXSlcblx0e1xuXG5cdFx0Ly8gSW5pdGlhbCBUZXN0cyAtIE9LXG5cblx0XHR2YXIgaTpudW1iZXIgPSAwO1xuXHRcdHZhciB4Om51bWJlciA9IDAsIHk6bnVtYmVyID0gMCwgejpudW1iZXIgPSAwO1xuXG5cdFx0d2hpbGUgKGkgKyAzIDw9IHZpbi5sZW5ndGgpIHtcblx0XHRcdHggPSB2aW5baV07XG5cdFx0XHR5ID0gdmluW2kgKyAxXTtcblx0XHRcdHogPSB2aW5baSArIDJdO1xuXHRcdFx0dm91dFtpXSA9IHgqdGhpcy5yYXdEYXRhWzBdICsgeSp0aGlzLnJhd0RhdGFbNF0gKyB6KnRoaXMucmF3RGF0YVs4XSArIHRoaXMucmF3RGF0YVsxMl07XG5cdFx0XHR2b3V0W2kgKyAxXSA9IHgqdGhpcy5yYXdEYXRhWzFdICsgeSp0aGlzLnJhd0RhdGFbNV0gKyB6KnRoaXMucmF3RGF0YVs5XSArIHRoaXMucmF3RGF0YVsxM107XG5cdFx0XHR2b3V0W2kgKyAyXSA9IHgqdGhpcy5yYXdEYXRhWzJdICsgeSp0aGlzLnJhd0RhdGFbNl0gKyB6KnRoaXMucmF3RGF0YVsxMF0gKyB0aGlzLnJhd0RhdGFbMTRdO1xuXHRcdFx0aSArPSAzO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyB0aGUgY3VycmVudCBNYXRyaXgzRCBvYmplY3QgdG8gYSBtYXRyaXggd2hlcmUgdGhlIHJvd3MgYW5kIGNvbHVtbnMgYXJlIHN3YXBwZWQuXG5cdCAqL1xuXHRwdWJsaWMgdHJhbnNwb3NlKClcblx0e1xuXG5cdFx0Ly8gSW5pdGlhbCBUZXN0cyAtIE9LXG5cblx0XHR2YXIgb1Jhd0RhdGE6bnVtYmVyW10gPSB0aGlzLnJhd0RhdGEuc2xpY2UoMCk7XG5cblx0XHR0aGlzLnJhd0RhdGFbMV0gPSBvUmF3RGF0YVs0XTtcblx0XHR0aGlzLnJhd0RhdGFbMl0gPSBvUmF3RGF0YVs4XTtcblx0XHR0aGlzLnJhd0RhdGFbM10gPSBvUmF3RGF0YVsxMl07XG5cdFx0dGhpcy5yYXdEYXRhWzRdID0gb1Jhd0RhdGFbMV07XG5cdFx0dGhpcy5yYXdEYXRhWzZdID0gb1Jhd0RhdGFbOV07XG5cdFx0dGhpcy5yYXdEYXRhWzddID0gb1Jhd0RhdGFbMTNdO1xuXHRcdHRoaXMucmF3RGF0YVs4XSA9IG9SYXdEYXRhWzJdO1xuXHRcdHRoaXMucmF3RGF0YVs5XSA9IG9SYXdEYXRhWzZdO1xuXHRcdHRoaXMucmF3RGF0YVsxMV0gPSBvUmF3RGF0YVsxNF07XG5cdFx0dGhpcy5yYXdEYXRhWzEyXSA9IG9SYXdEYXRhWzNdO1xuXHRcdHRoaXMucmF3RGF0YVsxM10gPSBvUmF3RGF0YVs3XTtcblx0XHR0aGlzLnJhd0RhdGFbMTRdID0gb1Jhd0RhdGFbMTFdO1xuXHR9XG5cblx0c3RhdGljIGdldEF4aXNSb3RhdGlvbih4Om51bWJlciwgeTpudW1iZXIsIHo6bnVtYmVyLCBkZWdyZWVzOm51bWJlcik6TWF0cml4M0Rcblx0e1xuXG5cdFx0Ly8gaW50ZXJuYWwgY2xhc3MgdXNlIGJ5IHJvdGF0aW9ucyB3aGljaCBoYXZlIGJlZW4gdGVzdGVkXG5cblx0XHR2YXIgbTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXG5cdFx0dmFyIHJhZCA9IGRlZ3JlZXMqKCBNYXRoLlBJLzE4MCApO1xuXHRcdHZhciBjOm51bWJlciA9IE1hdGguY29zKHJhZCk7XG5cdFx0dmFyIHM6bnVtYmVyID0gTWF0aC5zaW4ocmFkKTtcblx0XHR2YXIgdDpudW1iZXIgPSAxIC0gYztcblx0XHR2YXIgdG1wMTpudW1iZXIsIHRtcDI6bnVtYmVyO1xuXG5cdFx0bS5yYXdEYXRhWzBdID0gYyArIHgqeCp0O1xuXHRcdG0ucmF3RGF0YVs1XSA9IGMgKyB5KnkqdDtcblx0XHRtLnJhd0RhdGFbMTBdID0gYyArIHoqeip0O1xuXG5cdFx0dG1wMSA9IHgqeSp0O1xuXHRcdHRtcDIgPSB6KnM7XG5cdFx0bS5yYXdEYXRhWzFdID0gdG1wMSArIHRtcDI7XG5cdFx0bS5yYXdEYXRhWzRdID0gdG1wMSAtIHRtcDI7XG5cdFx0dG1wMSA9IHgqeip0O1xuXHRcdHRtcDIgPSB5KnM7XG5cdFx0bS5yYXdEYXRhWzhdID0gdG1wMSArIHRtcDI7XG5cdFx0bS5yYXdEYXRhWzJdID0gdG1wMSAtIHRtcDI7XG5cdFx0dG1wMSA9IHkqeip0O1xuXHRcdHRtcDIgPSB4KnM7XG5cdFx0bS5yYXdEYXRhWzldID0gdG1wMSAtIHRtcDI7XG5cdFx0bS5yYXdEYXRhWzZdID0gdG1wMSArIHRtcDI7XG5cblx0XHRyZXR1cm4gbTtcblx0fVxuXG5cdC8qKlxuXHQgKiBbcmVhZC1vbmx5XSBBIE51bWJlciB0aGF0IGRldGVybWluZXMgd2hldGhlciBhIG1hdHJpeCBpcyBpbnZlcnRpYmxlLlxuXHQgKi9cblx0cHVibGljIGdldCBkZXRlcm1pbmFudCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuICAgICgodGhpcy5yYXdEYXRhWzBdKnRoaXMucmF3RGF0YVs1XSAtIHRoaXMucmF3RGF0YVs0XSp0aGlzLnJhd0RhdGFbMV0pKih0aGlzLnJhd0RhdGFbMTBdKnRoaXMucmF3RGF0YVsxNV0gLSB0aGlzLnJhd0RhdGFbMTRdKnRoaXMucmF3RGF0YVsxMV0pIC0gKHRoaXMucmF3RGF0YVswXSp0aGlzLnJhd0RhdGFbOV0gLSB0aGlzLnJhd0RhdGFbOF0qdGhpcy5yYXdEYXRhWzFdKSoodGhpcy5yYXdEYXRhWzZdKnRoaXMucmF3RGF0YVsxNV0gLSB0aGlzLnJhd0RhdGFbMTRdKnRoaXMucmF3RGF0YVs3XSkgKyAodGhpcy5yYXdEYXRhWzBdKnRoaXMucmF3RGF0YVsxM10gLSB0aGlzLnJhd0RhdGFbMTJdKnRoaXMucmF3RGF0YVsxXSkqKHRoaXMucmF3RGF0YVs2XSp0aGlzLnJhd0RhdGFbMTFdIC0gdGhpcy5yYXdEYXRhWzEwXSp0aGlzLnJhd0RhdGFbN10pICsgKHRoaXMucmF3RGF0YVs0XSp0aGlzLnJhd0RhdGFbOV0gLSB0aGlzLnJhd0RhdGFbOF0qdGhpcy5yYXdEYXRhWzVdKSoodGhpcy5yYXdEYXRhWzJdKnRoaXMucmF3RGF0YVsxNV0gLSB0aGlzLnJhd0RhdGFbMTRdKnRoaXMucmF3RGF0YVszXSkgLSAodGhpcy5yYXdEYXRhWzRdKnRoaXMucmF3RGF0YVsxM10gLSB0aGlzLnJhd0RhdGFbMTJdKnRoaXMucmF3RGF0YVs1XSkqKHRoaXMucmF3RGF0YVsyXSp0aGlzLnJhd0RhdGFbMTFdIC0gdGhpcy5yYXdEYXRhWzEwXSp0aGlzLnJhd0RhdGFbM10pICsgKHRoaXMucmF3RGF0YVs4XSp0aGlzLnJhd0RhdGFbMTNdIC0gdGhpcy5yYXdEYXRhWzEyXSp0aGlzLnJhd0RhdGFbOV0pKih0aGlzLnJhd0RhdGFbMl0qdGhpcy5yYXdEYXRhWzddIC0gdGhpcy5yYXdEYXRhWzZdKnRoaXMucmF3RGF0YVszXSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgVmVjdG9yM0Qgb2JqZWN0IHRoYXQgaG9sZHMgdGhlIHBvc2l0aW9uLCB0aGUgM0QgY29vcmRpbmF0ZSAoeCx5LHopIG9mIGEgZGlzcGxheSBvYmplY3Qgd2l0aGluIHRoZVxuXHQgKiB0cmFuc2Zvcm1hdGlvbidzIGZyYW1lIG9mIHJlZmVyZW5jZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgcG9zaXRpb24oKTpWZWN0b3IzRFxuXHR7XG5cdFx0cmV0dXJuIG5ldyBWZWN0b3IzRCh0aGlzLnJhd0RhdGFbMTJdLCB0aGlzLnJhd0RhdGFbMTNdLCB0aGlzLnJhd0RhdGFbMTRdKTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcG9zaXRpb24odmFsdWU6VmVjdG9yM0QpXG5cdHtcblx0XHR0aGlzLnJhd0RhdGFbMTJdID0gdmFsdWUueDtcblx0XHR0aGlzLnJhd0RhdGFbMTNdID0gdmFsdWUueTtcblx0XHR0aGlzLnJhd0RhdGFbMTRdID0gdmFsdWUuejtcblx0fVxuXG5cdHB1YmxpYyB0b0ZpeGVkKGRlY2ltYWxQbGFjZTpudW1iZXIpOnN0cmluZ1xuXHR7XG5cdFx0dmFyIG1hZ25pdHVkZTpudW1iZXIgPSBNYXRoLnBvdygxMCwgZGVjaW1hbFBsYWNlKTtcblx0XHRyZXR1cm4gXCJtYXRyaXgzZChcIiArIE1hdGgucm91bmQodGhpcy5yYXdEYXRhWzBdKm1hZ25pdHVkZSkvbWFnbml0dWRlICsgXCIsXCIgKyBNYXRoLnJvdW5kKHRoaXMucmF3RGF0YVsxXSptYWduaXR1ZGUpL21hZ25pdHVkZSArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbMl0qbWFnbml0dWRlKS9tYWduaXR1ZGUgKyBcIixcIiArIE1hdGgucm91bmQodGhpcy5yYXdEYXRhWzNdKm1hZ25pdHVkZSkvbWFnbml0dWRlICsgXCIsXCIgKyBNYXRoLnJvdW5kKHRoaXMucmF3RGF0YVs0XSptYWduaXR1ZGUpL21hZ25pdHVkZSArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbNV0qbWFnbml0dWRlKS9tYWduaXR1ZGUgKyBcIixcIiArIE1hdGgucm91bmQodGhpcy5yYXdEYXRhWzZdKm1hZ25pdHVkZSkvbWFnbml0dWRlICsgXCIsXCIgKyBNYXRoLnJvdW5kKHRoaXMucmF3RGF0YVs3XSptYWduaXR1ZGUpL21hZ25pdHVkZSArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbOF0qbWFnbml0dWRlKS9tYWduaXR1ZGUgKyBcIixcIiArIE1hdGgucm91bmQodGhpcy5yYXdEYXRhWzldKm1hZ25pdHVkZSkvbWFnbml0dWRlICsgXCIsXCIgKyBNYXRoLnJvdW5kKHRoaXMucmF3RGF0YVsxMF0qbWFnbml0dWRlKS9tYWduaXR1ZGUgKyBcIixcIiArIE1hdGgucm91bmQodGhpcy5yYXdEYXRhWzExXSptYWduaXR1ZGUpL21hZ25pdHVkZSArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbMTJdKm1hZ25pdHVkZSkvbWFnbml0dWRlICsgXCIsXCIgKyBNYXRoLnJvdW5kKHRoaXMucmF3RGF0YVsxM10qbWFnbml0dWRlKS9tYWduaXR1ZGUgKyBcIixcIiArIE1hdGgucm91bmQodGhpcy5yYXdEYXRhWzE0XSptYWduaXR1ZGUpL21hZ25pdHVkZSArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbMTVdKm1hZ25pdHVkZSkvbWFnbml0dWRlICsgXCIpXCI7XG5cdH1cblxuXHRwdWJsaWMgdG9TdHJpbmcoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBcIm1hdHJpeDNkKFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbMF0qMTAwMCkvMTAwMCArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbMV0qMTAwMCkvMTAwMCArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbMl0qMTAwMCkvMTAwMCArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbM10qMTAwMCkvMTAwMCArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbNF0qMTAwMCkvMTAwMCArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbNV0qMTAwMCkvMTAwMCArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbNl0qMTAwMCkvMTAwMCArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbN10qMTAwMCkvMTAwMCArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbOF0qMTAwMCkvMTAwMCArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbOV0qMTAwMCkvMTAwMCArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbMTBdKjEwMDApLzEwMDAgKyBcIixcIiArIE1hdGgucm91bmQodGhpcy5yYXdEYXRhWzExXSoxMDAwKS8xMDAwICsgXCIsXCIgKyBNYXRoLnJvdW5kKHRoaXMucmF3RGF0YVsxMl0qMTAwMCkvMTAwMCArIFwiLFwiICsgTWF0aC5yb3VuZCh0aGlzLnJhd0RhdGFbMTNdKjEwMDApLzEwMDAgKyBcIixcIiArIE1hdGgucm91bmQodGhpcy5yYXdEYXRhWzE0XSoxMDAwKS8xMDAwICsgXCIsXCIgKyBNYXRoLnJvdW5kKHRoaXMucmF3RGF0YVsxNV0qMTAwMCkvMTAwMCArIFwiKVwiO1xuXHR9XG59XG5cbmV4cG9ydCA9IE1hdHJpeDNEOyJdfQ==