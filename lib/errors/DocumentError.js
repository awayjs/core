"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorBase_1 = require("../errors/ErrorBase");
var DocumentError = (function (_super) {
    __extends(DocumentError, _super);
    function DocumentError(message, id) {
        if (message === void 0) { message = "DocumentError"; }
        if (id === void 0) { id = 0; }
        _super.call(this, message, id);
    }
    DocumentError.DOCUMENT_DOES_NOT_EXIST = "documentDoesNotExist";
    return DocumentError;
}(ErrorBase_1.ErrorBase));
exports.DocumentError = DocumentError;
