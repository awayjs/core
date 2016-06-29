"use strict";
var URLLoaderDataFormat = (function () {
    function URLLoaderDataFormat() {
    }
    /**
     * TEXT
     * @type {string}
     */
    URLLoaderDataFormat.TEXT = "text";
    /**
     * Variables / Value Pairs
     * @type {string}
     */
    URLLoaderDataFormat.VARIABLES = "variables";
    /**
     *
     * @type {string}
     */
    URLLoaderDataFormat.BLOB = "blob";
    /**
     *
     * @type {string}
     */
    URLLoaderDataFormat.ARRAY_BUFFER = "arraybuffer";
    /**
     *
     * @type {string}
     */
    URLLoaderDataFormat.BINARY = "binary";
    return URLLoaderDataFormat;
}());
exports.URLLoaderDataFormat = URLLoaderDataFormat;
