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
        if (url === void 0) { url = null; }
        if (content === void 0) { content = null; }
        if (assets === void 0) { assets = null; }
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
    /**
     * Dispatched when a resource and all of its dependencies is retrieved.
     */
    LoaderEvent.RESOURCE_COMPLETE = "resourceComplete";
    return LoaderEvent;
})(Event);
module.exports = LoaderEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvTG9hZGVyRXZlbnQudHMiXSwibmFtZXMiOlsiTG9hZGVyRXZlbnQiLCJMb2FkZXJFdmVudC5jb25zdHJ1Y3RvciIsIkxvYWRlckV2ZW50LmNvbnRlbnQiLCJMb2FkZXJFdmVudC51cmwiLCJMb2FkZXJFdmVudC5hc3NldHMiLCJMb2FkZXJFdmVudC5jbG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUUzRCxJQUFNLFdBQVc7SUFBU0EsVUFBcEJBLFdBQVdBLFVBQWNBO0lBVzlCQTs7Ozs7O09BTUdBO0lBQ0hBLFNBbEJLQSxXQUFXQSxDQWtCSkEsSUFBV0EsRUFBRUEsR0FBaUJBLEVBQUVBLE9BQXFCQSxFQUFFQSxNQUEyQkE7UUFBckVDLG1CQUFpQkEsR0FBakJBLFVBQWlCQTtRQUFFQSx1QkFBcUJBLEdBQXJCQSxjQUFxQkE7UUFBRUEsc0JBQTJCQSxHQUEzQkEsYUFBMkJBO1FBRTdGQSxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFWkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0E7UUFDaEJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLE9BQU9BLENBQUNBO1FBQ3hCQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxNQUFNQSxDQUFDQTtJQUN2QkEsQ0FBQ0E7SUFLREQsc0JBQVdBLGdDQUFPQTtRQUhsQkE7O1dBRUdBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBQ3RCQSxDQUFDQTs7O09BQUFGO0lBS0RBLHNCQUFXQSw0QkFBR0E7UUFIZEE7O1dBRUdBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1FBQ2xCQSxDQUFDQTs7O09BQUFIO0lBS0RBLHNCQUFXQSwrQkFBTUE7UUFIakJBOztXQUVHQTthQUNIQTtZQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7OztPQUFBSjtJQUVEQTs7O09BR0dBO0lBQ0lBLDJCQUFLQSxHQUFaQTtRQUVDSyxNQUFNQSxDQUFTQSxJQUFJQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtJQUNuRkEsQ0FBQ0E7SUF4RERMOztPQUVHQTtJQUNXQSw2QkFBaUJBLEdBQVVBLGtCQUFrQkEsQ0FBQ0E7SUFzRDdEQSxrQkFBQ0E7QUFBREEsQ0EzREEsQUEyRENBLEVBM0R5QixLQUFLLEVBMkQ5QjtBQUVELEFBQXFCLGlCQUFaLFdBQVcsQ0FBQyIsImZpbGUiOiJldmVudHMvTG9hZGVyRXZlbnQuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XHJcbmltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xyXG5cclxuY2xhc3MgTG9hZGVyRXZlbnQgZXh0ZW5kcyBFdmVudFxyXG57XHJcblx0LyoqXHJcblx0ICogRGlzcGF0Y2hlZCB3aGVuIGEgcmVzb3VyY2UgYW5kIGFsbCBvZiBpdHMgZGVwZW5kZW5jaWVzIGlzIHJldHJpZXZlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIFJFU09VUkNFX0NPTVBMRVRFOnN0cmluZyA9IFwicmVzb3VyY2VDb21wbGV0ZVwiO1xyXG5cclxuXHRwcml2YXRlIF91cmw6c3RyaW5nO1xyXG5cdHByaXZhdGUgX2NvbnRlbnQ6SUFzc2V0O1xyXG5cdHByaXZhdGUgX2Fzc2V0czpJQXNzZXRbXTtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlIGEgbmV3IExvYWRlckV2ZW50IG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB0eXBlIFRoZSBldmVudCB0eXBlLlxyXG5cdCAqIEBwYXJhbSB1cmwgVGhlIHVybCBvZiB0aGUgbG9hZGVkIHJlc291cmNlLlxyXG5cdCAqIEBwYXJhbSBhc3NldHMgVGhlIGFzc2V0cyBvZiB0aGUgbG9hZGVkIHJlc291cmNlLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nLCB1cmw6c3RyaW5nID0gbnVsbCwgY29udGVudDpJQXNzZXQgPSBudWxsLCBhc3NldHM6QXJyYXk8SUFzc2V0PiA9IG51bGwpXHJcblx0e1xyXG5cdFx0c3VwZXIodHlwZSk7XHJcblxyXG5cdFx0dGhpcy5fdXJsID0gdXJsO1xyXG5cdFx0dGhpcy5fY29udGVudCA9IGNvbnRlbnQ7XHJcblx0XHR0aGlzLl9hc3NldHMgPSBhc3NldHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY29udGVudCByZXR1cm5lZCBpZiB0aGUgcmVzb3VyY2UgaGFzIGJlZW4gbG9hZGVkIGluc2lkZSBhIDxjb2RlPkxvYWRlcjwvY29kZT4gb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgY29udGVudCgpOklBc3NldFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9jb250ZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHVybCBvZiB0aGUgbG9hZGVkIHJlc291cmNlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdXJsKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3VybDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlcnJvciBzdHJpbmcgb24gbG9hZEVycm9yLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYXNzZXRzKCk6SUFzc2V0W11cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYXNzZXRzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2xvbmVzIHRoZSBjdXJyZW50IGV2ZW50LlxyXG5cdCAqIEByZXR1cm4gQW4gZXhhY3QgZHVwbGljYXRlIG9mIHRoZSBjdXJyZW50IGV2ZW50LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9uZSgpOkV2ZW50XHJcblx0e1xyXG5cdFx0cmV0dXJuIDxFdmVudD4gbmV3IExvYWRlckV2ZW50KHRoaXMudHlwZSwgdGhpcy5fdXJsLCB0aGlzLl9jb250ZW50LCB0aGlzLl9hc3NldHMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gTG9hZGVyRXZlbnQ7Il19