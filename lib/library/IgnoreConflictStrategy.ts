import ConflictStrategyBase		from "../library/ConflictStrategyBase";
import IAsset					from "../library/IAsset";

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

export default IgnoreConflictStrategy;