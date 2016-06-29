"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorBase_1 = require("../errors/ErrorBase");
/**
 * RangeError is thrown when an index is accessed out of range of the number of
 * available indices on an Array.
 */
var RangeError = (function (_super) {
    __extends(RangeError, _super);
    /**
     * Create a new RangeError.
     *
     * @param message An optional message to override the default error message.
     * @param id The id of the error.
     */
    function RangeError(message, id) {
        if (message === void 0) { message = null; }
        if (id === void 0) { id = 0; }
        _super.call(this, message || "RangeError", id);
    }
    return RangeError;
}(ErrorBase_1.ErrorBase));
exports.RangeError = RangeError;
