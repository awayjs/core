declare module "awayjs-core/lib/attributes/AttributesBuffer" {
	import AttributesView = require("awayjs-core/lib/attributes/AttributesView");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import AssetBase = require("awayjs-core/lib/library/AssetBase");
	import IAttributesBufferVO = require("awayjs-core/lib/vos/IAttributesBufferVO");
	class AttributesBuffer extends AssetBase implements IAsset {
	    static assetType: string;
	    private _attributesBufferVO;
	    private _count;
	    private _stride;
	    private _newStride;
	    private _buffer;
	    private _bufferView;
	    private _contentDirty;
	    private _lengthDirty;
	    private _viewVOs;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    stride: number;
	    count: number;
	    buffer: ArrayBuffer;
	    bufferView: Uint8Array;
	    length: number;
	    /**
	     *
	     */
	    constructor(stride?: number, count?: number);
	    /**
	     *
	     */
	    invalidateContent(): void;
	    /**
	     *
	     * @private
	     */
	    invalidateLength(): void;
	    clone(): AttributesBuffer;
	    getView(index: number): AttributesView;
	    /**
	     * @inheritDoc
	     */
	    dispose(): void;
	    _setAttributes(viewIndex: number, arrayBufferView: ArrayBufferView, offset?: number): void;
	    _getLocalArrayBuffer(viewIndex: number): ArrayBuffer;
	    _iAddAttributesBufferVO(AttributesBufferVO: IAttributesBufferVO): IAttributesBufferVO;
	    _iRemoveAttributesBufferVO(AttributesBufferVO: IAttributesBufferVO): IAttributesBufferVO;
	    _addView(view: AttributesView): void;
	    _removeView(view: AttributesView): void;
	    _getOffset(viewIndex: number): number;
	    _updateLength(): void;
	}
	export = AttributesBuffer;
	
}

declare module "awayjs-core/lib/attributes/Byte4Attributes" {
	import AttributesBuffer = require("awayjs-core/lib/attributes/AttributesBuffer");
	import AttributesView = require("awayjs-core/lib/attributes/AttributesView");
	class Byte4Attributes extends AttributesView {
	    static assetType: string;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    /**
	     *
	     */
	    constructor(length?: number, unsigned?: boolean);
	    constructor(attributesBuffer?: AttributesBuffer, unsigned?: boolean);
	    set(array: Array<number>, offset?: number): any;
	    set(typedArray: Float32Array, offset?: number): any;
	    set(typedArray: Uint8Array, offset?: number): any;
	    set(typedArray: Int8Array, offset?: number): any;
	    get(count: number, offset?: number): Uint8Array;
	    get(count: number, offset?: number): Int8Array;
	    _internalClone(attributesBuffer: AttributesBuffer): Byte4Attributes;
	    clone(attributesBuffer?: AttributesBuffer): Byte4Attributes;
	}
	export = Byte4Attributes;
	
}

declare module "awayjs-core/lib/attributes/AttributesView" {
	import AttributesBuffer = require("awayjs-core/lib/attributes/AttributesBuffer");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import AssetBase = require("awayjs-core/lib/library/AssetBase");
	import IArrayBufferViewClass = require("awayjs-core/lib/utils/IArrayBufferViewClass");
	class AttributesView extends AssetBase implements IAsset {
	    static assetType: string;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    _cloneCache: AttributesView;
	    _attributesBuffer: AttributesBuffer;
	    _bufferDirty: boolean;
	    private _size;
	    private _dimensions;
	    _index: number;
	    _arrayClass: IArrayBufferViewClass;
	    _localArrayBuffer: ArrayBuffer;
	    normalized: boolean;
	    buffer: AttributesBuffer;
	    /**
	     *
	     * @returns {number}
	     */
	    size: number;
	    /**
	     *
	     * @returns {number}
	     */
	    dimensions: number;
	    count: number;
	    offset: number;
	    length: number;
	    /**
	     *
	     */
	    constructor(arrayClass: IArrayBufferViewClass, dimensions: number, count?: number);
	    constructor(arrayClass: IArrayBufferViewClass, dimensions: number, attributesBuffer?: AttributesBuffer);
	    set(array: Array<number>, offset?: number): any;
	    set(arrayBufferView: ArrayBufferView, offset?: number): any;
	    get(count: number, offset?: number): ArrayBufferView;
	    _internalClone(attributesBuffer: AttributesBuffer): AttributesView;
	    clone(attributesBuffer?: AttributesBuffer): AttributesView;
	    /**
	     * @inheritDoc
	     */
	    dispose(): void;
	}
	export = AttributesView;
	
}

declare module "awayjs-core/lib/attributes/Float1Attributes" {
	import AttributesBuffer = require("awayjs-core/lib/attributes/AttributesBuffer");
	import AttributesView = require("awayjs-core/lib/attributes/AttributesView");
	class Float1Attributes extends AttributesView {
	    static assetType: string;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    /**
	     *
	     */
	    constructor(length?: number);
	    constructor(attributesBuffer?: AttributesBuffer);
	    set(array: Array<number>, offset?: number): any;
	    set(typedArray: Float32Array, offset?: number): any;
	    get(count: number, offset?: number): Float32Array;
	    _internalClone(attributesBuffer: AttributesBuffer): Float1Attributes;
	    clone(attributesBuffer?: AttributesBuffer): Float1Attributes;
	}
	export = Float1Attributes;
	
}

declare module "awayjs-core/lib/attributes/Float3Attributes" {
	import AttributesBuffer = require("awayjs-core/lib/attributes/AttributesBuffer");
	import AttributesView = require("awayjs-core/lib/attributes/AttributesView");
	class Float3Attributes extends AttributesView {
	    static assetType: string;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    /**
	     *
	     */
	    constructor(length?: number);
	    constructor(attributesBuffer?: AttributesBuffer);
	    set(array: Array<number>, offset?: number): any;
	    set(typedArray: Float32Array, offset?: number): any;
	    get(count: number, offset?: number): Float32Array;
	    _internalClone(attributesBuffer: AttributesBuffer): Float3Attributes;
	    clone(attributesBuffer?: AttributesBuffer): Float3Attributes;
	}
	export = Float3Attributes;
	
}

declare module "awayjs-core/lib/attributes/Float2Attributes" {
	import AttributesBuffer = require("awayjs-core/lib/attributes/AttributesBuffer");
	import AttributesView = require("awayjs-core/lib/attributes/AttributesView");
	class Float2Attributes extends AttributesView {
	    static assetType: string;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    /**
	     *
	     */
	    constructor(length?: number);
	    constructor(attributesBuffer?: AttributesBuffer);
	    set(array: Array<number>, offset?: number): any;
	    set(typedArray: Float32Array, offset?: number): any;
	    get(count: number, offset?: number): Float32Array;
	    _internalClone(attributesBuffer: AttributesBuffer): Float2Attributes;
	    clone(attributesBuffer?: AttributesBuffer): Float2Attributes;
	}
	export = Float2Attributes;
	
}

declare module "awayjs-core/lib/attributes/Float4Attributes" {
	import AttributesBuffer = require("awayjs-core/lib/attributes/AttributesBuffer");
	import AttributesView = require("awayjs-core/lib/attributes/AttributesView");
	class Float4Attributes extends AttributesView {
	    static assetType: string;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    /**
	     *
	     */
	    constructor(length?: number);
	    constructor(attributesBuffer?: AttributesBuffer);
	    set(array: Array<number>, offset?: number): any;
	    set(typedArray: Float32Array, offset?: number): any;
	    get(count: number, offset?: number): Float32Array;
	    _internalClone(attributesBuffer: AttributesBuffer): Float4Attributes;
	    clone(attributesBuffer?: AttributesBuffer): Float4Attributes;
	}
	export = Float4Attributes;
	
}

declare module "awayjs-core/lib/attributes/Short3Attributes" {
	import AttributesBuffer = require("awayjs-core/lib/attributes/AttributesBuffer");
	import AttributesView = require("awayjs-core/lib/attributes/AttributesView");
	class Short3Attributes extends AttributesView {
	    static assetType: string;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    /**
	     *
	     */
	    constructor(length?: number, unsigned?: boolean);
	    constructor(attributesBuffer?: AttributesBuffer, unsigned?: boolean);
	    set(array: Array<number>, offset?: number): any;
	    set(typedArray: Uint16Array, offset?: number): any;
	    set(typedArray: Int16Array, offset?: number): any;
	    get(count: number, offset?: number): Uint16Array;
	    get(count: number, offset?: number): Int16Array;
	    _internalClone(attributesBuffer: AttributesBuffer): Short3Attributes;
	    clone(attributesBuffer?: AttributesBuffer): Short3Attributes;
	}
	export = Short3Attributes;
	
}

declare module "awayjs-core/lib/attributes/Short2Attributes" {
	import AttributesBuffer = require("awayjs-core/lib/attributes/AttributesBuffer");
	import AttributesView = require("awayjs-core/lib/attributes/AttributesView");
	class Short2Attributes extends AttributesView {
	    static assetType: string;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    /**
	     *
	     */
	    constructor(length?: number, unsigned?: boolean);
	    constructor(attributesBuffer?: AttributesBuffer, unsigned?: boolean);
	    set(array: Array<number>, offset?: number): any;
	    set(typedArray: Uint16Array, offset?: number): any;
	    set(typedArray: Int16Array, offset?: number): any;
	    get(count: number, offset?: number): Uint16Array;
	    get(count: number, offset?: number): Int16Array;
	    _internalClone(attributesBuffer: AttributesBuffer): Short2Attributes;
	    clone(attributesBuffer?: AttributesBuffer): Short2Attributes;
	}
	export = Short2Attributes;
	
}

declare module "awayjs-core/lib/data/BitmapImageChannel" {
	class BitmapImageChannel {
	    static ALPHA: number;
	    static BLUE: number;
	    static GREEN: number;
	    static RED: number;
	}
	export = BitmapImageChannel;
	
}

declare module "awayjs-core/lib/data/BitmapImage2D" {
	import Image2D = require("awayjs-core/lib/data/Image2D");
	import BlendMode = require("awayjs-core/lib/data/BlendMode");
	import ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
	import Matrix = require("awayjs-core/lib/geom/Matrix");
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	import Point = require("awayjs-core/lib/geom/Point");
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	/**
	 * The BitmapImage2D class lets you work with the data(pixels) of a Bitmap
	 * object. You can use the methods of the BitmapImage2D class to create
	 * arbitrarily sized transparent or opaque bitmap images and manipulate them
	 * in various ways at runtime. You can also access the BitmapImage2D for a bitmap
	 * image that you load with the <code>flash.Assets</code> or
	 * <code>flash.display.Loader</code> classes.
	 *
	 * <p>This class lets you separate bitmap rendering operations from the
	 * internal display updating routines of flash. By manipulating a
	 * BitmapImage2D object directly, you can create complex images without incurring
	 * the per-frame overhead of constantly redrawing the content from vector
	 * data.</p>
	 *
	 * <p>The methods of the BitmapImage2D class support effects that are not
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
	class BitmapImage2D extends Image2D {
	    static assetType: string;
	    private _imageCanvas;
	    private _context;
	    private _imageData;
	    private _transparent;
	    private _locked;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    /**
	     * Defines whether the bitmap image supports per-pixel transparency. You can
	     * set this value only when you construct a BitmapImage2D object by passing in
	     * <code>true</code> for the <code>transparent</code> parameter of the
	     * constructor. Then, after you create a BitmapImage2D object, you can check
	     * whether it supports per-pixel transparency by determining if the value of
	     * the <code>transparent</code> property is <code>true</code>.
	     */
	    transparent: boolean;
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
	    constructor(width: number, height: number, transparent?: boolean, fillColor?: number, powerOfTwo?: boolean);
	    /**
	     * Returns a new BitmapImage2D object that is a clone of the original instance
	     * with an exact copy of the contained bitmap.
	     *
	     * @return A new BitmapImage2D object that is identical to the original.
	     */
	    clone(): BitmapImage2D;
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
	    colorTransform(rect: Rectangle, colorTransform: ColorTransform): void;
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
	    copyChannel(sourceBitmap: BitmapImage2D, sourceRect: Rectangle, destPoint: Point, sourceChannel: number, destChannel: number): void;
	    /**
	     * Provides a fast routine to perform pixel manipulation between images with
	     * no stretching, rotation, or color effects. This method copies a
	     * rectangular area of a source image to a rectangular area of the same size
	     * at the destination point of the destination BitmapImage2D object.
	     *
	     * <p>If you include the <code>alphaBitmap</code> and <code>alphaPoint</code>
	     * parameters, you can use a secondary image as an alpha source for the
	     * source image. If the source image has alpha data, both sets of alpha data
	     * are used to composite pixels from the source image to the destination
	     * image. The <code>alphaPoint</code> parameter is the point in the alpha
	     * image that corresponds to the upper-left corner of the source rectangle.
	     * Any pixels outside the intersection of the source image and alpha image
	     * are not copied to the destination image.</p>
	     *
	     * <p>The <code>mergeAlpha</code> property controls whether or not the alpha
	     * channel is used when a transparent image is copied onto another
	     * transparent image. To copy pixels with the alpha channel data, set the
	     * <code>mergeAlpha</code> property to <code>true</code>. By default, the
	     * <code>mergeAlpha</code> property is <code>false</code>.</p>
	     *
	     * @param sourceBitmapImage2D The input bitmap image from which to copy pixels.
	     *                         The source image can be a different BitmapImage2D
	     *                         instance, or it can refer to the current
	     *                         BitmapImage2D instance.
	     * @param sourceRect       A rectangle that defines the area of the source
	     *                         image to use as input.
	     * @param destPoint        The destination point that represents the
	     *                         upper-left corner of the rectangular area where
	     *                         the new pixels are placed.
	     * @param alphaBitmapImage2D  A secondary, alpha BitmapImage2D object source.
	     * @param alphaPoint       The point in the alpha BitmapImage2D object source
	     *                         that corresponds to the upper-left corner of the
	     *                         <code>sourceRect</code> parameter.
	     * @param mergeAlpha       To use the alpha channel, set the value to
	     *                         <code>true</code>. To copy pixels with no alpha
	     *                         channel, set the value to <code>false</code>.
	     * @throws TypeError The sourceBitmapImage2D, sourceRect, destPoint are null.
	     */
	    copyPixels(source: BitmapImage2D, sourceRect: Rectangle, destRect: Rectangle): any;
	    copyPixels(source: HTMLElement, sourceRect: Rectangle, destRect: Rectangle): any;
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
	    dispose(): void;
	    /**
	     * Draws the <code>source</code> display object onto the bitmap image, using
	     * the NME software renderer. You can specify <code>matrix</code>,
	     * <code>colorTransform</code>, <code>blendMode</code>, and a destination
	     * <code>clipRect</code> parameter to control how the rendering performs.
	     * Optionally, you can specify whether the bitmap should be smoothed when
	     * scaled(this works only if the source object is a BitmapImage2D object).
	     *
	     * <p>The source display object does not use any of its applied
	     * transformations for this call. It is treated as it exists in the library
	     * or file, with no matrix transform, no color transform, and no blend mode.
	     * To draw a display object(such as a movie clip) by using its own transform
	     * properties, you can copy its <code>transform</code> property object to the
	     * <code>transform</code> property of the Bitmap object that uses the
	     * BitmapImage2D object.</p>
	     *
	     * @param source         The display object or BitmapImage2D object to draw to
	     *                       the BitmapImage2D object.(The DisplayObject and
	     *                       BitmapImage2D classes implement the IBitmapDrawable
	     *                       interface.)
	     * @param matrix         A Matrix object used to scale, rotate, or translate
	     *                       the coordinates of the bitmap. If you do not want to
	     *                       apply a matrix transformation to the image, set this
	     *                       parameter to an identity matrix, created with the
	     *                       default <code>new Matrix()</code> constructor, or
	     *                       pass a <code>null</code> value.
	     * @param colorTransform A ColorTransform object that you use to adjust the
	     *                       color values of the bitmap. If no object is
	     *                       supplied, the bitmap image's colors are not
	     *                       transformed. If you must pass this parameter but you
	     *                       do not want to transform the image, set this
	     *                       parameter to a ColorTransform object created with
	     *                       the default <code>new ColorTransform()</code>
	     *                       constructor.
	     * @param blendMode      A string value, from the flash.display.BlendMode
	     *                       class, specifying the blend mode to be applied to
	     *                       the resulting bitmap.
	     * @param clipRect       A Rectangle object that defines the area of the
	     *                       source object to draw. If you do not supply this
	     *                       value, no clipping occurs and the entire source
	     *                       object is drawn.
	     * @param smoothing      A Boolean value that determines whether a BitmapImage2D
	     *                       object is smoothed when scaled or rotated, due to a
	     *                       scaling or rotation in the <code>matrix</code>
	     *                       parameter. The <code>smoothing</code> parameter only
	     *                       applies if the <code>source</code> parameter is a
	     *                       BitmapImage2D object. With <code>smoothing</code> set
	     *                       to <code>false</code>, the rotated or scaled
	     *                       BitmapImage2D image can appear pixelated or jagged. For
	     *                       example, the following two images use the same
	     *                       BitmapImage2D object for the <code>source</code>
	     *                       parameter, but the <code>smoothing</code> parameter
	     *                       is set to <code>true</code> on the left and
	     *                       <code>false</code> on the right:
	     *
	     *                       <p>Drawing a bitmap with <code>smoothing</code> set
	     *                       to <code>true</code> takes longer than doing so with
	     *                       <code>smoothing</code> set to
	     *                       <code>false</code>.</p>
	     * @throws ArgumentError The <code>source</code> parameter is not a
	     *                       BitmapImage2D or DisplayObject object.
	     * @throws ArgumentError The source is null or not a valid IBitmapDrawable
	     *                       object.
	     * @throws SecurityError The <code>source</code> object and(in the case of a
	     *                       Sprite or MovieClip object) all of its child objects
	     *                       do not come from the same domain as the caller, or
	     *                       are not in a content that is accessible to the
	     *                       caller by having called the
	     *                       <code>Security.allowDomain()</code> method. This
	     *                       restriction does not apply to AIR content in the
	     *                       application security sandbox.
	     */
	    draw(source: BitmapImage2D, matrix?: Matrix, colorTransform?: ColorTransform, blendMode?: BlendMode, clipRect?: Rectangle, smoothing?: boolean): any;
	    draw(source: HTMLElement, matrix?: Matrix, colorTransform?: ColorTransform, blendMode?: BlendMode, clipRect?: Rectangle, smoothing?: boolean): any;
	    /**
	     * Fills a rectangular area of pixels with a specified ARGB color.
	     *
	     * @param rect  The rectangular area to fill.
	     * @param color The ARGB color value that fills the area. ARGB colors are
	     *              often specified in hexadecimal format; for example,
	     *              0xFF336699.
	     * @throws TypeError The rect is null.
	     */
	    fillRect(rect: Rectangle, color: number): void;
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
	    getPixel(x: any, y: any): number;
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
	    getPixel32(x: any, y: any): number;
	    /**
	     * Locks an image so that any objects that reference the BitmapImage2D object,
	     * such as Bitmap objects, are not updated when this BitmapImage2D object
	     * changes. To improve performance, use this method along with the
	     * <code>unlock()</code> method before and after numerous calls to the
	     * <code>setPixel()</code> or <code>setPixel32()</code> method.
	     *
	     */
	    lock(): void;
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
	    setArray(rect: Rectangle, inputArray: Array<number>): void;
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
	    setPixel(x: number, y: number, color: number): void;
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
	    setPixel32(x: any, y: any, color: number): void;
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
	    setPixels(rect: Rectangle, inputByteArray: ByteArray): void;
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
	    unlock(): void;
	    /**
	     *
	     * @returns {ImageData}
	     */
	    getImageData(): ImageData;
	    /**
	     *
	     * @returns {HTMLCanvasElement}
	     */
	    getCanvas(): HTMLCanvasElement;
	    /**
	     *
	     * @param width
	     * @param height
	     * @private
	     */
	    _setSize(width: number, height: number): void;
	}
	export = BitmapImage2D;
	
}

declare module "awayjs-core/lib/data/BitmapImageCube" {
	import BitmapImage2D = require("awayjs-core/lib/data/BitmapImage2D");
	import ImageCube = require("awayjs-core/lib/data/ImageCube");
	import BlendMode = require("awayjs-core/lib/data/BlendMode");
	import ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
	import Matrix = require("awayjs-core/lib/geom/Matrix");
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	import Point = require("awayjs-core/lib/geom/Point");
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	/**
	 * The BitmapImage2D class lets you work with the data(pixels) of a Bitmap
	 * object. You can use the methods of the BitmapImage2D class to create
	 * arbitrarily sized transparent or opaque bitmap images and manipulate them
	 * in various ways at runtime. You can also access the BitmapImage2D for a bitmap
	 * image that you load with the <code>flash.Assets</code> or
	 * <code>flash.display.Loader</code> classes.
	 *
	 * <p>This class lets you separate bitmap rendering operations from the
	 * internal display updating routines of flash. By manipulating a
	 * BitmapImage2D object directly, you can create complex images without incurring
	 * the per-frame overhead of constantly redrawing the content from vector
	 * data.</p>
	 *
	 * <p>The methods of the BitmapImage2D class support effects that are not
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
	class BitmapImageCube extends ImageCube {
	    static assetType: string;
	    static posX: number;
	    static negX: number;
	    static posY: number;
	    static negY: number;
	    static posZ: number;
	    static negZ: number;
	    private _imageCanvas;
	    private _context;
	    private _imageData;
	    private _transparent;
	    private _locked;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    /**
	     * Defines whether the bitmap image supports per-pixel transparency. You can
	     * set this value only when you construct a BitmapImage2D object by passing in
	     * <code>true</code> for the <code>transparent</code> parameter of the
	     * constructor. Then, after you create a BitmapImage2D object, you can check
	     * whether it supports per-pixel transparency by determining if the value of
	     * the <code>transparent</code> property is <code>true</code>.
	     */
	    transparent: boolean;
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
	    constructor(size: number, transparent?: boolean, fillColor?: number);
	    /**
	     * Returns a new BitmapImage2D object that is a clone of the original instance
	     * with an exact copy of the contained bitmap.
	     *
	     * @return A new BitmapImage2D object that is identical to the original.
	     */
	    clone(): BitmapImageCube;
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
	    colorTransform(side: number, rect: Rectangle, colorTransform: ColorTransform): void;
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
	    copyChannel(side: number, sourceBitmap: BitmapImage2D, sourceRect: Rectangle, destPoint: Point, sourceChannel: number, destChannel: number): void;
	    /**
	     * Provides a fast routine to perform pixel manipulation between images with
	     * no stretching, rotation, or color effects. This method copies a
	     * rectangular area of a source image to a rectangular area of the same size
	     * at the destination point of the destination BitmapImage2D object.
	     *
	     * <p>If you include the <code>alphaBitmap</code> and <code>alphaPoint</code>
	     * parameters, you can use a secondary image as an alpha source for the
	     * source image. If the source image has alpha data, both sets of alpha data
	     * are used to composite pixels from the source image to the destination
	     * image. The <code>alphaPoint</code> parameter is the point in the alpha
	     * image that corresponds to the upper-left corner of the source rectangle.
	     * Any pixels outside the intersection of the source image and alpha image
	     * are not copied to the destination image.</p>
	     *
	     * <p>The <code>mergeAlpha</code> property controls whether or not the alpha
	     * channel is used when a transparent image is copied onto another
	     * transparent image. To copy pixels with the alpha channel data, set the
	     * <code>mergeAlpha</code> property to <code>true</code>. By default, the
	     * <code>mergeAlpha</code> property is <code>false</code>.</p>
	     *
	     * @param sourceBitmapImage2D The input bitmap image from which to copy pixels.
	     *                         The source image can be a different BitmapImage2D
	     *                         instance, or it can refer to the current
	     *                         BitmapImage2D instance.
	     * @param sourceRect       A rectangle that defines the area of the source
	     *                         image to use as input.
	     * @param destPoint        The destination point that represents the
	     *                         upper-left corner of the rectangular area where
	     *                         the new pixels are placed.
	     * @param alphaBitmapImage2D  A secondary, alpha BitmapImage2D object source.
	     * @param alphaPoint       The point in the alpha BitmapImage2D object source
	     *                         that corresponds to the upper-left corner of the
	     *                         <code>sourceRect</code> parameter.
	     * @param mergeAlpha       To use the alpha channel, set the value to
	     *                         <code>true</code>. To copy pixels with no alpha
	     *                         channel, set the value to <code>false</code>.
	     * @throws TypeError The sourceBitmapImage2D, sourceRect, destPoint are null.
	     */
	    copyPixels(side: number, source: BitmapImage2D, sourceRect: Rectangle, destRect: Rectangle): any;
	    copyPixels(side: number, source: HTMLImageElement, sourceRect: Rectangle, destRect: Rectangle): any;
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
	    dispose(): void;
	    /**
	     * Draws the <code>source</code> display object onto the bitmap image, using
	     * the NME software renderer. You can specify <code>matrix</code>,
	     * <code>colorTransform</code>, <code>blendMode</code>, and a destination
	     * <code>clipRect</code> parameter to control how the rendering performs.
	     * Optionally, you can specify whether the bitmap should be smoothed when
	     * scaled(this works only if the source object is a BitmapImage2D object).
	     *
	     * <p>The source display object does not use any of its applied
	     * transformations for this call. It is treated as it exists in the library
	     * or file, with no matrix transform, no color transform, and no blend mode.
	     * To draw a display object(such as a movie clip) by using its own transform
	     * properties, you can copy its <code>transform</code> property object to the
	     * <code>transform</code> property of the Bitmap object that uses the
	     * BitmapImage2D object.</p>
	     *
	     * @param source         The display object or BitmapImage2D object to draw to
	     *                       the BitmapImage2D object.(The DisplayObject and
	     *                       BitmapImage2D classes implement the IBitmapDrawable
	     *                       interface.)
	     * @param matrix         A Matrix object used to scale, rotate, or translate
	     *                       the coordinates of the bitmap. If you do not want to
	     *                       apply a matrix transformation to the image, set this
	     *                       parameter to an identity matrix, created with the
	     *                       default <code>new Matrix()</code> constructor, or
	     *                       pass a <code>null</code> value.
	     * @param colorTransform A ColorTransform object that you use to adjust the
	     *                       color values of the bitmap. If no object is
	     *                       supplied, the bitmap image's colors are not
	     *                       transformed. If you must pass this parameter but you
	     *                       do not want to transform the image, set this
	     *                       parameter to a ColorTransform object created with
	     *                       the default <code>new ColorTransform()</code>
	     *                       constructor.
	     * @param blendMode      A string value, from the flash.display.BlendMode
	     *                       class, specifying the blend mode to be applied to
	     *                       the resulting bitmap.
	     * @param clipRect       A Rectangle object that defines the area of the
	     *                       source object to draw. If you do not supply this
	     *                       value, no clipping occurs and the entire source
	     *                       object is drawn.
	     * @param smoothing      A Boolean value that determines whether a BitmapImage2D
	     *                       object is smoothed when scaled or rotated, due to a
	     *                       scaling or rotation in the <code>matrix</code>
	     *                       parameter. The <code>smoothing</code> parameter only
	     *                       applies if the <code>source</code> parameter is a
	     *                       BitmapImage2D object. With <code>smoothing</code> set
	     *                       to <code>false</code>, the rotated or scaled
	     *                       BitmapImage2D image can appear pixelated or jagged. For
	     *                       example, the following two images use the same
	     *                       BitmapImage2D object for the <code>source</code>
	     *                       parameter, but the <code>smoothing</code> parameter
	     *                       is set to <code>true</code> on the left and
	     *                       <code>false</code> on the right:
	     *
	     *                       <p>Drawing a bitmap with <code>smoothing</code> set
	     *                       to <code>true</code> takes longer than doing so with
	     *                       <code>smoothing</code> set to
	     *                       <code>false</code>.</p>
	     * @throws ArgumentError The <code>source</code> parameter is not a
	     *                       BitmapImage2D or DisplayObject object.
	     * @throws ArgumentError The source is null or not a valid IBitmapDrawable
	     *                       object.
	     * @throws SecurityError The <code>source</code> object and(in the case of a
	     *                       Sprite or MovieClip object) all of its child objects
	     *                       do not come from the same domain as the caller, or
	     *                       are not in a content that is accessible to the
	     *                       caller by having called the
	     *                       <code>Security.allowDomain()</code> method. This
	     *                       restriction does not apply to AIR content in the
	     *                       application security sandbox.
	     */
	    draw(side: number, source: BitmapImage2D, matrix?: Matrix, colorTransform?: ColorTransform, blendMode?: BlendMode, clipRect?: Rectangle, smoothing?: boolean): any;
	    draw(side: number, source: HTMLElement, matrix?: Matrix, colorTransform?: ColorTransform, blendMode?: BlendMode, clipRect?: Rectangle, smoothing?: boolean): any;
	    /**
	     * Fills a rectangular area of pixels with a specified ARGB color.
	     *
	     * @param rect  The rectangular area to fill.
	     * @param color The ARGB color value that fills the area. ARGB colors are
	     *              often specified in hexadecimal format; for example,
	     *              0xFF336699.
	     * @throws TypeError The rect is null.
	     */
	    fillRect(side: number, rect: Rectangle, color: number): void;
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
	    getPixel(side: number, x: number, y: number): number;
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
	    getPixel32(side: number, x: any, y: any): number;
	    /**
	     * Locks an image so that any objects that reference the BitmapImage2D object,
	     * such as Bitmap objects, are not updated when this BitmapImage2D object
	     * changes. To improve performance, use this method along with the
	     * <code>unlock()</code> method before and after numerous calls to the
	     * <code>setPixel()</code> or <code>setPixel32()</code> method.
	     *
	     */
	    lock(): void;
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
	    setArray(side: number, rect: Rectangle, inputArray: Array<number>): void;
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
	    setPixel(side: number, x: number, y: number, color: number): void;
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
	    setPixel32(side: number, x: any, y: any, color: number): void;
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
	    setPixels(side: number, rect: Rectangle, inputByteArray: ByteArray): void;
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
	    unlock(): void;
	    /**
	     *
	     * @returns {ImageData}
	     */
	    getImageData(side: number): ImageData;
	    /**
	     *
	     * @returns {HTMLCanvasElement}
	     */
	    getCanvas(side: number): HTMLCanvasElement;
	    /**
	     *
	     * @param width
	     * @param height
	     * @private
	     */
	    _setSize(size: number): void;
	}
	export = BitmapImageCube;
	
}

declare module "awayjs-core/lib/data/CPUCanvas" {
	import IImageCanvas = require("awayjs-core/lib/data/IImageCanvas");
	import ImageData = require('awayjs-core/lib/data/ImageData');
	class CPUCanvas implements IImageCanvas {
	    width: number;
	    height: number;
	    private imageData;
	    getContext(contextId: string): CanvasRenderingContext2D;
	    constructor();
	    reset(): void;
	    getImageData(): ImageData;
	}
	export = CPUCanvas;
	
}

