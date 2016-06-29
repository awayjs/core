"use strict";
var URLRequestMethod_1 = require("../net/URLRequestMethod");
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
        this.method = URLRequestMethod_1.URLRequestMethod.GET;
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
}());
exports.URLRequest = URLRequest;
