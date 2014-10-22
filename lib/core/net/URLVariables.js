var URLVariables = (function () {
    /**
    *
    * @param source
    */
    function URLVariables(source) {
        if (typeof source === "undefined") { source = null; }
        this._variables = new Object();
        if (source !== null)
            this.decode(source);
    }
    /**
    *
    * @param source
    */
    URLVariables.prototype.decode = function (source) {
        source = source.split("+").join(" ");

        var tokens, re = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = re.exec(source))
            this._variables[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    };

    /**
    *
    * @returns {string}
    */
    URLVariables.prototype.toString = function () {
        return '';
    };

    Object.defineProperty(URLVariables.prototype, "variables", {
        /**
        *
        * @returns {Object}
        */
        get: function () {
            return this._variables;
        },
        /**
        *
        * @returns {Object}
        */
        set: function (obj) {
            this._variables = obj;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(URLVariables.prototype, "formData", {
        /**
        *
        * @returns {Object}
        */
        get: function () {
            var fd = new FormData();

            for (var s in this._variables)
                fd.append(s, this._variables[s]);

            return fd;
        },
        enumerable: true,
        configurable: true
    });

    return URLVariables;
})();

module.exports = URLVariables;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbmV0L1VSTFZhcmlhYmxlcy50cyJdLCJuYW1lcyI6WyJVUkxWYXJpYWJsZXMiLCJVUkxWYXJpYWJsZXMuY29uc3RydWN0b3IiLCJVUkxWYXJpYWJsZXMuZGVjb2RlIiwiVVJMVmFyaWFibGVzLnRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiQUFBQTtJQVFDQTs7O01BREdBO0lBQ0hBLHNCQUFZQSxNQUFvQkE7UUFBcEJDLHFDQUFBQSxNQUFNQSxHQUFVQSxJQUFJQTtBQUFBQSxRQU5oQ0EsS0FBUUEsVUFBVUEsR0FBVUEsSUFBSUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFReENBLElBQUlBLE1BQU1BLEtBQUtBLElBQUlBO1lBQ2xCQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtJQUN0QkEsQ0FBQ0E7SUFNREQ7OztNQURHQTtvQ0FDSEEsVUFBY0EsTUFBYUE7UUFFMUJFLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBOztRQUVwQ0EsSUFBSUEsTUFBTUEsRUFBRUEsRUFBRUEsR0FBR0EsdUJBQXVCQTs7UUFFeENBLE9BQU9BLE1BQU1BLEdBQUdBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO1lBQzlCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLGtCQUFrQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDakZBLENBQUNBOztJQU1ERjs7O01BREdBO3NDQUNIQTtRQUVDRyxPQUFPQSxFQUFFQTtJQUNWQSxDQUFDQTs7SUFNREg7UUFBQUE7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxVQUFVQTtRQUN2QkEsQ0FBQ0E7UUFvQkRBOzs7VUFER0E7YUFDSEEsVUFBcUJBLEdBQVVBO1lBRTlCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxHQUFHQTtRQUN0QkEsQ0FBQ0E7Ozs7QUF2QkFBO0lBTURBO1FBQUFBOzs7VUFER0E7YUFDSEE7WUFFQ0EsSUFBSUEsRUFBRUEsR0FBWUEsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7O1lBRWhDQSxLQUFLQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQTtnQkFDNUJBLEVBQUVBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOztZQUVsQ0EsT0FBT0EsRUFBRUE7UUFDVkEsQ0FBQ0E7Ozs7QUFBQUE7SUFVRkEsb0JBQUNBO0FBQURBLENBQUNBLElBQUE7O0FBRUQsNkJBQXNCLENBQUEiLCJmaWxlIjoiY29yZS9uZXQvVVJMVmFyaWFibGVzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVVJMVmFyaWFibGVzXG57XG5cdHByaXZhdGUgX3ZhcmlhYmxlczpPYmplY3QgPSBuZXcgT2JqZWN0KCk7XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBzb3VyY2Vcblx0ICovXG5cdGNvbnN0cnVjdG9yKHNvdXJjZTpzdHJpbmcgPSBudWxsKVxuXHR7XG5cdFx0aWYgKHNvdXJjZSAhPT0gbnVsbClcblx0XHRcdHRoaXMuZGVjb2RlKHNvdXJjZSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHNvdXJjZVxuXHQgKi9cblx0cHVibGljIGRlY29kZShzb3VyY2U6c3RyaW5nKTp2b2lkXG5cdHtcblx0XHRzb3VyY2UgPSBzb3VyY2Uuc3BsaXQoXCIrXCIpLmpvaW4oXCIgXCIpO1xuXG5cdFx0dmFyIHRva2VucywgcmUgPSAvWz8mXT8oW149XSspPShbXiZdKikvZztcblxuXHRcdHdoaWxlICh0b2tlbnMgPSByZS5leGVjKHNvdXJjZSkpXG5cdFx0XHR0aGlzLl92YXJpYWJsZXNbZGVjb2RlVVJJQ29tcG9uZW50KHRva2Vuc1sxXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHRva2Vuc1syXSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHB1YmxpYyB0b1N0cmluZygpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtPYmplY3R9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHZhcmlhYmxlcygpOk9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhcmlhYmxlcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fVxuXHQgKi9cblx0cHVibGljIGdldCBmb3JtRGF0YSgpOkZvcm1EYXRhXG5cdHtcblx0XHR2YXIgZmQ6Rm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuXHRcdGZvciAodmFyIHMgaW4gdGhpcy5fdmFyaWFibGVzKVxuXHRcdFx0ZmQuYXBwZW5kKHMsIHRoaXMuX3ZhcmlhYmxlc1tzXSk7XG5cblx0XHRyZXR1cm4gZmQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge09iamVjdH1cblx0ICovXG5cdHB1YmxpYyBzZXQgdmFyaWFibGVzKG9iajpPYmplY3QpXG5cdHtcblx0XHR0aGlzLl92YXJpYWJsZXMgPSBvYmo7XG5cdH1cbn1cblxuZXhwb3J0ID0gVVJMVmFyaWFibGVzOyJdfQ==