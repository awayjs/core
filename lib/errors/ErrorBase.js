"use strict";
var ErrorBase = (function () {
    function ErrorBase(message, id, _name) {
        if (message === void 0) { message = ''; }
        if (id === void 0) { id = 0; }
        if (_name === void 0) { _name = ''; }
        this._errorID = 0; //Contains the reference number associated with the specific error message.
        this._messsage = ''; //Contains the message associated with the Error object.
        this._name = ''; // Contains the name of the Error object.
        this._messsage = message;
        this._name = name;
        this._errorID = id;
    }
    Object.defineProperty(ErrorBase.prototype, "message", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return this._messsage;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._messsage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorBase.prototype, "name", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return this._name;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorBase.prototype, "errorID", {
        /**
         *
         * @returns {number}
         */
        get: function () {
            return this._errorID;
        },
        enumerable: true,
        configurable: true
    });
    return ErrorBase;
}());
exports.ErrorBase = ErrorBase;
