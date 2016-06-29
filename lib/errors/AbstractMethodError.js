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
        _super.call(this, message || "An abstract method was called! Either an instance of an abstract export class was created, or an abstract method was not overridden by the subclass.", id);
    }
    return AbstractMethodError;
}(ErrorBase_1.ErrorBase));
exports.AbstractMethodError = AbstractMethodError;
