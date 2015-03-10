import IAsset					= require("awayjs-core/lib/library/IAsset");

interface IAssetClass
{
	assetType:string;

	new():IAsset;
}

export = IAssetClass;
