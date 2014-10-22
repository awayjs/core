import BitmapData				= require("awayjs-core/lib/core/base/BitmapData");
import AbstractMethodError		= require("awayjs-core/lib/errors/AbstractMethodError");
import MipmapGenerator			= require("awayjs-core/lib/textures/MipmapGenerator");
import TextureProxyBase			= require("awayjs-core/lib/textures/TextureProxyBase");

class Texture2DBase extends TextureProxyBase
{
	private _mipmapData:Array<BitmapData>;
	private _mipmapDataDirty:boolean;
	public _pWidth:number;
	public _pHeight:number;
	
	/**
	 *
	 * @returns {number}
	 */
	public get width():number
	{
		return this._pWidth;
	}

	/**
	 *
	 * @returns {number}
	 */
	public get height():number
	{
		return this._pHeight;
	}

	public get size():number
	{
		return this._pWidth;
	}

	constructor(generateMipmaps:boolean = false)
	{
		super(generateMipmaps);
	}

	/**
	 * @inheritDoc
	 */
	public dispose()
	{
		super.dispose();

		if (this._mipmapData) {
			var len:number = this._mipmapData.length;
			for (var i:number = 0; i < len; i++)
				MipmapGenerator.freeMipMapHolder(this._mipmapData[i]);
		}
	}

	/**
	 *
	 */
	public invalidateContent():void
	{
		super.invalidateContent();

		this._mipmapDataDirty = true;
	}

	/**
	 *
	 * @param width
	 * @param height
	 * @private
	 */
	public _pSetSize(width:number, height:number)
	{
		if (this._pWidth != width || this._pHeight != height)
			this.invalidateSize();

		this._mipmapDataDirty = true;

		this._pWidth = width;
		this._pHeight = height;
	}

	public _iGetMipmapData():Array<BitmapData>
	{
		if (this._mipmapDataDirty) {
			this._mipmapDataDirty = false;

			if (!this._mipmapData)
				this._mipmapData = new Array<BitmapData>();

			MipmapGenerator.generateMipMaps(this._iGetTextureData(), this._mipmapData, true);
		}

		return this._mipmapData;
	}

	public _iGetTextureData():any
	{
		throw new AbstractMethodError();
	}
}

export = Texture2DBase;