import { IEventDispatcher } from '../events/IEventDispatcher';
import { IAbstraction } from './IAbstraction';

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
	readonly id: number;

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

	addAbstraction(abstraction: IAbstraction): void;

	removeAbstraction(abstraction: IAbstraction): void;
}
