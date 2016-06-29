"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ConflictStrategyBase_1 = require("../library/ConflictStrategyBase");
var IgnoreConflictStrategy = (function (_super) {
    __extends(IgnoreConflictStrategy, _super);
    function IgnoreConflictStrategy() {
        _super.call(this);
    }
    IgnoreConflictStrategy.prototype.resolveConflict = function (changedAsset, oldAsset, assetsDictionary, precedence) {
        // Do nothing, ignore the fact that there is a conflict.
        return;
    };
    IgnoreConflictStrategy.prototype.create = function () {
        return new IgnoreConflictStrategy();
    };
    return IgnoreConflictStrategy;
}(ConflictStrategyBase_1.ConflictStrategyBase));
exports.IgnoreConflictStrategy = IgnoreConflictStrategy;
