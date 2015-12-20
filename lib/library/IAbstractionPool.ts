import IAsset						= require("awayjs-core/lib/library/IAsset");

interface IAbstractionPool
{
	getAbstraction(asset:IAsset);
	clearAbstraction(asset:IAsset);
}

export = IAbstractionPool;
