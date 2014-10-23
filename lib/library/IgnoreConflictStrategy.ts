import ConflictStrategyBase		= require("awayjs-core/lib/library/ConflictStrategyBase");
import IAsset					= require("awayjs-core/lib/library/IAsset");

class IgnoreConflictStrategy extends ConflictStrategyBase
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

export = IgnoreConflictStrategy;