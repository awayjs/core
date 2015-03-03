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
        if (dependency === void 0) { dependency = ''; }
        if (id === void 0) { id = 0; }
        _super.call(this, "PartialImplementationError - this function is in development. Required Dependency: " + dependency, id);
    }
    return PartialImplementationError;
})(Error);
module.exports = PartialImplementationError;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvUGFydGlhbEltcGxlbWVudGF0aW9uRXJyb3IudHMiXSwibmFtZXMiOlsiUGFydGlhbEltcGxlbWVudGF0aW9uRXJyb3IiLCJQYXJ0aWFsSW1wbGVtZW50YXRpb25FcnJvci5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUUzRCxBQUlBOzs7R0FERztJQUNHLDBCQUEwQjtJQUFTQSxVQUFuQ0EsMEJBQTBCQSxVQUFjQTtJQUU3Q0E7Ozs7T0FJR0E7SUFDSEEsU0FQS0EsMEJBQTBCQSxDQU9uQkEsVUFBc0JBLEVBQUVBLEVBQWFBO1FBQXJDQywwQkFBc0JBLEdBQXRCQSxlQUFzQkE7UUFBRUEsa0JBQWFBLEdBQWJBLE1BQWFBO1FBRWhEQSxrQkFBTUEscUZBQXFGQSxHQUFHQSxVQUFVQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtJQUMvR0EsQ0FBQ0E7SUFDRkQsaUNBQUNBO0FBQURBLENBWEEsQUFXQ0EsRUFYd0MsS0FBSyxFQVc3QztBQUVELEFBQW9DLGlCQUEzQiwwQkFBMEIsQ0FBQyIsImZpbGUiOiJlcnJvcnMvUGFydGlhbEltcGxlbWVudGF0aW9uRXJyb3IuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XHJcblxyXG4vKipcclxuICogQWJzdHJhY3RNZXRob2RFcnJvciBpcyB0aHJvd24gd2hlbiBhbiBhYnN0cmFjdCBtZXRob2QgaXMgY2FsbGVkLiBUaGUgbWV0aG9kIGluIHF1ZXN0aW9uIHNob3VsZCBiZSBvdmVycmlkZGVuXHJcbiAqIGJ5IGEgY29uY3JldGUgc3ViY2xhc3MuXHJcbiAqL1xyXG5jbGFzcyBQYXJ0aWFsSW1wbGVtZW50YXRpb25FcnJvciBleHRlbmRzIEVycm9yXHJcbntcclxuXHQvKipcclxuXHQgKiBDcmVhdGUgYSBuZXcgQWJzdHJhY3RNZXRob2RFcnJvci5cclxuXHQgKiBAcGFyYW0gbWVzc2FnZSBBbiBvcHRpb25hbCBtZXNzYWdlIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IGVycm9yIG1lc3NhZ2UuXHJcblx0ICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgZXJyb3IuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoZGVwZW5kZW5jeTpzdHJpbmcgPSAnJywgaWQ6bnVtYmVyID0gMClcclxuXHR7XHJcblx0XHRzdXBlcihcIlBhcnRpYWxJbXBsZW1lbnRhdGlvbkVycm9yIC0gdGhpcyBmdW5jdGlvbiBpcyBpbiBkZXZlbG9wbWVudC4gUmVxdWlyZWQgRGVwZW5kZW5jeTogXCIgKyBkZXBlbmRlbmN5LCBpZCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBQYXJ0aWFsSW1wbGVtZW50YXRpb25FcnJvcjsiXX0=