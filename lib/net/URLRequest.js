var URLRequestMethod = require("awayjs-core/lib/net/URLRequestMethod");
var URLRequest = (function () {
    /**

     * @param url
     */
    function URLRequest(url) {
        if (url === void 0) { url = null; }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9uZXQvdXJscmVxdWVzdC50cyJdLCJuYW1lcyI6WyJVUkxSZXF1ZXN0IiwiVVJMUmVxdWVzdC5jb25zdHJ1Y3RvciIsIlVSTFJlcXVlc3QudXJsIiwiVVJMUmVxdWVzdC5kaXNwb3NlIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLGdCQUFnQixXQUFjLHNDQUFzQyxDQUFDLENBQUM7QUFFN0UsSUFBTSxVQUFVO0lBa0NmQTs7O09BR0dBO0lBQ0hBLFNBdENLQSxVQUFVQSxDQXNDSEEsR0FBaUJBO1FBQWpCQyxtQkFBaUJBLEdBQWpCQSxVQUFpQkE7UUF4QjdCQTs7Ozs7O1dBTUdBO1FBQ0lBLFdBQU1BLEdBQVVBLGdCQUFnQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFFNUNBOzs7V0FHR0E7UUFDSUEsVUFBS0EsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFhM0JBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBO0lBQ2pCQSxDQUFDQTtJQU1ERCxzQkFBV0EsMkJBQUdBO1FBSmRBOzs7V0FHR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDbEJBLENBQUNBO1FBRURGOzs7V0FHR0E7YUFDSEEsVUFBZUEsS0FBWUE7WUFFMUJFLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEtBQUtBLENBQUNBO1FBQ25CQSxDQUFDQTs7O09BVEFGO0lBV0RBOztPQUVHQTtJQUNJQSw0QkFBT0EsR0FBZEE7UUFFQ0csSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDakJBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO0lBQ2xCQSxDQUFDQTtJQUNGSCxpQkFBQ0E7QUFBREEsQ0FyRUEsQUFxRUNBLElBQUE7QUFFRCxBQUFvQixpQkFBWCxVQUFVLENBQUMiLCJmaWxlIjoibmV0L1VSTFJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVSTFJlcXVlc3RNZXRob2RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9uZXQvVVJMUmVxdWVzdE1ldGhvZFwiKTtcblxuY2xhc3MgVVJMUmVxdWVzdFxue1xuXHQvKlxuXHQgKiBUaGUgTUlNRSBjb250ZW50IHR5cGUgb2YgdGhlIGNvbnRlbnQgaW4gdGhlIHRoZSBkYXRhIHByb3BlcnR5LlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Ly9wdWJsaWMgY29udGVudFR5cGUgICAgICA6IHN0cmluZyA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOyAvL05vdGU6IE5vdCB1c2VkIGZvciBub3cuXG5cblx0LyoqXG5cdCAqIE9iamVjdCBjb250YWluaW5nIGRhdGEgdG8gYmUgdHJhbnNtaXRlZCB3aXRoIFVSTCBSZXF1ZXN0ICggVVJMIFZhcmlhYmxlcyAvIGJpbmFyeSAvIHN0cmluZyApXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZGF0YTphbnk7XG5cblx0LyoqXG5cdCAqXG5cdCAqIGF3YXkubmV0LlVSTFJlcXVlc3RNZXRob2QuR0VUXG5cdCAqIGF3YXkubmV0LlVSTFJlcXVlc3RNZXRob2QuUE9TVFxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0cHVibGljIG1ldGhvZDpzdHJpbmcgPSBVUkxSZXF1ZXN0TWV0aG9kLkdFVDtcblxuXHQvKipcblx0ICogVXNlIGFzeW5jaHJvbm91cyBYTUxIdHRwUmVxdWVzdFxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHB1YmxpYyBhc3luYzpib29sZWFuID0gdHJ1ZTtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHByaXZhdGUgX3VybDpzdHJpbmc7XG5cblx0LyoqXG5cblx0ICogQHBhcmFtIHVybFxuXHQgKi9cblx0Y29uc3RydWN0b3IodXJsOnN0cmluZyA9IG51bGwpXG5cdHtcblx0XHR0aGlzLl91cmwgPSB1cmw7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHB1YmxpYyBnZXQgdXJsKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXJsO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSB2YWx1ZVxuXHQgKi9cblx0cHVibGljIHNldCB1cmwodmFsdWU6c3RyaW5nKVxuXHR7XG5cdFx0dGhpcy5fdXJsID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogZGlzcG9zZVxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKTp2b2lkXG5cdHtcblx0XHR0aGlzLmRhdGEgPSBudWxsO1xuXHRcdHRoaXMuX3VybCA9IG51bGw7XG5cdH1cbn1cblxuZXhwb3J0ID0gVVJMUmVxdWVzdDsiXX0=