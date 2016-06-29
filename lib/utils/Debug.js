"use strict";
var PartialImplementationError_1 = require("../errors/PartialImplementationError");
/**
 *
 */
var Debug = (function () {
    function Debug() {
    }
    Debug.breakpoint = function () {
        Debug['break']();
    };
    Debug.throwPIROnKeyWordOnly = function (str, enable) {
        if (enable === void 0) { enable = true; }
        if (!enable)
            Debug.keyword = null;
        else
            Debug.keyword = str;
    };
    Debug.throwPIR = function (clss, fnc, msg) {
        Debug.logPIR('PartialImplementationError ' + clss, fnc, msg);
        if (Debug.THROW_ERRORS) {
            if (Debug.keyword) {
                var e = clss + fnc + msg;
                if (e.indexOf(Debug.keyword) == -1)
                    return;
            }
            throw new PartialImplementationError_1.PartialImplementationError(clss + '.' + fnc + ': ' + msg);
        }
    };
    Debug.logPIR = function (clss, fnc, msg) {
        if (msg === void 0) { msg = ''; }
        if (Debug.LOG_PI_ERRORS)
            console.log(clss + '.' + fnc + ': ' + msg);
    };
    Debug.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (Debug.ENABLE_LOG)
            console.log(args);
    };
    Debug.THROW_ERRORS = true;
    Debug.ENABLE_LOG = true;
    Debug.LOG_PI_ERRORS = true;
    Debug.keyword = null;
    return Debug;
}());
exports.Debug = Debug;
