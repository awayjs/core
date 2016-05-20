import {SamplerBase}					from "../image/SamplerBase";
import {AbstractMethodError}			from "../errors/AbstractMethodError";
import {AssetEvent}					from "../events/AssetEvent";
import {IAsset}						from "../library/IAsset";
import {AssetBase}					from "../library/AssetBase";

export class ImageBase extends AssetBase
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