"use strict";
var AssetLibraryBundle_1 = require("../library/AssetLibraryBundle");
var Loader_1 = require("../library/Loader");
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
        return AssetLibraryBundle_1.AssetLibraryBundle.getInstance(key);
    };
    /**
     *
     */
    AssetLibrary.enableParser = function (parserClass) {
        Loader_1.Loader.enableParser(parserClass);
    };
    /**
     *
     */
    AssetLibrary.enableParsers = function (parserClasses) {
        Loader_1.Loader.enableParsers(parserClasses);
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
        AssetLibrary.getBundle().load(req, context, ns, parser);
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
        AssetLibrary.getBundle().loadData(data, context, ns, parser);
    };
    AssetLibrary.stopLoad = function () {
        AssetLibrary.getBundle().stopAllLoaders();
    };
    AssetLibrary.getLoader = function () {
        return AssetLibrary.getBundle().getLoader();
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
     * Short-hand for getAsset() method on default asset library bundle.
     *
     * @see AssetLibraryBundle.getAsset()
     */
    AssetLibrary.getAllAssets = function () {
        return AssetLibrary.getBundle().getAllAssets();
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
}());
exports.AssetLibrary = AssetLibrary;
