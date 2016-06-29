"use strict";
/**
* MathConsts provides some commonly used mathematical constants
*/
var MathConsts = (function () {
    function MathConsts() {
    }
    /**
     * The amount to multiply with when converting radians to degrees.
     */
    MathConsts.RADIANS_TO_DEGREES = 180 / Math.PI;
    /**
     * The amount to multiply with when converting degrees to radians.
     */
    MathConsts.DEGREES_TO_RADIANS = Math.PI / 180;
    return MathConsts;
}());
exports.MathConsts = MathConsts;
