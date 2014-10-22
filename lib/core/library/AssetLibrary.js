var AssetLibraryBundle = require("awayjs-core/lib/core/library/AssetLibraryBundle");

var AssetLoader = require("awayjs-core/lib/core/library/AssetLoader");

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
        if (typeof key === "undefined") { key = 'default'; }
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
        if (typeof assetTypeFilter === "undefined") { assetTypeFilter = null; }
        if (typeof namespaceFilter === "undefined") { namespaceFilter = null; }
        if (typeof filterFunc === "undefined") { filterFunc = null; }
        return AssetLibrary.getBundle().createIterator(assetTypeFilter, namespaceFilter, filterFunc);
    };

    /**
    * Short-hand for load() method on default asset library bundle.
    *
    * @see AssetLibraryBundle.load()
    */
    AssetLibrary.load = function (req, context, ns, parser) {
        if (typeof context === "undefined") { context = null; }
        if (typeof ns === "undefined") { ns = null; }
        if (typeof parser === "undefined") { parser = null; }
        return AssetLibrary.getBundle().load(req, context, ns, parser);
    };

    /**
    * Short-hand for loadData() method on default asset library bundle.
    *
    * @see AssetLibraryBundle.loadData()
    */
    AssetLibrary.loadData = function (data, context, ns, parser) {
        if (typeof context === "undefined") { context = null; }
        if (typeof ns === "undefined") { ns = null; }
        if (typeof parser === "undefined") { parser = null; }
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
        if (typeof ns === "undefined") { ns = null; }
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
        if (typeof dispose === "undefined") { dispose = true; }
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
        if (typeof ns === "undefined") { ns = null; }
        if (typeof dispose === "undefined") { dispose = true; }
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
        if (typeof dispose === "undefined") { dispose = true; }
        AssetLibrary.getBundle().removeAllAssets(dispose);
    };

    /**
    * Short-hand for removeNamespaceAssets() method on default asset library bundle.
    *
    * @see AssetLibraryBundle.removeNamespaceAssets()
    */
    AssetLibrary.removeNamespaceAssets = function (ns, dispose) {
        if (typeof ns === "undefined") { ns = null; }
        if (typeof dispose === "undefined") { dispose = true; }
        AssetLibrary.getBundle().removeNamespaceAssets(ns, dispose);
    };
    return AssetLibrary;
})();

