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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9iYXNlL0JpdG1hcERhdGEudHMiXSwibmFtZXMiOlsiQml0bWFwRGF0YSIsIkJpdG1hcERhdGEuY29uc3RydWN0b3IiLCJCaXRtYXBEYXRhLmhlaWdodCIsIkJpdG1hcERhdGEucmVjdCIsIkJpdG1hcERhdGEudHJhbnNwYXJlbnQiLCJCaXRtYXBEYXRhLndpZHRoIiwiQml0bWFwRGF0YS5jbG9uZSIsIkJpdG1hcERhdGEuY29sb3JUcmFuc2Zvcm0iLCJCaXRtYXBEYXRhLmNvcHlDaGFubmVsIiwiQml0bWFwRGF0YS5jb3B5UGl4ZWxzIiwiQml0bWFwRGF0YS5kaXNwb3NlIiwiQml0bWFwRGF0YS5kcmF3IiwiQml0bWFwRGF0YS5maWxsUmVjdCIsIkJpdG1hcERhdGEuZ2V0UGl4ZWwiLCJCaXRtYXBEYXRhLmdldFBpeGVsMzIiLCJCaXRtYXBEYXRhLmxvY2siLCJCaXRtYXBEYXRhLnNldEFycmF5IiwiQml0bWFwRGF0YS5zZXRQaXhlbCIsIkJpdG1hcERhdGEuc2V0UGl4ZWwzMiIsIkJpdG1hcERhdGEuc2V0UGl4ZWxzIiwiQml0bWFwRGF0YS51bmxvY2siLCJCaXRtYXBEYXRhLl9jb3B5UGl4ZWxzIiwiQml0bWFwRGF0YS5fZHJhdyIsIkJpdG1hcERhdGEuX2ZpbGxSZWN0IiwiQml0bWFwRGF0YS5pbWFnZURhdGEiLCJCaXRtYXBEYXRhLmNhbnZhcyJdLCJtYXBwaW5ncyI6IkFBR0EsSUFBTyxTQUFTLFdBQWMsZ0NBQWdDLENBQUMsQ0FBQztBQUdoRSxJQUFPLFVBQVUsV0FBYyxrQ0FBa0MsQ0FBQyxDQUFDO0FBRW5FLEFBeURBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQURHO0lBQ0csVUFBVTtJQXFGZkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCR0E7SUFDSEEsU0FqSEtBLFVBQVVBLENBaUhIQSxLQUFZQSxFQUFFQSxNQUFhQSxFQUFFQSxXQUEwQkEs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RUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDakJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBRXpGQSxJQUFJQSxJQUFJQSxHQUFpQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFFOUNBLElBQUlBLENBQUNBLENBQVFBLFFBQURBLEFBQVNBLEVBQUVBLENBQUNBLENBQVFBLFFBQURBLEFBQVNBLEVBQUVBLEtBQUtBLENBQVFBLFFBQURBLEFBQVNBLENBQUNBO1FBQ2hFQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNqQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQ2xDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtnQkFFakRBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUNBLGNBQWNBLENBQUNBLGFBQWFBLEdBQUdBLGNBQWNBLENBQUNBLFNBQVNBLENBQUNBO2dCQUNsRkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsY0FBY0EsQ0FBQ0EsZUFBZUEsR0FBR0EsY0FBY0EsQ0FBQ0EsV0FBV0EsQ0FBQ0E7Z0JBQzlGQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxjQUFjQSxDQUFDQSxjQUFjQSxHQUFHQSxjQUFjQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFDNUZBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLGNBQWNBLENBQUNBLGVBQWVBLEdBQUdBLGNBQWNBLENBQUNBLFdBQVdBLENBQUNBO1lBQy9GQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNuQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbERBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3hCQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUVEUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMENHQTtJQUNJQSxnQ0FBV0EsR0FBbEJBLFVBQW1CQSxZQUF1QkEsRUFBRUEsVUFBb0JBLEVBQUVBLFNBQWVBLEVBQUVBLGFBQW9CQSxFQUFFQSxXQUFrQkE7UUFFMUhRLElBQUlBLFNBQVNBLEdBQWFBLFlBQVlBLENBQUNBLFNBQVNBLENBQUNBO1FBRWpEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUNqQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFFekZBLElBQUlBLFVBQVVBLEdBQWlCQSxZQUFZQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUMzREEsSUFBSUEsUUFBUUEsR0FBaUJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBO1FBRWxEQSxJQUFJQSxZQUFZQSxHQUFVQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxhQUFhQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMxRUEsSUFBSUEsVUFBVUEsR0FBVUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFdEVBLElBQUlBLENBQUNBLENBQVFBLFFBQURBLEFBQVNBLEVBQUVBLENBQUNBLENBQVFBLFFBQURBLEFBQVNBLEVBQUVBLFdBQVdBLENBQVFBLFFBQURBLEFBQVNBLEVBQUVBLFNBQVNBLENBQVFBLFFBQURBLEFBQVNBLENBQUNBO1FBQ2pHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxVQUFVQSxDQUFDQSxLQUFLQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUN2Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsVUFBVUEsQ0FBQ0EsTUFBTUEsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEs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Q0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFakVBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RCQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN0QkEsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBRXZCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxJQUFJQSxLQUFLQSxHQUFVQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtZQUVyREEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDcENBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQ3BDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNwQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDckNBLENBQUNBO1FBRURBLEFBQ0FBLG9DQURvQ0E7UUFDcENBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ05BLE1BQU1BLENBQUNBLEdBQUdB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QUlBLENBQUNBLE9BQU9BLENBQUNBO1lBQ2pCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUV6RkEsSUFBSUEsQ0FBQ0EsQ0FBUUEsUUFBREEsQUFBU0EsRUFBRUEsQ0FBQ0EsQ0FBUUEsUUFBREEsQUFBU0EsRUFBRUEsS0FBS0EsQ0FBUUEsUUFBREEsQUFBU0EsRUFBRUEsSUFBSUEsQ0FBVUEsUUFBREEsQUFBU0EsQ0FBQ0E7UUFDeEZBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ2pDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDbENBLElBQUlBLEdBQUdBLFVBQVVBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25FQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtnQkFFOURBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDMUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzNDQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNuQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbERBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3hCQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUVEaEI7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkdBO0lBQ0lBLDZCQUFRQSxHQUFmQSxVQUFnQkEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsS0FBWUE7UUFFL0NpQixJQUFJQSxJQUFJQSxHQUFZQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBRXpEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUNqQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFFekZBLElBQUlBLEtBQUtBLEdBQVVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1FBRXJEQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMxQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDMUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtRQUV0Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbkJBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQ2xEQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUN4QkEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFRGpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4QkdBO0lBQ0lBLCtCQUFVQSxHQUFqQkEsVUFBa0JBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEtBQVlBO1FBRW5Da0IsSUFBSUEsSUFBSUEsR0FBWUEsVUFBVUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUV6REEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDakJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBRXpGQSxJQUFJQSxLQUFLQSxHQUFVQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtRQUVyREEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDMUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMxQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFMUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO1lBQ25CQSxJ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LENBQUNBLE1BQU1BLFlBQVlBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtZQUVyQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQ2xCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxFQUFFQSxFQUFFQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUUxRkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQ3BCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUMxRkEsSUFBSUE7Z0JBQ0hBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBRXZDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFT3RCLDhCQUFTQSxHQUFqQkEsVUFBa0JBLElBQWNBLEVBQUVBLEtBQVlBO1FBRTdDdUIsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsR0FBR0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdkNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQ2xFQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxJQUFJQSxJQUFJQSxHQUFZQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBRXpEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtnQkFDckJBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLEdBQUdBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ3ZHQSxJQUFJQTtnQkFDSEEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsR0FBR0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFckZBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQ2pFQSxDQUFDQTtJQUNGQSxDQUFDQTtJQU1EdkIsc0JBQVdBLGlDQUFTQTtRQUpwQkE7OztXQUdHQTthQUNIQTtZQUVDd0IsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7Z0JBQ2pCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUU5RUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFDeEJBLENBQUNBOzs7T0FBQXhCO0lBTURBLHNCQUFXQSw4QkFBTUE7UUFKakJBOzs7V0FHR0E7YUFDSEE7WUFFQ3lCLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BQUF6QjtJQUNGQSxpQkFBQ0E7QUFBREEsQ0F2MUJBLEFBdTFCQ0EsSUFBQTtBQUVELEFBQW9CLGlCQUFYLFVBQVUsQ0FBQyIsImZpbGUiOiJiYXNlL0JpdG1hcERhdGEuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJsZW5kTW9kZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Jhc2UvQmxlbmRNb2RlXCIpO1xuaW1wb3J0IENvbG9yVHJhbnNmb3JtXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vQ29sb3JUcmFuc2Zvcm1cIik7XG5pbXBvcnQgTWF0cml4XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeFwiKTtcbmltcG9ydCBSZWN0YW5nbGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1JlY3RhbmdsZVwiKTtcbmltcG9ydCBQb2ludFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Qb2ludFwiKTtcbmltcG9ydCBCeXRlQXJyYXlcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi91dGlscy9CeXRlQXJyYXlcIik7XG5pbXBvcnQgQ29sb3JVdGlsc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL0NvbG9yVXRpbHNcIik7XG5cbi8qKlxuICogVGhlIEJpdG1hcERhdGEgY2xhc3MgbGV0cyB5b3Ugd29yayB3aXRoIHRoZSBkYXRhKHBpeGVscykgb2YgYSBCaXRtYXBcbiAqIG9iamVjdC4gWW91IGNhbiB1c2UgdGhlIG1ldGhvZHMgb2YgdGhlIEJpdG1hcERhdGEgY2xhc3MgdG8gY3JlYXRlXG4gKiBhcmJpdHJhcmlseSBzaXplZCB0cmFuc3BhcmVudCBvciBvcGFxdWUgYml0bWFwIGltYWdlcyBhbmQgbWFuaXB1bGF0ZSB0aGVtXG4gKiBpbiB2YXJpb3VzIHdheXMgYXQgcnVudGltZS4gWW91IGNhbiBhbHNvIGFjY2VzcyB0aGUgQml0bWFwRGF0YSBmb3IgYSBiaXRtYXBcbiAqIGltYWdlIHRoYXQgeW91IGxvYWQgd2l0aCB0aGUgPGNvZGU+Zmxhc2guQXNzZXRzPC9jb2RlPiBvclxuICogPGNvZGU+Zmxhc2guZGlzcGxheS5Mb2FkZXI8L2NvZGU+IGNsYXNzZXMuXG4gKlxuICogPHA+VGhpcyBjbGFzcyBsZXRzIHlvdSBzZXBhcmF0ZSBiaXRtYXAgcmVuZGVyaW5nIG9wZXJhdGlvbnMgZnJvbSB0aGVcbiAqIGludGVybmFsIGRpc3BsYXkgdXBkYXRpbmcgcm91dGluZXMgb2YgZmxhc2guIEJ5IG1hbmlwdWxhdGluZyBhXG4gKiBCaXRtYXBEYXRhIG9iamVjdCBkaXJlY3RseSwgeW91IGNhbiBjcmVhdGUgY29tcGxleCBpbWFnZXMgd2l0aG91dCBpbmN1cnJpbmdcbiAqIHRoZSBwZXItZnJhbWUgb3ZlcmhlYWQgb2YgY29uc3RhbnRseSByZWRyYXdpbmcgdGhlIGNvbnRlbnQgZnJvbSB2ZWN0b3JcbiAqIGRhdGEuPC9wPlxuICpcbiAqIDxwPlRoZSBtZXRob2RzIG9mIHRoZSBCaXRtYXBEYXRhIGNsYXNzIHN1cHBvcnQgZWZmZWN0cyB0aGF0IGFyZSBub3RcbiAqIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSBmaWx0ZXJzIGF2YWlsYWJsZSB0byBub24tYml0bWFwIGRpc3BsYXkgb2JqZWN0cy48L3A+XG4gKlxuICogPHA+QSBCaXRtYXBEYXRhIG9iamVjdCBjb250YWlucyBhbiBhcnJheSBvZiBwaXhlbCBkYXRhLiBUaGlzIGRhdGEgY2FuXG4gKiByZXByZXNlbnQgZWl0aGVyIGEgZnVsbHkgb3BhcXVlIGJpdG1hcCBvciBhIHRyYW5zcGFyZW50IGJpdG1hcCB0aGF0XG4gKiBjb250YWlucyBhbHBoYSBjaGFubmVsIGRhdGEuIEVpdGhlciB0eXBlIG9mIEJpdG1hcERhdGEgb2JqZWN0IGlzIHN0b3JlZCBhc1xuICogYSBidWZmZXIgb2YgMzItYml0IGludGVnZXJzLiBFYWNoIDMyLWJpdCBpbnRlZ2VyIGRldGVybWluZXMgdGhlIHByb3BlcnRpZXNcbiAqIG9mIGEgc2luZ2xlIHBpeGVsIGluIHRoZSBiaXRtYXAuPC9wPlxuICpcbiAqIDxwPkVhY2ggMzItYml0IGludGVnZXIgaXMgYSBjb21iaW5hdGlvbiBvZiBmb3VyIDgtYml0IGNoYW5uZWwgdmFsdWVzKGZyb21cbiAqIDAgdG8gMjU1KSB0aGF0IGRlc2NyaWJlIHRoZSBhbHBoYSB0cmFuc3BhcmVuY3kgYW5kIHRoZSByZWQsIGdyZWVuLCBhbmQgYmx1ZVxuICogKEFSR0IpIHZhbHVlcyBvZiB0aGUgcGl4ZWwuKEZvciBBUkdCIHZhbHVlcywgdGhlIG1vc3Qgc2lnbmlmaWNhbnQgYnl0ZVxuICogcmVwcmVzZW50cyB0aGUgYWxwaGEgY2hhbm5lbCB2YWx1ZSwgZm9sbG93ZWQgYnkgcmVkLCBncmVlbiwgYW5kIGJsdWUuKTwvcD5cbiAqXG4gKiA8cD5UaGUgZm91ciBjaGFubmVscyhhbHBoYSwgcmVkLCBncmVlbiwgYW5kIGJsdWUpIGFyZSByZXByZXNlbnRlZCBhc1xuICogbnVtYmVycyB3aGVuIHlvdSB1c2UgdGhlbSB3aXRoIHRoZSA8Y29kZT5CaXRtYXBEYXRhLmNvcHlDaGFubmVsKCk8L2NvZGU+XG4gKiBtZXRob2Qgb3IgdGhlIDxjb2RlPkRpc3BsYWNlbWVudE1hcEZpbHRlci5jb21wb25lbnRYPC9jb2RlPiBhbmRcbiAqIDxjb2RlPkRpc3BsYWNlbWVudE1hcEZpbHRlci5jb21wb25lbnRZPC9jb2RlPiBwcm9wZXJ0aWVzLCBhbmQgdGhlc2UgbnVtYmVyc1xuICogYXJlIHJlcHJlc2VudGVkIGJ5IHRoZSBmb2xsb3dpbmcgY29uc3RhbnRzIGluIHRoZSBCaXRtYXBEYXRhQ2hhbm5lbFxuICogY2xhc3M6PC9wPlxuICpcbiAqIDx1bD5cbiAqICAgPGxpPjxjb2RlPkJpdG1hcERhdGFDaGFubmVsLkFMUEhBPC9jb2RlPjwvbGk+XG4gKiAgIDxsaT48Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5SRUQ8L2NvZGU+PC9saT5cbiAqICAgPGxpPjxjb2RlPkJpdG1hcERhdGFDaGFubmVsLkdSRUVOPC9jb2RlPjwvbGk+XG4gKiAgIDxsaT48Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5CTFVFPC9jb2RlPjwvbGk+XG4gKiA8L3VsPlxuICpcbiAqIDxwPllvdSBjYW4gYXR0YWNoIEJpdG1hcERhdGEgb2JqZWN0cyB0byBhIEJpdG1hcCBvYmplY3QgYnkgdXNpbmcgdGhlXG4gKiA8Y29kZT5iaXRtYXBEYXRhPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgQml0bWFwIG9iamVjdC48L3A+XG4gKlxuICogPHA+WW91IGNhbiB1c2UgYSBCaXRtYXBEYXRhIG9iamVjdCB0byBmaWxsIGEgR3JhcGhpY3Mgb2JqZWN0IGJ5IHVzaW5nIHRoZVxuICogPGNvZGU+R3JhcGhpY3MuYmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+IG1ldGhvZC48L3A+XG4gKlxuICogPHA+WW91IGNhbiBhbHNvIHVzZSBhIEJpdG1hcERhdGEgb2JqZWN0IHRvIHBlcmZvcm0gYmF0Y2ggdGlsZSByZW5kZXJpbmdcbiAqIHVzaW5nIHRoZSA8Y29kZT5mbGFzaC5kaXNwbGF5LlRpbGVzaGVldDwvY29kZT4gY2xhc3MuPC9wPlxuICpcbiAqIDxwPkluIEZsYXNoIFBsYXllciAxMCwgdGhlIG1heGltdW0gc2l6ZSBmb3IgYSBCaXRtYXBEYXRhIG9iamVjdFxuICogaXMgOCwxOTEgcGl4ZWxzIGluIHdpZHRoIG9yIGhlaWdodCwgYW5kIHRoZSB0b3RhbCBudW1iZXIgb2YgcGl4ZWxzIGNhbm5vdFxuICogZXhjZWVkIDE2LDc3NywyMTUgcGl4ZWxzLihTbywgaWYgYSBCaXRtYXBEYXRhIG9iamVjdCBpcyA4LDE5MSBwaXhlbHMgd2lkZSxcbiAqIGl0IGNhbiBvbmx5IGJlIDIsMDQ4IHBpeGVscyBoaWdoLikgSW4gRmxhc2ggUGxheWVyIDkgYW5kIGVhcmxpZXIsIHRoZSBsaW1pdGF0aW9uXG4gKiBpcyAyLDg4MCBwaXhlbHMgaW4gaGVpZ2h0IGFuZCAyLDg4MCBpbiB3aWR0aC48L3A+XG4gKi9cbmNsYXNzIEJpdG1hcERhdGFcbntcblx0cHJpdmF0ZSBfaW1hZ2VDYW52YXM6SFRNTENhbnZhc0VsZW1lbnQ7XG5cdHByaXZhdGUgX2NvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXHRwcml2YXRlIF9pbWFnZURhdGE6SW1hZ2VEYXRhO1xuXHRwcml2YXRlIF9yZWN0OlJlY3RhbmdsZTtcblx0cHJpdmF0ZSBfdHJhbnNwYXJlbnQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfbG9ja2VkOmJvb2xlYW4gPSBmYWxzZTtcblxuXHQvKipcblx0ICogVGhlIGhlaWdodCBvZiB0aGUgYml0bWFwIGltYWdlIGluIHBpeGVscy5cblx0ICovXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcmVjdC5oZWlnaHQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGhlaWdodCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fcmVjdC5oZWlnaHQgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9yZWN0LmhlaWdodCA9IHZhbHVlO1xuXG5cdFx0aWYgKHRoaXMuX2xvY2tlZClcblx0XHRcdHRoaXMuX2NvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuX2ltYWdlRGF0YSwgMCwgMCk7XG5cblx0XHR0aGlzLl9pbWFnZUNhbnZhcy5oZWlnaHQgPSB2YWx1ZTtcblxuXHRcdGlmICh0aGlzLl9sb2NrZWQpXG5cdFx0XHR0aGlzLl9pbWFnZURhdGEgPSB0aGlzLl9jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLl9yZWN0LndpZHRoLCB0aGlzLl9yZWN0LmhlaWdodCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIHNpemUgYW5kIGxvY2F0aW9uIG9mIHRoZSBiaXRtYXAgaW1hZ2UuIFRoZVxuXHQgKiB0b3AgYW5kIGxlZnQgb2YgdGhlIHJlY3RhbmdsZSBhcmUgMDsgdGhlIHdpZHRoIGFuZCBoZWlnaHQgYXJlIGVxdWFsIHRvIHRoZVxuXHQgKiB3aWR0aCBhbmQgaGVpZ2h0IGluIHBpeGVscyBvZiB0aGUgQml0bWFwRGF0YSBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJlY3QoKTpSZWN0YW5nbGVcblx0e1xuXHRcdHJldHVybiB0aGlzLl9yZWN0O1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgd2hldGhlciB0aGUgYml0bWFwIGltYWdlIHN1cHBvcnRzIHBlci1waXhlbCB0cmFuc3BhcmVuY3kuIFlvdSBjYW5cblx0ICogc2V0IHRoaXMgdmFsdWUgb25seSB3aGVuIHlvdSBjb25zdHJ1Y3QgYSBCaXRtYXBEYXRhIG9iamVjdCBieSBwYXNzaW5nIGluXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+IGZvciB0aGUgPGNvZGU+dHJhbnNwYXJlbnQ8L2NvZGU+IHBhcmFtZXRlciBvZiB0aGVcblx0ICogY29uc3RydWN0b3IuIFRoZW4sIGFmdGVyIHlvdSBjcmVhdGUgYSBCaXRtYXBEYXRhIG9iamVjdCwgeW91IGNhbiBjaGVja1xuXHQgKiB3aGV0aGVyIGl0IHN1cHBvcnRzIHBlci1waXhlbCB0cmFuc3BhcmVuY3kgYnkgZGV0ZXJtaW5pbmcgaWYgdGhlIHZhbHVlIG9mXG5cdCAqIHRoZSA8Y29kZT50cmFuc3BhcmVudDwvY29kZT4gcHJvcGVydHkgaXMgPGNvZGU+dHJ1ZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRyYW5zcGFyZW50KCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3RyYW5zcGFyZW50O1xuXHR9XG5cblx0cHVibGljIHNldCB0cmFuc3BhcmVudCh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0dGhpcy5fdHJhbnNwYXJlbnQgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgd2lkdGggb2YgdGhlIGJpdG1hcCBpbWFnZSBpbiBwaXhlbHMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcmVjdC53aWR0aDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgd2lkdGgodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3JlY3Qud2lkdGggPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9yZWN0LndpZHRoID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fbG9ja2VkKVxuXHRcdFx0dGhpcy5fY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5faW1hZ2VEYXRhLCAwLCAwKTtcblxuXHRcdHRoaXMuX2ltYWdlQ2FudmFzLndpZHRoID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fbG9ja2VkKVxuXHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5fcmVjdC53aWR0aCwgdGhpcy5fcmVjdC5oZWlnaHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBCaXRtYXBEYXRhIG9iamVjdCB3aXRoIGEgc3BlY2lmaWVkIHdpZHRoIGFuZCBoZWlnaHQuIElmIHlvdVxuXHQgKiBzcGVjaWZ5IGEgdmFsdWUgZm9yIHRoZSA8Y29kZT5maWxsQ29sb3I8L2NvZGU+IHBhcmFtZXRlciwgZXZlcnkgcGl4ZWwgaW5cblx0ICogdGhlIGJpdG1hcCBpcyBzZXQgdG8gdGhhdCBjb2xvci5cblx0ICpcblx0ICogPHA+QnkgZGVmYXVsdCwgdGhlIGJpdG1hcCBpcyBjcmVhdGVkIGFzIHRyYW5zcGFyZW50LCB1bmxlc3MgeW91IHBhc3Ncblx0ICogdGhlIHZhbHVlIDxjb2RlPmZhbHNlPC9jb2RlPiBmb3IgdGhlIHRyYW5zcGFyZW50IHBhcmFtZXRlci4gQWZ0ZXIgeW91XG5cdCAqIGNyZWF0ZSBhbiBvcGFxdWUgYml0bWFwLCB5b3UgY2Fubm90IGNoYW5nZSBpdCB0byBhIHRyYW5zcGFyZW50IGJpdG1hcC5cblx0ICogRXZlcnkgcGl4ZWwgaW4gYW4gb3BhcXVlIGJpdG1hcCB1c2VzIG9ubHkgMjQgYml0cyBvZiBjb2xvciBjaGFubmVsXG5cdCAqIGluZm9ybWF0aW9uLiBJZiB5b3UgZGVmaW5lIHRoZSBiaXRtYXAgYXMgdHJhbnNwYXJlbnQsIGV2ZXJ5IHBpeGVsIHVzZXMgMzJcblx0ICogYml0cyBvZiBjb2xvciBjaGFubmVsIGluZm9ybWF0aW9uLCBpbmNsdWRpbmcgYW4gYWxwaGEgdHJhbnNwYXJlbmN5XG5cdCAqIGNoYW5uZWwuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gd2lkdGggICAgICAgVGhlIHdpZHRoIG9mIHRoZSBiaXRtYXAgaW1hZ2UgaW4gcGl4ZWxzLlxuXHQgKiBAcGFyYW0gaGVpZ2h0ICAgICAgVGhlIGhlaWdodCBvZiB0aGUgYml0bWFwIGltYWdlIGluIHBpeGVscy5cblx0ICogQHBhcmFtIHRyYW5zcGFyZW50IFNwZWNpZmllcyB3aGV0aGVyIHRoZSBiaXRtYXAgaW1hZ2Ugc3VwcG9ydHMgcGVyLXBpeGVsXG5cdCAqICAgICAgICAgICAgICAgICAgICB0cmFuc3BhcmVuY3kuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDxjb2RlPnRydWU8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAodHJhbnNwYXJlbnQpLiBUbyBjcmVhdGUgYSBmdWxseSB0cmFuc3BhcmVudCBiaXRtYXAsXG5cdCAqICAgICAgICAgICAgICAgICAgICBzZXQgdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT50cmFuc3BhcmVudDwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlciB0byA8Y29kZT50cnVlPC9jb2RlPiBhbmQgdGhlIHZhbHVlIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgPGNvZGU+ZmlsbENvbG9yPC9jb2RlPiBwYXJhbWV0ZXIgdG8gMHgwMDAwMDAwMChvciB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgMCkuIFNldHRpbmcgdGhlIDxjb2RlPnRyYW5zcGFyZW50PC9jb2RlPiBwcm9wZXJ0eSB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgPGNvZGU+ZmFsc2U8L2NvZGU+IGNhbiByZXN1bHQgaW4gbWlub3IgaW1wcm92ZW1lbnRzXG5cdCAqICAgICAgICAgICAgICAgICAgICBpbiByZW5kZXJpbmcgcGVyZm9ybWFuY2UuXG5cdCAqIEBwYXJhbSBmaWxsQ29sb3IgICBBIDMyLWJpdCBBUkdCIGNvbG9yIHZhbHVlIHRoYXQgeW91IHVzZSB0byBmaWxsIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgYml0bWFwIGltYWdlIGFyZWEuIFRoZSBkZWZhdWx0IHZhbHVlIGlzXG5cdCAqICAgICAgICAgICAgICAgICAgICAweEZGRkZGRkZGKHNvbGlkIHdoaXRlKS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlciwgdHJhbnNwYXJlbnQ6Ym9vbGVhbiA9IHRydWUsIGZpbGxDb2xvcjpudW1iZXIgPSBudWxsKVxuXHR7XG5cdFx0dGhpcy5fdHJhbnNwYXJlbnQgPSB0cmFuc3BhcmVudDtcblx0XHR0aGlzLl9pbWFnZUNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblx0XHR0aGlzLl9pbWFnZUNhbnZhcy53aWR0aCA9IHdpZHRoO1xuXHRcdHRoaXMuX2ltYWdlQ2FudmFzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLl9jb250ZXh0ID0gdGhpcy5faW1hZ2VDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXHRcdHRoaXMuX3JlY3QgPSBuZXcgUmVjdGFuZ2xlKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG5cdFx0aWYgKGZpbGxDb2xvciAhPSBudWxsKVxuXHRcdFx0dGhpcy5maWxsUmVjdCh0aGlzLl9yZWN0LCBmaWxsQ29sb3IpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBuZXcgQml0bWFwRGF0YSBvYmplY3QgdGhhdCBpcyBhIGNsb25lIG9mIHRoZSBvcmlnaW5hbCBpbnN0YW5jZVxuXHQgKiB3aXRoIGFuIGV4YWN0IGNvcHkgb2YgdGhlIGNvbnRhaW5lZCBiaXRtYXAuXG5cdCAqXG5cdCAqIEByZXR1cm4gQSBuZXcgQml0bWFwRGF0YSBvYmplY3QgdGhhdCBpcyBpZGVudGljYWwgdG8gdGhlIG9yaWdpbmFsLlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6Qml0bWFwRGF0YVxuXHR7XG5cdFx0dmFyIHQ6Qml0bWFwRGF0YSA9IG5ldyBCaXRtYXBEYXRhKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLnRyYW5zcGFyZW50KTtcblx0XHR0LmRyYXcodGhpcyk7XG5cdFx0cmV0dXJuIHQ7XG5cdH1cblxuXHQvKipcblx0ICogQWRqdXN0cyB0aGUgY29sb3IgdmFsdWVzIGluIGEgc3BlY2lmaWVkIGFyZWEgb2YgYSBiaXRtYXAgaW1hZ2UgYnkgdXNpbmcgYVxuXHQgKiA8Y29kZT5Db2xvclRyYW5zZm9ybTwvY29kZT4gb2JqZWN0LiBJZiB0aGUgcmVjdGFuZ2xlIG1hdGNoZXMgdGhlXG5cdCAqIGJvdW5kYXJpZXMgb2YgdGhlIGJpdG1hcCBpbWFnZSwgdGhpcyBtZXRob2QgdHJhbnNmb3JtcyB0aGUgY29sb3IgdmFsdWVzIG9mXG5cdCAqIHRoZSBlbnRpcmUgaW1hZ2UuXG5cdCAqXG5cdCAqIEBwYXJhbSByZWN0ICAgICAgICAgICBBIFJlY3RhbmdsZSBvYmplY3QgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2UgaW4gd2hpY2ggdGhlIENvbG9yVHJhbnNmb3JtIG9iamVjdCBpcyBhcHBsaWVkLlxuXHQgKiBAcGFyYW0gY29sb3JUcmFuc2Zvcm0gQSBDb2xvclRyYW5zZm9ybSBvYmplY3QgdGhhdCBkZXNjcmliZXMgdGhlIGNvbG9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1hdGlvbiB2YWx1ZXMgdG8gYXBwbHkuXG5cdCAqL1xuXHRwdWJsaWMgY29sb3JUcmFuc2Zvcm0ocmVjdDpSZWN0YW5nbGUsIGNvbG9yVHJhbnNmb3JtOkNvbG9yVHJhbnNmb3JtKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpXG5cdFx0XHR0aGlzLl9pbWFnZURhdGEgPSB0aGlzLl9jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLl9yZWN0LndpZHRoLCB0aGlzLl9yZWN0LmhlaWdodCk7XG5cblx0XHR2YXIgZGF0YTpBcnJheTxudW1iZXI+ID0gdGhpcy5faW1hZ2VEYXRhLmRhdGE7XG5cblx0XHR2YXIgaTpudW1iZXIgLyp1aW50Ki8sIGo6bnVtYmVyIC8qdWludCovLCBpbmRleDpudW1iZXIgLyp1aW50Ki87XG5cdFx0Zm9yIChpID0gMDsgaSA8IHJlY3Qud2lkdGg7ICsraSkge1xuXHRcdFx0Zm9yIChqID0gMDsgaiA8IHJlY3QuaGVpZ2h0OyArK2opIHtcblx0XHRcdFx0aW5kZXggPSAoaSArIHJlY3QueCArIChqICsgcmVjdC55KSp0aGlzLndpZHRoKSo0O1xuXG5cdFx0XHRcdGRhdGFbaW5kZXhdID0gZGF0YVtpbmRleF0qY29sb3JUcmFuc2Zvcm0ucmVkTXVsdGlwbGllciArIGNvbG9yVHJhbnNmb3JtLnJlZE9mZnNldDtcblx0XHRcdFx0ZGF0YVtpbmRleCArIDFdID0gZGF0YVtpbmRleCArIDFdKmNvbG9yVHJhbnNmb3JtLmdyZWVuTXVsdGlwbGllciArIGNvbG9yVHJhbnNmb3JtLmdyZWVuT2Zmc2V0O1xuXHRcdFx0XHRkYXRhW2luZGV4ICsgMl0gPSBkYXRhW2luZGV4ICsgMl0qY29sb3JUcmFuc2Zvcm0uYmx1ZU11bHRpcGxpZXIgKyBjb2xvclRyYW5zZm9ybS5ibHVlT2Zmc2V0O1xuXHRcdFx0XHRkYXRhW2luZGV4ICsgM10gPSBkYXRhW2luZGV4ICsgM10qY29sb3JUcmFuc2Zvcm0uYWxwaGFNdWx0aXBsaWVyICsgY29sb3JUcmFuc2Zvcm0uYWxwaGFPZmZzZXQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpIHtcblx0XHRcdHRoaXMuX2NvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuX2ltYWdlRGF0YSwgMCwgMCk7XG5cdFx0XHR0aGlzLl9pbWFnZURhdGEgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBUcmFuc2ZlcnMgZGF0YSBmcm9tIG9uZSBjaGFubmVsIG9mIGFub3RoZXIgQml0bWFwRGF0YSBvYmplY3Qgb3IgdGhlXG5cdCAqIGN1cnJlbnQgQml0bWFwRGF0YSBvYmplY3QgaW50byBhIGNoYW5uZWwgb2YgdGhlIGN1cnJlbnQgQml0bWFwRGF0YSBvYmplY3QuXG5cdCAqIEFsbCBvZiB0aGUgZGF0YSBpbiB0aGUgb3RoZXIgY2hhbm5lbHMgaW4gdGhlIGRlc3RpbmF0aW9uIEJpdG1hcERhdGEgb2JqZWN0XG5cdCAqIGFyZSBwcmVzZXJ2ZWQuXG5cdCAqXG5cdCAqIDxwPlRoZSBzb3VyY2UgY2hhbm5lbCB2YWx1ZSBhbmQgZGVzdGluYXRpb24gY2hhbm5lbCB2YWx1ZSBjYW4gYmUgb25lIG9mXG5cdCAqIGZvbGxvd2luZyB2YWx1ZXM6IDwvcD5cblx0ICpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT48Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5SRUQ8L2NvZGU+PC9saT5cblx0ICogICA8bGk+PGNvZGU+Qml0bWFwRGF0YUNoYW5uZWwuR1JFRU48L2NvZGU+PC9saT5cblx0ICogICA8bGk+PGNvZGU+Qml0bWFwRGF0YUNoYW5uZWwuQkxVRTwvY29kZT48L2xpPlxuXHQgKiAgIDxsaT48Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5BTFBIQTwvY29kZT48L2xpPlxuXHQgKiA8L3VsPlxuXHQgKlxuXHQgKiBAcGFyYW0gc291cmNlQml0bWFwRGF0YSBUaGUgaW5wdXQgYml0bWFwIGltYWdlIHRvIHVzZS4gVGhlIHNvdXJjZSBpbWFnZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICBjYW4gYmUgYSBkaWZmZXJlbnQgQml0bWFwRGF0YSBvYmplY3Qgb3IgaXQgY2FuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVyIHRvIHRoZSBjdXJyZW50IEJpdG1hcERhdGEgb2JqZWN0LlxuXHQgKiBAcGFyYW0gc291cmNlUmVjdCAgICAgICBUaGUgc291cmNlIFJlY3RhbmdsZSBvYmplY3QuIFRvIGNvcHkgb25seSBjaGFubmVsXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgZnJvbSBhIHNtYWxsZXIgYXJlYSB3aXRoaW4gdGhlIGJpdG1hcCxcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lmeSBhIHNvdXJjZSByZWN0YW5nbGUgdGhhdCBpcyBzbWFsbGVyIHRoYW5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG92ZXJhbGwgc2l6ZSBvZiB0aGUgQml0bWFwRGF0YSBvYmplY3QuXG5cdCAqIEBwYXJhbSBkZXN0UG9pbnQgICAgICAgIFRoZSBkZXN0aW5hdGlvbiBQb2ludCBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICB1cHBlci1sZWZ0IGNvcm5lciBvZiB0aGUgcmVjdGFuZ3VsYXIgYXJlYSB3aGVyZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgbmV3IGNoYW5uZWwgZGF0YSBpcyBwbGFjZWQuIFRvIGNvcHkgb25seVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsIGRhdGEgZnJvbSBvbmUgYXJlYSB0byBhIGRpZmZlcmVudCBhcmVhIGluXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBkZXN0aW5hdGlvbiBpbWFnZSwgc3BlY2lmeSBhIHBvaW50IG90aGVyIHRoYW5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAoMCwwKS5cblx0ICogQHBhcmFtIHNvdXJjZUNoYW5uZWwgICAgVGhlIHNvdXJjZSBjaGFubmVsLiBVc2UgYSB2YWx1ZSBmcm9tIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICBCaXRtYXBEYXRhQ2hhbm5lbCBjbGFzc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICg8Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5SRUQ8L2NvZGU+LFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5CTFVFPC9jb2RlPixcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Qml0bWFwRGF0YUNoYW5uZWwuR1JFRU48L2NvZGU+LFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5CaXRtYXBEYXRhQ2hhbm5lbC5BTFBIQTwvY29kZT4pLlxuXHQgKiBAcGFyYW0gZGVzdENoYW5uZWwgICAgICBUaGUgZGVzdGluYXRpb24gY2hhbm5lbC4gVXNlIGEgdmFsdWUgZnJvbSB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgQml0bWFwRGF0YUNoYW5uZWwgY2xhc3Ncblx0ICogICAgICAgICAgICAgICAgICAgICAgICAoPGNvZGU+Qml0bWFwRGF0YUNoYW5uZWwuUkVEPC9jb2RlPixcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Qml0bWFwRGF0YUNoYW5uZWwuQkxVRTwvY29kZT4sXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkJpdG1hcERhdGFDaGFubmVsLkdSRUVOPC9jb2RlPixcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Qml0bWFwRGF0YUNoYW5uZWwuQUxQSEE8L2NvZGU+KS5cblx0ICogQHRocm93cyBUeXBlRXJyb3IgVGhlIHNvdXJjZUJpdG1hcERhdGEsIHNvdXJjZVJlY3Qgb3IgZGVzdFBvaW50IGFyZSBudWxsLlxuXHQgKi9cblx0cHVibGljIGNvcHlDaGFubmVsKHNvdXJjZUJpdG1hcDpCaXRtYXBEYXRhLCBzb3VyY2VSZWN0OlJlY3RhbmdsZSwgZGVzdFBvaW50OlBvaW50LCBzb3VyY2VDaGFubmVsOm51bWJlciwgZGVzdENoYW5uZWw6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIGltYWdlRGF0YTpJbWFnZURhdGEgPSBzb3VyY2VCaXRtYXAuaW1hZ2VEYXRhO1xuXG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpXG5cdFx0XHR0aGlzLl9pbWFnZURhdGEgPSB0aGlzLl9jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLl9yZWN0LndpZHRoLCB0aGlzLl9yZWN0LmhlaWdodCk7XG5cblx0XHR2YXIgc291cmNlRGF0YTpBcnJheTxudW1iZXI+ID0gc291cmNlQml0bWFwLmltYWdlRGF0YS5kYXRhO1xuXHRcdHZhciBkZXN0RGF0YTpBcnJheTxudW1iZXI+ID0gdGhpcy5faW1hZ2VEYXRhLmRhdGE7XG5cblx0XHR2YXIgc291cmNlT2Zmc2V0Om51bWJlciA9IE1hdGgucm91bmQoTWF0aC5sb2coc291cmNlQ2hhbm5lbCkvTWF0aC5sb2coMikpO1xuXHRcdHZhciBkZXN0T2Zmc2V0Om51bWJlciA9IE1hdGgucm91bmQoTWF0aC5sb2coZGVzdENoYW5uZWwpL01hdGgubG9nKDIpKTtcblxuXHRcdHZhciBpOm51bWJlciAvKnVpbnQqLywgajpudW1iZXIgLyp1aW50Ki8sIHNvdXJjZUluZGV4Om51bWJlciAvKnVpbnQqLywgZGVzdEluZGV4Om51bWJlciAvKnVpbnQqLztcblx0XHRmb3IgKGkgPSAwOyBpIDwgc291cmNlUmVjdC53aWR0aDsgKytpKSB7XG5cdFx0XHRmb3IgKGogPSAwOyBqIDwgc291cmNlUmVjdC5oZWlnaHQ7ICsraikge1xuXHRcdFx0XHRzb3VyY2VJbmRleCA9IChpICsgc291cmNlUmVjdC54ICsgKGogKyBzb3VyY2VSZWN0LnkpKnNvdXJjZUJpdG1hcC53aWR0aCkqNDtcblx0XHRcdFx0ZGVzdEluZGV4ID0gKGkgKyBkZXN0UG9pbnQueCArIChqICsgZGVzdFBvaW50LnkpKnRoaXMud2lkdGgpKjQ7XG5cblx0XHRcdFx0ZGVzdERhdGFbZGVzdEluZGV4ICsgZGVzdE9mZnNldF0gPSBzb3VyY2VEYXRhW3NvdXJjZUluZGV4ICsgc291cmNlT2Zmc2V0XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuX2xvY2tlZCkge1xuXHRcdFx0dGhpcy5fY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5faW1hZ2VEYXRhLCAwLCAwKTtcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFByb3ZpZGVzIGEgZmFzdCByb3V0aW5lIHRvIHBlcmZvcm0gcGl4ZWwgbWFuaXB1bGF0aW9uIGJldHdlZW4gaW1hZ2VzIHdpdGhcblx0ICogbm8gc3RyZXRjaGluZywgcm90YXRpb24sIG9yIGNvbG9yIGVmZmVjdHMuIFRoaXMgbWV0aG9kIGNvcGllcyBhXG5cdCAqIHJlY3Rhbmd1bGFyIGFyZWEgb2YgYSBzb3VyY2UgaW1hZ2UgdG8gYSByZWN0YW5ndWxhciBhcmVhIG9mIHRoZSBzYW1lIHNpemVcblx0ICogYXQgdGhlIGRlc3RpbmF0aW9uIHBvaW50IG9mIHRoZSBkZXN0aW5hdGlvbiBCaXRtYXBEYXRhIG9iamVjdC5cblx0ICpcblx0ICogPHA+SWYgeW91IGluY2x1ZGUgdGhlIDxjb2RlPmFscGhhQml0bWFwPC9jb2RlPiBhbmQgPGNvZGU+YWxwaGFQb2ludDwvY29kZT5cblx0ICogcGFyYW1ldGVycywgeW91IGNhbiB1c2UgYSBzZWNvbmRhcnkgaW1hZ2UgYXMgYW4gYWxwaGEgc291cmNlIGZvciB0aGVcblx0ICogc291cmNlIGltYWdlLiBJZiB0aGUgc291cmNlIGltYWdlIGhhcyBhbHBoYSBkYXRhLCBib3RoIHNldHMgb2YgYWxwaGEgZGF0YVxuXHQgKiBhcmUgdXNlZCB0byBjb21wb3NpdGUgcGl4ZWxzIGZyb20gdGhlIHNvdXJjZSBpbWFnZSB0byB0aGUgZGVzdGluYXRpb25cblx0ICogaW1hZ2UuIFRoZSA8Y29kZT5hbHBoYVBvaW50PC9jb2RlPiBwYXJhbWV0ZXIgaXMgdGhlIHBvaW50IGluIHRoZSBhbHBoYVxuXHQgKiBpbWFnZSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSB1cHBlci1sZWZ0IGNvcm5lciBvZiB0aGUgc291cmNlIHJlY3RhbmdsZS5cblx0ICogQW55IHBpeGVscyBvdXRzaWRlIHRoZSBpbnRlcnNlY3Rpb24gb2YgdGhlIHNvdXJjZSBpbWFnZSBhbmQgYWxwaGEgaW1hZ2Vcblx0ICogYXJlIG5vdCBjb3BpZWQgdG8gdGhlIGRlc3RpbmF0aW9uIGltYWdlLjwvcD5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPm1lcmdlQWxwaGE8L2NvZGU+IHByb3BlcnR5IGNvbnRyb2xzIHdoZXRoZXIgb3Igbm90IHRoZSBhbHBoYVxuXHQgKiBjaGFubmVsIGlzIHVzZWQgd2hlbiBhIHRyYW5zcGFyZW50IGltYWdlIGlzIGNvcGllZCBvbnRvIGFub3RoZXJcblx0ICogdHJhbnNwYXJlbnQgaW1hZ2UuIFRvIGNvcHkgcGl4ZWxzIHdpdGggdGhlIGFscGhhIGNoYW5uZWwgZGF0YSwgc2V0IHRoZVxuXHQgKiA8Y29kZT5tZXJnZUFscGhhPC9jb2RlPiBwcm9wZXJ0eSB0byA8Y29kZT50cnVlPC9jb2RlPi4gQnkgZGVmYXVsdCwgdGhlXG5cdCAqIDxjb2RlPm1lcmdlQWxwaGE8L2NvZGU+IHByb3BlcnR5IGlzIDxjb2RlPmZhbHNlPC9jb2RlPi48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBzb3VyY2VCaXRtYXBEYXRhIFRoZSBpbnB1dCBiaXRtYXAgaW1hZ2UgZnJvbSB3aGljaCB0byBjb3B5IHBpeGVscy5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgVGhlIHNvdXJjZSBpbWFnZSBjYW4gYmUgYSBkaWZmZXJlbnQgQml0bWFwRGF0YVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSwgb3IgaXQgY2FuIHJlZmVyIHRvIHRoZSBjdXJyZW50XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIEJpdG1hcERhdGEgaW5zdGFuY2UuXG5cdCAqIEBwYXJhbSBzb3VyY2VSZWN0ICAgICAgIEEgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYXJlYSBvZiB0aGUgc291cmNlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlIHRvIHVzZSBhcyBpbnB1dC5cblx0ICogQHBhcmFtIGRlc3RQb2ludCAgICAgICAgVGhlIGRlc3RpbmF0aW9uIHBvaW50IHRoYXQgcmVwcmVzZW50cyB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgdXBwZXItbGVmdCBjb3JuZXIgb2YgdGhlIHJlY3Rhbmd1bGFyIGFyZWEgd2hlcmVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG5ldyBwaXhlbHMgYXJlIHBsYWNlZC5cblx0ICogQHBhcmFtIGFscGhhQml0bWFwRGF0YSAgQSBzZWNvbmRhcnksIGFscGhhIEJpdG1hcERhdGEgb2JqZWN0IHNvdXJjZS5cblx0ICogQHBhcmFtIGFscGhhUG9pbnQgICAgICAgVGhlIHBvaW50IGluIHRoZSBhbHBoYSBCaXRtYXBEYXRhIG9iamVjdCBzb3VyY2Vcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgdXBwZXItbGVmdCBjb3JuZXIgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnNvdXJjZVJlY3Q8L2NvZGU+IHBhcmFtZXRlci5cblx0ICogQHBhcmFtIG1lcmdlQWxwaGEgICAgICAgVG8gdXNlIHRoZSBhbHBoYSBjaGFubmVsLCBzZXQgdGhlIHZhbHVlIHRvXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnRydWU8L2NvZGU+LiBUbyBjb3B5IHBpeGVscyB3aXRoIG5vIGFscGhhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwsIHNldCB0aGUgdmFsdWUgdG8gPGNvZGU+ZmFsc2U8L2NvZGU+LlxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvciBUaGUgc291cmNlQml0bWFwRGF0YSwgc291cmNlUmVjdCwgZGVzdFBvaW50IGFyZSBudWxsLlxuXHQgKi9cblx0cHVibGljIGNvcHlQaXhlbHMoYm1wZDpCaXRtYXBEYXRhLCBzb3VyY2VSZWN0OlJlY3RhbmdsZSwgZGVzdFJlY3Q6UmVjdGFuZ2xlKTtcblx0cHVibGljIGNvcHlQaXhlbHMoYm1wZDpIVE1MSW1hZ2VFbGVtZW50LCBzb3VyY2VSZWN0OlJlY3RhbmdsZSwgZGVzdFJlY3Q6UmVjdGFuZ2xlKTtcblx0cHVibGljIGNvcHlQaXhlbHMoYm1wZDphbnksIHNvdXJjZVJlY3Q6UmVjdGFuZ2xlLCBkZXN0UmVjdDpSZWN0YW5nbGUpXG5cdHtcblxuXHRcdGlmICh0aGlzLl9sb2NrZWQpIHtcblxuXHRcdFx0Ly8gSWYgY2FudmFzIGlzIGxvY2tlZDpcblx0XHRcdC8vXG5cdFx0XHQvLyAgICAgIDEpIGNvcHkgaW1hZ2UgZGF0YSBiYWNrIHRvIGNhbnZhc1xuXHRcdFx0Ly8gICAgICAyKSBkcmF3IG9iamVjdFxuXHRcdFx0Ly8gICAgICAzKSByZWFkIF9pbWFnZURhdGEgYmFjayBvdXRcblxuXHRcdFx0aWYgKHRoaXMuX2ltYWdlRGF0YSlcblx0XHRcdFx0dGhpcy5fY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5faW1hZ2VEYXRhLCAwLCAwKTsgLy8gYXQgY29vcmRzIDAsMFxuXG5cdFx0XHR0aGlzLl9jb3B5UGl4ZWxzKGJtcGQsIHNvdXJjZVJlY3QsIGRlc3RSZWN0KTtcblxuXHRcdFx0aWYgKHRoaXMuX2ltYWdlRGF0YSlcblx0XHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5fcmVjdC53aWR0aCwgdGhpcy5fcmVjdC5oZWlnaHQpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2NvcHlQaXhlbHMoYm1wZCwgc291cmNlUmVjdCwgZGVzdFJlY3QpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGcmVlcyBtZW1vcnkgdGhhdCBpcyB1c2VkIHRvIHN0b3JlIHRoZSBCaXRtYXBEYXRhIG9iamVjdC5cblx0ICpcblx0ICogPHA+V2hlbiB0aGUgPGNvZGU+ZGlzcG9zZSgpPC9jb2RlPiBtZXRob2QgaXMgY2FsbGVkIG9uIGFuIGltYWdlLCB0aGUgd2lkdGhcblx0ICogYW5kIGhlaWdodCBvZiB0aGUgaW1hZ2UgYXJlIHNldCB0byAwLiBBbGwgc3Vic2VxdWVudCBjYWxscyB0byBtZXRob2RzIG9yXG5cdCAqIHByb3BlcnRpZXMgb2YgdGhpcyBCaXRtYXBEYXRhIGluc3RhbmNlIGZhaWwsIGFuZCBhbiBleGNlcHRpb24gaXMgdGhyb3duLlxuXHQgKiA8L3A+XG5cdCAqXG5cdCAqIDxwPjxjb2RlPkJpdG1hcERhdGEuZGlzcG9zZSgpPC9jb2RlPiByZWxlYXNlcyB0aGUgbWVtb3J5IG9jY3VwaWVkIGJ5IHRoZVxuXHQgKiBhY3R1YWwgYml0bWFwIGRhdGEsIGltbWVkaWF0ZWx5KGEgYml0bWFwIGNhbiBjb25zdW1lIHVwIHRvIDY0IE1CIG9mXG5cdCAqIG1lbW9yeSkuIEFmdGVyIHVzaW5nIDxjb2RlPkJpdG1hcERhdGEuZGlzcG9zZSgpPC9jb2RlPiwgdGhlIEJpdG1hcERhdGFcblx0ICogb2JqZWN0IGlzIG5vIGxvbmdlciB1c2FibGUgYW5kIGFuIGV4Y2VwdGlvbiBtYXkgYmUgdGhyb3duIGlmXG5cdCAqIHlvdSBjYWxsIGZ1bmN0aW9ucyBvbiB0aGUgQml0bWFwRGF0YSBvYmplY3QuIEhvd2V2ZXIsXG5cdCAqIDxjb2RlPkJpdG1hcERhdGEuZGlzcG9zZSgpPC9jb2RlPiBkb2VzIG5vdCBnYXJiYWdlIGNvbGxlY3QgdGhlIEJpdG1hcERhdGFcblx0ICogb2JqZWN0KGFwcHJveGltYXRlbHkgMTI4IGJ5dGVzKTsgdGhlIG1lbW9yeSBvY2N1cGllZCBieSB0aGUgYWN0dWFsXG5cdCAqIEJpdG1hcERhdGEgb2JqZWN0IGlzIHJlbGVhc2VkIGF0IHRoZSB0aW1lIHRoZSBCaXRtYXBEYXRhIG9iamVjdCBpc1xuXHQgKiBjb2xsZWN0ZWQgYnkgdGhlIGdhcmJhZ2UgY29sbGVjdG9yLjwvcD5cblx0ICpcblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHRoaXMuX2NvbnRleHQgPSBudWxsO1xuXHRcdHRoaXMuX2ltYWdlQ2FudmFzID0gbnVsbDtcblx0XHR0aGlzLl9pbWFnZURhdGEgPSBudWxsO1xuXHRcdHRoaXMuX3JlY3QgPSBudWxsO1xuXHRcdHRoaXMuX3RyYW5zcGFyZW50ID0gbnVsbDtcblx0XHR0aGlzLl9sb2NrZWQgPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIERyYXdzIHRoZSA8Y29kZT5zb3VyY2U8L2NvZGU+IGRpc3BsYXkgb2JqZWN0IG9udG8gdGhlIGJpdG1hcCBpbWFnZSwgdXNpbmdcblx0ICogdGhlIE5NRSBzb2Z0d2FyZSByZW5kZXJlci4gWW91IGNhbiBzcGVjaWZ5IDxjb2RlPm1hdHJpeDwvY29kZT4sXG5cdCAqIDxjb2RlPmNvbG9yVHJhbnNmb3JtPC9jb2RlPiwgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiwgYW5kIGEgZGVzdGluYXRpb25cblx0ICogPGNvZGU+Y2xpcFJlY3Q8L2NvZGU+IHBhcmFtZXRlciB0byBjb250cm9sIGhvdyB0aGUgcmVuZGVyaW5nIHBlcmZvcm1zLlxuXHQgKiBPcHRpb25hbGx5LCB5b3UgY2FuIHNwZWNpZnkgd2hldGhlciB0aGUgYml0bWFwIHNob3VsZCBiZSBzbW9vdGhlZCB3aGVuXG5cdCAqIHNjYWxlZCh0aGlzIHdvcmtzIG9ubHkgaWYgdGhlIHNvdXJjZSBvYmplY3QgaXMgYSBCaXRtYXBEYXRhIG9iamVjdCkuXG5cdCAqXG5cdCAqIDxwPlRoZSBzb3VyY2UgZGlzcGxheSBvYmplY3QgZG9lcyBub3QgdXNlIGFueSBvZiBpdHMgYXBwbGllZFxuXHQgKiB0cmFuc2Zvcm1hdGlvbnMgZm9yIHRoaXMgY2FsbC4gSXQgaXMgdHJlYXRlZCBhcyBpdCBleGlzdHMgaW4gdGhlIGxpYnJhcnlcblx0ICogb3IgZmlsZSwgd2l0aCBubyBtYXRyaXggdHJhbnNmb3JtLCBubyBjb2xvciB0cmFuc2Zvcm0sIGFuZCBubyBibGVuZCBtb2RlLlxuXHQgKiBUbyBkcmF3IGEgZGlzcGxheSBvYmplY3Qoc3VjaCBhcyBhIG1vdmllIGNsaXApIGJ5IHVzaW5nIGl0cyBvd24gdHJhbnNmb3JtXG5cdCAqIHByb3BlcnRpZXMsIHlvdSBjYW4gY29weSBpdHMgPGNvZGU+dHJhbnNmb3JtPC9jb2RlPiBwcm9wZXJ0eSBvYmplY3QgdG8gdGhlXG5cdCAqIDxjb2RlPnRyYW5zZm9ybTwvY29kZT4gcHJvcGVydHkgb2YgdGhlIEJpdG1hcCBvYmplY3QgdGhhdCB1c2VzIHRoZVxuXHQgKiBCaXRtYXBEYXRhIG9iamVjdC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBzb3VyY2UgICAgICAgICBUaGUgZGlzcGxheSBvYmplY3Qgb3IgQml0bWFwRGF0YSBvYmplY3QgdG8gZHJhdyB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIEJpdG1hcERhdGEgb2JqZWN0LihUaGUgRGlzcGxheU9iamVjdCBhbmRcblx0ICogICAgICAgICAgICAgICAgICAgICAgIEJpdG1hcERhdGEgY2xhc3NlcyBpbXBsZW1lbnQgdGhlIElCaXRtYXBEcmF3YWJsZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJmYWNlLilcblx0ICogQHBhcmFtIG1hdHJpeCAgICAgICAgIEEgTWF0cml4IG9iamVjdCB1c2VkIHRvIHNjYWxlLCByb3RhdGUsIG9yIHRyYW5zbGF0ZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBiaXRtYXAuIElmIHlvdSBkbyBub3Qgd2FudCB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYXBwbHkgYSBtYXRyaXggdHJhbnNmb3JtYXRpb24gdG8gdGhlIGltYWdlLCBzZXQgdGhpc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyIHRvIGFuIGlkZW50aXR5IG1hdHJpeCwgY3JlYXRlZCB3aXRoIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCA8Y29kZT5uZXcgTWF0cml4KCk8L2NvZGU+IGNvbnN0cnVjdG9yLCBvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcGFzcyBhIDxjb2RlPm51bGw8L2NvZGU+IHZhbHVlLlxuXHQgKiBAcGFyYW0gY29sb3JUcmFuc2Zvcm0gQSBDb2xvclRyYW5zZm9ybSBvYmplY3QgdGhhdCB5b3UgdXNlIHRvIGFkanVzdCB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGNvbG9yIHZhbHVlcyBvZiB0aGUgYml0bWFwLiBJZiBubyBvYmplY3QgaXNcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHN1cHBsaWVkLCB0aGUgYml0bWFwIGltYWdlJ3MgY29sb3JzIGFyZSBub3Rcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybWVkLiBJZiB5b3UgbXVzdCBwYXNzIHRoaXMgcGFyYW1ldGVyIGJ1dCB5b3Vcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGRvIG5vdCB3YW50IHRvIHRyYW5zZm9ybSB0aGUgaW1hZ2UsIHNldCB0aGlzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXIgdG8gYSBDb2xvclRyYW5zZm9ybSBvYmplY3QgY3JlYXRlZCB3aXRoXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgZGVmYXVsdCA8Y29kZT5uZXcgQ29sb3JUcmFuc2Zvcm0oKTwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yLlxuXHQgKiBAcGFyYW0gYmxlbmRNb2RlICAgICAgQSBzdHJpbmcgdmFsdWUsIGZyb20gdGhlIGZsYXNoLmRpc3BsYXkuQmxlbmRNb2RlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBjbGFzcywgc3BlY2lmeWluZyB0aGUgYmxlbmQgbW9kZSB0byBiZSBhcHBsaWVkIHRvXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgcmVzdWx0aW5nIGJpdG1hcC5cblx0ICogQHBhcmFtIGNsaXBSZWN0ICAgICAgIEEgUmVjdGFuZ2xlIG9iamVjdCB0aGF0IGRlZmluZXMgdGhlIGFyZWEgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Ugb2JqZWN0IHRvIGRyYXcuIElmIHlvdSBkbyBub3Qgc3VwcGx5IHRoaXNcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLCBubyBjbGlwcGluZyBvY2N1cnMgYW5kIHRoZSBlbnRpcmUgc291cmNlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgaXMgZHJhd24uXG5cdCAqIEBwYXJhbSBzbW9vdGhpbmcgICAgICBBIEJvb2xlYW4gdmFsdWUgdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgYSBCaXRtYXBEYXRhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgaXMgc21vb3RoZWQgd2hlbiBzY2FsZWQgb3Igcm90YXRlZCwgZHVlIHRvIGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHNjYWxpbmcgb3Igcm90YXRpb24gaW4gdGhlIDxjb2RlPm1hdHJpeDwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlci4gVGhlIDxjb2RlPnNtb290aGluZzwvY29kZT4gcGFyYW1ldGVyIG9ubHlcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFwcGxpZXMgaWYgdGhlIDxjb2RlPnNvdXJjZTwvY29kZT4gcGFyYW1ldGVyIGlzIGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIEJpdG1hcERhdGEgb2JqZWN0LiBXaXRoIDxjb2RlPnNtb290aGluZzwvY29kZT4gc2V0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0byA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSByb3RhdGVkIG9yIHNjYWxlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgQml0bWFwRGF0YSBpbWFnZSBjYW4gYXBwZWFyIHBpeGVsYXRlZCBvciBqYWdnZWQuIEZvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgZXhhbXBsZSwgdGhlIGZvbGxvd2luZyB0d28gaW1hZ2VzIHVzZSB0aGUgc2FtZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgQml0bWFwRGF0YSBvYmplY3QgZm9yIHRoZSA8Y29kZT5zb3VyY2U8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXIsIGJ1dCB0aGUgPGNvZGU+c21vb3RoaW5nPC9jb2RlPiBwYXJhbWV0ZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiBvbiB0aGUgbGVmdCBhbmRcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmZhbHNlPC9jb2RlPiBvbiB0aGUgcmlnaHQ6XG5cdCAqXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8cD5EcmF3aW5nIGEgYml0bWFwIHdpdGggPGNvZGU+c21vb3RoaW5nPC9jb2RlPiBzZXRcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRvIDxjb2RlPnRydWU8L2NvZGU+IHRha2VzIGxvbmdlciB0aGFuIGRvaW5nIHNvIHdpdGhcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnNtb290aGluZzwvY29kZT4gc2V0IHRvXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5mYWxzZTwvY29kZT4uPC9wPlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhlIDxjb2RlPnNvdXJjZTwvY29kZT4gcGFyYW1ldGVyIGlzIG5vdCBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBCaXRtYXBEYXRhIG9yIERpc3BsYXlPYmplY3Qgb2JqZWN0LlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhlIHNvdXJjZSBpcyBudWxsIG9yIG5vdCBhIHZhbGlkIElCaXRtYXBEcmF3YWJsZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgVGhlIDxjb2RlPnNvdXJjZTwvY29kZT4gb2JqZWN0IGFuZChpbiB0aGUgY2FzZSBvZiBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBTcHJpdGUgb3IgTW92aWVDbGlwIG9iamVjdCkgYWxsIG9mIGl0cyBjaGlsZCBvYmplY3RzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBkbyBub3QgY29tZSBmcm9tIHRoZSBzYW1lIGRvbWFpbiBhcyB0aGUgY2FsbGVyLCBvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYXJlIG5vdCBpbiBhIGNvbnRlbnQgdGhhdCBpcyBhY2Nlc3NpYmxlIHRvIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgY2FsbGVyIGJ5IGhhdmluZyBjYWxsZWQgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TZWN1cml0eS5hbGxvd0RvbWFpbigpPC9jb2RlPiBtZXRob2QuIFRoaXNcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uIGRvZXMgbm90IGFwcGx5IHRvIEFJUiBjb250ZW50IGluIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb24gc2VjdXJpdHkgc2FuZGJveC5cblx0ICovXG5cdHB1YmxpYyBkcmF3KHNvdXJjZTpCaXRtYXBEYXRhLCBtYXRyaXg/Ok1hdHJpeCwgY29sb3JUcmFuc2Zvcm0/OkNvbG9yVHJhbnNmb3JtLCBibGVuZE1vZGU/OkJsZW5kTW9kZSwgY2xpcFJlY3Q/OlJlY3RhbmdsZSwgc21vb3RoaW5nPzpib29sZWFuKTtcblx0cHVibGljIGRyYXcoc291cmNlOkhUTUxFbGVtZW50LCBtYXRyaXg/Ok1hdHJpeCwgY29sb3JUcmFuc2Zvcm0/OkNvbG9yVHJhbnNmb3JtLCBibGVuZE1vZGU/OkJsZW5kTW9kZSwgY2xpcFJlY3Q/OlJlY3RhbmdsZSwgc21vb3RoaW5nPzpib29sZWFuKTtcblx0cHVibGljIGRyYXcoc291cmNlOmFueSwgbWF0cml4PzpNYXRyaXgsIGNvbG9yVHJhbnNmb3JtPzpDb2xvclRyYW5zZm9ybSwgYmxlbmRNb2RlPzpCbGVuZE1vZGUsIGNsaXBSZWN0PzpSZWN0YW5nbGUsIHNtb290aGluZz86Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9sb2NrZWQpIHtcblxuXHRcdFx0Ly8gSWYgY2FudmFzIGlzIGxvY2tlZDpcblx0XHRcdC8vXG5cdFx0XHQvLyAgICAgIDEpIGNvcHkgaW1hZ2UgZGF0YSBiYWNrIHRvIGNhbnZhc1xuXHRcdFx0Ly8gICAgICAyKSBkcmF3IG9iamVjdFxuXHRcdFx0Ly8gICAgICAzKSByZWFkIF9pbWFnZURhdGEgYmFjayBvdXRcblxuXHRcdFx0dGhpcy5fY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5faW1hZ2VEYXRhLCAwLCAwKTsgLy8gYXQgY29vcmRzIDAsMFxuXHRcdFx0dGhpcy5fZHJhdyhzb3VyY2UsIG1hdHJpeCwgY29sb3JUcmFuc2Zvcm0sIGJsZW5kTW9kZSwgY2xpcFJlY3QsIHNtb290aGluZyk7XG5cdFx0XHR0aGlzLl9pbWFnZURhdGEgPSB0aGlzLl9jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLl9yZWN0LndpZHRoLCB0aGlzLl9yZWN0LmhlaWdodCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2RyYXcoc291cmNlLCBtYXRyaXgsIGNvbG9yVHJhbnNmb3JtLCBibGVuZE1vZGUsIGNsaXBSZWN0LCBzbW9vdGhpbmcpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGaWxscyBhIHJlY3Rhbmd1bGFyIGFyZWEgb2YgcGl4ZWxzIHdpdGggYSBzcGVjaWZpZWQgQVJHQiBjb2xvci5cblx0ICpcblx0ICogQHBhcmFtIHJlY3QgIFRoZSByZWN0YW5ndWxhciBhcmVhIHRvIGZpbGwuXG5cdCAqIEBwYXJhbSBjb2xvciBUaGUgQVJHQiBjb2xvciB2YWx1ZSB0aGF0IGZpbGxzIHRoZSBhcmVhLiBBUkdCIGNvbG9ycyBhcmVcblx0ICogICAgICAgICAgICAgIG9mdGVuIHNwZWNpZmllZCBpbiBoZXhhZGVjaW1hbCBmb3JtYXQ7IGZvciBleGFtcGxlLFxuXHQgKiAgICAgICAgICAgICAgMHhGRjMzNjY5OS5cblx0ICogQHRocm93cyBUeXBlRXJyb3IgVGhlIHJlY3QgaXMgbnVsbC5cblx0ICovXG5cdHB1YmxpYyBmaWxsUmVjdChyZWN0OlJlY3RhbmdsZSwgY29sb3I6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2xvY2tlZCkge1xuXG5cdFx0XHQvLyBJZiBjYW52YXMgaXMgbG9ja2VkOlxuXHRcdFx0Ly9cblx0XHRcdC8vICAgICAgMSkgY29weSBpbWFnZSBkYXRhIGJhY2sgdG8gY2FudmFzXG5cdFx0XHQvLyAgICAgIDIpIGFwcGx5IGZpbGxcblx0XHRcdC8vICAgICAgMykgcmVhZCBfaW1hZ2VEYXRhIGJhY2sgb3V0XG5cblx0XHRcdGlmICh0aGlzLl9pbWFnZURhdGEpXG5cdFx0XHRcdHRoaXMuX2NvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuX2ltYWdlRGF0YSwgMCwgMCk7IC8vIGF0IGNvb3JkcyAwLDBcblxuXHRcdFx0dGhpcy5fZmlsbFJlY3QocmVjdCwgY29sb3IpO1xuXG5cdFx0XHRpZiAodGhpcy5faW1hZ2VEYXRhKVxuXHRcdFx0XHR0aGlzLl9pbWFnZURhdGEgPSB0aGlzLl9jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLl9yZWN0LndpZHRoLCB0aGlzLl9yZWN0LmhlaWdodCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2ZpbGxSZWN0KHJlY3QsIGNvbG9yKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBpbnRlZ2VyIHRoYXQgcmVwcmVzZW50cyBhbiBSR0IgcGl4ZWwgdmFsdWUgZnJvbSBhIEJpdG1hcERhdGFcblx0ICogb2JqZWN0IGF0IGEgc3BlY2lmaWMgcG9pbnQoPGk+eDwvaT4sIDxpPnk8L2k+KS4gVGhlXG5cdCAqIDxjb2RlPmdldFBpeGVsKCk8L2NvZGU+IG1ldGhvZCByZXR1cm5zIGFuIHVubXVsdGlwbGllZCBwaXhlbCB2YWx1ZS4gTm9cblx0ICogYWxwaGEgaW5mb3JtYXRpb24gaXMgcmV0dXJuZWQuXG5cdCAqXG5cdCAqIDxwPkFsbCBwaXhlbHMgaW4gYSBCaXRtYXBEYXRhIG9iamVjdCBhcmUgc3RvcmVkIGFzIHByZW11bHRpcGxpZWQgY29sb3Jcblx0ICogdmFsdWVzLiBBIHByZW11bHRpcGxpZWQgaW1hZ2UgcGl4ZWwgaGFzIHRoZSByZWQsIGdyZWVuLCBhbmQgYmx1ZSBjb2xvclxuXHQgKiBjaGFubmVsIHZhbHVlcyBhbHJlYWR5IG11bHRpcGxpZWQgYnkgdGhlIGFscGhhIGRhdGEuIEZvciBleGFtcGxlLCBpZiB0aGVcblx0ICogYWxwaGEgdmFsdWUgaXMgMCwgdGhlIHZhbHVlcyBmb3IgdGhlIFJHQiBjaGFubmVscyBhcmUgYWxzbyAwLCBpbmRlcGVuZGVudFxuXHQgKiBvZiB0aGVpciB1bm11bHRpcGxpZWQgdmFsdWVzLiBUaGlzIGxvc3Mgb2YgZGF0YSBjYW4gY2F1c2Ugc29tZSBwcm9ibGVtc1xuXHQgKiB3aGVuIHlvdSBwZXJmb3JtIG9wZXJhdGlvbnMuIEFsbCBCaXRtYXBEYXRhIG1ldGhvZHMgdGFrZSBhbmQgcmV0dXJuXG5cdCAqIHVubXVsdGlwbGllZCB2YWx1ZXMuIFRoZSBpbnRlcm5hbCBwaXhlbCByZXByZXNlbnRhdGlvbiBpcyBjb252ZXJ0ZWQgZnJvbVxuXHQgKiBwcmVtdWx0aXBsaWVkIHRvIHVubXVsdGlwbGllZCBiZWZvcmUgaXQgaXMgcmV0dXJuZWQgYXMgYSB2YWx1ZS4gRHVyaW5nIGFcblx0ICogc2V0IG9wZXJhdGlvbiwgdGhlIHBpeGVsIHZhbHVlIGlzIHByZW11bHRpcGxpZWQgYmVmb3JlIHRoZSByYXcgaW1hZ2UgcGl4ZWxcblx0ICogaXMgc2V0LjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHggVGhlIDxpPng8L2k+IHBvc2l0aW9uIG9mIHRoZSBwaXhlbC5cblx0ICogQHBhcmFtIHkgVGhlIDxpPnk8L2k+IHBvc2l0aW9uIG9mIHRoZSBwaXhlbC5cblx0ICogQHJldHVybiBBIG51bWJlciB0aGF0IHJlcHJlc2VudHMgYW4gUkdCIHBpeGVsIHZhbHVlLiBJZiB0aGUoPGk+eDwvaT4sXG5cdCAqICAgICAgICAgPGk+eTwvaT4pIGNvb3JkaW5hdGVzIGFyZSBvdXRzaWRlIHRoZSBib3VuZHMgb2YgdGhlIGltYWdlLCB0aGVcblx0ICogICAgICAgICBtZXRob2QgcmV0dXJucyAwLlxuXHQgKi9cblx0cHVibGljIGdldFBpeGVsKHgsIHkpOm51bWJlclxuXHR7XG5cdFx0dmFyIHI6bnVtYmVyO1xuXHRcdHZhciBnOm51bWJlcjtcblx0XHR2YXIgYjpudW1iZXI7XG5cdFx0dmFyIGE6bnVtYmVyO1xuXG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpIHtcblx0XHRcdHZhciBwaXhlbERhdGE6SW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoeCwgeSwgMSwgMSk7XG5cblx0XHRcdHIgPSBwaXhlbERhdGEuZGF0YVswXTtcblx0XHRcdGcgPSBwaXhlbERhdGEuZGF0YVsxXTtcblx0XHRcdGIgPSBwaXhlbERhdGEuZGF0YVsyXTtcblx0XHRcdGEgPSBwaXhlbERhdGEuZGF0YVszXTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgaW5kZXg6bnVtYmVyID0gKHggKyB5KnRoaXMuX2ltYWdlQ2FudmFzLndpZHRoKSo0O1xuXG5cdFx0XHRyID0gdGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAwXTtcblx0XHRcdGcgPSB0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDFdO1xuXHRcdFx0YiA9IHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMl07XG5cdFx0XHRhID0gdGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAzXTtcblx0XHR9XG5cblx0XHQvL3JldHVybnMgYmxhY2sgaWYgZnVsbHkgdHJhbnNwYXJlbnRcblx0XHRpZiAoIWEpXG5cdFx0XHRyZXR1cm4gMHgwO1xuXG5cdFx0cmV0dXJuIChyIDw8IDE2KSB8IChnIDw8IDgpIHwgYjtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIEFSR0IgY29sb3IgdmFsdWUgdGhhdCBjb250YWlucyBhbHBoYSBjaGFubmVsIGRhdGEgYW5kIFJHQiBkYXRhLlxuXHQgKiBUaGlzIG1ldGhvZCBpcyBzaW1pbGFyIHRvIHRoZSA8Y29kZT5nZXRQaXhlbCgpPC9jb2RlPiBtZXRob2QsIHdoaWNoXG5cdCAqIHJldHVybnMgYW4gUkdCIGNvbG9yIHdpdGhvdXQgYWxwaGEgY2hhbm5lbCBkYXRhLlxuXHQgKlxuXHQgKiA8cD5BbGwgcGl4ZWxzIGluIGEgQml0bWFwRGF0YSBvYmplY3QgYXJlIHN0b3JlZCBhcyBwcmVtdWx0aXBsaWVkIGNvbG9yXG5cdCAqIHZhbHVlcy4gQSBwcmVtdWx0aXBsaWVkIGltYWdlIHBpeGVsIGhhcyB0aGUgcmVkLCBncmVlbiwgYW5kIGJsdWUgY29sb3Jcblx0ICogY2hhbm5lbCB2YWx1ZXMgYWxyZWFkeSBtdWx0aXBsaWVkIGJ5IHRoZSBhbHBoYSBkYXRhLiBGb3IgZXhhbXBsZSwgaWYgdGhlXG5cdCAqIGFscGhhIHZhbHVlIGlzIDAsIHRoZSB2YWx1ZXMgZm9yIHRoZSBSR0IgY2hhbm5lbHMgYXJlIGFsc28gMCwgaW5kZXBlbmRlbnRcblx0ICogb2YgdGhlaXIgdW5tdWx0aXBsaWVkIHZhbHVlcy4gVGhpcyBsb3NzIG9mIGRhdGEgY2FuIGNhdXNlIHNvbWUgcHJvYmxlbXNcblx0ICogd2hlbiB5b3UgcGVyZm9ybSBvcGVyYXRpb25zLiBBbGwgQml0bWFwRGF0YSBtZXRob2RzIHRha2UgYW5kIHJldHVyblxuXHQgKiB1bm11bHRpcGxpZWQgdmFsdWVzLiBUaGUgaW50ZXJuYWwgcGl4ZWwgcmVwcmVzZW50YXRpb24gaXMgY29udmVydGVkIGZyb21cblx0ICogcHJlbXVsdGlwbGllZCB0byB1bm11bHRpcGxpZWQgYmVmb3JlIGl0IGlzIHJldHVybmVkIGFzIGEgdmFsdWUuIER1cmluZyBhXG5cdCAqIHNldCBvcGVyYXRpb24sIHRoZSBwaXhlbCB2YWx1ZSBpcyBwcmVtdWx0aXBsaWVkIGJlZm9yZSB0aGUgcmF3IGltYWdlIHBpeGVsXG5cdCAqIGlzIHNldC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSB4IFRoZSA8aT54PC9pPiBwb3NpdGlvbiBvZiB0aGUgcGl4ZWwuXG5cdCAqIEBwYXJhbSB5IFRoZSA8aT55PC9pPiBwb3NpdGlvbiBvZiB0aGUgcGl4ZWwuXG5cdCAqIEByZXR1cm4gQSBudW1iZXIgcmVwcmVzZW50aW5nIGFuIEFSR0IgcGl4ZWwgdmFsdWUuIElmIHRoZSg8aT54PC9pPixcblx0ICogICAgICAgICA8aT55PC9pPikgY29vcmRpbmF0ZXMgYXJlIG91dHNpZGUgdGhlIGJvdW5kcyBvZiB0aGUgaW1hZ2UsIDAgaXNcblx0ICogICAgICAgICByZXR1cm5lZC5cblx0ICovXG5cdHB1YmxpYyBnZXRQaXhlbDMyKHgsIHkpOm51bWJlclxuXHR7XG5cdFx0dmFyIHI6bnVtYmVyO1xuXHRcdHZhciBnOm51bWJlcjtcblx0XHR2YXIgYjpudW1iZXI7XG5cdFx0dmFyIGE6bnVtYmVyO1xuXG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpIHtcblx0XHRcdHZhciBwaXhlbERhdGE6SW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoeCwgeSwgMSwgMSk7XG5cblx0XHRcdHIgPSBwaXhlbERhdGEuZGF0YVswXTtcblx0XHRcdGcgPSBwaXhlbERhdGEuZGF0YVsxXTtcblx0XHRcdGIgPSBwaXhlbERhdGEuZGF0YVsyXTtcblx0XHRcdGEgPSBwaXhlbERhdGEuZGF0YVszXTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgaW5kZXg6bnVtYmVyID0gKHggKyB5KnRoaXMuX2ltYWdlQ2FudmFzLndpZHRoKSo0O1xuXG5cdFx0XHRyID0gdGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAwXTtcblx0XHRcdGcgPSB0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDFdO1xuXHRcdFx0YiA9IHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMl07XG5cdFx0XHRhID0gdGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAzXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKGEgPDwgMjQpIHwgKHIgPDwgMTYpIHwgKGcgPDwgOCkgfCBiO1xuXHR9XG5cblx0LyoqXG5cdCAqIExvY2tzIGFuIGltYWdlIHNvIHRoYXQgYW55IG9iamVjdHMgdGhhdCByZWZlcmVuY2UgdGhlIEJpdG1hcERhdGEgb2JqZWN0LFxuXHQgKiBzdWNoIGFzIEJpdG1hcCBvYmplY3RzLCBhcmUgbm90IHVwZGF0ZWQgd2hlbiB0aGlzIEJpdG1hcERhdGEgb2JqZWN0XG5cdCAqIGNoYW5nZXMuIFRvIGltcHJvdmUgcGVyZm9ybWFuY2UsIHVzZSB0aGlzIG1ldGhvZCBhbG9uZyB3aXRoIHRoZVxuXHQgKiA8Y29kZT51bmxvY2soKTwvY29kZT4gbWV0aG9kIGJlZm9yZSBhbmQgYWZ0ZXIgbnVtZXJvdXMgY2FsbHMgdG8gdGhlXG5cdCAqIDxjb2RlPnNldFBpeGVsKCk8L2NvZGU+IG9yIDxjb2RlPnNldFBpeGVsMzIoKTwvY29kZT4gbWV0aG9kLlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGxvY2soKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2xvY2tlZClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2xvY2tlZCA9IHRydWU7XG5cdFx0dGhpcy5faW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5fcmVjdC53aWR0aCwgdGhpcy5fcmVjdC5oZWlnaHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGFuIEFycmF5IGludG8gYSByZWN0YW5ndWxhciByZWdpb24gb2YgcGl4ZWwgZGF0YS4gRm9yIGVhY2ggcGl4ZWwsXG5cdCAqIGFuIEFycmF5IGVsZW1lbnQgaXMgcmVhZCBhbmQgd3JpdHRlbiBpbnRvIHRoZSBCaXRtYXBEYXRhIHBpeGVsLiBUaGUgZGF0YVxuXHQgKiBpbiB0aGUgQXJyYXkgaXMgZXhwZWN0ZWQgdG8gYmUgMzItYml0IEFSR0IgcGl4ZWwgdmFsdWVzLlxuXHQgKlxuXHQgKiBAcGFyYW0gcmVjdCAgICAgICAgU3BlY2lmaWVzIHRoZSByZWN0YW5ndWxhciByZWdpb24gb2YgdGhlIEJpdG1hcERhdGFcblx0ICogICAgICAgICAgICAgICAgICAgIG9iamVjdC5cblx0ICogQHBhcmFtIGlucHV0QXJyYXkgIEFuIEFycmF5IHRoYXQgY29uc2lzdHMgb2YgMzItYml0IHVubXVsdGlwbGllZCBwaXhlbFxuXHQgKiAgICAgICAgICAgICAgICAgICAgdmFsdWVzIHRvIGJlIHVzZWQgaW4gdGhlIHJlY3Rhbmd1bGFyIHJlZ2lvbi5cblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSB2ZWN0b3IgYXJyYXkgaXMgbm90IGxhcmdlIGVub3VnaCB0byByZWFkIGFsbCB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgIHBpeGVsIGRhdGEuXG5cdCAqL1xuXHRwdWJsaWMgc2V0QXJyYXkocmVjdDpSZWN0YW5nbGUsIGlucHV0QXJyYXk6QXJyYXk8bnVtYmVyPilcblx0e1xuXHRcdGlmICghdGhpcy5fbG9ja2VkKVxuXHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5fcmVjdC53aWR0aCwgdGhpcy5fcmVjdC5oZWlnaHQpO1xuXG5cdFx0dmFyIGk6bnVtYmVyIC8qdWludCovLCBqOm51bWJlciAvKnVpbnQqLywgaW5kZXg6bnVtYmVyIC8qdWludCovLCBhcmdiOm51bWJlcltdIC8qdWludCovO1xuXHRcdGZvciAoaSA9IDA7IGkgPCByZWN0LndpZHRoOyArK2kpIHtcblx0XHRcdGZvciAoaiA9IDA7IGogPCByZWN0LmhlaWdodDsgKytqKSB7XG5cdFx0XHRcdGFyZ2IgPSBDb2xvclV0aWxzLmZsb2F0MzJDb2xvclRvQVJHQihpbnB1dEFycmF5W2kgKyBqKnJlY3Qud2lkdGhdKTtcblx0XHRcdFx0aW5kZXggPSAoaSArIHJlY3QueCArIChqICsgcmVjdC55KSp0aGlzLl9pbWFnZUNhbnZhcy53aWR0aCkqNDtcblxuXHRcdFx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDBdID0gYXJnYlsxXTtcblx0XHRcdFx0dGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAxXSA9IGFyZ2JbMl07XG5cdFx0XHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMl0gPSBhcmdiWzNdO1xuXHRcdFx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID0gYXJnYlswXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuX2xvY2tlZCkge1xuXHRcdFx0dGhpcy5fY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5faW1hZ2VEYXRhLCAwLCAwKTtcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgYSBzaW5nbGUgcGl4ZWwgb2YgYSBCaXRtYXBEYXRhIG9iamVjdC4gVGhlIGN1cnJlbnQgYWxwaGEgY2hhbm5lbFxuXHQgKiB2YWx1ZSBvZiB0aGUgaW1hZ2UgcGl4ZWwgaXMgcHJlc2VydmVkIGR1cmluZyB0aGlzIG9wZXJhdGlvbi4gVGhlIHZhbHVlIG9mXG5cdCAqIHRoZSBSR0IgY29sb3IgcGFyYW1ldGVyIGlzIHRyZWF0ZWQgYXMgYW4gdW5tdWx0aXBsaWVkIGNvbG9yIHZhbHVlLlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVG8gaW5jcmVhc2UgcGVyZm9ybWFuY2UsIHdoZW4geW91IHVzZSB0aGVcblx0ICogPGNvZGU+c2V0UGl4ZWwoKTwvY29kZT4gb3IgPGNvZGU+c2V0UGl4ZWwzMigpPC9jb2RlPiBtZXRob2QgcmVwZWF0ZWRseSxcblx0ICogY2FsbCB0aGUgPGNvZGU+bG9jaygpPC9jb2RlPiBtZXRob2QgYmVmb3JlIHlvdSBjYWxsIHRoZVxuXHQgKiA8Y29kZT5zZXRQaXhlbCgpPC9jb2RlPiBvciA8Y29kZT5zZXRQaXhlbDMyKCk8L2NvZGU+IG1ldGhvZCwgYW5kIHRoZW4gY2FsbFxuXHQgKiB0aGUgPGNvZGU+dW5sb2NrKCk8L2NvZGU+IG1ldGhvZCB3aGVuIHlvdSBoYXZlIG1hZGUgYWxsIHBpeGVsIGNoYW5nZXMuXG5cdCAqIFRoaXMgcHJvY2VzcyBwcmV2ZW50cyBvYmplY3RzIHRoYXQgcmVmZXJlbmNlIHRoaXMgQml0bWFwRGF0YSBpbnN0YW5jZSBmcm9tXG5cdCAqIHVwZGF0aW5nIHVudGlsIHlvdSBmaW5pc2ggbWFraW5nIHRoZSBwaXhlbCBjaGFuZ2VzLjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHggICAgIFRoZSA8aT54PC9pPiBwb3NpdGlvbiBvZiB0aGUgcGl4ZWwgd2hvc2UgdmFsdWUgY2hhbmdlcy5cblx0ICogQHBhcmFtIHkgICAgIFRoZSA8aT55PC9pPiBwb3NpdGlvbiBvZiB0aGUgcGl4ZWwgd2hvc2UgdmFsdWUgY2hhbmdlcy5cblx0ICogQHBhcmFtIGNvbG9yIFRoZSByZXN1bHRpbmcgUkdCIGNvbG9yIGZvciB0aGUgcGl4ZWwuXG5cdCAqL1xuXHRwdWJsaWMgc2V0UGl4ZWwoeDpudW1iZXIsIHk6bnVtYmVyLCBjb2xvcjpudW1iZXIpXG5cdHtcblx0XHR2YXIgYXJnYjpudW1iZXJbXSA9IENvbG9yVXRpbHMuZmxvYXQzMkNvbG9yVG9BUkdCKGNvbG9yKTtcblxuXHRcdGlmICghdGhpcy5fbG9ja2VkKVxuXHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5fcmVjdC53aWR0aCwgdGhpcy5fcmVjdC5oZWlnaHQpO1xuXG5cdFx0dmFyIGluZGV4Om51bWJlciA9ICh4ICsgeSp0aGlzLl9pbWFnZUNhbnZhcy53aWR0aCkqNDtcblxuXHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMF0gPSBhcmdiWzFdO1xuXHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMV0gPSBhcmdiWzJdO1xuXHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMl0gPSBhcmdiWzNdO1xuXHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgM10gPSAyNTU7XG5cblx0XHRpZiAoIXRoaXMuX2xvY2tlZCkge1xuXHRcdFx0dGhpcy5fY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5faW1hZ2VEYXRhLCAwLCAwKTtcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIGNvbG9yIGFuZCBhbHBoYSB0cmFuc3BhcmVuY3kgdmFsdWVzIG9mIGEgc2luZ2xlIHBpeGVsIG9mIGFcblx0ICogQml0bWFwRGF0YSBvYmplY3QuIFRoaXMgbWV0aG9kIGlzIHNpbWlsYXIgdG8gdGhlIDxjb2RlPnNldFBpeGVsKCk8L2NvZGU+XG5cdCAqIG1ldGhvZDsgdGhlIG1haW4gZGlmZmVyZW5jZSBpcyB0aGF0IHRoZSA8Y29kZT5zZXRQaXhlbDMyKCk8L2NvZGU+IG1ldGhvZFxuXHQgKiB0YWtlcyBhbiBBUkdCIGNvbG9yIHZhbHVlIHRoYXQgY29udGFpbnMgYWxwaGEgY2hhbm5lbCBpbmZvcm1hdGlvbi5cblx0ICpcblx0ICogPHA+QWxsIHBpeGVscyBpbiBhIEJpdG1hcERhdGEgb2JqZWN0IGFyZSBzdG9yZWQgYXMgcHJlbXVsdGlwbGllZCBjb2xvclxuXHQgKiB2YWx1ZXMuIEEgcHJlbXVsdGlwbGllZCBpbWFnZSBwaXhlbCBoYXMgdGhlIHJlZCwgZ3JlZW4sIGFuZCBibHVlIGNvbG9yXG5cdCAqIGNoYW5uZWwgdmFsdWVzIGFscmVhZHkgbXVsdGlwbGllZCBieSB0aGUgYWxwaGEgZGF0YS4gRm9yIGV4YW1wbGUsIGlmIHRoZVxuXHQgKiBhbHBoYSB2YWx1ZSBpcyAwLCB0aGUgdmFsdWVzIGZvciB0aGUgUkdCIGNoYW5uZWxzIGFyZSBhbHNvIDAsIGluZGVwZW5kZW50XG5cdCAqIG9mIHRoZWlyIHVubXVsdGlwbGllZCB2YWx1ZXMuIFRoaXMgbG9zcyBvZiBkYXRhIGNhbiBjYXVzZSBzb21lIHByb2JsZW1zXG5cdCAqIHdoZW4geW91IHBlcmZvcm0gb3BlcmF0aW9ucy4gQWxsIEJpdG1hcERhdGEgbWV0aG9kcyB0YWtlIGFuZCByZXR1cm5cblx0ICogdW5tdWx0aXBsaWVkIHZhbHVlcy4gVGhlIGludGVybmFsIHBpeGVsIHJlcHJlc2VudGF0aW9uIGlzIGNvbnZlcnRlZCBmcm9tXG5cdCAqIHByZW11bHRpcGxpZWQgdG8gdW5tdWx0aXBsaWVkIGJlZm9yZSBpdCBpcyByZXR1cm5lZCBhcyBhIHZhbHVlLiBEdXJpbmcgYVxuXHQgKiBzZXQgb3BlcmF0aW9uLCB0aGUgcGl4ZWwgdmFsdWUgaXMgcHJlbXVsdGlwbGllZCBiZWZvcmUgdGhlIHJhdyBpbWFnZSBwaXhlbFxuXHQgKiBpcyBzZXQuPC9wPlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVG8gaW5jcmVhc2UgcGVyZm9ybWFuY2UsIHdoZW4geW91IHVzZSB0aGVcblx0ICogPGNvZGU+c2V0UGl4ZWwoKTwvY29kZT4gb3IgPGNvZGU+c2V0UGl4ZWwzMigpPC9jb2RlPiBtZXRob2QgcmVwZWF0ZWRseSxcblx0ICogY2FsbCB0aGUgPGNvZGU+bG9jaygpPC9jb2RlPiBtZXRob2QgYmVmb3JlIHlvdSBjYWxsIHRoZVxuXHQgKiA8Y29kZT5zZXRQaXhlbCgpPC9jb2RlPiBvciA8Y29kZT5zZXRQaXhlbDMyKCk8L2NvZGU+IG1ldGhvZCwgYW5kIHRoZW4gY2FsbFxuXHQgKiB0aGUgPGNvZGU+dW5sb2NrKCk8L2NvZGU+IG1ldGhvZCB3aGVuIHlvdSBoYXZlIG1hZGUgYWxsIHBpeGVsIGNoYW5nZXMuXG5cdCAqIFRoaXMgcHJvY2VzcyBwcmV2ZW50cyBvYmplY3RzIHRoYXQgcmVmZXJlbmNlIHRoaXMgQml0bWFwRGF0YSBpbnN0YW5jZSBmcm9tXG5cdCAqIHVwZGF0aW5nIHVudGlsIHlvdSBmaW5pc2ggbWFraW5nIHRoZSBwaXhlbCBjaGFuZ2VzLjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHggICAgIFRoZSA8aT54PC9pPiBwb3NpdGlvbiBvZiB0aGUgcGl4ZWwgd2hvc2UgdmFsdWUgY2hhbmdlcy5cblx0ICogQHBhcmFtIHkgICAgIFRoZSA8aT55PC9pPiBwb3NpdGlvbiBvZiB0aGUgcGl4ZWwgd2hvc2UgdmFsdWUgY2hhbmdlcy5cblx0ICogQHBhcmFtIGNvbG9yIFRoZSByZXN1bHRpbmcgQVJHQiBjb2xvciBmb3IgdGhlIHBpeGVsLiBJZiB0aGUgYml0bWFwIGlzXG5cdCAqICAgICAgICAgICAgICBvcGFxdWUobm90IHRyYW5zcGFyZW50KSwgdGhlIGFscGhhIHRyYW5zcGFyZW5jeSBwb3J0aW9uIG9mXG5cdCAqICAgICAgICAgICAgICB0aGlzIGNvbG9yIHZhbHVlIGlzIGlnbm9yZWQuXG5cdCAqL1xuXHRwdWJsaWMgc2V0UGl4ZWwzMih4LCB5LCBjb2xvcjpudW1iZXIpXG5cdHtcblx0XHR2YXIgYXJnYjpudW1iZXJbXSA9IENvbG9yVXRpbHMuZmxvYXQzMkNvbG9yVG9BUkdCKGNvbG9yKTtcblxuXHRcdGlmICghdGhpcy5fbG9ja2VkKVxuXHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5fcmVjdC53aWR0aCwgdGhpcy5fcmVjdC5oZWlnaHQpO1xuXG5cdFx0dmFyIGluZGV4Om51bWJlciA9ICh4ICsgeSp0aGlzLl9pbWFnZUNhbnZhcy53aWR0aCkqNDtcblxuXHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMF0gPSBhcmdiWzFdO1xuXHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMV0gPSBhcmdiWzJdO1xuXHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMl0gPSBhcmdiWzNdO1xuXHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgM10gPSBhcmdiWzBdO1xuXG5cdFx0aWYgKCF0aGlzLl9sb2NrZWQpIHtcblx0XHRcdHRoaXMuX2NvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuX2ltYWdlRGF0YSwgMCwgMCk7XG5cdFx0XHR0aGlzLl9pbWFnZURhdGEgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIGJ5dGUgYXJyYXkgaW50byBhIHJlY3Rhbmd1bGFyIHJlZ2lvbiBvZiBwaXhlbCBkYXRhLiBGb3IgZWFjaFxuXHQgKiBwaXhlbCwgdGhlIDxjb2RlPkJ5dGVBcnJheS5yZWFkVW5zaWduZWRJbnQoKTwvY29kZT4gbWV0aG9kIGlzIGNhbGxlZCBhbmRcblx0ICogdGhlIHJldHVybiB2YWx1ZSBpcyB3cml0dGVuIGludG8gdGhlIHBpeGVsLiBJZiB0aGUgYnl0ZSBhcnJheSBlbmRzIGJlZm9yZVxuXHQgKiB0aGUgZnVsbCByZWN0YW5nbGUgaXMgd3JpdHRlbiwgdGhlIGZ1bmN0aW9uIHJldHVybnMuIFRoZSBkYXRhIGluIHRoZSBieXRlXG5cdCAqIGFycmF5IGlzIGV4cGVjdGVkIHRvIGJlIDMyLWJpdCBBUkdCIHBpeGVsIHZhbHVlcy4gTm8gc2Vla2luZyBpcyBwZXJmb3JtZWRcblx0ICogb24gdGhlIGJ5dGUgYXJyYXkgYmVmb3JlIG9yIGFmdGVyIHRoZSBwaXhlbHMgYXJlIHJlYWQuXG5cdCAqXG5cdCAqIEBwYXJhbSByZWN0ICAgICAgICAgICBTcGVjaWZpZXMgdGhlIHJlY3Rhbmd1bGFyIHJlZ2lvbiBvZiB0aGUgQml0bWFwRGF0YVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlxuXHQgKiBAcGFyYW0gaW5wdXRCeXRlQXJyYXkgQSBCeXRlQXJyYXkgb2JqZWN0IHRoYXQgY29uc2lzdHMgb2YgMzItYml0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB1bm11bHRpcGxpZWQgcGl4ZWwgdmFsdWVzIHRvIGJlIHVzZWQgaW4gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICByZWN0YW5ndWxhciByZWdpb24uXG5cdCAqIEB0aHJvd3MgRU9GRXJyb3IgIFRoZSA8Y29kZT5pbnB1dEJ5dGVBcnJheTwvY29kZT4gb2JqZWN0IGRvZXMgbm90IGluY2x1ZGVcblx0ICogICAgICAgICAgICAgICAgICAgZW5vdWdoIGRhdGEgdG8gZmlsbCB0aGUgYXJlYSBvZiB0aGUgPGNvZGU+cmVjdDwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgcmVjdGFuZ2xlLiBUaGUgbWV0aG9kIGZpbGxzIGFzIG1hbnkgcGl4ZWxzIGFzIHBvc3NpYmxlXG5cdCAqICAgICAgICAgICAgICAgICAgIGJlZm9yZSB0aHJvd2luZyB0aGUgZXhjZXB0aW9uLlxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvciBUaGUgcmVjdCBvciBpbnB1dEJ5dGVBcnJheSBhcmUgbnVsbC5cblx0ICovXG5cdHB1YmxpYyBzZXRQaXhlbHMocmVjdDpSZWN0YW5nbGUsIGlucHV0Qnl0ZUFycmF5OkJ5dGVBcnJheSlcblx0e1xuXHRcdGlmICghdGhpcy5fbG9ja2VkKVxuXHRcdFx0dGhpcy5faW1hZ2VEYXRhID0gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5fcmVjdC53aWR0aCwgdGhpcy5fcmVjdC5oZWlnaHQpO1xuXG5cdFx0aW5wdXRCeXRlQXJyYXkucG9zaXRpb24gPSAwO1xuXHRcdHZhciBpOm51bWJlciAvKnVpbnQqLywgajpudW1iZXIgLyp1aW50Ki8sIGluZGV4Om51bWJlciAvKnVpbnQqLztcblx0XHRmb3IgKGkgPSAwOyBpIDwgcmVjdC53aWR0aDsgKytpKSB7XG5cdFx0XHRmb3IgKGogPSAwOyBqIDwgcmVjdC5oZWlnaHQ7ICsraikge1xuXHRcdFx0XHRpbmRleCA9IChpICsgcmVjdC54ICsgKGogKyByZWN0LnkpKnRoaXMuX2ltYWdlQ2FudmFzLndpZHRoKSo0O1xuXG5cdFx0XHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgMF0gPSBpbnB1dEJ5dGVBcnJheS5yZWFkVW5zaWduZWRJbnQoKTtcblx0XHRcdFx0dGhpcy5faW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAxXSA9IGlucHV0Qnl0ZUFycmF5LnJlYWRVbnNpZ25lZEludCgpO1xuXHRcdFx0XHR0aGlzLl9pbWFnZURhdGEuZGF0YVtpbmRleCArIDJdID0gaW5wdXRCeXRlQXJyYXkucmVhZFVuc2lnbmVkSW50KCk7XG5cdFx0XHRcdHRoaXMuX2ltYWdlRGF0YS5kYXRhW2luZGV4ICsgM10gPSBpbnB1dEJ5dGVBcnJheS5yZWFkVW5zaWduZWRJbnQoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuX2xvY2tlZCkge1xuXHRcdFx0dGhpcy5fY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5faW1hZ2VEYXRhLCAwLCAwKTtcblx0XHRcdHRoaXMuX2ltYWdlRGF0YSA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFVubG9ja3MgYW4gaW1hZ2Ugc28gdGhhdCBhbnkgb2JqZWN0cyB0aGF0IHJlZmVyZW5jZSB0aGUgQml0bWFwRGF0YSBvYmplY3QsXG5cdCAqIHN1Y2ggYXMgQml0bWFwIG9iamVjdHMsIGFyZSB1cGRhdGVkIHdoZW4gdGhpcyBCaXRtYXBEYXRhIG9iamVjdCBjaGFuZ2VzLlxuXHQgKiBUbyBpbXByb3ZlIHBlcmZvcm1hbmNlLCB1c2UgdGhpcyBtZXRob2QgYWxvbmcgd2l0aCB0aGUgPGNvZGU+bG9jaygpPC9jb2RlPlxuXHQgKiBtZXRob2QgYmVmb3JlIGFuZCBhZnRlciBudW1lcm91cyBjYWxscyB0byB0aGUgPGNvZGU+c2V0UGl4ZWwoKTwvY29kZT4gb3Jcblx0ICogPGNvZGU+c2V0UGl4ZWwzMigpPC9jb2RlPiBtZXRob2QuXG5cdCAqXG5cdCAqIEBwYXJhbSBjaGFuZ2VSZWN0IFRoZSBhcmVhIG9mIHRoZSBCaXRtYXBEYXRhIG9iamVjdCB0aGF0IGhhcyBjaGFuZ2VkLiBJZlxuXHQgKiAgICAgICAgICAgICAgICAgICB5b3UgZG8gbm90IHNwZWNpZnkgYSB2YWx1ZSBmb3IgdGhpcyBwYXJhbWV0ZXIsIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICBlbnRpcmUgYXJlYSBvZiB0aGUgQml0bWFwRGF0YSBvYmplY3QgaXMgY29uc2lkZXJlZFxuXHQgKiAgICAgICAgICAgICAgICAgICBjaGFuZ2VkLlxuXHQgKi9cblx0cHVibGljIHVubG9jaygpXG5cdHtcblx0XHRpZiAoIXRoaXMuX2xvY2tlZClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2xvY2tlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5fY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5faW1hZ2VEYXRhLCAwLCAwKTsgLy8gYXQgY29vcmRzIDAsMFxuXHRcdHRoaXMuX2ltYWdlRGF0YSA9IG51bGw7XG5cdH1cblxuXHRwcml2YXRlIF9jb3B5UGl4ZWxzKGJtcGQ6Qml0bWFwRGF0YSwgc291cmNlUmVjdDpSZWN0YW5nbGUsIGRlc3RSZWN0OlJlY3RhbmdsZSk7XG5cdHByaXZhdGUgX2NvcHlQaXhlbHMoYm1wZDpIVE1MSW1hZ2VFbGVtZW50LCBzb3VyY2VSZWN0OlJlY3RhbmdsZSwgZGVzdFJlY3Q6UmVjdGFuZ2xlKTtcblx0cHJpdmF0ZSBfY29weVBpeGVscyhibXBkOmFueSwgc291cmNlUmVjdDpSZWN0YW5nbGUsIGRlc3RSZWN0OlJlY3RhbmdsZSlcblx0e1xuXG5cdFx0aWYgKGJtcGQgaW5zdGFuY2VvZiBCaXRtYXBEYXRhKSB7XG5cdFx0XHR0aGlzLl9jb250ZXh0LmRyYXdJbWFnZShibXBkLmNhbnZhcywgc291cmNlUmVjdC54LCBzb3VyY2VSZWN0LnksIHNvdXJjZVJlY3Qud2lkdGgsIHNvdXJjZVJlY3QuaGVpZ2h0LCBkZXN0UmVjdC54LCBkZXN0UmVjdC55LCBkZXN0UmVjdC53aWR0aCwgZGVzdFJlY3QuaGVpZ2h0KTtcblx0XHR9IGVsc2UgaWYgKGJtcGQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG5cdFx0XHR0aGlzLl9jb250ZXh0LmRyYXdJbWFnZShibXBkLCBzb3VyY2VSZWN0LngsIHNvdXJjZVJlY3QueSwgc291cmNlUmVjdC53aWR0aCwgc291cmNlUmVjdC5oZWlnaHQsIGRlc3RSZWN0LngsIGRlc3RSZWN0LnksIGRlc3RSZWN0LndpZHRoLCBkZXN0UmVjdC5oZWlnaHQpO1xuXHRcdH1cblxuXHR9XG5cblx0cHJpdmF0ZSBfZHJhdyhzb3VyY2U6Qml0bWFwRGF0YSwgbWF0cml4Ok1hdHJpeCwgY29sb3JUcmFuc2Zvcm06Q29sb3JUcmFuc2Zvcm0sIGJsZW5kTW9kZTpCbGVuZE1vZGUsIGNsaXBSZWN0OlJlY3RhbmdsZSwgc21vb3RoaW5nOmJvb2xlYW4pO1xuXHRwcml2YXRlIF9kcmF3KHNvdXJjZTpIVE1MRWxlbWVudCwgbWF0cml4Ok1hdHJpeCwgY29sb3JUcmFuc2Zvcm06Q29sb3JUcmFuc2Zvcm0sIGJsZW5kTW9kZTpCbGVuZE1vZGUsIGNsaXBSZWN0OlJlY3RhbmdsZSwgc21vb3RoaW5nOmJvb2xlYW4pO1xuXHRwcml2YXRlIF9kcmF3KHNvdXJjZTphbnksIG1hdHJpeDpNYXRyaXgsIGNvbG9yVHJhbnNmb3JtOkNvbG9yVHJhbnNmb3JtLCBibGVuZE1vZGU6QmxlbmRNb2RlLCBjbGlwUmVjdDpSZWN0YW5nbGUsIHNtb290aGluZzpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHNvdXJjZSBpbnN0YW5jZW9mIEJpdG1hcERhdGEpIHtcblx0XHRcdHRoaXMuX2NvbnRleHQuc2F2ZSgpO1xuXG5cdFx0XHRpZiAobWF0cml4ICE9IG51bGwpXG5cdFx0XHRcdHRoaXMuX2NvbnRleHQuc2V0VHJhbnNmb3JtKG1hdHJpeC5hLCBtYXRyaXguYiwgbWF0cml4LmMsIG1hdHJpeC5kLCBtYXRyaXgudHgsIG1hdHJpeC50eSk7XG5cblx0XHRcdGlmIChjbGlwUmVjdCAhPSBudWxsKVxuXHRcdFx0XHR0aGlzLl9jb250ZXh0LmRyYXdJbWFnZShzb3VyY2UuY2FudmFzLCBjbGlwUmVjdC54LCBjbGlwUmVjdC55LCBjbGlwUmVjdC53aWR0aCwgY2xpcFJlY3QuaGVpZ2h0KTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5fY29udGV4dC5kcmF3SW1hZ2Uoc291cmNlLmNhbnZhcywgMCwgMCk7XG5cblx0XHRcdHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuXG5cdFx0fSBlbHNlIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuXHRcdFx0dGhpcy5fY29udGV4dC5zYXZlKCk7XG5cblx0XHRcdGlmIChtYXRyaXggIT0gbnVsbClcblx0XHRcdFx0dGhpcy5fY29udGV4dC5zZXRUcmFuc2Zvcm0obWF0cml4LmEsIG1hdHJpeC5iLCBtYXRyaXguYywgbWF0cml4LmQsIG1hdHJpeC50eCwgbWF0cml4LnR5KTtcblxuXHRcdFx0aWYgKGNsaXBSZWN0ICE9IG51bGwpXG5cdFx0XHRcdHRoaXMuX2NvbnRleHQuZHJhd0ltYWdlKHNvdXJjZSwgY2xpcFJlY3QueCwgY2xpcFJlY3QueSwgY2xpcFJlY3Qud2lkdGgsIGNsaXBSZWN0LmhlaWdodCk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMuX2NvbnRleHQuZHJhd0ltYWdlKHNvdXJjZSwgMCwgMCk7XG5cblx0XHRcdHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX2ZpbGxSZWN0KHJlY3Q6UmVjdGFuZ2xlLCBjb2xvcjpudW1iZXIpXG5cdHtcblx0XHRpZiAoY29sb3IgPT0gMHgwICYmIHRoaXMuX3RyYW5zcGFyZW50KSB7XG5cdFx0XHR0aGlzLl9jb250ZXh0LmNsZWFyUmVjdChyZWN0LngsIHJlY3QueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgYXJnYjpudW1iZXJbXSA9IENvbG9yVXRpbHMuZmxvYXQzMkNvbG9yVG9BUkdCKGNvbG9yKTtcblxuXHRcdFx0aWYgKHRoaXMuX3RyYW5zcGFyZW50KVxuXHRcdFx0XHR0aGlzLl9jb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKCcgKyBhcmdiWzFdICsgJywnICsgYXJnYlsyXSArICcsJyArIGFyZ2JbM10gKyAnLCcgKyBhcmdiWzBdLzI1NSArICcpJztcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgnICsgYXJnYlsxXSArICcsJyArIGFyZ2JbMl0gKyAnLCcgKyBhcmdiWzNdICsgJywxKSc7XG5cblx0XHRcdHRoaXMuX2NvbnRleHQuZmlsbFJlY3QocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge0ltYWdlRGF0YX1cblx0ICovXG5cdHB1YmxpYyBnZXQgaW1hZ2VEYXRhKCk6SW1hZ2VEYXRhXG5cdHtcblx0XHRpZiAoIXRoaXMuX2xvY2tlZClcblx0XHRcdHJldHVybiB0aGlzLl9jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLl9yZWN0LndpZHRoLCB0aGlzLl9yZWN0LmhlaWdodCk7XG5cblx0XHRyZXR1cm4gdGhpcy5faW1hZ2VEYXRhO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtIVE1MQ2FudmFzRWxlbWVudH1cblx0ICovXG5cdHB1YmxpYyBnZXQgY2FudmFzKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9pbWFnZUNhbnZhcztcblx0fVxufVxuXG5leHBvcnQgPSBCaXRtYXBEYXRhOyJdfQ==