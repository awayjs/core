///<reference path="../../_definitions.ts"/>

module away.library
{


	/**
	 * AssetLibraryBundle enforces a multiton pattern and is not intended to be instanced directly.
	 * Its purpose is to create a container for 3D data management, both before and after parsing.
	 * If you are interested in creating multiple library bundles, please use the <code>getInstance()</code> method.
	 */
	export class AssetLibraryBundle extends away.events.EventDispatcher
	{
		private _loadingSessions:Array<away.net.AssetLoader>;
		private _strategy:ConflictStrategyBase;
		private _strategyPreference:string;
		private _assets:Array<IAsset>;
		private _assetDictionary:Object;
		private _assetDictDirty:boolean;
		private _loadingSessionsGarbage:Array<away.net.AssetLoader> = new Array<away.net.AssetLoader>();
		private _gcTimeoutIID:number;

		private _onAssetRenameDelegate:Function;
		private _onAssetConflictResolvedDelegate:Function;
		private _onResourceRetrievedDelegate:Function;
		private _onDependencyRetrievedDelegate:Function;
		private _onTextureSizeErrorDelegate:Function;
		private _onAssetCompleteDelegate:Function;
		private _onDependencyRetrievingErrorDelegate:Function;
		private _onDependencyRetrievingParseErrorDelegate:Function;

