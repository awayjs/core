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
}(ErrorBase_1.ErrorBase));
exports.PartialImplementationError = PartialImplementationError;
