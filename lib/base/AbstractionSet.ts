import { IAbstraction } from '../library/IAbstraction';
import { IAbstractionPool } from '../library/IAbstractionPool';
import { IAsset } from '../library/IAsset';

export class AbstractionSet {
	private __finalizer: FinalizationRegistry<number>;

	private _abstractions: Record<number, IAbstraction> = {};

	public get finalizer(): FinalizationRegistry<number> {
		return this.__finalizer || (this.__finalizer = new FinalizationRegistry((id: number) => {
			const abstraction = this._abstractions[id];

			if (abstraction) { // check abstraction hasn't already been cleared
				abstraction.onClear();
			}
		}));
	}

	constructor(
		public readonly pool: IAbstractionPool
	) {}

	public forEach(callback: (asset: IAsset) => void): void {
		for (const key in this._abstractions)
			callback(<IAsset> this._abstractions[key]);
	}

	public getAbstraction <T extends IAbstraction>(asset: IAsset): T {
		return <T> this._abstractions[asset.id]
			|| <T> (this._abstractions[asset.id] = this.getNewAbstraction(asset));
	}

	public checkAbstraction <T extends IAbstraction>(asset: IAsset): T {
		return <T> this._abstractions[asset.id];
	}

	public clearAbstraction(id: number, assetType: string) {
		this.pool.storeAbstraction(this._abstractions[id], assetType);
		delete this._abstractions[id];
	}

	public getNewAbstraction(asset: IAsset): IAbstraction {
		const abstraction: IAbstraction = this.pool.requestAbstraction(asset);
		abstraction.init(asset, this.pool);
		return abstraction;
	}
}