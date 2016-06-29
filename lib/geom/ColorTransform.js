"use strict";
var ColorUtils_1 = require("../utils/ColorUtils");
/**
 * The ColorTransform export class lets you adjust the color values in a display
 * object. The color adjustment or <i>color transformation</i> can be applied
 * to all four channels: red, green, blue, and alpha transparency.
 *
 * <p>When a ColorTransform object is applied to a display object, a new value
 * for each color channel is calculated like this:</p>
 *
 * <ul>
 *   <li>New red value = (old red value * <code>redMultiplier</code>) +
 * <code>redOffset</code></li>
 *   <li>New green value = (old green value * <code>greenMultiplier</code>) +
 * <code>greenOffset</code></li>
 *   <li>New blue value = (old blue value * <code>blueMultiplier</code>) +
 * <code>blueOffset</code></li>
 *   <li>New alpha value = (old alpha value * <code>alphaMultiplier</code>) +
 * <code>alphaOffset</code></li>
 * </ul>
 *
 * <p>If any of the color channel values is greater than 255 after the
 * calculation, it is set to 255. If it is less than 0, it is set to 0.</p>
 *
 * <p>You can use ColorTransform objects in the following ways:</p>
 *
 * <ul>
 *   <li>In the <code>colorTransform</code> parameter of the
 * <code>colorTransform()</code> method of the BitmapData class</li>
 *   <li>As the <code>colorTransform</code> property of a Transform object
 * (which can be used as the <code>transform</code> property of a display
 * object)</li>
 * </ul>
 *
 * <p>You must use the <code>new ColorTransform()</code> constructor to create
 * a ColorTransform object before you can call the methods of the
 * ColorTransform object.</p>
 *
 * <p>Color transformations do not apply to the background color of a movie
 * clip(such as a loaded SWF object). They apply only to graphics and symbols
 * that are attached to the movie clip.</p>
 */
