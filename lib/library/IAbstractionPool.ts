import IAsset						from "awayjs-core/lib/library/IAsset";
import AbstractionBase				from "awayjs-core/lib/library/AbstractionBase";

interface IAbstractionPool
{
	getAbstraction(asset:IAsset):AbstractionBase;
	clearAbstraction(asset:IAsset);
}

export default IAbstractionPool;
