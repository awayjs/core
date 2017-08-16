import {ConflictStrategyBase}		from "../library/ConflictStrategyBase";
import {IAssetAdapter}					from "../library/IAssetAdapter";
import {ErrorBase}				from "../errors/ErrorBase";

export class ErrorConflictStrategy extends ConflictStrategyBase
{
	constructor()
	{
		super();
	}

	public resolveConflict(changedAsset:IAssetAdapter, oldAsset:IAssetAdapter, assetsDictionary:Object, precedence:string):void
	{
		throw new ErrorBase('Asset name collision while AssetLibrary.namingStrategy set to AssetLibrary.THROW_ERROR. Asset path: ' + changedAsset.adaptee.assetFullPath);
	}

	public create():ConflictStrategyBase
	{
		return new ErrorConflictStrategy();
	}
}