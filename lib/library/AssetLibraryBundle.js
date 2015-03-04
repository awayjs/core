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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeUJ1bmRsZS50cyJdLCJuYW1lcyI6WyJBc3NldExpYnJhcnlCdW5kbGUiLCJBc3NldExpYnJhcnlCdW5kbGUuY29uc3RydWN0b3IiLCJBc3NldExpYnJhcnlCdW5kbGUuZ2V0SW5zdGFuY2UiLCJBc3NldExpYnJhcnlCdW5kbGUuZW5hYmxlUGFyc2VyIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLmVuYWJsZVBhcnNlcnMiLCJBc3NldExpYnJhcnlCdW5kbGUuY29uZmxpY3RTdHJhdGVneSIsIkFzc2V0TGlicmFyeUJ1bmRsZS5jb25mbGljdFByZWNlZGVuY2UiLCJBc3NldExpYnJhcnlCdW5kbGUuY3JlYXRlSXRlcmF0b3IiLCJBc3NldExpYnJhcnlCdW5kbGUubG9hZCIsIkFzc2V0TGlicmFyeUJ1bmRsZS5sb2FkRGF0YSIsIkFzc2V0TGlicmFyeUJ1bmRsZS5nZXRBc3NldCIsIkFzc2V0TGlicmFyeUJ1bmRsZS5hZGRBc3NldCIsIkFzc2V0TGlicmFyeUJ1bmRsZS5yZW1vdmVBc3NldCIsIkFzc2V0TGlicmFyeUJ1bmRsZS5yZW1vdmVBc3NldEJ5TmFtZSIsIkFzc2V0TGlicmFyeUJ1bmRsZS5yZW1vdmVBbGxBc3NldHMiLCJBc3NldExpYnJhcnlCdW5kbGUucmVtb3ZlTmFtZXNwYWNlQXNzZXRzIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLnJlbW92ZUFzc2V0RnJvbURpY3QiLCJBc3NldExpYnJhcnlCdW5kbGUuc3RvcEFsbExvYWRpbmdTZXNzaW9ucyIsIkFzc2V0TGlicmFyeUJ1bmRsZS5yZWhhc2hBc3NldERpY3QiLCJBc3NldExpYnJhcnlCdW5kbGUub25Mb2FkRXJyb3IiLCJBc3NldExpYnJhcnlCdW5kbGUub25QYXJzZUVycm9yIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLm9uQXNzZXRDb21wbGV0ZSIsIkFzc2V0TGlicmFyeUJ1bmRsZS5vblRleHR1cmVTaXplRXJyb3IiLCJBc3NldExpYnJhcnlCdW5kbGUub25SZXNvdXJjZUNvbXBsZXRlIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLmxvYWRpbmdTZXNzaW9uR0MiLCJBc3NldExpYnJhcnlCdW5kbGUua2lsbExvYWRpbmdTZXNzaW9uIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLm9uQXNzZXRSZW5hbWUiLCJBc3NldExpYnJhcnlCdW5kbGUub25Bc3NldENvbmZsaWN0UmVzb2x2ZWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLElBQU8sb0JBQW9CLFdBQVksOENBQThDLENBQUMsQ0FBQztBQUN2RixJQUFPLFdBQVcsV0FBYyxxQ0FBcUMsQ0FBQyxDQUFDO0FBR3ZFLElBQU8sa0JBQWtCLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUNuRixJQUFPLGdCQUFnQixXQUFhLDBDQUEwQyxDQUFDLENBQUM7QUFFaEYsSUFBTyxjQUFjLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQUU1RSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBQzNELElBQU8sVUFBVSxXQUFjLG1DQUFtQyxDQUFDLENBQUM7QUFDcEUsSUFBTyxZQUFZLFdBQWMscUNBQXFDLENBQUMsQ0FBQztBQUN4RSxJQUFPLFdBQVcsV0FBYyxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ3RFLElBQU8sZUFBZSxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFDN0UsSUFBTyxXQUFXLFdBQWMsb0NBQW9DLENBQUMsQ0FBQztBQUd0RSxBQUtBOzs7O0dBREc7SUFDRyxrQkFBa0I7SUFBU0EsVUFBM0JBLGtCQUFrQkEsVUFBd0JBO0lBcUIvQ0E7Ozs7T0FJR0E7SUFDSEEsU0ExQktBLGtCQUFrQkE7UUFBeEJDLGlCQW9rQkNBO1FBeGlCQ0EsaUJBQU9BLENBQUNBO1FBbEJEQSw0QkFBdUJBLEdBQXNCQSxJQUFJQSxLQUFLQSxFQUFlQSxDQUFDQTtRQW9CN0VBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLEtBQUtBLEVBQVVBLEVBQUNBLHNCQUFzQkE7UUFDekRBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FB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QUtBLENBQUNBLEtBQUtBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBO1lBRXBFQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDaEJBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLGFBQWFBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1lBQ2pDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUN0Q0EsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFTzFCLG9EQUF1QkEsR0FBL0JBLFVBQWdDQSxLQUFnQkE7UUFFL0MyQixJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQTtJQUNuQ0EsQ0FBQ0E7SUFqa0JhM0IsOEJBQVdBLEdBQVVBLElBQUlBLE1BQU1BLEVBQUVBLENBQUNBO0lBa2tCakRBLHlCQUFDQTtBQUFEQSxDQXBrQkEsQUFva0JDQSxFQXBrQmdDLGVBQWUsRUFva0IvQztBQUVELEFBQTRCLGlCQUFuQixrQkFBa0IsQ0FBQyIsImZpbGUiOiJsaWJyYXJ5L0Fzc2V0TGlicmFyeUJ1bmRsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVVJMUmVxdWVzdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxSZXF1ZXN0XCIpO1xuaW1wb3J0IEFzc2V0TGlicmFyeVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMaWJyYXJ5XCIpO1xuaW1wb3J0IEFzc2V0TGlicmFyeUl0ZXJhdG9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeUl0ZXJhdG9yXCIpO1xuaW1wb3J0IEFzc2V0TG9hZGVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldExvYWRlclwiKTtcbmltcG9ydCBBc3NldExvYWRlclRva2VuXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMb2FkZXJUb2tlblwiKTtcbmltcG9ydCBBc3NldExvYWRlckNvbnRleHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMb2FkZXJDb250ZXh0XCIpO1xuaW1wb3J0IENvbmZsaWN0UHJlY2VkZW5jZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Db25mbGljdFByZWNlZGVuY2VcIik7XG5pbXBvcnQgQ29uZmxpY3RTdHJhdGVneVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0NvbmZsaWN0U3RyYXRlZ3lcIik7XG5pbXBvcnQgQ29uZmxpY3RTdHJhdGVneUJhc2VcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQ29uZmxpY3RTdHJhdGVneUJhc2VcIik7XG5pbXBvcnQgTmFtZWRBc3NldEJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcbmltcG9ydCBJQXNzZXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IEVycm9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XG5pbXBvcnQgQXNzZXRFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9Bc3NldEV2ZW50XCIpO1xuaW1wb3J0IElPRXJyb3JFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9JT0Vycm9yRXZlbnRcIik7XG5pbXBvcnQgTG9hZGVyRXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvTG9hZGVyRXZlbnRcIik7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIik7XG5pbXBvcnQgUGFyc2VyRXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvUGFyc2VyRXZlbnRcIik7XG5pbXBvcnQgUGFyc2VyQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3BhcnNlcnMvUGFyc2VyQmFzZVwiKTtcblxuLyoqXG4gKiBBc3NldExpYnJhcnlCdW5kbGUgZW5mb3JjZXMgYSBtdWx0aXRvbiBwYXR0ZXJuIGFuZCBpcyBub3QgaW50ZW5kZWQgdG8gYmUgaW5zdGFuY2VkIGRpcmVjdGx5LlxuICogSXRzIHB1cnBvc2UgaXMgdG8gY3JlYXRlIGEgY29udGFpbmVyIGZvciAzRCBkYXRhIG1hbmFnZW1lbnQsIGJvdGggYmVmb3JlIGFuZCBhZnRlciBwYXJzaW5nLlxuICogSWYgeW91IGFyZSBpbnRlcmVzdGVkIGluIGNyZWF0aW5nIG11bHRpcGxlIGxpYnJhcnkgYnVuZGxlcywgcGxlYXNlIHVzZSB0aGUgPGNvZGU+Z2V0SW5zdGFuY2UoKTwvY29kZT4gbWV0aG9kLlxuICovXG5jbGFzcyBBc3NldExpYnJhcnlCdW5kbGUgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcbntcblx0cHVibGljIHN0YXRpYyBfaUluc3RhbmNlczpPYmplY3QgPSBuZXcgT2JqZWN0KCk7XG5cblx0cHJpdmF0ZSBfbG9hZGluZ1Nlc3Npb25zOkFycmF5PEFzc2V0TG9hZGVyPjtcblx0cHJpdmF0ZSBfc3RyYXRlZ3k6Q29uZmxpY3RTdHJhdGVneUJhc2U7XG5cdHByaXZhdGUgX3N0cmF0ZWd5UHJlZmVyZW5jZTpzdHJpbmc7XG5cdHByaXZhdGUgX2Fzc2V0czpBcnJheTxJQXNzZXQ+O1xuXHRwcml2YXRlIF9hc3NldERpY3Rpb25hcnk6T2JqZWN0O1xuXHRwcml2YXRlIF9hc3NldERpY3REaXJ0eTpib29sZWFuO1xuXHRwcml2YXRlIF9sb2FkaW5nU2Vzc2lvbnNHYXJiYWdlOkFycmF5PEFzc2V0TG9hZGVyPiA9IG5ldyBBcnJheTxBc3NldExvYWRlcj4oKTtcblx0cHJpdmF0ZSBfZ2NUaW1lb3V0SUlEOm51bWJlcjtcblxuXHRwcml2YXRlIF9vbkFzc2V0UmVuYW1lRGVsZWdhdGU6KGV2ZW50OkFzc2V0RXZlbnQpID0+IHZvaWQ7XG5cdHByaXZhdGUgX29uQXNzZXRDb25mbGljdFJlc29sdmVkRGVsZWdhdGU6KGV2ZW50OkFzc2V0RXZlbnQpID0+IHZvaWQ7XG5cdHByaXZhdGUgX29uUmVzb3VyY2VDb21wbGV0ZURlbGVnYXRlOihldmVudDpMb2FkZXJFdmVudCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfb25UZXh0dXJlU2l6ZUVycm9yRGVsZWdhdGU6KGV2ZW50OkFzc2V0RXZlbnQpID0+IHZvaWQ7XG5cdHByaXZhdGUgX29uQXNzZXRDb21wbGV0ZURlbGVnYXRlOihldmVudDpBc3NldEV2ZW50KSA9PiB2b2lkO1xuXHRwcml2YXRlIF9vbkxvYWRFcnJvckRlbGVnYXRlOihldmVudDpJT0Vycm9yRXZlbnQpID0+IGJvb2xlYW47XG5cdHByaXZhdGUgX29uUGFyc2VFcnJvckRlbGVnYXRlOihldmVudDpQYXJzZXJFdmVudCkgPT4gYm9vbGVhbjtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyA8Y29kZT5Bc3NldExpYnJhcnlCdW5kbGU8L2NvZGU+IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIG1lIEEgbXVsdGl0b24gZW5mb3JjZXIgZm9yIHRoZSBBc3NldExpYnJhcnlCdW5kbGUgZW5zdXJpbmcgaXQgY2Fubm5vdCBiZSBpbnN0YW5jZWQuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fYXNzZXRzID0gbmV3IEFycmF5PElBc3NldD4oKTsvL25ldyBWZWN0b3IuPElBc3NldD47XG5cdFx0dGhpcy5fYXNzZXREaWN0aW9uYXJ5ID0gbmV3IE9iamVjdCgpO1xuXHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9ucyA9IG5ldyBBcnJheTxBc3NldExvYWRlcj4oKTtcblxuXHRcdHRoaXMuY29uZmxpY3RTdHJhdGVneSA9IENvbmZsaWN0U3RyYXRlZ3kuSUdOT1JFLmNyZWF0ZSgpO1xuXHRcdHRoaXMuY29uZmxpY3RQcmVjZWRlbmNlID0gQ29uZmxpY3RQcmVjZWRlbmNlLkZBVk9SX05FVztcblxuXHRcdHRoaXMuX29uQXNzZXRSZW5hbWVEZWxlZ2F0ZSA9IChldmVudDpBc3NldEV2ZW50KSA9PiB0aGlzLm9uQXNzZXRSZW5hbWUoZXZlbnQpO1xuXHRcdHRoaXMuX29uQXNzZXRDb25mbGljdFJlc29sdmVkRGVsZWdhdGUgPSAoZXZlbnQ6QXNzZXRFdmVudCkgPT4gdGhpcy5vbkFzc2V0Q29uZmxpY3RSZXNvbHZlZChldmVudCk7XG5cdFx0dGhpcy5fb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGUgPSAoZXZlbnQ6TG9hZGVyRXZlbnQpID0+IHRoaXMub25SZXNvdXJjZUNvbXBsZXRlKGV2ZW50KTtcblx0XHR0aGlzLl9vblRleHR1cmVTaXplRXJyb3JEZWxlZ2F0ZSA9IChldmVudDpBc3NldEV2ZW50KSA9PiB0aGlzLm9uVGV4dHVyZVNpemVFcnJvcihldmVudCk7XG5cdFx0dGhpcy5fb25Bc3NldENvbXBsZXRlRGVsZWdhdGUgPSAoZXZlbnQ6QXNzZXRFdmVudCkgPT4gdGhpcy5vbkFzc2V0Q29tcGxldGUoZXZlbnQpO1xuXHRcdHRoaXMuX29uTG9hZEVycm9yRGVsZWdhdGUgPSAoZXZlbnQ6SU9FcnJvckV2ZW50KSA9PiB0aGlzLm9uTG9hZEVycm9yKGV2ZW50KTtcblx0XHR0aGlzLl9vblBhcnNlRXJyb3JEZWxlZ2F0ZSA9IChldmVudDpQYXJzZXJFdmVudCkgPT4gdGhpcy5vblBhcnNlRXJyb3IoZXZlbnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gQXNzZXRMaWJyYXJ5QnVuZGxlIGluc3RhbmNlLiBJZiBubyBrZXkgaXMgZ2l2ZW4sIHJldHVybnMgdGhlIGRlZmF1bHQgYnVuZGxlIGluc3RhbmNlICh3aGljaCBpc1xuXHQgKiBzaW1pbGFyIHRvIHVzaW5nIHRoZSBBc3NldExpYnJhcnlCdW5kbGUgYXMgYSBzaW5nbGV0b24uKSBUbyBrZWVwIHNldmVyYWwgc2VwYXJhdGVkIGxpYnJhcnkgYnVuZGxlcyxcblx0ICogcGFzcyBhIHN0cmluZyBrZXkgdG8gdGhpcyBtZXRob2QgdG8gZGVmaW5lIHdoaWNoIGJ1bmRsZSBzaG91bGQgYmUgcmV0dXJuZWQuIFRoaXMgaXNcblx0ICogcmVmZXJyZWQgdG8gYXMgdXNpbmcgdGhlIEFzc2V0TGlicmFyeSBhcyBhIG11bHRpdG9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ga2V5IERlZmluZXMgd2hpY2ggbXVsdGl0b24gaW5zdGFuY2Ugc2hvdWxkIGJlIHJldHVybmVkLlxuXHQgKiBAcmV0dXJuIEFuIGluc3RhbmNlIG9mIHRoZSBhc3NldCBsaWJyYXJ5XG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKGtleTpzdHJpbmcgPSAnZGVmYXVsdCcpOkFzc2V0TGlicmFyeUJ1bmRsZVxuXHR7XG5cdFx0aWYgKCFrZXkpXG5cdFx0XHRrZXkgPSAnZGVmYXVsdCc7XG5cblx0XHRpZiAoIUFzc2V0TGlicmFyeUJ1bmRsZS5faUluc3RhbmNlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuXHRcdFx0QXNzZXRMaWJyYXJ5QnVuZGxlLl9pSW5zdGFuY2VzW2tleV0gPSBuZXcgQXNzZXRMaWJyYXJ5QnVuZGxlKCk7XG5cblx0XHRyZXR1cm4gQXNzZXRMaWJyYXJ5QnVuZGxlLl9pSW5zdGFuY2VzW2tleV07XG5cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGVuYWJsZVBhcnNlcihwYXJzZXJDbGFzczpPYmplY3QpXG5cdHtcblx0XHRBc3NldExvYWRlci5lbmFibGVQYXJzZXIocGFyc2VyQ2xhc3MpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZW5hYmxlUGFyc2VycyhwYXJzZXJDbGFzc2VzOk9iamVjdFtdKVxuXHR7XG5cdFx0QXNzZXRMb2FkZXIuZW5hYmxlUGFyc2VycyhwYXJzZXJDbGFzc2VzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHdoaWNoIHN0cmF0ZWd5IHNob3VsZCBiZSB1c2VkIGZvciByZXNvbHZpbmcgbmFtaW5nIGNvbmZsaWN0cywgd2hlbiB0d28gbGlicmFyeVxuXHQgKiBhc3NldHMgYXJlIGdpdmVuIHRoZSBzYW1lIG5hbWUuIEJ5IGRlZmF1bHQsIDxjb2RlPkNvbmZsaWN0U3RyYXRlZ3kuQVBQRU5EX05VTV9TVUZGSVg8L2NvZGU+XG5cdCAqIGlzIHVzZWQgd2hpY2ggbWVhbnMgdGhhdCBhIG51bWVyaWMgc3VmZml4IGlzIGFwcGVuZGVkIHRvIG9uZSBvZiB0aGUgYXNzZXRzLiBUaGVcblx0ICogPGNvZGU+Y29uZmxpY3RQcmVjZWRlbmNlPC9jb2RlPiBwcm9wZXJ0eSBkZWZpbmVzIHdoaWNoIG9mIHRoZSB0d28gY29uZmxpY3RpbmcgYXNzZXRzIHdpbGxcblx0ICogYmUgcmVuYW1lZC5cblx0ICpcblx0ICogQHNlZSBuYW1pbmcuQ29uZmxpY3RTdHJhdGVneVxuXHQgKiBAc2VlIEFzc2V0TGlicmFyeS5jb25mbGljdFByZWNlZGVuY2Vcblx0ICovXG5cdHB1YmxpYyBnZXQgY29uZmxpY3RTdHJhdGVneSgpOkNvbmZsaWN0U3RyYXRlZ3lCYXNlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc3RyYXRlZ3k7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGNvbmZsaWN0U3RyYXRlZ3kodmFsOkNvbmZsaWN0U3RyYXRlZ3lCYXNlKVxuXHR7XG5cblx0XHRpZiAoIXZhbClcblx0XHRcdHRocm93IG5ldyBFcnJvcignbmFtaW5nU3RyYXRlZ3kgbXVzdCBub3QgYmUgbnVsbC4gVG8gaWdub3JlIG5hbWluZywgdXNlIEFzc2V0TGlicmFyeS5JR05PUkUnKTtcblxuXHRcdHRoaXMuX3N0cmF0ZWd5ID0gdmFsLmNyZWF0ZSgpO1xuXG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB3aGljaCBhc3NldCBzaG91bGQgaGF2ZSBwcmVjZWRlbmNlIHdoZW4gcmVzb2x2aW5nIGEgbmFtaW5nIGNvbmZsaWN0IGJldHdlZW5cblx0ICogdHdvIGFzc2V0cyBvZiB3aGljaCBvbmUgaGFzIGp1c3QgYmVlbiByZW5hbWVkIGJ5IHRoZSB1c2VyIG9yIGJ5IGEgcGFyc2VyLiBCeSBkZWZhdWx0XG5cdCAqIDxjb2RlPkNvbmZsaWN0UHJlY2VkZW5jZS5GQVZPUl9ORVc8L2NvZGU+IGlzIHVzZWQsIG1lYW5pbmcgdGhhdCB0aGUgbmV3bHkgcmVuYW1lZFxuXHQgKiBhc3NldCB3aWxsIGtlZXAgaXQncyBuZXcgbmFtZSB3aGlsZSB0aGUgb2xkZXIgYXNzZXQgZ2V0cyByZW5hbWVkIHRvIG5vdCBjb25mbGljdC5cblx0ICpcblx0ICogVGhpcyBwcm9wZXJ0eSBpcyBpZ25vcmVkIGZvciBjb25mbGljdCBzdHJhdGVnaWVzIHRoYXQgZG8gbm90IGFjdHVhbGx5IHJlbmFtZSBhblxuXHQgKiBhc3NldCBhdXRvbWF0aWNhbGx5LCBzdWNoIGFzIENvbmZsaWN0U3RyYXRlZ3kuSUdOT1JFIGFuZCBDb25mbGljdFN0cmF0ZWd5LlRIUk9XX0VSUk9SLlxuXHQgKlxuXHQgKiBAc2VlIGF3YXkubGlicmFyeS5Db25mbGljdFByZWNlZGVuY2Vcblx0ICogQHNlZSBhd2F5LmxpYnJhcnkuQ29uZmxpY3RTdHJhdGVneVxuXHQgKi9cblx0cHVibGljIGdldCBjb25mbGljdFByZWNlZGVuY2UoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zdHJhdGVneVByZWZlcmVuY2U7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGNvbmZsaWN0UHJlY2VkZW5jZSh2YWw6c3RyaW5nKVxuXHR7XG5cdFx0dGhpcy5fc3RyYXRlZ3lQcmVmZXJlbmNlID0gdmFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhbiBBc3NldExpYnJhcnlJdGVyYXRvciBpbnN0YW5jZSB0aGF0IGNhbiBiZSB1c2VkIHRvIGl0ZXJhdGUgb3ZlciB0aGUgYXNzZXRzXG5cdCAqIGluIHRoaXMgYXNzZXQgbGlicmFyeSBpbnN0YW5jZS4gVGhlIGl0ZXJhdG9yIGNhbiBmaWx0ZXIgYXNzZXRzIG9uIGFzc2V0IHR5cGUgYW5kL29yXG5cdCAqIG5hbWVzcGFjZS4gQSBcIm51bGxcIiBmaWx0ZXIgdmFsdWUgbWVhbnMgbm8gZmlsdGVyIG9mIHRoYXQgdHlwZSBpcyB1c2VkLlxuXHQgKlxuXHQgKiBAcGFyYW0gYXNzZXRUeXBlRmlsdGVyIEFzc2V0IHR5cGUgdG8gZmlsdGVyIG9uIChmcm9tIHRoZSBBc3NldFR5cGUgZW51bSBjbGFzcy4pIFVzZVxuXHQgKiBudWxsIHRvIG5vdCBmaWx0ZXIgb24gYXNzZXQgdHlwZS5cblx0ICogQHBhcmFtIG5hbWVzcGFjZUZpbHRlciBOYW1lc3BhY2UgdG8gZmlsdGVyIG9uLiBVc2UgbnVsbCB0byBub3QgZmlsdGVyIG9uIG5hbWVzcGFjZS5cblx0ICogQHBhcmFtIGZpbHRlckZ1bmMgQ2FsbGJhY2sgZnVuY3Rpb24gdG8gdXNlIHdoZW4gZGVjaWRpbmcgd2hldGhlciBhbiBhc3NldCBzaG91bGQgYmVcblx0ICogaW5jbHVkZWQgaW4gdGhlIGl0ZXJhdGlvbiBvciBub3QuIFRoaXMgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgc2luZ2xlXG5cdCAqIHBhcmFtZXRlciBvZiB0eXBlIElBc3NldCBhbmQgcmV0dXJucyBhIGJvb2xlYW4gd2hlcmUgdHJ1ZSBtZWFucyBpdCBzaG91bGQgYmUgaW5jbHVkZWQuXG5cdCAqXG5cdCAqIEBzZWUgYXdheS5saWJyYXJ5LkFzc2V0VHlwZVxuXHQgKi9cblx0cHVibGljIGNyZWF0ZUl0ZXJhdG9yKGFzc2V0VHlwZUZpbHRlcjpzdHJpbmcgPSBudWxsLCBuYW1lc3BhY2VGaWx0ZXI6c3RyaW5nID0gbnVsbCwgZmlsdGVyRnVuYyA9IG51bGwpOkFzc2V0TGlicmFyeUl0ZXJhdG9yXG5cdHtcblx0XHRyZXR1cm4gbmV3IEFzc2V0TGlicmFyeUl0ZXJhdG9yKHRoaXMuX2Fzc2V0cywgYXNzZXRUeXBlRmlsdGVyLCBuYW1lc3BhY2VGaWx0ZXIsIGZpbHRlckZ1bmMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIExvYWRzIGEgZmlsZSBhbmQgKG9wdGlvbmFsbHkpIGFsbCBvZiBpdHMgZGVwZW5kZW5jaWVzLlxuXHQgKlxuXHQgKiBAcGFyYW0gcmVxIFRoZSBVUkxSZXF1ZXN0IG9iamVjdCBjb250YWluaW5nIHRoZSBVUkwgb2YgdGhlIGZpbGUgdG8gYmUgbG9hZGVkLlxuXHQgKiBAcGFyYW0gY29udGV4dCBBbiBvcHRpb25hbCBjb250ZXh0IG9iamVjdCBwcm92aWRpbmcgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciBsb2FkaW5nXG5cdCAqIEBwYXJhbSBucyBBbiBvcHRpb25hbCBuYW1lc3BhY2Ugc3RyaW5nIHVuZGVyIHdoaWNoIHRoZSBmaWxlIGlzIHRvIGJlIGxvYWRlZCwgYWxsb3dpbmcgdGhlIGRpZmZlcmVudGlhdGlvbiBvZiB0d28gcmVzb3VyY2VzIHdpdGggaWRlbnRpY2FsIGFzc2V0c1xuXHQgKiBAcGFyYW0gcGFyc2VyIEFuIG9wdGlvbmFsIHBhcnNlciBvYmplY3QgZm9yIHRyYW5zbGF0aW5nIHRoZSBsb2FkZWQgZGF0YSBpbnRvIGEgdXNhYmxlIHJlc291cmNlLiBJZiBub3QgcHJvdmlkZWQsIEFzc2V0TG9hZGVyIHdpbGwgYXR0ZW1wdCB0byBhdXRvLWRldGVjdCB0aGUgZmlsZSB0eXBlLlxuXHQgKiBAcmV0dXJuIEEgaGFuZGxlIHRvIHRoZSByZXRyaWV2ZWQgcmVzb3VyY2UuXG5cdCAqL1xuXHRwdWJsaWMgbG9hZChyZXE6VVJMUmVxdWVzdCwgY29udGV4dDpBc3NldExvYWRlckNvbnRleHQgPSBudWxsLCBuczpzdHJpbmcgPSBudWxsLCBwYXJzZXI6UGFyc2VyQmFzZSA9IG51bGwpOkFzc2V0TG9hZGVyVG9rZW5cblx0e1xuXHRcdHZhciBsb2FkZXI6QXNzZXRMb2FkZXIgPSBuZXcgQXNzZXRMb2FkZXIoKTtcblxuXHRcdGlmICghdGhpcy5fbG9hZGluZ1Nlc3Npb25zKVxuXHRcdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zID0gbmV3IEFycmF5PEFzc2V0TG9hZGVyPigpO1xuXG5cdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zLnB1c2gobG9hZGVyKTtcblxuXHRcdGxvYWRlci5hZGRFdmVudExpc3RlbmVyKExvYWRlckV2ZW50LlJFU09VUkNFX0NPTVBMRVRFLCB0aGlzLl9vblJlc291cmNlQ29tcGxldGVEZWxlZ2F0ZSk7XG5cdFx0bG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5URVhUVVJFX1NJWkVfRVJST1IsIHRoaXMuX29uVGV4dHVyZVNpemVFcnJvckRlbGVnYXRlKTtcblx0XHRsb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCB0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSk7XG5cblx0XHQvLyBFcnJvciBhcmUgaGFuZGxlZCBzZXBhcmF0ZWx5IChzZWUgZG9jdW1lbnRhdGlvbiBmb3IgYWRkRXJyb3JIYW5kbGVyKVxuXHRcdGxvYWRlci5faUFkZEVycm9ySGFuZGxlcih0aGlzLl9vbkxvYWRFcnJvckRlbGVnYXRlKTtcblx0XHRsb2FkZXIuX2lBZGRQYXJzZUVycm9ySGFuZGxlcih0aGlzLl9vblBhcnNlRXJyb3JEZWxlZ2F0ZSk7XG5cblx0XHRyZXR1cm4gbG9hZGVyLmxvYWQocmVxLCBjb250ZXh0LCBucywgcGFyc2VyKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBMb2FkcyBhIHJlc291cmNlIGZyb20gZXhpc3RpbmcgZGF0YSBpbiBtZW1vcnkuXG5cdCAqXG5cdCAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIG9iamVjdCBjb250YWluaW5nIGFsbCByZXNvdXJjZSBpbmZvcm1hdGlvbi5cblx0ICogQHBhcmFtIGNvbnRleHQgQW4gb3B0aW9uYWwgY29udGV4dCBvYmplY3QgcHJvdmlkaW5nIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgbG9hZGluZ1xuXHQgKiBAcGFyYW0gbnMgQW4gb3B0aW9uYWwgbmFtZXNwYWNlIHN0cmluZyB1bmRlciB3aGljaCB0aGUgZmlsZSBpcyB0byBiZSBsb2FkZWQsIGFsbG93aW5nIHRoZSBkaWZmZXJlbnRpYXRpb24gb2YgdHdvIHJlc291cmNlcyB3aXRoIGlkZW50aWNhbCBhc3NldHNcblx0ICogQHBhcmFtIHBhcnNlciBBbiBvcHRpb25hbCBwYXJzZXIgb2JqZWN0IGZvciB0cmFuc2xhdGluZyB0aGUgbG9hZGVkIGRhdGEgaW50byBhIHVzYWJsZSByZXNvdXJjZS4gSWYgbm90IHByb3ZpZGVkLCBBc3NldExvYWRlciB3aWxsIGF0dGVtcHQgdG8gYXV0by1kZXRlY3QgdGhlIGZpbGUgdHlwZS5cblx0ICogQHJldHVybiBBIGhhbmRsZSB0byB0aGUgcmV0cmlldmVkIHJlc291cmNlLlxuXHQgKi9cblx0cHVibGljIGxvYWREYXRhKGRhdGE6YW55LCBjb250ZXh0OkFzc2V0TG9hZGVyQ29udGV4dCA9IG51bGwsIG5zOnN0cmluZyA9IG51bGwsIHBhcnNlcjpQYXJzZXJCYXNlID0gbnVsbCk6QXNzZXRMb2FkZXJUb2tlblxuXHR7XG5cdFx0dmFyIGxvYWRlcjpBc3NldExvYWRlciA9IG5ldyBBc3NldExvYWRlcigpO1xuXG5cdFx0aWYgKCF0aGlzLl9sb2FkaW5nU2Vzc2lvbnMpXG5cdFx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMgPSBuZXcgQXJyYXk8QXNzZXRMb2FkZXI+KCk7XG5cblx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMucHVzaChsb2FkZXIpO1xuXG5cdFx0bG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoTG9hZGVyRXZlbnQuUkVTT1VSQ0VfQ09NUExFVEUsIHRoaXMuX29uUmVzb3VyY2VDb21wbGV0ZURlbGVnYXRlKTtcblx0XHRsb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LlRFWFRVUkVfU0laRV9FUlJPUiwgdGhpcy5fb25UZXh0dXJlU2l6ZUVycm9yRGVsZWdhdGUpO1xuXHRcdGxvYWRlci5hZGRFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuQVNTRVRfQ09NUExFVEUsIHRoaXMuX29uQXNzZXRDb21wbGV0ZURlbGVnYXRlKTtcblxuXHRcdC8vIEVycm9yIGFyZSBoYW5kbGVkIHNlcGFyYXRlbHkgKHNlZSBkb2N1bWVudGF0aW9uIGZvciBhZGRFcnJvckhhbmRsZXIpXG5cdFx0bG9hZGVyLl9pQWRkRXJyb3JIYW5kbGVyKHRoaXMuX29uTG9hZEVycm9yRGVsZWdhdGUpO1xuXHRcdGxvYWRlci5faUFkZFBhcnNlRXJyb3JIYW5kbGVyKHRoaXMuX29uUGFyc2VFcnJvckRlbGVnYXRlKTtcblxuXHRcdHJldHVybiBsb2FkZXIubG9hZERhdGEoZGF0YSwgJycsIGNvbnRleHQsIG5zLCBwYXJzZXIpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0QXNzZXQobmFtZTpzdHJpbmcsIG5zOnN0cmluZyA9IG51bGwpOklBc3NldFxuXHR7XG5cdFx0Ly92YXIgYXNzZXQgOiBJQXNzZXQ7XG5cblx0XHRpZiAodGhpcy5fYXNzZXREaWN0RGlydHkpXG5cdFx0XHR0aGlzLnJlaGFzaEFzc2V0RGljdCgpO1xuXG5cdFx0aWYgKG5zID09IG51bGwpXG5cdFx0XHRucyA9IE5hbWVkQXNzZXRCYXNlLkRFRkFVTFRfTkFNRVNQQUNFO1xuXG5cdFx0aWYgKCF0aGlzLl9hc3NldERpY3Rpb25hcnkuaGFzT3duUHJvcGVydHkobnMpKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHRyZXR1cm4gdGhpcy5fYXNzZXREaWN0aW9uYXJ5W25zXVtuYW1lXTtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEFkZHMgYW4gYXNzZXQgdG8gdGhlIGFzc2V0IGxpYnJhcnksIGZpcnN0IG1ha2luZyBzdXJlIHRoYXQgaXQncyBuYW1lIGlzIHVuaXF1ZVxuXHQgKiB1c2luZyB0aGUgbWV0aG9kIGRlZmluZWQgYnkgdGhlIDxjb2RlPmNvbmZsaWN0U3RyYXRlZ3k8L2NvZGU+IGFuZFxuXHQgKiA8Y29kZT5jb25mbGljdFByZWNlZGVuY2U8L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqL1xuXHRwdWJsaWMgYWRkQXNzZXQoYXNzZXQ6SUFzc2V0KVxuXHR7XG5cdFx0dmFyIG5zOnN0cmluZztcblx0XHR2YXIgb2xkOklBc3NldDtcblxuXHRcdC8vIEJhaWwgaWYgYXNzZXQgaGFzIGFscmVhZHkgYmVlbiBhZGRlZC5cblx0XHRpZiAodGhpcy5fYXNzZXRzLmluZGV4T2YoYXNzZXQpID49IDApXG5cdFx0XHRyZXR1cm47XG5cblx0XHRvbGQgPSB0aGlzLmdldEFzc2V0KGFzc2V0Lm5hbWUsIGFzc2V0LmFzc2V0TmFtZXNwYWNlKTtcblx0XHRucyA9IGFzc2V0LmFzc2V0TmFtZXNwYWNlIHx8IE5hbWVkQXNzZXRCYXNlLkRFRkFVTFRfTkFNRVNQQUNFO1xuXG5cdFx0aWYgKG9sZCAhPSBudWxsKVxuXHRcdFx0dGhpcy5fc3RyYXRlZ3kucmVzb2x2ZUNvbmZsaWN0KGFzc2V0LCBvbGQsIHRoaXMuX2Fzc2V0RGljdGlvbmFyeVtuc10sIHRoaXMuX3N0cmF0ZWd5UHJlZmVyZW5jZSk7XG5cblx0XHQvL2NyZWF0ZSB1bmlxdWUtaWQgKGZvciBub3cgdGhpcyBpcyB1c2VkIGluIEF3YXlCdWlsZGVyIG9ubHlcblx0XHQvL2Fzc2V0LmlkID0gSURVdGlsLmNyZWF0ZVVJRCgpO1xuXG5cdFx0Ly8gQWRkIGl0XG5cdFx0dGhpcy5fYXNzZXRzLnB1c2goYXNzZXQpO1xuXG5cdFx0aWYgKCF0aGlzLl9hc3NldERpY3Rpb25hcnkuaGFzT3duUHJvcGVydHkobnMpKVxuXHRcdFx0dGhpcy5fYXNzZXREaWN0aW9uYXJ5W25zXSA9IG5ldyBPYmplY3QoKTtcblxuXHRcdHRoaXMuX2Fzc2V0RGljdGlvbmFyeVtuc11bYXNzZXQubmFtZV0gPSBhc3NldDtcblxuXHRcdGFzc2V0LmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9SRU5BTUUsIHRoaXMuX29uQXNzZXRSZW5hbWVEZWxlZ2F0ZSk7XG5cdFx0YXNzZXQuYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTkZMSUNUX1JFU09MVkVELCB0aGlzLl9vbkFzc2V0Q29uZmxpY3RSZXNvbHZlZERlbGVnYXRlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIGFuIGFzc2V0IGZyb20gdGhlIGxpYnJhcnksIGFuZCBvcHRpb25hbGx5IGRpc3Bvc2VzIHRoYXQgYXNzZXQgYnkgY2FsbGluZ1xuXHQgKiBpdCdzIGRpc3Bvc2VBc3NldCgpIG1ldGhvZCAod2hpY2ggZm9yIG1vc3QgYXNzZXRzIGlzIGltcGxlbWVudGVkIGFzIGEgZGVmYXVsdFxuXHQgKiB2ZXJzaW9uIG9mIHRoYXQgdHlwZSdzIGRpc3Bvc2UoKSBtZXRob2QuXG5cdCAqXG5cdCAqIEBwYXJhbSBhc3NldCBUaGUgYXNzZXQgd2hpY2ggc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSB0aGlzIGxpYnJhcnkuXG5cdCAqIEBwYXJhbSBkaXNwb3NlIERlZmluZXMgd2hldGhlciB0aGUgYXNzZXRzIHNob3VsZCBhbHNvIGJlIGRpc3Bvc2VkLlxuXHQgKi9cblx0cHVibGljIHJlbW92ZUFzc2V0KGFzc2V0OklBc3NldCwgZGlzcG9zZTpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdHZhciBpZHg6bnVtYmVyO1xuXG5cdFx0dGhpcy5yZW1vdmVBc3NldEZyb21EaWN0KGFzc2V0KTtcblxuXHRcdGFzc2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9SRU5BTUUsIHRoaXMuX29uQXNzZXRSZW5hbWVEZWxlZ2F0ZSk7XG5cdFx0YXNzZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTkZMSUNUX1JFU09MVkVELCB0aGlzLl9vbkFzc2V0Q29uZmxpY3RSZXNvbHZlZERlbGVnYXRlKTtcblxuXHRcdGlkeCA9IHRoaXMuX2Fzc2V0cy5pbmRleE9mKGFzc2V0KTtcblxuXHRcdGlmIChpZHggPj0gMClcblx0XHRcdHRoaXMuX2Fzc2V0cy5zcGxpY2UoaWR4LCAxKTtcblxuXHRcdGlmIChkaXNwb3NlKVxuXHRcdFx0YXNzZXQuZGlzcG9zZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgYW4gYXNzZXQgd2hpY2ggaXMgc3BlY2lmaWVkIHVzaW5nIG5hbWUgYW5kIG5hbWVzcGFjZS5cblx0ICpcblx0ICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGFzc2V0IHRvIGJlIHJlbW92ZWQuXG5cdCAqIEBwYXJhbSBucyBUaGUgbmFtZXNwYWNlIHRvIHdoaWNoIHRoZSBkZXNpcmVkIGFzc2V0IGJlbG9uZ3MuXG5cdCAqIEBwYXJhbSBkaXNwb3NlIERlZmluZXMgd2hldGhlciB0aGUgYXNzZXRzIHNob3VsZCBhbHNvIGJlIGRpc3Bvc2VkLlxuXHQgKlxuXHQgKiBAc2VlIGF3YXkubGlicmFyeS5Bc3NldExpYnJhcnkucmVtb3ZlQXNzZXQoKVxuXHQgKi9cblx0cHVibGljIHJlbW92ZUFzc2V0QnlOYW1lKG5hbWU6c3RyaW5nLCBuczpzdHJpbmcgPSBudWxsLCBkaXNwb3NlOmJvb2xlYW4gPSB0cnVlKTpJQXNzZXRcblx0e1xuXG5cdFx0dmFyIGFzc2V0OklBc3NldCA9IHRoaXMuZ2V0QXNzZXQobmFtZSwgbnMpO1xuXG5cdFx0aWYgKGFzc2V0KVxuXHRcdFx0dGhpcy5yZW1vdmVBc3NldChhc3NldCwgZGlzcG9zZSk7XG5cblx0XHRyZXR1cm4gYXNzZXQ7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlcyBhbGwgYXNzZXRzIGZyb20gdGhlIGFzc2V0IGxpYnJhcnksIG9wdGlvbmFsbHkgZGlzcG9zaW5nIHRoZW0gYXMgdGhleVxuXHQgKiBhcmUgcmVtb3ZlZC5cblx0ICpcblx0ICogQHBhcmFtIGRpc3Bvc2UgRGVmaW5lcyB3aGV0aGVyIHRoZSBhc3NldHMgc2hvdWxkIGFsc28gYmUgZGlzcG9zZWQuXG5cdCAqL1xuXHRwdWJsaWMgcmVtb3ZlQWxsQXNzZXRzKGRpc3Bvc2U6Ym9vbGVhbiA9IHRydWUpXG5cdHtcblx0XHRpZiAoZGlzcG9zZSkge1xuXHRcdFx0dmFyIGFzc2V0OklBc3NldDtcblxuXHRcdFx0Zm9yICh2YXIgYzpudW1iZXIgPSAwOyBjIDwgdGhpcy5fYXNzZXRzLmxlbmd0aDsgYysrKSB7XG5cdFx0XHRcdGFzc2V0ID0gdGhpcy5fYXNzZXRzWyBjIF07XG5cdFx0XHRcdGFzc2V0LmRpc3Bvc2UoKTtcblx0XHRcdH1cblx0XHRcdC8qXG5cdFx0XHQgZm9yIGVhY2ggKGFzc2V0IGluIF9hc3NldHMpXG5cdFx0XHQgYXNzZXQuZGlzcG9zZSgpO1xuXHRcdFx0ICovXG5cdFx0fVxuXG5cdFx0dGhpcy5fYXNzZXRzLmxlbmd0aCA9IDA7XG5cdFx0dGhpcy5yZWhhc2hBc3NldERpY3QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIGFsbCBhc3NldHMgYmVsb25naW5nIHRvIGEgcGFydGljdWxhciBuYW1lc3BhY2UgKG51bGwgZm9yIGRlZmF1bHQpXG5cdCAqIGZyb20gdGhlIGFzc2V0IGxpYnJhcnksIGFuZCBvcHRpb25hbGwgZGlzcG9zZXMgdGhlbSBieSBjYWxsaW5nIHRoZWlyXG5cdCAqIGRpc3Bvc2VBc3NldCgpIG1ldGhvZC5cblx0ICpcblx0ICogQHBhcmFtIG5zIFRoZSBuYW1lc3BhY2UgZnJvbSB3aGljaCBhbGwgYXNzZXRzIHNob3VsZCBiZSByZW1vdmVkLlxuXHQgKiBAcGFyYW0gZGlzcG9zZSBEZWZpbmVzIHdoZXRoZXIgdGhlIGFzc2V0cyBzaG91bGQgYWxzbyBiZSBkaXNwb3NlZC5cblx0ICpcblx0ICogQHNlZSBhd2F5LmxpYnJhcnkuQXNzZXRMaWJyYXJ5LnJlbW92ZUFzc2V0KClcblx0ICovXG5cdHB1YmxpYyByZW1vdmVOYW1lc3BhY2VBc3NldHMobnM6c3RyaW5nID0gbnVsbCwgZGlzcG9zZTpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdHZhciBpZHg6bnVtYmVyID0gMDtcblx0XHR2YXIgYXNzZXQ6SUFzc2V0O1xuXHRcdHZhciBvbGRfYXNzZXRzOklBc3NldFtdO1xuXG5cdFx0Ly8gRW1wdHkgdGhlIGFzc2V0cyB2ZWN0b3IgYWZ0ZXIgaGF2aW5nIHN0b3JlZCBhIGNvcHkgb2YgaXQuXG5cdFx0Ly8gVGhlIGNvcHkgd2lsbCBiZSBmaWxsZWQgd2l0aCBhbGwgYXNzZXRzIHdoaWNoIHdlcmVuJ3QgcmVtb3ZlZC5cblx0XHRvbGRfYXNzZXRzID0gdGhpcy5fYXNzZXRzLmNvbmNhdCgpO1xuXHRcdHRoaXMuX2Fzc2V0cy5sZW5ndGggPSAwO1xuXG5cdFx0aWYgKG5zID09IG51bGwpXG5cdFx0XHRucyA9IE5hbWVkQXNzZXRCYXNlLkRFRkFVTFRfTkFNRVNQQUNFO1xuXG5cdFx0Zm9yICh2YXIgZDpudW1iZXIgPSAwOyBkIDwgb2xkX2Fzc2V0cy5sZW5ndGg7IGQrKykge1xuXHRcdFx0YXNzZXQgPSBvbGRfYXNzZXRzW2RdO1xuXG5cdFx0XHQvLyBSZW1vdmUgZnJvbSBkaWN0IGlmIGluIHRoZSBzdXBwbGllZCBuYW1lc3BhY2UuIElmIG5vdCxcblx0XHRcdC8vIHRyYW5zZmVyIG92ZXIgdG8gdGhlIG5ldyB2ZWN0b3IuXG5cdFx0XHRpZiAoYXNzZXQuYXNzZXROYW1lc3BhY2UgPT0gbnMpIHtcblx0XHRcdFx0aWYgKGRpc3Bvc2UpXG5cdFx0XHRcdFx0YXNzZXQuZGlzcG9zZSgpO1xuXG5cdFx0XHRcdC8vIFJlbW92ZSBhc3NldCBmcm9tIGRpY3Rpb25hcnksIGJ1dCBkb24ndCB0cnkgdG8gYXV0by1yZW1vdmVcblx0XHRcdFx0Ly8gdGhlIG5hbWVzcGFjZSwgd2hpY2ggd2lsbCB0cmlnZ2VyIGFuIHVubmVjZXNzYXJpbHkgZXhwZW5zaXZlXG5cdFx0XHRcdC8vIHRlc3QgdGhhdCBpcyBub3QgbmVlZGVkIHNpbmNlIHdlIGtub3cgdGhhdCB0aGUgbmFtZXNwYWNlXG5cdFx0XHRcdC8vIHdpbGwgYmUgZW1wdHkgd2hlbiBsb29wIGZpbmlzaGVzLlxuXHRcdFx0XHR0aGlzLnJlbW92ZUFzc2V0RnJvbURpY3QoYXNzZXQsIGZhbHNlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX2Fzc2V0c1tpZHgrK10gPSBhc3NldDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKlxuXHRcdCBmb3IgZWFjaCAoYXNzZXQgaW4gb2xkX2Fzc2V0cykge1xuXHRcdCAvLyBSZW1vdmUgZnJvbSBkaWN0IGlmIGluIHRoZSBzdXBwbGllZCBuYW1lc3BhY2UuIElmIG5vdCxcblx0XHQgLy8gdHJhbnNmZXIgb3ZlciB0byB0aGUgbmV3IHZlY3Rvci5cblx0XHQgaWYgKGFzc2V0LmFzc2V0TmFtZXNwYWNlID09IG5zKSB7XG5cdFx0IGlmIChkaXNwb3NlKVxuXHRcdCBhc3NldC5kaXNwb3NlKCk7XG5cblx0XHQgLy8gUmVtb3ZlIGFzc2V0IGZyb20gZGljdGlvbmFyeSwgYnV0IGRvbid0IHRyeSB0byBhdXRvLXJlbW92ZVxuXHRcdCAvLyB0aGUgbmFtZXNwYWNlLCB3aGljaCB3aWxsIHRyaWdnZXIgYW4gdW5uZWNlc3NhcmlseSBleHBlbnNpdmVcblx0XHQgLy8gdGVzdCB0aGF0IGlzIG5vdCBuZWVkZWQgc2luY2Ugd2Uga25vdyB0aGF0IHRoZSBuYW1lc3BhY2Vcblx0XHQgLy8gd2lsbCBiZSBlbXB0eSB3aGVuIGxvb3AgZmluaXNoZXMuXG5cdFx0IHJlbW92ZUFzc2V0RnJvbURpY3QoYXNzZXQsIGZhbHNlKTtcblx0XHQgfSBlbHNlXG5cdFx0IF9hc3NldHNbaWR4KytdID0gYXNzZXQ7XG5cblx0XHQgfVxuXHRcdCAqL1xuXG5cdFx0Ly8gUmVtb3ZlIGVtcHR5IG5hbWVzcGFjZVxuXHRcdGlmICh0aGlzLl9hc3NldERpY3Rpb25hcnkuaGFzT3duUHJvcGVydHkobnMpKVxuXHRcdFx0ZGVsZXRlIHRoaXMuX2Fzc2V0RGljdGlvbmFyeVtuc107XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUFzc2V0RnJvbURpY3QoYXNzZXQ6SUFzc2V0LCBhdXRvUmVtb3ZlRW1wdHlOYW1lc3BhY2U6Ym9vbGVhbiA9IHRydWUpXG5cdHtcblx0XHRpZiAodGhpcy5fYXNzZXREaWN0RGlydHkpXG5cdFx0XHR0aGlzLnJlaGFzaEFzc2V0RGljdCgpO1xuXG5cdFx0aWYgKHRoaXMuX2Fzc2V0RGljdGlvbmFyeS5oYXNPd25Qcm9wZXJ0eShhc3NldC5hc3NldE5hbWVzcGFjZSkpIHtcblx0XHRcdGlmICh0aGlzLl9hc3NldERpY3Rpb25hcnlbYXNzZXQuYXNzZXROYW1lc3BhY2VdLmhhc093blByb3BlcnR5KGFzc2V0Lm5hbWUpKVxuXHRcdFx0XHRkZWxldGUgdGhpcy5fYXNzZXREaWN0aW9uYXJ5W2Fzc2V0LmFzc2V0TmFtZXNwYWNlXVthc3NldC5uYW1lXTtcblxuXHRcdFx0aWYgKGF1dG9SZW1vdmVFbXB0eU5hbWVzcGFjZSkge1xuXG5cdFx0XHRcdHZhciBrZXk6c3RyaW5nO1xuXHRcdFx0XHR2YXIgZW1wdHk6Ym9vbGVhbiA9IHRydWU7XG5cblx0XHRcdFx0Zm9yIChrZXkgaW4gdGhpcy5fYXNzZXREaWN0aW9uYXJ5W2Fzc2V0LmFzc2V0TmFtZXNwYWNlXSkge1xuXHRcdFx0XHRcdGVtcHR5ID0gZmFsc2U7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoZW1wdHkpXG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX2Fzc2V0RGljdGlvbmFyeVthc3NldC5hc3NldE5hbWVzcGFjZV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIHN0b3BBbGxMb2FkaW5nU2Vzc2lvbnMoKVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXG5cdFx0aWYgKCF0aGlzLl9sb2FkaW5nU2Vzc2lvbnMpXG5cdFx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMgPSBuZXcgQXJyYXk8QXNzZXRMb2FkZXI+KCk7XG5cblx0XHR2YXIgbGVuZ3RoOm51bWJlciA9IHRoaXMuX2xvYWRpbmdTZXNzaW9ucy5sZW5ndGg7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXG5cdFx0XHR0aGlzLmtpbGxMb2FkaW5nU2Vzc2lvbih0aGlzLl9sb2FkaW5nU2Vzc2lvbnNbaV0pO1xuXG5cdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zID0gbnVsbDtcblx0fVxuXG5cdHByaXZhdGUgcmVoYXNoQXNzZXREaWN0KClcblx0e1xuXHRcdHZhciBhc3NldDpJQXNzZXQ7XG5cblx0XHR0aGlzLl9hc3NldERpY3Rpb25hcnkgPSB7fTtcblxuXHRcdHZhciBsOm51bWJlciA9IHRoaXMuX2Fzc2V0cy5sZW5ndGg7XG5cblx0XHRmb3IgKHZhciBjOm51bWJlciA9IDA7IGMgPCBsOyBjKyspIHtcblx0XHRcdGFzc2V0ID0gdGhpcy5fYXNzZXRzW2NdO1xuXG5cdFx0XHRpZiAoIXRoaXMuX2Fzc2V0RGljdGlvbmFyeS5oYXNPd25Qcm9wZXJ0eShhc3NldC5hc3NldE5hbWVzcGFjZSkpXG5cdFx0XHRcdHRoaXMuX2Fzc2V0RGljdGlvbmFyeVthc3NldC5hc3NldE5hbWVzcGFjZV0gPSB7fTtcblxuXHRcdFx0dGhpcy5fYXNzZXREaWN0aW9uYXJ5W2Fzc2V0LmFzc2V0TmFtZXNwYWNlXVthc3NldC5uYW1lXSA9IGFzc2V0O1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5fYXNzZXREaWN0RGlydHkgPSBmYWxzZTtcblxuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCB3aGVuIGEgYW4gZXJyb3Igb2NjdXJzIGR1cmluZyBsb2FkaW5nLlxuXHQgKi9cblx0cHJpdmF0ZSBvbkxvYWRFcnJvcihldmVudDpJT0Vycm9yRXZlbnQpOmJvb2xlYW5cblx0e1xuXHRcdGlmICh0aGlzLmhhc0V2ZW50TGlzdGVuZXIoSU9FcnJvckV2ZW50LklPX0VSUk9SKSkge1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCB3aGVuIGEgYW4gZXJyb3Igb2NjdXJzIGR1cmluZyBwYXJzaW5nLlxuXHQgKi9cblx0cHJpdmF0ZSBvblBhcnNlRXJyb3IoZXZlbnQ6UGFyc2VyRXZlbnQpOmJvb2xlYW5cblx0e1xuXHRcdGlmICh0aGlzLmhhc0V2ZW50TGlzdGVuZXIoUGFyc2VyRXZlbnQuUEFSU0VfRVJST1IpKSB7XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIG9uQXNzZXRDb21wbGV0ZShldmVudDpBc3NldEV2ZW50KVxuXHR7XG5cdFx0Ly8gT25seSBhZGQgYXNzZXQgdG8gbGlicmFyeSB0aGUgZmlyc3QgdGltZS5cblx0XHRpZiAoZXZlbnQudHlwZSA9PSBBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFKVxuXHRcdFx0dGhpcy5hZGRBc3NldChldmVudC5hc3NldCk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXG5cdH1cblxuXHRwcml2YXRlIG9uVGV4dHVyZVNpemVFcnJvcihldmVudDpBc3NldEV2ZW50KVxuXHR7XG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgd2hlbiB0aGUgcmVzb3VyY2UgYW5kIGFsbCBvZiBpdHMgZGVwZW5kZW5jaWVzIHdhcyByZXRyaWV2ZWQuXG5cdCAqL1xuXHRwcml2YXRlIG9uUmVzb3VyY2VDb21wbGV0ZShldmVudDpMb2FkZXJFdmVudClcblx0e1xuXHRcdHZhciBsb2FkZXI6QXNzZXRMb2FkZXIgPSA8QXNzZXRMb2FkZXI+IGV2ZW50LnRhcmdldDtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cblx0XHR2YXIgaW5kZXg6bnVtYmVyID0gdGhpcy5fbG9hZGluZ1Nlc3Npb25zLmluZGV4T2YobG9hZGVyKTtcblx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMuc3BsaWNlKGluZGV4LCAxKTtcblxuXHRcdC8vIEFkZCBsb2FkZXIgdG8gYSBnYXJiYWdlIGFycmF5IC0gZm9yIGEgY29sbGVjdGlvbiBzd2VlcCBhbmQga2lsbFxuXHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9uc0dhcmJhZ2UucHVzaChsb2FkZXIpO1xuXHRcdHRoaXMuX2djVGltZW91dElJRCA9IHNldFRpbWVvdXQoKCkgPT4ge3RoaXMubG9hZGluZ1Nlc3Npb25HQygpfSwgMTAwKTtcblx0fVxuXG5cdHByaXZhdGUgbG9hZGluZ1Nlc3Npb25HQygpOnZvaWRcblx0e1xuXHRcdHZhciBsb2FkZXI6QXNzZXRMb2FkZXI7XG5cblx0XHR3aGlsZSAodGhpcy5fbG9hZGluZ1Nlc3Npb25zR2FyYmFnZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRsb2FkZXIgPSB0aGlzLl9sb2FkaW5nU2Vzc2lvbnNHYXJiYWdlLnBvcCgpO1xuXHRcdFx0dGhpcy5raWxsTG9hZGluZ1Nlc3Npb24obG9hZGVyKTtcblx0XHR9XG5cblx0XHRjbGVhclRpbWVvdXQodGhpcy5fZ2NUaW1lb3V0SUlEKTtcblx0XHR0aGlzLl9nY1RpbWVvdXRJSUQgPSBudWxsO1xuXG5cdH1cblxuXHRwcml2YXRlIGtpbGxMb2FkaW5nU2Vzc2lvbihsb2FkZXI6QXNzZXRMb2FkZXIpXG5cdHtcblx0XHRsb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihMb2FkZXJFdmVudC5SRVNPVVJDRV9DT01QTEVURSwgdGhpcy5fb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGUpO1xuXHRcdGxvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuVEVYVFVSRV9TSVpFX0VSUk9SLCB0aGlzLl9vblRleHR1cmVTaXplRXJyb3JEZWxlZ2F0ZSk7XG5cdFx0bG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSwgdGhpcy5fb25Bc3NldENvbXBsZXRlRGVsZWdhdGUpO1xuXHRcdGxvYWRlci5zdG9wKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gdW5lc3BlY3RlZCBlcnJvciBvY2N1cnNcblx0ICovXG5cdC8qXG5cdCBwcml2YXRlIG9uUmVzb3VyY2VFcnJvcigpIDogdm9pZFxuXHQge1xuXHQgdmFyIG1zZzpzdHJpbmcgPSBcIlVuZXhwZWN0ZWQgcGFyc2VyIGVycm9yXCI7XG5cdCBpZihoYXNFdmVudExpc3RlbmVyKExvYWRlckV2ZW50LkRFUEVOREVOQ1lfRVJST1IpKXtcblx0IHZhciByZTpMb2FkZXJFdmVudCA9IG5ldyBMb2FkZXJFdmVudChMb2FkZXJFdmVudC5ERVBFTkRFTkNZX0VSUk9SLCBcIlwiKTtcblx0IGRpc3BhdGNoRXZlbnQocmUpO1xuXHQgfSBlbHNle1xuXHQgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG5cdCB9XG5cdCB9XG5cdCAqL1xuXG5cdHByaXZhdGUgb25Bc3NldFJlbmFtZShldmVudDpBc3NldEV2ZW50KVxuXHR7XG5cdFx0dmFyIGFzc2V0OklBc3NldCA9IDxJQXNzZXQgPiBldmVudC50YXJnZXQ7Ly8gVE9ETzogd2FzIGV2LmN1cnJlbnRUYXJnZXQgLSB3YXRjaCB0aGlzIHZhclxuXHRcdHZhciBvbGQ6SUFzc2V0ID0gdGhpcy5nZXRBc3NldChhc3NldC5hc3NldE5hbWVzcGFjZSwgYXNzZXQubmFtZSk7XG5cblx0XHRpZiAob2xkICE9IG51bGwpIHtcblx0XHRcdHRoaXMuX3N0cmF0ZWd5LnJlc29sdmVDb25mbGljdChhc3NldCwgb2xkLCB0aGlzLl9hc3NldERpY3Rpb25hcnlbYXNzZXQuYXNzZXROYW1lc3BhY2VdLCB0aGlzLl9zdHJhdGVneVByZWZlcmVuY2UpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgZGljdDpPYmplY3QgPSB0aGlzLl9hc3NldERpY3Rpb25hcnlbZXZlbnQuYXNzZXQuYXNzZXROYW1lc3BhY2VdO1xuXG5cdFx0XHRpZiAoZGljdCA9PSBudWxsKVxuXHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdGRpY3RbZXZlbnQuYXNzZXRQcmV2TmFtZV0gPSBudWxsO1xuXHRcdFx0ZGljdFtldmVudC5hc3NldC5uYW1lXSA9IGV2ZW50LmFzc2V0O1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgb25Bc3NldENvbmZsaWN0UmVzb2x2ZWQoZXZlbnQ6QXNzZXRFdmVudClcblx0e1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudC5jbG9uZSgpKTtcblx0fVxufVxuXG5leHBvcnQgPSBBc3NldExpYnJhcnlCdW5kbGU7Il19