declare module "awayjs-core/lib/data/BlendMode" {
	/**
	 * A class that provides constant values for visual blend mode effects. These
	 * constants are used in the following:
	 * <ul>
	 *   <li> The <code>blendMode</code> property of the
	 * flash.display.DisplayObject class.</li>
	 *   <li> The <code>blendMode</code> parameter of the <code>draw()</code>
	 * method of the flash.display.BitmapData class</li>
	 * </ul>
	 */
	class BlendMode {
	    /**
	     * Adds the values of the constituent colors of the display object to the
	     * colors of its background, applying a ceiling of 0xFF. This setting is
	     * commonly used for animating a lightening dissolve between two objects.
	     *
	     * <p>For example, if the display object has a pixel with an RGB value of
	     * 0xAAA633, and the background pixel has an RGB value of 0xDD2200, the
	     * resulting RGB value for the displayed pixel is 0xFFC833(because 0xAA +
	     * 0xDD > 0xFF, 0xA6 + 0x22 = 0xC8, and 0x33 + 0x00 = 0x33).</p>
	     */
	    static ADD: string;
	    /**
	     * Applies the alpha value of each pixel of the display object to the
	     * background. This requires the <code>blendMode</code> property of the
	     * parent display object be set to
	     * <code>away.base.BlendMode.LAYER</code>.
	     *
	     * <p>Not supported under GPU rendering.</p>
	     */
	    static ALPHA: string;
	    /**
	     * Selects the darker of the constituent colors of the display object and the
	     * colors of the background(the colors with the smaller values). This
	     * setting is commonly used for superimposing type.
	     *
	     * <p>For example, if the display object has a pixel with an RGB value of
	     * 0xFFCC33, and the background pixel has an RGB value of 0xDDF800, the
	     * resulting RGB value for the displayed pixel is 0xDDCC00(because 0xFF >
	     * 0xDD, 0xCC < 0xF8, and 0x33 > 0x00 = 33).</p>
	     *
	     * <p>Not supported under GPU rendering.</p>
	     */
	    static DARKEN: string;
	    /**
	     * Compares the constituent colors of the display object with the colors of
	     * its background, and subtracts the darker of the values of the two
	     * constituent colors from the lighter value. This setting is commonly used
	     * for more vibrant colors.
	     *
	     * <p>For example, if the display object has a pixel with an RGB value of
	     * 0xFFCC33, and the background pixel has an RGB value of 0xDDF800, the
	     * resulting RGB value for the displayed pixel is 0x222C33(because 0xFF -
	     * 0xDD = 0x22, 0xF8 - 0xCC = 0x2C, and 0x33 - 0x00 = 0x33).</p>
	     */
	    static DIFFERENCE: string;
	    /**
	     * Erases the background based on the alpha value of the display object. This
	     * process requires that the <code>blendMode</code> property of the parent
	     * display object be set to <code>flash.display.BlendMode.LAYER</code>.
	     *
	     * <p>Not supported under GPU rendering.</p>
	     */
	    static ERASE: string;
	    /**
	     * Adjusts the color of each pixel based on the darkness of the display
	     * object. If the display object is lighter than 50% gray, the display object
	     * and background colors are screened, which results in a lighter color. If
	     * the display object is darker than 50% gray, the colors are multiplied,
	     * which results in a darker color. This setting is commonly used for shading
	     * effects.
	     *
	     * <p>Not supported under GPU rendering.</p>
	     */
	    static HARDLIGHT: string;
	    /**
	     * Inverts the background.
	     */
	    static INVERT: string;
	    /**
	     * Forces the creation of a transparency group for the display object. This
	     * means that the display object is precomposed in a temporary buffer before
	     * it is processed further. The precomposition is done automatically if the
	     * display object is precached by means of bitmap caching or if the display
	     * object is a display object container that has at least one child object
	     * with a <code>blendMode</code> setting other than <code>"normal"</code>.
	     *
	     * <p>Not supported under GPU rendering.</p>
	     */
	    static LAYER: string;
	    /**
	     * Selects the lighter of the constituent colors of the display object and
	     * the colors of the background(the colors with the larger values). This
	     * setting is commonly used for superimposing type.
	     *
	     * <p>For example, if the display object has a pixel with an RGB value of
	     * 0xFFCC33, and the background pixel has an RGB value of 0xDDF800, the
	     * resulting RGB value for the displayed pixel is 0xFFF833(because 0xFF >
	     * 0xDD, 0xCC < 0xF8, and 0x33 > 0x00 = 33).</p>
	     *
	     * <p>Not supported under GPU rendering.</p>
	     */
	    static LIGHTEN: string;
	    /**
	     * Multiplies the values of the display object constituent colors by the
	     * constituent colors of the background color, and normalizes by dividing by
	     * 0xFF, resulting in darker colors. This setting is commonly used for
	     * shadows and depth effects.
	     *
	     * <p>For example, if a constituent color(such as red) of one pixel in the
	     * display object and the corresponding color of the pixel in the background
	     * both have the value 0x88, the multiplied result is 0x4840. Dividing by
	     * 0xFF yields a value of 0x48 for that constituent color, which is a darker
	     * shade than the color of the display object or the color of the
	     * background.</p>
	     */
	    static MULTIPLY: string;
	    /**
	     * The display object appears in front of the background. Pixel values of the
	     * display object override the pixel values of the background. Where the
	     * display object is transparent, the background is visible.
	     */
	    static NORMAL: string;
	    /**
	     * Adjusts the color of each pixel based on the darkness of the background.
	     * If the background is lighter than 50% gray, the display object and
	     * background colors are screened, which results in a lighter color. If the
	     * background is darker than 50% gray, the colors are multiplied, which
	     * results in a darker color. This setting is commonly used for shading
	     * effects.
	     *
	     * <p>Not supported under GPU rendering.</p>
	     */
	    static OVERLAY: string;
	    /**
	     * Multiplies the complement(inverse) of the display object color by the
	     * complement of the background color, resulting in a bleaching effect. This
	     * setting is commonly used for highlights or to remove black areas of the
	     * display object.
	     */
	    static SCREEN: string;
	    /**
	     * Uses a shader to define the blend between objects.
	     *
	     * <p>Setting the <code>blendShader</code> property to a Shader instance
	     * automatically sets the display object's <code>blendMode</code> property to
	     * <code>BlendMode.SHADER</code>. If the <code>blendMode</code> property is
	     * set to <code>BlendMode.SHADER</code> without first setting the
	     * <code>blendShader</code> property, the <code>blendMode</code> property is
	     * set to <code>BlendMode.NORMAL</code> instead. If the
	     * <code>blendShader</code> property is set(which sets the
	     * <code>blendMode</code> property to <code>BlendMode.SHADER</code>), then
	     * later the value of the <code>blendMode</code> property is changed, the
	     * blend mode can be reset to use the blend shader simply by setting the
	     * <code>blendMode</code> property to <code>BlendMode.SHADER</code>. The
	     * <code>blendShader</code> property does not need to be set again except to
	     * change the shader that's used to define the blend mode.</p>
	     *
	     * <p>Not supported under GPU rendering.</p>
	     */
	    static SHADER: string;
	    /**
	     * Subtracts the values of the constituent colors in the display object from
	     * the values of the background color, applying a floor of 0. This setting is
	     * commonly used for animating a darkening dissolve between two objects.
	     *
	     * <p>For example, if the display object has a pixel with an RGB value of
	     * 0xAA2233, and the background pixel has an RGB value of 0xDDA600, the
	     * resulting RGB value for the displayed pixel is 0x338400(because 0xDD -
	     * 0xAA = 0x33, 0xA6 - 0x22 = 0x84, and 0x00 - 0x33 < 0x00).</p>
	     */
	    static SUBTRACT: string;
	}
	export = BlendMode;
	
}

declare module "awayjs-core/lib/data/IImageCanvas" {
	interface IImageCanvas {
	    width: number;
	    height: number;
	    getContext(contextId: string): CanvasRenderingContext2D;
	}
	export = IImageCanvas;
	
}

declare module "awayjs-core/lib/data/CPURenderingContext2D" {
	import ImageData = require('awayjs-core/lib/data/ImageData');
	import CPUCanvas = require('awayjs-core/lib/data/CPUCanvas');
	class CPURenderingContext2D implements CanvasRenderingContext2D {
	    miterLimit: number;
	    font: string;
	    globalCompositeOperation: string;
	    msFillRule: string;
	    lineCap: string;
	    msImageSmoothingEnabled: boolean;
	    lineDashOffset: number;
	    shadowColor: string;
	    lineJoin: string;
	    shadowOffsetX: number;
	    lineWidth: number;
	    canvas: HTMLCanvasElement;
	    strokeStyle: any;
	    globalAlpha: number;
	    shadowOffsetY: number;
	    fillStyle: any;
	    shadowBlur: number;
	    textAlign: string;
	    textBaseline: string;
	    cpuCanvas: CPUCanvas;
	    private matrix;
	    constructor(cpuCanvas: CPUCanvas);
	    restore(): void;
	    setTransform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
	    save(): void;
	    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): void;
	    measureText(text: string): TextMetrics;
	    isPointInPath(x: number, y: number, fillRule: string): boolean;
	    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
	    putImageData(imagedata: ImageData, dx: number, dy: number, dirtyX: number, dirtyY: number, dirtyWidth: number, dirtyHeight: number): void;
	    rotate(angle: number): void;
	    fillText(text: string, x: number, y: number, maxWidth: number): void;
	    translate(x: number, y: number): void;
	    scale(x: number, y: number): void;
	    createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;
	    lineTo(x: number, y: number): void;
	    getLineDash(): number[];
	    fill(fillRule: string): void;
	    createImageData(imageDataOrSw: any, sh: number): ImageData;
	    createPattern(image: HTMLElement, repetition: string): CanvasPattern;
	    closePath(): void;
	    rect(x: number, y: number, w: number, h: number): void;
	    clip(fillRule: string): void;
	    clearRect(x: number, y: number, w: number, h: number): void;
	    moveTo(x: number, y: number): void;
	    getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
	    private point;
	    private point2;
	    private applyPixel32(target, x, y, color);
	    private copyPixel32(target, x, y, source, fromX, fromY);
	    private parsedFillStyle;
	    private parsedA;
	    private parsedR;
	    private parsedG;
	    private parsedB;
	    fillRect(x: number, y: number, w: number, h: number): void;
	    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
	    drawImage(image: HTMLElement, offsetX: number, offsetY: number, width: number, height: number, canvasOffsetX: number, canvasOffsetY: number, canvasImageWidth: number, canvasImageHeight: number): void;
	    private drawBitmap(bitmap, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, canvasImageWidth, canvasImageHeight);
	    transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
	    stroke(): void;
	    strokeRect(x: number, y: number, w: number, h: number): void;
	    setLineDash(segments: number[]): void;
	    strokeText(text: string, x: number, y: number, maxWidth: number): void;
	    beginPath(): void;
	    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
	    createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;
	    private static sampleBilinear(u, v, texture, texelSizeX?, texelSizeY?);
	    private static sample(u, v, imageData);
	    private static sampleBox(x0, y0, x1, y1, texture);
	    private static interpolateColor(source, target, a);
	}
	export = CPURenderingContext2D;
	
}

declare module "awayjs-core/lib/data/Image2D" {
	import ImageBase = require("awayjs-core/lib/data/ImageBase");
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	class Image2D extends ImageBase {
	    static assetType: string;
	    _rect: Rectangle;
	    private _powerOfTwo;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    /**
	     * The height of the image in pixels.
	     */
	    height: number;
	    /**
	     * The rectangle that defines the size and location of the bitmap image. The
	     * top and left of the rectangle are 0; the width and height are equal to the
	     * width and height in pixels of the BitmapData object.
	     */
	    rect: Rectangle;
	    /**
	     * The width of the bitmap image in pixels.
	     */
	    width: number;
	    /**
	     *
	     */
	    constructor(width: number, height: number, powerOfTwo?: boolean);
	    /**
	     *
	     * @param width
	     * @param height
	     * @private
	     */
	    _setSize(width: number, height: number): void;
	    /**
	     *
	     * @private
	     */
	    private _testDimensions();
	    /**
	     * Enable POT texture size validation
	     * @returns {boolean}
	     */
	    powerOfTwo: boolean;
	}
	export = Image2D;
	
}

declare module "awayjs-core/lib/data/ImageBase" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import AssetBase = require("awayjs-core/lib/library/AssetBase");
	import IImageObject = require("awayjs-core/lib/pool/IImageObject");
	class ImageBase extends AssetBase implements IAsset {
	    private _imageObject;
	    _pFormat: string;
	    /**
	     *
	     */
	    constructor();
	    /**
	     *
	     */
	    invalidateContent(): void;
	    /**
	     *
	     * @private
	     */
	    invalidateSize(): void;
	    /**
	     * @inheritDoc
	     */
	    dispose(): void;
	    _iAddImageObject(ImageObject: IImageObject): IImageObject;
	    _iRemoveImageObject(ImageObject: IImageObject): IImageObject;
	    /**
	     *
	     * @returns {string}
	     */
	    format: string;
	}
	export = ImageBase;
	
}

declare module "awayjs-core/lib/data/ImageCube" {
	import ImageBase = require("awayjs-core/lib/data/ImageBase");
	class ImageCube extends ImageBase {
	    static assetType: string;
	    _size: number;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    /**
	     * The size of the cube bitmap in pixels.
	     */
	    size: number;
	    /**
	     *
	     */
	    constructor(size: number);
	    /**
	     *
	     * @param width
	     * @param height
	     * @private
	     */
	    _setSize(size: number): void;
	    /**
	     *
	     * @private
	     */
	    private _testDimensions();
	}
	export = ImageCube;
	
}

declare module "awayjs-core/lib/data/ImageData" {
	class ImageData {
	    width: number;
	    data: number[];
	    height: number;
	    constructor(width: number, height: number);
	}
	export = ImageData;
	
}

declare module "awayjs-core/lib/data/Sampler2D" {
	import SamplerBase = require("awayjs-core/lib/data/SamplerBase");
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	/**
	 * The Sampler2D class represents display objects that represent bitmap images.
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
	class Sampler2D extends SamplerBase {
	    static assetType: string;
	    private _imageRect;
	    private _frameRect;
	    private _repeat;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    /**
	     * Controls whether or not the Sampler2D object is snapped to the nearest pixel.
	     * This value is ignored in the native and HTML5 targets.
	     * The PixelSnapping class includes possible values:
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
	    /**
	     * Controls whether or not the bitmap is smoothed when scaled. If
	     * <code>true</code>, the bitmap is smoothed when scaled. If
	     * <code>false</code>, the bitmap is not smoothed when scaled.
	     */
	    /**
	     *
	     */
	    repeat: boolean;
	    /**
	     *
	     */
	    imageRect: Rectangle;
	    /**
	     *
	     */
	    frameRect: Rectangle;
	    /**
	     *
	     * @param image2D
	     * @param smoothing
	     */
	    constructor(repeat?: boolean, smooth?: boolean, mipmap?: boolean);
	    private _updateRect();
	}
	export = Sampler2D;
	
}

declare module "awayjs-core/lib/data/SamplerBase" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import AssetBase = require("awayjs-core/lib/library/AssetBase");
	/**
	 *
	 */
	class SamplerBase extends AssetBase implements IAsset {
	    private _smooth;
	    private _mipmap;
	    /**
	     *
	     */
	    smooth: boolean;
	    /**
	     *
	     */
	    mipmap: boolean;
	    /**
	     *
	     */
	    constructor(smooth?: boolean, mipmap?: boolean);
	}
	export = SamplerBase;
	
}

declare module "awayjs-core/lib/data/SamplerCube" {
	import SamplerBase = require("awayjs-core/lib/data/SamplerBase");
	/**
	 * The Bitmap class represents display objects that represent bitmap images.
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
	class SamplerCube extends SamplerBase {
	    static assetType: string;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    /**
	     *
	     * @param bitmapData
	     * @param smoothing
	     */
	    constructor(smooth?: boolean, mipmap?: boolean);
	}
	export = SamplerCube;
	
}

declare module "awayjs-core/lib/data/SpecularImage2D" {
	import BitmapImage2D = require("awayjs-core/lib/data/BitmapImage2D");
	import Image2D = require("awayjs-core/lib/data/Image2D");
	/**
	 *
	 */
	class SpecularImage2D extends Image2D {
	    static assetType: string;
	    private _specularSource;
	    private _glossSource;
	    private _output;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    specularSource: BitmapImage2D;
	    glossSource: BitmapImage2D;
	    /**
	     *
	     */
	    constructor(specularSource?: BitmapImage2D, glossSource?: BitmapImage2D);
	    /**
	     * Returns a new SpecularImage2D object that is a clone of the original instance
	     * with an exact copy of the contained bitmap.
	     *
	     * @return A new SpecularImage2D object that is identical to the original.
	     */
	    clone(): SpecularImage2D;
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
	    dispose(): void;
	    /**
	     *
	     * @returns {ImageData}
	     */
	    getImageData(): ImageData;
	    /**
	     *
	     * @returns {HTMLCanvasElement}
	     */
	    getCanvas(): HTMLCanvasElement;
	    /**
	     *
	     * @param width
	     * @param height
	     * @private
	     */
	    _setSize(width: number, height: number): void;
	    private _testSize();
	}
	export = SpecularImage2D;
	
}

declare module "awayjs-core/lib/data/WaveAudio" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import AssetBase = require("awayjs-core/lib/library/AssetBase");
	class WaveAudio extends AssetBase implements IAsset {
	    static assetType: string;
	    private _audioChannel;
	    private _volume;
	    private _buffer;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    volume: number;
	    currentTime: number;
	    duration: number;
	    /**
	     *
	     */
	    constructor(buffer: ArrayBuffer);
	    dispose(): void;
	    play(offset: number, loop?: boolean): void;
	    stop(): void;
	    clone(): WaveAudio;
	}
	export = WaveAudio;
	
}

declare module "awayjs-core/lib/errors/AbstractMethodError" {
	import Error = require("awayjs-core/lib/errors/Error");
	/**
	 * AbstractMethodError is thrown when an abstract method is called. The method in question should be overridden
	 * by a concrete subclass.
	 */
	class AbstractMethodError extends Error {
	    /**
	     * Create a new AbstractMethodError.
	     * @param message An optional message to override the default error message.
	     * @param id The id of the error.
	     */
	    constructor(message?: string, id?: number);
	}
	export = AbstractMethodError;
	
}

declare module "awayjs-core/lib/errors/ArgumentError" {
	import Error = require("awayjs-core/lib/errors/Error");
	/**
	 * AbstractMethodError is thrown when an abstract method is called. The method in question should be overridden
	 * by a concrete subclass.
	 */
	class ArgumentError extends Error {
	    /**
	     * Create a new ArgumentError.
	     *
	     * @param message An optional message to override the default error message.
	     * @param id The id of the error.
	     */
	    constructor(message?: string, id?: number);
	}
	export = ArgumentError;
	
}

declare module "awayjs-core/lib/errors/DocumentError" {
	import Error = require("awayjs-core/lib/errors/Error");
	class DocumentError extends Error {
	    static DOCUMENT_DOES_NOT_EXIST: string;
	    constructor(message?: string, id?: number);
	}
	export = DocumentError;
	
}

declare module "awayjs-core/lib/errors/Error" {
	class Error {
	    private _errorID;
	    private _messsage;
	    private _name;
	    constructor(message?: string, id?: number, _name?: string);
	    /**
	     *
	     * @returns {string}
	     */
	    /**
	     *
	     * @param value
	     */
	    message: string;
	    /**
	     *
	     * @returns {string}
	     */
	    /**
	     *
	     * @param value
	     */
	    name: string;
	    /**
	     *
	     * @returns {number}
	     */
	    errorID: number;
	}
	export = Error;
	
}

declare module "awayjs-core/lib/events/AssetEvent" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import Event = require("awayjs-core/lib/events/Event");
	/**
	 * @class away.events.AssetEvent
	 */
	class AssetEvent extends Event {
	    /**
	     *
	     */
	    static ASSET_COMPLETE: string;
	    /**
	     *
	     */
	    static ASSET_RENAME: string;
	    /**
	     *
	     */
	    static ASSET_CONFLICT_RESOLVED: string;
	    /**
	     *
	     */
	    static TEXTURE_SIZE_ERROR: string;
	    private _asset;
	    private _prevName;
	    /**
	     *
	     */
	    constructor(type: string, asset?: IAsset, prevName?: string);
	    /**
	     *
	     */
	    asset: IAsset;
	    /**
	     *
	     */
	    assetPrevName: string;
	    /**
	     *
	     */
	    clone(): Event;
	}
	export = AssetEvent;
	
}

declare module "awayjs-core/lib/errors/PartialImplementationError" {
	import Error = require("awayjs-core/lib/errors/Error");
	/**
	 * AbstractMethodError is thrown when an abstract method is called. The method in question should be overridden
	 * by a concrete subclass.
	 */
	class PartialImplementationError extends Error {
	    /**
	     * Create a new AbstractMethodError.
	     * @param message An optional message to override the default error message.
	     * @param id The id of the error.
	     */
	    constructor(dependency?: string, id?: number);
	}
	export = PartialImplementationError;
	
}

declare module "awayjs-core/lib/events/Event" {
	class Event {
	    static COMPLETE: string;
	    static OPEN: string;
	    static ENTER_FRAME: string;
	    static EXIT_FRAME: string;
	    static RESIZE: string;
	    static ERROR: string;
	    static CHANGE: string;
	    /**
	     * Type of event
	     * @property type
	     * @type String
	     */
	    type: string;
	    /**
	     * Reference to target object
	     * @property target
	     * @type Object
	     */
	    target: any;
	    constructor(type: string);
	    /**
	     * Clones the current event.
	     * @return An exact duplicate of the current event.
	     */
	    clone(): Event;
	}
	export = Event;
	
}

declare module "awayjs-core/lib/errors/RangeError" {
	import Error = require("awayjs-core/lib/errors/Error");
	/**
	 * RangeError is thrown when an index is accessed out of range of the number of
	 * available indices on an Array.
	 */
	class RangeError extends Error {
	    /**
	     * Create a new RangeError.
	     *
	     * @param message An optional message to override the default error message.
	     * @param id The id of the error.
	     */
	    constructor(message?: string, id?: number);
	}
	export = RangeError;
	
}

declare module "awayjs-core/lib/events/EventDispatcher" {
	import Event = require("awayjs-core/lib/events/Event");
	/**
	 * Base class for dispatching events
	*
	* @class away.events.EventDispatcher
	*
	*/
	class EventDispatcher {
	    private listeners;
	    private target;
	    constructor(target?: any);
	    /**
	     * Add an event listener
	     * @method addEventListener
	     * @param {String} Name of event to add a listener for
	     * @param {Function} Callback function
	     */
	    addEventListener(type: string, listener: Function): void;
	    /**
	     * Remove an event listener
	     * @method removeEventListener
	     * @param {String} Name of event to remove a listener for
	     * @param {Function} Callback function
	     */
	    removeEventListener(type: string, listener: Function): void;
	    /**
	     * Dispatch an event
	     * @method dispatchEvent
	     * @param {Event} Event to dispatch
	     */
	    dispatchEvent(event: Event): void;
	    /**
	     * get Event Listener Index in array. Returns -1 if no listener is added
	     * @method getEventListenerIndex
	     * @param {String} Name of event to remove a listener for
	     * @param {Function} Callback function
	     */
	    private getEventListenerIndex(type, listener);
	    /**
	     * check if an object has an event listener assigned to it
	     * @method hasListener
	     * @param {String} Name of event to remove a listener for
	     * @param {Function} Callback function
	     */
	    hasEventListener(type: string, listener?: Function): boolean;
	}
	export = EventDispatcher;
	
}

declare module "awayjs-core/lib/events/HTTPStatusEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	/**
	 * @class away.events.HTTPStatusEvent
	 */
	class HTTPStatusEvent extends Event {
	    static HTTP_STATUS: string;
	    status: number;
	    constructor(type: string, status?: number);
	}
	export = HTTPStatusEvent;
	
}

declare module "awayjs-core/lib/events/IEventDispatcher" {
	import Event = require("awayjs-core/lib/events/Event");
	/**
	 * Base interface for dispatching events
	 *
	 * @interface away.events.IEventDispatcher
	 *
	 */
	interface IEventDispatcher {
	    /**
	     * Add an event listener
	     * @method addEventListener
	     * @param {String} Name of event to add a listener for
	     * @param {Function} Callback function
	     */
	    addEventListener(type: string, listener: Function): any;
	    /**
	     * Remove an event listener
	     * @method removeEventListener
	     * @param {String} Name of event to remove a listener for
	     * @param {Function} Callback function
	     */
	    removeEventListener(type: string, listener: Function): any;
	    /**
	     * Dispatch an event
	     * @method dispatchEvent
	     * @param {Event} Event to dispatch
	     */
	    dispatchEvent(event: Event): any;
	    /**
	     * check if an object has an event listener assigned to it
	     * @method hasListener
	     * @param {String} Name of event to remove a listener for
	     * @param {Function} Callback function
	     * @param {Object} Target object listener is added to
	     */
	    hasEventListener(type: string, listener?: Function): boolean;
	}
	export = IEventDispatcher;
	
}

declare module "awayjs-core/lib/events/IOErrorEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	class IOErrorEvent extends Event {
	    static IO_ERROR: string;
	    constructor(type: string);
	}
	export = IOErrorEvent;
	
}

declare module "awayjs-core/lib/events/LoaderEvent" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import Event = require("awayjs-core/lib/events/Event");
	class LoaderEvent extends Event {
	    /**
	     * Dispatched when a resource and all of its dependencies is retrieved.
	     */
	    static RESOURCE_COMPLETE: string;
	    private _url;
	    private _content;
	    private _assets;
	    /**
	     * Create a new LoaderEvent object.
	     *
	     * @param type The event type.
	     * @param url The url of the loaded resource.
	     * @param assets The assets of the loaded resource.
	     */
	    constructor(type: string, url?: string, content?: IAsset, assets?: Array<IAsset>);
	    /**
	     * The content returned if the resource has been loaded inside a <code>Loader</code> object.
	     */
	    content: IAsset;
	    /**
	     * The url of the loaded resource.
	     */
	    url: string;
	    /**
	     * The error string on loadError.
	     */
	    assets: IAsset[];
	    /**
	     * Clones the current event.
	     * @return An exact duplicate of the current event.
	     */
	    clone(): Event;
	}
	export = LoaderEvent;
	
}

declare module "awayjs-core/lib/events/ParserEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	class ParserEvent extends Event {
	    private _message;
	    /**
	     * Dispatched when parsing of an asset completed.
	     */
	    static PARSE_COMPLETE: string;
	    /**
	     * Dispatched when an error occurs while parsing the data (e.g. because it's
	     * incorrectly formatted.)
	     */
	    static PARSE_ERROR: string;
	    /**
	     * Dispatched when a parser is ready to have dependencies retrieved and resolved.
	     * This is an internal event that should rarely (if ever) be listened for by
	     * external classes.
	     */
	    static READY_FOR_DEPENDENCIES: string;
	    constructor(type: string, message?: string);
	    /**
	     * Additional human-readable message. Usually supplied for ParserEvent.PARSE_ERROR events.
	     */
	    message: string;
	    clone(): Event;
	}
	export = ParserEvent;
	
}

declare module "awayjs-core/lib/events/ProjectionEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	import IProjection = require("awayjs-core/lib/projections/IProjection");
	class ProjectionEvent extends Event {
	    static MATRIX_CHANGED: string;
	    private _projection;
	    constructor(type: string, projection: IProjection);
	    projection: IProjection;
	}
	export = ProjectionEvent;
	
}

declare module "awayjs-core/lib/events/ProgressEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	class ProgressEvent extends Event {
	    static PROGRESS: string;
	    bytesLoaded: number;
	    bytesTotal: number;
	    constructor(type: string);
	}
	export = ProgressEvent;
	
}

declare module "awayjs-core/lib/events/TimerEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	class TimerEvent extends Event {
	    static TIMER: string;
	    static TIMER_COMPLETE: string;
	    constructor(type: string);
	}
	export = TimerEvent;
	
}

