"use strict";
var Matrix3D_1 = require("../geom/Matrix3D");
var Vector3D_1 = require("../geom/Vector3D");
/**
 * away.geom.Matrix3DUtils provides additional Matrix3D functions.
 */
var Matrix3DUtils = (function () {
    function Matrix3DUtils() {
    }
    /**
     * Fills the 3d matrix object with values representing the transformation made by the given quaternion.
     *
     * @param    quarternion    The quarterion object to convert.
     */
    Matrix3DUtils.quaternion2matrix = function (quarternion, m) {
        if (m === void 0) { m = null; }
        var x = quarternion.x;
        var y = quarternion.y;
        var z = quarternion.z;
        var w = quarternion.w;
        var xx = x * x;
        var xy = x * y;
        var xz = x * z;
        var xw = x * w;
        var yy = y * y;
        var yz = y * z;
        var yw = y * w;
        var zz = z * z;
        var zw = z * w;
        var raw = Matrix3DUtils.RAW_DATA_CONTAINER;
        raw[0] = 1 - 2 * (yy + zz);
        raw[1] = 2 * (xy + zw);
        raw[2] = 2 * (xz - yw);
        raw[4] = 2 * (xy - zw);
        raw[5] = 1 - 2 * (xx + zz);
        raw[6] = 2 * (yz + xw);
        raw[8] = 2 * (xz + yw);
        raw[9] = 2 * (yz - xw);
        raw[10] = 1 - 2 * (xx + yy);
        raw[3] = raw[7] = raw[11] = raw[12] = raw[13] = raw[14] = 0;
        raw[15] = 1;
        if (m) {
            m.copyRawDataFrom(raw);
            return m;
        }
        else
            return new Matrix3D_1.Matrix3D(raw);
    };
    /**
     * Returns a normalised <code>Vector3D</code> object representing the forward vector of the given matrix.
     * @param    m        The Matrix3D object to use to get the forward vector
     * @param    v        [optional] A vector holder to prevent make new Vector3D instance if already exists. Default is null.
     * @return            The forward vector
     */
    Matrix3DUtils.getForward = function (m, v) {
        if (v === void 0) { v = null; }
        if (v === null)
            v = new Vector3D_1.Vector3D(0.0, 0.0, 0.0);
        m.copyColumnTo(2, v);
        v.normalize();
        return v;
    };
    /**
     * Returns a normalised <code>Vector3D</code> object representing the up vector of the given matrix.
     * @param    m        The Matrix3D object to use to get the up vector
     * @param    v        [optional] A vector holder to prevent make new Vector3D instance if already exists. Default is null.
     * @return            The up vector
     */
    Matrix3DUtils.getUp = function (m, v) {
        if (v === void 0) { v = null; }
        if (v === null)
            v = new Vector3D_1.Vector3D(0.0, 0.0, 0.0);
        m.copyColumnTo(1, v);
        v.normalize();
        return v;
    };
    /**
     * Returns a normalised <code>Vector3D</code> object representing the right vector of the given matrix.
     * @param    m        The Matrix3D object to use to get the right vector
     * @param    v        [optional] A vector holder to prevent make new Vector3D instance if already exists. Default is null.
     * @return            The right vector
     */
    Matrix3DUtils.getRight = function (m, v) {
        if (v === void 0) { v = null; }
        //v ||= new Vector3D(0.0, 0.0, 0.0);
        if (v === null) {
            v = new Vector3D_1.Vector3D(0.0, 0.0, 0.0);
        }
        m.copyColumnTo(0, v);
        v.normalize();
        return v;
    };
    /**
     * Returns a boolean value representing whether there is any significant difference between the two given 3d matrices.
     */
    Matrix3DUtils.compare = function (m1, m2) {
        var r1 = Matrix3DUtils.RAW_DATA_CONTAINER;
        var r2 = m2.rawData;
        m1.copyRawDataTo(r1);
        for (var i = 0; i < 16; ++i) {
            if (r1[i] != r2[i])
                return false;
        }
        return true;
    };
    Matrix3DUtils.lookAt = function (matrix, pos, dir, up) {
        var dirN;
        var upN;
        var lftN;
        var raw = Matrix3DUtils.RAW_DATA_CONTAINER;
        lftN = dir.crossProduct(up);
        lftN.normalize();
        upN = lftN.crossProduct(dir);
        upN.normalize();
        dirN = dir.clone();
        dirN.normalize();
        raw[0] = lftN.x;
        raw[1] = upN.x;
        raw[2] = -dirN.x;
        raw[3] = 0.0;
        raw[4] = lftN.y;
        raw[5] = upN.y;
        raw[6] = -dirN.y;
        raw[7] = 0.0;
        raw[8] = lftN.z;
        raw[9] = upN.z;
        raw[10] = -dirN.z;
        raw[11] = 0.0;
        raw[12] = -lftN.dotProduct(pos);
        raw[13] = -upN.dotProduct(pos);
        raw[14] = dirN.dotProduct(pos);
        raw[15] = 1.0;
        matrix.copyRawDataFrom(raw);
    };
    Matrix3DUtils.reflection = function (plane, target) {
        if (target === void 0) { target = null; }
        if (target === null)
            target = new Matrix3D_1.Matrix3D();
        var a = plane.a, b = plane.b, c = plane.c, d = plane.d;
        var rawData = Matrix3DUtils.RAW_DATA_CONTAINER;
        var ab2 = -2 * a * b;
        var ac2 = -2 * a * c;
        var bc2 = -2 * b * c;
        // reflection matrix
        rawData[0] = 1 - 2 * a * a;
        rawData[4] = ab2;
        rawData[8] = ac2;
        rawData[12] = -2 * a * d;
        rawData[1] = ab2;
        rawData[5] = 1 - 2 * b * b;
        rawData[9] = bc2;
        rawData[13] = -2 * b * d;
        rawData[2] = ac2;
        rawData[6] = bc2;
        rawData[10] = 1 - 2 * c * c;
        rawData[14] = -2 * c * d;
        rawData[3] = 0;
        rawData[7] = 0;
        rawData[11] = 0;
        rawData[15] = 1;
        target.copyRawDataFrom(rawData);
        return target;
    };
    Matrix3DUtils.transformVector = function (matrix, vector, result) {
        if (result === void 0) { result = null; }
        if (!result)
            result = new Vector3D_1.Vector3D();
        var raw = Matrix3DUtils.RAW_DATA_CONTAINER;
        matrix.copyRawDataTo(raw);
        var a = raw[0];
        var e = raw[1];
        var i = raw[2];
        var m = raw[3];
        var b = raw[4];
        var f = raw[5];
        var j = raw[6];
        var n = raw[7];
        var c = raw[8];
        var g = raw[9];
        var k = raw[10];
        var o = raw[11];
        var d = raw[12];
        var h = raw[13];
        var l = raw[14];
        var p = raw[15];
        var x = vector.x;
        var y = vector.y;
        var z = vector.z;
        result.x = a * x + b * y + c * z + d;
        result.y = e * x + f * y + g * z + h;
        result.z = i * x + j * y + k * z + l;
        result.w = m * x + n * y + o * z + p;
        return result;
    };
    Matrix3DUtils.deltaTransformVector = function (matrix, vector, result) {
        if (result === void 0) { result = null; }
        if (!result)
            result = new Vector3D_1.Vector3D();
        var raw = Matrix3DUtils.RAW_DATA_CONTAINER;
        matrix.copyRawDataTo(raw);
        var a = raw[0];
        var e = raw[1];
        var i = raw[2];
        var m = raw[3];
        var b = raw[4];
        var f = raw[5];
        var j = raw[6];
        var n = raw[7];
        var c = raw[8];
        var g = raw[9];
        var k = raw[10];
        var o = raw[11];
        var x = vector.x;
        var y = vector.y;
        var z = vector.z;
        result.x = a * x + b * y + c * z;
        result.y = e * x + f * y + g * z;
        result.z = i * x + j * y + k * z;
        result.w = m * x + n * y + o * z;
        return result;
    };
    Matrix3DUtils.getTranslation = function (transform, result) {
        if (result === void 0) { result = null; }
        if (!result)
            result = new Vector3D_1.Vector3D();
        transform.copyColumnTo(3, result);
        return result;
    };
    Matrix3DUtils.deltaTransformVectors = function (matrix, vin, vout) {
        var raw = Matrix3DUtils.RAW_DATA_CONTAINER;
        matrix.copyRawDataTo(raw);
        var a = raw[0];
        var e = raw[1];
        var i = raw[2];
        var m = raw[3];
        var b = raw[4];
        var f = raw[5];
        var j = raw[6];
        var n = raw[7];
        var c = raw[8];
        var g = raw[9];
        var k = raw[10];
        var o = raw[11];
        var outIndex = 0;
        var length = vin.length;
        for (var index = 0; index < length; index += 3) {
            var x = vin[index];
            var y = vin[index + 1];
            var z = vin[index + 2];
            vout[outIndex++] = a * x + b * y + c * z;
            vout[outIndex++] = e * x + f * y + g * z;
            vout[outIndex++] = i * x + j * y + k * z;
        }
    };
    /**
     * A reference to a Vector to be used as a temporary raw data container, to prevent object creation.
     */
    Matrix3DUtils.RAW_DATA_CONTAINER = new Float32Array(16);
    //public static RAW_DATA_CONTAINER:number[] = new Array<number>(16);
    Matrix3DUtils.CALCULATION_MATRIX = new Matrix3D_1.Matrix3D();
    return Matrix3DUtils;
}());
exports.Matrix3DUtils = Matrix3DUtils;
