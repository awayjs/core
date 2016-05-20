import {IAsset}					from "../library/IAsset";
import {AssetBase}				from "../library/AssetBase";

/**
 *
 */
export class SamplerBase extends AssetBase
{
	private _smooth:boolean;
	private _mipmap:boolean;

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
	constructor(smooth:boolean = false, mipmap:boolean = false)
	{
		super();

		this._smooth = smooth;
		this._mipmap = mipmap;
	}
}