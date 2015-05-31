import ImageBase				= require("awayjs-core/lib/data/ImageBase");
import ImageUtils				= require("awayjs-core/lib/utils/ImageUtils");

class ImageCube extends ImageBase
{
	public static assetType:string = "[image ImageCube]";

	public _size:number;

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return ImageCube.assetType;
	}

	/**
	 * The size of the cube bitmap in pixels.
	 */
	public get size():number
	{
		return this._size;
	}

	public set size(value:number)
	{
		if (this._size == value)
			return;

		this._setSize(this._size);
	}

	/**
	 *
	 */
	constructor(size:number)
	{
		super();

		this._size = size;

		this._testDimensions();
	}

	/**
	 *
	 * @param width
	 * @param height
	 * @private
	 */
	public _setSize(size:number)
	{
		if (this._size != size)
			this.invalidateSize();

		this._size = size;

		this._testDimensions();
	}

	/**
	 *
	 * @private
	 */
	private _testDimensions()
	{
		if (!ImageUtils.isDimensionValid(this._size))
			throw new Error("Invalid dimension: Width and height must be power of 2 and cannot exceed 2048");
	}
}

export = ImageCube;