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
        if (message === void 0) { message = "DocumentError"; }
        if (id === void 0) { id = 0; }
        _super.call(this, message, id);
    }
    DocumentError.DOCUMENT_DOES_NOT_EXIST = "documentDoesNotExist";
    return DocumentError;
})(Error);
module.exports = DocumentError;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRG9jdW1lbnRFcnJvci50cyJdLCJuYW1lcyI6WyJEb2N1bWVudEVycm9yIiwiRG9jdW1lbnRFcnJvci5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUUzRCxJQUFNLGFBQWE7SUFBU0EsVUFBdEJBLGFBQWFBLFVBQWNBO0lBSWhDQSxTQUpLQSxhQUFhQSxDQUlOQSxPQUFnQ0EsRUFBRUEsRUFBYUE7UUFBL0NDLHVCQUFnQ0EsR0FBaENBLHlCQUFnQ0E7UUFBRUEsa0JBQWFBLEdBQWJBLE1BQWFBO1FBRTFEQSxrQkFBTUEsT0FBT0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFDcEJBLENBQUNBO0lBTGFELHFDQUF1QkEsR0FBVUEsc0JBQXNCQSxDQUFDQTtJQU12RUEsb0JBQUNBO0FBQURBLENBUkEsQUFRQ0EsRUFSMkIsS0FBSyxFQVFoQztBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJlcnJvcnMvRG9jdW1lbnRFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJyb3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9FcnJvclwiKTtcblxuY2xhc3MgRG9jdW1lbnRFcnJvciBleHRlbmRzIEVycm9yXG57XG5cdHB1YmxpYyBzdGF0aWMgRE9DVU1FTlRfRE9FU19OT1RfRVhJU1Q6c3RyaW5nID0gXCJkb2N1bWVudERvZXNOb3RFeGlzdFwiO1xuXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2U6c3RyaW5nID0gXCJEb2N1bWVudEVycm9yXCIsIGlkOm51bWJlciA9IDApXG5cdHtcblx0XHRzdXBlcihtZXNzYWdlLCBpZCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gRG9jdW1lbnRFcnJvcjsiXX0=