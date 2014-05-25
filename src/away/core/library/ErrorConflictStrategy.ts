///<reference path="../../_definitions.ts"/>

module away.library
{
	export class ErrorConflictStrategy extends ConflictStrategyBase
	{
		constructor()
		{
			super();
		}

		public resolveConflict(changedAsset:IAsset, oldAsset:IAsset, assetsDictionary:Object, precedence:string)
		{
			throw new away.errors.Error('Asset name collision while AssetLibrary.namingStrategy set to AssetLibrary.THROW_ERROR. Asset path: ' + changedAsset.assetFullPath);
		}

		public create():ConflictStrategyBase
		{
			return new ErrorConflictStrategy();
		}
	}
}
