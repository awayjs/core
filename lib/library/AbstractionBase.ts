import { AssetEvent } from '../events/AssetEvent';
import { AssetBase } from './AssetBase';
import { IAbstraction } from './IAbstraction';

import { IAbstractionPool } from './IAbstractionPool';
import { IAsset } from './IAsset';

/**
 *
 * @export class away.pool.AbstractionBase
 */
export class AbstractionBase extends AssetBase implements IAbstraction {

	protected _pool: IAbstractionPool;

	protected _asset: IAsset;

	protected _invalid: boolean = true;

	public get asset(): IAsset {
		return this._asset;
	}

	constructor() {
		super();
	}

	public init(asset: IAsset, pool: IAbstractionPool): void {
		this._asset = asset;
		this._pool = pool;

		this._invalid = true;
	}

	/**
	 *
	 */
	public onClear(event: AssetEvent): void {

		this._asset.clearAbstraction(this._pool);
		this._pool = null;
		this._asset = null;
	}

	/**
	 *
	 */
	public onInvalidate(event: AssetEvent): void {
		this._invalid = true;
	}
}