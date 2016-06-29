import { ConflictStrategyBase } from "../library/ConflictStrategyBase";
import { IAsset } from "../library/IAsset";
export declare class NumSuffixConflictStrategy extends ConflictStrategyBase {
    private _separator;
    private _next_suffix;
    constructor(separator?: string);
    resolveConflict(changedAsset: IAsset, oldAsset: IAsset, assetsDictionary: Object, precedence: string): void;
    create(): ConflictStrategyBase;
}
