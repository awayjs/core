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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9uZXQvVVJMUmVxdWVzdC50cyJdLCJuYW1lcyI6WyJVUkxSZXF1ZXN0IiwiVVJMUmVxdWVzdC5jb25zdHJ1Y3RvciIsIlVSTFJlcXVlc3QudXJsIiwiVVJMUmVxdWVzdC5kaXNwb3NlIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLGdCQUFnQixXQUFjLHNDQUFzQyxDQUFDLENBQUM7QUFFN0UsSUFBTSxVQUFVO0lBa0NmQTs7O09BR0dBO0lBQ0hBLFNBdENLQSxVQUFVQSxDQXNDSEEsR0FBaUJBO1FBQWpCQyxtQkFBaUJBLEdBQWpCQSxVQUFpQkE7UUF4QjdCQTs7Ozs7O1dBTUdBO1FBQ0lBLFdBQU1BLEdBQVVBLGdCQUFnQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFFNUNBOzs7V0FHR0E7UUFDSUEsVUFBS0EsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFhM0JBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBO0lBQ2pCQSxDQUFDQTtJQU1ERCxzQkFBV0EsMkJBQUdBO1FBSmRBOzs7V0FHR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDbEJBLENBQUNBO1FBRURGOzs7V0FHR0E7YUFDSEEsVUFBZUEsS0FBWUE7WUFFMUJFLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEtBQUtBLENBQUNBO1FBQ25CQSxDQUFDQTs7O09BVEFGO0lBV0RBOztPQUVHQTtJQUNJQSw0QkFBT0EsR0FBZEE7UUFFQ0csSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDakJBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO0lBQ2xCQSxDQUFDQTtJQUNGSCxpQkFBQ0E7QUFBREEsQ0FyRUEsQUFxRUNBLElBQUE7QUFFRCxBQUFvQixpQkFBWCxVQUFVLENBQUMiLCJmaWxlIjoibmV0L1VSTFJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVSTFJlcXVlc3RNZXRob2RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9uZXQvVVJMUmVxdWVzdE1ldGhvZFwiKTtcclxuXHJcbmNsYXNzIFVSTFJlcXVlc3Rcclxue1xyXG5cdC8qXHJcblx0ICogVGhlIE1JTUUgY29udGVudCB0eXBlIG9mIHRoZSBjb250ZW50IGluIHRoZSB0aGUgZGF0YSBwcm9wZXJ0eS5cclxuXHQgKiBAdHlwZSB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdC8vcHVibGljIGNvbnRlbnRUeXBlICAgICAgOiBzdHJpbmcgPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzsgLy9Ob3RlOiBOb3QgdXNlZCBmb3Igbm93LlxyXG5cclxuXHQvKipcclxuXHQgKiBPYmplY3QgY29udGFpbmluZyBkYXRhIHRvIGJlIHRyYW5zbWl0ZWQgd2l0aCBVUkwgUmVxdWVzdCAoIFVSTCBWYXJpYWJsZXMgLyBiaW5hcnkgLyBzdHJpbmcgKVxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGRhdGE6YW55O1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIGF3YXkubmV0LlVSTFJlcXVlc3RNZXRob2QuR0VUXHJcblx0ICogYXdheS5uZXQuVVJMUmVxdWVzdE1ldGhvZC5QT1NUXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBtZXRob2Q6c3RyaW5nID0gVVJMUmVxdWVzdE1ldGhvZC5HRVQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVzZSBhc3luY2hyb25vdXMgWE1MSHR0cFJlcXVlc3RcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRwdWJsaWMgYXN5bmM6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfdXJsOnN0cmluZztcclxuXHJcblx0LyoqXHJcblxyXG5cdCAqIEBwYXJhbSB1cmxcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcih1cmw6c3RyaW5nID0gbnVsbClcclxuXHR7XHJcblx0XHR0aGlzLl91cmwgPSB1cmw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XHJcblx0ICovXHJcblx0cHVibGljIGdldCB1cmwoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdXJsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gdmFsdWVcclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0IHVybCh2YWx1ZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0dGhpcy5fdXJsID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBkaXNwb3NlXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2UoKTp2b2lkXHJcblx0e1xyXG5cdFx0dGhpcy5kYXRhID0gbnVsbDtcclxuXHRcdHRoaXMuX3VybCA9IG51bGw7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBVUkxSZXF1ZXN0OyJdfQ==