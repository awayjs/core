import { IEventDispatcher } from "../events/IEventDispatcher";
export interface IAsset extends IEventDispatcher {
    /**
     *
     */
    name: string;
    /**
     *
     */
    id: number;
    /**
     *
     */
    assetNamespace: string;
    /**
     *
     */
    assetType: string;
    /**
     *
     */
    assetFullPath: Array<string>;
    /**
     *
     * @param name
     * @param ns
     */
    assetPathEquals(name: string, ns: string): boolean;
    /**
     *
     */
    invalidate(): any;
    /**
     *
     */
    clear(): any;
    /**
     *
     */
    dispose(): any;
    /**
     *
     * @param IAssetClass
     */
    isAsset(IAssetClass: any): boolean;
    /**
     *
     * @param name
     * @param ns
     * @param overrideOriginal
     */
    resetAssetPath(name: string, ns: string, overrideOriginal?: boolean): void;
}
