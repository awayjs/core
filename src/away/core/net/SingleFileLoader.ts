///<reference path="../../_definitions.ts"/>
module away.net
{

	/**
	 * The SingleFileLoader is used to load a single file, as part of a resource.
	 *
	 * While SingleFileLoader can be used directly, e.g. to create a third-party asset
	 * management system, it's recommended to use any of the classes Loader3D, AssetLoader
	 * and AssetLibrary instead in most cases.
	 *
	 * @see AssetLoader
	 * @see away.library.AssetLibrary
	 */
	export class SingleFileLoader extends away.events.EventDispatcher
	{
		private _parser:away.parsers.ParserBase;
		private _assets:away.library.IAsset[];
		private _req:URLRequest;
		private _fileExtension:string;
		private _fileName:string;
		private _loadAsRawData:boolean;
		private _materialMode:number;
		private _data:any;

		private _handleUrlLoaderCompleteDelegate:Function;
		private _handleUrlLoaderErrorDelegate:Function;

		private _onReadyForDependenciesDelegate:Function;
		private _onParseCompleteDelegate:Function;
		private _onParseErrorDelegate:Function;
		private _onTextureSizeErrorDelegate:Function;
		private _onAssetCompleteDelegate:Function;

		// Static

		// Image parser only parser that is added by default, to save file size.
		private static _parsers:any[] = new Array<any>(away.parsers.ImageParser, away.parsers.CubeTextureParser);

		public static enableParser(parser:Object):void
		{
			if (SingleFileLoader._parsers.indexOf(parser) < 0)
				SingleFileLoader._parsers.push(parser);
		}

		public static enableParsers(parsers:Object[]):void
		{
			for (var c:number = 0; c < parsers.length; c++)
				SingleFileLoader.enableParser(parsers[ c ]);
		}

		/**
		 * Creates a new SingleFileLoader object.
		 */
		constructor(materialMode:number = 0)
		{
			super();
			this._materialMode = materialMode;
			this._assets = new Array<away.library.IAsset>();

			this._handleUrlLoaderCompleteDelegate = away.utils.Delegate.create(this, this.handleUrlLoaderComplete);
			this._handleUrlLoaderErrorDelegate = away.utils.Delegate.create(this, this.handleUrlLoaderError);

			this._onReadyForDependenciesDelegate = away.utils.Delegate.create(this, this.onReadyForDependencies);
			this._onParseCompleteDelegate = away.utils.Delegate.create(this, this.onParseComplete);
			this._onParseErrorDelegate = away.utils.Delegate.create(this, this.onParseError);
			this._onTextureSizeErrorDelegate = away.utils.Delegate.create(this, this.onTextureSizeError);
			this._onAssetCompleteDelegate = away.utils.Delegate.create(this, this.onAssetComplete);

		}

		// Get / Set

		public get url():string
		{

			return this._req? this._req.url : '';
		}

		public get data():any
		{
			return this._data;
		}

		public get loadAsRawData():boolean
		{
			return this._loadAsRawData;
		}

		// Public

		/**
		 * Load a resource from a file.
		 *
		 * @param urlRequest The URLRequest object containing the URL of the object to be loaded.
		 * @param parser An optional parser object that will translate the loaded data into a usable resource. If not provided, AssetLoader will attempt to auto-detect the file type.
		 */
		public load(urlRequest:URLRequest, parser:away.parsers.ParserBase = null, loadAsRawData:boolean = false):void
		{
			//var urlLoader   : URLLoader;
			var dataFormat:string;
			var loaderType:string = away.parsers.ParserLoaderType.URL_LOADER;// Default to URLLoader;

			this._loadAsRawData = loadAsRawData;
			this._req = urlRequest;

			this.decomposeFilename(this._req.url);

			if (this._loadAsRawData) {

				// Always use binary and IMGLoader for raw data loading
				dataFormat = URLLoaderDataFormat.BINARY;
				loaderType = away.parsers.ParserLoaderType.IMG_LOADER;
			} else {

				if (parser)
					this._parser = parser;

				if (!this._parser)
					this._parser = this.getParserFromSuffix();

				if (this._parser) {

					//--------------------------------------------
					// Data Format

					switch (this._parser.dataFormat) {

						case away.parsers.ParserDataFormat.BINARY:
							dataFormat = URLLoaderDataFormat.ARRAY_BUFFER;

							//dataFormat = URLLoaderDataFormat.BINARY;

							break;

						case away.parsers.ParserDataFormat.PLAIN_TEXT:
							dataFormat = URLLoaderDataFormat.TEXT;
							break;

					}

					//--------------------------------------------
					// Loader Type

					switch (this._parser.loaderType) {

						case away.parsers.ParserLoaderType.IMG_LOADER:
							loaderType = away.parsers.ParserLoaderType.IMG_LOADER;
							break;

						case away.parsers.ParserLoaderType.URL_LOADER:
							loaderType = away.parsers.ParserLoaderType.URL_LOADER;
							break;
					}

				} else {

					// Always use BINARY for unknown file formats. The thorough
					// file type check will determine format after load, and if
					// binary, a text load will have broken the file data.
					dataFormat = URLLoaderDataFormat.BINARY;

				}
			}

			var loader:ISingleFileTSLoader = this.getLoader(loaderType);
			loader.dataFormat = dataFormat;
			loader.addEventListener(away.events.Event.COMPLETE, this._handleUrlLoaderCompleteDelegate);
			loader.addEventListener(away.events.IOErrorEvent.IO_ERROR, this._handleUrlLoaderErrorDelegate);
			loader.load(urlRequest);

		}

