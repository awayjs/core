var Rectangle = require("awayjs-core/lib/geom/Rectangle");
var ColorUtils = require("awayjs-core/lib/utils/ColorUtils");
/**
 * The BitmapData class lets you work with the data(pixels) of a Bitmap
 * object. You can use the methods of the BitmapData class to create
 * arbitrarily sized transparent or opaque bitmap images and manipulate them
 * in various ways at runtime. You can also access the BitmapData for a bitmap
 * image that you load with the <code>flash.Assets</code> or
 * <code>flash.display.Loader</code> classes.
 *
 * <p>This class lets you separate bitmap rendering operations from the
 * internal display updating routines of flash. By manipulating a
 * BitmapData object directly, you can create complex images without incurring
 * the per-frame overhead of constantly redrawing the content from vector
 * data.</p>
 *
 * <p>The methods of the BitmapData class support effects that are not
 * available through the filters available to non-bitmap display objects.</p>
 *
 * <p>A BitmapData object contains an array of pixel data. This data can
 * represent either a fully opaque bitmap or a transparent bitmap that
 * contains alpha channel data. Either type of BitmapData object is stored as
 * a buffer of 32-bit integers. Each 32-bit integer determines the properties
 * of a single pixel in the bitmap.</p>
 *
 * <p>Each 32-bit integer is a combination of four 8-bit channel values(from
 * 0 to 255) that describe the alpha transparency and the red, green, and blue
 * (ARGB) values of the pixel.(For ARGB values, the most significant byte
 * represents the alpha channel value, followed by red, green, and blue.)</p>
 *
 * <p>The four channels(alpha, red, green, and blue) are represented as
 * numbers when you use them with the <code>BitmapData.copyChannel()</code>
 * method or the <code>DisplacementMapFilter.componentX</code> and
 * <code>DisplacementMapFilter.componentY</code> properties, and these numbers
 * are represented by the following constants in the BitmapDataChannel
 * class:</p>
 *
 * <ul>
 *   <li><code>BitmapDataChannel.ALPHA</code></li>
 *   <li><code>BitmapDataChannel.RED</code></li>
 *   <li><code>BitmapDataChannel.GREEN</code></li>
 *   <li><code>BitmapDataChannel.BLUE</code></li>
 * </ul>
 *
 * <p>You can attach BitmapData objects to a Bitmap object by using the
 * <code>bitmapData</code> property of the Bitmap object.</p>
 *
 * <p>You can use a BitmapData object to fill a Graphics object by using the
 * <code>Graphics.beginBitmapFill()</code> method.</p>
 *
 * <p>You can also use a BitmapData object to perform batch tile rendering
 * using the <code>flash.display.Tilesheet</code> class.</p>
 *
 * <p>In Flash Player 10, the maximum size for a BitmapData object
 * is 8,191 pixels in width or height, and the total number of pixels cannot
 * exceed 16,777,215 pixels.(So, if a BitmapData object is 8,191 pixels wide,
 * it can only be 2,048 pixels high.) In Flash Player 9 and earlier, the limitation
 * is 2,880 pixels in height and 2,880 in width.</p>
 */
