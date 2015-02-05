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
        else if (source instanceof HTMLImageElement) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9iYXNlL2JpdG1hcGRhdGEudHMiXSwibmFtZXMiOlsiQml0bWFwRGF0YSIsIkJpdG1hcERhdGEuY29uc3RydWN0b3IiLCJCaXRtYXBEYXRhLmhlaWdodCIsIkJpdG1hcERhdGEucmVjdCIsIkJpdG1hcERhdGEudHJhbnNwYXJlbnQiLCJCaXRtYXBEYXRhLndpZHRoIiwiQml0bWFwRGF0YS5jbG9uZSIsIkJpdG1hcERhdGEuY29sb3JUcmFuc2Zvcm0iLCJCaXRtYXBEYXRhLmNvcHlDaGFubmVsIiwiQml0bWFwRGF0YS5jb3B5UGl4ZWxzIiwiQml0bWFwRGF0YS5kaXNwb3NlIiwiQml0bWFwRGF0YS5kcmF3IiwiQml0bWFwRGF0YS5maWxsUmVjdCIsIkJpdG1hcERhdGEuZ2V0UGl4ZWwiLCJCaXRtYXBEYXRhLmdldFBpeGVsMzIiLCJCaXRtYXBEYXRhLmxvY2siLCJCaXRtYXBEYXRhLnNldEFycmF5IiwiQml0bWFwRGF0YS5zZXRQaXhlbCIsIkJpdG1hcERhdGEuc2V0UGl4ZWwzMiIsIkJpdG1hcERhdGEuc2V0UGl4ZWxzIiwiQml0bWFwRGF0YS51bmxvY2siLCJCaXRtYXBEYXRhLl9jb3B5UGl4ZWxzIiwiQml0bWFwRGF0YS5fZHJhdyIsIkJpdG1hcERhdGEuX2ZpbGxSZWN0IiwiQml0bWFwRGF0YS5pbWFnZURhdGEiLCJCaXRtYXBEYXRhLmNhbnZhcyJdLCJtYXBwaW5ncyI6IkFBR0EsSUFBTyxTQUFTLFdBQWMsZ0NBQWdDLENBQUMsQ0FBQztBQUdoRSxJQUFPLFVBQVUsV0FBYyxrQ0FBa0MsQ0FBQyxDQUFDO0FBRW5FLEFBeURBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQURHO0lBQ0csVUFBVTtJQXFGZkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCR0E7SUFDSEEsU0FqSEtBLFVBQVVBLENBaUhIQSxLQUFZQSxFQUFFQSxNQUFhQSxFQUFFQSxXQUEwQkEs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RUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDakJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBRXpGQSxJQUFJQSxJQUFJQSxHQUFpQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFFOUNBLElBQUlBLENBQUNBLENBQVFBLFFBQURBLEFBQVNBLEVBQUVBLENBQUNBLENBQVFBLFFBQURBLEFBQVNBLEVBQUVBLEtBQUtBLENBQVFBLFFBQURBLEFBQVNBLENBQUNBO1FBQ2hFQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNqQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQ2xDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtnQkFFakRBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUNBLGNBQWNBLENBQUNBLGFBQWFBLEdBQUdBLGNBQWNBLENBQUNBLFNBQVNBLENBQUNBO2dCQUNsRkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsY0FBY0EsQ0FBQ0EsZUFBZUEsR0FBR0EsY0FBY0EsQ0FBQ0EsV0FBV0EsQ0FBQ0E7Z0JBQzlGQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxjQUFjQSxDQUFDQSxjQUFjQSxHQUFHQSxjQUFjQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFDNUZBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLGNBQWNBLENBQUNBLGVBQWVBLEdBQUdBLGNBQWNBLENBQUNBLFdBQVdBLENBQUNBO1lBQy9GQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNuQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbERBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3hCQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUVEUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMENHQTtJQUNJQSxnQ0FBV0EsR0FBbEJBLFVBQW1CQSxZQUF1QkEsRUFBRUEsVUFBb0JBLEVBQUVBLFNBQWVBLEVBQUVBLGFBQW9CQSxFQUFFQSxXQUFrQkE7UUFFMUhRLElBQUlBLFNBQVNBLEdBQWFBLFlBQVlBLENBQUNBLFNBQVNBLENBQUNBO1FBRWpEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUNqQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFFekZBLElBQUlBLFVBQVVBLEdBQWlCQSxZQUFZQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUMzREEsSUFBSUEsUUFBUUEsR0FBaUJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBO1FBRWxEQSxJQUFJQSxZQUFZQSxHQUFVQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxhQUFhQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMxRUEsSUFBSUEsVUFBVUEsR0FBVUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFdEVBLElBQUlBLENBQUNBLENBQVFBLFFBQURBLEFBQVNBLEVBQUVBLENBQUNBLENBQVFBLFFBQURBLEFBQVNBLEVBQUVBLFdBQVdBLENBQVFBLFFBQURBLEFBQVNBLEVBQUVBLFNBQVNBLENBQVFBLFFBQURBLEFBQVNBLENBQUNBO1FBQ2pHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxVQUFVQSxDQUFDQSxLQUFLQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUN2Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsVUFBVUEsQ0FBQ0EsTUFBTUEsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEs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Q0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFakVBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RCQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN0QkEsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBRXZCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxJQUFJQSxLQUFLQSxHQUFVQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtZQUVyREEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDcENBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQ3BDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNwQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDckNBLENBQUNBO1FBRURBLEFBQ0FBLG9DQURvQ0E7UUFDcENBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ05BLE1BQU1BLENBQUNBLEdBQUdB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QUlBLENBQUNBLE9BQU9BLENBQUNBO1lBQ2pCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUV6RkEsSUFBSUEsQ0FBQ0EsQ0FBUUEsUUFBREEsQUFBU0EsRUFBRUEsQ0FBQ0EsQ0FBUUEsUUFBREEsQUFBU0EsRUFBRUEsS0FBS0EsQ0FBUUEsUUFBREEsQUFBU0EsRUFBRUEsSUFBSUEsQ0FBVUEsUUFBREEsQUFBU0EsQ0FBQ0E7UUFDeEZBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ2pDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDbENBLElBQUlBLEdBQUdBLFVBQVVBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25FQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtnQkFFOURBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDMUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzNDQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNuQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbERBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3hCQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUVEaEI7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkdBO0lBQ0lBLDZCQUFRQSxHQUFmQSxVQUFnQkEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsS0FBWUE7UUFFL0NpQixJQUFJQSxJQUFJQSxHQUFZQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBRXpEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUNqQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFFekZBLElBQUlBLEtBQUtBLEdBQVVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1FBRXJEQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMxQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDMUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtRQUV0Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbkJBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQ2xEQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUN4QkEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFRGpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4QkdBO0lBQ0lBLCtCQUFVQSxHQUFqQkEsVUFBa0JBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEtBQVlBO1FBRW5Da0IsSUFBSUEsSUFBSUEsR0FBWUEsVUFBVUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUV6REEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDakJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBRXpGQSxJQUFJQSxLQUFLQSxHQUFVQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtRQUVyREEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDMUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMxQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFMUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO1lBQ25CQSxJ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QSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtnQkFDakJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBRTlFQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUN4QkEsQ0FBQ0E7OztPQUFBeEI7SUFNREEsc0JBQVdBLDhCQUFNQTtRQUpqQkE7OztXQUdHQTthQUNIQTtZQUVDeUIsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7UUFDMUJBLENBQUNBOzs7T0FBQXpCO0lBQ0ZBLGlCQUFDQTtBQUFEQSxDQXYxQkEsQUF1MUJDQSxJQUFBO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6ImJhc2UvQml0bWFwRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmxlbmRNb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvYmFzZS9CbGVuZE1vZGVcIik7XG5pbXBvcnQgQ29sb3JUcmFuc2Zvcm1cdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Db2xvclRyYW5zZm9ybVwiKTtcbmltcG9ydCBNYXRyaXhcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4XCIpO1xuaW1wb3J0IFJlY3RhbmdsZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUmVjdGFuZ2xlXCIpO1xuaW1wb3J0IFBvaW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1BvaW50XCIpO1xuaW1wb3J0IEJ5dGVBcnJheVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL0J5dGVBcnJheVwiKTtcbmltcG9ydCBDb2xvclV0aWxzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvQ29sb3JVdGlsc1wiKTtcblxuLyoqXG4gKiBUaGUgQml0bWFwRGF0YSBjbGFzcyBsZXRzIHlvdSB3b3JrIHdpdGggdGhlIGRhdGEocGl4ZWxzKSBvZiBhIEJpdG1hcFxuICogb2JqZWN0LiBZb3UgY2FuIHVzZSB0aGUgbWV0aG9kcyBvZiB0aGUgQml0bWFwRGF0YSBjbGFzcyB0byBjcmVhdGVcbiAqIGFyYml0cmFyaWx5IHNpemVkIHRyYW5zcGFyZW50IG9yIG9wYXF1ZSBiaXRtYXAgaW1hZ2VzIGFuZCBtYW5pcHVsYXRlIHRoZW1cbiAqIGluIHZhcmlvdXMgd2F5cyBhdCBydW50aW1lLiBZb3UgY2FuIGFsc28gYWNjZXNzIHRoZSBCaXRtYXBEYXRhIGZvciBhIGJpdG1hcFxuICogaW1hZ2UgdGhhdCB5b3UgbG9hZCB3aXRoIHRoZSA8Y29kZT5mbGFzaC5Bc3NldHM8L2NvZGU+IG9yXG4gKiA8Y29kZT5mbGFzaC5kaXNwbGF5LkxvYWRlcjwvY29kZT4gY2xhc3Nlcy5cbiAqXG4gKiA8cD5UaGlzIGNsYXNzIGxldHMgeW91IHNlcGFyYXRlIGJpdG1hcCByZW5kZXJpbmcgb3BlcmF0aW9ucyBmcm9tIHRoZVxuICogaW50ZXJuYWwgZGlzcGxheSB1cGRhdGluZyByb3V0aW5lcyBvZiBmbGFzaC4gQnkgbWFuaXB1bGF0aW5nIGFcbiAqIEJpdG1hcERhdGEgb2JqZWN0IGRpcmVjdGx5LCB5b3UgY2FuIGNyZWF0ZSBjb21wbGV4IGltYWdlcyB3aXRob3V0IGluY3VycmluZ1xuICogdGhlIHBlci1mcmFtZSBvdmVyaGVhZCBvZiBjb25zdGFudGx5IHJlZHJhd2luZyB0aGUgY29udGVudCBmcm9tIHZlY3RvclxuICogZGF0YS48L3A+XG4gKlxuICogPHA+VGhlIG1ldGhvZHMgb2YgdGhlIEJpdG1hcERhdGEgY2xhc3Mgc3VwcG9ydCBlZmZlY3RzIHRoYXQgYXJlIG5vdFxuICogYXZhaWxhYmxlIHRocm91Z2ggdGhlIGZpbHRlcnMgYXZhaWxhYmxlIHRvIG5vbi1iaXRtYXAgZGlzcGxheSBvYmplY3RzLjwvcD5cbiAqXG4gKiA8cD5BIEJpdG1hcERhdGEgb2JqZWN0IGNvbnRhaW5zIGFuIGFycmF5IG9mIHBpeGVsIGRhdGEuIFRoaXMgZGF0YSBjYW5cbiAqIHJlcHJlc2VudCBlaXRoZXIgYSBmdWxseSBvcGFxdWUgYml0bWFwIG9yIGEgdHJhbnNwYXJlbnQgYml0bWFwIHRoYXRcbiAqIGNvbnRhaW5zIGFscGhhIGNoYW5uZWwgZGF0YS4gRWl0aGVyIHR5cGUgb2YgQml0bWFwRGF0YSBvYmplY3QgaXMgc3RvcmVkIGFzXG4gKiBhIGJ1ZmZlciBvZiAzMi1iaXQgaW50ZWdlcnMuIEVhY2ggMzItYml0IGludGVnZXIgZGV0ZXJtaW5lcyB0aGUgcHJvcGVydGllc1xuICogb2YgYSBzaW5nbGUgcGl4ZWwgaW4gdGhlIGJpdG1hcC48L3A+XG4gKlxuICogPHA+RWFjaCAzMi1iaXQgaW50ZWdlciBpcyBhIGNvbWJpbmF0aW9uIG9mIGZvdXIgOC1iaXQgY2hhbm5lbCB2YWx1ZXMoZnJvbVxuICogMCB0byAyNTUpIHRoYXQgZGVzY3JpYmUgdGhlIGFscGhhIHRyYW5zcGFyZW5jeSBhbmQgdGhlIHJlZCwgZ3JlZW4sIGFuZCBibHVlXG4gKiAoQVJHQikgdmFsdWVzIG9mIHRoZSBwaXhlbC4oRm9yIEFSR0IgdmFsdWVzLCB0aGUgbW9zdCBzaWduaWZpY2FudCBieXRlXG4gKiByZXByZXNlbnRzIHRoZSBhbHBoYSBjaGFubmVsIHZhbHVlLCBmb2xsb3dlZCBieSByZWQsIGdyZWVuLCBhbmQgYmx1ZS4pPC9wPlxuICpcbiAqIDxwPlRoZSBmb3VyIGNoYW5uZWxzKGFscGhhLCByZWQsIGdyZWVuLCBhbmQgYmx1ZSkgYXJlIHJlcHJlc2VudGVkIGFzXG4gKiBudW1iZXJzIHdoZW4geW91IHVzZSB0aGVtIHdpdGggdGhlIDxjb2RlPkJpdG1hcERhdGEuY29weUNoYW5uZWwoKTwvY29kZT5cbiAqIG1ldGhvZCBvciB0aGUgPGNvZGU+RGlzcGxhY2VtZW50TWFwRmlsdGVyLmNvbXBvbmVudFg8L2NvZGU+IGFuZFxuICogPGNvZGU+RGlzcGxhY2VtZW50TWFwRmlsdGVyLmNvbXBvbmVudFk8L2NvZGU+IHByb3BlcnRpZXMsIGFuZCB0aGVzZSBudW1iZXJzXG4gKiBhcmUgcmVwcmVzZW50ZWQgYnkgdGhlIGZvbGxvd2luZyBjb25zdGFudHMgaW4gdGhlIEJpdG1hcERhdGFDaGFubmVsXG4gKiBjbGFzczo8L3A+XG4gKlxuICogPHVsPlxuICogICA8bGk+PGNvZGU+Qml0bWFwRGF0YUNoYW5uZWwuQUxQSEE8L2NvZGU+PC9saT5cbiAqICAgPGxpPjxjb2RlPkJpdG1hcERhdGFDaGFubmVsLlJFRDwvY29kZT48L2xpPlxuICogICA8bGk+PGNvZGU+Qml0bWFwRGF0YUNoYW5uZWwuR1JFRU48L2NvZGU+PC9saT5cbiAqICAgPGxpPjxjb2RlPkJpdG1hcERhdGFDaGFubmVsLkJMVUU8L2NvZGU+PC9saT5cbiAqIDwvdWw+XG4gKlxuICogPHA+WW91IGNhbiBhdHRhY2ggQml0bWFwRGF0YSBvYmplY3RzIHRvIGEgQml0bWFwIG9iamVjdCBieSB1c2luZyB0aGVcbiAqIDxjb2RlPmJpdG1hcERhdGE8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBCaXRtYXAgb2JqZWN0LjwvcD5cbiAqXG4gKiA8cD5Zb3UgY2FuIHVzZSBhIEJpdG1hcERhdGEgb2JqZWN0IHRvIGZpbGwgYSBHcmFwaGljcyBvYmplY3QgYnkgdXNpbmcgdGhlXG4gKiA8Y29kZT5HcmFwaGljcy5iZWdpbkJpdG1hcEZpbGwoKTwvY29kZT4gbWV0aG9kLjwvcD5cbiAqXG4gKiA8cD5Zb3UgY2FuIGFsc28gdXNlIGEgQml0bWFwRGF0YSBvYmplY3QgdG8gcGVyZm9ybSBiYXRjaCB0aWxlIHJlbmRlcmluZ1xuICogdXNpbmcgdGhlIDxjb2RlPmZsYXNoLmRpc3BsYXkuVGlsZXNoZWV0PC9jb2RlPiBjbGFzcy48L3A+XG4gKlxuICogPHA+SW4gRmxhc2ggUGxheWVyIDEwLCB0aGUgbWF4aW11bSBzaXplIGZvciBhIEJpdG1hcERhdGEgb2JqZWN0XG4gKiBpcyA4LDE5MSBwaXhlbHMgaW4gd2lkdGggb3IgaGVpZ2h0LCBhbmQgdGhlIHRvdGFsIG51bWJlciBvZiBwaXhlbHMgY2Fubm90XG4gKiBleGNlZWQgMTYsNzc3LDIxNSBwaXhlbHMuKFNvLCBpZiBhIEJpdG1hcERhdGEgb2JqZWN0IGlzIDgsMTkxIHBpeGVscyB3aWRlLFxuICogaXQgY2FuIG9ubHkgYmUgMiwwNDggcGl4ZWxzIGhpZ2guKSBJbiBGbGFzaCBQbGF5ZXIgOSBhbmQgZWFybGllciwgdGhlIGxpbWl0YXRpb25cbiAqIGlzIDIsODgwIHBpeGVscyBpbiBoZWlnaHQgYW5kIDIsODgwIGluIHdpZHRoLjwvcD5cbiAqL1xuY2xhc3MgQml0bWFwRGF0YVxue1xuXHRwcml2YXRlIF9pbWFnZUNhbnZhczpIVE1MQ2FudmFzRWxlbWVudDtcblx0cHJpdmF0ZSBfY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cdHByaXZhdGUgX2ltYWdlRGF0YTpJbWFnZURhdGE7XG5cdHByaXZhdGUgX3JlY3Q6UmVjdGFuZ2xlO1xuXHRwcml2YXRlIF90cmFuc3BhcmVudDpib29sZWFuO1xuXHRwcml2YXRlIF9sb2NrZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVpZ2h0IG9mIHRoZSBiaXRtYXAgaW1hZ2UgaW4gcGl4ZWxzLlxuXHQgKi9cblx0cHVibGljIGdldCBoZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9yZWN0LmhlaWdodDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgaGVpZ2h0KHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9yZWN0LmhlaWdodCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3JlY3QuaGVpZ2h0ID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fbG9ja2VkKVxuXHRcdFx0dGhpcy5fY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5faW1hZ2VEYXRhLCAwLCAwKTtcblxuXHRcdHRoaXMuX2ltYWdlQ2FudmFzLmhlaWdodCA9IHZhbHVlO1xuXG5cdFx0aWYgKHRoaXMuX2xvY2tlZClcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuX3JlY3Qud2lkdGgsIHRoaXMuX3JlY3QuaGVpZ2h0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgc2l6ZSBhbmQgbG9jYXRpb24gb2YgdGhlIGJpdG1hcCBpbWFnZS4gVGhlXG5cdCAqIHRvcCBhbmQgbGVmdCBvZiB0aGUgcmVjdGFuZ2xlIGFyZSAwOyB0aGUgd2lkdGggYW5kIGhlaWdodCBhcmUgZXF1YWwgdG8gdGhlXG5cdCAqIHdpZHRoIGFuZCBoZWlnaHQgaW4gcGl4ZWxzIG9mIHRoZSBCaXRtYXBEYXRhIG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBnZXQgcmVjdCgpOlJlY3RhbmdsZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3JlY3Q7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB3aGV0aGVyIHRoZSBiaXRtYXAgaW1hZ2Ugc3VwcG9ydHMgcGVyLXBpeGVsIHRyYW5zcGFyZW5jeS4gWW91IGNhblxuXHQgKiBzZXQgdGhpcyB2YWx1ZSBvbmx5IHdoZW4geW91IGNvbnN0cnVjdCBhIEJpdG1hcERhdGEgb2JqZWN0IGJ5IHBhc3NpbmcgaW5cblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4gZm9yIHRoZSA8Y29kZT50cmFuc3BhcmVudDwvY29kZT4gcGFyYW1ldGVyIG9mIHRoZVxuXHQgKiBjb25zdHJ1Y3Rvci4gVGhlbiwgYWZ0ZXIgeW91IGNyZWF0ZSBhIEJpdG1hcERhdGEgb2JqZWN0LCB5b3UgY2FuIGNoZWNrXG5cdCAqIHdoZXRoZXIgaXQgc3VwcG9ydHMgcGVyLXBpeGVsIHRyYW5zcGFyZW5jeSBieSBkZXRlcm1pbmluZyBpZiB0aGUgdmFsdWUgb2Zcblx0ICogdGhlIDxjb2RlPnRyYW5zcGFyZW50PC9jb2RlPiBwcm9wZXJ0eSBpcyA8Y29kZT50cnVlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBnZXQgdHJhbnNwYXJlbnQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdHJhbnNwYXJlbnQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHRyYW5zcGFyZW50KHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl90cmFuc3BhcmVudCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB3aWR0aCBvZiB0aGUgYml0bWFwIGltYWdlIGluIHBpeGVscy5cblx0ICovXG5cdHB1YmxpYyBnZXQgd2lkdGgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9yZWN0LndpZHRoO1xuXHR9XG5cblx0cHVibGljIHNldCB3aWR0aCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fcmVjdC53aWR0aCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3JlY3Qud2lkdGggPSB2YWx1ZTtcblxuXHRcdGlmICh0aGlzLl9sb2NrZWQpXG5cdFx0XHR0aGlzLl9jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLl9pbWFnZURhdGEsIDAsIDApO1xuXG5cdFx0dGhpcy5faW1hZ2VDYW52YXMud2lkdGggPSB2YWx1ZTtcblxuXHRcdGlmICh0aGlzLl9sb2NrZWQpXG5cdFx0XHR0aGlzLl9pbWFnZURhdGEgPSB0aGlzLl9jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLl9yZWN0LndpZHRoLCB0aGlzLl9yZWN0LmhlaWdodCk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIEJpdG1hcERhdGEgb2JqZWN0IHdpdGggYSBzcGVjaWZpZWQgd2lkdGggYW5kIGhlaWdodC4gSWYgeW91XG5cdCAqIHNwZWNpZnkgYSB2YWx1ZSBmb3IgdGhlIDxjb2RlPmZpbGxDb2xvcjwvY29kZT4gcGFyYW1ldGVyLCBldmVyeSBwaXhlbCBpblxuXHQgKiB0aGUgYml0bWFwIGlzIHNldCB0byB0aGF0IGNvbG9yLlxuXHQgKlxuXHQgKiA8cD5CeSBkZWZhdWx0LCB0aGUgYml0bWFwIGlzIGNyZWF0ZWQgYXMgdHJhbnNwYXJlbnQsIHVubGVzcyB5b3UgcGFzc1xuXHQgKiB0aGUgdmFsdWUgPGNvZGU+ZmFsc2U8L2NvZGU+IGZvciB0aGUgdHJhbnNwYXJlbnQgcGFyYW1ldGVyLiBBZnRlciB5b3Vcblx0ICogY3JlYXRlIGFuIG9wYXF1ZSBiaXRtYXAsIHlvdSBjYW5ub3QgY2hhbmdlIGl0IHRvIGEgdHJhbnNwYXJlbnQgYml0bWFwLlxuXHQgKiBFdmVyeSBwaXhlbCBpbiBhbiBvcGFxdWUgYml0bWFwIHVzZXMgb25seSAyNCBiaXRzIG9mIGNvbG9yIGNoYW5uZWxcblx0ICogaW5mb3JtYXRpb24uIElmIHlvdSBkZWZpbmUgdGhlIGJpdG1hcCBhcyB0cmFuc3BhcmVudCwgZXZlcnkgcGl4ZWwgdXNlcyAzMlxuXHQgKiBiaXRzIG9mIGNvbG9yIGNoYW5uZWwgaW5mb3JtYXRpb24sIGluY2x1ZGluZyBhbiBhbHBoYSB0cmFuc3BhcmVuY3lcblx0ICogY2hhbm5lbC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSB3aWR0aCAgICAgICBUaGUgd2lkdGggb2YgdGhlIGJpdG1hcCBpbWFnZSBpbiBwaXhlbHMuXG5cdCAqIEBwYXJhbSBoZWlnaHQgICAgICBUaGUgaGVpZ2h0IG9mIHRoZSBiaXRtYXAgaW1hZ2UgaW4gcGl4ZWxzLlxuXHQgKiBAcGFyYW0gdHJhbnNwYXJlbnQgU3BlY2lmaWVzIHdoZXRoZXIgdGhlIGJpdG1hcCBpbWFnZSBzdXBwb3J0cyBwZXItcGl4ZWxcblx0ICogICAgICAgICAgICAgICAgICAgIHRyYW5zcGFyZW5jeS4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgPGNvZGU+dHJ1ZTwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICh0cmFuc3BhcmVudCkuIFRvIGNyZWF0ZSBhIGZ1bGx5IHRyYW5zcGFyZW50IGJpdG1hcCxcblx0ICogICAgICAgICAgICAgICAgICAgIHNldCB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPnRyYW5zcGFyZW50PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyIHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuZCB0aGUgdmFsdWUgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICA8Y29kZT5maWxsQ29sb3I8L2NvZGU+IHBhcmFtZXRlciB0byAweDAwMDAwMDAwKG9yIHRvXG5cdCAqICAgICAgICAgICAgICAgICAgICAwKS4gU2V0dGluZyB0aGUgPGNvZGU+dHJhbnNwYXJlbnQ8L2NvZGU+IHByb3BlcnR5IHRvXG5cdCAqICAgICAgICAgICAgICAgICAgICA8Y29kZT5mYWxzZTwvY29kZT4gY2FuIHJlc3VsdCBpbiBtaW5vciBpbXByb3ZlbWVudHNcblx0ICogICAgICAgICAgICAgICAgICAgIGluIHJlbmRlcmluZyBwZXJmb3JtYW5jZS5cblx0ICogQHBhcmFtIGZpbGxDb2xvciAgIEEgMzItYml0IEFSR0IgY29sb3IgdmFsdWUgdGhhdCB5b3UgdXNlIHRvIGZpbGwgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICBiaXRtYXAgaW1hZ2UgYXJlYS4gVGhlIGRlZmF1bHQgdmFsdWUgaXNcblx0ICogICAgICAgICAgICAgICAgICAgIDB4RkZGRkZGRkYoc29saWQgd2hpdGUpLlxuXHQgKi9cblx0Y29uc3RydWN0b3Iod2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyLCB0cmFuc3BhcmVudDpib29sZWFuID0gdHJ1ZSwgZmlsbENvbG9yOm51bWJlciA9IG51bGwpXG5cdHtcblx0XHR0aGlzLl90cmFuc3BhcmVudCA9IHRyYW5zcGFyZW50O1xuXHRcdHRoaXMuX2ltYWdlQ2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuXHRcdHRoaXMuX2ltYWdlQ2FudmFzLndpZHRoID0gd2lkdGg7XG5cdFx0dGhpcy5faW1hZ2VDYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMuX2NvbnRleHQgPSB0aGlzLl9pbWFnZUNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cdFx0dGhpcy5fcmVjdCA9IG5ldyBSZWN0YW5nbGUoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cblx0XHRpZiAoZmlsbENvbG9yICE9IG51bGwpXG5cdFx0XHR0aGlzLmZpbGxSZWN0KHRoaXMuX3JlY3QsIGZpbGxDb2xvcik7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIG5ldyBCaXRtYXBEYXRhIG9iamVjdCB0aGF0IGlzIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsIGluc3RhbmNlXG5cdCAqIHdpdGggYW4gZXhhY3QgY29weSBvZiB0aGUgY29udGFpbmVkIGJpdG1hcC5cblx0ICpcblx0ICogQHJldHVybiBBIG5ldyBCaXRtYXBEYXRhIG9iamVjdCB0aGF0IGlzIGlkZW50aWNhbCB0byB0aGUgb3JpZ2luYWwuXG5cdCAqL1xuXHRwdWJsaWMgY2xvbmUoKTpCaXRtYXBEYXRhXG5cdHtcblx0XHR2YXIgdDpCaXRtYXBEYXRhID0gbmV3IEJpdG1hcERhdGEodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMudHJhbnNwYXJlbnQpO1xuXHRcdHQuZHJhdyh0aGlzKTtcblx0XHRyZXR1cm4gdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGp1c3RzIHRoZSBjb2xvciB2YWx1ZXMgaW4gYSBzcGVjaWZpZWQgYXJlYSBvZiBhIGJpdG1hcCBpbWFnZSBieSB1c2luZyBhXG5cdCAqIDxjb2RlPkNvbG9yVHJhbnNmb3JtPC9jb2RlPiBvYmplY3QuIElmIHRoZSByZWN0YW5nbGUgbWF0Y2hlcyB0aGVcblx0ICogYm91bmRhcmllcyBvZiB0aGUgYml0bWFwIGltYWdlLCB0aGlzIG1ldGhvZCB0cmFuc2Zvcm1zIHRoZSBjb2xvciB2YWx1ZXMgb2Zcblx0ICogdGhlIGVudGlyZSBpbWFnZS5cblx0ICpcblx0ICogQHBhcmFtIHJlY3QgICAgICAgICAgIEEgUmVjdGFuZ2xlIG9iamVjdCB0aGF0IGRlZmluZXMgdGhlIGFyZWEgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBpbWFnZSBpbiB3aGljaCB0aGUgQ29sb3JUcmFuc2Zvcm0gb2JqZWN0IGlzIGFwcGxpZWQuXG5cdCAqIEBwYXJhbSBjb2xvclRyYW5zZm9ybSBBIENvbG9yVHJhbnNmb3JtIG9iamVjdCB0aGF0IGRlc2NyaWJlcyB0aGUgY29sb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybWF0aW9uIHZhbHVlcyB0byBhcHBseS5cblx0ICovXG5cdHB1YmxpYyBjb2xvclRyYW5zZm9ybShyZWN0OlJlY3RhbmdsZSwgY29sb3JUcmFuc2Zvcm06Q29sb3JUcmFuc2Zvcm0pXG5cdHtcblx0XHRpZiAoIXRoaXMuX2xvY2tlZClcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuX3JlY3Qud2lkdGgsIHRoaXMuX3JlY3QuaGVpZ2h0KTtcblxuXHRcdHZhciBkYXRhOkFycmF5PG51bWJlcj4gPSB0aGlzLl9pbWFnZURhdGEuZGF0YTtcblxuXHRcdHZhciBpOm51bWJlciAvKnVpbnQqLywgajpudW1iZXIgLyp1aW50Ki8sIGluZGV4Om51bWJlciAvKnVpbnQqLztcblx0XHRmb3IgKGkgPSAwOyBpIDwgcmVjdC53aWR0aDsgKytpKSB7XG5cdFx0XHRmb3IgKGogPSAwOyBqIDwgcmVjdC5oZWlnaHQ7ICsraikge1xuXHRcdFx0XHRpbmRleCA9IChpICsgcmVjdC54ICsgKGogKyByZWN0LnkpKnRoaXMud2lkdGgpKjQ7XG5cblx0XHRcdFx0ZGF0YVtpbmRleF0gPSBkYXRhW2luZGV4XSpjb2xvclRyYW5zZm9ybS5yZWRNdWx0aXBsaWVyICsgY29sb3JUcmFuc2Zvcm0ucmVkT2Zmc2V0O1xuXHRcdFx0XHRkYXRhW2luZGV4ICsgMV0gPSBkYXRhW2luZGV4ICsgMV0qY29sb3JUcmFuc2Zvcm0uZ3JlZW5NdWx0aXBsaWVyICsgY29sb3JUcmFuc2Zvcm0uZ3JlZW5PZmZzZXQ7XG5cdFx0XHRcdGRhdGFbaW5kZXggKyAyXSA9IGRhdGFbaW5kZXggKyAyXSpjb2xvclRyYW5zZm9ybS5ibHVlTXVsdGlwbGllciArIGNvbG9yVHJhbnNmb3JtLmJsdWVPZmZzZXQ7XG5cdFx0XHRcdGRhdGFbaW5kZXggKyAzXSA9IGRhdGFbaW5kZXggKyAzXSpjb2xvclRyYW5zZm9ybS5hbHBoYU11bHRpcGxpZXIgKyBjb2xvclRyYW5zZm9ybS5hbHBoYU9mZnNldDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuX2xvY2tlZCkge1xuXHRcdFx0dGhpcy5fY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5faW1hZ2VEYXRhLCAwLCAwKTtcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRyYW5zZmVycyBkYXRhIGZyb20gb25lIGNoYW5uZWwgb2YgYW5vdGhlciBCaXRtYXBEYXRhIG9iamVjdCBvciB0aGVcblx0ICogY3VycmVudCBCaXRtYXBEYXRhIG9iamVjdCBpbnRvIGEgY2hhbm5lbCBvZiB0aGUgY3VycmVudCBCaXRtYXBEYXRhIG9iamVjdC5cblx0ICogQWxsIG9mIHRoZSBkYXRhIGluIHRoZSBvdGhlciBjaGFubmVscyBpbiB0aGUgZGVzdGluYXRpb24gQml0bWFwRGF0YSBvYmplY3Rcblx0ICogYXJlIHByZXNlcnZlZC5cblx0ICpcblx0ICogPHA+VGhlIHNvdXJjZSBjaGFubmVsIHZhbHVlIGFuZCBkZXN0aW5hdGlvbiBjaGFubmVsIHZhbHVlIGNhbiBiZSBvbmUgb2Zcblx0ICogZm9sbG93aW5nIHZhbHVlczogPC9wPlxuXHQgKlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPjxjb2RlPkJpdG1hcERhdGFDaGFubmVsLlJFRDwvY29kZT48L2xpPlxuXHQgKiAgIDxsaT48Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5HUkVFTjwvY29kZT48L2xpPlxuXHQgKiAgIDxsaT48Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5CTFVFPC9jb2RlPjwvbGk+XG5cdCAqICAgPGxpPjxjb2RlPkJpdG1hcERhdGFDaGFubmVsLkFMUEhBPC9jb2RlPjwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqXG5cdCAqIEBwYXJhbSBzb3VyY2VCaXRtYXBEYXRhIFRoZSBpbnB1dCBiaXRtYXAgaW1hZ2UgdG8gdXNlLiBUaGUgc291cmNlIGltYWdlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIGNhbiBiZSBhIGRpZmZlcmVudCBCaXRtYXBEYXRhIG9iamVjdCBvciBpdCBjYW5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXIgdG8gdGhlIGN1cnJlbnQgQml0bWFwRGF0YSBvYmplY3QuXG5cdCAqIEBwYXJhbSBzb3VyY2VSZWN0ICAgICAgIFRoZSBzb3VyY2UgUmVjdGFuZ2xlIG9iamVjdC4gVG8gY29weSBvbmx5IGNoYW5uZWxcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSBmcm9tIGEgc21hbGxlciBhcmVhIHdpdGhpbiB0aGUgYml0bWFwLFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZ5IGEgc291cmNlIHJlY3RhbmdsZSB0aGF0IGlzIHNtYWxsZXIgdGhhblxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgb3ZlcmFsbCBzaXplIG9mIHRoZSBCaXRtYXBEYXRhIG9iamVjdC5cblx0ICogQHBhcmFtIGRlc3RQb2ludCAgICAgICAgVGhlIGRlc3RpbmF0aW9uIFBvaW50IG9iamVjdCB0aGF0IHJlcHJlc2VudHMgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIHVwcGVyLWxlZnQgY29ybmVyIG9mIHRoZSByZWN0YW5ndWxhciBhcmVhIHdoZXJlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBuZXcgY2hhbm5lbCBkYXRhIGlzIHBsYWNlZC4gVG8gY29weSBvbmx5XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwgZGF0YSBmcm9tIG9uZSBhcmVhIHRvIGEgZGlmZmVyZW50IGFyZWEgaW5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGRlc3RpbmF0aW9uIGltYWdlLCBzcGVjaWZ5IGEgcG9pbnQgb3RoZXIgdGhhblxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICgwLDApLlxuXHQgKiBAcGFyYW0gc291cmNlQ2hhbm5lbCAgICBUaGUgc291cmNlIGNoYW5uZWwuIFVzZSBhIHZhbHVlIGZyb20gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIEJpdG1hcERhdGFDaGFubmVsIGNsYXNzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgKDxjb2RlPkJpdG1hcERhdGFDaGFubmVsLlJFRDwvY29kZT4sXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkJpdG1hcERhdGFDaGFubmVsLkJMVUU8L2NvZGU+LFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5HUkVFTjwvY29kZT4sXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkJpdG1hcERhdGFDaGFubmVsLkFMUEhBPC9jb2RlPikuXG5cdCAqIEBwYXJhbSBkZXN0Q2hhbm5lbCAgICAgIFRoZSBkZXN0aW5hdGlvbiBjaGFubmVsLiBVc2UgYSB2YWx1ZSBmcm9tIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICBCaXRtYXBEYXRhQ2hhbm5lbCBjbGFzc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICg8Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5SRUQ8L2NvZGU+LFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5CTFVFPC9jb2RlPixcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Qml0bWFwRGF0YUNoYW5uZWwuR1JFRU48L2NvZGU+LFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5BTFBIQTwvY29kZT4pLlxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvciBUaGUgc291cmNlQml0bWFwRGF0YSwgc291cmNlUmVjdCBvciBkZXN0UG9pbnQgYXJlIG51bGwuXG5cdCAqL1xuXHRwdWJsaWMgY29weUNoYW5uZWwoc291cmNlQml0bWFwOkJpdG1hcERhdGEsIHNvdXJjZVJlY3Q6UmVjdGFuZ2xlLCBkZXN0UG9pbnQ6UG9pbnQsIHNvdXJjZUNoYW5uZWw6bnVtYmVyLCBkZXN0Q2hhbm5lbDpudW1iZXIpXG5cdHtcblx0XHR2YXIgaW1hZ2VEYXRhOkltYWdlRGF0YSA9IHNvdXJjZUJpdG1hcC5pbWFnZURhdGE7XG5cblx0XHRpZiAoIXRoaXMuX2xvY2tlZClcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuX3JlY3Qud2lkdGgsIHRoaXMuX3JlY3QuaGVpZ2h0KTtcblxuXHRcdHZhciBzb3VyY2VEYXRhOkFycmF5PG51bWJlcj4gPSBzb3VyY2VCaXRtYXAuaW1hZ2VEYXRhLmRhdGE7XG5cdFx0dmFyIGRlc3REYXRhOkFycmF5PG51bWJlcj4gPSB0aGlzLl9pbWFnZURhdGEuZGF0YTtcblxuXHRcdHZhciBzb3VyY2VPZmZzZXQ6bnVtYmVyID0gTWF0aC5yb3VuZChNYXRoLmxvZyhzb3VyY2VDaGFubmVsKS9NYXRoLmxvZygyKSk7XG5cdFx0dmFyIGRlc3RPZmZzZXQ6bnVtYmVyID0gTWF0aC5yb3VuZChNYXRoLmxvZyhkZXN0Q2hhbm5lbCkvTWF0aC5sb2coMikpO1xuXG5cdFx0dmFyIGk6bnVtYmVyIC8qdWludCovLCBqOm51bWJlciAvKnVpbnQqLywgc291cmNlSW5kZXg6bnVtYmVyIC8qdWludCovLCBkZXN0SW5kZXg6bnVtYmVyIC8qdWludCovO1xuXHRcdGZvciAoaSA9IDA7IGkgPCBzb3VyY2VSZWN0LndpZHRoOyArK2kpIHtcblx0XHRcdGZvciAoaiA9IDA7IGogPCBzb3VyY2VSZWN0LmhlaWdodDsgKytqKSB7XG5cdFx0XHRcdHNvdXJjZUluZGV4ID0gKGkgKyBzb3VyY2VSZWN0LnggKyAoaiArIHNvdXJjZVJlY3QueSkqc291cmNlQml0bWFwLndpZHRoKSo0O1xuXHRcdFx0XHRkZXN0SW5kZXggPSAoaSArIGRlc3RQb2ludC54ICsgKGogKyBkZXN0UG9pbnQueSkqdGhpcy53aWR0aCkqNDtcblxuXHRcdFx0XHRkZXN0RGF0YVtkZXN0SW5kZXggKyBkZXN0T2Zmc2V0XSA9IHNvdXJjZURhdGFbc291cmNlSW5kZXggKyBzb3VyY2VPZmZzZXRdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghdGhpcy5fbG9ja2VkKSB7XG5cdFx0XHR0aGlzLl9jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLl9pbWFnZURhdGEsIDAsIDApO1xuXHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUHJvdmlkZXMgYSBmYXN0IHJvdXRpbmUgdG8gcGVyZm9ybSBwaXhlbCBtYW5pcHVsYXRpb24gYmV0d2VlbiBpbWFnZXMgd2l0aFxuXHQgKiBubyBzdHJldGNoaW5nLCByb3RhdGlvbiwgb3IgY29sb3IgZWZmZWN0cy4gVGhpcyBtZXRob2QgY29waWVzIGFcblx0ICogcmVjdGFuZ3VsYXIgYXJlYSBvZiBhIHNvdXJjZSBpbWFnZSB0byBhIHJlY3Rhbmd1bGFyIGFyZWEgb2YgdGhlIHNhbWUgc2l6ZVxuXHQgKiBhdCB0aGUgZGVzdGluYXRpb24gcG9pbnQgb2YgdGhlIGRlc3RpbmF0aW9uIEJpdG1hcERhdGEgb2JqZWN0LlxuXHQgKlxuXHQgKiA8cD5JZiB5b3UgaW5jbHVkZSB0aGUgPGNvZGU+YWxwaGFCaXRtYXA8L2NvZGU+IGFuZCA8Y29kZT5hbHBoYVBvaW50PC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXJzLCB5b3UgY2FuIHVzZSBhIHNlY29uZGFyeSBpbWFnZSBhcyBhbiBhbHBoYSBzb3VyY2UgZm9yIHRoZVxuXHQgKiBzb3VyY2UgaW1hZ2UuIElmIHRoZSBzb3VyY2UgaW1hZ2UgaGFzIGFscGhhIGRhdGEsIGJvdGggc2V0cyBvZiBhbHBoYSBkYXRhXG5cdCAqIGFyZSB1c2VkIHRvIGNvbXBvc2l0ZSBwaXhlbHMgZnJvbSB0aGUgc291cmNlIGltYWdlIHRvIHRoZSBkZXN0aW5hdGlvblxuXHQgKiBpbWFnZS4gVGhlIDxjb2RlPmFscGhhUG9pbnQ8L2NvZGU+IHBhcmFtZXRlciBpcyB0aGUgcG9pbnQgaW4gdGhlIGFscGhhXG5cdCAqIGltYWdlIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHVwcGVyLWxlZnQgY29ybmVyIG9mIHRoZSBzb3VyY2UgcmVjdGFuZ2xlLlxuXHQgKiBBbnkgcGl4ZWxzIG91dHNpZGUgdGhlIGludGVyc2VjdGlvbiBvZiB0aGUgc291cmNlIGltYWdlIGFuZCBhbHBoYSBpbWFnZVxuXHQgKiBhcmUgbm90IGNvcGllZCB0byB0aGUgZGVzdGluYXRpb24gaW1hZ2UuPC9wPlxuXHQgKlxuXHQgKiA8cD5UaGUgPGNvZGU+bWVyZ2VBbHBoYTwvY29kZT4gcHJvcGVydHkgY29udHJvbHMgd2hldGhlciBvciBub3QgdGhlIGFscGhhXG5cdCAqIGNoYW5uZWwgaXMgdXNlZCB3aGVuIGEgdHJhbnNwYXJlbnQgaW1hZ2UgaXMgY29waWVkIG9udG8gYW5vdGhlclxuXHQgKiB0cmFuc3BhcmVudCBpbWFnZS4gVG8gY29weSBwaXhlbHMgd2l0aCB0aGUgYWxwaGEgY2hhbm5lbCBkYXRhLCBzZXQgdGhlXG5cdCAqIDxjb2RlPm1lcmdlQWxwaGE8L2NvZGU+IHByb3BlcnR5IHRvIDxjb2RlPnRydWU8L2NvZGU+LiBCeSBkZWZhdWx0LCB0aGVcblx0ICogPGNvZGU+bWVyZ2VBbHBoYTwvY29kZT4gcHJvcGVydHkgaXMgPGNvZGU+ZmFsc2U8L2NvZGU+LjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHNvdXJjZUJpdG1hcERhdGEgVGhlIGlucHV0IGJpdG1hcCBpbWFnZSBmcm9tIHdoaWNoIHRvIGNvcHkgcGl4ZWxzLlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgc291cmNlIGltYWdlIGNhbiBiZSBhIGRpZmZlcmVudCBCaXRtYXBEYXRhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLCBvciBpdCBjYW4gcmVmZXIgdG8gdGhlIGN1cnJlbnRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgQml0bWFwRGF0YSBpbnN0YW5jZS5cblx0ICogQHBhcmFtIHNvdXJjZVJlY3QgICAgICAgQSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZSBzb3VyY2Vcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2UgdG8gdXNlIGFzIGlucHV0LlxuXHQgKiBAcGFyYW0gZGVzdFBvaW50ICAgICAgICBUaGUgZGVzdGluYXRpb24gcG9pbnQgdGhhdCByZXByZXNlbnRzIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICB1cHBlci1sZWZ0IGNvcm5lciBvZiB0aGUgcmVjdGFuZ3VsYXIgYXJlYSB3aGVyZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgbmV3IHBpeGVscyBhcmUgcGxhY2VkLlxuXHQgKiBAcGFyYW0gYWxwaGFCaXRtYXBEYXRhICBBIHNlY29uZGFyeSwgYWxwaGEgQml0bWFwRGF0YSBvYmplY3Qgc291cmNlLlxuXHQgKiBAcGFyYW0gYWxwaGFQb2ludCAgICAgICBUaGUgcG9pbnQgaW4gdGhlIGFscGhhIEJpdG1hcERhdGEgb2JqZWN0IHNvdXJjZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSB1cHBlci1sZWZ0IGNvcm5lciBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c291cmNlUmVjdDwvY29kZT4gcGFyYW1ldGVyLlxuXHQgKiBAcGFyYW0gbWVyZ2VBbHBoYSAgICAgICBUbyB1c2UgdGhlIGFscGhhIGNoYW5uZWwsIHNldCB0aGUgdmFsdWUgdG9cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+dHJ1ZTwvY29kZT4uIFRvIGNvcHkgcGl4ZWxzIHdpdGggbm8gYWxwaGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbCwgc2V0IHRoZSB2YWx1ZSB0byA8Y29kZT5mYWxzZTwvY29kZT4uXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yIFRoZSBzb3VyY2VCaXRtYXBEYXRhLCBzb3VyY2VSZWN0LCBkZXN0UG9pbnQgYXJlIG51bGwuXG5cdCAqL1xuXHRwdWJsaWMgY29weVBpeGVscyhibXBkOkJpdG1hcERhdGEsIHNvdXJjZVJlY3Q6UmVjdGFuZ2xlLCBkZXN0UmVjdDpSZWN0YW5nbGUpO1xuXHRwdWJsaWMgY29weVBpeGVscyhibXBkOkhUTUxJbWFnZUVsZW1lbnQsIHNvdXJjZVJlY3Q6UmVjdGFuZ2xlLCBkZXN0UmVjdDpSZWN0YW5nbGUpO1xuXHRwdWJsaWMgY29weVBpeGVscyhibXBkOmFueSwgc291cmNlUmVjdDpSZWN0YW5nbGUsIGRlc3RSZWN0OlJlY3RhbmdsZSlcblx0e1xuXG5cdFx0aWYgKHRoaXMuX2xvY2tlZCkge1xuXG5cdFx0XHQvLyBJZiBjYW52YXMgaXMgbG9ja2VkOlxuXHRcdFx0Ly9cblx0XHRcdC8vICAgICAgMSkgY29weSBpbWFnZSBkYXRhIGJhY2sgdG8gY2FudmFzXG5cdFx0XHQvLyAgICAgIDIpIGRyYXcgb2JqZWN0XG5cdFx0XHQvLyAgICAgIDMpIHJlYWQgX2ltYWdlRGF0YSBiYWNrIG91dFxuXG5cdFx0XHRpZiAodGhpcy5faW1hZ2VEYXRhKVxuXHRcdFx0XHR0aGlzLl9jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLl9pbWFnZURhdGEsIDAsIDApOyAvLyBhdCBjb29yZHMgMCwwXG5cblx0XHRcdHRoaXMuX2NvcHlQaXhlbHMoYm1wZCwgc291cmNlUmVjdCwgZGVzdFJlY3QpO1xuXG5cdFx0XHRpZiAodGhpcy5faW1hZ2VEYXRhKVxuXHRcdFx0XHR0aGlzLl9pbWFnZURhdGEgPSB0aGlzLl9jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLl9yZWN0LndpZHRoLCB0aGlzLl9yZWN0LmhlaWdodCk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fY29weVBpeGVscyhibXBkLCBzb3VyY2VSZWN0LCBkZXN0UmVjdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEZyZWVzIG1lbW9yeSB0aGF0IGlzIHVzZWQgdG8gc3RvcmUgdGhlIEJpdG1hcERhdGEgb2JqZWN0LlxuXHQgKlxuXHQgKiA8cD5XaGVuIHRoZSA8Y29kZT5kaXNwb3NlKCk8L2NvZGU+IG1ldGhvZCBpcyBjYWxsZWQgb24gYW4gaW1hZ2UsIHRoZSB3aWR0aFxuXHQgKiBhbmQgaGVpZ2h0IG9mIHRoZSBpbWFnZSBhcmUgc2V0IHRvIDAuIEFsbCBzdWJzZXF1ZW50IGNhbGxzIHRvIG1ldGhvZHMgb3Jcblx0ICogcHJvcGVydGllcyBvZiB0aGlzIEJpdG1hcERhdGEgaW5zdGFuY2UgZmFpbCwgYW5kIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG5cdCAqIDwvcD5cblx0ICpcblx0ICogPHA+PGNvZGU+Qml0bWFwRGF0YS5kaXNwb3NlKCk8L2NvZGU+IHJlbGVhc2VzIHRoZSBtZW1vcnkgb2NjdXBpZWQgYnkgdGhlXG5cdCAqIGFjdHVhbCBiaXRtYXAgZGF0YSwgaW1tZWRpYXRlbHkoYSBiaXRtYXAgY2FuIGNvbnN1bWUgdXAgdG8gNjQgTUIgb2Zcblx0ICogbWVtb3J5KS4gQWZ0ZXIgdXNpbmcgPGNvZGU+Qml0bWFwRGF0YS5kaXNwb3NlKCk8L2NvZGU+LCB0aGUgQml0bWFwRGF0YVxuXHQgKiBvYmplY3QgaXMgbm8gbG9uZ2VyIHVzYWJsZSBhbmQgYW4gZXhjZXB0aW9uIG1heSBiZSB0aHJvd24gaWZcblx0ICogeW91IGNhbGwgZnVuY3Rpb25zIG9uIHRoZSBCaXRtYXBEYXRhIG9iamVjdC4gSG93ZXZlcixcblx0ICogPGNvZGU+Qml0bWFwRGF0YS5kaXNwb3NlKCk8L2NvZGU+IGRvZXMgbm90IGdhcmJhZ2UgY29sbGVjdCB0aGUgQml0bWFwRGF0YVxuXHQgKiBvYmplY3QoYXBwcm94aW1hdGVseSAxMjggYnl0ZXMpOyB0aGUgbWVtb3J5IG9jY3VwaWVkIGJ5IHRoZSBhY3R1YWxcblx0ICogQml0bWFwRGF0YSBvYmplY3QgaXMgcmVsZWFzZWQgYXQgdGhlIHRpbWUgdGhlIEJpdG1hcERhdGEgb2JqZWN0IGlzXG5cdCAqIGNvbGxlY3RlZCBieSB0aGUgZ2FyYmFnZSBjb2xsZWN0b3IuPC9wPlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0dGhpcy5fY29udGV4dCA9IG51bGw7XG5cdFx0dGhpcy5faW1hZ2VDYW52YXMgPSBudWxsO1xuXHRcdHRoaXMuX2ltYWdlRGF0YSA9IG51bGw7XG5cdFx0dGhpcy5fcmVjdCA9IG51bGw7XG5cdFx0dGhpcy5fdHJhbnNwYXJlbnQgPSBudWxsO1xuXHRcdHRoaXMuX2xvY2tlZCA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogRHJhd3MgdGhlIDxjb2RlPnNvdXJjZTwvY29kZT4gZGlzcGxheSBvYmplY3Qgb250byB0aGUgYml0bWFwIGltYWdlLCB1c2luZ1xuXHQgKiB0aGUgTk1FIHNvZnR3YXJlIHJlbmRlcmVyLiBZb3UgY2FuIHNwZWNpZnkgPGNvZGU+bWF0cml4PC9jb2RlPixcblx0ICogPGNvZGU+Y29sb3JUcmFuc2Zvcm08L2NvZGU+LCA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+LCBhbmQgYSBkZXN0aW5hdGlvblxuXHQgKiA8Y29kZT5jbGlwUmVjdDwvY29kZT4gcGFyYW1ldGVyIHRvIGNvbnRyb2wgaG93IHRoZSByZW5kZXJpbmcgcGVyZm9ybXMuXG5cdCAqIE9wdGlvbmFsbHksIHlvdSBjYW4gc3BlY2lmeSB3aGV0aGVyIHRoZSBiaXRtYXAgc2hvdWxkIGJlIHNtb290aGVkIHdoZW5cblx0ICogc2NhbGVkKHRoaXMgd29ya3Mgb25seSBpZiB0aGUgc291cmNlIG9iamVjdCBpcyBhIEJpdG1hcERhdGEgb2JqZWN0KS5cblx0ICpcblx0ICogPHA+VGhlIHNvdXJjZSBkaXNwbGF5IG9iamVjdCBkb2VzIG5vdCB1c2UgYW55IG9mIGl0cyBhcHBsaWVkXG5cdCAqIHRyYW5zZm9ybWF0aW9ucyBmb3IgdGhpcyBjYWxsLiBJdCBpcyB0cmVhdGVkIGFzIGl0IGV4aXN0cyBpbiB0aGUgbGlicmFyeVxuXHQgKiBvciBmaWxlLCB3aXRoIG5vIG1hdHJpeCB0cmFuc2Zvcm0sIG5vIGNvbG9yIHRyYW5zZm9ybSwgYW5kIG5vIGJsZW5kIG1vZGUuXG5cdCAqIFRvIGRyYXcgYSBkaXNwbGF5IG9iamVjdChzdWNoIGFzIGEgbW92aWUgY2xpcCkgYnkgdXNpbmcgaXRzIG93biB0cmFuc2Zvcm1cblx0ICogcHJvcGVydGllcywgeW91IGNhbiBjb3B5IGl0cyA8Y29kZT50cmFuc2Zvcm08L2NvZGU+IHByb3BlcnR5IG9iamVjdCB0byB0aGVcblx0ICogPGNvZGU+dHJhbnNmb3JtPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgQml0bWFwIG9iamVjdCB0aGF0IHVzZXMgdGhlXG5cdCAqIEJpdG1hcERhdGEgb2JqZWN0LjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHNvdXJjZSAgICAgICAgIFRoZSBkaXNwbGF5IG9iamVjdCBvciBCaXRtYXBEYXRhIG9iamVjdCB0byBkcmF3IHRvXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgQml0bWFwRGF0YSBvYmplY3QuKFRoZSBEaXNwbGF5T2JqZWN0IGFuZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgQml0bWFwRGF0YSBjbGFzc2VzIGltcGxlbWVudCB0aGUgSUJpdG1hcERyYXdhYmxlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBpbnRlcmZhY2UuKVxuXHQgKiBAcGFyYW0gbWF0cml4ICAgICAgICAgQSBNYXRyaXggb2JqZWN0IHVzZWQgdG8gc2NhbGUsIHJvdGF0ZSwgb3IgdHJhbnNsYXRlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIGJpdG1hcC4gSWYgeW91IGRvIG5vdCB3YW50IHRvXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhcHBseSBhIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiB0byB0aGUgaW1hZ2UsIHNldCB0aGlzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXIgdG8gYW4gaWRlbnRpdHkgbWF0cml4LCBjcmVhdGVkIHdpdGggdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IDxjb2RlPm5ldyBNYXRyaXgoKTwvY29kZT4gY29uc3RydWN0b3IsIG9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBwYXNzIGEgPGNvZGU+bnVsbDwvY29kZT4gdmFsdWUuXG5cdCAqIEBwYXJhbSBjb2xvclRyYW5zZm9ybSBBIENvbG9yVHJhbnNmb3JtIG9iamVjdCB0aGF0IHlvdSB1c2UgdG8gYWRqdXN0IHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgdmFsdWVzIG9mIHRoZSBiaXRtYXAuIElmIG5vIG9iamVjdCBpc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgc3VwcGxpZWQsIHRoZSBiaXRtYXAgaW1hZ2UncyBjb2xvcnMgYXJlIG5vdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtZWQuIElmIHlvdSBtdXN0IHBhc3MgdGhpcyBwYXJhbWV0ZXIgYnV0IHlvdVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgZG8gbm90IHdhbnQgdG8gdHJhbnNmb3JtIHRoZSBpbWFnZSwgc2V0IHRoaXNcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlciB0byBhIENvbG9yVHJhbnNmb3JtIG9iamVjdCBjcmVhdGVkIHdpdGhcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoZSBkZWZhdWx0IDxjb2RlPm5ldyBDb2xvclRyYW5zZm9ybSgpPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3IuXG5cdCAqIEBwYXJhbSBibGVuZE1vZGUgICAgICBBIHN0cmluZyB2YWx1ZSwgZnJvbSB0aGUgZmxhc2guZGlzcGxheS5CbGVuZE1vZGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGNsYXNzLCBzcGVjaWZ5aW5nIHRoZSBibGVuZCBtb2RlIHRvIGJlIGFwcGxpZWQgdG9cblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoZSByZXN1bHRpbmcgYml0bWFwLlxuXHQgKiBAcGFyYW0gY2xpcFJlY3QgICAgICAgQSBSZWN0YW5nbGUgb2JqZWN0IHRoYXQgZGVmaW5lcyB0aGUgYXJlYSBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZSBvYmplY3QgdG8gZHJhdy4gSWYgeW91IGRvIG5vdCBzdXBwbHkgdGhpc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsIG5vIGNsaXBwaW5nIG9jY3VycyBhbmQgdGhlIGVudGlyZSBzb3VyY2Vcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCBpcyBkcmF3bi5cblx0ICogQHBhcmFtIHNtb290aGluZyAgICAgIEEgQm9vbGVhbiB2YWx1ZSB0aGF0IGRldGVybWluZXMgd2hldGhlciBhIEJpdG1hcERhdGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCBpcyBzbW9vdGhlZCB3aGVuIHNjYWxlZCBvciByb3RhdGVkLCBkdWUgdG8gYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgc2NhbGluZyBvciByb3RhdGlvbiBpbiB0aGUgPGNvZGU+bWF0cml4PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyLiBUaGUgPGNvZGU+c21vb3RoaW5nPC9jb2RlPiBwYXJhbWV0ZXIgb25seVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYXBwbGllcyBpZiB0aGUgPGNvZGU+c291cmNlPC9jb2RlPiBwYXJhbWV0ZXIgaXMgYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgQml0bWFwRGF0YSBvYmplY3QuIFdpdGggPGNvZGU+c21vb3RoaW5nPC9jb2RlPiBzZXRcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRvIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIHJvdGF0ZWQgb3Igc2NhbGVkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBCaXRtYXBEYXRhIGltYWdlIGNhbiBhcHBlYXIgcGl4ZWxhdGVkIG9yIGphZ2dlZC4gRm9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBleGFtcGxlLCB0aGUgZm9sbG93aW5nIHR3byBpbWFnZXMgdXNlIHRoZSBzYW1lXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBCaXRtYXBEYXRhIG9iamVjdCBmb3IgdGhlIDxjb2RlPnNvdXJjZTwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlciwgYnV0IHRoZSA8Y29kZT5zbW9vdGhpbmc8L2NvZGU+IHBhcmFtZXRlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+IG9uIHRoZSBsZWZ0IGFuZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+ZmFsc2U8L2NvZGU+IG9uIHRoZSByaWdodDpcblx0ICpcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxwPkRyYXdpbmcgYSBiaXRtYXAgd2l0aCA8Y29kZT5zbW9vdGhpbmc8L2NvZGU+IHNldFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdG8gPGNvZGU+dHJ1ZTwvY29kZT4gdGFrZXMgbG9uZ2VyIHRoYW4gZG9pbmcgc28gd2l0aFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c21vb3RoaW5nPC9jb2RlPiBzZXQgdG9cblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmZhbHNlPC9jb2RlPi48L3A+XG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBUaGUgPGNvZGU+c291cmNlPC9jb2RlPiBwYXJhbWV0ZXIgaXMgbm90IGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIEJpdG1hcERhdGEgb3IgRGlzcGxheU9iamVjdCBvYmplY3QuXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBUaGUgc291cmNlIGlzIG51bGwgb3Igbm90IGEgdmFsaWQgSUJpdG1hcERyYXdhYmxlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QuXG5cdCAqIEB0aHJvd3MgU2VjdXJpdHlFcnJvciBUaGUgPGNvZGU+c291cmNlPC9jb2RlPiBvYmplY3QgYW5kKGluIHRoZSBjYXNlIG9mIGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIFNwcml0ZSBvciBNb3ZpZUNsaXAgb2JqZWN0KSBhbGwgb2YgaXRzIGNoaWxkIG9iamVjdHNcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGRvIG5vdCBjb21lIGZyb20gdGhlIHNhbWUgZG9tYWluIGFzIHRoZSBjYWxsZXIsIG9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhcmUgbm90IGluIGEgY29udGVudCB0aGF0IGlzIGFjY2Vzc2libGUgdG8gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBjYWxsZXIgYnkgaGF2aW5nIGNhbGxlZCB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPlNlY3VyaXR5LmFsbG93RG9tYWluKCk8L2NvZGU+IG1ldGhvZC4gVGhpc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3Rpb24gZG9lcyBub3QgYXBwbHkgdG8gQUlSIGNvbnRlbnQgaW4gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbiBzZWN1cml0eSBzYW5kYm94LlxuXHQgKi9cblx0cHVibGljIGRyYXcoc291cmNlOkJpdG1hcERhdGEsIG1hdHJpeD86TWF0cml4LCBjb2xvclRyYW5zZm9ybT86Q29sb3JUcmFuc2Zvcm0sIGJsZW5kTW9kZT86QmxlbmRNb2RlLCBjbGlwUmVjdD86UmVjdGFuZ2xlLCBzbW9vdGhpbmc/OmJvb2xlYW4pO1xuXHRwdWJsaWMgZHJhdyhzb3VyY2U6SFRNTEltYWdlRWxlbWVudCwgbWF0cml4PzpNYXRyaXgsIGNvbG9yVHJhbnNmb3JtPzpDb2xvclRyYW5zZm9ybSwgYmxlbmRNb2RlPzpCbGVuZE1vZGUsIGNsaXBSZWN0PzpSZWN0YW5nbGUsIHNtb290aGluZz86Ym9vbGVhbik7XG5cdHB1YmxpYyBkcmF3KHNvdXJjZTphbnksIG1hdHJpeD86TWF0cml4LCBjb2xvclRyYW5zZm9ybT86Q29sb3JUcmFuc2Zvcm0sIGJsZW5kTW9kZT86QmxlbmRNb2RlLCBjbGlwUmVjdD86UmVjdGFuZ2xlLCBzbW9vdGhpbmc/OmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fbG9ja2VkKSB7XG5cblx0XHRcdC8vIElmIGNhbnZhcyBpcyBsb2NrZWQ6XG5cdFx0XHQvL1xuXHRcdFx0Ly8gICAgICAxKSBjb3B5IGltYWdlIGRhdGEgYmFjayB0byBjYW52YXNcblx0XHRcdC8vICAgICAgMikgZHJhdyBvYmplY3Rcblx0XHRcdC8vICAgICAgMykgcmVhZCBfaW1hZ2VEYXRhIGJhY2sgb3V0XG5cblx0XHRcdHRoaXMuX2NvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuX2ltYWdlRGF0YSwgMCwgMCk7IC8vIGF0IGNvb3JkcyAwLDBcblx0XHRcdHRoaXMuX2RyYXcoc291cmNlLCBtYXRyaXgsIGNvbG9yVHJhbnNmb3JtLCBibGVuZE1vZGUsIGNsaXBSZWN0LCBzbW9vdGhpbmcpO1xuXHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5fcmVjdC53aWR0aCwgdGhpcy5fcmVjdC5oZWlnaHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9kcmF3KHNvdXJjZSwgbWF0cml4LCBjb2xvclRyYW5zZm9ybSwgYmxlbmRNb2RlLCBjbGlwUmVjdCwgc21vb3RoaW5nKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlsbHMgYSByZWN0YW5ndWxhciBhcmVhIG9mIHBpeGVscyB3aXRoIGEgc3BlY2lmaWVkIEFSR0IgY29sb3IuXG5cdCAqXG5cdCAqIEBwYXJhbSByZWN0ICBUaGUgcmVjdGFuZ3VsYXIgYXJlYSB0byBmaWxsLlxuXHQgKiBAcGFyYW0gY29sb3IgVGhlIEFSR0IgY29sb3IgdmFsdWUgdGhhdCBmaWxscyB0aGUgYXJlYS4gQVJHQiBjb2xvcnMgYXJlXG5cdCAqICAgICAgICAgICAgICBvZnRlbiBzcGVjaWZpZWQgaW4gaGV4YWRlY2ltYWwgZm9ybWF0OyBmb3IgZXhhbXBsZSxcblx0ICogICAgICAgICAgICAgIDB4RkYzMzY2OTkuXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yIFRoZSByZWN0IGlzIG51bGwuXG5cdCAqL1xuXHRwdWJsaWMgZmlsbFJlY3QocmVjdDpSZWN0YW5nbGUsIGNvbG9yOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9sb2NrZWQpIHtcblxuXHRcdFx0Ly8gSWYgY2FudmFzIGlzIGxvY2tlZDpcblx0XHRcdC8vXG5cdFx0XHQvLyAgICAgIDEpIGNvcHkgaW1hZ2UgZGF0YSBiYWNrIHRvIGNhbnZhc1xuXHRcdFx0Ly8gICAgICAyKSBhcHBseSBmaWxsXG5cdFx0XHQvLyAgICAgIDMpIHJlYWQgX2ltYWdlRGF0YSBiYWNrIG91dFxuXG5cdFx0XHRpZiAodGhpcy5faW1hZ2VEYXRhKVxuXHRcdFx0XHR0aGlzLl9jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLl9pbWFnZURhdGEsIDAsIDApOyAvLyBhdCBjb29yZHMgMCwwXG5cblx0XHRcdHRoaXMuX2ZpbGxSZWN0KHJlY3QsIGNvbG9yKTtcblxuXHRcdFx0aWYgKHRoaXMuX2ltYWdlRGF0YSlcblx0XHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5fcmVjdC53aWR0aCwgdGhpcy5fcmVjdC5oZWlnaHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9maWxsUmVjdChyZWN0LCBjb2xvcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gaW50ZWdlciB0aGF0IHJlcHJlc2VudHMgYW4gUkdCIHBpeGVsIHZhbHVlIGZyb20gYSBCaXRtYXBEYXRhXG5cdCAqIG9iamVjdCBhdCBhIHNwZWNpZmljIHBvaW50KDxpPng8L2k+LCA8aT55PC9pPikuIFRoZVxuXHQgKiA8Y29kZT5nZXRQaXhlbCgpPC9jb2RlPiBtZXRob2QgcmV0dXJucyBhbiB1bm11bHRpcGxpZWQgcGl4ZWwgdmFsdWUuIE5vXG5cdCAqIGFscGhhIGluZm9ybWF0aW9uIGlzIHJldHVybmVkLlxuXHQgKlxuXHQgKiA8cD5BbGwgcGl4ZWxzIGluIGEgQml0bWFwRGF0YSBvYmplY3QgYXJlIHN0b3JlZCBhcyBwcmVtdWx0aXBsaWVkIGNvbG9yXG5cdCAqIHZhbHVlcy4gQSBwcmVtdWx0aXBsaWVkIGltYWdlIHBpeGVsIGhhcyB0aGUgcmVkLCBncmVlbiwgYW5kIGJsdWUgY29sb3Jcblx0ICogY2hhbm5lbCB2YWx1ZXMgYWxyZWFkeSBtdWx0aXBsaWVkIGJ5IHRoZSBhbHBoYSBkYXRhLiBGb3IgZXhhbXBsZSwgaWYgdGhlXG5cdCAqIGFscGhhIHZhbHVlIGlzIDAsIHRoZSB2YWx1ZXMgZm9yIHRoZSBSR0IgY2hhbm5lbHMgYXJlIGFsc28gMCwgaW5kZXBlbmRlbnRcblx0ICogb2YgdGhlaXIgdW5tdWx0aXBsaWVkIHZhbHVlcy4gVGhpcyBsb3NzIG9mIGRhdGEgY2FuIGNhdXNlIHNvbWUgcHJvYmxlbXNcblx0ICogd2hlbiB5b3UgcGVyZm9ybSBvcGVyYXRpb25zLiBBbGwgQml0bWFwRGF0YSBtZXRob2RzIHRha2UgYW5kIHJldHVyblxuXHQgKiB1bm11bHRpcGxpZWQgdmFsdWVzLiBUaGUgaW50ZXJuYWwgcGl4ZWwgcmVwcmVzZW50YXRpb24gaXMgY29udmVydGVkIGZyb21cblx0ICogcHJlbXVsdGlwbGllZCB0byB1bm11bHRpcGxpZWQgYmVmb3JlIGl0IGlzIHJldHVybmVkIGFzIGEgdmFsdWUuIER1cmluZyBhXG5cdCAqIHNldCBvcGVyYXRpb24sIHRoZSBwaXhlbCB2YWx1ZSBpcyBwcmVtdWx0aXBsaWVkIGJlZm9yZSB0aGUgcmF3IGltYWdlIHBpeGVsXG5cdCAqIGlzIHNldC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSB4IFRoZSA8aT54PC9pPiBwb3NpdGlvbiBvZiB0aGUgcGl4ZWwuXG5cdCAqIEBwYXJhbSB5IFRoZSA8aT55PC9pPiBwb3NpdGlvbiBvZiB0aGUgcGl4ZWwuXG5cdCAqIEByZXR1cm4gQSBudW1iZXIgdGhhdCByZXByZXNlbnRzIGFuIFJHQiBwaXhlbCB2YWx1ZS4gSWYgdGhlKDxpPng8L2k+LFxuXHQgKiAgICAgICAgIDxpPnk8L2k+KSBjb29yZGluYXRlcyBhcmUgb3V0c2lkZSB0aGUgYm91bmRzIG9mIHRoZSBpbWFnZSwgdGhlXG5cdCAqICAgICAgICAgbWV0aG9kIHJldHVybnMgMC5cblx0ICovXG5cdHB1YmxpYyBnZXRQaXhlbCh4LCB5KTpudW1iZXJcblx0e1xuXHRcdHZhciByOm51bWJlcjtcblx0XHR2YXIgZzpudW1iZXI7XG5cdFx0dmFyIGI6bnVtYmVyO1xuXHRcdHZhciBhOm51bWJlcjtcblxuXHRcdGlmICghdGhpcy5fbG9ja2VkKSB7XG5cdFx0XHR2YXIgcGl4ZWxEYXRhOkltYWdlRGF0YSA9IHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKHgsIHksIDEsIDEpO1xuXG5cdFx0XHRyID0gcGl4ZWxEYXRhLmRhdGFbMF07XG5cdFx0XHRnID0gcGl4ZWxEYXRhLmRhdGFbMV07XG5cdFx0XHRiID0gcGl4ZWxEYXRhLmRhdGFbMl07XG5cdFx0XHRhID0gcGl4ZWxEYXRhLmRhdGFbM107XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGluZGV4Om51bWJlciA9ICh4ICsgeSp0aGlzLl9pbWFnZUNhbnZhcy53aWR0aCkqNDtcblxuXHRcdFx0ciA9IHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMF07XG5cdFx0XHRnID0gdGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAxXTtcblx0XHRcdGIgPSB0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDJdO1xuXHRcdFx0YSA9IHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgM107XG5cdFx0fVxuXG5cdFx0Ly9yZXR1cm5zIGJsYWNrIGlmIGZ1bGx5IHRyYW5zcGFyZW50XG5cdFx0aWYgKCFhKVxuXHRcdFx0cmV0dXJuIDB4MDtcblxuXHRcdHJldHVybiAociA8PCAxNikgfCAoZyA8PCA4KSB8IGI7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBBUkdCIGNvbG9yIHZhbHVlIHRoYXQgY29udGFpbnMgYWxwaGEgY2hhbm5lbCBkYXRhIGFuZCBSR0IgZGF0YS5cblx0ICogVGhpcyBtZXRob2QgaXMgc2ltaWxhciB0byB0aGUgPGNvZGU+Z2V0UGl4ZWwoKTwvY29kZT4gbWV0aG9kLCB3aGljaFxuXHQgKiByZXR1cm5zIGFuIFJHQiBjb2xvciB3aXRob3V0IGFscGhhIGNoYW5uZWwgZGF0YS5cblx0ICpcblx0ICogPHA+QWxsIHBpeGVscyBpbiBhIEJpdG1hcERhdGEgb2JqZWN0IGFyZSBzdG9yZWQgYXMgcHJlbXVsdGlwbGllZCBjb2xvclxuXHQgKiB2YWx1ZXMuIEEgcHJlbXVsdGlwbGllZCBpbWFnZSBwaXhlbCBoYXMgdGhlIHJlZCwgZ3JlZW4sIGFuZCBibHVlIGNvbG9yXG5cdCAqIGNoYW5uZWwgdmFsdWVzIGFscmVhZHkgbXVsdGlwbGllZCBieSB0aGUgYWxwaGEgZGF0YS4gRm9yIGV4YW1wbGUsIGlmIHRoZVxuXHQgKiBhbHBoYSB2YWx1ZSBpcyAwLCB0aGUgdmFsdWVzIGZvciB0aGUgUkdCIGNoYW5uZWxzIGFyZSBhbHNvIDAsIGluZGVwZW5kZW50XG5cdCAqIG9mIHRoZWlyIHVubXVsdGlwbGllZCB2YWx1ZXMuIFRoaXMgbG9zcyBvZiBkYXRhIGNhbiBjYXVzZSBzb21lIHByb2JsZW1zXG5cdCAqIHdoZW4geW91IHBlcmZvcm0gb3BlcmF0aW9ucy4gQWxsIEJpdG1hcERhdGEgbWV0aG9kcyB0YWtlIGFuZCByZXR1cm5cblx0ICogdW5tdWx0aXBsaWVkIHZhbHVlcy4gVGhlIGludGVybmFsIHBpeGVsIHJlcHJlc2VudGF0aW9uIGlzIGNvbnZlcnRlZCBmcm9tXG5cdCAqIHByZW11bHRpcGxpZWQgdG8gdW5tdWx0aXBsaWVkIGJlZm9yZSBpdCBpcyByZXR1cm5lZCBhcyBhIHZhbHVlLiBEdXJpbmcgYVxuXHQgKiBzZXQgb3BlcmF0aW9uLCB0aGUgcGl4ZWwgdmFsdWUgaXMgcHJlbXVsdGlwbGllZCBiZWZvcmUgdGhlIHJhdyBpbWFnZSBwaXhlbFxuXHQgKiBpcyBzZXQuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0geCBUaGUgPGk+eDwvaT4gcG9zaXRpb24gb2YgdGhlIHBpeGVsLlxuXHQgKiBAcGFyYW0geSBUaGUgPGk+eTwvaT4gcG9zaXRpb24gb2YgdGhlIHBpeGVsLlxuXHQgKiBAcmV0dXJuIEEgbnVtYmVyIHJlcHJlc2VudGluZyBhbiBBUkdCIHBpeGVsIHZhbHVlLiBJZiB0aGUoPGk+eDwvaT4sXG5cdCAqICAgICAgICAgPGk+eTwvaT4pIGNvb3JkaW5hdGVzIGFyZSBvdXRzaWRlIHRoZSBib3VuZHMgb2YgdGhlIGltYWdlLCAwIGlzXG5cdCAqICAgICAgICAgcmV0dXJuZWQuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0UGl4ZWwzMih4LCB5KTpudW1iZXJcblx0e1xuXHRcdHZhciByOm51bWJlcjtcblx0XHR2YXIgZzpudW1iZXI7XG5cdFx0dmFyIGI6bnVtYmVyO1xuXHRcdHZhciBhOm51bWJlcjtcblxuXHRcdGlmICghdGhpcy5fbG9ja2VkKSB7XG5cdFx0XHR2YXIgcGl4ZWxEYXRhOkltYWdlRGF0YSA9IHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKHgsIHksIDEsIDEpO1xuXG5cdFx0XHRyID0gcGl4ZWxEYXRhLmRhdGFbMF07XG5cdFx0XHRnID0gcGl4ZWxEYXRhLmRhdGFbMV07XG5cdFx0XHRiID0gcGl4ZWxEYXRhLmRhdGFbMl07XG5cdFx0XHRhID0gcGl4ZWxEYXRhLmRhdGFbM107XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGluZGV4Om51bWJlciA9ICh4ICsgeSp0aGlzLl9pbWFnZUNhbnZhcy53aWR0aCkqNDtcblxuXHRcdFx0ciA9IHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMF07XG5cdFx0XHRnID0gdGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAxXTtcblx0XHRcdGIgPSB0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDJdO1xuXHRcdFx0YSA9IHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgM107XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChhIDw8IDI0KSB8IChyIDw8IDE2KSB8IChnIDw8IDgpIHwgYjtcblx0fVxuXG5cdC8qKlxuXHQgKiBMb2NrcyBhbiBpbWFnZSBzbyB0aGF0IGFueSBvYmplY3RzIHRoYXQgcmVmZXJlbmNlIHRoZSBCaXRtYXBEYXRhIG9iamVjdCxcblx0ICogc3VjaCBhcyBCaXRtYXAgb2JqZWN0cywgYXJlIG5vdCB1cGRhdGVkIHdoZW4gdGhpcyBCaXRtYXBEYXRhIG9iamVjdFxuXHQgKiBjaGFuZ2VzLiBUbyBpbXByb3ZlIHBlcmZvcm1hbmNlLCB1c2UgdGhpcyBtZXRob2QgYWxvbmcgd2l0aCB0aGVcblx0ICogPGNvZGU+dW5sb2NrKCk8L2NvZGU+IG1ldGhvZCBiZWZvcmUgYW5kIGFmdGVyIG51bWVyb3VzIGNhbGxzIHRvIHRoZVxuXHQgKiA8Y29kZT5zZXRQaXhlbCgpPC9jb2RlPiBvciA8Y29kZT5zZXRQaXhlbDMyKCk8L2NvZGU+IG1ldGhvZC5cblx0ICpcblx0ICovXG5cdHB1YmxpYyBsb2NrKClcblx0e1xuXHRcdGlmICh0aGlzLl9sb2NrZWQpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9sb2NrZWQgPSB0cnVlO1xuXHRcdHRoaXMuX2ltYWdlRGF0YSA9IHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuX3JlY3Qud2lkdGgsIHRoaXMuX3JlY3QuaGVpZ2h0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhbiBBcnJheSBpbnRvIGEgcmVjdGFuZ3VsYXIgcmVnaW9uIG9mIHBpeGVsIGRhdGEuIEZvciBlYWNoIHBpeGVsLFxuXHQgKiBhbiBBcnJheSBlbGVtZW50IGlzIHJlYWQgYW5kIHdyaXR0ZW4gaW50byB0aGUgQml0bWFwRGF0YSBwaXhlbC4gVGhlIGRhdGFcblx0ICogaW4gdGhlIEFycmF5IGlzIGV4cGVjdGVkIHRvIGJlIDMyLWJpdCBBUkdCIHBpeGVsIHZhbHVlcy5cblx0ICpcblx0ICogQHBhcmFtIHJlY3QgICAgICAgIFNwZWNpZmllcyB0aGUgcmVjdGFuZ3VsYXIgcmVnaW9uIG9mIHRoZSBCaXRtYXBEYXRhXG5cdCAqICAgICAgICAgICAgICAgICAgICBvYmplY3QuXG5cdCAqIEBwYXJhbSBpbnB1dEFycmF5ICBBbiBBcnJheSB0aGF0IGNvbnNpc3RzIG9mIDMyLWJpdCB1bm11bHRpcGxpZWQgcGl4ZWxcblx0ICogICAgICAgICAgICAgICAgICAgIHZhbHVlcyB0byBiZSB1c2VkIGluIHRoZSByZWN0YW5ndWxhciByZWdpb24uXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgdmVjdG9yIGFycmF5IGlzIG5vdCBsYXJnZSBlbm91Z2ggdG8gcmVhZCBhbGwgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICBwaXhlbCBkYXRhLlxuXHQgKi9cblx0cHVibGljIHNldEFycmF5KHJlY3Q6UmVjdGFuZ2xlLCBpbnB1dEFycmF5OkFycmF5PG51bWJlcj4pXG5cdHtcblx0XHRpZiAoIXRoaXMuX2xvY2tlZClcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuX3JlY3Qud2lkdGgsIHRoaXMuX3JlY3QuaGVpZ2h0KTtcblxuXHRcdHZhciBpOm51bWJlciAvKnVpbnQqLywgajpudW1iZXIgLyp1aW50Ki8sIGluZGV4Om51bWJlciAvKnVpbnQqLywgYXJnYjpudW1iZXJbXSAvKnVpbnQqLztcblx0XHRmb3IgKGkgPSAwOyBpIDwgcmVjdC53aWR0aDsgKytpKSB7XG5cdFx0XHRmb3IgKGogPSAwOyBqIDwgcmVjdC5oZWlnaHQ7ICsraikge1xuXHRcdFx0XHRhcmdiID0gQ29sb3JVdGlscy5mbG9hdDMyQ29sb3JUb0FSR0IoaW5wdXRBcnJheVtpICsgaipyZWN0LndpZHRoXSk7XG5cdFx0XHRcdGluZGV4ID0gKGkgKyByZWN0LnggKyAoaiArIHJlY3QueSkqdGhpcy5faW1hZ2VDYW52YXMud2lkdGgpKjQ7XG5cblx0XHRcdFx0dGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAwXSA9IGFyZ2JbMV07XG5cdFx0XHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMV0gPSBhcmdiWzJdO1xuXHRcdFx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDJdID0gYXJnYlszXTtcblx0XHRcdFx0dGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAzXSA9IGFyZ2JbMF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpIHtcblx0XHRcdHRoaXMuX2NvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuX2ltYWdlRGF0YSwgMCwgMCk7XG5cdFx0XHR0aGlzLl9pbWFnZURhdGEgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIGEgc2luZ2xlIHBpeGVsIG9mIGEgQml0bWFwRGF0YSBvYmplY3QuIFRoZSBjdXJyZW50IGFscGhhIGNoYW5uZWxcblx0ICogdmFsdWUgb2YgdGhlIGltYWdlIHBpeGVsIGlzIHByZXNlcnZlZCBkdXJpbmcgdGhpcyBvcGVyYXRpb24uIFRoZSB2YWx1ZSBvZlxuXHQgKiB0aGUgUkdCIGNvbG9yIHBhcmFtZXRlciBpcyB0cmVhdGVkIGFzIGFuIHVubXVsdGlwbGllZCBjb2xvciB2YWx1ZS5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFRvIGluY3JlYXNlIHBlcmZvcm1hbmNlLCB3aGVuIHlvdSB1c2UgdGhlXG5cdCAqIDxjb2RlPnNldFBpeGVsKCk8L2NvZGU+IG9yIDxjb2RlPnNldFBpeGVsMzIoKTwvY29kZT4gbWV0aG9kIHJlcGVhdGVkbHksXG5cdCAqIGNhbGwgdGhlIDxjb2RlPmxvY2soKTwvY29kZT4gbWV0aG9kIGJlZm9yZSB5b3UgY2FsbCB0aGVcblx0ICogPGNvZGU+c2V0UGl4ZWwoKTwvY29kZT4gb3IgPGNvZGU+c2V0UGl4ZWwzMigpPC9jb2RlPiBtZXRob2QsIGFuZCB0aGVuIGNhbGxcblx0ICogdGhlIDxjb2RlPnVubG9jaygpPC9jb2RlPiBtZXRob2Qgd2hlbiB5b3UgaGF2ZSBtYWRlIGFsbCBwaXhlbCBjaGFuZ2VzLlxuXHQgKiBUaGlzIHByb2Nlc3MgcHJldmVudHMgb2JqZWN0cyB0aGF0IHJlZmVyZW5jZSB0aGlzIEJpdG1hcERhdGEgaW5zdGFuY2UgZnJvbVxuXHQgKiB1cGRhdGluZyB1bnRpbCB5b3UgZmluaXNoIG1ha2luZyB0aGUgcGl4ZWwgY2hhbmdlcy48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSB4ICAgICBUaGUgPGk+eDwvaT4gcG9zaXRpb24gb2YgdGhlIHBpeGVsIHdob3NlIHZhbHVlIGNoYW5nZXMuXG5cdCAqIEBwYXJhbSB5ICAgICBUaGUgPGk+eTwvaT4gcG9zaXRpb24gb2YgdGhlIHBpeGVsIHdob3NlIHZhbHVlIGNoYW5nZXMuXG5cdCAqIEBwYXJhbSBjb2xvciBUaGUgcmVzdWx0aW5nIFJHQiBjb2xvciBmb3IgdGhlIHBpeGVsLlxuXHQgKi9cblx0cHVibGljIHNldFBpeGVsKHg6bnVtYmVyLCB5Om51bWJlciwgY29sb3I6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIGFyZ2I6bnVtYmVyW10gPSBDb2xvclV0aWxzLmZsb2F0MzJDb2xvclRvQVJHQihjb2xvcik7XG5cblx0XHRpZiAoIXRoaXMuX2xvY2tlZClcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuX3JlY3Qud2lkdGgsIHRoaXMuX3JlY3QuaGVpZ2h0KTtcblxuXHRcdHZhciBpbmRleDpudW1iZXIgPSAoeCArIHkqdGhpcy5faW1hZ2VDYW52YXMud2lkdGgpKjQ7XG5cblx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDBdID0gYXJnYlsxXTtcblx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDFdID0gYXJnYlsyXTtcblx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDJdID0gYXJnYlszXTtcblx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID0gMjU1O1xuXG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpIHtcblx0XHRcdHRoaXMuX2NvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuX2ltYWdlRGF0YSwgMCwgMCk7XG5cdFx0XHR0aGlzLl9pbWFnZURhdGEgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBjb2xvciBhbmQgYWxwaGEgdHJhbnNwYXJlbmN5IHZhbHVlcyBvZiBhIHNpbmdsZSBwaXhlbCBvZiBhXG5cdCAqIEJpdG1hcERhdGEgb2JqZWN0LiBUaGlzIG1ldGhvZCBpcyBzaW1pbGFyIHRvIHRoZSA8Y29kZT5zZXRQaXhlbCgpPC9jb2RlPlxuXHQgKiBtZXRob2Q7IHRoZSBtYWluIGRpZmZlcmVuY2UgaXMgdGhhdCB0aGUgPGNvZGU+c2V0UGl4ZWwzMigpPC9jb2RlPiBtZXRob2Rcblx0ICogdGFrZXMgYW4gQVJHQiBjb2xvciB2YWx1ZSB0aGF0IGNvbnRhaW5zIGFscGhhIGNoYW5uZWwgaW5mb3JtYXRpb24uXG5cdCAqXG5cdCAqIDxwPkFsbCBwaXhlbHMgaW4gYSBCaXRtYXBEYXRhIG9iamVjdCBhcmUgc3RvcmVkIGFzIHByZW11bHRpcGxpZWQgY29sb3Jcblx0ICogdmFsdWVzLiBBIHByZW11bHRpcGxpZWQgaW1hZ2UgcGl4ZWwgaGFzIHRoZSByZWQsIGdyZWVuLCBhbmQgYmx1ZSBjb2xvclxuXHQgKiBjaGFubmVsIHZhbHVlcyBhbHJlYWR5IG11bHRpcGxpZWQgYnkgdGhlIGFscGhhIGRhdGEuIEZvciBleGFtcGxlLCBpZiB0aGVcblx0ICogYWxwaGEgdmFsdWUgaXMgMCwgdGhlIHZhbHVlcyBmb3IgdGhlIFJHQiBjaGFubmVscyBhcmUgYWxzbyAwLCBpbmRlcGVuZGVudFxuXHQgKiBvZiB0aGVpciB1bm11bHRpcGxpZWQgdmFsdWVzLiBUaGlzIGxvc3Mgb2YgZGF0YSBjYW4gY2F1c2Ugc29tZSBwcm9ibGVtc1xuXHQgKiB3aGVuIHlvdSBwZXJmb3JtIG9wZXJhdGlvbnMuIEFsbCBCaXRtYXBEYXRhIG1ldGhvZHMgdGFrZSBhbmQgcmV0dXJuXG5cdCAqIHVubXVsdGlwbGllZCB2YWx1ZXMuIFRoZSBpbnRlcm5hbCBwaXhlbCByZXByZXNlbnRhdGlvbiBpcyBjb252ZXJ0ZWQgZnJvbVxuXHQgKiBwcmVtdWx0aXBsaWVkIHRvIHVubXVsdGlwbGllZCBiZWZvcmUgaXQgaXMgcmV0dXJuZWQgYXMgYSB2YWx1ZS4gRHVyaW5nIGFcblx0ICogc2V0IG9wZXJhdGlvbiwgdGhlIHBpeGVsIHZhbHVlIGlzIHByZW11bHRpcGxpZWQgYmVmb3JlIHRoZSByYXcgaW1hZ2UgcGl4ZWxcblx0ICogaXMgc2V0LjwvcD5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFRvIGluY3JlYXNlIHBlcmZvcm1hbmNlLCB3aGVuIHlvdSB1c2UgdGhlXG5cdCAqIDxjb2RlPnNldFBpeGVsKCk8L2NvZGU+IG9yIDxjb2RlPnNldFBpeGVsMzIoKTwvY29kZT4gbWV0aG9kIHJlcGVhdGVkbHksXG5cdCAqIGNhbGwgdGhlIDxjb2RlPmxvY2soKTwvY29kZT4gbWV0aG9kIGJlZm9yZSB5b3UgY2FsbCB0aGVcblx0ICogPGNvZGU+c2V0UGl4ZWwoKTwvY29kZT4gb3IgPGNvZGU+c2V0UGl4ZWwzMigpPC9jb2RlPiBtZXRob2QsIGFuZCB0aGVuIGNhbGxcblx0ICogdGhlIDxjb2RlPnVubG9jaygpPC9jb2RlPiBtZXRob2Qgd2hlbiB5b3UgaGF2ZSBtYWRlIGFsbCBwaXhlbCBjaGFuZ2VzLlxuXHQgKiBUaGlzIHByb2Nlc3MgcHJldmVudHMgb2JqZWN0cyB0aGF0IHJlZmVyZW5jZSB0aGlzIEJpdG1hcERhdGEgaW5zdGFuY2UgZnJvbVxuXHQgKiB1cGRhdGluZyB1bnRpbCB5b3UgZmluaXNoIG1ha2luZyB0aGUgcGl4ZWwgY2hhbmdlcy48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSB4ICAgICBUaGUgPGk+eDwvaT4gcG9zaXRpb24gb2YgdGhlIHBpeGVsIHdob3NlIHZhbHVlIGNoYW5nZXMuXG5cdCAqIEBwYXJhbSB5ICAgICBUaGUgPGk+eTwvaT4gcG9zaXRpb24gb2YgdGhlIHBpeGVsIHdob3NlIHZhbHVlIGNoYW5nZXMuXG5cdCAqIEBwYXJhbSBjb2xvciBUaGUgcmVzdWx0aW5nIEFSR0IgY29sb3IgZm9yIHRoZSBwaXhlbC4gSWYgdGhlIGJpdG1hcCBpc1xuXHQgKiAgICAgICAgICAgICAgb3BhcXVlKG5vdCB0cmFuc3BhcmVudCksIHRoZSBhbHBoYSB0cmFuc3BhcmVuY3kgcG9ydGlvbiBvZlxuXHQgKiAgICAgICAgICAgICAgdGhpcyBjb2xvciB2YWx1ZSBpcyBpZ25vcmVkLlxuXHQgKi9cblx0cHVibGljIHNldFBpeGVsMzIoeCwgeSwgY29sb3I6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIGFyZ2I6bnVtYmVyW10gPSBDb2xvclV0aWxzLmZsb2F0MzJDb2xvclRvQVJHQihjb2xvcik7XG5cblx0XHRpZiAoIXRoaXMuX2xvY2tlZClcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuX3JlY3Qud2lkdGgsIHRoaXMuX3JlY3QuaGVpZ2h0KTtcblxuXHRcdHZhciBpbmRleDpudW1iZXIgPSAoeCArIHkqdGhpcy5faW1hZ2VDYW52YXMud2lkdGgpKjQ7XG5cblx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDBdID0gYXJnYlsxXTtcblx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDFdID0gYXJnYlsyXTtcblx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDJdID0gYXJnYlszXTtcblx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID0gYXJnYlswXTtcblxuXHRcdGlmICghdGhpcy5fbG9ja2VkKSB7XG5cdFx0XHR0aGlzLl9jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLl9pbWFnZURhdGEsIDAsIDApO1xuXHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBieXRlIGFycmF5IGludG8gYSByZWN0YW5ndWxhciByZWdpb24gb2YgcGl4ZWwgZGF0YS4gRm9yIGVhY2hcblx0ICogcGl4ZWwsIHRoZSA8Y29kZT5CeXRlQXJyYXkucmVhZFVuc2lnbmVkSW50KCk8L2NvZGU+IG1ldGhvZCBpcyBjYWxsZWQgYW5kXG5cdCAqIHRoZSByZXR1cm4gdmFsdWUgaXMgd3JpdHRlbiBpbnRvIHRoZSBwaXhlbC4gSWYgdGhlIGJ5dGUgYXJyYXkgZW5kcyBiZWZvcmVcblx0ICogdGhlIGZ1bGwgcmVjdGFuZ2xlIGlzIHdyaXR0ZW4sIHRoZSBmdW5jdGlvbiByZXR1cm5zLiBUaGUgZGF0YSBpbiB0aGUgYnl0ZVxuXHQgKiBhcnJheSBpcyBleHBlY3RlZCB0byBiZSAzMi1iaXQgQVJHQiBwaXhlbCB2YWx1ZXMuIE5vIHNlZWtpbmcgaXMgcGVyZm9ybWVkXG5cdCAqIG9uIHRoZSBieXRlIGFycmF5IGJlZm9yZSBvciBhZnRlciB0aGUgcGl4ZWxzIGFyZSByZWFkLlxuXHQgKlxuXHQgKiBAcGFyYW0gcmVjdCAgICAgICAgICAgU3BlY2lmaWVzIHRoZSByZWN0YW5ndWxhciByZWdpb24gb2YgdGhlIEJpdG1hcERhdGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5cblx0ICogQHBhcmFtIGlucHV0Qnl0ZUFycmF5IEEgQnl0ZUFycmF5IG9iamVjdCB0aGF0IGNvbnNpc3RzIG9mIDMyLWJpdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdW5tdWx0aXBsaWVkIHBpeGVsIHZhbHVlcyB0byBiZSB1c2VkIGluIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcmVjdGFuZ3VsYXIgcmVnaW9uLlxuXHQgKiBAdGhyb3dzIEVPRkVycm9yICBUaGUgPGNvZGU+aW5wdXRCeXRlQXJyYXk8L2NvZGU+IG9iamVjdCBkb2VzIG5vdCBpbmNsdWRlXG5cdCAqICAgICAgICAgICAgICAgICAgIGVub3VnaCBkYXRhIHRvIGZpbGwgdGhlIGFyZWEgb2YgdGhlIDxjb2RlPnJlY3Q8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgIHJlY3RhbmdsZS4gVGhlIG1ldGhvZCBmaWxscyBhcyBtYW55IHBpeGVscyBhcyBwb3NzaWJsZVxuXHQgKiAgICAgICAgICAgICAgICAgICBiZWZvcmUgdGhyb3dpbmcgdGhlIGV4Y2VwdGlvbi5cblx0ICogQHRocm93cyBUeXBlRXJyb3IgVGhlIHJlY3Qgb3IgaW5wdXRCeXRlQXJyYXkgYXJlIG51bGwuXG5cdCAqL1xuXHRwdWJsaWMgc2V0UGl4ZWxzKHJlY3Q6UmVjdGFuZ2xlLCBpbnB1dEJ5dGVBcnJheTpCeXRlQXJyYXkpXG5cdHtcblx0XHRpZiAoIXRoaXMuX2xvY2tlZClcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuX3JlY3Qud2lkdGgsIHRoaXMuX3JlY3QuaGVpZ2h0KTtcblxuXHRcdGlucHV0Qnl0ZUFycmF5LnBvc2l0aW9uID0gMDtcblx0XHR2YXIgaTpudW1iZXIgLyp1aW50Ki8sIGo6bnVtYmVyIC8qdWludCovLCBpbmRleDpudW1iZXIgLyp1aW50Ki87XG5cdFx0Zm9yIChpID0gMDsgaSA8IHJlY3Qud2lkdGg7ICsraSkge1xuXHRcdFx0Zm9yIChqID0gMDsgaiA8IHJlY3QuaGVpZ2h0OyArK2opIHtcblx0XHRcdFx0aW5kZXggPSAoaSArIHJlY3QueCArIChqICsgcmVjdC55KSp0aGlzLl9pbWFnZUNhbnZhcy53aWR0aCkqNDtcblxuXHRcdFx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDBdID0gaW5wdXRCeXRlQXJyYXkucmVhZFVuc2lnbmVkSW50KCk7XG5cdFx0XHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMV0gPSBpbnB1dEJ5dGVBcnJheS5yZWFkVW5zaWduZWRJbnQoKTtcblx0XHRcdFx0dGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAyXSA9IGlucHV0Qnl0ZUFycmF5LnJlYWRVbnNpZ25lZEludCgpO1xuXHRcdFx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID0gaW5wdXRCeXRlQXJyYXkucmVhZFVuc2lnbmVkSW50KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpIHtcblx0XHRcdHRoaXMuX2NvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuX2ltYWdlRGF0YSwgMCwgMCk7XG5cdFx0XHR0aGlzLl9pbWFnZURhdGEgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBVbmxvY2tzIGFuIGltYWdlIHNvIHRoYXQgYW55IG9iamVjdHMgdGhhdCByZWZlcmVuY2UgdGhlIEJpdG1hcERhdGEgb2JqZWN0LFxuXHQgKiBzdWNoIGFzIEJpdG1hcCBvYmplY3RzLCBhcmUgdXBkYXRlZCB3aGVuIHRoaXMgQml0bWFwRGF0YSBvYmplY3QgY2hhbmdlcy5cblx0ICogVG8gaW1wcm92ZSBwZXJmb3JtYW5jZSwgdXNlIHRoaXMgbWV0aG9kIGFsb25nIHdpdGggdGhlIDxjb2RlPmxvY2soKTwvY29kZT5cblx0ICogbWV0aG9kIGJlZm9yZSBhbmQgYWZ0ZXIgbnVtZXJvdXMgY2FsbHMgdG8gdGhlIDxjb2RlPnNldFBpeGVsKCk8L2NvZGU+IG9yXG5cdCAqIDxjb2RlPnNldFBpeGVsMzIoKTwvY29kZT4gbWV0aG9kLlxuXHQgKlxuXHQgKiBAcGFyYW0gY2hhbmdlUmVjdCBUaGUgYXJlYSBvZiB0aGUgQml0bWFwRGF0YSBvYmplY3QgdGhhdCBoYXMgY2hhbmdlZC4gSWZcblx0ICogICAgICAgICAgICAgICAgICAgeW91IGRvIG5vdCBzcGVjaWZ5IGEgdmFsdWUgZm9yIHRoaXMgcGFyYW1ldGVyLCB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgZW50aXJlIGFyZWEgb2YgdGhlIEJpdG1hcERhdGEgb2JqZWN0IGlzIGNvbnNpZGVyZWRcblx0ICogICAgICAgICAgICAgICAgICAgY2hhbmdlZC5cblx0ICovXG5cdHB1YmxpYyB1bmxvY2soKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9sb2NrZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMuX2NvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuX2ltYWdlRGF0YSwgMCwgMCk7IC8vIGF0IGNvb3JkcyAwLDBcblx0XHR0aGlzLl9pbWFnZURhdGEgPSBudWxsO1xuXHR9XG5cblx0cHJpdmF0ZSBfY29weVBpeGVscyhibXBkOkJpdG1hcERhdGEsIHNvdXJjZVJlY3Q6UmVjdGFuZ2xlLCBkZXN0UmVjdDpSZWN0YW5nbGUpO1xuXHRwcml2YXRlIF9jb3B5UGl4ZWxzKGJtcGQ6SFRNTEltYWdlRWxlbWVudCwgc291cmNlUmVjdDpSZWN0YW5nbGUsIGRlc3RSZWN0OlJlY3RhbmdsZSk7XG5cdHByaXZhdGUgX2NvcHlQaXhlbHMoYm1wZDphbnksIHNvdXJjZVJlY3Q6UmVjdGFuZ2xlLCBkZXN0UmVjdDpSZWN0YW5nbGUpXG5cdHtcblxuXHRcdGlmIChibXBkIGluc3RhbmNlb2YgQml0bWFwRGF0YSkge1xuXHRcdFx0dGhpcy5fY29udGV4dC5kcmF3SW1hZ2UoYm1wZC5jYW52YXMsIHNvdXJjZVJlY3QueCwgc291cmNlUmVjdC55LCBzb3VyY2VSZWN0LndpZHRoLCBzb3VyY2VSZWN0LmhlaWdodCwgZGVzdFJlY3QueCwgZGVzdFJlY3QueSwgZGVzdFJlY3Qud2lkdGgsIGRlc3RSZWN0LmhlaWdodCk7XG5cdFx0fSBlbHNlIGlmIChibXBkIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuXHRcdFx0dGhpcy5fY29udGV4dC5kcmF3SW1hZ2UoYm1wZCwgc291cmNlUmVjdC54LCBzb3VyY2VSZWN0LnksIHNvdXJjZVJlY3Qud2lkdGgsIHNvdXJjZVJlY3QuaGVpZ2h0LCBkZXN0UmVjdC54LCBkZXN0UmVjdC55LCBkZXN0UmVjdC53aWR0aCwgZGVzdFJlY3QuaGVpZ2h0KTtcblx0XHR9XG5cblx0fVxuXG5cdHByaXZhdGUgX2RyYXcoc291cmNlOkJpdG1hcERhdGEsIG1hdHJpeDpNYXRyaXgsIGNvbG9yVHJhbnNmb3JtOkNvbG9yVHJhbnNmb3JtLCBibGVuZE1vZGU6QmxlbmRNb2RlLCBjbGlwUmVjdDpSZWN0YW5nbGUsIHNtb290aGluZzpib29sZWFuKTtcblx0cHJpdmF0ZSBfZHJhdyhzb3VyY2U6SFRNTEltYWdlRWxlbWVudCwgbWF0cml4Ok1hdHJpeCwgY29sb3JUcmFuc2Zvcm06Q29sb3JUcmFuc2Zvcm0sIGJsZW5kTW9kZTpCbGVuZE1vZGUsIGNsaXBSZWN0OlJlY3RhbmdsZSwgc21vb3RoaW5nOmJvb2xlYW4pO1xuXHRwcml2YXRlIF9kcmF3KHNvdXJjZTphbnksIG1hdHJpeDpNYXRyaXgsIGNvbG9yVHJhbnNmb3JtOkNvbG9yVHJhbnNmb3JtLCBibGVuZE1vZGU6QmxlbmRNb2RlLCBjbGlwUmVjdDpSZWN0YW5nbGUsIHNtb290aGluZzpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHNvdXJjZSBpbnN0YW5jZW9mIEJpdG1hcERhdGEpIHtcblx0XHRcdHRoaXMuX2NvbnRleHQuc2F2ZSgpO1xuXG5cdFx0XHRpZiAobWF0cml4ICE9IG51bGwpXG5cdFx0XHRcdHRoaXMuX2NvbnRleHQuc2V0VHJhbnNmb3JtKG1hdHJpeC5hLCBtYXRyaXguYiwgbWF0cml4LmMsIG1hdHJpeC5kLCBtYXRyaXgudHgsIG1hdHJpeC50eSk7XG5cblx0XHRcdGlmIChjbGlwUmVjdCAhPSBudWxsKVxuXHRcdFx0XHR0aGlzLl9jb250ZXh0LmRyYXdJbWFnZShzb3VyY2UuY2FudmFzLCBjbGlwUmVjdC54LCBjbGlwUmVjdC55LCBjbGlwUmVjdC53aWR0aCwgY2xpcFJlY3QuaGVpZ2h0KTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5fY29udGV4dC5kcmF3SW1hZ2Uoc291cmNlLmNhbnZhcywgMCwgMCk7XG5cblx0XHRcdHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuXG5cdFx0fSBlbHNlIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG5cdFx0XHR0aGlzLl9jb250ZXh0LnNhdmUoKTtcblxuXHRcdFx0aWYgKG1hdHJpeCAhPSBudWxsKVxuXHRcdFx0XHR0aGlzLl9jb250ZXh0LnNldFRyYW5zZm9ybShtYXRyaXguYSwgbWF0cml4LmIsIG1hdHJpeC5jLCBtYXRyaXguZCwgbWF0cml4LnR4LCBtYXRyaXgudHkpO1xuXG5cdFx0XHRpZiAoY2xpcFJlY3QgIT0gbnVsbClcblx0XHRcdFx0dGhpcy5fY29udGV4dC5kcmF3SW1hZ2Uoc291cmNlLCBjbGlwUmVjdC54LCBjbGlwUmVjdC55LCBjbGlwUmVjdC53aWR0aCwgY2xpcFJlY3QuaGVpZ2h0KTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5fY29udGV4dC5kcmF3SW1hZ2Uoc291cmNlLCAwLCAwKTtcblxuXHRcdFx0dGhpcy5fY29udGV4dC5yZXN0b3JlKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfZmlsbFJlY3QocmVjdDpSZWN0YW5nbGUsIGNvbG9yOm51bWJlcilcblx0e1xuXHRcdGlmIChjb2xvciA9PSAweDAgJiYgdGhpcy5fdHJhbnNwYXJlbnQpIHtcblx0XHRcdHRoaXMuX2NvbnRleHQuY2xlYXJSZWN0KHJlY3QueCwgcmVjdC55LCByZWN0LndpZHRoLCByZWN0LmhlaWdodCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBhcmdiOm51bWJlcltdID0gQ29sb3JVdGlscy5mbG9hdDMyQ29sb3JUb0FSR0IoY29sb3IpO1xuXG5cdFx0XHRpZiAodGhpcy5fdHJhbnNwYXJlbnQpXG5cdFx0XHRcdHRoaXMuX2NvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoJyArIGFyZ2JbMV0gKyAnLCcgKyBhcmdiWzJdICsgJywnICsgYXJnYlszXSArICcsJyArIGFyZ2JbMF0vMjU1ICsgJyknO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLl9jb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKCcgKyBhcmdiWzFdICsgJywnICsgYXJnYlsyXSArICcsJyArIGFyZ2JbM10gKyAnLDEpJztcblxuXHRcdFx0dGhpcy5fY29udGV4dC5maWxsUmVjdChyZWN0LngsIHJlY3QueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7SW1hZ2VEYXRhfVxuXHQgKi9cblx0cHVibGljIGdldCBpbWFnZURhdGEoKTpJbWFnZURhdGFcblx0e1xuXHRcdGlmICghdGhpcy5fbG9ja2VkKVxuXHRcdFx0cmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuX3JlY3Qud2lkdGgsIHRoaXMuX3JlY3QuaGVpZ2h0KTtcblxuXHRcdHJldHVybiB0aGlzLl9pbWFnZURhdGE7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge0hUTUxDYW52YXNFbGVtZW50fVxuXHQgKi9cblx0cHVibGljIGdldCBjYW52YXMoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2ltYWdlQ2FudmFzO1xuXHR9XG59XG5cbmV4cG9ydCA9IEJpdG1hcERhdGE7Il19