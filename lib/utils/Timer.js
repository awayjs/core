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
        if (repeatCount === void 0) { repeatCount = 0; }
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
            this.dispatchEvent(new TimerEvent(TimerEvent.TIMER));
            this.dispatchEvent(new TimerEvent(TimerEvent.TIMER_COMPLETE));
        }
        else {
            this.dispatchEvent(new TimerEvent(TimerEvent.TIMER));
        }
    };
    return Timer;
})(EventDispatcher);
module.exports = Timer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi91dGlscy9UaW1lci50cyJdLCJuYW1lcyI6WyJUaW1lciIsIlRpbWVyLmNvbnN0cnVjdG9yIiwiVGltZXIuY3VycmVudENvdW50IiwiVGltZXIuZGVsYXkiLCJUaW1lci5yZXBlYXRDb3VudCIsIlRpbWVyLnJlc2V0IiwiVGltZXIucnVubmluZyIsIlRpbWVyLnN0YXJ0IiwiVGltZXIuc3RvcCIsIlRpbWVyLnRpY2siXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sS0FBSyxXQUFlLDhCQUE4QixDQUFDLENBQUM7QUFDM0QsSUFBTyxlQUFlLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQUM3RSxJQUFPLFVBQVUsV0FBYyxtQ0FBbUMsQ0FBQyxDQUFDO0FBRXBFLElBQU0sS0FBSztJQUFTQSxVQUFkQSxLQUFLQSxVQUF3QkE7SUFTbENBLFNBVEtBLEtBQUtBLENBU0VBLEtBQVlBLEVBQUVBLFdBQXNCQTtRQUF0QkMsMkJBQXNCQSxHQUF0QkEsZUFBc0JBO1FBRy9DQSxpQkFBT0EsQ0FBQ0E7UUFSREEsaUJBQVlBLEdBQVVBLENBQUNBLENBQUNBO1FBQ3hCQSxrQkFBYUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFFekJBLGFBQVFBLEdBQVdBLEtBQUtBLENBQUNBO1FBUWhDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUNwQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0E7UUFFaENBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQy9CQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxtQ0FBbUNBLENBQUNBLENBQUNBO1FBQ3REQSxDQUFDQTtJQUVGQSxDQUFDQTtJQUVERCxzQkFBV0EsK0JBQVlBO2FBQXZCQTtZQUdDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFD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InNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJyb3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9FcnJvclwiKTtcclxuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCIpO1xyXG5pbXBvcnQgVGltZXJFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9UaW1lckV2ZW50XCIpO1xyXG5cclxuY2xhc3MgVGltZXIgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcclxue1xyXG5cclxuXHRwcml2YXRlIF9kZWxheTpudW1iZXI7XHJcblx0cHJpdmF0ZSBfcmVwZWF0Q291bnQ6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF9jdXJyZW50Q291bnQ6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF9paWQ6bnVtYmVyO1xyXG5cdHByaXZhdGUgX3J1bm5pbmc6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihkZWxheTpudW1iZXIsIHJlcGVhdENvdW50Om51bWJlciA9IDApXHJcblx0e1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cclxuXHRcdHRoaXMuX2RlbGF5ID0gZGVsYXk7XHJcblx0XHR0aGlzLl9yZXBlYXRDb3VudCA9IHJlcGVhdENvdW50O1xyXG5cclxuXHRcdGlmIChpc05hTihkZWxheSkgfHwgZGVsYXkgPCAwKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkRlbGF5IGlzIG5lZ2F0aXZlIG9yIG5vdCBhIG51bWJlclwiKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IGN1cnJlbnRDb3VudCgpOm51bWJlclxyXG5cdHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudENvdW50O1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgZGVsYXkoKTpudW1iZXJcclxuXHR7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2RlbGF5O1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgZGVsYXkodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHJcblx0XHR0aGlzLl9kZWxheSA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh0aGlzLl9ydW5uaW5nKSB7XHJcblx0XHRcdHRoaXMuc3RvcCgpO1xyXG5cdFx0XHR0aGlzLnN0YXJ0KCk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCByZXBlYXRDb3VudCgpOm51bWJlclxyXG5cdHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcmVwZWF0Q291bnQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHJlcGVhdENvdW50KHZhbHVlOm51bWJlcilcclxuXHR7XHJcblxyXG5cdFx0dGhpcy5fcmVwZWF0Q291bnQgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZXNldCgpOnZvaWRcclxuXHR7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3J1bm5pbmcpIHtcclxuXHRcdFx0dGhpcy5zdG9wKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fY3VycmVudENvdW50ID0gMDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHJ1bm5pbmcoKTpib29sZWFuXHJcblx0e1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9ydW5uaW5nO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGFydCgpOnZvaWRcclxuXHR7XHJcblxyXG5cdFx0dGhpcy5fcnVubmluZyA9IHRydWU7XHJcblx0XHRjbGVhckludGVydmFsKHRoaXMuX2lpZCk7XHJcblx0XHR0aGlzLl9paWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnRpY2soKSwgdGhpcy5fZGVsYXkpO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdG9wKCk6dm9pZFxyXG5cdHtcclxuXHJcblx0XHR0aGlzLl9ydW5uaW5nID0gZmFsc2U7XHJcblx0XHRjbGVhckludGVydmFsKHRoaXMuX2lpZCk7XHJcblxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB0aWNrKCk6dm9pZFxyXG5cdHtcclxuXHJcblx0XHR0aGlzLl9jdXJyZW50Q291bnQrKztcclxuXHJcblx0XHRpZiAoKCB0aGlzLl9yZXBlYXRDb3VudCA+IDAgKSAmJiB0aGlzLl9jdXJyZW50Q291bnQgPj0gdGhpcy5fcmVwZWF0Q291bnQpIHtcclxuXHJcblx0XHRcdHRoaXMuc3RvcCgpO1xyXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFRpbWVyRXZlbnQoVGltZXJFdmVudC5USU1FUikpO1xyXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFRpbWVyRXZlbnQoVGltZXJFdmVudC5USU1FUl9DT01QTEVURSkpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFRpbWVyRXZlbnQoVGltZXJFdmVudC5USU1FUikpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBUaW1lcjsiXX0=