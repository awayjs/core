import IAsset					= require("awayjs-core/lib/core/library/IAsset");
import Event					= require("awayjs-core/lib/events/Event");

/**
 * @class away.events.AssetEvent
 */
class AssetEvent extends Event
{
	/**
	 *
	 */
	public static ASSET_COMPLETE:string = "assetComplete";

	/**
	 *
	 */
	public static ASSET_RENAME:string = 'assetRename';

	/**
	 *
	 */
	public static ASSET_CONFLICT_RESOLVED:string = 'assetConflictResolved';

	/**
	 *
	 */
	public static TEXTURE_SIZE_ERROR:string = 'textureSizeError';

	private _asset:IAsset;
	private _prevName:string;

	/**
	 *
	 */
	constructor(type:string, asset:IAsset = null, prevName:string = null)
	{
		super(type);

		this._asset = asset;
		this._prevName = prevName || (this._asset? this._asset.name : null);
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
	public get assetPrevName():string
	{
		return this._prevName;
	}

	/**
	 *
	 */
	public clone():Event
	{
		return <Event> new AssetEvent(this.type, this.asset, this.assetPrevName);
	}
}

export = AssetEvent;