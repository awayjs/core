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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvUGFyc2VyRXZlbnQudHMiXSwibmFtZXMiOlsiUGFyc2VyRXZlbnQiLCJQYXJzZXJFdmVudC5jb25zdHJ1Y3RvciIsIlBhcnNlckV2ZW50Lm1lc3NhZ2UiLCJQYXJzZXJFdmVudC5jbG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUUzRCxJQUFNLFdBQVc7SUFBU0EsVUFBcEJBLFdBQVdBLFVBQWNBO0lBd0I5QkEsU0F4QktBLFdBQVdBLENBd0JKQSxJQUFXQSxFQUFFQSxPQUFtQkE7UUFBbkJDLHVCQUFtQkEsR0FBbkJBLFlBQW1CQTtRQUUzQ0Esa0JBQU1BLElBQUlBLENBQUNBLENBQUNBO1FBRVpBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLE9BQU9BLENBQUNBO0lBQ3pCQSxDQUFDQTtJQU1ERCxzQkFBV0EsZ0NBQU9BO1FBSGxCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDdEJBLENBQUNBOzs7T0FBQUY7SUFHTUEsMkJBQUtBLEdBQVpBO1FBRUNHLE1BQU1BLENBQUNBLElBQUlBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQ2pEQSxDQUFDQTtJQXhDREg7O09BRUdBO0lBQ1dBLDBCQUFjQSxHQUFVQSxlQUFlQSxDQUFDQTtJQUV0REE7OztPQUdHQTtJQUNXQSx1QkFBV0EsR0FBVUEsWUFBWUEsQ0FBQ0E7SUFHaERBOzs7O09BSUdBO0lBQ1dBLGtDQUFzQkEsR0FBVUEsc0JBQXNCQSxDQUFDQTtJQXdCdEVBLGtCQUFDQTtBQUFEQSxDQTdDQSxBQTZDQ0EsRUE3Q3lCLEtBQUssRUE2QzlCO0FBRUQsQUFBcUIsaUJBQVosV0FBVyxDQUFDIiwiZmlsZSI6ImV2ZW50cy9QYXJzZXJFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcclxuXHJcbmNsYXNzIFBhcnNlckV2ZW50IGV4dGVuZHMgRXZlbnRcclxue1xyXG5cdHByaXZhdGUgX21lc3NhZ2U6c3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwYXRjaGVkIHdoZW4gcGFyc2luZyBvZiBhbiBhc3NldCBjb21wbGV0ZWQuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBQQVJTRV9DT01QTEVURTpzdHJpbmcgPSAncGFyc2VDb21wbGV0ZSc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3BhdGNoZWQgd2hlbiBhbiBlcnJvciBvY2N1cnMgd2hpbGUgcGFyc2luZyB0aGUgZGF0YSAoZS5nLiBiZWNhdXNlIGl0J3NcclxuXHQgKiBpbmNvcnJlY3RseSBmb3JtYXR0ZWQuKVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgUEFSU0VfRVJST1I6c3RyaW5nID0gJ3BhcnNlRXJyb3InO1xyXG5cclxuXHJcblx0LyoqXHJcblx0ICogRGlzcGF0Y2hlZCB3aGVuIGEgcGFyc2VyIGlzIHJlYWR5IHRvIGhhdmUgZGVwZW5kZW5jaWVzIHJldHJpZXZlZCBhbmQgcmVzb2x2ZWQuXHJcblx0ICogVGhpcyBpcyBhbiBpbnRlcm5hbCBldmVudCB0aGF0IHNob3VsZCByYXJlbHkgKGlmIGV2ZXIpIGJlIGxpc3RlbmVkIGZvciBieVxyXG5cdCAqIGV4dGVybmFsIGNsYXNzZXMuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBSRUFEWV9GT1JfREVQRU5ERU5DSUVTOnN0cmluZyA9ICdyZWFkeUZvckRlcGVuZGVuY2llcyc7XHJcblxyXG5cclxuXHRjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZywgbWVzc2FnZTpzdHJpbmcgPSAnJylcclxuXHR7XHJcblx0XHRzdXBlcih0eXBlKTtcclxuXHJcblx0XHR0aGlzLl9tZXNzYWdlID0gbWVzc2FnZTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRpdGlvbmFsIGh1bWFuLXJlYWRhYmxlIG1lc3NhZ2UuIFVzdWFsbHkgc3VwcGxpZWQgZm9yIFBhcnNlckV2ZW50LlBBUlNFX0VSUk9SIGV2ZW50cy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1lc3NhZ2UoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbWVzc2FnZTtcclxuXHR9XHJcblxyXG5cclxuXHRwdWJsaWMgY2xvbmUoKTpFdmVudFxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgUGFyc2VyRXZlbnQodGhpcy50eXBlLCB0aGlzLm1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gUGFyc2VyRXZlbnQ7Il19