declare module "awayjs-core/lib/geom/Box" {
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	/**
	 * A Box object is an area defined by its position, as indicated by its
	 * top-left-front corner point(<i>x</i>, <i>y</i>, <i>z</i>) and by its width,
	 * height and depth.
	 *
	 *
	 * <p>The <code>x</code>, <code>y</code>, <code>z</code>, <code>width</code>,
	 * <code>height</code> <code>depth</code> properties of the Box class are
	 * independent of each other; changing the value of one property has no effect
	 * on the others. However, the <code>right</code>, <code>bottom</code> and
	 * <code>back</code> properties are integrally related to those six
	 * properties. For example, if you change the value of the <code>right</code>
	 * property, the value of the <code>width</code> property changes; if you
	 * change the <code>bottom</code> property, the value of the
	 * <code>height</code> property changes. </p>
	 *
	 * <p>The following methods and properties use Box objects:</p>
	 *
	 * <ul>
	 *   <li>The <code>bounds</code> property of the DisplayObject class</li>
	 * </ul>
	 *
	 * <p>You can use the <code>new Box()</code> constructor to create a
	 * Box object.</p>
	 *
	 * <p><b>Note:</b> The Box class does not define a cubic Shape
	 * display object.
	 */
	class Box {
	    private _size;
	    private _bottomRightBack;
	    private _topLeftFront;
	    /**
	     * The height of the box, in pixels. Changing the <code>height</code> value
	     * of a Box object has no effect on the <code>x</code>, <code>y</code>,
	     * <code>z</code>, <code>depth</code> and <code>width</code> properties.
	     */
	    height: number;
	    /**
	     * The width of the box, in pixels. Changing the <code>width</code> value
	     * of a Box object has no effect on the <code>x</code>, <code>y</code>,
	     * <code>z</code>, <code>depth</code> and <code>height</code> properties.
	     */
	    width: number;
	    /**
	     * The deoth of the box, in pixels. Changing the <code>depth</code> value
	     * of a Box object has no effect on the <code>x</code>, <code>y</code>,
	     * <code>z</code>, <code>width</code> and <code>height</code> properties.
	     */
	    depth: number;
	    /**
	     * The <i>x</i> coordinate of the top-left-front corner of the box.
	     * Changing the value of the <code>x</code> property of a Box object has no
	     * effect on the <code>y</code>, <code>z</code>, <code>width</code>,
	     * <code>height</code> and <code>depth</code> properties.
	     *
	     * <p>The value of the <code>x</code> property is equal to the value of the
	     * <code>left</code> property.</p>
	     */
	    x: number;
	    /**
	     * The <i>y</i> coordinate of the top-left-front corner of the box.
	     * Changing the value of the <code>y</code> property of a Box object has no
	     * effect on the <code>x</code>, <code>z</code>, <code>width</code>,
	     * <code>height</code> and <code>depth</code> properties.
	     *
	     * <p>The value of the <code>y</code> property is equal to the value of the
	     * <code>top</code> property.</p>
	     */
	    y: number;
	    /**
	     * The <i>y</i> coordinate of the top-left-front corner of the box.
	     * Changing the value of the <code>z</code> property of a Box object has no
	     * effect on the <code>x</code>, <code>y</code>, <code>width</code>,
	     * <code>height</code> and <code>depth</code> properties.
	     *
	     * <p>The value of the <code>z</code> property is equal to the value of the
	     * <code>front</code> property.</p>
	     */
	    z: number;
	    /**
	     * The sum of the <code>z</code> and <code>height</code> properties.
	     */
	    back: number;
	    /**
	     * The sum of the <code>y</code> and <code>height</code> properties.
	     */
	    bottom: number;
	    /**
	     * The location of the Box object's bottom-right corner, determined by the
	     * values of the <code>right</code> and <code>bottom</code> properties.
	     */
	    bottomRightBack: Vector3D;
	    /**
	     * The <i>z</i> coordinate of the top-left-front corner of the box. Changing
	     * the <code>front</code> property of a Box object has no effect on the
	     * <code>x</code>, <code>y</code>, <code>width</code> and <code>height</code>
	     * properties. However it does affect the <code>depth</code> property,
	     * whereas changing the <code>z</code> value does <i>not</i> affect the
	     * <code>depth</code> property.
	     *
	     * <p>The value of the <code>left</code> property is equal to the value of
	     * the <code>x</code> property.</p>
	     */
	    front: number;
	    /**
	     * The <i>x</i> coordinate of the top-left corner of the box. Changing the
	     * <code>left</code> property of a Box object has no effect on the
	     * <code>y</code> and <code>height</code> properties. However it does affect
	     * the <code>width</code> property, whereas changing the <code>x</code> value
	     * does <i>not</i> affect the <code>width</code> property.
	     *
	     * <p>The value of the <code>left</code> property is equal to the value of
	     * the <code>x</code> property.</p>
	     */
	    left: number;
	    /**
	     * The sum of the <code>x</code> and <code>width</code> properties.
	     */
	    right: number;
	    /**
	     * The size of the Box object, expressed as a Vector3D object with the
	     * values of the <code>width</code>, <code>height</code> and
	     * <code>depth</code> properties.
	     */
	    size: Vector3D;
	    /**
	     * The <i>y</i> coordinate of the top-left-front corner of the box. Changing
	     * the <code>top</code> property of a Box object has no effect on the
	     * <code>x</code> and <code>width</code> properties. However it does affect
	     * the <code>height</code> property, whereas changing the <code>y</code>
	     * value does <i>not</i> affect the <code>height</code> property.
	     *
	     * <p>The value of the <code>top</code> property is equal to the value of the
	     * <code>y</code> property.</p>
	     */
	    top: number;
	    /**
	     * The location of the Box object's top-left-front corner, determined by the
	     * <i>x</i>, <i>y</i> and <i>z</i> coordinates of the point.
	     */
	    topLeftFront: Vector3D;
	    /**
	     * Creates a new Box object with the top-left-front corner specified by the
	     * <code>x</code>, <code>y</code> and <code>z</code> parameters and with the
	     * specified <code>width</code>, <code>height</code> and <code>depth</code>
	     * parameters. If you call this public without parameters, a box with
	     * <code>x</code>, <code>y</code>, <code>z</code>, <code>width</code>,
	     * <code>height</code> and <code>depth</code> properties set to 0 is created.
	     *
	     * @param x      The <i>x</i> coordinate of the top-left-front corner of the
	     *               box.
	     * @param y      The <i>y</i> coordinate of the top-left-front corner of the
	     *               box.
	     * @param z      The <i>z</i> coordinate of the top-left-front corner of the
	     *               box.
	     * @param width  The width of the box, in pixels.
	     * @param height The height of the box, in pixels.
	     * @param depth The depth of the box, in pixels.
	     */
	    constructor(x?: number, y?: number, z?: number, width?: number, height?: number, depth?: number);
	    /**
	     * Returns a new Box object with the same values for the <code>x</code>,
	     * <code>y</code>, <code>z</code>, <code>width</code>, <code>height</code>
	     * and <code>depth</code> properties as the original Box object.
	     *
	     * @return A new Box object with the same values for the <code>x</code>,
	     *         <code>y</code>, <code>z</code>, <code>width</code>,
	     *         <code>height</code> and <code>depth</code> properties as the
	     *         original Box object.
	     */
	    clone(): Box;
	    /**
	     * Determines whether the specified position is contained within the cubic
	     * region defined by this Box object.
	     *
	     * @param x The <i>x</i> coordinate(horizontal component) of the position.
	     * @param y The <i>y</i> coordinate(vertical component) of the position.
	     * @param z The <i>z</i> coordinate(longitudinal component) of the position.
	     * @return A value of <code>true</code> if the Box object contains the
	     *         specified position; otherwise <code>false</code>.
	     */
	    contains(x: number, y: number, z: number): boolean;
	    /**
	     * Determines whether the specified position is contained within the cubic
	     * region defined by this Box object. This method is similar to the
	     * <code>Box.contains()</code> method, except that it takes a Vector3D
	     * object as a parameter.
	     *
	     * @param position The position, as represented by its <i>x</i>, <i>y</i> and
	     *                 <i>z</i> coordinates.
	     * @return A value of <code>true</code> if the Box object contains the
	     *         specified position; otherwise <code>false</code>.
	     */
	    containsPoint(position: Vector3D): boolean;
	    /**
	     * Determines whether the Box object specified by the <code>box</code>
	     * parameter is contained within this Box object. A Box object is said to
	     * contain another if the second Box object falls entirely within the
	     * boundaries of the first.
	     *
	     * @param box The Box object being checked.
	     * @return A value of <code>true</code> if the Box object that you specify
	     *         is contained by this Box object; otherwise <code>false</code>.
	     */
	    containsBox(box: Box): boolean;
	    /**
	     * Copies all of box data from the source Box object into the calling
	     * Box object.
	     *
	     * @param sourceBox The Box object from which to copy the data.
	     */
	    copyFrom(sourceBox: Box): void;
	    /**
	     * Determines whether the object specified in the <code>toCompare</code>
	     * parameter is equal to this Box object. This method compares the
	     * <code>x</code>, <code>y</code>, <code>z</code>, <code>width</code>,
	     * <code>height</code> and <code>depth</code> properties of an object against
	     * the same properties of this Box object.
	     *
	     * @param toCompare The box to compare to this Box object.
	     * @return A value of <code>true</code> if the object has exactly the same
	     *         values for the <code>x</code>, <code>y</code>, <code>z</code>,
	     *         <code>width</code>, <code>height</code> and <code>depth</code>
	     *         properties as this Box object; otherwise <code>false</code>.
	     */
	    equals(toCompare: Box): boolean;
	    /**
	     * Increases the size of the Box object by the specified amounts, in
	     * pixels. The center point of the Box object stays the same, and its
	     * size increases to the left and right by the <code>dx</code> value, to
	     * the top and the bottom by the <code>dy</code> value, and to
	     * the front and the back by the <code>dz</code> value.
	     *
	     * @param dx The value to be added to the left and the right of the Box
	     *           object. The following equation is used to calculate the new
	     *           width and position of the box:
	     * @param dy The value to be added to the top and the bottom of the Box
	     *           object. The following equation is used to calculate the new
	     *           height and position of the box:
	     * @param dz The value to be added to the front and the back of the Box
	     *           object. The following equation is used to calculate the new
	     *           depth and position of the box:
	     */
	    inflate(dx: number, dy: number, dz: number): void;
	    /**
	     * Increases the size of the Box object. This method is similar to the
	     * <code>Box.inflate()</code> method except it takes a Vector3D object as
	     * a parameter.
	     *
	     * <p>The following two code examples give the same result:</p>
	     *
	     * @param delta The <code>x</code> property of this Vector3D object is used to
	     *              increase the horizontal dimension of the Box object.
	     *              The <code>y</code> property is used to increase the vertical
	     *              dimension of the Box object.
	     *              The <code>z</code> property is used to increase the
	     *              longitudinal dimension of the Box object.
	     */
	    inflatePoint(delta: Vector3D): void;
	    /**
	     * If the Box object specified in the <code>toIntersect</code> parameter
	     * intersects with this Box object, returns the area of intersection
	     * as a Box object. If the boxes do not intersect, this method returns an
	     * empty Box object with its properties set to 0.
	     *
	     * @param toIntersect The Box object to compare against to see if it
	     *                    intersects with this Box object.
	     * @return A Box object that equals the area of intersection. If the
	     *         boxes do not intersect, this method returns an empty Box
	     *         object; that is, a box with its <code>x</code>, <code>y</code>,
	     *         <code>z</code>, <code>width</code>,  <code>height</code>, and
	     *         <code>depth</code> properties set to 0.
	     */
	    intersection(toIntersect: Box): Box;
	    /**
	     * Determines whether the object specified in the <code>toIntersect</code>
	     * parameter intersects with this Box object. This method checks the
	     * <code>x</code>, <code>y</code>, <code>z</code>, <code>width</code>,
	     * <code>height</code>, and <code>depth</code> properties of the specified
	     * Box object to see if it intersects with this Box object.
	     *
	     * @param toIntersect The Box object to compare against this Box object.
	     * @return A value of <code>true</code> if the specified object intersects
	     *         with this Box object; otherwise <code>false</code>.
	     */
	    intersects(toIntersect: Box): boolean;
	    rayIntersection(position: Vector3D, direction: Vector3D, targetNormal: Vector3D): number;
	    /**
	     * Finds the closest point on the Box to another given point. This can be used for maximum error calculations for content within a given Box.
	     *
	     * @param point The point for which to find the closest point on the Box
	     * @param target An optional Vector3D to store the result to prevent creating a new object.
	     * @return
	     */
	    closestPointToPoint(point: Vector3D, target?: Vector3D): Vector3D;
	    /**
	     * Determines whether or not this Box object is empty.
	     *
	     * @return A value of <code>true</code> if the Box object's width, height or
	     *         depth is less than or equal to 0; otherwise <code>false</code>.
	     */
	    isEmpty(): boolean;
	    /**
	     * Adjusts the location of the Box object, as determined by its
	     * top-left-front corner, by the specified amounts.
	     *
	     * @param dx Moves the <i>x</i> value of the Box object by this amount.
	     * @param dy Moves the <i>y</i> value of the Box object by this amount.
	     * @param dz Moves the <i>z</i> value of the Box object by this amount.
	     */
	    offset(dx: number, dy: number, dz: number): void;
	    /**
	     * Adjusts the location of the Box object using a Vector3D object as a
	     * parameter. This method is similar to the <code>Box.offset()</code>
	     * method, except that it takes a Vector3D object as a parameter.
	     *
	     * @param position A Vector3D object to use to offset this Box object.
	     */
	    offsetPosition(position: Vector3D): void;
	    /**
	     * Sets all of the Box object's properties to 0. A Box object is empty if its
	     * width, height or depth is less than or equal to 0.
	     *
	     * <p> This method sets the values of the <code>x</code>, <code>y</code>,
	     * <code>z</code>, <code>width</code>, <code>height</code>, and
	     * <code>depth</code> properties to 0.</p>
	     *
	     */
	    setEmpty(): void;
	    /**
	     * Sets the members of Box to the specified values
	     *
	     * @param xa      The <i>x</i> coordinate of the top-left-front corner of the
	     *                box.
	     * @param ya      The <i>y</i> coordinate of the top-left-front corner of the
	     *                box.
	     * @param yz      The <i>z</i> coordinate of the top-left-front corner of the
	     *                box.
	     * @param widtha  The width of the box, in pixels.
	     * @param heighta The height of the box, in pixels.
	     * @param deptha  The depth of the box, in pixels.
	     */
	    setTo(xa: number, ya: number, za: number, widtha: number, heighta: number, deptha: number): void;
	    /**
	     * Builds and returns a string that lists the horizontal, vertical and
	     * longitudinal positions and the width, height and depth of the Box object.
	     *
	     * @return A string listing the value of each of the following properties of
	     *         the Box object: <code>x</code>, <code>y</code>, <code>z</code>,
	     *         <code>width</code>, <code>height</code>, and <code>depth</code>.
	     */
	    toString(): string;
	    /**
	     * Adds two boxes together to create a new Box object, by filling
	     * in the horizontal, vertical and longitudinal space between the two boxes.
	     *
	     * <p><b>Note:</b> The <code>union()</code> method ignores boxes with
	     * <code>0</code> as the height, width or depth value, such as: <code>var
	     * box2:Box = new Box(300,300,300,50,50,0);</code></p>
	     *
	     * @param toUnion A Box object to add to this Box object.
	     * @return A new Box object that is the union of the two boxes.
	     */
	    union(toUnion: Box): Box;
	}
	export = Box;
	
}

declare module "awayjs-core/lib/geom/ColorTransform" {
	/**
	 * The ColorTransform class lets you adjust the color values in a display
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
	class ColorTransform {
	    /**
	     * A decimal value that is multiplied with the alpha transparency channel
	     * value.
	     *
	     * <p>If you set the alpha transparency value of a display object directly by
	     * using the <code>alpha</code> property of the DisplayObject instance, it
	     * affects the value of the <code>alphaMultiplier</code> property of that
	     * display object's <code>transform.colorTransform</code> property.</p>
	     */
	    alphaMultiplier: number;
	    /**
	     * A number from -255 to 255 that is added to the alpha transparency channel
	     * value after it has been multiplied by the <code>alphaMultiplier</code>
	     * value.
	     */
	    alphaOffset: number;
	    /**
	     * A decimal value that is multiplied with the blue channel value.
	     */
	    blueMultiplier: number;
	    /**
	     * A number from -255 to 255 that is added to the blue channel value after it
	     * has been multiplied by the <code>blueMultiplier</code> value.
	     */
	    blueOffset: number;
	    /**
	     * A decimal value that is multiplied with the green channel value.
	     */
	    greenMultiplier: number;
	    /**
	     * A number from -255 to 255 that is added to the green channel value after
	     * it has been multiplied by the <code>greenMultiplier</code> value.
	     */
	    greenOffset: number;
	    /**
	     * A decimal value that is multiplied with the red channel value.
	     */
	    redMultiplier: number;
	    /**
	     * A number from -255 to 255 that is added to the red channel value after it
	     * has been multiplied by the <code>redMultiplier</code> value.
	     */
	    redOffset: number;
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
	    color: number;
	    /**
	     * Creates a ColorTransform object for a display object with the specified
	     * color channel values and alpha values.
	     *
	     * @param redMultiplier   The value for the red multiplier, in the range from
	     *                        0 to 1.
	     * @param greenMultiplier The value for the green multiplier, in the range
	     *                        from 0 to 1.
	     * @param blueMultiplier  The value for the blue multiplier, in the range
	     *                        from 0 to 1.
	     * @param alphaMultiplier The value for the alpha transparency multiplier, in
	     *                        the range from 0 to 1.
	     * @param redOffset       The offset value for the red color channel, in the
	     *                        range from -255 to 255.
	     * @param greenOffset     The offset value for the green color channel, in
	     *                        the range from -255 to 255.
	     * @param blueOffset      The offset for the blue color channel value, in the
	     *                        range from -255 to 255.
	     * @param alphaOffset     The offset for alpha transparency channel value, in
	     *                        the range from -255 to 255.
	     */
	    constructor(redMultiplier?: number, greenMultiplier?: number, blueMultiplier?: number, alphaMultiplier?: number, redOffset?: number, greenOffset?: number, blueOffset?: number, alphaOffset?: number);
	    clear(): void;
	    clone(): ColorTransform;
	    copyFrom(source: ColorTransform): void;
	    copyTo(destination: ColorTransform): void;
	    prepend(ct: ColorTransform): void;
	}
	export = ColorTransform;
	
}

declare module "awayjs-core/lib/geom/Matrix" {
	import Point = require("awayjs-core/lib/geom/Point");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	/**
	 * The Matrix class represents a transformation matrix that determines how to
	 * map points from one coordinate space to another. You can perform various
	 * graphical transformations on a display object by setting the properties of
	 * a Matrix object, applying that Matrix object to the <code>matrix</code>
	 * property of a Transform object, and then applying that Transform object as
	 * the <code>transform</code> property of the display object. These
	 * transformation functions include translation(<i>x</i> and <i>y</i>
	 * repositioning), rotation, scaling, and skewing.
	 *
	 * <p>Together these types of transformations are known as <i>affine
	 * transformations</i>. Affine transformations preserve the straightness of
	 * lines while transforming, so that parallel lines stay parallel.</p>
	 *
	 * <p>To apply a transformation matrix to a display object, you create a
	 * Transform object, set its <code>matrix</code> property to the
	 * transformation matrix, and then set the <code>transform</code> property of
	 * the display object to the Transform object. Matrix objects are also used as
	 * parameters of some methods, such as the following:</p>
	 *
	 * <ul>
	 *   <li>The <code>draw()</code> method of a BitmapData object</li>
	 *   <li>The <code>beginBitmapFill()</code> method,
	 * <code>beginGradientFill()</code> method, or
	 * <code>lineGradientStyle()</code> method of a Graphics object</li>
	 * </ul>
	 *
	 * <p>A transformation matrix object is a 3 x 3 matrix with the following
	 * contents:</p>
	 *
	 * <p>In traditional transformation matrixes, the <code>u</code>,
	 * <code>v</code>, and <code>w</code> properties provide extra capabilities.
	 * The Matrix class can only operate in two-dimensional space, so it always
	 * assumes that the property values <code>u</code> and <code>v</code> are 0.0,
	 * and that the property value <code>w</code> is 1.0. The effective values of
	 * the matrix are as follows:</p>
	 *
	 * <p>You can get and set the values of all six of the other properties in a
	 * Matrix object: <code>a</code>, <code>b</code>, <code>c</code>,
	 * <code>d</code>, <code>tx</code>, and <code>ty</code>.</p>
	 *
	 * <p>The Matrix class supports the four major types of transformations:
	 * translation, scaling, rotation, and skewing. You can set three of these
	 * transformations by using specialized methods, as described in the following
	 * table: </p>
	 *
	 * <p>Each transformation function alters the current matrix properties so
	 * that you can effectively combine multiple transformations. To do this, you
	 * call more than one transformation function before applying the matrix to
	 * its display object target(by using the <code>transform</code> property of
	 * that display object).</p>
	 *
	 * <p>Use the <code>new Matrix()</code> constructor to create a Matrix object
	 * before you can call the methods of the Matrix object.</p>
	 */
	class Matrix {
	    /**
	     * The value that affects the positioning of pixels along the <i>x</i> axis
	     * when scaling or rotating an image.
	     */
	    a: number;
	    /**
	     * The value that affects the positioning of pixels along the <i>y</i> axis
	     * when rotating or skewing an image.
	     */
	    b: number;
	    /**
	     * The value that affects the positioning of pixels along the <i>x</i> axis
	     * when rotating or skewing an image.
	     */
	    c: number;
	    /**
	     * The value that affects the positioning of pixels along the <i>y</i> axis
	     * when scaling or rotating an image.
	     */
	    d: number;
	    /**
	     * The distance by which to translate each point along the <i>x</i> axis.
	     */
	    tx: number;
	    /**
	     * The distance by which to translate each point along the <i>y</i> axis.
	     */
	    ty: number;
	    /**
	     * Creates a new Matrix object with the specified parameters. In matrix
	     * notation, the properties are organized like this:
	     *
	     * <p>If you do not provide any parameters to the <code>new Matrix()</code>
	     * constructor, it creates an <i>identity matrix</i> with the following
	     * values:</p>
	     *
	     * <p>In matrix notation, the identity matrix looks like this:</p>
	     *
	     * @param a  The value that affects the positioning of pixels along the
	     *           <i>x</i> axis when scaling or rotating an image.
	     * @param b  The value that affects the positioning of pixels along the
	     *           <i>y</i> axis when rotating or skewing an image.
	     * @param c  The value that affects the positioning of pixels along the
	     *           <i>x</i> axis when rotating or skewing an image.
	     * @param d  The value that affects the positioning of pixels along the
	     *           <i>y</i> axis when scaling or rotating an image..
	     * @param tx The distance by which to translate each point along the <i>x</i>
	     *           axis.
	     * @param ty The distance by which to translate each point along the <i>y</i>
	     *           axis.
	     */
	    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
	    /**
	     * Returns a new Matrix object that is a clone of this matrix, with an exact
	     * copy of the contained object.
	     *
	     * @return A Matrix object.
	     */
	    clone(): Matrix;
	    /**
	     * Concatenates a matrix with the current matrix, effectively combining the
	     * geometric effects of the two. In mathematical terms, concatenating two
	     * matrixes is the same as combining them using matrix multiplication.
	     *
	     * <p>For example, if matrix <code>m1</code> scales an object by a factor of
	     * four, and matrix <code>m2</code> rotates an object by 1.5707963267949
	     * radians(<code>Math.PI/2</code>), then <code>m1.concat(m2)</code>
	     * transforms <code>m1</code> into a matrix that scales an object by a factor
	     * of four and rotates the object by <code>Math.PI/2</code> radians. </p>
	     *
	     * <p>This method replaces the source matrix with the concatenated matrix. If
	     * you want to concatenate two matrixes without altering either of the two
	     * source matrixes, first copy the source matrix by using the
	     * <code>clone()</code> method, as shown in the Class Examples section.</p>
	     *
	     * @param matrix The matrix to be concatenated to the source matrix.
	     */
	    concat(matrix: Matrix): void;
	    /**
	     * Copies a Vector3D object into specific column of the calling Matrix3D
	     * object.
	     *
	     * @param column   The column from which to copy the data from.
	     * @param vector3D The Vector3D object from which to copy the data.
	     */
	    copyColumnFrom(column: number, vector3D: Vector3D): void;
	    /**
	     * Copies specific column of the calling Matrix object into the Vector3D
	     * object. The w element of the Vector3D object will not be changed.
	     *
	     * @param column   The column from which to copy the data from.
	     * @param vector3D The Vector3D object from which to copy the data.
	     */
	    copyColumnTo(column: number, vector3D: Vector3D): void;
	    /**
	     * Copies all of the matrix data from the source Point object into the
	     * calling Matrix object.
	     *
	     * @param sourceMatrix The Matrix object from which to copy the data.
	     */
	    copyFrom(sourceMatrix: Matrix): void;
	    /**
	     * Copies a Vector3D object into specific row of the calling Matrix object.
	     *
	     * @param row      The row from which to copy the data from.
	     * @param vector3D The Vector3D object from which to copy the data.
	     */
	    copyRowFrom(row: number, vector3D: Vector3D): void;
	    /**
	     * Copies specific row of the calling Matrix object into the Vector3D object.
	     * The w element of the Vector3D object will not be changed.
	     *
	     * @param row      The row from which to copy the data from.
	     * @param vector3D The Vector3D object from which to copy the data.
	     */
	    copyRowTo(row: number, vector3D: Vector3D): void;
	    /**
	     * Includes parameters for scaling, rotation, and translation. When applied
	     * to a matrix it sets the matrix's values based on those parameters.
	     *
	     * <p>Using the <code>createBox()</code> method lets you obtain the same
	     * matrix as you would if you applied the <code>identity()</code>,
	     * <code>rotate()</code>, <code>scale()</code>, and <code>translate()</code>
	     * methods in succession. For example, <code>mat1.createBox(2,2,Math.PI/4,
	     * 100, 100)</code> has the same effect as the following:</p>
	     *
	     * @param scaleX   The factor by which to scale horizontally.
	     * @param scaleY   The factor by which scale vertically.
	     * @param rotation The amount to rotate, in radians.
	     * @param tx       The number of pixels to translate(move) to the right
	     *                 along the <i>x</i> axis.
	     * @param ty       The number of pixels to translate(move) down along the
	     *                 <i>y</i> axis.
	     */
	    createBox(scaleX: number, scaleY: number, rotation?: number, tx?: number, ty?: number): void;
	    /**
	     * Creates the specific style of matrix expected by the
	     * <code>beginGradientFill()</code> and <code>lineGradientStyle()</code>
	     * methods of the Graphics class. Width and height are scaled to a
	     * <code>scaleX</code>/<code>scaleY</code> pair and the
	     * <code>tx</code>/<code>ty</code> values are offset by half the width and
	     * height.
	     *
	     * <p>For example, consider a gradient with the following
	     * characteristics:</p>
	     *
	     * <ul>
	     *   <li><code>GradientType.LINEAR</code></li>
	     *   <li>Two colors, green and blue, with the ratios array set to <code>[0,
	     * 255]</code></li>
	     *   <li><code>SpreadMethod.PAD</code></li>
	     *   <li><code>InterpolationMethod.LINEAR_RGB</code></li>
	     * </ul>
	     *
	     * <p>The following illustrations show gradients in which the matrix was
	     * defined using the <code>createGradientBox()</code> method with different
	     * parameter settings:</p>
	     *
	     * @param width    The width of the gradient box.
	     * @param height   The height of the gradient box.
	     * @param rotation The amount to rotate, in radians.
	     * @param tx       The distance, in pixels, to translate to the right along
	     *                 the <i>x</i> axis. This value is offset by half of the
	     *                 <code>width</code> parameter.
	     * @param ty       The distance, in pixels, to translate down along the
	     *                 <i>y</i> axis. This value is offset by half of the
	     *                 <code>height</code> parameter.
	     */
	    createGradientBox(width: number, height: number, rotation?: number, tx?: number, ty?: number): void;
	    /**
	     * Given a point in the pretransform coordinate space, returns the
	     * coordinates of that point after the transformation occurs. Unlike the
	     * standard transformation applied using the <code>transformPoint()</code>
	     * method, the <code>deltaTransformPoint()</code> method's transformation
	     * does not consider the translation parameters <code>tx</code> and
	     * <code>ty</code>.
	     *
	     * @param point The point for which you want to get the result of the matrix
	     *              transformation.
	     * @return The point resulting from applying the matrix transformation.
	     */
	    deltaTransformPoint(point: Point): Point;
	    /**
	     * Sets each matrix property to a value that causes a null transformation. An
	     * object transformed by applying an identity matrix will be identical to the
	     * original.
	     *
	     * <p>After calling the <code>identity()</code> method, the resulting matrix
	     * has the following properties: <code>a</code>=1, <code>b</code>=0,
	     * <code>c</code>=0, <code>d</code>=1, <code>tx</code>=0,
	     * <code>ty</code>=0.</p>
	     *
	     * <p>In matrix notation, the identity matrix looks like this:</p>
	     *
	     */
	    identity(): void;
	    /**
	     * Performs the opposite transformation of the original matrix. You can apply
	     * an inverted matrix to an object to undo the transformation performed when
	     * applying the original matrix.
	     */
	    invert(): void;
	    /**
	     * Returns a new Matrix object that is a clone of this matrix, with an exact
	     * copy of the contained object.
	     *
	     * @param matrix The matrix for which you want to get the result of the matrix
	     *               transformation.
	     * @return A Matrix object.
	     */
	    multiply(matrix: Matrix): Matrix;
	    /**
	     * Applies a rotation transformation to the Matrix object.
	     *
	     * <p>The <code>rotate()</code> method alters the <code>a</code>,
	     * <code>b</code>, <code>c</code>, and <code>d</code> properties of the
	     * Matrix object. In matrix notation, this is the same as concatenating the
	     * current matrix with the following:</p>
	     *
	     * @param angle The rotation angle in radians.
	     */
	    rotate(angle: number): void;
	    /**
	     * Applies a scaling transformation to the matrix. The <i>x</i> axis is
	     * multiplied by <code>sx</code>, and the <i>y</i> axis it is multiplied by
	     * <code>sy</code>.
	     *
	     * <p>The <code>scale()</code> method alters the <code>a</code> and
	     * <code>d</code> properties of the Matrix object. In matrix notation, this
	     * is the same as concatenating the current matrix with the following
	     * matrix:</p>
	     *
	     * @param sx A multiplier used to scale the object along the <i>x</i> axis.
	     * @param sy A multiplier used to scale the object along the <i>y</i> axis.
	     */
	    scale(sx: number, sy: number): void;
	    /**
	     * Sets the members of Matrix to the specified values.
	     *
	     * @param a  The value that affects the positioning of pixels along the
	     *           <i>x</i> axis when scaling or rotating an image.
	     * @param b  The value that affects the positioning of pixels along the
	     *           <i>y</i> axis when rotating or skewing an image.
	     * @param c  The value that affects the positioning of pixels along the
	     *           <i>x</i> axis when rotating or skewing an image.
	     * @param d  The value that affects the positioning of pixels along the
	     *           <i>y</i> axis when scaling or rotating an image..
	     * @param tx The distance by which to translate each point along the <i>x</i>
	     *           axis.
	     * @param ty The distance by which to translate each point along the <i>y</i>
	     *           axis.
	     */
	    setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): void;
	    /**
	     * Returns a text value listing the properties of the Matrix object.
	     *
	     * @return A string containing the values of the properties of the Matrix
	     *         object: <code>a</code>, <code>b</code>, <code>c</code>,
	     *         <code>d</code>, <code>tx</code>, and <code>ty</code>.
	     */
	    toString(): string;
	    /**
	     * Returns the result of applying the geometric transformation represented by
	     * the Matrix object to the specified point.
	     *
	     * @param point The point for which you want to get the result of the Matrix
	     *              transformation.
	     * @return The point resulting from applying the Matrix transformation.
	     */
	    transformPoint(point: Point): Point;
	    /**
	     * Translates the matrix along the <i>x</i> and <i>y</i> axes, as specified
	     * by the <code>dx</code> and <code>dy</code> parameters.
	     *
	     * @param dx The amount of movement along the <i>x</i> axis to the right, in
	     *           pixels.
	     * @param dy The amount of movement down along the <i>y</i> axis, in pixels.
	     */
	    translate(dx: number, dy: number): void;
	}
	export = Matrix;
	
}

declare module "awayjs-core/lib/geom/MathConsts" {
	/**
	* MathConsts provides some commonly used mathematical constants
	*/
	class MathConsts {
	    /**
	     * The amount to multiply with when converting radians to degrees.
	     */
	    static RADIANS_TO_DEGREES: number;
	    /**
	     * The amount to multiply with when converting degrees to radians.
	     */
	    static DEGREES_TO_RADIANS: number;
	}
	export = MathConsts;
	
}

