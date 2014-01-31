///<reference path="../_definitions.ts"/>

module away.parsers
{
	//import away.arcane;
	//import away.library.assets.IAsset;
	//import away.loaders.parsers.ParserBase;

	//import flash.net.URLRequest;

	//use namespace arcane;

	/**
	 * ResourceDependency represents the data required to load, parse and resolve additional files ("dependencies")
	 * required by a parser, used by ResourceLoadSession.
	 *
	 */
	export class ResourceDependency
	{
		private _id:string;
		private _request:away.net.URLRequest;
		private _assets:Array<away.library.IAsset>;
		private _parser:away.parsers.ParserBase;
		private _parentParser:away.parsers.ParserBase;
		private _data:any;
		private _retrieveAsRawData:boolean;
		private _suppressAssetEvents:boolean;
		private _dependencies:ResourceDependency[];

		public _iLoader:away.net.URLLoader;
		public _iSuccess:boolean;


		constructor(id:string, request:away.net.URLRequest, data:any, parser:away.parsers.ParserBase, parentParser:away.parsers.ParserBase, retrieveAsRawData:boolean = false, suppressAssetEvents:boolean = false)
		{
			this._id = id;
			this._request = request;
			this._data = data;
			this._parser = parser;
			this._parentParser = parentParser;
			this._retrieveAsRawData = retrieveAsRawData;
			this._suppressAssetEvents = suppressAssetEvents;

			this._assets = new Array<away.library.IAsset>();
			this._dependencies = new Array<ResourceDependency>();
		}

		/**
		 *
		 */
		public get id():string
		{
			return this._id;
		}

		/**
		 *
		 */
		public get request():away.net.URLRequest
		{
			return this._request;
		}

		/**
		 * The data containing the dependency to be parsed, if the resource was already loaded.
		 */
		public get data():any
		{
			return this._data;
		}

		/**
		 *
		 */
		public get parser():away.parsers.ParserBase
		{
			return this._parser;
		}

		/**
		 * The parser which is dependent on this ResourceDependency object.
		 */
		public get parentParser():away.parsers.ParserBase
		{
			return this._parentParser;
		}

		/**
		 *
		 */
		public get retrieveAsRawData():boolean
		{
			return this._retrieveAsRawData;
		}

		/**
		 *
		 */
		public get suppresAssetEvents():boolean
		{
			return this._suppressAssetEvents;
		}

		/**
		 *
		 */
		public get assets():Array<away.library.IAsset>
		{
			return this._assets;
		}

		/**
		 *
		 */
		public get dependencies():Array<ResourceDependency>
		{
			return this._dependencies;
		}

		/**
		 * @private
		 * Method to set data after having already created the dependency object, e.g. after load.
		 */
		public _iSetData(data:any):void
		{
			this._data = data;
		}

		/**
		 * @private
		 *
		 */
		public _iSetParser(parser:away.parsers.ParserBase):void
		{
			this._parser = parser;
		}

		/**
		 * Resolve the dependency when it's loaded with the parent parser. For example, a dependency containing an
		 * ImageResource would be assigned to a Mesh instance as a BitmapMaterial, a scene graph object would be added
		 * to its intended parent. The dependency should be a member of the dependencies property.
		 */
		public resolve():void
		{
			if (this._parentParser)
				this._parentParser._iResolveDependency(this);
		}

		/**
		 * Resolve a dependency failure. For example, map loading failure from a 3d file
		 */
		public resolveFailure():void
		{
			if (this._parentParser)
				this._parentParser._iResolveDependencyFailure(this);
		}

		/**
		 * Resolve the dependencies name
		 */
		public resolveName(asset:away.library.IAsset):string
		{
			if (this._parentParser)
				return this._parentParser._iResolveDependencyName(this, asset);

			return asset.name;
		}

	}
}
