import ImageBase				= require("awayjs-core/lib/data/ImageBase");
import Rectangle				= require("awayjs-core/lib/geom/Rectangle");
import ImageUtils				= require("awayjs-core/lib/utils/ImageUtils");

class Image2D extends ImageBase
{
	public static assetType:string = "[image Image2D]";

	public _rect:Rectangle;

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return Image2D.assetType;
	}

	/**
	 * The height of the image in pixels.
	 */
	public get height():number
	{
		return this._rect.height;
	}

	public set height(value:number)
	{
		if (this._rect.height == value)
			return;

		this._setSize(this._rect.width, value);
	}

	/**
	 * The rectangle that defines the size and location of the bitmap image. The
	 * top and left of the rectangle are 0; the width and height are equal to the
	 * width and height in pixels of the BitmapData object.
	 */
	public get rect():Rectangle
	{
		return this._rect;
	}

	/**
	 * The width of the bitmap image in pixels.
	 */
	public get width():number
	{
		return this._rect.width;
	}

	public set width(value:number)
	{
		if (this._rect.width == value)
			return;

		this._setSize(value, this._rect.height);
	}

	/**
	 *
	 */
	constructor(width:number, height:number)
	{
		super();

		this._rect = new Rectangle(0, 0, width, height);

		this._testDimensions();
	}

	/**
	 *
	 * @param width
	 * @param height
	 * @private
	 */
	public _setSize(width:number, height:number)
	{
		if (this._rect.width != width || this._rect.height != height)
			this.invalidateSize();

		this._rect.width = width;
		this._rect.height = height;

		this._testDimensions();
	}

	/**
	 *
	 * @private
	 */
	private _testDimensions()
	{
		if (!ImageUtils.isDimensionValid(this._rect.width) || !ImageUtils.isDimensionValid(this._rect.height))
			throw new Error("Invalid dimension: Width and height must be power of 2 and cannot exceed 2048");
	}
}

export = Image2D;