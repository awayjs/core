"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ImageBase_1 = require("../image/ImageBase");
var ImageUtils_1 = require("../utils/ImageUtils");
var ImageCube = (function (_super) {
    __extends(ImageCube, _super);
    /**
     *
     */
    function ImageCube(size) {
        _super.call(this);
        this._size = size;
        this._testDimensions();
    }
    Object.defineProperty(ImageCube.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return ImageCube.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCube.prototype, "size", {
        /**
         * The size of the cube bitmap in pixels.
         */
        get: function () {
            return this._size;
        },
        set: function (value) {
            if (this._size == value)
                return;
            this._setSize(this._size);
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
    ImageCube.prototype._setSize = function (size) {
        if (this._size != size)
            this.clear();
        this._size = size;
        this._testDimensions();
    };
    /**
     *
     * @private
     */
    ImageCube.prototype._testDimensions = function () {
        if (!ImageUtils_1.ImageUtils.isDimensionValid(this._size))
            throw new Error("Invalid dimension: Width and height must be power of 2 and cannot exceed 2048");
    };
    ImageCube.assetType = "[image ImageCube]";
    return ImageCube;
}(ImageBase_1.ImageBase));
exports.ImageCube = ImageCube;
