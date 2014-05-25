///<reference path="../../_definitions.ts"/>

module away.library
{
	export class IgnoreConflictStrategy extends ConflictStrategyBase
	{
		constructor()
		{
			super();
		}

		public resolveConflict(changedAsset:IAsset, oldAsset:IAsset, assetsDictionary:Object, precedence:string)
		{
			// Do nothing, ignore the fact that there is a conflict.
			return;
		}

		public create():ConflictStrategyBase
		{
			return new IgnoreConflictStrategy();
		}
	}
}