declare module "awayjs-core/lib/geom/Matrix3D" {
	import Box = require("awayjs-core/lib/geom/Box");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	class Matrix3D {
	    /**
	     * A Vector of 16 Numbers, where every four elements is a column of a 4x4 matrix.
	     *
	     * <p>An exception is thrown if the rawData property is set to a matrix that is not invertible. The Matrix3D
	     * object must be invertible. If a non-invertible matrix is needed, create a subclass of the Matrix3D object.</p>
	     */
	    rawData: Float32Array;
	    private static tempMatrix;
	    private static tempRawData;
	    private _position;
	    private _components;
	    /**
	     * Creates a Matrix3D object.
	     */
	    constructor(v?: Float32Array);
	    /**
	     * Appends the matrix by multiplying another Matrix3D object by the current Matrix3D object.
	     */
	    append(lhs: Matrix3D): void;
	    /**
	     * Appends an incremental rotation to a Matrix3D object.
	     */
	    appendRotation(degrees: number, axis: Vector3D): void;
	    /**
	     * Appends an incremental skew change along the x, y, and z axes to a Matrix3D object.
	     */
	    appendSkew(xSkew: number, ySkew: number, zSkew: number): void;
	    /**
	     * Appends an incremental scale change along the x, y, and z axes to a Matrix3D object.
	     */
	    appendScale(xScale: number, yScale: number, zScale: number): void;
	    /**
	     * Appends an incremental translation, a repositioning along the x, y, and z axes, to a Matrix3D object.
	     */
	    appendTranslation(x: number, y: number, z: number): void;
	    /**
	     * Returns a new Matrix3D object that is an exact copy of the current Matrix3D object.
	     */
	    clone(): Matrix3D;
	    /**
	     * Copies a Vector3D object into specific column of the calling Matrix3D object.
	     */
	    copyColumnFrom(column: number, vector3D: Vector3D): void;
	    /**
	     * Copies specific column of the calling Matrix3D object into the Vector3D object.
	     */
	    copyColumnTo(column: number, vector3D: Vector3D): void;
	    /**
	     * Copies all of the matrix data from the source Matrix3D object into the calling Matrix3D object.
	     */
	    copyFrom(sourceMatrix3D: Matrix3D): void;
	    copyRawDataFrom(vector: Float32Array, index?: number, transpose?: boolean): void;
	    copyRawDataTo(vector: Float32Array, index?: number, transpose?: boolean): void;
	    /**
	     * Copies a Vector3D object into specific row of the calling Matrix3D object.
	     */
	    copyRowFrom(row: number, vector3D: Vector3D): void;
	    /**
	     * Copies specific row of the calling Matrix3D object into the Vector3D object.
	     */
	    copyRowTo(row: number, vector3D: Vector3D): void;
	    /**
	     * Copies this Matrix3D object into a destination Matrix3D object.
	     */
	    copyToMatrix3D(dest: Matrix3D): void;
	    /**
	     * Returns the transformation matrix's translation, rotation, and scale settings as a Vector of three Vector3D objects.
	     */
	    decompose(orientationStyle?: string): Vector3D[];
	    /**
	     * Uses the transformation matrix without its translation elements to transform a Vector3D object from one space
	     * coordinate to another.
	     */
	    deltaTransformVector(v: Vector3D, t?: Vector3D): Vector3D;
	    /**
	     * Converts the current matrix to an identity or unit matrix.
	     */
	    identity(): void;
	    /**
	     * [static] Interpolates the translation, rotation, and scale transformation of one matrix toward those of the target matrix.
	     */
	    static interpolate(thisMat: Matrix3D, toMat: Matrix3D, percent: number): Matrix3D;
	    /**
	     * Interpolates this matrix towards the translation, rotation, and scale transformations of the target matrix.
	     */
	    interpolateTo(toMat: Matrix3D, percent: number): void;
	    /**
	     * Inverts the current matrix.
	     */
	    invert(): boolean;
	    /**
	     * Prepends a matrix by multiplying the current Matrix3D object by another Matrix3D object.
	     */
	    prepend(rhs: Matrix3D): void;
	    /**
	     * Prepends an incremental rotation to a Matrix3D object.
	     */
	    prependRotation(degrees: number, axis: Vector3D): void;
	    /**
	     * Prepends an incremental scale change along the x, y, and z axes to a Matrix3D object.
	     */
	    prependScale(xScale: number, yScale: number, zScale: number): void;
	    /**
	     * Prepends an incremental translation, a repositioning along the x, y, and z axes, to a Matrix3D object.
	     */
	    prependTranslation(x: number, y: number, z: number): void;
	    /**
	     * Sets the transformation matrix's translation, rotation, and scale settings.
	     */
	    recompose(components: Vector3D[]): boolean;
	    transformVector(v: Vector3D, t?: Vector3D): Vector3D;
	    transformBox(b: Box, t?: Box): Box;
	    /**
	     * Uses the transformation matrix to transform a Vector of Numbers from one coordinate space to another.
	     */
	    transformVectors(vin: number[], vout: number[]): void;
	    /**
	     * Converts the current Matrix3D object to a matrix where the rows and columns are swapped.
	     */
	    transpose(): void;
	    static getAxisRotation(x: number, y: number, z: number, degrees: number): Matrix3D;
	    /**
	     * [read-only] A Number that determines whether a matrix is invertible.
	     */
	    determinant: number;
	    /**
	     * A Vector3D object that holds the position, the 3D coordinate (x,y,z) of a display object within the
	     * transformation's frame of reference.
	     */
	    position: Vector3D;
	    toFixed(decimalPlace: number): string;
	    toString(): string;
	}
	export = Matrix3D;
	
}

declare module "awayjs-core/lib/geom/Matrix3DUtils" {
	import Quaternion = require("awayjs-core/lib/geom/Quaternion");
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Plane3D = require("awayjs-core/lib/geom/Plane3D");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	/**
	 * away.geom.Matrix3DUtils provides additional Matrix3D functions.
	 */
	class Matrix3DUtils {
	    /**
	     * A reference to a Vector to be used as a temporary raw data container, to prevent object creation.
	     */
	    static RAW_DATA_CONTAINER: Float32Array;
	    static CALCULATION_MATRIX: Matrix3D;
	    /**
	     * Fills the 3d matrix object with values representing the transformation made by the given quaternion.
	     *
	     * @param    quarternion    The quarterion object to convert.
	     */
	    static quaternion2matrix(quarternion: Quaternion, m?: Matrix3D): Matrix3D;
	    /**
	     * Returns a normalised <code>Vector3D</code> object representing the forward vector of the given matrix.
	     * @param    m        The Matrix3D object to use to get the forward vector
	     * @param    v        [optional] A vector holder to prevent make new Vector3D instance if already exists. Default is null.
	     * @return            The forward vector
	     */
	    static getForward(m: Matrix3D, v?: Vector3D): Vector3D;
	    /**
	     * Returns a normalised <code>Vector3D</code> object representing the up vector of the given matrix.
	     * @param    m        The Matrix3D object to use to get the up vector
	     * @param    v        [optional] A vector holder to prevent make new Vector3D instance if already exists. Default is null.
	     * @return            The up vector
	     */
	    static getUp(m: Matrix3D, v?: Vector3D): Vector3D;
	    /**
	     * Returns a normalised <code>Vector3D</code> object representing the right vector of the given matrix.
	     * @param    m        The Matrix3D object to use to get the right vector
	     * @param    v        [optional] A vector holder to prevent make new Vector3D instance if already exists. Default is null.
	     * @return            The right vector
	     */
	    static getRight(m: Matrix3D, v?: Vector3D): Vector3D;
	    /**
	     * Returns a boolean value representing whether there is any significant difference between the two given 3d matrices.
	     */
	    static compare(m1: Matrix3D, m2: Matrix3D): boolean;
	    static lookAt(matrix: Matrix3D, pos: Vector3D, dir: Vector3D, up: Vector3D): void;
	    static reflection(plane: Plane3D, target?: Matrix3D): Matrix3D;
	    static transformVector(matrix: Matrix3D, vector: Vector3D, result?: Vector3D): Vector3D;
	    static deltaTransformVector(matrix: Matrix3D, vector: Vector3D, result?: Vector3D): Vector3D;
	    static getTranslation(transform: Matrix3D, result?: Vector3D): Vector3D;
	    static deltaTransformVectors(matrix: Matrix3D, vin: Array<number>, vout: Array<number>): void;
	}
	export = Matrix3DUtils;
	
}

declare module "awayjs-core/lib/geom/Orientation3D" {
	/**
	 * A Quaternion object which can be used to represent rotations.
	 */
	class Orientation3D {
	    /**
	     * The axis angle orientation uses a combination of an axis and an angle to determine the orientation.
	     * @type {string}
	     */
	    static AXIS_ANGLE: string;
	    /**
	     * The default orientation for decompose() and recompose() methods, defines the orientation with three separate angles of rotation for each axis.
	     * @type {string}
	     */
	    static EULER_ANGLES: string;
	    /**
	     * The quaternion orientation uses complex numbers.
	     * @type {string}
	     */
	    static QUATERNION: string;
	}
	export = Orientation3D;
	
}

declare module "awayjs-core/lib/geom/PerspectiveProjection" {
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Point = require("awayjs-core/lib/geom/Point");
	/**
	 * <p>The PerspectiveProjection class provides an easy way to assign or modify
	 * the perspective transformations of a display object and all of its
	 * children. For more complex or custom perspective transformations, use the
	 * Matrix3D class. While the PerspectiveProjection class provides basic
	 * three-dimensional presentation properties, the Matrix3D class provides more
	 * detailed control over the three-dimensional presentation of display objects.
	 * </p>
	 *
	 * <p>Projection is a way of representing a three-dimensional object in a
	 * two-dimensional space, like a cube projected onto a computer screen.
	 * Perspective projection uses a viewing frustum (a rectangular pyramid) to
	 * model and project a three-dimensional world and its objects on the screen.
	 * The viewing frustum becomes increasingly wider as it moves further from the
	 * origin of the viewpoint. The origin of the viewpoint could be a camera or
	 * the eyes of an observer facing the screen. The projected perspective
	 * produces the illusion of three dimensions with depth and distance, where
	 * the objects closer to the screen appear larger than the objects farther
	 * from the screen.</p>
	 *
	 * <p>A default PerspectiveProjection object is a framework defined for
	 * perspective transformation of the root object, based on the field of view
	 * and aspect ratio (dimensions) of the stage. The projection center, the
	 * vanishing point, is set to the center of the stage, which means the
	 * three-dimensional display objects disappear toward the center of the stage
	 * as they move back in the z axis. The default viewpoint is at point (0,0)
	 * looking down the positive z axis. The y-axis points down toward the bottom
	 * of the screen. You can gain access to the root display object's perspective
	 * projection settings and change the field of view and projection center
	 * properties of the perspectiveProjection property through the root object's
	 * <code>DisplayObject.transform</code> property.</p>
	 *
	 * <p>You can also set a different perspective projection setting for a
	 * display object through the parent's perspective projection. First, create a
	 * PerspectiveProjection object and set its <code>fieldOfView</code> and
	 * <code>projectionCenter</code> properties. Next, assign the
	 * PerspectiveProjection object to the parent display object using the
	 * <code>DisplayObject.transform</code> property. The specified projection
	 * matrix and transformation will then apply to all the display object's
	 * three-dimensional children.</p>
	 *
	 * <p>To modify a perspective projection of the stage or root object: use the
	 * <code>transform.matrix</code> property of the root display object to gain
	 * access to the PerspectiveProjection object. Or, apply different perspective
	 * projection properties to a display object by setting the perspective
	 * projection properties of the display object's parent. The child display
	 * object inherits the new properties. Specifically, create a
	 * PerspectiveProjection object and set its properties, then assign the
	 * PerspectiveProjection object to the <code>perspectiveProjection</code>
	 * property of the parent display object's <code>transform</code> property.
	 * The specified projection transformation then applies to all the display
	 * object's three-dimensional children.</p>
	 *
	 * <p>Since both PerspectiveProjection and Matrix3D objects perform
	 * perspective transformations, do not assign both to a display object at the
	 * same time. Use the PerspectiveProjection object for focal length and
	 * projection center changes. For more control over the perspective
	 * transformation, create a perspective projection Matrix3D object.</p>
	 */
	class PerspectiveProjection {
	    private _matrix3D;
	    /**
	     * Specifies an angle, as a degree between 0 and 180, for the field of
	     * view in three dimensions. This value determines how strong the
	     * perspective transformation and distortion apply to a
	     * three-dimensional display object with a non-zero z-coordinate.
	     *
	     * <p>A degree close to 0 means that the screen's two-dimensional x-
	     * and y-coordinates are roughly the same as the three-dimensional x-,
	     * y-, and z-coordinates with little or no distortion. In other words,
	     * for a small angle, a display object moving down the z axis appears
	     * to stay near the same size and moves little.</p>
	     *
	     * <p>A value close to 180 degrees results in a fisheye projection effect:
	     * positions with a z value smaller than 0 are magnified, while
	     * positions with a z value larger than 0 are minimized. With a large
	     * angle, a display object moving down the z axis appears to change
	     * size quickly and moves a great distance. If the field of view is
	     * set to 0 or 180, nothing is seen on the screen.</p>
	     */
	    fieldOfView: number;
	    /**
	     * The distance between the eye or the viewpoint's origin (0,0,0) and
	     * the display object located in the z axis. During the perspective
	     * transformation, the <code>focalLength</code> is calculated
	     * dynamically using the angle of the field of view and the stage's
	     * aspect ratio (stage width divided by stage height).
	     *
	     * @see away.geom.PerspectiveProjection#fieldOfView
	     */
	    focalLength: number;
	    /**
	     * A two-dimensional point representing the center of the projection,
	     * the vanishing point for the display object.
	     *
	     * <p>The <code>projectionCenter</code> property is an offset to the
	     * default registration point that is the upper left of the stage,
	     * point (0,0). The default projection transformation center is in the
	     * middle of the stage, which means the three-dimensional display
	     * objects disappear toward the center of the stage as they move
	     * backwards in the z axis.</p>
	     */
	    projectionCenter: Point;
	    /**
	     * Creates an instance of a PerspectiveProjection object.
	     */
	    constructor();
	    /**
	     * Returns the underlying Matrix3D object of the display object.
	     *
	     * <p>A display object, like the root object, can have a
	     * PerspectiveProjection object without needing a Matrix3D property
	     * defined for its transformations. In fact, use either a
	     * PerspectiveProjection or a Matrix3D object to specify the
	     * perspective transformation. If when using the PerspectiveProjection
	     * object, a Matrix3D object was needed, the <code>toMatrix3D()</code>
	     * method can retrieve the underlying Matrix3D object of the display
	     * object. For example, the <code>toMatrix3D()</code> method can be
	     * used with the <code>Utils3D.projectVectors()</code> method.</p>
	     *
	     * @see away.geom.Matrix3D
	     */
	    toMatrix3D(): Matrix3D;
	}
	export = PerspectiveProjection;
	
}

declare module "awayjs-core/lib/geom/Plane3D" {
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	class Plane3D {
	    /**
	     * The A coefficient of this plane. (Also the x dimension of the plane normal)
	     */
	    a: number;
	    /**
	     * The B coefficient of this plane. (Also the y dimension of the plane normal)
	     */
	    b: number;
	    /**
	     * The C coefficient of this plane. (Also the z dimension of the plane normal)
	     */
	    c: number;
	    /**
	     * The D coefficient of this plane. (Also the inverse dot product between normal and point)
	     */
	    d: number;
	    _iAlignment: number;
	    static ALIGN_ANY: number;
	    static ALIGN_XY_AXIS: number;
	    static ALIGN_YZ_AXIS: number;
	    static ALIGN_XZ_AXIS: number;
	    /**
	     * Create a Plane3D with ABCD coefficients
	     */
	    constructor(a?: number, b?: number, c?: number, d?: number);
	    /**
	     * Fills this Plane3D with the coefficients from 3 points in 3d space.
	     * @param p0 Vector3D
	     * @param p1 Vector3D
	     * @param p2 Vector3D
	     */
	    fromPoints(p0: Vector3D, p1: Vector3D, p2: Vector3D): void;
	    /**
	     * Fills this Plane3D with the coefficients from the plane's normal and a point in 3d space.
	     * @param normal Vector3D
	     * @param point  Vector3D
	     */
	    fromNormalAndPoint(normal: Vector3D, point: Vector3D): void;
	    /**
	     * Normalize this Plane3D
	     * @return Plane3D This Plane3D.
	     */
	    normalize(): Plane3D;
	    /**
	     * Returns the signed distance between this Plane3D and the point p.
	     * @param p Vector3D
	     * @returns Number
	     */
	    distance(p: Vector3D): number;
	    /**
	     * Classify a point against this Plane3D. (in front, back or intersecting)
	     * @param p Vector3D
	     * @return int Plane3.FRONT or Plane3D.BACK or Plane3D.INTERSECT
	     */
	    classifyPoint(p: Vector3D, epsilon?: number): number;
	    toString(): string;
	}
	export = Plane3D;
	
}

declare module "awayjs-core/lib/geom/PlaneClassification" {
	class PlaneClassification {
	    static BACK: number;
	    static FRONT: number;
	    static IN: number;
	    static OUT: number;
	    static INTERSECT: number;
	}
	export = PlaneClassification;
	
}

declare module "awayjs-core/lib/geom/PoissonLookup" {
	class PoissonLookup {
	    static _distributions: Array<Array<number>>;
	    static initDistributions(): void;
	    static getDistribution(n: number): Array<number>;
	}
	export = PoissonLookup;
	
}

declare module "awayjs-core/lib/geom/Point" {
	/**
	 * The Point object represents a location in a two-dimensional coordinate
	 * system, where <i>x</i> represents the horizontal axis and <i>y</i>
	 * represents the vertical axis.
	 *
	 * <p>The following code creates a point at(0,0):</p>
	 *
	 * <p>Methods and properties of the following classes use Point objects:</p>
	 *
	 * <ul>
	 *   <li>BitmapData</li>
	 *   <li>DisplayObject</li>
	 *   <li>DisplayObjectContainer</li>
	 *   <li>DisplacementMapFilter</li>
	 *   <li>NativeWindow</li>
	 *   <li>Matrix</li>
	 *   <li>Rectangle</li>
	 * </ul>
	 *
	 * <p>You can use the <code>new Point()</code> constructor to create a Point
	 * object.</p>
	 */
	class Point {
	    /**
	     * The horizontal coordinate of the point. The default value is 0.
	     */
	    x: number;
	    /**
	     * The vertical coordinate of the point. The default value is 0.
	     */
	    y: number;
	    /**
	     * The length of the line segment from(0,0) to this point.
	     */
	    length: number;
	    /**
	     * Creates a new point. If you pass no parameters to this method, a point is
	     * created at(0,0).
	     *
	     * @param x The horizontal coordinate.
	     * @param y The vertical coordinate.
	     */
	    constructor(x?: number, y?: number);
	    /**
	     * Adds the coordinates of another point to the coordinates of this point to
	     * create a new point.
	     *
	     * @param v The point to be added.
	     * @return The new point.
	     */
	    add(v: Point): Point;
	    /**
	     * Creates a copy of this Point object.
	     *
	     * @return The new Point object.
	     */
	    clone(): Point;
	    copyFrom(sourcePoint: Point): void;
	    /**
	     * Determines whether two points are equal. Two points are equal if they have
	     * the same <i>x</i> and <i>y</i> values.
	     *
	     * @param toCompare The point to be compared.
	     * @return A value of <code>true</code> if the object is equal to this Point
	     *         object; <code>false</code> if it is not equal.
	     */
	    equals(toCompare: Point): boolean;
	    /**
	     * Scales the line segment between(0,0) and the current point to a set
	     * length.
	     *
	     * @param thickness The scaling value. For example, if the current point is
	     *                 (0,5), and you normalize it to 1, the point returned is
	     *                  at(0,1).
	     */
	    normalize(thickness?: number): void;
	    /**
	     * Offsets the Point object by the specified amount. The value of
	     * <code>dx</code> is added to the original value of <i>x</i> to create the
	     * new <i>x</i> value. The value of <code>dy</code> is added to the original
	     * value of <i>y</i> to create the new <i>y</i> value.
	     *
	     * @param dx The amount by which to offset the horizontal coordinate,
	     *           <i>x</i>.
	     * @param dy The amount by which to offset the vertical coordinate, <i>y</i>.
	     */
	    offset(dx: number, dy: number): void;
	    setTo(xa: number, ya: number): void;
	    /**
	     * Subtracts the coordinates of another point from the coordinates of this
	     * point to create a new point.
	     *
	     * @param v The point to be subtracted.
	     * @return The new point.
	     */
	    subtract(v: Point): Point;
	    /**
	     * Returns a string that contains the values of the <i>x</i> and <i>y</i>
	     * coordinates. The string has the form <code>"(x=<i>x</i>,
	     * y=<i>y</i>)"</code>, so calling the <code>toString()</code> method for a
	     * point at 23,17 would return <code>"(x=23, y=17)"</code>.
	     *
	     * @return The string representation of the coordinates.
	     */
	    toString(): string;
	    /**
	     * Returns the distance between <code>pt1</code> and <code>pt2</code>.
	     *
	     * @param pt1 The first point.
	     * @param pt2 The second point.
	     * @return The distance between the first and second points.
	     */
	    static distance(pt1: Point, pt2: Point): number;
	    /**
	     * Determines a point between two specified points. The parameter
	     * <code>f</code> determines where the new interpolated point is located
	     * relative to the two end points specified by parameters <code>pt1</code>
	     * and <code>pt2</code>. The closer the value of the parameter <code>f</code>
	     * is to <code>1.0</code>, the closer the interpolated point is to the first
	     * point(parameter <code>pt1</code>). The closer the value of the parameter
	     * <code>f</code> is to 0, the closer the interpolated point is to the second
	     * point(parameter <code>pt2</code>).
	     *
	     * @param pt1 The first point.
	     * @param pt2 The second point.
	     * @param f   The level of interpolation between the two points. Indicates
	     *            where the new point will be, along the line between
	     *            <code>pt1</code> and <code>pt2</code>. If <code>f</code>=1,
	     *            <code>pt1</code> is returned; if <code>f</code>=0,
	     *            <code>pt2</code> is returned.
	     * @return The new, interpolated point.
	     */
	    static interpolate(pt1: Point, pt2: Point, f: number): Point;
	    /**
	     * Converts a pair of polar coordinates to a Cartesian point coordinate.
	     *
	     * @param len   The length coordinate of the polar pair.
	     * @param angle The angle, in radians, of the polar pair.
	     * @return The Cartesian point.
	     */
	    static polar(len: number, angle: number): Point;
	}
	export = Point;
	
}

declare module "awayjs-core/lib/geom/Quaternion" {
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	/**
	 * A Quaternion object which can be used to represent rotations.
	 */
	class Quaternion {
	    /**
	     * The x value of the quaternion.
	     */
	    x: number;
	    /**
	     * The y value of the quaternion.
	     */
	    y: number;
	    /**
	     * The z value of the quaternion.
	     */
	    z: number;
	    /**
	     * The w value of the quaternion.
	     */
	    w: number;
	    /**
	     * Creates a new Quaternion object.
	     * @param x The x value of the quaternion.
	     * @param y The y value of the quaternion.
	     * @param z The z value of the quaternion.
	     * @param w The w value of the quaternion.
	     */
	    constructor(x?: number, y?: number, z?: number, w?: number);
	    /**
	     * Returns the magnitude of the quaternion object.
	     */
	    magnitude: number;
	    /**
	     * Fills the quaternion object with the result from a multiplication of two quaternion objects.
	     *
	     * @param    qa    The first quaternion in the multiplication.
	     * @param    qb    The second quaternion in the multiplication.
	     */
	    multiply(qa: Quaternion, qb: Quaternion): void;
	    multiplyVector(vector: Vector3D, target?: Quaternion): Quaternion;
	    /**
	     * Fills the quaternion object with values representing the given rotation around a vector.
	     *
	     * @param    axis    The axis around which to rotate
	     * @param    angle    The angle in radians of the rotation.
	     */
	    fromAxisAngle(axis: Vector3D, angle: number): void;
	    /**
	     * Spherically interpolates between two quaternions, providing an interpolation between rotations with constant angle change rate.
	     * @param qa The first quaternion to interpolate.
	     * @param qb The second quaternion to interpolate.
	     * @param t The interpolation weight, a value between 0 and 1.
	     */
	    slerp(qa: Quaternion, qb: Quaternion, t: number): void;
	    /**
	     * Linearly interpolates between two quaternions.
	     * @param qa The first quaternion to interpolate.
	     * @param qb The second quaternion to interpolate.
	     * @param t The interpolation weight, a value between 0 and 1.
	     */
	    lerp(qa: Quaternion, qb: Quaternion, t: number): void;
	    /**
	     * Fills the quaternion object with values representing the given euler rotation.
	     *
	     * @param    ax        The angle in radians of the rotation around the ax axis.
	     * @param    ay        The angle in radians of the rotation around the ay axis.
	     * @param    az        The angle in radians of the rotation around the az axis.
	     */
	    fromEulerAngles(ax: number, ay: number, az: number): void;
	    /**
	     * Fills a target Vector3D object with the Euler angles that form the rotation represented by this quaternion.
	     * @param target An optional Vector3D object to contain the Euler angles. If not provided, a new object is created.
	     * @return The Vector3D containing the Euler angles.
	     */
	    toEulerAngles(target?: Vector3D): Vector3D;
	    /**
	     * Normalises the quaternion object.
	     */
	    normalize(val?: number): void;
	    /**
	     * Used to trace the values of a quaternion.
	     *
	     * @return A string representation of the quaternion object.
	     */
	    toString(): string;
	    /**
	     * Converts the quaternion to a Matrix3D object representing an equivalent rotation.
	     * @param target An optional Matrix3D container to store the transformation in. If not provided, a new object is created.
	     * @return A Matrix3D object representing an equivalent rotation.
	     */
	    toMatrix3D(target?: Matrix3D): Matrix3D;
	    /**
	     * Extracts a quaternion rotation matrix out of a given Matrix3D object.
	     * @param matrix The Matrix3D out of which the rotation will be extracted.
	     */
	    fromMatrix(matrix: Matrix3D): void;
	    /**
	     * Converts the quaternion to a Vector.&lt;Number&gt; matrix representation of a rotation equivalent to this quaternion.
	     * @param target The Vector.&lt;Number&gt; to contain the raw matrix data.
	     * @param exclude4thRow If true, the last row will be omitted, and a 4x3 matrix will be generated instead of a 4x4.
	     */
	    toRawData(target: number[], exclude4thRow?: boolean): void;
	    /**
	     * Clones the quaternion.
	     * @return An exact duplicate of the current Quaternion.
	     */
	    clone(): Quaternion;
	    /**
	     * Rotates a point.
	     * @param vector The Vector3D object to be rotated.
	     * @param target An optional Vector3D object that will contain the rotated coordinates. If not provided, a new object will be created.
	     * @return A Vector3D object containing the rotated point.
	     */
	    rotatePoint(vector: Vector3D, target?: Vector3D): Vector3D;
	    /**
	     * Copies the data from a quaternion into this instance.
	     * @param q The quaternion to copy from.
	     */
	    copyFrom(q: Quaternion): void;
	}
	export = Quaternion;
	
}

declare module "awayjs-core/lib/geom/Sphere" {
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	class Sphere {
	    /**
	     *
	     */
	    x: number;
	    /**
	     *
	     */
	    y: number;
	    /**
	     *
	     */
	    z: number;
	    /**
	     *
	     */
	    radius: number;
	    /**
	     * Create a Sphere with ABCD coefficients
	     */
	    constructor(x?: number, y?: number, z?: number, radius?: number);
	    rayIntersection(position: Vector3D, direction: Vector3D, targetNormal: Vector3D): number;
	    containsPoint(position: Vector3D): boolean;
	    toString(): string;
	}
	export = Sphere;
	
}

