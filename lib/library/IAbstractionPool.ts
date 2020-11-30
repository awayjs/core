import { IAsset } from './IAsset';
import { IAbstractionClass } from './IAbstractionClass';

export interface IAbstractionPool
{
	readonly id: number;

	requestAbstraction(asset: IAsset):IAbstractionClass;
}
