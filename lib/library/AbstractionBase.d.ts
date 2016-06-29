import { AssetEvent } from "../events/AssetEvent";
import { EventDispatcher } from "../events/EventDispatcher";
import { IAbstractionPool } from "../library/IAbstractionPool";
import { IAsset } from "../library/IAsset";
/**
 *
 * @export class away.pool.AbstractionBase
 */
export declare class AbstractionBase extends EventDispatcher {
    private _onClearDelegate;
    private _onInvalidateDelegate;
    _pool: IAbstractionPool;
    _asset: IAsset;
    _invalid: boolean;
    constructor(asset: IAsset, pool: IAbstractionPool);
    /**
     *
     */
    onClear(event: AssetEvent): void;
    /**
     *
     */
    onInvalidate(event: AssetEvent): void;
}
