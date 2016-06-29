"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BitmapImage2D_1 = require("../image/BitmapImage2D");
var ImageCube_1 = require("../image/ImageCube");
var Rectangle_1 = require("../geom/Rectangle");
var ColorUtils_1 = require("../utils/ColorUtils");
var BitmapImageUtils_1 = require("../utils/BitmapImageUtils");
/**
 * The BitmapImage2D export class lets you work with the data(pixels) of a Bitmap
 * object. You can use the methods of the BitmapImage2D export class to create
 * arbitrarily sized transparent or opaque bitmap images and manipulate them
 * in various ways at runtime. You can also access the BitmapImage2D for a bitmap
 * image that you load with the <code>flash.Assets</code> or
 * <code>flash.display.Loader</code> classes.
 *
 * <p>This export class lets you separate bitmap rendering operations from the
 * internal display updating routines of flash. By manipulating a
 * BitmapImage2D object directly, you can create complex images without incurring
 * the per-frame overhead of constantly redrawing the content from vector
 * data.</p>
 *
 * <p>The methods of the BitmapImage2D export class support effects that are not
 * available through the filters available to non-bitmap display objects.</p>
 *
 * <p>A BitmapImage2D object contains an array of pixel data. This data can
 * represent either a fully opaque bitmap or a transparent bitmap that
 * contains alpha channel data. Either type of BitmapImage2D object is stored as
 * a buffer of 32-bit integers. Each 32-bit integer determines the properties
 * of a single pixel in the bitmap.</p>
 *
 * <p>Each 32-bit integer is a combination of four 8-bit channel values(from
 * 0 to 255) that describe the alpha transparency and the red, green, and blue
 * (ARGB) values of the pixel.(For ARGB values, the most significant byte
 * represents the alpha channel value, followed by red, green, and blue.)</p>
 *
 * <p>The four channels(alpha, red, green, and blue) are represented as
 * numbers when you use them with the <code>BitmapImage2D.copyChannel()</code>
 * method or the <code>DisplacementMapFilter.componentX</code> and
 * <code>DisplacementMapFilter.componentY</code> properties, and these numbers
 * are represented by the following constants in the BitmapImage2DChannel
 * class:</p>
 *
 * <ul>
 *   <li><code>BitmapImage2DChannel.ALPHA</code></li>
 *   <li><code>BitmapImage2DChannel.RED</code></li>
 *   <li><code>BitmapImage2DChannel.GREEN</code></li>
 *   <li><code>BitmapImage2DChannel.BLUE</code></li>
 * </ul>
 *
 * <p>You can attach BitmapImage2D objects to a Bitmap object by using the
 * <code>bitmapData</code> property of the Bitmap object.</p>
 *
 * <p>You can use a BitmapImage2D object to fill a Graphics object by using the
 * <code>Graphics.beginBitmapFill()</code> method.</p>
 *
 * <p>You can also use a BitmapImage2D object to perform batch tile rendering
 * using the <code>flash.display.Tilesheet</code> class.</p>
 *
 * <p>In Flash Player 10, the maximum size for a BitmapImage2D object
 * is 8,191 pixels in width or height, and the total number of pixels cannot
 * exceed 16,777,215 pixels.(So, if a BitmapImage2D object is 8,191 pixels wide,
 * it can only be 2,048 pixels high.) In Flash Player 9 and earlier, the limitation
 * is 2,880 pixels in height and 2,880 in width.</p>
 */
