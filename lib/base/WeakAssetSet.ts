import { IAsset } from '../library/IAsset';

const USE_WEAK = ('WeakRef' in self);

export class WeakAssetSet {

	private _assets: Record<number, WeakRef<IAsset> | IAsset> = {};
	private _numAssets: number;

	public get numAssets(): number {
		return this._numAssets;
	}

	public add(asset: IAsset): void {
		if (!asset || this._assets[asset.id])
			return;

		this._assets[asset.id] = USE_WEAK ? new self.WeakRef(asset) : asset;
		this._numAssets++;
	}

	public remove(asset: IAsset): any {
		if (!asset || !this._assets[asset.id])
			return;

		this._numAssets--;
		delete this._assets[asset.id];
	}

	public forEach(callback: (asset: IAsset) => void): void {
		let asset: WeakRef<IAsset> | IAsset | undefined;

		for (const key in this._assets) {
			asset = this._assets[key];

			if (USE_WEAK) {
				asset = (<WeakRef<IAsset>> asset).deref();

				if (!asset) {
					console.debug('[WeakAssetSet] asset was deleted by GC:', key);
					this._numAssets--;
					delete this._assets[key];
					continue;
				}
			}

			callback(<IAsset> asset);
		}
	}
}