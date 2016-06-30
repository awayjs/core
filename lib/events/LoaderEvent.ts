import {IAsset}					from "../library/IAsset";
import {EventBase}				from "../events/EventBase";

export class LoaderEvent extends EventBase
{
	/**
	 * Dispatched when the loading of a session and all of its dependencies is complete.
	 */
	public static LOAD_COMPLETE:string = "loadComplete";

	private _url:string;
	private _content:IAsset;
	private _assets:IAsset[];

	/**
	 * Create a new LoaderEvent object.
	 *
	 * @param type The event type.
	 * @param url The url of the loaded resource.
	 * @param assets The assets of the loaded resource.
	 */
	constructor(type:string, url:string = null, content:IAsset = null, assets:Array<IAsset> = null)
	{
		super(type);

		this._url = url;
		this._content = content;
		this._assets = assets;
	}

	/**
	 * The content returned if the resource has been loaded inside a <code>Loader</code> object.
	 */
	public get content():IAsset
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
	public clone():LoaderEvent
	{
		return new LoaderEvent(this.type, this._url, this._content, this._assets);
	}
}