import { AssetEvent } from '../events/AssetEvent';
import { EventDispatcher } from '../events/EventDispatcher';
import { URLLoaderEvent } from '../events/URLLoaderEvent';
import { LoaderEvent } from '../events/LoaderEvent';
import { ParserEvent } from '../events/ParserEvent';

import { URLLoader } from '../net/URLLoader';
import { URLLoaderDataFormat } from '../net/URLLoaderDataFormat';
import { URLRequest } from '../net/URLRequest';

import { ParserBase } from '../parsers/ParserBase';
import { ResourceDependency } from '../parsers/ResourceDependency';

import { LoaderContext } from './LoaderContext';

/**
 * Dispatched when any asset finishes parsing. Also see specific events for each
 * individual asset type (meshes, materials et c.)
 *
 * @eventType away.events.AssetEvent
 */
//[Event(name="assetComplete", type="away3d.events.AssetEvent")]

/**
 * Dispatched when a full resource (including dependencies) finishes loading.
 *
 * @eventType away.events.LoaderEvent
 */
//[Event(name="resourceComplete", type="away3d.events.LoaderEvent")]

/**
 * Dispatched when a single dependency (which may be the main file of a
 * resource) finishes loading.
 *
 * @eventType away.events.LoaderEvent
 */
//[Event(name="dependencyComplete", type="away3d.events.LoaderEvent")]

/**
 * Dispatched when an error occurs during loading. I
 *
 * @eventType away.events.LoaderEvent
 */
//[Event(name="loadError", type="away3d.events.LoaderEvent")]

/**
 * Dispatched when an error occurs during parsing.
 *
 * @eventType away.events.ParserEvent
 */
//[Event(name="parseError", type="away3d.events.ParserEvent")]

/**
 * Dispatched when an image asset dimensions are not a power of 2
 *
 * @eventType away.events.AssetEvent
 */
//[Event(name="textureSizeError", type="away3d.events.AssetEvent")]

/**
 * Loader can load any file format that away.supports (or for which a
 * third-party parser has been plugged in) and it's dependencies. Events are
 * dispatched when assets are encountered and for when the resource (or it's
 * dependencies) have been loaded.
 *
 * The Loader will not make assets available in any other way than through the
 * dispatched events. To store assets and make them available at any point from
 * any module in an application, use the AssetLibrary to load and manage assets.
 *
 * @see away.library.AssetLibrary
 */
export class Loader extends EventDispatcher {
	private _context: LoaderContext;
	private _uri: string;
	private _materialMode: number;

	private _stack: Array<ResourceDependency>;
	private _baseDependency: ResourceDependency;
	private _currentDependency: ResourceDependency;
	private _namespace: string;

	private _onReadyForDependenciesDelegate: (event: ParserEvent) => void;
	private _onParseCompleteDelegate: (event: ParserEvent) => void;
	private _onParseErrorDelegate: (event: ParserEvent) => void;
	private _onLoadProgressDelegate: (event: URLLoaderEvent) => void;
	private _onLoadCompleteDelegate: (event: URLLoaderEvent) => void;
	private _onLoadErrorDelegate: (event: URLLoaderEvent) => void;
	private _onTextureSizeErrorDelegate: (event: AssetEvent) => void;
	private _onAssetCompleteDelegate: (event: AssetEvent) => void;

	// Image parser only parser that is added by default, to save file size.
	private static _parsers: Array<any> = new Array<any>();

	/**
	 * Enables a specific parser. When no specific parser is set for a
	 * loading/parsing opperation, loader3d can autoselect the correct parser to
	 * use. A parser must have been enabled, to be considered when autoselecting
	 * the parser.
	 *
	 * @param parser The parser export class to enable.
	 *
	 * @see away.parsers.Parsers
	 */
	public static enableParser(parser): void {
		if (Loader._parsers.indexOf(parser) < 0)
			Loader._parsers.push(parser);
	}

	/**
	 * Enables a list of parsers. When no specific parser is set for a
	 * loading/parsing opperation, Loader can autoselect the correct parser to
	 * use. A parser must have been enabled, to be considered when autoselecting
	 * the parser.
	 *
	 * @param parsers An Array of parser classes to enable.
	 * @see away.parsers.Parsers
	 */
	public static enableParsers(parsers: Array<Object>): void {
		for (let c: number = 0; c < parsers.length; c++)
			Loader.enableParser(parsers[ c ]);
	}

