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
	private _assetId: number;
	private _assetType: string;

	protected _pool: IAbstractionPool;

	protected _useWeak: boolean;

	protected _asset: WeakRef<IAsset> | IAsset;

	protected _invalid: boolean = true;

	constructor() {
		super();
	}

	public init(asset: IAsset, pool: IAbstractionPool, useWeak: boolean = false): void {
		this._useWeak = USE_WEAK && useWeak;
		this._asset = this._useWeak ? new self.WeakRef(asset) : asset;
		this._assetId = asset.id;
		this._assetType = asset.assetType;
		this._pool = pool;

		this._invalid = true;

		if (this._useWeak)
			this._pool.abstractions.finalizer.register(asset, asset.id, this);

		asset.addAbstraction(this);
	}

	/**
	 *
	 */
	public onClear(): void {
		if (this._useWeak) {
			this._pool.abstractions.finalizer.unregister(this);
			(<WeakRef<IAsset>> this._asset).deref()?.removeAbstraction(this);
		} else {
			(<IAsset> this._asset).removeAbstraction(this);
		}

		this._pool.abstractions.clearAbstraction(this._assetId, this._assetType);
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