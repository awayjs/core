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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeS50cyJdLCJuYW1lcyI6WyJBc3NldExpYnJhcnkiLCJBc3NldExpYnJhcnkuY29uc3RydWN0b3IiLCJBc3NldExpYnJhcnkuZ2V0QnVuZGxlIiwiQXNzZXRMaWJyYXJ5LmVuYWJsZVBhcnNlciIsIkFzc2V0TGlicmFyeS5lbmFibGVQYXJzZXJzIiwiQXNzZXRMaWJyYXJ5LmNvbmZsaWN0U3RyYXRlZ3kiLCJBc3NldExpYnJhcnkuY29uZmxpY3RQcmVjZWRlbmNlIiwiQXNzZXRMaWJyYXJ5LmNyZWF0ZUl0ZXJhdG9yIiwiQXNzZXRMaWJyYXJ5LmxvYWQiLCJBc3NldExpYnJhcnkubG9hZERhdGEiLCJBc3NldExpYnJhcnkuc3RvcExvYWQiLCJBc3NldExpYnJhcnkuZ2V0QXNzZXQiLCJBc3NldExpYnJhcnkuYWRkRXZlbnRMaXN0ZW5lciIsIkFzc2V0TGlicmFyeS5yZW1vdmVFdmVudExpc3RlbmVyIiwiQXNzZXRMaWJyYXJ5LmFkZEFzc2V0IiwiQXNzZXRMaWJyYXJ5LnJlbW92ZUFzc2V0IiwiQXNzZXRMaWJyYXJ5LnJlbW92ZUFzc2V0QnlOYW1lIiwiQXNzZXRMaWJyYXJ5LnJlbW92ZUFsbEFzc2V0cyIsIkFzc2V0TGlicmFyeS5yZW1vdmVOYW1lc3BhY2VBc3NldHMiXSwibWFwcGluZ3MiOiJBQUNBLElBQU8sa0JBQWtCLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUVuRixJQUFPLFdBQVcsV0FBYyxxQ0FBcUMsQ0FBQyxDQUFDO0FBT3ZFLEFBS0E7Ozs7R0FERztJQUNHLFlBQVk7SUFFakJBOzs7T0FHR0E7SUFDSEEsU0FOS0EsWUFBWUE7SUFRakJDLENBQUNBO0lBRURELElBQUlBO0lBQ0pBOzs7Ozs7OztPQVFHQTtJQUNXQSxzQkFBU0EsR0FBdkJBLFVBQXdCQSxHQUFzQkE7UUFBdEJFLG1CQUFzQkEsR0FBdEJBLGVBQXNCQTtRQUU3Q0EsTUFBTUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxX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aUJBLENBQUNBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLE9BQU9BLENBQUNBLENBQUNBO0lBQ3RFQSxDQUFDQTtJQUVEaEI7Ozs7OztPQU1HQTtJQUNXQSw0QkFBZUEsR0FBN0JBLFVBQThCQSxPQUFzQkE7UUFBdEJpQix1QkFBc0JBLEdBQXRCQSxjQUFzQkE7UUFFbkRBLFlBQVlBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLGVBQWVBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQ25EQSxDQUFDQTtJQUVEakI7Ozs7T0FJR0E7SUFDV0Esa0NBQXFCQSxHQUFuQ0EsVUFBb0NBLEVBQWdCQSxFQUFFQSxPQUFzQkE7UUFBeENrQixrQkFBZ0JBLEdBQWhCQSxTQUFnQkE7UUFBRUEsdUJBQXNCQSxHQUF0QkEsY0FBc0JBO1FBRTNFQSxZQUFZQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxxQkFBcUJBLENBQUNBLEVBQUVBLEVBQUVBLE9BQU9BLENBQUNBLENBQUNBO0lBQzdEQSxDQUFDQTtJQUNGbEIsbUJBQUNBO0FBQURBLENBNU1BLEFBNE1DQSxJQUFBO0FBRUQsQUFBc0IsaUJBQWIsWUFBWSxDQUFDIiwiZmlsZSI6ImxpYnJhcnkvQXNzZXRMaWJyYXJ5LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVUkxSZXF1ZXN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbmV0L1VSTFJlcXVlc3RcIik7XHJcbmltcG9ydCBBc3NldExpYnJhcnlCdW5kbGVcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMaWJyYXJ5QnVuZGxlXCIpO1xyXG5pbXBvcnQgQXNzZXRMaWJyYXJ5SXRlcmF0b3JcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMaWJyYXJ5SXRlcmF0b3JcIik7XHJcbmltcG9ydCBBc3NldExvYWRlclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMb2FkZXJcIik7XHJcbmltcG9ydCBBc3NldExvYWRlckNvbnRleHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMb2FkZXJDb250ZXh0XCIpO1xyXG5pbXBvcnQgQXNzZXRMb2FkZXJUb2tlblx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TG9hZGVyVG9rZW5cIik7XHJcbmltcG9ydCBDb25mbGljdFN0cmF0ZWd5QmFzZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Db25mbGljdFN0cmF0ZWd5QmFzZVwiKTtcclxuaW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XHJcbmltcG9ydCBQYXJzZXJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcGFyc2Vycy9QYXJzZXJCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIEFzc2V0TGlicmFyeSBlbmZvcmNlcyBhIHNpbmdsZXRvbiBwYXR0ZXJuIGFuZCBpcyBub3QgaW50ZW5kZWQgdG8gYmUgaW5zdGFuY2VkLlxyXG4gKiBJdCdzIHB1cnBvc2UgaXMgdG8gYWxsb3cgYWNjZXNzIHRvIHRoZSBkZWZhdWx0IGxpYnJhcnkgYnVuZGxlIHRocm91Z2ggYSBzZXQgb2Ygc3RhdGljIHNob3J0Y3V0IG1ldGhvZHMuXHJcbiAqIElmIHlvdSBhcmUgaW50ZXJlc3RlZCBpbiBjcmVhdGluZyBtdWx0aXBsZSBsaWJyYXJ5IGJ1bmRsZXMsIHBsZWFzZSB1c2UgdGhlIDxjb2RlPmdldEJ1bmRsZSgpPC9jb2RlPiBtZXRob2QuXHJcbiAqL1xyXG5jbGFzcyBBc3NldExpYnJhcnlcclxue1xyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgPGNvZGU+QXNzZXRMaWJyYXJ5PC9jb2RlPiBvYmplY3QuXHJcblx0ICpcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdH1cclxuXHJcblx0Ly8qL1xyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYW4gQXNzZXRMaWJyYXJ5IGJ1bmRsZSBpbnN0YW5jZS4gSWYgbm8ga2V5IGlzIGdpdmVuLCByZXR1cm5zIHRoZSBkZWZhdWx0IGJ1bmRsZSAod2hpY2ggaXNcclxuXHQgKiBzaW1pbGFyIHRvIHVzaW5nIHRoZSBBc3NldExpYnJhcnlCdW5kbGUgYXMgYSBzaW5nbGV0b24pLiBUbyBrZWVwIHNldmVyYWwgc2VwYXJhdGVkIGxpYnJhcnkgYnVuZGxlcyxcclxuXHQgKiBwYXNzIGEgc3RyaW5nIGtleSB0byB0aGlzIG1ldGhvZCB0byBkZWZpbmUgd2hpY2ggYnVuZGxlIHNob3VsZCBiZSByZXR1cm5lZC4gVGhpcyBpc1xyXG5cdCAqIHJlZmVycmVkIHRvIGFzIHVzaW5nIHRoZSBBc3NldExpYnJhcnlCdW5kbGUgYXMgYSBtdWx0aXRvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBrZXkgRGVmaW5lcyB3aGljaCBtdWx0aXRvbiBpbnN0YW5jZSBzaG91bGQgYmUgcmV0dXJuZWQuXHJcblx0ICogQHJldHVybiBBbiBpbnN0YW5jZSBvZiB0aGUgYXNzZXQgbGlicmFyeVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0QnVuZGxlKGtleTpzdHJpbmcgPSAnZGVmYXVsdCcpOkFzc2V0TGlicmFyeUJ1bmRsZVxyXG5cdHtcclxuXHRcdHJldHVybiBBc3NldExpYnJhcnlCdW5kbGUuZ2V0SW5zdGFuY2Uoa2V5KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBlbmFibGVQYXJzZXIocGFyc2VyQ2xhc3MpXHJcblx0e1xyXG5cdFx0QXNzZXRMb2FkZXIuZW5hYmxlUGFyc2VyKHBhcnNlckNsYXNzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBlbmFibGVQYXJzZXJzKHBhcnNlckNsYXNzZXM6QXJyYXk8T2JqZWN0PilcclxuXHR7XHJcblx0XHRBc3NldExvYWRlci5lbmFibGVQYXJzZXJzKHBhcnNlckNsYXNzZXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2hvcnQtaGFuZCBmb3IgY29uZmxpY3RTdHJhdGVneSBwcm9wZXJ0eSBvbiBkZWZhdWx0IGFzc2V0IGxpYnJhcnkgYnVuZGxlLlxyXG5cdCAqXHJcblx0ICogQHNlZSBBc3NldExpYnJhcnlCdW5kbGUuY29uZmxpY3RTdHJhdGVneVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0IGNvbmZsaWN0U3RyYXRlZ3koKTpDb25mbGljdFN0cmF0ZWd5QmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiBBc3NldExpYnJhcnkuZ2V0QnVuZGxlKCkuY29uZmxpY3RTdHJhdGVneTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgc2V0IGNvbmZsaWN0U3RyYXRlZ3kodmFsOkNvbmZsaWN0U3RyYXRlZ3lCYXNlKVxyXG5cdHtcclxuXHRcdEFzc2V0TGlicmFyeS5nZXRCdW5kbGUoKS5jb25mbGljdFN0cmF0ZWd5ID0gdmFsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2hvcnQtaGFuZCBmb3IgY29uZmxpY3RQcmVjZWRlbmNlIHByb3BlcnR5IG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXHJcblx0ICpcclxuXHQgKiBAc2VlIEFzc2V0TGlicmFyeUJ1bmRsZS5jb25mbGljdFByZWNlZGVuY2VcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIGdldCBjb25mbGljdFByZWNlZGVuY2UoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmNvbmZsaWN0UHJlY2VkZW5jZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgc2V0IGNvbmZsaWN0UHJlY2VkZW5jZSh2YWw6c3RyaW5nKVxyXG5cdHtcclxuXHRcdEFzc2V0TGlicmFyeS5nZXRCdW5kbGUoKS5jb25mbGljdFByZWNlZGVuY2UgPSB2YWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTaG9ydC1oYW5kIGZvciBjcmVhdGVJdGVyYXRvcigpIG1ldGhvZCBvbiBkZWZhdWx0IGFzc2V0IGxpYnJhcnkgYnVuZGxlLlxyXG5cdCAqXHJcblx0ICogQHNlZSBBc3NldExpYnJhcnlCdW5kbGUuY3JlYXRlSXRlcmF0b3IoKVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgY3JlYXRlSXRlcmF0b3IoYXNzZXRUeXBlRmlsdGVyOnN0cmluZyA9IG51bGwsIG5hbWVzcGFjZUZpbHRlcjpzdHJpbmcgPSBudWxsLCBmaWx0ZXJGdW5jID0gbnVsbCk6QXNzZXRMaWJyYXJ5SXRlcmF0b3JcclxuXHR7XHJcblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmNyZWF0ZUl0ZXJhdG9yKGFzc2V0VHlwZUZpbHRlciwgbmFtZXNwYWNlRmlsdGVyLCBmaWx0ZXJGdW5jKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3J0LWhhbmQgZm9yIGxvYWQoKSBtZXRob2Qgb24gZGVmYXVsdCBhc3NldCBsaWJyYXJ5IGJ1bmRsZS5cclxuXHQgKlxyXG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5QnVuZGxlLmxvYWQoKVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgbG9hZChyZXE6VVJMUmVxdWVzdCwgY29udGV4dDpBc3NldExvYWRlckNvbnRleHQgPSBudWxsLCBuczpzdHJpbmcgPSBudWxsLCBwYXJzZXI6UGFyc2VyQmFzZSA9IG51bGwpOkFzc2V0TG9hZGVyVG9rZW5cclxuXHR7XHJcblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmxvYWQocmVxLCBjb250ZXh0LCBucywgcGFyc2VyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3J0LWhhbmQgZm9yIGxvYWREYXRhKCkgbWV0aG9kIG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXHJcblx0ICpcclxuXHQgKiBAc2VlIEFzc2V0TGlicmFyeUJ1bmRsZS5sb2FkRGF0YSgpXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBsb2FkRGF0YShkYXRhOmFueSwgY29udGV4dDpBc3NldExvYWRlckNvbnRleHQgPSBudWxsLCBuczpzdHJpbmcgPSBudWxsLCBwYXJzZXI6UGFyc2VyQmFzZSA9IG51bGwpOkFzc2V0TG9hZGVyVG9rZW5cclxuXHR7XHJcblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmxvYWREYXRhKGRhdGEsIGNvbnRleHQsIG5zLCBwYXJzZXIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBzdG9wTG9hZCgpXHJcblx0e1xyXG5cdFx0QXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLnN0b3BBbGxMb2FkaW5nU2Vzc2lvbnMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3J0LWhhbmQgZm9yIGdldEFzc2V0KCkgbWV0aG9kIG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXHJcblx0ICpcclxuXHQgKiBAc2VlIEFzc2V0TGlicmFyeUJ1bmRsZS5nZXRBc3NldCgpXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBnZXRBc3NldChuYW1lOnN0cmluZywgbnM6c3RyaW5nID0gbnVsbCk6SUFzc2V0XHJcblx0e1xyXG5cdFx0cmV0dXJuIEFzc2V0TGlicmFyeS5nZXRCdW5kbGUoKS5nZXRBc3NldChuYW1lLCBucyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTaG9ydC1oYW5kIGZvciBhZGRFdmVudExpc3RlbmVyKCkgbWV0aG9kIG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBsaXN0ZW5lcjpGdW5jdGlvbilcclxuXHR7XHJcblx0XHRBc3NldExpYnJhcnkuZ2V0QnVuZGxlKCkuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTaG9ydC1oYW5kIGZvciByZW1vdmVFdmVudExpc3RlbmVyKCkgbWV0aG9kIG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyByZW1vdmVFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBsaXN0ZW5lcjpGdW5jdGlvbilcclxuXHR7XHJcblx0XHRBc3NldExpYnJhcnkuZ2V0QnVuZGxlKCkucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTaG9ydC1oYW5kIGZvciBoYXNFdmVudExpc3RlbmVyKCkgbWV0aG9kIG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXHJcblxyXG5cdCBwdWJsaWMgc3RhdGljIGhhc0V2ZW50TGlzdGVuZXIodHlwZTpzdHJpbmcpOmJvb2xlYW5cclxuXHQge1xyXG5cdFx0cmV0dXJuIEFzc2V0TGlicmFyeS5nZXRCdW5kbGUoKS5oYXNFdmVudExpc3RlbmVyKHR5cGUpO1xyXG5cdH1cclxuXHJcblx0IHB1YmxpYyBzdGF0aWMgd2lsbFRyaWdnZXIodHlwZTpzdHJpbmcpOmJvb2xlYW5cclxuXHQge1xyXG5cdFx0cmV0dXJuIGdldEJ1bmRsZSgpLndpbGxUcmlnZ2VyKHR5cGUpO1xyXG5cdH1cclxuXHQgKi9cclxuXHJcblx0LyoqXHJcblx0ICogU2hvcnQtaGFuZCBmb3IgYWRkQXNzZXQoKSBtZXRob2Qgb24gZGVmYXVsdCBhc3NldCBsaWJyYXJ5IGJ1bmRsZS5cclxuXHQgKlxyXG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5QnVuZGxlLmFkZEFzc2V0KClcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIGFkZEFzc2V0KGFzc2V0OklBc3NldClcclxuXHR7XHJcblx0XHRBc3NldExpYnJhcnkuZ2V0QnVuZGxlKCkuYWRkQXNzZXQoYXNzZXQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2hvcnQtaGFuZCBmb3IgcmVtb3ZlQXNzZXQoKSBtZXRob2Qgb24gZGVmYXVsdCBhc3NldCBsaWJyYXJ5IGJ1bmRsZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhc3NldCBUaGUgYXNzZXQgd2hpY2ggc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGlicmFyeS5cclxuXHQgKiBAcGFyYW0gZGlzcG9zZSBEZWZpbmVzIHdoZXRoZXIgdGhlIGFzc2V0cyBzaG91bGQgYWxzbyBiZSBkaXNwb3NlZC5cclxuXHQgKlxyXG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5QnVuZGxlLnJlbW92ZUFzc2V0KClcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIHJlbW92ZUFzc2V0KGFzc2V0OklBc3NldCwgZGlzcG9zZTpib29sZWFuID0gdHJ1ZSlcclxuXHR7XHJcblx0XHRBc3NldExpYnJhcnkuZ2V0QnVuZGxlKCkucmVtb3ZlQXNzZXQoYXNzZXQsIGRpc3Bvc2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2hvcnQtaGFuZCBmb3IgcmVtb3ZlQXNzZXRCeU5hbWUoKSBtZXRob2Qgb24gZGVmYXVsdCBhc3NldCBsaWJyYXJ5IGJ1bmRsZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBhc3NldCB0byBiZSByZW1vdmVkLlxyXG5cdCAqIEBwYXJhbSBucyBUaGUgbmFtZXNwYWNlIHRvIHdoaWNoIHRoZSBkZXNpcmVkIGFzc2V0IGJlbG9uZ3MuXHJcblx0ICogQHBhcmFtIGRpc3Bvc2UgRGVmaW5lcyB3aGV0aGVyIHRoZSBhc3NldHMgc2hvdWxkIGFsc28gYmUgZGlzcG9zZWQuXHJcblx0ICpcclxuXHQgKiBAc2VlIEFzc2V0TGlicmFyeUJ1bmRsZS5yZW1vdmVBc3NldEJ5TmFtZSgpXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyByZW1vdmVBc3NldEJ5TmFtZShuYW1lOnN0cmluZywgbnM6c3RyaW5nID0gbnVsbCwgZGlzcG9zZTpib29sZWFuID0gdHJ1ZSk6SUFzc2V0XHJcblx0e1xyXG5cdFx0cmV0dXJuIEFzc2V0TGlicmFyeS5nZXRCdW5kbGUoKS5yZW1vdmVBc3NldEJ5TmFtZShuYW1lLCBucywgZGlzcG9zZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTaG9ydC1oYW5kIGZvciByZW1vdmVBbGxBc3NldHMoKSBtZXRob2Qgb24gZGVmYXVsdCBhc3NldCBsaWJyYXJ5IGJ1bmRsZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBkaXNwb3NlIERlZmluZXMgd2hldGhlciB0aGUgYXNzZXRzIHNob3VsZCBhbHNvIGJlIGRpc3Bvc2VkLlxyXG5cdCAqXHJcblx0ICogQHNlZSBBc3NldExpYnJhcnlCdW5kbGUucmVtb3ZlQWxsQXNzZXRzKClcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIHJlbW92ZUFsbEFzc2V0cyhkaXNwb3NlOmJvb2xlYW4gPSB0cnVlKVxyXG5cdHtcclxuXHRcdEFzc2V0TGlicmFyeS5nZXRCdW5kbGUoKS5yZW1vdmVBbGxBc3NldHMoZGlzcG9zZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTaG9ydC1oYW5kIGZvciByZW1vdmVOYW1lc3BhY2VBc3NldHMoKSBtZXRob2Qgb24gZGVmYXVsdCBhc3NldCBsaWJyYXJ5IGJ1bmRsZS5cclxuXHQgKlxyXG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5QnVuZGxlLnJlbW92ZU5hbWVzcGFjZUFzc2V0cygpXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyByZW1vdmVOYW1lc3BhY2VBc3NldHMobnM6c3RyaW5nID0gbnVsbCwgZGlzcG9zZTpib29sZWFuID0gdHJ1ZSlcclxuXHR7XHJcblx0XHRBc3NldExpYnJhcnkuZ2V0QnVuZGxlKCkucmVtb3ZlTmFtZXNwYWNlQXNzZXRzKG5zLCBkaXNwb3NlKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IEFzc2V0TGlicmFyeTsiXX0=