	/**
	 * Returns the base dependency of the loader
	 */
	public get baseDependency(): ResourceDependency {
		return this._baseDependency;
	}

	/**
	 * Create a new Loader object.
	 */
	constructor(materialMode: number = 0) {
		super();

		this._materialMode = materialMode;

		this._stack = new Array<ResourceDependency>();

		this._onReadyForDependenciesDelegate = (event: ParserEvent) => this._onReadyForDependencies(event);
		this._onParseCompleteDelegate = (event: ParserEvent) => this._onParseComplete(event);
		this._onParseErrorDelegate = (event: ParserEvent) => this._onParseError(event);
		this._onLoadProgressDelegate = (event: URLLoaderEvent) => this._onLoadProgress(event);
		this._onLoadCompleteDelegate = (event: URLLoaderEvent) => this._onLoadComplete(event);
		this._onLoadErrorDelegate = (event: URLLoaderEvent) => this._onLoadError(event);
		this._onTextureSizeErrorDelegate = (event: AssetEvent) => this._onTextureSizeError(event);
		this._onAssetCompleteDelegate = (event: AssetEvent) => this._onAssetComplete(event);
	}

	/**
	 * Loads a file and (optionally) all of its dependencies.
	 *
	 * @param req The URLRequest object containing the URL of the file to be
	 * loaded.
	 * @param context An optional context object providing additional parameters
	 * for loading
	 * @param ns An optional namespace string under which the file is to be
	 * loaded, allowing the differentiation of two resources with identical
	 * assets
	 * @param parser An optional parser object for translating the loaded data
	 * into a usable resource. If not provided, Loader will attempt to
	 * auto-detect the file type.
	 */
	public load(req: URLRequest, context: LoaderContext = null, ns: string = null, parser: ParserBase = null): void {
		this._uri = req.url = req.url.replace(/\\/g, '/');
		this._context = context;
		this._namespace = ns;

		this.dispatchEvent(new LoaderEvent(LoaderEvent.LOADER_START, this._uri, null, null));

		this._baseDependency = new ResourceDependency('', req, null, parser, null);
		this._retrieveDependency(this._baseDependency);
	}

	/**
	 * Loads a resource from already loaded data.
	 *
	 * @param data The data object containing all resource information.
	 * @param context An optional context object providing additional parameters
	 * for loading
	 * @param ns An optional namespace string under which the file is to be
	 * loaded, allowing the differentiation of two resources with identical
	 * assets
	 * @param parser An optional parser object for translating the loaded data
	 * into a usable resource. If not provided, Loader will attempt to
	 * auto-detect the file type.
	 */
	public loadData(data: any,
		id: string,
		context: LoaderContext = null,
		ns: string = null,
		parser: ParserBase = null): void {
		this._uri = ns;
		this._context = context;
		this._namespace = ns;

		this.dispatchEvent(new LoaderEvent(LoaderEvent.LOADER_START, this._uri, null, null));

		this._baseDependency = new ResourceDependency(id, null, data, parser, null);
		this._retrieveDependency(this._baseDependency);
	}

	/**
	 * Recursively retrieves the next to-be-loaded and parsed dependency on the
	 * stack, or pops the list off the stack when complete and continues on the
	 * top set.
	 * @param parser The parser that will translate the data into a usable
	 * resource.
	 */
	private _retrieveNext(parser: ParserBase = null): void {
		if (this._currentDependency.dependencies.length) {

			const next: ResourceDependency = this._currentDependency.dependencies.pop();

			this._stack.push(this._currentDependency);
			this._retrieveDependency(next);

		} else if (this._currentDependency.parser && this._currentDependency.parser.parsingPaused) {

			this._currentDependency.parser.resumeParsing();

		} else if (this._stack && this._stack.length) {

			const prev: ResourceDependency = this._currentDependency;

			this._currentDependency = this._stack.pop();

			if (prev.success)
				prev.resolve();

			this._retrieveNext(parser);

		} else {
			this.dispatchEvent(new LoaderEvent(LoaderEvent.LOADER_COMPLETE,
				this._uri,
				this._baseDependency.parser.content,
				this._baseDependency.assets));
		}
	}

