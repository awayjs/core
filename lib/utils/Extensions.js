"use strict";
/**
 *
 */
var Extensions = (function () {
    function Extensions() {
    }
    Extensions.SIMD = Boolean(typeof (SIMD) !== "undefined");
    return Extensions;
}());
exports.Extensions = Extensions;
