"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BitmapImage2D_1 = require("../image/BitmapImage2D");
var BitmapImageChannel_1 = require("../image/BitmapImageChannel");
var Image2D_1 = require("../image/Image2D");
var Point_1 = require("../geom/Point");
/**
 *
 */
var SpecularImage2D = (function (_super) {
    __extends(SpecularImage2D, _super);
    /**
     *
     */
    function SpecularImage2D(specularSource, glossSource) {
        if (specularSource === void 0) { specularSource = null; }
        if (glossSource === void 0) { glossSource = null; }
        _super.call(this, 1, 1);
        this._specularSource = specularSource;
        this._glossSource = glossSource;
        this._output = new BitmapImage2D_1.BitmapImage2D(1, 1, false, 0xffffff);
        this._testSize();
    }
    Object.defineProperty(SpecularImage2D.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return SpecularImage2D.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpecularImage2D.prototype, "specularSource", {
        get: function () {
            return this._specularSource;
        },
        set: function (value) {
            if (this._specularSource == value)
                return;
            this._specularSource = value;
            this.invalidate();
            this._testSize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpecularImage2D.prototype, "glossSource", {
        get: function () {
            return this._glossSource;
        },
        set: function (value) {
            if (this._glossSource == value)
                return;
            this._glossSource = value;
            this.invalidate();
            this._testSize();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a new SpecularImage2D object that is a clone of the original instance
     * with an exact copy of the contained bitmap.
     *
     * @return A new SpecularImage2D object that is identical to the original.
     */
    SpecularImage2D.prototype.clone = function () {
        return new SpecularImage2D(this._specularSource, this._glossSource);
    };
    /**
     * Frees memory that is used to store the SpecularImage2D object.
     *
     * <p>When the <code>dispose()</code> method is called on an image, the width
     * and height of the image are set to 0. All subsequent calls to methods or
     * properties of this SpecularImage2D instance fail, and an exception is thrown.
     * </p>
     *
     * <p><code>SpecularImage2D.dispose()</code> releases the memory occupied by the
     * actual bitmap data, immediately(a bitmap can consume up to 64 MB of
     * memory). After using <code>SpecularImage2D.dispose()</code>, the SpecularImage2D
     * object is no longer usable and an exception may be thrown if
     * you call functions on the SpecularImage2D object. However,
     * <code>SpecularImage2D.dispose()</code> does not garbage collect the SpecularImage2D
     * object(approximately 128 bytes); the memory occupied by the actual
     * SpecularImage2D object is released at the time the SpecularImage2D object is
     * collected by the garbage collector.</p>
     *
     */
    SpecularImage2D.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._rect = null;
        this._output.dispose();
    };
    /**
     *
     * @returns {ImageData}
     */
    SpecularImage2D.prototype.getImageData = function () {
        var origin = new Point_1.Point();
        this._output.fillRect(this._rect, 0xffffff);
        if (this._glossSource)
            this._output.copyChannel(this._glossSource, this._rect, origin, BitmapImageChannel_1.BitmapImageChannel.GREEN, BitmapImageChannel_1.BitmapImageChannel.GREEN);
        if (this._specularSource)
            this._output.copyChannel(this._specularSource, this._rect, origin, BitmapImageChannel_1.BitmapImageChannel.RED, BitmapImageChannel_1.BitmapImageChannel.RED);
        return this._output.getImageData();
    };
    /**
     *
     * @returns {HTMLCanvasElement}
     */
    SpecularImage2D.prototype.getCanvas = function () {
        return this._output.getCanvas();
    };
    /**
     *
     * @param width
     * @param height
     * @private
     */
    SpecularImage2D.prototype._setSize = function (width, height) {
        _super.prototype._setSize.call(this, width, height);
        this._output._setSize(width, height);
    };
    SpecularImage2D.prototype._testSize = function () {
        var w, h;
        if (this._specularSource) {
            w = this._specularSource.width;
            h = this._specularSource.height;
        }
        else if (this._glossSource) {
            w = this._glossSource.width;
            h = this._glossSource.height;
        }
        else {
            w = 1;
            h = 1;
        }
        if (w != this._output.width && h != this._output.height) {
            this._output.dispose();
            this._output = new BitmapImage2D_1.BitmapImage2D(w, h, false, 0xffffff);
        }
        this._setSize(w, h);
    };
    SpecularImage2D.assetType = "[asset SpecularImage2D]";
    return SpecularImage2D;
}(Image2D_1.Image2D));
exports.SpecularImage2D = SpecularImage2D;