module.exports = AssetLibrary;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbGlicmFyeS9Bc3NldExpYnJhcnkudHMiXSwibmFtZXMiOlsiQXNzZXRMaWJyYXJ5IiwiQXNzZXRMaWJyYXJ5LmNvbnN0cnVjdG9yIiwiQXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSIsIkFzc2V0TGlicmFyeS5lbmFibGVQYXJzZXIiLCJBc3NldExpYnJhcnkuZW5hYmxlUGFyc2VycyIsIkFzc2V0TGlicmFyeS5jcmVhdGVJdGVyYXRvciIsIkFzc2V0TGlicmFyeS5sb2FkIiwiQXNzZXRMaWJyYXJ5LmxvYWREYXRhIiwiQXNzZXRMaWJyYXJ5LnN0b3BMb2FkIiwiQXNzZXRMaWJyYXJ5LmdldEFzc2V0IiwiQXNzZXRMaWJyYXJ5LmFkZEV2ZW50TGlzdGVuZXIiLCJBc3NldExpYnJhcnkucmVtb3ZlRXZlbnRMaXN0ZW5lciIsIkFzc2V0TGlicmFyeS5hZGRBc3NldCIsIkFzc2V0TGlicmFyeS5yZW1vdmVBc3NldCIsIkFzc2V0TGlicmFyeS5yZW1vdmVBc3NldEJ5TmFtZSIsIkFzc2V0TGlicmFyeS5yZW1vdmVBbGxBc3NldHMiLCJBc3NldExpYnJhcnkucmVtb3ZlTmFtZXNwYWNlQXNzZXRzIl0sIm1hcHBpbmdzIjoiQUFBQSxtRkFDd0Y7O0FBRXhGLHFFQUE0RTs7QUFPNUU7Ozs7RUFJRztBQUNIO0lBTUNBOzs7TUFER0E7SUFDSEE7SUFFQUMsQ0FBQ0E7SUFZREQsSUFWSUE7SUFDSkE7Ozs7Ozs7O01BUUdBOzZCQUNIQSxVQUF3QkEsR0FBc0JBO1FBQXRCRSxrQ0FBQUEsR0FBR0EsR0FBVUEsU0FBU0E7QUFBQUEsUUFFN0NBLE9BQU9BLGtCQUFrQkEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7SUFDM0NBLENBQUNBOztJQUtERjs7TUFER0E7Z0NBQ0hBLFVBQTJCQSxXQUFXQTtRQUVyQ0csV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7SUFDdENBLENBQUNBOztJQUtESDs7TUFER0E7aUNBQ0hBLFVBQTRCQSxhQUEyQkE7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LEVBQUVBLE9BQXNCQTtRQUF4Q2dCLGlDQUFBQSxFQUFFQSxHQUFVQSxJQUFJQTtBQUFBQSxRQUFFQSxzQ0FBQUEsT0FBT0EsR0FBV0EsSUFBSUE7QUFBQUEsUUFFM0VBLFlBQVlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsRUFBRUEsRUFBRUEsT0FBT0EsQ0FBQ0E7SUFDNURBLENBQUNBO0lBQ0ZoQixvQkFBQ0E7QUFBREEsQ0FBQ0EsSUFBQTs7QUFFRCw2QkFBc0IsQ0FBQSIsImZpbGUiOiJjb3JlL2xpYnJhcnkvQXNzZXRMaWJyYXJ5LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVSTFJlcXVlc3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL25ldC9VUkxSZXF1ZXN0XCIpO1xuaW1wb3J0IEFzc2V0TGlicmFyeUJ1bmRsZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0Fzc2V0TGlicmFyeUJ1bmRsZVwiKTtcbmltcG9ydCBBc3NldExpYnJhcnlJdGVyYXRvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0Fzc2V0TGlicmFyeUl0ZXJhdG9yXCIpO1xuaW1wb3J0IEFzc2V0TG9hZGVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0Fzc2V0TG9hZGVyXCIpO1xuaW1wb3J0IEFzc2V0TG9hZGVyQ29udGV4dFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0Fzc2V0TG9hZGVyQ29udGV4dFwiKTtcbmltcG9ydCBBc3NldExvYWRlclRva2VuXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9Bc3NldExvYWRlclRva2VuXCIpO1xuaW1wb3J0IENvbmZsaWN0U3RyYXRlZ3lCYXNlXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvQ29uZmxpY3RTdHJhdGVneUJhc2VcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IFBhcnNlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlckJhc2VcIik7XG5cbi8qKlxuICogQXNzZXRMaWJyYXJ5IGVuZm9yY2VzIGEgc2luZ2xldG9uIHBhdHRlcm4gYW5kIGlzIG5vdCBpbnRlbmRlZCB0byBiZSBpbnN0YW5jZWQuXG4gKiBJdCdzIHB1cnBvc2UgaXMgdG8gYWxsb3cgYWNjZXNzIHRvIHRoZSBkZWZhdWx0IGxpYnJhcnkgYnVuZGxlIHRocm91Z2ggYSBzZXQgb2Ygc3RhdGljIHNob3J0Y3V0IG1ldGhvZHMuXG4gKiBJZiB5b3UgYXJlIGludGVyZXN0ZWQgaW4gY3JlYXRpbmcgbXVsdGlwbGUgbGlicmFyeSBidW5kbGVzLCBwbGVhc2UgdXNlIHRoZSA8Y29kZT5nZXRCdW5kbGUoKTwvY29kZT4gbWV0aG9kLlxuICovXG5jbGFzcyBBc3NldExpYnJhcnlcbntcblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgPGNvZGU+QXNzZXRMaWJyYXJ5PC9jb2RlPiBvYmplY3QuXG5cdCAqXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0fVxuXG5cdC8vKi9cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gQXNzZXRMaWJyYXJ5IGJ1bmRsZSBpbnN0YW5jZS4gSWYgbm8ga2V5IGlzIGdpdmVuLCByZXR1cm5zIHRoZSBkZWZhdWx0IGJ1bmRsZSAod2hpY2ggaXNcblx0ICogc2ltaWxhciB0byB1c2luZyB0aGUgQXNzZXRMaWJyYXJ5QnVuZGxlIGFzIGEgc2luZ2xldG9uKS4gVG8ga2VlcCBzZXZlcmFsIHNlcGFyYXRlZCBsaWJyYXJ5IGJ1bmRsZXMsXG5cdCAqIHBhc3MgYSBzdHJpbmcga2V5IHRvIHRoaXMgbWV0aG9kIHRvIGRlZmluZSB3aGljaCBidW5kbGUgc2hvdWxkIGJlIHJldHVybmVkLiBUaGlzIGlzXG5cdCAqIHJlZmVycmVkIHRvIGFzIHVzaW5nIHRoZSBBc3NldExpYnJhcnlCdW5kbGUgYXMgYSBtdWx0aXRvbi5cblx0ICpcblx0ICogQHBhcmFtIGtleSBEZWZpbmVzIHdoaWNoIG11bHRpdG9uIGluc3RhbmNlIHNob3VsZCBiZSByZXR1cm5lZC5cblx0ICogQHJldHVybiBBbiBpbnN0YW5jZSBvZiB0aGUgYXNzZXQgbGlicmFyeVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBnZXRCdW5kbGUoa2V5OnN0cmluZyA9ICdkZWZhdWx0Jyk6QXNzZXRMaWJyYXJ5QnVuZGxlXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5QnVuZGxlLmdldEluc3RhbmNlKGtleSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgZW5hYmxlUGFyc2VyKHBhcnNlckNsYXNzKVxuXHR7XG5cdFx0QXNzZXRMb2FkZXIuZW5hYmxlUGFyc2VyKHBhcnNlckNsYXNzKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBlbmFibGVQYXJzZXJzKHBhcnNlckNsYXNzZXM6QXJyYXk8T2JqZWN0Pilcblx0e1xuXHRcdEFzc2V0TG9hZGVyLmVuYWJsZVBhcnNlcnMocGFyc2VyQ2xhc3Nlcyk7XG5cdH1cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgY29uZmxpY3RTdHJhdGVneSBwcm9wZXJ0eSBvbiBkZWZhdWx0IGFzc2V0IGxpYnJhcnkgYnVuZGxlLlxuXHQgKlxuXHQgKiBAc2VlIEFzc2V0TGlicmFyeUJ1bmRsZS5jb25mbGljdFN0cmF0ZWd5XG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIGdldCBjb25mbGljdFN0cmF0ZWd5KCk6Q29uZmxpY3RTdHJhdGVneUJhc2Vcblx0e1xuXHRcdHJldHVybiBBc3NldExpYnJhcnkuZ2V0QnVuZGxlKCkuY29uZmxpY3RTdHJhdGVneTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgc2V0IGNvbmZsaWN0U3RyYXRlZ3kodmFsOkNvbmZsaWN0U3RyYXRlZ3lCYXNlKVxuXHR7XG5cdFx0QXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmNvbmZsaWN0U3RyYXRlZ3kgPSB2YWw7XG5cdH1cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgY29uZmxpY3RQcmVjZWRlbmNlIHByb3BlcnR5IG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXG5cdCAqXG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5QnVuZGxlLmNvbmZsaWN0UHJlY2VkZW5jZVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBnZXQgY29uZmxpY3RQcmVjZWRlbmNlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmNvbmZsaWN0UHJlY2VkZW5jZTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgc2V0IGNvbmZsaWN0UHJlY2VkZW5jZSh2YWw6c3RyaW5nKVxuXHR7XG5cdFx0QXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmNvbmZsaWN0UHJlY2VkZW5jZSA9IHZhbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaG9ydC1oYW5kIGZvciBjcmVhdGVJdGVyYXRvcigpIG1ldGhvZCBvbiBkZWZhdWx0IGFzc2V0IGxpYnJhcnkgYnVuZGxlLlxuXHQgKlxuXHQgKiBAc2VlIEFzc2V0TGlicmFyeUJ1bmRsZS5jcmVhdGVJdGVyYXRvcigpXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIGNyZWF0ZUl0ZXJhdG9yKGFzc2V0VHlwZUZpbHRlcjpzdHJpbmcgPSBudWxsLCBuYW1lc3BhY2VGaWx0ZXI6c3RyaW5nID0gbnVsbCwgZmlsdGVyRnVuYyA9IG51bGwpOkFzc2V0TGlicmFyeUl0ZXJhdG9yXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmNyZWF0ZUl0ZXJhdG9yKGFzc2V0VHlwZUZpbHRlciwgbmFtZXNwYWNlRmlsdGVyLCBmaWx0ZXJGdW5jKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaG9ydC1oYW5kIGZvciBsb2FkKCkgbWV0aG9kIG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXG5cdCAqXG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5QnVuZGxlLmxvYWQoKVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBsb2FkKHJlcTpVUkxSZXF1ZXN0LCBjb250ZXh0OkFzc2V0TG9hZGVyQ29udGV4dCA9IG51bGwsIG5zOnN0cmluZyA9IG51bGwsIHBhcnNlcjpQYXJzZXJCYXNlID0gbnVsbCk6QXNzZXRMb2FkZXJUb2tlblxuXHR7XG5cdFx0cmV0dXJuIEFzc2V0TGlicmFyeS5nZXRCdW5kbGUoKS5sb2FkKHJlcSwgY29udGV4dCwgbnMsIHBhcnNlcik7XG5cdH1cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgbG9hZERhdGEoKSBtZXRob2Qgb24gZGVmYXVsdCBhc3NldCBsaWJyYXJ5IGJ1bmRsZS5cblx0ICpcblx0ICogQHNlZSBBc3NldExpYnJhcnlCdW5kbGUubG9hZERhdGEoKVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBsb2FkRGF0YShkYXRhOmFueSwgY29udGV4dDpBc3NldExvYWRlckNvbnRleHQgPSBudWxsLCBuczpzdHJpbmcgPSBudWxsLCBwYXJzZXI6UGFyc2VyQmFzZSA9IG51bGwpOkFzc2V0TG9hZGVyVG9rZW5cblx0e1xuXHRcdHJldHVybiBBc3NldExpYnJhcnkuZ2V0QnVuZGxlKCkubG9hZERhdGEoZGF0YSwgY29udGV4dCwgbnMsIHBhcnNlcik7XG5cdH1cblxuXHRwdWJsaWMgc3RhdGljIHN0b3BMb2FkKClcblx0e1xuXHRcdEFzc2V0TGlicmFyeS5nZXRCdW5kbGUoKS5zdG9wQWxsTG9hZGluZ1Nlc3Npb25zKCk7XG5cdH1cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgZ2V0QXNzZXQoKSBtZXRob2Qgb24gZGVmYXVsdCBhc3NldCBsaWJyYXJ5IGJ1bmRsZS5cblx0ICpcblx0ICogQHNlZSBBc3NldExpYnJhcnlCdW5kbGUuZ2V0QXNzZXQoKVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBnZXRBc3NldChuYW1lOnN0cmluZywgbnM6c3RyaW5nID0gbnVsbCk6SUFzc2V0XG5cdHtcblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmdldEFzc2V0KG5hbWUsIG5zKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaG9ydC1oYW5kIGZvciBhZGRFdmVudExpc3RlbmVyKCkgbWV0aG9kIG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTpzdHJpbmcsIGxpc3RlbmVyOkZ1bmN0aW9uKVxuXHR7XG5cdFx0QXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNob3J0LWhhbmQgZm9yIHJlbW92ZUV2ZW50TGlzdGVuZXIoKSBtZXRob2Qgb24gZGVmYXVsdCBhc3NldCBsaWJyYXJ5IGJ1bmRsZS5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlOnN0cmluZywgbGlzdGVuZXI6RnVuY3Rpb24pXG5cdHtcblx0XHRBc3NldExpYnJhcnkuZ2V0QnVuZGxlKCkucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG5cdH1cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgaGFzRXZlbnRMaXN0ZW5lcigpIG1ldGhvZCBvbiBkZWZhdWx0IGFzc2V0IGxpYnJhcnkgYnVuZGxlLlxuXG5cdCBwdWJsaWMgc3RhdGljIGhhc0V2ZW50TGlzdGVuZXIodHlwZTpzdHJpbmcpOmJvb2xlYW5cblx0IHtcblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLmhhc0V2ZW50TGlzdGVuZXIodHlwZSk7XG5cdH1cblxuXHQgcHVibGljIHN0YXRpYyB3aWxsVHJpZ2dlcih0eXBlOnN0cmluZyk6Ym9vbGVhblxuXHQge1xuXHRcdHJldHVybiBnZXRCdW5kbGUoKS53aWxsVHJpZ2dlcih0eXBlKTtcblx0fVxuXHQgKi9cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgYWRkQXNzZXQoKSBtZXRob2Qgb24gZGVmYXVsdCBhc3NldCBsaWJyYXJ5IGJ1bmRsZS5cblx0ICpcblx0ICogQHNlZSBBc3NldExpYnJhcnlCdW5kbGUuYWRkQXNzZXQoKVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBhZGRBc3NldChhc3NldDpJQXNzZXQpXG5cdHtcblx0XHRBc3NldExpYnJhcnkuZ2V0QnVuZGxlKCkuYWRkQXNzZXQoYXNzZXQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNob3J0LWhhbmQgZm9yIHJlbW92ZUFzc2V0KCkgbWV0aG9kIG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSBhc3NldCBUaGUgYXNzZXQgd2hpY2ggc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGlicmFyeS5cblx0ICogQHBhcmFtIGRpc3Bvc2UgRGVmaW5lcyB3aGV0aGVyIHRoZSBhc3NldHMgc2hvdWxkIGFsc28gYmUgZGlzcG9zZWQuXG5cdCAqXG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5QnVuZGxlLnJlbW92ZUFzc2V0KClcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVtb3ZlQXNzZXQoYXNzZXQ6SUFzc2V0LCBkaXNwb3NlOmJvb2xlYW4gPSB0cnVlKVxuXHR7XG5cdFx0QXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLnJlbW92ZUFzc2V0KGFzc2V0LCBkaXNwb3NlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaG9ydC1oYW5kIGZvciByZW1vdmVBc3NldEJ5TmFtZSgpIG1ldGhvZCBvbiBkZWZhdWx0IGFzc2V0IGxpYnJhcnkgYnVuZGxlLlxuXHQgKlxuXHQgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYXNzZXQgdG8gYmUgcmVtb3ZlZC5cblx0ICogQHBhcmFtIG5zIFRoZSBuYW1lc3BhY2UgdG8gd2hpY2ggdGhlIGRlc2lyZWQgYXNzZXQgYmVsb25ncy5cblx0ICogQHBhcmFtIGRpc3Bvc2UgRGVmaW5lcyB3aGV0aGVyIHRoZSBhc3NldHMgc2hvdWxkIGFsc28gYmUgZGlzcG9zZWQuXG5cdCAqXG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5QnVuZGxlLnJlbW92ZUFzc2V0QnlOYW1lKClcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVtb3ZlQXNzZXRCeU5hbWUobmFtZTpzdHJpbmcsIG5zOnN0cmluZyA9IG51bGwsIGRpc3Bvc2U6Ym9vbGVhbiA9IHRydWUpOklBc3NldFxuXHR7XG5cdFx0cmV0dXJuIEFzc2V0TGlicmFyeS5nZXRCdW5kbGUoKS5yZW1vdmVBc3NldEJ5TmFtZShuYW1lLCBucywgZGlzcG9zZSk7XG5cdH1cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgcmVtb3ZlQWxsQXNzZXRzKCkgbWV0aG9kIG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSBkaXNwb3NlIERlZmluZXMgd2hldGhlciB0aGUgYXNzZXRzIHNob3VsZCBhbHNvIGJlIGRpc3Bvc2VkLlxuXHQgKlxuXHQgKiBAc2VlIEFzc2V0TGlicmFyeUJ1bmRsZS5yZW1vdmVBbGxBc3NldHMoKVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyByZW1vdmVBbGxBc3NldHMoZGlzcG9zZTpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdEFzc2V0TGlicmFyeS5nZXRCdW5kbGUoKS5yZW1vdmVBbGxBc3NldHMoZGlzcG9zZSk7XG5cdH1cblxuXHQvKipcblx0ICogU2hvcnQtaGFuZCBmb3IgcmVtb3ZlTmFtZXNwYWNlQXNzZXRzKCkgbWV0aG9kIG9uIGRlZmF1bHQgYXNzZXQgbGlicmFyeSBidW5kbGUuXG5cdCAqXG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5QnVuZGxlLnJlbW92ZU5hbWVzcGFjZUFzc2V0cygpXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIHJlbW92ZU5hbWVzcGFjZUFzc2V0cyhuczpzdHJpbmcgPSBudWxsLCBkaXNwb3NlOmJvb2xlYW4gPSB0cnVlKVxuXHR7XG5cdFx0QXNzZXRMaWJyYXJ5LmdldEJ1bmRsZSgpLnJlbW92ZU5hbWVzcGFjZUFzc2V0cyhucywgZGlzcG9zZSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gQXNzZXRMaWJyYXJ5OyJdfQ==