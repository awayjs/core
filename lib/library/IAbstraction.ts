import { IAbstractionPool } from './IAbstractionPool';
import { IAsset } from './IAsset';

export interface IAbstraction extends IAsset
{
	init(asset: IAsset, pool: IAbstractionPool, useWeak?: boolean): void;

	onClear(): void;

	onInvalidate(): void;
}
