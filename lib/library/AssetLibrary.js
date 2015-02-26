var AssetLibraryBundle = require("awayjs-core/lib/library/AssetLibraryBundle");
var AssetLoader = require("awayjs-core/lib/library/AssetLoader");
/**
 * AssetLibrary enforces a singleton pattern and is not intended to be instanced.
 * It's purpose is to allow access to the default library bundle through a set of static shortcut methods.
 * If you are interested in creating multiple library bundles, please use the <code>getBundle()</code> method.
 */
var AssetLibrary = (function () {
    /**
     * Creates a new <code>AssetLibrary</code> object.
     *
     */
    function AssetLibrary() {
    }
    //*/
    /**
     * Returns an AssetLibrary bundle instance. If no key is given, returns the default bundle (which is
     * similar to using the AssetLibraryBundle as a singleton). To keep several separated library bundles,
     * pass a string key to this method to define which bundle should be returned. This is
     * referred to as using the AssetLibraryBundle as a multiton.
     *
     * @param key Defines which multiton instance should be returned.
     * @return An instance of the asset library
     */
    AssetLibrary.getBundle = function (key) {
        if (key === void 0) { key = 'default'; }
        return AssetLibraryBundle.getInstance(key);
    };
    /**
     *
     */
    AssetLibrary.enableParser = function (parserClass) {
        AssetLoader.enableParser(parserClass);
    };
    /**
     *
     */
    AssetLibrary.enableParsers = function (parserClasses) {
        AssetLoader.enableParsers(parserClasses);
    };
    Object.defineProperty(AssetLibrary, "conflictStrategy", {
        /**
         * Short-hand for conflictStrategy property on default asset library bundle.
         *
         * @see AssetLibraryBundle.conflictStrategy
         */
        get: function () {
            return AssetLibrary.getBundle().conflictStrategy;
        },
        set: function (val) {
            AssetLibrary.getBundle().conflictStrategy = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetLibrary, "conflictPrecedence", {
        /**
         * Short-hand for conflictPrecedence property on default asset library bundle.
         *
         * @see AssetLibraryBundle.conflictPrecedence
         */
        get: function () {
            return AssetLibrary.getBundle().conflictPrecedence;
        },
        set: function (val) {
            AssetLibrary.getBundle().conflictPrecedence = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Short-hand for createIterator() method on default asset library bundle.
     *
     * @see AssetLibraryBundle.createIterator()
     */
    AssetLibrary.createIterator = function (assetTypeFilter, namespaceFilter, filterFunc) {
        if (assetTypeFilter === void 0) { assetTypeFilter = null; }
        if (namespaceFilter === void 0) { namespaceFilter = null; }
        if (filterFunc === void 0) { filterFunc = null; }
        return AssetLibrary.getBundle().createIterator(assetTypeFilter, namespaceFilter, filterFunc);
    };
    /**
     * Short-hand for load() method on default asset library bundle.
     *
     * @see AssetLibraryBundle.load()
     */
    AssetLibrary.load = function (req, context, ns, parser) {
        if (context === void 0) { context = null; }
        if (ns === void 0) { ns = null; }
        if (parser === void 0) { parser = null; }
        return AssetLibrary.getBundle().load(req, context, ns, parser);
    };
    /**
     * Short-hand for loadData() method on default asset library bundle.
     *
     * @see AssetLibraryBundle.loadData()
     */
    AssetLibrary.loadData = function (data, context, ns, parser) {
        if (context === void 0) { context = null; }
        if (ns === void 0) { ns = null; }
        if (parser === void 0) { parser = null; }
        return AssetLibrary.getBundle().loadData(data, context, ns, parser);
    };
    AssetLibrary.stopLoad = function () {
        AssetLibrary.getBundle().stopAllLoadingSessions();
    };
    /**
     * Short-hand for getAsset() method on default asset library bundle.
     *
     * @see AssetLibraryBundle.getAsset()
     */
    AssetLibrary.getAsset = function (name, ns) {
        if (ns === void 0) { ns = null; }
        return AssetLibrary.getBundle().getAsset(name, ns);
    };
    /**
     * Short-hand for addEventListener() method on default asset library bundle.
     */
    AssetLibrary.addEventListener = function (type, listener) {
        AssetLibrary.getBundle().addEventListener(type, listener);
    };
    /**
     * Short-hand for removeEventListener() method on default asset library bundle.
     */
    AssetLibrary.removeEventListener = function (type, listener) {
        AssetLibrary.getBundle().removeEventListener(type, listener);
    };
    /**
     * Short-hand for hasEventListener() method on default asset library bundle.

     public static hasEventListener(type:string):boolean
     {
        return AssetLibrary.getBundle().hasEventListener(type);
    }

     public static willTrigger(type:string):boolean
     {
        return getBundle().willTrigger(type);
    }
     */
    /**
     * Short-hand for addAsset() method on default asset library bundle.
     *
     * @see AssetLibraryBundle.addAsset()
     */
    AssetLibrary.addAsset = function (asset) {
        AssetLibrary.getBundle().addAsset(asset);
    };
    /**
     * Short-hand for removeAsset() method on default asset library bundle.
     *
     * @param asset The asset which should be removed from the library.
     * @param dispose Defines whether the assets should also be disposed.
     *
     * @see AssetLibraryBundle.removeAsset()
     */
    AssetLibrary.removeAsset = function (asset, dispose) {
        if (dispose === void 0) { dispose = true; }
        AssetLibrary.getBundle().removeAsset(asset, dispose);
    };
    /**
     * Short-hand for removeAssetByName() method on default asset library bundle.
     *
     * @param name The name of the asset to be removed.
     * @param ns The namespace to which the desired asset belongs.
     * @param dispose Defines whether the assets should also be disposed.
     *
     * @see AssetLibraryBundle.removeAssetByName()
     */
    AssetLibrary.removeAssetByName = function (name, ns, dispose) {
        if (ns === void 0) { ns = null; }
        if (dispose === void 0) { dispose = true; }
        return AssetLibrary.getBundle().removeAssetByName(name, ns, dispose);
    };
    /**
     * Short-hand for removeAllAssets() method on default asset library bundle.
     *
     * @param dispose Defines whether the assets should also be disposed.
     *
     * @see AssetLibraryBundle.removeAllAssets()
     */
    AssetLibrary.removeAllAssets = function (dispose) {
        if (dispose === void 0) { dispose = true; }
        AssetLibrary.getBundle().removeAllAssets(dispose);
    };
    /**
     * Short-hand for removeNamespaceAssets() method on default asset library bundle.
     *
     * @see AssetLibraryBundle.removeNamespaceAssets()
     */
    AssetLibrary.removeNamespaceAssets = function (ns, dispose) {
        if (ns === void 0) { ns = null; }
        if (dispose === void 0) { dispose = true; }
        AssetLibrary.getBundle().removeNamespaceAssets(ns, dispose);
    };
    return AssetLibrary;
})();
module.exports = AssetLibrary;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeS50cyJdLCJuYW1lcyI6WyJBc3NldExpYnJhcnkiLCJBc3NldExpYnJhcnkuY29uc3RydWN0b3IiLCJBc3NldExpYnJhcnkuZ2V0QnVuZGxlIiwiQXNzZXRMaWJyYXJ5LmVuYWJsZVBhcnNlciIsIkFzc2V0TGlicmFyeS5lbmFibGVQYXJzZXJzIiwiQXNzZXRMaWJyYXJ5LmNvbmZsaWN0U3RyYXRlZ3kiLCJBc3NldExpYnJhcnkuY29uZmxpY3RQcmVjZWRlbmNlIiwiQXNzZXRMaWJyYXJ5LmNyZWF0ZUl0ZXJhdG9yIiwiQXNzZXRMaWJyYXJ5LmxvYWQiLCJBc3NldExpYnJhcnkubG9hZERhdGEiLCJBc3NldExpYnJhcnkuc3RvcExvYWQiLCJBc3NldExpYnJhcnkuZ2V0QXNzZXQiLCJBc3NldExpYnJhcnkuYWRkRXZlbnRMaXN0ZW5lciIsIkFzc2V0TGlicmFyeS5yZW1vdmVFdmVudExpc3RlbmVyIiwiQXNzZXRMaWJyYXJ5LmFkZEFzc2V0IiwiQXNzZXRMaWJyYXJ5LnJlbW92ZUFzc2V0IiwiQXNzZXRMaWJyYXJ5LnJlbW92ZUFzc2V0QnlOYW1lIiwiQXNzZXRMaWJyYXJ5LnJlbW92ZUFsbEFzc2V0cyIsIkFzc2V0TGlicmFyeS5yZW1vdmVOYW1lc3BhY2VBc3NldHMiXSwibWFwcGluZ3MiOiJBQUNBLElBQU8sa0JBQWtCLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUVuRixJQUFPLFdBQVcsV0FBYyxxQ0FBcUMsQ0FBQyxDQUFDO0FBT3ZFLEFBS0E7Ozs7R0FERztJQUNHLFlBQVk7SUFFakJBOzs7T0FHR0E7SUFDSEEsU0FOS0EsWUFBWUE7SUFRakJDLENBQUNBO0lBRURELElBQUlBO0lBQ0pBOzs7Ozs7OztPQVFHQTtJQUNXQSxzQkFBU0EsR0FBdkJBLFVBQXdCQSxHQUFzQkE7UUFBdEJFLG1CQUFzQkEsR0FBdEJBLGVBQXNCQTtRQUU3Q0EsTUFBTUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxX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aUJBLENBQUNBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLE9BQU9BLENBQUNBLENBQUNBO0lBQ3RFQSxDQUFDQTtJQUVEaEI7Ozs7OztPQU1HQTtJQUNXQSw0QkFBZUEsR0FBN0JBLFVBQThCQSxPQUFzQkE7UUFBdEJpQix1QkFBc0JBLEdBQXRCQSxjQUFzQkE7UUFFbkRBLFlBQVlBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLGVBQWVBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQ25EQSxDQUFDQTtJQUVEakI7Ozs7T0FJR0E7SUFDV0Esa0NBQXFCQSxHQUFuQ0EsVUFBb0NBLEVBQWdCQSxFQUFFQSxPQUFzQkE7UUFBeENrQixrQkFBZ0JBLEdBQWhCQSxTQUFnQkE7UUFBRUEsdUJBQXNCQSxHQUF0QkEsY0FBc0JBO1FBRTNFQSxZQUFZQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxxQkFBcUJBLENBQUNBLEVBQUVBLEVBQUVBLE9BQU9BLENBQUNBLENBQUNBO0lBQzdEQSxDQUFDQTtJQUNGbEIsbUJBQUNBO0FBQURBLENBNU1BLEFBNE1DQSxJQUFBO0FBRUQsQUFBc0IsaUJBQWIsWUFBWSxDQUFDIiwiZmlsZSI6ImxpYnJhcnkvQXNzZXRMaWJyYXJ5LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVUkxSZXF1ZXN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbmV0L1VSTFJlcXVlc3RcIik7XG5pbXBvcnQgQXNzZXRMaWJyYXJ5QnVuZGxlXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeUJ1bmRsZVwiKTtcbmltcG9ydCBBc3NldExpYnJhcnlJdGVyYXRvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldExpYnJhcnlJdGVyYXRvclwiKTtcbmltcG9ydCBBc3NldExvYWRlclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMb2FkZXJcIik7XG5pbXBvcnQgQXNzZXRMb2FkZXJDb250ZXh0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TG9hZGVyQ29udGV4dFwiKTtcbmltcG9ydCBBc3NldExvYWRlclRva2VuXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMb2FkZXJUb2tlblwiKTtcbmltcG9ydCBDb25mbGljdFN0cmF0ZWd5QmFzZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Db25mbGljdFN0cmF0ZWd5QmFzZVwiKTtcbmltcG9ydCBJQXNzZXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IFBhcnNlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlckJhc2VcIik7XG5cbi8qKlxuICogQXNzZXRMaWJyYXJ5IGVuZm9yY2VzIGEgc2luZ2xldG9uIHBhdHRlcm4gYW5kIGlzIG5vdCBpbnRlbmRlZCB0byBiZSBpbnN0YW5jZWQuXG4gKiBJdCdzIHB1cnBvc2UgaXMgdG8gYWxsb3cgYWNjZXNzIHRvIHRoZSBkZWZhdWx0IGxpYnJhcnkgYnVuZGxlIHRocm91Z2ggYSBzZXQgb2Ygc3RhdGljIHNob3J0Y3V0IG1ldGhvZHMuXG4gKiBJZiB5b3UgYXJlIGludGVyZXN0ZWQgaW4gY3JlYXRpbmcgbXVsdGlwbGUgbGlicmFyeSBidW5kbGVzLCBwbGVhc2UgdXNlIHRoZSA8Y29kZT5nZXRCdW5kbGUoKTwvY29kZT4gbWV0aG9kLlxuICovXG5jbGFzcyBBc3NldExpYnJhcnlcbntcblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgPGNvZGU+QXNzZXRMaWJyYXJ5PC9jb2RlPiBvYmplY3QuXG5cdCAqXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0fVxuXG5cdC8vKi9cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gQXNzZXRMaWJyYXJ5IGJ1bmRsZSBpbnN0YW5jZS4gSWYgbm8ga2V5IGlzIGdpdmVuLCByZXR1cm5zIHRoZSBkZWZhdWx0IGJ1bmRsZSAod2hpY2ggaXNcblx0ICogc2ltaWxhciB0byB1c2luZyB0aGUgQXNzZXRMaWJyYXJ5QnVuZGxlIGFzIGEgc2luZ2xldG9uKS4gVG8ga2VlcCBzZXZlcmFsIHNlcGFyYXRlZCBsaWJyYXJ5IGJ1bmRsZXMsXG5cdCAqIHBhc3MgYSBzdHJpbmcga2V5IHRvIHRoaXMgbWV0aG9kIHRvIGRlZmluZSB3aGljaCBidW5kbGUgc2hvdWxkIGJlIHJldHVybmVkLiBUaGlzIGlzXG5cdCAqIHJlZmVycmVkIHRvIGFzIHVzaW5nIHRoZSBBc3NldExpYnJhcnlCdW5kbGUgYXMgYSBtdWx0aXRvbi5cblx0ICpcblx0ICogQHBhcmFtIGtleSBEZWZpbmVzIHdoaWNoIG11bHRpdG9uIGluc3RhbmNlIHNob3VsZCBiZSByZXR1cm5lZC5cblx0ICogQHJldHVybiBBbiBpbnN0YW5jZSBvZiB0aGUgYXNzZXQgbGlicmFyeVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBnZXRCdW5kbGUoa2V5OnN0cmluZyA9ICdkZWZhdWx0Jyk6QXNzZXRMaWJyYXJ5QnVuZGxlXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5QnVuZGxlLmdldEluc3RhbmNlKGtleSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgZW5hYmxlUGFyc2VyKHBhcnNlckNsYXNzKVxuXHR7XG5cdFx0QXNzZXRMb2FkZXIuZW5hYmxlUGFyc2VyKHBhcnNlckNsYXNzKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBlbmFibGVQYXJzZXJzKHBhcnNlckNsYXNzZXM6QXJyYXk8T2JqZWN0Pilcblx0e1xuXHRcdEFzc2V0TG9hZGVyLmVuYWJsZVBhcnNlcnMocGFyc2VyQ2xhc3Nlcyk7XG5cdH1cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgY29uZmxpY3RTdHJhdGVneSBwcm9wZXJ0eSBvbiBkZWZhdWx0IGFzc2V0IGxpYnJhcnkgYnVuZGxlLlxuXHQgKlxuXHQgKiBAc2VlIEFzc2V0TGlicmFyeUJ1bmRsZS5jb25mbGljdFN0cmF0ZWd5XG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIGdldCBjb25mbGljdFN0cmF0ZWd5KCk6Q29uZmxpY3RTdHJhdGVneUJhc2Vcblx0e1xuXHRcdHJldHVybiBBc3NldExpYnJhcnkuZ2V0QnVuZGxlKCkuY29uZmxpY3RTdHJhdGVneTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgc2V0IGNvbmZsaWN0U3RyYXRlZ3kodmFsOkNvbmZsaWN0U3RyYXRlZ3lCYXNlKVxuXHR7XG5cdFx0QXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmNvbmZsaWN0U3RyYXRlZ3kgPSB2YWw7XG5cdH1cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgY29uZmxpY3RQcmVjZWRlbmNlIHByb3BlcnR5IG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXG5cdCAqXG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5QnVuZGxlLmNvbmZsaWN0UHJlY2VkZW5jZVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBnZXQgY29uZmxpY3RQcmVjZWRlbmNlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmNvbmZsaWN0UHJlY2VkZW5jZTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgc2V0IGNvbmZsaWN0UHJlY2VkZW5jZSh2YWw6c3RyaW5nKVxuXHR7XG5cdFx0QXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmNvbmZsaWN0UHJlY2VkZW5jZSA9IHZhbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaG9ydC1oYW5kIGZvciBjcmVhdGVJdGVyYXRvcigpIG1ldGhvZCBvbiBkZWZhdWx0IGFzc2V0IGxpYnJhcnkgYnVuZGxlLlxuXHQgKlxuXHQgKiBAc2VlIEFzc2V0TGlicmFyeUJ1bmRsZS5jcmVhdGVJdGVyYXRvcigpXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIGNyZWF0ZUl0ZXJhdG9yKGFzc2V0VHlwZUZpbHRlcjpzdHJpbmcgPSBudWxsLCBuYW1lc3BhY2VGaWx0ZXI6c3RyaW5nID0gbnVsbCwgZmlsdGVyRnVuYyA9IG51bGwpOkFzc2V0TGlicmFyeUl0ZXJhdG9yXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmNyZWF0ZUl0ZXJhdG9yKGFzc2V0VHlwZUZpbHRlciwgbmFtZXNwYWNlRmlsdGVyLCBmaWx0ZXJGdW5jKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaG9ydC1oYW5kIGZvciBsb2FkKCkgbWV0aG9kIG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXG5cdCAqXG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5QnVuZGxlLmxvYWQoKVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBsb2FkKHJlcTpVUkxSZXF1ZXN0LCBjb250ZXh0OkFzc2V0TG9hZGVyQ29udGV4dCA9IG51bGwsIG5zOnN0cmluZyA9IG51bGwsIHBhcnNlcjpQYXJzZXJCYXNlID0gbnVsbCk6QXNzZXRMb2FkZXJUb2tlblxuXHR7XG5cdFx0cmV0dXJuIEFzc2V0TGlicmFyeS5nZXRCdW5kbGUoKS5sb2FkKHJlcSwgY29udGV4dCwgbnMsIHBhcnNlcik7XG5cdH1cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgbG9hZERhdGEoKSBtZXRob2Qgb24gZGVmYXVsdCBhc3NldCBsaWJyYXJ5IGJ1bmRsZS5cblx0ICpcblx0ICogQHNlZSBBc3NldExpYnJhcnlCdW5kbGUubG9hZERhdGEoKVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBsb2FkRGF0YShkYXRhOmFueSwgY29udGV4dDpBc3NldExvYWRlckNvbnRleHQgPSBudWxsLCBuczpzdHJpbmcgPSBudWxsLCBwYXJzZXI6UGFyc2VyQmFzZSA9IG51bGwpOkFzc2V0TG9hZGVyVG9rZW5cblx0e1xuXHRcdHJldHVybiBBc3NldExpYnJhcnkuZ2V0QnVuZGxlKCkubG9hZERhdGEoZGF0YSwgY29udGV4dCwgbnMsIHBhcnNlcik7XG5cdH1cblxuXHRwdWJsaWMgc3RhdGljIHN0b3BMb2FkKClcblx0e1xuXHRcdEFzc2V0TGlicmFyeS5nZXRCdW5kbGUoKS5zdG9wQWxsTG9hZGluZ1Nlc3Npb25zKCk7XG5cdH1cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgZ2V0QXNzZXQoKSBtZXRob2Qgb24gZGVmYXVsdCBhc3NldCBsaWJyYXJ5IGJ1bmRsZS5cblx0ICpcblx0ICogQHNlZSBBc3NldExpYnJhcnlCdW5kbGUuZ2V0QXNzZXQoKVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBnZXRBc3NldChuYW1lOnN0cmluZywgbnM6c3RyaW5nID0gbnVsbCk6SUFzc2V0XG5cdHtcblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmdldEFzc2V0KG5hbWUsIG5zKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaG9ydC1oYW5kIGZvciBhZGRFdmVudExpc3RlbmVyKCkgbWV0aG9kIG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTpzdHJpbmcsIGxpc3RlbmVyOkZ1bmN0aW9uKVxuXHR7XG5cdFx0QXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNob3J0LWhhbmQgZm9yIHJlbW92ZUV2ZW50TGlzdGVuZXIoKSBtZXRob2Qgb24gZGVmYXVsdCBhc3NldCBsaWJyYXJ5IGJ1bmRsZS5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlOnN0cmluZywgbGlzdGVuZXI6RnVuY3Rpb24pXG5cdHtcblx0XHRBc3NldExpYnJhcnkuZ2V0QnVuZGxlKCkucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG5cdH1cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgaGFzRXZlbnRMaXN0ZW5lcigpIG1ldGhvZCBvbiBkZWZhdWx0IGFzc2V0IGxpYnJhcnkgYnVuZGxlLlxuXG5cdCBwdWJsaWMgc3RhdGljIGhhc0V2ZW50TGlzdGVuZXIodHlwZTpzdHJpbmcpOmJvb2xlYW5cblx0IHtcblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmhhc0V2ZW50TGlzdGVuZXIodHlwZSk7XG5cdH1cblxuXHQgcHVibGljIHN0YXRpYyB3aWxsVHJpZ2dlcih0eXBlOnN0cmluZyk6Ym9vbGVhblxuXHQge1xuXHRcdHJldHVybiBnZXRCdW5kbGUoKS53aWxsVHJpZ2dlcih0eXBlKTtcblx0fVxuXHQgKi9cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgYWRkQXNzZXQoKSBtZXRob2Qgb24gZGVmYXVsdCBhc3NldCBsaWJyYXJ5IGJ1bmRsZS5cblx0ICpcblx0ICogQHNlZSBBc3NldExpYnJhcnlCdW5kbGUuYWRkQXNzZXQoKVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBhZGRBc3NldChhc3NldDpJQXNzZXQpXG5cdHtcblx0XHRBc3NldExpYnJhcnkuZ2V0QnVuZGxlKCkuYWRkQXNzZXQoYXNzZXQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNob3J0LWhhbmQgZm9yIHJlbW92ZUFzc2V0KCkgbWV0aG9kIG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSBhc3NldCBUaGUgYXNzZXQgd2hpY2ggc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGlicmFyeS5cblx0ICogQHBhcmFtIGRpc3Bvc2UgRGVmaW5lcyB3aGV0aGVyIHRoZSBhc3NldHMgc2hvdWxkIGFsc28gYmUgZGlzcG9zZWQuXG5cdCAqXG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5QnVuZGxlLnJlbW92ZUFzc2V0KClcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVtb3ZlQXNzZXQoYXNzZXQ6SUFzc2V0LCBkaXNwb3NlOmJvb2xlYW4gPSB0cnVlKVxuXHR7XG5cdFx0QXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLnJlbW92ZUFzc2V0KGFzc2V0LCBkaXNwb3NlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaG9ydC1oYW5kIGZvciByZW1vdmVBc3NldEJ5TmFtZSgpIG1ldGhvZCBvbiBkZWZhdWx0IGFzc2V0IGxpYnJhcnkgYnVuZGxlLlxuXHQgKlxuXHQgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYXNzZXQgdG8gYmUgcmVtb3ZlZC5cblx0ICogQHBhcmFtIG5zIFRoZSBuYW1lc3BhY2UgdG8gd2hpY2ggdGhlIGRlc2lyZWQgYXNzZXQgYmVsb25ncy5cblx0ICogQHBhcmFtIGRpc3Bvc2UgRGVmaW5lcyB3aGV0aGVyIHRoZSBhc3NldHMgc2hvdWxkIGFsc28gYmUgZGlzcG9zZWQuXG5cdCAqXG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5QnVuZGxlLnJlbW92ZUFzc2V0QnlOYW1lKClcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVtb3ZlQXNzZXRCeU5hbWUobmFtZTpzdHJpbmcsIG5zOnN0cmluZyA9IG51bGwsIGRpc3Bvc2U6Ym9vbGVhbiA9IHRydWUpOklBc3NldFxuXHR7XG5cdFx0cmV0dXJuIEFzc2V0TGlicmFyeS5nZXRCdW5kbGUoKS5yZW1vdmVBc3NldEJ5TmFtZShuYW1lLCBucywgZGlzcG9zZSk7XG5cdH1cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgcmVtb3ZlQWxsQXNzZXRzKCkgbWV0aG9kIG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSBkaXNwb3NlIERlZmluZXMgd2hldGhlciB0aGUgYXNzZXRzIHNob3VsZCBhbHNvIGJlIGRpc3Bvc2VkLlxuXHQgKlxuXHQgKiBAc2VlIEFzc2V0TGlicmFyeUJ1bmRsZS5yZW1vdmVBbGxBc3NldHMoKVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyByZW1vdmVBbGxBc3NldHMoZGlzcG9zZTpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdEFzc2V0TGlicmFyeS5nZXRCdW5kbGUoKS5yZW1vdmVBbGxBc3NldHMoZGlzcG9zZSk7XG5cdH1cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgcmVtb3ZlTmFtZXNwYWNlQXNzZXRzKCkgbWV0aG9kIG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXG5cdCAqXG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5QnVuZGxlLnJlbW92ZU5hbWVzcGFjZUFzc2V0cygpXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIHJlbW92ZU5hbWVzcGFjZUFzc2V0cyhuczpzdHJpbmcgPSBudWxsLCBkaXNwb3NlOmJvb2xlYW4gPSB0cnVlKVxuXHR7XG5cdFx0QXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLnJlbW92ZU5hbWVzcGFjZUFzc2V0cyhucywgZGlzcG9zZSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gQXNzZXRMaWJyYXJ5OyJdfQ==