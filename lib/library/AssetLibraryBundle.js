var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetLibraryIterator = require("awayjs-core/lib/library/AssetLibraryIterator");
var AssetLoader = require("awayjs-core/lib/library/AssetLoader");
var ConflictPrecedence = require("awayjs-core/lib/library/ConflictPrecedence");
var ConflictStrategy = require("awayjs-core/lib/library/ConflictStrategy");
var AssetBase = require("awayjs-core/lib/library/AssetBase");
var Error = require("awayjs-core/lib/errors/Error");
var AssetEvent = require("awayjs-core/lib/events/AssetEvent");
var IOErrorEvent = require("awayjs-core/lib/events/IOErrorEvent");
var LoaderEvent = require("awayjs-core/lib/events/LoaderEvent");
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var ParserEvent = require("awayjs-core/lib/events/ParserEvent");
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
        this._loadingSessionsGarbage = new Array();
        this._assets = new Array(); //new Vector.<IAsset>;
        this._assetDictionary = new Object();
        this._loadingSessions = new Array();
        this.conflictStrategy = ConflictStrategy.IGNORE.create();
        this.conflictPrecedence = ConflictPrecedence.FAVOR_NEW;
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
        AssetLoader.enableParser(parserClass);
    };
    /**
     *
     */
    AssetLibraryBundle.prototype.enableParsers = function (parserClasses) {
        AssetLoader.enableParsers(parserClasses);
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
                throw new Error('namingStrategy must not be null. To ignore naming, use AssetLibrary.IGNORE');
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
        return new AssetLibraryIterator(this._assets, assetTypeFilter, namespaceFilter, filterFunc);
    };
    /**
     * Loads a file and (optionally) all of its dependencies.
     *
     * @param req The URLRequest object containing the URL of the file to be loaded.
     * @param context An optional context object providing additional parameters for loading
     * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
     * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, AssetLoader will attempt to auto-detect the file type.
     * @return A handle to the retrieved resource.
     */
    AssetLibraryBundle.prototype.load = function (req, context, ns, parser) {
        if (context === void 0) { context = null; }
        if (ns === void 0) { ns = null; }
        if (parser === void 0) { parser = null; }
        var loader = new AssetLoader();
        if (!this._loadingSessions)
            this._loadingSessions = new Array();
        this._loadingSessions.push(loader);
        loader.addEventListener(LoaderEvent.RESOURCE_COMPLETE, this._onResourceCompleteDelegate);
        loader.addEventListener(AssetEvent.TEXTURE_SIZE_ERROR, this._onTextureSizeErrorDelegate);
        loader.addEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
        // Error are handled separately (see documentation for addErrorHandler)
        loader._iAddErrorHandler(this._onLoadErrorDelegate);
        loader._iAddParseErrorHandler(this._onParseErrorDelegate);
        return loader.load(req, context, ns, parser);
    };
    /**
     * Loads a resource from existing data in memory.
     *
     * @param data The data object containing all resource information.
     * @param context An optional context object providing additional parameters for loading
     * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
     * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, AssetLoader will attempt to auto-detect the file type.
     * @return A handle to the retrieved resource.
     */
    AssetLibraryBundle.prototype.loadData = function (data, context, ns, parser) {
        if (context === void 0) { context = null; }
        if (ns === void 0) { ns = null; }
        if (parser === void 0) { parser = null; }
        var loader = new AssetLoader();
        if (!this._loadingSessions)
            this._loadingSessions = new Array();
        this._loadingSessions.push(loader);
        loader.addEventListener(LoaderEvent.RESOURCE_COMPLETE, this._onResourceCompleteDelegate);
        loader.addEventListener(AssetEvent.TEXTURE_SIZE_ERROR, this._onTextureSizeErrorDelegate);
        loader.addEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
        // Error are handled separately (see documentation for addErrorHandler)
        loader._iAddErrorHandler(this._onLoadErrorDelegate);
        loader._iAddParseErrorHandler(this._onParseErrorDelegate);
        return loader.loadData(data, '', context, ns, parser);
    };
    /**
     *
     */
    AssetLibraryBundle.prototype.getAsset = function (name, ns) {
        //var asset : IAsset;
        if (ns === void 0) { ns = null; }
        if (this._assetDictDirty)
            this.rehashAssetDict();
        if (ns == null)
            ns = AssetBase.DEFAULT_NAMESPACE;
        if (!this._assetDictionary.hasOwnProperty(ns))
            return null;
        return this._assetDictionary[ns][name];
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
        ns = asset.assetNamespace || AssetBase.DEFAULT_NAMESPACE;
        if (old != null)
            this._strategy.resolveConflict(asset, old, this._assetDictionary[ns], this._strategyPreference);
        //create unique-id (for now this is used in AwayBuilder only
        //asset.id = IDUtil.createUID();
        // Add it
        this._assets.push(asset);
        if (!this._assetDictionary.hasOwnProperty(ns))
            this._assetDictionary[ns] = new Object();
        this._assetDictionary[ns][asset.name] = asset;
        asset.addEventListener(AssetEvent.ASSET_RENAME, this._onAssetRenameDelegate);
        asset.addEventListener(AssetEvent.ASSET_CONFLICT_RESOLVED, this._onAssetConflictResolvedDelegate);
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
        asset.removeEventListener(AssetEvent.ASSET_RENAME, this._onAssetRenameDelegate);
        asset.removeEventListener(AssetEvent.ASSET_CONFLICT_RESOLVED, this._onAssetConflictResolvedDelegate);
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
            for (var c = 0; c < this._assets.length; c++) {
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
            ns = AssetBase.DEFAULT_NAMESPACE;
        for (var d = 0; d < old_assets.length; d++) {
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
    AssetLibraryBundle.prototype.stopAllLoadingSessions = function () {
        var i;
        if (!this._loadingSessions)
            this._loadingSessions = new Array();
        var length = this._loadingSessions.length;
        for (i = 0; i < length; i++)
            this.killLoadingSession(this._loadingSessions[i]);
        this._loadingSessions = null;
    };
    AssetLibraryBundle.prototype.rehashAssetDict = function () {
        var asset;
        this._assetDictionary = {};
        var l = this._assets.length;
        for (var c = 0; c < l; c++) {
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
        if (this.hasEventListener(IOErrorEvent.IO_ERROR)) {
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
        if (this.hasEventListener(ParserEvent.PARSE_ERROR)) {
            this.dispatchEvent(event);
            return true;
        }
        else {
            return false;
        }
    };
    AssetLibraryBundle.prototype.onAssetComplete = function (event) {
        // Only add asset to library the first time.
        if (event.type == AssetEvent.ASSET_COMPLETE)
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
        var _this = this;
        var loader = event.target;
        this.dispatchEvent(event);
        var index = this._loadingSessions.indexOf(loader);
        this._loadingSessions.splice(index, 1);
        // Add loader to a garbage array - for a collection sweep and kill
        this._loadingSessionsGarbage.push(loader);
        this._gcTimeoutIID = setTimeout(function () {
            _this.loadingSessionGC();
        }, 100);
    };
    AssetLibraryBundle.prototype.loadingSessionGC = function () {
        var loader;
        while (this._loadingSessionsGarbage.length > 0) {
            loader = this._loadingSessionsGarbage.pop();
            this.killLoadingSession(loader);
        }
        clearTimeout(this._gcTimeoutIID);
        this._gcTimeoutIID = null;
    };
    AssetLibraryBundle.prototype.killLoadingSession = function (loader) {
        loader.removeEventListener(LoaderEvent.RESOURCE_COMPLETE, this._onResourceCompleteDelegate);
        loader.removeEventListener(AssetEvent.TEXTURE_SIZE_ERROR, this._onTextureSizeErrorDelegate);
        loader.removeEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
        loader.stop();
    };
    /**
     * Called when unespected error occurs
     */
    /*
     private onResourceError() : void
     {
     var msg:string = "Unexpected parser error";
     if(hasEventListener(LoaderEvent.DEPENDENCY_ERROR)){
     var re:LoaderEvent = new LoaderEvent(LoaderEvent.DEPENDENCY_ERROR, "");
     dispatchEvent(re);
     } else{
     throw new Error(msg);
     }
     }
     */
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
            dict[event.assetPrevName] = null;
            dict[event.asset.name] = event.asset;
        }
    };
    AssetLibraryBundle.prototype.onAssetConflictResolved = function (event) {
        this.dispatchEvent(event.clone());
    };
    AssetLibraryBundle._iInstances = new Object();
    return AssetLibraryBundle;
})(EventDispatcher);
module.exports = AssetLibraryBundle;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeUJ1bmRsZS50cyJdLCJuYW1lcyI6WyJBc3NldExpYnJhcnlCdW5kbGUiLCJBc3NldExpYnJhcnlCdW5kbGUuY29uc3RydWN0b3IiLCJBc3NldExpYnJhcnlCdW5kbGUuZ2V0SW5zdGFuY2UiLCJBc3NldExpYnJhcnlCdW5kbGUuZW5hYmxlUGFyc2VyIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLmVuYWJsZVBhcnNlcnMiLCJBc3NldExpYnJhcnlCdW5kbGUuY29uZmxpY3RTdHJhdGVneSIsIkFzc2V0TGlicmFyeUJ1bmRsZS5jb25mbGljdFByZWNlZGVuY2UiLCJBc3NldExpYnJhcnlCdW5kbGUuY3JlYXRlSXRlcmF0b3IiLCJBc3NldExpYnJhcnlCdW5kbGUubG9hZCIsIkFzc2V0TGlicmFyeUJ1bmRsZS5sb2FkRGF0YSIsIkFzc2V0TGlicmFyeUJ1bmRsZS5nZXRBc3NldCIsIkFzc2V0TGlicmFyeUJ1bmRsZS5hZGRBc3NldCIsIkFzc2V0TGlicmFyeUJ1bmRsZS5yZW1vdmVBc3NldCIsIkFzc2V0TGlicmFyeUJ1bmRsZS5yZW1vdmVBc3NldEJ5TmFtZSIsIkFzc2V0TGlicmFyeUJ1bmRsZS5yZW1vdmVBbGxBc3NldHMiLCJBc3NldExpYnJhcnlCdW5kbGUucmVtb3ZlTmFtZXNwYWNlQXNzZXRzIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLnJlbW92ZUFzc2V0RnJvbURpY3QiLCJBc3NldExpYnJhcnlCdW5kbGUuc3RvcEFsbExvYWRpbmdTZXNzaW9ucyIsIkFzc2V0TGlicmFyeUJ1bmRsZS5yZWhhc2hBc3NldERpY3QiLCJBc3NldExpYnJhcnlCdW5kbGUub25Mb2FkRXJyb3IiLCJBc3NldExpYnJhcnlCdW5kbGUub25QYXJzZUVycm9yIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLm9uQXNzZXRDb21wbGV0ZSIsIkFzc2V0TGlicmFyeUJ1bmRsZS5vblRleHR1cmVTaXplRXJyb3IiLCJBc3NldExpYnJhcnlCdW5kbGUub25SZXNvdXJjZUNvbXBsZXRlIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLmxvYWRpbmdTZXNzaW9uR0MiLCJBc3NldExpYnJhcnlCdW5kbGUua2lsbExvYWRpbmdTZXNzaW9uIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLm9uQXNzZXRSZW5hbWUiLCJBc3NldExpYnJhcnlCdW5kbGUub25Bc3NldENvbmZsaWN0UmVzb2x2ZWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLElBQU8sb0JBQW9CLFdBQVksOENBQThDLENBQUMsQ0FBQztBQUN2RixJQUFPLFdBQVcsV0FBYyxxQ0FBcUMsQ0FBQyxDQUFDO0FBR3ZFLElBQU8sa0JBQWtCLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUNuRixJQUFPLGdCQUFnQixXQUFhLDBDQUEwQyxDQUFDLENBQUM7QUFFaEYsSUFBTyxTQUFTLFdBQWMsbUNBQW1DLENBQUMsQ0FBQztBQUVuRSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBQzNELElBQU8sVUFBVSxXQUFjLG1DQUFtQyxDQUFDLENBQUM7QUFDcEUsSUFBTyxZQUFZLFdBQWMscUNBQXFDLENBQUMsQ0FBQztBQUN4RSxJQUFPLFdBQVcsV0FBYyxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ3RFLElBQU8sZUFBZSxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFDN0UsSUFBTyxXQUFXLFdBQWMsb0NBQW9DLENBQUMsQ0FBQztBQUd0RSxBQUtBOzs7O0dBREc7SUFDRyxrQkFBa0I7SUFBU0EsVUFBM0JBLGtCQUFrQkEsVUFBd0JBO0lBcUIvQ0E7Ozs7T0FJR0E7SUFDSEEsU0ExQktBLGtCQUFrQkE7UUFBeEJDLGlCQW9rQkNBO1FBeGlCQ0EsaUJBQU9BLENBQUNBO1FBbEJEQSw0QkFBdUJBLEdBQXNCQSxJQUFJQSxLQUFLQSxFQUFlQSxDQUFDQTtRQW9CN0VBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLEtBQUtBLEVBQVVBLEVBQUNBLHNCQUFzQkE7UUFDekRBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FB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QUtBLENBQUNBLEtBQUtBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBO1lBRXBFQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDaEJBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLGFBQWFBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1lBQ2pDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUN0Q0EsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFTzFCLG9EQUF1QkEsR0FBL0JBLFVBQWdDQSxLQUFnQkE7UUFFL0MyQixJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQTtJQUNuQ0EsQ0FBQ0E7SUFqa0JhM0IsOEJBQVdBLEdBQVVBLElBQUlBLE1BQU1BLEVBQUVBLENBQUNBO0lBa2tCakRBLHlCQUFDQTtBQUFEQSxDQXBrQkEsQUFva0JDQSxFQXBrQmdDLGVBQWUsRUFva0IvQztBQUVELEFBQTRCLGlCQUFuQixrQkFBa0IsQ0FBQyIsImZpbGUiOiJsaWJyYXJ5L0Fzc2V0TGlicmFyeUJ1bmRsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVVJMUmVxdWVzdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxSZXF1ZXN0XCIpO1xuaW1wb3J0IEFzc2V0TGlicmFyeVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMaWJyYXJ5XCIpO1xuaW1wb3J0IEFzc2V0TGlicmFyeUl0ZXJhdG9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeUl0ZXJhdG9yXCIpO1xuaW1wb3J0IEFzc2V0TG9hZGVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldExvYWRlclwiKTtcbmltcG9ydCBBc3NldExvYWRlclRva2VuXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMb2FkZXJUb2tlblwiKTtcbmltcG9ydCBBc3NldExvYWRlckNvbnRleHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMb2FkZXJDb250ZXh0XCIpO1xuaW1wb3J0IENvbmZsaWN0UHJlY2VkZW5jZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Db25mbGljdFByZWNlZGVuY2VcIik7XG5pbXBvcnQgQ29uZmxpY3RTdHJhdGVneVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0NvbmZsaWN0U3RyYXRlZ3lcIik7XG5pbXBvcnQgQ29uZmxpY3RTdHJhdGVneUJhc2VcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQ29uZmxpY3RTdHJhdGVneUJhc2VcIik7XG5pbXBvcnQgQXNzZXRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldEJhc2VcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBFcnJvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Vycm9yXCIpO1xuaW1wb3J0IEFzc2V0RXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvQXNzZXRFdmVudFwiKTtcbmltcG9ydCBJT0Vycm9yRXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvSU9FcnJvckV2ZW50XCIpO1xuaW1wb3J0IExvYWRlckV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0xvYWRlckV2ZW50XCIpO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCIpO1xuaW1wb3J0IFBhcnNlckV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL1BhcnNlckV2ZW50XCIpO1xuaW1wb3J0IFBhcnNlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlckJhc2VcIik7XG5cbi8qKlxuICogQXNzZXRMaWJyYXJ5QnVuZGxlIGVuZm9yY2VzIGEgbXVsdGl0b24gcGF0dGVybiBhbmQgaXMgbm90IGludGVuZGVkIHRvIGJlIGluc3RhbmNlZCBkaXJlY3RseS5cbiAqIEl0cyBwdXJwb3NlIGlzIHRvIGNyZWF0ZSBhIGNvbnRhaW5lciBmb3IgM0QgZGF0YSBtYW5hZ2VtZW50LCBib3RoIGJlZm9yZSBhbmQgYWZ0ZXIgcGFyc2luZy5cbiAqIElmIHlvdSBhcmUgaW50ZXJlc3RlZCBpbiBjcmVhdGluZyBtdWx0aXBsZSBsaWJyYXJ5IGJ1bmRsZXMsIHBsZWFzZSB1c2UgdGhlIDxjb2RlPmdldEluc3RhbmNlKCk8L2NvZGU+IG1ldGhvZC5cbiAqL1xuY2xhc3MgQXNzZXRMaWJyYXJ5QnVuZGxlIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyXG57XG5cdHB1YmxpYyBzdGF0aWMgX2lJbnN0YW5jZXM6T2JqZWN0ID0gbmV3IE9iamVjdCgpO1xuXG5cdHByaXZhdGUgX2xvYWRpbmdTZXNzaW9uczpBcnJheTxBc3NldExvYWRlcj47XG5cdHByaXZhdGUgX3N0cmF0ZWd5OkNvbmZsaWN0U3RyYXRlZ3lCYXNlO1xuXHRwcml2YXRlIF9zdHJhdGVneVByZWZlcmVuY2U6c3RyaW5nO1xuXHRwcml2YXRlIF9hc3NldHM6QXJyYXk8SUFzc2V0Pjtcblx0cHJpdmF0ZSBfYXNzZXREaWN0aW9uYXJ5Ok9iamVjdDtcblx0cHJpdmF0ZSBfYXNzZXREaWN0RGlydHk6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfbG9hZGluZ1Nlc3Npb25zR2FyYmFnZTpBcnJheTxBc3NldExvYWRlcj4gPSBuZXcgQXJyYXk8QXNzZXRMb2FkZXI+KCk7XG5cdHByaXZhdGUgX2djVGltZW91dElJRDpudW1iZXI7XG5cblx0cHJpdmF0ZSBfb25Bc3NldFJlbmFtZURlbGVnYXRlOihldmVudDpBc3NldEV2ZW50KSA9PiB2b2lkO1xuXHRwcml2YXRlIF9vbkFzc2V0Q29uZmxpY3RSZXNvbHZlZERlbGVnYXRlOihldmVudDpBc3NldEV2ZW50KSA9PiB2b2lkO1xuXHRwcml2YXRlIF9vblJlc291cmNlQ29tcGxldGVEZWxlZ2F0ZTooZXZlbnQ6TG9hZGVyRXZlbnQpID0+IHZvaWQ7XG5cdHByaXZhdGUgX29uVGV4dHVyZVNpemVFcnJvckRlbGVnYXRlOihldmVudDpBc3NldEV2ZW50KSA9PiB2b2lkO1xuXHRwcml2YXRlIF9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZTooZXZlbnQ6QXNzZXRFdmVudCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfb25Mb2FkRXJyb3JEZWxlZ2F0ZTooZXZlbnQ6SU9FcnJvckV2ZW50KSA9PiBib29sZWFuO1xuXHRwcml2YXRlIF9vblBhcnNlRXJyb3JEZWxlZ2F0ZTooZXZlbnQ6UGFyc2VyRXZlbnQpID0+IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgPGNvZGU+QXNzZXRMaWJyYXJ5QnVuZGxlPC9jb2RlPiBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBtZSBBIG11bHRpdG9uIGVuZm9yY2VyIGZvciB0aGUgQXNzZXRMaWJyYXJ5QnVuZGxlIGVuc3VyaW5nIGl0IGNhbm5ub3QgYmUgaW5zdGFuY2VkLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX2Fzc2V0cyA9IG5ldyBBcnJheTxJQXNzZXQ+KCk7Ly9uZXcgVmVjdG9yLjxJQXNzZXQ+O1xuXHRcdHRoaXMuX2Fzc2V0RGljdGlvbmFyeSA9IG5ldyBPYmplY3QoKTtcblx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMgPSBuZXcgQXJyYXk8QXNzZXRMb2FkZXI+KCk7XG5cblx0XHR0aGlzLmNvbmZsaWN0U3RyYXRlZ3kgPSBDb25mbGljdFN0cmF0ZWd5LklHTk9SRS5jcmVhdGUoKTtcblx0XHR0aGlzLmNvbmZsaWN0UHJlY2VkZW5jZSA9IENvbmZsaWN0UHJlY2VkZW5jZS5GQVZPUl9ORVc7XG5cblx0XHR0aGlzLl9vbkFzc2V0UmVuYW1lRGVsZWdhdGUgPSAoZXZlbnQ6QXNzZXRFdmVudCkgPT4gdGhpcy5vbkFzc2V0UmVuYW1lKGV2ZW50KTtcblx0XHR0aGlzLl9vbkFzc2V0Q29uZmxpY3RSZXNvbHZlZERlbGVnYXRlID0gKGV2ZW50OkFzc2V0RXZlbnQpID0+IHRoaXMub25Bc3NldENvbmZsaWN0UmVzb2x2ZWQoZXZlbnQpO1xuXHRcdHRoaXMuX29uUmVzb3VyY2VDb21wbGV0ZURlbGVnYXRlID0gKGV2ZW50OkxvYWRlckV2ZW50KSA9PiB0aGlzLm9uUmVzb3VyY2VDb21wbGV0ZShldmVudCk7XG5cdFx0dGhpcy5fb25UZXh0dXJlU2l6ZUVycm9yRGVsZWdhdGUgPSAoZXZlbnQ6QXNzZXRFdmVudCkgPT4gdGhpcy5vblRleHR1cmVTaXplRXJyb3IoZXZlbnQpO1xuXHRcdHRoaXMuX29uQXNzZXRDb21wbGV0ZURlbGVnYXRlID0gKGV2ZW50OkFzc2V0RXZlbnQpID0+IHRoaXMub25Bc3NldENvbXBsZXRlKGV2ZW50KTtcblx0XHR0aGlzLl9vbkxvYWRFcnJvckRlbGVnYXRlID0gKGV2ZW50OklPRXJyb3JFdmVudCkgPT4gdGhpcy5vbkxvYWRFcnJvcihldmVudCk7XG5cdFx0dGhpcy5fb25QYXJzZUVycm9yRGVsZWdhdGUgPSAoZXZlbnQ6UGFyc2VyRXZlbnQpID0+IHRoaXMub25QYXJzZUVycm9yKGV2ZW50KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIEFzc2V0TGlicmFyeUJ1bmRsZSBpbnN0YW5jZS4gSWYgbm8ga2V5IGlzIGdpdmVuLCByZXR1cm5zIHRoZSBkZWZhdWx0IGJ1bmRsZSBpbnN0YW5jZSAod2hpY2ggaXNcblx0ICogc2ltaWxhciB0byB1c2luZyB0aGUgQXNzZXRMaWJyYXJ5QnVuZGxlIGFzIGEgc2luZ2xldG9uLikgVG8ga2VlcCBzZXZlcmFsIHNlcGFyYXRlZCBsaWJyYXJ5IGJ1bmRsZXMsXG5cdCAqIHBhc3MgYSBzdHJpbmcga2V5IHRvIHRoaXMgbWV0aG9kIHRvIGRlZmluZSB3aGljaCBidW5kbGUgc2hvdWxkIGJlIHJldHVybmVkLiBUaGlzIGlzXG5cdCAqIHJlZmVycmVkIHRvIGFzIHVzaW5nIHRoZSBBc3NldExpYnJhcnkgYXMgYSBtdWx0aXRvbi5cblx0ICpcblx0ICogQHBhcmFtIGtleSBEZWZpbmVzIHdoaWNoIG11bHRpdG9uIGluc3RhbmNlIHNob3VsZCBiZSByZXR1cm5lZC5cblx0ICogQHJldHVybiBBbiBpbnN0YW5jZSBvZiB0aGUgYXNzZXQgbGlicmFyeVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZShrZXk6c3RyaW5nID0gJ2RlZmF1bHQnKTpBc3NldExpYnJhcnlCdW5kbGVcblx0e1xuXHRcdGlmICgha2V5KVxuXHRcdFx0a2V5ID0gJ2RlZmF1bHQnO1xuXG5cdFx0aWYgKCFBc3NldExpYnJhcnlCdW5kbGUuX2lJbnN0YW5jZXMuaGFzT3duUHJvcGVydHkoa2V5KSlcblx0XHRcdEFzc2V0TGlicmFyeUJ1bmRsZS5faUluc3RhbmNlc1trZXldID0gbmV3IEFzc2V0TGlicmFyeUJ1bmRsZSgpO1xuXG5cdFx0cmV0dXJuIEFzc2V0TGlicmFyeUJ1bmRsZS5faUluc3RhbmNlc1trZXldO1xuXG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBlbmFibGVQYXJzZXIocGFyc2VyQ2xhc3M6T2JqZWN0KVxuXHR7XG5cdFx0QXNzZXRMb2FkZXIuZW5hYmxlUGFyc2VyKHBhcnNlckNsYXNzKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGVuYWJsZVBhcnNlcnMocGFyc2VyQ2xhc3NlczpPYmplY3RbXSlcblx0e1xuXHRcdEFzc2V0TG9hZGVyLmVuYWJsZVBhcnNlcnMocGFyc2VyQ2xhc3Nlcyk7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB3aGljaCBzdHJhdGVneSBzaG91bGQgYmUgdXNlZCBmb3IgcmVzb2x2aW5nIG5hbWluZyBjb25mbGljdHMsIHdoZW4gdHdvIGxpYnJhcnlcblx0ICogYXNzZXRzIGFyZSBnaXZlbiB0aGUgc2FtZSBuYW1lLiBCeSBkZWZhdWx0LCA8Y29kZT5Db25mbGljdFN0cmF0ZWd5LkFQUEVORF9OVU1fU1VGRklYPC9jb2RlPlxuXHQgKiBpcyB1c2VkIHdoaWNoIG1lYW5zIHRoYXQgYSBudW1lcmljIHN1ZmZpeCBpcyBhcHBlbmRlZCB0byBvbmUgb2YgdGhlIGFzc2V0cy4gVGhlXG5cdCAqIDxjb2RlPmNvbmZsaWN0UHJlY2VkZW5jZTwvY29kZT4gcHJvcGVydHkgZGVmaW5lcyB3aGljaCBvZiB0aGUgdHdvIGNvbmZsaWN0aW5nIGFzc2V0cyB3aWxsXG5cdCAqIGJlIHJlbmFtZWQuXG5cdCAqXG5cdCAqIEBzZWUgbmFtaW5nLkNvbmZsaWN0U3RyYXRlZ3lcblx0ICogQHNlZSBBc3NldExpYnJhcnkuY29uZmxpY3RQcmVjZWRlbmNlXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGNvbmZsaWN0U3RyYXRlZ3koKTpDb25mbGljdFN0cmF0ZWd5QmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3N0cmF0ZWd5O1xuXHR9XG5cblx0cHVibGljIHNldCBjb25mbGljdFN0cmF0ZWd5KHZhbDpDb25mbGljdFN0cmF0ZWd5QmFzZSlcblx0e1xuXG5cdFx0aWYgKCF2YWwpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ25hbWluZ1N0cmF0ZWd5IG11c3Qgbm90IGJlIG51bGwuIFRvIGlnbm9yZSBuYW1pbmcsIHVzZSBBc3NldExpYnJhcnkuSUdOT1JFJyk7XG5cblx0XHR0aGlzLl9zdHJhdGVneSA9IHZhbC5jcmVhdGUoKTtcblxuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgd2hpY2ggYXNzZXQgc2hvdWxkIGhhdmUgcHJlY2VkZW5jZSB3aGVuIHJlc29sdmluZyBhIG5hbWluZyBjb25mbGljdCBiZXR3ZWVuXG5cdCAqIHR3byBhc3NldHMgb2Ygd2hpY2ggb25lIGhhcyBqdXN0IGJlZW4gcmVuYW1lZCBieSB0aGUgdXNlciBvciBieSBhIHBhcnNlci4gQnkgZGVmYXVsdFxuXHQgKiA8Y29kZT5Db25mbGljdFByZWNlZGVuY2UuRkFWT1JfTkVXPC9jb2RlPiBpcyB1c2VkLCBtZWFuaW5nIHRoYXQgdGhlIG5ld2x5IHJlbmFtZWRcblx0ICogYXNzZXQgd2lsbCBrZWVwIGl0J3MgbmV3IG5hbWUgd2hpbGUgdGhlIG9sZGVyIGFzc2V0IGdldHMgcmVuYW1lZCB0byBub3QgY29uZmxpY3QuXG5cdCAqXG5cdCAqIFRoaXMgcHJvcGVydHkgaXMgaWdub3JlZCBmb3IgY29uZmxpY3Qgc3RyYXRlZ2llcyB0aGF0IGRvIG5vdCBhY3R1YWxseSByZW5hbWUgYW5cblx0ICogYXNzZXQgYXV0b21hdGljYWxseSwgc3VjaCBhcyBDb25mbGljdFN0cmF0ZWd5LklHTk9SRSBhbmQgQ29uZmxpY3RTdHJhdGVneS5USFJPV19FUlJPUi5cblx0ICpcblx0ICogQHNlZSBhd2F5LmxpYnJhcnkuQ29uZmxpY3RQcmVjZWRlbmNlXG5cdCAqIEBzZWUgYXdheS5saWJyYXJ5LkNvbmZsaWN0U3RyYXRlZ3lcblx0ICovXG5cdHB1YmxpYyBnZXQgY29uZmxpY3RQcmVjZWRlbmNlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc3RyYXRlZ3lQcmVmZXJlbmNlO1xuXHR9XG5cblx0cHVibGljIHNldCBjb25mbGljdFByZWNlZGVuY2UodmFsOnN0cmluZylcblx0e1xuXHRcdHRoaXMuX3N0cmF0ZWd5UHJlZmVyZW5jZSA9IHZhbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYW4gQXNzZXRMaWJyYXJ5SXRlcmF0b3IgaW5zdGFuY2UgdGhhdCBjYW4gYmUgdXNlZCB0byBpdGVyYXRlIG92ZXIgdGhlIGFzc2V0c1xuXHQgKiBpbiB0aGlzIGFzc2V0IGxpYnJhcnkgaW5zdGFuY2UuIFRoZSBpdGVyYXRvciBjYW4gZmlsdGVyIGFzc2V0cyBvbiBhc3NldCB0eXBlIGFuZC9vclxuXHQgKiBuYW1lc3BhY2UuIEEgXCJudWxsXCIgZmlsdGVyIHZhbHVlIG1lYW5zIG5vIGZpbHRlciBvZiB0aGF0IHR5cGUgaXMgdXNlZC5cblx0ICpcblx0ICogQHBhcmFtIGFzc2V0VHlwZUZpbHRlciBBc3NldCB0eXBlIHRvIGZpbHRlciBvbiAoZnJvbSB0aGUgQXNzZXRUeXBlIGVudW0gY2xhc3MuKSBVc2Vcblx0ICogbnVsbCB0byBub3QgZmlsdGVyIG9uIGFzc2V0IHR5cGUuXG5cdCAqIEBwYXJhbSBuYW1lc3BhY2VGaWx0ZXIgTmFtZXNwYWNlIHRvIGZpbHRlciBvbi4gVXNlIG51bGwgdG8gbm90IGZpbHRlciBvbiBuYW1lc3BhY2UuXG5cdCAqIEBwYXJhbSBmaWx0ZXJGdW5jIENhbGxiYWNrIGZ1bmN0aW9uIHRvIHVzZSB3aGVuIGRlY2lkaW5nIHdoZXRoZXIgYW4gYXNzZXQgc2hvdWxkIGJlXG5cdCAqIGluY2x1ZGVkIGluIHRoZSBpdGVyYXRpb24gb3Igbm90LiBUaGlzIG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHNpbmdsZVxuXHQgKiBwYXJhbWV0ZXIgb2YgdHlwZSBJQXNzZXQgYW5kIHJldHVybnMgYSBib29sZWFuIHdoZXJlIHRydWUgbWVhbnMgaXQgc2hvdWxkIGJlIGluY2x1ZGVkLlxuXHQgKlxuXHQgKiBAc2VlIGF3YXkubGlicmFyeS5Bc3NldFR5cGVcblx0ICovXG5cdHB1YmxpYyBjcmVhdGVJdGVyYXRvcihhc3NldFR5cGVGaWx0ZXI6c3RyaW5nID0gbnVsbCwgbmFtZXNwYWNlRmlsdGVyOnN0cmluZyA9IG51bGwsIGZpbHRlckZ1bmMgPSBudWxsKTpBc3NldExpYnJhcnlJdGVyYXRvclxuXHR7XG5cdFx0cmV0dXJuIG5ldyBBc3NldExpYnJhcnlJdGVyYXRvcih0aGlzLl9hc3NldHMsIGFzc2V0VHlwZUZpbHRlciwgbmFtZXNwYWNlRmlsdGVyLCBmaWx0ZXJGdW5jKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBMb2FkcyBhIGZpbGUgYW5kIChvcHRpb25hbGx5KSBhbGwgb2YgaXRzIGRlcGVuZGVuY2llcy5cblx0ICpcblx0ICogQHBhcmFtIHJlcSBUaGUgVVJMUmVxdWVzdCBvYmplY3QgY29udGFpbmluZyB0aGUgVVJMIG9mIHRoZSBmaWxlIHRvIGJlIGxvYWRlZC5cblx0ICogQHBhcmFtIGNvbnRleHQgQW4gb3B0aW9uYWwgY29udGV4dCBvYmplY3QgcHJvdmlkaW5nIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgbG9hZGluZ1xuXHQgKiBAcGFyYW0gbnMgQW4gb3B0aW9uYWwgbmFtZXNwYWNlIHN0cmluZyB1bmRlciB3aGljaCB0aGUgZmlsZSBpcyB0byBiZSBsb2FkZWQsIGFsbG93aW5nIHRoZSBkaWZmZXJlbnRpYXRpb24gb2YgdHdvIHJlc291cmNlcyB3aXRoIGlkZW50aWNhbCBhc3NldHNcblx0ICogQHBhcmFtIHBhcnNlciBBbiBvcHRpb25hbCBwYXJzZXIgb2JqZWN0IGZvciB0cmFuc2xhdGluZyB0aGUgbG9hZGVkIGRhdGEgaW50byBhIHVzYWJsZSByZXNvdXJjZS4gSWYgbm90IHByb3ZpZGVkLCBBc3NldExvYWRlciB3aWxsIGF0dGVtcHQgdG8gYXV0by1kZXRlY3QgdGhlIGZpbGUgdHlwZS5cblx0ICogQHJldHVybiBBIGhhbmRsZSB0byB0aGUgcmV0cmlldmVkIHJlc291cmNlLlxuXHQgKi9cblx0cHVibGljIGxvYWQocmVxOlVSTFJlcXVlc3QsIGNvbnRleHQ6QXNzZXRMb2FkZXJDb250ZXh0ID0gbnVsbCwgbnM6c3RyaW5nID0gbnVsbCwgcGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKTpBc3NldExvYWRlclRva2VuXG5cdHtcblx0XHR2YXIgbG9hZGVyOkFzc2V0TG9hZGVyID0gbmV3IEFzc2V0TG9hZGVyKCk7XG5cblx0XHRpZiAoIXRoaXMuX2xvYWRpbmdTZXNzaW9ucylcblx0XHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9ucyA9IG5ldyBBcnJheTxBc3NldExvYWRlcj4oKTtcblxuXHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9ucy5wdXNoKGxvYWRlcik7XG5cblx0XHRsb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihMb2FkZXJFdmVudC5SRVNPVVJDRV9DT01QTEVURSwgdGhpcy5fb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGUpO1xuXHRcdGxvYWRlci5hZGRFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuVEVYVFVSRV9TSVpFX0VSUk9SLCB0aGlzLl9vblRleHR1cmVTaXplRXJyb3JEZWxlZ2F0ZSk7XG5cdFx0bG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSwgdGhpcy5fb25Bc3NldENvbXBsZXRlRGVsZWdhdGUpO1xuXG5cdFx0Ly8gRXJyb3IgYXJlIGhhbmRsZWQgc2VwYXJhdGVseSAoc2VlIGRvY3VtZW50YXRpb24gZm9yIGFkZEVycm9ySGFuZGxlcilcblx0XHRsb2FkZXIuX2lBZGRFcnJvckhhbmRsZXIodGhpcy5fb25Mb2FkRXJyb3JEZWxlZ2F0ZSk7XG5cdFx0bG9hZGVyLl9pQWRkUGFyc2VFcnJvckhhbmRsZXIodGhpcy5fb25QYXJzZUVycm9yRGVsZWdhdGUpO1xuXG5cdFx0cmV0dXJuIGxvYWRlci5sb2FkKHJlcSwgY29udGV4dCwgbnMsIHBhcnNlcik7XG5cdH1cblxuXHQvKipcblx0ICogTG9hZHMgYSByZXNvdXJjZSBmcm9tIGV4aXN0aW5nIGRhdGEgaW4gbWVtb3J5LlxuXHQgKlxuXHQgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSBvYmplY3QgY29udGFpbmluZyBhbGwgcmVzb3VyY2UgaW5mb3JtYXRpb24uXG5cdCAqIEBwYXJhbSBjb250ZXh0IEFuIG9wdGlvbmFsIGNvbnRleHQgb2JqZWN0IHByb3ZpZGluZyBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGxvYWRpbmdcblx0ICogQHBhcmFtIG5zIEFuIG9wdGlvbmFsIG5hbWVzcGFjZSBzdHJpbmcgdW5kZXIgd2hpY2ggdGhlIGZpbGUgaXMgdG8gYmUgbG9hZGVkLCBhbGxvd2luZyB0aGUgZGlmZmVyZW50aWF0aW9uIG9mIHR3byByZXNvdXJjZXMgd2l0aCBpZGVudGljYWwgYXNzZXRzXG5cdCAqIEBwYXJhbSBwYXJzZXIgQW4gb3B0aW9uYWwgcGFyc2VyIG9iamVjdCBmb3IgdHJhbnNsYXRpbmcgdGhlIGxvYWRlZCBkYXRhIGludG8gYSB1c2FibGUgcmVzb3VyY2UuIElmIG5vdCBwcm92aWRlZCwgQXNzZXRMb2FkZXIgd2lsbCBhdHRlbXB0IHRvIGF1dG8tZGV0ZWN0IHRoZSBmaWxlIHR5cGUuXG5cdCAqIEByZXR1cm4gQSBoYW5kbGUgdG8gdGhlIHJldHJpZXZlZCByZXNvdXJjZS5cblx0ICovXG5cdHB1YmxpYyBsb2FkRGF0YShkYXRhOmFueSwgY29udGV4dDpBc3NldExvYWRlckNvbnRleHQgPSBudWxsLCBuczpzdHJpbmcgPSBudWxsLCBwYXJzZXI6UGFyc2VyQmFzZSA9IG51bGwpOkFzc2V0TG9hZGVyVG9rZW5cblx0e1xuXHRcdHZhciBsb2FkZXI6QXNzZXRMb2FkZXIgPSBuZXcgQXNzZXRMb2FkZXIoKTtcblxuXHRcdGlmICghdGhpcy5fbG9hZGluZ1Nlc3Npb25zKVxuXHRcdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zID0gbmV3IEFycmF5PEFzc2V0TG9hZGVyPigpO1xuXG5cdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zLnB1c2gobG9hZGVyKTtcblxuXHRcdGxvYWRlci5hZGRFdmVudExpc3RlbmVyKExvYWRlckV2ZW50LlJFU09VUkNFX0NPTVBMRVRFLCB0aGlzLl9vblJlc291cmNlQ29tcGxldGVEZWxlZ2F0ZSk7XG5cdFx0bG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5URVhUVVJFX1NJWkVfRVJST1IsIHRoaXMuX29uVGV4dHVyZVNpemVFcnJvckRlbGVnYXRlKTtcblx0XHRsb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCB0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSk7XG5cblx0XHQvLyBFcnJvciBhcmUgaGFuZGxlZCBzZXBhcmF0ZWx5IChzZWUgZG9jdW1lbnRhdGlvbiBmb3IgYWRkRXJyb3JIYW5kbGVyKVxuXHRcdGxvYWRlci5faUFkZEVycm9ySGFuZGxlcih0aGlzLl9vbkxvYWRFcnJvckRlbGVnYXRlKTtcblx0XHRsb2FkZXIuX2lBZGRQYXJzZUVycm9ySGFuZGxlcih0aGlzLl9vblBhcnNlRXJyb3JEZWxlZ2F0ZSk7XG5cblx0XHRyZXR1cm4gbG9hZGVyLmxvYWREYXRhKGRhdGEsICcnLCBjb250ZXh0LCBucywgcGFyc2VyKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldEFzc2V0KG5hbWU6c3RyaW5nLCBuczpzdHJpbmcgPSBudWxsKTpJQXNzZXRcblx0e1xuXHRcdC8vdmFyIGFzc2V0IDogSUFzc2V0O1xuXG5cdFx0aWYgKHRoaXMuX2Fzc2V0RGljdERpcnR5KVxuXHRcdFx0dGhpcy5yZWhhc2hBc3NldERpY3QoKTtcblxuXHRcdGlmIChucyA9PSBudWxsKVxuXHRcdFx0bnMgPSBBc3NldEJhc2UuREVGQVVMVF9OQU1FU1BBQ0U7XG5cblx0XHRpZiAoIXRoaXMuX2Fzc2V0RGljdGlvbmFyeS5oYXNPd25Qcm9wZXJ0eShucykpXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdHJldHVybiB0aGlzLl9hc3NldERpY3Rpb25hcnlbbnNdW25hbWVdO1xuXG5cdH1cblxuXHQvKipcblx0ICogQWRkcyBhbiBhc3NldCB0byB0aGUgYXNzZXQgbGlicmFyeSwgZmlyc3QgbWFraW5nIHN1cmUgdGhhdCBpdCdzIG5hbWUgaXMgdW5pcXVlXG5cdCAqIHVzaW5nIHRoZSBtZXRob2QgZGVmaW5lZCBieSB0aGUgPGNvZGU+Y29uZmxpY3RTdHJhdGVneTwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPmNvbmZsaWN0UHJlY2VkZW5jZTwvY29kZT4gcHJvcGVydGllcy5cblx0ICovXG5cdHB1YmxpYyBhZGRBc3NldChhc3NldDpJQXNzZXQpXG5cdHtcblx0XHR2YXIgbnM6c3RyaW5nO1xuXHRcdHZhciBvbGQ6SUFzc2V0O1xuXG5cdFx0Ly8gQmFpbCBpZiBhc3NldCBoYXMgYWxyZWFkeSBiZWVuIGFkZGVkLlxuXHRcdGlmICh0aGlzLl9hc3NldHMuaW5kZXhPZihhc3NldCkgPj0gMClcblx0XHRcdHJldHVybjtcblxuXHRcdG9sZCA9IHRoaXMuZ2V0QXNzZXQoYXNzZXQubmFtZSwgYXNzZXQuYXNzZXROYW1lc3BhY2UpO1xuXHRcdG5zID0gYXNzZXQuYXNzZXROYW1lc3BhY2UgfHwgQXNzZXRCYXNlLkRFRkFVTFRfTkFNRVNQQUNFO1xuXG5cdFx0aWYgKG9sZCAhPSBudWxsKVxuXHRcdFx0dGhpcy5fc3RyYXRlZ3kucmVzb2x2ZUNvbmZsaWN0KGFzc2V0LCBvbGQsIHRoaXMuX2Fzc2V0RGljdGlvbmFyeVtuc10sIHRoaXMuX3N0cmF0ZWd5UHJlZmVyZW5jZSk7XG5cblx0XHQvL2NyZWF0ZSB1bmlxdWUtaWQgKGZvciBub3cgdGhpcyBpcyB1c2VkIGluIEF3YXlCdWlsZGVyIG9ubHlcblx0XHQvL2Fzc2V0LmlkID0gSURVdGlsLmNyZWF0ZVVJRCgpO1xuXG5cdFx0Ly8gQWRkIGl0XG5cdFx0dGhpcy5fYXNzZXRzLnB1c2goYXNzZXQpO1xuXG5cdFx0aWYgKCF0aGlzLl9hc3NldERpY3Rpb25hcnkuaGFzT3duUHJvcGVydHkobnMpKVxuXHRcdFx0dGhpcy5fYXNzZXREaWN0aW9uYXJ5W25zXSA9IG5ldyBPYmplY3QoKTtcblxuXHRcdHRoaXMuX2Fzc2V0RGljdGlvbmFyeVtuc11bYXNzZXQubmFtZV0gPSBhc3NldDtcblxuXHRcdGFzc2V0LmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9SRU5BTUUsIHRoaXMuX29uQXNzZXRSZW5hbWVEZWxlZ2F0ZSk7XG5cdFx0YXNzZXQuYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTkZMSUNUX1JFU09MVkVELCB0aGlzLl9vbkFzc2V0Q29uZmxpY3RSZXNvbHZlZERlbGVnYXRlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIGFuIGFzc2V0IGZyb20gdGhlIGxpYnJhcnksIGFuZCBvcHRpb25hbGx5IGRpc3Bvc2VzIHRoYXQgYXNzZXQgYnkgY2FsbGluZ1xuXHQgKiBpdCdzIGRpc3Bvc2VBc3NldCgpIG1ldGhvZCAod2hpY2ggZm9yIG1vc3QgYXNzZXRzIGlzIGltcGxlbWVudGVkIGFzIGEgZGVmYXVsdFxuXHQgKiB2ZXJzaW9uIG9mIHRoYXQgdHlwZSdzIGRpc3Bvc2UoKSBtZXRob2QuXG5cdCAqXG5cdCAqIEBwYXJhbSBhc3NldCBUaGUgYXNzZXQgd2hpY2ggc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSB0aGlzIGxpYnJhcnkuXG5cdCAqIEBwYXJhbSBkaXNwb3NlIERlZmluZXMgd2hldGhlciB0aGUgYXNzZXRzIHNob3VsZCBhbHNvIGJlIGRpc3Bvc2VkLlxuXHQgKi9cblx0cHVibGljIHJlbW92ZUFzc2V0KGFzc2V0OklBc3NldCwgZGlzcG9zZTpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdHZhciBpZHg6bnVtYmVyO1xuXG5cdFx0dGhpcy5yZW1vdmVBc3NldEZyb21EaWN0KGFzc2V0KTtcblxuXHRcdGFzc2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9SRU5BTUUsIHRoaXMuX29uQXNzZXRSZW5hbWVEZWxlZ2F0ZSk7XG5cdFx0YXNzZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTkZMSUNUX1JFU09MVkVELCB0aGlzLl9vbkFzc2V0Q29uZmxpY3RSZXNvbHZlZERlbGVnYXRlKTtcblxuXHRcdGlkeCA9IHRoaXMuX2Fzc2V0cy5pbmRleE9mKGFzc2V0KTtcblxuXHRcdGlmIChpZHggPj0gMClcblx0XHRcdHRoaXMuX2Fzc2V0cy5zcGxpY2UoaWR4LCAxKTtcblxuXHRcdGlmIChkaXNwb3NlKVxuXHRcdFx0YXNzZXQuZGlzcG9zZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgYW4gYXNzZXQgd2hpY2ggaXMgc3BlY2lmaWVkIHVzaW5nIG5hbWUgYW5kIG5hbWVzcGFjZS5cblx0ICpcblx0ICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGFzc2V0IHRvIGJlIHJlbW92ZWQuXG5cdCAqIEBwYXJhbSBucyBUaGUgbmFtZXNwYWNlIHRvIHdoaWNoIHRoZSBkZXNpcmVkIGFzc2V0IGJlbG9uZ3MuXG5cdCAqIEBwYXJhbSBkaXNwb3NlIERlZmluZXMgd2hldGhlciB0aGUgYXNzZXRzIHNob3VsZCBhbHNvIGJlIGRpc3Bvc2VkLlxuXHQgKlxuXHQgKiBAc2VlIGF3YXkubGlicmFyeS5Bc3NldExpYnJhcnkucmVtb3ZlQXNzZXQoKVxuXHQgKi9cblx0cHVibGljIHJlbW92ZUFzc2V0QnlOYW1lKG5hbWU6c3RyaW5nLCBuczpzdHJpbmcgPSBudWxsLCBkaXNwb3NlOmJvb2xlYW4gPSB0cnVlKTpJQXNzZXRcblx0e1xuXG5cdFx0dmFyIGFzc2V0OklBc3NldCA9IHRoaXMuZ2V0QXNzZXQobmFtZSwgbnMpO1xuXG5cdFx0aWYgKGFzc2V0KVxuXHRcdFx0dGhpcy5yZW1vdmVBc3NldChhc3NldCwgZGlzcG9zZSk7XG5cblx0XHRyZXR1cm4gYXNzZXQ7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlcyBhbGwgYXNzZXRzIGZyb20gdGhlIGFzc2V0IGxpYnJhcnksIG9wdGlvbmFsbHkgZGlzcG9zaW5nIHRoZW0gYXMgdGhleVxuXHQgKiBhcmUgcmVtb3ZlZC5cblx0ICpcblx0ICogQHBhcmFtIGRpc3Bvc2UgRGVmaW5lcyB3aGV0aGVyIHRoZSBhc3NldHMgc2hvdWxkIGFsc28gYmUgZGlzcG9zZWQuXG5cdCAqL1xuXHRwdWJsaWMgcmVtb3ZlQWxsQXNzZXRzKGRpc3Bvc2U6Ym9vbGVhbiA9IHRydWUpXG5cdHtcblx0XHRpZiAoZGlzcG9zZSkge1xuXHRcdFx0dmFyIGFzc2V0OklBc3NldDtcblxuXHRcdFx0Zm9yICh2YXIgYzpudW1iZXIgPSAwOyBjIDwgdGhpcy5fYXNzZXRzLmxlbmd0aDsgYysrKSB7XG5cdFx0XHRcdGFzc2V0ID0gdGhpcy5fYXNzZXRzWyBjIF07XG5cdFx0XHRcdGFzc2V0LmRpc3Bvc2UoKTtcblx0XHRcdH1cblx0XHRcdC8qXG5cdFx0XHQgZm9yIGVhY2ggKGFzc2V0IGluIF9hc3NldHMpXG5cdFx0XHQgYXNzZXQuZGlzcG9zZSgpO1xuXHRcdFx0ICovXG5cdFx0fVxuXG5cdFx0dGhpcy5fYXNzZXRzLmxlbmd0aCA9IDA7XG5cdFx0dGhpcy5yZWhhc2hBc3NldERpY3QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIGFsbCBhc3NldHMgYmVsb25naW5nIHRvIGEgcGFydGljdWxhciBuYW1lc3BhY2UgKG51bGwgZm9yIGRlZmF1bHQpXG5cdCAqIGZyb20gdGhlIGFzc2V0IGxpYnJhcnksIGFuZCBvcHRpb25hbGwgZGlzcG9zZXMgdGhlbSBieSBjYWxsaW5nIHRoZWlyXG5cdCAqIGRpc3Bvc2VBc3NldCgpIG1ldGhvZC5cblx0ICpcblx0ICogQHBhcmFtIG5zIFRoZSBuYW1lc3BhY2UgZnJvbSB3aGljaCBhbGwgYXNzZXRzIHNob3VsZCBiZSByZW1vdmVkLlxuXHQgKiBAcGFyYW0gZGlzcG9zZSBEZWZpbmVzIHdoZXRoZXIgdGhlIGFzc2V0cyBzaG91bGQgYWxzbyBiZSBkaXNwb3NlZC5cblx0ICpcblx0ICogQHNlZSBhd2F5LmxpYnJhcnkuQXNzZXRMaWJyYXJ5LnJlbW92ZUFzc2V0KClcblx0ICovXG5cdHB1YmxpYyByZW1vdmVOYW1lc3BhY2VBc3NldHMobnM6c3RyaW5nID0gbnVsbCwgZGlzcG9zZTpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdHZhciBpZHg6bnVtYmVyID0gMDtcblx0XHR2YXIgYXNzZXQ6SUFzc2V0O1xuXHRcdHZhciBvbGRfYXNzZXRzOklBc3NldFtdO1xuXG5cdFx0Ly8gRW1wdHkgdGhlIGFzc2V0cyB2ZWN0b3IgYWZ0ZXIgaGF2aW5nIHN0b3JlZCBhIGNvcHkgb2YgaXQuXG5cdFx0Ly8gVGhlIGNvcHkgd2lsbCBiZSBmaWxsZWQgd2l0aCBhbGwgYXNzZXRzIHdoaWNoIHdlcmVuJ3QgcmVtb3ZlZC5cblx0XHRvbGRfYXNzZXRzID0gdGhpcy5fYXNzZXRzLmNvbmNhdCgpO1xuXHRcdHRoaXMuX2Fzc2V0cy5sZW5ndGggPSAwO1xuXG5cdFx0aWYgKG5zID09IG51bGwpXG5cdFx0XHRucyA9IEFzc2V0QmFzZS5ERUZBVUxUX05BTUVTUEFDRTtcblxuXHRcdGZvciAodmFyIGQ6bnVtYmVyID0gMDsgZCA8IG9sZF9hc3NldHMubGVuZ3RoOyBkKyspIHtcblx0XHRcdGFzc2V0ID0gb2xkX2Fzc2V0c1tkXTtcblxuXHRcdFx0Ly8gUmVtb3ZlIGZyb20gZGljdCBpZiBpbiB0aGUgc3VwcGxpZWQgbmFtZXNwYWNlLiBJZiBub3QsXG5cdFx0XHQvLyB0cmFuc2ZlciBvdmVyIHRvIHRoZSBuZXcgdmVjdG9yLlxuXHRcdFx0aWYgKGFzc2V0LmFzc2V0TmFtZXNwYWNlID09IG5zKSB7XG5cdFx0XHRcdGlmIChkaXNwb3NlKVxuXHRcdFx0XHRcdGFzc2V0LmRpc3Bvc2UoKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgYXNzZXQgZnJvbSBkaWN0aW9uYXJ5LCBidXQgZG9uJ3QgdHJ5IHRvIGF1dG8tcmVtb3ZlXG5cdFx0XHRcdC8vIHRoZSBuYW1lc3BhY2UsIHdoaWNoIHdpbGwgdHJpZ2dlciBhbiB1bm5lY2Vzc2FyaWx5IGV4cGVuc2l2ZVxuXHRcdFx0XHQvLyB0ZXN0IHRoYXQgaXMgbm90IG5lZWRlZCBzaW5jZSB3ZSBrbm93IHRoYXQgdGhlIG5hbWVzcGFjZVxuXHRcdFx0XHQvLyB3aWxsIGJlIGVtcHR5IHdoZW4gbG9vcCBmaW5pc2hlcy5cblx0XHRcdFx0dGhpcy5yZW1vdmVBc3NldEZyb21EaWN0KGFzc2V0LCBmYWxzZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9hc3NldHNbaWR4KytdID0gYXNzZXQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Lypcblx0XHQgZm9yIGVhY2ggKGFzc2V0IGluIG9sZF9hc3NldHMpIHtcblx0XHQgLy8gUmVtb3ZlIGZyb20gZGljdCBpZiBpbiB0aGUgc3VwcGxpZWQgbmFtZXNwYWNlLiBJZiBub3QsXG5cdFx0IC8vIHRyYW5zZmVyIG92ZXIgdG8gdGhlIG5ldyB2ZWN0b3IuXG5cdFx0IGlmIChhc3NldC5hc3NldE5hbWVzcGFjZSA9PSBucykge1xuXHRcdCBpZiAoZGlzcG9zZSlcblx0XHQgYXNzZXQuZGlzcG9zZSgpO1xuXG5cdFx0IC8vIFJlbW92ZSBhc3NldCBmcm9tIGRpY3Rpb25hcnksIGJ1dCBkb24ndCB0cnkgdG8gYXV0by1yZW1vdmVcblx0XHQgLy8gdGhlIG5hbWVzcGFjZSwgd2hpY2ggd2lsbCB0cmlnZ2VyIGFuIHVubmVjZXNzYXJpbHkgZXhwZW5zaXZlXG5cdFx0IC8vIHRlc3QgdGhhdCBpcyBub3QgbmVlZGVkIHNpbmNlIHdlIGtub3cgdGhhdCB0aGUgbmFtZXNwYWNlXG5cdFx0IC8vIHdpbGwgYmUgZW1wdHkgd2hlbiBsb29wIGZpbmlzaGVzLlxuXHRcdCByZW1vdmVBc3NldEZyb21EaWN0KGFzc2V0LCBmYWxzZSk7XG5cdFx0IH0gZWxzZVxuXHRcdCBfYXNzZXRzW2lkeCsrXSA9IGFzc2V0O1xuXG5cdFx0IH1cblx0XHQgKi9cblxuXHRcdC8vIFJlbW92ZSBlbXB0eSBuYW1lc3BhY2Vcblx0XHRpZiAodGhpcy5fYXNzZXREaWN0aW9uYXJ5Lmhhc093blByb3BlcnR5KG5zKSlcblx0XHRcdGRlbGV0ZSB0aGlzLl9hc3NldERpY3Rpb25hcnlbbnNdO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVBc3NldEZyb21EaWN0KGFzc2V0OklBc3NldCwgYXV0b1JlbW92ZUVtcHR5TmFtZXNwYWNlOmJvb2xlYW4gPSB0cnVlKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2Fzc2V0RGljdERpcnR5KVxuXHRcdFx0dGhpcy5yZWhhc2hBc3NldERpY3QoKTtcblxuXHRcdGlmICh0aGlzLl9hc3NldERpY3Rpb25hcnkuaGFzT3duUHJvcGVydHkoYXNzZXQuYXNzZXROYW1lc3BhY2UpKSB7XG5cdFx0XHRpZiAodGhpcy5fYXNzZXREaWN0aW9uYXJ5W2Fzc2V0LmFzc2V0TmFtZXNwYWNlXS5oYXNPd25Qcm9wZXJ0eShhc3NldC5uYW1lKSlcblx0XHRcdFx0ZGVsZXRlIHRoaXMuX2Fzc2V0RGljdGlvbmFyeVthc3NldC5hc3NldE5hbWVzcGFjZV1bYXNzZXQubmFtZV07XG5cblx0XHRcdGlmIChhdXRvUmVtb3ZlRW1wdHlOYW1lc3BhY2UpIHtcblxuXHRcdFx0XHR2YXIga2V5OnN0cmluZztcblx0XHRcdFx0dmFyIGVtcHR5OmJvb2xlYW4gPSB0cnVlO1xuXG5cdFx0XHRcdGZvciAoa2V5IGluIHRoaXMuX2Fzc2V0RGljdGlvbmFyeVthc3NldC5hc3NldE5hbWVzcGFjZV0pIHtcblx0XHRcdFx0XHRlbXB0eSA9IGZhbHNlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGVtcHR5KVxuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl9hc3NldERpY3Rpb25hcnlbYXNzZXQuYXNzZXROYW1lc3BhY2VdO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBzdG9wQWxsTG9hZGluZ1Nlc3Npb25zKClcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblxuXHRcdGlmICghdGhpcy5fbG9hZGluZ1Nlc3Npb25zKVxuXHRcdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zID0gbmV3IEFycmF5PEFzc2V0TG9hZGVyPigpO1xuXG5cdFx0dmFyIGxlbmd0aDpudW1iZXIgPSB0aGlzLl9sb2FkaW5nU2Vzc2lvbnMubGVuZ3RoO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxuXHRcdFx0dGhpcy5raWxsTG9hZGluZ1Nlc3Npb24odGhpcy5fbG9hZGluZ1Nlc3Npb25zW2ldKTtcblxuXHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9ucyA9IG51bGw7XG5cdH1cblxuXHRwcml2YXRlIHJlaGFzaEFzc2V0RGljdCgpXG5cdHtcblx0XHR2YXIgYXNzZXQ6SUFzc2V0O1xuXG5cdFx0dGhpcy5fYXNzZXREaWN0aW9uYXJ5ID0ge307XG5cblx0XHR2YXIgbDpudW1iZXIgPSB0aGlzLl9hc3NldHMubGVuZ3RoO1xuXG5cdFx0Zm9yICh2YXIgYzpudW1iZXIgPSAwOyBjIDwgbDsgYysrKSB7XG5cdFx0XHRhc3NldCA9IHRoaXMuX2Fzc2V0c1tjXTtcblxuXHRcdFx0aWYgKCF0aGlzLl9hc3NldERpY3Rpb25hcnkuaGFzT3duUHJvcGVydHkoYXNzZXQuYXNzZXROYW1lc3BhY2UpKVxuXHRcdFx0XHR0aGlzLl9hc3NldERpY3Rpb25hcnlbYXNzZXQuYXNzZXROYW1lc3BhY2VdID0ge307XG5cblx0XHRcdHRoaXMuX2Fzc2V0RGljdGlvbmFyeVthc3NldC5hc3NldE5hbWVzcGFjZV1bYXNzZXQubmFtZV0gPSBhc3NldDtcblxuXHRcdH1cblxuXHRcdHRoaXMuX2Fzc2V0RGljdERpcnR5ID0gZmFsc2U7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgd2hlbiBhIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgbG9hZGluZy5cblx0ICovXG5cdHByaXZhdGUgb25Mb2FkRXJyb3IoZXZlbnQ6SU9FcnJvckV2ZW50KTpib29sZWFuXG5cdHtcblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKElPRXJyb3JFdmVudC5JT19FUlJPUikpIHtcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgd2hlbiBhIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgcGFyc2luZy5cblx0ICovXG5cdHByaXZhdGUgb25QYXJzZUVycm9yKGV2ZW50OlBhcnNlckV2ZW50KTpib29sZWFuXG5cdHtcblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKFBhcnNlckV2ZW50LlBBUlNFX0VSUk9SKSkge1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBvbkFzc2V0Q29tcGxldGUoZXZlbnQ6QXNzZXRFdmVudClcblx0e1xuXHRcdC8vIE9ubHkgYWRkIGFzc2V0IHRvIGxpYnJhcnkgdGhlIGZpcnN0IHRpbWUuXG5cdFx0aWYgKGV2ZW50LnR5cGUgPT0gQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSlcblx0XHRcdHRoaXMuYWRkQXNzZXQoZXZlbnQuYXNzZXQpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblxuXHR9XG5cblx0cHJpdmF0ZSBvblRleHR1cmVTaXplRXJyb3IoZXZlbnQ6QXNzZXRFdmVudClcblx0e1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gdGhlIHJlc291cmNlIGFuZCBhbGwgb2YgaXRzIGRlcGVuZGVuY2llcyB3YXMgcmV0cmlldmVkLlxuXHQgKi9cblx0cHJpdmF0ZSBvblJlc291cmNlQ29tcGxldGUoZXZlbnQ6TG9hZGVyRXZlbnQpXG5cdHtcblx0XHR2YXIgbG9hZGVyOkFzc2V0TG9hZGVyID0gPEFzc2V0TG9hZGVyPiBldmVudC50YXJnZXQ7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuX2xvYWRpbmdTZXNzaW9ucy5pbmRleE9mKGxvYWRlcik7XG5cdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zLnNwbGljZShpbmRleCwgMSk7XG5cblx0XHQvLyBBZGQgbG9hZGVyIHRvIGEgZ2FyYmFnZSBhcnJheSAtIGZvciBhIGNvbGxlY3Rpb24gc3dlZXAgYW5kIGtpbGxcblx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnNHYXJiYWdlLnB1c2gobG9hZGVyKTtcblx0XHR0aGlzLl9nY1RpbWVvdXRJSUQgPSBzZXRUaW1lb3V0KCgpID0+IHt0aGlzLmxvYWRpbmdTZXNzaW9uR0MoKX0sIDEwMCk7XG5cdH1cblxuXHRwcml2YXRlIGxvYWRpbmdTZXNzaW9uR0MoKTp2b2lkXG5cdHtcblx0XHR2YXIgbG9hZGVyOkFzc2V0TG9hZGVyO1xuXG5cdFx0d2hpbGUgKHRoaXMuX2xvYWRpbmdTZXNzaW9uc0dhcmJhZ2UubGVuZ3RoID4gMCkge1xuXHRcdFx0bG9hZGVyID0gdGhpcy5fbG9hZGluZ1Nlc3Npb25zR2FyYmFnZS5wb3AoKTtcblx0XHRcdHRoaXMua2lsbExvYWRpbmdTZXNzaW9uKGxvYWRlcik7XG5cdFx0fVxuXG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX2djVGltZW91dElJRCk7XG5cdFx0dGhpcy5fZ2NUaW1lb3V0SUlEID0gbnVsbDtcblxuXHR9XG5cblx0cHJpdmF0ZSBraWxsTG9hZGluZ1Nlc3Npb24obG9hZGVyOkFzc2V0TG9hZGVyKVxuXHR7XG5cdFx0bG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoTG9hZGVyRXZlbnQuUkVTT1VSQ0VfQ09NUExFVEUsIHRoaXMuX29uUmVzb3VyY2VDb21wbGV0ZURlbGVnYXRlKTtcblx0XHRsb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LlRFWFRVUkVfU0laRV9FUlJPUiwgdGhpcy5fb25UZXh0dXJlU2l6ZUVycm9yRGVsZWdhdGUpO1xuXHRcdGxvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuQVNTRVRfQ09NUExFVEUsIHRoaXMuX29uQXNzZXRDb21wbGV0ZURlbGVnYXRlKTtcblx0XHRsb2FkZXIuc3RvcCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCB3aGVuIHVuZXNwZWN0ZWQgZXJyb3Igb2NjdXJzXG5cdCAqL1xuXHQvKlxuXHQgcHJpdmF0ZSBvblJlc291cmNlRXJyb3IoKSA6IHZvaWRcblx0IHtcblx0IHZhciBtc2c6c3RyaW5nID0gXCJVbmV4cGVjdGVkIHBhcnNlciBlcnJvclwiO1xuXHQgaWYoaGFzRXZlbnRMaXN0ZW5lcihMb2FkZXJFdmVudC5ERVBFTkRFTkNZX0VSUk9SKSl7XG5cdCB2YXIgcmU6TG9hZGVyRXZlbnQgPSBuZXcgTG9hZGVyRXZlbnQoTG9hZGVyRXZlbnQuREVQRU5ERU5DWV9FUlJPUiwgXCJcIik7XG5cdCBkaXNwYXRjaEV2ZW50KHJlKTtcblx0IH0gZWxzZXtcblx0IHRocm93IG5ldyBFcnJvcihtc2cpO1xuXHQgfVxuXHQgfVxuXHQgKi9cblxuXHRwcml2YXRlIG9uQXNzZXRSZW5hbWUoZXZlbnQ6QXNzZXRFdmVudClcblx0e1xuXHRcdHZhciBhc3NldDpJQXNzZXQgPSA8SUFzc2V0ID4gZXZlbnQudGFyZ2V0Oy8vIFRPRE86IHdhcyBldi5jdXJyZW50VGFyZ2V0IC0gd2F0Y2ggdGhpcyB2YXJcblx0XHR2YXIgb2xkOklBc3NldCA9IHRoaXMuZ2V0QXNzZXQoYXNzZXQuYXNzZXROYW1lc3BhY2UsIGFzc2V0Lm5hbWUpO1xuXG5cdFx0aWYgKG9sZCAhPSBudWxsKSB7XG5cdFx0XHR0aGlzLl9zdHJhdGVneS5yZXNvbHZlQ29uZmxpY3QoYXNzZXQsIG9sZCwgdGhpcy5fYXNzZXREaWN0aW9uYXJ5W2Fzc2V0LmFzc2V0TmFtZXNwYWNlXSwgdGhpcy5fc3RyYXRlZ3lQcmVmZXJlbmNlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGRpY3Q6T2JqZWN0ID0gdGhpcy5fYXNzZXREaWN0aW9uYXJ5W2V2ZW50LmFzc2V0LmFzc2V0TmFtZXNwYWNlXTtcblxuXHRcdFx0aWYgKGRpY3QgPT0gbnVsbClcblx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRkaWN0W2V2ZW50LmFzc2V0UHJldk5hbWVdID0gbnVsbDtcblx0XHRcdGRpY3RbZXZlbnQuYXNzZXQubmFtZV0gPSBldmVudC5hc3NldDtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIG9uQXNzZXRDb25mbGljdFJlc29sdmVkKGV2ZW50OkFzc2V0RXZlbnQpXG5cdHtcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQuY2xvbmUoKSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gQXNzZXRMaWJyYXJ5QnVuZGxlOyJdfQ==