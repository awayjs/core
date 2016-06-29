"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase_1 = require("../events/EventBase");
var ParserEvent = (function (_super) {
    __extends(ParserEvent, _super);
    function ParserEvent(type, message) {
        if (message === void 0) { message = ''; }
        _super.call(this, type);
        this._message = message;
    }
    Object.defineProperty(ParserEvent.prototype, "message", {
        /**
         * Additional human-readable message. Usually supplied for ParserEvent.PARSE_ERROR events.
         */
        get: function () {
            return this._message;
        },
        enumerable: true,
        configurable: true
    });
    ParserEvent.prototype.clone = function () {
        return new ParserEvent(this.type, this._message);
    };
    /**
     * Dispatched when parsing of an asset completed.
     */
    ParserEvent.PARSE_COMPLETE = 'parseComplete';
    /**
     * Dispatched when an error occurs while parsing the data (e.g. because it's
     * incorrectly formatted.)
     */
    ParserEvent.PARSE_ERROR = 'parseError';
    /**
     * Dispatched when a parser is ready to have dependencies retrieved and resolved.
     * This is an internal event that should rarely (if ever) be listened for by
     * external classes.
     */
    ParserEvent.READY_FOR_DEPENDENCIES = 'readyForDependencies';
    return ParserEvent;
}(EventBase_1.EventBase));
exports.ParserEvent = ParserEvent;
