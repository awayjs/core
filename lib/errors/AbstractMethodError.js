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
var AbstractMethodError = (function (_super) {
    __extends(AbstractMethodError, _super);
    /**
     * Create a new AbstractMethodError.
     * @param message An optional message to override the default error message.
     * @param id The id of the error.
     */
    function AbstractMethodError(message, id) {
        if (message === void 0) { message = null; }
        if (id === void 0) { id = 0; }
        _super.call(this, message || "An abstract method was called! Either an instance of an abstract class was created, or an abstract method was not overridden by the subclass.", id);
    }
    return AbstractMethodError;
})(Error);
module.exports = AbstractMethodError;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvci50cyJdLCJuYW1lcyI6WyJBYnN0cmFjdE1ldGhvZEVycm9yIiwiQWJzdHJhY3RNZXRob2RFcnJvci5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUUzRCxBQUlBOzs7R0FERztJQUNHLG1CQUFtQjtJQUFTQSxVQUE1QkEsbUJBQW1CQSxVQUFjQTtJQUV0Q0E7Ozs7T0FJR0E7SUFDSEEsU0FQS0EsbUJBQW1CQSxDQU9aQSxPQUFxQkEsRUFBRUEsRUFBYUE7UUFBcENDLHVCQUFxQkEsR0FBckJBLGNBQXFCQTtRQUFFQSxrQkFBYUEsR0FBYkEsTUFBYUE7UUFFL0NBLGtCQUFNQSxPQUFPQSxJQUFJQSwrSUFBK0lBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO0lBQ3ZLQSxDQUFDQTtJQUNGRCwwQkFBQ0E7QUFBREEsQ0FYQSxBQVdDQSxFQVhpQyxLQUFLLEVBV3RDO0FBRUQsQUFBNkIsaUJBQXBCLG1CQUFtQixDQUFDIiwiZmlsZSI6ImVycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcnJvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Vycm9yXCIpO1xyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0TWV0aG9kRXJyb3IgaXMgdGhyb3duIHdoZW4gYW4gYWJzdHJhY3QgbWV0aG9kIGlzIGNhbGxlZC4gVGhlIG1ldGhvZCBpbiBxdWVzdGlvbiBzaG91bGQgYmUgb3ZlcnJpZGRlblxyXG4gKiBieSBhIGNvbmNyZXRlIHN1YmNsYXNzLlxyXG4gKi9cclxuY2xhc3MgQWJzdHJhY3RNZXRob2RFcnJvciBleHRlbmRzIEVycm9yXHJcbntcclxuXHQvKipcclxuXHQgKiBDcmVhdGUgYSBuZXcgQWJzdHJhY3RNZXRob2RFcnJvci5cclxuXHQgKiBAcGFyYW0gbWVzc2FnZSBBbiBvcHRpb25hbCBtZXNzYWdlIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IGVycm9yIG1lc3NhZ2UuXHJcblx0ICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgZXJyb3IuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IobWVzc2FnZTpzdHJpbmcgPSBudWxsLCBpZDpudW1iZXIgPSAwKVxyXG5cdHtcclxuXHRcdHN1cGVyKG1lc3NhZ2UgfHwgXCJBbiBhYnN0cmFjdCBtZXRob2Qgd2FzIGNhbGxlZCEgRWl0aGVyIGFuIGluc3RhbmNlIG9mIGFuIGFic3RyYWN0IGNsYXNzIHdhcyBjcmVhdGVkLCBvciBhbiBhYnN0cmFjdCBtZXRob2Qgd2FzIG5vdCBvdmVycmlkZGVuIGJ5IHRoZSBzdWJjbGFzcy5cIiwgaWQpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gQWJzdHJhY3RNZXRob2RFcnJvcjsiXX0=