	/**
	 * Retrieves a single dependency.
	 * @param parser The parser that will translate the data into a usable
	 * resource.
	 */
	private _retrieveDependency(dependency: ResourceDependency): void {
		let data: any;

		if (this._context && this._context.materialMode != 0)
			this._materialMode = this._context.materialMode;

		this._currentDependency = dependency;

		// Get already loaded (or mapped) data if available
		data = dependency.data;

		if (this._context && dependency.request) {
			if (this._context._iHasDataForUrl(dependency.request.url)) {
				data = this._context._iGetDataForUrl(dependency.request.url);
			} else if (this._context.externalAssetMode == LoaderContext.ON_DEMAND
					&& (this.getSuffix(dependency.request.url) == 'jpg'
					|| this.getSuffix(dependency.request.url) == 'png')) {
				data = dependency.request;
				if (!dependency.parser)
					dependency.setParser(this.getParserFromSuffix(dependency.request.url));
			}
		}

		if (data) {
			if (data.constructor === Function)
				data = new data();

			dependency.setData(data);

			if (dependency.retrieveAsRawData) {
				// No need to parse. The parent parser is expecting this to be
				// raw data so it can be passed directly.
				dependency.resolve();

				// Move on to next dependency
				this._retrieveNext();

			} else {
				this._parseDependency(dependency);
			}

		} else {
			//setup the loader on the dependency
			dependency.loader = new URLLoader();

			this._addEventListeners(dependency.loader);

			// Resolve URL and start loading
			dependency.request.url = this.resolveDependencyUrl(dependency);

			if (dependency.retrieveAsRawData) {
				// Always use binary for raw data loading
				dependency.loader.dataFormat = URLLoaderDataFormat.BINARY;
			} else {

				if (!dependency.parser)
					dependency.setParser(this.getParserFromSuffix(dependency.request.url));

				if (dependency.parser) {
					dependency.loader.dataFormat = dependency.parser.dataFormat;
				} else {
					// Always use BINARY for unknown file formats. The thorough
					// file type check will determine format after load, and if
					// binary, a text load will have broken the file data.
					dependency.loader.dataFormat = URLLoaderDataFormat.BINARY;
				}
			}

			dependency.loader.load(dependency.request);
		}
	}

	private _joinUrl(base: string, end: string): string {
		if (end.charAt(0) == '/' || end.charAt(0) == '\\')
			end = end.substr(1);

		if (end.charAt(0) == '.')
			end = end.substr(2);

		if (base.length == 0)
			return end;

		if (base.charAt(base.length - 1) == '/' || base.charAt(base.length - 1) == '\\')
			base = base.substr(0, base.length - 1);

		return base.concat('/', end);

	}

	private resolveDependencyUrl(dependency: ResourceDependency): string {
		const url: string = dependency.request.url;

		// Has the user re-mapped this URL?
		if (this._context && this._context._iHasMappingForUrl(url))
			return this._context._iGetRemappedUrl(url);

		// This is the "base" dependency, i.e. the actual requested asset. We
		// will not try to resolve this since the user can probably be trusted
		// to know this URL better than our automatic resolver. :)
		if (url == this._uri)
			return url;

		// Absolute URL? Check if starts with slash or a URL scheme definition
		// (e.g. ftp://, http://, file://)
		const scheme_re = new RegExp('/^[a-zA-Z]{3,4}:///');

		if (url.charAt(0) == '/') {
			if (this._context && this._context.overrideAbsolutePaths)
				return this._joinUrl(this._context.dependencyBaseUrl, url);
			else
				return url;
		} else if (scheme_re.test(url)) {
			// If overriding full URLs, get rid of scheme (e.g. "http://") and
			// replace with the dependencyBaseUrl defined by user.
			if (this._context && this._context.overrideFullURLs) {

				const noscheme_url: string  = url.replace(scheme_re , '');//url['replace'](scheme_re);
				return this._joinUrl(this._context.dependencyBaseUrl, <string> noscheme_url);
			}
		}

		let base: string;

		// Since not absolute, just get rid of base file name to find it's
		// folder and then concatenate dynamic URL
		if (this._context && this._context.dependencyBaseUrl) {
			base = this._context.dependencyBaseUrl;
			return this._joinUrl(base, url);
		} else {
			base = this._uri.substring(0, this._uri.lastIndexOf('/') + 1);
			return this._joinUrl(base, url);
		}
	}