declare module "awayjs-core/lib/geom/Rectangle" {
	import Point = require("awayjs-core/lib/geom/Point");
	/**
	 * A Rectangle object is an area defined by its position, as indicated by its
	 * top-left corner point(<i>x</i>, <i>y</i>) and by its width and its height.
	 *
	 *
	 * <p>The <code>x</code>, <code>y</code>, <code>width</code>, and
	 * <code>height</code> properties of the Rectangle class are independent of
	 * each other; changing the value of one property has no effect on the others.
	 * However, the <code>right</code> and <code>bottom</code> properties are
	 * integrally related to those four properties. For example, if you change the
	 * value of the <code>right</code> property, the value of the
	 * <code>width</code> property changes; if you change the <code>bottom</code>
	 * property, the value of the <code>height</code> property changes. </p>
	 *
	 * <p>The following methods and properties use Rectangle objects:</p>
	 *
	 * <ul>
	 *   <li>The <code>applyFilter()</code>, <code>colorTransform()</code>,
	 * <code>copyChannel()</code>, <code>copyPixels()</code>, <code>draw()</code>,
	 * <code>fillRect()</code>, <code>generateFilterRect()</code>,
	 * <code>getColorBoundsRect()</code>, <code>getPixels()</code>,
	 * <code>merge()</code>, <code>paletteMap()</code>,
	 * <code>pixelDisolve()</code>, <code>setPixels()</code>, and
	 * <code>threshold()</code> methods, and the <code>rect</code> property of the
	 * BitmapData class</li>
	 *   <li>The <code>getBounds()</code> and <code>getRect()</code> methods, and
	 * the <code>scrollRect</code> and <code>scale9Grid</code> properties of the
	 * DisplayObject class</li>
	 *   <li>The <code>getCharBoundaries()</code> method of the TextField
	 * class</li>
	 *   <li>The <code>pixelBounds</code> property of the Transform class</li>
	 *   <li>The <code>bounds</code> parameter for the <code>startDrag()</code>
	 * method of the Sprite class</li>
	 *   <li>The <code>printArea</code> parameter of the <code>addPage()</code>
	 * method of the PrintJob class</li>
	 * </ul>
	 *
	 * <p>You can use the <code>new Rectangle()</code> constructor to create a
	 * Rectangle object.</p>
	 *
	 * <p><b>Note:</b> The Rectangle class does not define a rectangular Shape
	 * display object. To draw a rectangular Shape object onscreen, use the
	 * <code>drawRect()</code> method of the Graphics class.</p>
	 */
	class Rectangle {
	    private _size;
	    private _bottomRight;
	    private _topLeft;
	    /**
	     * The height of the rectangle, in pixels. Changing the <code>height</code>
	     * value of a Rectangle object has no effect on the <code>x</code>,
	     * <code>y</code>, and <code>width</code> properties.
	     */
	    height: number;
	    /**
	     * The width of the rectangle, in pixels. Changing the <code>width</code>
	     * value of a Rectangle object has no effect on the <code>x</code>,
	     * <code>y</code>, and <code>height</code> properties.
	     */
	    width: number;
	    /**
	     * The <i>x</i> coordinate of the top-left corner of the rectangle. Changing
	     * the value of the <code>x</code> property of a Rectangle object has no
	     * effect on the <code>y</code>, <code>width</code>, and <code>height</code>
	     * properties.
	     *
	     * <p>The value of the <code>x</code> property is equal to the value of the
	     * <code>left</code> property.</p>
	     */
	    x: number;
	    /**
	     * The <i>y</i> coordinate of the top-left corner of the rectangle. Changing
	     * the value of the <code>y</code> property of a Rectangle object has no
	     * effect on the <code>x</code>, <code>width</code>, and <code>height</code>
	     * properties.
	     *
	     * <p>The value of the <code>y</code> property is equal to the value of the
	     * <code>top</code> property.</p>
	     */
	    y: number;
	    /**
	     * The sum of the <code>y</code> and <code>height</code> properties.
	     */
	    bottom: number;
	    /**
	     * The location of the Rectangle object's bottom-right corner, determined by
	     * the values of the <code>right</code> and <code>bottom</code> properties.
	     */
	    bottomRight: Point;
	    /**
	     * The <i>x</i> coordinate of the top-left corner of the rectangle. Changing
	     * the <code>left</code> property of a Rectangle object has no effect on the
	     * <code>y</code> and <code>height</code> properties. However it does affect
	     * the <code>width</code> property, whereas changing the <code>x</code> value
	     * does <i>not</i> affect the <code>width</code> property.
	     *
	     * <p>The value of the <code>left</code> property is equal to the value of
	     * the <code>x</code> property.</p>
	     */
	    left: number;
	    /**
	     * The sum of the <code>x</code> and <code>width</code> properties.
	     */
	    right: number;
	    /**
	     * The size of the Rectangle object, expressed as a Point object with the
	     * values of the <code>width</code> and <code>height</code> properties.
	     */
	    size: Point;
	    /**
	     * The <i>y</i> coordinate of the top-left corner of the rectangle. Changing
	     * the <code>top</code> property of a Rectangle object has no effect on the
	     * <code>x</code> and <code>width</code> properties. However it does affect
	     * the <code>height</code> property, whereas changing the <code>y</code>
	     * value does <i>not</i> affect the <code>height</code> property.
	     *
	     * <p>The value of the <code>top</code> property is equal to the value of the
	     * <code>y</code> property.</p>
	     */
	    top: number;
	    /**
	     * The location of the Rectangle object's top-left corner, determined by the
	     * <i>x</i> and <i>y</i> coordinates of the point.
	     */
	    topLeft: Point;
	    /**
	     * Creates a new Rectangle object with the top-left corner specified by the
	     * <code>x</code> and <code>y</code> parameters and with the specified
	     * <code>width</code> and <code>height</code> parameters. If you call this
	     * public without parameters, a rectangle with <code>x</code>,
	     * <code>y</code>, <code>width</code>, and <code>height</code> properties set
	     * to 0 is created.
	     *
	     * @param x      The <i>x</i> coordinate of the top-left corner of the
	     *               rectangle.
	     * @param y      The <i>y</i> coordinate of the top-left corner of the
	     *               rectangle.
	     * @param width  The width of the rectangle, in pixels.
	     * @param height The height of the rectangle, in pixels.
	     */
	    constructor(x?: number, y?: number, width?: number, height?: number);
	    /**
	     * Returns a new Rectangle object with the same values for the
	     * <code>x</code>, <code>y</code>, <code>width</code>, and
	     * <code>height</code> properties as the original Rectangle object.
	     *
	     * @return A new Rectangle object with the same values for the
	     *         <code>x</code>, <code>y</code>, <code>width</code>, and
	     *         <code>height</code> properties as the original Rectangle object.
	     */
	    clone(): Rectangle;
	    /**
	     * Determines whether the specified point is contained within the rectangular
	     * region defined by this Rectangle object.
	     *
	     * @param x The <i>x</i> coordinate(horizontal position) of the point.
	     * @param y The <i>y</i> coordinate(vertical position) of the point.
	     * @return A value of <code>true</code> if the Rectangle object contains the
	     *         specified point; otherwise <code>false</code>.
	     */
	    contains(x: number, y: number): boolean;
	    /**
	     * Determines whether the specified point is contained within the rectangular
	     * region defined by this Rectangle object. This method is similar to the
	     * <code>Rectangle.contains()</code> method, except that it takes a Point
	     * object as a parameter.
	     *
	     * @param point The point, as represented by its <i>x</i> and <i>y</i>
	     *              coordinates.
	     * @return A value of <code>true</code> if the Rectangle object contains the
	     *         specified point; otherwise <code>false</code>.
	     */
	    containsPoint(point: Point): boolean;
	    /**
	     * Determines whether the Rectangle object specified by the <code>rect</code>
	     * parameter is contained within this Rectangle object. A Rectangle object is
	     * said to contain another if the second Rectangle object falls entirely
	     * within the boundaries of the first.
	     *
	     * @param rect The Rectangle object being checked.
	     * @return A value of <code>true</code> if the Rectangle object that you
	     *         specify is contained by this Rectangle object; otherwise
	     *         <code>false</code>.
	     */
	    containsRect(rect: Rectangle): boolean;
	    /**
	     * Copies all of rectangle data from the source Rectangle object into the
	     * calling Rectangle object.
	     *
	     * @param sourceRect The Rectangle object from which to copy the data.
	     */
	    copyFrom(sourceRect: Rectangle): void;
	    /**
	     * Determines whether the object specified in the <code>toCompare</code>
	     * parameter is equal to this Rectangle object. This method compares the
	     * <code>x</code>, <code>y</code>, <code>width</code>, and
	     * <code>height</code> properties of an object against the same properties of
	     * this Rectangle object.
	     *
	     * @param toCompare The rectangle to compare to this Rectangle object.
	     * @return A value of <code>true</code> if the object has exactly the same
	     *         values for the <code>x</code>, <code>y</code>, <code>width</code>,
	     *         and <code>height</code> properties as this Rectangle object;
	     *         otherwise <code>false</code>.
	     */
	    equals(toCompare: Rectangle): boolean;
	    /**
	     * Increases the size of the Rectangle object by the specified amounts, in
	     * pixels. The center point of the Rectangle object stays the same, and its
	     * size increases to the left and right by the <code>dx</code> value, and to
	     * the top and the bottom by the <code>dy</code> value.
	     *
	     * @param dx The value to be added to the left and the right of the Rectangle
	     *           object. The following equation is used to calculate the new
	     *           width and position of the rectangle:
	     * @param dy The value to be added to the top and the bottom of the
	     *           Rectangle. The following equation is used to calculate the new
	     *           height and position of the rectangle:
	     */
	    inflate(dx: number, dy: number): void;
	    /**
	     * Increases the size of the Rectangle object. This method is similar to the
	     * <code>Rectangle.inflate()</code> method except it takes a Point object as
	     * a parameter.
	     *
	     * <p>The following two code examples give the same result:</p>
	     *
	     * @param point The <code>x</code> property of this Point object is used to
	     *              increase the horizontal dimension of the Rectangle object.
	     *              The <code>y</code> property is used to increase the vertical
	     *              dimension of the Rectangle object.
	     */
	    inflatePoint(point: Point): void;
	    /**
	     * If the Rectangle object specified in the <code>toIntersect</code>
	     * parameter intersects with this Rectangle object, returns the area of
	     * intersection as a Rectangle object. If the rectangles do not intersect,
	     * this method returns an empty Rectangle object with its properties set to
	     * 0.
	     *
	     * @param toIntersect The Rectangle object to compare against to see if it
	     *                    intersects with this Rectangle object.
	     * @return A Rectangle object that equals the area of intersection. If the
	     *         rectangles do not intersect, this method returns an empty
	     *         Rectangle object; that is, a rectangle with its <code>x</code>,
	     *         <code>y</code>, <code>width</code>, and <code>height</code>
	     *         properties set to 0.
	     */
	    intersection(toIntersect: Rectangle): Rectangle;
	    /**
	     * Determines whether the object specified in the <code>toIntersect</code>
	     * parameter intersects with this Rectangle object. This method checks the
	     * <code>x</code>, <code>y</code>, <code>width</code>, and
	     * <code>height</code> properties of the specified Rectangle object to see if
	     * it intersects with this Rectangle object.
	     *
	     * @param toIntersect The Rectangle object to compare against this Rectangle
	     *                    object.
	     * @return A value of <code>true</code> if the specified object intersects
	     *         with this Rectangle object; otherwise <code>false</code>.
	     */
	    intersects(toIntersect: Rectangle): boolean;
	    /**
	     * Determines whether or not this Rectangle object is empty.
	     *
	     * @return A value of <code>true</code> if the Rectangle object's width or
	     *         height is less than or equal to 0; otherwise <code>false</code>.
	     */
	    isEmpty(): boolean;
	    /**
	     * Adjusts the location of the Rectangle object, as determined by its
	     * top-left corner, by the specified amounts.
	     *
	     * @param dx Moves the <i>x</i> value of the Rectangle object by this amount.
	     * @param dy Moves the <i>y</i> value of the Rectangle object by this amount.
	     */
	    offset(dx: number, dy: number): void;
	    /**
	     * Adjusts the location of the Rectangle object using a Point object as a
	     * parameter. This method is similar to the <code>Rectangle.offset()</code>
	     * method, except that it takes a Point object as a parameter.
	     *
	     * @param point A Point object to use to offset this Rectangle object.
	     */
	    offsetPoint(point: Point): void;
	    /**
	     * Sets all of the Rectangle object's properties to 0. A Rectangle object is
	     * empty if its width or height is less than or equal to 0.
	     *
	     * <p> This method sets the values of the <code>x</code>, <code>y</code>,
	     * <code>width</code>, and <code>height</code> properties to 0.</p>
	     *
	     */
	    setEmpty(): void;
	    /**
	     * Sets the members of Rectangle to the specified values
	     *
	     * @param xa      The <i>x</i> coordinate of the top-left corner of the
	     *                rectangle.
	     * @param ya      The <i>y</i> coordinate of the top-left corner of the
	     *                rectangle.
	     * @param widtha  The width of the rectangle, in pixels.
	     * @param heighta The height of the rectangle, in pixels.
	     */
	    setTo(xa: number, ya: number, widtha: number, heighta: number): void;
	    /**
	     * Builds and returns a string that lists the horizontal and vertical
	     * positions and the width and height of the Rectangle object.
	     *
	     * @return A string listing the value of each of the following properties of
	     *         the Rectangle object: <code>x</code>, <code>y</code>,
	     *         <code>width</code>, and <code>height</code>.
	     */
	    toString(): string;
	    /**
	     * Adds two rectangles together to create a new Rectangle object, by filling
	     * in the horizontal and vertical space between the two rectangles.
	     *
	     * <p><b>Note:</b> The <code>union()</code> method ignores rectangles with
	     * <code>0</code> as the height or width value, such as: <code>var
	     * rect2:Rectangle = new Rectangle(300,300,50,0);</code></p>
	     *
	     * @param toUnion A Rectangle object to add to this Rectangle object.
	     * @return A new Rectangle object that is the union of the two rectangles.
	     */
	    union(toUnion: Rectangle): Rectangle;
	}
	export = Rectangle;
	
}

declare module "awayjs-core/lib/geom/UVTransform" {
	import Matrix = require("awayjs-core/lib/geom/Matrix");
	class UVTransform {
	    private _uvMatrix;
	    private _uvMatrixDirty;
	    private _rotation;
	    private _scaleU;
	    private _scaleV;
	    private _offsetU;
	    private _offsetV;
	    /**
	     *
	     */
	    offsetU: number;
	    /**
	     *
	     */
	    offsetV: number;
	    /**
	     *
	     */
	    rotation: number;
	    /**
	     *
	     */
	    scaleU: number;
	    /**
	     *
	     */
	    scaleV: number;
	    /**
	     *
	     */
	    matrix: Matrix;
	    constructor();
	    /**
	     * @private
	     */
	    private updateUVMatrix();
	}
	export = UVTransform;
	
}

declare module "awayjs-core/lib/library/AssetBase" {
	import IAssetClass = require("awayjs-core/lib/library/IAssetClass");
	import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
	class AssetBase extends EventDispatcher {
	    static ID_COUNT: number;
	    private _originalName;
	    private _namespace;
	    private _name;
	    private _id;
	    private _full_path;
	    static DEFAULT_NAMESPACE: string;
	    constructor(name?: string);
	    /**
	     *
	     */
	    assetType: string;
	    /**
	     * The original name used for this asset in the resource (e.g. file) in which
	     * it was found. This may not be the same as <code>name</code>, which may
	     * have changed due to of a name conflict.
	     */
	    originalName: string;
	    /**
	     * A unique id for the asset, used to identify assets in an associative array
	     */
	    id: number;
	    name: string;
	    dispose(): void;
	    _clearInterfaces(): void;
	    assetNamespace: string;
	    assetFullPath: Array<string>;
	    assetPathEquals(name: string, ns: string): boolean;
	    isAsset(assetClass: IAssetClass): boolean;
	    resetAssetPath(name: string, ns?: string, overrideOriginal?: boolean): void;
	    private updateFullPath();
	}
	export = AssetBase;
	
}

declare module "awayjs-core/lib/geom/Vector3D" {
	/**
	 * The Vector3D class represents a point or a location in the three-dimensional
	 * space using the Cartesian coordinates x, y, and z. As in a two-dimensional
	 * space, the x property represents the horizontal axis and the y property
	 * represents the vertical axis. In three-dimensional space, the z property
	 * represents depth. The value of the x property increases as the object moves
	 * to the right. The value of the y property increases as the object moves
	 * down. The z property increases as the object moves farther from the point
	 * of view. Using perspective projection and scaling, the object is seen to be
	 * bigger when near and smaller when farther away from the screen. As in a
	 * right-handed three-dimensional coordinate system, the positive z-axis points
	 * away from the viewer and the value of the z property increases as the object
	 * moves away from the viewer's eye. The origin point (0,0,0) of the global
	 * space is the upper-left corner of the stage.
	 *
	 * <p>The Vector3D class can also represent a direction, an arrow pointing from
	 * the origin of the coordinates, such as (0,0,0), to an endpoint; or a
	 * floating-point component of an RGB (Red, Green, Blue) color model.</p>
	 *
	 * <p>Quaternion notation introduces a fourth element, the w property, which
	 * provides additional orientation information. For example, the w property can
	 * define an angle of rotation of a Vector3D object. The combination of the
	 * angle of rotation and the coordinates x, y, and z can determine the display
	 * object's orientation. Here is a representation of Vector3D elements in
	 * matrix notation:</p>
	 */
	class Vector3D {
	    /**
	     * The x axis defined as a Vector3D object with coordinates (1,0,0).
	     */
	    static X_AXIS: Vector3D;
	    /**
	     * The y axis defined as a Vector3D object with coordinates (0,1,0).
	     */
	    static Y_AXIS: Vector3D;
	    /**
	     * The z axis defined as a Vector3D object with coordinates (0,0,1).
	     */
	    static Z_AXIS: Vector3D;
	    /**
	     * The first element of a Vector3D object, such as the x coordinate of
	     * a point in the three-dimensional space. The default value is 0.
	     */
	    x: number;
	    y: number;
	    /**
	     * The third element of a Vector3D object, such as the y coordinate of
	     * a point in the three-dimensional space. The default value is 0.
	     */
	    z: number;
	    /**
	     * TThe fourth element of a Vector3D object (in addition to the x, y,
	     * and z properties) can hold data such as the angle of rotation. The
	     * default value is 0.
	     *
	     * <p>Quaternion notation employs an angle as the fourth element in
	     * its calculation of three-dimensional rotation. The w property can
	     * be used to define the angle of rotation about the Vector3D object.
	     * The combination of the rotation angle and the coordinates (x,y,z)
	     * determines the display object's orientation.</p>
	     *
	     * <p>In addition, the w property can be used as a perspective warp
	     * factor for a projected three-dimensional position or as a projection
	     * transform value in representing a three-dimensional coordinate
	     * projected into the two-dimensional space. For example, you can
	     * create a projection matrix using the <code>Matrix3D.rawData</code>
	     * property, that, when applied to a Vector3D object, produces a
	     * transform value in the Vector3D object's fourth element (the w
	     * property). Dividing the Vector3D object's other elements by the
	     * transform value then produces a projected Vector3D object. You can
	     * use the <code>Vector3D.project()</code> method to divide the first
	     * three elements of a Vector3D object by its fourth element.</p>
	     */
	    w: number;
	    /**
	     * The length, magnitude, of the current Vector3D object from the
	     * origin (0,0,0) to the object's x, y, and z coordinates. The w
	     * property is ignored. A unit vector has a length or magnitude of
	     * one.
	     */
	    length: number;
	    /**
	     * The square of the length of the current Vector3D object, calculated
	     * using the x, y, and z properties. The w property is ignored. Use the
	     * <code>lengthSquared()</code> method whenever possible instead of the
	     * slower <code>Math.sqrt()</code> method call of the
	     * <code>Vector3D.length()</code> method.
	     */
	    lengthSquared: number;
	    /**
	     * Creates an instance of a Vector3D object. If you do not specify a
	     * parameter for the constructor, a Vector3D object is created with
	     * the elements (0,0,0,0).
	     *
	     * @param x The first element, such as the x coordinate.
	     * @param y The second element, such as the y coordinate.
	     * @param z The third element, such as the z coordinate.
	     * @param w An optional element for additional data such as the angle
	     *          of rotation.
	     */
	    constructor(x?: number, y?: number, z?: number, w?: number);
	    /**
	     * Adds the value of the x, y, and z elements of the current Vector3D
	     * object to the values of the x, y, and z elements of another Vector3D
	     * object. The <code>add()</code> method does not change the current
	     * Vector3D object. Instead, it returns a new Vector3D object with
	     * the new values.
	     *
	     * <p>The result of adding two vectors together is a resultant vector.
	     * One way to visualize the result is by drawing a vector from the
	     * origin or tail of the first vector to the end or head of the second
	     * vector. The resultant vector is the distance between the origin
	     * point of the first vector and the end point of the second vector.
	     * </p>
	     */
	    add(a: Vector3D): Vector3D;
	    /**
	     * Returns the angle in radians between two vectors. The returned angle
	     * is the smallest radian the first Vector3D object rotates until it
	     * aligns with the second Vector3D object.
	     *
	     * <p>The <code>angleBetween()</code> method is a static method. You
	     * can use it directly as a method of the Vector3D class.</p>
	     *
	     * <p>To convert a degree to a radian, you can use the following
	     * formula:</p>
	     *
	     * <p><code>radian = Math.PI/180 * degree</code></p>
	     *
	     * @param a The first Vector3D object.
	     * @param b The second Vector3D object.
	     * @returns The angle between two Vector3D objects.
	     */
	    static angleBetween(a: Vector3D, b: Vector3D): number;
	    /**
	     * Returns a new Vector3D object that is an exact copy of the current
	     * Vector3D object.
	     *
	     * @returns A new Vector3D object that is a copy of the current
	     * Vector3D object.
	     */
	    clone(): Vector3D;
	    static combine(a: Vector3D, b: Vector3D, ascl: number, bscl: number): Vector3D;
	    /**
	     * Copies all of vector data from the source Vector3D object into the
	     * calling Vector3D object.
	     *
	     * @param src The Vector3D object from which to copy the data.
	     */
	    copyFrom(src: Vector3D): void;
	    /**
	     * Returns a new Vector3D object that is perpendicular (at a right
	     * angle) to the current Vector3D and another Vector3D object. If the
	     * returned Vector3D object's coordinates are (0,0,0), then the two
	     * Vector3D objects are parallel to each other.
	     *
	     * <p>You can use the normalized cross product of two vertices of a
	     * polygon surface with the normalized vector of the camera or eye
	     * viewpoint to get a dot product. The value of the dot product can
	     * identify whether a surface of a three-dimensional object is hidden
	     * from the viewpoint.</p>
	     *
	     * @param a A second Vector3D object.
	     * @returns A new Vector3D object that is perpendicular to the current
	     *          Vector3D object and the Vector3D object specified as the
	     *          parameter.
	     */
	    crossProduct(a: Vector3D): Vector3D;
	    /**
	     * Decrements the value of the x, y, and z elements of the current
	     * Vector3D object by the values of the x, y, and z elements of
	     * specified Vector3D object. Unlike the
	     * <code>Vector3D.subtract()</code> method, the
	     * <code>decrementBy()</code> method changes the current Vector3D
	     * object and does not return a new Vector3D object.
	     *
	     * @param a The Vector3D object containing the values to subtract from
	     *          the current Vector3D object.
	     */
	    decrementBy(a: Vector3D): void;
	    /**
	     * Returns the distance between two Vector3D objects. The
	     * <code>distance()</code> method is a static method. You can use it
	     * directly as a method of the Vector3D class to get the Euclidean
	     * distance between two three-dimensional points.
	     *
	     * @param pt1 A Vector3D object as the first three-dimensional point.
	     * @param pt2 A Vector3D object as the second three-dimensional point.
	     * @returns The distance between two Vector3D objects.
	     */
	    static distance(pt1: Vector3D, pt2: Vector3D): number;
	    /**
	     * If the current Vector3D object and the one specified as the
	     * parameter are unit vertices, this method returns the cosine of the
	     * angle between the two vertices. Unit vertices are vertices that
	     * point to the same direction but their length is one. They remove the
	     * length of the vector as a factor in the result. You can use the
	     * <code>normalize()</code> method to convert a vector to a unit
	     * vector.
	     *
	     * <p>The <code>dotProduct()</code> method finds the angle between two
	     * vertices. It is also used in backface culling or lighting
	     * calculations. Backface culling is a procedure for determining which
	     * surfaces are hidden from the viewpoint. You can use the normalized
	     * vertices from the camera, or eye, viewpoint and the cross product of
	     * the vertices of a polygon surface to get the dot product. If the dot
	     * product is less than zero, then the surface is facing the camera or
	     * the viewer. If the two unit vertices are perpendicular to each
	     * other, they are orthogonal and the dot product is zero. If the two
	     * vertices are parallel to each other, the dot product is one.</p>
	     *
	     * @param a The second Vector3D object.
	     * @returns A scalar which is the dot product of the current Vector3D
	     *          object and the specified Vector3D object.
	     *
	     * @see away.geom.Vector3D#crossProduct()
	     * @see away.geom.Vector3D#normalize()
	     */
	    dotProduct(a: Vector3D): number;
	    /**
	     * Determines whether two Vector3D objects are equal by comparing the
	     * x, y, and z elements of the current Vector3D object with a
	     * specified Vector3D object. If the values of these elements are the
	     * same, the two Vector3D objects are equal. If the second optional
	     * parameter is set to true, all four elements of the Vector3D objects,
	     * including the w property, are compared.
	     */
	    /**
	     *
	     * @param toCompare The Vector3D object to be compared with the current
	     *                  Vector3D object.
	     * @param allFour   An optional parameter that specifies whether the w
	     *                  property of the Vector3D objects is used in the
	     *                  comparison.
	     * @returns A value of true if the specified Vector3D object is equal
	     *          to the current Vector3D object; false if it is not equal.
	     */
	    equals(toCompare: Vector3D, allFour?: boolean): boolean;
	    /**
	     * Increments the value of the x, y, and z elements of the current
	     * Vector3D object by the values of the x, y, and z elements of a
	     * specified Vector3D object. Unlike the <code>Vector3D.add()</code>
	     * method, the <code>incrementBy()</code> method changes the current
	     * Vector3D object and does not return a new Vector3D object.
	     *
	     * @param a The Vector3D object to be added to the current Vector3D
	     *          object.
	     */
	    incrementBy(a: Vector3D): void;
	    /**
	     * Compares the elements of the current Vector3D object with the
	     * elements of a specified Vector3D object to determine whether they
	     * are nearly equal. The two Vector3D objects are nearly equal if the
	     * value of all the elements of the two vertices are equal, or the
	     * result of the comparison is within the tolerance range. The
	     * difference between two elements must be less than the number
	     * specified as the tolerance parameter. If the third optional
	     * parameter is set to <code>true</code>, all four elements of the
	     * Vector3D objects, including the <code>w</code> property, are
	     * compared. Otherwise, only the x, y, and z elements are included in
	     * the comparison.
	     */
	    /**
	     *
	     * @param toCompare The Vector3D object to be compared with the current
	     *                  Vector3D object.
	     * @param tolerance A number determining the tolerance factor. If the
	     *                  difference between the values of the Vector3D
	     *                  element specified in the toCompare parameter and
	     *                  the current Vector3D element is less than the
	     *                  tolerance number, the two values are considered
	     *                  nearly equal.
	     * @param allFour   An optional parameter that specifies whether the w
	     *                  property of the Vector3D objects is used in the
	     *                  comparison.
	     * @returns A value of true if the specified Vector3D object is nearly
	     *          equal to the current Vector3D object; false if it is not
	     *          equal.
	     *
	     * @see away.geom.Vector3D#equals()
	     */
	    nearEquals(toCompare: Vector3D, tolerance: number, allFour?: boolean): boolean;
	    /**
	     * Sets the current Vector3D object to its inverse. The inverse object
	     * is also considered the opposite of the original object. The value of
	     * the x, y, and z properties of the current Vector3D object is changed
	     * to -x, -y, and -z.
	     */
	    negate(): void;
	    /**
	     * Converts a Vector3D object to a unit vector by dividing the first
	     * three elements (x, y, z) by the length of the vector. Unit vertices
	     * are vertices that have a direction but their length is one. They
	     * simplify vector calculations by removing length as a factor.
	     */
	    /**
	     * Scales the line segment between(0,0) and the current point to a set
	     * length.
	     *
	     * @param thickness The scaling value. For example, if the current
	     *                  Vector3D object is (0,3,4), and you normalize it to
	     *                  1, the point returned is at(0,0.6,0.8).
	     */
	    normalize(thickness?: number): void;
	    /**
	     * Divides the value of the <code>x</code>, <code>y</code>, and
	     * <code>z</code> properties of the current Vector3D object by the
	     * value of its <code>w</code> property.
	     *
	     * <p>If the current Vector3D object is the result of multiplying a
	     * Vector3D object by a projection Matrix3D object, the w property can
	     * hold the transform value. The <code>project()</code> method then can
	     * complete the projection by dividing the elements by the
	     * <code>w</code> property. Use the <code>Matrix3D.rawData</code>
	     * property to create a projection Matrix3D object.</p>
	     */
	    project(): void;
	    /**
	     * Scales the current Vector3D object by a scalar, a magnitude. The
	     * Vector3D object's x, y, and z elements are multiplied by the scalar
	     * number specified in the parameter. For example, if the vector is
	     * scaled by ten, the result is a vector that is ten times longer. The
	     * scalar can also change the direction of the vector. Multiplying the
	     * vector by a negative number reverses its direction.
	     *
	     * @param s A multiplier (scalar) used to scale a Vector3D object.
	
	     */
	    scaleBy(s: number): void;
	    /**
	     * Sets the members of Vector3D to the specified values
	     *
	     * @param xa The first element, such as the x coordinate.
	     * @param ya The second element, such as the y coordinate.
	     * @param za The third element, such as the z coordinate.
	     */
	    setTo(xa: number, ya: number, za: number): void;
	    /**
	     * Subtracts the value of the x, y, and z elements of the current
	     * Vector3D object from the values of the x, y, and z elements of
	     * another Vector3D object. The <code>subtract()</code> method does not
	     * change the current Vector3D object. Instead, this method returns a
	     * new Vector3D object with the new values.
	     *
	     * @param a The Vector3D object to be subtracted from the current
	     *          Vector3D object.
	     * @returns A new Vector3D object that is the difference between the
	     *          current Vector3D and the specified Vector3D object.
	     *
	     * @see away.geom.Vector3D#decrementBy()
	     */
	    subtract(a: Vector3D): Vector3D;
	    /**
	     * Returns a string representation of the current Vector3D object. The
	     * string contains the values of the x, y, and z properties.
	     */
	    toString(): string;
	}
	export = Vector3D;
	
}

