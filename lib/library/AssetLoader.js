var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetLoaderToken = require("awayjs-core/lib/library/AssetLoaderToken");
var URLLoader = require("awayjs-core/lib/net/URLLoader");
var URLLoaderDataFormat = require("awayjs-core/lib/net/URLLoaderDataFormat");
var Error = require("awayjs-core/lib/errors/Error");
var AssetEvent = require("awayjs-core/lib/events/AssetEvent");
var Event = require("awayjs-core/lib/events/Event");
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var IOErrorEvent = require("awayjs-core/lib/events/IOErrorEvent");
var LoaderEvent = require("awayjs-core/lib/events/LoaderEvent");
var ParserEvent = require("awayjs-core/lib/events/ParserEvent");
var CubeTextureParser = require("awayjs-core/lib/parsers/CubeTextureParser");
var ResourceDependency = require("awayjs-core/lib/parsers/ResourceDependency");
var Texture2DParser = require("awayjs-core/lib/parsers/Texture2DParser");
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
 * Dispatched when a single dependency (which may be the main file of a resource)
 * finishes loading.
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
 * AssetLoader can load any file format that away.supports (or for which a third-party parser
 * has been plugged in) and it's dependencies. Events are dispatched when assets are encountered
 * and for when the resource (or it's dependencies) have been loaded.
 *
 * The AssetLoader will not make assets available in any other way than through the dispatched
 * events. To store assets and make them available at any point from any module in an application,
 * use the AssetLibrary to load and manage assets.
 *
 * @see away.library.AssetLibrary
 */
var AssetLoader = (function (_super) {
    __extends(AssetLoader, _super);
    /**
     * Create a new ResourceLoadSession object.
     */
    function AssetLoader(materialMode) {
        var _this = this;
        if (materialMode === void 0) { materialMode = 0; }
        _super.call(this);
        this._materialMode = materialMode;
        this._stack = new Array();
        this._errorHandlers = new Array();
        this._parseErrorHandlers = new Array();
        this._onReadyForDependenciesDelegate = function (event) { return _this.onReadyForDependencies(event); };
        this._onParseCompleteDelegate = function (event) { return _this.onParseComplete(event); };
        this._onParseErrorDelegate = function (event) { return _this.onParseError(event); };
        this._onLoadCompleteDelegate = function (event) { return _this.onLoadComplete(event); };
        this._onLoadErrorDelegate = function (event) { return _this.onLoadError(event); };
        this._onTextureSizeErrorDelegate = function (event) { return _this.onTextureSizeError(event); };
        this._onAssetCompleteDelegate = function (event) { return _this.onAssetComplete(event); };
    }
    /**
     * Enables a specific parser.
     * When no specific parser is set for a loading/parsing opperation,
     * loader3d can autoselect the correct parser to use.
     * A parser must have been enabled, to be considered when autoselecting the parser.
     *
     * @param parser The parser class to enable.
     *
     * @see away.parsers.Parsers
     */
    AssetLoader.enableParser = function (parser) {
        if (AssetLoader._parsers.indexOf(parser) < 0)
            AssetLoader._parsers.push(parser);
    };
    /**
     * Enables a list of parsers.
     * When no specific parser is set for a loading/parsing opperation,
     * AssetLoader can autoselect the correct parser to use.
     * A parser must have been enabled, to be considered when autoselecting the parser.
     *
     * @param parsers A Vector of parser classes to enable.
     * @see away.parsers.Parsers
     */
    AssetLoader.enableParsers = function (parsers) {
        for (var c = 0; c < parsers.length; c++)
            AssetLoader.enableParser(parsers[c]);
    };
    Object.defineProperty(AssetLoader.prototype, "baseDependency", {
        /**
         * Returns the base dependency of the loader
         */
        get: function () {
            return this._baseDependency;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Loads a file and (optionally) all of its dependencies.
     *
     * @param req The URLRequest object containing the URL of the file to be loaded.
     * @param context An optional context object providing additional parameters for loading
     * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
     * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, AssetLoader will attempt to auto-detect the file type.
     */
    AssetLoader.prototype.load = function (req, context, ns, parser) {
        if (context === void 0) { context = null; }
        if (ns === void 0) { ns = null; }
        if (parser === void 0) { parser = null; }
        if (!this._token) {
            this._token = new AssetLoaderToken(this);
            this._uri = req.url = req.url.replace(/\\/g, "/");
            this._context = context;
            this._namespace = ns;
            this._baseDependency = new ResourceDependency('', req, null, parser, null);
            this.retrieveDependency(this._baseDependency);
            return this._token;
        }
        // TODO: Throw error (already loading)
        return null;
    };
    /**
     * Loads a resource from already loaded data.
     *
     * @param data The data object containing all resource information.
     * @param context An optional context object providing additional parameters for loading
     * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
     * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, AssetLoader will attempt to auto-detect the file type.
     */
    AssetLoader.prototype.loadData = function (data, id, context, ns, parser) {
        if (context === void 0) { context = null; }
        if (ns === void 0) { ns = null; }
        if (parser === void 0) { parser = null; }
        if (!this._token) {
            this._token = new AssetLoaderToken(this);
            this._uri = id;
            this._context = context;
            this._namespace = ns;
            this._baseDependency = new ResourceDependency(id, null, data, parser, null);
            this.retrieveDependency(this._baseDependency);
            return this._token;
        }
        // TODO: Throw error (already loading)
        return null;
    };
    /**
     * Recursively retrieves the next to-be-loaded and parsed dependency on the stack, or pops the list off the
     * stack when complete and continues on the top set.
     * @param parser The parser that will translate the data into a usable resource.
     */
    AssetLoader.prototype.retrieveNext = function (parser) {
        if (parser === void 0) { parser = null; }
        if (this._currentDependency.dependencies.length) {
            var next = this._currentDependency.dependencies.pop();
            this._stack.push(this._currentDependency);
            this.retrieveDependency(next);
        }
        else if (this._currentDependency.parser && this._currentDependency.parser.parsingPaused) {
            this._currentDependency.parser._iResumeParsingAfterDependencies();
            this._stack.pop();
        }
        else if (this._stack.length) {
            var prev = this._currentDependency;
            this._currentDependency = this._stack.pop();
            if (prev._iSuccess)
                prev.resolve();
            this.retrieveNext(parser);
        }
        else {
            this.dispatchEvent(new LoaderEvent(LoaderEvent.RESOURCE_COMPLETE, this._uri, this._baseDependency.parser.content, this._baseDependency.assets));
        }
    };
    /**
     * Retrieves a single dependency.
     * @param parser The parser that will translate the data into a usable resource.
     */
    AssetLoader.prototype.retrieveDependency = function (dependency) {
        var data;
        if (this._context && this._context.materialMode != 0)
            this._materialMode = this._context.materialMode;
        this._currentDependency = dependency;
        dependency._iLoader = new URLLoader();
        this.addEventListeners(dependency._iLoader);
        // Get already loaded (or mapped) data if available
        data = dependency.data;
        if (this._context && dependency.request && this._context._iHasDataForUrl(dependency.request.url))
            data = this._context._iGetDataForUrl(dependency.request.url);
        if (data) {
            if (data.constructor === Function)
                data = new data();
            dependency._iSetData(data);
            if (dependency.retrieveAsRawData) {
                // No need to parse. The parent parser is expecting this
                // to be raw data so it can be passed directly.
                dependency.resolve();
                // Move on to next dependency
                this.retrieveNext();
            }
            else {
                this.parseDependency(dependency);
            }
        }
        else {
            // Resolve URL and start loading
            dependency.request.url = this.resolveDependencyUrl(dependency);
            if (dependency.retrieveAsRawData) {
                // Always use binary for raw data loading
                dependency._iLoader.dataFormat = URLLoaderDataFormat.BINARY;
            }
            else {
                if (!dependency.parser)
                    dependency._iSetParser(this.getParserFromSuffix(dependency.request.url));
                if (dependency.parser) {
                    dependency._iLoader.dataFormat = dependency.parser.dataFormat;
                }
                else {
                    // Always use BINARY for unknown file formats. The thorough
                    // file type check will determine format after load, and if
                    // binary, a text load will have broken the file data.
                    dependency._iLoader.dataFormat = URLLoaderDataFormat.BINARY;
                }
            }
            dependency._iLoader.load(dependency.request);
        }
    };
    AssetLoader.prototype.joinUrl = function (base, end) {
        if (end.charAt(0) == '/')
            end = end.substr(1);
        if (base.length == 0)
            return end;
        if (base.charAt(base.length - 1) == '/')
            base = base.substr(0, base.length - 1);
        return base.concat('/', end);
    };
    AssetLoader.prototype.resolveDependencyUrl = function (dependency) {
        var scheme_re;
        var base;
        var url = dependency.request.url;
        // Has the user re-mapped this URL?
        if (this._context && this._context._iHasMappingForUrl(url))
            return this._context._iGetRemappedUrl(url);
        // This is the "base" dependency, i.e. the actual requested asset.
        // We will not try to resolve this since the user can probably be
        // thrusted to know this URL better than our automatic resolver. :)
        if (url == this._uri)
            return url;
        // Absolute URL? Check if starts with slash or a URL
        // scheme definition (e.g. ftp://, http://, file://)
        scheme_re = new RegExp('/^[a-zA-Z]{3,4}:\/\//');
        if (url.charAt(0) == '/') {
            if (this._context && this._context.overrideAbsolutePaths)
                return this.joinUrl(this._context.dependencyBaseUrl, url);
            else
                return url;
        }
        else if (scheme_re.test(url)) {
            // If overriding full URLs, get rid of scheme (e.g. "http://")
            // and replace with the dependencyBaseUrl defined by user.
            if (this._context && this._context.overrideFullURLs) {
                var noscheme_url = url.replace(scheme_re, ''); //url['replace'](scheme_re);
                return this.joinUrl(this._context.dependencyBaseUrl, noscheme_url);
            }
        }
        // Since not absolute, just get rid of base file name to find it's
        // folder and then concatenate dynamic URL
        if (this._context && this._context.dependencyBaseUrl) {
            base = this._context.dependencyBaseUrl;
            return this.joinUrl(base, url);
        }
        else {
            base = this._uri.substring(0, this._uri.lastIndexOf('/') + 1);
            return this.joinUrl(base, url);
        }
    };
    AssetLoader.prototype.retrieveParserDependencies = function () {
        if (!this._currentDependency)
            return;
        var parserDependancies = this._currentDependency.parser.dependencies;
        var i, len = parserDependancies.length;
        for (i = 0; i < len; i++)
            this._currentDependency.dependencies[i] = parserDependancies[i];
        // Since more dependencies might be added eventually, empty this
        // list so that the same dependency isn't retrieved more than once.
        parserDependancies.length = 0;
        this._stack.push(this._currentDependency);
        this.retrieveNext();
    };
    AssetLoader.prototype.resolveParserDependencies = function () {
        this._currentDependency._iSuccess = true;
        // Retrieve any last dependencies remaining on this parser, or
        // if none exists, just move on.
        if (this._currentDependency.parser && this._currentDependency.parser.dependencies.length && (!this._context || this._context.includeDependencies))
            this.retrieveParserDependencies();
        else
            this.retrieveNext();
    };
    /**
     * Called when a single dependency loading failed, and pushes further dependencies onto the stack.
     * @param event
     */
    AssetLoader.prototype.onLoadError = function (event) {
        var handled;
        var isDependency = (this._currentDependency != this._baseDependency);
        var loader = event.target; //TODO: keep on eye on this one
        this.removeEventListeners(loader);
        if (this.hasEventListener(IOErrorEvent.IO_ERROR)) {
            this.dispatchEvent(event);
            handled = true;
        }
        else {
            // TODO: Consider not doing this even when AssetLoader does have it's own LOAD_ERROR listener
            var i, len = this._errorHandlers.length;
            for (i = 0; i < len; i++)
                if (!handled)
                    handled = this._errorHandlers[i](event);
        }
        if (handled) {
            //if (isDependency && ! event.isDefaultPrevented()) {
            if (isDependency) {
                this._currentDependency.resolveFailure();
                this.retrieveNext();
            }
            else {
                // Either this was the base file (last left in the stack) or
                // default behavior was prevented by the handlers, and hence
                // there is nothing more to do than clean up and bail.
                this.dispose();
                return;
            }
        }
        else {
            throw new Error();
        }
    };
    /**
     * Called when a dependency parsing failed, and dispatches a <code>ParserEvent.PARSE_ERROR</code>
     * @param event
     */
    AssetLoader.prototype.onParseError = function (event) {
        var handled;
        var isDependency = (this._currentDependency != this._baseDependency);
        var loader = event.target;
        this.removeEventListeners(loader);
        if (this.hasEventListener(ParserEvent.PARSE_ERROR)) {
            this.dispatchEvent(event);
            handled = true;
        }
        else {
            // TODO: Consider not doing this even when AssetLoader does
            // have it's own LOAD_ERROR listener
            var i, len = this._parseErrorHandlers.length;
            for (i = 0; i < len; i++)
                if (!handled)
                    handled = this._parseErrorHandlers[i](event);
        }
        if (handled) {
            this.dispose();
            return;
        }
        else {
            throw new Error(event.message);
        }
    };
    AssetLoader.prototype.onAssetComplete = function (event) {
        // Add loaded asset to list of assets retrieved as part
        // of the current dependency. This list will be inspected
        // by the parent parser when dependency is resolved
        if (this._currentDependency)
            this._currentDependency.assets.push(event.asset);
        event.asset.resetAssetPath(event.asset.name, this._namespace);
        if (!this._currentDependency.suppresAssetEvents)
            this.dispatchEvent(event);
    };
    AssetLoader.prototype.onReadyForDependencies = function (event) {
        var parser = event.target;
        if (this._context && !this._context.includeDependencies)
            parser._iResumeParsingAfterDependencies();
        else
            this.retrieveParserDependencies();
    };
    /**
     * Called when a single dependency was parsed, and pushes further dependencies onto the stack.
     * @param event
     */
    AssetLoader.prototype.onLoadComplete = function (event) {
        var loader = event.target;
        this.removeEventListeners(loader);
        // Resolve this dependency
        this._currentDependency._iSetData(loader.data);
        if (this._currentDependency.retrieveAsRawData) {
            // No need to parse this data, which should be returned as is
            this.resolveParserDependencies();
        }
        else {
            this.parseDependency(this._currentDependency);
        }
    };
    /**
     * Called when parsing is complete.
     */
    AssetLoader.prototype.onParseComplete = function (event) {
        var parser = event.target;
        this.resolveParserDependencies(); //resolve in front of removing listeners to allow any remaining asset events to propagate
        parser.removeEventListener(ParserEvent.READY_FOR_DEPENDENCIES, this._onReadyForDependenciesDelegate);
        parser.removeEventListener(ParserEvent.PARSE_COMPLETE, this._onParseCompleteDelegate);
        parser.removeEventListener(ParserEvent.PARSE_ERROR, this._onParseErrorDelegate);
        parser.removeEventListener(AssetEvent.TEXTURE_SIZE_ERROR, this._onTextureSizeErrorDelegate);
        parser.removeEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
    };
    /**
     * Called when an image is too large or it's dimensions are not a power of 2
     * @param event
     */
    AssetLoader.prototype.onTextureSizeError = function (event) {
        event.asset.name = this._currentDependency.resolveName(event.asset);
        this.dispatchEvent(event);
    };
    AssetLoader.prototype.addEventListeners = function (loader) {
        loader.addEventListener(Event.COMPLETE, this._onLoadCompleteDelegate);
        loader.addEventListener(IOErrorEvent.IO_ERROR, this._onLoadErrorDelegate);
    };
    AssetLoader.prototype.removeEventListeners = function (loader) {
        loader.removeEventListener(Event.COMPLETE, this._onLoadCompleteDelegate);
        loader.removeEventListener(IOErrorEvent.IO_ERROR, this._onLoadErrorDelegate);
    };
    AssetLoader.prototype.stop = function () {
        this.dispose();
    };
    AssetLoader.prototype.dispose = function () {
        this._errorHandlers = null;
        this._parseErrorHandlers = null;
        this._context = null;
        this._token = null;
        this._stack = null;
        if (this._currentDependency && this._currentDependency._iLoader)
            this.removeEventListeners(this._currentDependency._iLoader);
        this._currentDependency = null;
    };
    /**
     * @private
     * This method is used by other loader classes (e.g. Loader3D and AssetLibraryBundle) to
     * add error event listeners to the AssetLoader instance. This system is used instead of
     * the regular EventDispatcher system so that the AssetLibrary error handler can be sure
     * that if hasEventListener() returns true, it's client code that's listening for the
     * event. Secondly, functions added as error handler through this custom method are
     * expected to return a boolean value indicating whether the event was handled (i.e.
     * whether they in turn had any client code listening for the event.) If no handlers
     * return true, the AssetLoader knows that the event wasn't handled and will throw an RTE.
     */
    AssetLoader.prototype._iAddParseErrorHandler = function (handler) {
        if (this._parseErrorHandlers.indexOf(handler) < 0)
            this._parseErrorHandlers.push(handler);
    };
    AssetLoader.prototype._iAddErrorHandler = function (handler) {
        if (this._errorHandlers.indexOf(handler) < 0)
            this._errorHandlers.push(handler);
    };
    /**
     * Guesses the parser to be used based on the file contents.
     * @param data The data to be parsed.
     * @param uri The url or id of the object to be parsed.
     * @return An instance of the guessed parser.
     */
    AssetLoader.prototype.getParserFromData = function (data) {
        var len = AssetLoader._parsers.length;
        for (var i = len - 1; i >= 0; i--)
            if (AssetLoader._parsers[i].supportsData(data))
                return new AssetLoader._parsers[i]();
        return null;
    };
    /**
     * Initiates parsing of the loaded dependency.
     *
     * @param The dependency to be parsed.
     */
    AssetLoader.prototype.parseDependency = function (dependency) {
        var parser = dependency.parser;
        // If no parser has been defined, try to find one by letting
        // all plugged in parsers inspect the actual data.
        if (!parser)
            dependency._iSetParser(parser = this.getParserFromData(dependency.data));
        if (parser) {
            parser.addEventListener(ParserEvent.READY_FOR_DEPENDENCIES, this._onReadyForDependenciesDelegate);
            parser.addEventListener(ParserEvent.PARSE_COMPLETE, this._onParseCompleteDelegate);
            parser.addEventListener(ParserEvent.PARSE_ERROR, this._onParseErrorDelegate);
            parser.addEventListener(AssetEvent.TEXTURE_SIZE_ERROR, this._onTextureSizeErrorDelegate);
            parser.addEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
            if (dependency.request && dependency.request.url)
                parser._iFileName = dependency.request.url;
            parser.materialMode = this._materialMode;
            parser.parseAsync(dependency.data);
        }
        else {
            var message = "No parser defined. To enable all parsers for auto-detection, use Parsers.enableAllBundled()";
            if (this.hasEventListener(ParserEvent.PARSE_ERROR))
                this.dispatchEvent(new ParserEvent(ParserEvent.PARSE_ERROR, message));
            else
                throw new Error(message);
        }
    };
    /**
     * Guesses the parser to be used based on the file extension.
     * @return An instance of the guessed parser.
     */
    AssetLoader.prototype.getParserFromSuffix = function (url) {
        // Get rid of query string if any and extract extension
        var base = (url.indexOf('?') > 0) ? url.split('?')[0] : url;
        var fileExtension = base.substr(base.lastIndexOf('.') + 1).toLowerCase();
        var len = AssetLoader._parsers.length;
        for (var i = len - 1; i >= 0; i--) {
            var parserClass = AssetLoader._parsers[i];
            if (parserClass.supportsType(fileExtension))
                return new parserClass();
        }
        return null;
    };
    // Image parser only parser that is added by default, to save file size.
    AssetLoader._parsers = new Array(Texture2DParser, CubeTextureParser);
    return AssetLoader;
})(EventDispatcher);
module.exports = AssetLoader;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L2Fzc2V0bG9hZGVyLnRzIl0sIm5hbWVzIjpbIkFzc2V0TG9hZGVyIiwiQXNzZXRMb2FkZXIuY29uc3RydWN0b3IiLCJBc3NldExvYWRlci5lbmFibGVQYXJzZXIiLCJBc3NldExvYWRlci5lbmFibGVQYXJzZXJzIiwiQXNzZXRMb2FkZXIuYmFzZURlcGVuZGVuY3kiLCJBc3NldExvYWRlci5sb2FkIiwiQXNzZXRMb2FkZXIubG9hZERhdGEiLCJBc3NldExvYWRlci5yZXRyaWV2ZU5leHQiLCJBc3NldExvYWRlci5yZXRyaWV2ZURlcGVuZGVuY3kiLCJBc3NldExvYWRlci5qb2luVXJsIiwiQXNzZXRMb2FkZXIucmVzb2x2ZURlcGVuZGVuY3lVcmwiLCJBc3NldExvYWRlci5yZXRyaWV2ZVBhcnNlckRlcGVuZGVuY2llcyIsIkFzc2V0TG9hZGVyLnJlc29sdmVQYXJzZXJEZXBlbmRlbmNpZXMiLCJBc3NldExvYWRlci5vbkxvYWRFcnJvciIsIkFzc2V0TG9hZGVyLm9uUGFyc2VFcnJvciIsIkFzc2V0TG9hZGVyLm9uQXNzZXRDb21wbGV0ZSIsIkFzc2V0TG9hZGVyLm9uUmVhZHlGb3JEZXBlbmRlbmNpZXMiLCJBc3NldExvYWRlci5vbkxvYWRDb21wbGV0ZSIsIkFzc2V0TG9hZGVyLm9uUGFyc2VDb21wbGV0ZSIsIkFzc2V0TG9hZGVyLm9uVGV4dHVyZVNpemVFcnJvciIsIkFzc2V0TG9hZGVyLmFkZEV2ZW50TGlzdGVuZXJzIiwiQXNzZXRMb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcnMiLCJBc3NldExvYWRlci5zdG9wIiwiQXNzZXRMb2FkZXIuZGlzcG9zZSIsIkFzc2V0TG9hZGVyLl9pQWRkUGFyc2VFcnJvckhhbmRsZXIiLCJBc3NldExvYWRlci5faUFkZEVycm9ySGFuZGxlciIsIkFzc2V0TG9hZGVyLmdldFBhcnNlckZyb21EYXRhIiwiQXNzZXRMb2FkZXIucGFyc2VEZXBlbmRlbmN5IiwiQXNzZXRMb2Fk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QUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUc3Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBVUEsR0FBR0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7WUFDMUNBLElBQUlBLFdBQVdBLEdBQU9BLFdBQVdBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzlDQSxFQUFFQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFDQSxZQUFZQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtnQkFDM0NBLE1BQU1BLENBQUNBLElBQUlBLFdBQVdBLEVBQUVBLENBQUNBO1FBQzNCQSxDQUFDQTtRQUVEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtJQUNiQSxDQUFDQTtJQTFsQkQ1Qix3RUFBd0VBO0lBQ3pEQSxvQkFBUUEsR0FBY0EsSUFBSUEsS0FBS0EsQ0FBTUEsZUFBZUEsRUFBRUEsaUJBQWlCQSxDQUFDQSxDQUFDQTtJQTBsQnpGQSxrQkFBQ0E7QUFBREEsQ0FsbkJBLEFBa25CQ0EsRUFsbkJ5QixlQUFlLEVBa25CeEM7QUFFRCxBQUFxQixpQkFBWixXQUFXLENBQUMiLCJmaWxlIjoibGlicmFyeS9Bc3NldExvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNzZXRMb2FkZXJDb250ZXh0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TG9hZGVyQ29udGV4dFwiKTtcbmltcG9ydCBBc3NldExvYWRlclRva2VuXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMb2FkZXJUb2tlblwiKTtcbmltcG9ydCBVUkxMb2FkZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9uZXQvVVJMTG9hZGVyXCIpO1xuaW1wb3J0IFVSTExvYWRlckRhdGFGb3JtYXRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxMb2FkZXJEYXRhRm9ybWF0XCIpO1xuaW1wb3J0IFVSTFJlcXVlc3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9uZXQvVVJMUmVxdWVzdFwiKTtcbmltcG9ydCBFcnJvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Vycm9yXCIpO1xuaW1wb3J0IEFzc2V0RXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvQXNzZXRFdmVudFwiKTtcbmltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCIpO1xuaW1wb3J0IElPRXJyb3JFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9JT0Vycm9yRXZlbnRcIik7XG5pbXBvcnQgTG9hZGVyRXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvTG9hZGVyRXZlbnRcIik7XG5pbXBvcnQgUGFyc2VyRXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvUGFyc2VyRXZlbnRcIik7XG5pbXBvcnQgQ3ViZVRleHR1cmVQYXJzZXJcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3BhcnNlcnMvQ3ViZVRleHR1cmVQYXJzZXJcIik7XG5pbXBvcnQgUGFyc2VyQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3BhcnNlcnMvUGFyc2VyQmFzZVwiKTtcbmltcG9ydCBSZXNvdXJjZURlcGVuZGVuY3lcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3BhcnNlcnMvUmVzb3VyY2VEZXBlbmRlbmN5XCIpO1xuaW1wb3J0IFRleHR1cmUyRFBhcnNlclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1RleHR1cmUyRFBhcnNlclwiKTtcblxuLyoqXG4gKiBEaXNwYXRjaGVkIHdoZW4gYW55IGFzc2V0IGZpbmlzaGVzIHBhcnNpbmcuIEFsc28gc2VlIHNwZWNpZmljIGV2ZW50cyBmb3IgZWFjaFxuICogaW5kaXZpZHVhbCBhc3NldCB0eXBlIChtZXNoZXMsIG1hdGVyaWFscyBldCBjLilcbiAqXG4gKiBAZXZlbnRUeXBlIGF3YXkuZXZlbnRzLkFzc2V0RXZlbnRcbiAqL1xuLy9bRXZlbnQobmFtZT1cImFzc2V0Q29tcGxldGVcIiwgdHlwZT1cImF3YXkzZC5ldmVudHMuQXNzZXRFdmVudFwiKV1cblxuXG4vKipcbiAqIERpc3BhdGNoZWQgd2hlbiBhIGZ1bGwgcmVzb3VyY2UgKGluY2x1ZGluZyBkZXBlbmRlbmNpZXMpIGZpbmlzaGVzIGxvYWRpbmcuXG4gKlxuICogQGV2ZW50VHlwZSBhd2F5LmV2ZW50cy5Mb2FkZXJFdmVudFxuICovXG4vL1tFdmVudChuYW1lPVwicmVzb3VyY2VDb21wbGV0ZVwiLCB0eXBlPVwiYXdheTNkLmV2ZW50cy5Mb2FkZXJFdmVudFwiKV1cblxuXG4vKipcbiAqIERpc3BhdGNoZWQgd2hlbiBhIHNpbmdsZSBkZXBlbmRlbmN5ICh3aGljaCBtYXkgYmUgdGhlIG1haW4gZmlsZSBvZiBhIHJlc291cmNlKVxuICogZmluaXNoZXMgbG9hZGluZy5cbiAqXG4gKiBAZXZlbnRUeXBlIGF3YXkuZXZlbnRzLkxvYWRlckV2ZW50XG4gKi9cbi8vW0V2ZW50KG5hbWU9XCJkZXBlbmRlbmN5Q29tcGxldGVcIiwgdHlwZT1cImF3YXkzZC5ldmVudHMuTG9hZGVyRXZlbnRcIildXG5cblxuLyoqXG4gKiBEaXNwYXRjaGVkIHdoZW4gYW4gZXJyb3Igb2NjdXJzIGR1cmluZyBsb2FkaW5nLiBJXG4gKlxuICogQGV2ZW50VHlwZSBhd2F5LmV2ZW50cy5Mb2FkZXJFdmVudFxuICovXG4vL1tFdmVudChuYW1lPVwibG9hZEVycm9yXCIsIHR5cGU9XCJhd2F5M2QuZXZlbnRzLkxvYWRlckV2ZW50XCIpXVxuXG5cbi8qKlxuICogRGlzcGF0Y2hlZCB3aGVuIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgcGFyc2luZy5cbiAqXG4gKiBAZXZlbnRUeXBlIGF3YXkuZXZlbnRzLlBhcnNlckV2ZW50XG4gKi9cbi8vW0V2ZW50KG5hbWU9XCJwYXJzZUVycm9yXCIsIHR5cGU9XCJhd2F5M2QuZXZlbnRzLlBhcnNlckV2ZW50XCIpXVxuXG4vKipcbiAqIERpc3BhdGNoZWQgd2hlbiBhbiBpbWFnZSBhc3NldCBkaW1lbnNpb25zIGFyZSBub3QgYSBwb3dlciBvZiAyXG4gKlxuICogQGV2ZW50VHlwZSBhd2F5LmV2ZW50cy5Bc3NldEV2ZW50XG4gKi9cbi8vW0V2ZW50KG5hbWU9XCJ0ZXh0dXJlU2l6ZUVycm9yXCIsIHR5cGU9XCJhd2F5M2QuZXZlbnRzLkFzc2V0RXZlbnRcIildXG5cbi8qKlxuICogQXNzZXRMb2FkZXIgY2FuIGxvYWQgYW55IGZpbGUgZm9ybWF0IHRoYXQgYXdheS5zdXBwb3J0cyAob3IgZm9yIHdoaWNoIGEgdGhpcmQtcGFydHkgcGFyc2VyXG4gKiBoYXMgYmVlbiBwbHVnZ2VkIGluKSBhbmQgaXQncyBkZXBlbmRlbmNpZXMuIEV2ZW50cyBhcmUgZGlzcGF0Y2hlZCB3aGVuIGFzc2V0cyBhcmUgZW5jb3VudGVyZWRcbiAqIGFuZCBmb3Igd2hlbiB0aGUgcmVzb3VyY2UgKG9yIGl0J3MgZGVwZW5kZW5jaWVzKSBoYXZlIGJlZW4gbG9hZGVkLlxuICpcbiAqIFRoZSBBc3NldExvYWRlciB3aWxsIG5vdCBtYWtlIGFzc2V0cyBhdmFpbGFibGUgaW4gYW55IG90aGVyIHdheSB0aGFuIHRocm91Z2ggdGhlIGRpc3BhdGNoZWRcbiAqIGV2ZW50cy4gVG8gc3RvcmUgYXNzZXRzIGFuZCBtYWtlIHRoZW0gYXZhaWxhYmxlIGF0IGFueSBwb2ludCBmcm9tIGFueSBtb2R1bGUgaW4gYW4gYXBwbGljYXRpb24sXG4gKiB1c2UgdGhlIEFzc2V0TGlicmFyeSB0byBsb2FkIGFuZCBtYW5hZ2UgYXNzZXRzLlxuICpcbiAqIEBzZWUgYXdheS5saWJyYXJ5LkFzc2V0TGlicmFyeVxuICovXG5jbGFzcyBBc3NldExvYWRlciBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxue1xuXHRwcml2YXRlIF9jb250ZXh0OkFzc2V0TG9hZGVyQ29udGV4dDtcblx0cHJpdmF0ZSBfdG9rZW46QXNzZXRMb2FkZXJUb2tlbjtcblx0cHJpdmF0ZSBfdXJpOnN0cmluZztcblx0cHJpdmF0ZSBfbWF0ZXJpYWxNb2RlOm51bWJlcjtcblxuXHRwcml2YXRlIF9lcnJvckhhbmRsZXJzOkFycmF5PEZ1bmN0aW9uPjtcblx0cHJpdmF0ZSBfcGFyc2VFcnJvckhhbmRsZXJzOkFycmF5PEZ1bmN0aW9uPjtcblxuXHRwcml2YXRlIF9zdGFjazpBcnJheTxSZXNvdXJjZURlcGVuZGVuY3k+O1xuXHRwcml2YXRlIF9iYXNlRGVwZW5kZW5jeTpSZXNvdXJjZURlcGVuZGVuY3k7XG5cdHByaXZhdGUgX2N1cnJlbnREZXBlbmRlbmN5OlJlc291cmNlRGVwZW5kZW5jeTtcblx0cHJpdmF0ZSBfbmFtZXNwYWNlOnN0cmluZztcblxuXHRwcml2YXRlIF9vblJlYWR5Rm9yRGVwZW5kZW5jaWVzRGVsZWdhdGU6KGV2ZW50OlBhcnNlckV2ZW50KSA9PiB2b2lkO1xuXHRwcml2YXRlIF9vblBhcnNlQ29tcGxldGVEZWxlZ2F0ZTooZXZlbnQ6UGFyc2VyRXZlbnQpID0+IHZvaWQ7XG5cdHByaXZhdGUgX29uUGFyc2VFcnJvckRlbGVnYXRlOihldmVudDpQYXJzZXJFdmVudCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfb25Mb2FkQ29tcGxldGVEZWxlZ2F0ZTooZXZlbnQ6RXZlbnQpID0+IHZvaWQ7XG5cdHByaXZhdGUgX29uTG9hZEVycm9yRGVsZWdhdGU6KGV2ZW50OklPRXJyb3JFdmVudCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfb25UZXh0dXJlU2l6ZUVycm9yRGVsZWdhdGU6KGV2ZW50OkFzc2V0RXZlbnQpID0+IHZvaWQ7XG5cdHByaXZhdGUgX29uQXNzZXRDb21wbGV0ZURlbGVnYXRlOihldmVudDpBc3NldEV2ZW50KSA9PiB2b2lkO1xuXG5cdC8vIEltYWdlIHBhcnNlciBvbmx5IHBhcnNlciB0aGF0IGlzIGFkZGVkIGJ5IGRlZmF1bHQsIHRvIHNhdmUgZmlsZSBzaXplLlxuXHRwcml2YXRlIHN0YXRpYyBfcGFyc2VyczpBcnJheTxhbnk+ID0gbmV3IEFycmF5PGFueT4oVGV4dHVyZTJEUGFyc2VyLCBDdWJlVGV4dHVyZVBhcnNlcik7XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgYSBzcGVjaWZpYyBwYXJzZXIuXG5cdCAqIFdoZW4gbm8gc3BlY2lmaWMgcGFyc2VyIGlzIHNldCBmb3IgYSBsb2FkaW5nL3BhcnNpbmcgb3BwZXJhdGlvbixcblx0ICogbG9hZGVyM2QgY2FuIGF1dG9zZWxlY3QgdGhlIGNvcnJlY3QgcGFyc2VyIHRvIHVzZS5cblx0ICogQSBwYXJzZXIgbXVzdCBoYXZlIGJlZW4gZW5hYmxlZCwgdG8gYmUgY29uc2lkZXJlZCB3aGVuIGF1dG9zZWxlY3RpbmcgdGhlIHBhcnNlci5cblx0ICpcblx0ICogQHBhcmFtIHBhcnNlciBUaGUgcGFyc2VyIGNsYXNzIHRvIGVuYWJsZS5cblx0ICpcblx0ICogQHNlZSBhd2F5LnBhcnNlcnMuUGFyc2Vyc1xuXHQgKi9cblx0cHVibGljIHN0YXRpYyBlbmFibGVQYXJzZXIocGFyc2VyKVxuXHR7XG5cdFx0aWYgKEFzc2V0TG9hZGVyLl9wYXJzZXJzLmluZGV4T2YocGFyc2VyKSA8IDApXG5cdFx0XHRBc3NldExvYWRlci5fcGFyc2Vycy5wdXNoKHBhcnNlcik7XG5cdH1cblxuXHQvKipcblx0ICogRW5hYmxlcyBhIGxpc3Qgb2YgcGFyc2Vycy5cblx0ICogV2hlbiBubyBzcGVjaWZpYyBwYXJzZXIgaXMgc2V0IGZvciBhIGxvYWRpbmcvcGFyc2luZyBvcHBlcmF0aW9uLFxuXHQgKiBBc3NldExvYWRlciBjYW4gYXV0b3NlbGVjdCB0aGUgY29ycmVjdCBwYXJzZXIgdG8gdXNlLlxuXHQgKiBBIHBhcnNlciBtdXN0IGhhdmUgYmVlbiBlbmFibGVkLCB0byBiZSBjb25zaWRlcmVkIHdoZW4gYXV0b3NlbGVjdGluZyB0aGUgcGFyc2VyLlxuXHQgKlxuXHQgKiBAcGFyYW0gcGFyc2VycyBBIFZlY3RvciBvZiBwYXJzZXIgY2xhc3NlcyB0byBlbmFibGUuXG5cdCAqIEBzZWUgYXdheS5wYXJzZXJzLlBhcnNlcnNcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgZW5hYmxlUGFyc2VycyhwYXJzZXJzOkFycmF5PE9iamVjdD4pXG5cdHtcblx0XHRmb3IgKHZhciBjOm51bWJlciA9IDA7IGMgPCBwYXJzZXJzLmxlbmd0aDsgYysrKVxuXHRcdFx0QXNzZXRMb2FkZXIuZW5hYmxlUGFyc2VyKHBhcnNlcnNbIGMgXSk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgYmFzZSBkZXBlbmRlbmN5IG9mIHRoZSBsb2FkZXJcblx0ICovXG5cdHB1YmxpYyBnZXQgYmFzZURlcGVuZGVuY3koKTpSZXNvdXJjZURlcGVuZGVuY3lcblx0e1xuXHRcdHJldHVybiB0aGlzLl9iYXNlRGVwZW5kZW5jeTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgUmVzb3VyY2VMb2FkU2Vzc2lvbiBvYmplY3QuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihtYXRlcmlhbE1vZGU6bnVtYmVyID0gMClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9tYXRlcmlhbE1vZGUgPSBtYXRlcmlhbE1vZGU7XG5cblx0XHR0aGlzLl9zdGFjayA9IG5ldyBBcnJheTxSZXNvdXJjZURlcGVuZGVuY3k+KCk7XG5cdFx0dGhpcy5fZXJyb3JIYW5kbGVycyA9IG5ldyBBcnJheTxGdW5jdGlvbj4oKTtcblx0XHR0aGlzLl9wYXJzZUVycm9ySGFuZGxlcnMgPSBuZXcgQXJyYXk8RnVuY3Rpb24+KCk7XG5cblx0XHR0aGlzLl9vblJlYWR5Rm9yRGVwZW5kZW5jaWVzRGVsZWdhdGUgPSAoZXZlbnQ6UGFyc2VyRXZlbnQpID0+IHRoaXMub25SZWFkeUZvckRlcGVuZGVuY2llcyhldmVudCk7XG5cdFx0dGhpcy5fb25QYXJzZUNvbXBsZXRlRGVsZWdhdGUgPSAoZXZlbnQ6UGFyc2VyRXZlbnQpID0+IHRoaXMub25QYXJzZUNvbXBsZXRlKGV2ZW50KTtcblx0XHR0aGlzLl9vblBhcnNlRXJyb3JEZWxlZ2F0ZSA9IChldmVudDpQYXJzZXJFdmVudCkgPT4gdGhpcy5vblBhcnNlRXJyb3IoZXZlbnQpO1xuXHRcdHRoaXMuX29uTG9hZENvbXBsZXRlRGVsZWdhdGUgPSAoZXZlbnQ6RXZlbnQpID0+IHRoaXMub25Mb2FkQ29tcGxldGUoZXZlbnQpO1xuXHRcdHRoaXMuX29uTG9hZEVycm9yRGVsZWdhdGUgPSAoZXZlbnQ6SU9FcnJvckV2ZW50KSA9PiB0aGlzLm9uTG9hZEVycm9yKGV2ZW50KTtcblx0XHR0aGlzLl9vblRleHR1cmVTaXplRXJyb3JEZWxlZ2F0ZSA9IChldmVudDpBc3NldEV2ZW50KSA9PiB0aGlzLm9uVGV4dHVyZVNpemVFcnJvcihldmVudCk7XG5cdFx0dGhpcy5fb25Bc3NldENvbXBsZXRlRGVsZWdhdGUgPSAoZXZlbnQ6QXNzZXRFdmVudCkgPT4gdGhpcy5vbkFzc2V0Q29tcGxldGUoZXZlbnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIExvYWRzIGEgZmlsZSBhbmQgKG9wdGlvbmFsbHkpIGFsbCBvZiBpdHMgZGVwZW5kZW5jaWVzLlxuXHQgKlxuXHQgKiBAcGFyYW0gcmVxIFRoZSBVUkxSZXF1ZXN0IG9iamVjdCBjb250YWluaW5nIHRoZSBVUkwgb2YgdGhlIGZpbGUgdG8gYmUgbG9hZGVkLlxuXHQgKiBAcGFyYW0gY29udGV4dCBBbiBvcHRpb25hbCBjb250ZXh0IG9iamVjdCBwcm92aWRpbmcgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciBsb2FkaW5nXG5cdCAqIEBwYXJhbSBucyBBbiBvcHRpb25hbCBuYW1lc3BhY2Ugc3RyaW5nIHVuZGVyIHdoaWNoIHRoZSBmaWxlIGlzIHRvIGJlIGxvYWRlZCwgYWxsb3dpbmcgdGhlIGRpZmZlcmVudGlhdGlvbiBvZiB0d28gcmVzb3VyY2VzIHdpdGggaWRlbnRpY2FsIGFzc2V0c1xuXHQgKiBAcGFyYW0gcGFyc2VyIEFuIG9wdGlvbmFsIHBhcnNlciBvYmplY3QgZm9yIHRyYW5zbGF0aW5nIHRoZSBsb2FkZWQgZGF0YSBpbnRvIGEgdXNhYmxlIHJlc291cmNlLiBJZiBub3QgcHJvdmlkZWQsIEFzc2V0TG9hZGVyIHdpbGwgYXR0ZW1wdCB0byBhdXRvLWRldGVjdCB0aGUgZmlsZSB0eXBlLlxuXHQgKi9cblx0cHVibGljIGxvYWQocmVxOlVSTFJlcXVlc3QsIGNvbnRleHQ6QXNzZXRMb2FkZXJDb250ZXh0ID0gbnVsbCwgbnM6c3RyaW5nID0gbnVsbCwgcGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKTpBc3NldExvYWRlclRva2VuXG5cdHtcblx0XHRpZiAoIXRoaXMuX3Rva2VuKSB7XG5cdFx0XHR0aGlzLl90b2tlbiA9IG5ldyBBc3NldExvYWRlclRva2VuKHRoaXMpO1xuXG5cdFx0XHR0aGlzLl91cmkgPSByZXEudXJsID0gcmVxLnVybC5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKTtcblx0XHRcdHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuXHRcdFx0dGhpcy5fbmFtZXNwYWNlID0gbnM7XG5cblx0XHRcdHRoaXMuX2Jhc2VEZXBlbmRlbmN5ID0gbmV3IFJlc291cmNlRGVwZW5kZW5jeSgnJywgcmVxLCBudWxsLCBwYXJzZXIsIG51bGwpO1xuXHRcdFx0dGhpcy5yZXRyaWV2ZURlcGVuZGVuY3kodGhpcy5fYmFzZURlcGVuZGVuY3kpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5fdG9rZW47XG5cdFx0fVxuXG5cdFx0Ly8gVE9ETzogVGhyb3cgZXJyb3IgKGFscmVhZHkgbG9hZGluZylcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBMb2FkcyBhIHJlc291cmNlIGZyb20gYWxyZWFkeSBsb2FkZWQgZGF0YS5cblx0ICpcblx0ICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHJlc291cmNlIGluZm9ybWF0aW9uLlxuXHQgKiBAcGFyYW0gY29udGV4dCBBbiBvcHRpb25hbCBjb250ZXh0IG9iamVjdCBwcm92aWRpbmcgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciBsb2FkaW5nXG5cdCAqIEBwYXJhbSBucyBBbiBvcHRpb25hbCBuYW1lc3BhY2Ugc3RyaW5nIHVuZGVyIHdoaWNoIHRoZSBmaWxlIGlzIHRvIGJlIGxvYWRlZCwgYWxsb3dpbmcgdGhlIGRpZmZlcmVudGlhdGlvbiBvZiB0d28gcmVzb3VyY2VzIHdpdGggaWRlbnRpY2FsIGFzc2V0c1xuXHQgKiBAcGFyYW0gcGFyc2VyIEFuIG9wdGlvbmFsIHBhcnNlciBvYmplY3QgZm9yIHRyYW5zbGF0aW5nIHRoZSBsb2FkZWQgZGF0YSBpbnRvIGEgdXNhYmxlIHJlc291cmNlLiBJZiBub3QgcHJvdmlkZWQsIEFzc2V0TG9hZGVyIHdpbGwgYXR0ZW1wdCB0byBhdXRvLWRldGVjdCB0aGUgZmlsZSB0eXBlLlxuXHQgKi9cblx0cHVibGljIGxvYWREYXRhKGRhdGE6YW55LCBpZDpzdHJpbmcsIGNvbnRleHQ6QXNzZXRMb2FkZXJDb250ZXh0ID0gbnVsbCwgbnM6c3RyaW5nID0gbnVsbCwgcGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKTpBc3NldExvYWRlclRva2VuXG5cdHtcblx0XHRpZiAoIXRoaXMuX3Rva2VuKSB7XG5cdFx0XHR0aGlzLl90b2tlbiA9IG5ldyBBc3NldExvYWRlclRva2VuKHRoaXMpO1xuXG5cdFx0XHR0aGlzLl91cmkgPSBpZDtcblx0XHRcdHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuXHRcdFx0dGhpcy5fbmFtZXNwYWNlID0gbnM7XG5cblx0XHRcdHRoaXMuX2Jhc2VEZXBlbmRlbmN5ID0gbmV3IFJlc291cmNlRGVwZW5kZW5jeShpZCwgbnVsbCwgZGF0YSwgcGFyc2VyLCBudWxsKTtcblx0XHRcdHRoaXMucmV0cmlldmVEZXBlbmRlbmN5KHRoaXMuX2Jhc2VEZXBlbmRlbmN5KTtcblxuXHRcdFx0cmV0dXJuIHRoaXMuX3Rva2VuO1xuXHRcdH1cblxuXHRcdC8vIFRPRE86IFRocm93IGVycm9yIChhbHJlYWR5IGxvYWRpbmcpXG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogUmVjdXJzaXZlbHkgcmV0cmlldmVzIHRoZSBuZXh0IHRvLWJlLWxvYWRlZCBhbmQgcGFyc2VkIGRlcGVuZGVuY3kgb24gdGhlIHN0YWNrLCBvciBwb3BzIHRoZSBsaXN0IG9mZiB0aGVcblx0ICogc3RhY2sgd2hlbiBjb21wbGV0ZSBhbmQgY29udGludWVzIG9uIHRoZSB0b3Agc2V0LlxuXHQgKiBAcGFyYW0gcGFyc2VyIFRoZSBwYXJzZXIgdGhhdCB3aWxsIHRyYW5zbGF0ZSB0aGUgZGF0YSBpbnRvIGEgdXNhYmxlIHJlc291cmNlLlxuXHQgKi9cblx0cHJpdmF0ZSByZXRyaWV2ZU5leHQocGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5LmRlcGVuZGVuY2llcy5sZW5ndGgpIHtcblxuXHRcdFx0dmFyIG5leHQ6UmVzb3VyY2VEZXBlbmRlbmN5ID0gdGhpcy5fY3VycmVudERlcGVuZGVuY3kuZGVwZW5kZW5jaWVzLnBvcCgpO1xuXG5cdFx0XHR0aGlzLl9zdGFjay5wdXNoKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5KTtcblx0XHRcdHRoaXMucmV0cmlldmVEZXBlbmRlbmN5KG5leHQpO1xuXG5cdFx0fSBlbHNlIGlmICh0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5wYXJzZXIgJiYgdGhpcy5fY3VycmVudERlcGVuZGVuY3kucGFyc2VyLnBhcnNpbmdQYXVzZWQpIHtcblxuXHRcdFx0dGhpcy5fY3VycmVudERlcGVuZGVuY3kucGFyc2VyLl9pUmVzdW1lUGFyc2luZ0FmdGVyRGVwZW5kZW5jaWVzKCk7XG5cdFx0XHR0aGlzLl9zdGFjay5wb3AoKTtcblxuXHRcdH0gZWxzZSBpZiAodGhpcy5fc3RhY2subGVuZ3RoKSB7XG5cblx0XHRcdHZhciBwcmV2OlJlc291cmNlRGVwZW5kZW5jeSA9IHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5O1xuXG5cdFx0XHR0aGlzLl9jdXJyZW50RGVwZW5kZW5jeSA9IHRoaXMuX3N0YWNrLnBvcCgpO1xuXG5cdFx0XHRpZiAocHJldi5faVN1Y2Nlc3MpXG5cdFx0XHRcdHByZXYucmVzb2x2ZSgpO1xuXG5cdFx0XHR0aGlzLnJldHJpZXZlTmV4dChwYXJzZXIpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTG9hZGVyRXZlbnQoTG9hZGVyRXZlbnQuUkVTT1VSQ0VfQ09NUExFVEUsIHRoaXMuX3VyaSwgdGhpcy5fYmFzZURlcGVuZGVuY3kucGFyc2VyLmNvbnRlbnQsIHRoaXMuX2Jhc2VEZXBlbmRlbmN5LmFzc2V0cykpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZXMgYSBzaW5nbGUgZGVwZW5kZW5jeS5cblx0ICogQHBhcmFtIHBhcnNlciBUaGUgcGFyc2VyIHRoYXQgd2lsbCB0cmFuc2xhdGUgdGhlIGRhdGEgaW50byBhIHVzYWJsZSByZXNvdXJjZS5cblx0ICovXG5cdHByaXZhdGUgcmV0cmlldmVEZXBlbmRlbmN5KGRlcGVuZGVuY3k6UmVzb3VyY2VEZXBlbmRlbmN5KVxuXHR7XG5cdFx0dmFyIGRhdGE6YW55O1xuXG5cdFx0aWYgKHRoaXMuX2NvbnRleHQgJiYgdGhpcy5fY29udGV4dC5tYXRlcmlhbE1vZGUgIT0gMClcblx0XHRcdHRoaXMuX21hdGVyaWFsTW9kZSA9IHRoaXMuX2NvbnRleHQubWF0ZXJpYWxNb2RlO1xuXG5cdFx0dGhpcy5fY3VycmVudERlcGVuZGVuY3kgPSBkZXBlbmRlbmN5O1xuXG5cdFx0ZGVwZW5kZW5jeS5faUxvYWRlciA9IG5ldyBVUkxMb2FkZXIoKTtcblxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoZGVwZW5kZW5jeS5faUxvYWRlcik7XG5cblx0XHQvLyBHZXQgYWxyZWFkeSBsb2FkZWQgKG9yIG1hcHBlZCkgZGF0YSBpZiBhdmFpbGFibGVcblx0XHRkYXRhID0gZGVwZW5kZW5jeS5kYXRhO1xuXG5cdFx0aWYgKHRoaXMuX2NvbnRleHQgJiYgZGVwZW5kZW5jeS5yZXF1ZXN0ICYmIHRoaXMuX2NvbnRleHQuX2lIYXNEYXRhRm9yVXJsKGRlcGVuZGVuY3kucmVxdWVzdC51cmwpKVxuXHRcdFx0ZGF0YSA9IHRoaXMuX2NvbnRleHQuX2lHZXREYXRhRm9yVXJsKGRlcGVuZGVuY3kucmVxdWVzdC51cmwpO1xuXG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGlmIChkYXRhLmNvbnN0cnVjdG9yID09PSBGdW5jdGlvbilcblx0XHRcdFx0ZGF0YSA9IG5ldyBkYXRhKCk7XG5cblx0XHRcdGRlcGVuZGVuY3kuX2lTZXREYXRhKGRhdGEpO1xuXG5cdFx0XHRpZiAoZGVwZW5kZW5jeS5yZXRyaWV2ZUFzUmF3RGF0YSkge1xuXHRcdFx0XHQvLyBObyBuZWVkIHRvIHBhcnNlLiBUaGUgcGFyZW50IHBhcnNlciBpcyBleHBlY3RpbmcgdGhpc1xuXHRcdFx0XHQvLyB0byBiZSByYXcgZGF0YSBzbyBpdCBjYW4gYmUgcGFzc2VkIGRpcmVjdGx5LlxuXHRcdFx0XHRkZXBlbmRlbmN5LnJlc29sdmUoKTtcblxuXHRcdFx0XHQvLyBNb3ZlIG9uIHRvIG5leHQgZGVwZW5kZW5jeVxuXHRcdFx0XHR0aGlzLnJldHJpZXZlTmV4dCgpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnBhcnNlRGVwZW5kZW5jeShkZXBlbmRlbmN5KTtcblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBSZXNvbHZlIFVSTCBhbmQgc3RhcnQgbG9hZGluZ1xuXHRcdFx0ZGVwZW5kZW5jeS5yZXF1ZXN0LnVybCA9IHRoaXMucmVzb2x2ZURlcGVuZGVuY3lVcmwoZGVwZW5kZW5jeSk7XG5cblx0XHRcdGlmIChkZXBlbmRlbmN5LnJldHJpZXZlQXNSYXdEYXRhKSB7XG5cdFx0XHRcdC8vIEFsd2F5cyB1c2UgYmluYXJ5IGZvciByYXcgZGF0YSBsb2FkaW5nXG5cdFx0XHRcdGRlcGVuZGVuY3kuX2lMb2FkZXIuZGF0YUZvcm1hdCA9IFVSTExvYWRlckRhdGFGb3JtYXQuQklOQVJZO1xuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRpZiAoIWRlcGVuZGVuY3kucGFyc2VyKVxuXHRcdFx0XHRcdGRlcGVuZGVuY3kuX2lTZXRQYXJzZXIodGhpcy5nZXRQYXJzZXJGcm9tU3VmZml4KGRlcGVuZGVuY3kucmVxdWVzdC51cmwpKTtcblxuXHRcdFx0XHRpZiAoZGVwZW5kZW5jeS5wYXJzZXIpIHtcblx0XHRcdFx0XHRkZXBlbmRlbmN5Ll9pTG9hZGVyLmRhdGFGb3JtYXQgPSBkZXBlbmRlbmN5LnBhcnNlci5kYXRhRm9ybWF0O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEFsd2F5cyB1c2UgQklOQVJZIGZvciB1bmtub3duIGZpbGUgZm9ybWF0cy4gVGhlIHRob3JvdWdoXG5cdFx0XHRcdFx0Ly8gZmlsZSB0eXBlIGNoZWNrIHdpbGwgZGV0ZXJtaW5lIGZvcm1hdCBhZnRlciBsb2FkLCBhbmQgaWZcblx0XHRcdFx0XHQvLyBiaW5hcnksIGEgdGV4dCBsb2FkIHdpbGwgaGF2ZSBicm9rZW4gdGhlIGZpbGUgZGF0YS5cblx0XHRcdFx0XHRkZXBlbmRlbmN5Ll9pTG9hZGVyLmRhdGFGb3JtYXQgPSBVUkxMb2FkZXJEYXRhRm9ybWF0LkJJTkFSWTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRkZXBlbmRlbmN5Ll9pTG9hZGVyLmxvYWQoZGVwZW5kZW5jeS5yZXF1ZXN0KTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGpvaW5VcmwoYmFzZTpzdHJpbmcsIGVuZDpzdHJpbmcpOnN0cmluZ1xuXHR7XG5cdFx0aWYgKGVuZC5jaGFyQXQoMCkgPT0gJy8nKVxuXHRcdFx0ZW5kID0gZW5kLnN1YnN0cigxKTtcblxuXHRcdGlmIChiYXNlLmxlbmd0aCA9PSAwKVxuXHRcdFx0cmV0dXJuIGVuZDtcblxuXHRcdGlmIChiYXNlLmNoYXJBdChiYXNlLmxlbmd0aCAtIDEpID09ICcvJylcblx0XHRcdGJhc2UgPSBiYXNlLnN1YnN0cigwLCBiYXNlLmxlbmd0aCAtIDEpO1xuXG5cdFx0cmV0dXJuIGJhc2UuY29uY2F0KCcvJywgZW5kKTtcblxuXHR9XG5cblx0cHJpdmF0ZSByZXNvbHZlRGVwZW5kZW5jeVVybChkZXBlbmRlbmN5OlJlc291cmNlRGVwZW5kZW5jeSk6c3RyaW5nXG5cdHtcblx0XHR2YXIgc2NoZW1lX3JlOlJlZ0V4cDtcblx0XHR2YXIgYmFzZTpzdHJpbmc7XG5cdFx0dmFyIHVybDpzdHJpbmcgPSBkZXBlbmRlbmN5LnJlcXVlc3QudXJsO1xuXG5cdFx0Ly8gSGFzIHRoZSB1c2VyIHJlLW1hcHBlZCB0aGlzIFVSTD9cblx0XHRpZiAodGhpcy5fY29udGV4dCAmJiB0aGlzLl9jb250ZXh0Ll9pSGFzTWFwcGluZ0ZvclVybCh1cmwpKVxuXHRcdFx0cmV0dXJuIHRoaXMuX2NvbnRleHQuX2lHZXRSZW1hcHBlZFVybCh1cmwpO1xuXG5cdFx0Ly8gVGhpcyBpcyB0aGUgXCJiYXNlXCIgZGVwZW5kZW5jeSwgaS5lLiB0aGUgYWN0dWFsIHJlcXVlc3RlZCBhc3NldC5cblx0XHQvLyBXZSB3aWxsIG5vdCB0cnkgdG8gcmVzb2x2ZSB0aGlzIHNpbmNlIHRoZSB1c2VyIGNhbiBwcm9iYWJseSBiZVxuXHRcdC8vIHRocnVzdGVkIHRvIGtub3cgdGhpcyBVUkwgYmV0dGVyIHRoYW4gb3VyIGF1dG9tYXRpYyByZXNvbHZlci4gOilcblx0XHRpZiAodXJsID09IHRoaXMuX3VyaSlcblx0XHRcdHJldHVybiB1cmw7XG5cblxuXHRcdC8vIEFic29sdXRlIFVSTD8gQ2hlY2sgaWYgc3RhcnRzIHdpdGggc2xhc2ggb3IgYSBVUkxcblx0XHQvLyBzY2hlbWUgZGVmaW5pdGlvbiAoZS5nLiBmdHA6Ly8sIGh0dHA6Ly8sIGZpbGU6Ly8pXG5cdFx0c2NoZW1lX3JlID0gbmV3IFJlZ0V4cCgnL15bYS16QS1aXXszLDR9OlxcL1xcLy8nKTtcblxuXHRcdGlmICh1cmwuY2hhckF0KDApID09ICcvJykge1xuXHRcdFx0aWYgKHRoaXMuX2NvbnRleHQgJiYgdGhpcy5fY29udGV4dC5vdmVycmlkZUFic29sdXRlUGF0aHMpXG5cdFx0XHRcdHJldHVybiB0aGlzLmpvaW5VcmwodGhpcy5fY29udGV4dC5kZXBlbmRlbmN5QmFzZVVybCwgdXJsKTsgZWxzZVxuXHRcdFx0XHRyZXR1cm4gdXJsO1xuXHRcdH0gZWxzZSBpZiAoc2NoZW1lX3JlLnRlc3QodXJsKSkge1xuXHRcdFx0Ly8gSWYgb3ZlcnJpZGluZyBmdWxsIFVSTHMsIGdldCByaWQgb2Ygc2NoZW1lIChlLmcuIFwiaHR0cDovL1wiKVxuXHRcdFx0Ly8gYW5kIHJlcGxhY2Ugd2l0aCB0aGUgZGVwZW5kZW5jeUJhc2VVcmwgZGVmaW5lZCBieSB1c2VyLlxuXHRcdFx0aWYgKHRoaXMuX2NvbnRleHQgJiYgdGhpcy5fY29udGV4dC5vdmVycmlkZUZ1bGxVUkxzKSB7XG5cblx0XHRcdFx0dmFyIG5vc2NoZW1lX3VybCA6IHN0cmluZyAgPSB1cmwucmVwbGFjZSggc2NoZW1lX3JlICwgJycgKTsvL3VybFsncmVwbGFjZSddKHNjaGVtZV9yZSk7XG5cdFx0XHRcdHJldHVybiB0aGlzLmpvaW5VcmwodGhpcy5fY29udGV4dC5kZXBlbmRlbmN5QmFzZVVybCwgPHN0cmluZz4gbm9zY2hlbWVfdXJsKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBTaW5jZSBub3QgYWJzb2x1dGUsIGp1c3QgZ2V0IHJpZCBvZiBiYXNlIGZpbGUgbmFtZSB0byBmaW5kIGl0J3Ncblx0XHQvLyBmb2xkZXIgYW5kIHRoZW4gY29uY2F0ZW5hdGUgZHluYW1pYyBVUkxcblx0XHRpZiAodGhpcy5fY29udGV4dCAmJiB0aGlzLl9jb250ZXh0LmRlcGVuZGVuY3lCYXNlVXJsKSB7XG5cdFx0XHRiYXNlID0gdGhpcy5fY29udGV4dC5kZXBlbmRlbmN5QmFzZVVybDtcblx0XHRcdHJldHVybiB0aGlzLmpvaW5VcmwoYmFzZSwgdXJsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YmFzZSA9IHRoaXMuX3VyaS5zdWJzdHJpbmcoMCwgdGhpcy5fdXJpLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcblx0XHRcdHJldHVybiB0aGlzLmpvaW5VcmwoYmFzZSwgdXJsKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJldHJpZXZlUGFyc2VyRGVwZW5kZW5jaWVzKClcblx0e1xuXHRcdGlmICghdGhpcy5fY3VycmVudERlcGVuZGVuY3kpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR2YXIgcGFyc2VyRGVwZW5kYW5jaWVzID0gdGhpcy5fY3VycmVudERlcGVuZGVuY3kucGFyc2VyLmRlcGVuZGVuY2llc1xuXHRcdHZhciBpOm51bWJlciwgbGVuOm51bWJlciA9IHBhcnNlckRlcGVuZGFuY2llcy5sZW5ndGg7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5kZXBlbmRlbmNpZXNbaV0gPSBwYXJzZXJEZXBlbmRhbmNpZXNbaV07XG5cblxuXHRcdC8vIFNpbmNlIG1vcmUgZGVwZW5kZW5jaWVzIG1pZ2h0IGJlIGFkZGVkIGV2ZW50dWFsbHksIGVtcHR5IHRoaXNcblx0XHQvLyBsaXN0IHNvIHRoYXQgdGhlIHNhbWUgZGVwZW5kZW5jeSBpc24ndCByZXRyaWV2ZWQgbW9yZSB0aGFuIG9uY2UuXG5cdFx0cGFyc2VyRGVwZW5kYW5jaWVzLmxlbmd0aCA9IDA7XG5cblx0XHR0aGlzLl9zdGFjay5wdXNoKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5KTtcblxuXHRcdHRoaXMucmV0cmlldmVOZXh0KCk7XG5cdH1cblxuXHRwcml2YXRlIHJlc29sdmVQYXJzZXJEZXBlbmRlbmNpZXMoKVxuXHR7XG5cdFx0dGhpcy5fY3VycmVudERlcGVuZGVuY3kuX2lTdWNjZXNzID0gdHJ1ZTtcblxuXHRcdC8vIFJldHJpZXZlIGFueSBsYXN0IGRlcGVuZGVuY2llcyByZW1haW5pbmcgb24gdGhpcyBwYXJzZXIsIG9yXG5cdFx0Ly8gaWYgbm9uZSBleGlzdHMsIGp1c3QgbW92ZSBvbi5cblx0XHRpZiAodGhpcy5fY3VycmVudERlcGVuZGVuY3kucGFyc2VyICYmIHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5LnBhcnNlci5kZXBlbmRlbmNpZXMubGVuZ3RoICYmICghdGhpcy5fY29udGV4dCB8fCB0aGlzLl9jb250ZXh0LmluY2x1ZGVEZXBlbmRlbmNpZXMpKS8vY29udGV4dCBtYXkgYmUgbnVsbFxuXHRcdFx0dGhpcy5yZXRyaWV2ZVBhcnNlckRlcGVuZGVuY2llcygpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMucmV0cmlldmVOZXh0KCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gYSBzaW5nbGUgZGVwZW5kZW5jeSBsb2FkaW5nIGZhaWxlZCwgYW5kIHB1c2hlcyBmdXJ0aGVyIGRlcGVuZGVuY2llcyBvbnRvIHRoZSBzdGFjay5cblx0ICogQHBhcmFtIGV2ZW50XG5cdCAqL1xuXHRwcml2YXRlIG9uTG9hZEVycm9yKGV2ZW50OklPRXJyb3JFdmVudClcblx0e1xuXHRcdHZhciBoYW5kbGVkOmJvb2xlYW47XG5cdFx0dmFyIGlzRGVwZW5kZW5jeTpib29sZWFuID0gKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5ICE9IHRoaXMuX2Jhc2VEZXBlbmRlbmN5KTtcblx0XHR2YXIgbG9hZGVyOlVSTExvYWRlciA9IDxVUkxMb2FkZXI+IGV2ZW50LnRhcmdldDsvL1RPRE86IGtlZXAgb24gZXllIG9uIHRoaXMgb25lXG5cblx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKGxvYWRlcik7XG5cblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKElPRXJyb3JFdmVudC5JT19FUlJPUiApKSB7XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIFRPRE86IENvbnNpZGVyIG5vdCBkb2luZyB0aGlzIGV2ZW4gd2hlbiBBc3NldExvYWRlciBkb2VzIGhhdmUgaXQncyBvd24gTE9BRF9FUlJPUiBsaXN0ZW5lclxuXHRcdFx0dmFyIGk6bnVtYmVyLCBsZW46bnVtYmVyID0gdGhpcy5fZXJyb3JIYW5kbGVycy5sZW5ndGg7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHRcdGlmICghaGFuZGxlZClcblx0XHRcdFx0XHRoYW5kbGVkID0gPGJvb2xlYW4+IHRoaXMuX2Vycm9ySGFuZGxlcnNbaV0oZXZlbnQpO1xuXHRcdH1cblxuXHRcdGlmIChoYW5kbGVkKSB7XG5cblx0XHRcdC8vaWYgKGlzRGVwZW5kZW5jeSAmJiAhIGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG5cdFx0XHRpZiAoaXNEZXBlbmRlbmN5KSB7IC8vIFRPRE86IEpTIC8gQVMzIENoYW5nZSAtIHdlIGRvbid0IGhhdmUgaXNEZWZhdWx0UHJldmVudGVkIC0gc28gd2lsbCB0aGlzIHdvcmtcblxuXHRcdFx0XHR0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5yZXNvbHZlRmFpbHVyZSgpO1xuXHRcdFx0XHR0aGlzLnJldHJpZXZlTmV4dCgpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBFaXRoZXIgdGhpcyB3YXMgdGhlIGJhc2UgZmlsZSAobGFzdCBsZWZ0IGluIHRoZSBzdGFjaykgb3Jcblx0XHRcdFx0Ly8gZGVmYXVsdCBiZWhhdmlvciB3YXMgcHJldmVudGVkIGJ5IHRoZSBoYW5kbGVycywgYW5kIGhlbmNlXG5cdFx0XHRcdC8vIHRoZXJlIGlzIG5vdGhpbmcgbW9yZSB0byBkbyB0aGFuIGNsZWFuIHVwIGFuZCBiYWlsLlxuXHRcdFx0XHR0aGlzLmRpc3Bvc2UoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIEVycm9yIGV2ZW50IHdhcyBub3QgaGFuZGxlZCBieSBsaXN0ZW5lcnMgZGlyZWN0bHkgb24gQXNzZXRMb2FkZXIgb3Jcblx0XHRcdC8vIG9uIGFueSBvZiB0aGUgc3Vic2NyaWJlZCBsb2FkZXJzIChpbiB0aGUgbGlzdCBvZiBlcnJvciBoYW5kbGVycy4pXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gYSBkZXBlbmRlbmN5IHBhcnNpbmcgZmFpbGVkLCBhbmQgZGlzcGF0Y2hlcyBhIDxjb2RlPlBhcnNlckV2ZW50LlBBUlNFX0VSUk9SPC9jb2RlPlxuXHQgKiBAcGFyYW0gZXZlbnRcblx0ICovXG5cdHByaXZhdGUgb25QYXJzZUVycm9yKGV2ZW50OlBhcnNlckV2ZW50KVxuXHR7XG5cdFx0dmFyIGhhbmRsZWQ6Ym9vbGVhbjtcblxuXHRcdHZhciBpc0RlcGVuZGVuY3k6Ym9vbGVhbiA9ICh0aGlzLl9jdXJyZW50RGVwZW5kZW5jeSAhPSB0aGlzLl9iYXNlRGVwZW5kZW5jeSk7XG5cblx0XHR2YXIgbG9hZGVyOlVSTExvYWRlciA9IDxVUkxMb2FkZXI+ZXZlbnQudGFyZ2V0O1xuXG5cdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVycyhsb2FkZXIpO1xuXG5cdFx0aWYgKHRoaXMuaGFzRXZlbnRMaXN0ZW5lcihQYXJzZXJFdmVudC5QQVJTRV9FUlJPUikpIHtcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0XHRoYW5kbGVkID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gVE9ETzogQ29uc2lkZXIgbm90IGRvaW5nIHRoaXMgZXZlbiB3aGVuIEFzc2V0TG9hZGVyIGRvZXNcblx0XHRcdC8vIGhhdmUgaXQncyBvd24gTE9BRF9FUlJPUiBsaXN0ZW5lclxuXHRcdFx0dmFyIGk6bnVtYmVyLCBsZW46bnVtYmVyID0gdGhpcy5fcGFyc2VFcnJvckhhbmRsZXJzLmxlbmd0aDtcblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0XHRpZiAoIWhhbmRsZWQpXG5cdFx0XHRcdFx0aGFuZGxlZCA9IDxib29sZWFuPiB0aGlzLl9wYXJzZUVycm9ySGFuZGxlcnNbaV0oZXZlbnQpO1xuXHRcdH1cblxuXHRcdGlmIChoYW5kbGVkKSB7XG5cdFx0XHR0aGlzLmRpc3Bvc2UoKTtcblx0XHRcdHJldHVybjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gRXJyb3IgZXZlbnQgd2FzIG5vdCBoYW5kbGVkIGJ5IGxpc3RlbmVycyBkaXJlY3RseSBvbiBBc3NldExvYWRlciBvclxuXHRcdFx0Ly8gb24gYW55IG9mIHRoZSBzdWJzY3JpYmVkIGxvYWRlcnMgKGluIHRoZSBsaXN0IG9mIGVycm9yIGhhbmRsZXJzLilcblx0XHRcdHRocm93IG5ldyBFcnJvcihldmVudC5tZXNzYWdlKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIG9uQXNzZXRDb21wbGV0ZShldmVudDpBc3NldEV2ZW50KVxuXHR7XG5cdFx0Ly8gQWRkIGxvYWRlZCBhc3NldCB0byBsaXN0IG9mIGFzc2V0cyByZXRyaWV2ZWQgYXMgcGFydFxuXHRcdC8vIG9mIHRoZSBjdXJyZW50IGRlcGVuZGVuY3kuIFRoaXMgbGlzdCB3aWxsIGJlIGluc3BlY3RlZFxuXHRcdC8vIGJ5IHRoZSBwYXJlbnQgcGFyc2VyIHdoZW4gZGVwZW5kZW5jeSBpcyByZXNvbHZlZFxuXHRcdGlmICh0aGlzLl9jdXJyZW50RGVwZW5kZW5jeSlcblx0XHRcdHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5LmFzc2V0cy5wdXNoKGV2ZW50LmFzc2V0KTtcblxuXHRcdGV2ZW50LmFzc2V0LnJlc2V0QXNzZXRQYXRoKGV2ZW50LmFzc2V0Lm5hbWUsIHRoaXMuX25hbWVzcGFjZSk7XG5cblx0XHRpZiAoIXRoaXMuX2N1cnJlbnREZXBlbmRlbmN5LnN1cHByZXNBc3NldEV2ZW50cylcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdH1cblxuXHRwcml2YXRlIG9uUmVhZHlGb3JEZXBlbmRlbmNpZXMoZXZlbnQ6UGFyc2VyRXZlbnQpXG5cdHtcblx0XHR2YXIgcGFyc2VyOlBhcnNlckJhc2UgPSA8UGFyc2VyQmFzZT4gZXZlbnQudGFyZ2V0O1xuXG5cdFx0aWYgKHRoaXMuX2NvbnRleHQgJiYgIXRoaXMuX2NvbnRleHQuaW5jbHVkZURlcGVuZGVuY2llcylcblx0XHRcdHBhcnNlci5faVJlc3VtZVBhcnNpbmdBZnRlckRlcGVuZGVuY2llcygpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMucmV0cmlldmVQYXJzZXJEZXBlbmRlbmNpZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgd2hlbiBhIHNpbmdsZSBkZXBlbmRlbmN5IHdhcyBwYXJzZWQsIGFuZCBwdXNoZXMgZnVydGhlciBkZXBlbmRlbmNpZXMgb250byB0aGUgc3RhY2suXG5cdCAqIEBwYXJhbSBldmVudFxuXHQgKi9cblx0cHJpdmF0ZSBvbkxvYWRDb21wbGV0ZShldmVudDpFdmVudClcblx0e1xuXHRcdHZhciBsb2FkZXI6VVJMTG9hZGVyID0gPFVSTExvYWRlcj4gZXZlbnQudGFyZ2V0O1xuXG5cdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVycyhsb2FkZXIpO1xuXG5cdFx0Ly8gUmVzb2x2ZSB0aGlzIGRlcGVuZGVuY3lcblx0XHR0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5faVNldERhdGEobG9hZGVyLmRhdGEpO1xuXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5LnJldHJpZXZlQXNSYXdEYXRhKSB7XG5cdFx0XHQvLyBObyBuZWVkIHRvIHBhcnNlIHRoaXMgZGF0YSwgd2hpY2ggc2hvdWxkIGJlIHJldHVybmVkIGFzIGlzXG5cdFx0XHR0aGlzLnJlc29sdmVQYXJzZXJEZXBlbmRlbmNpZXMoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5wYXJzZURlcGVuZGVuY3kodGhpcy5fY3VycmVudERlcGVuZGVuY3kpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgd2hlbiBwYXJzaW5nIGlzIGNvbXBsZXRlLlxuXHQgKi9cblx0cHJpdmF0ZSBvblBhcnNlQ29tcGxldGUoZXZlbnQ6UGFyc2VyRXZlbnQpOnZvaWRcblx0e1xuXHRcdHZhciBwYXJzZXI6UGFyc2VyQmFzZSA9IDxQYXJzZXJCYXNlPiBldmVudC50YXJnZXQ7XG5cblx0XHR0aGlzLnJlc29sdmVQYXJzZXJEZXBlbmRlbmNpZXMoKTsvL3Jlc29sdmUgaW4gZnJvbnQgb2YgcmVtb3ZpbmcgbGlzdGVuZXJzIHRvIGFsbG93IGFueSByZW1haW5pbmcgYXNzZXQgZXZlbnRzIHRvIHByb3BhZ2F0ZVxuXG5cdFx0cGFyc2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoUGFyc2VyRXZlbnQuUkVBRFlfRk9SX0RFUEVOREVOQ0lFUywgdGhpcy5fb25SZWFkeUZvckRlcGVuZGVuY2llc0RlbGVnYXRlKTtcblx0XHRwYXJzZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihQYXJzZXJFdmVudC5QQVJTRV9DT01QTEVURSwgdGhpcy5fb25QYXJzZUNvbXBsZXRlRGVsZWdhdGUpO1xuXHRcdHBhcnNlci5yZW1vdmVFdmVudExpc3RlbmVyKFBhcnNlckV2ZW50LlBBUlNFX0VSUk9SLCB0aGlzLl9vblBhcnNlRXJyb3JEZWxlZ2F0ZSk7XG5cdFx0cGFyc2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5URVhUVVJFX1NJWkVfRVJST1IsIHRoaXMuX29uVGV4dHVyZVNpemVFcnJvckRlbGVnYXRlKTtcblx0XHRwYXJzZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCB0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gYW4gaW1hZ2UgaXMgdG9vIGxhcmdlIG9yIGl0J3MgZGltZW5zaW9ucyBhcmUgbm90IGEgcG93ZXIgb2YgMlxuXHQgKiBAcGFyYW0gZXZlbnRcblx0ICovXG5cdHByaXZhdGUgb25UZXh0dXJlU2l6ZUVycm9yKGV2ZW50OkFzc2V0RXZlbnQpXG5cdHtcblx0XHRldmVudC5hc3NldC5uYW1lID0gdGhpcy5fY3VycmVudERlcGVuZGVuY3kucmVzb2x2ZU5hbWUoZXZlbnQuYXNzZXQpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0fVxuXG5cdHByaXZhdGUgYWRkRXZlbnRMaXN0ZW5lcnMobG9hZGVyOlVSTExvYWRlcilcblx0e1xuXHRcdGxvYWRlci5hZGRFdmVudExpc3RlbmVyKEV2ZW50LkNPTVBMRVRFLCB0aGlzLl9vbkxvYWRDb21wbGV0ZURlbGVnYXRlKTtcblx0XHRsb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihJT0Vycm9yRXZlbnQuSU9fRVJST1IsIHRoaXMuX29uTG9hZEVycm9yRGVsZWdhdGUpO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVFdmVudExpc3RlbmVycyhsb2FkZXI6VVJMTG9hZGVyKVxuXHR7XG5cdFx0bG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoRXZlbnQuQ09NUExFVEUsIHRoaXMuX29uTG9hZENvbXBsZXRlRGVsZWdhdGUpO1xuXHRcdGxvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKElPRXJyb3JFdmVudC5JT19FUlJPUiwgdGhpcy5fb25Mb2FkRXJyb3JEZWxlZ2F0ZSk7XG5cdH1cblxuXHRwdWJsaWMgc3RvcCgpXG5cdHtcblx0XHR0aGlzLmRpc3Bvc2UoKTtcblx0fVxuXG5cdHByaXZhdGUgZGlzcG9zZSgpXG5cdHtcblx0XHR0aGlzLl9lcnJvckhhbmRsZXJzID0gbnVsbDtcblx0XHR0aGlzLl9wYXJzZUVycm9ySGFuZGxlcnMgPSBudWxsO1xuXHRcdHRoaXMuX2NvbnRleHQgPSBudWxsO1xuXHRcdHRoaXMuX3Rva2VuID0gbnVsbDtcblx0XHR0aGlzLl9zdGFjayA9IG51bGw7XG5cblx0XHRpZiAodGhpcy5fY3VycmVudERlcGVuZGVuY3kgJiYgdGhpcy5fY3VycmVudERlcGVuZGVuY3kuX2lMb2FkZXIpXG5cdFx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5Ll9pTG9hZGVyKTtcblxuXHRcdHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5ID0gbnVsbDtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgYnkgb3RoZXIgbG9hZGVyIGNsYXNzZXMgKGUuZy4gTG9hZGVyM0QgYW5kIEFzc2V0TGlicmFyeUJ1bmRsZSkgdG9cblx0ICogYWRkIGVycm9yIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgQXNzZXRMb2FkZXIgaW5zdGFuY2UuIFRoaXMgc3lzdGVtIGlzIHVzZWQgaW5zdGVhZCBvZlxuXHQgKiB0aGUgcmVndWxhciBFdmVudERpc3BhdGNoZXIgc3lzdGVtIHNvIHRoYXQgdGhlIEFzc2V0TGlicmFyeSBlcnJvciBoYW5kbGVyIGNhbiBiZSBzdXJlXG5cdCAqIHRoYXQgaWYgaGFzRXZlbnRMaXN0ZW5lcigpIHJldHVybnMgdHJ1ZSwgaXQncyBjbGllbnQgY29kZSB0aGF0J3MgbGlzdGVuaW5nIGZvciB0aGVcblx0ICogZXZlbnQuIFNlY29uZGx5LCBmdW5jdGlvbnMgYWRkZWQgYXMgZXJyb3IgaGFuZGxlciB0aHJvdWdoIHRoaXMgY3VzdG9tIG1ldGhvZCBhcmVcblx0ICogZXhwZWN0ZWQgdG8gcmV0dXJuIGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGV2ZW50IHdhcyBoYW5kbGVkIChpLmUuXG5cdCAqIHdoZXRoZXIgdGhleSBpbiB0dXJuIGhhZCBhbnkgY2xpZW50IGNvZGUgbGlzdGVuaW5nIGZvciB0aGUgZXZlbnQuKSBJZiBubyBoYW5kbGVyc1xuXHQgKiByZXR1cm4gdHJ1ZSwgdGhlIEFzc2V0TG9hZGVyIGtub3dzIHRoYXQgdGhlIGV2ZW50IHdhc24ndCBoYW5kbGVkIGFuZCB3aWxsIHRocm93IGFuIFJURS5cblx0ICovXG5cblx0cHVibGljIF9pQWRkUGFyc2VFcnJvckhhbmRsZXIoaGFuZGxlcilcblx0e1xuXHRcdGlmICh0aGlzLl9wYXJzZUVycm9ySGFuZGxlcnMuaW5kZXhPZihoYW5kbGVyKSA8IDApXG5cdFx0XHR0aGlzLl9wYXJzZUVycm9ySGFuZGxlcnMucHVzaChoYW5kbGVyKTtcblx0fVxuXG5cdHB1YmxpYyBfaUFkZEVycm9ySGFuZGxlcihoYW5kbGVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2Vycm9ySGFuZGxlcnMuaW5kZXhPZihoYW5kbGVyKSA8IDApXG5cdFx0XHR0aGlzLl9lcnJvckhhbmRsZXJzLnB1c2goaGFuZGxlcik7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBHdWVzc2VzIHRoZSBwYXJzZXIgdG8gYmUgdXNlZCBiYXNlZCBvbiB0aGUgZmlsZSBjb250ZW50cy5cblx0ICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gYmUgcGFyc2VkLlxuXHQgKiBAcGFyYW0gdXJpIFRoZSB1cmwgb3IgaWQgb2YgdGhlIG9iamVjdCB0byBiZSBwYXJzZWQuXG5cdCAqIEByZXR1cm4gQW4gaW5zdGFuY2Ugb2YgdGhlIGd1ZXNzZWQgcGFyc2VyLlxuXHQgKi9cblx0cHJpdmF0ZSBnZXRQYXJzZXJGcm9tRGF0YShkYXRhOmFueSk6UGFyc2VyQmFzZVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSBBc3NldExvYWRlci5fcGFyc2Vycy5sZW5ndGg7XG5cblx0XHQvLyBnbyBpbiByZXZlcnNlIG9yZGVyIHRvIGFsbG93IGFwcGxpY2F0aW9uIG92ZXJyaWRlIG9mIGRlZmF1bHQgcGFyc2VyIGFkZGVkIGluIGF3YXkucHJvcGVyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSBsZW4gLSAxOyBpID49IDA7IGktLSlcblx0XHRcdGlmIChBc3NldExvYWRlci5fcGFyc2Vyc1tpXS5zdXBwb3J0c0RhdGEoZGF0YSkpXG5cdFx0XHRcdHJldHVybiBuZXcgQXNzZXRMb2FkZXIuX3BhcnNlcnNbaV0oKTtcblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblxuXHQvKipcblx0ICogSW5pdGlhdGVzIHBhcnNpbmcgb2YgdGhlIGxvYWRlZCBkZXBlbmRlbmN5LlxuXHQgKlxuXHQgKiBAcGFyYW0gVGhlIGRlcGVuZGVuY3kgdG8gYmUgcGFyc2VkLlxuXHQgKi9cblx0cHJpdmF0ZSBwYXJzZURlcGVuZGVuY3koZGVwZW5kZW5jeTpSZXNvdXJjZURlcGVuZGVuY3kpOnZvaWRcblx0e1xuXHRcdHZhciBwYXJzZXI6UGFyc2VyQmFzZSA9IGRlcGVuZGVuY3kucGFyc2VyO1xuXG5cdFx0Ly8gSWYgbm8gcGFyc2VyIGhhcyBiZWVuIGRlZmluZWQsIHRyeSB0byBmaW5kIG9uZSBieSBsZXR0aW5nXG5cdFx0Ly8gYWxsIHBsdWdnZWQgaW4gcGFyc2VycyBpbnNwZWN0IHRoZSBhY3R1YWwgZGF0YS5cblx0XHRpZiAoIXBhcnNlcilcblx0XHRcdGRlcGVuZGVuY3kuX2lTZXRQYXJzZXIocGFyc2VyID0gdGhpcy5nZXRQYXJzZXJGcm9tRGF0YShkZXBlbmRlbmN5LmRhdGEpKTtcblxuXHRcdGlmIChwYXJzZXIpIHtcblx0XHRcdHBhcnNlci5hZGRFdmVudExpc3RlbmVyKFBhcnNlckV2ZW50LlJFQURZX0ZPUl9ERVBFTkRFTkNJRVMsIHRoaXMuX29uUmVhZHlGb3JEZXBlbmRlbmNpZXNEZWxlZ2F0ZSk7XG5cdFx0XHRwYXJzZXIuYWRkRXZlbnRMaXN0ZW5lcihQYXJzZXJFdmVudC5QQVJTRV9DT01QTEVURSwgdGhpcy5fb25QYXJzZUNvbXBsZXRlRGVsZWdhdGUpO1xuXHRcdFx0cGFyc2VyLmFkZEV2ZW50TGlzdGVuZXIoUGFyc2VyRXZlbnQuUEFSU0VfRVJST1IsIHRoaXMuX29uUGFyc2VFcnJvckRlbGVnYXRlKTtcblx0XHRcdHBhcnNlci5hZGRFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuVEVYVFVSRV9TSVpFX0VSUk9SLCB0aGlzLl9vblRleHR1cmVTaXplRXJyb3JEZWxlZ2F0ZSk7XG5cdFx0XHRwYXJzZXIuYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCB0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSk7XG5cblx0XHRcdGlmIChkZXBlbmRlbmN5LnJlcXVlc3QgJiYgZGVwZW5kZW5jeS5yZXF1ZXN0LnVybClcblx0XHRcdFx0cGFyc2VyLl9pRmlsZU5hbWUgPSBkZXBlbmRlbmN5LnJlcXVlc3QudXJsO1xuXG5cdFx0XHRwYXJzZXIubWF0ZXJpYWxNb2RlID0gdGhpcy5fbWF0ZXJpYWxNb2RlO1xuXG5cdFx0XHRwYXJzZXIucGFyc2VBc3luYyhkZXBlbmRlbmN5LmRhdGEpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBtZXNzYWdlOnN0cmluZyA9IFwiTm8gcGFyc2VyIGRlZmluZWQuIFRvIGVuYWJsZSBhbGwgcGFyc2VycyBmb3IgYXV0by1kZXRlY3Rpb24sIHVzZSBQYXJzZXJzLmVuYWJsZUFsbEJ1bmRsZWQoKVwiXG5cdFx0XHRpZih0aGlzLmhhc0V2ZW50TGlzdGVuZXIoUGFyc2VyRXZlbnQuUEFSU0VfRVJST1IpKVxuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFBhcnNlckV2ZW50KFBhcnNlckV2ZW50LlBBUlNFX0VSUk9SLCBtZXNzYWdlKSk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR3Vlc3NlcyB0aGUgcGFyc2VyIHRvIGJlIHVzZWQgYmFzZWQgb24gdGhlIGZpbGUgZXh0ZW5zaW9uLlxuXHQgKiBAcmV0dXJuIEFuIGluc3RhbmNlIG9mIHRoZSBndWVzc2VkIHBhcnNlci5cblx0ICovXG5cdHByaXZhdGUgZ2V0UGFyc2VyRnJvbVN1ZmZpeCh1cmw6c3RyaW5nKTpQYXJzZXJCYXNlXG5cdHtcblx0XHQvLyBHZXQgcmlkIG9mIHF1ZXJ5IHN0cmluZyBpZiBhbnkgYW5kIGV4dHJhY3QgZXh0ZW5zaW9uXG5cdFx0dmFyIGJhc2U6c3RyaW5nID0gKHVybC5pbmRleE9mKCc/JykgPiAwKT8gdXJsLnNwbGl0KCc/JylbMF0gOiB1cmw7XG5cdFx0dmFyIGZpbGVFeHRlbnNpb246c3RyaW5nID0gYmFzZS5zdWJzdHIoYmFzZS5sYXN0SW5kZXhPZignLicpICsgMSkudG9Mb3dlckNhc2UoKTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gQXNzZXRMb2FkZXIuX3BhcnNlcnMubGVuZ3RoO1xuXG5cdFx0Ly8gZ28gaW4gcmV2ZXJzZSBvcmRlciB0byBhbGxvdyBhcHBsaWNhdGlvbiBvdmVycmlkZSBvZiBkZWZhdWx0IHBhcnNlciBhZGRlZCBpbiBhd2F5LnByb3BlclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gbGVuIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdHZhciBwYXJzZXJDbGFzczphbnkgPSBBc3NldExvYWRlci5fcGFyc2Vyc1tpXTtcblx0XHRcdGlmIChwYXJzZXJDbGFzcy5zdXBwb3J0c1R5cGUoZmlsZUV4dGVuc2lvbikpXG5cdFx0XHRcdHJldHVybiBuZXcgcGFyc2VyQ2xhc3MoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5leHBvcnQgPSBBc3NldExvYWRlcjsiXX0=