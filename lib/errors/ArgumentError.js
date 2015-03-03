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
        if (message === void 0) { message = null; }
        if (id === void 0) { id = 0; }
        _super.call(this, message || "ArgumentError", id);
    }
    return ArgumentError;
})(Error);
module.exports = ArgumentError;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQXJndW1lbnRFcnJvci50cyJdLCJuYW1lcyI6WyJBcmd1bWVudEVycm9yIiwiQXJndW1lbnRFcnJvci5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUUzRCxBQUlBOzs7R0FERztJQUNHLGFBQWE7SUFBU0EsVUFBdEJBLGFBQWFBLFVBQWNBO0lBRWhDQTs7Ozs7T0FLR0E7SUFDSEEsU0FSS0EsYUFBYUEsQ0FRTkEsT0FBcUJBLEVBQUVBLEVBQWFBO1FBQXBDQyx1QkFBcUJBLEdBQXJCQSxjQUFxQkE7UUFBRUEsa0JBQWFBLEdBQWJBLE1BQWFBO1FBRS9DQSxrQkFBTUEsT0FBT0EsSUFBSUEsZUFBZUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFDdkNBLENBQUNBO0lBQ0ZELG9CQUFDQTtBQUFEQSxDQVpBLEFBWUNBLEVBWjJCLEtBQUssRUFZaEM7QUFFRCxBQUF1QixpQkFBZCxhQUFhLENBQUMiLCJmaWxlIjoiZXJyb3JzL0FyZ3VtZW50RXJyb3IuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XHJcblxyXG4vKipcclxuICogQWJzdHJhY3RNZXRob2RFcnJvciBpcyB0aHJvd24gd2hlbiBhbiBhYnN0cmFjdCBtZXRob2QgaXMgY2FsbGVkLiBUaGUgbWV0aG9kIGluIHF1ZXN0aW9uIHNob3VsZCBiZSBvdmVycmlkZGVuXHJcbiAqIGJ5IGEgY29uY3JldGUgc3ViY2xhc3MuXHJcbiAqL1xyXG5jbGFzcyBBcmd1bWVudEVycm9yIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZSBhIG5ldyBBcmd1bWVudEVycm9yLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1lc3NhZ2UgQW4gb3B0aW9uYWwgbWVzc2FnZSB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBlcnJvciBtZXNzYWdlLlxyXG5cdCAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGVycm9yLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2U6c3RyaW5nID0gbnVsbCwgaWQ6bnVtYmVyID0gMClcclxuXHR7XHJcblx0XHRzdXBlcihtZXNzYWdlIHx8IFwiQXJndW1lbnRFcnJvclwiLCBpZCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBBcmd1bWVudEVycm9yOyJdfQ==