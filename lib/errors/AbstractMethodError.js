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
        if (typeof message === "undefined") { message = null; }
        if (typeof id === "undefined") { id = 0; }
        _super.call(this, message || "An abstract method was called! Either an instance of an abstract class was created, or an abstract method was not overridden by the subclass.", id);
    }
    return AbstractMethodError;
})(Error);

module.exports = AbstractMethodError;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yLnRzIl0sIm5hbWVzIjpbIkFic3RyYWN0TWV0aG9kRXJyb3IiLCJBYnN0cmFjdE1ldGhvZEVycm9yLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFBMkQ7O0FBRTNEOzs7RUFHRztBQUNIO0lBQWtDQSxzQ0FBS0E7SUFPdENBOzs7O01BREdBO0lBQ0hBLDZCQUFZQSxPQUFxQkEsRUFBRUEsRUFBYUE7UUFBcENDLHNDQUFBQSxPQUFPQSxHQUFVQSxJQUFJQTtBQUFBQSxRQUFFQSxpQ0FBQUEsRUFBRUEsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFFL0NBLFdBQU1BLE9BQUFBLE9BQU9BLElBQUlBLCtJQUErSUEsRUFBRUEsRUFBRUEsQ0FBQ0E7SUFDdEtBLENBQUNBO0lBQ0ZELDJCQUFDQTtBQUFEQSxDQUFDQSxFQVhpQyxLQUFLLEVBV3RDOztBQUVELG9DQUE2QixDQUFBIiwiZmlsZSI6ImVycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XG5cbi8qKlxuICogQWJzdHJhY3RNZXRob2RFcnJvciBpcyB0aHJvd24gd2hlbiBhbiBhYnN0cmFjdCBtZXRob2QgaXMgY2FsbGVkLiBUaGUgbWV0aG9kIGluIHF1ZXN0aW9uIHNob3VsZCBiZSBvdmVycmlkZGVuXG4gKiBieSBhIGNvbmNyZXRlIHN1YmNsYXNzLlxuICovXG5jbGFzcyBBYnN0cmFjdE1ldGhvZEVycm9yIGV4dGVuZHMgRXJyb3Jcbntcblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yLlxuXHQgKiBAcGFyYW0gbWVzc2FnZSBBbiBvcHRpb25hbCBtZXNzYWdlIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IGVycm9yIG1lc3NhZ2UuXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGVycm9yLlxuXHQgKi9cblx0Y29uc3RydWN0b3IobWVzc2FnZTpzdHJpbmcgPSBudWxsLCBpZDpudW1iZXIgPSAwKVxuXHR7XG5cdFx0c3VwZXIobWVzc2FnZSB8fCBcIkFuIGFic3RyYWN0IG1ldGhvZCB3YXMgY2FsbGVkISBFaXRoZXIgYW4gaW5zdGFuY2Ugb2YgYW4gYWJzdHJhY3QgY2xhc3Mgd2FzIGNyZWF0ZWQsIG9yIGFuIGFic3RyYWN0IG1ldGhvZCB3YXMgbm90IG92ZXJyaWRkZW4gYnkgdGhlIHN1YmNsYXNzLlwiLCBpZCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gQWJzdHJhY3RNZXRob2RFcnJvcjsiXX0=