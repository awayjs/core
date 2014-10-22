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
var PartialImplementationError = (function (_super) {
    __extends(PartialImplementationError, _super);
    /**
    * Create a new AbstractMethodError.
    * @param message An optional message to override the default error message.
    * @param id The id of the error.
    */
    function PartialImplementationError(dependency, id) {
        if (typeof dependency === "undefined") { dependency = ''; }
        if (typeof id === "undefined") { id = 0; }
        _super.call(this, "PartialImplementationError - this function is in development. Required Dependency: " + dependency, id);
    }
    return PartialImplementationError;
})(Error);

module.exports = PartialImplementationError;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9ycy9QYXJ0aWFsSW1wbGVtZW50YXRpb25FcnJvci50cyJdLCJuYW1lcyI6WyJQYXJ0aWFsSW1wbGVtZW50YXRpb25FcnJvciIsIlBhcnRpYWxJbXBsZW1lbnRhdGlvbkVycm9yLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFBMkQ7O0FBRTNEOzs7RUFHRztBQUNIO0lBQXlDQSw2Q0FBS0E7SUFPN0NBOzs7O01BREdBO0lBQ0hBLG9DQUFZQSxVQUFzQkEsRUFBRUEsRUFBYUE7UUFBckNDLHlDQUFBQSxVQUFVQSxHQUFVQSxFQUFFQTtBQUFBQSxRQUFFQSxpQ0FBQUEsRUFBRUEsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFFaERBLFdBQU1BLE9BQUFBLHFGQUFxRkEsR0FBR0EsVUFBVUEsRUFBRUEsRUFBRUEsQ0FBQ0E7SUFDOUdBLENBQUNBO0lBQ0ZELGtDQUFDQTtBQUFEQSxDQUFDQSxFQVh3QyxLQUFLLEVBVzdDOztBQUVELDJDQUFvQyxDQUFBIiwiZmlsZSI6ImVycm9ycy9QYXJ0aWFsSW1wbGVtZW50YXRpb25FcnJvci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcnJvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Vycm9yXCIpO1xuXG4vKipcbiAqIEFic3RyYWN0TWV0aG9kRXJyb3IgaXMgdGhyb3duIHdoZW4gYW4gYWJzdHJhY3QgbWV0aG9kIGlzIGNhbGxlZC4gVGhlIG1ldGhvZCBpbiBxdWVzdGlvbiBzaG91bGQgYmUgb3ZlcnJpZGRlblxuICogYnkgYSBjb25jcmV0ZSBzdWJjbGFzcy5cbiAqL1xuY2xhc3MgUGFydGlhbEltcGxlbWVudGF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvclxue1xuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IuXG5cdCAqIEBwYXJhbSBtZXNzYWdlIEFuIG9wdGlvbmFsIG1lc3NhZ2UgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgZXJyb3IgbWVzc2FnZS5cblx0ICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgZXJyb3IuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihkZXBlbmRlbmN5OnN0cmluZyA9ICcnLCBpZDpudW1iZXIgPSAwKVxuXHR7XG5cdFx0c3VwZXIoXCJQYXJ0aWFsSW1wbGVtZW50YXRpb25FcnJvciAtIHRoaXMgZnVuY3Rpb24gaXMgaW4gZGV2ZWxvcG1lbnQuIFJlcXVpcmVkIERlcGVuZGVuY3k6IFwiICsgZGVwZW5kZW5jeSwgaWQpO1xuXHR9XG59XG5cbmV4cG9ydCA9IFBhcnRpYWxJbXBsZW1lbnRhdGlvbkVycm9yOyJdfQ==