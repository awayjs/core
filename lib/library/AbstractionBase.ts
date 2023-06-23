import { AssetEvent } from '../events/AssetEvent';
import { AssetBase } from './AssetBase';
import { IAbstraction } from './IAbstraction';

import { IAbstractionPool } from './IAbstractionPool';
import { IAsset } from './IAsset';
import { UUID } from './UUID';

/**
 *
 * @export class away.pool.AbstractionBase
 */
export class AbstractionBase extends AssetBase implements IAbstraction {
	public _onClearDelegate: (event: AssetEvent) => void;
	public _onInvalidateDelegate: (event: AssetEvent) => void;

	protected _pool: IAbstractionPool;

	protected _asset: IAsset;

	protected _invalid: boolean = true;

	public static get ID_COUNT() {
		return UUID.Next();
	}

	public static set ID_COUNT(v: number) {
		// nothing
	}

	constructor(asset: IAsset, pool: IAbstractionPool) {
		super();

		this._asset = asset;
		this._pool = pool;

		this._onClearDelegate = (event: AssetEvent) => this.onClear(event);
		this._onInvalidateDelegate = (event: AssetEvent) => this.onInvalidate(event);

		this._asset.addEventListener(AssetEvent.CLEAR, this._onClearDelegate);
		this._asset.addEventListener(AssetEvent.INVALIDATE, this._onInvalidateDelegate);
	}

	/**
	 *
	 */
	public onClear(event: AssetEvent): void {
		this._asset.removeEventListener(AssetEvent.CLEAR, this._onClearDelegate);
		this._asset.removeEventListener(AssetEvent.INVALIDATE, this._onInvalidateDelegate);

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