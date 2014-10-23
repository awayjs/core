import IAsset					= require("awayjs-core/lib/library/IAsset");
import AbstractMethodError		= require("awayjs-core/lib/errors/AbstractMethodError");
import AssetEvent				= require("awayjs-core/lib/events/AssetEvent");
import EventDispatcher			= require("awayjs-core/lib/events/EventDispatcher");

class NamedAssetBase extends EventDispatcher
{
	public static ID_COUNT:number = 0;

	private _originalName:string;
	private _namespace:string;
	private _name:string;
	private _id:number;
	private _full_path:Array<string>;

	public static DEFAULT_NAMESPACE:string = 'default';

	constructor(name:string = null)
	{
		super();

		this._id = NamedAssetBase.ID_COUNT++;

		if (name == null)
			name = 'null';

		this._name = name;
		this._originalName = name;

		this.updateFullPath();
	}

	/**
	 *
	 */
	public get assetType():string
	{
		throw new AbstractMethodError();
	}

	/**
	 * The original name used for this asset in the resource (e.g. file) in which
	 * it was found. This may not be the same as <code>name</code>, which may
	 * have changed due to of a name conflict.
	 */
	public get originalName():string
	{
		return this._originalName;
	}

	/**
	 * A unique id for the asset, used to identify assets in an associative array
	 */
	public get id():number
	{
		return this._id;
	}

	public get name():string
	{
		return this._name;
	}

	public set name(val:string)
	{
		var prev:string;

		prev = this._name;
		this._name = val;

		if (this._name == null)
			this._name = 'null';

		this.updateFullPath();

		//if (hasEventListener(AssetEvent.ASSET_RENAME))
		this.dispatchEvent(new AssetEvent(AssetEvent.ASSET_RENAME, <IAsset> this, prev));

	}

	public dispose()
	{
		throw new AbstractMethodError();
	}

	public get assetNamespace():string
	{
		return this._namespace;
	}

	public get assetFullPath():Array<string>
	{
		return this._full_path;
	}

	public assetPathEquals(name:string, ns:string):boolean
	{
		return (this._name == name && (!ns || this._namespace == ns));
	}

	public resetAssetPath(name:string, ns:string = null, overrideOriginal:boolean = true):void
	{

		this._name = name? name : 'null';
		this._namespace = ns? ns : NamedAssetBase.DEFAULT_NAMESPACE;

		if (overrideOriginal)
			this._originalName = this._name;

		this.updateFullPath();
	}

	private updateFullPath():void
	{
		this._full_path = [ this._namespace, this._name ];
	}
}

export = NamedAssetBase;