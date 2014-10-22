var Error = (function () {
    function Error(message, id, _name) {
        if (typeof message === "undefined") { message = ''; }
        if (typeof id === "undefined") { id = 0; }
        if (typeof _name === "undefined") { _name = ''; }
        this._errorID = 0;
        this._messsage = '';
        this._name = '';
        this._messsage = message;
        this._name = name;
        this._errorID = id;
    }
    Object.defineProperty(Error.prototype, "message", {
        /**
        *
        * @returns {string}
        */
        get: function () {
            return this._messsage;
        },
        /**
        *
        * @param value
        */
        set: function (value) {
            this._messsage = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(Error.prototype, "name", {
        /**
        *
        * @returns {string}
        */
        get: function () {
            return this._name;
        },
        /**
        *
        * @param value
        */
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(Error.prototype, "errorID", {
        /**
        *
        * @returns {number}
        */
        get: function () {
            return this._errorID;
        },
        enumerable: true,
        configurable: true
    });
    return Error;
})();

module.exports = Error;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9ycy9FcnJvci50cyJdLCJuYW1lcyI6WyJFcnJvciIsIkVycm9yLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQTtJQU9DQSxlQUFZQSxPQUFtQkEsRUFBRUEsRUFBYUEsRUFBRUEsS0FBaUJBO1FBQXJEQyxzQ0FBQUEsT0FBT0EsR0FBVUEsRUFBRUE7QUFBQUEsUUFBRUEsaUNBQUFBLEVBQUVBLEdBQVVBLENBQUNBO0FBQUFBLFFBQUVBLG9DQUFBQSxLQUFLQSxHQUFVQSxFQUFFQTtBQUFBQSxRQUpqRUEsS0FBUUEsUUFBUUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLEtBQVFBLFNBQVNBLEdBQVVBLEVBQUVBLENBQUNBO1FBQzlCQSxLQUFRQSxLQUFLQSxHQUFVQSxFQUFFQSxDQUFDQTtRQUt6QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsT0FBT0E7UUFDeEJBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBO1FBQ2pCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxFQUFFQTtJQUVuQkEsQ0FBQ0E7SUFNREQ7UUFBQUE7OztVQURHQTthQUNIQTtZQUdDQSxPQUFPQSxJQUFJQSxDQUFDQSxTQUFTQTtRQUV0QkEsQ0FBQ0E7UUFNREE7OztVQURHQTthQUNIQSxVQUFtQkEsS0FBWUE7WUFHOUJBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLEtBQUtBO1FBRXZCQSxDQUFDQTs7OztBQVhBQTs7SUFpQkRBO1FBQUFBOzs7VUFER0E7YUFDSEE7WUFHQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsS0FBS0E7UUFFbEJBLENBQUNBO1FBTURBOzs7VUFER0E7YUFDSEEsVUFBZ0JBLEtBQVlBO1lBRzNCQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxLQUFLQTtRQUVuQkEsQ0FBQ0E7Ozs7QUFYQUE7O0lBaUJEQTtRQUFBQTs7O1VBREdBO2FBQ0hBO1lBR0NBLE9BQU9BLElBQUlBLENBQUNBLFFBQVFBO1FBRXJCQSxDQUFDQTs7OztBQUFBQSxJQUVGQSxhQUFDQTtBQUFEQSxDQUFDQSxJQUFBOztBQUVELHNCQUFlLENBQUEiLCJmaWxlIjoiZXJyb3JzL0Vycm9yLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRXJyb3JcbntcblxuXHRwcml2YXRlIF9lcnJvcklEOm51bWJlciA9IDA7ICAgLy9Db250YWlucyB0aGUgcmVmZXJlbmNlIG51bWJlciBhc3NvY2lhdGVkIHdpdGggdGhlIHNwZWNpZmljIGVycm9yIG1lc3NhZ2UuXG5cdHByaXZhdGUgX21lc3NzYWdlOnN0cmluZyA9ICcnOyAgLy9Db250YWlucyB0aGUgbWVzc2FnZSBhc3NvY2lhdGVkIHdpdGggdGhlIEVycm9yIG9iamVjdC5cblx0cHJpdmF0ZSBfbmFtZTpzdHJpbmcgPSAnJzsgIC8vIENvbnRhaW5zIHRoZSBuYW1lIG9mIHRoZSBFcnJvciBvYmplY3QuXG5cblx0Y29uc3RydWN0b3IobWVzc2FnZTpzdHJpbmcgPSAnJywgaWQ6bnVtYmVyID0gMCwgX25hbWU6c3RyaW5nID0gJycpXG5cdHtcblxuXHRcdHRoaXMuX21lc3NzYWdlID0gbWVzc2FnZTtcblx0XHR0aGlzLl9uYW1lID0gbmFtZTtcblx0XHR0aGlzLl9lcnJvcklEID0gaWQ7XG5cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0cHVibGljIGdldCBtZXNzYWdlKCk6c3RyaW5nXG5cdHtcblxuXHRcdHJldHVybiB0aGlzLl9tZXNzc2FnZTtcblxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSB2YWx1ZVxuXHQgKi9cblx0cHVibGljIHNldCBtZXNzYWdlKHZhbHVlOnN0cmluZylcblx0e1xuXG5cdFx0dGhpcy5fbWVzc3NhZ2UgPSB2YWx1ZTtcblxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmdcblx0e1xuXG5cdFx0cmV0dXJuIHRoaXMuX25hbWU7XG5cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gdmFsdWVcblx0ICovXG5cdHB1YmxpYyBzZXQgbmFtZSh2YWx1ZTpzdHJpbmcpXG5cdHtcblxuXHRcdHRoaXMuX25hbWUgPSB2YWx1ZTtcblxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGVycm9ySUQoKTpudW1iZXJcblx0e1xuXG5cdFx0cmV0dXJuIHRoaXMuX2Vycm9ySUQ7XG5cblx0fVxuXG59XG5cbmV4cG9ydCA9IEVycm9yOyJdfQ==