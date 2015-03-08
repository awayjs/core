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
        if (isNaN(delay) || delay < 0)
            throw new Error("Delay is negative or not a number");
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi91dGlscy9UaW1lci50cyJdLCJuYW1lcyI6WyJUaW1lciIsIlRpbWVyLmNvbnN0cnVjdG9yIiwiVGltZXIuY3VycmVudENvdW50IiwiVGltZXIuZGVsYXkiLCJUaW1lci5yZXBlYXRDb3VudCIsIlRpbWVyLnJlc2V0IiwiVGltZXIucnVubmluZyIsIlRpbWVyLnN0YXJ0IiwiVGltZXIuc3RvcCIsIlRpbWVyLnRpY2siXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sS0FBSyxXQUFlLDhCQUE4QixDQUFDLENBQUM7QUFDM0QsSUFBTyxlQUFlLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQUM3RSxJQUFPLFVBQVUsV0FBYyxtQ0FBbUMsQ0FBQyxDQUFDO0FBRXBFLElBQU0sS0FBSztJQUFTQSxVQUFkQSxLQUFLQSxVQUF3QkE7SUFRbENBLFNBUktBLEtBQUtBLENBUUVBLEtBQVlBLEVBQUVBLFdBQXNCQTtRQUF0QkMsMkJBQXNCQSxHQUF0QkEsZUFBc0JBO1FBRS9DQSxpQkFBT0EsQ0FBQ0E7UUFQREEsaUJBQVlBLEdBQVVBLENBQUNBLENBQUNBO1FBQ3hCQSxrQkFBYUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFFekJBLGFBQVFBLEdBQVdBLEtBQUtBLENBQUNBO1FBTWhDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUNwQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0E7UUFFaENBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBO1lBQzdCQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxtQ0FBbUNBLENBQUNBLENBQUNBO0lBQ3ZEQSxDQUFDQTtJQUVERCxzQkFBV0EsK0JBQVlBO2FBQXZCQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQUFBRjtJQUVEQSxzQkFBV0Esd0JBQUtBO2FBQWhCQTtZQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7YUFFREgsVUFBaUJBLEtBQVlBO1lBRTVCRyxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUVwQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25CQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtnQkFDWkEsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7WUFDZEEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7OztPQVZBSDtJQVlEQSxzQkFBV0EsOEJBQVdBO2FBQXRCQTtZQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7YUFFREosVUFBdUJBLEtBQVlBO1lBRWxDSSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQUxBSjtJQU9NQSxxQkFBS0EsR0FBWkE7UUFFQ0ssRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7WUFDakJBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBRWJBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLENBQUNBLENBQUNBO0lBQ3hCQSxDQUFDQTtJQUVETCxzQkFBV0EsMEJBQU9BO2FBQWxCQTtZQUVDTSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7OztPQUFBTjtJQUVNQSxxQkFBS0EsR0FBWkE7UUFBQU8saUJBS0NBO1FBSEFBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3JCQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUN6QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsV0FBV0EsQ0FBQ0EsY0FBTUEsT0FBQUEsS0FBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsRUFBWEEsQ0FBV0EsRUFBRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDekRBLENBQUNBO0lBRU1QLG9CQUFJQSxHQUFYQTtRQUVDUSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUN0QkEsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDMUJBLENBQUNBO0lBRU9SLG9CQUFJQSxHQUFaQTtRQUVDUyxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQTtRQUVyQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBRUEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsQ0FBQ0EsQ0FBRUEsSUFBSUEsSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFMUVBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1lBQ1pBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLFVBQVVBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JEQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxVQUFVQSxDQUFDQSxVQUFVQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUUvREEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDUEEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsVUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDdERBLENBQUNBO0lBQ0ZBLENBQUNBO0lBQ0ZULFlBQUNBO0FBQURBLENBekZBLEFBeUZDQSxFQXpGbUIsZUFBZSxFQXlGbEM7QUFFRCxBQUFlLGlCQUFOLEtBQUssQ0FBQyIsImZpbGUiOiJ1dGlscy9UaW1lci5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJyb3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9FcnJvclwiKTtcbmltcG9ydCBFdmVudERpc3BhdGNoZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiKTtcbmltcG9ydCBUaW1lckV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL1RpbWVyRXZlbnRcIik7XG5cbmNsYXNzIFRpbWVyIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyXG57XG5cdHByaXZhdGUgX2RlbGF5Om51bWJlcjtcblx0cHJpdmF0ZSBfcmVwZWF0Q291bnQ6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfY3VycmVudENvdW50Om51bWJlciA9IDA7XG5cdHByaXZhdGUgX2lpZDpudW1iZXI7XG5cdHByaXZhdGUgX3J1bm5pbmc6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdGNvbnN0cnVjdG9yKGRlbGF5Om51bWJlciwgcmVwZWF0Q291bnQ6bnVtYmVyID0gMClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9kZWxheSA9IGRlbGF5O1xuXHRcdHRoaXMuX3JlcGVhdENvdW50ID0gcmVwZWF0Q291bnQ7XG5cblx0XHRpZiAoaXNOYU4oZGVsYXkpIHx8IGRlbGF5IDwgMClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkRlbGF5IGlzIG5lZ2F0aXZlIG9yIG5vdCBhIG51bWJlclwiKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgY3VycmVudENvdW50KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudENvdW50O1xuXHR9XG5cblx0cHVibGljIGdldCBkZWxheSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2RlbGF5O1xuXHR9XG5cblx0cHVibGljIHNldCBkZWxheSh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9kZWxheSA9IHZhbHVlO1xuXG5cdFx0aWYgKHRoaXMuX3J1bm5pbmcpIHtcblx0XHRcdHRoaXMuc3RvcCgpO1xuXHRcdFx0dGhpcy5zdGFydCgpO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBnZXQgcmVwZWF0Q291bnQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9yZXBlYXRDb3VudDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcmVwZWF0Q291bnQodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fcmVwZWF0Q291bnQgPSB2YWx1ZTtcblx0fVxuXG5cdHB1YmxpYyByZXNldCgpOnZvaWRcblx0e1xuXHRcdGlmICh0aGlzLl9ydW5uaW5nKVxuXHRcdFx0dGhpcy5zdG9wKCk7XG5cblx0XHR0aGlzLl9jdXJyZW50Q291bnQgPSAwO1xuXHR9XG5cblx0cHVibGljIGdldCBydW5uaW5nKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3J1bm5pbmc7XG5cdH1cblxuXHRwdWJsaWMgc3RhcnQoKTp2b2lkXG5cdHtcblx0XHR0aGlzLl9ydW5uaW5nID0gdHJ1ZTtcblx0XHRjbGVhckludGVydmFsKHRoaXMuX2lpZCk7XG5cdFx0dGhpcy5faWlkID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy50aWNrKCksIHRoaXMuX2RlbGF5KTtcblx0fVxuXG5cdHB1YmxpYyBzdG9wKCk6dm9pZFxuXHR7XG5cdFx0dGhpcy5fcnVubmluZyA9IGZhbHNlO1xuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy5faWlkKTtcblx0fVxuXG5cdHByaXZhdGUgdGljaygpOnZvaWRcblx0e1xuXHRcdHRoaXMuX2N1cnJlbnRDb3VudCsrO1xuXG5cdFx0aWYgKCggdGhpcy5fcmVwZWF0Q291bnQgPiAwICkgJiYgdGhpcy5fY3VycmVudENvdW50ID49IHRoaXMuX3JlcGVhdENvdW50KSB7XG5cblx0XHRcdHRoaXMuc3RvcCgpO1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBUaW1lckV2ZW50KFRpbWVyRXZlbnQuVElNRVIpKTtcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgVGltZXJFdmVudChUaW1lckV2ZW50LlRJTUVSX0NPTVBMRVRFKSk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBUaW1lckV2ZW50KFRpbWVyRXZlbnQuVElNRVIpKTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0ID0gVGltZXI7Il19