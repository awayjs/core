import { IEventDispatcher } from '../events/IEventDispatcher';
import { AbstractionBase } from './AbstractionBase';
import { IAbstractionPool } from './IAbstractionPool';

import { IAssetAdapter } from './IAssetAdapter';

export interface IAsset extends IEventDispatcher
{
	adapter: IAssetAdapter;

	/**
	 *
	 */
	name: string;

	/**
	 *
	 */
	id: number;

	/**
	 *
	 */
	assetNamespace: string;

	/**
	 *
	 */
	assetType: string;

	/**
	 *
	 */
	assetFullPath: Array<string>;

	/**
	 *
	 * @param name
	 * @param ns
	 */
	assetPathEquals(name: string, ns: string): boolean;

	/**
     *
     */
	clone(): IAsset;

	/**
	 *
	 */
	invalidate();

	/**
	 *
	 * @param IAssetClass
	 */
	isAsset(IAssetClass): boolean;

	/**
	 *
	 * @param name
	 * @param ns
	 * @param overrideOriginal
	 */
	resetAssetPath(name: string, ns: string, overrideOriginal?: boolean): void;

	getAbstraction<T extends AbstractionBase>(abstractionGroup: IAbstractionPool): T;
	clearAbstraction(abstractionGroup: IAbstractionPool);
}
