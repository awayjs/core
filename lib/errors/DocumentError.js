var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Error = require("awayjs-core/lib/errors/Error");

var DocumentError = (function (_super) {
    __extends(DocumentError, _super);
    function DocumentError(message, id) {
        if (typeof message === "undefined") { message = "DocumentError"; }
        if (typeof id === "undefined") { id = 0; }
        _super.call(this, message, id);
    }
    DocumentError.DOCUMENT_DOES_NOT_EXIST = "documentDoesNotExist";
    return DocumentError;
})(Error);

module.exports = DocumentError;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9ycy9Eb2N1bWVudEVycm9yLnRzIl0sIm5hbWVzIjpbIkRvY3VtZW50RXJyb3IiLCJEb2N1bWVudEVycm9yLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFBMkQ7O0FBRTNEO0lBQTRCQSxnQ0FBS0E7SUFJaENBLHVCQUFZQSxPQUFnQ0EsRUFBRUEsRUFBYUE7UUFBL0NDLHNDQUFBQSxPQUFPQSxHQUFVQSxlQUFlQTtBQUFBQSxRQUFFQSxpQ0FBQUEsRUFBRUEsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFFMURBLFdBQU1BLE9BQUFBLE9BQU9BLEVBQUVBLEVBQUVBLENBQUNBO0lBQ25CQSxDQUFDQTtJQUxERCx3Q0FBK0NBLHNCQUFzQkE7SUFNdEVBLHFCQUFDQTtBQUFEQSxDQUFDQSxFQVIyQixLQUFLLEVBUWhDOztBQUVELDhCQUF1QixDQUFBIiwiZmlsZSI6ImVycm9ycy9Eb2N1bWVudEVycm9yLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XG5cbmNsYXNzIERvY3VtZW50RXJyb3IgZXh0ZW5kcyBFcnJvclxue1xuXHRwdWJsaWMgc3RhdGljIERPQ1VNRU5UX0RPRVNfTk9UX0VYSVNUOnN0cmluZyA9IFwiZG9jdW1lbnREb2VzTm90RXhpc3RcIjtcblxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlOnN0cmluZyA9IFwiRG9jdW1lbnRFcnJvclwiLCBpZDpudW1iZXIgPSAwKVxuXHR7XG5cdFx0c3VwZXIobWVzc2FnZSwgaWQpO1xuXHR9XG59XG5cbmV4cG9ydCA9IERvY3VtZW50RXJyb3I7Il19