import {URLLoader}				from "../net/URLLoader";
import {EventBase}				from "../events/EventBase";

export class URLLoaderEvent extends EventBase
{
	public static HTTP_STATUS:string = "httpStatus";

	public static LOAD_ERROR:string = "loadError";

	public static LOAD_PROGRESS:string = "loadProgress";

	public static LOAD_START:string = "loadStart";

	public static LOAD_COMPLETE:string = "loadComplete";

	private _urlLoader:URLLoader;

	constructor(type:string, urlLoader:URLLoader)
	{
		super(type);

		this._urlLoader = urlLoader;
	}

	/**
	 *
	 */
	public get urlLoader():URLLoader
	{
		return this._urlLoader;
	}


	/**
	 *
	 */
	public clone():URLLoaderEvent
	{
		return new URLLoaderEvent(this.type, this._urlLoader);
	}
}