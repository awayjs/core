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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TG9hZGVyLnRzIl0sIm5hbWVzIjpbIkFzc2V0TG9hZGVyIiwiQXNzZXRMb2FkZXIuY29uc3RydWN0b3IiLCJBc3NldExvYWRlci5lbmFibGVQYXJzZXIiLCJBc3NldExvYWRlci5lbmFibGVQYXJzZXJzIiwiQXNzZXRMb2FkZXIuYmFzZURlcGVuZGVuY3kiLCJBc3NldExvYWRlci5sb2FkIiwiQXNzZXRMb2FkZXIubG9hZERhdGEiLCJBc3NldExvYWRlci5yZXRyaWV2ZU5leHQiLCJBc3NldExvYWRlci5yZXRyaWV2ZURlcGVuZGVuY3kiLCJBc3NldExvYWRlci5qb2luVXJsIiwiQXNzZXRMb2FkZXIucmVzb2x2ZURlcGVuZGVuY3lVcmwiLCJBc3NldExvYWRlci5yZXRyaWV2ZVBhcnNlckRlcGVuZGVuY2llcyIsIkFzc2V0TG9hZGVyLnJlc29sdmVQYXJzZXJEZXBlbmRlbmNpZXMiLCJBc3NldExvYWRlci5vbkxvYWRFcnJvciIsIkFzc2V0TG9hZGVyLm9uUGFyc2VFcnJvciIsIkFzc2V0TG9hZGVyLm9uQXNzZXRDb21wbGV0ZSIsIkFzc2V0TG9hZGVyLm9uUmVhZHlGb3JEZXBlbmRlbmNpZXMiLCJBc3NldExvYWRlci5vbkxvYWRDb21wbGV0ZSIsIkFzc2V0TG9hZGVyLm9uUGFyc2VDb21wbGV0ZSIsIkFzc2V0TG9hZGVyLm9uVGV4dHVyZVNpemVFcnJvciIsIkFzc2V0TG9hZGVyLmFkZEV2ZW50TGlzdGVuZXJzIiwiQXNzZXRMb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcnMiLCJBc3NldExvYWRlci5zdG9wIiwiQXNzZXRMb2FkZXIuZGlzcG9zZSIsIkFzc2V0TG9hZGVyLl9pQWRkUGFyc2VFcnJvckhhbmRsZXIiLCJBc3NldExvYWRlci5faUFkZEVycm9ySGFuZGxlciIsIkFzc2V0TG9hZGVyLmdldFBhcnNlckZyb21EYXRhIiwiQXNzZXRMb2FkZXIucGFyc2VEZXBlbmRlbmN5IiwiQXNzZXRMb2Fk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QUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUc3Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBVUEsR0FBR0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7WUFDMUNBLElBQUlBLFdBQVdBLEdBQU9BLFdBQVdBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzlDQSxFQUFFQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFDQSxZQUFZQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtnQkFDM0NBLE1BQU1BLENBQUNBLElBQUlBLFdBQVdBLEVBQUVBLENBQUNBO1FBQzNCQSxDQUFDQTtRQUVEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtJQUNiQSxDQUFDQTtJQTFsQkQ1Qix3RUFBd0VBO0lBQ3pEQSxvQkFBUUEsR0FBY0EsSUFBSUEsS0FBS0EsQ0FBTUEsZUFBZUEsRUFBRUEsaUJBQWlCQSxDQUFDQSxDQUFDQTtJQTBsQnpGQSxrQkFBQ0E7QUFBREEsQ0FsbkJBLEFBa25CQ0EsRUFsbkJ5QixlQUFlLEVBa25CeEM7QUFFRCxBQUFxQixpQkFBWixXQUFXLENBQUMiLCJmaWxlIjoibGlicmFyeS9Bc3NldExvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNzZXRMb2FkZXJDb250ZXh0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TG9hZGVyQ29udGV4dFwiKTtcclxuaW1wb3J0IEFzc2V0TG9hZGVyVG9rZW5cdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldExvYWRlclRva2VuXCIpO1xyXG5pbXBvcnQgVVJMTG9hZGVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbmV0L1VSTExvYWRlclwiKTtcclxuaW1wb3J0IFVSTExvYWRlckRhdGFGb3JtYXRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxMb2FkZXJEYXRhRm9ybWF0XCIpO1xyXG5pbXBvcnQgVVJMUmVxdWVzdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxSZXF1ZXN0XCIpO1xyXG5pbXBvcnQgRXJyb3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9FcnJvclwiKTtcclxuaW1wb3J0IEFzc2V0RXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvQXNzZXRFdmVudFwiKTtcclxuaW1wb3J0IEV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnRcIik7XHJcbmltcG9ydCBFdmVudERpc3BhdGNoZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiKTtcclxuaW1wb3J0IElPRXJyb3JFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9JT0Vycm9yRXZlbnRcIik7XHJcbmltcG9ydCBMb2FkZXJFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9Mb2FkZXJFdmVudFwiKTtcclxuaW1wb3J0IFBhcnNlckV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL1BhcnNlckV2ZW50XCIpO1xyXG5pbXBvcnQgQ3ViZVRleHR1cmVQYXJzZXJcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3BhcnNlcnMvQ3ViZVRleHR1cmVQYXJzZXJcIik7XHJcbmltcG9ydCBQYXJzZXJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcGFyc2Vycy9QYXJzZXJCYXNlXCIpO1xyXG5pbXBvcnQgUmVzb3VyY2VEZXBlbmRlbmN5XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1Jlc291cmNlRGVwZW5kZW5jeVwiKTtcclxuaW1wb3J0IFRleHR1cmUyRFBhcnNlclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1RleHR1cmUyRFBhcnNlclwiKTtcclxuXHJcbi8qKlxyXG4gKiBEaXNwYXRjaGVkIHdoZW4gYW55IGFzc2V0IGZpbmlzaGVzIHBhcnNpbmcuIEFsc28gc2VlIHNwZWNpZmljIGV2ZW50cyBmb3IgZWFjaFxyXG4gKiBpbmRpdmlkdWFsIGFzc2V0IHR5cGUgKG1lc2hlcywgbWF0ZXJpYWxzIGV0IGMuKVxyXG4gKlxyXG4gKiBAZXZlbnRUeXBlIGF3YXkuZXZlbnRzLkFzc2V0RXZlbnRcclxuICovXHJcbi8vW0V2ZW50KG5hbWU9XCJhc3NldENvbXBsZXRlXCIsIHR5cGU9XCJhd2F5M2QuZXZlbnRzLkFzc2V0RXZlbnRcIildXHJcblxyXG5cclxuLyoqXHJcbiAqIERpc3BhdGNoZWQgd2hlbiBhIGZ1bGwgcmVzb3VyY2UgKGluY2x1ZGluZyBkZXBlbmRlbmNpZXMpIGZpbmlzaGVzIGxvYWRpbmcuXHJcbiAqXHJcbiAqIEBldmVudFR5cGUgYXdheS5ldmVudHMuTG9hZGVyRXZlbnRcclxuICovXHJcbi8vW0V2ZW50KG5hbWU9XCJyZXNvdXJjZUNvbXBsZXRlXCIsIHR5cGU9XCJhd2F5M2QuZXZlbnRzLkxvYWRlckV2ZW50XCIpXVxyXG5cclxuXHJcbi8qKlxyXG4gKiBEaXNwYXRjaGVkIHdoZW4gYSBzaW5nbGUgZGVwZW5kZW5jeSAod2hpY2ggbWF5IGJlIHRoZSBtYWluIGZpbGUgb2YgYSByZXNvdXJjZSlcclxuICogZmluaXNoZXMgbG9hZGluZy5cclxuICpcclxuICogQGV2ZW50VHlwZSBhd2F5LmV2ZW50cy5Mb2FkZXJFdmVudFxyXG4gKi9cclxuLy9bRXZlbnQobmFtZT1cImRlcGVuZGVuY3lDb21wbGV0ZVwiLCB0eXBlPVwiYXdheTNkLmV2ZW50cy5Mb2FkZXJFdmVudFwiKV1cclxuXHJcblxyXG4vKipcclxuICogRGlzcGF0Y2hlZCB3aGVuIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgbG9hZGluZy4gSVxyXG4gKlxyXG4gKiBAZXZlbnRUeXBlIGF3YXkuZXZlbnRzLkxvYWRlckV2ZW50XHJcbiAqL1xyXG4vL1tFdmVudChuYW1lPVwibG9hZEVycm9yXCIsIHR5cGU9XCJhd2F5M2QuZXZlbnRzLkxvYWRlckV2ZW50XCIpXVxyXG5cclxuXHJcbi8qKlxyXG4gKiBEaXNwYXRjaGVkIHdoZW4gYW4gZXJyb3Igb2NjdXJzIGR1cmluZyBwYXJzaW5nLlxyXG4gKlxyXG4gKiBAZXZlbnRUeXBlIGF3YXkuZXZlbnRzLlBhcnNlckV2ZW50XHJcbiAqL1xyXG4vL1tFdmVudChuYW1lPVwicGFyc2VFcnJvclwiLCB0eXBlPVwiYXdheTNkLmV2ZW50cy5QYXJzZXJFdmVudFwiKV1cclxuXHJcbi8qKlxyXG4gKiBEaXNwYXRjaGVkIHdoZW4gYW4gaW1hZ2UgYXNzZXQgZGltZW5zaW9ucyBhcmUgbm90IGEgcG93ZXIgb2YgMlxyXG4gKlxyXG4gKiBAZXZlbnRUeXBlIGF3YXkuZXZlbnRzLkFzc2V0RXZlbnRcclxuICovXHJcbi8vW0V2ZW50KG5hbWU9XCJ0ZXh0dXJlU2l6ZUVycm9yXCIsIHR5cGU9XCJhd2F5M2QuZXZlbnRzLkFzc2V0RXZlbnRcIildXHJcblxyXG4vKipcclxuICogQXNzZXRMb2FkZXIgY2FuIGxvYWQgYW55IGZpbGUgZm9ybWF0IHRoYXQgYXdheS5zdXBwb3J0cyAob3IgZm9yIHdoaWNoIGEgdGhpcmQtcGFydHkgcGFyc2VyXHJcbiAqIGhhcyBiZWVuIHBsdWdnZWQgaW4pIGFuZCBpdCdzIGRlcGVuZGVuY2llcy4gRXZlbnRzIGFyZSBkaXNwYXRjaGVkIHdoZW4gYXNzZXRzIGFyZSBlbmNvdW50ZXJlZFxyXG4gKiBhbmQgZm9yIHdoZW4gdGhlIHJlc291cmNlIChvciBpdCdzIGRlcGVuZGVuY2llcykgaGF2ZSBiZWVuIGxvYWRlZC5cclxuICpcclxuICogVGhlIEFzc2V0TG9hZGVyIHdpbGwgbm90IG1ha2UgYXNzZXRzIGF2YWlsYWJsZSBpbiBhbnkgb3RoZXIgd2F5IHRoYW4gdGhyb3VnaCB0aGUgZGlzcGF0Y2hlZFxyXG4gKiBldmVudHMuIFRvIHN0b3JlIGFzc2V0cyBhbmQgbWFrZSB0aGVtIGF2YWlsYWJsZSBhdCBhbnkgcG9pbnQgZnJvbSBhbnkgbW9kdWxlIGluIGFuIGFwcGxpY2F0aW9uLFxyXG4gKiB1c2UgdGhlIEFzc2V0TGlicmFyeSB0byBsb2FkIGFuZCBtYW5hZ2UgYXNzZXRzLlxyXG4gKlxyXG4gKiBAc2VlIGF3YXkubGlicmFyeS5Bc3NldExpYnJhcnlcclxuICovXHJcbmNsYXNzIEFzc2V0TG9hZGVyIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyXHJcbntcclxuXHRwcml2YXRlIF9jb250ZXh0OkFzc2V0TG9hZGVyQ29udGV4dDtcclxuXHRwcml2YXRlIF90b2tlbjpBc3NldExvYWRlclRva2VuO1xyXG5cdHByaXZhdGUgX3VyaTpzdHJpbmc7XHJcblx0cHJpdmF0ZSBfbWF0ZXJpYWxNb2RlOm51bWJlcjtcclxuXHJcblx0cHJpdmF0ZSBfZXJyb3JIYW5kbGVyczpBcnJheTxGdW5jdGlvbj47XHJcblx0cHJpdmF0ZSBfcGFyc2VFcnJvckhhbmRsZXJzOkFycmF5PEZ1bmN0aW9uPjtcclxuXHJcblx0cHJpdmF0ZSBfc3RhY2s6QXJyYXk8UmVzb3VyY2VEZXBlbmRlbmN5PjtcclxuXHRwcml2YXRlIF9iYXNlRGVwZW5kZW5jeTpSZXNvdXJjZURlcGVuZGVuY3k7XHJcblx0cHJpdmF0ZSBfY3VycmVudERlcGVuZGVuY3k6UmVzb3VyY2VEZXBlbmRlbmN5O1xyXG5cdHByaXZhdGUgX25hbWVzcGFjZTpzdHJpbmc7XHJcblxyXG5cdHByaXZhdGUgX29uUmVhZHlGb3JEZXBlbmRlbmNpZXNEZWxlZ2F0ZTooZXZlbnQ6UGFyc2VyRXZlbnQpID0+IHZvaWQ7XHJcblx0cHJpdmF0ZSBfb25QYXJzZUNvbXBsZXRlRGVsZWdhdGU6KGV2ZW50OlBhcnNlckV2ZW50KSA9PiB2b2lkO1xyXG5cdHByaXZhdGUgX29uUGFyc2VFcnJvckRlbGVnYXRlOihldmVudDpQYXJzZXJFdmVudCkgPT4gdm9pZDtcclxuXHRwcml2YXRlIF9vbkxvYWRDb21wbGV0ZURlbGVnYXRlOihldmVudDpFdmVudCkgPT4gdm9pZDtcclxuXHRwcml2YXRlIF9vbkxvYWRFcnJvckRlbGVnYXRlOihldmVudDpJT0Vycm9yRXZlbnQpID0+IHZvaWQ7XHJcblx0cHJpdmF0ZSBfb25UZXh0dXJlU2l6ZUVycm9yRGVsZWdhdGU6KGV2ZW50OkFzc2V0RXZlbnQpID0+IHZvaWQ7XHJcblx0cHJpdmF0ZSBfb25Bc3NldENvbXBsZXRlRGVsZWdhdGU6KGV2ZW50OkFzc2V0RXZlbnQpID0+IHZvaWQ7XHJcblxyXG5cdC8vIEltYWdlIHBhcnNlciBvbmx5IHBhcnNlciB0aGF0IGlzIGFkZGVkIGJ5IGRlZmF1bHQsIHRvIHNhdmUgZmlsZSBzaXplLlxyXG5cdHByaXZhdGUgc3RhdGljIF9wYXJzZXJzOkFycmF5PGFueT4gPSBuZXcgQXJyYXk8YW55PihUZXh0dXJlMkRQYXJzZXIsIEN1YmVUZXh0dXJlUGFyc2VyKTtcclxuXHJcblx0LyoqXHJcblx0ICogRW5hYmxlcyBhIHNwZWNpZmljIHBhcnNlci5cclxuXHQgKiBXaGVuIG5vIHNwZWNpZmljIHBhcnNlciBpcyBzZXQgZm9yIGEgbG9hZGluZy9wYXJzaW5nIG9wcGVyYXRpb24sXHJcblx0ICogbG9hZGVyM2QgY2FuIGF1dG9zZWxlY3QgdGhlIGNvcnJlY3QgcGFyc2VyIHRvIHVzZS5cclxuXHQgKiBBIHBhcnNlciBtdXN0IGhhdmUgYmVlbiBlbmFibGVkLCB0byBiZSBjb25zaWRlcmVkIHdoZW4gYXV0b3NlbGVjdGluZyB0aGUgcGFyc2VyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBhcnNlciBUaGUgcGFyc2VyIGNsYXNzIHRvIGVuYWJsZS5cclxuXHQgKlxyXG5cdCAqIEBzZWUgYXdheS5wYXJzZXJzLlBhcnNlcnNcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIGVuYWJsZVBhcnNlcihwYXJzZXIpXHJcblx0e1xyXG5cdFx0aWYgKEFzc2V0TG9hZGVyLl9wYXJzZXJzLmluZGV4T2YocGFyc2VyKSA8IDApXHJcblx0XHRcdEFzc2V0TG9hZGVyLl9wYXJzZXJzLnB1c2gocGFyc2VyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVuYWJsZXMgYSBsaXN0IG9mIHBhcnNlcnMuXHJcblx0ICogV2hlbiBubyBzcGVjaWZpYyBwYXJzZXIgaXMgc2V0IGZvciBhIGxvYWRpbmcvcGFyc2luZyBvcHBlcmF0aW9uLFxyXG5cdCAqIEFzc2V0TG9hZGVyIGNhbiBhdXRvc2VsZWN0IHRoZSBjb3JyZWN0IHBhcnNlciB0byB1c2UuXHJcblx0ICogQSBwYXJzZXIgbXVzdCBoYXZlIGJlZW4gZW5hYmxlZCwgdG8gYmUgY29uc2lkZXJlZCB3aGVuIGF1dG9zZWxlY3RpbmcgdGhlIHBhcnNlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBwYXJzZXJzIEEgVmVjdG9yIG9mIHBhcnNlciBjbGFzc2VzIHRvIGVuYWJsZS5cclxuXHQgKiBAc2VlIGF3YXkucGFyc2Vycy5QYXJzZXJzXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBlbmFibGVQYXJzZXJzKHBhcnNlcnM6QXJyYXk8T2JqZWN0PilcclxuXHR7XHJcblx0XHRmb3IgKHZhciBjOm51bWJlciA9IDA7IGMgPCBwYXJzZXJzLmxlbmd0aDsgYysrKVxyXG5cdFx0XHRBc3NldExvYWRlci5lbmFibGVQYXJzZXIocGFyc2Vyc1sgYyBdKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGJhc2UgZGVwZW5kZW5jeSBvZiB0aGUgbG9hZGVyXHJcblx0ICovXHJcblx0cHVibGljIGdldCBiYXNlRGVwZW5kZW5jeSgpOlJlc291cmNlRGVwZW5kZW5jeVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9iYXNlRGVwZW5kZW5jeTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZSBhIG5ldyBSZXNvdXJjZUxvYWRTZXNzaW9uIG9iamVjdC5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihtYXRlcmlhbE1vZGU6bnVtYmVyID0gMClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuX21hdGVyaWFsTW9kZSA9IG1hdGVyaWFsTW9kZTtcclxuXHJcblx0XHR0aGlzLl9zdGFjayA9IG5ldyBBcnJheTxSZXNvdXJjZURlcGVuZGVuY3k+KCk7XHJcblx0XHR0aGlzLl9lcnJvckhhbmRsZXJzID0gbmV3IEFycmF5PEZ1bmN0aW9uPigpO1xyXG5cdFx0dGhpcy5fcGFyc2VFcnJvckhhbmRsZXJzID0gbmV3IEFycmF5PEZ1bmN0aW9uPigpO1xyXG5cclxuXHRcdHRoaXMuX29uUmVhZHlGb3JEZXBlbmRlbmNpZXNEZWxlZ2F0ZSA9IChldmVudDpQYXJzZXJFdmVudCkgPT4gdGhpcy5vblJlYWR5Rm9yRGVwZW5kZW5jaWVzKGV2ZW50KTtcclxuXHRcdHRoaXMuX29uUGFyc2VDb21wbGV0ZURlbGVnYXRlID0gKGV2ZW50OlBhcnNlckV2ZW50KSA9PiB0aGlzLm9uUGFyc2VDb21wbGV0ZShldmVudCk7XHJcblx0XHR0aGlzLl9vblBhcnNlRXJyb3JEZWxlZ2F0ZSA9IChldmVudDpQYXJzZXJFdmVudCkgPT4gdGhpcy5vblBhcnNlRXJyb3IoZXZlbnQpO1xyXG5cdFx0dGhpcy5fb25Mb2FkQ29tcGxldGVEZWxlZ2F0ZSA9IChldmVudDpFdmVudCkgPT4gdGhpcy5vbkxvYWRDb21wbGV0ZShldmVudCk7XHJcblx0XHR0aGlzLl9vbkxvYWRFcnJvckRlbGVnYXRlID0gKGV2ZW50OklPRXJyb3JFdmVudCkgPT4gdGhpcy5vbkxvYWRFcnJvcihldmVudCk7XHJcblx0XHR0aGlzLl9vblRleHR1cmVTaXplRXJyb3JEZWxlZ2F0ZSA9IChldmVudDpBc3NldEV2ZW50KSA9PiB0aGlzLm9uVGV4dHVyZVNpemVFcnJvcihldmVudCk7XHJcblx0XHR0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSA9IChldmVudDpBc3NldEV2ZW50KSA9PiB0aGlzLm9uQXNzZXRDb21wbGV0ZShldmVudCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkcyBhIGZpbGUgYW5kIChvcHRpb25hbGx5KSBhbGwgb2YgaXRzIGRlcGVuZGVuY2llcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSByZXEgVGhlIFVSTFJlcXVlc3Qgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIFVSTCBvZiB0aGUgZmlsZSB0byBiZSBsb2FkZWQuXHJcblx0ICogQHBhcmFtIGNvbnRleHQgQW4gb3B0aW9uYWwgY29udGV4dCBvYmplY3QgcHJvdmlkaW5nIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgbG9hZGluZ1xyXG5cdCAqIEBwYXJhbSBucyBBbiBvcHRpb25hbCBuYW1lc3BhY2Ugc3RyaW5nIHVuZGVyIHdoaWNoIHRoZSBmaWxlIGlzIHRvIGJlIGxvYWRlZCwgYWxsb3dpbmcgdGhlIGRpZmZlcmVudGlhdGlvbiBvZiB0d28gcmVzb3VyY2VzIHdpdGggaWRlbnRpY2FsIGFzc2V0c1xyXG5cdCAqIEBwYXJhbSBwYXJzZXIgQW4gb3B0aW9uYWwgcGFyc2VyIG9iamVjdCBmb3IgdHJhbnNsYXRpbmcgdGhlIGxvYWRlZCBkYXRhIGludG8gYSB1c2FibGUgcmVzb3VyY2UuIElmIG5vdCBwcm92aWRlZCwgQXNzZXRMb2FkZXIgd2lsbCBhdHRlbXB0IHRvIGF1dG8tZGV0ZWN0IHRoZSBmaWxlIHR5cGUuXHJcblx0ICovXHJcblx0cHVibGljIGxvYWQocmVxOlVSTFJlcXVlc3QsIGNvbnRleHQ6QXNzZXRMb2FkZXJDb250ZXh0ID0gbnVsbCwgbnM6c3RyaW5nID0gbnVsbCwgcGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKTpBc3NldExvYWRlclRva2VuXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl90b2tlbikge1xyXG5cdFx0XHR0aGlzLl90b2tlbiA9IG5ldyBBc3NldExvYWRlclRva2VuKHRoaXMpO1xyXG5cclxuXHRcdFx0dGhpcy5fdXJpID0gcmVxLnVybCA9IHJlcS51cmwucmVwbGFjZSgvXFxcXC9nLCBcIi9cIik7XHJcblx0XHRcdHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xyXG5cdFx0XHR0aGlzLl9uYW1lc3BhY2UgPSBucztcclxuXHJcblx0XHRcdHRoaXMuX2Jhc2VEZXBlbmRlbmN5ID0gbmV3IFJlc291cmNlRGVwZW5kZW5jeSgnJywgcmVxLCBudWxsLCBwYXJzZXIsIG51bGwpO1xyXG5cdFx0XHR0aGlzLnJldHJpZXZlRGVwZW5kZW5jeSh0aGlzLl9iYXNlRGVwZW5kZW5jeSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5fdG9rZW47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVE9ETzogVGhyb3cgZXJyb3IgKGFscmVhZHkgbG9hZGluZylcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgYSByZXNvdXJjZSBmcm9tIGFscmVhZHkgbG9hZGVkIGRhdGEuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSBvYmplY3QgY29udGFpbmluZyBhbGwgcmVzb3VyY2UgaW5mb3JtYXRpb24uXHJcblx0ICogQHBhcmFtIGNvbnRleHQgQW4gb3B0aW9uYWwgY29udGV4dCBvYmplY3QgcHJvdmlkaW5nIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgbG9hZGluZ1xyXG5cdCAqIEBwYXJhbSBucyBBbiBvcHRpb25hbCBuYW1lc3BhY2Ugc3RyaW5nIHVuZGVyIHdoaWNoIHRoZSBmaWxlIGlzIHRvIGJlIGxvYWRlZCwgYWxsb3dpbmcgdGhlIGRpZmZlcmVudGlhdGlvbiBvZiB0d28gcmVzb3VyY2VzIHdpdGggaWRlbnRpY2FsIGFzc2V0c1xyXG5cdCAqIEBwYXJhbSBwYXJzZXIgQW4gb3B0aW9uYWwgcGFyc2VyIG9iamVjdCBmb3IgdHJhbnNsYXRpbmcgdGhlIGxvYWRlZCBkYXRhIGludG8gYSB1c2FibGUgcmVzb3VyY2UuIElmIG5vdCBwcm92aWRlZCwgQXNzZXRMb2FkZXIgd2lsbCBhdHRlbXB0IHRvIGF1dG8tZGV0ZWN0IHRoZSBmaWxlIHR5cGUuXHJcblx0ICovXHJcblx0cHVibGljIGxvYWREYXRhKGRhdGE6YW55LCBpZDpzdHJpbmcsIGNvbnRleHQ6QXNzZXRMb2FkZXJDb250ZXh0ID0gbnVsbCwgbnM6c3RyaW5nID0gbnVsbCwgcGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKTpBc3NldExvYWRlclRva2VuXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl90b2tlbikge1xyXG5cdFx0XHR0aGlzLl90b2tlbiA9IG5ldyBBc3NldExvYWRlclRva2VuKHRoaXMpO1xyXG5cclxuXHRcdFx0dGhpcy5fdXJpID0gaWQ7XHJcblx0XHRcdHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xyXG5cdFx0XHR0aGlzLl9uYW1lc3BhY2UgPSBucztcclxuXHJcblx0XHRcdHRoaXMuX2Jhc2VEZXBlbmRlbmN5ID0gbmV3IFJlc291cmNlRGVwZW5kZW5jeShpZCwgbnVsbCwgZGF0YSwgcGFyc2VyLCBudWxsKTtcclxuXHRcdFx0dGhpcy5yZXRyaWV2ZURlcGVuZGVuY3kodGhpcy5fYmFzZURlcGVuZGVuY3kpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuX3Rva2VuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRPRE86IFRocm93IGVycm9yIChhbHJlYWR5IGxvYWRpbmcpXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlY3Vyc2l2ZWx5IHJldHJpZXZlcyB0aGUgbmV4dCB0by1iZS1sb2FkZWQgYW5kIHBhcnNlZCBkZXBlbmRlbmN5IG9uIHRoZSBzdGFjaywgb3IgcG9wcyB0aGUgbGlzdCBvZmYgdGhlXHJcblx0ICogc3RhY2sgd2hlbiBjb21wbGV0ZSBhbmQgY29udGludWVzIG9uIHRoZSB0b3Agc2V0LlxyXG5cdCAqIEBwYXJhbSBwYXJzZXIgVGhlIHBhcnNlciB0aGF0IHdpbGwgdHJhbnNsYXRlIHRoZSBkYXRhIGludG8gYSB1c2FibGUgcmVzb3VyY2UuXHJcblx0ICovXHJcblx0cHJpdmF0ZSByZXRyaWV2ZU5leHQocGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5kZXBlbmRlbmNpZXMubGVuZ3RoKSB7XHJcblxyXG5cdFx0XHR2YXIgbmV4dDpSZXNvdXJjZURlcGVuZGVuY3kgPSB0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5kZXBlbmRlbmNpZXMucG9wKCk7XHJcblxyXG5cdFx0XHR0aGlzLl9zdGFjay5wdXNoKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5KTtcclxuXHRcdFx0dGhpcy5yZXRyaWV2ZURlcGVuZGVuY3kobmV4dCk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICh0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5wYXJzZXIgJiYgdGhpcy5fY3VycmVudERlcGVuZGVuY3kucGFyc2VyLnBhcnNpbmdQYXVzZWQpIHtcclxuXHJcblx0XHRcdHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5LnBhcnNlci5faVJlc3VtZVBhcnNpbmdBZnRlckRlcGVuZGVuY2llcygpO1xyXG5cdFx0XHR0aGlzLl9zdGFjay5wb3AoKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuX3N0YWNrLmxlbmd0aCkge1xyXG5cclxuXHRcdFx0dmFyIHByZXY6UmVzb3VyY2VEZXBlbmRlbmN5ID0gdGhpcy5fY3VycmVudERlcGVuZGVuY3k7XHJcblxyXG5cdFx0XHR0aGlzLl9jdXJyZW50RGVwZW5kZW5jeSA9IHRoaXMuX3N0YWNrLnBvcCgpO1xyXG5cclxuXHRcdFx0aWYgKHByZXYuX2lTdWNjZXNzKVxyXG5cdFx0XHRcdHByZXYucmVzb2x2ZSgpO1xyXG5cclxuXHRcdFx0dGhpcy5yZXRyaWV2ZU5leHQocGFyc2VyKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IExvYWRlckV2ZW50KExvYWRlckV2ZW50LlJFU09VUkNFX0NPTVBMRVRFLCB0aGlzLl91cmksIHRoaXMuX2Jhc2VEZXBlbmRlbmN5LnBhcnNlci5jb250ZW50LCB0aGlzLl9iYXNlRGVwZW5kZW5jeS5hc3NldHMpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlcyBhIHNpbmdsZSBkZXBlbmRlbmN5LlxyXG5cdCAqIEBwYXJhbSBwYXJzZXIgVGhlIHBhcnNlciB0aGF0IHdpbGwgdHJhbnNsYXRlIHRoZSBkYXRhIGludG8gYSB1c2FibGUgcmVzb3VyY2UuXHJcblx0ICovXHJcblx0cHJpdmF0ZSByZXRyaWV2ZURlcGVuZGVuY3koZGVwZW5kZW5jeTpSZXNvdXJjZURlcGVuZGVuY3kpXHJcblx0e1xyXG5cdFx0dmFyIGRhdGE6YW55O1xyXG5cclxuXHRcdGlmICh0aGlzLl9jb250ZXh0ICYmIHRoaXMuX2NvbnRleHQubWF0ZXJpYWxNb2RlICE9IDApXHJcblx0XHRcdHRoaXMuX21hdGVyaWFsTW9kZSA9IHRoaXMuX2NvbnRleHQubWF0ZXJpYWxNb2RlO1xyXG5cclxuXHRcdHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5ID0gZGVwZW5kZW5jeTtcclxuXHJcblx0XHRkZXBlbmRlbmN5Ll9pTG9hZGVyID0gbmV3IFVSTExvYWRlcigpO1xyXG5cclxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoZGVwZW5kZW5jeS5faUxvYWRlcik7XHJcblxyXG5cdFx0Ly8gR2V0IGFscmVhZHkgbG9hZGVkIChvciBtYXBwZWQpIGRhdGEgaWYgYXZhaWxhYmxlXHJcblx0XHRkYXRhID0gZGVwZW5kZW5jeS5kYXRhO1xyXG5cclxuXHRcdGlmICh0aGlzLl9jb250ZXh0ICYmIGRlcGVuZGVuY3kucmVxdWVzdCAmJiB0aGlzLl9jb250ZXh0Ll9pSGFzRGF0YUZvclVybChkZXBlbmRlbmN5LnJlcXVlc3QudXJsKSlcclxuXHRcdFx0ZGF0YSA9IHRoaXMuX2NvbnRleHQuX2lHZXREYXRhRm9yVXJsKGRlcGVuZGVuY3kucmVxdWVzdC51cmwpO1xyXG5cclxuXHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdGlmIChkYXRhLmNvbnN0cnVjdG9yID09PSBGdW5jdGlvbilcclxuXHRcdFx0XHRkYXRhID0gbmV3IGRhdGEoKTtcclxuXHJcblx0XHRcdGRlcGVuZGVuY3kuX2lTZXREYXRhKGRhdGEpO1xyXG5cclxuXHRcdFx0aWYgKGRlcGVuZGVuY3kucmV0cmlldmVBc1Jhd0RhdGEpIHtcclxuXHRcdFx0XHQvLyBObyBuZWVkIHRvIHBhcnNlLiBUaGUgcGFyZW50IHBhcnNlciBpcyBleHBlY3RpbmcgdGhpc1xyXG5cdFx0XHRcdC8vIHRvIGJlIHJhdyBkYXRhIHNvIGl0IGNhbiBiZSBwYXNzZWQgZGlyZWN0bHkuXHJcblx0XHRcdFx0ZGVwZW5kZW5jeS5yZXNvbHZlKCk7XHJcblxyXG5cdFx0XHRcdC8vIE1vdmUgb24gdG8gbmV4dCBkZXBlbmRlbmN5XHJcblx0XHRcdFx0dGhpcy5yZXRyaWV2ZU5leHQoKTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5wYXJzZURlcGVuZGVuY3koZGVwZW5kZW5jeSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBSZXNvbHZlIFVSTCBhbmQgc3RhcnQgbG9hZGluZ1xyXG5cdFx0XHRkZXBlbmRlbmN5LnJlcXVlc3QudXJsID0gdGhpcy5yZXNvbHZlRGVwZW5kZW5jeVVybChkZXBlbmRlbmN5KTtcclxuXHJcblx0XHRcdGlmIChkZXBlbmRlbmN5LnJldHJpZXZlQXNSYXdEYXRhKSB7XHJcblx0XHRcdFx0Ly8gQWx3YXlzIHVzZSBiaW5hcnkgZm9yIHJhdyBkYXRhIGxvYWRpbmdcclxuXHRcdFx0XHRkZXBlbmRlbmN5Ll9pTG9hZGVyLmRhdGFGb3JtYXQgPSBVUkxMb2FkZXJEYXRhRm9ybWF0LkJJTkFSWTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0aWYgKCFkZXBlbmRlbmN5LnBhcnNlcilcclxuXHRcdFx0XHRcdGRlcGVuZGVuY3kuX2lTZXRQYXJzZXIodGhpcy5nZXRQYXJzZXJGcm9tU3VmZml4KGRlcGVuZGVuY3kucmVxdWVzdC51cmwpKTtcclxuXHJcblx0XHRcdFx0aWYgKGRlcGVuZGVuY3kucGFyc2VyKSB7XHJcblx0XHRcdFx0XHRkZXBlbmRlbmN5Ll9pTG9hZGVyLmRhdGFGb3JtYXQgPSBkZXBlbmRlbmN5LnBhcnNlci5kYXRhRm9ybWF0O1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBBbHdheXMgdXNlIEJJTkFSWSBmb3IgdW5rbm93biBmaWxlIGZvcm1hdHMuIFRoZSB0aG9yb3VnaFxyXG5cdFx0XHRcdFx0Ly8gZmlsZSB0eXBlIGNoZWNrIHdpbGwgZGV0ZXJtaW5lIGZvcm1hdCBhZnRlciBsb2FkLCBhbmQgaWZcclxuXHRcdFx0XHRcdC8vIGJpbmFyeSwgYSB0ZXh0IGxvYWQgd2lsbCBoYXZlIGJyb2tlbiB0aGUgZmlsZSBkYXRhLlxyXG5cdFx0XHRcdFx0ZGVwZW5kZW5jeS5faUxvYWRlci5kYXRhRm9ybWF0ID0gVVJMTG9hZGVyRGF0YUZvcm1hdC5CSU5BUlk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkZXBlbmRlbmN5Ll9pTG9hZGVyLmxvYWQoZGVwZW5kZW5jeS5yZXF1ZXN0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgam9pblVybChiYXNlOnN0cmluZywgZW5kOnN0cmluZyk6c3RyaW5nXHJcblx0e1xyXG5cdFx0aWYgKGVuZC5jaGFyQXQoMCkgPT0gJy8nKVxyXG5cdFx0XHRlbmQgPSBlbmQuc3Vic3RyKDEpO1xyXG5cclxuXHRcdGlmIChiYXNlLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm4gZW5kO1xyXG5cclxuXHRcdGlmIChiYXNlLmNoYXJBdChiYXNlLmxlbmd0aCAtIDEpID09ICcvJylcclxuXHRcdFx0YmFzZSA9IGJhc2Uuc3Vic3RyKDAsIGJhc2UubGVuZ3RoIC0gMSk7XHJcblxyXG5cdFx0cmV0dXJuIGJhc2UuY29uY2F0KCcvJywgZW5kKTtcclxuXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJlc29sdmVEZXBlbmRlbmN5VXJsKGRlcGVuZGVuY3k6UmVzb3VyY2VEZXBlbmRlbmN5KTpzdHJpbmdcclxuXHR7XHJcblx0XHR2YXIgc2NoZW1lX3JlOlJlZ0V4cDtcclxuXHRcdHZhciBiYXNlOnN0cmluZztcclxuXHRcdHZhciB1cmw6c3RyaW5nID0gZGVwZW5kZW5jeS5yZXF1ZXN0LnVybDtcclxuXHJcblx0XHQvLyBIYXMgdGhlIHVzZXIgcmUtbWFwcGVkIHRoaXMgVVJMP1xyXG5cdFx0aWYgKHRoaXMuX2NvbnRleHQgJiYgdGhpcy5fY29udGV4dC5faUhhc01hcHBpbmdGb3JVcmwodXJsKSlcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2NvbnRleHQuX2lHZXRSZW1hcHBlZFVybCh1cmwpO1xyXG5cclxuXHRcdC8vIFRoaXMgaXMgdGhlIFwiYmFzZVwiIGRlcGVuZGVuY3ksIGkuZS4gdGhlIGFjdHVhbCByZXF1ZXN0ZWQgYXNzZXQuXHJcblx0XHQvLyBXZSB3aWxsIG5vdCB0cnkgdG8gcmVzb2x2ZSB0aGlzIHNpbmNlIHRoZSB1c2VyIGNhbiBwcm9iYWJseSBiZVxyXG5cdFx0Ly8gdGhydXN0ZWQgdG8ga25vdyB0aGlzIFVSTCBiZXR0ZXIgdGhhbiBvdXIgYXV0b21hdGljIHJlc29sdmVyLiA6KVxyXG5cdFx0aWYgKHVybCA9PSB0aGlzLl91cmkpXHJcblx0XHRcdHJldHVybiB1cmw7XHJcblxyXG5cclxuXHRcdC8vIEFic29sdXRlIFVSTD8gQ2hlY2sgaWYgc3RhcnRzIHdpdGggc2xhc2ggb3IgYSBVUkxcclxuXHRcdC8vIHNjaGVtZSBkZWZpbml0aW9uIChlLmcuIGZ0cDovLywgaHR0cDovLywgZmlsZTovLylcclxuXHRcdHNjaGVtZV9yZSA9IG5ldyBSZWdFeHAoJy9eW2EtekEtWl17Myw0fTpcXC9cXC8vJyk7XHJcblxyXG5cdFx0aWYgKHVybC5jaGFyQXQoMCkgPT0gJy8nKSB7XHJcblx0XHRcdGlmICh0aGlzLl9jb250ZXh0ICYmIHRoaXMuX2NvbnRleHQub3ZlcnJpZGVBYnNvbHV0ZVBhdGhzKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmpvaW5VcmwodGhpcy5fY29udGV4dC5kZXBlbmRlbmN5QmFzZVVybCwgdXJsKTsgZWxzZVxyXG5cdFx0XHRcdHJldHVybiB1cmw7XHJcblx0XHR9IGVsc2UgaWYgKHNjaGVtZV9yZS50ZXN0KHVybCkpIHtcclxuXHRcdFx0Ly8gSWYgb3ZlcnJpZGluZyBmdWxsIFVSTHMsIGdldCByaWQgb2Ygc2NoZW1lIChlLmcuIFwiaHR0cDovL1wiKVxyXG5cdFx0XHQvLyBhbmQgcmVwbGFjZSB3aXRoIHRoZSBkZXBlbmRlbmN5QmFzZVVybCBkZWZpbmVkIGJ5IHVzZXIuXHJcblx0XHRcdGlmICh0aGlzLl9jb250ZXh0ICYmIHRoaXMuX2NvbnRleHQub3ZlcnJpZGVGdWxsVVJMcykge1xyXG5cclxuXHRcdFx0XHR2YXIgbm9zY2hlbWVfdXJsIDogc3RyaW5nICA9IHVybC5yZXBsYWNlKCBzY2hlbWVfcmUgLCAnJyApOy8vdXJsWydyZXBsYWNlJ10oc2NoZW1lX3JlKTtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5qb2luVXJsKHRoaXMuX2NvbnRleHQuZGVwZW5kZW5jeUJhc2VVcmwsIDxzdHJpbmc+IG5vc2NoZW1lX3VybCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBTaW5jZSBub3QgYWJzb2x1dGUsIGp1c3QgZ2V0IHJpZCBvZiBiYXNlIGZpbGUgbmFtZSB0byBmaW5kIGl0J3NcclxuXHRcdC8vIGZvbGRlciBhbmQgdGhlbiBjb25jYXRlbmF0ZSBkeW5hbWljIFVSTFxyXG5cdFx0aWYgKHRoaXMuX2NvbnRleHQgJiYgdGhpcy5fY29udGV4dC5kZXBlbmRlbmN5QmFzZVVybCkge1xyXG5cdFx0XHRiYXNlID0gdGhpcy5fY29udGV4dC5kZXBlbmRlbmN5QmFzZVVybDtcclxuXHRcdFx0cmV0dXJuIHRoaXMuam9pblVybChiYXNlLCB1cmwpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0YmFzZSA9IHRoaXMuX3VyaS5zdWJzdHJpbmcoMCwgdGhpcy5fdXJpLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuam9pblVybChiYXNlLCB1cmwpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSByZXRyaWV2ZVBhcnNlckRlcGVuZGVuY2llcygpXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9jdXJyZW50RGVwZW5kZW5jeSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHZhciBwYXJzZXJEZXBlbmRhbmNpZXMgPSB0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5wYXJzZXIuZGVwZW5kZW5jaWVzXHJcblx0XHR2YXIgaTpudW1iZXIsIGxlbjpudW1iZXIgPSBwYXJzZXJEZXBlbmRhbmNpZXMubGVuZ3RoO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fY3VycmVudERlcGVuZGVuY3kuZGVwZW5kZW5jaWVzW2ldID0gcGFyc2VyRGVwZW5kYW5jaWVzW2ldO1xyXG5cclxuXHJcblx0XHQvLyBTaW5jZSBtb3JlIGRlcGVuZGVuY2llcyBtaWdodCBiZSBhZGRlZCBldmVudHVhbGx5LCBlbXB0eSB0aGlzXHJcblx0XHQvLyBsaXN0IHNvIHRoYXQgdGhlIHNhbWUgZGVwZW5kZW5jeSBpc24ndCByZXRyaWV2ZWQgbW9yZSB0aGFuIG9uY2UuXHJcblx0XHRwYXJzZXJEZXBlbmRhbmNpZXMubGVuZ3RoID0gMDtcclxuXHJcblx0XHR0aGlzLl9zdGFjay5wdXNoKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5KTtcclxuXHJcblx0XHR0aGlzLnJldHJpZXZlTmV4dCgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSByZXNvbHZlUGFyc2VyRGVwZW5kZW5jaWVzKClcclxuXHR7XHJcblx0XHR0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5faVN1Y2Nlc3MgPSB0cnVlO1xyXG5cclxuXHRcdC8vIFJldHJpZXZlIGFueSBsYXN0IGRlcGVuZGVuY2llcyByZW1haW5pbmcgb24gdGhpcyBwYXJzZXIsIG9yXHJcblx0XHQvLyBpZiBub25lIGV4aXN0cywganVzdCBtb3ZlIG9uLlxyXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5LnBhcnNlciAmJiB0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5wYXJzZXIuZGVwZW5kZW5jaWVzLmxlbmd0aCAmJiAoIXRoaXMuX2NvbnRleHQgfHwgdGhpcy5fY29udGV4dC5pbmNsdWRlRGVwZW5kZW5jaWVzKSkvL2NvbnRleHQgbWF5IGJlIG51bGxcclxuXHRcdFx0dGhpcy5yZXRyaWV2ZVBhcnNlckRlcGVuZGVuY2llcygpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLnJldHJpZXZlTmV4dCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbGVkIHdoZW4gYSBzaW5nbGUgZGVwZW5kZW5jeSBsb2FkaW5nIGZhaWxlZCwgYW5kIHB1c2hlcyBmdXJ0aGVyIGRlcGVuZGVuY2llcyBvbnRvIHRoZSBzdGFjay5cclxuXHQgKiBAcGFyYW0gZXZlbnRcclxuXHQgKi9cclxuXHRwcml2YXRlIG9uTG9hZEVycm9yKGV2ZW50OklPRXJyb3JFdmVudClcclxuXHR7XHJcblx0XHR2YXIgaGFuZGxlZDpib29sZWFuO1xyXG5cdFx0dmFyIGlzRGVwZW5kZW5jeTpib29sZWFuID0gKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5ICE9IHRoaXMuX2Jhc2VEZXBlbmRlbmN5KTtcclxuXHRcdHZhciBsb2FkZXI6VVJMTG9hZGVyID0gPFVSTExvYWRlcj4gZXZlbnQudGFyZ2V0Oy8vVE9ETzoga2VlcCBvbiBleWUgb24gdGhpcyBvbmVcclxuXHJcblx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKGxvYWRlcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuaGFzRXZlbnRMaXN0ZW5lcihJT0Vycm9yRXZlbnQuSU9fRVJST1IgKSkge1xyXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cdFx0XHRoYW5kbGVkID0gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIFRPRE86IENvbnNpZGVyIG5vdCBkb2luZyB0aGlzIGV2ZW4gd2hlbiBBc3NldExvYWRlciBkb2VzIGhhdmUgaXQncyBvd24gTE9BRF9FUlJPUiBsaXN0ZW5lclxyXG5cdFx0XHR2YXIgaTpudW1iZXIsIGxlbjpudW1iZXIgPSB0aGlzLl9lcnJvckhhbmRsZXJzLmxlbmd0aDtcclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHRcdGlmICghaGFuZGxlZClcclxuXHRcdFx0XHRcdGhhbmRsZWQgPSA8Ym9vbGVhbj4gdGhpcy5fZXJyb3JIYW5kbGVyc1tpXShldmVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGhhbmRsZWQpIHtcclxuXHJcblx0XHRcdC8vaWYgKGlzRGVwZW5kZW5jeSAmJiAhIGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcblx0XHRcdGlmIChpc0RlcGVuZGVuY3kpIHsgLy8gVE9ETzogSlMgLyBBUzMgQ2hhbmdlIC0gd2UgZG9uJ3QgaGF2ZSBpc0RlZmF1bHRQcmV2ZW50ZWQgLSBzbyB3aWxsIHRoaXMgd29ya1xyXG5cclxuXHRcdFx0XHR0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5yZXNvbHZlRmFpbHVyZSgpO1xyXG5cdFx0XHRcdHRoaXMucmV0cmlldmVOZXh0KCk7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIEVpdGhlciB0aGlzIHdhcyB0aGUgYmFzZSBmaWxlIChsYXN0IGxlZnQgaW4gdGhlIHN0YWNrKSBvclxyXG5cdFx0XHRcdC8vIGRlZmF1bHQgYmVoYXZpb3Igd2FzIHByZXZlbnRlZCBieSB0aGUgaGFuZGxlcnMsIGFuZCBoZW5jZVxyXG5cdFx0XHRcdC8vIHRoZXJlIGlzIG5vdGhpbmcgbW9yZSB0byBkbyB0aGFuIGNsZWFuIHVwIGFuZCBiYWlsLlxyXG5cdFx0XHRcdHRoaXMuZGlzcG9zZSgpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdC8vIEVycm9yIGV2ZW50IHdhcyBub3QgaGFuZGxlZCBieSBsaXN0ZW5lcnMgZGlyZWN0bHkgb24gQXNzZXRMb2FkZXIgb3JcclxuXHRcdFx0Ly8gb24gYW55IG9mIHRoZSBzdWJzY3JpYmVkIGxvYWRlcnMgKGluIHRoZSBsaXN0IG9mIGVycm9yIGhhbmRsZXJzLilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxsZWQgd2hlbiBhIGRlcGVuZGVuY3kgcGFyc2luZyBmYWlsZWQsIGFuZCBkaXNwYXRjaGVzIGEgPGNvZGU+UGFyc2VyRXZlbnQuUEFSU0VfRVJST1I8L2NvZGU+XHJcblx0ICogQHBhcmFtIGV2ZW50XHJcblx0ICovXHJcblx0cHJpdmF0ZSBvblBhcnNlRXJyb3IoZXZlbnQ6UGFyc2VyRXZlbnQpXHJcblx0e1xyXG5cdFx0dmFyIGhhbmRsZWQ6Ym9vbGVhbjtcclxuXHJcblx0XHR2YXIgaXNEZXBlbmRlbmN5OmJvb2xlYW4gPSAodGhpcy5fY3VycmVudERlcGVuZGVuY3kgIT0gdGhpcy5fYmFzZURlcGVuZGVuY3kpO1xyXG5cclxuXHRcdHZhciBsb2FkZXI6VVJMTG9hZGVyID0gPFVSTExvYWRlcj5ldmVudC50YXJnZXQ7XHJcblxyXG5cdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVycyhsb2FkZXIpO1xyXG5cclxuXHRcdGlmICh0aGlzLmhhc0V2ZW50TGlzdGVuZXIoUGFyc2VyRXZlbnQuUEFSU0VfRVJST1IpKSB7XHJcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblx0XHRcdGhhbmRsZWQgPSB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gVE9ETzogQ29uc2lkZXIgbm90IGRvaW5nIHRoaXMgZXZlbiB3aGVuIEFzc2V0TG9hZGVyIGRvZXNcclxuXHRcdFx0Ly8gaGF2ZSBpdCdzIG93biBMT0FEX0VSUk9SIGxpc3RlbmVyXHJcblx0XHRcdHZhciBpOm51bWJlciwgbGVuOm51bWJlciA9IHRoaXMuX3BhcnNlRXJyb3JIYW5kbGVycy5sZW5ndGg7XHJcblxyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdFx0aWYgKCFoYW5kbGVkKVxyXG5cdFx0XHRcdFx0aGFuZGxlZCA9IDxib29sZWFuPiB0aGlzLl9wYXJzZUVycm9ySGFuZGxlcnNbaV0oZXZlbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChoYW5kbGVkKSB7XHJcblx0XHRcdHRoaXMuZGlzcG9zZSgpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBFcnJvciBldmVudCB3YXMgbm90IGhhbmRsZWQgYnkgbGlzdGVuZXJzIGRpcmVjdGx5IG9uIEFzc2V0TG9hZGVyIG9yXHJcblx0XHRcdC8vIG9uIGFueSBvZiB0aGUgc3Vic2NyaWJlZCBsb2FkZXJzIChpbiB0aGUgbGlzdCBvZiBlcnJvciBoYW5kbGVycy4pXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihldmVudC5tZXNzYWdlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25Bc3NldENvbXBsZXRlKGV2ZW50OkFzc2V0RXZlbnQpXHJcblx0e1xyXG5cdFx0Ly8gQWRkIGxvYWRlZCBhc3NldCB0byBsaXN0IG9mIGFzc2V0cyByZXRyaWV2ZWQgYXMgcGFydFxyXG5cdFx0Ly8gb2YgdGhlIGN1cnJlbnQgZGVwZW5kZW5jeS4gVGhpcyBsaXN0IHdpbGwgYmUgaW5zcGVjdGVkXHJcblx0XHQvLyBieSB0aGUgcGFyZW50IHBhcnNlciB3aGVuIGRlcGVuZGVuY3kgaXMgcmVzb2x2ZWRcclxuXHRcdGlmICh0aGlzLl9jdXJyZW50RGVwZW5kZW5jeSlcclxuXHRcdFx0dGhpcy5fY3VycmVudERlcGVuZGVuY3kuYXNzZXRzLnB1c2goZXZlbnQuYXNzZXQpO1xyXG5cclxuXHRcdGV2ZW50LmFzc2V0LnJlc2V0QXNzZXRQYXRoKGV2ZW50LmFzc2V0Lm5hbWUsIHRoaXMuX25hbWVzcGFjZSk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5zdXBwcmVzQXNzZXRFdmVudHMpXHJcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uUmVhZHlGb3JEZXBlbmRlbmNpZXMoZXZlbnQ6UGFyc2VyRXZlbnQpXHJcblx0e1xyXG5cdFx0dmFyIHBhcnNlcjpQYXJzZXJCYXNlID0gPFBhcnNlckJhc2U+IGV2ZW50LnRhcmdldDtcclxuXHJcblx0XHRpZiAodGhpcy5fY29udGV4dCAmJiAhdGhpcy5fY29udGV4dC5pbmNsdWRlRGVwZW5kZW5jaWVzKVxyXG5cdFx0XHRwYXJzZXIuX2lSZXN1bWVQYXJzaW5nQWZ0ZXJEZXBlbmRlbmNpZXMoKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5yZXRyaWV2ZVBhcnNlckRlcGVuZGVuY2llcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbGVkIHdoZW4gYSBzaW5nbGUgZGVwZW5kZW5jeSB3YXMgcGFyc2VkLCBhbmQgcHVzaGVzIGZ1cnRoZXIgZGVwZW5kZW5jaWVzIG9udG8gdGhlIHN0YWNrLlxyXG5cdCAqIEBwYXJhbSBldmVudFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb25Mb2FkQ29tcGxldGUoZXZlbnQ6RXZlbnQpXHJcblx0e1xyXG5cdFx0dmFyIGxvYWRlcjpVUkxMb2FkZXIgPSA8VVJMTG9hZGVyPiBldmVudC50YXJnZXQ7XHJcblxyXG5cdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVycyhsb2FkZXIpO1xyXG5cclxuXHRcdC8vIFJlc29sdmUgdGhpcyBkZXBlbmRlbmN5XHJcblx0XHR0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5faVNldERhdGEobG9hZGVyLmRhdGEpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5yZXRyaWV2ZUFzUmF3RGF0YSkge1xyXG5cdFx0XHQvLyBObyBuZWVkIHRvIHBhcnNlIHRoaXMgZGF0YSwgd2hpY2ggc2hvdWxkIGJlIHJldHVybmVkIGFzIGlzXHJcblx0XHRcdHRoaXMucmVzb2x2ZVBhcnNlckRlcGVuZGVuY2llcygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5wYXJzZURlcGVuZGVuY3kodGhpcy5fY3VycmVudERlcGVuZGVuY3kpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbGVkIHdoZW4gcGFyc2luZyBpcyBjb21wbGV0ZS5cclxuXHQgKi9cclxuXHRwcml2YXRlIG9uUGFyc2VDb21wbGV0ZShldmVudDpQYXJzZXJFdmVudCk6dm9pZFxyXG5cdHtcclxuXHRcdHZhciBwYXJzZXI6UGFyc2VyQmFzZSA9IDxQYXJzZXJCYXNlPiBldmVudC50YXJnZXQ7XHJcblxyXG5cdFx0dGhpcy5yZXNvbHZlUGFyc2VyRGVwZW5kZW5jaWVzKCk7Ly9yZXNvbHZlIGluIGZyb250IG9mIHJlbW92aW5nIGxpc3RlbmVycyB0byBhbGxvdyBhbnkgcmVtYWluaW5nIGFzc2V0IGV2ZW50cyB0byBwcm9wYWdhdGVcclxuXHJcblx0XHRwYXJzZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihQYXJzZXJFdmVudC5SRUFEWV9GT1JfREVQRU5ERU5DSUVTLCB0aGlzLl9vblJlYWR5Rm9yRGVwZW5kZW5jaWVzRGVsZWdhdGUpO1xyXG5cdFx0cGFyc2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoUGFyc2VyRXZlbnQuUEFSU0VfQ09NUExFVEUsIHRoaXMuX29uUGFyc2VDb21wbGV0ZURlbGVnYXRlKTtcclxuXHRcdHBhcnNlci5yZW1vdmVFdmVudExpc3RlbmVyKFBhcnNlckV2ZW50LlBBUlNFX0VSUk9SLCB0aGlzLl9vblBhcnNlRXJyb3JEZWxlZ2F0ZSk7XHJcblx0XHRwYXJzZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LlRFWFRVUkVfU0laRV9FUlJPUiwgdGhpcy5fb25UZXh0dXJlU2l6ZUVycm9yRGVsZWdhdGUpO1xyXG5cdFx0cGFyc2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSwgdGhpcy5fb25Bc3NldENvbXBsZXRlRGVsZWdhdGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbGVkIHdoZW4gYW4gaW1hZ2UgaXMgdG9vIGxhcmdlIG9yIGl0J3MgZGltZW5zaW9ucyBhcmUgbm90IGEgcG93ZXIgb2YgMlxyXG5cdCAqIEBwYXJhbSBldmVudFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb25UZXh0dXJlU2l6ZUVycm9yKGV2ZW50OkFzc2V0RXZlbnQpXHJcblx0e1xyXG5cdFx0ZXZlbnQuYXNzZXQubmFtZSA9IHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5LnJlc29sdmVOYW1lKGV2ZW50LmFzc2V0KTtcclxuXHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBhZGRFdmVudExpc3RlbmVycyhsb2FkZXI6VVJMTG9hZGVyKVxyXG5cdHtcclxuXHRcdGxvYWRlci5hZGRFdmVudExpc3RlbmVyKEV2ZW50LkNPTVBMRVRFLCB0aGlzLl9vbkxvYWRDb21wbGV0ZURlbGVnYXRlKTtcclxuXHRcdGxvYWRlci5hZGRFdmVudExpc3RlbmVyKElPRXJyb3JFdmVudC5JT19FUlJPUiwgdGhpcy5fb25Mb2FkRXJyb3JEZWxlZ2F0ZSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJlbW92ZUV2ZW50TGlzdGVuZXJzKGxvYWRlcjpVUkxMb2FkZXIpXHJcblx0e1xyXG5cdFx0bG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoRXZlbnQuQ09NUExFVEUsIHRoaXMuX29uTG9hZENvbXBsZXRlRGVsZWdhdGUpO1xyXG5cdFx0bG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoSU9FcnJvckV2ZW50LklPX0VSUk9SLCB0aGlzLl9vbkxvYWRFcnJvckRlbGVnYXRlKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdG9wKClcclxuXHR7XHJcblx0XHR0aGlzLmRpc3Bvc2UoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZGlzcG9zZSgpXHJcblx0e1xyXG5cdFx0dGhpcy5fZXJyb3JIYW5kbGVycyA9IG51bGw7XHJcblx0XHR0aGlzLl9wYXJzZUVycm9ySGFuZGxlcnMgPSBudWxsO1xyXG5cdFx0dGhpcy5fY29udGV4dCA9IG51bGw7XHJcblx0XHR0aGlzLl90b2tlbiA9IG51bGw7XHJcblx0XHR0aGlzLl9zdGFjayA9IG51bGw7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5ICYmIHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5Ll9pTG9hZGVyKVxyXG5cdFx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5Ll9pTG9hZGVyKTtcclxuXHJcblx0XHR0aGlzLl9jdXJyZW50RGVwZW5kZW5jeSA9IG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGJ5IG90aGVyIGxvYWRlciBjbGFzc2VzIChlLmcuIExvYWRlcjNEIGFuZCBBc3NldExpYnJhcnlCdW5kbGUpIHRvXHJcblx0ICogYWRkIGVycm9yIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgQXNzZXRMb2FkZXIgaW5zdGFuY2UuIFRoaXMgc3lzdGVtIGlzIHVzZWQgaW5zdGVhZCBvZlxyXG5cdCAqIHRoZSByZWd1bGFyIEV2ZW50RGlzcGF0Y2hlciBzeXN0ZW0gc28gdGhhdCB0aGUgQXNzZXRMaWJyYXJ5IGVycm9yIGhhbmRsZXIgY2FuIGJlIHN1cmVcclxuXHQgKiB0aGF0IGlmIGhhc0V2ZW50TGlzdGVuZXIoKSByZXR1cm5zIHRydWUsIGl0J3MgY2xpZW50IGNvZGUgdGhhdCdzIGxpc3RlbmluZyBmb3IgdGhlXHJcblx0ICogZXZlbnQuIFNlY29uZGx5LCBmdW5jdGlvbnMgYWRkZWQgYXMgZXJyb3IgaGFuZGxlciB0aHJvdWdoIHRoaXMgY3VzdG9tIG1ldGhvZCBhcmVcclxuXHQgKiBleHBlY3RlZCB0byByZXR1cm4gYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgZXZlbnQgd2FzIGhhbmRsZWQgKGkuZS5cclxuXHQgKiB3aGV0aGVyIHRoZXkgaW4gdHVybiBoYWQgYW55IGNsaWVudCBjb2RlIGxpc3RlbmluZyBmb3IgdGhlIGV2ZW50LikgSWYgbm8gaGFuZGxlcnNcclxuXHQgKiByZXR1cm4gdHJ1ZSwgdGhlIEFzc2V0TG9hZGVyIGtub3dzIHRoYXQgdGhlIGV2ZW50IHdhc24ndCBoYW5kbGVkIGFuZCB3aWxsIHRocm93IGFuIFJURS5cclxuXHQgKi9cclxuXHJcblx0cHVibGljIF9pQWRkUGFyc2VFcnJvckhhbmRsZXIoaGFuZGxlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcGFyc2VFcnJvckhhbmRsZXJzLmluZGV4T2YoaGFuZGxlcikgPCAwKVxyXG5cdFx0XHR0aGlzLl9wYXJzZUVycm9ySGFuZGxlcnMucHVzaChoYW5kbGVyKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUFkZEVycm9ySGFuZGxlcihoYW5kbGVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9lcnJvckhhbmRsZXJzLmluZGV4T2YoaGFuZGxlcikgPCAwKVxyXG5cdFx0XHR0aGlzLl9lcnJvckhhbmRsZXJzLnB1c2goaGFuZGxlcik7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogR3Vlc3NlcyB0aGUgcGFyc2VyIHRvIGJlIHVzZWQgYmFzZWQgb24gdGhlIGZpbGUgY29udGVudHMuXHJcblx0ICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gYmUgcGFyc2VkLlxyXG5cdCAqIEBwYXJhbSB1cmkgVGhlIHVybCBvciBpZCBvZiB0aGUgb2JqZWN0IHRvIGJlIHBhcnNlZC5cclxuXHQgKiBAcmV0dXJuIEFuIGluc3RhbmNlIG9mIHRoZSBndWVzc2VkIHBhcnNlci5cclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFBhcnNlckZyb21EYXRhKGRhdGE6YW55KTpQYXJzZXJCYXNlXHJcblx0e1xyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSBBc3NldExvYWRlci5fcGFyc2Vycy5sZW5ndGg7XHJcblxyXG5cdFx0Ly8gZ28gaW4gcmV2ZXJzZSBvcmRlciB0byBhbGxvdyBhcHBsaWNhdGlvbiBvdmVycmlkZSBvZiBkZWZhdWx0IHBhcnNlciBhZGRlZCBpbiBhd2F5LnByb3BlclxyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSBsZW4gLSAxOyBpID49IDA7IGktLSlcclxuXHRcdFx0aWYgKEFzc2V0TG9hZGVyLl9wYXJzZXJzW2ldLnN1cHBvcnRzRGF0YShkYXRhKSlcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEFzc2V0TG9hZGVyLl9wYXJzZXJzW2ldKCk7XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhdGVzIHBhcnNpbmcgb2YgdGhlIGxvYWRlZCBkZXBlbmRlbmN5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIFRoZSBkZXBlbmRlbmN5IHRvIGJlIHBhcnNlZC5cclxuXHQgKi9cclxuXHRwcml2YXRlIHBhcnNlRGVwZW5kZW5jeShkZXBlbmRlbmN5OlJlc291cmNlRGVwZW5kZW5jeSk6dm9pZFxyXG5cdHtcclxuXHRcdHZhciBwYXJzZXI6UGFyc2VyQmFzZSA9IGRlcGVuZGVuY3kucGFyc2VyO1xyXG5cclxuXHRcdC8vIElmIG5vIHBhcnNlciBoYXMgYmVlbiBkZWZpbmVkLCB0cnkgdG8gZmluZCBvbmUgYnkgbGV0dGluZ1xyXG5cdFx0Ly8gYWxsIHBsdWdnZWQgaW4gcGFyc2VycyBpbnNwZWN0IHRoZSBhY3R1YWwgZGF0YS5cclxuXHRcdGlmICghcGFyc2VyKVxyXG5cdFx0XHRkZXBlbmRlbmN5Ll9pU2V0UGFyc2VyKHBhcnNlciA9IHRoaXMuZ2V0UGFyc2VyRnJvbURhdGEoZGVwZW5kZW5jeS5kYXRhKSk7XHJcblxyXG5cdFx0aWYgKHBhcnNlcikge1xyXG5cdFx0XHRwYXJzZXIuYWRkRXZlbnRMaXN0ZW5lcihQYXJzZXJFdmVudC5SRUFEWV9GT1JfREVQRU5ERU5DSUVTLCB0aGlzLl9vblJlYWR5Rm9yRGVwZW5kZW5jaWVzRGVsZWdhdGUpO1xyXG5cdFx0XHRwYXJzZXIuYWRkRXZlbnRMaXN0ZW5lcihQYXJzZXJFdmVudC5QQVJTRV9DT01QTEVURSwgdGhpcy5fb25QYXJzZUNvbXBsZXRlRGVsZWdhdGUpO1xyXG5cdFx0XHRwYXJzZXIuYWRkRXZlbnRMaXN0ZW5lcihQYXJzZXJFdmVudC5QQVJTRV9FUlJPUiwgdGhpcy5fb25QYXJzZUVycm9yRGVsZWdhdGUpO1xyXG5cdFx0XHRwYXJzZXIuYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LlRFWFRVUkVfU0laRV9FUlJPUiwgdGhpcy5fb25UZXh0dXJlU2l6ZUVycm9yRGVsZWdhdGUpO1xyXG5cdFx0XHRwYXJzZXIuYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCB0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSk7XHJcblxyXG5cdFx0XHRpZiAoZGVwZW5kZW5jeS5yZXF1ZXN0ICYmIGRlcGVuZGVuY3kucmVxdWVzdC51cmwpXHJcblx0XHRcdFx0cGFyc2VyLl9pRmlsZU5hbWUgPSBkZXBlbmRlbmN5LnJlcXVlc3QudXJsO1xyXG5cclxuXHRcdFx0cGFyc2VyLm1hdGVyaWFsTW9kZSA9IHRoaXMuX21hdGVyaWFsTW9kZTtcclxuXHJcblx0XHRcdHBhcnNlci5wYXJzZUFzeW5jKGRlcGVuZGVuY3kuZGF0YSk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIG1lc3NhZ2U6c3RyaW5nID0gXCJObyBwYXJzZXIgZGVmaW5lZC4gVG8gZW5hYmxlIGFsbCBwYXJzZXJzIGZvciBhdXRvLWRldGVjdGlvbiwgdXNlIFBhcnNlcnMuZW5hYmxlQWxsQnVuZGxlZCgpXCJcclxuXHRcdFx0aWYodGhpcy5oYXNFdmVudExpc3RlbmVyKFBhcnNlckV2ZW50LlBBUlNFX0VSUk9SKSlcclxuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFBhcnNlckV2ZW50KFBhcnNlckV2ZW50LlBBUlNFX0VSUk9SLCBtZXNzYWdlKSk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHdWVzc2VzIHRoZSBwYXJzZXIgdG8gYmUgdXNlZCBiYXNlZCBvbiB0aGUgZmlsZSBleHRlbnNpb24uXHJcblx0ICogQHJldHVybiBBbiBpbnN0YW5jZSBvZiB0aGUgZ3Vlc3NlZCBwYXJzZXIuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRQYXJzZXJGcm9tU3VmZml4KHVybDpzdHJpbmcpOlBhcnNlckJhc2VcclxuXHR7XHJcblx0XHQvLyBHZXQgcmlkIG9mIHF1ZXJ5IHN0cmluZyBpZiBhbnkgYW5kIGV4dHJhY3QgZXh0ZW5zaW9uXHJcblx0XHR2YXIgYmFzZTpzdHJpbmcgPSAodXJsLmluZGV4T2YoJz8nKSA+IDApPyB1cmwuc3BsaXQoJz8nKVswXSA6IHVybDtcclxuXHRcdHZhciBmaWxlRXh0ZW5zaW9uOnN0cmluZyA9IGJhc2Uuc3Vic3RyKGJhc2UubGFzdEluZGV4T2YoJy4nKSArIDEpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSBBc3NldExvYWRlci5fcGFyc2Vycy5sZW5ndGg7XHJcblxyXG5cdFx0Ly8gZ28gaW4gcmV2ZXJzZSBvcmRlciB0byBhbGxvdyBhcHBsaWNhdGlvbiBvdmVycmlkZSBvZiBkZWZhdWx0IHBhcnNlciBhZGRlZCBpbiBhd2F5LnByb3BlclxyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSBsZW4gLSAxOyBpID49IDA7IGktLSkge1xyXG5cdFx0XHR2YXIgcGFyc2VyQ2xhc3M6YW55ID0gQXNzZXRMb2FkZXIuX3BhcnNlcnNbaV07XHJcblx0XHRcdGlmIChwYXJzZXJDbGFzcy5zdXBwb3J0c1R5cGUoZmlsZUV4dGVuc2lvbikpXHJcblx0XHRcdFx0cmV0dXJuIG5ldyBwYXJzZXJDbGFzcygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gQXNzZXRMb2FkZXI7Il19