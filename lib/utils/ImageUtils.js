"use strict";
var ImageUtils = (function () {
    function ImageUtils() {
    }
    ImageUtils.isImage2DValid = function (image2D) {
        if (image2D == null)
            return true;
        return ImageUtils.isDimensionValid(image2D.width, image2D.powerOfTwo) && ImageUtils.isDimensionValid(image2D.height, image2D.powerOfTwo);
    };
    ImageUtils.isHTMLImageElementValid = function (image) {
        if (image == null)
            return true;
        return ImageUtils.isDimensionValid(image.width) && ImageUtils.isDimensionValid(image.height);
    };
    ImageUtils.isDimensionValid = function (d, powerOfTwo) {
        if (powerOfTwo === void 0) { powerOfTwo = true; }
        return d >= 1 && d <= ImageUtils.MAX_SIZE && (!powerOfTwo || ImageUtils.isPowerOfTwo(d));
    };
    ImageUtils.isPowerOfTwo = function (value) {
        return value ? ((value & -value) == value) : false;
    };
    ImageUtils.getBestPowerOf2 = function (value) {
        var p = 1;
        while (p < value)
            p <<= 1;
        if (p > ImageUtils.MAX_SIZE)
            p = ImageUtils.MAX_SIZE;
        return p;
    };
    ImageUtils.MAX_SIZE = 2048;
    return ImageUtils;
}());
exports.ImageUtils = ImageUtils;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageUtils;
