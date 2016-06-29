"use strict";
/**
 *
 */
var ColorUtils = (function () {
    function ColorUtils() {
    }
    ColorUtils.float32ColorToARGB = function (float32Color) {
        var a = (float32Color & 0xff000000) >>> 24;
        var r = (float32Color & 0xff0000) >>> 16;
        var g = (float32Color & 0xff00) >>> 8;
        var b = float32Color & 0xff;
        var result = [a, r, g, b];
        return result;
    };
    ColorUtils.ARGBtoFloat32 = function (a, r, g, b) {
        return ((a << 24) | (r << 16) | (g << 8) | b);
    };
    ColorUtils.componentToHex = function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };
    ColorUtils.RGBToHexString = function (argb) {
        return "#" + ColorUtils.componentToHex(argb[1]) + ColorUtils.componentToHex(argb[2]) + ColorUtils.componentToHex(argb[3]);
    };
    ColorUtils.ARGBToHexString = function (argb) {
        return "#" + ColorUtils.componentToHex(argb[0]) + ColorUtils.componentToHex(argb[1]) + ColorUtils.componentToHex(argb[2]) + ColorUtils.componentToHex(argb[3]);
    };
    return ColorUtils;
}());
exports.ColorUtils = ColorUtils;
