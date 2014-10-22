var AssetLoaderContext = (function () {
    /**
    * AssetLoaderContext provides configuration for the AssetLoader load() and parse() operations.
    * Use it to configure how (and if) dependencies are loaded, or to map dependency URLs to
    * embedded data.
    *
    * @see away.loading.AssetLoader
    */
    function AssetLoaderContext(includeDependencies, dependencyBaseUrl) {
        if (typeof includeDependencies === "undefined") { includeDependencies = true; }
        if (typeof dependencyBaseUrl === "undefined") { dependencyBaseUrl = null; }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbGlicmFyeS9Bc3NldExvYWRlckNvbnRleHQudHMiXSwibmFtZXMiOlsiQXNzZXRMb2FkZXJDb250ZXh0IiwiQXNzZXRMb2FkZXJDb250ZXh0LmNvbnN0cnVjdG9yIiwiQXNzZXRMb2FkZXJDb250ZXh0Lm1hcFVybCIsIkFzc2V0TG9hZGVyQ29udGV4dC5tYXBVcmxUb0RhdGEiLCJBc3NldExvYWRlckNvbnRleHQuX2lIYXNEYXRhRm9yVXJsIiwiQXNzZXRMb2FkZXJDb250ZXh0Ll9pR2V0RGF0YUZvclVybCIsIkFzc2V0TG9hZGVyQ29udGV4dC5faUhhc01hcHBpbmdGb3JVcmwiLCJBc3NldExvYWRlckNvbnRleHQuX2lHZXRSZW1hcHBlZFVybCJdLCJtYXBwaW5ncyI6IkFBQUE7SUFzQkNBOzs7Ozs7TUFER0E7SUFDSEEsNEJBQVlBLG1CQUFrQ0EsRUFBRUEsaUJBQStCQTtRQUFuRUMsa0RBQUFBLG1CQUFtQkEsR0FBV0EsSUFBSUE7QUFBQUEsUUFBRUEsZ0RBQUFBLGlCQUFpQkEsR0FBVUEsSUFBSUE7QUFBQUEsUUFFOUVBLElBQUlBLENBQUNBLG9CQUFvQkEsR0FBR0EsbUJBQW1CQTtRQUMvQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxHQUFHQSxpQkFBaUJBLElBQUlBLEVBQUVBO1FBQ2pEQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEdBQUdBLEVBQUVBO1FBQzVCQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxFQUFFQTtRQUN2QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0Esa0JBQWtCQSxDQUFDQSxTQUFTQTtJQUNsREEsQ0FBQ0E7SUFNREQ7UUFBQUE7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxvQkFBb0JBO1FBQ2pDQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUErQkEsR0FBV0E7WUFFekNBLElBQUlBLENBQUNBLG9CQUFvQkEsR0FBR0EsR0FBR0E7UUFDaENBLENBQUNBOzs7O0FBTEFBOztJQWVEQTtRQUFBQTs7Ozs7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxhQUFhQTtRQUMxQkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBd0JBLFlBQW1CQTtZQUUxQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsWUFBWUE7UUFDbENBLENBQUNBOzs7O0FBTEFBOztJQVdEQTtRQUFBQTs7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGtCQUFrQkE7UUFDL0JBLENBQUNBO1FBRURBLEtBQUFBLFVBQTZCQSxHQUFVQTtZQUV0Q0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxHQUFHQSxHQUFHQTtRQUM5QkEsQ0FBQ0E7Ozs7QUFMQUE7O0lBWURBO1FBQUFBOzs7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGdCQUFnQkE7UUFDN0JBLENBQUNBO1FBRURBLEtBQUFBLFVBQWlDQSxHQUFXQTtZQUUzQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxHQUFHQTtRQUM1QkEsQ0FBQ0E7Ozs7QUFMQUE7O0lBWURBO1FBQUFBOzs7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGlCQUFpQkE7UUFDOUJBLENBQUNBO1FBRURBLEtBQUFBLFVBQTRCQSxHQUFXQTtZQUV0Q0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxHQUFHQTtRQUM3QkEsQ0FBQ0E7Ozs7QUFMQUE7O0lBaUJEQTs7Ozs7Ozs7O01BREdBOzBDQUNIQSxVQUFjQSxXQUFrQkEsRUFBRUEsTUFBYUE7UUFFOUNFLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLE1BQU1BO0lBQ3pDQSxDQUFDQTs7SUFTREY7Ozs7OztNQURHQTtnREFDSEEsVUFBb0JBLFdBQWtCQSxFQUFFQSxJQUFRQTtRQUUvQ0csSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxJQUFJQTtJQUM1Q0EsQ0FBQ0E7O0lBTURIOzs7TUFER0E7bURBQ0hBLFVBQXVCQSxHQUFVQTtRQUVoQ0ksT0FBT0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxjQUFjQSxDQUFDQSxHQUFHQSxDQUFDQTtJQUNuREEsQ0FBQ0E7O0lBTURKOzs7TUFER0E7bURBQ0hBLFVBQXVCQSxHQUFVQTtRQUVoQ0ssT0FBT0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxHQUFHQSxDQUFDQTtJQUNwQ0EsQ0FBQ0E7O0lBTURMOzs7TUFER0E7c0RBQ0hBLFVBQTBCQSxHQUFVQTtRQUVuQ00sT0FBT0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7SUFDOUNBLENBQUNBOztJQU1ETjs7O01BREdBO29EQUNIQSxVQUF3QkEsV0FBa0JBO1FBRXpDTyxPQUFPQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxXQUFXQSxDQUFDQTtJQUN2Q0EsQ0FBQ0E7SUF0S0RQLCtCQUFpQ0EsQ0FBQ0E7SUFDbENBLDBDQUE0Q0EsQ0FBQ0E7SUFDN0NBLHlDQUEyQ0EsQ0FBQ0E7SUFxSzdDQSwwQkFBQ0E7QUFBREEsQ0FBQ0EsSUFBQTs7QUFFRCxtQ0FBNEIsQ0FBQSIsImZpbGUiOiJjb3JlL2xpYnJhcnkvQXNzZXRMb2FkZXJDb250ZXh0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXNzZXRMb2FkZXJDb250ZXh0XG57XG5cdHB1YmxpYyBzdGF0aWMgVU5ERUZJTkVEOm51bWJlciA9IDA7XG5cdHB1YmxpYyBzdGF0aWMgU0lOR0xFUEFTU19NQVRFUklBTFM6bnVtYmVyID0gMTtcblx0cHVibGljIHN0YXRpYyBNVUxUSVBBU1NfTUFURVJJQUxTOm51bWJlciA9IDI7XG5cblx0cHJpdmF0ZSBfaW5jbHVkZURlcGVuZGVuY2llczpib29sZWFuO1xuXHRwcml2YXRlIF9kZXBlbmRlbmN5QmFzZVVybDpzdHJpbmc7XG5cdHByaXZhdGUgX2VtYmVkZGVkRGF0YUJ5VXJsOk9iamVjdDtcblx0cHJpdmF0ZSBfcmVtYXBwZWRVcmxzOk9iamVjdDtcblx0cHJpdmF0ZSBfbWF0ZXJpYWxNb2RlOm51bWJlcjtcblxuXHRwcml2YXRlIF9vdmVycmlkZUFic1BhdGg6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfb3ZlcnJpZGVGdWxsVXJsczpib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBBc3NldExvYWRlckNvbnRleHQgcHJvdmlkZXMgY29uZmlndXJhdGlvbiBmb3IgdGhlIEFzc2V0TG9hZGVyIGxvYWQoKSBhbmQgcGFyc2UoKSBvcGVyYXRpb25zLlxuXHQgKiBVc2UgaXQgdG8gY29uZmlndXJlIGhvdyAoYW5kIGlmKSBkZXBlbmRlbmNpZXMgYXJlIGxvYWRlZCwgb3IgdG8gbWFwIGRlcGVuZGVuY3kgVVJMcyB0b1xuXHQgKiBlbWJlZGRlZCBkYXRhLlxuXHQgKlxuXHQgKiBAc2VlIGF3YXkubG9hZGluZy5Bc3NldExvYWRlclxuXHQgKi9cblx0Y29uc3RydWN0b3IoaW5jbHVkZURlcGVuZGVuY2llczpib29sZWFuID0gdHJ1ZSwgZGVwZW5kZW5jeUJhc2VVcmw6c3RyaW5nID0gbnVsbClcblx0e1xuXHRcdHRoaXMuX2luY2x1ZGVEZXBlbmRlbmNpZXMgPSBpbmNsdWRlRGVwZW5kZW5jaWVzO1xuXHRcdHRoaXMuX2RlcGVuZGVuY3lCYXNlVXJsID0gZGVwZW5kZW5jeUJhc2VVcmwgfHwgJyc7XG5cdFx0dGhpcy5fZW1iZWRkZWREYXRhQnlVcmwgPSB7fTtcblx0XHR0aGlzLl9yZW1hcHBlZFVybHMgPSB7fTtcblx0XHR0aGlzLl9tYXRlcmlhbE1vZGUgPSBBc3NldExvYWRlckNvbnRleHQuVU5ERUZJTkVEO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgd2hldGhlciBkZXBlbmRlbmNpZXMgKGFsbCBmaWxlcyBleGNlcHQgdGhlIG9uZSBhdCB0aGUgVVJMIGdpdmVuIHRvIHRoZSBsb2FkKCkgb3Jcblx0ICogcGFyc2VEYXRhKCkgb3BlcmF0aW9ucykgc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHkgbG9hZGVkLiBEZWZhdWx0cyB0byB0cnVlLlxuXHQgKi9cblx0cHVibGljIGdldCBpbmNsdWRlRGVwZW5kZW5jaWVzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2luY2x1ZGVEZXBlbmRlbmNpZXM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGluY2x1ZGVEZXBlbmRlbmNpZXModmFsOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl9pbmNsdWRlRGVwZW5kZW5jaWVzID0gdmFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1hdGVyaWFsTW9kZSBkZWZpbmVzLCBpZiB0aGUgUGFyc2VyIHNob3VsZCBjcmVhdGUgU2luZ2xlUGFzcyBvciBNdWx0aVBhc3MgTWF0ZXJpYWxzXG5cdCAqIE9wdGlvbnM6XG5cdCAqIDAgKERlZmF1bHQgLyB1bmRlZmluZWQpIC0gQWxsIFBhcnNlcnMgd2lsbCBjcmVhdGUgU2luZ2xlUGFzc01hdGVyaWFscywgYnV0IHRoZSBBV0QyLjFwYXJzZXIgd2lsbCBjcmVhdGUgTWF0ZXJpYWxzIGFzIHRoZXkgYXJlIGRlZmluZWQgaW4gdGhlIGZpbGVcblx0ICogMSAoRm9yY2UgU2luZ2xlUGFzcykgLSBBbGwgUGFyc2VycyBjcmVhdGUgU2luZ2xlUGFzc01hdGVyaWFsc1xuXHQgKiAyIChGb3JjZSBNdWx0aVBhc3MpIC0gQWxsIFBhcnNlcnMgd2lsbCBjcmVhdGUgTXVsdGlQYXNzTWF0ZXJpYWxzXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1hdGVyaWFsTW9kZSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsTW9kZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbWF0ZXJpYWxNb2RlKG1hdGVyaWFsTW9kZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9tYXRlcmlhbE1vZGUgPSBtYXRlcmlhbE1vZGU7XG5cdH1cblxuXHQvKipcblx0ICogQSBiYXNlIFVSTCB0aGF0IHdpbGwgYmUgcHJlcGVuZGVkIHRvIGFsbCByZWxhdGl2ZSBkZXBlbmRlbmN5IFVSTHMgZm91bmQgaW4gYSBsb2FkZWQgcmVzb3VyY2UuXG5cdCAqIEFic29sdXRlIHBhdGhzIHdpbGwgbm90IGJlIGFmZmVjdGVkIGJ5IHRoZSB2YWx1ZSBvZiB0aGlzIHByb3BlcnR5LlxuXHQgKi9cblx0cHVibGljIGdldCBkZXBlbmRlbmN5QmFzZVVybCgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2RlcGVuZGVuY3lCYXNlVXJsO1xuXHR9XG5cblx0cHVibGljIHNldCBkZXBlbmRlbmN5QmFzZVVybCh2YWw6c3RyaW5nKVxuXHR7XG5cdFx0dGhpcy5fZGVwZW5kZW5jeUJhc2VVcmwgPSB2YWw7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB3aGV0aGVyIGFic29sdXRlIHBhdGhzIChkZWZpbmVkIGFzIHBhdGhzIHRoYXQgYmVnaW4gd2l0aCBhIFwiL1wiKSBzaG91bGQgYmUgb3ZlcnJpZGRlblxuXHQgKiB3aXRoIHRoZSBkZXBlbmRlbmN5QmFzZVVybCBkZWZpbmVkIGluIHRoaXMgY29udGV4dC4gSWYgdGhpcyBpcyB0cnVlLCBhbmQgdGhlIGJhc2UgcGF0aCBpc1xuXHQgKiBcImJhc2VcIiwgL3BhdGgvdG8vYXNzZXQuanBnIHdpbGwgYmUgcmVzb2x2ZWQgYXMgYmFzZS9wYXRoL3RvL2Fzc2V0LmpwZy5cblx0ICovXG5cdHB1YmxpYyBnZXQgb3ZlcnJpZGVBYnNvbHV0ZVBhdGhzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX292ZXJyaWRlQWJzUGF0aDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgb3ZlcnJpZGVBYnNvbHV0ZVBhdGhzKHZhbDpib29sZWFuKVxuXHR7XG5cdFx0dGhpcy5fb3ZlcnJpZGVBYnNQYXRoID0gdmFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgd2hldGhlciBcImZ1bGxcIiBVUkxzIChkZWZpbmVkIGFzIGEgVVJMIHRoYXQgaW5jbHVkZXMgYSBzY2hlbWUsIGUuZy4gaHR0cDovLykgc2hvdWxkIGJlXG5cdCAqIG92ZXJyaWRkZW4gd2l0aCB0aGUgZGVwZW5kZW5jeUJhc2VVcmwgZGVmaW5lZCBpbiB0aGlzIGNvbnRleHQuIElmIHRoaXMgaXMgdHJ1ZSwgYW5kIHRoZSBiYXNlXG5cdCAqIHBhdGggaXMgXCJiYXNlXCIsIGh0dHA6Ly9leGFtcGxlLmNvbS9wYXRoL3RvL2Fzc2V0LmpwZyB3aWxsIGJlIHJlc29sdmVkIGFzIGJhc2UvcGF0aC90by9hc3NldC5qcGcuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG92ZXJyaWRlRnVsbFVSTHMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb3ZlcnJpZGVGdWxsVXJscztcblx0fVxuXG5cdHB1YmxpYyBzZXQgb3ZlcnJpZGVGdWxsVVJMcyh2YWw6Ym9vbGVhbilcblx0e1xuXHRcdHRoaXMuX292ZXJyaWRlRnVsbFVybHMgPSB2YWw7XG5cdH1cblxuXHQvKipcblx0ICogTWFwIGEgVVJMIHRvIGFub3RoZXIgVVJMLCBzbyB0aGF0IGZpbGVzIHRoYXQgYXJlIHJlZmVycmVkIHRvIGJ5IHRoZSBvcmlnaW5hbCBVUkwgd2lsbCBpbnN0ZWFkXG5cdCAqIGJlIGxvYWRlZCBmcm9tIHRoZSBuZXcgVVJMLiBVc2UgdGhpcyB3aGVuIHlvdXIgZmlsZSBzdHJ1Y3R1cmUgZG9lcyBub3QgbWF0Y2ggdGhlIG9uZSB0aGF0IGlzXG5cdCAqIGV4cGVjdGVkIGJ5IHRoZSBsb2FkZWQgZmlsZS5cblx0ICpcblx0ICogQHBhcmFtIG9yaWdpbmFsVXJsIFRoZSBvcmlnaW5hbCBVUkwgd2hpY2ggaXMgcmVmZXJlbmNlZCBpbiB0aGUgbG9hZGVkIHJlc291cmNlLlxuXHQgKiBAcGFyYW0gbmV3VXJsIFRoZSBVUkwgZnJvbSB3aGljaCBhd2F5LnNob3VsZCBsb2FkIHRoZSByZXNvdXJjZSBpbnN0ZWFkLlxuXHQgKlxuXHQgKiBAc2VlIG1hcFVybFRvRGF0YSgpXG5cdCAqL1xuXHRwdWJsaWMgbWFwVXJsKG9yaWdpbmFsVXJsOnN0cmluZywgbmV3VXJsOnN0cmluZylcblx0e1xuXHRcdHRoaXMuX3JlbWFwcGVkVXJsc1tvcmlnaW5hbFVybF0gPSBuZXdVcmw7XG5cdH1cblxuXHQvKipcblx0ICogTWFwIGEgVVJMIHRvIGVtYmVkZGVkIGRhdGEsIHNvIHRoYXQgaW5zdGVhZCBvZiB0cnlpbmcgdG8gbG9hZCBhIGRlcGVuZGVuY3kgZnJvbSB0aGUgVVJMIGF0XG5cdCAqIHdoaWNoIGl0J3MgcmVmZXJlbmNlZCwgdGhlIGRlcGVuZGVuY3kgZGF0YSB3aWxsIGJlIHJldHJpZXZlZCBzdHJhaWdodCBmcm9tIHRoZSBtZW1vcnkgaW5zdGVhZC5cblx0ICpcblx0ICogQHBhcmFtIG9yaWdpbmFsVXJsIFRoZSBvcmlnaW5hbCBVUkwgd2hpY2ggaXMgcmVmZXJlbmNlZCBpbiB0aGUgbG9hZGVkIHJlc291cmNlLlxuXHQgKiBAcGFyYW0gZGF0YSBUaGUgZW1iZWRkZWQgZGF0YS4gQ2FuIGJlIEJ5dGVBcnJheSBvciBhIGNsYXNzIHdoaWNoIGNhbiBiZSB1c2VkIHRvIGNyZWF0ZSBhIGJ5dGVhcnJheS5cblx0ICovXG5cdHB1YmxpYyBtYXBVcmxUb0RhdGEob3JpZ2luYWxVcmw6c3RyaW5nLCBkYXRhOmFueSlcblx0e1xuXHRcdHRoaXMuX2VtYmVkZGVkRGF0YUJ5VXJsW29yaWdpbmFsVXJsXSA9IGRhdGE7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICogRGVmaW5lcyB3aGV0aGVyIGVtYmVkZGVkIGRhdGEgaGFzIGJlZW4gbWFwcGVkIHRvIGEgcGFydGljdWxhciBVUkwuXG5cdCAqL1xuXHRwdWJsaWMgX2lIYXNEYXRhRm9yVXJsKHVybDpzdHJpbmcpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9lbWJlZGRlZERhdGFCeVVybC5oYXNPd25Qcm9wZXJ0eSh1cmwpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqIFJldHVybnMgZW1iZWRkZWQgZGF0YSBmb3IgYSBwYXJ0aWN1bGFyIFVSTC5cblx0ICovXG5cdHB1YmxpYyBfaUdldERhdGFGb3JVcmwodXJsOnN0cmluZyk6YW55XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZW1iZWRkZWREYXRhQnlVcmxbdXJsXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgYSByZXBsYWNlbWVudCBVUkwgaGFzIGJlZW4gbWFwcGVkIHRvIGEgcGFydGljdWxhciBVUkwuXG5cdCAqL1xuXHRwdWJsaWMgX2lIYXNNYXBwaW5nRm9yVXJsKHVybDpzdHJpbmcpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9yZW1hcHBlZFVybHMuaGFzT3duUHJvcGVydHkodXJsKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBSZXR1cm5zIG5ldyAocmVwbGFjZW1lbnQpIFVSTCBmb3IgYSBwYXJ0aWN1bGFyIG9yaWdpbmFsIFVSTC5cblx0ICovXG5cdHB1YmxpYyBfaUdldFJlbWFwcGVkVXJsKG9yaWdpbmFsVXJsOnN0cmluZyk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcmVtYXBwZWRVcmxzW29yaWdpbmFsVXJsXTtcblx0fVxufVxuXG5leHBvcnQgPSBBc3NldExvYWRlckNvbnRleHQ7Il19