import DisplayObject			= require("awayjs-core/lib/core/base/DisplayObject");
import IAsset					= require("awayjs-core/lib/core/library/IAsset");
import Event					= require("awayjs-core/lib/events/Event");

class LoaderEvent extends Event
{
	/**
	 * Dispatched when a resource and all of its dependencies is retrieved.
	 */
	public static RESOURCE_COMPLETE:string = "resourceComplete";

	private _url:string;
	private _content:DisplayObject;
	private _assets:IAsset[];

	/**
	 * Create a new LoaderEvent object.
	 *
	 * @param type The event type.
	 * @param url The url of the loaded resource.
	 * @param assets The assets of the loaded resource.
	 */
	constructor(type:string, url:string = null, content:DisplayObject = null, assets:Array<IAsset> = null)
	{
		super(type);

		this._url = url;
		this._content = content;
		this._assets = assets;
	}

	/**
	 * The content returned if the resource has been loaded inside a <code>Loader</code> object.
	 */
	public get content():DisplayObject
	{
		return this._content;
	}

	/**
	 * The url of the loaded resource.
	 */
	public get url():string
	{
		return this._url;
	}

	/**
	 * The error string on loadError.
	 */
	public get assets():IAsset[]
	{
		return this._assets;
	}

	/**
	 * Clones the current event.
	 * @return An exact duplicate of the current event.
	 */
	public clone():Event
	{
		return <Event> new LoaderEvent(this.type, this._url, this._content, this._assets);
	}
}

export = LoaderEvent;