		/**
		 * Loads a resource from already loaded data.
		 * @param data The data to be parsed. Depending on the parser type, this can be a ByteArray, String or XML.
		 * @param uri The identifier (url or id) of the object to be loaded, mainly used for resource management.
		 * @param parser An optional parser object that will translate the data into a usable resource. If not provided, AssetLoader will attempt to auto-detect the file type.
		 */
		public parseData(data:any, parser:away.parsers.ParserBase = null, req:URLRequest = null):void
		{

			if (data.constructor === Function) // TODO: Validate
				data = new data();

			if (parser)
				this._parser = parser;

			this._req = req;
			this.parse(data);

		}

		/**
		 * A reference to the parser that will translate the loaded data into a usable resource.
		 */
		public get parser():away.parsers.ParserBase
		{
			return this._parser;
		}

		/**
		 * A list of dependencies that need to be loaded and resolved for the loaded object.
		 */

		public get dependencies():away.parsers.ResourceDependency[]
		{
			return this._parser? this._parser.dependencies : new Array<away.parsers.ResourceDependency>();
		}

		// Private

		/**
		 *
		 * @param loaderType
		 */
		private getLoader(loaderType:string):ISingleFileTSLoader
		{

			var loader:ISingleFileTSLoader;

			switch (loaderType) {

				case away.parsers.ParserLoaderType.IMG_LOADER :
					loader = new SingleFileImageLoader();
					break;

				case away.parsers.ParserLoaderType.URL_LOADER:
					loader = new SingleFileURLLoader();
					break;

			}

			return loader;

		}

		/**
		 * Splits a url string into base and extension.
		 * @param url The url to be decomposed.
		 */
		private decomposeFilename(url:string):void
		{

			// Get rid of query string if any and extract suffix
			var base:string = (url.indexOf('?') > 0)? url.split('?')[0] : url;
			var i:number = base.lastIndexOf('.');
			this._fileExtension = base.substr(i + 1).toLowerCase();
			this._fileName = base.substr(0, i);

		}

		/**
		 * Guesses the parser to be used based on the file extension.
		 * @return An instance of the guessed parser.
		 */
		private getParserFromSuffix():away.parsers.ParserBase
		{
			var len:number = SingleFileLoader._parsers.length;

			//console.log( SingleFileLoader._parsers );

			// go in reverse order to allow application override of default parser added in away.proper
			for (var i:number = len - 1; i >= 0; i--) {

				var currentParser:away.parsers.ParserBase = SingleFileLoader._parsers[i];
				var supportstype:boolean = SingleFileLoader._parsers[i].supportsType(this._fileExtension);

				if (SingleFileLoader._parsers[i]['supportsType'](this._fileExtension)) {

					return new SingleFileLoader._parsers[i]();


				}

			}

			return null;

		}

		/**
		 * Guesses the parser to be used based on the file contents.
		 * @param data The data to be parsed.
		 * @param uri The url or id of the object to be parsed.
		 * @return An instance of the guessed parser.
		 */
		private getParserFromData(data:any):away.parsers.ParserBase
		{
			var len:number = SingleFileLoader._parsers.length;

			// go in reverse order to allow application override of default parser added in away.proper
			for (var i:number = len - 1; i >= 0; i--)
				if (SingleFileLoader._parsers[i].supportsData(data))
					return new SingleFileLoader._parsers[i]();

			return null;
		}

		/**
		 * Cleanups
		 */
		private removeListeners(urlLoader:ISingleFileTSLoader):void
		{
			urlLoader.removeEventListener(away.events.Event.COMPLETE, this._handleUrlLoaderCompleteDelegate);
			urlLoader.removeEventListener(away.events.IOErrorEvent.IO_ERROR, this._handleUrlLoaderErrorDelegate);
		}