var ColorTransform = (function () {
    function ColorTransform(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
        if (redMultiplier === void 0) { redMultiplier = 1; }
        if (greenMultiplier === void 0) { greenMultiplier = 1; }
        if (blueMultiplier === void 0) { blueMultiplier = 1; }
        if (alphaMultiplier === void 0) { alphaMultiplier = 1; }
        if (redOffset === void 0) { redOffset = 0; }
        if (greenOffset === void 0) { greenOffset = 0; }
        if (blueOffset === void 0) { blueOffset = 0; }
        if (alphaOffset === void 0) { alphaOffset = 0; }
        this.rawData = new Float32Array(8);
        if (redMultiplier instanceof Float32Array) {
            this.copyRawDataFrom(redMultiplier);
        }
        else {
            this.redMultiplier = Number(redMultiplier);
            this.greenMultiplier = greenMultiplier;
            this.blueMultiplier = blueMultiplier;
            this.alphaMultiplier = alphaMultiplier;
            this.redOffset = redOffset;
            this.greenOffset = greenOffset;
            this.blueOffset = blueOffset;
            this.alphaOffset = alphaOffset;
        }
    }
    Object.defineProperty(ColorTransform.prototype, "alphaMultiplier", {
        /**
         * A decimal value that is multiplied with the alpha transparency channel
         * value.
         *
         * <p>If you set the alpha transparency value of a display object directly by
         * using the <code>alpha</code> property of the DisplayObject instance, it
         * affects the value of the <code>alphaMultiplier</code> property of that
         * display object's <code>transform.colorTransform</code> property.</p>
         */
        get: function () {
            return this.rawData[3];
        },
        set: function (value) {
            this.rawData[3] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "alphaOffset", {
        /**
         * A number from -255 to 255 that is added to the alpha transparency channel
         * value after it has been multiplied by the <code>alphaMultiplier</code>
         * value.
         */
        get: function () {
            return this.rawData[7] * 0xFF;
        },
        set: function (value) {
            this.rawData[7] = value / 0xFF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "blueMultiplier", {
        /**
         * A decimal value that is multiplied with the blue channel value.
         */
        get: function () {
            return this.rawData[2];
        },
        set: function (value) {
            this.rawData[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "blueOffset", {
        /**
         * A number from -255 to 255 that is added to the blue channel value after it
         * has been multiplied by the <code>blueMultiplier</code> value.
         */
        get: function () {
            return this.rawData[6] * 0xFF;
        },
        set: function (value) {
            this.rawData[6] = value / 0xFF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "greenMultiplier", {
        /**
         * A decimal value that is multiplied with the green channel value.
         */
        get: function () {
            return this.rawData[1];
        },
        set: function (value) {
            this.rawData[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "greenOffset", {
        /**
         * A number from -255 to 255 that is added to the green channel value after
         * it has been multiplied by the <code>greenMultiplier</code> value.
         */
        get: function () {
            return this.rawData[5] * 0xFF;
        },
        set: function (value) {
            this.rawData[5] = value / 0xFF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "redMultiplier", {
        /**
         * A decimal value that is multiplied with the red channel value.
         */
        get: function () {
            return this.rawData[0];
        },
        set: function (value) {
            this.rawData[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "redOffset", {
        /**
         * A number from -255 to 255 that is added to the red channel value after it
         * has been multiplied by the <code>redMultiplier</code> value.
         */
        get: function () {
            return this.rawData[4] * 0xFF;
        },
        set: function (value) {
            this.rawData[4] = value / 0xFF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "color", {
        /**
         * The RGB color value for a ColorTransform object.
         *
         * <p>When you set this property, it changes the three color offset values
         * (<code>redOffset</code>, <code>greenOffset</code>, and
         * <code>blueOffset</code>) accordingly, and it sets the three color
         * multiplier values(<code>redMultiplier</code>,
         * <code>greenMultiplier</code>, and <code>blueMultiplier</code>) to 0. The
         * alpha transparency multiplier and offset values do not change.</p>
         *
         * <p>When you pass a value for this property, use the format
         * 0x<i>RRGGBB</i>. <i>RR</i>, <i>GG</i>, and <i>BB</i> each consist of two
         * hexadecimal digits that specify the offset of each color component. The 0x
         * tells the ActionScript compiler that the number is a hexadecimal
         * value.</p>
         */
        get: function () {
            return ((this.rawData[0] << 16) | (this.rawData[1] << 8) | this.rawData[2]);
        },
        set: function (value) {
            var argb = ColorUtils_1.ColorUtils.float32ColorToARGB(value);
            this.rawData[4] = argb[1]; //(value >> 16) & 0xFF;
            this.rawData[5] = argb[2]; //(value >> 8) & 0xFF;
            this.rawData[6] = argb[3]; //value & 0xFF;
            this.rawData[0] = 0;
            this.rawData[1] = 0;
            this.rawData[2] = 0;
        },
        enumerable: true,
        configurable: true
    });
    ColorTransform.prototype.copyRawDataFrom = function (vector, index) {
        if (index === void 0) { index = 0; }
        for (var c = 0; c < 8; c++)
            this.rawData[c] = vector[c + index];
    };
    ColorTransform.prototype.clear = function () {
        this.rawData[0] = 1;
        this.rawData[1] = 1;
        this.rawData[2] = 1;
        this.rawData[3] = 1;
        this.rawData[4] = 0;
        this.rawData[5] = 0;
        this.rawData[6] = 0;
        this.rawData[7] = 0;
    };
    ColorTransform.prototype.clone = function () {
        return new ColorTransform(this.rawData);
    };
    ColorTransform.prototype.copyFrom = function (source) {
        for (var c = 0; c < 8; c++)
            this.rawData[c] = source.rawData[c];
    };
    ColorTransform.prototype.copyTo = function (destination) {
        destination.copyFrom(this);
    };
    ColorTransform.prototype.prepend = function (ct) {
        this.rawData[4] += ct.rawData[4] * this.rawData[0];
        this.rawData[5] += ct.rawData[5] * this.rawData[1];
        this.rawData[6] += ct.rawData[6] * this.rawData[2];
        this.rawData[7] += ct.rawData[7] * this.rawData[3];
        this.redMultiplier *= ct.redMultiplier;
        this.greenMultiplier *= ct.greenMultiplier;
        this.blueMultiplier *= ct.blueMultiplier;
        this.alphaMultiplier *= ct.alphaMultiplier;
    };
    ColorTransform.prototype._isRenderable = function () {
        return this.rawData[3] != 0 || this.rawData[7] > 0;
    };
    return ColorTransform;
}());
exports.ColorTransform = ColorTransform;
