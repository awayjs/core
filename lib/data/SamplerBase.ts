import IAsset					= require("awayjs-core/lib/library/IAsset");
import AssetBase				= require("awayjs-core/lib/library/AssetBase");

/**
 *
 */
class SamplerBase extends AssetBase implements IAsset
{
	private _smooth:boolean;
	private _mipmap:boolean;

	public _pFormat:string = "bgra";

	/**
	 *
	 */
	public get smooth():boolean
	{
		return this._smooth;
	}
	public set smooth(value:boolean)
	{
		if (this._smooth == value)
			return;

		this._smooth = value;

		//TODO: update dependencies
	}

	/**
	 *
	 */
	public get mipmap():boolean
	{
		return this._mipmap;
	}
	public set mipmap(value:boolean)
	{
		if (this._mipmap == value)
			return;

		this._mipmap = value;

		//TODO: update dependencies
	}

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

export = SamplerBase;