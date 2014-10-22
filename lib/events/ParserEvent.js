var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");

var ParserEvent = (function (_super) {
    __extends(ParserEvent, _super);
    function ParserEvent(type, message) {
        if (typeof message === "undefined") { message = ''; }
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
        return new ParserEvent(this.type, this.message);
    };
    ParserEvent.PARSE_COMPLETE = 'parseComplete';

    ParserEvent.PARSE_ERROR = 'parseError';

    ParserEvent.READY_FOR_DEPENDENCIES = 'readyForDependencies';
    return ParserEvent;
})(Event);

module.exports = ParserEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9QYXJzZXJFdmVudC50cyJdLCJuYW1lcyI6WyJQYXJzZXJFdmVudCIsIlBhcnNlckV2ZW50LmNvbnN0cnVjdG9yIiwiUGFyc2VyRXZlbnQuY2xvbmUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1EQUEyRDs7QUFFM0Q7SUFBMEJBLDhCQUFLQTtJQXdCOUJBLHFCQUFZQSxJQUFXQSxFQUFFQSxPQUFtQkE7UUFBbkJDLHNDQUFBQSxPQUFPQSxHQUFVQSxFQUFFQTtBQUFBQSxRQUUzQ0EsV0FBTUEsT0FBQUEsSUFBSUEsQ0FBQ0E7O1FBRVhBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLE9BQU9BO0lBQ3hCQSxDQUFDQTtJQU1ERDtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsUUFBUUE7UUFDckJBLENBQUNBOzs7O0FBQUFBO0lBR0RBLDhCQUFBQTtRQUVDRSxPQUFPQSxJQUFJQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtJQUNoREEsQ0FBQ0E7SUFyQ0RGLDZCQUFzQ0EsZUFBZUE7O0lBTXJEQSwwQkFBbUNBLFlBQVlBOztJQVEvQ0EscUNBQThDQSxzQkFBc0JBO0lBd0JyRUEsbUJBQUNBO0FBQURBLENBQUNBLEVBN0N5QixLQUFLLEVBNkM5Qjs7QUFFRCw0QkFBcUIsQ0FBQSIsImZpbGUiOiJldmVudHMvUGFyc2VyRXZlbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcblxuY2xhc3MgUGFyc2VyRXZlbnQgZXh0ZW5kcyBFdmVudFxue1xuXHRwcml2YXRlIF9tZXNzYWdlOnN0cmluZztcblxuXHQvKipcblx0ICogRGlzcGF0Y2hlZCB3aGVuIHBhcnNpbmcgb2YgYW4gYXNzZXQgY29tcGxldGVkLlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBQQVJTRV9DT01QTEVURTpzdHJpbmcgPSAncGFyc2VDb21wbGV0ZSc7XG5cblx0LyoqXG5cdCAqIERpc3BhdGNoZWQgd2hlbiBhbiBlcnJvciBvY2N1cnMgd2hpbGUgcGFyc2luZyB0aGUgZGF0YSAoZS5nLiBiZWNhdXNlIGl0J3Ncblx0ICogaW5jb3JyZWN0bHkgZm9ybWF0dGVkLilcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgUEFSU0VfRVJST1I6c3RyaW5nID0gJ3BhcnNlRXJyb3InO1xuXG5cblx0LyoqXG5cdCAqIERpc3BhdGNoZWQgd2hlbiBhIHBhcnNlciBpcyByZWFkeSB0byBoYXZlIGRlcGVuZGVuY2llcyByZXRyaWV2ZWQgYW5kIHJlc29sdmVkLlxuXHQgKiBUaGlzIGlzIGFuIGludGVybmFsIGV2ZW50IHRoYXQgc2hvdWxkIHJhcmVseSAoaWYgZXZlcikgYmUgbGlzdGVuZWQgZm9yIGJ5XG5cdCAqIGV4dGVybmFsIGNsYXNzZXMuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIFJFQURZX0ZPUl9ERVBFTkRFTkNJRVM6c3RyaW5nID0gJ3JlYWR5Rm9yRGVwZW5kZW5jaWVzJztcblxuXG5cdGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nLCBtZXNzYWdlOnN0cmluZyA9ICcnKVxuXHR7XG5cdFx0c3VwZXIodHlwZSk7XG5cblx0XHR0aGlzLl9tZXNzYWdlID0gbWVzc2FnZTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEFkZGl0aW9uYWwgaHVtYW4tcmVhZGFibGUgbWVzc2FnZS4gVXN1YWxseSBzdXBwbGllZCBmb3IgUGFyc2VyRXZlbnQuUEFSU0VfRVJST1IgZXZlbnRzLlxuXHQgKi9cblx0cHVibGljIGdldCBtZXNzYWdlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWVzc2FnZTtcblx0fVxuXG5cblx0cHVibGljIGNsb25lKCk6RXZlbnRcblx0e1xuXHRcdHJldHVybiBuZXcgUGFyc2VyRXZlbnQodGhpcy50eXBlLCB0aGlzLm1lc3NhZ2UpO1xuXHR9XG59XG5cbmV4cG9ydCA9IFBhcnNlckV2ZW50OyJdfQ==