	private _retrieveParserDependencies(): void {
		if (!this._currentDependency)
			return;

		const parserDependancies = this._currentDependency.parser.dependencies;
		const len: number = parserDependancies.length;

		for (let i: number = 0; i < len; i++)
			this._currentDependency.dependencies[i] = parserDependancies[i];

		// Since more dependencies might be added eventually, empty this list so
		// that the same dependency isn't retrieved more than once.
		parserDependancies.length = 0;

		this._retrieveNext();
	}

	private _resolveParserDependencies(): void {
		this._currentDependency.success = true;

		// Retrieve any last dependencies remaining on this parser, or if none
		// exists, just move on.
		if (this._currentDependency.parser
			&& this._currentDependency.parser.dependencies.length
			&& (!this._context || this._context.includeDependencies))//context may be null
			this._retrieveParserDependencies();
		else
			this._retrieveNext();
	}

	/**
	 * Called when a single dependency loading failed, and pushes further
	 * dependencies onto the stack.
	 * @param event
	 */
	private _onLoadError(event: URLLoaderEvent): void {
		if (this.hasEventListener(URLLoaderEvent.LOAD_ERROR)) {
			//pass on the error event for processing
			this.dispatchEvent(event);

			if (this._currentDependency != this._baseDependency) {
				//execute any placeholder measure for failed loads
				this._currentDependency.resolveFailure();
				//goto the next dependency
				this._retrieveNext();

			} else {
				// Either this was the base file (last left in the stack) or
				// default behavior was prevented by the handlers, and hence
				// there is nothing more to do than clean up and bail.
				this.dispose();
				return;
			}
		} else {

			// Error event was not handled by listeners directly on Loader or on
			// any of the subscribed loaders (in the list of error handlers.)
			throw new Error();
		}
	}

	/**
	 * Called when a dependency parsing failed, and dispatches a
	 * <code>ParserEvent.PARSE_ERROR</code>
	 * @param event
	 */
	private _onParseError(event: ParserEvent): void {
		if (this.hasEventListener(ParserEvent.PARSE_ERROR)) {
			//pass on the error event for processing
			this.dispatchEvent(event);
			//goto the next dependency
			this._retrieveNext();
		} else {
			// Error event was not handled by listeners directly on Loader or on
			// any of the subscribed loaders (in the list of error handlers.)
			throw new Error(event.message);
		}
	}

	private _onAssetComplete(event: AssetEvent): void {
		// Add loaded asset to list of assets retrieved as part of the current
		// dependency. This list will be inspected by the parent parser when
		// dependency is resolved
		if (this._currentDependency)
			this._currentDependency.assets.push(event.asset);

		event.asset.resetAssetPath(event.asset.name, this._namespace);

		if (!this._currentDependency.suppresAssetEvents)
			this.dispatchEvent(event);
	}

	private _onReadyForDependencies(event: ParserEvent): void {
		if (this._context && !this._context.includeDependencies)
			(<ParserBase> event.target).resumeParsing();
		else
			this._retrieveParserDependencies();
	}

	private _onLoadProgress(event: URLLoaderEvent): void {
		this.dispatchEvent(event);
	}

	/**
	 * Called when a single dependency was loaded, and pushes further
	 * dependencies onto the stack.
	 * @param event
	 */
	private _onLoadComplete(event: URLLoaderEvent): void {
		const loader: URLLoader = event.urlLoader;

		this.dispatchEvent(event);

		this._removeEventListeners(loader);

		// Resolve this dependency
		this._currentDependency.setData(loader.data);

		if (this._currentDependency.retrieveAsRawData) {
			// No need to parse this data, which should be returned as is
			this._resolveParserDependencies();
		} else {
			this._parseDependency(this._currentDependency);
		}
	}

	/**
	 * Called when parsing is complete.
	 */
	private _onParseComplete(event: ParserEvent): void {
		const parser: ParserBase = <ParserBase> event.target;

		parser.removeEventListener(ParserEvent.READY_FOR_DEPENDENCIES, this._onReadyForDependenciesDelegate);
		parser.removeEventListener(ParserEvent.PARSE_COMPLETE, this._onParseCompleteDelegate);
		parser.removeEventListener(ParserEvent.PARSE_ERROR, this._onParseErrorDelegate);
		parser.removeEventListener(AssetEvent.TEXTURE_SIZE_ERROR, this._onTextureSizeErrorDelegate);
		parser.removeEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);

