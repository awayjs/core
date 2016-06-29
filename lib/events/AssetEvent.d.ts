import { IAsset } from "../library/IAsset";
import { EventBase } from "../events/EventBase";
/**
 * @export class away.events.AssetEvent
 */
export declare class AssetEvent extends EventBase {
    /**
     * Dispatched when the content of an asset is invalidated
     */
    static INVALIDATE: string;
    /**
     * Dispatched when an asset is diposed
     */
    static DISPOSE: string;
    /**
     * Dispatched when an asset is cleared
     */
    static CLEAR: string;
    /**
     *
     */
    static RENAME: string;
    /**
     *
     */
    static ENTER_FRAME: string;
    /**
     *
     */
    static EXIT_FRAME: string;
    /**
     *
     */
    static ASSET_CONFLICT_RESOLVED: string;
    /**
     * Dispatched when the loading of an asset and all of its dependencies is complete.
     */
    static ASSET_COMPLETE: string;
    /**
     *
     */
    static TEXTURE_SIZE_ERROR: string;
    private _asset;
    private _prevName;
    /**
     *
     */
    constructor(type: string, asset: IAsset, prevName?: string);
    /**
     *
     */
    readonly asset: IAsset;
    /**
     *
     */
    readonly prevName: string;
    /**
     *
     */
    clone(): AssetEvent;
}
