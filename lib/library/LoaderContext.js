"use strict";
var LoaderContext = (function () {
    /**
     * LoaderContext provides configuration for the Loader load() and parse() operations.
     * Use it to configure how (and if) dependencies are loaded, or to map dependency URLs to
     * embedded data.
     *
     * @see away.loading.Loader
     */
    function LoaderContext(includeDependencies, dependencyBaseUrl) {
        if (includeDependencies === void 0) { includeDependencies = true; }
        if (dependencyBaseUrl === void 0) { dependencyBaseUrl = null; }
        this._includeDependencies = includeDependencies;
        this._dependencyBaseUrl = dependencyBaseUrl || '';
        this._embeddedDataByUrl = {};
        this._remappedUrls = {};
        this._materialMode = LoaderContext.UNDEFINED;
    }
    Object.defineProperty(LoaderContext.prototype, "includeDependencies", {
        /**
         * Defines whether dependencies (all files except the one at the URL given to the load() or
         * parseData() operations) should be automatically loaded. Defaults to true.
         */
        get: function () {
            return this._includeDependencies;
        },
        set: function (val) {
            this._includeDependencies = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderContext.prototype, "materialMode", {
        /**
         * MaterialMode defines, if the Parser should create SinglePass or MultiPass Materials
         * Options:
         * 0 (Default / undefined) - All Parsers will create SinglePassMaterials, but the AWD2.1parser will create Materials as they are defined in the file
         * 1 (Force SinglePass) - All Parsers create SinglePassMaterials
         * 2 (Force MultiPass) - All Parsers will create MultiPassMaterials
         *
         */
        get: function () {
            return this._materialMode;
        },
        set: function (materialMode) {
            this._materialMode = materialMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderContext.prototype, "dependencyBaseUrl", {
        /**
         * A base URL that will be prepended to all relative dependency URLs found in a loaded resource.
         * Absolute paths will not be affected by the value of this property.
         */
        get: function () {
            return this._dependencyBaseUrl;
        },
        set: function (val) {
            this._dependencyBaseUrl = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderContext.prototype, "overrideAbsolutePaths", {
        /**
         * Defines whether absolute paths (defined as paths that begin with a "/") should be overridden
         * with the dependencyBaseUrl defined in this context. If this is true, and the base path is
         * "base", /path/to/asset.jpg will be resolved as base/path/to/asset.jpg.
         */
        get: function () {
            return this._overrideAbsPath;
        },
        set: function (val) {
            this._overrideAbsPath = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderContext.prototype, "overrideFullURLs", {
        /**
         * Defines whether "full" URLs (defined as a URL that includes a scheme, e.g. http://) should be
         * overridden with the dependencyBaseUrl defined in this context. If this is true, and the base
         * path is "base", http://example.com/path/to/asset.jpg will be resolved as base/path/to/asset.jpg.
         */
        get: function () {
            return this._overrideFullUrls;
        },
        set: function (val) {
            this._overrideFullUrls = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Map a URL to another URL, so that files that are referred to by the original URL will instead
     * be loaded from the new URL. Use this when your file structure does not match the one that is
     * expected by the loaded file.
     *
     * @param originalUrl The original URL which is referenced in the loaded resource.
     * @param newUrl The URL from which away.should load the resource instead.
     *
     * @see mapUrlToData()
     */
    LoaderContext.prototype.mapUrl = function (originalUrl, newUrl) {
        this._remappedUrls[originalUrl] = newUrl;
    };
    /**
     * Map a URL to embedded data, so that instead of trying to load a dependency from the URL at
     * which it's referenced, the dependency data will be retrieved straight from the memory instead.
     *
     * @param originalUrl The original URL which is referenced in the loaded resource.
     * @param data The embedded data. Can be ByteArray or a export class which can be used to create a bytearray.
     */
    LoaderContext.prototype.mapUrlToData = function (originalUrl, data) {
        this._embeddedDataByUrl[originalUrl] = data;
    };
    /**
     * @private
     * Defines whether embedded data has been mapped to a particular URL.
     */
    LoaderContext.prototype._iHasDataForUrl = function (url) {
        return this._embeddedDataByUrl.hasOwnProperty(url);
    };
    /**
     * @private
     * Returns embedded data for a particular URL.
     */
    LoaderContext.prototype._iGetDataForUrl = function (url) {
        return this._embeddedDataByUrl[url];
    };
    /**
     * @private
     * Defines whether a replacement URL has been mapped to a particular URL.
     */
    LoaderContext.prototype._iHasMappingForUrl = function (url) {
        return this._remappedUrls.hasOwnProperty(url);
    };
    /**
     * @private
     * Returns new (replacement) URL for a particular original URL.
     */
    LoaderContext.prototype._iGetRemappedUrl = function (originalUrl) {
        return this._remappedUrls[originalUrl];
    };
    LoaderContext.UNDEFINED = 0;
    LoaderContext.SINGLEPASS_MATERIALS = 1;
    LoaderContext.MULTIPASS_MATERIALS = 2;
    return LoaderContext;
}());
exports.LoaderContext = LoaderContext;
