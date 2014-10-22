var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Error = require("awayjs-core/lib/errors/Error");
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var TimerEvent = require("awayjs-core/lib/events/TimerEvent");

var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer(delay, repeatCount) {
        if (typeof repeatCount === "undefined") { repeatCount = 0; }
        _super.call(this);
        this._repeatCount = 0;
        this._currentCount = 0;
        this._running = false;

        this._delay = delay;
        this._repeatCount = repeatCount;

        if (isNaN(delay) || delay < 0) {
            throw new Error("Delay is negative or not a number");
        }
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
        if (this._running) {
            this.stop();
        }

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
        this._iid = setInterval(function () {
            return _this.tick();
        }, this._delay);
    };

    Timer.prototype.stop = function () {
        this._running = false;
        clearInterval(this._iid);
    };

    Timer.prototype.tick = function () {
        this._currentCount++;

        if ((this._repeatCount > 0) && this._currentCount >= this._repeatCount) {
            this.stop();
            this.dispatchEvent(new TimerEvent(TimerEvent.TIMER));
            this.dispatchEvent(new TimerEvent(TimerEvent.TIMER_COMPLETE));
        } else {
            this.dispatchEvent(new TimerEvent(TimerEvent.TIMER));
        }
    };
    return Timer;
})(EventDispatcher);

