import { IAsset } from '../library/IAsset';

const USE_WEAK = ('WeakRef' in self);

export class WeakAssetSet<T extends IAsset> {

	private _assets: Record<number, WeakRef<T> | T> = {};
	private _numAssets: number = 0;

	public get numAssets(): number {
		return this._numAssets;
	}

	public add(asset: T): void {
		if (!asset || this._assets[asset.id])
			return;

		this._assets[asset.id] = USE_WEAK ? new self.WeakRef(asset) : asset;
		this._numAssets++;
	}

	public remove(asset: T): any {
		if (!asset || !this._assets[asset.id])
			return;

		this._numAssets--;
		delete this._assets[asset.id];
	}

	public clear(): void {
		this._assets = {};
		this._numAssets = 0;
	}

	public forEach(callback: (asset: T) => void): void {
		let asset: WeakRef<T> | T | undefined;

		for (const key in this._assets) {
			asset = this._assets[key];

			if (USE_WEAK) {
				asset = (<WeakRef<T>> asset).deref();

				if (!asset) {
					this._numAssets--;
					delete this._assets[key];
					continue;
				}
			}

			callback(<T> asset);
		}
	}
}