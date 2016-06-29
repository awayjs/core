"use strict";
var getTimer_1 = require("../utils/getTimer");
var RequestAnimationFrame = (function () {
    function RequestAnimationFrame(callback, callbackContext) {
        var _this = this;
        this._active = false;
        this._argsArray = new Array();
        this._getTimer = getTimer_1.getTimer;
        this.setCallback(callback, callbackContext);
        this._rafUpdateFunction = function () {
            if (_this._active)
                _this._tick();
        };
        this._argsArray.push(this._dt);
    }
    // Public
    /**
     *
     * @param callback
     * @param callbackContext
     */
    RequestAnimationFrame.prototype.setCallback = function (callback, callbackContext) {
        this._callback = callback;
        this._callbackContext = callbackContext;
    };
    /**
     *
     */
    RequestAnimationFrame.prototype.start = function () {
        this._prevTime = this._getTimer();
        this._active = true;
        if (window) {
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(this._rafUpdateFunction);
            }
            else {
                if (window['mozRequestAnimationFrame'])
                    window.requestAnimationFrame = window['mozRequestAnimationFrame'];
                else if (window['webkitRequestAnimationFrame'])
                    window.requestAnimationFrame = window['webkitRequestAnimationFrame'];
                else if (window['oRequestAnimationFrame'])
                    window.requestAnimationFrame = window['oRequestAnimationFrame'];
            }
        }
    };
    /**
     *
     */
    RequestAnimationFrame.prototype.stop = function () {
        this._active = false;
    };
    Object.defineProperty(RequestAnimationFrame.prototype, "active", {
        // Get / Set
        /**
         *
         * @returns {boolean}
         */
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    // Private
    /**
     *
     * @private
     */
    RequestAnimationFrame.prototype._tick = function () {
        this._currentTime = this._getTimer();
        this._dt = this._currentTime - this._prevTime;
        this._argsArray[0] = this._dt;
        this._callback.apply(this._callbackContext, this._argsArray);
        window.requestAnimationFrame(this._rafUpdateFunction);
        this._prevTime = this._currentTime;
    };
    return RequestAnimationFrame;
}());
exports.RequestAnimationFrame = RequestAnimationFrame;
