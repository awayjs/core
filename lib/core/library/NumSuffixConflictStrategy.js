var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ConflictStrategyBase = require("awayjs-core/lib/core/library/ConflictStrategyBase");

var NumSuffixConflictStrategy = (function (_super) {
    __extends(NumSuffixConflictStrategy, _super);
    function NumSuffixConflictStrategy(separator) {
        if (typeof separator === "undefined") { separator = '.'; }
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
        } else {
            base = orig;
            suffix = 0;
        }

        if (suffix == 0 && this._next_suffix.hasOwnProperty(base)) {
            suffix = this._next_suffix[base];
        }

        do {
            suffix++;

            new_name = base.concat(this._separator, suffix.toString());
        } while(assetsDictionary.hasOwnProperty(new_name));

        this._next_suffix[base] = suffix;
        this._pUpdateNames(oldAsset.assetNamespace, new_name, oldAsset, changedAsset, assetsDictionary, precedence);
    };

    NumSuffixConflictStrategy.prototype.create = function () {
        return new NumSuffixConflictStrategy(this._separator);
    };
    return NumSuffixConflictStrategy;
})(ConflictStrategyBase);

module.exports = NumSuffixConflictStrategy;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbGlicmFyeS9OdW1TdWZmaXhDb25mbGljdFN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbIk51bVN1ZmZpeENvbmZsaWN0U3RyYXRlZ3kiLCJOdW1TdWZmaXhDb25mbGljdFN0cmF0ZWd5LmNvbnN0cnVjdG9yIiwiTnVtU3VmZml4Q29uZmxpY3RTdHJhdGVneS5yZXNvbHZlQ29uZmxpY3QiLCJOdW1TdWZmaXhDb25mbGljdFN0cmF0ZWd5LmNyZWF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsdUZBQTRGOztBQUc1RjtJQUF3Q0EsNENBQW9CQTtJQUszREEsbUNBQVlBLFNBQXNCQTtRQUF0QkMsd0NBQUFBLFNBQVNBLEdBQVVBLEdBQUdBO0FBQUFBLFFBRWpDQSxXQUFNQSxLQUFBQSxDQUFDQTs7UUFFUEEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsU0FBU0E7UUFDM0JBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLEVBQUVBO0lBQ3ZCQSxDQUFDQTtJQUVERCxzREFBQUEsVUFBdUJBLFlBQW1CQSxFQUFFQSxRQUFlQSxFQUFFQSxnQkFBdUJBLEVBQUVBLFVBQWlCQTtRQUV0R0UsSUFBSUEsSUFBSUE7UUFDUkEsSUFBSUEsUUFBUUE7UUFDWkEsSUFBSUEsSUFBSUE7UUFDUkEsSUFBSUEsTUFBTUE7O1FBRVZBLElBQUlBLEdBQUdBLFlBQVlBLENBQUNBLElBQUlBOztRQUV4QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBRUE7WUFDdkNBLHVFQUF1RUE7WUFDdkVBLG1FQUFtRUE7WUFDbkVBLDBCQUEwQkE7WUFDMUJBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1lBQzNEQSxNQUFNQSxHQUFHQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTs7WUFFbERBLElBQUlBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUVBO2dCQUNsQkEsSUFBSUEsR0FBR0EsSUFBSUE7Z0JBQ1hBLE1BQU1BLEdBQUdBLENBQUNBO2FBQ1ZBO1NBRURBLEtBQU1BO1lBQ05BLElBQUlBLEdBQUdBLElBQUlBO1lBQ1hBLE1BQU1BLEdBQUdBLENBQUNBO1NBQ1ZBOztRQUVEQSxJQUFJQSxNQUFNQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFFQTtZQUUxREEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7U0FFaENBOztRQUlEQSxFQUFHQTtZQUVGQSxNQUFNQSxFQUFFQTs7WUFFUkEsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FFMURBLE1BQU1BLENBQUVBLGdCQUFnQkEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBRUE7O1FBRXBEQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFFQSxJQUFJQSxDQUFFQSxHQUFHQSxNQUFNQTtRQUNsQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsY0FBY0EsRUFBRUEsUUFBUUEsRUFBRUEsUUFBUUEsRUFBRUEsWUFBWUEsRUFBRUEsZ0JBQWdCQSxFQUFFQSxVQUFVQSxDQUFDQTtJQUU1R0EsQ0FBQ0E7O0lBRURGLDZDQUFBQTtRQUVDRyxPQUFPQSxJQUFJQSx5QkFBeUJBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO0lBQ3REQSxDQUFDQTtJQUNGSCxpQ0FBQ0E7QUFBREEsQ0FBQ0EsRUFoRXVDLG9CQUFvQixFQWdFM0Q7O0FBRUQsMENBQW1DLENBQUEiLCJmaWxlIjoiY29yZS9saWJyYXJ5L051bVN1ZmZpeENvbmZsaWN0U3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29uZmxpY3RTdHJhdGVneUJhc2VcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9Db25mbGljdFN0cmF0ZWd5QmFzZVwiKTtcbmltcG9ydCBJQXNzZXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9JQXNzZXRcIik7XG5cbmNsYXNzIE51bVN1ZmZpeENvbmZsaWN0U3RyYXRlZ3kgZXh0ZW5kcyBDb25mbGljdFN0cmF0ZWd5QmFzZVxue1xuXHRwcml2YXRlIF9zZXBhcmF0b3I6c3RyaW5nO1xuXHRwcml2YXRlIF9uZXh0X3N1ZmZpeDpPYmplY3Q7XG5cblx0Y29uc3RydWN0b3Ioc2VwYXJhdG9yOnN0cmluZyA9ICcuJylcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9zZXBhcmF0b3IgPSBzZXBhcmF0b3I7XG5cdFx0dGhpcy5fbmV4dF9zdWZmaXggPSB7fTtcblx0fVxuXG5cdHB1YmxpYyByZXNvbHZlQ29uZmxpY3QoY2hhbmdlZEFzc2V0OklBc3NldCwgb2xkQXNzZXQ6SUFzc2V0LCBhc3NldHNEaWN0aW9uYXJ5Ok9iamVjdCwgcHJlY2VkZW5jZTpzdHJpbmcpXG5cdHtcblx0XHR2YXIgb3JpZzpzdHJpbmc7XG5cdFx0dmFyIG5ld19uYW1lOnN0cmluZztcblx0XHR2YXIgYmFzZTpzdHJpbmc7XG5cdFx0dmFyIHN1ZmZpeDpudW1iZXI7XG5cblx0XHRvcmlnID0gY2hhbmdlZEFzc2V0Lm5hbWU7XG5cblx0XHRpZiAob3JpZy5pbmRleE9mKHRoaXMuX3NlcGFyYXRvcikgPj0gMCkge1xuXHRcdFx0Ly8gTmFtZSBoYXMgYW4gb2N1cnJlbmNlIG9mIHRoZSBzZXBhcmF0b3IsIHNvIGdldCBiYXNlIG5hbWUgYW5kIHN1ZmZpeCxcblx0XHRcdC8vIHVubGVzcyBzdWZmaXggaXMgbm9uLW51bWVyaWNhbCwgaW4gd2hpY2ggY2FzZSByZXZlcnQgdG8gemVybyBhbmRcblx0XHRcdC8vIHVzZSBlbnRpcmUgbmFtZSBhcyBiYXNlXG5cdFx0XHRiYXNlID0gb3JpZy5zdWJzdHJpbmcoMCwgb3JpZy5sYXN0SW5kZXhPZih0aGlzLl9zZXBhcmF0b3IpKTtcblx0XHRcdHN1ZmZpeCA9IHBhcnNlSW50KG9yaWcuc3Vic3RyaW5nKGJhc2UubGVuZ3RoIC0gMSkpO1xuXG5cdFx0XHRpZiAoaXNOYU4oc3VmZml4KSkge1xuXHRcdFx0XHRiYXNlID0gb3JpZztcblx0XHRcdFx0c3VmZml4ID0gMDtcblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRiYXNlID0gb3JpZztcblx0XHRcdHN1ZmZpeCA9IDA7XG5cdFx0fVxuXG5cdFx0aWYgKHN1ZmZpeCA9PSAwICYmIHRoaXMuX25leHRfc3VmZml4Lmhhc093blByb3BlcnR5KGJhc2UpKSB7XG5cblx0XHRcdHN1ZmZpeCA9IHRoaXMuX25leHRfc3VmZml4W2Jhc2VdO1xuXG5cdFx0fVxuXG5cdFx0Ly8gRmluZCB0aGUgZmlyc3Qgc3VmZml4ZWQgbmFtZSB0aGF0IGRvZXNcblx0XHQvLyBub3QgY29sbGlkZSB3aXRoIG90aGVyIG5hbWVzLlxuXHRcdGRvIHtcblxuXHRcdFx0c3VmZml4Kys7XG5cblx0XHRcdG5ld19uYW1lID0gYmFzZS5jb25jYXQodGhpcy5fc2VwYXJhdG9yLCBzdWZmaXgudG9TdHJpbmcoKSk7XG5cblx0XHR9IHdoaWxlIChhc3NldHNEaWN0aW9uYXJ5Lmhhc093blByb3BlcnR5KG5ld19uYW1lKSk7XG5cblx0XHR0aGlzLl9uZXh0X3N1ZmZpeFsgYmFzZSBdID0gc3VmZml4O1xuXHRcdHRoaXMuX3BVcGRhdGVOYW1lcyhvbGRBc3NldC5hc3NldE5hbWVzcGFjZSwgbmV3X25hbWUsIG9sZEFzc2V0LCBjaGFuZ2VkQXNzZXQsIGFzc2V0c0RpY3Rpb25hcnksIHByZWNlZGVuY2UpO1xuXG5cdH1cblxuXHRwdWJsaWMgY3JlYXRlKCk6Q29uZmxpY3RTdHJhdGVneUJhc2Vcblx0e1xuXHRcdHJldHVybiBuZXcgTnVtU3VmZml4Q29uZmxpY3RTdHJhdGVneSh0aGlzLl9zZXBhcmF0b3IpO1xuXHR9XG59XG5cbmV4cG9ydCA9IE51bVN1ZmZpeENvbmZsaWN0U3RyYXRlZ3k7Il19