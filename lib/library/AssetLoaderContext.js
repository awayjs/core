var AssetLoaderContext = (function () {
    /**
     * AssetLoaderContext provides configuration for the AssetLoader load() and parse() operations.
     * Use it to configure how (and if) dependencies are loaded, or to map dependency URLs to
     * embedded data.
     *
     * @see away.loading.AssetLoader
     */
    function AssetLoaderContext(includeDependencies, dependencyBaseUrl) {
        if (includeDependencies === void 0) { includeDependencies = true; }
        if (dependencyBaseUrl === void 0) { dependencyBaseUrl = null; }
        this._includeDependencies = includeDependencies;
        this._dependencyBaseUrl = dependencyBaseUrl || '';
        this._embeddedDataByUrl = {};
        this._remappedUrls = {};
        this._materialMode = AssetLoaderContext.UNDEFINED;
    }
    Object.defineProperty(AssetLoaderContext.prototype, "includeDependencies", {
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
    Object.defineProperty(AssetLoaderContext.prototype, "materialMode", {
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
    Object.defineProperty(AssetLoaderContext.prototype, "dependencyBaseUrl", {
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
    Object.defineProperty(AssetLoaderContext.prototype, "overrideAbsolutePaths", {
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
    Object.defineProperty(AssetLoaderContext.prototype, "overrideFullURLs", {
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
    AssetLoaderContext.prototype.mapUrl = function (originalUrl, newUrl) {
        this._remappedUrls[originalUrl] = newUrl;
    };
    /**
     * Map a URL to embedded data, so that instead of trying to load a dependency from the URL at
     * which it's referenced, the dependency data will be retrieved straight from the memory instead.
     *
     * @param originalUrl The original URL which is referenced in the loaded resource.
     * @param data The embedded data. Can be ByteArray or a class which can be used to create a bytearray.
     */
    AssetLoaderContext.prototype.mapUrlToData = function (originalUrl, data) {
        this._embeddedDataByUrl[originalUrl] = data;
    };
    /**
     * @private
     * Defines whether embedded data has been mapped to a particular URL.
     */
    AssetLoaderContext.prototype._iHasDataForUrl = function (url) {
        return this._embeddedDataByUrl.hasOwnProperty(url);
    };
    /**
     * @private
     * Returns embedded data for a particular URL.
     */
    AssetLoaderContext.prototype._iGetDataForUrl = function (url) {
        return this._embeddedDataByUrl[url];
    };
    /**
     * @private
     * Defines whether a replacement URL has been mapped to a particular URL.
     */
    AssetLoaderContext.prototype._iHasMappingForUrl = function (url) {
        return this._remappedUrls.hasOwnProperty(url);
    };
    /**
     * @private
     * Returns new (replacement) URL for a particular original URL.
     */
    AssetLoaderContext.prototype._iGetRemappedUrl = function (originalUrl) {
        return this._remappedUrls[originalUrl];
    };
    AssetLoaderContext.UNDEFINED = 0;
    AssetLoaderContext.SINGLEPASS_MATERIALS = 1;
    AssetLoaderContext.MULTIPASS_MATERIALS = 2;
    return AssetLoaderContext;
})();
module.exports = AssetLoaderContext;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TG9hZGVyQ29udGV4dC50cyJdLCJuYW1lcyI6WyJBc3NldExvYWRlckNvbnRleHQiLCJBc3NldExvYWRlckNvbnRleHQuY29uc3RydWN0b3IiLCJBc3NldExvYWRlckNvbnRleHQuaW5jbHVkZURlcGVuZGVuY2llcyIsIkFzc2V0TG9hZGVyQ29udGV4dC5tYXRlcmlhbE1vZGUiLCJBc3NldExvYWRlckNvbnRleHQuZGVwZW5kZW5jeUJhc2VVcmwiLCJBc3NldExvYWRlckNvbnRleHQub3ZlcnJpZGVBYnNvbHV0ZVBhdGhzIiwiQXNzZXRMb2FkZXJDb250ZXh0Lm92ZXJyaWRlRnVsbFVSTHMiLCJBc3NldExvYWRlckNvbnRleHQubWFwVXJsIiwiQXNzZXRMb2FkZXJDb250ZXh0Lm1hcFVybFRvRGF0YSIsIkFzc2V0TG9hZGVyQ29udGV4dC5faUhhc0RhdGFGb3JVcmwiLCJBc3NldExvYWRlckNvbnRleHQuX2lHZXREYXRhRm9yVXJsIiwiQXNzZXRMb2FkZXJDb250ZXh0Ll9pSGFzTWFwcGluZ0ZvclVybCIsIkFzc2V0TG9hZGVyQ29udGV4dC5faUdldFJlbWFwcGVkVXJsIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNLGtCQUFrQjtJQWV2QkE7Ozs7OztPQU1HQTtJQUNIQSxTQXRCS0Esa0JBQWtCQSxDQXNCWEEsbUJBQWtDQSxFQUFFQSxpQkFBK0JBO1FBQW5FQyxtQ0FBa0NBLEdBQWxDQSwwQkFBa0NBO1FBQUVBLGlDQUErQkEsR0FBL0JBLHdCQUErQkE7UUFFOUVBLElBQUlBLENBQUNBLG9CQUFvQkEsR0FBR0EsbUJBQW1CQSxDQUFDQTtRQUNoREEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxHQUFHQSxpQkFBaUJBLElBQUlBLEVBQUVBLENBQUNBO1FBQ2xEQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEdBQUdBLEVBQUVBLENBQUNBO1FBQzdCQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUN4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Q0FBQ0EsQ0FBQ0E7SUFDckJBLHVDQUFvQkEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7SUFDaENBLHNDQUFtQkEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7SUFxSzlDQSx5QkFBQ0E7QUFBREEsQ0F6S0EsQUF5S0NBLElBQUE7QUFFRCxBQUE0QixpQkFBbkIsa0JBQWtCLENBQUMiLCJmaWxlIjoibGlicmFyeS9Bc3NldExvYWRlckNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXNzZXRMb2FkZXJDb250ZXh0XHJcbntcclxuXHRwdWJsaWMgc3RhdGljIFVOREVGSU5FRDpudW1iZXIgPSAwO1xyXG5cdHB1YmxpYyBzdGF0aWMgU0lOR0xFUEFTU19NQVRFUklBTFM6bnVtYmVyID0gMTtcclxuXHRwdWJsaWMgc3RhdGljIE1VTFRJUEFTU19NQVRFUklBTFM6bnVtYmVyID0gMjtcclxuXHJcblx0cHJpdmF0ZSBfaW5jbHVkZURlcGVuZGVuY2llczpib29sZWFuO1xyXG5cdHByaXZhdGUgX2RlcGVuZGVuY3lCYXNlVXJsOnN0cmluZztcclxuXHRwcml2YXRlIF9lbWJlZGRlZERhdGFCeVVybDpPYmplY3Q7XHJcblx0cHJpdmF0ZSBfcmVtYXBwZWRVcmxzOk9iamVjdDtcclxuXHRwcml2YXRlIF9tYXRlcmlhbE1vZGU6bnVtYmVyO1xyXG5cclxuXHRwcml2YXRlIF9vdmVycmlkZUFic1BhdGg6Ym9vbGVhbjtcclxuXHRwcml2YXRlIF9vdmVycmlkZUZ1bGxVcmxzOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFzc2V0TG9hZGVyQ29udGV4dCBwcm92aWRlcyBjb25maWd1cmF0aW9uIGZvciB0aGUgQXNzZXRMb2FkZXIgbG9hZCgpIGFuZCBwYXJzZSgpIG9wZXJhdGlvbnMuXHJcblx0ICogVXNlIGl0IHRvIGNvbmZpZ3VyZSBob3cgKGFuZCBpZikgZGVwZW5kZW5jaWVzIGFyZSBsb2FkZWQsIG9yIHRvIG1hcCBkZXBlbmRlbmN5IFVSTHMgdG9cclxuXHQgKiBlbWJlZGRlZCBkYXRhLlxyXG5cdCAqXHJcblx0ICogQHNlZSBhd2F5LmxvYWRpbmcuQXNzZXRMb2FkZXJcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihpbmNsdWRlRGVwZW5kZW5jaWVzOmJvb2xlYW4gPSB0cnVlLCBkZXBlbmRlbmN5QmFzZVVybDpzdHJpbmcgPSBudWxsKVxyXG5cdHtcclxuXHRcdHRoaXMuX2luY2x1ZGVEZXBlbmRlbmNpZXMgPSBpbmNsdWRlRGVwZW5kZW5jaWVzO1xyXG5cdFx0dGhpcy5fZGVwZW5kZW5jeUJhc2VVcmwgPSBkZXBlbmRlbmN5QmFzZVVybCB8fCAnJztcclxuXHRcdHRoaXMuX2VtYmVkZGVkRGF0YUJ5VXJsID0ge307XHJcblx0XHR0aGlzLl9yZW1hcHBlZFVybHMgPSB7fTtcclxuXHRcdHRoaXMuX21hdGVyaWFsTW9kZSA9IEFzc2V0TG9hZGVyQ29udGV4dC5VTkRFRklORUQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgZGVwZW5kZW5jaWVzIChhbGwgZmlsZXMgZXhjZXB0IHRoZSBvbmUgYXQgdGhlIFVSTCBnaXZlbiB0byB0aGUgbG9hZCgpIG9yXHJcblx0ICogcGFyc2VEYXRhKCkgb3BlcmF0aW9ucykgc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHkgbG9hZGVkLiBEZWZhdWx0cyB0byB0cnVlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaW5jbHVkZURlcGVuZGVuY2llcygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5faW5jbHVkZURlcGVuZGVuY2llcztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgaW5jbHVkZURlcGVuZGVuY2llcyh2YWw6Ym9vbGVhbilcclxuXHR7XHJcblx0XHR0aGlzLl9pbmNsdWRlRGVwZW5kZW5jaWVzID0gdmFsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWF0ZXJpYWxNb2RlIGRlZmluZXMsIGlmIHRoZSBQYXJzZXIgc2hvdWxkIGNyZWF0ZSBTaW5nbGVQYXNzIG9yIE11bHRpUGFzcyBNYXRlcmlhbHNcclxuXHQgKiBPcHRpb25zOlxyXG5cdCAqIDAgKERlZmF1bHQgLyB1bmRlZmluZWQpIC0gQWxsIFBhcnNlcnMgd2lsbCBjcmVhdGUgU2luZ2xlUGFzc01hdGVyaWFscywgYnV0IHRoZSBBV0QyLjFwYXJzZXIgd2lsbCBjcmVhdGUgTWF0ZXJpYWxzIGFzIHRoZXkgYXJlIGRlZmluZWQgaW4gdGhlIGZpbGVcclxuXHQgKiAxIChGb3JjZSBTaW5nbGVQYXNzKSAtIEFsbCBQYXJzZXJzIGNyZWF0ZSBTaW5nbGVQYXNzTWF0ZXJpYWxzXHJcblx0ICogMiAoRm9yY2UgTXVsdGlQYXNzKSAtIEFsbCBQYXJzZXJzIHdpbGwgY3JlYXRlIE11bHRpUGFzc01hdGVyaWFsc1xyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBtYXRlcmlhbE1vZGUoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbWF0ZXJpYWxNb2RlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBtYXRlcmlhbE1vZGUobWF0ZXJpYWxNb2RlOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLl9tYXRlcmlhbE1vZGUgPSBtYXRlcmlhbE1vZGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBIGJhc2UgVVJMIHRoYXQgd2lsbCBiZSBwcmVwZW5kZWQgdG8gYWxsIHJlbGF0aXZlIGRlcGVuZGVuY3kgVVJMcyBmb3VuZCBpbiBhIGxvYWRlZCByZXNvdXJjZS5cclxuXHQgKiBBYnNvbHV0ZSBwYXRocyB3aWxsIG5vdCBiZSBhZmZlY3RlZCBieSB0aGUgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGRlcGVuZGVuY3lCYXNlVXJsKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2RlcGVuZGVuY3lCYXNlVXJsO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBkZXBlbmRlbmN5QmFzZVVybCh2YWw6c3RyaW5nKVxyXG5cdHtcclxuXHRcdHRoaXMuX2RlcGVuZGVuY3lCYXNlVXJsID0gdmFsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVmaW5lcyB3aGV0aGVyIGFic29sdXRlIHBhdGhzIChkZWZpbmVkIGFzIHBhdGhzIHRoYXQgYmVnaW4gd2l0aCBhIFwiL1wiKSBzaG91bGQgYmUgb3ZlcnJpZGRlblxyXG5cdCAqIHdpdGggdGhlIGRlcGVuZGVuY3lCYXNlVXJsIGRlZmluZWQgaW4gdGhpcyBjb250ZXh0LiBJZiB0aGlzIGlzIHRydWUsIGFuZCB0aGUgYmFzZSBwYXRoIGlzXHJcblx0ICogXCJiYXNlXCIsIC9wYXRoL3RvL2Fzc2V0LmpwZyB3aWxsIGJlIHJlc29sdmVkIGFzIGJhc2UvcGF0aC90by9hc3NldC5qcGcuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBvdmVycmlkZUFic29sdXRlUGF0aHMoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX292ZXJyaWRlQWJzUGF0aDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgb3ZlcnJpZGVBYnNvbHV0ZVBhdGhzKHZhbDpib29sZWFuKVxyXG5cdHtcclxuXHRcdHRoaXMuX292ZXJyaWRlQWJzUGF0aCA9IHZhbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgd2hldGhlciBcImZ1bGxcIiBVUkxzIChkZWZpbmVkIGFzIGEgVVJMIHRoYXQgaW5jbHVkZXMgYSBzY2hlbWUsIGUuZy4gaHR0cDovLykgc2hvdWxkIGJlXHJcblx0ICogb3ZlcnJpZGRlbiB3aXRoIHRoZSBkZXBlbmRlbmN5QmFzZVVybCBkZWZpbmVkIGluIHRoaXMgY29udGV4dC4gSWYgdGhpcyBpcyB0cnVlLCBhbmQgdGhlIGJhc2VcclxuXHQgKiBwYXRoIGlzIFwiYmFzZVwiLCBodHRwOi8vZXhhbXBsZS5jb20vcGF0aC90by9hc3NldC5qcGcgd2lsbCBiZSByZXNvbHZlZCBhcyBiYXNlL3BhdGgvdG8vYXNzZXQuanBnLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgb3ZlcnJpZGVGdWxsVVJMcygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fb3ZlcnJpZGVGdWxsVXJscztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgb3ZlcnJpZGVGdWxsVVJMcyh2YWw6Ym9vbGVhbilcclxuXHR7XHJcblx0XHR0aGlzLl9vdmVycmlkZUZ1bGxVcmxzID0gdmFsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFwIGEgVVJMIHRvIGFub3RoZXIgVVJMLCBzbyB0aGF0IGZpbGVzIHRoYXQgYXJlIHJlZmVycmVkIHRvIGJ5IHRoZSBvcmlnaW5hbCBVUkwgd2lsbCBpbnN0ZWFkXHJcblx0ICogYmUgbG9hZGVkIGZyb20gdGhlIG5ldyBVUkwuIFVzZSB0aGlzIHdoZW4geW91ciBmaWxlIHN0cnVjdHVyZSBkb2VzIG5vdCBtYXRjaCB0aGUgb25lIHRoYXQgaXNcclxuXHQgKiBleHBlY3RlZCBieSB0aGUgbG9hZGVkIGZpbGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb3JpZ2luYWxVcmwgVGhlIG9yaWdpbmFsIFVSTCB3aGljaCBpcyByZWZlcmVuY2VkIGluIHRoZSBsb2FkZWQgcmVzb3VyY2UuXHJcblx0ICogQHBhcmFtIG5ld1VybCBUaGUgVVJMIGZyb20gd2hpY2ggYXdheS5zaG91bGQgbG9hZCB0aGUgcmVzb3VyY2UgaW5zdGVhZC5cclxuXHQgKlxyXG5cdCAqIEBzZWUgbWFwVXJsVG9EYXRhKClcclxuXHQgKi9cclxuXHRwdWJsaWMgbWFwVXJsKG9yaWdpbmFsVXJsOnN0cmluZywgbmV3VXJsOnN0cmluZylcclxuXHR7XHJcblx0XHR0aGlzLl9yZW1hcHBlZFVybHNbb3JpZ2luYWxVcmxdID0gbmV3VXJsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFwIGEgVVJMIHRvIGVtYmVkZGVkIGRhdGEsIHNvIHRoYXQgaW5zdGVhZCBvZiB0cnlpbmcgdG8gbG9hZCBhIGRlcGVuZGVuY3kgZnJvbSB0aGUgVVJMIGF0XHJcblx0ICogd2hpY2ggaXQncyByZWZlcmVuY2VkLCB0aGUgZGVwZW5kZW5jeSBkYXRhIHdpbGwgYmUgcmV0cmlldmVkIHN0cmFpZ2h0IGZyb20gdGhlIG1lbW9yeSBpbnN0ZWFkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9yaWdpbmFsVXJsIFRoZSBvcmlnaW5hbCBVUkwgd2hpY2ggaXMgcmVmZXJlbmNlZCBpbiB0aGUgbG9hZGVkIHJlc291cmNlLlxyXG5cdCAqIEBwYXJhbSBkYXRhIFRoZSBlbWJlZGRlZCBkYXRhLiBDYW4gYmUgQnl0ZUFycmF5IG9yIGEgY2xhc3Mgd2hpY2ggY2FuIGJlIHVzZWQgdG8gY3JlYXRlIGEgYnl0ZWFycmF5LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBtYXBVcmxUb0RhdGEob3JpZ2luYWxVcmw6c3RyaW5nLCBkYXRhOmFueSlcclxuXHR7XHJcblx0XHR0aGlzLl9lbWJlZGRlZERhdGFCeVVybFtvcmlnaW5hbFVybF0gPSBkYXRhO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgZW1iZWRkZWQgZGF0YSBoYXMgYmVlbiBtYXBwZWQgdG8gYSBwYXJ0aWN1bGFyIFVSTC5cclxuXHQgKi9cclxuXHRwdWJsaWMgX2lIYXNEYXRhRm9yVXJsKHVybDpzdHJpbmcpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZW1iZWRkZWREYXRhQnlVcmwuaGFzT3duUHJvcGVydHkodXJsKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogUmV0dXJucyBlbWJlZGRlZCBkYXRhIGZvciBhIHBhcnRpY3VsYXIgVVJMLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaUdldERhdGFGb3JVcmwodXJsOnN0cmluZyk6YW55XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2VtYmVkZGVkRGF0YUJ5VXJsW3VybF07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIERlZmluZXMgd2hldGhlciBhIHJlcGxhY2VtZW50IFVSTCBoYXMgYmVlbiBtYXBwZWQgdG8gYSBwYXJ0aWN1bGFyIFVSTC5cclxuXHQgKi9cclxuXHRwdWJsaWMgX2lIYXNNYXBwaW5nRm9yVXJsKHVybDpzdHJpbmcpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVtYXBwZWRVcmxzLmhhc093blByb3BlcnR5KHVybCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIFJldHVybnMgbmV3IChyZXBsYWNlbWVudCkgVVJMIGZvciBhIHBhcnRpY3VsYXIgb3JpZ2luYWwgVVJMLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaUdldFJlbWFwcGVkVXJsKG9yaWdpbmFsVXJsOnN0cmluZyk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JlbWFwcGVkVXJsc1tvcmlnaW5hbFVybF07XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBBc3NldExvYWRlckNvbnRleHQ7Il19