declare module "awayjs-core/lib/library/AssetLibraryBundle" {
	import URLRequest = require("awayjs-core/lib/net/URLRequest");
	import AssetLibraryIterator = require("awayjs-core/lib/library/AssetLibraryIterator");
	import LoaderSession = require("awayjs-core/lib/library/LoaderSession");
	import LoaderContext = require("awayjs-core/lib/library/LoaderContext");
	import ConflictStrategyBase = require("awayjs-core/lib/library/ConflictStrategyBase");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
	import ParserBase = require("awayjs-core/lib/parsers/ParserBase");
	/**
	 * AssetLibraryBundle enforces a multiton pattern and is not intended to be instanced directly.
	 * Its purpose is to create a container for 3D data management, both before and after parsing.
	 * If you are interested in creating multiple library bundles, please use the <code>getInstance()</code> method.
	 */
	class AssetLibraryBundle extends EventDispatcher {
	    static _iInstances: Object;
	    private _loaderSessions;
	    private _strategy;
	    private _strategyPreference;
	    private _assets;
	    private _assetDictionary;
	    private _assetDictDirty;
	    private _loaderSessionsGarbage;
	    private _gcTimeoutIID;
	    private _onAssetRenameDelegate;
	    private _onAssetConflictResolvedDelegate;
	    private _onResourceCompleteDelegate;
	    private _onTextureSizeErrorDelegate;
	    private _onAssetCompleteDelegate;
	    private _onLoadErrorDelegate;
	    private _onParseErrorDelegate;
	    /**
	     * Creates a new <code>AssetLibraryBundle</code> object.
	     *
	     * @param me A multiton enforcer for the AssetLibraryBundle ensuring it cannnot be instanced.
	     */
	    constructor();
	    /**
	     * Returns an AssetLibraryBundle instance. If no key is given, returns the default bundle instance (which is
	     * similar to using the AssetLibraryBundle as a singleton.) To keep several separated library bundles,
	     * pass a string key to this method to define which bundle should be returned. This is
	     * referred to as using the AssetLibrary as a multiton.
	     *
	     * @param key Defines which multiton instance should be returned.
	     * @return An instance of the asset library
	     */
	    static getInstance(key?: string): AssetLibraryBundle;
	    /**
	     *
	     */
	    enableParser(parserClass: Object): void;
	    /**
	     *
	     */
	    enableParsers(parserClasses: Object[]): void;
	    /**
	     * Defines which strategy should be used for resolving naming conflicts, when two library
	     * assets are given the same name. By default, <code>ConflictStrategy.APPEND_NUM_SUFFIX</code>
	     * is used which means that a numeric suffix is appended to one of the assets. The
	     * <code>conflictPrecedence</code> property defines which of the two conflicting assets will
	     * be renamed.
	     *
	     * @see naming.ConflictStrategy
	     * @see AssetLibrary.conflictPrecedence
	     */
	    conflictStrategy: ConflictStrategyBase;
	    /**
	     * Defines which asset should have precedence when resolving a naming conflict between
	     * two assets of which one has just been renamed by the user or by a parser. By default
	     * <code>ConflictPrecedence.FAVOR_NEW</code> is used, meaning that the newly renamed
	     * asset will keep it's new name while the older asset gets renamed to not conflict.
	     *
	     * This property is ignored for conflict strategies that do not actually rename an
	     * asset automatically, such as ConflictStrategy.IGNORE and ConflictStrategy.THROW_ERROR.
	     *
	     * @see away.library.ConflictPrecedence
	     * @see away.library.ConflictStrategy
	     */
	    conflictPrecedence: string;
	    /**
	     * Create an AssetLibraryIterator instance that can be used to iterate over the assets
	     * in this asset library instance. The iterator can filter assets on asset type and/or
	     * namespace. A "null" filter value means no filter of that type is used.
	     *
	     * @param assetTypeFilter Asset type to filter on (from the AssetType enum class.) Use
	     * null to not filter on asset type.
	     * @param namespaceFilter Namespace to filter on. Use null to not filter on namespace.
	     * @param filterFunc Callback function to use when deciding whether an asset should be
	     * included in the iteration or not. This needs to be a function that takes a single
	     * parameter of type IAsset and returns a boolean where true means it should be included.
	     *
	     * @see away.library.AssetType
	     */
	    createIterator(assetTypeFilter?: string, namespaceFilter?: string, filterFunc?: any): AssetLibraryIterator;
	    /**
	     * Loads a file and (optionally) all of its dependencies.
	     *
	     * @param req The URLRequest object containing the URL of the file to be loaded.
	     * @param context An optional context object providing additional parameters for loading
	     * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
	     * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, LoaderSession will attempt to auto-detect the file type.
	     * @return A handle to the retrieved resource.
	     */
	    load(req: URLRequest, context?: LoaderContext, ns?: string, parser?: ParserBase): void;
	    /**
	     * Loads a resource from existing data in memory.
	     *
	     * @param data The data object containing all resource information.
	     * @param context An optional context object providing additional parameters for loading
	     * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
	     * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, LoaderSession will attempt to auto-detect the file type.
	     * @return A handle to the retrieved resource.
	     */
	    loadData(data: any, context?: LoaderContext, ns?: string, parser?: ParserBase): void;
	    getLoaderSession(): LoaderSession;
	    disposeLoaderSession(loader: LoaderSession): void;
	    /**
	     *
	     */
	    getAsset(name: string, ns?: string): IAsset;
	    getAllAssets(): Array<IAsset>;
	    /**
	     * Adds an asset to the asset library, first making sure that it's name is unique
	     * using the method defined by the <code>conflictStrategy</code> and
	     * <code>conflictPrecedence</code> properties.
	     */
	    addAsset(asset: IAsset): void;
	    /**
	     * Removes an asset from the library, and optionally disposes that asset by calling
	     * it's disposeAsset() method (which for most assets is implemented as a default
	     * version of that type's dispose() method.
	     *
	     * @param asset The asset which should be removed from this library.
	     * @param dispose Defines whether the assets should also be disposed.
	     */
	    removeAsset(asset: IAsset, dispose?: boolean): void;
	    /**
	     * Removes an asset which is specified using name and namespace.
	     *
	     * @param name The name of the asset to be removed.
	     * @param ns The namespace to which the desired asset belongs.
	     * @param dispose Defines whether the assets should also be disposed.
	     *
	     * @see away.library.AssetLibrary.removeAsset()
	     */
	    removeAssetByName(name: string, ns?: string, dispose?: boolean): IAsset;
	    /**
	     * Removes all assets from the asset library, optionally disposing them as they
	     * are removed.
	     *
	     * @param dispose Defines whether the assets should also be disposed.
	     */
	    removeAllAssets(dispose?: boolean): void;
	    /**
	     * Removes all assets belonging to a particular namespace (null for default)
	     * from the asset library, and optionall disposes them by calling their
	     * disposeAsset() method.
	     *
	     * @param ns The namespace from which all assets should be removed.
	     * @param dispose Defines whether the assets should also be disposed.
	     *
	     * @see away.library.AssetLibrary.removeAsset()
	     */
	    removeNamespaceAssets(ns?: string, dispose?: boolean): void;
	    private removeAssetFromDict(asset, autoRemoveEmptyNamespace?);
	    stopAllLoaderSessions(): void;
	    private rehashAssetDict();
	    /**
	     * Called when a an error occurs during loading.
	     */
	    private onLoadError(event);
	    /**
	     * Called when a an error occurs during parsing.
	     */
	    private onParseError(event);
	    private onAssetComplete(event);
	    private onTextureSizeError(event);
	    /**
	     * Called when the resource and all of its dependencies was retrieved.
	     */
	    private onResourceComplete(event);
	    private loaderSessionGC();
	    private killloaderSession(loader);
	    /**
	     * Called when unespected error occurs
	     */
	    private onAssetRename(event);
	    private onAssetConflictResolved(event);
	}
	export = AssetLibraryBundle;
	
}

declare module "awayjs-core/lib/library/AssetLibrary" {
	import URLRequest = require("awayjs-core/lib/net/URLRequest");
	import AssetLibraryBundle = require("awayjs-core/lib/library/AssetLibraryBundle");
	import AssetLibraryIterator = require("awayjs-core/lib/library/AssetLibraryIterator");
	import LoaderSession = require("awayjs-core/lib/library/LoaderSession");
	import LoaderContext = require("awayjs-core/lib/library/LoaderContext");
	import ConflictStrategyBase = require("awayjs-core/lib/library/ConflictStrategyBase");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import ParserBase = require("awayjs-core/lib/parsers/ParserBase");
	/**
	 * AssetLibrary enforces a singleton pattern and is not intended to be instanced.
	 * It's purpose is to allow access to the default library bundle through a set of static shortcut methods.
	 * If you are interested in creating multiple library bundles, please use the <code>getBundle()</code> method.
	 */
	class AssetLibrary {
	    /**
	     * Creates a new <code>AssetLibrary</code> object.
	     *
	     */
	    constructor();
	    /**
	     * Returns an AssetLibrary bundle instance. If no key is given, returns the default bundle (which is
	     * similar to using the AssetLibraryBundle as a singleton). To keep several separated library bundles,
	     * pass a string key to this method to define which bundle should be returned. This is
	     * referred to as using the AssetLibraryBundle as a multiton.
	     *
	     * @param key Defines which multiton instance should be returned.
	     * @return An instance of the asset library
	     */
	    static getBundle(key?: string): AssetLibraryBundle;
	    /**
	     *
	     */
	    static enableParser(parserClass: any): void;
	    /**
	     *
	     */
	    static enableParsers(parserClasses: Array<Object>): void;
	    /**
	     * Short-hand for conflictStrategy property on default asset library bundle.
	     *
	     * @see AssetLibraryBundle.conflictStrategy
	     */
	    static conflictStrategy: ConflictStrategyBase;
	    /**
	     * Short-hand for conflictPrecedence property on default asset library bundle.
	     *
	     * @see AssetLibraryBundle.conflictPrecedence
	     */
	    static conflictPrecedence: string;
	    /**
	     * Short-hand for createIterator() method on default asset library bundle.
	     *
	     * @see AssetLibraryBundle.createIterator()
	     */
	    static createIterator(assetTypeFilter?: string, namespaceFilter?: string, filterFunc?: any): AssetLibraryIterator;
	    /**
	     * Short-hand for load() method on default asset library bundle.
	     *
	     * @see AssetLibraryBundle.load()
	     */
	    static load(req: URLRequest, context?: LoaderContext, ns?: string, parser?: ParserBase): void;
	    /**
	     * Short-hand for loadData() method on default asset library bundle.
	     *
	     * @see AssetLibraryBundle.loadData()
	     */
	    static loadData(data: any, context?: LoaderContext, ns?: string, parser?: ParserBase): void;
	    static stopLoad(): void;
	    static getLoaderSession(): LoaderSession;
	    /**
	     * Short-hand for getAsset() method on default asset library bundle.
	     *
	     * @see AssetLibraryBundle.getAsset()
	     */
	    static getAsset(name: string, ns?: string): IAsset;
	    /**
	     * Short-hand for getAsset() method on default asset library bundle.
	     *
	     * @see AssetLibraryBundle.getAsset()
	     */
	    static getAllAssets(): Array<IAsset>;
	    /**
	     * Short-hand for addEventListener() method on default asset library bundle.
	     */
	    static addEventListener(type: string, listener: Function): void;
	    /**
	     * Short-hand for removeEventListener() method on default asset library bundle.
	     */
	    static removeEventListener(type: string, listener: Function): void;
	    /**
	     * Short-hand for hasEventListener() method on default asset library bundle.
	
	     public static hasEventListener(type:string):boolean
	     {
	        return AssetLibrary.getBundle().hasEventListener(type);
	    }
	
	     public static willTrigger(type:string):boolean
	     {
	        return getBundle().willTrigger(type);
	    }
	     */
	    /**
	     * Short-hand for addAsset() method on default asset library bundle.
	     *
	     * @see AssetLibraryBundle.addAsset()
	     */
	    static addAsset(asset: IAsset): void;
	    /**
	     * Short-hand for removeAsset() method on default asset library bundle.
	     *
	     * @param asset The asset which should be removed from the library.
	     * @param dispose Defines whether the assets should also be disposed.
	     *
	     * @see AssetLibraryBundle.removeAsset()
	     */
	    static removeAsset(asset: IAsset, dispose?: boolean): void;
	    /**
	     * Short-hand for removeAssetByName() method on default asset library bundle.
	     *
	     * @param name The name of the asset to be removed.
	     * @param ns The namespace to which the desired asset belongs.
	     * @param dispose Defines whether the assets should also be disposed.
	     *
	     * @see AssetLibraryBundle.removeAssetByName()
	     */
	    static removeAssetByName(name: string, ns?: string, dispose?: boolean): IAsset;
	    /**
	     * Short-hand for removeAllAssets() method on default asset library bundle.
	     *
	     * @param dispose Defines whether the assets should also be disposed.
	     *
	     * @see AssetLibraryBundle.removeAllAssets()
	     */
	    static removeAllAssets(dispose?: boolean): void;
	    /**
	     * Short-hand for removeNamespaceAssets() method on default asset library bundle.
	     *
	     * @see AssetLibraryBundle.removeNamespaceAssets()
	     */
	    static removeNamespaceAssets(ns?: string, dispose?: boolean): void;
	}
	export = AssetLibrary;
	
}

declare module "awayjs-core/lib/library/AssetLibraryIterator" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	class AssetLibraryIterator {
	    private _assets;
	    private _filtered;
	    private _idx;
	    constructor(assets: Array<IAsset>, assetTypeFilter: string, namespaceFilter: string, filterFunc: any);
	    currentAsset: IAsset;
	    numAssets: number;
	    next(): IAsset;
	    reset(): void;
	    setIndex(index: number): void;
	    private filter(assetTypeFilter, namespaceFilter, filterFunc);
	}
	export = AssetLibraryIterator;
	
}

declare module "awayjs-core/lib/library/ConflictPrecedence" {
	/**
	 * Enumaration class for precedence when resolving naming conflicts in the library.
	 *
	 * @see away.library.AssetLibrary.conflictPrecedence
	 * @see away.library.AssetLibrary.conflictStrategy
	 * @see away.library.naming.ConflictStrategy
	 */
	class ConflictPrecedence {
	    /**
	     * Signals that in a conflict, the previous owner of the conflicting name
	     * should be favored (and keep it's name) and that the newly renamed asset
	     * is reverted to a non-conflicting name.
	     */
	    static FAVOR_OLD: string;
	    /**
	     * Signales that in a conflict, the newly renamed asset is favored (and keeps
	     * it's newly defined name) and that the previous owner of that name gets
	     * renamed to a non-conflicting name.
	     */
	    static FAVOR_NEW: string;
	}
	export = ConflictPrecedence;
	
}

declare module "awayjs-core/lib/library/ConflictStrategy" {
	import ConflictStrategyBase = require("awayjs-core/lib/library/ConflictStrategyBase");
	/**
	 * Enumeration class for bundled conflict strategies. Set one of these values (or an
	 * instance of a self-defined sub-class of ConflictStrategyBase) to the conflictStrategy
	 * property on an AssetLibrary to define how that library resolves naming conflicts.
	 *
	 * The value of the <code>AssetLibrary.conflictPrecedence</code> property defines which
	 * of the conflicting assets will get to keep it's name, and which is renamed (if any.)
	 *
	 * @see away.library.AssetLibrary.conflictStrategy
	 * @see away.library.naming.ConflictStrategyBase
	 */
	class ConflictStrategy {
	    /**
	     * Specifies that in case of a naming conflict, one of the assets will be renamed and
	     * a numeric suffix appended to the base name.
	     */
	    static APPEND_NUM_SUFFIX: ConflictStrategyBase;
	    /**
	     * Specifies that naming conflicts should be ignored. This is not recommended in most
	     * cases, unless it can be 100% guaranteed that the application does not cause naming
	     * conflicts in the library (i.e. when an app-level system is in place to prevent this.)
	     */
	    static IGNORE: ConflictStrategyBase;
	    /**
	     * Specifies that an error should be thrown if a naming conflict is discovered. Use this
	     * to be 100% sure that naming conflicts never occur unnoticed, and when it's undesirable
	     * to have the library automatically rename assets to avoid such conflicts.
	     */
	    static THROW_ERROR: ConflictStrategyBase;
	    constructor(include?: ConflictStrategyBase);
	}
	export = ConflictStrategy;
	
}

declare module "awayjs-core/lib/library/ConflictStrategyBase" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	/**
	 * Abstract base class for naming conflict resolution classes. Extend this to create a
	 * strategy class which the asset library can use to resolve asset naming conflicts, or
	 * use one of the bundled concrete strategy classes:
	 *
	 * <ul>
	 *   <li>IgnoreConflictStrategy (ConflictStrategy.IGNORE)</li>
	 *   <li>ErrorConflictStrategy (ConflictStrategy.THROW_ERROR)</li>
	 *   <li>NumSuffixConflictStrategy (ConflictStrategy.APPEND_NUM_SUFFIX)</li>
	 * </ul>
	 *
	 * @see away.library.AssetLibrary.conflictStrategy
	 * @see away.library.ConflictStrategy
	 * @see away.library.IgnoreConflictStrategy
	 * @see away.library.ErrorConflictStrategy
	 * @see away.library.NumSuffixConflictStrategy
	 */
	class ConflictStrategyBase {
	    constructor();
	    /**
	     * Resolve a naming conflict between two assets. Must be implemented by concrete strategy
	     * classes.
	     */
	    resolveConflict(changedAsset: IAsset, oldAsset: IAsset, assetsDictionary: Object, precedence: string): void;
	    /**
	     * Create instance of this conflict strategy. Used internally by the AssetLibrary to
	     * make sure the same strategy instance is not used in all AssetLibrary instances, which
	     * would break any state caching that happens inside the strategy class.
	     */
	    create(): ConflictStrategyBase;
	    /**
	     * Provided as a convenience method for all conflict strategy classes, as a way to finalize
	     * the conflict resolution by applying the new names and dispatching the correct events.
	     */
	    _pUpdateNames(ns: string, nonConflictingName: string, oldAsset: IAsset, newAsset: IAsset, assetsDictionary: Object, precedence: string): void;
	}
	export = ConflictStrategyBase;
	
}

declare module "awayjs-core/lib/library/ErrorConflictStrategy" {
	import ConflictStrategyBase = require("awayjs-core/lib/library/ConflictStrategyBase");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	class ErrorConflictStrategy extends ConflictStrategyBase {
	    constructor();
	    resolveConflict(changedAsset: IAsset, oldAsset: IAsset, assetsDictionary: Object, precedence: string): void;
	    create(): ConflictStrategyBase;
	}
	export = ErrorConflictStrategy;
	
}

declare module "awayjs-core/lib/library/IAsset" {
	import IEventDispatcher = require("awayjs-core/lib/events/IEventDispatcher");
	interface IAsset extends IEventDispatcher {
	    /**
	     *
	     */
	    name: string;
	    /**
	     *
	     */
	    id: number;
	    /**
	     *
	     */
	    assetNamespace: string;
	    /**
	     *
	     */
	    assetType: string;
	    /**
	     *
	     */
	    assetFullPath: Array<string>;
	    /**
	     *
	     * @param name
	     * @param ns
	     */
	    assetPathEquals(name: string, ns: string): boolean;
	    /**
	     *
	     */
	    dispose(): any;
	    /**
	     *
	     * @param IAssetClass
	     */
	    isAsset(IAssetClass: any): boolean;
	    /**
	     *
	     * @param name
	     * @param ns
	     * @param overrideOriginal
	     */
	    resetAssetPath(name: string, ns: string, overrideOriginal?: boolean): void;
	    _clearInterfaces(): any;
	}
	export = IAsset;
	
}

declare module "awayjs-core/lib/library/IDUtil" {
	class IDUtil {
	    /**
	     *  @private
	     *  Char codes for 0123456789ABCDEF
	     */
	    private static ALPHA_CHAR_CODES;
	    /**
	     *  Generates a UID (unique identifier) based on ActionScript's
	     *  pseudo-random number generator and the current time.
	     *
	     *  <p>The UID has the form
	     *  <code>"XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"</code>
	     *  where X is a hexadecimal digit (0-9, A-F).</p>
	     *
	     *  <p>This UID will not be truly globally unique; but it is the best
	     *  we can do without player support for UID generation.</p>
	     *
	     *  @return The newly-generated UID.
	     *
	     *  @langversion 3.0
	     *  @playerversion Flash 9
	     *  @playerversion AIR 1.1
	     *  @productversion Flex 3
	     */
	    static createUID(): string;
	}
	export = IDUtil;
	
}

declare module "awayjs-core/lib/library/IAssetClass" {
	interface IAssetClass {
	    assetType: string;
	}
	export = IAssetClass;
	
}

declare module "awayjs-core/lib/library/IgnoreConflictStrategy" {
	import ConflictStrategyBase = require("awayjs-core/lib/library/ConflictStrategyBase");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	class IgnoreConflictStrategy extends ConflictStrategyBase {
	    constructor();
	    resolveConflict(changedAsset: IAsset, oldAsset: IAsset, assetsDictionary: Object, precedence: string): void;
	    create(): ConflictStrategyBase;
	}
	export = IgnoreConflictStrategy;
	
}

declare module "awayjs-core/lib/library/IWrapperClass" {
	import IAssetClass = require("awayjs-core/lib/library/IAssetClass");
	interface IWrapperClass {
	    assetClass: IAssetClass;
	}
	export = IWrapperClass;
	
}

declare module "awayjs-core/lib/library/LoaderContext" {
	class LoaderContext {
	    static UNDEFINED: number;
	    static SINGLEPASS_MATERIALS: number;
	    static MULTIPASS_MATERIALS: number;
	    private _includeDependencies;
	    private _dependencyBaseUrl;
	    private _embeddedDataByUrl;
	    private _remappedUrls;
	    private _materialMode;
	    private _overrideAbsPath;
	    private _overrideFullUrls;
	    /**
	     * LoaderContext provides configuration for the LoaderSession load() and parse() operations.
	     * Use it to configure how (and if) dependencies are loaded, or to map dependency URLs to
	     * embedded data.
	     *
	     * @see away.loading.LoaderSession
	     */
	    constructor(includeDependencies?: boolean, dependencyBaseUrl?: string);
	    /**
	     * Defines whether dependencies (all files except the one at the URL given to the load() or
	     * parseData() operations) should be automatically loaded. Defaults to true.
	     */
	    includeDependencies: boolean;
	    /**
	     * MaterialMode defines, if the Parser should create SinglePass or MultiPass Materials
	     * Options:
	     * 0 (Default / undefined) - All Parsers will create SinglePassMaterials, but the AWD2.1parser will create Materials as they are defined in the file
	     * 1 (Force SinglePass) - All Parsers create SinglePassMaterials
	     * 2 (Force MultiPass) - All Parsers will create MultiPassMaterials
	     *
	     */
	    materialMode: number;
	    /**
	     * A base URL that will be prepended to all relative dependency URLs found in a loaded resource.
	     * Absolute paths will not be affected by the value of this property.
	     */
	    dependencyBaseUrl: string;
	    /**
	     * Defines whether absolute paths (defined as paths that begin with a "/") should be overridden
	     * with the dependencyBaseUrl defined in this context. If this is true, and the base path is
	     * "base", /path/to/asset.jpg will be resolved as base/path/to/asset.jpg.
	     */
	    overrideAbsolutePaths: boolean;
	    /**
	     * Defines whether "full" URLs (defined as a URL that includes a scheme, e.g. http://) should be
	     * overridden with the dependencyBaseUrl defined in this context. If this is true, and the base
	     * path is "base", http://example.com/path/to/asset.jpg will be resolved as base/path/to/asset.jpg.
	     */
	    overrideFullURLs: boolean;
	    /**
	     * Map a URL to another URL, so that files that are referred to by the original URL will instead
	     * be loaded from the new URL. Use this when your file structure does not match the one that is
	     * expected by the loaded file.
	     *
	     * @param originalUrl The original URL which is referenced in the loaded resource.
	     * @param newUrl The URL from which away.should load the resource instead.
	     *
	     * @see mapUrlToData()
	     */
	    mapUrl(originalUrl: string, newUrl: string): void;
	    /**
	     * Map a URL to embedded data, so that instead of trying to load a dependency from the URL at
	     * which it's referenced, the dependency data will be retrieved straight from the memory instead.
	     *
	     * @param originalUrl The original URL which is referenced in the loaded resource.
	     * @param data The embedded data. Can be ByteArray or a class which can be used to create a bytearray.
	     */
	    mapUrlToData(originalUrl: string, data: any): void;
	    /**
	     * @private
	     * Defines whether embedded data has been mapped to a particular URL.
	     */
	    _iHasDataForUrl(url: string): boolean;
	    /**
	     * @private
	     * Returns embedded data for a particular URL.
	     */
	    _iGetDataForUrl(url: string): any;
	    /**
	     * @private
	     * Defines whether a replacement URL has been mapped to a particular URL.
	     */
	    _iHasMappingForUrl(url: string): boolean;
	    /**
	     * @private
	     * Returns new (replacement) URL for a particular original URL.
	     */
	    _iGetRemappedUrl(originalUrl: string): string;
	}
	export = LoaderContext;
	
}

declare module "awayjs-core/lib/library/LoaderSession" {
	import LoaderContext = require("awayjs-core/lib/library/LoaderContext");
	import URLRequest = require("awayjs-core/lib/net/URLRequest");
	import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
	import ParserBase = require("awayjs-core/lib/parsers/ParserBase");
	import ResourceDependency = require("awayjs-core/lib/parsers/ResourceDependency");
	/**
	 * Dispatched when any asset finishes parsing. Also see specific events for each
	 * individual asset type (meshes, materials et c.)
	 *
	 * @eventType away.events.AssetEvent
	 */
	/**
	 * Dispatched when a full resource (including dependencies) finishes loading.
	 *
	 * @eventType away.events.LoaderEvent
	 */
	/**
	 * Dispatched when a single dependency (which may be the main file of a resource)
	 * finishes loading.
	 *
	 * @eventType away.events.LoaderEvent
	 */
	/**
	 * Dispatched when an error occurs during loading. I
	 *
	 * @eventType away.events.LoaderEvent
	 */
	/**
	 * Dispatched when an error occurs during parsing.
	 *
	 * @eventType away.events.ParserEvent
	 */
	/**
	 * Dispatched when an image asset dimensions are not a power of 2
	 *
	 * @eventType away.events.AssetEvent
	 */
	/**
	 * LoaderSession can load any file format that away.supports (or for which a third-party parser
	 * has been plugged in) and it's dependencies. Events are dispatched when assets are encountered
	 * and for when the resource (or it's dependencies) have been loaded.
	 *
	 * The LoaderSession will not make assets available in any other way than through the dispatched
	 * events. To store assets and make them available at any point from any module in an application,
	 * use the AssetLibrary to load and manage assets.
	 *
	 * @see away.library.AssetLibrary
	 */
	class LoaderSession extends EventDispatcher {
	    private _context;
	    private _uri;
	    private _materialMode;
	    private _errorHandlers;
	    private _parseErrorHandlers;
	    private _stack;
	    private _baseDependency;
	    private _currentDependency;
	    private _namespace;
	    private _onReadyForDependenciesDelegate;
	    private _onParseCompleteDelegate;
	    private _onParseErrorDelegate;
	    private _onLoadCompleteDelegate;
	    private _onLoadErrorDelegate;
	    private _onTextureSizeErrorDelegate;
	    private _onAssetCompleteDelegate;
	    private static _parsers;
	    /**
	     * Enables a specific parser.
	     * When no specific parser is set for a loading/parsing opperation,
	     * loader3d can autoselect the correct parser to use.
	     * A parser must have been enabled, to be considered when autoselecting the parser.
	     *
	     * @param parser The parser class to enable.
	     *
	     * @see away.parsers.Parsers
	     */
	    static enableParser(parser: any): void;
	    /**
	     * Enables a list of parsers.
	     * When no specific parser is set for a loading/parsing opperation,
	     * LoaderSession can autoselect the correct parser to use.
	     * A parser must have been enabled, to be considered when autoselecting the parser.
	     *
	     * @param parsers A Vector of parser classes to enable.
	     * @see away.parsers.Parsers
	     */
	    static enableParsers(parsers: Array<Object>): void;
	    /**
	     * Returns the base dependency of the loader
	     */
	    baseDependency: ResourceDependency;
	    /**
	     * Create a new ResourceLoadSession object.
	     */
	    constructor(materialMode?: number);
	    /**
	     * Loads a file and (optionally) all of its dependencies.
	     *
	     * @param req The URLRequest object containing the URL of the file to be loaded.
	     * @param context An optional context object providing additional parameters for loading
	     * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
	     * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, LoaderSession will attempt to auto-detect the file type.
	     */
	    load(req: URLRequest, context?: LoaderContext, ns?: string, parser?: ParserBase): void;
	    /**
	     * Loads a resource from already loaded data.
	     *
	     * @param data The data object containing all resource information.
	     * @param context An optional context object providing additional parameters for loading
	     * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
	     * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, LoaderSession will attempt to auto-detect the file type.
	     */
	    loadData(data: any, id: string, context?: LoaderContext, ns?: string, parser?: ParserBase): void;
	    /**
	     * Recursively retrieves the next to-be-loaded and parsed dependency on the stack, or pops the list off the
	     * stack when complete and continues on the top set.
	     * @param parser The parser that will translate the data into a usable resource.
	     */
	    private retrieveNext(parser?);
	    /**
	     * Retrieves a single dependency.
	     * @param parser The parser that will translate the data into a usable resource.
	     */
	    private retrieveDependency(dependency);
	    private joinUrl(base, end);
	    private resolveDependencyUrl(dependency);
	    private retrieveParserDependencies();
	    private resolveParserDependencies();
	    /**
	     * Called when a single dependency loading failed, and pushes further dependencies onto the stack.
	     * @param event
	     */
	    private onLoadError(event);
	    /**
	     * Called when a dependency parsing failed, and dispatches a <code>ParserEvent.PARSE_ERROR</code>
	     * @param event
	     */
	    private onParseError(event);
	    private onAssetComplete(event);
	    private onReadyForDependencies(event);
	    /**
	     * Called when a single dependency was parsed, and pushes further dependencies onto the stack.
	     * @param event
	     */
	    private onLoadComplete(event);
	    /**
	     * Called when parsing is complete.
	     */
	    private onParseComplete(event);
	    /**
	     * Called when an image is too large or it's dimensions are not a power of 2
	     * @param event
	     */
	    private onTextureSizeError(event);
	    private addEventListeners(loader);
	    private removeEventListeners(loader);
	    stop(): void;
	    private dispose();
	    /**
	     * @private
	     * This method is used by other loader classes (e.g. Loader3D and AssetLibraryBundle) to
	     * add error event listeners to the LoaderSession instance. This system is used instead of
	     * the regular EventDispatcher system so that the AssetLibrary error handler can be sure
	     * that if hasEventListener() returns true, it's client code that's listening for the
	     * event. Secondly, functions added as error handler through this custom method are
	     * expected to return a boolean value indicating whether the event was handled (i.e.
	     * whether they in turn had any client code listening for the event.) If no handlers
	     * return true, the LoaderSession knows that the event wasn't handled and will throw an RTE.
	     */
	    _iAddParseErrorHandler(handler: any): void;
	    _iAddErrorHandler(handler: any): void;
	    /**
	     * Guesses the parser to be used based on the file contents.
	     * @param data The data to be parsed.
	     * @param uri The url or id of the object to be parsed.
	     * @return An instance of the guessed parser.
	     */
	    private getParserFromData(data);
	    /**
	     * Initiates parsing of the loaded dependency.
	     *
	     * @param The dependency to be parsed.
	     */
	    private parseDependency(dependency);
	    /**
	     * Guesses the parser to be used based on the file extension.
	     * @return An instance of the guessed parser.
	     */
	    private getParserFromSuffix(url);
	}
	export = LoaderSession;
	
}

declare module "awayjs-core/lib/library/NumSuffixConflictStrategy" {
	import ConflictStrategyBase = require("awayjs-core/lib/library/ConflictStrategyBase");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	class NumSuffixConflictStrategy extends ConflictStrategyBase {
	    private _separator;
	    private _next_suffix;
	    constructor(separator?: string);
	    resolveConflict(changedAsset: IAsset, oldAsset: IAsset, assetsDictionary: Object, precedence: string): void;
	    create(): ConflictStrategyBase;
	}
	export = NumSuffixConflictStrategy;
	
}

declare module "awayjs-core/lib/managers/AudioManager" {
	import IAudioChannel = require("awayjs-core/lib/managers/IAudioChannel");
	class AudioManager {
	    static getChannel(byteLength: number): IAudioChannel;
	}
	export = AudioManager;
	
}

declare module "awayjs-core/lib/managers/IAudioChannel" {
	interface IAudioChannel {
	    duration: number;
	    currentTime: number;
	    volume: number;
	    isPlaying(): boolean;
	    isLooping(): boolean;
	    isDecoding(): boolean;
	    play(buffer: ArrayBuffer, offset?: number, loop?: boolean, id?: number): any;
	    stop(): any;
	}
	export = IAudioChannel;
	
}

declare module "awayjs-core/lib/managers/IAudioChannelClass" {
	import IAudioChannel = require("awayjs-core/lib/managers/IAudioChannel");
	interface IAudioChannelClass {
	    maxChannels: number;
	    _channels: Array<IAudioChannel>;
	    /**
	     *
	     */
	    new (): IAudioChannel;
	}
	export = IAudioChannelClass;
	
}

