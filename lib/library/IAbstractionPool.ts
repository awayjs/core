import IAsset						= require("awayjs-core/lib/library/IAsset");
import AbstractionBase				= require("awayjs-core/lib/library/AbstractionBase");

interface IAbstractionPool
{
	getAbstraction(asset:IAsset):AbstractionBase;
	clearAbstraction(asset:IAsset);
}

export = IAbstractionPool;
