import {SamplerBase}				from "../image/SamplerBase";
import {ImageCube}				from "../image/ImageCube";

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
export class SamplerCube extends SamplerBase
{
	public static assetType:string = "[asset SamplerCube]";

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return SamplerCube.assetType;
	}

	/**
	 *
	 * @param bitmapData
	 * @param smoothing
	 */
	constructor(smooth:boolean = false, mipmap:boolean = false)
	{
		super(smooth, mipmap);
	}
}