var BitmapImageCube = (function (_super) {
    __extends(BitmapImageCube, _super);
    /**
     * Creates a BitmapImage2D object with a specified width and height. If you
     * specify a value for the <code>fillColor</code> parameter, every pixel in
     * the bitmap is set to that color.
     *
     * <p>By default, the bitmap is created as transparent, unless you pass
     * the value <code>false</code> for the transparent parameter. After you
     * create an opaque bitmap, you cannot change it to a transparent bitmap.
     * Every pixel in an opaque bitmap uses only 24 bits of color channel
     * information. If you define the bitmap as transparent, every pixel uses 32
     * bits of color channel information, including an alpha transparency
     * channel.</p>
     *
     * @param width       The width of the bitmap image in pixels.
     * @param height      The height of the bitmap image in pixels.
     * @param transparent Specifies whether the bitmap image supports per-pixel
     *                    transparency. The default value is <code>true</code>
     *                    (transparent). To create a fully transparent bitmap,
     *                    set the value of the <code>transparent</code>
     *                    parameter to <code>true</code> and the value of the
     *                    <code>fillColor</code> parameter to 0x00000000(or to
     *                    0). Setting the <code>transparent</code> property to
     *                    <code>false</code> can result in minor improvements
     *                    in rendering performance.
     * @param fillColor   A 32-bit ARGB color value that you use to fill the
     *                    bitmap image area. The default value is
     *                    0xFFFFFFFF(solid white).
     */
    function BitmapImageCube(size, transparent, fillColor) {
        if (transparent === void 0) { transparent = true; }
        if (fillColor === void 0) { fillColor = null; }
        _super.call(this, size);
        this._imageCanvas = new Array(6);
        this._context = new Array(6);
        this._imageData = new Array(6);
        this._locked = false;
        this._transparent = transparent;
        for (var i = 0; i < 6; i++) {
            this._imageCanvas[i] = document.createElement("canvas");
            this._imageCanvas[i].width = size;
            this._imageCanvas[i].height = size;
            this._context[i] = this._imageCanvas[i].getContext("2d");
            if (fillColor != null)
                this.fillRect(i, new Rectangle_1.Rectangle(0, 0, size, size), fillColor);
        }
    }
    Object.defineProperty(BitmapImageCube.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return BitmapImageCube.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapImageCube.prototype, "transparent", {
        /**
         * Defines whether the bitmap image supports per-pixel transparency. You can
         * set this value only when you construct a BitmapImage2D object by passing in
         * <code>true</code> for the <code>transparent</code> parameter of the
         * constructor. Then, after you create a BitmapImage2D object, you can check
         * whether it supports per-pixel transparency by determining if the value of
         * the <code>transparent</code> property is <code>true</code>.
         */
        get: function () {
            return this._transparent;
        },
        set: function (value) {
            this._transparent = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a new BitmapImage2D object that is a clone of the original instance
     * with an exact copy of the contained bitmap.
     *
     * @return A new BitmapImage2D object that is identical to the original.
     */
    BitmapImageCube.prototype.clone = function () {
        var t = new BitmapImageCube(this._size, this.transparent);
        for (var i = 0; i < 6; i++) {
            t.draw(i, this.getCanvas(i));
        }
        return t;
    };
    /**
     * Adjusts the color values in a specified area of a bitmap image by using a
     * <code>ColorTransform</code> object. If the rectangle matches the
     * boundaries of the bitmap image, this method transforms the color values of
     * the entire image.
     *
     * @param rect           A Rectangle object that defines the area of the
     *                       image in which the ColorTransform object is applied.
     * @param colorTransform A ColorTransform object that describes the color
     *                       transformation values to apply.
     */
    BitmapImageCube.prototype.colorTransform = function (side, rect, colorTransform) {
        if (!this._locked)
            this._imageData[side] = this._context[side].getImageData(0, 0, this._size, this._size);
        var data = this._imageData[side].data;
        var i, j, index;
        for (i = 0; i < rect.width; ++i) {
            for (j = 0; j < rect.height; ++j) {
                index = (i + rect.x + (j + rect.y) * this._size) * 4;
                data[index] = data[index] * colorTransform.redMultiplier + colorTransform.redOffset;
                data[index + 1] = data[index + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset;
                data[index + 2] = data[index + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset;
                data[index + 3] = data[index + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset;
            }
        }
        if (!this._locked) {
            this._context[side].putImageData(this._imageData[side], 0, 0);
            this._imageData[side] = null;
        }
        this.invalidate();
    };
    /**
     * Transfers data from one channel of another BitmapImage2D object or the
     * current BitmapImage2D object into a channel of the current BitmapImage2D object.
     * All of the data in the other channels in the destination BitmapImage2D object
     * are preserved.
     *
     * <p>The source channel value and destination channel value can be one of
     * following values: </p>
     *
     * <ul>
     *   <li><code>BitmapImage2DChannel.RED</code></li>
     *   <li><code>BitmapImage2DChannel.GREEN</code></li>
     *   <li><code>BitmapImage2DChannel.BLUE</code></li>
     *   <li><code>BitmapImage2DChannel.ALPHA</code></li>
     * </ul>
     *
     * @param sourceBitmapImage2D The input bitmap image to use. The source image
     *                         can be a different BitmapImage2D object or it can
     *                         refer to the current BitmapImage2D object.
     * @param sourceRect       The source Rectangle object. To copy only channel
     *                         data from a smaller area within the bitmap,
     *                         specify a source rectangle that is smaller than
     *                         the overall size of the BitmapImage2D object.
     * @param destPoint        The destination Point object that represents the
     *                         upper-left corner of the rectangular area where
     *                         the new channel data is placed. To copy only
     *                         channel data from one area to a different area in
     *                         the destination image, specify a point other than
     *                        (0,0).
     * @param sourceChannel    The source channel. Use a value from the
     *                         BitmapImage2DChannel class
     *                        (<code>BitmapImage2DChannel.RED</code>,
     *                         <code>BitmapImage2DChannel.BLUE</code>,
     *                         <code>BitmapImage2DChannel.GREEN</code>,
     *                         <code>BitmapImage2DChannel.ALPHA</code>).
     * @param destChannel      The destination channel. Use a value from the
     *                         BitmapImage2DChannel class
     *                        (<code>BitmapImage2DChannel.RED</code>,
     *                         <code>BitmapImage2DChannel.BLUE</code>,
     *                         <code>BitmapImage2DChannel.GREEN</code>,
     *                         <code>BitmapImage2DChannel.ALPHA</code>).
     * @throws TypeError The sourceBitmapImage2D, sourceRect or destPoint are null.
     */
    BitmapImageCube.prototype.copyChannel = function (side, sourceBitmap, sourceRect, destPoint, sourceChannel, destChannel) {
        var imageData = sourceBitmap.getImageData();
        if (!this._locked)
            this._imageData[side] = this._context[side].getImageData(0, 0, this._size, this._size);
        var sourceData = sourceBitmap.getImageData().data;
        var destData = this._imageData[side].data;
        var sourceOffset = Math.round(Math.log(sourceChannel) / Math.log(2));
        var destOffset = Math.round(Math.log(destChannel) / Math.log(2));
        var i, j, sourceIndex, destIndex;
        for (i = 0; i < sourceRect.width; ++i) {
            for (j = 0; j < sourceRect.height; ++j) {
                sourceIndex = (i + sourceRect.x + (j + sourceRect.y) * sourceBitmap.width) * 4;
                destIndex = (i + destPoint.x + (j + destPoint.y) * this._size) * 4;
                destData[destIndex + destOffset] = sourceData[sourceIndex + sourceOffset];
            }
        }
        if (!this._locked) {
            this._context[side].putImageData(this._imageData[side], 0, 0);
            this._imageData[side] = null;
        }
        this.invalidate();
    };
    BitmapImageCube.prototype.copyPixels = function (side, source, sourceRect, destRect) {
        if (source instanceof BitmapImage2D_1.BitmapImage2D)
            source = source.getCanvas();
        if (this._locked) {
            // If canvas is locked:
            //
            //      1) copy image data back to canvas
            //      2) draw object
            //      3) read _imageData back out
            this._context[side].putImageData(this._imageData[side], 0, 0); // at coords 0,0
            BitmapImageUtils_1.BitmapImageUtils._copyPixels(this._context[side], source, sourceRect, destRect);
            this._imageData[side] = this._context[side].getImageData(0, 0, this._size, this._size);
        }
        else {
            BitmapImageUtils_1.BitmapImageUtils._copyPixels(this._context[side], source, sourceRect, destRect);
        }
        this.invalidate();
    };
    /**
     * Frees memory that is used to store the BitmapImage2D object.
     *
     * <p>When the <code>dispose()</code> method is called on an image, the width
     * and height of the image are set to 0. All subsequent calls to methods or
     * properties of this BitmapImage2D instance fail, and an exception is thrown.
     * </p>
     *
     * <p><code>BitmapImage2D.dispose()</code> releases the memory occupied by the
     * actual bitmap data, immediately(a bitmap can consume up to 64 MB of
     * memory). After using <code>BitmapImage2D.dispose()</code>, the BitmapImage2D
     * object is no longer usable and an exception may be thrown if
     * you call functions on the BitmapImage2D object. However,
     * <code>BitmapImage2D.dispose()</code> does not garbage collect the BitmapImage2D
     * object(approximately 128 bytes); the memory occupied by the actual
     * BitmapImage2D object is released at the time the BitmapImage2D object is
     * collected by the garbage collector.</p>
     *
     */
    BitmapImageCube.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        for (var i = 0; i < 6; i++) {
            this._context[i] = null;
            this._imageCanvas[i] = null;
            this._imageData[i] = null;
        }
        this._transparent = null;
        this._locked = null;
    };
    BitmapImageCube.prototype.draw = function (side, source, matrix, colorTransform, blendMode, clipRect, smoothing) {
        if (source instanceof BitmapImage2D_1.BitmapImage2D)
            source = source.getCanvas();
        if (this._locked) {
            // If canvas is locked:
            //
            //      1) copy image data back to canvas
            //      2) draw object
            //      3) read _imageData back out
            this._context[side].putImageData(this._imageData[side], 0, 0); // at coords 0,0
            BitmapImageUtils_1.BitmapImageUtils._draw(this._context[side], source, matrix, colorTransform, blendMode, clipRect, smoothing);
            this._imageData[side] = this._context[side].getImageData(0, 0, this._size, this._size);
        }
        else {
            BitmapImageUtils_1.BitmapImageUtils._draw(this._context[side], source, matrix, colorTransform, blendMode, clipRect, smoothing);
        }
        this.invalidate();
    };
    /**
     * Fills a rectangular area of pixels with a specified ARGB color.
     *
     * @param rect  The rectangular area to fill.
     * @param color The ARGB color value that fills the area. ARGB colors are
     *              often specified in hexadecimal format; for example,
     *              0xFF336699.
     * @throws TypeError The rect is null.
     */
    BitmapImageCube.prototype.fillRect = function (side, rect, color) {
        if (this._locked) {
            // If canvas is locked:
            //
            //      1) copy image data back to canvas
            //      2) apply fill
            //      3) read _imageData back out
            if (this._imageData[side])
                this._context[side].putImageData(this._imageData[side], 0, 0); // at coords 0,0
            BitmapImageUtils_1.BitmapImageUtils._fillRect(this._context[side], rect, color, this._transparent);
            if (this._imageData[side])
                this._imageData[side] = this._context[side].getImageData(0, 0, this._size, this._size);
        }
        else {
            BitmapImageUtils_1.BitmapImageUtils._fillRect(this._context[side], rect, color, this._transparent);
        }
        this.invalidate();
    };
    /**
     * Returns an integer that represents an RGB pixel value from a BitmapImage2D
     * object at a specific point(<i>x</i>, <i>y</i>). The
     * <code>getPixel()</code> method returns an unmultiplied pixel value. No
     * alpha information is returned.
     *
     * <p>All pixels in a BitmapImage2D object are stored as premultiplied color
     * values. A premultiplied image pixel has the red, green, and blue color
     * channel values already multiplied by the alpha data. For example, if the
     * alpha value is 0, the values for the RGB channels are also 0, independent
     * of their unmultiplied values. This loss of data can cause some problems
     * when you perform operations. All BitmapImage2D methods take and return
     * unmultiplied values. The internal pixel representation is converted from
     * premultiplied to unmultiplied before it is returned as a value. During a
     * set operation, the pixel value is premultiplied before the raw image pixel
     * is set.</p>
     *
     * @param x The <i>x</i> position of the pixel.
     * @param y The <i>y</i> position of the pixel.
     * @return A number that represents an RGB pixel value. If the(<i>x</i>,
     *         <i>y</i>) coordinates are outside the bounds of the image, the
     *         method returns 0.
     */
    BitmapImageCube.prototype.getPixel = function (side, x, y) {
        var r;
        var g;
        var b;
        var a;
        if (!this._locked) {
            var pixelData = this._context[side].getImageData(x, y, 1, 1);
            r = pixelData.data[0];
            g = pixelData.data[1];
            b = pixelData.data[2];
            a = pixelData.data[3];
        }
        else {
            var index = (x + y * this._size) * 4;
            r = this._imageData[side].data[index + 0];
            g = this._imageData[side].data[index + 1];
            b = this._imageData[side].data[index + 2];
            a = this._imageData[side].data[index + 3];
        }
        //returns black if fully transparent
        if (!a)
            return 0x0;
        return (r << 16) | (g << 8) | b;
    };
    /**
     * Returns an ARGB color value that contains alpha channel data and RGB data.
     * This method is similar to the <code>getPixel()</code> method, which
     * returns an RGB color without alpha channel data.
     *
     * <p>All pixels in a BitmapImage2D object are stored as premultiplied color
     * values. A premultiplied image pixel has the red, green, and blue color
     * channel values already multiplied by the alpha data. For example, if the
     * alpha value is 0, the values for the RGB channels are also 0, independent
     * of their unmultiplied values. This loss of data can cause some problems
     * when you perform operations. All BitmapImage2D methods take and return
     * unmultiplied values. The internal pixel representation is converted from
     * premultiplied to unmultiplied before it is returned as a value. During a
     * set operation, the pixel value is premultiplied before the raw image pixel
     * is set.</p>
     *
     * @param x The <i>x</i> position of the pixel.
     * @param y The <i>y</i> position of the pixel.
     * @return A number representing an ARGB pixel value. If the(<i>x</i>,
     *         <i>y</i>) coordinates are outside the bounds of the image, 0 is
     *         returned.
     */
    BitmapImageCube.prototype.getPixel32 = function (side, x, y) {
        var r;
        var g;
        var b;
        var a;
        if (!this._locked) {
            var pixelData = this._context[side].getImageData(x, y, 1, 1);
            r = pixelData.data[0];
            g = pixelData.data[1];
            b = pixelData.data[2];
            a = pixelData.data[3];
        }
        else {
            var index = (x + y * this._size) * 4;
            r = this._imageData[side].data[index + 0];
            g = this._imageData[side].data[index + 1];
            b = this._imageData[side].data[index + 2];
            a = this._imageData[side].data[index + 3];
        }
        return (a << 24) | (r << 16) | (g << 8) | b;
    };
    /**
     * Locks an image so that any objects that reference the BitmapImage2D object,
     * such as Bitmap objects, are not updated when this BitmapImage2D object
     * changes. To improve performance, use this method along with the
     * <code>unlock()</code> method before and after numerous calls to the
     * <code>setPixel()</code> or <code>setPixel32()</code> method.
     *
     */
    BitmapImageCube.prototype.lock = function () {
        if (this._locked)
            return;
        this._locked = true;
        for (var i = 0; i < 6; i++)
            this._imageData[i] = this._context[i].getImageData(0, 0, this._size, this._size);
    };
    /**
     * Converts an Array into a rectangular region of pixel data. For each pixel,
     * an Array element is read and written into the BitmapImage2D pixel. The data
     * in the Array is expected to be 32-bit ARGB pixel values.
     *
     * @param rect        Specifies the rectangular region of the BitmapImage2D
     *                    object.
     * @param inputArray  An Array that consists of 32-bit unmultiplied pixel
     *                    values to be used in the rectangular region.
     * @throws RangeError The vector array is not large enough to read all the
     *                    pixel data.
     */
    BitmapImageCube.prototype.setArray = function (side, rect, inputArray) {
        if (!this._locked)
            this._imageData[side] = this._context[side].getImageData(0, 0, this._size, this._size);
        var i, j, index, argb;
        for (i = 0; i < rect.width; ++i) {
            for (j = 0; j < rect.height; ++j) {
                argb = ColorUtils_1.ColorUtils.float32ColorToARGB(inputArray[i + j * rect.width]);
                index = (i + rect.x + (j + rect.y) * this._size) * 4;
                this._imageData[side].data[index + 0] = argb[1];
                this._imageData[side].data[index + 1] = argb[2];
                this._imageData[side].data[index + 2] = argb[3];
                this._imageData[side].data[index + 3] = argb[0];
            }
        }
        if (!this._locked) {
            this._context[side].putImageData(this._imageData[side], 0, 0);
            this._imageData[side] = null;
        }
        this.invalidate();
    };
    /**
     * Sets a single pixel of a BitmapImage2D object. The current alpha channel
     * value of the image pixel is preserved during this operation. The value of
     * the RGB color parameter is treated as an unmultiplied color value.
     *
     * <p><b>Note:</b> To increase performance, when you use the
     * <code>setPixel()</code> or <code>setPixel32()</code> method repeatedly,
     * call the <code>lock()</code> method before you call the
     * <code>setPixel()</code> or <code>setPixel32()</code> method, and then call
     * the <code>unlock()</code> method when you have made all pixel changes.
     * This process prevents objects that reference this BitmapImage2D instance from
     * updating until you finish making the pixel changes.</p>
     *
     * @param x     The <i>x</i> position of the pixel whose value changes.
     * @param y     The <i>y</i> position of the pixel whose value changes.
     * @param color The resulting RGB color for the pixel.
     */
    BitmapImageCube.prototype.setPixel = function (side, x, y, color) {
        var argb = ColorUtils_1.ColorUtils.float32ColorToARGB(color);
        if (!this._locked)
            this._imageData[side] = this._context[side].getImageData(0, 0, this._size, this._size);
        var index = (x + y * this._size) * 4;
        this._imageData[side].data[index + 0] = argb[1];
        this._imageData[side].data[index + 1] = argb[2];
        this._imageData[side].data[index + 2] = argb[3];
        this._imageData[side].data[index + 3] = 255;
        if (!this._locked) {
            this._context[side].putImageData(this._imageData[side], 0, 0);
            this._imageData = null;
        }
        this.invalidate();
    };
    /**
     * Sets the color and alpha transparency values of a single pixel of a
     * BitmapImage2D object. This method is similar to the <code>setPixel()</code>
     * method; the main difference is that the <code>setPixel32()</code> method
     * takes an ARGB color value that contains alpha channel information.
     *
     * <p>All pixels in a BitmapImage2D object are stored as premultiplied color
     * values. A premultiplied image pixel has the red, green, and blue color
     * channel values already multiplied by the alpha data. For example, if the
     * alpha value is 0, the values for the RGB channels are also 0, independent
     * of their unmultiplied values. This loss of data can cause some problems
     * when you perform operations. All BitmapImage2D methods take and return
     * unmultiplied values. The internal pixel representation is converted from
     * premultiplied to unmultiplied before it is returned as a value. During a
     * set operation, the pixel value is premultiplied before the raw image pixel
     * is set.</p>
     *
     * <p><b>Note:</b> To increase performance, when you use the
     * <code>setPixel()</code> or <code>setPixel32()</code> method repeatedly,
     * call the <code>lock()</code> method before you call the
     * <code>setPixel()</code> or <code>setPixel32()</code> method, and then call
     * the <code>unlock()</code> method when you have made all pixel changes.
     * This process prevents objects that reference this BitmapImage2D instance from
     * updating until you finish making the pixel changes.</p>
     *
     * @param x     The <i>x</i> position of the pixel whose value changes.
     * @param y     The <i>y</i> position of the pixel whose value changes.
     * @param color The resulting ARGB color for the pixel. If the bitmap is
     *              opaque(not transparent), the alpha transparency portion of
     *              this color value is ignored.
     */
    BitmapImageCube.prototype.setPixel32 = function (side, x, y, color) {
        var argb = ColorUtils_1.ColorUtils.float32ColorToARGB(color);
        if (!this._locked)
            this._imageData[side] = this._context[side].getImageData(0, 0, this._size, this._size);
        var index = (x + y * this._size) * 4;
        this._imageData[side].data[index + 0] = argb[1];
        this._imageData[side].data[index + 1] = argb[2];
        this._imageData[side].data[index + 2] = argb[3];
        this._imageData[side].data[index + 3] = argb[0];
        if (!this._locked) {
            this._context[side].putImageData(this._imageData[side], 0, 0);
            this._imageData[side] = null;
        }
        this.invalidate();
    };
    /**
     * Converts a byte array into a rectangular region of pixel data. For each
     * pixel, the <code>ByteArray.readUnsignedInt()</code> method is called and
     * the return value is written into the pixel. If the byte array ends before
     * the full rectangle is written, the function returns. The data in the byte
     * array is expected to be 32-bit ARGB pixel values. No seeking is performed
     * on the byte array before or after the pixels are read.
     *
     * @param rect           Specifies the rectangular region of the BitmapImage2D
     *                       object.
     * @param inputByteArray A ByteArray object that consists of 32-bit
     *                       unmultiplied pixel values to be used in the
     *                       rectangular region.
     * @throws EOFError  The <code>inputByteArray</code> object does not include
     *                   enough data to fill the area of the <code>rect</code>
     *                   rectangle. The method fills as many pixels as possible
     *                   before throwing the exception.
     * @throws TypeError The rect or inputByteArray are null.
     */
    BitmapImageCube.prototype.setPixels = function (side, rect, inputByteArray) {
        if (!this._locked)
            this._imageData[side] = this._context[side].getImageData(0, 0, this._size, this._size);
        inputByteArray.position = 0;
        var i, j, index;
        for (i = 0; i < rect.width; ++i) {
            for (j = 0; j < rect.height; ++j) {
                index = (i + rect.x + (j + rect.y) * this._size) * 4;
                this._imageData[side].data[index + 0] = inputByteArray.readUnsignedInt();
                this._imageData[side].data[index + 1] = inputByteArray.readUnsignedInt();
                this._imageData[side].data[index + 2] = inputByteArray.readUnsignedInt();
                this._imageData[side].data[index + 3] = inputByteArray.readUnsignedInt();
            }
        }
        if (!this._locked) {
            this._context[side].putImageData(this._imageData[side], 0, 0);
            this._imageData[side] = null;
        }
        this.invalidate();
    };
    /**
     * Unlocks an image so that any objects that reference the BitmapImage2D object,
     * such as Bitmap objects, are updated when this BitmapImage2D object changes.
     * To improve performance, use this method along with the <code>lock()</code>
     * method before and after numerous calls to the <code>setPixel()</code> or
     * <code>setPixel32()</code> method.
     *
     * @param changeRect The area of the BitmapImage2D object that has changed. If
     *                   you do not specify a value for this parameter, the
     *                   entire area of the BitmapImage2D object is considered
     *                   changed.
     */
    BitmapImageCube.prototype.unlock = function () {
        if (!this._locked)
            return;
        this._locked = false;
        for (var i = 0; i < 6; i++) {
            this._context[i].putImageData(this._imageData[i], 0, 0); // at coords 0,0
            this._imageData[i] = null;
        }
    };
    /**
     *
     * @returns {ImageData}
     */
    BitmapImageCube.prototype.getImageData = function (side) {
        if (!this._locked)
            return this._context[side].getImageData(0, 0, this._size, this._size);
        return this._imageData[side];
    };
    /**
     *
     * @returns {HTMLCanvasElement}
     */
    BitmapImageCube.prototype.getCanvas = function (side) {
        return this._imageCanvas[side];
    };
    /**
     *
     * @param width
     * @param height
     * @private
     */
    BitmapImageCube.prototype._setSize = function (size) {
        _super.prototype._setSize.call(this, size);
        for (var i = 0; i < 6; i++) {
            if (this._locked)
                this._context[i].putImageData(this._imageData[i], 0, 0);
            this._imageCanvas[i].width = size;
            this._imageCanvas[i].height = size;
            if (this._locked)
                this._imageData[i] = this._context[i].getImageData(0, 0, this._size, this._size);
        }
    };
    BitmapImageCube.assetType = "[image BitmapImageCube]";
    BitmapImageCube.posX = 0;
    BitmapImageCube.negX = 1;
    BitmapImageCube.posY = 2;
    BitmapImageCube.negY = 3;
    BitmapImageCube.posZ = 4;
    BitmapImageCube.negZ = 5;
    return BitmapImageCube;
}(ImageCube_1.ImageCube));
exports.BitmapImageCube = BitmapImageCube;
