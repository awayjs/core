import {ConflictStrategyBase}		from "../library/ConflictStrategyBase";
import {IAsset}					from "../library/IAsset";
import {ErrorBase}				from "../errors/ErrorBase";

export class ErrorConflictStrategy extends ConflictStrategyBase
{
	constructor()
	{
		super();
	}

	public resolveConflict(changedAsset:IAsset, oldAsset:IAsset, assetsDictionary:Object, precedence:string):void
	{
		throw new ErrorBase('Asset name collision while AssetLibrary.namingStrategy set to AssetLibrary.THROW_ERROR. Asset path: ' + changedAsset.assetFullPath);
	}

	public create():ConflictStrategyBase
	{
		return new ErrorConflictStrategy();
	}
}