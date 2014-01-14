///<reference path="../_definitions.ts"/>

module away.events
{
	//import away.library.assets.IAsset;

	//import flash.events.Event;
	/**
	 * @class away.events.AssetEvent
	 */
	export class AssetEvent extends away.events.Event
	{
		public static ASSET_COMPLETE:string = "assetComplete";
		public static ASSET_RENAME:string = 'assetRename';
		public static ASSET_CONFLICT_RESOLVED:string = 'assetConflictResolved';

		public static TEXTURE_SIZE_ERROR:string = 'textureSizeError';

		private _asset:away.library.IAsset;
		private _prevName:string;

		constructor(type:string, asset:away.library.IAsset = null, prevName:string = null)
		{
			super(type);

			this._asset = asset;
			this._prevName = prevName || (this._asset? this._asset.name : null);
		}


		public get asset():away.library.IAsset
		{
			return this._asset;
		}


		public get assetPrevName():string
		{
			return this._prevName;
		}


		public clone():Event
		{
			return <away.events.Event> new away.events.AssetEvent(this.type, this.asset, this.assetPrevName);
		}
	}
}