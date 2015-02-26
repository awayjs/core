/**
 * ResourceDependency represents the data required to load, parse and resolve additional files ("dependencies")
 * required by a parser, used by ResourceLoadSession.
 *
 */
var ResourceDependency = (function () {
    function ResourceDependency(id, request, data, parser, parentParser, retrieveAsRawData, suppressAssetEvents) {
        if (retrieveAsRawData === void 0) { retrieveAsRawData = false; }
        if (suppressAssetEvents === void 0) { suppressAssetEvents = false; }
        this._id = id;
        this._request = request;
        this._data = data;
        this._parser = parser;
        this._parentParser = parentParser;
        this._retrieveAsRawData = retrieveAsRawData;
        this._suppressAssetEvents = suppressAssetEvents;
        this._assets = new Array();
        this._dependencies = new Array();
    }
    Object.defineProperty(ResourceDependency.prototype, "id", {
        /**
         *
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "request", {
        /**
         *
         */
        get: function () {
            return this._request;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "data", {
        /**
         * The data containing the dependency to be parsed, if the resource was already loaded.
         */
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "parser", {
        /**
         *
         */
        get: function () {
            return this._parser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "parentParser", {
        /**
         * The parser which is dependent on this ResourceDependency object.
         */
        get: function () {
            return this._parentParser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "retrieveAsRawData", {
        /**
         *
         */
        get: function () {
            return this._retrieveAsRawData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "suppresAssetEvents", {
        /**
         *
         */
        get: function () {
            return this._suppressAssetEvents;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "assets", {
        /**
         *
         */
        get: function () {
            return this._assets;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "dependencies", {
        /**
         *
         */
        get: function () {
            return this._dependencies;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * Method to set data after having already created the dependency object, e.g. after load.
     */
    ResourceDependency.prototype._iSetData = function (data) {
        this._data = data;
    };
    /**
     * @private
     *
     */
    ResourceDependency.prototype._iSetParser = function (parser) {
        this._parser = parser;
    };
    /**
     * Resolve the dependency when it's loaded with the parent parser. For example, a dependency containing an
     * ImageResource would be assigned to a Mesh instance as a BitmapMaterial, a scene graph object would be added
     * to its intended parent. The dependency should be a member of the dependencies property.
     */
    ResourceDependency.prototype.resolve = function () {
        if (this._parentParser)
            this._parentParser._iResolveDependency(this);
    };
    /**
     * Resolve a dependency failure. For example, map loading failure from a 3d file
     */
    ResourceDependency.prototype.resolveFailure = function () {
        if (this._parentParser)
            this._parentParser._iResolveDependencyFailure(this);
    };
    /**
     * Resolve the dependencies name
     */
    ResourceDependency.prototype.resolveName = function (asset) {
        if (this._parentParser)
            return this._parentParser._iResolveDependencyName(this, asset);
        return asset.name;
    };
    return ResourceDependency;
})();
module.exports = ResourceDependency;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1Jlc291cmNlRGVwZW5kZW5jeS50cyJdLCJuYW1lcyI6WyJSZXNvdXJjZURlcGVuZGVuY3kiLCJSZXNvdXJjZURlcGVuZGVuY3kuY29uc3RydWN0b3IiLCJSZXNvdXJjZURlcGVuZGVuY3kuaWQiLCJSZXNvdXJjZURlcGVuZGVuY3kucmVxdWVzdCIsIlJlc291cmNlRGVwZW5kZW5jeS5kYXRhIiwiUmVzb3VyY2VEZXBlbmRlbmN5LnBhcnNlciIsIlJlc291cmNlRGVwZW5kZW5jeS5wYXJlbnRQYXJzZXIiLCJSZXNvdXJjZURlcGVuZGVuY3kucmV0cmlldmVBc1Jhd0RhdGEiLCJSZXNvdXJjZURlcGVuZGVuY3kuc3VwcHJlc0Fzc2V0RXZlbnRzIiwiUmVzb3VyY2VEZXBlbmRlbmN5LmFzc2V0cyIsIlJlc291cmNlRGVwZW5kZW5jeS5kZXBlbmRlbmNpZXMiLCJSZXNvdXJjZURlcGVuZGVuY3kuX2lTZXREYXRhIiwiUmVzb3VyY2VEZXBlbmRlbmN5Ll9pU2V0UGFyc2VyIiwiUmVzb3VyY2VEZXBlbmRlbmN5LnJlc29sdmUiLCJSZXNvdXJjZURlcGVuZGVuY3kucmVzb2x2ZUZhaWx1cmUiLCJSZXNvdXJjZURlcGVuZGVuY3kucmVzb2x2ZU5hbWUiXSwibWFwcGluZ3MiOiJBQUtBLEFBS0E7Ozs7R0FERztJQUNHLGtCQUFrQjtJQWdCdkJBLFNBaEJLQSxrQkFBa0JBLENBZ0JYQSxFQUFTQSxFQUFFQSxPQUFrQkEsRUFBRUEsSUFBUUEsRUFBRUEsTUFBaUJBLEVBQUVBLFlBQXVCQSxFQUFFQSxpQkFBaUNBLEVBQUVBLG1CQUFtQ0E7UUFBdEVDLGlDQUFpQ0EsR0FBakNBLHlCQUFpQ0E7UUFBRUEsbUNBQW1DQSxHQUFuQ0EsMkJBQW1DQTtRQUV0S0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDZEEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsT0FBT0EsQ0FBQ0E7UUFDeEJBLElBQUlBLENBQUNB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LHdDQUFXQSxHQUFsQkEsVUFBbUJBLEtBQVlBO1FBRTlCZSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtZQUN0QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxJQUFJQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUVoRUEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7SUFDbkJBLENBQUNBO0lBQ0ZmLHlCQUFDQTtBQUFEQSxDQXRKQSxBQXNKQ0EsSUFBQTtBQUVELEFBQTRCLGlCQUFuQixrQkFBa0IsQ0FBQyIsImZpbGUiOiJwYXJzZXJzL1Jlc291cmNlRGVwZW5kZW5jeS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyLvu79pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBVUkxMb2FkZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9uZXQvVVJMTG9hZGVyXCIpO1xuaW1wb3J0IFVSTFJlcXVlc3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9uZXQvVVJMUmVxdWVzdFwiKTtcbmltcG9ydCBQYXJzZXJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcGFyc2Vycy9QYXJzZXJCYXNlXCIpO1xuXG4vKipcbiAqIFJlc291cmNlRGVwZW5kZW5jeSByZXByZXNlbnRzIHRoZSBkYXRhIHJlcXVpcmVkIHRvIGxvYWQsIHBhcnNlIGFuZCByZXNvbHZlIGFkZGl0aW9uYWwgZmlsZXMgKFwiZGVwZW5kZW5jaWVzXCIpXG4gKiByZXF1aXJlZCBieSBhIHBhcnNlciwgdXNlZCBieSBSZXNvdXJjZUxvYWRTZXNzaW9uLlxuICpcbiAqL1xuY2xhc3MgUmVzb3VyY2VEZXBlbmRlbmN5XG57XG5cdHByaXZhdGUgX2lkOnN0cmluZztcblx0cHJpdmF0ZSBfcmVxdWVzdDpVUkxSZXF1ZXN0O1xuXHRwcml2YXRlIF9hc3NldHM6QXJyYXk8SUFzc2V0Pjtcblx0cHJpdmF0ZSBfcGFyc2VyOlBhcnNlckJhc2U7XG5cdHByaXZhdGUgX3BhcmVudFBhcnNlcjpQYXJzZXJCYXNlO1xuXHRwcml2YXRlIF9kYXRhOmFueTtcblx0cHJpdmF0ZSBfcmV0cmlldmVBc1Jhd0RhdGE6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfc3VwcHJlc3NBc3NldEV2ZW50czpib29sZWFuO1xuXHRwcml2YXRlIF9kZXBlbmRlbmNpZXM6QXJyYXk8UmVzb3VyY2VEZXBlbmRlbmN5PjtcblxuXHRwdWJsaWMgX2lMb2FkZXI6VVJMTG9hZGVyO1xuXHRwdWJsaWMgX2lTdWNjZXNzOmJvb2xlYW47XG5cblxuXHRjb25zdHJ1Y3RvcihpZDpzdHJpbmcsIHJlcXVlc3Q6VVJMUmVxdWVzdCwgZGF0YTphbnksIHBhcnNlcjpQYXJzZXJCYXNlLCBwYXJlbnRQYXJzZXI6UGFyc2VyQmFzZSwgcmV0cmlldmVBc1Jhd0RhdGE6Ym9vbGVhbiA9IGZhbHNlLCBzdXBwcmVzc0Fzc2V0RXZlbnRzOmJvb2xlYW4gPSBmYWxzZSlcblx0e1xuXHRcdHRoaXMuX2lkID0gaWQ7XG5cdFx0dGhpcy5fcmVxdWVzdCA9IHJlcXVlc3Q7XG5cdFx0dGhpcy5fZGF0YSA9IGRhdGE7XG5cdFx0dGhpcy5fcGFyc2VyID0gcGFyc2VyO1xuXHRcdHRoaXMuX3BhcmVudFBhcnNlciA9IHBhcmVudFBhcnNlcjtcblx0XHR0aGlzLl9yZXRyaWV2ZUFzUmF3RGF0YSA9IHJldHJpZXZlQXNSYXdEYXRhO1xuXHRcdHRoaXMuX3N1cHByZXNzQXNzZXRFdmVudHMgPSBzdXBwcmVzc0Fzc2V0RXZlbnRzO1xuXG5cdFx0dGhpcy5fYXNzZXRzID0gbmV3IEFycmF5PElBc3NldD4oKTtcblx0XHR0aGlzLl9kZXBlbmRlbmNpZXMgPSBuZXcgQXJyYXk8UmVzb3VyY2VEZXBlbmRlbmN5PigpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGlkKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faWQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgcmVxdWVzdCgpOlVSTFJlcXVlc3Rcblx0e1xuXHRcdHJldHVybiB0aGlzLl9yZXF1ZXN0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBkYXRhIGNvbnRhaW5pbmcgdGhlIGRlcGVuZGVuY3kgdG8gYmUgcGFyc2VkLCBpZiB0aGUgcmVzb3VyY2Ugd2FzIGFscmVhZHkgbG9hZGVkLlxuXHQgKi9cblx0cHVibGljIGdldCBkYXRhKCk6YW55XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGF0YTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBwYXJzZXIoKTpQYXJzZXJCYXNlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyc2VyO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBwYXJzZXIgd2hpY2ggaXMgZGVwZW5kZW50IG9uIHRoaXMgUmVzb3VyY2VEZXBlbmRlbmN5IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBnZXQgcGFyZW50UGFyc2VyKCk6UGFyc2VyQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BhcmVudFBhcnNlcjtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCByZXRyaWV2ZUFzUmF3RGF0YSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9yZXRyaWV2ZUFzUmF3RGF0YTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBzdXBwcmVzQXNzZXRFdmVudHMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc3VwcHJlc3NBc3NldEV2ZW50cztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBhc3NldHMoKTpBcnJheTxJQXNzZXQ+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYXNzZXRzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGRlcGVuZGVuY2llcygpOkFycmF5PFJlc291cmNlRGVwZW5kZW5jeT5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9kZXBlbmRlbmNpZXM7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICogTWV0aG9kIHRvIHNldCBkYXRhIGFmdGVyIGhhdmluZyBhbHJlYWR5IGNyZWF0ZWQgdGhlIGRlcGVuZGVuY3kgb2JqZWN0LCBlLmcuIGFmdGVyIGxvYWQuXG5cdCAqL1xuXHRwdWJsaWMgX2lTZXREYXRhKGRhdGE6YW55KTp2b2lkXG5cdHtcblx0XHR0aGlzLl9kYXRhID0gZGF0YTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKlxuXHQgKi9cblx0cHVibGljIF9pU2V0UGFyc2VyKHBhcnNlcjpQYXJzZXJCYXNlKTp2b2lkXG5cdHtcblx0XHR0aGlzLl9wYXJzZXIgPSBwYXJzZXI7XG5cdH1cblxuXHQvKipcblx0ICogUmVzb2x2ZSB0aGUgZGVwZW5kZW5jeSB3aGVuIGl0J3MgbG9hZGVkIHdpdGggdGhlIHBhcmVudCBwYXJzZXIuIEZvciBleGFtcGxlLCBhIGRlcGVuZGVuY3kgY29udGFpbmluZyBhblxuXHQgKiBJbWFnZVJlc291cmNlIHdvdWxkIGJlIGFzc2lnbmVkIHRvIGEgTWVzaCBpbnN0YW5jZSBhcyBhIEJpdG1hcE1hdGVyaWFsLCBhIHNjZW5lIGdyYXBoIG9iamVjdCB3b3VsZCBiZSBhZGRlZFxuXHQgKiB0byBpdHMgaW50ZW5kZWQgcGFyZW50LiBUaGUgZGVwZW5kZW5jeSBzaG91bGQgYmUgYSBtZW1iZXIgb2YgdGhlIGRlcGVuZGVuY2llcyBwcm9wZXJ0eS5cblx0ICovXG5cdHB1YmxpYyByZXNvbHZlKCk6dm9pZFxuXHR7XG5cdFx0aWYgKHRoaXMuX3BhcmVudFBhcnNlcilcblx0XHRcdHRoaXMuX3BhcmVudFBhcnNlci5faVJlc29sdmVEZXBlbmRlbmN5KHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlc29sdmUgYSBkZXBlbmRlbmN5IGZhaWx1cmUuIEZvciBleGFtcGxlLCBtYXAgbG9hZGluZyBmYWlsdXJlIGZyb20gYSAzZCBmaWxlXG5cdCAqL1xuXHRwdWJsaWMgcmVzb2x2ZUZhaWx1cmUoKTp2b2lkXG5cdHtcblx0XHRpZiAodGhpcy5fcGFyZW50UGFyc2VyKVxuXHRcdFx0dGhpcy5fcGFyZW50UGFyc2VyLl9pUmVzb2x2ZURlcGVuZGVuY3lGYWlsdXJlKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlc29sdmUgdGhlIGRlcGVuZGVuY2llcyBuYW1lXG5cdCAqL1xuXHRwdWJsaWMgcmVzb2x2ZU5hbWUoYXNzZXQ6SUFzc2V0KTpzdHJpbmdcblx0e1xuXHRcdGlmICh0aGlzLl9wYXJlbnRQYXJzZXIpXG5cdFx0XHRyZXR1cm4gdGhpcy5fcGFyZW50UGFyc2VyLl9pUmVzb2x2ZURlcGVuZGVuY3lOYW1lKHRoaXMsIGFzc2V0KTtcblxuXHRcdHJldHVybiBhc3NldC5uYW1lO1xuXHR9XG59XG5cbmV4cG9ydCA9IFJlc291cmNlRGVwZW5kZW5jeTsiXX0=