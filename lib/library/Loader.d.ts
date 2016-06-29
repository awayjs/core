import { LoaderContext } from "../library/LoaderContext";
import { LoaderInfo } from "../library/LoaderInfo";
import { URLRequest } from "../net/URLRequest";
import { EventDispatcher } from "../events/EventDispatcher";
import { ParserBase } from "../parsers/ParserBase";
import { ResourceDependency } from "../parsers/ResourceDependency";
/**
 * Dispatched when any asset finishes parsing. Also see specific events for each
 * individual asset type (meshes, materials et c.)
 *
 * @eventType away.events.AssetEvent
 */
/**
 * Dispatched when a full resource (including dependencies) finishes loading.
 *
 * @eventType away.events.LoaderEvent
 */
/**
 * Dispatched when a single dependency (which may be the main file of a resource)
 * finishes loading.
 *
 * @eventType away.events.LoaderEvent
 */
/**
 * Dispatched when an error occurs during loading. I
 *
 * @eventType away.events.LoaderEvent
 */
/**
 * Dispatched when an error occurs during parsing.
 *
 * @eventType away.events.ParserEvent
 */
/**
 * Dispatched when an image asset dimensions are not a power of 2
 *
 * @eventType away.events.AssetEvent
 */
/**
 * Loader can load any file format that away.supports (or for which a third-party parser
 * has been plugged in) and it's dependencies. Events are dispatched when assets are encountered
 * and for when the resource (or it's dependencies) have been loaded.
 *
 * The Loader will not make assets available in any other way than through the dispatched
 * events. To store assets and make them available at any point from any module in an application,
 * use the AssetLibrary to load and manage assets.
 *
 * @see away.library.AssetLibrary
 */
export declare class Loader extends EventDispatcher {
    private _context;
    private _loaderInfo;
    private _uri;
    private _materialMode;
    private _errorHandlers;
    private _parseErrorHandlers;
    private _stack;
    private _baseDependency;
    private _currentDependency;
    private _namespace;
    private _onReadyForDependenciesDelegate;
    private _onParseCompleteDelegate;
    private _onParseErrorDelegate;
    private _onLoadCompleteDelegate;
    private _onLoadErrorDelegate;
    private _onTextureSizeErrorDelegate;
    private _onAssetCompleteDelegate;
    private static _parsers;
    /**
     * Enables a specific parser.
     * When no specific parser is set for a loading/parsing opperation,
     * loader3d can autoselect the correct parser to use.
     * A parser must have been enabled, to be considered when autoselecting the parser.
     *
     * @param parser The parser export class to enable.
     *
     * @see away.parsers.Parsers
     */
    static enableParser(parser: any): void;
    /**
     * Enables a list of parsers.
     * When no specific parser is set for a loading/parsing opperation,
     * Loader can autoselect the correct parser to use.
     * A parser must have been enabled, to be considered when autoselecting the parser.
     *
     * @param parsers A Vector of parser classes to enable.
     * @see away.parsers.Parsers
     */
    static enableParsers(parsers: Array<Object>): void;
    /**
     * Returns the base dependency of the loader
     */
    readonly baseDependency: ResourceDependency;
    /**
     * Returns a LoaderInfo object corresponding to the object being loaded.
     * LoaderInfo objects are shared between the Loader object and the loaded
     * content object. The LoaderInfo object supplies loading progress
     * information and statistics about the loaded file.
     *
     * <p>Events related to the load are dispatched by the LoaderInfo object
     * referenced by the <code>contentLoaderInfo</code> property of the Loader
     * object. The <code>contentLoaderInfo</code> property is set to a valid
     * LoaderInfo object, even before the content is loaded, so that you can add
     * event listeners to the object prior to the load.</p>
     *
     * <p>To detect uncaught errors that happen in a loaded SWF, use the
     * <code>Loader.uncaughtErrorEvents</code> property, not the
     * <code>Loader.contentLoaderInfo.uncaughtErrorEvents</code> property.</p>
     */
    readonly loaderInfo: LoaderInfo;
    /**
     * Create a new ResourceLoadSession object.
     */
    constructor(materialMode?: number);
    /**
     * Loads a file and (optionally) all of its dependencies.
     *
     * @param req The URLRequest object containing the URL of the file to be loaded.
     * @param context An optional context object providing additional parameters for loading
     * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
     * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, Loader will attempt to auto-detect the file type.
     */
    load(req: URLRequest, context?: LoaderContext, ns?: string, parser?: ParserBase): void;
    /**
     * Loads a resource from already loaded data.
     *
     * @param data The data object containing all resource information.
     * @param context An optional context object providing additional parameters for loading
     * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
     * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, Loader will attempt to auto-detect the file type.
     */
    loadData(data: any, id: string, context?: LoaderContext, ns?: string, parser?: ParserBase): void;
    /**
     * Recursively retrieves the next to-be-loaded and parsed dependency on the stack, or pops the list off the
     * stack when complete and continues on the top set.
     * @param parser The parser that will translate the data into a usable resource.
     */
    private retrieveNext(parser?);
    /**
     * Retrieves a single dependency.
     * @param parser The parser that will translate the data into a usable resource.
     */
    private retrieveDependency(dependency);
    private joinUrl(base, end);
    private resolveDependencyUrl(dependency);
    private retrieveParserDependencies();
    private resolveParserDependencies();
    /**
     * Called when a single dependency loading failed, and pushes further dependencies onto the stack.
     * @param event
     */
    private onLoadError(event);
    /**
     * Called when a dependency parsing failed, and dispatches a <code>ParserEvent.PARSE_ERROR</code>
     * @param event
     */
    private onParseError(event);
    private onAssetComplete(event);
    private onReadyForDependencies(event);
    /**
     * Called when a single dependency was parsed, and pushes further dependencies onto the stack.
     * @param event
     */
    private onLoadComplete(event);
    /**
     * Called when parsing is complete.
     */
    private onParseComplete(event);
    /**
     * Called when an image is too large or it's dimensions are not a power of 2
     * @param event
     */
    private onTextureSizeError(event);
    private addEventListeners(loader);
    private removeEventListeners(loader);
    stop(): void;
    private dispose();
    /**
     * @private
     * This method is used by other loader classes (e.g. Loader3D and AssetLibraryBundle) to
     * add error event listeners to the Loader instance. This system is used instead of
     * the regular EventDispatcher system so that the AssetLibrary error handler can be sure
     * that if hasEventListener() returns true, it's client code that's listening for the
     * event. Secondly, functions added as error handler through this custom method are
     * expected to return a boolean value indicating whether the event was handled (i.e.
     * whether they in turn had any client code listening for the event.) If no handlers
     * return true, the Loader knows that the event wasn't handled and will throw an RTE.
     */
    _iAddParseErrorHandler(handler: any): void;
    _iAddErrorHandler(handler: any): void;
    /**
     * Guesses the parser to be used based on the file contents.
     * @param data The data to be parsed.
     * @param uri The url or id of the object to be parsed.
     * @return An instance of the guessed parser.
     */
    private getParserFromData(data);
    /**
     * Initiates parsing of the loaded dependency.
     *
     * @param The dependency to be parsed.
     */
    private parseDependency(dependency);
    /**
     * Guesses the parser to be used based on the file extension.
     * @return An instance of the guessed parser.
     */
    private getParserFromSuffix(url);
}
