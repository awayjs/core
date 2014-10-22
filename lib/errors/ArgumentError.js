var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Error = require("awayjs-core/lib/errors/Error");

/**
* AbstractMethodError is thrown when an abstract method is called. The method in question should be overridden
* by a concrete subclass.
*/
var ArgumentError = (function (_super) {
    __extends(ArgumentError, _super);
    /**
    * Create a new ArgumentError.
    *
    * @param message An optional message to override the default error message.
    * @param id The id of the error.
    */
    function ArgumentError(message, id) {
        if (typeof message === "undefined") { message = null; }
        if (typeof id === "undefined") { id = 0; }
        _super.call(this, message || "ArgumentError", id);
    }
    return ArgumentError;
})(Error);

module.exports = ArgumentError;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9ycy9Bcmd1bWVudEVycm9yLnRzIl0sIm5hbWVzIjpbIkFyZ3VtZW50RXJyb3IiLCJBcmd1bWVudEVycm9yLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFBMkQ7O0FBRTNEOzs7RUFHRztBQUNIO0lBQTRCQSxnQ0FBS0E7SUFRaENBOzs7OztNQURHQTtJQUNIQSx1QkFBWUEsT0FBcUJBLEVBQUVBLEVBQWFBO1FBQXBDQyxzQ0FBQUEsT0FBT0EsR0FBVUEsSUFBSUE7QUFBQUEsUUFBRUEsaUNBQUFBLEVBQUVBLEdBQVVBLENBQUNBO0FBQUFBLFFBRS9DQSxXQUFNQSxPQUFBQSxPQUFPQSxJQUFJQSxlQUFlQSxFQUFFQSxFQUFFQSxDQUFDQTtJQUN0Q0EsQ0FBQ0E7SUFDRkQscUJBQUNBO0FBQURBLENBQUNBLEVBWjJCLEtBQUssRUFZaEM7O0FBRUQsOEJBQXVCLENBQUEiLCJmaWxlIjoiZXJyb3JzL0FyZ3VtZW50RXJyb3IuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJyb3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9FcnJvclwiKTtcblxuLyoqXG4gKiBBYnN0cmFjdE1ldGhvZEVycm9yIGlzIHRocm93biB3aGVuIGFuIGFic3RyYWN0IG1ldGhvZCBpcyBjYWxsZWQuIFRoZSBtZXRob2QgaW4gcXVlc3Rpb24gc2hvdWxkIGJlIG92ZXJyaWRkZW5cbiAqIGJ5IGEgY29uY3JldGUgc3ViY2xhc3MuXG4gKi9cbmNsYXNzIEFyZ3VtZW50RXJyb3IgZXh0ZW5kcyBFcnJvclxue1xuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IEFyZ3VtZW50RXJyb3IuXG5cdCAqXG5cdCAqIEBwYXJhbSBtZXNzYWdlIEFuIG9wdGlvbmFsIG1lc3NhZ2UgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgZXJyb3IgbWVzc2FnZS5cblx0ICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgZXJyb3IuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihtZXNzYWdlOnN0cmluZyA9IG51bGwsIGlkOm51bWJlciA9IDApXG5cdHtcblx0XHRzdXBlcihtZXNzYWdlIHx8IFwiQXJndW1lbnRFcnJvclwiLCBpZCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gQXJndW1lbnRFcnJvcjsiXX0=