declare module "awayjs-core/lib/managers/StreamingAudioChannel" {
	class StreamingAudioChannel {
	    static maxChannels: number;
	    static _channels: Array<StreamingAudioChannel>;
	    private _sourceOpenDelegate;
	    private _updateEndDelegate;
	    private _sourceBuffer;
	    private _sourceDirty;
	    private _isPlaying;
	    private _isLooping;
	    private _isQueuing;
	    private _isOpening;
	    private _buffer;
	    private _offset;
	    private _volume;
	    private _startTime;
	    private _duration;
	    private _audio;
	    private _mediaSource;
	    private _urlString;
	    duration: number;
	    currentTime: number;
	    volume: number;
	    isPlaying(): boolean;
	    isLooping(): boolean;
	    isDecoding(): boolean;
	    constructor();
	    play(buffer: ArrayBuffer, offset?: number, loop?: boolean): void;
	    stop(): void;
	    private _sourceOpen(event);
	    private _queueBuffer();
	    private _updateEnd(event);
	    private _onTimeUpdate(event);
	    private _updateSource();
	    private _disposeSource();
	}
	export = StreamingAudioChannel;
	
}

declare module "awayjs-core/lib/managers/WebAudioChannel" {
	class WebAudioChannel {
	    static maxChannels: number;
	    static _channels: Array<WebAudioChannel>;
	    static _decodeCache: Object;
	    static _errorCache: Object;
	    private static _audioCtx;
	    private _audioCtx;
	    private _gainNode;
	    private _source;
	    private _isPlaying;
	    private _isLooping;
	    private _isDecoding;
	    private _currentTime;
	    private _id;
	    private _volume;
	    private _startTime;
	    private _duration;
	    private _onEndedDelegate;
	    duration: number;
	    currentTime: number;
	    volume: number;
	    isPlaying(): boolean;
	    isLooping(): boolean;
	    isDecoding(): boolean;
	    constructor();
	    play(buffer: ArrayBuffer, offset?: number, loop?: boolean, id?: number): void;
	    stop(): void;
	    _onDecodeComplete(buffer: any): void;
	    _onError(event: any): void;
	    private _onEnded(event);
	    private _disposeSource();
	}
	export = WebAudioChannel;
	
}

declare module "awayjs-core/lib/net/CrossDomainPolicy" {
	class CrossDomainPolicy {
	    static ANONYMOUS: string;
	    static USE_CREDENTIALS: string;
	}
	export = CrossDomainPolicy;
	
}

declare module "awayjs-core/lib/net/URLLoader" {
	import URLRequest = require("awayjs-core/lib/net/URLRequest");
	import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
	/**
	 * The URLLoader is used to load a single file, as part of a resource.
	 *
	 * While URLLoader can be used directly, e.g. to create a third-party asset
	 * management system, it's recommended to use any of the classes Loader3D, LoaderSession
	 * and AssetLibrary instead in most cases.
	 *
	 * @see LoaderSession
	 * @see away.library.AssetLibrary
	 */
	class URLLoader extends EventDispatcher {
	    private _XHR;
	    private _bytesLoaded;
	    private _bytesTotal;
	    private _dataFormat;
	    private _loadError;
	    private _request;
	    private _data;
	    private _loadStartEvent;
	    private _loadErrorEvent;
	    private _loadCompleteEvent;
	    private _progressEvent;
	    /**
	     * Creates a new URLLoader object.
	     */
	    constructor();
	    /**
	     *
	     */
	    url: string;
	    /**
	     *
	     */
	    data: any;
	    /**
	     *
	     * URLLoaderDataFormat.BINARY
	     * URLLoaderDataFormat.TEXT
	     * URLLoaderDataFormat.VARIABLES
	     *
	     * @param format
	     */
	    dataFormat: string;
	    /**
	     *
	     * @returns {number}
	     */
	    bytesLoaded: number;
	    /**
	     *
	     * @returns {number}
	     */
	    bytesTotal: number;
	    /**
	     * Load a resource from a file.
	     *
	     * @param request The URLRequest object containing the URL of the object to be loaded.
	     */
	    load(request: URLRequest): void;
	    isSupported(): boolean;
	    /**
	     *
	     */
	    close(): void;
	    /**
	     *
	     */
	    dispose(): void;
	    /**
	     *
	     * @param xhr
	     * @param responseType
	     */
	    private setResponseType(xhr, responseType);
	    /**
	     *
	     * @param request {URLRequest}
	     */
	    private getRequest(request);
	    /**
	     *
	     * @param request {URLRequest}
	     */
	    private postRequest(request);
	    /**
	     *
	     * @param error {XMLHttpRequestException}
	     */
	    private handleXmlHttpRequestException(error);
	    /**
	     *
	     */
	    private initXHR();
	    /**
	     *
	     */
	    private disposeXHR();
	    /**
	     *
	     * @param source
	     */
	    decodeURLVariables(source: string): Object;
	    /**
	     * When XHR state changes
	     * @param event
	     */
	    private onReadyStateChange(event);
	    /**
	     * When the request has completed, regardless of whether or not it was successful.
	     * @param event
	     */
	    private onLoadEnd(event);
	    /**
	     * When the author specified timeout has passed before the request could complete.
	     * @param event
	     */
	    private onTimeOut(event);
	    /**
	     * When the request has been aborted, either by invoking the abort() method or navigating away from the page.
	     * @param event
	     */
	    private onAbort(event);
	    /**
	     * While loading and sending data.
	     * @param event
	     */
	    private onProgress(event);
	    /**
	     * When the request starts.
	     * @param event
	     */
	    private onLoadStart(event);
	    /**
	     * When the request has successfully completed.
	     * @param event
	     */
	    private onLoadComplete(event);
	    /**
	     * When the request has failed. ( due to network issues ).
	     * @param event
	     */
	    private onLoadError(event);
	}
	export = URLLoader;
	
}

declare module "awayjs-core/lib/net/URLLoaderDataFormat" {
	class URLLoaderDataFormat {
	    /**
	     * TEXT
	     * @type {string}
	     */
	    static TEXT: string;
	    /**
	     * Variables / Value Pairs
	     * @type {string}
	     */
	    static VARIABLES: string;
	    /**
	     *
	     * @type {string}
	     */
	    static BLOB: string;
	    /**
	     *
	     * @type {string}
	     */
	    static ARRAY_BUFFER: string;
	    /**
	     *
	     * @type {string}
	     */
	    static BINARY: string;
	}
	export = URLLoaderDataFormat;
	
}

declare module "awayjs-core/lib/net/URLRequest" {
	class URLRequest {
	    /**
	     * Object containing data to be transmited with URL Request ( URL Variables / binary / string )
	     *
	     */
	    data: any;
	    /**
	     *
	     * away.net.URLRequestMethod.GET
	     * away.net.URLRequestMethod.POST
	     *
	     * @type {string}
	     */
	    method: string;
	    /**
	     * Use asynchronous XMLHttpRequest
	     * @type {boolean}
	     */
	    async: boolean;
	    /**
	     *
	     */
	    private _url;
	    /**
	
	     * @param url
	     */
	    constructor(url?: string);
	    /**
	     *
	     * @returns {string}
	     */
	    /**
	     *
	     * @param value
	     */
	    url: string;
	    /**
	     * dispose
	     */
	    dispose(): void;
	}
	export = URLRequest;
	
}

declare module "awayjs-core/lib/net/URLRequestMethod" {
	class URLRequestMethod {
	    /**
	     *
	     * @type {string}
	     */
	    static POST: string;
	    /**
	     *
	     * @type {string}
	     */
	    static GET: string;
	}
	export = URLRequestMethod;
	
}

declare module "awayjs-core/lib/parsers/Image2DParser" {
	import ParserBase = require("awayjs-core/lib/parsers/ParserBase");
	/**
	 * Image2DParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
	 * a loader object, it wraps it in a BitmapDataResource so resource management can happen consistently without
	 * exception cases.
	 */
	class Image2DParser extends ParserBase {
	    private _startedParsing;
	    private _doneParsing;
	    private _loadingImage;
	    private _htmlImageElement;
	    /**
	     * Creates a new Image2DParser object.
	     * @param uri The url or id of the data or file to be parsed.
	     * @param extra The holder for extra contextual data that the parser might need.
	     */
	    constructor();
	    /**
	     * Indicates whether or not a given file extension is supported by the parser.
	     * @param extension The file extension of a potential file to be parsed.
	     * @return Whether or not the given file type is supported.
	     */
	    static supportsType(extension: string): boolean;
	    /**
	     * Tests whether a data block can be parsed by the parser.
	     * @param data The data block to potentially be parsed.
	     * @return Whether or not the given data is supported.
	     */
	    static supportsData(data: any): boolean;
	    /**
	     * @inheritDoc
	     */
	    _pProceedParsing(): boolean;
	    onLoadComplete(event: any): void;
	}
	export = Image2DParser;
	
}

declare module "awayjs-core/lib/net/URLVariables" {
	class URLVariables {
	    private _variables;
	    /**
	     *
	     * @param source
	     */
	    constructor(source?: string);
	    /**
	     *
	     * @param source
	     */
	    decode(source: string): void;
	    /**
	     *
	     * @returns {string}
	     */
	    toString(): string;
	    /**
	     *
	     * @returns {Object}
	     */
	    /**
	     *
	     * @returns {Object}
	     */
	    variables: Object;
	    /**
	     *
	     * @returns {Object}
	     */
	    formData: FormData;
	}
	export = URLVariables;
	
}

declare module "awayjs-core/lib/parsers/ImageCubeParser" {
	import ParserBase = require("awayjs-core/lib/parsers/ParserBase");
	import ResourceDependency = require("awayjs-core/lib/parsers/ResourceDependency");
	/**
	 * ImageCubeParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
	 * a loader object, it wraps it in a BitmapImage2DResource so resource management can happen consistently without
	 * exception cases.
	 */
	class ImageCubeParser extends ParserBase {
	    private static posX;
	    private static negX;
	    private static posY;
	    private static negY;
	    private static posZ;
	    private static negZ;
	    private _imgDependencyDictionary;
	    /**
	     * Creates a new ImageCubeParser object.
	     * @param uri The url or id of the data or file to be parsed.
	     * @param extra The holder for extra contextual data that the parser might need.
	     */
	    constructor();
	    /**
	     * Indicates whether or not a given file extension is supported by the parser.
	     * @param extension The file extension of a potential file to be parsed.
	     * @return Whether or not the given file type is supported.
	     */
	    static supportsType(extension: string): boolean;
	    /**
	     * Tests whether a data block can be parsed by the parser.
	     * @param data The data block to potentially be parsed.
	     * @return Whether or not the given data is supported.
	     */
	    static supportsData(data: any): boolean;
	    /**
	     * @inheritDoc
	     */
	    _iResolveDependency(resourceDependency: ResourceDependency): void;
	    /**
	     * @inheritDoc
	     */
	    _iResolveDependencyFailure(resourceDependency: ResourceDependency): void;
	    /**
	     * @inheritDoc
	     */
	    _pProceedParsing(): boolean;
	    private _validateCubeData();
	    private _getBitmapImage2D(name);
	}
	export = ImageCubeParser;
	
}

declare module "awayjs-core/lib/parsers/ParserBase" {
	import BitmapImage2D = require("awayjs-core/lib/data/BitmapImage2D");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import URLRequest = require("awayjs-core/lib/net/URLRequest");
	import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
	import TimerEvent = require("awayjs-core/lib/events/TimerEvent");
	import ResourceDependency = require("awayjs-core/lib/parsers/ResourceDependency");
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	/**
	 * <code>ParserBase</code> provides an abstract base class for objects that convert blocks of data to data structures
	 * supported by away.
	 *
	 * If used by <code>LoaderSession</code> to automatically determine the parser type, two public static methods should
	 * be implemented, with the following signatures:
	 *
	 * <code>public static supportsType(extension : string) : boolean</code>
	 * Indicates whether or not a given file extension is supported by the parser.
	 *
	 * <code>public static supportsData(data : *) : boolean</code>
	 * Tests whether a data block can be parsed by the parser.
	 *
	 * Furthermore, for any concrete subtype, the method <code>initHandle</code> should be overridden to immediately
	 * create the object that will contain the parsed data. This allows <code>ResourceManager</code> to return an object
	 * handle regardless of whether the object was loaded or not.
	 *
	 * @see LoaderSession
	 */
	class ParserBase extends EventDispatcher {
	    _isParsing: boolean;
	    _iFileName: string;
	    private _dataFormat;
	    private _data;
	    private _frameLimit;
	    private _lastFrameTime;
	    private _pOnIntervalDelegate;
	    _pContent: IAsset;
	    static supportsType(extension: string): boolean;
	    private _dependencies;
	    private _parsingPaused;
	    private _parsingComplete;
	    private _parsingFailure;
	    private _timer;
	    private _materialMode;
	    /**
	     * Returned by <code>proceedParsing</code> to indicate no more parsing is needed.
	     */
	    static PARSING_DONE: boolean;
	    /**
	     * Returned by <code>proceedParsing</code> to indicate more parsing is needed, allowing asynchronous parsing.
	     */
	    static MORE_TO_PARSE: boolean;
	    content: IAsset;
	    /**
	     * Creates a new ParserBase object
	     * @param format The data format of the file data to be parsed. Can be either <code>ParserDataFormat.BINARY</code> or <code>ParserDataFormat.PLAIN_TEXT</code>, and should be provided by the concrete subtype.
	     *
	     * @see away.loading.parsers.ParserDataFormat
	     */
	    constructor(format: string);
	    /**
	     * Validates a bitmapData loaded before assigning to a default BitmapMaterial
	     */
	    isBitmapImage2DValid(bitmapImage2D: BitmapImage2D): boolean;
	    parsingFailure: boolean;
	    parsingPaused: boolean;
	    parsingComplete: boolean;
	    materialMode: number;
	    data: any;
	    /**
	     * The data format of the file data to be parsed. Options are <code>URLLoaderDataFormat.BINARY</code>, <code>URLLoaderDataFormat.ARRAY_BUFFER</code>, <code>URLLoaderDataFormat.BLOB</code>, <code>URLLoaderDataFormat.VARIABLES</code> or <code>URLLoaderDataFormat.TEXT</code>.
	     */
	    dataFormat: string;
	    /**
	     * Parse data (possibly containing bytearry, plain text or BitmapAsset) asynchronously, meaning that
	     * the parser will periodically stop parsing so that the AVM may proceed to the
	     * next frame.
	     *
	     * @param data The untyped data object in which the loaded data resides.
	     * @param frameLimit number of milliseconds of parsing allowed per frame. The
	     * actual time spent on a frame can exceed this number since time-checks can
	     * only be performed between logical sections of the parsing procedure.
	     */
	    parseAsync(data: any, frameLimit?: number): void;
	    /**
	     * A list of dependencies that need to be loaded and resolved for the object being parsed.
	     */
	    dependencies: Array<ResourceDependency>;
	    /**
	     * Resolve a dependency when it's loaded. For example, a dependency containing an ImageResource would be assigned
	     * to a Mesh instance as a BitmapMaterial, a scene graph object would be added to its intended parent. The
	     * dependency should be a member of the dependencies property.
	     *
	     * @param resourceDependency The dependency to be resolved.
	     */
	    _iResolveDependency(resourceDependency: ResourceDependency): void;
	    /**
	     * Resolve a dependency loading failure. Used by parser to eventually provide a default map
	     *
	     * @param resourceDependency The dependency to be resolved.
	     */
	    _iResolveDependencyFailure(resourceDependency: ResourceDependency): void;
	    /**
	     * Resolve a dependency name
	     *
	     * @param resourceDependency The dependency to be resolved.
	     */
	    _iResolveDependencyName(resourceDependency: ResourceDependency, asset: IAsset): string;
	    _iResumeParsing(): void;
	    _pFinalizeAsset(asset: IAsset, name?: string): void;
	    /**
	     * Parse the next block of data.
	     * @return Whether or not more data needs to be parsed. Can be <code>ParserBase.ParserBase.PARSING_DONE</code> or
	     * <code>ParserBase.ParserBase.MORE_TO_PARSE</code>.
	     */
	    _pProceedParsing(): boolean;
	    _pDieWithError(message?: string): void;
	    _pAddDependency(id: string, req: URLRequest, retrieveAsRawData?: boolean, data?: any, suppressErrorEvents?: boolean, sub_id?: number): ResourceDependency;
	    _pPauseAndRetrieveDependencies(): void;
	    _pPauseParsing(): void;
	    /**
	     * Tests whether or not there is still time left for parsing within the maximum allowed time frame per session.
	     * @return True if there is still time left, false if the maximum allotted time was exceeded and parsing should be interrupted.
	     */
	    _pHasTime(): boolean;
	    /**
	     * Called when the parsing pause interval has passed and parsing can proceed.
	     */
	    _pOnInterval(event?: TimerEvent): void;
	    /**
	     * Initializes the parsing of data.
	     * @param frameLimit The maximum duration of a parsing session.
	     */
	    _pStartParsing(frameLimit: number): void;
	    /**
	     * Finish parsing the data.
	     */
	    _pFinishParsing(): void;
	    /**
	     *
	     * @returns {string}
	     * @private
	     */
	    _pGetTextData(): string;
	    /**
	     *
	     * @returns {ByteArray}
	     * @private
	     */
	    _pGetByteData(): ByteArray;
	    /**
	     *
	     * @returns {any}
	     * @private
	     */
	    _pGetData(): any;
	}
	export = ParserBase;
	
}

declare module "awayjs-core/lib/parsers/ParserDataFormat" {
	/**
	 * An enumeration providing values to describe the data format of parsed data.
	 */
	class ParserDataFormat {
	    /**
	     * Describes the format of a binary file.
	     */
	    static BINARY: string;
	    /**
	     * Describes the format of a plain text file.
	     */
	    static PLAIN_TEXT: string;
	    /**
	     * Describes the format of an image file
	     */
	    static IMAGE: string;
	}
	export = ParserDataFormat;
	
}

declare module "awayjs-core/lib/parsers/ParserUtils" {
	import BitmapImage2D = require("awayjs-core/lib/data/BitmapImage2D");
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	class ParserUtils {
	    static arrayBufferToBase64(data: ArrayBuffer, mimeType: string): string;
	    static arrayBufferToAudio(data: ArrayBuffer, fileType: string): HTMLAudioElement;
	    /**
	     * Converts an ArrayBuffer to a base64 string
	     *
	     * @param image data as a ByteArray
	     *
	     * @return HTMLImageElement
	     *
	     */
	    static arrayBufferToImage(data: ArrayBuffer): HTMLImageElement;
	    /**
	     * Converts an ByteArray to an Image - returns an HTMLImageElement
	     *
	     * @param image data as a ByteArray
	     *
	     * @return HTMLImageElement
	     *
	     */
	    static byteArrayToImage(data: ByteArray): HTMLImageElement;
	    static byteArrayToAudio(data: ByteArray, filetype: string): HTMLAudioElement;
	    /**
	     * Converts an Blob to an Image - returns an HTMLImageElement
	     *
	     * @param image data as a Blob
	     *
	     * @return HTMLImageElement
	     *
	     */
	    static blobToImage(data: Blob): HTMLImageElement;
	    /**
	     * Converts an Blob to audio - returns an HTMLAudioElement
	     *
	     * @param audio data as a Blob
	     *
	     * @return HTMLAudioElement
	     *
	     */
	    static blobToAudio(data: Blob): HTMLAudioElement;
	    /**
	     *
	     */
	    static imageToBitmapImage2D(img: HTMLImageElement, powerOfTwo?: boolean): BitmapImage2D;
	    /**
	     * Returns a object as ByteArray, if possible.
	     *
	     * @param data The object to return as ByteArray
	     *
	     * @return The ByteArray or null
	     *
	     */
	    static toByteArray(data: any): ByteArray;
	    /**
	     * Returns a object as String, if possible.
	     *
	     * @param data The object to return as String
	     * @param length The length of the returned String
	     *
	     * @return The String or null
	     *
	     */
	    static toString(data: any, length?: number): string;
	}
	export = ParserUtils;
	
}

declare module "awayjs-core/lib/parsers/ResourceDependency" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import URLLoader = require("awayjs-core/lib/net/URLLoader");
	import URLRequest = require("awayjs-core/lib/net/URLRequest");
	import ParserBase = require("awayjs-core/lib/parsers/ParserBase");
	/**
	 * ResourceDependency represents the data required to load, parse and resolve additional files ("dependencies")
	 * required by a parser, used by ResourceLoadSession.
	 *
	 */
	class ResourceDependency {
	    private _id;
	    private _sub_id;
	    private _request;
	    private _assets;
	    private _parser;
	    private _parentParser;
	    private _data;
	    private _retrieveAsRawData;
	    private _suppressAssetEvents;
	    private _dependencies;
	    _iLoader: URLLoader;
	    _iSuccess: boolean;
	    constructor(id: string, request: URLRequest, data: any, parser: ParserBase, parentParser: ParserBase, retrieveAsRawData?: boolean, suppressAssetEvents?: boolean, sub_id?: number);
	    /**
	     *
	     */
	    id: string;
	    sub_id: number;
	    /**
	     *
	     */
	    request: URLRequest;
	    /**
	     * The data containing the dependency to be parsed, if the resource was already loaded.
	     */
	    data: any;
	    /**
	     *
	     */
	    parser: ParserBase;
	    /**
	     * The parser which is dependent on this ResourceDependency object.
	     */
	    parentParser: ParserBase;
	    /**
	     *
	     */
	    retrieveAsRawData: boolean;
	    /**
	     *
	     */
	    suppresAssetEvents: boolean;
	    /**
	     *
	     */
	    assets: Array<IAsset>;
	    /**
	     *
	     */
	    dependencies: Array<ResourceDependency>;
	    /**
	     * @private
	     * Method to set data after having already created the dependency object, e.g. after load.
	     */
	    _iSetData(data: any): void;
	    /**
	     * @private
	     *
	     */
	    _iSetParser(parser: ParserBase): void;
	    /**
	     * Resolve the dependency when it's loaded with the parent parser. For example, a dependency containing an
	     * ImageResource would be assigned to a Mesh instance as a BitmapMaterial, a scene graph object would be added
	     * to its intended parent. The dependency should be a member of the dependencies property.
	     */
	    resolve(): void;
	    /**
	     * Resolve a dependency failure. For example, map loading failure from a 3d file
	     */
	    resolveFailure(): void;
	    /**
	     * Resolve the dependencies name
	     */
	    resolveName(asset: IAsset): string;
	}
	export = ResourceDependency;
	
}

declare module "awayjs-core/lib/parsers/TextureAtlasParser" {
	import ParserBase = require("awayjs-core/lib/parsers/ParserBase");
	import ResourceDependency = require("awayjs-core/lib/parsers/ResourceDependency");
	/**
	 * TextureAtlasParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
	 * a loader object, it wraps it in a BitmapImage2DResource so resource management can happen consistently without
	 * exception cases.
	 */
	class TextureAtlasParser extends ParserBase {
	    private _doc;
	    private _imagePath;
	    private _imageData;
	    private _subTextureNodes;
	    private _parseState;
	    /**
	     * Creates a new TextureAtlasParser object.
	     * @param uri The url or id of the data or file to be parsed.
	     * @param extra The holder for extra contextual data that the parser might need.
	     */
	    constructor();
	    /**
	     * Indicates whether or not a given file extension is supported by the parser.
	     * @param extension The file extension of a potential file to be parsed.
	     * @return Whether or not the given file type is supported.
	     */
	    static supportsType(extension: string): boolean;
	    /**
	     * Tests whether a data block can be parsed by the parser.
	     * @param data The data block to potentially be parsed.
	     * @return Whether or not the given data is supported.
	     */
	    static supportsData(data: any): boolean;
	    /**
	     * @inheritDoc
	     */
	    _iResolveDependency(resourceDependency: ResourceDependency): void;
	    /**
	     * @inheritDoc
	     */
	    _iResolveDependencyFailure(resourceDependency: ResourceDependency): void;
	    /**
	     * @inheritDoc
	     */
	    _pProceedParsing(): boolean;
	}
	export = TextureAtlasParser;
	
}

declare module "awayjs-core/lib/parsers/WaveAudioParser" {
	import ParserBase = require("awayjs-core/lib/parsers/ParserBase");
	class WaveAudioParser extends ParserBase {
	    constructor();
	    static supportsType(extension: string): boolean;
	    static supportsData(data: any): boolean;
	    _pStartParsing(frameLimit: number): void;
	    _pProceedParsing(): boolean;
	    private static parseFileType(ba);
	}
	export = WaveAudioParser;
	
}

declare module "awayjs-core/lib/pool/IImageObject" {
	/**
	 * IImageObject is an interface for classes that are used in the rendering pipeline to render the
	 * contents of a texture
	 *
	 * @class away.pool.IImageObject
	 */
	interface IImageObject {
	    /**
	     *
	     */
	    dispose(): any;
	    /**
	     *
	     */
	    invalidate(): any;
	}
	export = IImageObject;
	
}

declare module "awayjs-core/lib/projections/CoordinateSystem" {
	/**
	 * Provides constant values for camera lens projection options use the the <code>coordinateSystem</code> property
	 *
	 * @see away.projections.PerspectiveLens#coordinateSystem
	 */
	class CoordinateSystem {
	    /**
	     * Default option, projects to a left-handed coordinate system
	     */
	    static LEFT_HANDED: string;
	    /**
	     * Projects to a right-handed coordinate system
	     */
	    static RIGHT_HANDED: string;
	}
	export = CoordinateSystem;
	
}

declare module "awayjs-core/lib/projections/FreeMatrixProjection" {
	import ProjectionBase = require("awayjs-core/lib/projections/ProjectionBase");
	class FreeMatrixProjection extends ProjectionBase {
	    constructor();
	    near: number;
	    far: number;
	    iAspectRatio: number;
	    clone(): ProjectionBase;
	    pUpdateMatrix(): void;
	}
	export = FreeMatrixProjection;
	
}

declare module "awayjs-core/lib/projections/IProjection" {
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import IEventDispatcher = require("awayjs-core/lib/events/IEventDispatcher");
	/**
	 * IMaterialOwner provides an interface for objects that can use materials.
	 *
	 * @interface away.base.IMaterialOwner
	 */
	interface IProjection extends IEventDispatcher {
	    coordinateSystem: string;
	    frustumCorners: Array<number>;
	    matrix: Matrix3D;
	    near: number;
	    originX: number;
	    originY: number;
	    far: number;
	    _iAspectRatio: number;
	    project(point3d: Vector3D): Vector3D;
	    unproject(nX: number, nY: number, sZ: number): Vector3D;
	    _iUpdateScissorRect(x: number, y: number, width: number, height: number): any;
	    _iUpdateViewport(x: number, y: number, width: number, height: number): any;
	}
	export = IProjection;
	
}

declare module "awayjs-core/lib/projections/ObliqueNearPlaneProjection" {
	import Plane3D = require("awayjs-core/lib/geom/Plane3D");
	import IProjection = require("awayjs-core/lib/projections/IProjection");
	import ProjectionBase = require("awayjs-core/lib/projections/ProjectionBase");
	class ObliqueNearPlaneProjection extends ProjectionBase {
	    private _baseProjection;
	    private _plane;
	    private _onProjectionMatrixChangedDelegate;
	    constructor(baseProjection: IProjection, plane: Plane3D);
	    frustumCorners: number[];
	    near: number;
	    far: number;
	    iAspectRatio: number;
	    plane: Plane3D;
	    baseProjection: IProjection;
	    private onProjectionMatrixChanged(event);
	    pUpdateMatrix(): void;
	}
	export = ObliqueNearPlaneProjection;
	
}

declare module "awayjs-core/lib/projections/OrthographicOffCenterProjection" {
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import ProjectionBase = require("awayjs-core/lib/projections/ProjectionBase");
	class OrthographicOffCenterProjection extends ProjectionBase {
	    private _minX;
	    private _maxX;
	    private _minY;
	    private _maxY;
	    constructor(minX: number, maxX: number, minY: number, maxY: number);
	    minX: number;
	    maxX: number;
	    minY: number;
	    maxY: number;
	    unproject(nX: number, nY: number, sZ: number): Vector3D;
	    clone(): ProjectionBase;
	    pUpdateMatrix(): void;
	}
	export = OrthographicOffCenterProjection;
	
}

declare module "awayjs-core/lib/projections/OrthographicProjection" {
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import ProjectionBase = require("awayjs-core/lib/projections/ProjectionBase");
	class OrthographicProjection extends ProjectionBase {
	    private _projectionHeight;
	    private _xMax;
	    private _yMax;
	    constructor(projectionHeight?: number);
	    projectionHeight: number;
	    unproject(nX: number, nY: number, sZ: number): Vector3D;
	    clone(): ProjectionBase;
	    pUpdateMatrix(): void;
	}
	export = OrthographicProjection;
	
}

declare module "awayjs-core/lib/projections/PerspectiveProjection" {
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import ProjectionBase = require("awayjs-core/lib/projections/ProjectionBase");
	class PerspectiveProjection extends ProjectionBase {
	    private _fieldOfView;
	    private _focalLength;
	    private _hFieldOfView;
	    private _hFocalLength;
	    private _preserveAspectRatio;
	    private _preserveFocalLength;
	    constructor(fieldOfView?: number, coordinateSystem?: string);
	    /**
	     *
	     */
	    preserveAspectRatio: boolean;
	    /**
	     *
	     */
	    preserveFocalLength: boolean;
	    /**
	     *
	     */
	    fieldOfView: number;
	    /**
	     *
	     */
	    focalLength: number;
	    /**
	     *
	     */
	    hFieldOfView: number;
	    /**
	     *
	     */
	    hFocalLength: number;
	    unproject(nX: number, nY: number, sZ: number): Vector3D;
	    clone(): ProjectionBase;
	    pUpdateMatrix(): void;
	}
	export = PerspectiveProjection;
	
}

declare module "awayjs-core/lib/projections/ProjectionBase" {
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
	import IProjection = require("awayjs-core/lib/projections/IProjection");
	class ProjectionBase extends EventDispatcher implements IProjection {
	    _pMatrix: Matrix3D;
	    _pScissorRect: Rectangle;
	    _pViewPort: Rectangle;
	    _pNear: number;
	    _pFar: number;
	    _pAspectRatio: number;
	    _pMatrixInvalid: boolean;
	    _pFrustumCorners: number[];
	    _pCoordinateSystem: string;
	    _pOriginX: number;
	    _pOriginY: number;
	    private _unprojection;
	    private _unprojectionInvalid;
	    constructor(coordinateSystem?: string);
	    /**
	     * The handedness of the coordinate system projection. The default is LEFT_HANDED.
	     */
	    coordinateSystem: string;
	    frustumCorners: number[];
	    matrix: Matrix3D;
	    near: number;
	    originX: number;
	    originY: number;
	    far: number;
	    project(point3d: Vector3D): Vector3D;
	    unprojectionMatrix: Matrix3D;
	    unproject(nX: number, nY: number, sZ: number): Vector3D;
	    clone(): ProjectionBase;
	    _iAspectRatio: number;
	    pInvalidateMatrix(): void;
	    pUpdateMatrix(): void;
	    _iUpdateScissorRect(x: number, y: number, width: number, height: number): void;
	    _iUpdateViewport(x: number, y: number, width: number, height: number): void;
	}
	export = ProjectionBase;
	
}

