"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ImageBase_1 = require("../image/ImageBase");
var Rectangle_1 = require("../geom/Rectangle");
var ImageUtils_1 = require("../utils/ImageUtils");
var Image2D = (function (_super) {
    __extends(Image2D, _super);
    /**
     *
     */
    function Image2D(width, height, powerOfTwo) {
        if (powerOfTwo === void 0) { powerOfTwo = true; }
        _super.call(this);
        this._powerOfTwo = true;
        this._rect = new Rectangle_1.Rectangle(0, 0, width, height);
        this._powerOfTwo = powerOfTwo;
        this._testDimensions();
    }
    Object.defineProperty(Image2D.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return Image2D.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image2D.prototype, "height", {
        /**
         * The height of the image in pixels.
         */
        get: function () {
            return this._rect.height;
        },
        set: function (value) {
            if (this._rect.height == value)
                return;
            this._setSize(this._rect.width, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image2D.prototype, "rect", {
        /**
         * The rectangle that defines the size and location of the bitmap image. The
         * top and left of the rectangle are 0; the width and height are equal to the
         * width and height in pixels of the BitmapData object.
         */
        get: function () {
            return this._rect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image2D.prototype, "width", {
        /**
         * The width of the bitmap image in pixels.
         */
        get: function () {
            return this._rect.width;
        },
        set: function (value) {
            if (this._rect.width == value)
                return;
            this._setSize(value, this._rect.height);
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param width
     * @param height
     * @private
     */
    Image2D.prototype._setSize = function (width, height) {
        if (this._rect.width != width || this._rect.height != height)
            this.clear();
        this._rect.width = width;
        this._rect.height = height;
        this._testDimensions();
    };
    /**
     *
     * @private
     */
    Image2D.prototype._testDimensions = function () {
        if (this._powerOfTwo && (!ImageUtils_1.ImageUtils.isDimensionValid(this._rect.width) || !ImageUtils_1.ImageUtils.isDimensionValid(this._rect.height)))
            throw new Error("Invalid dimension: Width and height must be power of 2 and cannot exceed 2048");
    };
    Object.defineProperty(Image2D.prototype, "powerOfTwo", {
        /**
         * Enable POT texture size validation
         * @returns {boolean}
         */
        get: function () {
            return this._powerOfTwo;
        },
        set: function (value) {
            if (this._powerOfTwo == value)
                return;
            this._powerOfTwo = value;
            this._testDimensions();
        },
        enumerable: true,
        configurable: true
    });
    Image2D.assetType = "[image Image2D]";
    return Image2D;
}(ImageBase_1.ImageBase));
exports.Image2D = Image2D;
