import { IAsset } from "../library/IAsset";
import { IAssetClass } from "../library/IAssetClass";
import { EventDispatcher } from "../events/EventDispatcher";
export declare class AssetBase extends EventDispatcher implements IAsset {
    static ID_COUNT: number;
    private _originalName;
    private _namespace;
    private _name;
    private _id;
    private _full_path;
    static DEFAULT_NAMESPACE: string;
    constructor(name?: string);
    /**
     *
     */
    readonly assetType: string;
    /**
     * The original name used for this asset in the resource (e.g. file) in which
     * it was found. This may not be the same as <code>name</code>, which may
     * have changed due to of a name conflict.
     */
    readonly originalName: string;
    /**
     * A unique id for the asset, used to identify assets in an associative array
     */
    readonly id: number;
    name: string;
    /**
     *
     */
    invalidate(): void;
    /**
     * @inheritDoc
     */
    dispose(): void;
    clear(): void;
    readonly assetNamespace: string;
    readonly assetFullPath: Array<string>;
    assetPathEquals(name: string, ns: string): boolean;
    isAsset(assetClass: IAssetClass): boolean;
    resetAssetPath(name: string, ns?: string, overrideOriginal?: boolean): void;
    private updateFullPath();
}
