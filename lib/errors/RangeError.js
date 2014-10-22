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
        if (typeof message === "undefined") { message = null; }
        if (typeof id === "undefined") { id = 0; }
        _super.call(this, message || "RangeError", id);
    }
    return RangeError;
})(Error);

module.exports = RangeError;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9ycy9SYW5nZUVycm9yLnRzIl0sIm5hbWVzIjpbIlJhbmdlRXJyb3IiLCJSYW5nZUVycm9yLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFBMkQ7O0FBRTNEOzs7RUFHRztBQUNIO0lBQXlCQSw2QkFBS0E7SUFRN0JBOzs7OztNQURHQTtJQUNIQSxvQkFBWUEsT0FBcUJBLEVBQUVBLEVBQWFBO1FBQXBDQyxzQ0FBQUEsT0FBT0EsR0FBVUEsSUFBSUE7QUFBQUEsUUFBRUEsaUNBQUFBLEVBQUVBLEdBQVVBLENBQUNBO0FBQUFBLFFBRS9DQSxXQUFNQSxPQUFBQSxPQUFPQSxJQUFJQSxZQUFZQSxFQUFFQSxFQUFFQSxDQUFDQTtJQUNuQ0EsQ0FBQ0E7SUFDRkQsa0JBQUNBO0FBQURBLENBQUNBLEVBWndCLEtBQUssRUFZN0I7O0FBRUQsMkJBQW9CLENBQUEiLCJmaWxlIjoiZXJyb3JzL1JhbmdlRXJyb3IuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJyb3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9FcnJvclwiKTtcblxuLyoqXG4gKiBSYW5nZUVycm9yIGlzIHRocm93biB3aGVuIGFuIGluZGV4IGlzIGFjY2Vzc2VkIG91dCBvZiByYW5nZSBvZiB0aGUgbnVtYmVyIG9mXG4gKiBhdmFpbGFibGUgaW5kaWNlcyBvbiBhbiBBcnJheS5cbiAqL1xuY2xhc3MgUmFuZ2VFcnJvciBleHRlbmRzIEVycm9yXG57XG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgUmFuZ2VFcnJvci5cblx0ICpcblx0ICogQHBhcmFtIG1lc3NhZ2UgQW4gb3B0aW9uYWwgbWVzc2FnZSB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBlcnJvciBtZXNzYWdlLlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBlcnJvci5cblx0ICovXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2U6c3RyaW5nID0gbnVsbCwgaWQ6bnVtYmVyID0gMClcblx0e1xuXHRcdHN1cGVyKG1lc3NhZ2UgfHwgXCJSYW5nZUVycm9yXCIsIGlkKTtcblx0fVxufVxuXG5leHBvcnQgPSBSYW5nZUVycm9yOyJdfQ==