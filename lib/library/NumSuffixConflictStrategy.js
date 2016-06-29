"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ConflictStrategyBase_1 = require("../library/ConflictStrategyBase");
var NumSuffixConflictStrategy = (function (_super) {
    __extends(NumSuffixConflictStrategy, _super);
    function NumSuffixConflictStrategy(separator) {
        if (separator === void 0) { separator = '.'; }
        _super.call(this);
        this._separator = separator;
        this._next_suffix = {};
    }
    NumSuffixConflictStrategy.prototype.resolveConflict = function (changedAsset, oldAsset, assetsDictionary, precedence) {
        var orig;
        var new_name;
        var base;
        var suffix;
        orig = changedAsset.name;
        if (orig.indexOf(this._separator) >= 0) {
            // Name has an ocurrence of the separator, so get base name and suffix,
            // unless suffix is non-numerical, in which case revert to zero and
            // use entire name as base
            base = orig.substring(0, orig.lastIndexOf(this._separator));
            suffix = parseInt(orig.substring(base.length - 1));
            if (isNaN(suffix)) {
                base = orig;
                suffix = 0;
            }
        }
        else {
            base = orig;
            suffix = 0;
        }
        if (suffix == 0 && this._next_suffix.hasOwnProperty(base)) {
            suffix = this._next_suffix[base];
        }
        // Find the first suffixed name that does
        // not collide with other names.
        do {
            suffix++;
            new_name = base.concat(this._separator, suffix.toString());
        } while (assetsDictionary.hasOwnProperty(new_name));
        this._next_suffix[base] = suffix;
        this._pUpdateNames(oldAsset.assetNamespace, new_name, oldAsset, changedAsset, assetsDictionary, precedence);
    };
    NumSuffixConflictStrategy.prototype.create = function () {
        return new NumSuffixConflictStrategy(this._separator);
    };
    return NumSuffixConflictStrategy;
}(ConflictStrategyBase_1.ConflictStrategyBase));
exports.NumSuffixConflictStrategy = NumSuffixConflictStrategy;