		/**
		 * Creates a new <code>AssetLibraryBundle</code> object.
		 *
		 * @param me A multiton enforcer for the AssetLibraryBundle ensuring it cannnot be instanced.
		 */
		constructor(me:AssetLibraryBundleSingletonEnforcer)
		{
			super();

			this._assets = new Array<IAsset>();//new Vector.<IAsset>;
			this._assetDictionary = new Object();
			this._loadingSessions = new Array<away.net.AssetLoader>();

			this.conflictStrategy = ConflictStrategy.IGNORE.create();
			this.conflictPrecedence = ConflictPrecedence.FAVOR_NEW;

			this._onAssetRenameDelegate = away.utils.Delegate.create(this, this.onAssetRename);
			this._onAssetConflictResolvedDelegate = away.utils.Delegate.create(this, this.onAssetConflictResolved);
			this._onResourceRetrievedDelegate = away.utils.Delegate.create(this, this.onResourceRetrieved);
			this._onDependencyRetrievedDelegate = away.utils.Delegate.create(this, this.onDependencyRetrieved);
			this._onTextureSizeErrorDelegate = away.utils.Delegate.create(this, this.onTextureSizeError);
			this._onAssetCompleteDelegate = away.utils.Delegate.create(this, this.onAssetComplete);
			this._onDependencyRetrievingErrorDelegate = away.utils.Delegate.create(this, this.onDependencyRetrievingError);
			this._onDependencyRetrievingParseErrorDelegate = away.utils.Delegate.create(this, this.onDependencyRetrievingParseError);
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
		public static getInstance(key:string = 'default'):AssetLibraryBundle
		{
			if (!key)
				key = 'default';

			if (!AssetLibrary._iInstances.hasOwnProperty(key))
				AssetLibrary._iInstances[key] = new AssetLibraryBundle(new AssetLibraryBundleSingletonEnforcer());

			return AssetLibrary._iInstances[key];

		}

		/**
		 *
		 */
		public enableParser(parserClass:Object)
		{
			away.net.SingleFileLoader.enableParser(parserClass);
		}

		/**
		 *
		 */
		public enableParsers(parserClasses:Object[])
		{
			away.net.SingleFileLoader.enableParsers(parserClasses);
		}

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
		public get conflictStrategy():ConflictStrategyBase
		{
			return this._strategy;
		}

		public set conflictStrategy(val:ConflictStrategyBase)
		{

			if (!val)
				throw new away.errors.Error('namingStrategy must not be null. To ignore naming, use AssetLibrary.IGNORE');

			this._strategy = val.create();

		}

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
		public get conflictPrecedence():string
		{
			return this._strategyPreference;
		}

		public set conflictPrecedence(val:string)
		{
			this._strategyPreference = val;
		}

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
		public createIterator(assetTypeFilter:string = null, namespaceFilter:string = null, filterFunc = null):AssetLibraryIterator
		{
			return new AssetLibraryIterator(this._assets, assetTypeFilter, namespaceFilter, filterFunc);
		}

		/**
		 * Loads a file and (optionally) all of its dependencies.
		 *
		 * @param req The URLRequest object containing the URL of the file to be loaded.
		 * @param context An optional context object providing additional parameters for loading
		 * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
		 * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, AssetLoader will attempt to auto-detect the file type.
		 */
		public load(req:away.net.URLRequest, context:away.net.AssetLoaderContext = null, ns:string = null, parser:away.parsers.ParserBase = null):away.net.AssetLoaderToken
		{
			return this.loadResource(req, context, ns, parser);
		}

		/**
		 * Loads a resource from existing data in memory.
		 *
		 * @param data The data object containing all resource information.
		 * @param context An optional context object providing additional parameters for loading
		 * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
		 * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, AssetLoader will attempt to auto-detect the file type.
		 */
		public loadData(data:any, context:away.net.AssetLoaderContext = null, ns:string = null, parser:away.parsers.ParserBase = null):away.net.AssetLoaderToken
		{
			return this.parseResource(data, context, ns, parser);
		}

		/**
		 *
		 */
		public getAsset(name:string, ns:string = null):IAsset
		{
			//var asset : IAsset;

			if (this._assetDictDirty)
				this.rehashAssetDict();

			if (ns == null)
				ns = NamedAssetBase.DEFAULT_NAMESPACE;

			if (!this._assetDictionary.hasOwnProperty(ns))
				return null;

			return this._assetDictionary[ns][name];

		}

		/**
		 * Adds an asset to the asset library, first making sure that it's name is unique
		 * using the method defined by the <code>conflictStrategy</code> and
		 * <code>conflictPrecedence</code> properties.
		 */
		public addAsset(asset:IAsset)
		{
			var ns:string;
			var old:IAsset;

			// Bail if asset has already been added.
			if (this._assets.indexOf(asset) >= 0)
				return;

			old = this.getAsset(asset.name, asset.assetNamespace);
			ns = asset.assetNamespace || NamedAssetBase.DEFAULT_NAMESPACE;

			if (old != null)
				this._strategy.resolveConflict(asset, old, this._assetDictionary[ns], this._strategyPreference);

			//create unique-id (for now this is used in AwayBuilder only
			asset.id = IDUtil.createUID();

			// Add it
			this._assets.push(asset);

			if (!this._assetDictionary.hasOwnProperty(ns))
				this._assetDictionary[ns] = new Object();

			this._assetDictionary[ns][asset.name] = asset;

			asset.addEventListener(away.events.AssetEvent.ASSET_RENAME, this._onAssetRenameDelegate);
			asset.addEventListener(away.events.AssetEvent.ASSET_CONFLICT_RESOLVED, this._onAssetConflictResolvedDelegate);
		}

		/**
		 * Removes an asset from the library, and optionally disposes that asset by calling
		 * it's disposeAsset() method (which for most assets is implemented as a default
		 * version of that type's dispose() method.
		 *
		 * @param asset The asset which should be removed from this library.
		 * @param dispose Defines whether the assets should also be disposed.
		 */
		public removeAsset(asset:IAsset, dispose:boolean = true)
		{
			var idx:number;

			this.removeAssetFromDict(asset);

			asset.removeEventListener(away.events.AssetEvent.ASSET_RENAME, this._onAssetRenameDelegate);
			asset.removeEventListener(away.events.AssetEvent.ASSET_CONFLICT_RESOLVED, this._onAssetConflictResolvedDelegate);

			idx = this._assets.indexOf(asset);

			if (idx >= 0)
				this._assets.splice(idx, 1);

			if (dispose)
				asset.dispose();
		}

		/**
		 * Removes an asset which is specified using name and namespace.
		 *
		 * @param name The name of the asset to be removed.
		 * @param ns The namespace to which the desired asset belongs.
		 * @param dispose Defines whether the assets should also be disposed.
		 *
		 * @see away.library.AssetLibrary.removeAsset()
		 */
		public removeAssetByName(name:string, ns:string = null, dispose:boolean = true):IAsset
		{

			var asset:IAsset = this.getAsset(name, ns);

			if (asset)
				this.removeAsset(asset, dispose);

			return asset;
		}

		/**
		 * Removes all assets from the asset library, optionally disposing them as they
		 * are removed.
		 *
		 * @param dispose Defines whether the assets should also be disposed.
		 */
		public removeAllAssets(dispose:boolean = true)
		{
			if (dispose) {
				var asset:IAsset;

				for (var c:number = 0; c < this._assets.length; c++) {
					asset = this._assets[ c ];
					asset.dispose();
				}
				/*
				 for each (asset in _assets)
				 asset.dispose();
				 */
			}

			this._assets.length = 0;
			this.rehashAssetDict();
		}

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
		public removeNamespaceAssets(ns:string = null, dispose:boolean = true)
		{
			var idx:number = 0;
			var asset:IAsset;
			var old_assets:IAsset[];

			// Empty the assets vector after having stored a copy of it.
			// The copy will be filled with all assets which weren't removed.
			old_assets = this._assets.concat();
			this._assets.length = 0;

			if (ns == null)
				ns = NamedAssetBase.DEFAULT_NAMESPACE;

			for (var d:number = 0; d < old_assets.length; d++) {
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
		}

		private removeAssetFromDict(asset:IAsset, autoRemoveEmptyNamespace:boolean = true)
		{
			if (this._assetDictDirty)
				this.rehashAssetDict();

			if (this._assetDictionary.hasOwnProperty(asset.assetNamespace)) {
				if (this._assetDictionary[asset.assetNamespace].hasOwnProperty(asset.name))
					delete this._assetDictionary[asset.assetNamespace][asset.name];

				if (autoRemoveEmptyNamespace) {

					var key:string;
					var empty:boolean = true;

					for (key in this._assetDictionary[asset.assetNamespace]) {
						empty = false;
						break;
					}

					if (empty)
						delete this._assetDictionary[asset.assetNamespace];
				}
			}
		}

		/**
		 * Loads a yet unloaded resource file from the given url.
		 */
		private loadResource(req:away.net.URLRequest, context:away.net.AssetLoaderContext = null, ns:string = null, parser:away.parsers.ParserBase = null):away.net.AssetLoaderToken
		{
			var loader:away.net.AssetLoader = new away.net.AssetLoader();

			if (!this._loadingSessions)
				this._loadingSessions = new Array<away.net.AssetLoader>();

			this._loadingSessions.push(loader);

			loader.addEventListener(away.events.LoaderEvent.RESOURCE_COMPLETE, this._onResourceRetrievedDelegate);
			loader.addEventListener(away.events.LoaderEvent.DEPENDENCY_COMPLETE, this._onDependencyRetrievedDelegate);
			loader.addEventListener(away.events.AssetEvent.TEXTURE_SIZE_ERROR, this._onTextureSizeErrorDelegate);
			loader.addEventListener(away.events.AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);

			// Error are handled separately (see documentation for addErrorHandler)
			loader._iAddErrorHandler(this._onDependencyRetrievingErrorDelegate);
			loader._iAddParseErrorHandler(this._onDependencyRetrievingParseErrorDelegate);

			return loader.load(req, context, ns, parser);
		}

		public stopAllLoadingSessions()
		{
			var i:number;

			if (!this._loadingSessions)
				this._loadingSessions = new Array<away.net.AssetLoader>();

			var length:number = this._loadingSessions.length;

			for (i = 0; i < length; i++)
				this.killLoadingSession(this._loadingSessions[i]);

			this._loadingSessions = null;
		}

		/**
		 * Retrieves an unloaded resource parsed from the given data.
		 * @param data The data to be parsed.
		 * @param id The id that will be assigned to the resource. This can later also be used by the getResource method.
		 * @param ignoreDependencies Indicates whether or not dependencies should be ignored or loaded.
		 * @param parser An optional parser object that will translate the data into a usable resource.
		 * @return A handle to the retrieved resource.
		 */
		private parseResource(data:any, context:away.net.AssetLoaderContext = null, ns:string = null, parser:away.parsers.ParserBase = null):away.net.AssetLoaderToken
		{
			var loader:away.net.AssetLoader = new away.net.AssetLoader();

			if (!this._loadingSessions)
				this._loadingSessions = new Array<away.net.AssetLoader>();

			this._loadingSessions.push(loader);

			loader.addEventListener(away.events.LoaderEvent.RESOURCE_COMPLETE, this._onResourceRetrievedDelegate);
			loader.addEventListener(away.events.LoaderEvent.DEPENDENCY_COMPLETE, this._onDependencyRetrievedDelegate);
			loader.addEventListener(away.events.AssetEvent.TEXTURE_SIZE_ERROR, this._onTextureSizeErrorDelegate);
			loader.addEventListener(away.events.AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);

			// Error are handled separately (see documentation for addErrorHandler)
			loader._iAddErrorHandler(this._onDependencyRetrievingErrorDelegate);
			loader._iAddParseErrorHandler(this._onDependencyRetrievingParseErrorDelegate);

			return loader.loadData(data, '', context, ns, parser);
		}

		private rehashAssetDict()
		{
			var asset:IAsset;

			this._assetDictionary = {};

			var l:number = this._assets.length;

			for (var c:number = 0; c < l; c++) {
				asset = this._assets[c];

				if (!this._assetDictionary.hasOwnProperty(asset.assetNamespace))
					this._assetDictionary[asset.assetNamespace] = {};

				this._assetDictionary[asset.assetNamespace][asset.name] = asset;

			}

			this._assetDictDirty = false;

		}

		/**
		 * Called when a dependency was retrieved.
		 */
		private onDependencyRetrieved(event:away.events.LoaderEvent)
		{
			//if (hasEventListener(LoaderEvent.DEPENDENCY_COMPLETE))
			this.dispatchEvent(event);

		}

		/**
		 * Called when a an error occurs during dependency retrieving.
		 */
		private onDependencyRetrievingError(event:away.events.LoaderEvent):boolean
		{
			if (this.hasEventListener(away.events.LoaderEvent.LOAD_ERROR)) {
				this.dispatchEvent(event);
				return true;
			} else {
				return false;
			}
		}

		/**
		 * Called when a an error occurs during parsing.
		 */
		private onDependencyRetrievingParseError(event:away.events.ParserEvent):boolean
		{
			if (this.hasEventListener(away.events.ParserEvent.PARSE_ERROR)) {
				this.dispatchEvent(event);
				return true;
			} else {
				return false;
			}
		}

		private onAssetComplete(event:away.events.AssetEvent)
		{
			// Only add asset to library the first time.
			if (event.type == away.events.AssetEvent.ASSET_COMPLETE)
				this.addAsset(event.asset);

			this.dispatchEvent(event.clone());

		}

		private onTextureSizeError(event:away.events.AssetEvent)
		{
			this.dispatchEvent(event.clone());
		}

		/**
		 * Called when the resource and all of its dependencies was retrieved.
		 */
		private onResourceRetrieved(event:away.events.LoaderEvent)
		{
			var loader:away.net.AssetLoader = <away.net.AssetLoader> event.target;

			this.dispatchEvent(event.clone());

			var index:number = this._loadingSessions.indexOf(loader);
			this._loadingSessions.splice(index, 1);

			// Add loader to a garbage array - for a collection sweep and kill
			this._loadingSessionsGarbage.push(loader);
			this._gcTimeoutIID = setTimeout(() =>
			{
				this.loadingSessionGC()
			}, 100);

		}

		private loadingSessionGC():void
		{
			var loader:away.net.AssetLoader;

			while (this._loadingSessionsGarbage.length > 0) {
				loader = this._loadingSessionsGarbage.pop();
				this.killLoadingSession(loader);
			}

			clearTimeout(this._gcTimeoutIID);
			this._gcTimeoutIID = null;

		}

		private killLoadingSession(loader:away.net.AssetLoader)
		{
			loader.removeEventListener(away.events.LoaderEvent.RESOURCE_COMPLETE, this._onResourceRetrievedDelegate);
			loader.removeEventListener(away.events.LoaderEvent.DEPENDENCY_COMPLETE, this._onDependencyRetrievedDelegate);
			loader.removeEventListener(away.events.AssetEvent.TEXTURE_SIZE_ERROR, this._onTextureSizeErrorDelegate);
			loader.removeEventListener(away.events.AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
			loader.stop();

		}

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

		private onAssetRename(ev:away.events.AssetEvent)
		{
			var asset:IAsset = <IAsset > ev.target;// TODO: was ev.currentTarget - watch this var
			var old:IAsset = this.getAsset(asset.assetNamespace, asset.name);

			if (old != null) {
				this._strategy.resolveConflict(asset, old, this._assetDictionary[asset.assetNamespace], this._strategyPreference);
			} else {
				var dict:Object = this._assetDictionary[ev.asset.assetNamespace];

				if (dict == null)
					return;

				dict[ev.assetPrevName] = null;
				dict[ev.asset.name] = ev.asset;
			}
		}

		private onAssetConflictResolved(ev:away.events.AssetEvent)
		{
			this.dispatchEvent(ev.clone());
		}
	}
}

// singleton enforcer
class AssetLibraryBundleSingletonEnforcer
{
}
