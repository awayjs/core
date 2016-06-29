"use strict";
var ConflictPrecedence_1 = require("../library/ConflictPrecedence");
var AbstractMethodError_1 = require("../errors/AbstractMethodError");
var AssetEvent_1 = require("../events/AssetEvent");
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
var ConflictStrategyBase = (function () {
    function ConflictStrategyBase() {
    }
    /**
     * Resolve a naming conflict between two assets. Must be implemented by concrete strategy
     * classes.
     */
    ConflictStrategyBase.prototype.resolveConflict = function (changedAsset, oldAsset, assetsDictionary, precedence) {
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    /**
     * Create instance of this conflict strategy. Used internally by the AssetLibrary to
     * make sure the same strategy instance is not used in all AssetLibrary instances, which
     * would break any state caching that happens inside the strategy class.
     */
    ConflictStrategyBase.prototype.create = function () {
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    /**
     * Provided as a convenience method for all conflict strategy classes, as a way to finalize
     * the conflict resolution by applying the new names and dispatching the correct events.
     */
    ConflictStrategyBase.prototype._pUpdateNames = function (ns, nonConflictingName, oldAsset, newAsset, assetsDictionary, precedence) {
        var loser_prev_name;
        var winner;
        var loser;
        winner = (precedence === ConflictPrecedence_1.ConflictPrecedence.FAVOR_NEW) ? newAsset : oldAsset;
        loser = (precedence === ConflictPrecedence_1.ConflictPrecedence.FAVOR_NEW) ? oldAsset : newAsset;
        loser_prev_name = loser.name;
        assetsDictionary[winner.name] = winner;
        assetsDictionary[nonConflictingName] = loser;
        loser.resetAssetPath(nonConflictingName, ns, false);
        loser.dispatchEvent(new AssetEvent_1.AssetEvent(AssetEvent_1.AssetEvent.ASSET_CONFLICT_RESOLVED, loser, loser_prev_name));
    };
    return ConflictStrategyBase;
}());
exports.ConflictStrategyBase = ConflictStrategyBase;
