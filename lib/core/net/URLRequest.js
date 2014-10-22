var URLRequestMethod = require("awayjs-core/lib/core/net/URLRequestMethod");

var URLRequest = (function () {
    /**
    
    * @param url
    */
    function URLRequest(url) {
        if (typeof url === "undefined") { url = null; }
        /**
        *
        * away.net.URLRequestMethod.GET
        * away.net.URLRequestMethod.POST
        *
        * @type {string}
        */
        this.method = URLRequestMethod.GET;
        /**
        * Use asynchronous XMLHttpRequest
        * @type {boolean}
        */
        this.async = true;
        this._url = url;
    }
    Object.defineProperty(URLRequest.prototype, "url", {
        /**
        *
        * @returns {string}
        */
        get: function () {
            return this._url;
        },
        /**
        *
        * @param value
        */
        set: function (value) {
            this._url = value;
        },
        enumerable: true,
        configurable: true
    });


    /**
    * dispose
    */
    URLRequest.prototype.dispose = function () {
        this.data = null;
        this._url = null;
    };
    return URLRequest;
})();

module.exports = URLRequest;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbmV0L1VSTFJlcXVlc3QudHMiXSwibmFtZXMiOlsiVVJMUmVxdWVzdCIsIlVSTFJlcXVlc3QuY29uc3RydWN0b3IiLCJVUkxSZXF1ZXN0LmRpc3Bvc2UiXSwibWFwcGluZ3MiOiJBQUFBLDJFQUFrRjs7QUFFbEY7SUFzQ0NBOzs7TUFER0E7SUFDSEEsb0JBQVlBLEdBQWlCQTtRQUFqQkMsa0NBQUFBLEdBQUdBLEdBQVVBLElBQUlBO0FBQUFBLFFBeEI3QkE7Ozs7OztVQU1HQTtRQUNIQSxLQUFPQSxNQUFNQSxHQUFVQSxnQkFBZ0JBLENBQUNBLEdBQUdBLENBQUNBO1FBRTVDQTs7O1VBR0dBO1FBQ0hBLEtBQU9BLEtBQUtBLEdBQVdBLElBQUlBLENBQUNBO1FBYTNCQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxHQUFHQTtJQUNoQkEsQ0FBQ0E7SUFNREQ7UUFBQUE7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxJQUFJQTtRQUNqQkEsQ0FBQ0E7UUFNREE7OztVQURHQTthQUNIQSxVQUFlQSxLQUFZQTtZQUUxQkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsS0FBS0E7UUFDbEJBLENBQUNBOzs7O0FBVEFBOztJQWNEQTs7TUFER0E7bUNBQ0hBO1FBRUNFLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBO1FBQ2hCQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQTtJQUNqQkEsQ0FBQ0E7SUFDRkYsa0JBQUNBO0FBQURBLENBQUNBLElBQUE7O0FBRUQsMkJBQW9CLENBQUEiLCJmaWxlIjoiY29yZS9uZXQvVVJMUmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVUkxSZXF1ZXN0TWV0aG9kXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9uZXQvVVJMUmVxdWVzdE1ldGhvZFwiKTtcblxuY2xhc3MgVVJMUmVxdWVzdFxue1xuXHQvKlxuXHQgKiBUaGUgTUlNRSBjb250ZW50IHR5cGUgb2YgdGhlIGNvbnRlbnQgaW4gdGhlIHRoZSBkYXRhIHByb3BlcnR5LlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Ly9wdWJsaWMgY29udGVudFR5cGUgICAgICA6IHN0cmluZyA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOyAvL05vdGU6IE5vdCB1c2VkIGZvciBub3cuXG5cblx0LyoqXG5cdCAqIE9iamVjdCBjb250YWluaW5nIGRhdGEgdG8gYmUgdHJhbnNtaXRlZCB3aXRoIFVSTCBSZXF1ZXN0ICggVVJMIFZhcmlhYmxlcyAvIGJpbmFyeSAvIHN0cmluZyApXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZGF0YTphbnk7XG5cblx0LyoqXG5cdCAqXG5cdCAqIGF3YXkubmV0LlVSTFJlcXVlc3RNZXRob2QuR0VUXG5cdCAqIGF3YXkubmV0LlVSTFJlcXVlc3RNZXRob2QuUE9TVFxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0cHVibGljIG1ldGhvZDpzdHJpbmcgPSBVUkxSZXF1ZXN0TWV0aG9kLkdFVDtcblxuXHQvKipcblx0ICogVXNlIGFzeW5jaHJvbm91cyBYTUxIdHRwUmVxdWVzdFxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHB1YmxpYyBhc3luYzpib29sZWFuID0gdHJ1ZTtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHByaXZhdGUgX3VybDpzdHJpbmc7XG5cblx0LyoqXG5cblx0ICogQHBhcmFtIHVybFxuXHQgKi9cblx0Y29uc3RydWN0b3IodXJsOnN0cmluZyA9IG51bGwpXG5cdHtcblx0XHR0aGlzLl91cmwgPSB1cmw7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHB1YmxpYyBnZXQgdXJsKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXJsO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSB2YWx1ZVxuXHQgKi9cblx0cHVibGljIHNldCB1cmwodmFsdWU6c3RyaW5nKVxuXHR7XG5cdFx0dGhpcy5fdXJsID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogZGlzcG9zZVxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKTp2b2lkXG5cdHtcblx0XHR0aGlzLmRhdGEgPSBudWxsO1xuXHRcdHRoaXMuX3VybCA9IG51bGw7XG5cdH1cbn1cblxuZXhwb3J0ID0gVVJMUmVxdWVzdDsiXX0=