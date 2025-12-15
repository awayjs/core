import { IAsset } from './IAsset';
import { IAbstraction } from './IAbstraction';
import { AbstractionSet } from '../base/AbstractionSet';

export interface IAbstractionPool
{
	readonly id: number;

	readonly abstractions: AbstractionSet;

	requestAbstraction(asset: IAsset): IAbstraction;

	storeAbstraction(abstraction: IAbstraction, assetType?: string): void;
}
