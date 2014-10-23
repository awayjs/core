var URLVariables = (function () {
    /**
     *
     * @param source
     */
    function URLVariables(source) {
        if (source === void 0) { source = null; }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9uZXQvdXJsdmFyaWFibGVzLnRzIl0sIm5hbWVzIjpbIlVSTFZhcmlhYmxlcyIsIlVSTFZhcmlhYmxlcy5jb25zdHJ1Y3RvciIsIlVSTFZhcmlhYmxlcy5kZWNvZGUiLCJVUkxWYXJpYWJsZXMudG9TdHJpbmciLCJVUkxWYXJpYWJsZXMudmFyaWFibGVzIiwiVVJMVmFyaWFibGVzLmZvcm1EYXRhIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNLFlBQVk7SUFJakJBOzs7T0FHR0E7SUFDSEEsU0FSS0EsWUFBWUEsQ0FRTEEsTUFBb0JBO1FBQXBCQyxzQkFBb0JBLEdBQXBCQSxhQUFvQkE7UUFOeEJBLGVBQVVBLEdBQVVBLElBQUlBLE1BQU1BLEVBQUVBLENBQUNBO1FBUXhDQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxLQUFLQSxJQUFJQSxDQUFDQTtZQUNuQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDdEJBLENBQUNBO0lBRUREOzs7T0FHR0E7SUFDSUEsNkJBQU1BLEdBQWJBLFVBQWNBLE1BQWFBO1FBRTFCRSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUVyQ0EsSUFBSUEsTUFBTUEsRUFBRUEsRUFBRUEsR0FBR0EsdUJBQXVCQSxDQUFDQTtRQUV6Q0EsT0FBT0EsTUFBTUEsR0FBR0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDOUJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0Esa0JBQWtCQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNqRkEsQ0FBQ0E7SUFFREY7OztPQUdHQTtJQUNJQSwrQkFBUUEsR0FBZkE7UUFFQ0csTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7SUFDWEEsQ0FBQ0E7SUFNREgsc0JBQVdBLG1DQUFTQTtRQUpwQkE7OztXQUdHQTthQUNIQTtZQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUN4QkEsQ0FBQ0E7UUFnQkRKOzs7V0FHR0E7YUFDSEEsVUFBcUJBLEdBQVVBO1lBRTlCSSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxHQUFHQSxDQUFDQTtRQUN2QkEsQ0FBQ0E7OztPQXZCQUo7SUFNREEsc0JBQVdBLGtDQUFRQTtRQUpuQkE7OztXQUdHQTthQUNIQTtZQUVDSyxJQUFJQSxFQUFFQSxHQUFZQSxJQUFJQSxRQUFRQSxFQUFFQSxDQUFDQTtZQUVqQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQzdCQSxFQUFFQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVsQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7UUFDWEEsQ0FBQ0E7OztPQUFBTDtJQVVGQSxtQkFBQ0E7QUFBREEsQ0FwRUEsQUFvRUNBLElBQUE7QUFFRCxBQUFzQixpQkFBYixZQUFZLENBQUMiLCJmaWxlIjoibmV0L1VSTFZhcmlhYmxlcy5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBVUkxWYXJpYWJsZXNcbntcblx0cHJpdmF0ZSBfdmFyaWFibGVzOk9iamVjdCA9IG5ldyBPYmplY3QoKTtcblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHNvdXJjZVxuXHQgKi9cblx0Y29uc3RydWN0b3Ioc291cmNlOnN0cmluZyA9IG51bGwpXG5cdHtcblx0XHRpZiAoc291cmNlICE9PSBudWxsKVxuXHRcdFx0dGhpcy5kZWNvZGUoc291cmNlKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gc291cmNlXG5cdCAqL1xuXHRwdWJsaWMgZGVjb2RlKHNvdXJjZTpzdHJpbmcpOnZvaWRcblx0e1xuXHRcdHNvdXJjZSA9IHNvdXJjZS5zcGxpdChcIitcIikuam9pbihcIiBcIik7XG5cblx0XHR2YXIgdG9rZW5zLCByZSA9IC9bPyZdPyhbXj1dKyk9KFteJl0qKS9nO1xuXG5cdFx0d2hpbGUgKHRva2VucyA9IHJlLmV4ZWMoc291cmNlKSlcblx0XHRcdHRoaXMuX3ZhcmlhYmxlc1tkZWNvZGVVUklDb21wb25lbnQodG9rZW5zWzFdKV0gPSBkZWNvZGVVUklDb21wb25lbnQodG9rZW5zWzJdKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0cHVibGljIHRvU3RyaW5nKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge09iamVjdH1cblx0ICovXG5cdHB1YmxpYyBnZXQgdmFyaWFibGVzKCk6T2JqZWN0XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdmFyaWFibGVzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtPYmplY3R9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGZvcm1EYXRhKCk6Rm9ybURhdGFcblx0e1xuXHRcdHZhciBmZDpGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG5cdFx0Zm9yICh2YXIgcyBpbiB0aGlzLl92YXJpYWJsZXMpXG5cdFx0XHRmZC5hcHBlbmQocywgdGhpcy5fdmFyaWFibGVzW3NdKTtcblxuXHRcdHJldHVybiBmZDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fVxuXHQgKi9cblx0cHVibGljIHNldCB2YXJpYWJsZXMob2JqOk9iamVjdClcblx0e1xuXHRcdHRoaXMuX3ZhcmlhYmxlcyA9IG9iajtcblx0fVxufVxuXG5leHBvcnQgPSBVUkxWYXJpYWJsZXM7Il19