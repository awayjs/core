var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Error = require("awayjs-core/lib/errors/Error");
/**
 * RangeError is thrown when an index is accessed out of range of the number of
 * available indices on an Array.
 */
var RangeError = (function (_super) {
    __extends(RangeError, _super);
    /**
     * Create a new RangeError.
     *
     * @param message An optional message to override the default error message.
     * @param id The id of the error.
     */
    function RangeError(message, id) {
        if (message === void 0) { message = null; }
        if (id === void 0) { id = 0; }
        _super.call(this, message || "RangeError", id);
    }
    return RangeError;
})(Error);
module.exports = RangeError;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvUmFuZ2VFcnJvci50cyJdLCJuYW1lcyI6WyJSYW5nZUVycm9yIiwiUmFuZ2VFcnJvci5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUUzRCxBQUlBOzs7R0FERztJQUNHLFVBQVU7SUFBU0EsVUFBbkJBLFVBQVVBLFVBQWNBO0lBRTdCQTs7Ozs7T0FLR0E7SUFDSEEsU0FSS0EsVUFBVUEsQ0FRSEEsT0FBcUJBLEVBQUVBLEVBQWFBO1FBQXBDQyx1QkFBcUJBLEdBQXJCQSxjQUFxQkE7UUFBRUEsa0JBQWFBLEdBQWJBLE1BQWFBO1FBRS9DQSxrQkFBTUEsT0FBT0EsSUFBSUEsWUFBWUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFDcENBLENBQUNBO0lBQ0ZELGlCQUFDQTtBQUFEQSxDQVpBLEFBWUNBLEVBWndCLEtBQUssRUFZN0I7QUFFRCxBQUFvQixpQkFBWCxVQUFVLENBQUMiLCJmaWxlIjoiZXJyb3JzL1JhbmdlRXJyb3IuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XHJcblxyXG4vKipcclxuICogUmFuZ2VFcnJvciBpcyB0aHJvd24gd2hlbiBhbiBpbmRleCBpcyBhY2Nlc3NlZCBvdXQgb2YgcmFuZ2Ugb2YgdGhlIG51bWJlciBvZlxyXG4gKiBhdmFpbGFibGUgaW5kaWNlcyBvbiBhbiBBcnJheS5cclxuICovXHJcbmNsYXNzIFJhbmdlRXJyb3IgZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0LyoqXHJcblx0ICogQ3JlYXRlIGEgbmV3IFJhbmdlRXJyb3IuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbWVzc2FnZSBBbiBvcHRpb25hbCBtZXNzYWdlIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IGVycm9yIG1lc3NhZ2UuXHJcblx0ICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgZXJyb3IuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IobWVzc2FnZTpzdHJpbmcgPSBudWxsLCBpZDpudW1iZXIgPSAwKVxyXG5cdHtcclxuXHRcdHN1cGVyKG1lc3NhZ2UgfHwgXCJSYW5nZUVycm9yXCIsIGlkKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFJhbmdlRXJyb3I7Il19