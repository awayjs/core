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
var NamedAssetBase = require("awayjs-core/lib/library/NamedAssetBase");
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
            ns = NamedAssetBase.DEFAULT_NAMESPACE;
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
        ns = asset.assetNamespace || NamedAssetBase.DEFAULT_NAMESPACE;
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
            ns = NamedAssetBase.DEFAULT_NAMESPACE;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeUJ1bmRsZS50cyJdLCJuYW1lcyI6WyJBc3NldExpYnJhcnlCdW5kbGUiLCJBc3NldExpYnJhcnlCdW5kbGUuY29uc3RydWN0b3IiLCJBc3NldExpYnJhcnlCdW5kbGUuZ2V0SW5zdGFuY2UiLCJBc3NldExpYnJhcnlCdW5kbGUuZW5hYmxlUGFyc2VyIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLmVuYWJsZVBhcnNlcnMiLCJBc3NldExpYnJhcnlCdW5kbGUuY29uZmxpY3RTdHJhdGVneSIsIkFzc2V0TGlicmFyeUJ1bmRsZS5jb25mbGljdFByZWNlZGVuY2UiLCJBc3NldExpYnJhcnlCdW5kbGUuY3JlYXRlSXRlcmF0b3IiLCJBc3NldExpYnJhcnlCdW5kbGUubG9hZCIsIkFzc2V0TGlicmFyeUJ1bmRsZS5sb2FkRGF0YSIsIkFzc2V0TGlicmFyeUJ1bmRsZS5nZXRBc3NldCIsIkFzc2V0TGlicmFyeUJ1bmRsZS5hZGRBc3NldCIsIkFzc2V0TGlicmFyeUJ1bmRsZS5yZW1vdmVBc3NldCIsIkFzc2V0TGlicmFyeUJ1bmRsZS5yZW1vdmVBc3NldEJ5TmFtZSIsIkFzc2V0TGlicmFyeUJ1bmRsZS5yZW1vdmVBbGxBc3NldHMiLCJBc3NldExpYnJhcnlCdW5kbGUucmVtb3ZlTmFtZXNwYWNlQXNzZXRzIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLnJlbW92ZUFzc2V0RnJvbURpY3QiLCJBc3NldExpYnJhcnlCdW5kbGUuc3RvcEFsbExvYWRpbmdTZXNzaW9ucyIsIkFzc2V0TGlicmFyeUJ1bmRsZS5yZWhhc2hBc3NldERpY3QiLCJBc3NldExpYnJhcnlCdW5kbGUub25Mb2FkRXJyb3IiLCJBc3NldExpYnJhcnlCdW5kbGUub25QYXJzZUVycm9yIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLm9uQXNzZXRDb21wbGV0ZSIsIkFzc2V0TGlicmFyeUJ1bmRsZS5vblRleHR1cmVTaXplRXJyb3IiLCJBc3NldExpYnJhcnlCdW5kbGUub25SZXNvdXJjZUNvbXBsZXRlIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLmxvYWRpbmdTZXNzaW9uR0MiLCJBc3NldExpYnJhcnlCdW5kbGUua2lsbExvYWRpbmdTZXNzaW9uIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLm9uQXNzZXRSZW5hbWUiLCJBc3NldExpYnJhcnlCdW5kbGUub25Bc3NldENvbmZsaWN0UmVzb2x2ZWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLElBQU8sb0JBQW9CLFdBQVksOENBQThDLENBQUMsQ0FBQztBQUN2RixJQUFPLFdBQVcsV0FBYyxxQ0FBcUMsQ0FBQyxDQUFDO0FBR3ZFLElBQU8sa0JBQWtCLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUNuRixJQUFPLGdCQUFnQixXQUFhLDBDQUEwQyxDQUFDLENBQUM7QUFFaEYsSUFBTyxjQUFjLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQUU1RSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBQzNELElBQU8sVUFBVSxXQUFjLG1DQUFtQyxDQUFDLENBQUM7QUFDcEUsSUFBTyxZQUFZLFdBQWMscUNBQXFDLENBQUMsQ0FBQztBQUN4RSxJQUFPLFdBQVcsV0FBYyxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ3RFLElBQU8sZUFBZSxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFDN0UsSUFBTyxXQUFXLFdBQWMsb0NBQW9DLENBQUMsQ0FBQztBQUd0RSxBQUtBOzs7O0dBREc7SUFDRyxrQkFBa0I7SUFBU0EsVUFBM0JBLGtCQUFrQkEsVUFBd0JBO0lBcUIvQ0E7Ozs7T0FJR0E7SUFDSEEsU0ExQktBLGtCQUFrQkE7UUFBeEJDLGlCQW9rQkNBO1FBeGlCQ0EsaUJBQU9BLENBQUNBO1FBbEJEQSw0QkFBdUJBLEdBQXNCQSxJQUFJQSxLQUFLQSxFQUFlQSxDQUFDQTtRQW9CN0VBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLEtBQUtBLEVBQVVBLEVBQUNBLHNCQUFzQkE7UUFDekRBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FB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QUtBLENBQUNBLEtBQUtBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBO1lBRXBFQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDaEJBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLGFBQWFBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1lBQ2pDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUN0Q0EsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFTzFCLG9EQUF1QkEsR0FBL0JBLFVBQWdDQSxLQUFnQkE7UUFFL0MyQixJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQTtJQUNuQ0EsQ0FBQ0E7SUFqa0JhM0IsOEJBQVdBLEdBQVVBLElBQUlBLE1BQU1BLEVBQUVBLENBQUNBO0lBa2tCakRBLHlCQUFDQTtBQUFEQSxDQXBrQkEsQUFva0JDQSxFQXBrQmdDLGVBQWUsRUFva0IvQztBQUVELEFBQTRCLGlCQUFuQixrQkFBa0IsQ0FBQyIsImZpbGUiOiJsaWJyYXJ5L0Fzc2V0TGlicmFyeUJ1bmRsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVVJMUmVxdWVzdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxSZXF1ZXN0XCIpO1xyXG5pbXBvcnQgQXNzZXRMaWJyYXJ5XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldExpYnJhcnlcIik7XHJcbmltcG9ydCBBc3NldExpYnJhcnlJdGVyYXRvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldExpYnJhcnlJdGVyYXRvclwiKTtcclxuaW1wb3J0IEFzc2V0TG9hZGVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldExvYWRlclwiKTtcclxuaW1wb3J0IEFzc2V0TG9hZGVyVG9rZW5cdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldExvYWRlclRva2VuXCIpO1xyXG5pbXBvcnQgQXNzZXRMb2FkZXJDb250ZXh0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TG9hZGVyQ29udGV4dFwiKTtcclxuaW1wb3J0IENvbmZsaWN0UHJlY2VkZW5jZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Db25mbGljdFByZWNlZGVuY2VcIik7XHJcbmltcG9ydCBDb25mbGljdFN0cmF0ZWd5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQ29uZmxpY3RTdHJhdGVneVwiKTtcclxuaW1wb3J0IENvbmZsaWN0U3RyYXRlZ3lCYXNlXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0NvbmZsaWN0U3RyYXRlZ3lCYXNlXCIpO1xyXG5pbXBvcnQgTmFtZWRBc3NldEJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcclxuaW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XHJcbmltcG9ydCBFcnJvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Vycm9yXCIpO1xyXG5pbXBvcnQgQXNzZXRFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9Bc3NldEV2ZW50XCIpO1xyXG5pbXBvcnQgSU9FcnJvckV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0lPRXJyb3JFdmVudFwiKTtcclxuaW1wb3J0IExvYWRlckV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0xvYWRlckV2ZW50XCIpO1xyXG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIik7XHJcbmltcG9ydCBQYXJzZXJFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9QYXJzZXJFdmVudFwiKTtcclxuaW1wb3J0IFBhcnNlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlckJhc2VcIik7XHJcblxyXG4vKipcclxuICogQXNzZXRMaWJyYXJ5QnVuZGxlIGVuZm9yY2VzIGEgbXVsdGl0b24gcGF0dGVybiBhbmQgaXMgbm90IGludGVuZGVkIHRvIGJlIGluc3RhbmNlZCBkaXJlY3RseS5cclxuICogSXRzIHB1cnBvc2UgaXMgdG8gY3JlYXRlIGEgY29udGFpbmVyIGZvciAzRCBkYXRhIG1hbmFnZW1lbnQsIGJvdGggYmVmb3JlIGFuZCBhZnRlciBwYXJzaW5nLlxyXG4gKiBJZiB5b3UgYXJlIGludGVyZXN0ZWQgaW4gY3JlYXRpbmcgbXVsdGlwbGUgbGlicmFyeSBidW5kbGVzLCBwbGVhc2UgdXNlIHRoZSA8Y29kZT5nZXRJbnN0YW5jZSgpPC9jb2RlPiBtZXRob2QuXHJcbiAqL1xyXG5jbGFzcyBBc3NldExpYnJhcnlCdW5kbGUgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcclxue1xyXG5cdHB1YmxpYyBzdGF0aWMgX2lJbnN0YW5jZXM6T2JqZWN0ID0gbmV3IE9iamVjdCgpO1xyXG5cclxuXHRwcml2YXRlIF9sb2FkaW5nU2Vzc2lvbnM6QXJyYXk8QXNzZXRMb2FkZXI+O1xyXG5cdHByaXZhdGUgX3N0cmF0ZWd5OkNvbmZsaWN0U3RyYXRlZ3lCYXNlO1xyXG5cdHByaXZhdGUgX3N0cmF0ZWd5UHJlZmVyZW5jZTpzdHJpbmc7XHJcblx0cHJpdmF0ZSBfYXNzZXRzOkFycmF5PElBc3NldD47XHJcblx0cHJpdmF0ZSBfYXNzZXREaWN0aW9uYXJ5Ok9iamVjdDtcclxuXHRwcml2YXRlIF9hc3NldERpY3REaXJ0eTpib29sZWFuO1xyXG5cdHByaXZhdGUgX2xvYWRpbmdTZXNzaW9uc0dhcmJhZ2U6QXJyYXk8QXNzZXRMb2FkZXI+ID0gbmV3IEFycmF5PEFzc2V0TG9hZGVyPigpO1xyXG5cdHByaXZhdGUgX2djVGltZW91dElJRDpudW1iZXI7XHJcblxyXG5cdHByaXZhdGUgX29uQXNzZXRSZW5hbWVEZWxlZ2F0ZTooZXZlbnQ6QXNzZXRFdmVudCkgPT4gdm9pZDtcclxuXHRwcml2YXRlIF9vbkFzc2V0Q29uZmxpY3RSZXNvbHZlZERlbGVnYXRlOihldmVudDpBc3NldEV2ZW50KSA9PiB2b2lkO1xyXG5cdHByaXZhdGUgX29uUmVzb3VyY2VDb21wbGV0ZURlbGVnYXRlOihldmVudDpMb2FkZXJFdmVudCkgPT4gdm9pZDtcclxuXHRwcml2YXRlIF9vblRleHR1cmVTaXplRXJyb3JEZWxlZ2F0ZTooZXZlbnQ6QXNzZXRFdmVudCkgPT4gdm9pZDtcclxuXHRwcml2YXRlIF9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZTooZXZlbnQ6QXNzZXRFdmVudCkgPT4gdm9pZDtcclxuXHRwcml2YXRlIF9vbkxvYWRFcnJvckRlbGVnYXRlOihldmVudDpJT0Vycm9yRXZlbnQpID0+IGJvb2xlYW47XHJcblx0cHJpdmF0ZSBfb25QYXJzZUVycm9yRGVsZWdhdGU6KGV2ZW50OlBhcnNlckV2ZW50KSA9PiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IDxjb2RlPkFzc2V0TGlicmFyeUJ1bmRsZTwvY29kZT4gb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1lIEEgbXVsdGl0b24gZW5mb3JjZXIgZm9yIHRoZSBBc3NldExpYnJhcnlCdW5kbGUgZW5zdXJpbmcgaXQgY2Fubm5vdCBiZSBpbnN0YW5jZWQuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5fYXNzZXRzID0gbmV3IEFycmF5PElBc3NldD4oKTsvL25ldyBWZWN0b3IuPElBc3NldD47XHJcblx0XHR0aGlzLl9hc3NldERpY3Rpb25hcnkgPSBuZXcgT2JqZWN0KCk7XHJcblx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMgPSBuZXcgQXJyYXk8QXNzZXRMb2FkZXI+KCk7XHJcblxyXG5cdFx0dGhpcy5jb25mbGljdFN0cmF0ZWd5ID0gQ29uZmxpY3RTdHJhdGVneS5JR05PUkUuY3JlYXRlKCk7XHJcblx0XHR0aGlzLmNvbmZsaWN0UHJlY2VkZW5jZSA9IENvbmZsaWN0UHJlY2VkZW5jZS5GQVZPUl9ORVc7XHJcblxyXG5cdFx0dGhpcy5fb25Bc3NldFJlbmFtZURlbGVnYXRlID0gKGV2ZW50OkFzc2V0RXZlbnQpID0+IHRoaXMub25Bc3NldFJlbmFtZShldmVudCk7XHJcblx0XHR0aGlzLl9vbkFzc2V0Q29uZmxpY3RSZXNvbHZlZERlbGVnYXRlID0gKGV2ZW50OkFzc2V0RXZlbnQpID0+IHRoaXMub25Bc3NldENvbmZsaWN0UmVzb2x2ZWQoZXZlbnQpO1xyXG5cdFx0dGhpcy5fb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGUgPSAoZXZlbnQ6TG9hZGVyRXZlbnQpID0+IHRoaXMub25SZXNvdXJjZUNvbXBsZXRlKGV2ZW50KTtcclxuXHRcdHRoaXMuX29uVGV4dHVyZVNpemVFcnJvckRlbGVnYXRlID0gKGV2ZW50OkFzc2V0RXZlbnQpID0+IHRoaXMub25UZXh0dXJlU2l6ZUVycm9yKGV2ZW50KTtcclxuXHRcdHRoaXMuX29uQXNzZXRDb21wbGV0ZURlbGVnYXRlID0gKGV2ZW50OkFzc2V0RXZlbnQpID0+IHRoaXMub25Bc3NldENvbXBsZXRlKGV2ZW50KTtcclxuXHRcdHRoaXMuX29uTG9hZEVycm9yRGVsZWdhdGUgPSAoZXZlbnQ6SU9FcnJvckV2ZW50KSA9PiB0aGlzLm9uTG9hZEVycm9yKGV2ZW50KTtcclxuXHRcdHRoaXMuX29uUGFyc2VFcnJvckRlbGVnYXRlID0gKGV2ZW50OlBhcnNlckV2ZW50KSA9PiB0aGlzLm9uUGFyc2VFcnJvcihldmVudCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGFuIEFzc2V0TGlicmFyeUJ1bmRsZSBpbnN0YW5jZS4gSWYgbm8ga2V5IGlzIGdpdmVuLCByZXR1cm5zIHRoZSBkZWZhdWx0IGJ1bmRsZSBpbnN0YW5jZSAod2hpY2ggaXNcclxuXHQgKiBzaW1pbGFyIHRvIHVzaW5nIHRoZSBBc3NldExpYnJhcnlCdW5kbGUgYXMgYSBzaW5nbGV0b24uKSBUbyBrZWVwIHNldmVyYWwgc2VwYXJhdGVkIGxpYnJhcnkgYnVuZGxlcyxcclxuXHQgKiBwYXNzIGEgc3RyaW5nIGtleSB0byB0aGlzIG1ldGhvZCB0byBkZWZpbmUgd2hpY2ggYnVuZGxlIHNob3VsZCBiZSByZXR1cm5lZC4gVGhpcyBpc1xyXG5cdCAqIHJlZmVycmVkIHRvIGFzIHVzaW5nIHRoZSBBc3NldExpYnJhcnkgYXMgYSBtdWx0aXRvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBrZXkgRGVmaW5lcyB3aGljaCBtdWx0aXRvbiBpbnN0YW5jZSBzaG91bGQgYmUgcmV0dXJuZWQuXHJcblx0ICogQHJldHVybiBBbiBpbnN0YW5jZSBvZiB0aGUgYXNzZXQgbGlicmFyeVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2Uoa2V5OnN0cmluZyA9ICdkZWZhdWx0Jyk6QXNzZXRMaWJyYXJ5QnVuZGxlXHJcblx0e1xyXG5cdFx0aWYgKCFrZXkpXHJcblx0XHRcdGtleSA9ICdkZWZhdWx0JztcclxuXHJcblx0XHRpZiAoIUFzc2V0TGlicmFyeUJ1bmRsZS5faUluc3RhbmNlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG5cdFx0XHRBc3NldExpYnJhcnlCdW5kbGUuX2lJbnN0YW5jZXNba2V5XSA9IG5ldyBBc3NldExpYnJhcnlCdW5kbGUoKTtcclxuXHJcblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5QnVuZGxlLl9pSW5zdGFuY2VzW2tleV07XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZW5hYmxlUGFyc2VyKHBhcnNlckNsYXNzOk9iamVjdClcclxuXHR7XHJcblx0XHRBc3NldExvYWRlci5lbmFibGVQYXJzZXIocGFyc2VyQ2xhc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZW5hYmxlUGFyc2VycyhwYXJzZXJDbGFzc2VzOk9iamVjdFtdKVxyXG5cdHtcclxuXHRcdEFzc2V0TG9hZGVyLmVuYWJsZVBhcnNlcnMocGFyc2VyQ2xhc3Nlcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHdoaWNoIHN0cmF0ZWd5IHNob3VsZCBiZSB1c2VkIGZvciByZXNvbHZpbmcgbmFtaW5nIGNvbmZsaWN0cywgd2hlbiB0d28gbGlicmFyeVxyXG5cdCAqIGFzc2V0cyBhcmUgZ2l2ZW4gdGhlIHNhbWUgbmFtZS4gQnkgZGVmYXVsdCwgPGNvZGU+Q29uZmxpY3RTdHJhdGVneS5BUFBFTkRfTlVNX1NVRkZJWDwvY29kZT5cclxuXHQgKiBpcyB1c2VkIHdoaWNoIG1lYW5zIHRoYXQgYSBudW1lcmljIHN1ZmZpeCBpcyBhcHBlbmRlZCB0byBvbmUgb2YgdGhlIGFzc2V0cy4gVGhlXHJcblx0ICogPGNvZGU+Y29uZmxpY3RQcmVjZWRlbmNlPC9jb2RlPiBwcm9wZXJ0eSBkZWZpbmVzIHdoaWNoIG9mIHRoZSB0d28gY29uZmxpY3RpbmcgYXNzZXRzIHdpbGxcclxuXHQgKiBiZSByZW5hbWVkLlxyXG5cdCAqXHJcblx0ICogQHNlZSBuYW1pbmcuQ29uZmxpY3RTdHJhdGVneVxyXG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5LmNvbmZsaWN0UHJlY2VkZW5jZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgY29uZmxpY3RTdHJhdGVneSgpOkNvbmZsaWN0U3RyYXRlZ3lCYXNlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N0cmF0ZWd5O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBjb25mbGljdFN0cmF0ZWd5KHZhbDpDb25mbGljdFN0cmF0ZWd5QmFzZSlcclxuXHR7XHJcblxyXG5cdFx0aWYgKCF2YWwpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignbmFtaW5nU3RyYXRlZ3kgbXVzdCBub3QgYmUgbnVsbC4gVG8gaWdub3JlIG5hbWluZywgdXNlIEFzc2V0TGlicmFyeS5JR05PUkUnKTtcclxuXHJcblx0XHR0aGlzLl9zdHJhdGVneSA9IHZhbC5jcmVhdGUoKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHdoaWNoIGFzc2V0IHNob3VsZCBoYXZlIHByZWNlZGVuY2Ugd2hlbiByZXNvbHZpbmcgYSBuYW1pbmcgY29uZmxpY3QgYmV0d2VlblxyXG5cdCAqIHR3byBhc3NldHMgb2Ygd2hpY2ggb25lIGhhcyBqdXN0IGJlZW4gcmVuYW1lZCBieSB0aGUgdXNlciBvciBieSBhIHBhcnNlci4gQnkgZGVmYXVsdFxyXG5cdCAqIDxjb2RlPkNvbmZsaWN0UHJlY2VkZW5jZS5GQVZPUl9ORVc8L2NvZGU+IGlzIHVzZWQsIG1lYW5pbmcgdGhhdCB0aGUgbmV3bHkgcmVuYW1lZFxyXG5cdCAqIGFzc2V0IHdpbGwga2VlcCBpdCdzIG5ldyBuYW1lIHdoaWxlIHRoZSBvbGRlciBhc3NldCBnZXRzIHJlbmFtZWQgdG8gbm90IGNvbmZsaWN0LlxyXG5cdCAqXHJcblx0ICogVGhpcyBwcm9wZXJ0eSBpcyBpZ25vcmVkIGZvciBjb25mbGljdCBzdHJhdGVnaWVzIHRoYXQgZG8gbm90IGFjdHVhbGx5IHJlbmFtZSBhblxyXG5cdCAqIGFzc2V0IGF1dG9tYXRpY2FsbHksIHN1Y2ggYXMgQ29uZmxpY3RTdHJhdGVneS5JR05PUkUgYW5kIENvbmZsaWN0U3RyYXRlZ3kuVEhST1dfRVJST1IuXHJcblx0ICpcclxuXHQgKiBAc2VlIGF3YXkubGlicmFyeS5Db25mbGljdFByZWNlZGVuY2VcclxuXHQgKiBAc2VlIGF3YXkubGlicmFyeS5Db25mbGljdFN0cmF0ZWd5XHJcblx0ICovXHJcblx0cHVibGljIGdldCBjb25mbGljdFByZWNlZGVuY2UoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3RyYXRlZ3lQcmVmZXJlbmNlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBjb25mbGljdFByZWNlZGVuY2UodmFsOnN0cmluZylcclxuXHR7XHJcblx0XHR0aGlzLl9zdHJhdGVneVByZWZlcmVuY2UgPSB2YWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGUgYW4gQXNzZXRMaWJyYXJ5SXRlcmF0b3IgaW5zdGFuY2UgdGhhdCBjYW4gYmUgdXNlZCB0byBpdGVyYXRlIG92ZXIgdGhlIGFzc2V0c1xyXG5cdCAqIGluIHRoaXMgYXNzZXQgbGlicmFyeSBpbnN0YW5jZS4gVGhlIGl0ZXJhdG9yIGNhbiBmaWx0ZXIgYXNzZXRzIG9uIGFzc2V0IHR5cGUgYW5kL29yXHJcblx0ICogbmFtZXNwYWNlLiBBIFwibnVsbFwiIGZpbHRlciB2YWx1ZSBtZWFucyBubyBmaWx0ZXIgb2YgdGhhdCB0eXBlIGlzIHVzZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYXNzZXRUeXBlRmlsdGVyIEFzc2V0IHR5cGUgdG8gZmlsdGVyIG9uIChmcm9tIHRoZSBBc3NldFR5cGUgZW51bSBjbGFzcy4pIFVzZVxyXG5cdCAqIG51bGwgdG8gbm90IGZpbHRlciBvbiBhc3NldCB0eXBlLlxyXG5cdCAqIEBwYXJhbSBuYW1lc3BhY2VGaWx0ZXIgTmFtZXNwYWNlIHRvIGZpbHRlciBvbi4gVXNlIG51bGwgdG8gbm90IGZpbHRlciBvbiBuYW1lc3BhY2UuXHJcblx0ICogQHBhcmFtIGZpbHRlckZ1bmMgQ2FsbGJhY2sgZnVuY3Rpb24gdG8gdXNlIHdoZW4gZGVjaWRpbmcgd2hldGhlciBhbiBhc3NldCBzaG91bGQgYmVcclxuXHQgKiBpbmNsdWRlZCBpbiB0aGUgaXRlcmF0aW9uIG9yIG5vdC4gVGhpcyBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBzaW5nbGVcclxuXHQgKiBwYXJhbWV0ZXIgb2YgdHlwZSBJQXNzZXQgYW5kIHJldHVybnMgYSBib29sZWFuIHdoZXJlIHRydWUgbWVhbnMgaXQgc2hvdWxkIGJlIGluY2x1ZGVkLlxyXG5cdCAqXHJcblx0ICogQHNlZSBhd2F5LmxpYnJhcnkuQXNzZXRUeXBlXHJcblx0ICovXHJcblx0cHVibGljIGNyZWF0ZUl0ZXJhdG9yKGFzc2V0VHlwZUZpbHRlcjpzdHJpbmcgPSBudWxsLCBuYW1lc3BhY2VGaWx0ZXI6c3RyaW5nID0gbnVsbCwgZmlsdGVyRnVuYyA9IG51bGwpOkFzc2V0TGlicmFyeUl0ZXJhdG9yXHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBBc3NldExpYnJhcnlJdGVyYXRvcih0aGlzLl9hc3NldHMsIGFzc2V0VHlwZUZpbHRlciwgbmFtZXNwYWNlRmlsdGVyLCBmaWx0ZXJGdW5jKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIGEgZmlsZSBhbmQgKG9wdGlvbmFsbHkpIGFsbCBvZiBpdHMgZGVwZW5kZW5jaWVzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHJlcSBUaGUgVVJMUmVxdWVzdCBvYmplY3QgY29udGFpbmluZyB0aGUgVVJMIG9mIHRoZSBmaWxlIHRvIGJlIGxvYWRlZC5cclxuXHQgKiBAcGFyYW0gY29udGV4dCBBbiBvcHRpb25hbCBjb250ZXh0IG9iamVjdCBwcm92aWRpbmcgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciBsb2FkaW5nXHJcblx0ICogQHBhcmFtIG5zIEFuIG9wdGlvbmFsIG5hbWVzcGFjZSBzdHJpbmcgdW5kZXIgd2hpY2ggdGhlIGZpbGUgaXMgdG8gYmUgbG9hZGVkLCBhbGxvd2luZyB0aGUgZGlmZmVyZW50aWF0aW9uIG9mIHR3byByZXNvdXJjZXMgd2l0aCBpZGVudGljYWwgYXNzZXRzXHJcblx0ICogQHBhcmFtIHBhcnNlciBBbiBvcHRpb25hbCBwYXJzZXIgb2JqZWN0IGZvciB0cmFuc2xhdGluZyB0aGUgbG9hZGVkIGRhdGEgaW50byBhIHVzYWJsZSByZXNvdXJjZS4gSWYgbm90IHByb3ZpZGVkLCBBc3NldExvYWRlciB3aWxsIGF0dGVtcHQgdG8gYXV0by1kZXRlY3QgdGhlIGZpbGUgdHlwZS5cclxuXHQgKiBAcmV0dXJuIEEgaGFuZGxlIHRvIHRoZSByZXRyaWV2ZWQgcmVzb3VyY2UuXHJcblx0ICovXHJcblx0cHVibGljIGxvYWQocmVxOlVSTFJlcXVlc3QsIGNvbnRleHQ6QXNzZXRMb2FkZXJDb250ZXh0ID0gbnVsbCwgbnM6c3RyaW5nID0gbnVsbCwgcGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKTpBc3NldExvYWRlclRva2VuXHJcblx0e1xyXG5cdFx0dmFyIGxvYWRlcjpBc3NldExvYWRlciA9IG5ldyBBc3NldExvYWRlcigpO1xyXG5cclxuXHRcdGlmICghdGhpcy5fbG9hZGluZ1Nlc3Npb25zKVxyXG5cdFx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMgPSBuZXcgQXJyYXk8QXNzZXRMb2FkZXI+KCk7XHJcblxyXG5cdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zLnB1c2gobG9hZGVyKTtcclxuXHJcblx0XHRsb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihMb2FkZXJFdmVudC5SRVNPVVJDRV9DT01QTEVURSwgdGhpcy5fb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGUpO1xyXG5cdFx0bG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5URVhUVVJFX1NJWkVfRVJST1IsIHRoaXMuX29uVGV4dHVyZVNpemVFcnJvckRlbGVnYXRlKTtcclxuXHRcdGxvYWRlci5hZGRFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuQVNTRVRfQ09NUExFVEUsIHRoaXMuX29uQXNzZXRDb21wbGV0ZURlbGVnYXRlKTtcclxuXHJcblx0XHQvLyBFcnJvciBhcmUgaGFuZGxlZCBzZXBhcmF0ZWx5IChzZWUgZG9jdW1lbnRhdGlvbiBmb3IgYWRkRXJyb3JIYW5kbGVyKVxyXG5cdFx0bG9hZGVyLl9pQWRkRXJyb3JIYW5kbGVyKHRoaXMuX29uTG9hZEVycm9yRGVsZWdhdGUpO1xyXG5cdFx0bG9hZGVyLl9pQWRkUGFyc2VFcnJvckhhbmRsZXIodGhpcy5fb25QYXJzZUVycm9yRGVsZWdhdGUpO1xyXG5cclxuXHRcdHJldHVybiBsb2FkZXIubG9hZChyZXEsIGNvbnRleHQsIG5zLCBwYXJzZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgYSByZXNvdXJjZSBmcm9tIGV4aXN0aW5nIGRhdGEgaW4gbWVtb3J5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHJlc291cmNlIGluZm9ybWF0aW9uLlxyXG5cdCAqIEBwYXJhbSBjb250ZXh0IEFuIG9wdGlvbmFsIGNvbnRleHQgb2JqZWN0IHByb3ZpZGluZyBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGxvYWRpbmdcclxuXHQgKiBAcGFyYW0gbnMgQW4gb3B0aW9uYWwgbmFtZXNwYWNlIHN0cmluZyB1bmRlciB3aGljaCB0aGUgZmlsZSBpcyB0byBiZSBsb2FkZWQsIGFsbG93aW5nIHRoZSBkaWZmZXJlbnRpYXRpb24gb2YgdHdvIHJlc291cmNlcyB3aXRoIGlkZW50aWNhbCBhc3NldHNcclxuXHQgKiBAcGFyYW0gcGFyc2VyIEFuIG9wdGlvbmFsIHBhcnNlciBvYmplY3QgZm9yIHRyYW5zbGF0aW5nIHRoZSBsb2FkZWQgZGF0YSBpbnRvIGEgdXNhYmxlIHJlc291cmNlLiBJZiBub3QgcHJvdmlkZWQsIEFzc2V0TG9hZGVyIHdpbGwgYXR0ZW1wdCB0byBhdXRvLWRldGVjdCB0aGUgZmlsZSB0eXBlLlxyXG5cdCAqIEByZXR1cm4gQSBoYW5kbGUgdG8gdGhlIHJldHJpZXZlZCByZXNvdXJjZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgbG9hZERhdGEoZGF0YTphbnksIGNvbnRleHQ6QXNzZXRMb2FkZXJDb250ZXh0ID0gbnVsbCwgbnM6c3RyaW5nID0gbnVsbCwgcGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKTpBc3NldExvYWRlclRva2VuXHJcblx0e1xyXG5cdFx0dmFyIGxvYWRlcjpBc3NldExvYWRlciA9IG5ldyBBc3NldExvYWRlcigpO1xyXG5cclxuXHRcdGlmICghdGhpcy5fbG9hZGluZ1Nlc3Npb25zKVxyXG5cdFx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMgPSBuZXcgQXJyYXk8QXNzZXRMb2FkZXI+KCk7XHJcblxyXG5cdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zLnB1c2gobG9hZGVyKTtcclxuXHJcblx0XHRsb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihMb2FkZXJFdmVudC5SRVNPVVJDRV9DT01QTEVURSwgdGhpcy5fb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGUpO1xyXG5cdFx0bG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5URVhUVVJFX1NJWkVfRVJST1IsIHRoaXMuX29uVGV4dHVyZVNpemVFcnJvckRlbGVnYXRlKTtcclxuXHRcdGxvYWRlci5hZGRFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuQVNTRVRfQ09NUExFVEUsIHRoaXMuX29uQXNzZXRDb21wbGV0ZURlbGVnYXRlKTtcclxuXHJcblx0XHQvLyBFcnJvciBhcmUgaGFuZGxlZCBzZXBhcmF0ZWx5IChzZWUgZG9jdW1lbnRhdGlvbiBmb3IgYWRkRXJyb3JIYW5kbGVyKVxyXG5cdFx0bG9hZGVyLl9pQWRkRXJyb3JIYW5kbGVyKHRoaXMuX29uTG9hZEVycm9yRGVsZWdhdGUpO1xyXG5cdFx0bG9hZGVyLl9pQWRkUGFyc2VFcnJvckhhbmRsZXIodGhpcy5fb25QYXJzZUVycm9yRGVsZWdhdGUpO1xyXG5cclxuXHRcdHJldHVybiBsb2FkZXIubG9hZERhdGEoZGF0YSwgJycsIGNvbnRleHQsIG5zLCBwYXJzZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0QXNzZXQobmFtZTpzdHJpbmcsIG5zOnN0cmluZyA9IG51bGwpOklBc3NldFxyXG5cdHtcclxuXHRcdC8vdmFyIGFzc2V0IDogSUFzc2V0O1xyXG5cclxuXHRcdGlmICh0aGlzLl9hc3NldERpY3REaXJ0eSlcclxuXHRcdFx0dGhpcy5yZWhhc2hBc3NldERpY3QoKTtcclxuXHJcblx0XHRpZiAobnMgPT0gbnVsbClcclxuXHRcdFx0bnMgPSBOYW1lZEFzc2V0QmFzZS5ERUZBVUxUX05BTUVTUEFDRTtcclxuXHJcblx0XHRpZiAoIXRoaXMuX2Fzc2V0RGljdGlvbmFyeS5oYXNPd25Qcm9wZXJ0eShucykpXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9hc3NldERpY3Rpb25hcnlbbnNdW25hbWVdO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYW4gYXNzZXQgdG8gdGhlIGFzc2V0IGxpYnJhcnksIGZpcnN0IG1ha2luZyBzdXJlIHRoYXQgaXQncyBuYW1lIGlzIHVuaXF1ZVxyXG5cdCAqIHVzaW5nIHRoZSBtZXRob2QgZGVmaW5lZCBieSB0aGUgPGNvZGU+Y29uZmxpY3RTdHJhdGVneTwvY29kZT4gYW5kXHJcblx0ICogPGNvZGU+Y29uZmxpY3RQcmVjZWRlbmNlPC9jb2RlPiBwcm9wZXJ0aWVzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhZGRBc3NldChhc3NldDpJQXNzZXQpXHJcblx0e1xyXG5cdFx0dmFyIG5zOnN0cmluZztcclxuXHRcdHZhciBvbGQ6SUFzc2V0O1xyXG5cclxuXHRcdC8vIEJhaWwgaWYgYXNzZXQgaGFzIGFscmVhZHkgYmVlbiBhZGRlZC5cclxuXHRcdGlmICh0aGlzLl9hc3NldHMuaW5kZXhPZihhc3NldCkgPj0gMClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdG9sZCA9IHRoaXMuZ2V0QXNzZXQoYXNzZXQubmFtZSwgYXNzZXQuYXNzZXROYW1lc3BhY2UpO1xyXG5cdFx0bnMgPSBhc3NldC5hc3NldE5hbWVzcGFjZSB8fCBOYW1lZEFzc2V0QmFzZS5ERUZBVUxUX05BTUVTUEFDRTtcclxuXHJcblx0XHRpZiAob2xkICE9IG51bGwpXHJcblx0XHRcdHRoaXMuX3N0cmF0ZWd5LnJlc29sdmVDb25mbGljdChhc3NldCwgb2xkLCB0aGlzLl9hc3NldERpY3Rpb25hcnlbbnNdLCB0aGlzLl9zdHJhdGVneVByZWZlcmVuY2UpO1xyXG5cclxuXHRcdC8vY3JlYXRlIHVuaXF1ZS1pZCAoZm9yIG5vdyB0aGlzIGlzIHVzZWQgaW4gQXdheUJ1aWxkZXIgb25seVxyXG5cdFx0Ly9hc3NldC5pZCA9IElEVXRpbC5jcmVhdGVVSUQoKTtcclxuXHJcblx0XHQvLyBBZGQgaXRcclxuXHRcdHRoaXMuX2Fzc2V0cy5wdXNoKGFzc2V0KTtcclxuXHJcblx0XHRpZiAoIXRoaXMuX2Fzc2V0RGljdGlvbmFyeS5oYXNPd25Qcm9wZXJ0eShucykpXHJcblx0XHRcdHRoaXMuX2Fzc2V0RGljdGlvbmFyeVtuc10gPSBuZXcgT2JqZWN0KCk7XHJcblxyXG5cdFx0dGhpcy5fYXNzZXREaWN0aW9uYXJ5W25zXVthc3NldC5uYW1lXSA9IGFzc2V0O1xyXG5cclxuXHRcdGFzc2V0LmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9SRU5BTUUsIHRoaXMuX29uQXNzZXRSZW5hbWVEZWxlZ2F0ZSk7XHJcblx0XHRhc3NldC5hZGRFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuQVNTRVRfQ09ORkxJQ1RfUkVTT0xWRUQsIHRoaXMuX29uQXNzZXRDb25mbGljdFJlc29sdmVkRGVsZWdhdGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbiBhc3NldCBmcm9tIHRoZSBsaWJyYXJ5LCBhbmQgb3B0aW9uYWxseSBkaXNwb3NlcyB0aGF0IGFzc2V0IGJ5IGNhbGxpbmdcclxuXHQgKiBpdCdzIGRpc3Bvc2VBc3NldCgpIG1ldGhvZCAod2hpY2ggZm9yIG1vc3QgYXNzZXRzIGlzIGltcGxlbWVudGVkIGFzIGEgZGVmYXVsdFxyXG5cdCAqIHZlcnNpb24gb2YgdGhhdCB0eXBlJ3MgZGlzcG9zZSgpIG1ldGhvZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhc3NldCBUaGUgYXNzZXQgd2hpY2ggc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSB0aGlzIGxpYnJhcnkuXHJcblx0ICogQHBhcmFtIGRpc3Bvc2UgRGVmaW5lcyB3aGV0aGVyIHRoZSBhc3NldHMgc2hvdWxkIGFsc28gYmUgZGlzcG9zZWQuXHJcblx0ICovXHJcblx0cHVibGljIHJlbW92ZUFzc2V0KGFzc2V0OklBc3NldCwgZGlzcG9zZTpib29sZWFuID0gdHJ1ZSlcclxuXHR7XHJcblx0XHR2YXIgaWR4Om51bWJlcjtcclxuXHJcblx0XHR0aGlzLnJlbW92ZUFzc2V0RnJvbURpY3QoYXNzZXQpO1xyXG5cclxuXHRcdGFzc2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9SRU5BTUUsIHRoaXMuX29uQXNzZXRSZW5hbWVEZWxlZ2F0ZSk7XHJcblx0XHRhc3NldC5yZW1vdmVFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuQVNTRVRfQ09ORkxJQ1RfUkVTT0xWRUQsIHRoaXMuX29uQXNzZXRDb25mbGljdFJlc29sdmVkRGVsZWdhdGUpO1xyXG5cclxuXHRcdGlkeCA9IHRoaXMuX2Fzc2V0cy5pbmRleE9mKGFzc2V0KTtcclxuXHJcblx0XHRpZiAoaWR4ID49IDApXHJcblx0XHRcdHRoaXMuX2Fzc2V0cy5zcGxpY2UoaWR4LCAxKTtcclxuXHJcblx0XHRpZiAoZGlzcG9zZSlcclxuXHRcdFx0YXNzZXQuZGlzcG9zZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbiBhc3NldCB3aGljaCBpcyBzcGVjaWZpZWQgdXNpbmcgbmFtZSBhbmQgbmFtZXNwYWNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGFzc2V0IHRvIGJlIHJlbW92ZWQuXHJcblx0ICogQHBhcmFtIG5zIFRoZSBuYW1lc3BhY2UgdG8gd2hpY2ggdGhlIGRlc2lyZWQgYXNzZXQgYmVsb25ncy5cclxuXHQgKiBAcGFyYW0gZGlzcG9zZSBEZWZpbmVzIHdoZXRoZXIgdGhlIGFzc2V0cyBzaG91bGQgYWxzbyBiZSBkaXNwb3NlZC5cclxuXHQgKlxyXG5cdCAqIEBzZWUgYXdheS5saWJyYXJ5LkFzc2V0TGlicmFyeS5yZW1vdmVBc3NldCgpXHJcblx0ICovXHJcblx0cHVibGljIHJlbW92ZUFzc2V0QnlOYW1lKG5hbWU6c3RyaW5nLCBuczpzdHJpbmcgPSBudWxsLCBkaXNwb3NlOmJvb2xlYW4gPSB0cnVlKTpJQXNzZXRcclxuXHR7XHJcblxyXG5cdFx0dmFyIGFzc2V0OklBc3NldCA9IHRoaXMuZ2V0QXNzZXQobmFtZSwgbnMpO1xyXG5cclxuXHRcdGlmIChhc3NldClcclxuXHRcdFx0dGhpcy5yZW1vdmVBc3NldChhc3NldCwgZGlzcG9zZSk7XHJcblxyXG5cdFx0cmV0dXJuIGFzc2V0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbGwgYXNzZXRzIGZyb20gdGhlIGFzc2V0IGxpYnJhcnksIG9wdGlvbmFsbHkgZGlzcG9zaW5nIHRoZW0gYXMgdGhleVxyXG5cdCAqIGFyZSByZW1vdmVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGRpc3Bvc2UgRGVmaW5lcyB3aGV0aGVyIHRoZSBhc3NldHMgc2hvdWxkIGFsc28gYmUgZGlzcG9zZWQuXHJcblx0ICovXHJcblx0cHVibGljIHJlbW92ZUFsbEFzc2V0cyhkaXNwb3NlOmJvb2xlYW4gPSB0cnVlKVxyXG5cdHtcclxuXHRcdGlmIChkaXNwb3NlKSB7XHJcblx0XHRcdHZhciBhc3NldDpJQXNzZXQ7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBjOm51bWJlciA9IDA7IGMgPCB0aGlzLl9hc3NldHMubGVuZ3RoOyBjKyspIHtcclxuXHRcdFx0XHRhc3NldCA9IHRoaXMuX2Fzc2V0c1sgYyBdO1xyXG5cdFx0XHRcdGFzc2V0LmRpc3Bvc2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvKlxyXG5cdFx0XHQgZm9yIGVhY2ggKGFzc2V0IGluIF9hc3NldHMpXHJcblx0XHRcdCBhc3NldC5kaXNwb3NlKCk7XHJcblx0XHRcdCAqL1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2Fzc2V0cy5sZW5ndGggPSAwO1xyXG5cdFx0dGhpcy5yZWhhc2hBc3NldERpY3QoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYWxsIGFzc2V0cyBiZWxvbmdpbmcgdG8gYSBwYXJ0aWN1bGFyIG5hbWVzcGFjZSAobnVsbCBmb3IgZGVmYXVsdClcclxuXHQgKiBmcm9tIHRoZSBhc3NldCBsaWJyYXJ5LCBhbmQgb3B0aW9uYWxsIGRpc3Bvc2VzIHRoZW0gYnkgY2FsbGluZyB0aGVpclxyXG5cdCAqIGRpc3Bvc2VBc3NldCgpIG1ldGhvZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBucyBUaGUgbmFtZXNwYWNlIGZyb20gd2hpY2ggYWxsIGFzc2V0cyBzaG91bGQgYmUgcmVtb3ZlZC5cclxuXHQgKiBAcGFyYW0gZGlzcG9zZSBEZWZpbmVzIHdoZXRoZXIgdGhlIGFzc2V0cyBzaG91bGQgYWxzbyBiZSBkaXNwb3NlZC5cclxuXHQgKlxyXG5cdCAqIEBzZWUgYXdheS5saWJyYXJ5LkFzc2V0TGlicmFyeS5yZW1vdmVBc3NldCgpXHJcblx0ICovXHJcblx0cHVibGljIHJlbW92ZU5hbWVzcGFjZUFzc2V0cyhuczpzdHJpbmcgPSBudWxsLCBkaXNwb3NlOmJvb2xlYW4gPSB0cnVlKVxyXG5cdHtcclxuXHRcdHZhciBpZHg6bnVtYmVyID0gMDtcclxuXHRcdHZhciBhc3NldDpJQXNzZXQ7XHJcblx0XHR2YXIgb2xkX2Fzc2V0czpJQXNzZXRbXTtcclxuXHJcblx0XHQvLyBFbXB0eSB0aGUgYXNzZXRzIHZlY3RvciBhZnRlciBoYXZpbmcgc3RvcmVkIGEgY29weSBvZiBpdC5cclxuXHRcdC8vIFRoZSBjb3B5IHdpbGwgYmUgZmlsbGVkIHdpdGggYWxsIGFzc2V0cyB3aGljaCB3ZXJlbid0IHJlbW92ZWQuXHJcblx0XHRvbGRfYXNzZXRzID0gdGhpcy5fYXNzZXRzLmNvbmNhdCgpO1xyXG5cdFx0dGhpcy5fYXNzZXRzLmxlbmd0aCA9IDA7XHJcblxyXG5cdFx0aWYgKG5zID09IG51bGwpXHJcblx0XHRcdG5zID0gTmFtZWRBc3NldEJhc2UuREVGQVVMVF9OQU1FU1BBQ0U7XHJcblxyXG5cdFx0Zm9yICh2YXIgZDpudW1iZXIgPSAwOyBkIDwgb2xkX2Fzc2V0cy5sZW5ndGg7IGQrKykge1xyXG5cdFx0XHRhc3NldCA9IG9sZF9hc3NldHNbZF07XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgZnJvbSBkaWN0IGlmIGluIHRoZSBzdXBwbGllZCBuYW1lc3BhY2UuIElmIG5vdCxcclxuXHRcdFx0Ly8gdHJhbnNmZXIgb3ZlciB0byB0aGUgbmV3IHZlY3Rvci5cclxuXHRcdFx0aWYgKGFzc2V0LmFzc2V0TmFtZXNwYWNlID09IG5zKSB7XHJcblx0XHRcdFx0aWYgKGRpc3Bvc2UpXHJcblx0XHRcdFx0XHRhc3NldC5kaXNwb3NlKCk7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBhc3NldCBmcm9tIGRpY3Rpb25hcnksIGJ1dCBkb24ndCB0cnkgdG8gYXV0by1yZW1vdmVcclxuXHRcdFx0XHQvLyB0aGUgbmFtZXNwYWNlLCB3aGljaCB3aWxsIHRyaWdnZXIgYW4gdW5uZWNlc3NhcmlseSBleHBlbnNpdmVcclxuXHRcdFx0XHQvLyB0ZXN0IHRoYXQgaXMgbm90IG5lZWRlZCBzaW5jZSB3ZSBrbm93IHRoYXQgdGhlIG5hbWVzcGFjZVxyXG5cdFx0XHRcdC8vIHdpbGwgYmUgZW1wdHkgd2hlbiBsb29wIGZpbmlzaGVzLlxyXG5cdFx0XHRcdHRoaXMucmVtb3ZlQXNzZXRGcm9tRGljdChhc3NldCwgZmFsc2UpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuX2Fzc2V0c1tpZHgrK10gPSBhc3NldDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQgZm9yIGVhY2ggKGFzc2V0IGluIG9sZF9hc3NldHMpIHtcclxuXHRcdCAvLyBSZW1vdmUgZnJvbSBkaWN0IGlmIGluIHRoZSBzdXBwbGllZCBuYW1lc3BhY2UuIElmIG5vdCxcclxuXHRcdCAvLyB0cmFuc2ZlciBvdmVyIHRvIHRoZSBuZXcgdmVjdG9yLlxyXG5cdFx0IGlmIChhc3NldC5hc3NldE5hbWVzcGFjZSA9PSBucykge1xyXG5cdFx0IGlmIChkaXNwb3NlKVxyXG5cdFx0IGFzc2V0LmRpc3Bvc2UoKTtcclxuXHJcblx0XHQgLy8gUmVtb3ZlIGFzc2V0IGZyb20gZGljdGlvbmFyeSwgYnV0IGRvbid0IHRyeSB0byBhdXRvLXJlbW92ZVxyXG5cdFx0IC8vIHRoZSBuYW1lc3BhY2UsIHdoaWNoIHdpbGwgdHJpZ2dlciBhbiB1bm5lY2Vzc2FyaWx5IGV4cGVuc2l2ZVxyXG5cdFx0IC8vIHRlc3QgdGhhdCBpcyBub3QgbmVlZGVkIHNpbmNlIHdlIGtub3cgdGhhdCB0aGUgbmFtZXNwYWNlXHJcblx0XHQgLy8gd2lsbCBiZSBlbXB0eSB3aGVuIGxvb3AgZmluaXNoZXMuXHJcblx0XHQgcmVtb3ZlQXNzZXRGcm9tRGljdChhc3NldCwgZmFsc2UpO1xyXG5cdFx0IH0gZWxzZVxyXG5cdFx0IF9hc3NldHNbaWR4KytdID0gYXNzZXQ7XHJcblxyXG5cdFx0IH1cclxuXHRcdCAqL1xyXG5cclxuXHRcdC8vIFJlbW92ZSBlbXB0eSBuYW1lc3BhY2VcclxuXHRcdGlmICh0aGlzLl9hc3NldERpY3Rpb25hcnkuaGFzT3duUHJvcGVydHkobnMpKVxyXG5cdFx0XHRkZWxldGUgdGhpcy5fYXNzZXREaWN0aW9uYXJ5W25zXTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgcmVtb3ZlQXNzZXRGcm9tRGljdChhc3NldDpJQXNzZXQsIGF1dG9SZW1vdmVFbXB0eU5hbWVzcGFjZTpib29sZWFuID0gdHJ1ZSlcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYXNzZXREaWN0RGlydHkpXHJcblx0XHRcdHRoaXMucmVoYXNoQXNzZXREaWN0KCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2Fzc2V0RGljdGlvbmFyeS5oYXNPd25Qcm9wZXJ0eShhc3NldC5hc3NldE5hbWVzcGFjZSkpIHtcclxuXHRcdFx0aWYgKHRoaXMuX2Fzc2V0RGljdGlvbmFyeVthc3NldC5hc3NldE5hbWVzcGFjZV0uaGFzT3duUHJvcGVydHkoYXNzZXQubmFtZSkpXHJcblx0XHRcdFx0ZGVsZXRlIHRoaXMuX2Fzc2V0RGljdGlvbmFyeVthc3NldC5hc3NldE5hbWVzcGFjZV1bYXNzZXQubmFtZV07XHJcblxyXG5cdFx0XHRpZiAoYXV0b1JlbW92ZUVtcHR5TmFtZXNwYWNlKSB7XHJcblxyXG5cdFx0XHRcdHZhciBrZXk6c3RyaW5nO1xyXG5cdFx0XHRcdHZhciBlbXB0eTpib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0Zm9yIChrZXkgaW4gdGhpcy5fYXNzZXREaWN0aW9uYXJ5W2Fzc2V0LmFzc2V0TmFtZXNwYWNlXSkge1xyXG5cdFx0XHRcdFx0ZW1wdHkgPSBmYWxzZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGVtcHR5KVxyXG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX2Fzc2V0RGljdGlvbmFyeVthc3NldC5hc3NldE5hbWVzcGFjZV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdG9wQWxsTG9hZGluZ1Nlc3Npb25zKClcclxuXHR7XHJcblx0XHR2YXIgaTpudW1iZXI7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9sb2FkaW5nU2Vzc2lvbnMpXHJcblx0XHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9ucyA9IG5ldyBBcnJheTxBc3NldExvYWRlcj4oKTtcclxuXHJcblx0XHR2YXIgbGVuZ3RoOm51bWJlciA9IHRoaXMuX2xvYWRpbmdTZXNzaW9ucy5sZW5ndGg7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxyXG5cdFx0XHR0aGlzLmtpbGxMb2FkaW5nU2Vzc2lvbih0aGlzLl9sb2FkaW5nU2Vzc2lvbnNbaV0pO1xyXG5cclxuXHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9ucyA9IG51bGw7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJlaGFzaEFzc2V0RGljdCgpXHJcblx0e1xyXG5cdFx0dmFyIGFzc2V0OklBc3NldDtcclxuXHJcblx0XHR0aGlzLl9hc3NldERpY3Rpb25hcnkgPSB7fTtcclxuXHJcblx0XHR2YXIgbDpudW1iZXIgPSB0aGlzLl9hc3NldHMubGVuZ3RoO1xyXG5cclxuXHRcdGZvciAodmFyIGM6bnVtYmVyID0gMDsgYyA8IGw7IGMrKykge1xyXG5cdFx0XHRhc3NldCA9IHRoaXMuX2Fzc2V0c1tjXTtcclxuXHJcblx0XHRcdGlmICghdGhpcy5fYXNzZXREaWN0aW9uYXJ5Lmhhc093blByb3BlcnR5KGFzc2V0LmFzc2V0TmFtZXNwYWNlKSlcclxuXHRcdFx0XHR0aGlzLl9hc3NldERpY3Rpb25hcnlbYXNzZXQuYXNzZXROYW1lc3BhY2VdID0ge307XHJcblxyXG5cdFx0XHR0aGlzLl9hc3NldERpY3Rpb25hcnlbYXNzZXQuYXNzZXROYW1lc3BhY2VdW2Fzc2V0Lm5hbWVdID0gYXNzZXQ7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2Fzc2V0RGljdERpcnR5ID0gZmFsc2U7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbGVkIHdoZW4gYSBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIGxvYWRpbmcuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBvbkxvYWRFcnJvcihldmVudDpJT0Vycm9yRXZlbnQpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKElPRXJyb3JFdmVudC5JT19FUlJPUikpIHtcclxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxsZWQgd2hlbiBhIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgcGFyc2luZy5cclxuXHQgKi9cclxuXHRwcml2YXRlIG9uUGFyc2VFcnJvcihldmVudDpQYXJzZXJFdmVudCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdGlmICh0aGlzLmhhc0V2ZW50TGlzdGVuZXIoUGFyc2VyRXZlbnQuUEFSU0VfRVJST1IpKSB7XHJcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbkFzc2V0Q29tcGxldGUoZXZlbnQ6QXNzZXRFdmVudClcclxuXHR7XHJcblx0XHQvLyBPbmx5IGFkZCBhc3NldCB0byBsaWJyYXJ5IHRoZSBmaXJzdCB0aW1lLlxyXG5cdFx0aWYgKGV2ZW50LnR5cGUgPT0gQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSlcclxuXHRcdFx0dGhpcy5hZGRBc3NldChldmVudC5hc3NldCk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uVGV4dHVyZVNpemVFcnJvcihldmVudDpBc3NldEV2ZW50KVxyXG5cdHtcclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxsZWQgd2hlbiB0aGUgcmVzb3VyY2UgYW5kIGFsbCBvZiBpdHMgZGVwZW5kZW5jaWVzIHdhcyByZXRyaWV2ZWQuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBvblJlc291cmNlQ29tcGxldGUoZXZlbnQ6TG9hZGVyRXZlbnQpXHJcblx0e1xyXG5cdFx0dmFyIGxvYWRlcjpBc3NldExvYWRlciA9IDxBc3NldExvYWRlcj4gZXZlbnQudGFyZ2V0O1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblxyXG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuX2xvYWRpbmdTZXNzaW9ucy5pbmRleE9mKGxvYWRlcik7XHJcblx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcblx0XHQvLyBBZGQgbG9hZGVyIHRvIGEgZ2FyYmFnZSBhcnJheSAtIGZvciBhIGNvbGxlY3Rpb24gc3dlZXAgYW5kIGtpbGxcclxuXHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9uc0dhcmJhZ2UucHVzaChsb2FkZXIpO1xyXG5cdFx0dGhpcy5fZ2NUaW1lb3V0SUlEID0gc2V0VGltZW91dCgoKSA9PiB7dGhpcy5sb2FkaW5nU2Vzc2lvbkdDKCl9LCAxMDApO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBsb2FkaW5nU2Vzc2lvbkdDKCk6dm9pZFxyXG5cdHtcclxuXHRcdHZhciBsb2FkZXI6QXNzZXRMb2FkZXI7XHJcblxyXG5cdFx0d2hpbGUgKHRoaXMuX2xvYWRpbmdTZXNzaW9uc0dhcmJhZ2UubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRsb2FkZXIgPSB0aGlzLl9sb2FkaW5nU2Vzc2lvbnNHYXJiYWdlLnBvcCgpO1xyXG5cdFx0XHR0aGlzLmtpbGxMb2FkaW5nU2Vzc2lvbihsb2FkZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsZWFyVGltZW91dCh0aGlzLl9nY1RpbWVvdXRJSUQpO1xyXG5cdFx0dGhpcy5fZ2NUaW1lb3V0SUlEID0gbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGtpbGxMb2FkaW5nU2Vzc2lvbihsb2FkZXI6QXNzZXRMb2FkZXIpXHJcblx0e1xyXG5cdFx0bG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoTG9hZGVyRXZlbnQuUkVTT1VSQ0VfQ09NUExFVEUsIHRoaXMuX29uUmVzb3VyY2VDb21wbGV0ZURlbGVnYXRlKTtcclxuXHRcdGxvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuVEVYVFVSRV9TSVpFX0VSUk9SLCB0aGlzLl9vblRleHR1cmVTaXplRXJyb3JEZWxlZ2F0ZSk7XHJcblx0XHRsb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCB0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSk7XHJcblx0XHRsb2FkZXIuc3RvcCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbGVkIHdoZW4gdW5lc3BlY3RlZCBlcnJvciBvY2N1cnNcclxuXHQgKi9cclxuXHQvKlxyXG5cdCBwcml2YXRlIG9uUmVzb3VyY2VFcnJvcigpIDogdm9pZFxyXG5cdCB7XHJcblx0IHZhciBtc2c6c3RyaW5nID0gXCJVbmV4cGVjdGVkIHBhcnNlciBlcnJvclwiO1xyXG5cdCBpZihoYXNFdmVudExpc3RlbmVyKExvYWRlckV2ZW50LkRFUEVOREVOQ1lfRVJST1IpKXtcclxuXHQgdmFyIHJlOkxvYWRlckV2ZW50ID0gbmV3IExvYWRlckV2ZW50KExvYWRlckV2ZW50LkRFUEVOREVOQ1lfRVJST1IsIFwiXCIpO1xyXG5cdCBkaXNwYXRjaEV2ZW50KHJlKTtcclxuXHQgfSBlbHNle1xyXG5cdCB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuXHQgfVxyXG5cdCB9XHJcblx0ICovXHJcblxyXG5cdHByaXZhdGUgb25Bc3NldFJlbmFtZShldmVudDpBc3NldEV2ZW50KVxyXG5cdHtcclxuXHRcdHZhciBhc3NldDpJQXNzZXQgPSA8SUFzc2V0ID4gZXZlbnQudGFyZ2V0Oy8vIFRPRE86IHdhcyBldi5jdXJyZW50VGFyZ2V0IC0gd2F0Y2ggdGhpcyB2YXJcclxuXHRcdHZhciBvbGQ6SUFzc2V0ID0gdGhpcy5nZXRBc3NldChhc3NldC5hc3NldE5hbWVzcGFjZSwgYXNzZXQubmFtZSk7XHJcblxyXG5cdFx0aWYgKG9sZCAhPSBudWxsKSB7XHJcblx0XHRcdHRoaXMuX3N0cmF0ZWd5LnJlc29sdmVDb25mbGljdChhc3NldCwgb2xkLCB0aGlzLl9hc3NldERpY3Rpb25hcnlbYXNzZXQuYXNzZXROYW1lc3BhY2VdLCB0aGlzLl9zdHJhdGVneVByZWZlcmVuY2UpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGRpY3Q6T2JqZWN0ID0gdGhpcy5fYXNzZXREaWN0aW9uYXJ5W2V2ZW50LmFzc2V0LmFzc2V0TmFtZXNwYWNlXTtcclxuXHJcblx0XHRcdGlmIChkaWN0ID09IG51bGwpXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0ZGljdFtldmVudC5hc3NldFByZXZOYW1lXSA9IG51bGw7XHJcblx0XHRcdGRpY3RbZXZlbnQuYXNzZXQubmFtZV0gPSBldmVudC5hc3NldDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25Bc3NldENvbmZsaWN0UmVzb2x2ZWQoZXZlbnQ6QXNzZXRFdmVudClcclxuXHR7XHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQuY2xvbmUoKSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBBc3NldExpYnJhcnlCdW5kbGU7Il19