var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ConflictStrategyBase = require("awayjs-core/lib/library/ConflictStrategyBase");
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
})(ConflictStrategyBase);
module.exports = IgnoreConflictStrategy;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lnbm9yZUNvbmZsaWN0U3RyYXRlZ3kudHMiXSwibmFtZXMiOlsiSWdub3JlQ29uZmxpY3RTdHJhdGVneSIsIklnbm9yZUNvbmZsaWN0U3RyYXRlZ3kuY29uc3RydWN0b3IiLCJJZ25vcmVDb25mbGljdFN0cmF0ZWd5LnJlc29sdmVDb25mbGljdCIsIklnbm9yZUNvbmZsaWN0U3RyYXRlZ3kuY3JlYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLG9CQUFvQixXQUFZLDhDQUE4QyxDQUFDLENBQUM7QUFHdkYsSUFBTSxzQkFBc0I7SUFBU0EsVUFBL0JBLHNCQUFzQkEsVUFBNkJBO0lBRXhEQSxTQUZLQSxzQkFBc0JBO1FBSTFCQyxpQkFBT0EsQ0FBQ0E7SUFDVEEsQ0FBQ0E7SUFFTUQsZ0RBQWVBLEdBQXRCQSxVQUF1QkEsWUFBbUJBLEVBQUVBLFFBQWVBLEVBQUVBLGdCQUF1QkEsRUFBRUEsVUFBaUJBO1FBRXRHRSxBQUNBQSx3REFEd0RBO1FBQ3hEQSxNQUFNQSxDQUFDQTtJQUNSQSxDQUFDQTtJQUVNRix1Q0FBTUEsR0FBYkE7UUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsc0JBQXNCQSxFQUFFQSxDQUFDQTtJQUNyQ0EsQ0FBQ0E7SUFDRkgsNkJBQUNBO0FBQURBLENBakJBLEFBaUJDQSxFQWpCb0Msb0JBQW9CLEVBaUJ4RDtBQUVELEFBQWdDLGlCQUF2QixzQkFBc0IsQ0FBQyIsImZpbGUiOiJsaWJyYXJ5L0lnbm9yZUNvbmZsaWN0U3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbmZsaWN0U3RyYXRlZ3lCYXNlXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0NvbmZsaWN0U3RyYXRlZ3lCYXNlXCIpO1xuaW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XG5cbmNsYXNzIElnbm9yZUNvbmZsaWN0U3RyYXRlZ3kgZXh0ZW5kcyBDb25mbGljdFN0cmF0ZWd5QmFzZVxue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0cHVibGljIHJlc29sdmVDb25mbGljdChjaGFuZ2VkQXNzZXQ6SUFzc2V0LCBvbGRBc3NldDpJQXNzZXQsIGFzc2V0c0RpY3Rpb25hcnk6T2JqZWN0LCBwcmVjZWRlbmNlOnN0cmluZylcblx0e1xuXHRcdC8vIERvIG5vdGhpbmcsIGlnbm9yZSB0aGUgZmFjdCB0aGF0IHRoZXJlIGlzIGEgY29uZmxpY3QuXG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0cHVibGljIGNyZWF0ZSgpOkNvbmZsaWN0U3RyYXRlZ3lCYXNlXG5cdHtcblx0XHRyZXR1cm4gbmV3IElnbm9yZUNvbmZsaWN0U3RyYXRlZ3koKTtcblx0fVxufVxuXG5leHBvcnQgPSBJZ25vcmVDb25mbGljdFN0cmF0ZWd5OyJdfQ==