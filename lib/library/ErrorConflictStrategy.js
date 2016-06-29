"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ConflictStrategyBase_1 = require("../library/ConflictStrategyBase");
var ErrorBase_1 = require("../errors/ErrorBase");
var ErrorConflictStrategy = (function (_super) {
    __extends(ErrorConflictStrategy, _super);
    function ErrorConflictStrategy() {
        _super.call(this);
    }
    ErrorConflictStrategy.prototype.resolveConflict = function (changedAsset, oldAsset, assetsDictionary, precedence) {
        throw new ErrorBase_1.ErrorBase('Asset name collision while AssetLibrary.namingStrategy set to AssetLibrary.THROW_ERROR. Asset path: ' + changedAsset.assetFullPath);
    };
    ErrorConflictStrategy.prototype.create = function () {
        return new ErrorConflictStrategy();
    };
    return ErrorConflictStrategy;
}(ConflictStrategyBase_1.ConflictStrategyBase));
exports.ErrorConflictStrategy = ErrorConflictStrategy;
