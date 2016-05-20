import {IAsset}					from "../library/IAsset";
import {EventBase}				from "../events/EventBase";

/**
 * @export class away.events.AssetEvent
 */
export class AssetEvent extends EventBase
{
	/**
	 * Dispatched when the content of an asset is invalidated
	 */
	public static INVALIDATE:string = "invalidate";

	/**
	 * Dispatched when an asset is diposed
	 */
	public static DISPOSE:string = "dispose";

	/**
	 * Dispatched when an asset is cleared
	 */
	public static CLEAR:string = "clear";

	/**
	 *
	 */
	public static RENAME:string = 'rename';

	/**
	 *
	 */
	public static ENTER_FRAME:string = 'enterFrame';

	/**
	 *
	 */
	public static EXIT_FRAME:string = 'exitFrame';

	/**
	 *
	 */
	public static ASSET_CONFLICT_RESOLVED:string = 'assetConflictResolved';

	/**
	 * Dispatched when the loading of an asset and all of its dependencies is complete.
	 */
	public static ASSET_COMPLETE:string = "assetComplete";

	/**
	 *
	 */
	public static TEXTURE_SIZE_ERROR:string = 'textureSizeError';

	private _asset:IAsset;
	private _prevName:string;

	/**
	 *
	 */
	constructor(type:string, asset:IAsset, prevName:string = null)
	{
		super(type);

		this._asset = asset;
		this._prevName = prevName || this._asset.name;
	}

	/**
	 *
	 */
	public get asset():IAsset
	{
		return this._asset;
	}

	/**
	 *
	 */
	public get prevName():string
	{
		return this._prevName;
	}

	/**
	 *
	 */
	public clone():AssetEvent
	{
		return new AssetEvent(this.type, this._asset, this._prevName);
	}
}