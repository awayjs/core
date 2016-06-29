import { AssetBase } from "../library/AssetBase";
/**
 *
 */
export declare class SamplerBase extends AssetBase {
    private _smooth;
    private _mipmap;
    /**
     *
     */
    smooth: boolean;
    /**
     *
     */
    mipmap: boolean;
    /**
     *
     */
    constructor(smooth?: boolean, mipmap?: boolean);
}
