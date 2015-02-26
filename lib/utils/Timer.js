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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi91dGlscy9UaW1lci50cyJdLCJuYW1lcyI6WyJUaW1lciIsIlRpbWVyLmNvbnN0cnVjdG9yIiwiVGltZXIuY3VycmVudENvdW50IiwiVGltZXIuZGVsYXkiLCJUaW1lci5yZXBlYXRDb3VudCIsIlRpbWVyLnJlc2V0IiwiVGltZXIucnVubmluZyIsIlRpbWVyLnN0YXJ0IiwiVGltZXIuc3RvcCIsIlRpbWVyLnRpY2siXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sS0FBSyxXQUFlLDhCQUE4QixDQUFDLENBQUM7QUFDM0QsSUFBTyxlQUFlLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQUM3RSxJQUFPLFVBQVUsV0FBYyxtQ0FBbUMsQ0FBQyxDQUFDO0FBRXBFLElBQU0sS0FBSztJQUFTQSxVQUFkQSxLQUFLQSxVQUF3QkE7SUFTbENBLFNBVEtBLEtBQUtBLENBU0VBLEtBQVlBLEVBQUVBLFdBQXNCQTtRQUF0QkMsMkJBQXNCQSxHQUF0QkEsZUFBc0JBO1FBRy9DQSxpQkFBT0EsQ0FBQ0E7UUFSREEsaUJBQVlBLEdBQVVBLENBQUNBLENBQUNBO1FBQ3hCQSxrQkFBYUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFFekJBLGFBQVFBLEdBQVdBLEtBQUtBLENBQUNBO1FBUWhDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUNwQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0E7UUFFaENBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQy9CQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxtQ0FBbUNBLENBQUNBLENBQUNBO1FBQ3REQSxDQUFDQTtJQUVGQSxDQUFDQTtJQUVERCxzQkFBV0EsK0JBQVlBO2FBQXZCQTtZQUdDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUUzQkEsQ0FBQ0E7OztPQUFBRjtJQUVEQSxzQkFBV0Esd0JBQUtBO2FBQWhCQTtZQUdDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUVwQkEsQ0FBQ0E7YUFFREgsVUFBaUJBLEtBQVlBO1lBRzVCRyxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUVwQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25CQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtnQkFDWkEsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7WUFDZEEsQ0FBQ0E7UUFFRkEsQ0FBQ0E7OztPQVpBSDtJQWNEQSxzQkFBV0EsOEJBQVdBO2FBQXRCQTtZQUdDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7YUFFREosVUFBdUJBLEtBQVlBO1lBR2xDSSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQU5BSjtJQVFNQSxxQkFBS0EsR0FBWkE7UUFHQ0ssRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbkJBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBQ2JBLENBQUNBO1FBRURBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLENBQUNBLENBQUNBO0lBRXhCQSxDQUFDQTtJQUVETCxzQkFBV0EsMEJBQU9BO2FBQWxCQTtZQUdDTSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUV0QkEsQ0FBQ0E7OztPQUFBTjtJQUVNQSxxQkFBS0EsR0FBWkE7UUFBQU8saUJBT0NBO1FBSkFBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3JCQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUN6QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsV0FBV0EsQ0FBQ0EsY0FBTUEsT0FBQUEsS0FBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsRUFBWEEsQ0FBV0EsRUFBRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFFekRBLENBQUNBO0lBRU1QLG9CQUFJQSxHQUFYQTtRQUdDUSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUN0QkEsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFFMUJBLENBQUNBO0lBRU9SLG9CQUFJQSxHQUFaQTtRQUdDUyxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQTtRQUVyQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBRUEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsQ0FBQ0EsQ0FBRUEsSUFBSUEsSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFMUVBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1lBQ1pBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLFVBQVVBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JEQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxVQUFVQSxDQUFDQSxVQUFVQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUUvREEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFFUEEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsVUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFdERBLENBQUNBO0lBRUZBLENBQUNBO0lBQ0ZULFlBQUNBO0FBQURBLENBbkhBLEFBbUhDQSxFQW5IbUIsZUFBZSxFQW1IbEM7QUFFRCxBQUFlLGlCQUFOLEtBQUssQ0FBQyIsImZpbGUiOiJ1dGlscy9UaW1lci5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJyb3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9FcnJvclwiKTtcbmltcG9ydCBFdmVudERpc3BhdGNoZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiKTtcbmltcG9ydCBUaW1lckV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL1RpbWVyRXZlbnRcIik7XG5cbmNsYXNzIFRpbWVyIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyXG57XG5cblx0cHJpdmF0ZSBfZGVsYXk6bnVtYmVyO1xuXHRwcml2YXRlIF9yZXBlYXRDb3VudDpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9jdXJyZW50Q291bnQ6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfaWlkOm51bWJlcjtcblx0cHJpdmF0ZSBfcnVubmluZzpib29sZWFuID0gZmFsc2U7XG5cblx0Y29uc3RydWN0b3IoZGVsYXk6bnVtYmVyLCByZXBlYXRDb3VudDpudW1iZXIgPSAwKVxuXHR7XG5cblx0XHRzdXBlcigpO1xuXG5cblx0XHR0aGlzLl9kZWxheSA9IGRlbGF5O1xuXHRcdHRoaXMuX3JlcGVhdENvdW50ID0gcmVwZWF0Q291bnQ7XG5cblx0XHRpZiAoaXNOYU4oZGVsYXkpIHx8IGRlbGF5IDwgMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiRGVsYXkgaXMgbmVnYXRpdmUgb3Igbm90IGEgbnVtYmVyXCIpO1xuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIGdldCBjdXJyZW50Q291bnQoKTpudW1iZXJcblx0e1xuXG5cdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnRDb3VudDtcblxuXHR9XG5cblx0cHVibGljIGdldCBkZWxheSgpOm51bWJlclxuXHR7XG5cblx0XHRyZXR1cm4gdGhpcy5fZGVsYXk7XG5cblx0fVxuXG5cdHB1YmxpYyBzZXQgZGVsYXkodmFsdWU6bnVtYmVyKVxuXHR7XG5cblx0XHR0aGlzLl9kZWxheSA9IHZhbHVlO1xuXG5cdFx0aWYgKHRoaXMuX3J1bm5pbmcpIHtcblx0XHRcdHRoaXMuc3RvcCgpO1xuXHRcdFx0dGhpcy5zdGFydCgpO1xuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIGdldCByZXBlYXRDb3VudCgpOm51bWJlclxuXHR7XG5cblx0XHRyZXR1cm4gdGhpcy5fcmVwZWF0Q291bnQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHJlcGVhdENvdW50KHZhbHVlOm51bWJlcilcblx0e1xuXG5cdFx0dGhpcy5fcmVwZWF0Q291bnQgPSB2YWx1ZTtcblx0fVxuXG5cdHB1YmxpYyByZXNldCgpOnZvaWRcblx0e1xuXG5cdFx0aWYgKHRoaXMuX3J1bm5pbmcpIHtcblx0XHRcdHRoaXMuc3RvcCgpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2N1cnJlbnRDb3VudCA9IDA7XG5cblx0fVxuXG5cdHB1YmxpYyBnZXQgcnVubmluZygpOmJvb2xlYW5cblx0e1xuXG5cdFx0cmV0dXJuIHRoaXMuX3J1bm5pbmc7XG5cblx0fVxuXG5cdHB1YmxpYyBzdGFydCgpOnZvaWRcblx0e1xuXG5cdFx0dGhpcy5fcnVubmluZyA9IHRydWU7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLl9paWQpO1xuXHRcdHRoaXMuX2lpZCA9IHNldEludGVydmFsKCgpID0+IHRoaXMudGljaygpLCB0aGlzLl9kZWxheSk7XG5cblx0fVxuXG5cdHB1YmxpYyBzdG9wKCk6dm9pZFxuXHR7XG5cblx0XHR0aGlzLl9ydW5uaW5nID0gZmFsc2U7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLl9paWQpO1xuXG5cdH1cblxuXHRwcml2YXRlIHRpY2soKTp2b2lkXG5cdHtcblxuXHRcdHRoaXMuX2N1cnJlbnRDb3VudCsrO1xuXG5cdFx0aWYgKCggdGhpcy5fcmVwZWF0Q291bnQgPiAwICkgJiYgdGhpcy5fY3VycmVudENvdW50ID49IHRoaXMuX3JlcGVhdENvdW50KSB7XG5cblx0XHRcdHRoaXMuc3RvcCgpO1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBUaW1lckV2ZW50KFRpbWVyRXZlbnQuVElNRVIpKTtcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgVGltZXJFdmVudChUaW1lckV2ZW50LlRJTUVSX0NPTVBMRVRFKSk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFRpbWVyRXZlbnQoVGltZXJFdmVudC5USU1FUikpO1xuXG5cdFx0fVxuXG5cdH1cbn1cblxuZXhwb3J0ID0gVGltZXI7Il19