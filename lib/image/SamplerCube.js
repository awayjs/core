"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SamplerBase_1 = require("../image/SamplerBase");
/**
 * The Bitmap export class represents display objects that represent bitmap images.
 * These can be images that you load with the <code>flash.Assets</code> or
 * <code>flash.display.Loader</code> classes, or they can be images that you
 * create with the <code>Bitmap()</code> constructor.
 *
 * <p>The <code>Bitmap()</code> constructor allows you to create a Bitmap
 * object that contains a reference to a BitmapData object. After you create a
 * Bitmap object, use the <code>addChild()</code> or <code>addChildAt()</code>
 * method of the parent DisplayObjectContainer instance to place the bitmap on
 * the display list.</p>
 *
 * <p>A Bitmap object can share its BitmapData reference among several Bitmap
 * objects, independent of translation or rotation properties. Because you can
 * create multiple Bitmap objects that reference the same BitmapData object,
 * multiple texture objects can use the same complex BitmapData object without
 * incurring the memory overhead of a BitmapData object for each texture
 * object instance.</p>

 */
var SamplerCube = (function (_super) {
    __extends(SamplerCube, _super);
    /**
     *
     * @param bitmapData
     * @param smoothing
     */
    function SamplerCube(smooth, mipmap) {
        if (smooth === void 0) { smooth = false; }
        if (mipmap === void 0) { mipmap = false; }
        _super.call(this, smooth, mipmap);
    }
    Object.defineProperty(SamplerCube.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return SamplerCube.assetType;
        },
        enumerable: true,
        configurable: true
    });
    SamplerCube.assetType = "[asset SamplerCube]";
    return SamplerCube;
}(SamplerBase_1.SamplerBase));
exports.SamplerCube = SamplerCube;
