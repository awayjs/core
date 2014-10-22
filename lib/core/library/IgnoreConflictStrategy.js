var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ConflictStrategyBase = require("awayjs-core/lib/core/library/ConflictStrategyBase");

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbGlicmFyeS9JZ25vcmVDb25mbGljdFN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbIklnbm9yZUNvbmZsaWN0U3RyYXRlZ3kiLCJJZ25vcmVDb25mbGljdFN0cmF0ZWd5LmNvbnN0cnVjdG9yIiwiSWdub3JlQ29uZmxpY3RTdHJhdGVneS5yZXNvbHZlQ29uZmxpY3QiLCJJZ25vcmVDb25mbGljdFN0cmF0ZWd5LmNyZWF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsdUZBQTRGOztBQUc1RjtJQUFxQ0EseUNBQW9CQTtJQUV4REE7UUFFQ0MsV0FBTUEsS0FBQUEsQ0FBQ0E7SUFDUkEsQ0FBQ0E7SUFFREQsbURBQUFBLFVBQXVCQSxZQUFtQkEsRUFBRUEsUUFBZUEsRUFBRUEsZ0JBQXVCQSxFQUFFQSxVQUFpQkE7UUFFdEdFLHdEQUF3REE7UUFDeERBLE1BQU9BO0lBQ1JBLENBQUNBOztJQUVERiwwQ0FBQUE7UUFFQ0csT0FBT0EsSUFBSUEsc0JBQXNCQSxDQUFDQSxDQUFDQTtJQUNwQ0EsQ0FBQ0E7SUFDRkgsOEJBQUNBO0FBQURBLENBQUNBLEVBakJvQyxvQkFBb0IsRUFpQnhEOztBQUVELHVDQUFnQyxDQUFBIiwiZmlsZSI6ImNvcmUvbGlicmFyeS9JZ25vcmVDb25mbGljdFN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbmZsaWN0U3RyYXRlZ3lCYXNlXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvQ29uZmxpY3RTdHJhdGVneUJhc2VcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvSUFzc2V0XCIpO1xuXG5jbGFzcyBJZ25vcmVDb25mbGljdFN0cmF0ZWd5IGV4dGVuZHMgQ29uZmxpY3RTdHJhdGVneUJhc2Vcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdHB1YmxpYyByZXNvbHZlQ29uZmxpY3QoY2hhbmdlZEFzc2V0OklBc3NldCwgb2xkQXNzZXQ6SUFzc2V0LCBhc3NldHNEaWN0aW9uYXJ5Ok9iamVjdCwgcHJlY2VkZW5jZTpzdHJpbmcpXG5cdHtcblx0XHQvLyBEbyBub3RoaW5nLCBpZ25vcmUgdGhlIGZhY3QgdGhhdCB0aGVyZSBpcyBhIGNvbmZsaWN0LlxuXHRcdHJldHVybjtcblx0fVxuXG5cdHB1YmxpYyBjcmVhdGUoKTpDb25mbGljdFN0cmF0ZWd5QmFzZVxuXHR7XG5cdFx0cmV0dXJuIG5ldyBJZ25vcmVDb25mbGljdFN0cmF0ZWd5KCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gSWdub3JlQ29uZmxpY3RTdHJhdGVneTsiXX0=