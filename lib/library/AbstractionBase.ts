import { AssetBase } from './AssetBase';
import { IAbstraction } from './IAbstraction';

import { IAbstractionPool } from './IAbstractionPool';
import { IAsset } from './IAsset';

const USE_WEAK = ('WeakRef' in self);

/**
 *
 * @export class away.pool.AbstractionBase
 */
export class AbstractionBase extends AssetBase implements IAbstraction {

	protected _poolId: number;

	protected _pool: WeakRef<IAbstractionPool> | IAbstractionPool;

	protected _useWeak: boolean;

	protected _asset: IAsset;

	protected _invalid: boolean = true;

	public get asset(): IAsset {
		return this._asset;
	}

	constructor() {
		super();
	}

	public init(asset: IAsset, pool: IAbstractionPool, useWeak: boolean = false): void {
		this._asset = asset;
		this._useWeak = USE_WEAK && useWeak;
		this._pool = this._useWeak ? new self.WeakRef(pool) : pool;

		this._invalid = true;

		if (this._useWeak) {
			this._asset.finalizer.register(pool, pool.id, this);
			this._poolId = pool.id;
		}
	}

	/**
	 *
	 */
	public onClear(): void {
		if (this._useWeak) {
			this._asset.finalizer.unregister(this);
			this._asset.clearAbstraction((<WeakRef<IAbstractionPool>> this._pool).deref() || this._poolId);
		} else {
			this._asset.clearAbstraction(<IAbstractionPool> this._pool);
		}

		this._pool = null;
		this._asset = null;
	}

	/**
	 *
	 */
	public onInvalidate(): void {
		this._invalid = true;
	}
}