import BitmapData				= require("awayjs-core/lib/base/BitmapData");
import Error					= require("awayjs-core/lib/errors/Error");
import Texture2DBase			= require("awayjs-core/lib/textures/Texture2DBase");
import TextureUtils				= require("awayjs-core/lib/utils/TextureUtils");


class BitmapTexture extends Texture2DBase
{
	public _bitmapData:BitmapData;

	/**
	 *
	 * @returns {BitmapData}
	 */
	public get bitmapData():BitmapData
	{
		return this._bitmapData;
	}

	public set bitmapData(value:BitmapData)
	{
		if (this._bitmapData == value)
			return;

		if (!TextureUtils.isBitmapDataValid(value))
			throw new Error("Invalid bitmapData: Width and height must be power of 2 and cannot exceed 2048");

		this._bitmapData = value;

		this.invalidateContent();

		this._pSetSize(value.width, value.height);
	}

	constructor(bitmapData:BitmapData, generateMipmaps:boolean = false)
	{
		super(generateMipmaps);

		this.bitmapData = bitmapData;
	}

	public dispose()
	{
		super.dispose();

		this._bitmapData.dispose();
		this._bitmapData = null;
	}

	public _iGetTextureData():BitmapData
	{
		return this._bitmapData;
	}
}

export = BitmapTexture;