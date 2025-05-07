import { AssetBase } from '../library/AssetBase';

const USE_WEAK = ('WeakRef' in self);

export class WeakAssetSet {

	private _assets: Record<number, WeakRef<AssetBase> | AssetBase> = Object.create(null);
	private _numAssets: number;

	public get numAssets(): number {
		return this._numAssets;
	}

	public add(asset: AssetBase): void {
		if (!asset)
			return;

		this._assets[asset.id] = USE_WEAK ? new self.WeakRef(asset) : asset;
		this._numAssets++;
	}

	public remove(asset: AssetBase): any {
		if (!(asset.id in this._assets))
			return;

		this._numAssets--;
		delete this._assets[asset.id];
	}

	public forEach(callback: (asset) => void): void {
		let asset: WeakRef<AssetBase> | AssetBase | undefined;

		for (const key in this._assets) {
			asset = this._assets[key];

			if (USE_WEAK) {
				asset = (<WeakRef<AssetBase>> asset)?.deref();

				if (!asset) {
					console.debug('[WeakAssetSet] asset was deleted by GC:', key);
					this._numAssets--;
					delete this._assets[key];
					continue;
				}
			}

			callback(asset);
		}
	}
}