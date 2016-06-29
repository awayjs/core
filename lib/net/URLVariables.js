"use strict";
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
}());
exports.URLVariables = URLVariables;
