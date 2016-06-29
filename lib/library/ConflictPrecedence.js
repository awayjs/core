"use strict";
/**
 * Enumaration export class for precedence when resolving naming conflicts in the library.
 *
 * @see away.library.AssetLibrary.conflictPrecedence
 * @see away.library.AssetLibrary.conflictStrategy
 * @see away.library.naming.ConflictStrategy
 */
var ConflictPrecedence = (function () {
    function ConflictPrecedence() {
    }
    /**
     * Signals that in a conflict, the previous owner of the conflicting name
     * should be favored (and keep it's name) and that the newly renamed asset
     * is reverted to a non-conflicting name.
     */
    ConflictPrecedence.FAVOR_OLD = 'favorOld';
    /**
     * Signales that in a conflict, the newly renamed asset is favored (and keeps
     * it's newly defined name) and that the previous owner of that name gets
     * renamed to a non-conflicting name.
     */
    ConflictPrecedence.FAVOR_NEW = 'favorNew';
    return ConflictPrecedence;
}());
exports.ConflictPrecedence = ConflictPrecedence;
