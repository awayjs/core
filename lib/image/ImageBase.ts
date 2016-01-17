import SamplerBase					= require("awayjs-core/lib/image/SamplerBase");
import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");
import AssetEvent					= require("awayjs-core/lib/events/AssetEvent");
import IAsset						= require("awayjs-core/lib/library/IAsset");
import AssetBase					= require("awayjs-core/lib/library/AssetBase");

class ImageBase extends AssetBase
{
	public _pFormat:string = "bgra";

	/**
	 *
	 */
	constructor()
	{
		super();
	}

	/**
	 *
	 * @returns {string}
	 */
	public get format():string
	{
		return this._pFormat;
	}
}

export = ImageBase;