"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorBase_1 = require("../errors/ErrorBase");
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
}(ErrorBase_1.ErrorBase));
exports.ArgumentError = ArgumentError;
