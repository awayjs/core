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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1Jlc291cmNlRGVwZW5kZW5jeS50cyJdLCJuYW1lcyI6WyJSZXNvdXJjZURlcGVuZGVuY3kiLCJSZXNvdXJjZURlcGVuZGVuY3kuY29uc3RydWN0b3IiLCJSZXNvdXJjZURlcGVuZGVuY3kuaWQiLCJSZXNvdXJjZURlcGVuZGVuY3kucmVxdWVzdCIsIlJlc291cmNlRGVwZW5kZW5jeS5kYXRhIiwiUmVzb3VyY2VEZXBlbmRlbmN5LnBhcnNlciIsIlJlc291cmNlRGVwZW5kZW5jeS5wYXJlbnRQYXJzZXIiLCJSZXNvdXJjZURlcGVuZGVuY3kucmV0cmlldmVBc1Jhd0RhdGEiLCJSZXNvdXJjZURlcGVuZGVuY3kuc3VwcHJlc0Fzc2V0RXZlbnRzIiwiUmVzb3VyY2VEZXBlbmRlbmN5LmFzc2V0cyIsIlJlc291cmNlRGVwZW5kZW5jeS5kZXBlbmRlbmNpZXMiLCJSZXNvdXJjZURlcGVuZGVuY3kuX2lTZXREYXRhIiwiUmVzb3VyY2VEZXBlbmRlbmN5Ll9pU2V0UGFyc2VyIiwiUmVzb3VyY2VEZXBlbmRlbmN5LnJlc29sdmUiLCJSZXNvdXJjZURlcGVuZGVuY3kucmVzb2x2ZUZhaWx1cmUiLCJSZXNvdXJjZURlcGVuZGVuY3kucmVzb2x2ZU5hbWUiXSwibWFwcGluZ3MiOiJBQUtBLEFBS0E7Ozs7R0FERztJQUNHLGtCQUFrQjtJQWdCdkJBLFNBaEJLQSxrQkFBa0JBLENBZ0JYQSxFQUFTQSxFQUFFQSxPQUFrQkEsRUFBRUEsSUFBUUEsRUFBRUEsTUFBaUJBLEVBQUVBLFlBQXVCQSxFQUFFQSxpQkFBaUNBLEVBQUVBLG1CQUFtQ0E7UUFBdEVDLGlDQUFpQ0EsR0FBakNBLHlCQUFpQ0E7UUFBRUEsbUNBQW1DQSxHQUFuQ0EsMkJBQW1DQTtRQUV0S0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDZEEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsT0FBT0EsQ0FBQ0E7UUFDeEJBLElBQUlBLENBQUNB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LHdDQUFXQSxHQUFsQkEsVUFBbUJBLEtBQVlBO1FBRTlCZSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtZQUN0QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxJQUFJQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUVoRUEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7SUFDbkJBLENBQUNBO0lBQ0ZmLHlCQUFDQTtBQUFEQSxDQXRKQSxBQXNKQ0EsSUFBQTtBQUVELEFBQTRCLGlCQUFuQixrQkFBa0IsQ0FBQyIsImZpbGUiOiJwYXJzZXJzL1Jlc291cmNlRGVwZW5kZW5jeS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyLvu79pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcclxuaW1wb3J0IFVSTExvYWRlclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxMb2FkZXJcIik7XHJcbmltcG9ydCBVUkxSZXF1ZXN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbmV0L1VSTFJlcXVlc3RcIik7XHJcbmltcG9ydCBQYXJzZXJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcGFyc2Vycy9QYXJzZXJCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIFJlc291cmNlRGVwZW5kZW5jeSByZXByZXNlbnRzIHRoZSBkYXRhIHJlcXVpcmVkIHRvIGxvYWQsIHBhcnNlIGFuZCByZXNvbHZlIGFkZGl0aW9uYWwgZmlsZXMgKFwiZGVwZW5kZW5jaWVzXCIpXHJcbiAqIHJlcXVpcmVkIGJ5IGEgcGFyc2VyLCB1c2VkIGJ5IFJlc291cmNlTG9hZFNlc3Npb24uXHJcbiAqXHJcbiAqL1xyXG5jbGFzcyBSZXNvdXJjZURlcGVuZGVuY3lcclxue1xyXG5cdHByaXZhdGUgX2lkOnN0cmluZztcclxuXHRwcml2YXRlIF9yZXF1ZXN0OlVSTFJlcXVlc3Q7XHJcblx0cHJpdmF0ZSBfYXNzZXRzOkFycmF5PElBc3NldD47XHJcblx0cHJpdmF0ZSBfcGFyc2VyOlBhcnNlckJhc2U7XHJcblx0cHJpdmF0ZSBfcGFyZW50UGFyc2VyOlBhcnNlckJhc2U7XHJcblx0cHJpdmF0ZSBfZGF0YTphbnk7XHJcblx0cHJpdmF0ZSBfcmV0cmlldmVBc1Jhd0RhdGE6Ym9vbGVhbjtcclxuXHRwcml2YXRlIF9zdXBwcmVzc0Fzc2V0RXZlbnRzOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfZGVwZW5kZW5jaWVzOkFycmF5PFJlc291cmNlRGVwZW5kZW5jeT47XHJcblxyXG5cdHB1YmxpYyBfaUxvYWRlcjpVUkxMb2FkZXI7XHJcblx0cHVibGljIF9pU3VjY2Vzczpib29sZWFuO1xyXG5cclxuXHJcblx0Y29uc3RydWN0b3IoaWQ6c3RyaW5nLCByZXF1ZXN0OlVSTFJlcXVlc3QsIGRhdGE6YW55LCBwYXJzZXI6UGFyc2VyQmFzZSwgcGFyZW50UGFyc2VyOlBhcnNlckJhc2UsIHJldHJpZXZlQXNSYXdEYXRhOmJvb2xlYW4gPSBmYWxzZSwgc3VwcHJlc3NBc3NldEV2ZW50czpib29sZWFuID0gZmFsc2UpXHJcblx0e1xyXG5cdFx0dGhpcy5faWQgPSBpZDtcclxuXHRcdHRoaXMuX3JlcXVlc3QgPSByZXF1ZXN0O1xyXG5cdFx0dGhpcy5fZGF0YSA9IGRhdGE7XHJcblx0XHR0aGlzLl9wYXJzZXIgPSBwYXJzZXI7XHJcblx0XHR0aGlzLl9wYXJlbnRQYXJzZXIgPSBwYXJlbnRQYXJzZXI7XHJcblx0XHR0aGlzLl9yZXRyaWV2ZUFzUmF3RGF0YSA9IHJldHJpZXZlQXNSYXdEYXRhO1xyXG5cdFx0dGhpcy5fc3VwcHJlc3NBc3NldEV2ZW50cyA9IHN1cHByZXNzQXNzZXRFdmVudHM7XHJcblxyXG5cdFx0dGhpcy5fYXNzZXRzID0gbmV3IEFycmF5PElBc3NldD4oKTtcclxuXHRcdHRoaXMuX2RlcGVuZGVuY2llcyA9IG5ldyBBcnJheTxSZXNvdXJjZURlcGVuZGVuY3k+KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaWQoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5faWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcmVxdWVzdCgpOlVSTFJlcXVlc3RcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVxdWVzdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBkYXRhIGNvbnRhaW5pbmcgdGhlIGRlcGVuZGVuY3kgdG8gYmUgcGFyc2VkLCBpZiB0aGUgcmVzb3VyY2Ugd2FzIGFscmVhZHkgbG9hZGVkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgZGF0YSgpOmFueVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9kYXRhO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHBhcnNlcigpOlBhcnNlckJhc2VcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcGFyc2VyO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHBhcnNlciB3aGljaCBpcyBkZXBlbmRlbnQgb24gdGhpcyBSZXNvdXJjZURlcGVuZGVuY3kgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcGFyZW50UGFyc2VyKCk6UGFyc2VyQmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wYXJlbnRQYXJzZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcmV0cmlldmVBc1Jhd0RhdGEoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JldHJpZXZlQXNSYXdEYXRhO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHN1cHByZXNBc3NldEV2ZW50cygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3VwcHJlc3NBc3NldEV2ZW50cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhc3NldHMoKTpBcnJheTxJQXNzZXQ+XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2Fzc2V0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBkZXBlbmRlbmNpZXMoKTpBcnJheTxSZXNvdXJjZURlcGVuZGVuY3k+XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2RlcGVuZGVuY2llcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogTWV0aG9kIHRvIHNldCBkYXRhIGFmdGVyIGhhdmluZyBhbHJlYWR5IGNyZWF0ZWQgdGhlIGRlcGVuZGVuY3kgb2JqZWN0LCBlLmcuIGFmdGVyIGxvYWQuXHJcblx0ICovXHJcblx0cHVibGljIF9pU2V0RGF0YShkYXRhOmFueSk6dm9pZFxyXG5cdHtcclxuXHRcdHRoaXMuX2RhdGEgPSBkYXRhO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaVNldFBhcnNlcihwYXJzZXI6UGFyc2VyQmFzZSk6dm9pZFxyXG5cdHtcclxuXHRcdHRoaXMuX3BhcnNlciA9IHBhcnNlcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc29sdmUgdGhlIGRlcGVuZGVuY3kgd2hlbiBpdCdzIGxvYWRlZCB3aXRoIHRoZSBwYXJlbnQgcGFyc2VyLiBGb3IgZXhhbXBsZSwgYSBkZXBlbmRlbmN5IGNvbnRhaW5pbmcgYW5cclxuXHQgKiBJbWFnZVJlc291cmNlIHdvdWxkIGJlIGFzc2lnbmVkIHRvIGEgTWVzaCBpbnN0YW5jZSBhcyBhIEJpdG1hcE1hdGVyaWFsLCBhIHNjZW5lIGdyYXBoIG9iamVjdCB3b3VsZCBiZSBhZGRlZFxyXG5cdCAqIHRvIGl0cyBpbnRlbmRlZCBwYXJlbnQuIFRoZSBkZXBlbmRlbmN5IHNob3VsZCBiZSBhIG1lbWJlciBvZiB0aGUgZGVwZW5kZW5jaWVzIHByb3BlcnR5LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZXNvbHZlKCk6dm9pZFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wYXJlbnRQYXJzZXIpXHJcblx0XHRcdHRoaXMuX3BhcmVudFBhcnNlci5faVJlc29sdmVEZXBlbmRlbmN5KHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzb2x2ZSBhIGRlcGVuZGVuY3kgZmFpbHVyZS4gRm9yIGV4YW1wbGUsIG1hcCBsb2FkaW5nIGZhaWx1cmUgZnJvbSBhIDNkIGZpbGVcclxuXHQgKi9cclxuXHRwdWJsaWMgcmVzb2x2ZUZhaWx1cmUoKTp2b2lkXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BhcmVudFBhcnNlcilcclxuXHRcdFx0dGhpcy5fcGFyZW50UGFyc2VyLl9pUmVzb2x2ZURlcGVuZGVuY3lGYWlsdXJlKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzb2x2ZSB0aGUgZGVwZW5kZW5jaWVzIG5hbWVcclxuXHQgKi9cclxuXHRwdWJsaWMgcmVzb2x2ZU5hbWUoYXNzZXQ6SUFzc2V0KTpzdHJpbmdcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcGFyZW50UGFyc2VyKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5fcGFyZW50UGFyc2VyLl9pUmVzb2x2ZURlcGVuZGVuY3lOYW1lKHRoaXMsIGFzc2V0KTtcclxuXHJcblx0XHRyZXR1cm4gYXNzZXQubmFtZTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFJlc291cmNlRGVwZW5kZW5jeTsiXX0=