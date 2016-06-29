"use strict";
/**
 * A Quaternion object which can be used to represent rotations.
 */
var Orientation3D = (function () {
    function Orientation3D() {
    }
    /**
     * The axis angle orientation uses a combination of an axis and an angle to determine the orientation.
     * @type {string}
     */
    Orientation3D.AXIS_ANGLE = "axisAngle";
    /**
     * The default orientation for decompose() and recompose() methods, defines the orientation with three separate angles of rotation for each axis.
     * @type {string}
     */
    Orientation3D.EULER_ANGLES = "eulerAngles";
    /**
     * The quaternion orientation uses complex numbers.
     * @type {string}
     */
    Orientation3D.QUATERNION = "quaternion";
    return Orientation3D;
}());
exports.Orientation3D = Orientation3D;
