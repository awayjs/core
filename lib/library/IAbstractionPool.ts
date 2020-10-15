import { IAsset } from './IAsset';
import { AbstractionBase } from './AbstractionBase';

export interface IAbstractionPool
{
	getAbstraction(asset: IAsset): AbstractionBase;
	clearAbstraction(asset: IAsset);
}
