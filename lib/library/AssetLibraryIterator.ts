import { IAssetAdapter } from './IAssetAdapter';

export class AssetLibraryIterator {

	private  _assets: Array<IAssetAdapter>;
	private _filtered: Array<IAssetAdapter>;

	private _idx: number;

	constructor(assets: Array<IAssetAdapter>, assetTypeFilter: string, namespaceFilter: string, filterFunc) {
		this._assets = assets;
		this.filter(assetTypeFilter, namespaceFilter, filterFunc);
	}

	public get currentAsset(): IAssetAdapter {
		// Return current, or null if no current
		return (this._idx < this._filtered.length) ? this._filtered[ this._idx ] : null;
	}

	public get numAssets(): number {
		return this._filtered.length;
	}

	public next(): IAssetAdapter {
		let next: IAssetAdapter = null;

		if (this._idx < this._filtered.length)
			next = this._filtered[this._idx];

		this._idx++;

		return next;
	}

	public reset(): void {
		this._idx = 0;
	}

	public setIndex(index: number): void {
		this._idx = index;
	}

	private filter(assetTypeFilter: string, namespaceFilter: string, filterFunc): void {
		if (assetTypeFilter || namespaceFilter) {

			let idx: number;
			let asset: IAssetAdapter;

			idx = 0;
			this._filtered = new Array<IAssetAdapter>();//new Vector.<IAsset>;

			const l: number = this._assets.length;

			for (let c: number = 0; c < l; c++) {

				asset = <IAssetAdapter> this._assets[c];

				// Skip this assets if filtering on type and this is wrong type
				if (assetTypeFilter && asset.adaptee.assetType != assetTypeFilter)
					continue;

				// Skip this asset if filtering on namespace and this is wrong namespace
				if (namespaceFilter && asset.adaptee.assetNamespace != namespaceFilter)
					continue;

				// Skip this asset if a filter func has been provided and it returns false
				if (filterFunc != null && !filterFunc(asset))
					continue;

				this._filtered[idx++] = asset;

			}

			/*
			 for each (asset in _assets) {
			 // Skip this assets if filtering on type and this is wrong type
			 if (assetTypeFilter && asset.assetType != assetTypeFilter)
			 continue;

			 // Skip this asset if filtering on namespace and this is wrong namespace
			 if (namespaceFilter && asset.assetNamespace != namespaceFilter)
			 continue;

			 // Skip this asset if a filter func has been provided and it returns false
			 if (filterFunc != null && !filterFunc(asset))
			 continue;

			 _filtered[idx++] = asset;
			 }
			 */

		} else {
			this._filtered = this._assets;
		}
	}
}