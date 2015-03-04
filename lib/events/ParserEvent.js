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
        return new ParserEvent(this.type, this.message);
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
})(Event);
module.exports = ParserEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvUGFyc2VyRXZlbnQudHMiXSwibmFtZXMiOlsiUGFyc2VyRXZlbnQiLCJQYXJzZXJFdmVudC5jb25zdHJ1Y3RvciIsIlBhcnNlckV2ZW50Lm1lc3NhZ2UiLCJQYXJzZXJFdmVudC5jbG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUUzRCxJQUFNLFdBQVc7SUFBU0EsVUFBcEJBLFdBQVdBLFVBQWNBO0lBd0I5QkEsU0F4QktBLFdBQVdBLENBd0JKQSxJQUFXQSxFQUFFQSxPQUFtQkE7UUFBbkJDLHVCQUFtQkEsR0FBbkJBLFlBQW1CQTtRQUUzQ0Esa0JBQU1BLElBQUlBLENBQUNBLENBQUNBO1FBRVpBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLE9BQU9BLENBQUNBO0lBQ3pCQSxDQUFDQTtJQU1ERCxzQkFBV0EsZ0NBQU9BO1FBSGxCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDdEJBLENBQUNBOzs7T0FBQUY7SUFHTUEsMkJBQUtBLEdBQVpBO1FBRUNHLE1BQU1BLENBQUNBLElBQUlBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQ2pEQSxDQUFDQTtJQXhDREg7O09BRUdBO0lBQ1dBLDBCQUFjQSxHQUFVQSxlQUFlQSxDQUFDQTtJQUV0REE7OztPQUdHQTtJQUNXQSx1QkFBV0EsR0FBVUEsWUFBWUEsQ0FBQ0E7SUFHaERBOzs7O09BSUdBO0lBQ1dBLGtDQUFzQkEsR0FBVUEsc0JBQXNCQSxDQUFDQTtJQXdCdEVBLGtCQUFDQTtBQUFEQSxDQTdDQSxBQTZDQ0EsRUE3Q3lCLEtBQUssRUE2QzlCO0FBRUQsQUFBcUIsaUJBQVosV0FBVyxDQUFDIiwiZmlsZSI6ImV2ZW50cy9QYXJzZXJFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcblxuY2xhc3MgUGFyc2VyRXZlbnQgZXh0ZW5kcyBFdmVudFxue1xuXHRwcml2YXRlIF9tZXNzYWdlOnN0cmluZztcblxuXHQvKipcblx0ICogRGlzcGF0Y2hlZCB3aGVuIHBhcnNpbmcgb2YgYW4gYXNzZXQgY29tcGxldGVkLlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBQQVJTRV9DT01QTEVURTpzdHJpbmcgPSAncGFyc2VDb21wbGV0ZSc7XG5cblx0LyoqXG5cdCAqIERpc3BhdGNoZWQgd2hlbiBhbiBlcnJvciBvY2N1cnMgd2hpbGUgcGFyc2luZyB0aGUgZGF0YSAoZS5nLiBiZWNhdXNlIGl0J3Ncblx0ICogaW5jb3JyZWN0bHkgZm9ybWF0dGVkLilcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgUEFSU0VfRVJST1I6c3RyaW5nID0gJ3BhcnNlRXJyb3InO1xuXG5cblx0LyoqXG5cdCAqIERpc3BhdGNoZWQgd2hlbiBhIHBhcnNlciBpcyByZWFkeSB0byBoYXZlIGRlcGVuZGVuY2llcyByZXRyaWV2ZWQgYW5kIHJlc29sdmVkLlxuXHQgKiBUaGlzIGlzIGFuIGludGVybmFsIGV2ZW50IHRoYXQgc2hvdWxkIHJhcmVseSAoaWYgZXZlcikgYmUgbGlzdGVuZWQgZm9yIGJ5XG5cdCAqIGV4dGVybmFsIGNsYXNzZXMuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIFJFQURZX0ZPUl9ERVBFTkRFTkNJRVM6c3RyaW5nID0gJ3JlYWR5Rm9yRGVwZW5kZW5jaWVzJztcblxuXG5cdGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nLCBtZXNzYWdlOnN0cmluZyA9ICcnKVxuXHR7XG5cdFx0c3VwZXIodHlwZSk7XG5cblx0XHR0aGlzLl9tZXNzYWdlID0gbWVzc2FnZTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEFkZGl0aW9uYWwgaHVtYW4tcmVhZGFibGUgbWVzc2FnZS4gVXN1YWxseSBzdXBwbGllZCBmb3IgUGFyc2VyRXZlbnQuUEFSU0VfRVJST1IgZXZlbnRzLlxuXHQgKi9cblx0cHVibGljIGdldCBtZXNzYWdlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWVzc2FnZTtcblx0fVxuXG5cblx0cHVibGljIGNsb25lKCk6RXZlbnRcblx0e1xuXHRcdHJldHVybiBuZXcgUGFyc2VyRXZlbnQodGhpcy50eXBlLCB0aGlzLm1lc3NhZ2UpO1xuXHR9XG59XG5cbmV4cG9ydCA9IFBhcnNlckV2ZW50OyJdfQ==