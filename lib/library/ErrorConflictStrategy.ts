import ConflictStrategyBase		from "awayjs-core/lib/library/ConflictStrategyBase";
import IAsset					from "awayjs-core/lib/library/IAsset";
import ErrorBase				from "awayjs-core/lib/errors/ErrorBase";

class ErrorConflictStrategy extends ConflictStrategyBase
{
	constructor()
	{
		super();
	}

	public resolveConflict(changedAsset:IAsset, oldAsset:IAsset, assetsDictionary:Object, precedence:string)
	{
		throw new ErrorBase('Asset name collision while AssetLibrary.namingStrategy set to AssetLibrary.THROW_ERROR. Asset path: ' + changedAsset.assetFullPath);
	}

	public create():ConflictStrategyBase
	{
		return new ErrorConflictStrategy();
	}
}

export default ErrorConflictStrategy;