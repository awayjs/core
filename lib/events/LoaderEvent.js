var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");

var LoaderEvent = (function (_super) {
    __extends(LoaderEvent, _super);
    /**
    * Create a new LoaderEvent object.
    *
    * @param type The event type.
    * @param url The url of the loaded resource.
    * @param assets The assets of the loaded resource.
    */
    function LoaderEvent(type, url, content, assets) {
        if (typeof url === "undefined") { url = null; }
        if (typeof content === "undefined") { content = null; }
        if (typeof assets === "undefined") { assets = null; }
        _super.call(this, type);

        this._url = url;
        this._content = content;
        this._assets = assets;
    }
    Object.defineProperty(LoaderEvent.prototype, "content", {
        /**
        * The content returned if the resource has been loaded inside a <code>Loader</code> object.
        */
        get: function () {
            return this._content;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LoaderEvent.prototype, "url", {
        /**
        * The url of the loaded resource.
        */
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LoaderEvent.prototype, "assets", {
        /**
        * The error string on loadError.
        */
        get: function () {
            return this._assets;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * Clones the current event.
    * @return An exact duplicate of the current event.
    */
    LoaderEvent.prototype.clone = function () {
        return new LoaderEvent(this.type, this._url, this._content, this._assets);
    };
    LoaderEvent.RESOURCE_COMPLETE = "resourceComplete";
    return LoaderEvent;
})(Event);

module.exports = LoaderEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9Mb2FkZXJFdmVudC50cyJdLCJuYW1lcyI6WyJMb2FkZXJFdmVudCIsIkxvYWRlckV2ZW50LmNvbnN0cnVjdG9yIiwiTG9hZGVyRXZlbnQuY2xvbmUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1EQUUyRDs7QUFFM0Q7SUFBMEJBLDhCQUFLQTtJQWtCOUJBOzs7Ozs7TUFER0E7SUFDSEEscUJBQVlBLElBQVdBLEVBQUVBLEdBQWlCQSxFQUFFQSxPQUE0QkEsRUFBRUEsTUFBMkJBO1FBQTVFQyxrQ0FBQUEsR0FBR0EsR0FBVUEsSUFBSUE7QUFBQUEsUUFBRUEsc0NBQUFBLE9BQU9BLEdBQWlCQSxJQUFJQTtBQUFBQSxRQUFFQSxxQ0FBQUEsTUFBTUEsR0FBaUJBLElBQUlBO0FBQUFBLFFBRXBHQSxXQUFNQSxPQUFBQSxJQUFJQSxDQUFDQTs7UUFFWEEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsR0FBR0E7UUFDZkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsT0FBT0E7UUFDdkJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE1BQU1BO0lBQ3RCQSxDQUFDQTtJQUtERDtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsUUFBUUE7UUFDckJBLENBQUNBOzs7O0FBQUFBO0lBS0RBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxJQUFJQTtRQUNqQkEsQ0FBQ0E7Ozs7QUFBQUE7SUFLREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLE9BQU9BO1FBQ3BCQSxDQUFDQTs7OztBQUFBQTtJQU1EQTs7O01BREdBO2tDQUNIQTtRQUVDRSxPQUFlQSxJQUFJQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtJQUNsRkEsQ0FBQ0E7SUFyRERGLGdDQUF5Q0Esa0JBQWtCQTtJQXNENURBLG1CQUFDQTtBQUFEQSxDQUFDQSxFQTNEeUIsS0FBSyxFQTJEOUI7O0FBRUQsNEJBQXFCLENBQUEiLCJmaWxlIjoiZXZlbnRzL0xvYWRlckV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IEV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnRcIik7XG5cbmNsYXNzIExvYWRlckV2ZW50IGV4dGVuZHMgRXZlbnRcbntcblx0LyoqXG5cdCAqIERpc3BhdGNoZWQgd2hlbiBhIHJlc291cmNlIGFuZCBhbGwgb2YgaXRzIGRlcGVuZGVuY2llcyBpcyByZXRyaWV2ZWQuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIFJFU09VUkNFX0NPTVBMRVRFOnN0cmluZyA9IFwicmVzb3VyY2VDb21wbGV0ZVwiO1xuXG5cdHByaXZhdGUgX3VybDpzdHJpbmc7XG5cdHByaXZhdGUgX2NvbnRlbnQ6RGlzcGxheU9iamVjdDtcblx0cHJpdmF0ZSBfYXNzZXRzOklBc3NldFtdO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgTG9hZGVyRXZlbnQgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gdHlwZSBUaGUgZXZlbnQgdHlwZS5cblx0ICogQHBhcmFtIHVybCBUaGUgdXJsIG9mIHRoZSBsb2FkZWQgcmVzb3VyY2UuXG5cdCAqIEBwYXJhbSBhc3NldHMgVGhlIGFzc2V0cyBvZiB0aGUgbG9hZGVkIHJlc291cmNlLlxuXHQgKi9cblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcsIHVybDpzdHJpbmcgPSBudWxsLCBjb250ZW50OkRpc3BsYXlPYmplY3QgPSBudWxsLCBhc3NldHM6QXJyYXk8SUFzc2V0PiA9IG51bGwpXG5cdHtcblx0XHRzdXBlcih0eXBlKTtcblxuXHRcdHRoaXMuX3VybCA9IHVybDtcblx0XHR0aGlzLl9jb250ZW50ID0gY29udGVudDtcblx0XHR0aGlzLl9hc3NldHMgPSBhc3NldHM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGNvbnRlbnQgcmV0dXJuZWQgaWYgdGhlIHJlc291cmNlIGhhcyBiZWVuIGxvYWRlZCBpbnNpZGUgYSA8Y29kZT5Mb2FkZXI8L2NvZGU+IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBnZXQgY29udGVudCgpOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHJldHVybiB0aGlzLl9jb250ZW50O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB1cmwgb2YgdGhlIGxvYWRlZCByZXNvdXJjZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgdXJsKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXJsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBlcnJvciBzdHJpbmcgb24gbG9hZEVycm9yLlxuXHQgKi9cblx0cHVibGljIGdldCBhc3NldHMoKTpJQXNzZXRbXVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2Fzc2V0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9uZXMgdGhlIGN1cnJlbnQgZXZlbnQuXG5cdCAqIEByZXR1cm4gQW4gZXhhY3QgZHVwbGljYXRlIG9mIHRoZSBjdXJyZW50IGV2ZW50LlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6RXZlbnRcblx0e1xuXHRcdHJldHVybiA8RXZlbnQ+IG5ldyBMb2FkZXJFdmVudCh0aGlzLnR5cGUsIHRoaXMuX3VybCwgdGhpcy5fY29udGVudCwgdGhpcy5fYXNzZXRzKTtcblx0fVxufVxuXG5leHBvcnQgPSBMb2FkZXJFdmVudDsiXX0=