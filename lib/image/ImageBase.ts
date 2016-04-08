import SamplerBase					from "awayjs-core/lib/image/SamplerBase";
import AbstractMethodError			from "awayjs-core/lib/errors/AbstractMethodError";
import AssetEvent					from "awayjs-core/lib/events/AssetEvent";
import IAsset						from "awayjs-core/lib/library/IAsset";
import AssetBase					from "awayjs-core/lib/library/AssetBase";

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

export default ImageBase;