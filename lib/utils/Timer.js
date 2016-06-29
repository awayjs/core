"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorBase_1 = require("../errors/ErrorBase");
var EventDispatcher_1 = require("../events/EventDispatcher");
var TimerEvent_1 = require("../events/TimerEvent");
var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer(delay, repeatCount) {
        if (repeatCount === void 0) { repeatCount = 0; }
        _super.call(this);
        this._repeatCount = 0;
        this._currentCount = 0;
        this._running = false;
        this._delay = delay;
        this._repeatCount = repeatCount;
        if (isNaN(delay) || delay < 0)
            throw new ErrorBase_1.ErrorBase("Delay is negative or not a number");
    }
    Object.defineProperty(Timer.prototype, "currentCount", {
        get: function () {
            return this._currentCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "delay", {
        get: function () {
            return this._delay;
        },
        set: function (value) {
            this._delay = value;
            if (this._running) {
                this.stop();
                this.start();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "repeatCount", {
        get: function () {
            return this._repeatCount;
        },
        set: function (value) {
            this._repeatCount = value;
        },
        enumerable: true,
        configurable: true
    });
    Timer.prototype.reset = function () {
        if (this._running)
            this.stop();
        this._currentCount = 0;
    };
    Object.defineProperty(Timer.prototype, "running", {
        get: function () {
            return this._running;
        },
        enumerable: true,
        configurable: true
    });
    Timer.prototype.start = function () {
        var _this = this;
        this._running = true;
        clearInterval(this._iid);
        this._iid = setInterval(function () { return _this.tick(); }, this._delay);
    };
    Timer.prototype.stop = function () {
        this._running = false;
        clearInterval(this._iid);
    };
    Timer.prototype.tick = function () {
        this._currentCount++;
        if ((this._repeatCount > 0) && this._currentCount >= this._repeatCount) {
            this.stop();
            this.dispatchEvent(new TimerEvent_1.TimerEvent(TimerEvent_1.TimerEvent.TIMER));
            this.dispatchEvent(new TimerEvent_1.TimerEvent(TimerEvent_1.TimerEvent.TIMER_COMPLETE));
        }
        else {
            this.dispatchEvent(new TimerEvent_1.TimerEvent(TimerEvent_1.TimerEvent.TIMER));
        }
    };
    return Timer;
}(EventDispatcher_1.EventDispatcher));
exports.Timer = Timer;
