import { ConflictStrategyBase } from "../library/ConflictStrategyBase";
import { IAsset } from "../library/IAsset";
export declare class IgnoreConflictStrategy extends ConflictStrategyBase {
    constructor();
    resolveConflict(changedAsset: IAsset, oldAsset: IAsset, assetsDictionary: Object, precedence: string): void;
    create(): ConflictStrategyBase;
}
