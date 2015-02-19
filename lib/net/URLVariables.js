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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9uZXQvVVJMVmFyaWFibGVzLnRzIl0sIm5hbWVzIjpbIlVSTFZhcmlhYmxlcyIsIlVSTFZhcmlhYmxlcy5jb25zdHJ1Y3RvciIsIlVSTFZhcmlhYmxlcy5kZWNvZGUiLCJVUkxWYXJpYWJsZXMudG9TdHJpbmciLCJVUkxWYXJpYWJsZXMudmFyaWFibGVzIiwiVVJMVmFyaWFibGVzLmZvcm1EYXRhIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNLFlBQVk7SUFJakJBOzs7T0FHR0E7SUFDSEEsU0FSS0EsWUFBWUEsQ0FRTEEsTUFBb0JBO1FBQXBCQyxzQkFBb0JBLEdBQXBCQSxhQUFvQkE7UUFOeEJBLGVBQVVBLEdBQVVBLElBQUlBLE1BQU1BLEVBQUVBLENBQUNBO1FBUXhDQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxLQUFLQSxJQUFJQSxDQUFDQTtZQUNuQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDdEJBLENBQUNBO0lBRUREOzs7T0FHR0E7SUFDSUEsNkJBQU1BLEdBQWJBLFVBQWNBLE1BQWFBO1FBRTFCRSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUVyQ0EsSUFBSUEsTUFBTUEsRUFBRUEsRUFBRUEsR0FBR0EsdUJBQXVCQSxDQUFDQTtRQUV6Q0EsT0FBT0EsTUFBTUEsR0FBR0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDOUJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0Esa0JBQWtCQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNqRkEsQ0FBQ0E7SUFFREY7OztPQUdHQTtJQUNJQSwrQkFBUUEsR0FBZkE7UUFFQ0csTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7SUFDWEEsQ0FBQ0E7SUFNREgsc0JBQVdBLG1DQUFTQTtRQUpwQkE7OztXQUdHQTthQUNIQTtZQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUN4QkEsQ0FBQ0E7UUFnQkRKOzs7V0FHR0E7YUFDSEEsVUFBcUJBLEdBQVVBO1lBRTlCSSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxHQUFHQSxDQUFDQTtRQUN2QkEsQ0FBQ0E7OztPQXZCQUo7SUFNREEsc0JBQVdBLGtDQUFRQTtRQUpuQkE7OztXQUdHQTthQUNIQTtZQUVDSyxJQUFJQSxFQUFFQSxHQUFZQSxJQUFJQSxRQUFRQSxFQUFFQSxDQUFDQTtZQUVqQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQzdCQSxFQUFFQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVsQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7UUFDWEEsQ0FBQ0E7OztPQUFBTDtJQVVGQSxtQkFBQ0E7QUFBREEsQ0FwRUEsQUFvRUNBLElBQUE7QUFFRCxBQUFzQixpQkFBYixZQUFZLENBQUMiLCJmaWxlIjoibmV0L1VSTFZhcmlhYmxlcy5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBVUkxWYXJpYWJsZXNcclxue1xyXG5cdHByaXZhdGUgX3ZhcmlhYmxlczpPYmplY3QgPSBuZXcgT2JqZWN0KCk7XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHNvdXJjZVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHNvdXJjZTpzdHJpbmcgPSBudWxsKVxyXG5cdHtcclxuXHRcdGlmIChzb3VyY2UgIT09IG51bGwpXHJcblx0XHRcdHRoaXMuZGVjb2RlKHNvdXJjZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzb3VyY2VcclxuXHQgKi9cclxuXHRwdWJsaWMgZGVjb2RlKHNvdXJjZTpzdHJpbmcpOnZvaWRcclxuXHR7XHJcblx0XHRzb3VyY2UgPSBzb3VyY2Uuc3BsaXQoXCIrXCIpLmpvaW4oXCIgXCIpO1xyXG5cclxuXHRcdHZhciB0b2tlbnMsIHJlID0gL1s/Jl0/KFtePV0rKT0oW14mXSopL2c7XHJcblxyXG5cdFx0d2hpbGUgKHRva2VucyA9IHJlLmV4ZWMoc291cmNlKSlcclxuXHRcdFx0dGhpcy5fdmFyaWFibGVzW2RlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMV0pXSA9IGRlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMl0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyB0b1N0cmluZygpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiAnJztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge09iamVjdH1cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHZhcmlhYmxlcygpOk9iamVjdFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl92YXJpYWJsZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtPYmplY3R9XHJcblx0ICovXHJcblx0cHVibGljIGdldCBmb3JtRGF0YSgpOkZvcm1EYXRhXHJcblx0e1xyXG5cdFx0dmFyIGZkOkZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcblxyXG5cdFx0Zm9yICh2YXIgcyBpbiB0aGlzLl92YXJpYWJsZXMpXHJcblx0XHRcdGZkLmFwcGVuZChzLCB0aGlzLl92YXJpYWJsZXNbc10pO1xyXG5cclxuXHRcdHJldHVybiBmZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge09iamVjdH1cclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0IHZhcmlhYmxlcyhvYmo6T2JqZWN0KVxyXG5cdHtcclxuXHRcdHRoaXMuX3ZhcmlhYmxlcyA9IG9iajtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFVSTFZhcmlhYmxlczsiXX0=