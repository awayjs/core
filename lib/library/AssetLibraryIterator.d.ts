import { IAsset } from "../library/IAsset";
export declare class AssetLibraryIterator {
    private _assets;
    private _filtered;
    private _idx;
    constructor(assets: Array<IAsset>, assetTypeFilter: string, namespaceFilter: string, filterFunc: any);
    readonly currentAsset: IAsset;
    readonly numAssets: number;
    next(): IAsset;
    reset(): void;
    setIndex(index: number): void;
    private filter(assetTypeFilter, namespaceFilter, filterFunc);
}
