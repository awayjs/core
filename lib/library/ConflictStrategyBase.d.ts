import { IAsset } from "../library/IAsset";
/**
 * Abstract base export class for naming conflict resolution classes. Extend this to create a
 * strategy export class which the asset library can use to resolve asset naming conflicts, or
 * use one of the bundled concrete strategy classes:
 *
 * <ul>
 *   <li>IgnoreConflictStrategy (ConflictStrategy.IGNORE)</li>
 *   <li>ErrorConflictStrategy (ConflictStrategy.THROW_ERROR)</li>
 *   <li>NumSuffixConflictStrategy (ConflictStrategy.APPEND_NUM_SUFFIX)</li>
 * </ul>
 *
 * @see away.library.AssetLibrary.conflictStrategy
 * @see away.library.ConflictStrategy
 * @see away.library.IgnoreConflictStrategy
 * @see away.library.ErrorConflictStrategy
 * @see away.library.NumSuffixConflictStrategy
 */
export declare class ConflictStrategyBase {
    constructor();
    /**
     * Resolve a naming conflict between two assets. Must be implemented by concrete strategy
     * classes.
     */
    resolveConflict(changedAsset: IAsset, oldAsset: IAsset, assetsDictionary: Object, precedence: string): void;
    /**
     * Create instance of this conflict strategy. Used internally by the AssetLibrary to
     * make sure the same strategy instance is not used in all AssetLibrary instances, which
     * would break any state caching that happens inside the strategy class.
     */
    create(): ConflictStrategyBase;
    /**
     * Provided as a convenience method for all conflict strategy classes, as a way to finalize
     * the conflict resolution by applying the new names and dispatching the correct events.
     */
    _pUpdateNames(ns: string, nonConflictingName: string, oldAsset: IAsset, newAsset: IAsset, assetsDictionary: Object, precedence: string): void;
}
