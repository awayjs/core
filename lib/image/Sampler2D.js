"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SamplerBase_1 = require("../image/SamplerBase");
/**
 * The Sampler2D export class represents display objects that represent bitmap images.
 * These can be images that you load with the <code>flash.Assets</code> or
 * <code>flash.display.Loader</code> classes, or they can be images that you
 * create with the <code>Sampler2D()</code> constructor.
 *
 * <p>The <code>Sampler2D()</code> constructor allows you to create a Sampler2D
 * object that contains a reference to a Image2D object. After you create a
 * Sampler2D object, use the <code>addChild()</code> or <code>addChildAt()</code>
 * method of the parent DisplayObjectContainer instance to place the bitmap on
 * the display list.</p>
 *
 * <p>A Sampler2D object can share its Image2D reference among several Sampler2D
 * objects, independent of translation or rotation properties. Because you can
 * create multiple Sampler2D objects that reference the same Image2D object,
 * multiple texture objects can use the same complex Image2D object without
 * incurring the memory overhead of a Image2D object for each texture
 * object instance.</p>

 */
var Sampler2D = (function (_super) {
    __extends(Sampler2D, _super);
    /**
     *
     * @param image2D
     * @param smoothing
     */
    function Sampler2D(repeat, smooth, mipmap) {
        if (repeat === void 0) { repeat = false; }
        if (smooth === void 0) { smooth = false; }
        if (mipmap === void 0) { mipmap = false; }
        _super.call(this, smooth, mipmap);
        this._repeat = repeat;
        this._updateRect();
    }
    Object.defineProperty(Sampler2D.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return Sampler2D.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sampler2D.prototype, "repeat", {
        /**
         * Controls whether or not the Sampler2D object is snapped to the nearest pixel.
         * This value is ignored in the native and HTML5 targets.
         * The PixelSnapping export class includes possible values:
         * <ul>
         *   <li><code>PixelSnapping.NEVER</code> - No pixel snapping occurs.</li>
         *   <li><code>PixelSnapping.ALWAYS</code> - The image is always snapped to
         * the nearest pixel, independent of transformation.</li>
         *   <li><code>PixelSnapping.AUTO</code> - The image is snapped to the
         * nearest pixel if it is drawn with no rotation or skew and it is drawn at a
         * scale factor of 99.9% to 100.1%. If these conditions are satisfied, the
         * bitmap image is drawn at 100% scale, snapped to the nearest pixel.
         * When targeting Flash Player, this value allows the image to be drawn as fast
         * as possible using the internal vector renderer.</li>
         * </ul>
         */
        //var pixelSnapping:PixelSnapping;
        /**
         * Controls whether or not the bitmap is smoothed when scaled. If
         * <code>true</code>, the bitmap is smoothed when scaled. If
         * <code>false</code>, the bitmap is not smoothed when scaled.
         */
        /**
         *
         */
        get: function () {
            return this._repeat;
        },
        set: function (value) {
            if (this._repeat == value)
                return;
            this._repeat = value;
            //TODO: update dependencies
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sampler2D.prototype, "imageRect", {
        /**
         *
         */
        get: function () {
            return this._imageRect;
        },
        set: function (value) {
            if (this._imageRect == value)
                return;
            this._imageRect = value;
            this._updateRect();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sampler2D.prototype, "frameRect", {
        /**
         *
         */
        get: function () {
            return this._frameRect;
        },
        set: function (value) {
            if (this._frameRect == value)
                return;
            this._frameRect = value;
            this._updateRect();
        },
        enumerable: true,
        configurable: true
    });
    Sampler2D.prototype._updateRect = function () {
    };
    Sampler2D.assetType = "[asset Sampler2D]";
    return Sampler2D;
}(SamplerBase_1.SamplerBase));
exports.Sampler2D = Sampler2D;
