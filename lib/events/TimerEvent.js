"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase_1 = require("../events/EventBase");
var TimerEvent = (function (_super) {
    __extends(TimerEvent, _super);
    function TimerEvent(type) {
        _super.call(this, type);
    }
    /**
     *
     */
    TimerEvent.TIMER = "timer";
    /**
     *
     */
    TimerEvent.TIMER_COMPLETE = "timerComplete";
    return TimerEvent;
}(EventBase_1.EventBase));
exports.TimerEvent = TimerEvent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TimerEvent;
