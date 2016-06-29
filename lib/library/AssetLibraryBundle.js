"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetLibraryIterator_1 = require("../library/AssetLibraryIterator");
var Loader_1 = require("../library/Loader");
var ConflictPrecedence_1 = require("../library/ConflictPrecedence");
var ConflictStrategy_1 = require("../library/ConflictStrategy");
var AssetBase_1 = require("../library/AssetBase");
var ErrorBase_1 = require("../errors/ErrorBase");
var AssetEvent_1 = require("../events/AssetEvent");
var URLLoaderEvent_1 = require("../events/URLLoaderEvent");
var LoaderEvent_1 = require("../events/LoaderEvent");
var EventDispatcher_1 = require("../events/EventDispatcher");
var ParserEvent_1 = require("../events/ParserEvent");
/**
 * AssetLibraryBundle enforces a multiton pattern and is not intended to be instanced directly.
 * Its purpose is to create a container for 3D data management, both before and after parsing.
 * If you are interested in creating multiple library bundles, please use the <code>getInstance()</code> method.
 */
var AssetLibraryBundle = (function (_super) {
    __extends(AssetLibraryBundle, _super);
    /**
     * Creates a new <code>AssetLibraryBundle</code> object.
     *
     * @param me A multiton enforcer for the AssetLibraryBundle ensuring it cannnot be instanced.
     */
    function AssetLibraryBundle() {
        var _this = this;
        _super.call(this);
        this._loaderSessionsGarbage = new Array();
        this._assets = new Array(); //new Vector.<IAsset>;
        this._assetDictionary = new Object();
        this._loaderSessions = new Array();
        this.conflictStrategy = ConflictStrategy_1.ConflictStrategy.IGNORE.create();
        this.conflictPrecedence = ConflictPrecedence_1.ConflictPrecedence.FAVOR_NEW;
        this._onAssetRenameDelegate = function (event) { return _this.onAssetRename(event); };
        this._onAssetConflictResolvedDelegate = function (event) { return _this.onAssetConflictResolved(event); };
        this._onResourceCompleteDelegate = function (event) { return _this.onResourceComplete(event); };
        this._onTextureSizeErrorDelegate = function (event) { return _this.onTextureSizeError(event); };
        this._onAssetCompleteDelegate = function (event) { return _this.onAssetComplete(event); };
        this._onLoadErrorDelegate = function (event) { return _this.onLoadError(event); };
        this._onParseErrorDelegate = function (event) { return _this.onParseError(event); };
    }
    /**
     * Returns an AssetLibraryBundle instance. If no key is given, returns the default bundle instance (which is
     * similar to using the AssetLibraryBundle as a singleton.) To keep several separated library bundles,
     * pass a string key to this method to define which bundle should be returned. This is
     * referred to as using the AssetLibrary as a multiton.
     *
     * @param key Defines which multiton instance should be returned.
     * @return An instance of the asset library
     */
    AssetLibraryBundle.getInstance = function (key) {
        if (key === void 0) { key = 'default'; }
        if (!key)
            key = 'default';
        if (!AssetLibraryBundle._iInstances.hasOwnProperty(key))
            AssetLibraryBundle._iInstances[key] = new AssetLibraryBundle();
        return AssetLibraryBundle._iInstances[key];
    };
    /**
     *
     */
    AssetLibraryBundle.prototype.enableParser = function (parserClass) {
        Loader_1.Loader.enableParser(parserClass);
    };
    /**
     *
     */
    AssetLibraryBundle.prototype.enableParsers = function (parserClasses) {
        Loader_1.Loader.enableParsers(parserClasses);
    };
    Object.defineProperty(AssetLibraryBundle.prototype, "conflictStrategy", {
        /**
         * Defines which strategy should be used for resolving naming conflicts, when two library
         * assets are given the same name. By default, <code>ConflictStrategy.APPEND_NUM_SUFFIX</code>
         * is used which means that a numeric suffix is appended to one of the assets. The
         * <code>conflictPrecedence</code> property defines which of the two conflicting assets will
         * be renamed.
         *
         * @see naming.ConflictStrategy
         * @see AssetLibrary.conflictPrecedence
         */
        get: function () {
            return this._strategy;
        },
        set: function (val) {
            if (!val)
                throw new ErrorBase_1.ErrorBase('namingStrategy must not be null. To ignore naming, use AssetLibrary.IGNORE');
            this._strategy = val.create();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetLibraryBundle.prototype, "conflictPrecedence", {
        /**
         * Defines which asset should have precedence when resolving a naming conflict between
         * two assets of which one has just been renamed by the user or by a parser. By default
         * <code>ConflictPrecedence.FAVOR_NEW</code> is used, meaning that the newly renamed
         * asset will keep it's new name while the older asset gets renamed to not conflict.
         *
         * This property is ignored for conflict strategies that do not actually rename an
         * asset automatically, such as ConflictStrategy.IGNORE and ConflictStrategy.THROW_ERROR.
         *
         * @see away.library.ConflictPrecedence
         * @see away.library.ConflictStrategy
         */
        get: function () {
            return this._strategyPreference;
        },
        set: function (val) {
            this._strategyPreference = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create an AssetLibraryIterator instance that can be used to iterate over the assets
     * in this asset library instance. The iterator can filter assets on asset type and/or
     * namespace. A "null" filter value means no filter of that type is used.
     *
     * @param assetTypeFilter Asset type to filter on (from the AssetType enum class.) Use
     * null to not filter on asset type.
     * @param namespaceFilter Namespace to filter on. Use null to not filter on namespace.
     * @param filterFunc Callback function to use when deciding whether an asset should be
     * included in the iteration or not. This needs to be a function that takes a single
     * parameter of type IAsset and returns a boolean where true means it should be included.
     *
     * @see away.library.AssetType
     */
    AssetLibraryBundle.prototype.createIterator = function (assetTypeFilter, namespaceFilter, filterFunc) {
        if (assetTypeFilter === void 0) { assetTypeFilter = null; }
        if (namespaceFilter === void 0) { namespaceFilter = null; }
        if (filterFunc === void 0) { filterFunc = null; }
        return new AssetLibraryIterator_1.AssetLibraryIterator(this._assets, assetTypeFilter, namespaceFilter, filterFunc);
    };
    /**
     * Loads a file and (optionally) all of its dependencies.
     *
     * @param req The URLRequest object containing the URL of the file to be loaded.
     * @param context An optional context object providing additional parameters for loading
     * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
     * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, Loader will attempt to auto-detect the file type.
     * @return A handle to the retrieved resource.
     */
    AssetLibraryBundle.prototype.load = function (req, context, ns, parser) {
        if (context === void 0) { context = null; }
        if (ns === void 0) { ns = null; }
        if (parser === void 0) { parser = null; }
        this.getLoader().load(req, context, ns, parser);
    };
    /**
     * Loads a resource from existing data in memory.
     *
     * @param data The data object containing all resource information.
     * @param context An optional context object providing additional parameters for loading
     * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
     * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, Loader will attempt to auto-detect the file type.
     * @return A handle to the retrieved resource.
     */
    AssetLibraryBundle.prototype.loadData = function (data, context, ns, parser) {
        if (context === void 0) { context = null; }
        if (ns === void 0) { ns = null; }
        if (parser === void 0) { parser = null; }
        this.getLoader().loadData(data, '', context, ns, parser);
    };
    AssetLibraryBundle.prototype.getLoader = function () {
        var loader = new Loader_1.Loader();
        this._loaderSessions.push(loader);
        loader.addEventListener(LoaderEvent_1.LoaderEvent.LOAD_COMPLETE, this._onResourceCompleteDelegate);
        loader.addEventListener(AssetEvent_1.AssetEvent.TEXTURE_SIZE_ERROR, this._onTextureSizeErrorDelegate);
        loader.addEventListener(AssetEvent_1.AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
        // Error are handled separately (see documentation for addErrorHandler)
        loader._iAddErrorHandler(this._onLoadErrorDelegate);
        loader._iAddParseErrorHandler(this._onParseErrorDelegate);
        return loader;
    };
    AssetLibraryBundle.prototype.disposeLoader = function (loader) {
        var _this = this;
        var index = this._loaderSessions.indexOf(loader);
        this._loaderSessions.splice(index, 1);
        // Add loader to a garbage array - for a collection sweep and kill
        this._loaderSessionsGarbage.push(loader);
        this._gcTimeoutIID = setTimeout(function () { _this.loaderSessionGC(); }, 100);
    };
    /**
     *
     */
    AssetLibraryBundle.prototype.getAsset = function (name, ns) {
        if (ns === void 0) { ns = null; }
        if (this._assetDictDirty)
            this.rehashAssetDict();
        if (ns == null)
            ns = AssetBase_1.AssetBase.DEFAULT_NAMESPACE;
        if (!this._assetDictionary.hasOwnProperty(ns))
            return null;
        return this._assetDictionary[ns][name];
    };
    AssetLibraryBundle.prototype.getAllAssets = function () {
        return this._assets;
    };
    /**
     * Adds an asset to the asset library, first making sure that it's name is unique
     * using the method defined by the <code>conflictStrategy</code> and
     * <code>conflictPrecedence</code> properties.
     */
    AssetLibraryBundle.prototype.addAsset = function (asset) {
        var ns;
        var old;
        // Bail if asset has already been added.
        if (this._assets.indexOf(asset) >= 0)
            return;
        old = this.getAsset(asset.name, asset.assetNamespace);
        ns = asset.assetNamespace || AssetBase_1.AssetBase.DEFAULT_NAMESPACE;
        if (old != null)
            this._strategy.resolveConflict(asset, old, this._assetDictionary[ns], this._strategyPreference);
        //create unique-id (for now this is used in AwayBuilder only
        //asset.id = IDUtil.createUID();
        // Add it
        this._assets.push(asset);
        if (!this._assetDictionary.hasOwnProperty(ns))
            this._assetDictionary[ns] = new Object();
        this._assetDictionary[ns][asset.name] = asset;
        asset.addEventListener(AssetEvent_1.AssetEvent.RENAME, this._onAssetRenameDelegate);
        asset.addEventListener(AssetEvent_1.AssetEvent.ASSET_CONFLICT_RESOLVED, this._onAssetConflictResolvedDelegate);
    };
    /**
     * Removes an asset from the library, and optionally disposes that asset by calling
     * it's disposeAsset() method (which for most assets is implemented as a default
     * version of that type's dispose() method.
     *
     * @param asset The asset which should be removed from this library.
     * @param dispose Defines whether the assets should also be disposed.
     */
    AssetLibraryBundle.prototype.removeAsset = function (asset, dispose) {
        if (dispose === void 0) { dispose = true; }
        var idx;
        this.removeAssetFromDict(asset);
        asset.removeEventListener(AssetEvent_1.AssetEvent.RENAME, this._onAssetRenameDelegate);
        asset.removeEventListener(AssetEvent_1.AssetEvent.ASSET_CONFLICT_RESOLVED, this._onAssetConflictResolvedDelegate);
        idx = this._assets.indexOf(asset);
        if (idx >= 0)
            this._assets.splice(idx, 1);
        if (dispose)
            asset.dispose();
    };
    /**
     * Removes an asset which is specified using name and namespace.
     *
     * @param name The name of the asset to be removed.
     * @param ns The namespace to which the desired asset belongs.
     * @param dispose Defines whether the assets should also be disposed.
     *
     * @see away.library.AssetLibrary.removeAsset()
     */
    AssetLibraryBundle.prototype.removeAssetByName = function (name, ns, dispose) {
        if (ns === void 0) { ns = null; }
        if (dispose === void 0) { dispose = true; }
        var asset = this.getAsset(name, ns);
        if (asset)
            this.removeAsset(asset, dispose);
        return asset;
    };
    /**
     * Removes all assets from the asset library, optionally disposing them as they
     * are removed.
     *
     * @param dispose Defines whether the assets should also be disposed.
     */
    AssetLibraryBundle.prototype.removeAllAssets = function (dispose) {
        if (dispose === void 0) { dispose = true; }
        if (dispose) {
            var asset;
            var len = this._assets.length;
            for (var c = 0; c < len; c++) {
                asset = this._assets[c];
                asset.dispose();
            }
        }
        this._assets.length = 0;
        this.rehashAssetDict();
    };
    /**
     * Removes all assets belonging to a particular namespace (null for default)
     * from the asset library, and optionall disposes them by calling their
     * disposeAsset() method.
     *
     * @param ns The namespace from which all assets should be removed.
     * @param dispose Defines whether the assets should also be disposed.
     *
     * @see away.library.AssetLibrary.removeAsset()
     */
    AssetLibraryBundle.prototype.removeNamespaceAssets = function (ns, dispose) {
        if (ns === void 0) { ns = null; }
        if (dispose === void 0) { dispose = true; }
        var idx = 0;
        var asset;
        var old_assets;
        // Empty the assets vector after having stored a copy of it.
        // The copy will be filled with all assets which weren't removed.
        old_assets = this._assets.concat();
        this._assets.length = 0;
        if (ns == null)
            ns = AssetBase_1.AssetBase.DEFAULT_NAMESPACE;
        var len = old_assets.length;
        for (var d = 0; d < len; d++) {
            asset = old_assets[d];
            // Remove from dict if in the supplied namespace. If not,
            // transfer over to the new vector.
            if (asset.assetNamespace == ns) {
                if (dispose)
                    asset.dispose();
                // Remove asset from dictionary, but don't try to auto-remove
                // the namespace, which will trigger an unnecessarily expensive
                // test that is not needed since we know that the namespace
                // will be empty when loop finishes.
                this.removeAssetFromDict(asset, false);
            }
            else {
                this._assets[idx++] = asset;
            }
        }
        /*
         for each (asset in old_assets) {
         // Remove from dict if in the supplied namespace. If not,
         // transfer over to the new vector.
         if (asset.assetNamespace == ns) {
         if (dispose)
         asset.dispose();

         // Remove asset from dictionary, but don't try to auto-remove
         // the namespace, which will trigger an unnecessarily expensive
         // test that is not needed since we know that the namespace
         // will be empty when loop finishes.
         removeAssetFromDict(asset, false);
         } else
         _assets[idx++] = asset;

         }
         */
        // Remove empty namespace
        if (this._assetDictionary.hasOwnProperty(ns))
            delete this._assetDictionary[ns];
    };
    AssetLibraryBundle.prototype.removeAssetFromDict = function (asset, autoRemoveEmptyNamespace) {
        if (autoRemoveEmptyNamespace === void 0) { autoRemoveEmptyNamespace = true; }
        if (this._assetDictDirty)
            this.rehashAssetDict();
        if (this._assetDictionary.hasOwnProperty(asset.assetNamespace)) {
            if (this._assetDictionary[asset.assetNamespace].hasOwnProperty(asset.name))
                delete this._assetDictionary[asset.assetNamespace][asset.name];
            if (autoRemoveEmptyNamespace) {
                var key;
                var empty = true;
                for (key in this._assetDictionary[asset.assetNamespace]) {
                    empty = false;
                    break;
                }
                if (empty)
                    delete this._assetDictionary[asset.assetNamespace];
            }
        }
    };
    AssetLibraryBundle.prototype.stopAllLoaders = function () {
        var len = this._loaderSessions.length;
        for (var i = 0; i < len; i++)
            this.killloaderSession(this._loaderSessions[i]);
        this._loaderSessions = new Array();
    };
    AssetLibraryBundle.prototype.rehashAssetDict = function () {
        var asset;
        this._assetDictionary = {};
        var len = this._assets.length;
        for (var c = 0; c < len; c++) {
            asset = this._assets[c];
            if (!this._assetDictionary.hasOwnProperty(asset.assetNamespace))
                this._assetDictionary[asset.assetNamespace] = {};
            this._assetDictionary[asset.assetNamespace][asset.name] = asset;
        }
        this._assetDictDirty = false;
    };
    /**
     * Called when a an error occurs during loading.
     */
    AssetLibraryBundle.prototype.onLoadError = function (event) {
        if (this.hasEventListener(URLLoaderEvent_1.URLLoaderEvent.LOAD_ERROR)) {
            this.dispatchEvent(event);
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Called when a an error occurs during parsing.
     */
    AssetLibraryBundle.prototype.onParseError = function (event) {
        if (this.hasEventListener(ParserEvent_1.ParserEvent.PARSE_ERROR)) {
            this.dispatchEvent(event);
            return true;
        }
        else {
            return false;
        }
    };
    AssetLibraryBundle.prototype.onAssetComplete = function (event) {
        // Only add asset to library the first time.
        if (event.type == AssetEvent_1.AssetEvent.ASSET_COMPLETE)
            this.addAsset(event.asset);
        this.dispatchEvent(event);
    };
    AssetLibraryBundle.prototype.onTextureSizeError = function (event) {
        this.dispatchEvent(event);
    };
    /**
     * Called when the resource and all of its dependencies was retrieved.
     */
    AssetLibraryBundle.prototype.onResourceComplete = function (event) {
        var loader = event.target;
        this.dispatchEvent(event);
        this.disposeLoader(loader);
    };
    AssetLibraryBundle.prototype.loaderSessionGC = function () {
        var loader;
        while (this._loaderSessionsGarbage.length > 0) {
            loader = this._loaderSessionsGarbage.pop();
            this.killloaderSession(loader);
        }
        clearTimeout(this._gcTimeoutIID);
        this._gcTimeoutIID = null;
    };
    AssetLibraryBundle.prototype.killloaderSession = function (loader) {
        loader.removeEventListener(LoaderEvent_1.LoaderEvent.LOAD_COMPLETE, this._onResourceCompleteDelegate);
        loader.removeEventListener(AssetEvent_1.AssetEvent.TEXTURE_SIZE_ERROR, this._onTextureSizeErrorDelegate);
        loader.removeEventListener(AssetEvent_1.AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
        loader.stop();
    };
    AssetLibraryBundle.prototype.onAssetRename = function (event) {
        var asset = event.target; // TODO: was ev.currentTarget - watch this var
        var old = this.getAsset(asset.assetNamespace, asset.name);
        if (old != null) {
            this._strategy.resolveConflict(asset, old, this._assetDictionary[asset.assetNamespace], this._strategyPreference);
        }
        else {
            var dict = this._assetDictionary[event.asset.assetNamespace];
            if (dict == null)
                return;
            dict[event.prevName] = null;
            dict[event.asset.name] = event.asset;
        }
    };
    AssetLibraryBundle.prototype.onAssetConflictResolved = function (event) {
        this.dispatchEvent(event.clone());
    };
    AssetLibraryBundle._iInstances = new Object();
    return AssetLibraryBundle;
}(EventDispatcher_1.EventDispatcher));
exports.AssetLibraryBundle = AssetLibraryBundle;