		// Events

		/**
		 * Called when loading of a file has failed
		 */
		private handleUrlLoaderError(event:away.events.IOErrorEvent):void
		{
			var urlLoader:ISingleFileTSLoader = <ISingleFileTSLoader> event.target;
			this.removeListeners(urlLoader);

			//if(this.hasEventListener(away.events.LoaderEvent.LOAD_ERROR , this.handleUrlLoaderError , this ))
			this.dispatchEvent(new away.events.LoaderEvent(away.events.LoaderEvent.LOAD_ERROR, this.url, this._assets));//, event.text));
		}

		/**
		 * Called when loading of a file is complete
		 */
		private handleUrlLoaderComplete(event:away.events.Event):void
		{

			var urlLoader:ISingleFileTSLoader = <ISingleFileTSLoader> event.target;
			this.removeListeners(urlLoader);

			this._data = urlLoader.data;

			if (this._loadAsRawData) {
				// No need to parse this data, which should be returned as is
				this.dispatchEvent(new away.events.LoaderEvent(away.events.LoaderEvent.DEPENDENCY_COMPLETE, this.url, this._assets));
			} else {
				this.parse(this._data);
			}
		}

		/**
		 * Initiates parsing of the loaded data.
		 * @param data The data to be parsed.
		 */
		private parse(data:any):void
		{

			// If no parser has been defined, try to find one by letting
			// all plugged in parsers inspect the actual data.
			if (!this._parser) {

				this._parser = this.getParserFromData(data);

			}

			if (this._parser) {

				this._parser.addEventListener(away.events.ParserEvent.READY_FOR_DEPENDENCIES, this._onReadyForDependenciesDelegate);
				this._parser.addEventListener(away.events.ParserEvent.PARSE_COMPLETE, this._onParseCompleteDelegate);
				this._parser.addEventListener(away.events.ParserEvent.PARSE_ERROR, this._onParseErrorDelegate);
				this._parser.addEventListener(away.events.AssetEvent.TEXTURE_SIZE_ERROR, this._onTextureSizeErrorDelegate);
				this._parser.addEventListener(away.events.AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);

				if (this._req && this._req.url) {
					this._parser._iFileName = this._req.url;
				}

				this._parser.materialMode = this._materialMode;
				this._parser.parseAsync(data);

			} else {

				var msg:string = "No parser defined. To enable all parsers for auto-detection, use Parsers.enableAllBundled()";

				//if(hasEventListener(LoaderEvent.LOAD_ERROR)){
				this.dispatchEvent(new away.events.LoaderEvent(away.events.LoaderEvent.LOAD_ERROR, this.url, this._assets, true, msg));
				//} else{
				//	throw new Error(msg);
				//}
			}
		}

		private onParseError(event:away.events.ParserEvent):void
		{
			this.dispatchEvent(event.clone());
		}

		private onReadyForDependencies(event:away.events.ParserEvent):void
		{
			this.dispatchEvent(event.clone());
		}

		private onAssetComplete(event:away.events.AssetEvent):void
		{
			// Event is dispatched twice per asset (once as generic ASSET_COMPLETE,
			// and once as type-specific, e.g. MESH_COMPLETE.) Do this only once.
			if (event.type == away.events.AssetEvent.ASSET_COMPLETE)
				this._assets.push(event.asset);

			this.dispatchEvent(event.clone());
		}

		private onTextureSizeError(event:away.events.AssetEvent):void
		{
			this.dispatchEvent(event.clone());
		}

		/**
		 * Called when parsing is complete.
		 */
		private onParseComplete(event:away.events.ParserEvent):void
		{

			this.dispatchEvent(new away.events.LoaderEvent(away.events.LoaderEvent.DEPENDENCY_COMPLETE, this.url, this._assets));//dispatch in front of removing listeners to allow any remaining asset events to propagate

			this._parser.removeEventListener(away.events.ParserEvent.READY_FOR_DEPENDENCIES, this._onReadyForDependenciesDelegate);
			this._parser.removeEventListener(away.events.ParserEvent.PARSE_COMPLETE, this._onParseCompleteDelegate);
			this._parser.removeEventListener(away.events.ParserEvent.PARSE_ERROR, this._onParseErrorDelegate);
			this._parser.removeEventListener(away.events.AssetEvent.TEXTURE_SIZE_ERROR, this._onTextureSizeErrorDelegate);
			this._parser.removeEventListener(away.events.AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);

		}

	}

}