module.exports = Timer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL1RpbWVyLnRzIl0sIm5hbWVzIjpbIlRpbWVyIiwiVGltZXIuY29uc3RydWN0b3IiLCJUaW1lci5yZXNldCIsIlRpbWVyLnN0YXJ0IiwiVGltZXIuc3RvcCIsIlRpbWVyLnRpY2siXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1EQUEyRDtBQUMzRCx1RUFBNkU7QUFDN0UsNkRBQW9FOztBQUVwRTtJQUFvQkEsd0JBQWVBO0lBU2xDQSxlQUFZQSxLQUFZQSxFQUFFQSxXQUFzQkE7UUFBdEJDLDBDQUFBQSxXQUFXQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUcvQ0EsV0FBTUEsS0FBQUEsQ0FBQ0E7UUFSUkEsS0FBUUEsWUFBWUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDaENBLEtBQVFBLGFBQWFBLEdBQVVBLENBQUNBLENBQUNBO1FBRWpDQSxLQUFRQSxRQUFRQSxHQUFXQSxLQUFLQSxDQUFDQTs7UUFRaENBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLEtBQUtBO1FBQ25CQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxXQUFXQTs7UUFFL0JBLElBQUlBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEtBQUtBLEdBQUdBLENBQUNBLENBQUVBO1lBQzlCQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxtQ0FBbUNBLENBQUNBO1NBQ3BEQTtJQUVGQSxDQUFDQTtJQUVERDtRQUFBQSxLQUFBQTtZQUdDQSxPQUFPQSxJQUFJQSxDQUFDQSxhQUFhQTtRQUUxQkEsQ0FBQ0E7Ozs7QUFBQUE7SUFFREE7UUFBQUEsS0FBQUE7WUFHQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsTUFBTUE7UUFFbkJBLENBQUNBO1FBRURBLEtBQUFBLFVBQWlCQSxLQUFZQTtZQUc1QkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsS0FBS0E7O1lBRW5CQSxJQUFJQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFFQTtnQkFDbEJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNYQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTthQUNaQTtRQUVGQSxDQUFDQTs7OztBQVpBQTs7SUFjREE7UUFBQUEsS0FBQUE7WUFHQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUE7UUFDekJBLENBQUNBO1FBRURBLEtBQUFBLFVBQXVCQSxLQUFZQTtZQUdsQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsS0FBS0E7UUFDMUJBLENBQUNBOzs7O0FBTkFBOztJQVFEQSx3QkFBQUE7UUFHQ0UsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBRUE7WUFDbEJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1NBQ1hBOztRQUVEQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxDQUFDQTtJQUV2QkEsQ0FBQ0E7O0lBRURGO1FBQUFBLEtBQUFBO1lBR0NBLE9BQU9BLElBQUlBLENBQUNBLFFBQVFBO1FBRXJCQSxDQUFDQTs7OztBQUFBQTtJQUVEQSx3QkFBQUE7UUFBQUcsaUJBT0NBO1FBSkFBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBO1FBQ3BCQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUN4QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsV0FBV0EsQ0FBQ0E7bUJBQU1BLEtBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQVhBLENBQVdBLEVBQUVBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO0lBRXhEQSxDQUFDQTs7SUFFREgsdUJBQUFBO1FBR0NJLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUtBO1FBQ3JCQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtJQUV6QkEsQ0FBQ0E7O0lBRURKLHVCQUFBQTtRQUdDSyxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQTs7UUFFcEJBLElBQUlBLENBQUVBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLENBQUNBLENBQUVBLElBQUlBLElBQUlBLENBQUNBLGFBQWFBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLENBQUVBO1lBRXpFQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNYQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxVQUFVQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUNwREEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsVUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0E7U0FFN0RBLEtBQU1BO1lBRU5BLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLFVBQVVBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1NBRXBEQTtJQUVGQSxDQUFDQTtJQUNGTCxhQUFDQTtBQUFEQSxDQUFDQSxFQW5IbUIsZUFBZSxFQW1IbEM7O0FBRUQsc0JBQWUsQ0FBQSIsImZpbGUiOiJ1dGlscy9UaW1lci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcnJvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Vycm9yXCIpO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCIpO1xuaW1wb3J0IFRpbWVyRXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvVGltZXJFdmVudFwiKTtcblxuY2xhc3MgVGltZXIgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcbntcblxuXHRwcml2YXRlIF9kZWxheTpudW1iZXI7XG5cdHByaXZhdGUgX3JlcGVhdENvdW50Om51bWJlciA9IDA7XG5cdHByaXZhdGUgX2N1cnJlbnRDb3VudDpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9paWQ6bnVtYmVyO1xuXHRwcml2YXRlIF9ydW5uaW5nOmJvb2xlYW4gPSBmYWxzZTtcblxuXHRjb25zdHJ1Y3RvcihkZWxheTpudW1iZXIsIHJlcGVhdENvdW50Om51bWJlciA9IDApXG5cdHtcblxuXHRcdHN1cGVyKCk7XG5cblxuXHRcdHRoaXMuX2RlbGF5ID0gZGVsYXk7XG5cdFx0dGhpcy5fcmVwZWF0Q291bnQgPSByZXBlYXRDb3VudDtcblxuXHRcdGlmIChpc05hTihkZWxheSkgfHwgZGVsYXkgPCAwKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJEZWxheSBpcyBuZWdhdGl2ZSBvciBub3QgYSBudW1iZXJcIik7XG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgZ2V0IGN1cnJlbnRDb3VudCgpOm51bWJlclxuXHR7XG5cblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudENvdW50O1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0IGRlbGF5KCk6bnVtYmVyXG5cdHtcblxuXHRcdHJldHVybiB0aGlzLl9kZWxheTtcblxuXHR9XG5cblx0cHVibGljIHNldCBkZWxheSh2YWx1ZTpudW1iZXIpXG5cdHtcblxuXHRcdHRoaXMuX2RlbGF5ID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fcnVubmluZykge1xuXHRcdFx0dGhpcy5zdG9wKCk7XG5cdFx0XHR0aGlzLnN0YXJ0KCk7XG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgZ2V0IHJlcGVhdENvdW50KCk6bnVtYmVyXG5cdHtcblxuXHRcdHJldHVybiB0aGlzLl9yZXBlYXRDb3VudDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcmVwZWF0Q291bnQodmFsdWU6bnVtYmVyKVxuXHR7XG5cblx0XHR0aGlzLl9yZXBlYXRDb3VudCA9IHZhbHVlO1xuXHR9XG5cblx0cHVibGljIHJlc2V0KCk6dm9pZFxuXHR7XG5cblx0XHRpZiAodGhpcy5fcnVubmluZykge1xuXHRcdFx0dGhpcy5zdG9wKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fY3VycmVudENvdW50ID0gMDtcblxuXHR9XG5cblx0cHVibGljIGdldCBydW5uaW5nKCk6Ym9vbGVhblxuXHR7XG5cblx0XHRyZXR1cm4gdGhpcy5fcnVubmluZztcblxuXHR9XG5cblx0cHVibGljIHN0YXJ0KCk6dm9pZFxuXHR7XG5cblx0XHR0aGlzLl9ydW5uaW5nID0gdHJ1ZTtcblx0XHRjbGVhckludGVydmFsKHRoaXMuX2lpZCk7XG5cdFx0dGhpcy5faWlkID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy50aWNrKCksIHRoaXMuX2RlbGF5KTtcblxuXHR9XG5cblx0cHVibGljIHN0b3AoKTp2b2lkXG5cdHtcblxuXHRcdHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcblx0XHRjbGVhckludGVydmFsKHRoaXMuX2lpZCk7XG5cblx0fVxuXG5cdHByaXZhdGUgdGljaygpOnZvaWRcblx0e1xuXG5cdFx0dGhpcy5fY3VycmVudENvdW50Kys7XG5cblx0XHRpZiAoKCB0aGlzLl9yZXBlYXRDb3VudCA+IDAgKSAmJiB0aGlzLl9jdXJyZW50Q291bnQgPj0gdGhpcy5fcmVwZWF0Q291bnQpIHtcblxuXHRcdFx0dGhpcy5zdG9wKCk7XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFRpbWVyRXZlbnQoVGltZXJFdmVudC5USU1FUikpO1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBUaW1lckV2ZW50KFRpbWVyRXZlbnQuVElNRVJfQ09NUExFVEUpKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgVGltZXJFdmVudChUaW1lckV2ZW50LlRJTUVSKSk7XG5cblx0XHR9XG5cblx0fVxufVxuXG5leHBvcnQgPSBUaW1lcjsiXX0=