var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetLibraryIterator = require("awayjs-core/lib/core/library/AssetLibraryIterator");
var AssetLoader = require("awayjs-core/lib/core/library/AssetLoader");

var ConflictPrecedence = require("awayjs-core/lib/core/library/ConflictPrecedence");
var ConflictStrategy = require("awayjs-core/lib/core/library/ConflictStrategy");

var NamedAssetBase = require("awayjs-core/lib/core/library/NamedAssetBase");

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

        this._onAssetRenameDelegate = function (event) {
            return _this.onAssetRename(event);
        };
        this._onAssetConflictResolvedDelegate = function (event) {
            return _this.onAssetConflictResolved(event);
        };
        this._onResourceCompleteDelegate = function (event) {
            return _this.onResourceComplete(event);
        };
        this._onTextureSizeErrorDelegate = function (event) {
            return _this.onTextureSizeError(event);
        };
        this._onAssetCompleteDelegate = function (event) {
            return _this.onAssetComplete(event);
        };
        this._onLoadErrorDelegate = function (event) {
            return _this.onLoadError(event);
        };
        this._onParseErrorDelegate = function (event) {
            return _this.onParseError(event);
        };
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
        if (typeof key === "undefined") { key = 'default'; }
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
        if (typeof assetTypeFilter === "undefined") { assetTypeFilter = null; }
        if (typeof namespaceFilter === "undefined") { namespaceFilter = null; }
        if (typeof filterFunc === "undefined") { filterFunc = null; }
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
        if (typeof context === "undefined") { context = null; }
        if (typeof ns === "undefined") { ns = null; }
        if (typeof parser === "undefined") { parser = null; }
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
        if (typeof context === "undefined") { context = null; }
        if (typeof ns === "undefined") { ns = null; }
        if (typeof parser === "undefined") { parser = null; }
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
        if (typeof ns === "undefined") { ns = null; }
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
        if (typeof dispose === "undefined") { dispose = true; }
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
        if (typeof ns === "undefined") { ns = null; }
        if (typeof dispose === "undefined") { dispose = true; }
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
        if (typeof dispose === "undefined") { dispose = true; }
        if (dispose) {
            var asset;

            for (var c = 0; c < this._assets.length; c++) {
                asset = this._assets[c];
                asset.dispose();
            }
            /*
            for each (asset in _assets)
            asset.dispose();
            */
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
        if (typeof ns === "undefined") { ns = null; }
        if (typeof dispose === "undefined") { dispose = true; }
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
            } else {
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
        if (typeof autoRemoveEmptyNamespace === "undefined") { autoRemoveEmptyNamespace = true; }
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
        } else {
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
        } else {
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
        var asset = event.target;
        var old = this.getAsset(asset.assetNamespace, asset.name);

        if (old != null) {
            this._strategy.resolveConflict(asset, old, this._assetDictionary[asset.assetNamespace], this._strategyPreference);
        } else {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbGlicmFyeS9Bc3NldExpYnJhcnlCdW5kbGUudHMiXSwibmFtZXMiOlsiQXNzZXRMaWJyYXJ5QnVuZGxlIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLmNvbnN0cnVjdG9yIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLmdldEluc3RhbmNlIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLmVuYWJsZVBhcnNlciIsIkFzc2V0TGlicmFyeUJ1bmRsZS5lbmFibGVQYXJzZXJzIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLmNyZWF0ZUl0ZXJhdG9yIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLmxvYWQiLCJBc3NldExpYnJhcnlCdW5kbGUubG9hZERhdGEiLCJBc3NldExpYnJhcnlCdW5kbGUuZ2V0QXNzZXQiLCJBc3NldExpYnJhcnlCdW5kbGUuYWRkQXNzZXQiLCJBc3NldExpYnJhcnlCdW5kbGUucmVtb3ZlQXNzZXQiLCJBc3NldExpYnJhcnlCdW5kbGUucmVtb3ZlQXNzZXRCeU5hbWUiLCJBc3NldExpYnJhcnlCdW5kbGUucmVtb3ZlQWxsQXNzZXRzIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLnJlbW92ZU5hbWVzcGFjZUFzc2V0cyIsIkFzc2V0TGlicmFyeUJ1bmRsZS5yZW1vdmVBc3NldEZyb21EaWN0IiwiQXNzZXRMaWJyYXJ5QnVuZGxlLnN0b3BBbGxMb2FkaW5nU2Vzc2lvbnMiLCJBc3NldExpYnJhcnlCdW5kbGUucmVoYXNoQXNzZXREaWN0IiwiQXNzZXRMaWJyYXJ5QnVuZGxlLm9uTG9hZEVycm9yIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLm9uUGFyc2VFcnJvciIsIkFzc2V0TGlicmFyeUJ1bmRsZS5vbkFzc2V0Q29tcGxldGUiLCJBc3NldExpYnJhcnlCdW5kbGUub25UZXh0dXJlU2l6ZUVycm9yIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLm9uUmVzb3VyY2VDb21wbGV0ZSIsIkFzc2V0TGlicmFyeUJ1bmRsZS5sb2FkaW5nU2Vzc2lvbkdDIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLmtpbGxMb2FkaW5nU2Vzc2lvbiIsIkFzc2V0TGlicmFyeUJ1bmRsZS5vbkFzc2V0UmVuYW1lIiwiQXNzZXRMaWJyYXJ5QnVuZGxlLm9uQXNzZXRDb25mbGljdFJlc29sdmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx1RkFFNEY7QUFDNUYscUVBQTRFOztBQUc1RSxtRkFBd0Y7QUFDeEYsK0VBQXFGOztBQUVyRiwyRUFBaUY7O0FBRWpGLG1EQUEyRDtBQUMzRCw2REFBb0U7QUFDcEUsaUVBQXdFO0FBQ3hFLCtEQUFzRTtBQUN0RSx1RUFBNkU7QUFDN0UsK0RBQXNFOztBQUd0RTs7OztFQUlHO0FBQ0g7SUFBaUNBLHFDQUFlQTtJQTBCL0NBOzs7O01BREdBO0lBQ0hBO1FBQUFDLGlCQWtCQ0E7UUFoQkFBLFdBQU1BLEtBQUFBLENBQUNBO1FBbEJSQSxLQUFRQSx1QkFBdUJBLEdBQXNCQSxJQUFJQSxLQUFLQSxDQUFjQSxDQUFDQSxDQUFDQTs7UUFvQjdFQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFTQSxDQUFDQSxFQUFDQSxzQkFBc0JBO1FBQ3pEQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBLE1BQU1BLENBQUNBLENBQUNBO1FBQ3BDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBLEtBQUtBLENBQWNBLENBQUNBOztRQUVoREEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxnQkFBZ0JBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQ3hEQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEdBQUdBLGtCQUFrQkEsQ0FBQ0EsU0FBU0E7O1FBRXREQSxJQUFJQSxDQUFDQSxzQkFBc0JBLEdBQUdBLFVBQUNBLEtBQWdCQTttQkFBS0EsS0FBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFBekJBLENBQXlCQTtRQUM3RUEsSUFBSUEsQ0FBQ0EsZ0NBQWdDQSxHQUFHQSxVQUFDQSxLQUFnQkE7bUJBQUtBLEtBQUlBLENBQUNBLHVC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QSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxLQUFLQTtTQUNwQ0E7SUFDRkEsQ0FBQ0E7O0lBRUR4Qix1REFBQUEsVUFBZ0NBLEtBQWdCQTtRQUUvQ3lCLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO0lBQ2xDQSxDQUFDQTtJQWprQkR6QixpQ0FBbUNBLElBQUlBLE1BQU1BLENBQUNBLENBQUNBO0lBa2tCaERBLDBCQUFDQTtBQUFEQSxDQUFDQSxFQXBrQmdDLGVBQWUsRUFva0IvQzs7QUFFRCxtQ0FBNEIsQ0FBQSIsImZpbGUiOiJjb3JlL2xpYnJhcnkvQXNzZXRMaWJyYXJ5QnVuZGxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVSTFJlcXVlc3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL25ldC9VUkxSZXF1ZXN0XCIpO1xuaW1wb3J0IEFzc2V0TGlicmFyeVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9Bc3NldExpYnJhcnlcIik7XG5pbXBvcnQgQXNzZXRMaWJyYXJ5SXRlcmF0b3JcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9Bc3NldExpYnJhcnlJdGVyYXRvclwiKTtcbmltcG9ydCBBc3NldExvYWRlclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9Bc3NldExvYWRlclwiKTtcbmltcG9ydCBBc3NldExvYWRlclRva2VuXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9Bc3NldExvYWRlclRva2VuXCIpO1xuaW1wb3J0IEFzc2V0TG9hZGVyQ29udGV4dFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0Fzc2V0TG9hZGVyQ29udGV4dFwiKTtcbmltcG9ydCBDb25mbGljdFByZWNlZGVuY2VcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9Db25mbGljdFByZWNlZGVuY2VcIik7XG5pbXBvcnQgQ29uZmxpY3RTdHJhdGVneVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvQ29uZmxpY3RTdHJhdGVneVwiKTtcbmltcG9ydCBDb25mbGljdFN0cmF0ZWd5QmFzZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0NvbmZsaWN0U3RyYXRlZ3lCYXNlXCIpO1xuaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcbmltcG9ydCBJQXNzZXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9JQXNzZXRcIik7XG5pbXBvcnQgRXJyb3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9FcnJvclwiKTtcbmltcG9ydCBBc3NldEV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0Fzc2V0RXZlbnRcIik7XG5pbXBvcnQgSU9FcnJvckV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0lPRXJyb3JFdmVudFwiKTtcbmltcG9ydCBMb2FkZXJFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9Mb2FkZXJFdmVudFwiKTtcbmltcG9ydCBFdmVudERpc3BhdGNoZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiKTtcbmltcG9ydCBQYXJzZXJFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9QYXJzZXJFdmVudFwiKTtcbmltcG9ydCBQYXJzZXJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcGFyc2Vycy9QYXJzZXJCYXNlXCIpO1xuXG4vKipcbiAqIEFzc2V0TGlicmFyeUJ1bmRsZSBlbmZvcmNlcyBhIG11bHRpdG9uIHBhdHRlcm4gYW5kIGlzIG5vdCBpbnRlbmRlZCB0byBiZSBpbnN0YW5jZWQgZGlyZWN0bHkuXG4gKiBJdHMgcHVycG9zZSBpcyB0byBjcmVhdGUgYSBjb250YWluZXIgZm9yIDNEIGRhdGEgbWFuYWdlbWVudCwgYm90aCBiZWZvcmUgYW5kIGFmdGVyIHBhcnNpbmcuXG4gKiBJZiB5b3UgYXJlIGludGVyZXN0ZWQgaW4gY3JlYXRpbmcgbXVsdGlwbGUgbGlicmFyeSBidW5kbGVzLCBwbGVhc2UgdXNlIHRoZSA8Y29kZT5nZXRJbnN0YW5jZSgpPC9jb2RlPiBtZXRob2QuXG4gKi9cbmNsYXNzIEFzc2V0TGlicmFyeUJ1bmRsZSBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxue1xuXHRwdWJsaWMgc3RhdGljIF9pSW5zdGFuY2VzOk9iamVjdCA9IG5ldyBPYmplY3QoKTtcblxuXHRwcml2YXRlIF9sb2FkaW5nU2Vzc2lvbnM6QXJyYXk8QXNzZXRMb2FkZXI+O1xuXHRwcml2YXRlIF9zdHJhdGVneTpDb25mbGljdFN0cmF0ZWd5QmFzZTtcblx0cHJpdmF0ZSBfc3RyYXRlZ3lQcmVmZXJlbmNlOnN0cmluZztcblx0cHJpdmF0ZSBfYXNzZXRzOkFycmF5PElBc3NldD47XG5cdHByaXZhdGUgX2Fzc2V0RGljdGlvbmFyeTpPYmplY3Q7XG5cdHByaXZhdGUgX2Fzc2V0RGljdERpcnR5OmJvb2xlYW47XG5cdHByaXZhdGUgX2xvYWRpbmdTZXNzaW9uc0dhcmJhZ2U6QXJyYXk8QXNzZXRMb2FkZXI+ID0gbmV3IEFycmF5PEFzc2V0TG9hZGVyPigpO1xuXHRwcml2YXRlIF9nY1RpbWVvdXRJSUQ6bnVtYmVyO1xuXG5cdHByaXZhdGUgX29uQXNzZXRSZW5hbWVEZWxlZ2F0ZTooZXZlbnQ6QXNzZXRFdmVudCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfb25Bc3NldENvbmZsaWN0UmVzb2x2ZWREZWxlZ2F0ZTooZXZlbnQ6QXNzZXRFdmVudCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGU6KGV2ZW50OkxvYWRlckV2ZW50KSA9PiB2b2lkO1xuXHRwcml2YXRlIF9vblRleHR1cmVTaXplRXJyb3JEZWxlZ2F0ZTooZXZlbnQ6QXNzZXRFdmVudCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfb25Bc3NldENvbXBsZXRlRGVsZWdhdGU6KGV2ZW50OkFzc2V0RXZlbnQpID0+IHZvaWQ7XG5cdHByaXZhdGUgX29uTG9hZEVycm9yRGVsZWdhdGU6KGV2ZW50OklPRXJyb3JFdmVudCkgPT4gYm9vbGVhbjtcblx0cHJpdmF0ZSBfb25QYXJzZUVycm9yRGVsZWdhdGU6KGV2ZW50OlBhcnNlckV2ZW50KSA9PiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IDxjb2RlPkFzc2V0TGlicmFyeUJ1bmRsZTwvY29kZT4gb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gbWUgQSBtdWx0aXRvbiBlbmZvcmNlciBmb3IgdGhlIEFzc2V0TGlicmFyeUJ1bmRsZSBlbnN1cmluZyBpdCBjYW5ubm90IGJlIGluc3RhbmNlZC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9hc3NldHMgPSBuZXcgQXJyYXk8SUFzc2V0PigpOy8vbmV3IFZlY3Rvci48SUFzc2V0Pjtcblx0XHR0aGlzLl9hc3NldERpY3Rpb25hcnkgPSBuZXcgT2JqZWN0KCk7XG5cdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zID0gbmV3IEFycmF5PEFzc2V0TG9hZGVyPigpO1xuXG5cdFx0dGhpcy5jb25mbGljdFN0cmF0ZWd5ID0gQ29uZmxpY3RTdHJhdGVneS5JR05PUkUuY3JlYXRlKCk7XG5cdFx0dGhpcy5jb25mbGljdFByZWNlZGVuY2UgPSBDb25mbGljdFByZWNlZGVuY2UuRkFWT1JfTkVXO1xuXG5cdFx0dGhpcy5fb25Bc3NldFJlbmFtZURlbGVnYXRlID0gKGV2ZW50OkFzc2V0RXZlbnQpID0+IHRoaXMub25Bc3NldFJlbmFtZShldmVudCk7XG5cdFx0dGhpcy5fb25Bc3NldENvbmZsaWN0UmVzb2x2ZWREZWxlZ2F0ZSA9IChldmVudDpBc3NldEV2ZW50KSA9PiB0aGlzLm9uQXNzZXRDb25mbGljdFJlc29sdmVkKGV2ZW50KTtcblx0XHR0aGlzLl9vblJlc291cmNlQ29tcGxldGVEZWxlZ2F0ZSA9IChldmVudDpMb2FkZXJFdmVudCkgPT4gdGhpcy5vblJlc291cmNlQ29tcGxldGUoZXZlbnQpO1xuXHRcdHRoaXMuX29uVGV4dHVyZVNpemVFcnJvckRlbGVnYXRlID0gKGV2ZW50OkFzc2V0RXZlbnQpID0+IHRoaXMub25UZXh0dXJlU2l6ZUVycm9yKGV2ZW50KTtcblx0XHR0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSA9IChldmVudDpBc3NldEV2ZW50KSA9PiB0aGlzLm9uQXNzZXRDb21wbGV0ZShldmVudCk7XG5cdFx0dGhpcy5fb25Mb2FkRXJyb3JEZWxlZ2F0ZSA9IChldmVudDpJT0Vycm9yRXZlbnQpID0+IHRoaXMub25Mb2FkRXJyb3IoZXZlbnQpO1xuXHRcdHRoaXMuX29uUGFyc2VFcnJvckRlbGVnYXRlID0gKGV2ZW50OlBhcnNlckV2ZW50KSA9PiB0aGlzLm9uUGFyc2VFcnJvcihldmVudCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBBc3NldExpYnJhcnlCdW5kbGUgaW5zdGFuY2UuIElmIG5vIGtleSBpcyBnaXZlbiwgcmV0dXJucyB0aGUgZGVmYXVsdCBidW5kbGUgaW5zdGFuY2UgKHdoaWNoIGlzXG5cdCAqIHNpbWlsYXIgdG8gdXNpbmcgdGhlIEFzc2V0TGlicmFyeUJ1bmRsZSBhcyBhIHNpbmdsZXRvbi4pIFRvIGtlZXAgc2V2ZXJhbCBzZXBhcmF0ZWQgbGlicmFyeSBidW5kbGVzLFxuXHQgKiBwYXNzIGEgc3RyaW5nIGtleSB0byB0aGlzIG1ldGhvZCB0byBkZWZpbmUgd2hpY2ggYnVuZGxlIHNob3VsZCBiZSByZXR1cm5lZC4gVGhpcyBpc1xuXHQgKiByZWZlcnJlZCB0byBhcyB1c2luZyB0aGUgQXNzZXRMaWJyYXJ5IGFzIGEgbXVsdGl0b24uXG5cdCAqXG5cdCAqIEBwYXJhbSBrZXkgRGVmaW5lcyB3aGljaCBtdWx0aXRvbiBpbnN0YW5jZSBzaG91bGQgYmUgcmV0dXJuZWQuXG5cdCAqIEByZXR1cm4gQW4gaW5zdGFuY2Ugb2YgdGhlIGFzc2V0IGxpYnJhcnlcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2Uoa2V5OnN0cmluZyA9ICdkZWZhdWx0Jyk6QXNzZXRMaWJyYXJ5QnVuZGxlXG5cdHtcblx0XHRpZiAoIWtleSlcblx0XHRcdGtleSA9ICdkZWZhdWx0JztcblxuXHRcdGlmICghQXNzZXRMaWJyYXJ5QnVuZGxlLl9pSW5zdGFuY2VzLmhhc093blByb3BlcnR5KGtleSkpXG5cdFx0XHRBc3NldExpYnJhcnlCdW5kbGUuX2lJbnN0YW5jZXNba2V5XSA9IG5ldyBBc3NldExpYnJhcnlCdW5kbGUoKTtcblxuXHRcdHJldHVybiBBc3NldExpYnJhcnlCdW5kbGUuX2lJbnN0YW5jZXNba2V5XTtcblxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZW5hYmxlUGFyc2VyKHBhcnNlckNsYXNzOk9iamVjdClcblx0e1xuXHRcdEFzc2V0TG9hZGVyLmVuYWJsZVBhcnNlcihwYXJzZXJDbGFzcyk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBlbmFibGVQYXJzZXJzKHBhcnNlckNsYXNzZXM6T2JqZWN0W10pXG5cdHtcblx0XHRBc3NldExvYWRlci5lbmFibGVQYXJzZXJzKHBhcnNlckNsYXNzZXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgd2hpY2ggc3RyYXRlZ3kgc2hvdWxkIGJlIHVzZWQgZm9yIHJlc29sdmluZyBuYW1pbmcgY29uZmxpY3RzLCB3aGVuIHR3byBsaWJyYXJ5XG5cdCAqIGFzc2V0cyBhcmUgZ2l2ZW4gdGhlIHNhbWUgbmFtZS4gQnkgZGVmYXVsdCwgPGNvZGU+Q29uZmxpY3RTdHJhdGVneS5BUFBFTkRfTlVNX1NVRkZJWDwvY29kZT5cblx0ICogaXMgdXNlZCB3aGljaCBtZWFucyB0aGF0IGEgbnVtZXJpYyBzdWZmaXggaXMgYXBwZW5kZWQgdG8gb25lIG9mIHRoZSBhc3NldHMuIFRoZVxuXHQgKiA8Y29kZT5jb25mbGljdFByZWNlZGVuY2U8L2NvZGU+IHByb3BlcnR5IGRlZmluZXMgd2hpY2ggb2YgdGhlIHR3byBjb25mbGljdGluZyBhc3NldHMgd2lsbFxuXHQgKiBiZSByZW5hbWVkLlxuXHQgKlxuXHQgKiBAc2VlIG5hbWluZy5Db25mbGljdFN0cmF0ZWd5XG5cdCAqIEBzZWUgQXNzZXRMaWJyYXJ5LmNvbmZsaWN0UHJlY2VkZW5jZVxuXHQgKi9cblx0cHVibGljIGdldCBjb25mbGljdFN0cmF0ZWd5KCk6Q29uZmxpY3RTdHJhdGVneUJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zdHJhdGVneTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgY29uZmxpY3RTdHJhdGVneSh2YWw6Q29uZmxpY3RTdHJhdGVneUJhc2UpXG5cdHtcblxuXHRcdGlmICghdmFsKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCduYW1pbmdTdHJhdGVneSBtdXN0IG5vdCBiZSBudWxsLiBUbyBpZ25vcmUgbmFtaW5nLCB1c2UgQXNzZXRMaWJyYXJ5LklHTk9SRScpO1xuXG5cdFx0dGhpcy5fc3RyYXRlZ3kgPSB2YWwuY3JlYXRlKCk7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHdoaWNoIGFzc2V0IHNob3VsZCBoYXZlIHByZWNlZGVuY2Ugd2hlbiByZXNvbHZpbmcgYSBuYW1pbmcgY29uZmxpY3QgYmV0d2VlblxuXHQgKiB0d28gYXNzZXRzIG9mIHdoaWNoIG9uZSBoYXMganVzdCBiZWVuIHJlbmFtZWQgYnkgdGhlIHVzZXIgb3IgYnkgYSBwYXJzZXIuIEJ5IGRlZmF1bHRcblx0ICogPGNvZGU+Q29uZmxpY3RQcmVjZWRlbmNlLkZBVk9SX05FVzwvY29kZT4gaXMgdXNlZCwgbWVhbmluZyB0aGF0IHRoZSBuZXdseSByZW5hbWVkXG5cdCAqIGFzc2V0IHdpbGwga2VlcCBpdCdzIG5ldyBuYW1lIHdoaWxlIHRoZSBvbGRlciBhc3NldCBnZXRzIHJlbmFtZWQgdG8gbm90IGNvbmZsaWN0LlxuXHQgKlxuXHQgKiBUaGlzIHByb3BlcnR5IGlzIGlnbm9yZWQgZm9yIGNvbmZsaWN0IHN0cmF0ZWdpZXMgdGhhdCBkbyBub3QgYWN0dWFsbHkgcmVuYW1lIGFuXG5cdCAqIGFzc2V0IGF1dG9tYXRpY2FsbHksIHN1Y2ggYXMgQ29uZmxpY3RTdHJhdGVneS5JR05PUkUgYW5kIENvbmZsaWN0U3RyYXRlZ3kuVEhST1dfRVJST1IuXG5cdCAqXG5cdCAqIEBzZWUgYXdheS5saWJyYXJ5LkNvbmZsaWN0UHJlY2VkZW5jZVxuXHQgKiBAc2VlIGF3YXkubGlicmFyeS5Db25mbGljdFN0cmF0ZWd5XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGNvbmZsaWN0UHJlY2VkZW5jZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3N0cmF0ZWd5UHJlZmVyZW5jZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgY29uZmxpY3RQcmVjZWRlbmNlKHZhbDpzdHJpbmcpXG5cdHtcblx0XHR0aGlzLl9zdHJhdGVneVByZWZlcmVuY2UgPSB2YWw7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIGFuIEFzc2V0TGlicmFyeUl0ZXJhdG9yIGluc3RhbmNlIHRoYXQgY2FuIGJlIHVzZWQgdG8gaXRlcmF0ZSBvdmVyIHRoZSBhc3NldHNcblx0ICogaW4gdGhpcyBhc3NldCBsaWJyYXJ5IGluc3RhbmNlLiBUaGUgaXRlcmF0b3IgY2FuIGZpbHRlciBhc3NldHMgb24gYXNzZXQgdHlwZSBhbmQvb3Jcblx0ICogbmFtZXNwYWNlLiBBIFwibnVsbFwiIGZpbHRlciB2YWx1ZSBtZWFucyBubyBmaWx0ZXIgb2YgdGhhdCB0eXBlIGlzIHVzZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSBhc3NldFR5cGVGaWx0ZXIgQXNzZXQgdHlwZSB0byBmaWx0ZXIgb24gKGZyb20gdGhlIEFzc2V0VHlwZSBlbnVtIGNsYXNzLikgVXNlXG5cdCAqIG51bGwgdG8gbm90IGZpbHRlciBvbiBhc3NldCB0eXBlLlxuXHQgKiBAcGFyYW0gbmFtZXNwYWNlRmlsdGVyIE5hbWVzcGFjZSB0byBmaWx0ZXIgb24uIFVzZSBudWxsIHRvIG5vdCBmaWx0ZXIgb24gbmFtZXNwYWNlLlxuXHQgKiBAcGFyYW0gZmlsdGVyRnVuYyBDYWxsYmFjayBmdW5jdGlvbiB0byB1c2Ugd2hlbiBkZWNpZGluZyB3aGV0aGVyIGFuIGFzc2V0IHNob3VsZCBiZVxuXHQgKiBpbmNsdWRlZCBpbiB0aGUgaXRlcmF0aW9uIG9yIG5vdC4gVGhpcyBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBzaW5nbGVcblx0ICogcGFyYW1ldGVyIG9mIHR5cGUgSUFzc2V0IGFuZCByZXR1cm5zIGEgYm9vbGVhbiB3aGVyZSB0cnVlIG1lYW5zIGl0IHNob3VsZCBiZSBpbmNsdWRlZC5cblx0ICpcblx0ICogQHNlZSBhd2F5LmxpYnJhcnkuQXNzZXRUeXBlXG5cdCAqL1xuXHRwdWJsaWMgY3JlYXRlSXRlcmF0b3IoYXNzZXRUeXBlRmlsdGVyOnN0cmluZyA9IG51bGwsIG5hbWVzcGFjZUZpbHRlcjpzdHJpbmcgPSBudWxsLCBmaWx0ZXJGdW5jID0gbnVsbCk6QXNzZXRMaWJyYXJ5SXRlcmF0b3Jcblx0e1xuXHRcdHJldHVybiBuZXcgQXNzZXRMaWJyYXJ5SXRlcmF0b3IodGhpcy5fYXNzZXRzLCBhc3NldFR5cGVGaWx0ZXIsIG5hbWVzcGFjZUZpbHRlciwgZmlsdGVyRnVuYyk7XG5cdH1cblxuXHQvKipcblx0ICogTG9hZHMgYSBmaWxlIGFuZCAob3B0aW9uYWxseSkgYWxsIG9mIGl0cyBkZXBlbmRlbmNpZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSByZXEgVGhlIFVSTFJlcXVlc3Qgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIFVSTCBvZiB0aGUgZmlsZSB0byBiZSBsb2FkZWQuXG5cdCAqIEBwYXJhbSBjb250ZXh0IEFuIG9wdGlvbmFsIGNvbnRleHQgb2JqZWN0IHByb3ZpZGluZyBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGxvYWRpbmdcblx0ICogQHBhcmFtIG5zIEFuIG9wdGlvbmFsIG5hbWVzcGFjZSBzdHJpbmcgdW5kZXIgd2hpY2ggdGhlIGZpbGUgaXMgdG8gYmUgbG9hZGVkLCBhbGxvd2luZyB0aGUgZGlmZmVyZW50aWF0aW9uIG9mIHR3byByZXNvdXJjZXMgd2l0aCBpZGVudGljYWwgYXNzZXRzXG5cdCAqIEBwYXJhbSBwYXJzZXIgQW4gb3B0aW9uYWwgcGFyc2VyIG9iamVjdCBmb3IgdHJhbnNsYXRpbmcgdGhlIGxvYWRlZCBkYXRhIGludG8gYSB1c2FibGUgcmVzb3VyY2UuIElmIG5vdCBwcm92aWRlZCwgQXNzZXRMb2FkZXIgd2lsbCBhdHRlbXB0IHRvIGF1dG8tZGV0ZWN0IHRoZSBmaWxlIHR5cGUuXG5cdCAqIEByZXR1cm4gQSBoYW5kbGUgdG8gdGhlIHJldHJpZXZlZCByZXNvdXJjZS5cblx0ICovXG5cdHB1YmxpYyBsb2FkKHJlcTpVUkxSZXF1ZXN0LCBjb250ZXh0OkFzc2V0TG9hZGVyQ29udGV4dCA9IG51bGwsIG5zOnN0cmluZyA9IG51bGwsIHBhcnNlcjpQYXJzZXJCYXNlID0gbnVsbCk6QXNzZXRMb2FkZXJUb2tlblxuXHR7XG5cdFx0dmFyIGxvYWRlcjpBc3NldExvYWRlciA9IG5ldyBBc3NldExvYWRlcigpO1xuXG5cdFx0aWYgKCF0aGlzLl9sb2FkaW5nU2Vzc2lvbnMpXG5cdFx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMgPSBuZXcgQXJyYXk8QXNzZXRMb2FkZXI+KCk7XG5cblx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMucHVzaChsb2FkZXIpO1xuXG5cdFx0bG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoTG9hZGVyRXZlbnQuUkVTT1VSQ0VfQ09NUExFVEUsIHRoaXMuX29uUmVzb3VyY2VDb21wbGV0ZURlbGVnYXRlKTtcblx0XHRsb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LlRFWFRVUkVfU0laRV9FUlJPUiwgdGhpcy5fb25UZXh0dXJlU2l6ZUVycm9yRGVsZWdhdGUpO1xuXHRcdGxvYWRlci5hZGRFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuQVNTRVRfQ09NUExFVEUsIHRoaXMuX29uQXNzZXRDb21wbGV0ZURlbGVnYXRlKTtcblxuXHRcdC8vIEVycm9yIGFyZSBoYW5kbGVkIHNlcGFyYXRlbHkgKHNlZSBkb2N1bWVudGF0aW9uIGZvciBhZGRFcnJvckhhbmRsZXIpXG5cdFx0bG9hZGVyLl9pQWRkRXJyb3JIYW5kbGVyKHRoaXMuX29uTG9hZEVycm9yRGVsZWdhdGUpO1xuXHRcdGxvYWRlci5faUFkZFBhcnNlRXJyb3JIYW5kbGVyKHRoaXMuX29uUGFyc2VFcnJvckRlbGVnYXRlKTtcblxuXHRcdHJldHVybiBsb2FkZXIubG9hZChyZXEsIGNvbnRleHQsIG5zLCBwYXJzZXIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIExvYWRzIGEgcmVzb3VyY2UgZnJvbSBleGlzdGluZyBkYXRhIGluIG1lbW9yeS5cblx0ICpcblx0ICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHJlc291cmNlIGluZm9ybWF0aW9uLlxuXHQgKiBAcGFyYW0gY29udGV4dCBBbiBvcHRpb25hbCBjb250ZXh0IG9iamVjdCBwcm92aWRpbmcgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciBsb2FkaW5nXG5cdCAqIEBwYXJhbSBucyBBbiBvcHRpb25hbCBuYW1lc3BhY2Ugc3RyaW5nIHVuZGVyIHdoaWNoIHRoZSBmaWxlIGlzIHRvIGJlIGxvYWRlZCwgYWxsb3dpbmcgdGhlIGRpZmZlcmVudGlhdGlvbiBvZiB0d28gcmVzb3VyY2VzIHdpdGggaWRlbnRpY2FsIGFzc2V0c1xuXHQgKiBAcGFyYW0gcGFyc2VyIEFuIG9wdGlvbmFsIHBhcnNlciBvYmplY3QgZm9yIHRyYW5zbGF0aW5nIHRoZSBsb2FkZWQgZGF0YSBpbnRvIGEgdXNhYmxlIHJlc291cmNlLiBJZiBub3QgcHJvdmlkZWQsIEFzc2V0TG9hZGVyIHdpbGwgYXR0ZW1wdCB0byBhdXRvLWRldGVjdCB0aGUgZmlsZSB0eXBlLlxuXHQgKiBAcmV0dXJuIEEgaGFuZGxlIHRvIHRoZSByZXRyaWV2ZWQgcmVzb3VyY2UuXG5cdCAqL1xuXHRwdWJsaWMgbG9hZERhdGEoZGF0YTphbnksIGNvbnRleHQ6QXNzZXRMb2FkZXJDb250ZXh0ID0gbnVsbCwgbnM6c3RyaW5nID0gbnVsbCwgcGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKTpBc3NldExvYWRlclRva2VuXG5cdHtcblx0XHR2YXIgbG9hZGVyOkFzc2V0TG9hZGVyID0gbmV3IEFzc2V0TG9hZGVyKCk7XG5cblx0XHRpZiAoIXRoaXMuX2xvYWRpbmdTZXNzaW9ucylcblx0XHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9ucyA9IG5ldyBBcnJheTxBc3NldExvYWRlcj4oKTtcblxuXHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9ucy5wdXNoKGxvYWRlcik7XG5cblx0XHRsb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihMb2FkZXJFdmVudC5SRVNPVVJDRV9DT01QTEVURSwgdGhpcy5fb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGUpO1xuXHRcdGxvYWRlci5hZGRFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuVEVYVFVSRV9TSVpFX0VSUk9SLCB0aGlzLl9vblRleHR1cmVTaXplRXJyb3JEZWxlZ2F0ZSk7XG5cdFx0bG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSwgdGhpcy5fb25Bc3NldENvbXBsZXRlRGVsZWdhdGUpO1xuXG5cdFx0Ly8gRXJyb3IgYXJlIGhhbmRsZWQgc2VwYXJhdGVseSAoc2VlIGRvY3VtZW50YXRpb24gZm9yIGFkZEVycm9ySGFuZGxlcilcblx0XHRsb2FkZXIuX2lBZGRFcnJvckhhbmRsZXIodGhpcy5fb25Mb2FkRXJyb3JEZWxlZ2F0ZSk7XG5cdFx0bG9hZGVyLl9pQWRkUGFyc2VFcnJvckhhbmRsZXIodGhpcy5fb25QYXJzZUVycm9yRGVsZWdhdGUpO1xuXG5cdFx0cmV0dXJuIGxvYWRlci5sb2FkRGF0YShkYXRhLCAnJywgY29udGV4dCwgbnMsIHBhcnNlcik7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXRBc3NldChuYW1lOnN0cmluZywgbnM6c3RyaW5nID0gbnVsbCk6SUFzc2V0XG5cdHtcblx0XHQvL3ZhciBhc3NldCA6IElBc3NldDtcblxuXHRcdGlmICh0aGlzLl9hc3NldERpY3REaXJ0eSlcblx0XHRcdHRoaXMucmVoYXNoQXNzZXREaWN0KCk7XG5cblx0XHRpZiAobnMgPT0gbnVsbClcblx0XHRcdG5zID0gTmFtZWRBc3NldEJhc2UuREVGQVVMVF9OQU1FU1BBQ0U7XG5cblx0XHRpZiAoIXRoaXMuX2Fzc2V0RGljdGlvbmFyeS5oYXNPd25Qcm9wZXJ0eShucykpXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdHJldHVybiB0aGlzLl9hc3NldERpY3Rpb25hcnlbbnNdW25hbWVdO1xuXG5cdH1cblxuXHQvKipcblx0ICogQWRkcyBhbiBhc3NldCB0byB0aGUgYXNzZXQgbGlicmFyeSwgZmlyc3QgbWFraW5nIHN1cmUgdGhhdCBpdCdzIG5hbWUgaXMgdW5pcXVlXG5cdCAqIHVzaW5nIHRoZSBtZXRob2QgZGVmaW5lZCBieSB0aGUgPGNvZGU+Y29uZmxpY3RTdHJhdGVneTwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPmNvbmZsaWN0UHJlY2VkZW5jZTwvY29kZT4gcHJvcGVydGllcy5cblx0ICovXG5cdHB1YmxpYyBhZGRBc3NldChhc3NldDpJQXNzZXQpXG5cdHtcblx0XHR2YXIgbnM6c3RyaW5nO1xuXHRcdHZhciBvbGQ6SUFzc2V0O1xuXG5cdFx0Ly8gQmFpbCBpZiBhc3NldCBoYXMgYWxyZWFkeSBiZWVuIGFkZGVkLlxuXHRcdGlmICh0aGlzLl9hc3NldHMuaW5kZXhPZihhc3NldCkgPj0gMClcblx0XHRcdHJldHVybjtcblxuXHRcdG9sZCA9IHRoaXMuZ2V0QXNzZXQoYXNzZXQubmFtZSwgYXNzZXQuYXNzZXROYW1lc3BhY2UpO1xuXHRcdG5zID0gYXNzZXQuYXNzZXROYW1lc3BhY2UgfHwgTmFtZWRBc3NldEJhc2UuREVGQVVMVF9OQU1FU1BBQ0U7XG5cblx0XHRpZiAob2xkICE9IG51bGwpXG5cdFx0XHR0aGlzLl9zdHJhdGVneS5yZXNvbHZlQ29uZmxpY3QoYXNzZXQsIG9sZCwgdGhpcy5fYXNzZXREaWN0aW9uYXJ5W25zXSwgdGhpcy5fc3RyYXRlZ3lQcmVmZXJlbmNlKTtcblxuXHRcdC8vY3JlYXRlIHVuaXF1ZS1pZCAoZm9yIG5vdyB0aGlzIGlzIHVzZWQgaW4gQXdheUJ1aWxkZXIgb25seVxuXHRcdC8vYXNzZXQuaWQgPSBJRFV0aWwuY3JlYXRlVUlEKCk7XG5cblx0XHQvLyBBZGQgaXRcblx0XHR0aGlzLl9hc3NldHMucHVzaChhc3NldCk7XG5cblx0XHRpZiAoIXRoaXMuX2Fzc2V0RGljdGlvbmFyeS5oYXNPd25Qcm9wZXJ0eShucykpXG5cdFx0XHR0aGlzLl9hc3NldERpY3Rpb25hcnlbbnNdID0gbmV3IE9iamVjdCgpO1xuXG5cdFx0dGhpcy5fYXNzZXREaWN0aW9uYXJ5W25zXVthc3NldC5uYW1lXSA9IGFzc2V0O1xuXG5cdFx0YXNzZXQuYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX1JFTkFNRSwgdGhpcy5fb25Bc3NldFJlbmFtZURlbGVnYXRlKTtcblx0XHRhc3NldC5hZGRFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuQVNTRVRfQ09ORkxJQ1RfUkVTT0xWRUQsIHRoaXMuX29uQXNzZXRDb25mbGljdFJlc29sdmVkRGVsZWdhdGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgYW4gYXNzZXQgZnJvbSB0aGUgbGlicmFyeSwgYW5kIG9wdGlvbmFsbHkgZGlzcG9zZXMgdGhhdCBhc3NldCBieSBjYWxsaW5nXG5cdCAqIGl0J3MgZGlzcG9zZUFzc2V0KCkgbWV0aG9kICh3aGljaCBmb3IgbW9zdCBhc3NldHMgaXMgaW1wbGVtZW50ZWQgYXMgYSBkZWZhdWx0XG5cdCAqIHZlcnNpb24gb2YgdGhhdCB0eXBlJ3MgZGlzcG9zZSgpIG1ldGhvZC5cblx0ICpcblx0ICogQHBhcmFtIGFzc2V0IFRoZSBhc3NldCB3aGljaCBzaG91bGQgYmUgcmVtb3ZlZCBmcm9tIHRoaXMgbGlicmFyeS5cblx0ICogQHBhcmFtIGRpc3Bvc2UgRGVmaW5lcyB3aGV0aGVyIHRoZSBhc3NldHMgc2hvdWxkIGFsc28gYmUgZGlzcG9zZWQuXG5cdCAqL1xuXHRwdWJsaWMgcmVtb3ZlQXNzZXQoYXNzZXQ6SUFzc2V0LCBkaXNwb3NlOmJvb2xlYW4gPSB0cnVlKVxuXHR7XG5cdFx0dmFyIGlkeDpudW1iZXI7XG5cblx0XHR0aGlzLnJlbW92ZUFzc2V0RnJvbURpY3QoYXNzZXQpO1xuXG5cdFx0YXNzZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX1JFTkFNRSwgdGhpcy5fb25Bc3NldFJlbmFtZURlbGVnYXRlKTtcblx0XHRhc3NldC5yZW1vdmVFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuQVNTRVRfQ09ORkxJQ1RfUkVTT0xWRUQsIHRoaXMuX29uQXNzZXRDb25mbGljdFJlc29sdmVkRGVsZWdhdGUpO1xuXG5cdFx0aWR4ID0gdGhpcy5fYXNzZXRzLmluZGV4T2YoYXNzZXQpO1xuXG5cdFx0aWYgKGlkeCA+PSAwKVxuXHRcdFx0dGhpcy5fYXNzZXRzLnNwbGljZShpZHgsIDEpO1xuXG5cdFx0aWYgKGRpc3Bvc2UpXG5cdFx0XHRhc3NldC5kaXNwb3NlKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlcyBhbiBhc3NldCB3aGljaCBpcyBzcGVjaWZpZWQgdXNpbmcgbmFtZSBhbmQgbmFtZXNwYWNlLlxuXHQgKlxuXHQgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYXNzZXQgdG8gYmUgcmVtb3ZlZC5cblx0ICogQHBhcmFtIG5zIFRoZSBuYW1lc3BhY2UgdG8gd2hpY2ggdGhlIGRlc2lyZWQgYXNzZXQgYmVsb25ncy5cblx0ICogQHBhcmFtIGRpc3Bvc2UgRGVmaW5lcyB3aGV0aGVyIHRoZSBhc3NldHMgc2hvdWxkIGFsc28gYmUgZGlzcG9zZWQuXG5cdCAqXG5cdCAqIEBzZWUgYXdheS5saWJyYXJ5LkFzc2V0TGlicmFyeS5yZW1vdmVBc3NldCgpXG5cdCAqL1xuXHRwdWJsaWMgcmVtb3ZlQXNzZXRCeU5hbWUobmFtZTpzdHJpbmcsIG5zOnN0cmluZyA9IG51bGwsIGRpc3Bvc2U6Ym9vbGVhbiA9IHRydWUpOklBc3NldFxuXHR7XG5cblx0XHR2YXIgYXNzZXQ6SUFzc2V0ID0gdGhpcy5nZXRBc3NldChuYW1lLCBucyk7XG5cblx0XHRpZiAoYXNzZXQpXG5cdFx0XHR0aGlzLnJlbW92ZUFzc2V0KGFzc2V0LCBkaXNwb3NlKTtcblxuXHRcdHJldHVybiBhc3NldDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIGFsbCBhc3NldHMgZnJvbSB0aGUgYXNzZXQgbGlicmFyeSwgb3B0aW9uYWxseSBkaXNwb3NpbmcgdGhlbSBhcyB0aGV5XG5cdCAqIGFyZSByZW1vdmVkLlxuXHQgKlxuXHQgKiBAcGFyYW0gZGlzcG9zZSBEZWZpbmVzIHdoZXRoZXIgdGhlIGFzc2V0cyBzaG91bGQgYWxzbyBiZSBkaXNwb3NlZC5cblx0ICovXG5cdHB1YmxpYyByZW1vdmVBbGxBc3NldHMoZGlzcG9zZTpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdGlmIChkaXNwb3NlKSB7XG5cdFx0XHR2YXIgYXNzZXQ6SUFzc2V0O1xuXG5cdFx0XHRmb3IgKHZhciBjOm51bWJlciA9IDA7IGMgPCB0aGlzLl9hc3NldHMubGVuZ3RoOyBjKyspIHtcblx0XHRcdFx0YXNzZXQgPSB0aGlzLl9hc3NldHNbIGMgXTtcblx0XHRcdFx0YXNzZXQuZGlzcG9zZSgpO1xuXHRcdFx0fVxuXHRcdFx0Lypcblx0XHRcdCBmb3IgZWFjaCAoYXNzZXQgaW4gX2Fzc2V0cylcblx0XHRcdCBhc3NldC5kaXNwb3NlKCk7XG5cdFx0XHQgKi9cblx0XHR9XG5cblx0XHR0aGlzLl9hc3NldHMubGVuZ3RoID0gMDtcblx0XHR0aGlzLnJlaGFzaEFzc2V0RGljdCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgYWxsIGFzc2V0cyBiZWxvbmdpbmcgdG8gYSBwYXJ0aWN1bGFyIG5hbWVzcGFjZSAobnVsbCBmb3IgZGVmYXVsdClcblx0ICogZnJvbSB0aGUgYXNzZXQgbGlicmFyeSwgYW5kIG9wdGlvbmFsbCBkaXNwb3NlcyB0aGVtIGJ5IGNhbGxpbmcgdGhlaXJcblx0ICogZGlzcG9zZUFzc2V0KCkgbWV0aG9kLlxuXHQgKlxuXHQgKiBAcGFyYW0gbnMgVGhlIG5hbWVzcGFjZSBmcm9tIHdoaWNoIGFsbCBhc3NldHMgc2hvdWxkIGJlIHJlbW92ZWQuXG5cdCAqIEBwYXJhbSBkaXNwb3NlIERlZmluZXMgd2hldGhlciB0aGUgYXNzZXRzIHNob3VsZCBhbHNvIGJlIGRpc3Bvc2VkLlxuXHQgKlxuXHQgKiBAc2VlIGF3YXkubGlicmFyeS5Bc3NldExpYnJhcnkucmVtb3ZlQXNzZXQoKVxuXHQgKi9cblx0cHVibGljIHJlbW92ZU5hbWVzcGFjZUFzc2V0cyhuczpzdHJpbmcgPSBudWxsLCBkaXNwb3NlOmJvb2xlYW4gPSB0cnVlKVxuXHR7XG5cdFx0dmFyIGlkeDpudW1iZXIgPSAwO1xuXHRcdHZhciBhc3NldDpJQXNzZXQ7XG5cdFx0dmFyIG9sZF9hc3NldHM6SUFzc2V0W107XG5cblx0XHQvLyBFbXB0eSB0aGUgYXNzZXRzIHZlY3RvciBhZnRlciBoYXZpbmcgc3RvcmVkIGEgY29weSBvZiBpdC5cblx0XHQvLyBUaGUgY29weSB3aWxsIGJlIGZpbGxlZCB3aXRoIGFsbCBhc3NldHMgd2hpY2ggd2VyZW4ndCByZW1vdmVkLlxuXHRcdG9sZF9hc3NldHMgPSB0aGlzLl9hc3NldHMuY29uY2F0KCk7XG5cdFx0dGhpcy5fYXNzZXRzLmxlbmd0aCA9IDA7XG5cblx0XHRpZiAobnMgPT0gbnVsbClcblx0XHRcdG5zID0gTmFtZWRBc3NldEJhc2UuREVGQVVMVF9OQU1FU1BBQ0U7XG5cblx0XHRmb3IgKHZhciBkOm51bWJlciA9IDA7IGQgPCBvbGRfYXNzZXRzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRhc3NldCA9IG9sZF9hc3NldHNbZF07XG5cblx0XHRcdC8vIFJlbW92ZSBmcm9tIGRpY3QgaWYgaW4gdGhlIHN1cHBsaWVkIG5hbWVzcGFjZS4gSWYgbm90LFxuXHRcdFx0Ly8gdHJhbnNmZXIgb3ZlciB0byB0aGUgbmV3IHZlY3Rvci5cblx0XHRcdGlmIChhc3NldC5hc3NldE5hbWVzcGFjZSA9PSBucykge1xuXHRcdFx0XHRpZiAoZGlzcG9zZSlcblx0XHRcdFx0XHRhc3NldC5kaXNwb3NlKCk7XG5cblx0XHRcdFx0Ly8gUmVtb3ZlIGFzc2V0IGZyb20gZGljdGlvbmFyeSwgYnV0IGRvbid0IHRyeSB0byBhdXRvLXJlbW92ZVxuXHRcdFx0XHQvLyB0aGUgbmFtZXNwYWNlLCB3aGljaCB3aWxsIHRyaWdnZXIgYW4gdW5uZWNlc3NhcmlseSBleHBlbnNpdmVcblx0XHRcdFx0Ly8gdGVzdCB0aGF0IGlzIG5vdCBuZWVkZWQgc2luY2Ugd2Uga25vdyB0aGF0IHRoZSBuYW1lc3BhY2Vcblx0XHRcdFx0Ly8gd2lsbCBiZSBlbXB0eSB3aGVuIGxvb3AgZmluaXNoZXMuXG5cdFx0XHRcdHRoaXMucmVtb3ZlQXNzZXRGcm9tRGljdChhc3NldCwgZmFsc2UpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fYXNzZXRzW2lkeCsrXSA9IGFzc2V0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qXG5cdFx0IGZvciBlYWNoIChhc3NldCBpbiBvbGRfYXNzZXRzKSB7XG5cdFx0IC8vIFJlbW92ZSBmcm9tIGRpY3QgaWYgaW4gdGhlIHN1cHBsaWVkIG5hbWVzcGFjZS4gSWYgbm90LFxuXHRcdCAvLyB0cmFuc2ZlciBvdmVyIHRvIHRoZSBuZXcgdmVjdG9yLlxuXHRcdCBpZiAoYXNzZXQuYXNzZXROYW1lc3BhY2UgPT0gbnMpIHtcblx0XHQgaWYgKGRpc3Bvc2UpXG5cdFx0IGFzc2V0LmRpc3Bvc2UoKTtcblxuXHRcdCAvLyBSZW1vdmUgYXNzZXQgZnJvbSBkaWN0aW9uYXJ5LCBidXQgZG9uJ3QgdHJ5IHRvIGF1dG8tcmVtb3ZlXG5cdFx0IC8vIHRoZSBuYW1lc3BhY2UsIHdoaWNoIHdpbGwgdHJpZ2dlciBhbiB1bm5lY2Vzc2FyaWx5IGV4cGVuc2l2ZVxuXHRcdCAvLyB0ZXN0IHRoYXQgaXMgbm90IG5lZWRlZCBzaW5jZSB3ZSBrbm93IHRoYXQgdGhlIG5hbWVzcGFjZVxuXHRcdCAvLyB3aWxsIGJlIGVtcHR5IHdoZW4gbG9vcCBmaW5pc2hlcy5cblx0XHQgcmVtb3ZlQXNzZXRGcm9tRGljdChhc3NldCwgZmFsc2UpO1xuXHRcdCB9IGVsc2Vcblx0XHQgX2Fzc2V0c1tpZHgrK10gPSBhc3NldDtcblxuXHRcdCB9XG5cdFx0ICovXG5cblx0XHQvLyBSZW1vdmUgZW1wdHkgbmFtZXNwYWNlXG5cdFx0aWYgKHRoaXMuX2Fzc2V0RGljdGlvbmFyeS5oYXNPd25Qcm9wZXJ0eShucykpXG5cdFx0XHRkZWxldGUgdGhpcy5fYXNzZXREaWN0aW9uYXJ5W25zXTtcblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlQXNzZXRGcm9tRGljdChhc3NldDpJQXNzZXQsIGF1dG9SZW1vdmVFbXB0eU5hbWVzcGFjZTpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdGlmICh0aGlzLl9hc3NldERpY3REaXJ0eSlcblx0XHRcdHRoaXMucmVoYXNoQXNzZXREaWN0KCk7XG5cblx0XHRpZiAodGhpcy5fYXNzZXREaWN0aW9uYXJ5Lmhhc093blByb3BlcnR5KGFzc2V0LmFzc2V0TmFtZXNwYWNlKSkge1xuXHRcdFx0aWYgKHRoaXMuX2Fzc2V0RGljdGlvbmFyeVthc3NldC5hc3NldE5hbWVzcGFjZV0uaGFzT3duUHJvcGVydHkoYXNzZXQubmFtZSkpXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9hc3NldERpY3Rpb25hcnlbYXNzZXQuYXNzZXROYW1lc3BhY2VdW2Fzc2V0Lm5hbWVdO1xuXG5cdFx0XHRpZiAoYXV0b1JlbW92ZUVtcHR5TmFtZXNwYWNlKSB7XG5cblx0XHRcdFx0dmFyIGtleTpzdHJpbmc7XG5cdFx0XHRcdHZhciBlbXB0eTpib29sZWFuID0gdHJ1ZTtcblxuXHRcdFx0XHRmb3IgKGtleSBpbiB0aGlzLl9hc3NldERpY3Rpb25hcnlbYXNzZXQuYXNzZXROYW1lc3BhY2VdKSB7XG5cdFx0XHRcdFx0ZW1wdHkgPSBmYWxzZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChlbXB0eSlcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5fYXNzZXREaWN0aW9uYXJ5W2Fzc2V0LmFzc2V0TmFtZXNwYWNlXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgc3RvcEFsbExvYWRpbmdTZXNzaW9ucygpXG5cdHtcblx0XHR2YXIgaTpudW1iZXI7XG5cblx0XHRpZiAoIXRoaXMuX2xvYWRpbmdTZXNzaW9ucylcblx0XHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9ucyA9IG5ldyBBcnJheTxBc3NldExvYWRlcj4oKTtcblxuXHRcdHZhciBsZW5ndGg6bnVtYmVyID0gdGhpcy5fbG9hZGluZ1Nlc3Npb25zLmxlbmd0aDtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKylcblx0XHRcdHRoaXMua2lsbExvYWRpbmdTZXNzaW9uKHRoaXMuX2xvYWRpbmdTZXNzaW9uc1tpXSk7XG5cblx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMgPSBudWxsO1xuXHR9XG5cblx0cHJpdmF0ZSByZWhhc2hBc3NldERpY3QoKVxuXHR7XG5cdFx0dmFyIGFzc2V0OklBc3NldDtcblxuXHRcdHRoaXMuX2Fzc2V0RGljdGlvbmFyeSA9IHt9O1xuXG5cdFx0dmFyIGw6bnVtYmVyID0gdGhpcy5fYXNzZXRzLmxlbmd0aDtcblxuXHRcdGZvciAodmFyIGM6bnVtYmVyID0gMDsgYyA8IGw7IGMrKykge1xuXHRcdFx0YXNzZXQgPSB0aGlzLl9hc3NldHNbY107XG5cblx0XHRcdGlmICghdGhpcy5fYXNzZXREaWN0aW9uYXJ5Lmhhc093blByb3BlcnR5KGFzc2V0LmFzc2V0TmFtZXNwYWNlKSlcblx0XHRcdFx0dGhpcy5fYXNzZXREaWN0aW9uYXJ5W2Fzc2V0LmFzc2V0TmFtZXNwYWNlXSA9IHt9O1xuXG5cdFx0XHR0aGlzLl9hc3NldERpY3Rpb25hcnlbYXNzZXQuYXNzZXROYW1lc3BhY2VdW2Fzc2V0Lm5hbWVdID0gYXNzZXQ7XG5cblx0XHR9XG5cblx0XHR0aGlzLl9hc3NldERpY3REaXJ0eSA9IGZhbHNlO1xuXG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gYSBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIGxvYWRpbmcuXG5cdCAqL1xuXHRwcml2YXRlIG9uTG9hZEVycm9yKGV2ZW50OklPRXJyb3JFdmVudCk6Ym9vbGVhblxuXHR7XG5cdFx0aWYgKHRoaXMuaGFzRXZlbnRMaXN0ZW5lcihJT0Vycm9yRXZlbnQuSU9fRVJST1IpKSB7XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gYSBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHBhcnNpbmcuXG5cdCAqL1xuXHRwcml2YXRlIG9uUGFyc2VFcnJvcihldmVudDpQYXJzZXJFdmVudCk6Ym9vbGVhblxuXHR7XG5cdFx0aWYgKHRoaXMuaGFzRXZlbnRMaXN0ZW5lcihQYXJzZXJFdmVudC5QQVJTRV9FUlJPUikpIHtcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgb25Bc3NldENvbXBsZXRlKGV2ZW50OkFzc2V0RXZlbnQpXG5cdHtcblx0XHQvLyBPbmx5IGFkZCBhc3NldCB0byBsaWJyYXJ5IHRoZSBmaXJzdCB0aW1lLlxuXHRcdGlmIChldmVudC50eXBlID09IEFzc2V0RXZlbnQuQVNTRVRfQ09NUExFVEUpXG5cdFx0XHR0aGlzLmFkZEFzc2V0KGV2ZW50LmFzc2V0KTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cblx0fVxuXG5cdHByaXZhdGUgb25UZXh0dXJlU2l6ZUVycm9yKGV2ZW50OkFzc2V0RXZlbnQpXG5cdHtcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCB3aGVuIHRoZSByZXNvdXJjZSBhbmQgYWxsIG9mIGl0cyBkZXBlbmRlbmNpZXMgd2FzIHJldHJpZXZlZC5cblx0ICovXG5cdHByaXZhdGUgb25SZXNvdXJjZUNvbXBsZXRlKGV2ZW50OkxvYWRlckV2ZW50KVxuXHR7XG5cdFx0dmFyIGxvYWRlcjpBc3NldExvYWRlciA9IDxBc3NldExvYWRlcj4gZXZlbnQudGFyZ2V0O1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblxuXHRcdHZhciBpbmRleDpudW1iZXIgPSB0aGlzLl9sb2FkaW5nU2Vzc2lvbnMuaW5kZXhPZihsb2FkZXIpO1xuXHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuXG5cdFx0Ly8gQWRkIGxvYWRlciB0byBhIGdhcmJhZ2UgYXJyYXkgLSBmb3IgYSBjb2xsZWN0aW9uIHN3ZWVwIGFuZCBraWxsXG5cdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zR2FyYmFnZS5wdXNoKGxvYWRlcik7XG5cdFx0dGhpcy5fZ2NUaW1lb3V0SUlEID0gc2V0VGltZW91dCgoKSA9PiB7dGhpcy5sb2FkaW5nU2Vzc2lvbkdDKCl9LCAxMDApO1xuXHR9XG5cblx0cHJpdmF0ZSBsb2FkaW5nU2Vzc2lvbkdDKCk6dm9pZFxuXHR7XG5cdFx0dmFyIGxvYWRlcjpBc3NldExvYWRlcjtcblxuXHRcdHdoaWxlICh0aGlzLl9sb2FkaW5nU2Vzc2lvbnNHYXJiYWdlLmxlbmd0aCA+IDApIHtcblx0XHRcdGxvYWRlciA9IHRoaXMuX2xvYWRpbmdTZXNzaW9uc0dhcmJhZ2UucG9wKCk7XG5cdFx0XHR0aGlzLmtpbGxMb2FkaW5nU2Vzc2lvbihsb2FkZXIpO1xuXHRcdH1cblxuXHRcdGNsZWFyVGltZW91dCh0aGlzLl9nY1RpbWVvdXRJSUQpO1xuXHRcdHRoaXMuX2djVGltZW91dElJRCA9IG51bGw7XG5cblx0fVxuXG5cdHByaXZhdGUga2lsbExvYWRpbmdTZXNzaW9uKGxvYWRlcjpBc3NldExvYWRlcilcblx0e1xuXHRcdGxvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKExvYWRlckV2ZW50LlJFU09VUkNFX0NPTVBMRVRFLCB0aGlzLl9vblJlc291cmNlQ29tcGxldGVEZWxlZ2F0ZSk7XG5cdFx0bG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5URVhUVVJFX1NJWkVfRVJST1IsIHRoaXMuX29uVGV4dHVyZVNpemVFcnJvckRlbGVnYXRlKTtcblx0XHRsb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCB0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSk7XG5cdFx0bG9hZGVyLnN0b3AoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgd2hlbiB1bmVzcGVjdGVkIGVycm9yIG9jY3Vyc1xuXHQgKi9cblx0Lypcblx0IHByaXZhdGUgb25SZXNvdXJjZUVycm9yKCkgOiB2b2lkXG5cdCB7XG5cdCB2YXIgbXNnOnN0cmluZyA9IFwiVW5leHBlY3RlZCBwYXJzZXIgZXJyb3JcIjtcblx0IGlmKGhhc0V2ZW50TGlzdGVuZXIoTG9hZGVyRXZlbnQuREVQRU5ERU5DWV9FUlJPUikpe1xuXHQgdmFyIHJlOkxvYWRlckV2ZW50ID0gbmV3IExvYWRlckV2ZW50KExvYWRlckV2ZW50LkRFUEVOREVOQ1lfRVJST1IsIFwiXCIpO1xuXHQgZGlzcGF0Y2hFdmVudChyZSk7XG5cdCB9IGVsc2V7XG5cdCB0aHJvdyBuZXcgRXJyb3IobXNnKTtcblx0IH1cblx0IH1cblx0ICovXG5cblx0cHJpdmF0ZSBvbkFzc2V0UmVuYW1lKGV2ZW50OkFzc2V0RXZlbnQpXG5cdHtcblx0XHR2YXIgYXNzZXQ6SUFzc2V0ID0gPElBc3NldCA+IGV2ZW50LnRhcmdldDsvLyBUT0RPOiB3YXMgZXYuY3VycmVudFRhcmdldCAtIHdhdGNoIHRoaXMgdmFyXG5cdFx0dmFyIG9sZDpJQXNzZXQgPSB0aGlzLmdldEFzc2V0KGFzc2V0LmFzc2V0TmFtZXNwYWNlLCBhc3NldC5uYW1lKTtcblxuXHRcdGlmIChvbGQgIT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fc3RyYXRlZ3kucmVzb2x2ZUNvbmZsaWN0KGFzc2V0LCBvbGQsIHRoaXMuX2Fzc2V0RGljdGlvbmFyeVthc3NldC5hc3NldE5hbWVzcGFjZV0sIHRoaXMuX3N0cmF0ZWd5UHJlZmVyZW5jZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBkaWN0Ok9iamVjdCA9IHRoaXMuX2Fzc2V0RGljdGlvbmFyeVtldmVudC5hc3NldC5hc3NldE5hbWVzcGFjZV07XG5cblx0XHRcdGlmIChkaWN0ID09IG51bGwpXG5cdFx0XHRcdHJldHVybjtcblxuXHRcdFx0ZGljdFtldmVudC5hc3NldFByZXZOYW1lXSA9IG51bGw7XG5cdFx0XHRkaWN0W2V2ZW50LmFzc2V0Lm5hbWVdID0gZXZlbnQuYXNzZXQ7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBvbkFzc2V0Q29uZmxpY3RSZXNvbHZlZChldmVudDpBc3NldEV2ZW50KVxuXHR7XG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50LmNsb25lKCkpO1xuXHR9XG59XG5cbmV4cG9ydCA9IEFzc2V0TGlicmFyeUJ1bmRsZTsiXX0=