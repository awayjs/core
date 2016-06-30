import {IAsset}						from "../library/IAsset";
import {AbstractionBase}				from "../library/AbstractionBase";

export interface IAbstractionPool
{
	getAbstraction(asset:IAsset):AbstractionBase;
	clearAbstraction(asset:IAsset);
}
