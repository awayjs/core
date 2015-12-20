import ConflictStrategyBase		= require("awayjs-core/lib/library/ConflictStrategyBase");
import IAsset					= require("awayjs-core/lib/library/IAsset");
import ErrorBase				= require("awayjs-core/lib/errors/ErrorBase");

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

export = ErrorConflictStrategy;