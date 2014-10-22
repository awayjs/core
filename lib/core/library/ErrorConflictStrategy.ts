import ConflictStrategyBase		= require("awayjs-core/lib/core/library/ConflictStrategyBase");
import IAsset					= require("awayjs-core/lib/core/library/IAsset");
import Error					= require("awayjs-core/lib/errors/Error");

class ErrorConflictStrategy extends ConflictStrategyBase
{
	constructor()
	{
		super();
	}

	public resolveConflict(changedAsset:IAsset, oldAsset:IAsset, assetsDictionary:Object, precedence:string)
	{
		throw new Error('Asset name collision while AssetLibrary.namingStrategy set to AssetLibrary.THROW_ERROR. Asset path: ' + changedAsset.assetFullPath);
	}

	public create():ConflictStrategyBase
	{
		return new ErrorConflictStrategy();
	}
}

export = ErrorConflictStrategy;