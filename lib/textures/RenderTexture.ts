import Error					= require("awayjs-core/lib/errors/Error");
import Texture2DBase			= require("awayjs-core/lib/textures/Texture2DBase");
import TextureUtils				= require("awayjs-core/lib/utils/TextureUtils");


class RenderTexture extends Texture2DBase
{
	/**
	 *
	 * @returns {number}
	 */
	public get width():number
	{
		return this._pWidth;
	}

	public set width(value:number)
	{
		if (value == this._pWidth)
			return;

		if (!TextureUtils.isDimensionValid(value))
			throw new Error("Invalid size: Width and height must be power of 2 and cannot exceed 2048");

		this.invalidateContent();

		this._pSetSize(value, this._pHeight);
	}

	/**
	 *
	 * @returns {number}
	 */
	public get height():number
	{
		return this._pHeight;
	}

	public set height(value:number)
	{
		if (value == this._pHeight)
			return;

		if (!TextureUtils.isDimensionValid(value))
			throw new Error("Invalid size: Width and height must be power of 2 and cannot exceed 2048");

		this.invalidateContent();
		this._pSetSize(this._pWidth, value);
	}

	constructor(width:number, height:number)
	{
		super(false);

		this._pSetSize(width, height);
	}
}

export = RenderTexture;