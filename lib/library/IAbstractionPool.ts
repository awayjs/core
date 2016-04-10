import IAsset						from "../library/IAsset";
import AbstractionBase				from "../library/AbstractionBase";

interface IAbstractionPool
{
	getAbstraction(asset:IAsset):AbstractionBase;
	clearAbstraction(asset:IAsset);
}

export default IAbstractionPool;