		this._resolveParserDependencies();
	}

	/**
	 * Called when an image is too large or it's dimensions are not a power of 2
	 * @param event
	 */
	private _onTextureSizeError(event: AssetEvent): void {
		event.asset.name = this._currentDependency.resolveName(event.asset);

		this.dispatchEvent(event);
	}

	private _addEventListeners(loader: URLLoader): void {
		loader.addEventListener(URLLoaderEvent.LOAD_PROGRESS, this._onLoadProgressDelegate);
		loader.addEventListener(URLLoaderEvent.LOAD_COMPLETE, this._onLoadCompleteDelegate);
		loader.addEventListener(URLLoaderEvent.LOAD_ERROR, this._onLoadErrorDelegate);
	}

	private _removeEventListeners(loader: URLLoader): void {
		loader.removeEventListener(URLLoaderEvent.LOAD_PROGRESS, this._onLoadProgressDelegate);
		loader.removeEventListener(URLLoaderEvent.LOAD_COMPLETE, this._onLoadCompleteDelegate);
		loader.removeEventListener(URLLoaderEvent.LOAD_ERROR, this._onLoadErrorDelegate);
	}

	public stop(): void {
		this.dispose();
	}

	private dispose(): void {
		this._context = null;
		this._stack = null;

		if (this._currentDependency && this._currentDependency.loader)
			this._removeEventListeners(this._currentDependency.loader);

		this._currentDependency = null;
	}

	/**
	 * Guesses the parser to be used based on the file contents.
	 * @param data The data to be parsed.
	 * @param uri The url or id of the object to be parsed.
	 * @return An instance of the guessed parser.
	 */
	private _getParserFromData(data: any): ParserBase {
		const len: number = Loader._parsers.length;

		// go in reverse order to allow application override of default parser
		// added in away.proper
		for (let i: number = len - 1; i >= 0; i--)
			if (Loader._parsers[i].supportsData(data))
				return new Loader._parsers[i]();

		return null;
	}

	/**
	 * Initiates parsing of the loaded dependency.
	 *
	 * @param The dependency to be parsed.
	 */
	private _parseDependency(dependency: ResourceDependency): void {
		let parser: ParserBase = dependency.parser;

		// If no parser has been defined, try to find one by letting all plugged
		// in parsers inspect the actual data.
		if (!parser)
			dependency.setParser(parser = this._getParserFromData(dependency.data));

		if (parser) {
			parser.addEventListener(ParserEvent.READY_FOR_DEPENDENCIES, this._onReadyForDependenciesDelegate);
			parser.addEventListener(ParserEvent.PARSE_COMPLETE, this._onParseCompleteDelegate);
			parser.addEventListener(ParserEvent.PARSE_ERROR, this._onParseErrorDelegate);
			parser.addEventListener(AssetEvent.TEXTURE_SIZE_ERROR, this._onTextureSizeErrorDelegate);
			parser.addEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);

			if (dependency.request && dependency.request.url)
				parser.fileName = dependency.request.url;

			parser.materialMode = this._materialMode;

			parser.parseAsync(dependency.data);

		} else {
			const message: string =
				'No parser defined. To enable all parsers for auto-detection, use Parsers.enableAllBundled()';

			if (this.hasEventListener(ParserEvent.PARSE_ERROR)) {
				//pass on the error event for processing
				this.dispatchEvent(new ParserEvent(ParserEvent.PARSE_ERROR, message));
				//goto the next dependency
				this._retrieveNext();
			} else {
				// Error event was not handled by listeners directly on Loader
				// or on any of the subscribed loaders (in the list of error
				// handlers.)
				throw new Error(message);
			}
		}
	}

	/**
	 * Guesses the parser to be used based on the file extension.
	 * @return An instance of the guessed parser.
	 */
	private getParserFromSuffix(url: string): ParserBase {
		const fileExtension: string = this.getSuffix(url);

		const len: number = Loader._parsers.length;

		// go in reverse order to allow application override of default parser
		// added in away.proper
		for (let i: number = len - 1; i >= 0; i--) {
			const parserClass: any = Loader._parsers[i];
			if (parserClass.supportsType(fileExtension))
				return new parserClass();
		}

		return null;
	}

	private getSuffix(url: string): string {
		// Get rid of query string if any and extract extension
		const base: string = (url.indexOf('?') > 0) ? url.split('?')[0] : url;
		return base.substr(base.lastIndexOf('.') + 1).toLowerCase();
	}
}