declare module "awayjs-core/lib/ui/Keyboard" {
	class Keyboard {
	    /**
	     * Constant associated with the key code value for the A key (65).
	     */
	    static A: number;
	    /**
	     * Constant associated with the key code value for the Alternate (Option) key  (18).
	     */
	    static ALTERNATE: number;
	    /**
	     * Select the audio mode
	     */
	    static AUDIO: number;
	    /**
	     * Constant associated with the key code value for the B key (66).
	     */
	    static B: number;
	    /**
	     * Return to previous page in application
	     */
	    static BACK: number;
	    /**
	     * Constant associated with the key code value for the ` key (192).
	     */
	    static BACKQUOTE: number;
	    /**
	     * Constant associated with the key code value for the \ key (220).
	     */
	    static BACKSLASH: number;
	    /**
	     * Constant associated with the key code value for the Backspace key (8).
	     */
	    static BACKSPACE: number;
	    /**
	     * Blue function key button
	     */
	    static BLUE: number;
	    /**
	     * Constant associated with the key code value for the C key (67).
	     */
	    static C: number;
	    /**
	     * Constant associated with the key code value for the Caps Lock key (20).
	     */
	    static CAPS_LOCK: number;
	    /**
	     * Channel down
	     */
	    static CHANNEL_DOWN: number;
	    /**
	     * Channel up
	     */
	    static CHANNEL_UP: number;
	    /**
	     * Constant associated with the key code value for the , key (188).
	     */
	    static COMMA: number;
	    /**
	     * Constant associated with the Mac command key (15). This constant is
	     * currently only used for setting menu key equivalents.
	     */
	    static COMMAND: number;
	    /**
	     * Constant associated with the key code value for the Control key (17).
	     */
	    static CONTROL: number;
	    /**
	     * An array containing all the defined key name constants.
	     */
	    static CharCodeStrings: Array<any>;
	    /**
	     * Constant associated with the key code value for the D key (68).
	     */
	    static D: number;
	    /**
	     * Constant associated with the key code value for the Delete key (46).
	     */
	    static DELETE: number;
	    /**
	     * Constant associated with the key code value for the Down Arrow key (40).
	     */
	    static DOWN: number;
	    /**
	     * Engage DVR application mode
	     */
	    static DVR: number;
	    /**
	     * Constant associated with the key code value for the E key (69).
	     */
	    static E: number;
	    /**
	     * Constant associated with the key code value for the End key (35).
	     */
	    static END: number;
	    /**
	     * Constant associated with the key code value for the Enter key (13).
	     */
	    static ENTER: number;
	    /**
	     * Constant associated with the key code value for the = key (187).
	     */
	    static EQUAL: number;
	    /**
	     * Constant associated with the key code value for the Escape key (27).
	     */
	    static ESCAPE: number;
	    /**
	     * Exits current application mode
	     */
	    static EXIT: number;
	    /**
	     * Constant associated with the key code value for the F key (70).
	     */
	    static F: number;
	    /**
	     * Constant associated with the key code value for the F1 key (112).
	     */
	    static F1: number;
	    /**
	     * Constant associated with the key code value for the F10 key (121).
	     */
	    static F10: number;
	    /**
	     * Constant associated with the key code value for the F11 key (122).
	     */
	    static F11: number;
	    /**
	     * Constant associated with the key code value for the F12 key (123).
	     */
	    static F12: number;
	    /**
	     * Constant associated with the key code value for the F13 key (124).
	     */
	    static F13: number;
	    /**
	     * Constant associated with the key code value for the F14 key (125).
	     */
	    static F14: number;
	    /**
	     * Constant associated with the key code value for the F15 key (126).
	     */
	    static F15: number;
	    /**
	     * Constant associated with the key code value for the F2 key (113).
	     */
	    static F2: number;
	    /**
	     * Constant associated with the key code value for the F3 key (114).
	     */
	    static F3: number;
	    /**
	     * Constant associated with the key code value for the F4 key (115).
	     */
	    static F4: number;
	    /**
	     * Constant associated with the key code value for the F5 key (116).
	     */
	    static F5: number;
	    /**
	     * Constant associated with the key code value for the F6 key (117).
	     */
	    static F6: number;
	    /**
	     * Constant associated with the key code value for the F7 key (118).
	     */
	    static F7: number;
	    /**
	     * Constant associated with the key code value for the F8 key (119).
	     */
	    static F8: number;
	    /**
	     * Constant associated with the key code value for the F9 key (120).
	     */
	    static F9: number;
	    /**
	     * Engage fast-forward transport mode
	     */
	    static FAST_FORWARD: number;
	    /**
	     * Constant associated with the key code value for the G key (71).
	     */
	    static G: number;
	    /**
	     * Green function key button
	     */
	    static GREEN: number;
	    /**
	     * Engage program guide
	     */
	    static GUIDE: number;
	    /**
	     * Constant associated with the key code value for the H key (72).
	     */
	    static H: number;
	    /**
	     * Engage help application or context-sensitive help
	     */
	    static HELP: number;
	    /**
	     * Constant associated with the key code value for the Home key (36).
	     */
	    static HOME: number;
	    /**
	     * Constant associated with the key code value for the I key (73).
	     */
	    static I: number;
	    /**
	     * Info button
	     */
	    static INFO: number;
	    /**
	     * Cycle input
	     */
	    static INPUT: number;
	    /**
	     * Constant associated with the key code value for the Insert key (45).
	     */
	    static INSERT: number;
	    /**
	     * Constant associated with the key code value for the J key (74).
	     */
	    static J: number;
	    /**
	     * Constant associated with the key code value for the K key (75).
	     */
	    static K: number;
	    /**
	     * The Begin key
	     */
	    static KEYNAME_BEGIN: string;
	    /**
	     * The Break key
	     */
	    static KEYNAME_BREAK: string;
	    /**
	     * The Clear Display key
	     */
	    static KEYNAME_CLEARDISPLAY: string;
	    /**
	     * The Clear Line key
	     */
	    static KEYNAME_CLEARLINE: string;
	    /**
	     * The Delete key
	     */
	    static KEYNAME_DELETE: string;
	    /**
	     * The Delete Character key
	     */
	    static KEYNAME_DELETECHAR: string;
	    /**
	     * The Delete Line key
	     */
	    static KEYNAME_DELETELINE: string;
	    /**
	     * The down arrow
	     */
	    static KEYNAME_DOWNARROW: string;
	    /**
	     * The End key
	     */
	    static KEYNAME_END: string;
	    /**
	     * The Execute key
	     */
	    static KEYNAME_EXECUTE: string;
	    /**
	     * The F1 key
	     */
	    static KEYNAME_F1: string;
	    /**
	     * The F10 key
	     */
	    static KEYNAME_F10: string;
	    /**
	     * The F11 key
	     */
	    static KEYNAME_F11: string;
	    /**
	     * The F12 key
	     */
	    static KEYNAME_F12: string;
	    /**
	     * The F13 key
	     */
	    static KEYNAME_F13: string;
	    /**
	     * The F14 key
	     */
	    static KEYNAME_F14: string;
	    /**
	     * The F15 key
	     */
	    static KEYNAME_F15: string;
	    /**
	     * The F16 key
	     */
	    static KEYNAME_F16: string;
	    /**
	     * The F17 key
	     */
	    static KEYNAME_F17: string;
	    /**
	     * The F18 key
	     */
	    static KEYNAME_F18: string;
	    /**
	     * The F19 key
	     */
	    static KEYNAME_F19: string;
	    /**
	     * The F2 key
	     */
	    static KEYNAME_F2: string;
	    /**
	     * The F20 key
	     */
	    static KEYNAME_F20: string;
	    /**
	     * The F21 key
	     */
	    static KEYNAME_F21: string;
	    /**
	     * The F22 key
	     */
	    static KEYNAME_F22: string;
	    /**
	     * The F23 key
	     */
	    static KEYNAME_F23: string;
	    /**
	     * The F24 key
	     */
	    static KEYNAME_F24: string;
	    /**
	     * The F25 key
	     */
	    static KEYNAME_F25: string;
	    /**
	     * The F26 key
	     */
	    static KEYNAME_F26: string;
	    /**
	     * The F27 key
	     */
	    static KEYNAME_F27: string;
	    /**
	     * The F28 key
	     */
	    static KEYNAME_F28: string;
	    /**
	     * The F29 key
	     */
	    static KEYNAME_F29: string;
	    /**
	     * The F3 key
	     */
	    static KEYNAME_F3: string;
	    /**
	     * The F30 key
	     */
	    static KEYNAME_F30: string;
	    /**
	     * The F31 key
	     */
	    static KEYNAME_F31: string;
	    /**
	     * The F32 key
	     */
	    static KEYNAME_F32: string;
	    /**
	     * The F33 key
	     */
	    static KEYNAME_F33: string;
	    /**
	     * The F34 key
	     */
	    static KEYNAME_F34: string;
	    /**
	     * The F35 key
	     */
	    static KEYNAME_F35: string;
	    /**
	     * The F4 key
	     */
	    static KEYNAME_F4: string;
	    /**
	     * The F5 key
	     */
	    static KEYNAME_F5: string;
	    /**
	     * The F6 key
	     */
	    static KEYNAME_F6: string;
	    /**
	     * The F7 key
	     */
	    static KEYNAME_F7: string;
	    /**
	     * The F8 key
	     */
	    static KEYNAME_F8: string;
	    /**
	     * The F9 key
	     */
	    static KEYNAME_F9: string;
	    /**
	     * The Find key
	     */
	    static KEYNAME_FIND: string;
	    /**
	     * The Help key
	     */
	    static KEYNAME_HELP: string;
	    /**
	     * The Home key
	     */
	    static KEYNAME_HOME: string;
	    /**
	     * The Insert key
	     */
	    static KEYNAME_INSERT: string;
	    /**
	     * The Insert Character key
	     */
	    static KEYNAME_INSERTCHAR: string;
	    /**
	     * The Insert Line key
	     */
	    static KEYNAME_INSERTLINE: string;
	    /**
	     * The left arrow
	     */
	    static KEYNAME_LEFTARROW: string;
	    /**
	     * The Menu key
	     */
	    static KEYNAME_MENU: string;
	    /**
	     * The Mode Switch key
	     */
	    static KEYNAME_MODESWITCH: string;
	    /**
	     * The Next key
	     */
	    static KEYNAME_NEXT: string;
	    /**
	     * The Page Down key
	     */
	    static KEYNAME_PAGEDOWN: string;
	    /**
	     * The Page Up key
	     */
	    static KEYNAME_PAGEUP: string;
	    /**
	     * The Pause key
	     */
	    static KEYNAME_PAUSE: string;
	    /**
	     * The Previous key
	     */
	    static KEYNAME_PREV: string;
	    /**
	     * The PRINT key
	     */
	    static KEYNAME_PRINT: string;
	    /**
	     * The PRINT Screen
	     */
	    static KEYNAME_PRINTSCREEN: string;
	    /**
	     * The Redo key
	     */
	    static KEYNAME_REDO: string;
	    /**
	     * The Reset key
	     */
	    static KEYNAME_RESET: string;
	    /**
	     * The right arrow
	     */
	    static KEYNAME_RIGHTARROW: string;
	    /**
	     * The Scroll Lock key
	     */
	    static KEYNAME_SCROLLLOCK: string;
	    /**
	     * The Select key
	     */
	    static KEYNAME_SELECT: string;
	    /**
	     * The Stop key
	     */
	    static KEYNAME_STOP: string;
	    /**
	     * The System Request key
	     */
	    static KEYNAME_SYSREQ: string;
	    /**
	     * The System key
	     */
	    static KEYNAME_SYSTEM: string;
	    /**
	     * The Undo key
	     */
	    static KEYNAME_UNDO: string;
	    /**
	     * The up arrow
	     */
	    static KEYNAME_UPARROW: string;
	    /**
	     * The User key
	     */
	    static KEYNAME_USER: string;
	    /**
	     * Constant associated with the key code value for the L key (76).
	     */
	    static L: number;
	    /**
	     * Watch last channel or show watched
	     */
	    static LAST: number;
	    /**
	     * Constant associated with the key code value for the Left Arrow key (37).
	     */
	    static LEFT: number;
	    /**
	     * Constant associated with the key code value for the [ key (219).
	     */
	    static LEFTBRACKET: number;
	    /**
	     * Return to live [position in broadcast]
	     */
	    static LIVE: number;
	    /**
	     * Constant associated with the key code value for the M key (77).
	     */
	    static M: number;
	    /**
	     * Engage "Master Shell" e.g. TiVo or other vendor button
	     */
	    static MASTER_SHELL: number;
	    /**
	     * Engage menu
	     */
	    static MENU: number;
	    /**
	     * Constant associated with the key code value for the - key (189).
	     */
	    static MINUS: number;
	    /**
	     * Constant associated with the key code value for the N key (78).
	     */
	    static N: number;
	    /**
	     * Skip to next track or chapter
	     */
	    static NEXT: number;
	    /**
	     * Constant associated with the key code value for the 0 key (48).
	     */
	    static NUMBER_0: number;
	    /**
	     * Constant associated with the key code value for the 1 key (49).
	     */
	    static NUMBER_1: number;
	    /**
	     * Constant associated with the key code value for the 2 key (50).
	     */
	    static NUMBER_2: number;
	    /**
	     * Constant associated with the key code value for the 3 key (51).
	     */
	    static NUMBER_3: number;
	    /**
	     * Constant associated with the key code value for the 4 key (52).
	     */
	    static NUMBER_4: number;
	    /**
	     * Constant associated with the key code value for the 5 key (53).
	     */
	    static NUMBER_5: number;
	    /**
	     * Constant associated with the key code value for the 6 key (54).
	     */
	    static NUMBER_6: number;
	    /**
	     * Constant associated with the key code value for the 7 key (55).
	     */
	    static NUMBER_7: number;
	    /**
	     * Constant associated with the key code value for the 8 key (56).
	     */
	    static NUMBER_8: number;
	    /**
	     * Constant associated with the key code value for the 9 key (57).
	     */
	    static NUMBER_9: number;
	    /**
	     * Constant associated with the pseudo-key code for the the number pad (21). Use to set numpad modifier on key equivalents
	     */
	    static NUMPAD: number;
	    /**
	     * Constant associated with the key code value for the number 0 key on the number pad (96).
	     */
	    static NUMPAD_0: number;
	    /**
	     * Constant associated with the key code value for the number 1 key on the number pad (97).
	     */
	    static NUMPAD_1: number;
	    /**
	     * Constant associated with the key code value for the number 2 key on the number pad (98).
	     */
	    static NUMPAD_2: number;
	    /**
	     * Constant associated with the key code value for the number 3 key on the number pad (99).
	     */
	    static NUMPAD_3: number;
	    /**
	     * Constant associated with the key code value for the number 4 key on the number pad (100).
	     */
	    static NUMPAD_4: number;
	    /**
	     * Constant associated with the key code value for the number 5 key on the number pad (101).
	     */
	    static NUMPAD_5: number;
	    /**
	     * Constant associated with the key code value for the number 6 key on the number pad (102).
	     */
	    static NUMPAD_6: number;
	    /**
	     * Constant associated with the key code value for the number 7 key on the number pad (103).
	     */
	    static NUMPAD_7: number;
	    /**
	     * Constant associated with the key code value for the number 8 key on the number pad (104).
	     */
	    static NUMPAD_8: number;
	    /**
	     * Constant associated with the key code value for the number 9 key on the number pad (105).
	     */
	    static NUMPAD_9: number;
	    /**
	     * Constant associated with the key code value for the addition key on the number pad (107).
	     */
	    static NUMPAD_ADD: number;
	    /**
	     * Constant associated with the key code value for the decimal key on the number pad (110).
	     */
	    static NUMPAD_DECIMAL: number;
	    /**
	     * Constant associated with the key code value for the division key on the number pad (111).
	     */
	    static NUMPAD_DIVIDE: number;
	    /**
	     * Constant associated with the key code value for the Enter key on the number pad (108).
	     */
	    static NUMPAD_ENTER: number;
	    /**
	     * Constant associated with the key code value for the multiplication key on the number pad (106).
	     */
	    static NUMPAD_MULTIPLY: number;
	    /**
	     * Constant associated with the key code value for the subtraction key on the number pad (109).
	     */
	    static NUMPAD_SUBTRACT: number;
	    /**
	     * Constant associated with the key code value for the O key (79).
	     */
	    static O: number;
	    /**
	     * Constant associated with the key code value for the P key (80).
	     */
	    static P: number;
	    /**
	     * Constant associated with the key code value for the Page Down key (34).
	     */
	    static PAGE_DOWN: number;
	    /**
	     * Constant associated with the key code value for the Page Up key (33).
	     */
	    static PAGE_UP: number;
	    /**
	     * Engage pause transport mode
	     */
	    static PAUSE: number;
	    /**
	     * Constant associated with the key code value for the . key (190).
	     */
	    static PERIOD: number;
	    /**
	     * Engage play transport mode
	     */
	    static PLAY: number;
	    /**
	     * Skip to previous track or chapter
	     */
	    static PREVIOUS: number;
	    /**
	     * Constant associated with the key code value for the Q key (81).
	     */
	    static Q: number;
	    /**
	     * Constant associated with the key code value for the ' key (222).
	     */
	    static QUOTE: number;
	    /**
	     * Constant associated with the key code value for the R key (82).
	     */
	    static R: number;
	    /**
	     * Record item or engage record transport mode
	     */
	    static RECORD: number;
	    /**
	     * Red function key button
	     */
	    static RED: number;
	    /**
	     * Engage rewind transport mode
	     */
	    static REWIND: number;
	    /**
	     * Constant associated with the key code value for the Right Arrow key (39).
	     */
	    static RIGHT: number;
	    /**
	     * Constant associated with the key code value for the ] key (221).
	     */
	    static RIGHTBRACKET: number;
	    /**
	     * Constant associated with the key code value for the S key (83).
	     */
	    static S: number;
	    /**
	     * Search button
	     */
	    static SEARCH: number;
	    /**
	     * Constant associated with the key code value for the ; key (186).
	     */
	    static SEMICOLON: number;
	    /**
	     * Engage setup application or menu
	     */
	    static SETUP: number;
	    /**
	     * Constant associated with the key code value for the Shift key (16).
	     */
	    static SHIFT: number;
	    /**
	     * Quick skip backward (usually 7-10 seconds)
	     */
	    static SKIP_BACKWARD: number;
	    /**
	     * Quick skip ahead (usually 30 seconds)
	     */
	    static SKIP_FORWARD: number;
	    /**
	     * Constant associated with the key code value for the / key (191).
	     */
	    static SLASH: number;
	    /**
	     * Constant associated with the key code value for the Spacebar (32).
	     */
	    static SPACE: number;
	    /**
	     * Engage stop transport mode
	     */
	    static STOP: number;
	    /**
	     * Toggle subtitles
	     */
	    static SUBTITLE: number;
	    /**
	     * Constant associated with the key code value for the T key (84).
	     */
	    static T: number;
	    /**
	     * Constant associated with the key code value for the Tab key (9).
	     */
	    static TAB: number;
	    /**
	     * Constant associated with the key code value for the U key (85).
	     */
	    static U: number;
	    /**
	     * Constant associated with the key code value for the Up Arrow key (38).
	     */
	    static UP: number;
	    /**
	     * Constant associated with the key code value for the V key (86).
	     */
	    static V: number;
	    /**
	     * Engage video-on-demand
	     */
	    static VOD: number;
	    /**
	     * Constant associated with the key code value for the W key (87).
	     */
	    static W: number;
	    /**
	     * Constant associated with the key code value for the X key (88).
	     */
	    static X: number;
	    /**
	     * Constant associated with the key code value for the Y key (89).
	     */
	    static Y: number;
	    /**
	     * Yellow function key button
	     */
	    static YELLOW: number;
	    /**
	     * Constant associated with the key code value for the Z key (90).
	     */
	    static Z: number;
	}
	export = Keyboard;
	
}

declare module "awayjs-core/lib/utils/BitmapImageUtils" {
	import BlendMode = require("awayjs-core/lib/data/BlendMode");
	import ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
	import Matrix = require("awayjs-core/lib/geom/Matrix");
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	class BitmapImageUtils {
	    static _fillRect(context: CanvasRenderingContext2D, rect: Rectangle, color: number, transparent: boolean): void;
	    static _copyPixels(context: CanvasRenderingContext2D, bmpd: HTMLElement, sourceRect: Rectangle, destRect: Rectangle): void;
	    static _draw(context: CanvasRenderingContext2D, source: any, matrix: Matrix, colorTransform: ColorTransform, blendMode: BlendMode, clipRect: Rectangle, smoothing: boolean): void;
	}
	export = BitmapImageUtils;
	
}

declare module "awayjs-core/lib/utils/ByteArray" {
	import ByteArrayBase = require("awayjs-core/lib/utils/ByteArrayBase");
	class ByteArray extends ByteArrayBase {
	    maxlength: number;
	    arraybytes: any;
	    unalignedarraybytestemp: any;
	    constructor(maxlength?: number);
	    ensureWriteableSpace(n: number): void;
	    setArrayBuffer(aBuffer: ArrayBuffer): void;
	    getBytesAvailable(): number;
	    ensureSpace(n: number): void;
	    writeByte(b: number): void;
	    readByte(): number;
	    readBytes(bytes: ByteArray, offset?: number, length?: number): void;
	    writeUnsignedByte(b: number): void;
	    readUnsignedByte(): number;
	    writeUnsignedShort(b: number): void;
	    readUTFBytes(len: number): string;
	    readInt(): number;
	    readShort(): number;
	    readDouble(): number;
	    readUnsignedShort(): number;
	    writeUnsignedInt(b: number): void;
	    readUnsignedInt(): number;
	    writeFloat(b: number): void;
	    readFloat(): number;
	}
	export = ByteArray;
	
}

declare module "awayjs-core/lib/utils/ByteArrayBase" {
	class ByteArrayBase {
	    position: number;
	    length: number;
	    _mode: string;
	    static Base64Key: string;
	    constructor();
	    writeByte(b: number): void;
	    readByte(): number;
	    writeUnsignedByte(b: number): void;
	    readUnsignedByte(): number;
	    writeUnsignedShort(b: number): void;
	    readUnsignedShort(): number;
	    writeUnsignedInt(b: number): void;
	    readUnsignedInt(): number;
	    writeFloat(b: number): void;
	    toFloatBits(x: number): void;
	    readFloat(b: number): void;
	    fromFloatBits(x: number): void;
	    getBytesAvailable(): number;
	    toString(): string;
	    compareEqual(other: any, count: any): boolean;
	    writeBase64String(s: string): void;
	    dumpToConsole(): void;
	    readBase64String(count: number): string;
	    static internalGetBase64String(count: any, getUnsignedByteFunc: any, self: any): string;
	}
	export = ByteArrayBase;
	
}

declare module "awayjs-core/lib/utils/ByteArrayBuffer" {
	import ByteArrayBase = require("awayjs-core/lib/utils/ByteArrayBase");
	class ByteArrayBuffer extends ByteArrayBase {
	    _bytes: number[];
	    constructor();
	    writeByte(b: number): void;
	    readByte(): number;
	    writeUnsignedByte(b: number): void;
	    readUnsignedByte(): number;
	    writeUnsignedShort(b: number): void;
	    readUnsignedShort(): number;
	    writeUnsignedInt(b: number): void;
	    readUnsignedInt(): number;
	    writeFloat(b: number): void;
	    toFloatBits(x: number): number;
	    readFloat(b: number): number;
	    fromFloatBits(x: number): number;
	}
	export = ByteArrayBuffer;
	
}

declare module "awayjs-core/lib/utils/ColorUtils" {
	/**
	 *
	 */
	class ColorUtils {
	    static float32ColorToARGB(float32Color: number): number[];
	    static ARGBtoFloat32(a: number, r: number, g: number, b: number): number;
	    private static componentToHex(c);
	    static RGBToHexString(argb: number[]): string;
	    static ARGBToHexString(argb: number[]): string;
	}
	export = ColorUtils;
	
}

declare module "awayjs-core/lib/utils/CSS" {
	class CSS {
	    static setElementSize(element: HTMLElement, width: number, height: number): void;
	    static setElementWidth(element: HTMLElement, width: number): void;
	    static setElementHeight(element: HTMLElement, height: number): void;
	    static setElementX(element: HTMLElement, x: number): void;
	    static setElementY(element: HTMLElement, y: number): void;
	    static getElementVisibility(element: HTMLElement): boolean;
	    static setElementVisibility(element: HTMLElement, visible: boolean): void;
	    static setElementAlpha(element: HTMLElement, alpha: number): void;
	    static setElementPosition(element: HTMLElement, x: number, y: number, absolute?: boolean): void;
	}
	export = CSS;
	
}

declare module "awayjs-core/lib/utils/Debug" {
	/**
	 *
	 */
	class Debug {
	    static THROW_ERRORS: boolean;
	    static ENABLE_LOG: boolean;
	    static LOG_PI_ERRORS: boolean;
	    private static keyword;
	    static breakpoint(): void;
	    static throwPIROnKeyWordOnly(str: string, enable?: boolean): void;
	    static throwPIR(clss: string, fnc: string, msg: string): void;
	    private static logPIR(clss, fnc, msg?);
	    static log(...args: any[]): void;
	}
	export = Debug;
	
}

declare module "awayjs-core/lib/utils/Extensions" {
	/**
	 *
	 */
	class Extensions {
	    static SIMD: boolean;
	}
	export = Extensions;
	
}

declare module "awayjs-core/lib/utils/getTimer" {
	/**
	 *
	 *
	 * @returns {number}
	 */
	function getTimer(): number;
	export = getTimer;
	
}

declare module "awayjs-core/lib/utils/IArrayBufferViewClass" {
	interface IArrayBufferViewClass {
	    BYTES_PER_ELEMENT: number;
	    new (length: number): ArrayBufferView;
	    new (array: ArrayBufferView): ArrayBufferView;
	    new (array: number[]): ArrayBufferView;
	    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): ArrayBufferView;
	}
	export = IArrayBufferViewClass;
	
}

declare module "awayjs-core/lib/utils/ImageUtils" {
	import Image2D = require("awayjs-core/lib/data/Image2D");
	class ImageUtils {
	    private static MAX_SIZE;
	    static isImage2DValid(image2D: Image2D): boolean;
	    static isHTMLImageElementValid(image: HTMLImageElement): boolean;
	    static isDimensionValid(d: number): boolean;
	    static isPowerOfTwo(value: number): boolean;
	    static getBestPowerOf2(value: number): number;
	}
	export = ImageUtils;
	
}

declare module "awayjs-core/lib/utils/MipmapGenerator" {
	import BitmapImage2D = require("awayjs-core/lib/data/BitmapImage2D");
	class MipmapGenerator {
	    private static _mipMaps;
	    private static _mipMapUses;
	    private static _matrix;
	    private static _rect;
	    private static _source;
	    /**
	     * Uploads a BitmapImage2D with mip maps to a target Texture object.
	     * @param source The source to upload.
	     * @param target The target Texture to upload to.
	     * @param mipmap An optional mip map holder to avoids creating new instances for fe animated materials.
	     * @param alpha Indicate whether or not the uploaded bitmapData is transparent.
	     */
	    static _generateMipMaps(source: HTMLElement, output?: Array<BitmapImage2D>, alpha?: boolean): any;
	    static _generateMipMaps(source: BitmapImage2D, output?: Array<BitmapImage2D>, alpha?: boolean): any;
	    private static _getMipmapHolder(mipMapHolder, newW, newH);
	    static _freeMipMapHolder(mipMapHolder: BitmapImage2D): void;
	    static downsampleImage(bitmap: ImageData, destBitmap: ImageData): ImageData;
	}
	export = MipmapGenerator;
	
}

declare module "awayjs-core/lib/utils/RequestAnimationFrame" {
	class RequestAnimationFrame {
	    private _callback;
	    private _callbackContext;
	    private _active;
	    private _rafUpdateFunction;
	    private _prevTime;
	    private _dt;
	    private _currentTime;
	    private _argsArray;
	    private _getTimer;
	    constructor(callback: Function, callbackContext: Object);
	    /**
	     *
	     * @param callback
	     * @param callbackContext
	     */
	    setCallback(callback: Function, callbackContext: Object): void;
	    /**
	     *
	     */
	    start(): void;
	    /**
	     *
	     */
	    stop(): void;
	    /**
	     *
	     * @returns {boolean}
	     */
	    active: boolean;
	    /**
	     *
	     * @private
	     */
	    private _tick();
	}
	export = RequestAnimationFrame;
	
}

declare module "awayjs-core/lib/utils/Timer" {
	import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
	class Timer extends EventDispatcher {
	    private _delay;
	    private _repeatCount;
	    private _currentCount;
	    private _iid;
	    private _running;
	    constructor(delay: number, repeatCount?: number);
	    currentCount: number;
	    delay: number;
	    repeatCount: number;
	    reset(): void;
	    running: boolean;
	    start(): void;
	    stop(): void;
	    private tick();
	}
	export = Timer;
	
}

declare module "awayjs-core/lib/utils/XmlUtils" {
	class XmlUtils {
	    static getChildrenWithTag(node: Node, tag: string): NodeList;
	    static filterListByParam(nodes: NodeList, paramName: string, paramValue: any): NodeList;
	    static strToXml(str: string): Node;
	    static nodeToString(node: Node): string;
	    static readAttributeValue(node: Node, attrName: string): string;
	    static writeAttributeValue(node: Node, attrName: string, attrValue: string): void;
	    static hasAttribute(node: Node, attrName: string): boolean;
	}
	export = XmlUtils;
	
}

declare module "awayjs-core/lib/vos/IAttributesBufferVO" {
	/**
	 * IAttributesBufferVO is an interface for classes that are used in the rendering pipeline to render the
	 * contents of a texture
	 *
	 * @class away.pool.IAttributesBufferVO
	 */
	interface IAttributesBufferVO {
	    /**
	     *
	     */
	    dispose(): any;
	    /**
	     *
	     */
	    invalidate(): any;
	}
	export = IAttributesBufferVO;
	
}

declare module "awayjs-core/lib/vos/IAttributesVO" {
	/**
	 * IAttributesVO is an interface for classes that are used in the rendering pipeline to render the
	 * contents of a texture
	 *
	 * @class away.pool.IAttributesVO
	 */
	interface IAttributesVO {
	    /**
	     *
	     */
	    dispose(): any;
	    /**
	     *
	     */
	    invalidate(): any;
	}
	export = IAttributesVO;
	
}

