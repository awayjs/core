var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");

var ResizeEvent = (function (_super) {
    __extends(ResizeEvent, _super);
    function ResizeEvent(type, oldHeight, oldWidth) {
        if (typeof oldHeight === "undefined") { oldHeight = NaN; }
        if (typeof oldWidth === "undefined") { oldWidth = NaN; }
        _super.call(this, type);

        this._oldHeight = oldHeight;
        this._oldWidth = oldWidth;
    }
    Object.defineProperty(ResizeEvent.prototype, "oldHeight", {
        get: function () {
            return this._oldHeight;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(ResizeEvent.prototype, "oldWidth", {
        get: function () {
            return this._oldWidth;
        },
        enumerable: true,
        configurable: true
    });
    ResizeEvent.RESIZE = "resize";
    return ResizeEvent;
})(Event);

module.exports = ResizeEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9SZXNpemVFdmVudC50cyJdLCJuYW1lcyI6WyJSZXNpemVFdmVudCIsIlJlc2l6ZUV2ZW50LmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFBMkQ7O0FBRTNEO0lBQTBCQSw4QkFBS0E7SUFPOUJBLHFCQUFZQSxJQUFXQSxFQUFFQSxTQUFzQkEsRUFBRUEsUUFBcUJBO1FBQTdDQyx3Q0FBQUEsU0FBU0EsR0FBVUEsR0FBR0E7QUFBQUEsUUFBRUEsdUNBQUFBLFFBQVFBLEdBQVVBLEdBQUdBO0FBQUFBLFFBRXJFQSxXQUFNQSxPQUFBQSxJQUFJQSxDQUFDQTs7UUFFWEEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsU0FBU0E7UUFDM0JBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFFBQVFBO0lBQzFCQSxDQUFDQTtJQUVERDtRQUFBQSxLQUFBQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxVQUFVQTtRQUN2QkEsQ0FBQ0E7Ozs7QUFBQUE7SUFFREE7UUFBQUEsS0FBQUE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsU0FBU0E7UUFDdEJBLENBQUNBOzs7O0FBQUFBLElBckJEQSxxQkFBOEJBLFFBQVFBO0lBc0J2Q0EsbUJBQUNBO0FBQURBLENBQUNBLEVBeEJ5QixLQUFLLEVBd0I5Qjs7QUFFRCw0QkFBcUIsQ0FBQSIsImZpbGUiOiJldmVudHMvUmVzaXplRXZlbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcblxuY2xhc3MgUmVzaXplRXZlbnQgZXh0ZW5kcyBFdmVudFxue1xuXHRwdWJsaWMgc3RhdGljIFJFU0laRTpzdHJpbmcgPSBcInJlc2l6ZVwiO1xuXG5cdHByaXZhdGUgX29sZEhlaWdodDpudW1iZXI7XG5cdHByaXZhdGUgX29sZFdpZHRoOm51bWJlcjtcblxuXHRjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZywgb2xkSGVpZ2h0Om51bWJlciA9IE5hTiwgb2xkV2lkdGg6bnVtYmVyID0gTmFOKVxuXHR7XG5cdFx0c3VwZXIodHlwZSk7XG5cblx0XHR0aGlzLl9vbGRIZWlnaHQgPSBvbGRIZWlnaHQ7XG5cdFx0dGhpcy5fb2xkV2lkdGggPSBvbGRXaWR0aDtcblx0fVxuXG5cdHB1YmxpYyBnZXQgb2xkSGVpZ2h0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb2xkSGVpZ2h0O1xuXHR9XG5cblx0cHVibGljIGdldCBvbGRXaWR0aCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX29sZFdpZHRoO1xuXHR9XG59XG5cbmV4cG9ydCA9IFJlc2l6ZUV2ZW50OyJdfQ==