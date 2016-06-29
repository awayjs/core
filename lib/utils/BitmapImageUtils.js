"use strict";
var ColorUtils_1 = require("../utils/ColorUtils");
var BitmapImageUtils = (function () {
    function BitmapImageUtils() {
    }
    BitmapImageUtils._fillRect = function (context, rect, color, transparent) {
        if (color == 0x0 && transparent) {
            context.clearRect(rect.x, rect.y, rect.width, rect.height);
        }
        else {
            var argb = ColorUtils_1.ColorUtils.float32ColorToARGB(color);
            if (transparent)
                context.fillStyle = 'rgba(' + argb[1] + ',' + argb[2] + ',' + argb[3] + ',' + argb[0] / 255 + ')';
            else
                context.fillStyle = 'rgba(' + argb[1] + ',' + argb[2] + ',' + argb[3] + ',1)';
            context.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
    };
    BitmapImageUtils._copyPixels = function (context, bmpd, sourceRect, destRect) {
        context.drawImage(bmpd, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, destRect.x, destRect.y, destRect.width, destRect.height);
    };
    BitmapImageUtils._draw = function (context, source, matrix, colorTransform, blendMode, clipRect, smoothing) {
        context.save();
        if (matrix != null)
            context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
        if (clipRect != null)
            context.drawImage(source, clipRect.x, clipRect.y, clipRect.width, clipRect.height);
        else
            context.drawImage(source, 0, 0);
        context.restore();
    };
    return BitmapImageUtils;
}());
exports.BitmapImageUtils = BitmapImageUtils;