var BitmapData = (function () {
    /**
     * Creates a BitmapData object with a specified width and height. If you
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
    function BitmapData(width, height, transparent, fillColor) {
        if (transparent === void 0) { transparent = true; }
        if (fillColor === void 0) { fillColor = null; }
        this._locked = false;
        this._transparent = transparent;
        this._imageCanvas = document.createElement("canvas");
        this._imageCanvas.width = width;
        this._imageCanvas.height = height;
        this._context = this._imageCanvas.getContext("2d");
        this._rect = new Rectangle(0, 0, width, height);
        if (fillColor != null)
            this.fillRect(this._rect, fillColor);
    }
    Object.defineProperty(BitmapData.prototype, "height", {
        /**
         * The height of the bitmap image in pixels.
         */
        get: function () {
            return this._rect.height;
        },
        set: function (value) {
            if (this._rect.height == value)
                return;
            this._rect.height = value;
            if (this._locked)
                this._context.putImageData(this._imageData, 0, 0);
            this._imageCanvas.height = value;
            if (this._locked)
                this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapData.prototype, "rect", {
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
    Object.defineProperty(BitmapData.prototype, "transparent", {
        /**
         * Defines whether the bitmap image supports per-pixel transparency. You can
         * set this value only when you construct a BitmapData object by passing in
         * <code>true</code> for the <code>transparent</code> parameter of the
         * constructor. Then, after you create a BitmapData object, you can check
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
    Object.defineProperty(BitmapData.prototype, "width", {
        /**
         * The width of the bitmap image in pixels.
         */
        get: function () {
            return this._rect.width;
        },
        set: function (value) {
            if (this._rect.width == value)
                return;
            this._rect.width = value;
            if (this._locked)
                this._context.putImageData(this._imageData, 0, 0);
            this._imageCanvas.width = value;
            if (this._locked)
                this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a new BitmapData object that is a clone of the original instance
     * with an exact copy of the contained bitmap.
     *
     * @return A new BitmapData object that is identical to the original.
     */
    BitmapData.prototype.clone = function () {
        var t = new BitmapData(this.width, this.height, this.transparent);
        t.draw(this);
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
    BitmapData.prototype.colorTransform = function (rect, colorTransform) {
        if (!this._locked)
            this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
        var data = this._imageData.data;
        var i /*uint*/, j /*uint*/, index /*uint*/;
        for (i = 0; i < rect.width; ++i) {
            for (j = 0; j < rect.height; ++j) {
                index = (i + rect.x + (j + rect.y) * this.width) * 4;
                data[index] = data[index] * colorTransform.redMultiplier + colorTransform.redOffset;
                data[index + 1] = data[index + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset;
                data[index + 2] = data[index + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset;
                data[index + 3] = data[index + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset;
            }
        }
        if (!this._locked) {
            this._context.putImageData(this._imageData, 0, 0);
            this._imageData = null;
        }
    };
    /**
     * Transfers data from one channel of another BitmapData object or the
     * current BitmapData object into a channel of the current BitmapData object.
     * All of the data in the other channels in the destination BitmapData object
     * are preserved.
     *
     * <p>The source channel value and destination channel value can be one of
     * following values: </p>
     *
     * <ul>
     *   <li><code>BitmapDataChannel.RED</code></li>
     *   <li><code>BitmapDataChannel.GREEN</code></li>
     *   <li><code>BitmapDataChannel.BLUE</code></li>
     *   <li><code>BitmapDataChannel.ALPHA</code></li>
     * </ul>
     *
     * @param sourceBitmapData The input bitmap image to use. The source image
     *                         can be a different BitmapData object or it can
     *                         refer to the current BitmapData object.
     * @param sourceRect       The source Rectangle object. To copy only channel
     *                         data from a smaller area within the bitmap,
     *                         specify a source rectangle that is smaller than
     *                         the overall size of the BitmapData object.
     * @param destPoint        The destination Point object that represents the
     *                         upper-left corner of the rectangular area where
     *                         the new channel data is placed. To copy only
     *                         channel data from one area to a different area in
     *                         the destination image, specify a point other than
     *                        (0,0).
     * @param sourceChannel    The source channel. Use a value from the
     *                         BitmapDataChannel class
     *                        (<code>BitmapDataChannel.RED</code>,
     *                         <code>BitmapDataChannel.BLUE</code>,
     *                         <code>BitmapDataChannel.GREEN</code>,
     *                         <code>BitmapDataChannel.ALPHA</code>).
     * @param destChannel      The destination channel. Use a value from the
     *                         BitmapDataChannel class
     *                        (<code>BitmapDataChannel.RED</code>,
     *                         <code>BitmapDataChannel.BLUE</code>,
     *                         <code>BitmapDataChannel.GREEN</code>,
     *                         <code>BitmapDataChannel.ALPHA</code>).
     * @throws TypeError The sourceBitmapData, sourceRect or destPoint are null.
     */
    BitmapData.prototype.copyChannel = function (sourceBitmap, sourceRect, destPoint, sourceChannel, destChannel) {
        var imageData = sourceBitmap.imageData;
        if (!this._locked)
            this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
        var sourceData = sourceBitmap.imageData.data;
        var destData = this._imageData.data;
        var sourceOffset = Math.round(Math.log(sourceChannel) / Math.log(2));
        var destOffset = Math.round(Math.log(destChannel) / Math.log(2));
        var i /*uint*/, j /*uint*/, sourceIndex /*uint*/, destIndex /*uint*/;
        for (i = 0; i < sourceRect.width; ++i) {
            for (j = 0; j < sourceRect.height; ++j) {
                sourceIndex = (i + sourceRect.x + (j + sourceRect.y) * sourceBitmap.width) * 4;
                destIndex = (i + destPoint.x + (j + destPoint.y) * this.width) * 4;
                destData[destIndex + destOffset] = sourceData[sourceIndex + sourceOffset];
            }
        }
        if (!this._locked) {
            this._context.putImageData(this._imageData, 0, 0);
            this._imageData = null;
        }
    };
    BitmapData.prototype.copyPixels = function (bmpd, sourceRect, destRect) {
        if (this._locked) {
            // If canvas is locked:
            //
            //      1) copy image data back to canvas
            //      2) draw object
            //      3) read _imageData back out
            if (this._imageData)
                this._context.putImageData(this._imageData, 0, 0); // at coords 0,0
            this._copyPixels(bmpd, sourceRect, destRect);
            if (this._imageData)
                this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
        }
        else {
            this._copyPixels(bmpd, sourceRect, destRect);
        }
    };
    /**
     * Frees memory that is used to store the BitmapData object.
     *
     * <p>When the <code>dispose()</code> method is called on an image, the width
     * and height of the image are set to 0. All subsequent calls to methods or
     * properties of this BitmapData instance fail, and an exception is thrown.
     * </p>
     *
     * <p><code>BitmapData.dispose()</code> releases the memory occupied by the
     * actual bitmap data, immediately(a bitmap can consume up to 64 MB of
     * memory). After using <code>BitmapData.dispose()</code>, the BitmapData
     * object is no longer usable and an exception may be thrown if
     * you call functions on the BitmapData object. However,
     * <code>BitmapData.dispose()</code> does not garbage collect the BitmapData
     * object(approximately 128 bytes); the memory occupied by the actual
     * BitmapData object is released at the time the BitmapData object is
     * collected by the garbage collector.</p>
     *
     */
    BitmapData.prototype.dispose = function () {
        this._context = null;
        this._imageCanvas = null;
        this._imageData = null;
        this._rect = null;
        this._transparent = null;
        this._locked = null;
    };
    BitmapData.prototype.draw = function (source, matrix, colorTransform, blendMode, clipRect, smoothing) {
        if (this._locked) {
            // If canvas is locked:
            //
            //      1) copy image data back to canvas
            //      2) draw object
            //      3) read _imageData back out
            this._context.putImageData(this._imageData, 0, 0); // at coords 0,0
            this._draw(source, matrix, colorTransform, blendMode, clipRect, smoothing);
            this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
        }
        else {
            this._draw(source, matrix, colorTransform, blendMode, clipRect, smoothing);
        }
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
    BitmapData.prototype.fillRect = function (rect, color) {
        if (this._locked) {
            // If canvas is locked:
            //
            //      1) copy image data back to canvas
            //      2) apply fill
            //      3) read _imageData back out
            if (this._imageData)
                this._context.putImageData(this._imageData, 0, 0); // at coords 0,0
            this._fillRect(rect, color);
            if (this._imageData)
                this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
        }
        else {
            this._fillRect(rect, color);
        }
    };
    /**
     * Returns an integer that represents an RGB pixel value from a BitmapData
     * object at a specific point(<i>x</i>, <i>y</i>). The
     * <code>getPixel()</code> method returns an unmultiplied pixel value. No
     * alpha information is returned.
     *
     * <p>All pixels in a BitmapData object are stored as premultiplied color
     * values. A premultiplied image pixel has the red, green, and blue color
     * channel values already multiplied by the alpha data. For example, if the
     * alpha value is 0, the values for the RGB channels are also 0, independent
     * of their unmultiplied values. This loss of data can cause some problems
     * when you perform operations. All BitmapData methods take and return
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
    BitmapData.prototype.getPixel = function (x, y) {
        var r;
        var g;
        var b;
        var a;
        if (!this._locked) {
            var pixelData = this._context.getImageData(x, y, 1, 1);
            r = pixelData.data[0];
            g = pixelData.data[1];
            b = pixelData.data[2];
            a = pixelData.data[3];
        }
        else {
            var index = (x + y * this._imageCanvas.width) * 4;
            r = this._imageData.data[index + 0];
            g = this._imageData.data[index + 1];
            b = this._imageData.data[index + 2];
            a = this._imageData.data[index + 3];
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
     * <p>All pixels in a BitmapData object are stored as premultiplied color
     * values. A premultiplied image pixel has the red, green, and blue color
     * channel values already multiplied by the alpha data. For example, if the
     * alpha value is 0, the values for the RGB channels are also 0, independent
     * of their unmultiplied values. This loss of data can cause some problems
     * when you perform operations. All BitmapData methods take and return
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
    BitmapData.prototype.getPixel32 = function (x, y) {
        var r;
        var g;
        var b;
        var a;
        if (!this._locked) {
            var pixelData = this._context.getImageData(x, y, 1, 1);
            r = pixelData.data[0];
            g = pixelData.data[1];
            b = pixelData.data[2];
            a = pixelData.data[3];
        }
        else {
            var index = (x + y * this._imageCanvas.width) * 4;
            r = this._imageData.data[index + 0];
            g = this._imageData.data[index + 1];
            b = this._imageData.data[index + 2];
            a = this._imageData.data[index + 3];
        }
        return (a << 24) | (r << 16) | (g << 8) | b;
    };
    /**
     * Locks an image so that any objects that reference the BitmapData object,
     * such as Bitmap objects, are not updated when this BitmapData object
     * changes. To improve performance, use this method along with the
     * <code>unlock()</code> method before and after numerous calls to the
     * <code>setPixel()</code> or <code>setPixel32()</code> method.
     *
     */
    BitmapData.prototype.lock = function () {
        if (this._locked)
            return;
        this._locked = true;
        this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
    };
    /**
     * Converts an Array into a rectangular region of pixel data. For each pixel,
     * an Array element is read and written into the BitmapData pixel. The data
     * in the Array is expected to be 32-bit ARGB pixel values.
     *
     * @param rect        Specifies the rectangular region of the BitmapData
     *                    object.
     * @param inputArray  An Array that consists of 32-bit unmultiplied pixel
     *                    values to be used in the rectangular region.
     * @throws RangeError The vector array is not large enough to read all the
     *                    pixel data.
     */
    BitmapData.prototype.setArray = function (rect, inputArray) {
        if (!this._locked)
            this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
        var i /*uint*/, j /*uint*/, index /*uint*/, argb /*uint*/;
        for (i = 0; i < rect.width; ++i) {
            for (j = 0; j < rect.height; ++j) {
                argb = ColorUtils.float32ColorToARGB(inputArray[i + j * rect.width]);
                index = (i + rect.x + (j + rect.y) * this._imageCanvas.width) * 4;
                this._imageData.data[index + 0] = argb[1];
                this._imageData.data[index + 1] = argb[2];
                this._imageData.data[index + 2] = argb[3];
                this._imageData.data[index + 3] = argb[0];
            }
        }
        if (!this._locked) {
            this._context.putImageData(this._imageData, 0, 0);
            this._imageData = null;
        }
    };
    /**
     * Sets a single pixel of a BitmapData object. The current alpha channel
     * value of the image pixel is preserved during this operation. The value of
     * the RGB color parameter is treated as an unmultiplied color value.
     *
     * <p><b>Note:</b> To increase performance, when you use the
     * <code>setPixel()</code> or <code>setPixel32()</code> method repeatedly,
     * call the <code>lock()</code> method before you call the
     * <code>setPixel()</code> or <code>setPixel32()</code> method, and then call
     * the <code>unlock()</code> method when you have made all pixel changes.
     * This process prevents objects that reference this BitmapData instance from
     * updating until you finish making the pixel changes.</p>
     *
     * @param x     The <i>x</i> position of the pixel whose value changes.
     * @param y     The <i>y</i> position of the pixel whose value changes.
     * @param color The resulting RGB color for the pixel.
     */
    BitmapData.prototype.setPixel = function (x, y, color) {
        var argb = ColorUtils.float32ColorToARGB(color);
        if (!this._locked)
            this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
        var index = (x + y * this._imageCanvas.width) * 4;
        this._imageData.data[index + 0] = argb[1];
        this._imageData.data[index + 1] = argb[2];
        this._imageData.data[index + 2] = argb[3];
        this._imageData.data[index + 3] = 255;
        if (!this._locked) {
            this._context.putImageData(this._imageData, 0, 0);
            this._imageData = null;
        }
    };
    /**
     * Sets the color and alpha transparency values of a single pixel of a
     * BitmapData object. This method is similar to the <code>setPixel()</code>
     * method; the main difference is that the <code>setPixel32()</code> method
     * takes an ARGB color value that contains alpha channel information.
     *
     * <p>All pixels in a BitmapData object are stored as premultiplied color
     * values. A premultiplied image pixel has the red, green, and blue color
     * channel values already multiplied by the alpha data. For example, if the
     * alpha value is 0, the values for the RGB channels are also 0, independent
     * of their unmultiplied values. This loss of data can cause some problems
     * when you perform operations. All BitmapData methods take and return
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
     * This process prevents objects that reference this BitmapData instance from
     * updating until you finish making the pixel changes.</p>
     *
     * @param x     The <i>x</i> position of the pixel whose value changes.
     * @param y     The <i>y</i> position of the pixel whose value changes.
     * @param color The resulting ARGB color for the pixel. If the bitmap is
     *              opaque(not transparent), the alpha transparency portion of
     *              this color value is ignored.
     */
    BitmapData.prototype.setPixel32 = function (x, y, color) {
        var argb = ColorUtils.float32ColorToARGB(color);
        if (!this._locked)
            this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
        var index = (x + y * this._imageCanvas.width) * 4;
        this._imageData.data[index + 0] = argb[1];
        this._imageData.data[index + 1] = argb[2];
        this._imageData.data[index + 2] = argb[3];
        this._imageData.data[index + 3] = argb[0];
        if (!this._locked) {
            this._context.putImageData(this._imageData, 0, 0);
            this._imageData = null;
        }
    };
    /**
     * Converts a byte array into a rectangular region of pixel data. For each
     * pixel, the <code>ByteArray.readUnsignedInt()</code> method is called and
     * the return value is written into the pixel. If the byte array ends before
     * the full rectangle is written, the function returns. The data in the byte
     * array is expected to be 32-bit ARGB pixel values. No seeking is performed
     * on the byte array before or after the pixels are read.
     *
     * @param rect           Specifies the rectangular region of the BitmapData
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
    BitmapData.prototype.setPixels = function (rect, inputByteArray) {
        if (!this._locked)
            this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
        inputByteArray.position = 0;
        var i /*uint*/, j /*uint*/, index /*uint*/;
        for (i = 0; i < rect.width; ++i) {
            for (j = 0; j < rect.height; ++j) {
                index = (i + rect.x + (j + rect.y) * this._imageCanvas.width) * 4;
                this._imageData.data[index + 0] = inputByteArray.readUnsignedInt();
                this._imageData.data[index + 1] = inputByteArray.readUnsignedInt();
                this._imageData.data[index + 2] = inputByteArray.readUnsignedInt();
                this._imageData.data[index + 3] = inputByteArray.readUnsignedInt();
            }
        }
        if (!this._locked) {
            this._context.putImageData(this._imageData, 0, 0);
            this._imageData = null;
        }
    };
    /**
     * Unlocks an image so that any objects that reference the BitmapData object,
     * such as Bitmap objects, are updated when this BitmapData object changes.
     * To improve performance, use this method along with the <code>lock()</code>
     * method before and after numerous calls to the <code>setPixel()</code> or
     * <code>setPixel32()</code> method.
     *
     * @param changeRect The area of the BitmapData object that has changed. If
     *                   you do not specify a value for this parameter, the
     *                   entire area of the BitmapData object is considered
     *                   changed.
     */
    BitmapData.prototype.unlock = function () {
        if (!this._locked)
            return;
        this._locked = false;
        this._context.putImageData(this._imageData, 0, 0); // at coords 0,0
        this._imageData = null;
    };
    BitmapData.prototype._copyPixels = function (bmpd, sourceRect, destRect) {
        if (bmpd instanceof BitmapData) {
            this._context.drawImage(bmpd.canvas, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, destRect.x, destRect.y, destRect.width, destRect.height);
        }
        else if (bmpd instanceof HTMLImageElement) {
            this._context.drawImage(bmpd, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, destRect.x, destRect.y, destRect.width, destRect.height);
        }
    };
    BitmapData.prototype._draw = function (source, matrix, colorTransform, blendMode, clipRect, smoothing) {
        if (source instanceof BitmapData) {
            this._context.save();
            if (matrix != null)
                this._context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            if (clipRect != null)
                this._context.drawImage(source.canvas, clipRect.x, clipRect.y, clipRect.width, clipRect.height);
            else
                this._context.drawImage(source.canvas, 0, 0);
            this._context.restore();
        }
        else if (source instanceof HTMLElement) {
            this._context.save();
            if (matrix != null)
                this._context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            if (clipRect != null)
                this._context.drawImage(source, clipRect.x, clipRect.y, clipRect.width, clipRect.height);
            else
                this._context.drawImage(source, 0, 0);
            this._context.restore();
        }
    };
    BitmapData.prototype._fillRect = function (rect, color) {
        if (color == 0x0 && this._transparent) {
            this._context.clearRect(rect.x, rect.y, rect.width, rect.height);
        }
        else {
            var argb = ColorUtils.float32ColorToARGB(color);
            if (this._transparent)
                this._context.fillStyle = 'rgba(' + argb[1] + ',' + argb[2] + ',' + argb[3] + ',' + argb[0] / 255 + ')';
            else
                this._context.fillStyle = 'rgba(' + argb[1] + ',' + argb[2] + ',' + argb[3] + ',1)';
            this._context.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
    };
    Object.defineProperty(BitmapData.prototype, "imageData", {
        /**
         *
         * @returns {ImageData}
         */
        get: function () {
            if (!this._locked)
                return this._context.getImageData(0, 0, this._rect.width, this._rect.height);
            return this._imageData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapData.prototype, "canvas", {
        /**
         *
         * @returns {HTMLCanvasElement}
         */
        get: function () {
            return this._imageCanvas;
        },
        enumerable: true,
        configurable: true
    });
    return BitmapData;
})();
module.exports = BitmapData;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9iYXNlL0JpdG1hcERhdGEudHMiXSwibmFtZXMiOlsiQml0bWFwRGF0YSIsIkJpdG1hcERhdGEuY29uc3RydWN0b3IiLCJCaXRtYXBEYXRhLmhlaWdodCIsIkJpdG1hcERhdGEucmVjdCIsIkJpdG1hcERhdGEudHJhbnNwYXJlbnQiLCJCaXRtYXBEYXRhLndpZHRoIiwiQml0bWFwRGF0YS5jbG9uZSIsIkJpdG1hcERhdGEuY29sb3JUcmFuc2Zvcm0iLCJCaXRtYXBEYXRhLmNvcHlDaGFubmVsIiwiQml0bWFwRGF0YS5jb3B5UGl4ZWxzIiwiQml0bWFwRGF0YS5kaXNwb3NlIiwiQml0bWFwRGF0YS5kcmF3IiwiQml0bWFwRGF0YS5maWxsUmVjdCIsIkJpdG1hcERhdGEuZ2V0UGl4ZWwiLCJCaXRtYXBEYXRhLmdldFBpeGVsMzIiLCJCaXRtYXBEYXRhLmxvY2siLCJCaXRtYXBEYXRhLnNldEFycmF5IiwiQml0bWFwRGF0YS5zZXRQaXhlbCIsIkJpdG1hcERhdGEuc2V0UGl4ZWwzMiIsIkJpdG1hcERhdGEuc2V0UGl4ZWxzIiwiQml0bWFwRGF0YS51bmxvY2siLCJCaXRtYXBEYXRhLl9jb3B5UGl4ZWxzIiwiQml0bWFwRGF0YS5fZHJhdyIsIkJpdG1hcERhdGEuX2ZpbGxSZWN0IiwiQml0bWFwRGF0YS5pbWFnZURhdGEiLCJCaXRtYXBEYXRhLmNhbnZhcyJdLCJtYXBwaW5ncyI6IkFBR0EsSUFBTyxTQUFTLFdBQWMsZ0NBQWdDLENBQUMsQ0FBQztBQUdoRSxJQUFPLFVBQVUsV0FBYyxrQ0FBa0MsQ0FBQyxDQUFDO0FBRW5FLEFBeURBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQURHO0lBQ0csVUFBVTtJQXFGZkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCR0E7SUFDSEEsU0FqSEtBLFVBQVVBLENBaUhIQSxLQUFZQSxFQUFFQSxNQUFhQSxFQUFFQSxXQUEwQkEs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RUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDakJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBRXpGQSxJQUFJQSxJQUFJQSxHQUFpQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFFOUNBLElBQUlBLENBQUNBLENBQVFBLFFBQURBLEFBQVNBLEVBQUVBLENBQUNBLENBQVFBLFFBQURBLEFBQVNBLEVBQUVBLEtBQUtBLENBQVFBLFFBQURBLEFBQVNBLENBQUNBO1FBQ2hFQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNqQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQ2xDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtnQkFFakRBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUNBLGNBQWNBLENBQUNBLGFBQWFBLEdBQUdBLGNBQWNBLENBQUNBLFNBQVNBLENBQUNBO2dCQUNsRkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsY0FBY0EsQ0FBQ0EsZUFBZUEsR0FBR0EsY0FBY0EsQ0FBQ0EsV0FBV0EsQ0FBQ0E7Z0JBQzlGQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxjQUFjQSxDQUFDQSxjQUFjQSxHQUFHQSxjQUFjQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFDNUZBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLGNBQWNBLENBQUNBLGVBQWVBLEdBQUdBLGNBQWNBLENBQUNBLFdBQVdBLENBQUNBO1lBQy9GQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNuQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbERBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3hCQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUVEUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMENHQTtJQUNJQSxnQ0FBV0EsR0FBbEJBLFVBQW1CQSxZQUF1QkEsRUFBRUEsVUFBb0JBLEVBQUVBLFNBQWVBLEVBQUVBLGFBQW9CQSxFQUFFQSxXQUFrQkE7UUFFMUhRLElBQUlBLFNBQVNBLEdBQWFBLFlBQVlBLENBQUNBLFNBQVNBLENBQUNBO1FBRWpEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUNqQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFFekZBLElBQUlBLFVBQVVBLEdBQWlCQSxZQUFZQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUMzREEsSUFBSUEsUUFBUUEsR0FBaUJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBO1FBRWxEQSxJQUFJQSxZQUFZQSxHQUFVQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxhQUFhQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMxRUEsSUFBSUEsVUFBVUEsR0FBVUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFdEVBLElBQUlBLENBQUNBLENBQVFBLFFBQURBLEFBQVNBLEVBQUVBLENBQUNBLENBQVFBLFFBQURBLEFBQVNBLEVBQUVBLFdBQVdBLENBQVFBLFFBQURBLEFBQVNBLEVBQUVBLFNBQVNBLENBQVFBLFFBQURBLEFBQVNBLENBQUNBO1FBQ2pHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxVQUFVQSxDQUFDQSxLQUFLQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUN2Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsVUFBVUEsQ0FBQ0EsTUFBTUEsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEs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Q0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFakVBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RCQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN0QkEsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBRXZCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxJQUFJQSxLQUFLQSxHQUFVQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtZQUVyREEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDcENBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQ3BDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNwQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDckNBLENBQUNBO1FBRURBLEFBQ0FBLG9DQURvQ0E7UUFDcENBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ05BLE1BQU1BLENBQUNBLEdBQUdB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QUlBLENBQUNBLE9BQU9BLENBQUNBO1lBQ2pCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUV6RkEsSUFBSUEsQ0FBQ0EsQ0FBUUEsUUFBREEsQUFBU0EsRUFBRUEsQ0FBQ0EsQ0FBUUEsUUFBREEsQUFBU0EsRUFBRUEsS0FBS0EsQ0FBUUEsUUFBREEsQUFBU0EsRUFBRUEsSUFBSUEsQ0FBVUEsUUFBREEsQUFBU0EsQ0FBQ0E7UUFDeEZBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ2pDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDbENBLElBQUlBLEdBQUdBLFVBQVVBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25FQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtnQkFFOURBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDMUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzNDQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNuQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbERBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3hCQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUVEaEI7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkdBO0lBQ0lBLDZCQUFRQSxHQUFmQSxVQUFnQkEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsS0FBWUE7UUFFL0NpQixJQUFJQSxJQUFJQSxHQUFZQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBRXpEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUNqQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFFekZBLElBQUlBLEtBQUtBLEdBQVVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1FBRXJEQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMxQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDMUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtRQUV0Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbkJBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQ2xEQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUN4QkEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFRGpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4QkdBO0lBQ0lBLCtCQUFVQSxHQUFqQkEsVUFBa0JBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEtBQVlBO1FBRW5Da0IsSUFBSUEsSUFBSUEsR0FBWUEsVUFBVUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUV6REEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDakJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBRXpGQSxJQUFJQSxLQUFLQSxHQUFVQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtRQUVyREEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDMUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMxQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFMUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO1lBQ25CQSxJ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LENBQUNBLE1BQU1BLFlBQVlBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtZQUVyQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQ2xCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxFQUFFQSxFQUFFQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUUxRkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQ3BCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUMxRkEsSUFBSUE7Z0JBQ0hBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBRXZDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFT3RCLDhCQUFTQSxHQUFqQkEsVUFBa0JBLElBQWNBLEVBQUVBLEtBQVlBO1FBRTdDdUIsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsR0FBR0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdkNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQ2xFQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxJQUFJQSxJQUFJQSxHQUFZQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBRXpEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtnQkFDckJBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLEdBQUdBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ3ZHQSxJQUFJQTtnQkFDSEEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsR0FBR0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFckZBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQ2pFQSxDQUFDQTtJQUNGQSxDQUFDQTtJQU1EdkIsc0JBQVdBLGlDQUFTQTtRQUpwQkE7OztXQUdHQTthQUNIQTtZQUVDd0IsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7Z0JBQ2pCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUU5RUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFDeEJBLENBQUNBOzs7T0FBQXhCO0lBTURBLHNCQUFXQSw4QkFBTUE7UUFKakJBOzs7V0FHR0E7YUFDSEE7WUFFQ3lCLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BQUF6QjtJQUNGQSxpQkFBQ0E7QUFBREEsQ0F2MUJBLEFBdTFCQ0EsSUFBQTtBQUVELEFBQW9CLGlCQUFYLFVBQVUsQ0FBQyIsImZpbGUiOiJiYXNlL0JpdG1hcERhdGEuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJsZW5kTW9kZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Jhc2UvQmxlbmRNb2RlXCIpO1xyXG5pbXBvcnQgQ29sb3JUcmFuc2Zvcm1cdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Db2xvclRyYW5zZm9ybVwiKTtcclxuaW1wb3J0IE1hdHJpeFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXhcIik7XHJcbmltcG9ydCBSZWN0YW5nbGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1JlY3RhbmdsZVwiKTtcclxuaW1wb3J0IFBvaW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1BvaW50XCIpO1xyXG5pbXBvcnQgQnl0ZUFycmF5XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvQnl0ZUFycmF5XCIpO1xyXG5pbXBvcnQgQ29sb3JVdGlsc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL0NvbG9yVXRpbHNcIik7XHJcblxyXG4vKipcclxuICogVGhlIEJpdG1hcERhdGEgY2xhc3MgbGV0cyB5b3Ugd29yayB3aXRoIHRoZSBkYXRhKHBpeGVscykgb2YgYSBCaXRtYXBcclxuICogb2JqZWN0LiBZb3UgY2FuIHVzZSB0aGUgbWV0aG9kcyBvZiB0aGUgQml0bWFwRGF0YSBjbGFzcyB0byBjcmVhdGVcclxuICogYXJiaXRyYXJpbHkgc2l6ZWQgdHJhbnNwYXJlbnQgb3Igb3BhcXVlIGJpdG1hcCBpbWFnZXMgYW5kIG1hbmlwdWxhdGUgdGhlbVxyXG4gKiBpbiB2YXJpb3VzIHdheXMgYXQgcnVudGltZS4gWW91IGNhbiBhbHNvIGFjY2VzcyB0aGUgQml0bWFwRGF0YSBmb3IgYSBiaXRtYXBcclxuICogaW1hZ2UgdGhhdCB5b3UgbG9hZCB3aXRoIHRoZSA8Y29kZT5mbGFzaC5Bc3NldHM8L2NvZGU+IG9yXHJcbiAqIDxjb2RlPmZsYXNoLmRpc3BsYXkuTG9hZGVyPC9jb2RlPiBjbGFzc2VzLlxyXG4gKlxyXG4gKiA8cD5UaGlzIGNsYXNzIGxldHMgeW91IHNlcGFyYXRlIGJpdG1hcCByZW5kZXJpbmcgb3BlcmF0aW9ucyBmcm9tIHRoZVxyXG4gKiBpbnRlcm5hbCBkaXNwbGF5IHVwZGF0aW5nIHJvdXRpbmVzIG9mIGZsYXNoLiBCeSBtYW5pcHVsYXRpbmcgYVxyXG4gKiBCaXRtYXBEYXRhIG9iamVjdCBkaXJlY3RseSwgeW91IGNhbiBjcmVhdGUgY29tcGxleCBpbWFnZXMgd2l0aG91dCBpbmN1cnJpbmdcclxuICogdGhlIHBlci1mcmFtZSBvdmVyaGVhZCBvZiBjb25zdGFudGx5IHJlZHJhd2luZyB0aGUgY29udGVudCBmcm9tIHZlY3RvclxyXG4gKiBkYXRhLjwvcD5cclxuICpcclxuICogPHA+VGhlIG1ldGhvZHMgb2YgdGhlIEJpdG1hcERhdGEgY2xhc3Mgc3VwcG9ydCBlZmZlY3RzIHRoYXQgYXJlIG5vdFxyXG4gKiBhdmFpbGFibGUgdGhyb3VnaCB0aGUgZmlsdGVycyBhdmFpbGFibGUgdG8gbm9uLWJpdG1hcCBkaXNwbGF5IG9iamVjdHMuPC9wPlxyXG4gKlxyXG4gKiA8cD5BIEJpdG1hcERhdGEgb2JqZWN0IGNvbnRhaW5zIGFuIGFycmF5IG9mIHBpeGVsIGRhdGEuIFRoaXMgZGF0YSBjYW5cclxuICogcmVwcmVzZW50IGVpdGhlciBhIGZ1bGx5IG9wYXF1ZSBiaXRtYXAgb3IgYSB0cmFuc3BhcmVudCBiaXRtYXAgdGhhdFxyXG4gKiBjb250YWlucyBhbHBoYSBjaGFubmVsIGRhdGEuIEVpdGhlciB0eXBlIG9mIEJpdG1hcERhdGEgb2JqZWN0IGlzIHN0b3JlZCBhc1xyXG4gKiBhIGJ1ZmZlciBvZiAzMi1iaXQgaW50ZWdlcnMuIEVhY2ggMzItYml0IGludGVnZXIgZGV0ZXJtaW5lcyB0aGUgcHJvcGVydGllc1xyXG4gKiBvZiBhIHNpbmdsZSBwaXhlbCBpbiB0aGUgYml0bWFwLjwvcD5cclxuICpcclxuICogPHA+RWFjaCAzMi1iaXQgaW50ZWdlciBpcyBhIGNvbWJpbmF0aW9uIG9mIGZvdXIgOC1iaXQgY2hhbm5lbCB2YWx1ZXMoZnJvbVxyXG4gKiAwIHRvIDI1NSkgdGhhdCBkZXNjcmliZSB0aGUgYWxwaGEgdHJhbnNwYXJlbmN5IGFuZCB0aGUgcmVkLCBncmVlbiwgYW5kIGJsdWVcclxuICogKEFSR0IpIHZhbHVlcyBvZiB0aGUgcGl4ZWwuKEZvciBBUkdCIHZhbHVlcywgdGhlIG1vc3Qgc2lnbmlmaWNhbnQgYnl0ZVxyXG4gKiByZXByZXNlbnRzIHRoZSBhbHBoYSBjaGFubmVsIHZhbHVlLCBmb2xsb3dlZCBieSByZWQsIGdyZWVuLCBhbmQgYmx1ZS4pPC9wPlxyXG4gKlxyXG4gKiA8cD5UaGUgZm91ciBjaGFubmVscyhhbHBoYSwgcmVkLCBncmVlbiwgYW5kIGJsdWUpIGFyZSByZXByZXNlbnRlZCBhc1xyXG4gKiBudW1iZXJzIHdoZW4geW91IHVzZSB0aGVtIHdpdGggdGhlIDxjb2RlPkJpdG1hcERhdGEuY29weUNoYW5uZWwoKTwvY29kZT5cclxuICogbWV0aG9kIG9yIHRoZSA8Y29kZT5EaXNwbGFjZW1lbnRNYXBGaWx0ZXIuY29tcG9uZW50WDwvY29kZT4gYW5kXHJcbiAqIDxjb2RlPkRpc3BsYWNlbWVudE1hcEZpbHRlci5jb21wb25lbnRZPC9jb2RlPiBwcm9wZXJ0aWVzLCBhbmQgdGhlc2UgbnVtYmVyc1xyXG4gKiBhcmUgcmVwcmVzZW50ZWQgYnkgdGhlIGZvbGxvd2luZyBjb25zdGFudHMgaW4gdGhlIEJpdG1hcERhdGFDaGFubmVsXHJcbiAqIGNsYXNzOjwvcD5cclxuICpcclxuICogPHVsPlxyXG4gKiAgIDxsaT48Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5BTFBIQTwvY29kZT48L2xpPlxyXG4gKiAgIDxsaT48Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5SRUQ8L2NvZGU+PC9saT5cclxuICogICA8bGk+PGNvZGU+Qml0bWFwRGF0YUNoYW5uZWwuR1JFRU48L2NvZGU+PC9saT5cclxuICogICA8bGk+PGNvZGU+Qml0bWFwRGF0YUNoYW5uZWwuQkxVRTwvY29kZT48L2xpPlxyXG4gKiA8L3VsPlxyXG4gKlxyXG4gKiA8cD5Zb3UgY2FuIGF0dGFjaCBCaXRtYXBEYXRhIG9iamVjdHMgdG8gYSBCaXRtYXAgb2JqZWN0IGJ5IHVzaW5nIHRoZVxyXG4gKiA8Y29kZT5iaXRtYXBEYXRhPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgQml0bWFwIG9iamVjdC48L3A+XHJcbiAqXHJcbiAqIDxwPllvdSBjYW4gdXNlIGEgQml0bWFwRGF0YSBvYmplY3QgdG8gZmlsbCBhIEdyYXBoaWNzIG9iamVjdCBieSB1c2luZyB0aGVcclxuICogPGNvZGU+R3JhcGhpY3MuYmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+IG1ldGhvZC48L3A+XHJcbiAqXHJcbiAqIDxwPllvdSBjYW4gYWxzbyB1c2UgYSBCaXRtYXBEYXRhIG9iamVjdCB0byBwZXJmb3JtIGJhdGNoIHRpbGUgcmVuZGVyaW5nXHJcbiAqIHVzaW5nIHRoZSA8Y29kZT5mbGFzaC5kaXNwbGF5LlRpbGVzaGVldDwvY29kZT4gY2xhc3MuPC9wPlxyXG4gKlxyXG4gKiA8cD5JbiBGbGFzaCBQbGF5ZXIgMTAsIHRoZSBtYXhpbXVtIHNpemUgZm9yIGEgQml0bWFwRGF0YSBvYmplY3RcclxuICogaXMgOCwxOTEgcGl4ZWxzIGluIHdpZHRoIG9yIGhlaWdodCwgYW5kIHRoZSB0b3RhbCBudW1iZXIgb2YgcGl4ZWxzIGNhbm5vdFxyXG4gKiBleGNlZWQgMTYsNzc3LDIxNSBwaXhlbHMuKFNvLCBpZiBhIEJpdG1hcERhdGEgb2JqZWN0IGlzIDgsMTkxIHBpeGVscyB3aWRlLFxyXG4gKiBpdCBjYW4gb25seSBiZSAyLDA0OCBwaXhlbHMgaGlnaC4pIEluIEZsYXNoIFBsYXllciA5IGFuZCBlYXJsaWVyLCB0aGUgbGltaXRhdGlvblxyXG4gKiBpcyAyLDg4MCBwaXhlbHMgaW4gaGVpZ2h0IGFuZCAyLDg4MCBpbiB3aWR0aC48L3A+XHJcbiAqL1xyXG5jbGFzcyBCaXRtYXBEYXRhXHJcbntcclxuXHRwcml2YXRlIF9pbWFnZUNhbnZhczpIVE1MQ2FudmFzRWxlbWVudDtcclxuXHRwcml2YXRlIF9jb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuXHRwcml2YXRlIF9pbWFnZURhdGE6SW1hZ2VEYXRhO1xyXG5cdHByaXZhdGUgX3JlY3Q6UmVjdGFuZ2xlO1xyXG5cdHByaXZhdGUgX3RyYW5zcGFyZW50OmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfbG9ja2VkOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGhlaWdodCBvZiB0aGUgYml0bWFwIGltYWdlIGluIHBpeGVscy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGhlaWdodCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9yZWN0LmhlaWdodDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgaGVpZ2h0KHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcmVjdC5oZWlnaHQgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9yZWN0LmhlaWdodCA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh0aGlzLl9sb2NrZWQpXHJcblx0XHRcdHRoaXMuX2NvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuX2ltYWdlRGF0YSwgMCwgMCk7XHJcblxyXG5cdFx0dGhpcy5faW1hZ2VDYW52YXMuaGVpZ2h0ID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2xvY2tlZClcclxuXHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5fcmVjdC53aWR0aCwgdGhpcy5fcmVjdC5oZWlnaHQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIHNpemUgYW5kIGxvY2F0aW9uIG9mIHRoZSBiaXRtYXAgaW1hZ2UuIFRoZVxyXG5cdCAqIHRvcCBhbmQgbGVmdCBvZiB0aGUgcmVjdGFuZ2xlIGFyZSAwOyB0aGUgd2lkdGggYW5kIGhlaWdodCBhcmUgZXF1YWwgdG8gdGhlXHJcblx0ICogd2lkdGggYW5kIGhlaWdodCBpbiBwaXhlbHMgb2YgdGhlIEJpdG1hcERhdGEgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcmVjdCgpOlJlY3RhbmdsZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9yZWN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVmaW5lcyB3aGV0aGVyIHRoZSBiaXRtYXAgaW1hZ2Ugc3VwcG9ydHMgcGVyLXBpeGVsIHRyYW5zcGFyZW5jeS4gWW91IGNhblxyXG5cdCAqIHNldCB0aGlzIHZhbHVlIG9ubHkgd2hlbiB5b3UgY29uc3RydWN0IGEgQml0bWFwRGF0YSBvYmplY3QgYnkgcGFzc2luZyBpblxyXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+IGZvciB0aGUgPGNvZGU+dHJhbnNwYXJlbnQ8L2NvZGU+IHBhcmFtZXRlciBvZiB0aGVcclxuXHQgKiBjb25zdHJ1Y3Rvci4gVGhlbiwgYWZ0ZXIgeW91IGNyZWF0ZSBhIEJpdG1hcERhdGEgb2JqZWN0LCB5b3UgY2FuIGNoZWNrXHJcblx0ICogd2hldGhlciBpdCBzdXBwb3J0cyBwZXItcGl4ZWwgdHJhbnNwYXJlbmN5IGJ5IGRldGVybWluaW5nIGlmIHRoZSB2YWx1ZSBvZlxyXG5cdCAqIHRoZSA8Y29kZT50cmFuc3BhcmVudDwvY29kZT4gcHJvcGVydHkgaXMgPGNvZGU+dHJ1ZTwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIGdldCB0cmFuc3BhcmVudCgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdHJhbnNwYXJlbnQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHRyYW5zcGFyZW50KHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0dGhpcy5fdHJhbnNwYXJlbnQgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB3aWR0aCBvZiB0aGUgYml0bWFwIGltYWdlIGluIHBpeGVscy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JlY3Qud2lkdGg7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHdpZHRoKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcmVjdC53aWR0aCA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3JlY3Qud2lkdGggPSB2YWx1ZTtcclxuXHJcblx0XHRpZiAodGhpcy5fbG9ja2VkKVxyXG5cdFx0XHR0aGlzLl9jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLl9pbWFnZURhdGEsIDAsIDApO1xyXG5cclxuXHRcdHRoaXMuX2ltYWdlQ2FudmFzLndpZHRoID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2xvY2tlZClcclxuXHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5fcmVjdC53aWR0aCwgdGhpcy5fcmVjdC5oZWlnaHQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIEJpdG1hcERhdGEgb2JqZWN0IHdpdGggYSBzcGVjaWZpZWQgd2lkdGggYW5kIGhlaWdodC4gSWYgeW91XHJcblx0ICogc3BlY2lmeSBhIHZhbHVlIGZvciB0aGUgPGNvZGU+ZmlsbENvbG9yPC9jb2RlPiBwYXJhbWV0ZXIsIGV2ZXJ5IHBpeGVsIGluXHJcblx0ICogdGhlIGJpdG1hcCBpcyBzZXQgdG8gdGhhdCBjb2xvci5cclxuXHQgKlxyXG5cdCAqIDxwPkJ5IGRlZmF1bHQsIHRoZSBiaXRtYXAgaXMgY3JlYXRlZCBhcyB0cmFuc3BhcmVudCwgdW5sZXNzIHlvdSBwYXNzXHJcblx0ICogdGhlIHZhbHVlIDxjb2RlPmZhbHNlPC9jb2RlPiBmb3IgdGhlIHRyYW5zcGFyZW50IHBhcmFtZXRlci4gQWZ0ZXIgeW91XHJcblx0ICogY3JlYXRlIGFuIG9wYXF1ZSBiaXRtYXAsIHlvdSBjYW5ub3QgY2hhbmdlIGl0IHRvIGEgdHJhbnNwYXJlbnQgYml0bWFwLlxyXG5cdCAqIEV2ZXJ5IHBpeGVsIGluIGFuIG9wYXF1ZSBiaXRtYXAgdXNlcyBvbmx5IDI0IGJpdHMgb2YgY29sb3IgY2hhbm5lbFxyXG5cdCAqIGluZm9ybWF0aW9uLiBJZiB5b3UgZGVmaW5lIHRoZSBiaXRtYXAgYXMgdHJhbnNwYXJlbnQsIGV2ZXJ5IHBpeGVsIHVzZXMgMzJcclxuXHQgKiBiaXRzIG9mIGNvbG9yIGNoYW5uZWwgaW5mb3JtYXRpb24sIGluY2x1ZGluZyBhbiBhbHBoYSB0cmFuc3BhcmVuY3lcclxuXHQgKiBjaGFubmVsLjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB3aWR0aCAgICAgICBUaGUgd2lkdGggb2YgdGhlIGJpdG1hcCBpbWFnZSBpbiBwaXhlbHMuXHJcblx0ICogQHBhcmFtIGhlaWdodCAgICAgIFRoZSBoZWlnaHQgb2YgdGhlIGJpdG1hcCBpbWFnZSBpbiBwaXhlbHMuXHJcblx0ICogQHBhcmFtIHRyYW5zcGFyZW50IFNwZWNpZmllcyB3aGV0aGVyIHRoZSBiaXRtYXAgaW1hZ2Ugc3VwcG9ydHMgcGVyLXBpeGVsXHJcblx0ICogICAgICAgICAgICAgICAgICAgIHRyYW5zcGFyZW5jeS4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgPGNvZGU+dHJ1ZTwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgKHRyYW5zcGFyZW50KS4gVG8gY3JlYXRlIGEgZnVsbHkgdHJhbnNwYXJlbnQgYml0bWFwLFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICBzZXQgdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT50cmFuc3BhcmVudDwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyIHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuZCB0aGUgdmFsdWUgb2YgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgIDxjb2RlPmZpbGxDb2xvcjwvY29kZT4gcGFyYW1ldGVyIHRvIDB4MDAwMDAwMDAob3IgdG9cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgMCkuIFNldHRpbmcgdGhlIDxjb2RlPnRyYW5zcGFyZW50PC9jb2RlPiBwcm9wZXJ0eSB0b1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICA8Y29kZT5mYWxzZTwvY29kZT4gY2FuIHJlc3VsdCBpbiBtaW5vciBpbXByb3ZlbWVudHNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgaW4gcmVuZGVyaW5nIHBlcmZvcm1hbmNlLlxyXG5cdCAqIEBwYXJhbSBmaWxsQ29sb3IgICBBIDMyLWJpdCBBUkdCIGNvbG9yIHZhbHVlIHRoYXQgeW91IHVzZSB0byBmaWxsIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICBiaXRtYXAgaW1hZ2UgYXJlYS4gVGhlIGRlZmF1bHQgdmFsdWUgaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgMHhGRkZGRkZGRihzb2xpZCB3aGl0ZSkuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Iod2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyLCB0cmFuc3BhcmVudDpib29sZWFuID0gdHJ1ZSwgZmlsbENvbG9yOm51bWJlciA9IG51bGwpXHJcblx0e1xyXG5cdFx0dGhpcy5fdHJhbnNwYXJlbnQgPSB0cmFuc3BhcmVudDtcclxuXHRcdHRoaXMuX2ltYWdlQ2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG5cdFx0dGhpcy5faW1hZ2VDYW52YXMud2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuX2ltYWdlQ2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuXHRcdHRoaXMuX2NvbnRleHQgPSB0aGlzLl9pbWFnZUNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblx0XHR0aGlzLl9yZWN0ID0gbmV3IFJlY3RhbmdsZSgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHRpZiAoZmlsbENvbG9yICE9IG51bGwpXHJcblx0XHRcdHRoaXMuZmlsbFJlY3QodGhpcy5fcmVjdCwgZmlsbENvbG9yKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSBuZXcgQml0bWFwRGF0YSBvYmplY3QgdGhhdCBpcyBhIGNsb25lIG9mIHRoZSBvcmlnaW5hbCBpbnN0YW5jZVxyXG5cdCAqIHdpdGggYW4gZXhhY3QgY29weSBvZiB0aGUgY29udGFpbmVkIGJpdG1hcC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gQSBuZXcgQml0bWFwRGF0YSBvYmplY3QgdGhhdCBpcyBpZGVudGljYWwgdG8gdGhlIG9yaWdpbmFsLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9uZSgpOkJpdG1hcERhdGFcclxuXHR7XHJcblx0XHR2YXIgdDpCaXRtYXBEYXRhID0gbmV3IEJpdG1hcERhdGEodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMudHJhbnNwYXJlbnQpO1xyXG5cdFx0dC5kcmF3KHRoaXMpO1xyXG5cdFx0cmV0dXJuIHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGp1c3RzIHRoZSBjb2xvciB2YWx1ZXMgaW4gYSBzcGVjaWZpZWQgYXJlYSBvZiBhIGJpdG1hcCBpbWFnZSBieSB1c2luZyBhXHJcblx0ICogPGNvZGU+Q29sb3JUcmFuc2Zvcm08L2NvZGU+IG9iamVjdC4gSWYgdGhlIHJlY3RhbmdsZSBtYXRjaGVzIHRoZVxyXG5cdCAqIGJvdW5kYXJpZXMgb2YgdGhlIGJpdG1hcCBpbWFnZSwgdGhpcyBtZXRob2QgdHJhbnNmb3JtcyB0aGUgY29sb3IgdmFsdWVzIG9mXHJcblx0ICogdGhlIGVudGlyZSBpbWFnZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSByZWN0ICAgICAgICAgICBBIFJlY3RhbmdsZSBvYmplY3QgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBpbWFnZSBpbiB3aGljaCB0aGUgQ29sb3JUcmFuc2Zvcm0gb2JqZWN0IGlzIGFwcGxpZWQuXHJcblx0ICogQHBhcmFtIGNvbG9yVHJhbnNmb3JtIEEgQ29sb3JUcmFuc2Zvcm0gb2JqZWN0IHRoYXQgZGVzY3JpYmVzIHRoZSBjb2xvclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1hdGlvbiB2YWx1ZXMgdG8gYXBwbHkuXHJcblx0ICovXHJcblx0cHVibGljIGNvbG9yVHJhbnNmb3JtKHJlY3Q6UmVjdGFuZ2xlLCBjb2xvclRyYW5zZm9ybTpDb2xvclRyYW5zZm9ybSlcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX2xvY2tlZClcclxuXHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5fcmVjdC53aWR0aCwgdGhpcy5fcmVjdC5oZWlnaHQpO1xyXG5cclxuXHRcdHZhciBkYXRhOkFycmF5PG51bWJlcj4gPSB0aGlzLl9pbWFnZURhdGEuZGF0YTtcclxuXHJcblx0XHR2YXIgaTpudW1iZXIgLyp1aW50Ki8sIGo6bnVtYmVyIC8qdWludCovLCBpbmRleDpudW1iZXIgLyp1aW50Ki87XHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgcmVjdC53aWR0aDsgKytpKSB7XHJcblx0XHRcdGZvciAoaiA9IDA7IGogPCByZWN0LmhlaWdodDsgKytqKSB7XHJcblx0XHRcdFx0aW5kZXggPSAoaSArIHJlY3QueCArIChqICsgcmVjdC55KSp0aGlzLndpZHRoKSo0O1xyXG5cclxuXHRcdFx0XHRkYXRhW2luZGV4XSA9IGRhdGFbaW5kZXhdKmNvbG9yVHJhbnNmb3JtLnJlZE11bHRpcGxpZXIgKyBjb2xvclRyYW5zZm9ybS5yZWRPZmZzZXQ7XHJcblx0XHRcdFx0ZGF0YVtpbmRleCArIDFdID0gZGF0YVtpbmRleCArIDFdKmNvbG9yVHJhbnNmb3JtLmdyZWVuTXVsdGlwbGllciArIGNvbG9yVHJhbnNmb3JtLmdyZWVuT2Zmc2V0O1xyXG5cdFx0XHRcdGRhdGFbaW5kZXggKyAyXSA9IGRhdGFbaW5kZXggKyAyXSpjb2xvclRyYW5zZm9ybS5ibHVlTXVsdGlwbGllciArIGNvbG9yVHJhbnNmb3JtLmJsdWVPZmZzZXQ7XHJcblx0XHRcdFx0ZGF0YVtpbmRleCArIDNdID0gZGF0YVtpbmRleCArIDNdKmNvbG9yVHJhbnNmb3JtLmFscGhhTXVsdGlwbGllciArIGNvbG9yVHJhbnNmb3JtLmFscGhhT2Zmc2V0O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpIHtcclxuXHRcdFx0dGhpcy5fY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5faW1hZ2VEYXRhLCAwLCAwKTtcclxuXHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRyYW5zZmVycyBkYXRhIGZyb20gb25lIGNoYW5uZWwgb2YgYW5vdGhlciBCaXRtYXBEYXRhIG9iamVjdCBvciB0aGVcclxuXHQgKiBjdXJyZW50IEJpdG1hcERhdGEgb2JqZWN0IGludG8gYSBjaGFubmVsIG9mIHRoZSBjdXJyZW50IEJpdG1hcERhdGEgb2JqZWN0LlxyXG5cdCAqIEFsbCBvZiB0aGUgZGF0YSBpbiB0aGUgb3RoZXIgY2hhbm5lbHMgaW4gdGhlIGRlc3RpbmF0aW9uIEJpdG1hcERhdGEgb2JqZWN0XHJcblx0ICogYXJlIHByZXNlcnZlZC5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBzb3VyY2UgY2hhbm5lbCB2YWx1ZSBhbmQgZGVzdGluYXRpb24gY2hhbm5lbCB2YWx1ZSBjYW4gYmUgb25lIG9mXHJcblx0ICogZm9sbG93aW5nIHZhbHVlczogPC9wPlxyXG5cdCAqXHJcblx0ICogPHVsPlxyXG5cdCAqICAgPGxpPjxjb2RlPkJpdG1hcERhdGFDaGFubmVsLlJFRDwvY29kZT48L2xpPlxyXG5cdCAqICAgPGxpPjxjb2RlPkJpdG1hcERhdGFDaGFubmVsLkdSRUVOPC9jb2RlPjwvbGk+XHJcblx0ICogICA8bGk+PGNvZGU+Qml0bWFwRGF0YUNoYW5uZWwuQkxVRTwvY29kZT48L2xpPlxyXG5cdCAqICAgPGxpPjxjb2RlPkJpdG1hcERhdGFDaGFubmVsLkFMUEhBPC9jb2RlPjwvbGk+XHJcblx0ICogPC91bD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzb3VyY2VCaXRtYXBEYXRhIFRoZSBpbnB1dCBiaXRtYXAgaW1hZ2UgdG8gdXNlLiBUaGUgc291cmNlIGltYWdlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgY2FuIGJlIGEgZGlmZmVyZW50IEJpdG1hcERhdGEgb2JqZWN0IG9yIGl0IGNhblxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVyIHRvIHRoZSBjdXJyZW50IEJpdG1hcERhdGEgb2JqZWN0LlxyXG5cdCAqIEBwYXJhbSBzb3VyY2VSZWN0ICAgICAgIFRoZSBzb3VyY2UgUmVjdGFuZ2xlIG9iamVjdC4gVG8gY29weSBvbmx5IGNoYW5uZWxcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhIGZyb20gYSBzbWFsbGVyIGFyZWEgd2l0aGluIHRoZSBiaXRtYXAsXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lmeSBhIHNvdXJjZSByZWN0YW5nbGUgdGhhdCBpcyBzbWFsbGVyIHRoYW5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgb3ZlcmFsbCBzaXplIG9mIHRoZSBCaXRtYXBEYXRhIG9iamVjdC5cclxuXHQgKiBAcGFyYW0gZGVzdFBvaW50ICAgICAgICBUaGUgZGVzdGluYXRpb24gUG9pbnQgb2JqZWN0IHRoYXQgcmVwcmVzZW50cyB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICB1cHBlci1sZWZ0IGNvcm5lciBvZiB0aGUgcmVjdGFuZ3VsYXIgYXJlYSB3aGVyZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBuZXcgY2hhbm5lbCBkYXRhIGlzIHBsYWNlZC4gVG8gY29weSBvbmx5XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbCBkYXRhIGZyb20gb25lIGFyZWEgdG8gYSBkaWZmZXJlbnQgYXJlYSBpblxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBkZXN0aW5hdGlvbiBpbWFnZSwgc3BlY2lmeSBhIHBvaW50IG90aGVyIHRoYW5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICgwLDApLlxyXG5cdCAqIEBwYXJhbSBzb3VyY2VDaGFubmVsICAgIFRoZSBzb3VyY2UgY2hhbm5lbC4gVXNlIGEgdmFsdWUgZnJvbSB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICBCaXRtYXBEYXRhQ2hhbm5lbCBjbGFzc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgKDxjb2RlPkJpdG1hcERhdGFDaGFubmVsLlJFRDwvY29kZT4sXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Qml0bWFwRGF0YUNoYW5uZWwuQkxVRTwvY29kZT4sXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Qml0bWFwRGF0YUNoYW5uZWwuR1JFRU48L2NvZGU+LFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkJpdG1hcERhdGFDaGFubmVsLkFMUEhBPC9jb2RlPikuXHJcblx0ICogQHBhcmFtIGRlc3RDaGFubmVsICAgICAgVGhlIGRlc3RpbmF0aW9uIGNoYW5uZWwuIFVzZSBhIHZhbHVlIGZyb20gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgQml0bWFwRGF0YUNoYW5uZWwgY2xhc3NcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICg8Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5SRUQ8L2NvZGU+LFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkJpdG1hcERhdGFDaGFubmVsLkJMVUU8L2NvZGU+LFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkJpdG1hcERhdGFDaGFubmVsLkdSRUVOPC9jb2RlPixcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5BTFBIQTwvY29kZT4pLlxyXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yIFRoZSBzb3VyY2VCaXRtYXBEYXRhLCBzb3VyY2VSZWN0IG9yIGRlc3RQb2ludCBhcmUgbnVsbC5cclxuXHQgKi9cclxuXHRwdWJsaWMgY29weUNoYW5uZWwoc291cmNlQml0bWFwOkJpdG1hcERhdGEsIHNvdXJjZVJlY3Q6UmVjdGFuZ2xlLCBkZXN0UG9pbnQ6UG9pbnQsIHNvdXJjZUNoYW5uZWw6bnVtYmVyLCBkZXN0Q2hhbm5lbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFyIGltYWdlRGF0YTpJbWFnZURhdGEgPSBzb3VyY2VCaXRtYXAuaW1hZ2VEYXRhO1xyXG5cclxuXHRcdGlmICghdGhpcy5fbG9ja2VkKVxyXG5cdFx0XHR0aGlzLl9pbWFnZURhdGEgPSB0aGlzLl9jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLl9yZWN0LndpZHRoLCB0aGlzLl9yZWN0LmhlaWdodCk7XHJcblxyXG5cdFx0dmFyIHNvdXJjZURhdGE6QXJyYXk8bnVtYmVyPiA9IHNvdXJjZUJpdG1hcC5pbWFnZURhdGEuZGF0YTtcclxuXHRcdHZhciBkZXN0RGF0YTpBcnJheTxudW1iZXI+ID0gdGhpcy5faW1hZ2VEYXRhLmRhdGE7XHJcblxyXG5cdFx0dmFyIHNvdXJjZU9mZnNldDpudW1iZXIgPSBNYXRoLnJvdW5kKE1hdGgubG9nKHNvdXJjZUNoYW5uZWwpL01hdGgubG9nKDIpKTtcclxuXHRcdHZhciBkZXN0T2Zmc2V0Om51bWJlciA9IE1hdGgucm91bmQoTWF0aC5sb2coZGVzdENoYW5uZWwpL01hdGgubG9nKDIpKTtcclxuXHJcblx0XHR2YXIgaTpudW1iZXIgLyp1aW50Ki8sIGo6bnVtYmVyIC8qdWludCovLCBzb3VyY2VJbmRleDpudW1iZXIgLyp1aW50Ki8sIGRlc3RJbmRleDpudW1iZXIgLyp1aW50Ki87XHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgc291cmNlUmVjdC53aWR0aDsgKytpKSB7XHJcblx0XHRcdGZvciAoaiA9IDA7IGogPCBzb3VyY2VSZWN0LmhlaWdodDsgKytqKSB7XHJcblx0XHRcdFx0c291cmNlSW5kZXggPSAoaSArIHNvdXJjZVJlY3QueCArIChqICsgc291cmNlUmVjdC55KSpzb3VyY2VCaXRtYXAud2lkdGgpKjQ7XHJcblx0XHRcdFx0ZGVzdEluZGV4ID0gKGkgKyBkZXN0UG9pbnQueCArIChqICsgZGVzdFBvaW50LnkpKnRoaXMud2lkdGgpKjQ7XHJcblxyXG5cdFx0XHRcdGRlc3REYXRhW2Rlc3RJbmRleCArIGRlc3RPZmZzZXRdID0gc291cmNlRGF0YVtzb3VyY2VJbmRleCArIHNvdXJjZU9mZnNldF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMuX2xvY2tlZCkge1xyXG5cdFx0XHR0aGlzLl9jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLl9pbWFnZURhdGEsIDAsIDApO1xyXG5cdFx0XHR0aGlzLl9pbWFnZURhdGEgPSBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUHJvdmlkZXMgYSBmYXN0IHJvdXRpbmUgdG8gcGVyZm9ybSBwaXhlbCBtYW5pcHVsYXRpb24gYmV0d2VlbiBpbWFnZXMgd2l0aFxyXG5cdCAqIG5vIHN0cmV0Y2hpbmcsIHJvdGF0aW9uLCBvciBjb2xvciBlZmZlY3RzLiBUaGlzIG1ldGhvZCBjb3BpZXMgYVxyXG5cdCAqIHJlY3Rhbmd1bGFyIGFyZWEgb2YgYSBzb3VyY2UgaW1hZ2UgdG8gYSByZWN0YW5ndWxhciBhcmVhIG9mIHRoZSBzYW1lIHNpemVcclxuXHQgKiBhdCB0aGUgZGVzdGluYXRpb24gcG9pbnQgb2YgdGhlIGRlc3RpbmF0aW9uIEJpdG1hcERhdGEgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogPHA+SWYgeW91IGluY2x1ZGUgdGhlIDxjb2RlPmFscGhhQml0bWFwPC9jb2RlPiBhbmQgPGNvZGU+YWxwaGFQb2ludDwvY29kZT5cclxuXHQgKiBwYXJhbWV0ZXJzLCB5b3UgY2FuIHVzZSBhIHNlY29uZGFyeSBpbWFnZSBhcyBhbiBhbHBoYSBzb3VyY2UgZm9yIHRoZVxyXG5cdCAqIHNvdXJjZSBpbWFnZS4gSWYgdGhlIHNvdXJjZSBpbWFnZSBoYXMgYWxwaGEgZGF0YSwgYm90aCBzZXRzIG9mIGFscGhhIGRhdGFcclxuXHQgKiBhcmUgdXNlZCB0byBjb21wb3NpdGUgcGl4ZWxzIGZyb20gdGhlIHNvdXJjZSBpbWFnZSB0byB0aGUgZGVzdGluYXRpb25cclxuXHQgKiBpbWFnZS4gVGhlIDxjb2RlPmFscGhhUG9pbnQ8L2NvZGU+IHBhcmFtZXRlciBpcyB0aGUgcG9pbnQgaW4gdGhlIGFscGhhXHJcblx0ICogaW1hZ2UgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgdXBwZXItbGVmdCBjb3JuZXIgb2YgdGhlIHNvdXJjZSByZWN0YW5nbGUuXHJcblx0ICogQW55IHBpeGVscyBvdXRzaWRlIHRoZSBpbnRlcnNlY3Rpb24gb2YgdGhlIHNvdXJjZSBpbWFnZSBhbmQgYWxwaGEgaW1hZ2VcclxuXHQgKiBhcmUgbm90IGNvcGllZCB0byB0aGUgZGVzdGluYXRpb24gaW1hZ2UuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIDxjb2RlPm1lcmdlQWxwaGE8L2NvZGU+IHByb3BlcnR5IGNvbnRyb2xzIHdoZXRoZXIgb3Igbm90IHRoZSBhbHBoYVxyXG5cdCAqIGNoYW5uZWwgaXMgdXNlZCB3aGVuIGEgdHJhbnNwYXJlbnQgaW1hZ2UgaXMgY29waWVkIG9udG8gYW5vdGhlclxyXG5cdCAqIHRyYW5zcGFyZW50IGltYWdlLiBUbyBjb3B5IHBpeGVscyB3aXRoIHRoZSBhbHBoYSBjaGFubmVsIGRhdGEsIHNldCB0aGVcclxuXHQgKiA8Y29kZT5tZXJnZUFscGhhPC9jb2RlPiBwcm9wZXJ0eSB0byA8Y29kZT50cnVlPC9jb2RlPi4gQnkgZGVmYXVsdCwgdGhlXHJcblx0ICogPGNvZGU+bWVyZ2VBbHBoYTwvY29kZT4gcHJvcGVydHkgaXMgPGNvZGU+ZmFsc2U8L2NvZGU+LjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzb3VyY2VCaXRtYXBEYXRhIFRoZSBpbnB1dCBiaXRtYXAgaW1hZ2UgZnJvbSB3aGljaCB0byBjb3B5IHBpeGVscy5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgc291cmNlIGltYWdlIGNhbiBiZSBhIGRpZmZlcmVudCBCaXRtYXBEYXRhXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UsIG9yIGl0IGNhbiByZWZlciB0byB0aGUgY3VycmVudFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIEJpdG1hcERhdGEgaW5zdGFuY2UuXHJcblx0ICogQHBhcmFtIHNvdXJjZVJlY3QgICAgICAgQSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZSBzb3VyY2VcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZSB0byB1c2UgYXMgaW5wdXQuXHJcblx0ICogQHBhcmFtIGRlc3RQb2ludCAgICAgICAgVGhlIGRlc3RpbmF0aW9uIHBvaW50IHRoYXQgcmVwcmVzZW50cyB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICB1cHBlci1sZWZ0IGNvcm5lciBvZiB0aGUgcmVjdGFuZ3VsYXIgYXJlYSB3aGVyZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBuZXcgcGl4ZWxzIGFyZSBwbGFjZWQuXHJcblx0ICogQHBhcmFtIGFscGhhQml0bWFwRGF0YSAgQSBzZWNvbmRhcnksIGFscGhhIEJpdG1hcERhdGEgb2JqZWN0IHNvdXJjZS5cclxuXHQgKiBAcGFyYW0gYWxwaGFQb2ludCAgICAgICBUaGUgcG9pbnQgaW4gdGhlIGFscGhhIEJpdG1hcERhdGEgb2JqZWN0IHNvdXJjZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHVwcGVyLWxlZnQgY29ybmVyIG9mIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnNvdXJjZVJlY3Q8L2NvZGU+IHBhcmFtZXRlci5cclxuXHQgKiBAcGFyYW0gbWVyZ2VBbHBoYSAgICAgICBUbyB1c2UgdGhlIGFscGhhIGNoYW5uZWwsIHNldCB0aGUgdmFsdWUgdG9cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT50cnVlPC9jb2RlPi4gVG8gY29weSBwaXhlbHMgd2l0aCBubyBhbHBoYVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwsIHNldCB0aGUgdmFsdWUgdG8gPGNvZGU+ZmFsc2U8L2NvZGU+LlxyXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yIFRoZSBzb3VyY2VCaXRtYXBEYXRhLCBzb3VyY2VSZWN0LCBkZXN0UG9pbnQgYXJlIG51bGwuXHJcblx0ICovXHJcblx0cHVibGljIGNvcHlQaXhlbHMoYm1wZDpCaXRtYXBEYXRhLCBzb3VyY2VSZWN0OlJlY3RhbmdsZSwgZGVzdFJlY3Q6UmVjdGFuZ2xlKTtcclxuXHRwdWJsaWMgY29weVBpeGVscyhibXBkOkhUTUxJbWFnZUVsZW1lbnQsIHNvdXJjZVJlY3Q6UmVjdGFuZ2xlLCBkZXN0UmVjdDpSZWN0YW5nbGUpO1xyXG5cdHB1YmxpYyBjb3B5UGl4ZWxzKGJtcGQ6YW55LCBzb3VyY2VSZWN0OlJlY3RhbmdsZSwgZGVzdFJlY3Q6UmVjdGFuZ2xlKVxyXG5cdHtcclxuXHJcblx0XHRpZiAodGhpcy5fbG9ja2VkKSB7XHJcblxyXG5cdFx0XHQvLyBJZiBjYW52YXMgaXMgbG9ja2VkOlxyXG5cdFx0XHQvL1xyXG5cdFx0XHQvLyAgICAgIDEpIGNvcHkgaW1hZ2UgZGF0YSBiYWNrIHRvIGNhbnZhc1xyXG5cdFx0XHQvLyAgICAgIDIpIGRyYXcgb2JqZWN0XHJcblx0XHRcdC8vICAgICAgMykgcmVhZCBfaW1hZ2VEYXRhIGJhY2sgb3V0XHJcblxyXG5cdFx0XHRpZiAodGhpcy5faW1hZ2VEYXRhKVxyXG5cdFx0XHRcdHRoaXMuX2NvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuX2ltYWdlRGF0YSwgMCwgMCk7IC8vIGF0IGNvb3JkcyAwLDBcclxuXHJcblx0XHRcdHRoaXMuX2NvcHlQaXhlbHMoYm1wZCwgc291cmNlUmVjdCwgZGVzdFJlY3QpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuX2ltYWdlRGF0YSlcclxuXHRcdFx0XHR0aGlzLl9pbWFnZURhdGEgPSB0aGlzLl9jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLl9yZWN0LndpZHRoLCB0aGlzLl9yZWN0LmhlaWdodCk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5fY29weVBpeGVscyhibXBkLCBzb3VyY2VSZWN0LCBkZXN0UmVjdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGcmVlcyBtZW1vcnkgdGhhdCBpcyB1c2VkIHRvIHN0b3JlIHRoZSBCaXRtYXBEYXRhIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIDxwPldoZW4gdGhlIDxjb2RlPmRpc3Bvc2UoKTwvY29kZT4gbWV0aG9kIGlzIGNhbGxlZCBvbiBhbiBpbWFnZSwgdGhlIHdpZHRoXHJcblx0ICogYW5kIGhlaWdodCBvZiB0aGUgaW1hZ2UgYXJlIHNldCB0byAwLiBBbGwgc3Vic2VxdWVudCBjYWxscyB0byBtZXRob2RzIG9yXHJcblx0ICogcHJvcGVydGllcyBvZiB0aGlzIEJpdG1hcERhdGEgaW5zdGFuY2UgZmFpbCwgYW5kIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24uXHJcblx0ICogPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+PGNvZGU+Qml0bWFwRGF0YS5kaXNwb3NlKCk8L2NvZGU+IHJlbGVhc2VzIHRoZSBtZW1vcnkgb2NjdXBpZWQgYnkgdGhlXHJcblx0ICogYWN0dWFsIGJpdG1hcCBkYXRhLCBpbW1lZGlhdGVseShhIGJpdG1hcCBjYW4gY29uc3VtZSB1cCB0byA2NCBNQiBvZlxyXG5cdCAqIG1lbW9yeSkuIEFmdGVyIHVzaW5nIDxjb2RlPkJpdG1hcERhdGEuZGlzcG9zZSgpPC9jb2RlPiwgdGhlIEJpdG1hcERhdGFcclxuXHQgKiBvYmplY3QgaXMgbm8gbG9uZ2VyIHVzYWJsZSBhbmQgYW4gZXhjZXB0aW9uIG1heSBiZSB0aHJvd24gaWZcclxuXHQgKiB5b3UgY2FsbCBmdW5jdGlvbnMgb24gdGhlIEJpdG1hcERhdGEgb2JqZWN0LiBIb3dldmVyLFxyXG5cdCAqIDxjb2RlPkJpdG1hcERhdGEuZGlzcG9zZSgpPC9jb2RlPiBkb2VzIG5vdCBnYXJiYWdlIGNvbGxlY3QgdGhlIEJpdG1hcERhdGFcclxuXHQgKiBvYmplY3QoYXBwcm94aW1hdGVseSAxMjggYnl0ZXMpOyB0aGUgbWVtb3J5IG9jY3VwaWVkIGJ5IHRoZSBhY3R1YWxcclxuXHQgKiBCaXRtYXBEYXRhIG9iamVjdCBpcyByZWxlYXNlZCBhdCB0aGUgdGltZSB0aGUgQml0bWFwRGF0YSBvYmplY3QgaXNcclxuXHQgKiBjb2xsZWN0ZWQgYnkgdGhlIGdhcmJhZ2UgY29sbGVjdG9yLjwvcD5cclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaXNwb3NlKClcclxuXHR7XHJcblx0XHR0aGlzLl9jb250ZXh0ID0gbnVsbDtcclxuXHRcdHRoaXMuX2ltYWdlQ2FudmFzID0gbnVsbDtcclxuXHRcdHRoaXMuX2ltYWdlRGF0YSA9IG51bGw7XHJcblx0XHR0aGlzLl9yZWN0ID0gbnVsbDtcclxuXHRcdHRoaXMuX3RyYW5zcGFyZW50ID0gbnVsbDtcclxuXHRcdHRoaXMuX2xvY2tlZCA9IG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEcmF3cyB0aGUgPGNvZGU+c291cmNlPC9jb2RlPiBkaXNwbGF5IG9iamVjdCBvbnRvIHRoZSBiaXRtYXAgaW1hZ2UsIHVzaW5nXHJcblx0ICogdGhlIE5NRSBzb2Z0d2FyZSByZW5kZXJlci4gWW91IGNhbiBzcGVjaWZ5IDxjb2RlPm1hdHJpeDwvY29kZT4sXHJcblx0ICogPGNvZGU+Y29sb3JUcmFuc2Zvcm08L2NvZGU+LCA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+LCBhbmQgYSBkZXN0aW5hdGlvblxyXG5cdCAqIDxjb2RlPmNsaXBSZWN0PC9jb2RlPiBwYXJhbWV0ZXIgdG8gY29udHJvbCBob3cgdGhlIHJlbmRlcmluZyBwZXJmb3Jtcy5cclxuXHQgKiBPcHRpb25hbGx5LCB5b3UgY2FuIHNwZWNpZnkgd2hldGhlciB0aGUgYml0bWFwIHNob3VsZCBiZSBzbW9vdGhlZCB3aGVuXHJcblx0ICogc2NhbGVkKHRoaXMgd29ya3Mgb25seSBpZiB0aGUgc291cmNlIG9iamVjdCBpcyBhIEJpdG1hcERhdGEgb2JqZWN0KS5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBzb3VyY2UgZGlzcGxheSBvYmplY3QgZG9lcyBub3QgdXNlIGFueSBvZiBpdHMgYXBwbGllZFxyXG5cdCAqIHRyYW5zZm9ybWF0aW9ucyBmb3IgdGhpcyBjYWxsLiBJdCBpcyB0cmVhdGVkIGFzIGl0IGV4aXN0cyBpbiB0aGUgbGlicmFyeVxyXG5cdCAqIG9yIGZpbGUsIHdpdGggbm8gbWF0cml4IHRyYW5zZm9ybSwgbm8gY29sb3IgdHJhbnNmb3JtLCBhbmQgbm8gYmxlbmQgbW9kZS5cclxuXHQgKiBUbyBkcmF3IGEgZGlzcGxheSBvYmplY3Qoc3VjaCBhcyBhIG1vdmllIGNsaXApIGJ5IHVzaW5nIGl0cyBvd24gdHJhbnNmb3JtXHJcblx0ICogcHJvcGVydGllcywgeW91IGNhbiBjb3B5IGl0cyA8Y29kZT50cmFuc2Zvcm08L2NvZGU+IHByb3BlcnR5IG9iamVjdCB0byB0aGVcclxuXHQgKiA8Y29kZT50cmFuc2Zvcm08L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBCaXRtYXAgb2JqZWN0IHRoYXQgdXNlcyB0aGVcclxuXHQgKiBCaXRtYXBEYXRhIG9iamVjdC48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc291cmNlICAgICAgICAgVGhlIGRpc3BsYXkgb2JqZWN0IG9yIEJpdG1hcERhdGEgb2JqZWN0IHRvIGRyYXcgdG9cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIEJpdG1hcERhdGEgb2JqZWN0LihUaGUgRGlzcGxheU9iamVjdCBhbmRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgQml0bWFwRGF0YSBjbGFzc2VzIGltcGxlbWVudCB0aGUgSUJpdG1hcERyYXdhYmxlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGludGVyZmFjZS4pXHJcblx0ICogQHBhcmFtIG1hdHJpeCAgICAgICAgIEEgTWF0cml4IG9iamVjdCB1c2VkIHRvIHNjYWxlLCByb3RhdGUsIG9yIHRyYW5zbGF0ZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIGJpdG1hcC4gSWYgeW91IGRvIG5vdCB3YW50IHRvXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFwcGx5IGEgbWF0cml4IHRyYW5zZm9ybWF0aW9uIHRvIHRoZSBpbWFnZSwgc2V0IHRoaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyIHRvIGFuIGlkZW50aXR5IG1hdHJpeCwgY3JlYXRlZCB3aXRoIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IDxjb2RlPm5ldyBNYXRyaXgoKTwvY29kZT4gY29uc3RydWN0b3IsIG9yXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHBhc3MgYSA8Y29kZT5udWxsPC9jb2RlPiB2YWx1ZS5cclxuXHQgKiBAcGFyYW0gY29sb3JUcmFuc2Zvcm0gQSBDb2xvclRyYW5zZm9ybSBvYmplY3QgdGhhdCB5b3UgdXNlIHRvIGFkanVzdCB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgdmFsdWVzIG9mIHRoZSBiaXRtYXAuIElmIG5vIG9iamVjdCBpc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBzdXBwbGllZCwgdGhlIGJpdG1hcCBpbWFnZSdzIGNvbG9ycyBhcmUgbm90XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybWVkLiBJZiB5b3UgbXVzdCBwYXNzIHRoaXMgcGFyYW1ldGVyIGJ1dCB5b3VcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgZG8gbm90IHdhbnQgdG8gdHJhbnNmb3JtIHRoZSBpbWFnZSwgc2V0IHRoaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyIHRvIGEgQ29sb3JUcmFuc2Zvcm0gb2JqZWN0IGNyZWF0ZWQgd2l0aFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgZGVmYXVsdCA8Y29kZT5uZXcgQ29sb3JUcmFuc2Zvcm0oKTwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3IuXHJcblx0ICogQHBhcmFtIGJsZW5kTW9kZSAgICAgIEEgc3RyaW5nIHZhbHVlLCBmcm9tIHRoZSBmbGFzaC5kaXNwbGF5LkJsZW5kTW9kZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBjbGFzcywgc3BlY2lmeWluZyB0aGUgYmxlbmQgbW9kZSB0byBiZSBhcHBsaWVkIHRvXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoZSByZXN1bHRpbmcgYml0bWFwLlxyXG5cdCAqIEBwYXJhbSBjbGlwUmVjdCAgICAgICBBIFJlY3RhbmdsZSBvYmplY3QgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Ugb2JqZWN0IHRvIGRyYXcuIElmIHlvdSBkbyBub3Qgc3VwcGx5IHRoaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsIG5vIGNsaXBwaW5nIG9jY3VycyBhbmQgdGhlIGVudGlyZSBzb3VyY2VcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IGlzIGRyYXduLlxyXG5cdCAqIEBwYXJhbSBzbW9vdGhpbmcgICAgICBBIEJvb2xlYW4gdmFsdWUgdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgYSBCaXRtYXBEYXRhXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCBpcyBzbW9vdGhlZCB3aGVuIHNjYWxlZCBvciByb3RhdGVkLCBkdWUgdG8gYVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBzY2FsaW5nIG9yIHJvdGF0aW9uIGluIHRoZSA8Y29kZT5tYXRyaXg8L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlci4gVGhlIDxjb2RlPnNtb290aGluZzwvY29kZT4gcGFyYW1ldGVyIG9ubHlcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYXBwbGllcyBpZiB0aGUgPGNvZGU+c291cmNlPC9jb2RlPiBwYXJhbWV0ZXIgaXMgYVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBCaXRtYXBEYXRhIG9iamVjdC4gV2l0aCA8Y29kZT5zbW9vdGhpbmc8L2NvZGU+IHNldFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0byA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSByb3RhdGVkIG9yIHNjYWxlZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBCaXRtYXBEYXRhIGltYWdlIGNhbiBhcHBlYXIgcGl4ZWxhdGVkIG9yIGphZ2dlZC4gRm9yXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgdHdvIGltYWdlcyB1c2UgdGhlIHNhbWVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgQml0bWFwRGF0YSBvYmplY3QgZm9yIHRoZSA8Y29kZT5zb3VyY2U8L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlciwgYnV0IHRoZSA8Y29kZT5zbW9vdGhpbmc8L2NvZGU+IHBhcmFtZXRlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4gb24gdGhlIGxlZnQgYW5kXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmZhbHNlPC9jb2RlPiBvbiB0aGUgcmlnaHQ6XHJcblx0ICpcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPHA+RHJhd2luZyBhIGJpdG1hcCB3aXRoIDxjb2RlPnNtb290aGluZzwvY29kZT4gc2V0XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRvIDxjb2RlPnRydWU8L2NvZGU+IHRha2VzIGxvbmdlciB0aGFuIGRvaW5nIHNvIHdpdGhcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c21vb3RoaW5nPC9jb2RlPiBzZXQgdG9cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+ZmFsc2U8L2NvZGU+LjwvcD5cclxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhlIDxjb2RlPnNvdXJjZTwvY29kZT4gcGFyYW1ldGVyIGlzIG5vdCBhXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIEJpdG1hcERhdGEgb3IgRGlzcGxheU9iamVjdCBvYmplY3QuXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRoZSBzb3VyY2UgaXMgbnVsbCBvciBub3QgYSB2YWxpZCBJQml0bWFwRHJhd2FibGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlxyXG5cdCAqIEB0aHJvd3MgU2VjdXJpdHlFcnJvciBUaGUgPGNvZGU+c291cmNlPC9jb2RlPiBvYmplY3QgYW5kKGluIHRoZSBjYXNlIG9mIGFcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgU3ByaXRlIG9yIE1vdmllQ2xpcCBvYmplY3QpIGFsbCBvZiBpdHMgY2hpbGQgb2JqZWN0c1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBkbyBub3QgY29tZSBmcm9tIHRoZSBzYW1lIGRvbWFpbiBhcyB0aGUgY2FsbGVyLCBvclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhcmUgbm90IGluIGEgY29udGVudCB0aGF0IGlzIGFjY2Vzc2libGUgdG8gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGNhbGxlciBieSBoYXZpbmcgY2FsbGVkIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TZWN1cml0eS5hbGxvd0RvbWFpbigpPC9jb2RlPiBtZXRob2QuIFRoaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3Rpb24gZG9lcyBub3QgYXBwbHkgdG8gQUlSIGNvbnRlbnQgaW4gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uIHNlY3VyaXR5IHNhbmRib3guXHJcblx0ICovXHJcblx0cHVibGljIGRyYXcoc291cmNlOkJpdG1hcERhdGEsIG1hdHJpeD86TWF0cml4LCBjb2xvclRyYW5zZm9ybT86Q29sb3JUcmFuc2Zvcm0sIGJsZW5kTW9kZT86QmxlbmRNb2RlLCBjbGlwUmVjdD86UmVjdGFuZ2xlLCBzbW9vdGhpbmc/OmJvb2xlYW4pO1xyXG5cdHB1YmxpYyBkcmF3KHNvdXJjZTpIVE1MRWxlbWVudCwgbWF0cml4PzpNYXRyaXgsIGNvbG9yVHJhbnNmb3JtPzpDb2xvclRyYW5zZm9ybSwgYmxlbmRNb2RlPzpCbGVuZE1vZGUsIGNsaXBSZWN0PzpSZWN0YW5nbGUsIHNtb290aGluZz86Ym9vbGVhbik7XHJcblx0cHVibGljIGRyYXcoc291cmNlOmFueSwgbWF0cml4PzpNYXRyaXgsIGNvbG9yVHJhbnNmb3JtPzpDb2xvclRyYW5zZm9ybSwgYmxlbmRNb2RlPzpCbGVuZE1vZGUsIGNsaXBSZWN0PzpSZWN0YW5nbGUsIHNtb290aGluZz86Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fbG9ja2VkKSB7XHJcblxyXG5cdFx0XHQvLyBJZiBjYW52YXMgaXMgbG9ja2VkOlxyXG5cdFx0XHQvL1xyXG5cdFx0XHQvLyAgICAgIDEpIGNvcHkgaW1hZ2UgZGF0YSBiYWNrIHRvIGNhbnZhc1xyXG5cdFx0XHQvLyAgICAgIDIpIGRyYXcgb2JqZWN0XHJcblx0XHRcdC8vICAgICAgMykgcmVhZCBfaW1hZ2VEYXRhIGJhY2sgb3V0XHJcblxyXG5cdFx0XHR0aGlzLl9jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLl9pbWFnZURhdGEsIDAsIDApOyAvLyBhdCBjb29yZHMgMCwwXHJcblx0XHRcdHRoaXMuX2RyYXcoc291cmNlLCBtYXRyaXgsIGNvbG9yVHJhbnNmb3JtLCBibGVuZE1vZGUsIGNsaXBSZWN0LCBzbW9vdGhpbmcpO1xyXG5cdFx0XHR0aGlzLl9pbWFnZURhdGEgPSB0aGlzLl9jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLl9yZWN0LndpZHRoLCB0aGlzLl9yZWN0LmhlaWdodCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9kcmF3KHNvdXJjZSwgbWF0cml4LCBjb2xvclRyYW5zZm9ybSwgYmxlbmRNb2RlLCBjbGlwUmVjdCwgc21vb3RoaW5nKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpbGxzIGEgcmVjdGFuZ3VsYXIgYXJlYSBvZiBwaXhlbHMgd2l0aCBhIHNwZWNpZmllZCBBUkdCIGNvbG9yLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHJlY3QgIFRoZSByZWN0YW5ndWxhciBhcmVhIHRvIGZpbGwuXHJcblx0ICogQHBhcmFtIGNvbG9yIFRoZSBBUkdCIGNvbG9yIHZhbHVlIHRoYXQgZmlsbHMgdGhlIGFyZWEuIEFSR0IgY29sb3JzIGFyZVxyXG5cdCAqICAgICAgICAgICAgICBvZnRlbiBzcGVjaWZpZWQgaW4gaGV4YWRlY2ltYWwgZm9ybWF0OyBmb3IgZXhhbXBsZSxcclxuXHQgKiAgICAgICAgICAgICAgMHhGRjMzNjY5OS5cclxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvciBUaGUgcmVjdCBpcyBudWxsLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBmaWxsUmVjdChyZWN0OlJlY3RhbmdsZSwgY29sb3I6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9sb2NrZWQpIHtcclxuXHJcblx0XHRcdC8vIElmIGNhbnZhcyBpcyBsb2NrZWQ6XHJcblx0XHRcdC8vXHJcblx0XHRcdC8vICAgICAgMSkgY29weSBpbWFnZSBkYXRhIGJhY2sgdG8gY2FudmFzXHJcblx0XHRcdC8vICAgICAgMikgYXBwbHkgZmlsbFxyXG5cdFx0XHQvLyAgICAgIDMpIHJlYWQgX2ltYWdlRGF0YSBiYWNrIG91dFxyXG5cclxuXHRcdFx0aWYgKHRoaXMuX2ltYWdlRGF0YSlcclxuXHRcdFx0XHR0aGlzLl9jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLl9pbWFnZURhdGEsIDAsIDApOyAvLyBhdCBjb29yZHMgMCwwXHJcblxyXG5cdFx0XHR0aGlzLl9maWxsUmVjdChyZWN0LCBjb2xvcik7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5faW1hZ2VEYXRhKVxyXG5cdFx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuX3JlY3Qud2lkdGgsIHRoaXMuX3JlY3QuaGVpZ2h0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX2ZpbGxSZWN0KHJlY3QsIGNvbG9yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYW4gaW50ZWdlciB0aGF0IHJlcHJlc2VudHMgYW4gUkdCIHBpeGVsIHZhbHVlIGZyb20gYSBCaXRtYXBEYXRhXHJcblx0ICogb2JqZWN0IGF0IGEgc3BlY2lmaWMgcG9pbnQoPGk+eDwvaT4sIDxpPnk8L2k+KS4gVGhlXHJcblx0ICogPGNvZGU+Z2V0UGl4ZWwoKTwvY29kZT4gbWV0aG9kIHJldHVybnMgYW4gdW5tdWx0aXBsaWVkIHBpeGVsIHZhbHVlLiBOb1xyXG5cdCAqIGFscGhhIGluZm9ybWF0aW9uIGlzIHJldHVybmVkLlxyXG5cdCAqXHJcblx0ICogPHA+QWxsIHBpeGVscyBpbiBhIEJpdG1hcERhdGEgb2JqZWN0IGFyZSBzdG9yZWQgYXMgcHJlbXVsdGlwbGllZCBjb2xvclxyXG5cdCAqIHZhbHVlcy4gQSBwcmVtdWx0aXBsaWVkIGltYWdlIHBpeGVsIGhhcyB0aGUgcmVkLCBncmVlbiwgYW5kIGJsdWUgY29sb3JcclxuXHQgKiBjaGFubmVsIHZhbHVlcyBhbHJlYWR5IG11bHRpcGxpZWQgYnkgdGhlIGFscGhhIGRhdGEuIEZvciBleGFtcGxlLCBpZiB0aGVcclxuXHQgKiBhbHBoYSB2YWx1ZSBpcyAwLCB0aGUgdmFsdWVzIGZvciB0aGUgUkdCIGNoYW5uZWxzIGFyZSBhbHNvIDAsIGluZGVwZW5kZW50XHJcblx0ICogb2YgdGhlaXIgdW5tdWx0aXBsaWVkIHZhbHVlcy4gVGhpcyBsb3NzIG9mIGRhdGEgY2FuIGNhdXNlIHNvbWUgcHJvYmxlbXNcclxuXHQgKiB3aGVuIHlvdSBwZXJmb3JtIG9wZXJhdGlvbnMuIEFsbCBCaXRtYXBEYXRhIG1ldGhvZHMgdGFrZSBhbmQgcmV0dXJuXHJcblx0ICogdW5tdWx0aXBsaWVkIHZhbHVlcy4gVGhlIGludGVybmFsIHBpeGVsIHJlcHJlc2VudGF0aW9uIGlzIGNvbnZlcnRlZCBmcm9tXHJcblx0ICogcHJlbXVsdGlwbGllZCB0byB1bm11bHRpcGxpZWQgYmVmb3JlIGl0IGlzIHJldHVybmVkIGFzIGEgdmFsdWUuIER1cmluZyBhXHJcblx0ICogc2V0IG9wZXJhdGlvbiwgdGhlIHBpeGVsIHZhbHVlIGlzIHByZW11bHRpcGxpZWQgYmVmb3JlIHRoZSByYXcgaW1hZ2UgcGl4ZWxcclxuXHQgKiBpcyBzZXQuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHggVGhlIDxpPng8L2k+IHBvc2l0aW9uIG9mIHRoZSBwaXhlbC5cclxuXHQgKiBAcGFyYW0geSBUaGUgPGk+eTwvaT4gcG9zaXRpb24gb2YgdGhlIHBpeGVsLlxyXG5cdCAqIEByZXR1cm4gQSBudW1iZXIgdGhhdCByZXByZXNlbnRzIGFuIFJHQiBwaXhlbCB2YWx1ZS4gSWYgdGhlKDxpPng8L2k+LFxyXG5cdCAqICAgICAgICAgPGk+eTwvaT4pIGNvb3JkaW5hdGVzIGFyZSBvdXRzaWRlIHRoZSBib3VuZHMgb2YgdGhlIGltYWdlLCB0aGVcclxuXHQgKiAgICAgICAgIG1ldGhvZCByZXR1cm5zIDAuXHJcblx0ICovXHJcblx0cHVibGljIGdldFBpeGVsKHgsIHkpOm51bWJlclxyXG5cdHtcclxuXHRcdHZhciByOm51bWJlcjtcclxuXHRcdHZhciBnOm51bWJlcjtcclxuXHRcdHZhciBiOm51bWJlcjtcclxuXHRcdHZhciBhOm51bWJlcjtcclxuXHJcblx0XHRpZiAoIXRoaXMuX2xvY2tlZCkge1xyXG5cdFx0XHR2YXIgcGl4ZWxEYXRhOkltYWdlRGF0YSA9IHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKHgsIHksIDEsIDEpO1xyXG5cclxuXHRcdFx0ciA9IHBpeGVsRGF0YS5kYXRhWzBdO1xyXG5cdFx0XHRnID0gcGl4ZWxEYXRhLmRhdGFbMV07XHJcblx0XHRcdGIgPSBwaXhlbERhdGEuZGF0YVsyXTtcclxuXHRcdFx0YSA9IHBpeGVsRGF0YS5kYXRhWzNdO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBpbmRleDpudW1iZXIgPSAoeCArIHkqdGhpcy5faW1hZ2VDYW52YXMud2lkdGgpKjQ7XHJcblxyXG5cdFx0XHRyID0gdGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAwXTtcclxuXHRcdFx0ZyA9IHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMV07XHJcblx0XHRcdGIgPSB0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDJdO1xyXG5cdFx0XHRhID0gdGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAzXTtcclxuXHRcdH1cclxuXHJcblx0XHQvL3JldHVybnMgYmxhY2sgaWYgZnVsbHkgdHJhbnNwYXJlbnRcclxuXHRcdGlmICghYSlcclxuXHRcdFx0cmV0dXJuIDB4MDtcclxuXHJcblx0XHRyZXR1cm4gKHIgPDwgMTYpIHwgKGcgPDwgOCkgfCBiO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhbiBBUkdCIGNvbG9yIHZhbHVlIHRoYXQgY29udGFpbnMgYWxwaGEgY2hhbm5lbCBkYXRhIGFuZCBSR0IgZGF0YS5cclxuXHQgKiBUaGlzIG1ldGhvZCBpcyBzaW1pbGFyIHRvIHRoZSA8Y29kZT5nZXRQaXhlbCgpPC9jb2RlPiBtZXRob2QsIHdoaWNoXHJcblx0ICogcmV0dXJucyBhbiBSR0IgY29sb3Igd2l0aG91dCBhbHBoYSBjaGFubmVsIGRhdGEuXHJcblx0ICpcclxuXHQgKiA8cD5BbGwgcGl4ZWxzIGluIGEgQml0bWFwRGF0YSBvYmplY3QgYXJlIHN0b3JlZCBhcyBwcmVtdWx0aXBsaWVkIGNvbG9yXHJcblx0ICogdmFsdWVzLiBBIHByZW11bHRpcGxpZWQgaW1hZ2UgcGl4ZWwgaGFzIHRoZSByZWQsIGdyZWVuLCBhbmQgYmx1ZSBjb2xvclxyXG5cdCAqIGNoYW5uZWwgdmFsdWVzIGFscmVhZHkgbXVsdGlwbGllZCBieSB0aGUgYWxwaGEgZGF0YS4gRm9yIGV4YW1wbGUsIGlmIHRoZVxyXG5cdCAqIGFscGhhIHZhbHVlIGlzIDAsIHRoZSB2YWx1ZXMgZm9yIHRoZSBSR0IgY2hhbm5lbHMgYXJlIGFsc28gMCwgaW5kZXBlbmRlbnRcclxuXHQgKiBvZiB0aGVpciB1bm11bHRpcGxpZWQgdmFsdWVzLiBUaGlzIGxvc3Mgb2YgZGF0YSBjYW4gY2F1c2Ugc29tZSBwcm9ibGVtc1xyXG5cdCAqIHdoZW4geW91IHBlcmZvcm0gb3BlcmF0aW9ucy4gQWxsIEJpdG1hcERhdGEgbWV0aG9kcyB0YWtlIGFuZCByZXR1cm5cclxuXHQgKiB1bm11bHRpcGxpZWQgdmFsdWVzLiBUaGUgaW50ZXJuYWwgcGl4ZWwgcmVwcmVzZW50YXRpb24gaXMgY29udmVydGVkIGZyb21cclxuXHQgKiBwcmVtdWx0aXBsaWVkIHRvIHVubXVsdGlwbGllZCBiZWZvcmUgaXQgaXMgcmV0dXJuZWQgYXMgYSB2YWx1ZS4gRHVyaW5nIGFcclxuXHQgKiBzZXQgb3BlcmF0aW9uLCB0aGUgcGl4ZWwgdmFsdWUgaXMgcHJlbXVsdGlwbGllZCBiZWZvcmUgdGhlIHJhdyBpbWFnZSBwaXhlbFxyXG5cdCAqIGlzIHNldC48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0geCBUaGUgPGk+eDwvaT4gcG9zaXRpb24gb2YgdGhlIHBpeGVsLlxyXG5cdCAqIEBwYXJhbSB5IFRoZSA8aT55PC9pPiBwb3NpdGlvbiBvZiB0aGUgcGl4ZWwuXHJcblx0ICogQHJldHVybiBBIG51bWJlciByZXByZXNlbnRpbmcgYW4gQVJHQiBwaXhlbCB2YWx1ZS4gSWYgdGhlKDxpPng8L2k+LFxyXG5cdCAqICAgICAgICAgPGk+eTwvaT4pIGNvb3JkaW5hdGVzIGFyZSBvdXRzaWRlIHRoZSBib3VuZHMgb2YgdGhlIGltYWdlLCAwIGlzXHJcblx0ICogICAgICAgICByZXR1cm5lZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0UGl4ZWwzMih4LCB5KTpudW1iZXJcclxuXHR7XHJcblx0XHR2YXIgcjpudW1iZXI7XHJcblx0XHR2YXIgZzpudW1iZXI7XHJcblx0XHR2YXIgYjpudW1iZXI7XHJcblx0XHR2YXIgYTpudW1iZXI7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpIHtcclxuXHRcdFx0dmFyIHBpeGVsRGF0YTpJbWFnZURhdGEgPSB0aGlzLl9jb250ZXh0LmdldEltYWdlRGF0YSh4LCB5LCAxLCAxKTtcclxuXHJcblx0XHRcdHIgPSBwaXhlbERhdGEuZGF0YVswXTtcclxuXHRcdFx0ZyA9IHBpeGVsRGF0YS5kYXRhWzFdO1xyXG5cdFx0XHRiID0gcGl4ZWxEYXRhLmRhdGFbMl07XHJcblx0XHRcdGEgPSBwaXhlbERhdGEuZGF0YVszXTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgaW5kZXg6bnVtYmVyID0gKHggKyB5KnRoaXMuX2ltYWdlQ2FudmFzLndpZHRoKSo0O1xyXG5cclxuXHRcdFx0ciA9IHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMF07XHJcblx0XHRcdGcgPSB0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDFdO1xyXG5cdFx0XHRiID0gdGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAyXTtcclxuXHRcdFx0YSA9IHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgM107XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChhIDw8IDI0KSB8IChyIDw8IDE2KSB8IChnIDw8IDgpIHwgYjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvY2tzIGFuIGltYWdlIHNvIHRoYXQgYW55IG9iamVjdHMgdGhhdCByZWZlcmVuY2UgdGhlIEJpdG1hcERhdGEgb2JqZWN0LFxyXG5cdCAqIHN1Y2ggYXMgQml0bWFwIG9iamVjdHMsIGFyZSBub3QgdXBkYXRlZCB3aGVuIHRoaXMgQml0bWFwRGF0YSBvYmplY3RcclxuXHQgKiBjaGFuZ2VzLiBUbyBpbXByb3ZlIHBlcmZvcm1hbmNlLCB1c2UgdGhpcyBtZXRob2QgYWxvbmcgd2l0aCB0aGVcclxuXHQgKiA8Y29kZT51bmxvY2soKTwvY29kZT4gbWV0aG9kIGJlZm9yZSBhbmQgYWZ0ZXIgbnVtZXJvdXMgY2FsbHMgdG8gdGhlXHJcblx0ICogPGNvZGU+c2V0UGl4ZWwoKTwvY29kZT4gb3IgPGNvZGU+c2V0UGl4ZWwzMigpPC9jb2RlPiBtZXRob2QuXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgbG9jaygpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2xvY2tlZClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2xvY2tlZCA9IHRydWU7XHJcblx0XHR0aGlzLl9pbWFnZURhdGEgPSB0aGlzLl9jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLl9yZWN0LndpZHRoLCB0aGlzLl9yZWN0LmhlaWdodCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0cyBhbiBBcnJheSBpbnRvIGEgcmVjdGFuZ3VsYXIgcmVnaW9uIG9mIHBpeGVsIGRhdGEuIEZvciBlYWNoIHBpeGVsLFxyXG5cdCAqIGFuIEFycmF5IGVsZW1lbnQgaXMgcmVhZCBhbmQgd3JpdHRlbiBpbnRvIHRoZSBCaXRtYXBEYXRhIHBpeGVsLiBUaGUgZGF0YVxyXG5cdCAqIGluIHRoZSBBcnJheSBpcyBleHBlY3RlZCB0byBiZSAzMi1iaXQgQVJHQiBwaXhlbCB2YWx1ZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcmVjdCAgICAgICAgU3BlY2lmaWVzIHRoZSByZWN0YW5ndWxhciByZWdpb24gb2YgdGhlIEJpdG1hcERhdGFcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlxyXG5cdCAqIEBwYXJhbSBpbnB1dEFycmF5ICBBbiBBcnJheSB0aGF0IGNvbnNpc3RzIG9mIDMyLWJpdCB1bm11bHRpcGxpZWQgcGl4ZWxcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgdmFsdWVzIHRvIGJlIHVzZWQgaW4gdGhlIHJlY3Rhbmd1bGFyIHJlZ2lvbi5cclxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIHZlY3RvciBhcnJheSBpcyBub3QgbGFyZ2UgZW5vdWdoIHRvIHJlYWQgYWxsIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICBwaXhlbCBkYXRhLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXRBcnJheShyZWN0OlJlY3RhbmdsZSwgaW5wdXRBcnJheTpBcnJheTxudW1iZXI+KVxyXG5cdHtcclxuXHRcdGlmICghdGhpcy5fbG9ja2VkKVxyXG5cdFx0XHR0aGlzLl9pbWFnZURhdGEgPSB0aGlzLl9jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLl9yZWN0LndpZHRoLCB0aGlzLl9yZWN0LmhlaWdodCk7XHJcblxyXG5cdFx0dmFyIGk6bnVtYmVyIC8qdWludCovLCBqOm51bWJlciAvKnVpbnQqLywgaW5kZXg6bnVtYmVyIC8qdWludCovLCBhcmdiOm51bWJlcltdIC8qdWludCovO1xyXG5cdFx0Zm9yIChpID0gMDsgaSA8IHJlY3Qud2lkdGg7ICsraSkge1xyXG5cdFx0XHRmb3IgKGogPSAwOyBqIDwgcmVjdC5oZWlnaHQ7ICsraikge1xyXG5cdFx0XHRcdGFyZ2IgPSBDb2xvclV0aWxzLmZsb2F0MzJDb2xvclRvQVJHQihpbnB1dEFycmF5W2kgKyBqKnJlY3Qud2lkdGhdKTtcclxuXHRcdFx0XHRpbmRleCA9IChpICsgcmVjdC54ICsgKGogKyByZWN0LnkpKnRoaXMuX2ltYWdlQ2FudmFzLndpZHRoKSo0O1xyXG5cclxuXHRcdFx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDBdID0gYXJnYlsxXTtcclxuXHRcdFx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDFdID0gYXJnYlsyXTtcclxuXHRcdFx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDJdID0gYXJnYlszXTtcclxuXHRcdFx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID0gYXJnYlswXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdGhpcy5fbG9ja2VkKSB7XHJcblx0XHRcdHRoaXMuX2NvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuX2ltYWdlRGF0YSwgMCwgMCk7XHJcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGEgc2luZ2xlIHBpeGVsIG9mIGEgQml0bWFwRGF0YSBvYmplY3QuIFRoZSBjdXJyZW50IGFscGhhIGNoYW5uZWxcclxuXHQgKiB2YWx1ZSBvZiB0aGUgaW1hZ2UgcGl4ZWwgaXMgcHJlc2VydmVkIGR1cmluZyB0aGlzIG9wZXJhdGlvbi4gVGhlIHZhbHVlIG9mXHJcblx0ICogdGhlIFJHQiBjb2xvciBwYXJhbWV0ZXIgaXMgdHJlYXRlZCBhcyBhbiB1bm11bHRpcGxpZWQgY29sb3IgdmFsdWUuXHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVG8gaW5jcmVhc2UgcGVyZm9ybWFuY2UsIHdoZW4geW91IHVzZSB0aGVcclxuXHQgKiA8Y29kZT5zZXRQaXhlbCgpPC9jb2RlPiBvciA8Y29kZT5zZXRQaXhlbDMyKCk8L2NvZGU+IG1ldGhvZCByZXBlYXRlZGx5LFxyXG5cdCAqIGNhbGwgdGhlIDxjb2RlPmxvY2soKTwvY29kZT4gbWV0aG9kIGJlZm9yZSB5b3UgY2FsbCB0aGVcclxuXHQgKiA8Y29kZT5zZXRQaXhlbCgpPC9jb2RlPiBvciA8Y29kZT5zZXRQaXhlbDMyKCk8L2NvZGU+IG1ldGhvZCwgYW5kIHRoZW4gY2FsbFxyXG5cdCAqIHRoZSA8Y29kZT51bmxvY2soKTwvY29kZT4gbWV0aG9kIHdoZW4geW91IGhhdmUgbWFkZSBhbGwgcGl4ZWwgY2hhbmdlcy5cclxuXHQgKiBUaGlzIHByb2Nlc3MgcHJldmVudHMgb2JqZWN0cyB0aGF0IHJlZmVyZW5jZSB0aGlzIEJpdG1hcERhdGEgaW5zdGFuY2UgZnJvbVxyXG5cdCAqIHVwZGF0aW5nIHVudGlsIHlvdSBmaW5pc2ggbWFraW5nIHRoZSBwaXhlbCBjaGFuZ2VzLjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB4ICAgICBUaGUgPGk+eDwvaT4gcG9zaXRpb24gb2YgdGhlIHBpeGVsIHdob3NlIHZhbHVlIGNoYW5nZXMuXHJcblx0ICogQHBhcmFtIHkgICAgIFRoZSA8aT55PC9pPiBwb3NpdGlvbiBvZiB0aGUgcGl4ZWwgd2hvc2UgdmFsdWUgY2hhbmdlcy5cclxuXHQgKiBAcGFyYW0gY29sb3IgVGhlIHJlc3VsdGluZyBSR0IgY29sb3IgZm9yIHRoZSBwaXhlbC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0UGl4ZWwoeDpudW1iZXIsIHk6bnVtYmVyLCBjb2xvcjpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFyIGFyZ2I6bnVtYmVyW10gPSBDb2xvclV0aWxzLmZsb2F0MzJDb2xvclRvQVJHQihjb2xvcik7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpXHJcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuX3JlY3Qud2lkdGgsIHRoaXMuX3JlY3QuaGVpZ2h0KTtcclxuXHJcblx0XHR2YXIgaW5kZXg6bnVtYmVyID0gKHggKyB5KnRoaXMuX2ltYWdlQ2FudmFzLndpZHRoKSo0O1xyXG5cclxuXHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMF0gPSBhcmdiWzFdO1xyXG5cdFx0dGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAxXSA9IGFyZ2JbMl07XHJcblx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDJdID0gYXJnYlszXTtcclxuXHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgM10gPSAyNTU7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpIHtcclxuXHRcdFx0dGhpcy5fY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5faW1hZ2VEYXRhLCAwLCAwKTtcclxuXHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGNvbG9yIGFuZCBhbHBoYSB0cmFuc3BhcmVuY3kgdmFsdWVzIG9mIGEgc2luZ2xlIHBpeGVsIG9mIGFcclxuXHQgKiBCaXRtYXBEYXRhIG9iamVjdC4gVGhpcyBtZXRob2QgaXMgc2ltaWxhciB0byB0aGUgPGNvZGU+c2V0UGl4ZWwoKTwvY29kZT5cclxuXHQgKiBtZXRob2Q7IHRoZSBtYWluIGRpZmZlcmVuY2UgaXMgdGhhdCB0aGUgPGNvZGU+c2V0UGl4ZWwzMigpPC9jb2RlPiBtZXRob2RcclxuXHQgKiB0YWtlcyBhbiBBUkdCIGNvbG9yIHZhbHVlIHRoYXQgY29udGFpbnMgYWxwaGEgY2hhbm5lbCBpbmZvcm1hdGlvbi5cclxuXHQgKlxyXG5cdCAqIDxwPkFsbCBwaXhlbHMgaW4gYSBCaXRtYXBEYXRhIG9iamVjdCBhcmUgc3RvcmVkIGFzIHByZW11bHRpcGxpZWQgY29sb3JcclxuXHQgKiB2YWx1ZXMuIEEgcHJlbXVsdGlwbGllZCBpbWFnZSBwaXhlbCBoYXMgdGhlIHJlZCwgZ3JlZW4sIGFuZCBibHVlIGNvbG9yXHJcblx0ICogY2hhbm5lbCB2YWx1ZXMgYWxyZWFkeSBtdWx0aXBsaWVkIGJ5IHRoZSBhbHBoYSBkYXRhLiBGb3IgZXhhbXBsZSwgaWYgdGhlXHJcblx0ICogYWxwaGEgdmFsdWUgaXMgMCwgdGhlIHZhbHVlcyBmb3IgdGhlIFJHQiBjaGFubmVscyBhcmUgYWxzbyAwLCBpbmRlcGVuZGVudFxyXG5cdCAqIG9mIHRoZWlyIHVubXVsdGlwbGllZCB2YWx1ZXMuIFRoaXMgbG9zcyBvZiBkYXRhIGNhbiBjYXVzZSBzb21lIHByb2JsZW1zXHJcblx0ICogd2hlbiB5b3UgcGVyZm9ybSBvcGVyYXRpb25zLiBBbGwgQml0bWFwRGF0YSBtZXRob2RzIHRha2UgYW5kIHJldHVyblxyXG5cdCAqIHVubXVsdGlwbGllZCB2YWx1ZXMuIFRoZSBpbnRlcm5hbCBwaXhlbCByZXByZXNlbnRhdGlvbiBpcyBjb252ZXJ0ZWQgZnJvbVxyXG5cdCAqIHByZW11bHRpcGxpZWQgdG8gdW5tdWx0aXBsaWVkIGJlZm9yZSBpdCBpcyByZXR1cm5lZCBhcyBhIHZhbHVlLiBEdXJpbmcgYVxyXG5cdCAqIHNldCBvcGVyYXRpb24sIHRoZSBwaXhlbCB2YWx1ZSBpcyBwcmVtdWx0aXBsaWVkIGJlZm9yZSB0aGUgcmF3IGltYWdlIHBpeGVsXHJcblx0ICogaXMgc2V0LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBUbyBpbmNyZWFzZSBwZXJmb3JtYW5jZSwgd2hlbiB5b3UgdXNlIHRoZVxyXG5cdCAqIDxjb2RlPnNldFBpeGVsKCk8L2NvZGU+IG9yIDxjb2RlPnNldFBpeGVsMzIoKTwvY29kZT4gbWV0aG9kIHJlcGVhdGVkbHksXHJcblx0ICogY2FsbCB0aGUgPGNvZGU+bG9jaygpPC9jb2RlPiBtZXRob2QgYmVmb3JlIHlvdSBjYWxsIHRoZVxyXG5cdCAqIDxjb2RlPnNldFBpeGVsKCk8L2NvZGU+IG9yIDxjb2RlPnNldFBpeGVsMzIoKTwvY29kZT4gbWV0aG9kLCBhbmQgdGhlbiBjYWxsXHJcblx0ICogdGhlIDxjb2RlPnVubG9jaygpPC9jb2RlPiBtZXRob2Qgd2hlbiB5b3UgaGF2ZSBtYWRlIGFsbCBwaXhlbCBjaGFuZ2VzLlxyXG5cdCAqIFRoaXMgcHJvY2VzcyBwcmV2ZW50cyBvYmplY3RzIHRoYXQgcmVmZXJlbmNlIHRoaXMgQml0bWFwRGF0YSBpbnN0YW5jZSBmcm9tXHJcblx0ICogdXBkYXRpbmcgdW50aWwgeW91IGZpbmlzaCBtYWtpbmcgdGhlIHBpeGVsIGNoYW5nZXMuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHggICAgIFRoZSA8aT54PC9pPiBwb3NpdGlvbiBvZiB0aGUgcGl4ZWwgd2hvc2UgdmFsdWUgY2hhbmdlcy5cclxuXHQgKiBAcGFyYW0geSAgICAgVGhlIDxpPnk8L2k+IHBvc2l0aW9uIG9mIHRoZSBwaXhlbCB3aG9zZSB2YWx1ZSBjaGFuZ2VzLlxyXG5cdCAqIEBwYXJhbSBjb2xvciBUaGUgcmVzdWx0aW5nIEFSR0IgY29sb3IgZm9yIHRoZSBwaXhlbC4gSWYgdGhlIGJpdG1hcCBpc1xyXG5cdCAqICAgICAgICAgICAgICBvcGFxdWUobm90IHRyYW5zcGFyZW50KSwgdGhlIGFscGhhIHRyYW5zcGFyZW5jeSBwb3J0aW9uIG9mXHJcblx0ICogICAgICAgICAgICAgIHRoaXMgY29sb3IgdmFsdWUgaXMgaWdub3JlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0UGl4ZWwzMih4LCB5LCBjb2xvcjpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFyIGFyZ2I6bnVtYmVyW10gPSBDb2xvclV0aWxzLmZsb2F0MzJDb2xvclRvQVJHQihjb2xvcik7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpXHJcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuX3JlY3Qud2lkdGgsIHRoaXMuX3JlY3QuaGVpZ2h0KTtcclxuXHJcblx0XHR2YXIgaW5kZXg6bnVtYmVyID0gKHggKyB5KnRoaXMuX2ltYWdlQ2FudmFzLndpZHRoKSo0O1xyXG5cclxuXHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMF0gPSBhcmdiWzFdO1xyXG5cdFx0dGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAxXSA9IGFyZ2JbMl07XHJcblx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDJdID0gYXJnYlszXTtcclxuXHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgM10gPSBhcmdiWzBdO1xyXG5cclxuXHRcdGlmICghdGhpcy5fbG9ja2VkKSB7XHJcblx0XHRcdHRoaXMuX2NvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuX2ltYWdlRGF0YSwgMCwgMCk7XHJcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0cyBhIGJ5dGUgYXJyYXkgaW50byBhIHJlY3Rhbmd1bGFyIHJlZ2lvbiBvZiBwaXhlbCBkYXRhLiBGb3IgZWFjaFxyXG5cdCAqIHBpeGVsLCB0aGUgPGNvZGU+Qnl0ZUFycmF5LnJlYWRVbnNpZ25lZEludCgpPC9jb2RlPiBtZXRob2QgaXMgY2FsbGVkIGFuZFxyXG5cdCAqIHRoZSByZXR1cm4gdmFsdWUgaXMgd3JpdHRlbiBpbnRvIHRoZSBwaXhlbC4gSWYgdGhlIGJ5dGUgYXJyYXkgZW5kcyBiZWZvcmVcclxuXHQgKiB0aGUgZnVsbCByZWN0YW5nbGUgaXMgd3JpdHRlbiwgdGhlIGZ1bmN0aW9uIHJldHVybnMuIFRoZSBkYXRhIGluIHRoZSBieXRlXHJcblx0ICogYXJyYXkgaXMgZXhwZWN0ZWQgdG8gYmUgMzItYml0IEFSR0IgcGl4ZWwgdmFsdWVzLiBObyBzZWVraW5nIGlzIHBlcmZvcm1lZFxyXG5cdCAqIG9uIHRoZSBieXRlIGFycmF5IGJlZm9yZSBvciBhZnRlciB0aGUgcGl4ZWxzIGFyZSByZWFkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHJlY3QgICAgICAgICAgIFNwZWNpZmllcyB0aGUgcmVjdGFuZ3VsYXIgcmVnaW9uIG9mIHRoZSBCaXRtYXBEYXRhXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5cclxuXHQgKiBAcGFyYW0gaW5wdXRCeXRlQXJyYXkgQSBCeXRlQXJyYXkgb2JqZWN0IHRoYXQgY29uc2lzdHMgb2YgMzItYml0XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHVubXVsdGlwbGllZCBwaXhlbCB2YWx1ZXMgdG8gYmUgdXNlZCBpbiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcmVjdGFuZ3VsYXIgcmVnaW9uLlxyXG5cdCAqIEB0aHJvd3MgRU9GRXJyb3IgIFRoZSA8Y29kZT5pbnB1dEJ5dGVBcnJheTwvY29kZT4gb2JqZWN0IGRvZXMgbm90IGluY2x1ZGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICBlbm91Z2ggZGF0YSB0byBmaWxsIHRoZSBhcmVhIG9mIHRoZSA8Y29kZT5yZWN0PC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgICAgIHJlY3RhbmdsZS4gVGhlIG1ldGhvZCBmaWxscyBhcyBtYW55IHBpeGVscyBhcyBwb3NzaWJsZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgIGJlZm9yZSB0aHJvd2luZyB0aGUgZXhjZXB0aW9uLlxyXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yIFRoZSByZWN0IG9yIGlucHV0Qnl0ZUFycmF5IGFyZSBudWxsLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXRQaXhlbHMocmVjdDpSZWN0YW5nbGUsIGlucHV0Qnl0ZUFycmF5OkJ5dGVBcnJheSlcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX2xvY2tlZClcclxuXHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5fcmVjdC53aWR0aCwgdGhpcy5fcmVjdC5oZWlnaHQpO1xyXG5cclxuXHRcdGlucHV0Qnl0ZUFycmF5LnBvc2l0aW9uID0gMDtcclxuXHRcdHZhciBpOm51bWJlciAvKnVpbnQqLywgajpudW1iZXIgLyp1aW50Ki8sIGluZGV4Om51bWJlciAvKnVpbnQqLztcclxuXHRcdGZvciAoaSA9IDA7IGkgPCByZWN0LndpZHRoOyArK2kpIHtcclxuXHRcdFx0Zm9yIChqID0gMDsgaiA8IHJlY3QuaGVpZ2h0OyArK2opIHtcclxuXHRcdFx0XHRpbmRleCA9IChpICsgcmVjdC54ICsgKGogKyByZWN0LnkpKnRoaXMuX2ltYWdlQ2FudmFzLndpZHRoKSo0O1xyXG5cclxuXHRcdFx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDBdID0gaW5wdXRCeXRlQXJyYXkucmVhZFVuc2lnbmVkSW50KCk7XHJcblx0XHRcdFx0dGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAxXSA9IGlucHV0Qnl0ZUFycmF5LnJlYWRVbnNpZ25lZEludCgpO1xyXG5cdFx0XHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMl0gPSBpbnB1dEJ5dGVBcnJheS5yZWFkVW5zaWduZWRJbnQoKTtcclxuXHRcdFx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID0gaW5wdXRCeXRlQXJyYXkucmVhZFVuc2lnbmVkSW50KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMuX2xvY2tlZCkge1xyXG5cdFx0XHR0aGlzLl9jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLl9pbWFnZURhdGEsIDAsIDApO1xyXG5cdFx0XHR0aGlzLl9pbWFnZURhdGEgPSBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVW5sb2NrcyBhbiBpbWFnZSBzbyB0aGF0IGFueSBvYmplY3RzIHRoYXQgcmVmZXJlbmNlIHRoZSBCaXRtYXBEYXRhIG9iamVjdCxcclxuXHQgKiBzdWNoIGFzIEJpdG1hcCBvYmplY3RzLCBhcmUgdXBkYXRlZCB3aGVuIHRoaXMgQml0bWFwRGF0YSBvYmplY3QgY2hhbmdlcy5cclxuXHQgKiBUbyBpbXByb3ZlIHBlcmZvcm1hbmNlLCB1c2UgdGhpcyBtZXRob2QgYWxvbmcgd2l0aCB0aGUgPGNvZGU+bG9jaygpPC9jb2RlPlxyXG5cdCAqIG1ldGhvZCBiZWZvcmUgYW5kIGFmdGVyIG51bWVyb3VzIGNhbGxzIHRvIHRoZSA8Y29kZT5zZXRQaXhlbCgpPC9jb2RlPiBvclxyXG5cdCAqIDxjb2RlPnNldFBpeGVsMzIoKTwvY29kZT4gbWV0aG9kLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGNoYW5nZVJlY3QgVGhlIGFyZWEgb2YgdGhlIEJpdG1hcERhdGEgb2JqZWN0IHRoYXQgaGFzIGNoYW5nZWQuIElmXHJcblx0ICogICAgICAgICAgICAgICAgICAgeW91IGRvIG5vdCBzcGVjaWZ5IGEgdmFsdWUgZm9yIHRoaXMgcGFyYW1ldGVyLCB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICBlbnRpcmUgYXJlYSBvZiB0aGUgQml0bWFwRGF0YSBvYmplY3QgaXMgY29uc2lkZXJlZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgIGNoYW5nZWQuXHJcblx0ICovXHJcblx0cHVibGljIHVubG9jaygpXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9sb2NrZWQgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLl9jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLl9pbWFnZURhdGEsIDAsIDApOyAvLyBhdCBjb29yZHMgMCwwXHJcblx0XHR0aGlzLl9pbWFnZURhdGEgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBfY29weVBpeGVscyhibXBkOkJpdG1hcERhdGEsIHNvdXJjZVJlY3Q6UmVjdGFuZ2xlLCBkZXN0UmVjdDpSZWN0YW5nbGUpO1xyXG5cdHByaXZhdGUgX2NvcHlQaXhlbHMoYm1wZDpIVE1MSW1hZ2VFbGVtZW50LCBzb3VyY2VSZWN0OlJlY3RhbmdsZSwgZGVzdFJlY3Q6UmVjdGFuZ2xlKTtcclxuXHRwcml2YXRlIF9jb3B5UGl4ZWxzKGJtcGQ6YW55LCBzb3VyY2VSZWN0OlJlY3RhbmdsZSwgZGVzdFJlY3Q6UmVjdGFuZ2xlKVxyXG5cdHtcclxuXHJcblx0XHRpZiAoYm1wZCBpbnN0YW5jZW9mIEJpdG1hcERhdGEpIHtcclxuXHRcdFx0dGhpcy5fY29udGV4dC5kcmF3SW1hZ2UoYm1wZC5jYW52YXMsIHNvdXJjZVJlY3QueCwgc291cmNlUmVjdC55LCBzb3VyY2VSZWN0LndpZHRoLCBzb3VyY2VSZWN0LmhlaWdodCwgZGVzdFJlY3QueCwgZGVzdFJlY3QueSwgZGVzdFJlY3Qud2lkdGgsIGRlc3RSZWN0LmhlaWdodCk7XHJcblx0XHR9IGVsc2UgaWYgKGJtcGQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XHJcblx0XHRcdHRoaXMuX2NvbnRleHQuZHJhd0ltYWdlKGJtcGQsIHNvdXJjZVJlY3QueCwgc291cmNlUmVjdC55LCBzb3VyY2VSZWN0LndpZHRoLCBzb3VyY2VSZWN0LmhlaWdodCwgZGVzdFJlY3QueCwgZGVzdFJlY3QueSwgZGVzdFJlY3Qud2lkdGgsIGRlc3RSZWN0LmhlaWdodCk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBfZHJhdyhzb3VyY2U6Qml0bWFwRGF0YSwgbWF0cml4Ok1hdHJpeCwgY29sb3JUcmFuc2Zvcm06Q29sb3JUcmFuc2Zvcm0sIGJsZW5kTW9kZTpCbGVuZE1vZGUsIGNsaXBSZWN0OlJlY3RhbmdsZSwgc21vb3RoaW5nOmJvb2xlYW4pO1xyXG5cdHByaXZhdGUgX2RyYXcoc291cmNlOkhUTUxFbGVtZW50LCBtYXRyaXg6TWF0cml4LCBjb2xvclRyYW5zZm9ybTpDb2xvclRyYW5zZm9ybSwgYmxlbmRNb2RlOkJsZW5kTW9kZSwgY2xpcFJlY3Q6UmVjdGFuZ2xlLCBzbW9vdGhpbmc6Ym9vbGVhbik7XHJcblx0cHJpdmF0ZSBfZHJhdyhzb3VyY2U6YW55LCBtYXRyaXg6TWF0cml4LCBjb2xvclRyYW5zZm9ybTpDb2xvclRyYW5zZm9ybSwgYmxlbmRNb2RlOkJsZW5kTW9kZSwgY2xpcFJlY3Q6UmVjdGFuZ2xlLCBzbW9vdGhpbmc6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAoc291cmNlIGluc3RhbmNlb2YgQml0bWFwRGF0YSkge1xyXG5cdFx0XHR0aGlzLl9jb250ZXh0LnNhdmUoKTtcclxuXHJcblx0XHRcdGlmIChtYXRyaXggIT0gbnVsbClcclxuXHRcdFx0XHR0aGlzLl9jb250ZXh0LnNldFRyYW5zZm9ybShtYXRyaXguYSwgbWF0cml4LmIsIG1hdHJpeC5jLCBtYXRyaXguZCwgbWF0cml4LnR4LCBtYXRyaXgudHkpO1xyXG5cclxuXHRcdFx0aWYgKGNsaXBSZWN0ICE9IG51bGwpXHJcblx0XHRcdFx0dGhpcy5fY29udGV4dC5kcmF3SW1hZ2Uoc291cmNlLmNhbnZhcywgY2xpcFJlY3QueCwgY2xpcFJlY3QueSwgY2xpcFJlY3Qud2lkdGgsIGNsaXBSZWN0LmhlaWdodCk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR0aGlzLl9jb250ZXh0LmRyYXdJbWFnZShzb3VyY2UuY2FudmFzLCAwLCAwKTtcclxuXHJcblx0XHRcdHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoc291cmNlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0dGhpcy5fY29udGV4dC5zYXZlKCk7XHJcblxyXG5cdFx0XHRpZiAobWF0cml4ICE9IG51bGwpXHJcblx0XHRcdFx0dGhpcy5fY29udGV4dC5zZXRUcmFuc2Zvcm0obWF0cml4LmEsIG1hdHJpeC5iLCBtYXRyaXguYywgbWF0cml4LmQsIG1hdHJpeC50eCwgbWF0cml4LnR5KTtcclxuXHJcblx0XHRcdGlmIChjbGlwUmVjdCAhPSBudWxsKVxyXG5cdFx0XHRcdHRoaXMuX2NvbnRleHQuZHJhd0ltYWdlKHNvdXJjZSwgY2xpcFJlY3QueCwgY2xpcFJlY3QueSwgY2xpcFJlY3Qud2lkdGgsIGNsaXBSZWN0LmhlaWdodCk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR0aGlzLl9jb250ZXh0LmRyYXdJbWFnZShzb3VyY2UsIDAsIDApO1xyXG5cclxuXHRcdFx0dGhpcy5fY29udGV4dC5yZXN0b3JlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIF9maWxsUmVjdChyZWN0OlJlY3RhbmdsZSwgY29sb3I6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmIChjb2xvciA9PSAweDAgJiYgdGhpcy5fdHJhbnNwYXJlbnQpIHtcclxuXHRcdFx0dGhpcy5fY29udGV4dC5jbGVhclJlY3QocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBhcmdiOm51bWJlcltdID0gQ29sb3JVdGlscy5mbG9hdDMyQ29sb3JUb0FSR0IoY29sb3IpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuX3RyYW5zcGFyZW50KVxyXG5cdFx0XHRcdHRoaXMuX2NvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoJyArIGFyZ2JbMV0gKyAnLCcgKyBhcmdiWzJdICsgJywnICsgYXJnYlszXSArICcsJyArIGFyZ2JbMF0vMjU1ICsgJyknO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgnICsgYXJnYlsxXSArICcsJyArIGFyZ2JbMl0gKyAnLCcgKyBhcmdiWzNdICsgJywxKSc7XHJcblxyXG5cdFx0XHR0aGlzLl9jb250ZXh0LmZpbGxSZWN0KHJlY3QueCwgcmVjdC55LCByZWN0LndpZHRoLCByZWN0LmhlaWdodCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtJbWFnZURhdGF9XHJcblx0ICovXHJcblx0cHVibGljIGdldCBpbWFnZURhdGEoKTpJbWFnZURhdGFcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX2xvY2tlZClcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuX3JlY3Qud2lkdGgsIHRoaXMuX3JlY3QuaGVpZ2h0KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5faW1hZ2VEYXRhO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7SFRNTENhbnZhc0VsZW1lbnR9XHJcblx0ICovXHJcblx0cHVibGljIGdldCBjYW52YXMoKVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9pbWFnZUNhbnZhcztcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IEJpdG1hcERhdGE7Il19