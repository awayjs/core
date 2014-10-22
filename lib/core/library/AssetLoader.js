var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetLoaderToken = require("awayjs-core/lib/core/library/AssetLoaderToken");
var URLLoader = require("awayjs-core/lib/core/net/URLLoader");
var URLLoaderDataFormat = require("awayjs-core/lib/core/net/URLLoaderDataFormat");

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
        if (typeof materialMode === "undefined") { materialMode = 0; }
        var _this = this;
        _super.call(this);

        this._materialMode = materialMode;

        this._stack = new Array();
        this._errorHandlers = new Array();
        this._parseErrorHandlers = new Array();

        this._onReadyForDependenciesDelegate = function (event) {
            return _this.onReadyForDependencies(event);
        };
        this._onParseCompleteDelegate = function (event) {
            return _this.onParseComplete(event);
        };
        this._onParseErrorDelegate = function (event) {
            return _this.onParseError(event);
        };
        this._onLoadCompleteDelegate = function (event) {
            return _this.onLoadComplete(event);
        };
        this._onLoadErrorDelegate = function (event) {
            return _this.onLoadError(event);
        };
        this._onTextureSizeErrorDelegate = function (event) {
            return _this.onTextureSizeError(event);
        };
        this._onAssetCompleteDelegate = function (event) {
            return _this.onAssetComplete(event);
        };
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
        if (typeof context === "undefined") { context = null; }
        if (typeof ns === "undefined") { ns = null; }
        if (typeof parser === "undefined") { parser = null; }
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
        if (typeof context === "undefined") { context = null; }
        if (typeof ns === "undefined") { ns = null; }
        if (typeof parser === "undefined") { parser = null; }
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
        if (typeof parser === "undefined") { parser = null; }
        if (this._currentDependency.dependencies.length) {
            var next = this._currentDependency.dependencies.pop();

            this._stack.push(this._currentDependency);
            this.retrieveDependency(next);
        } else if (this._currentDependency.parser && this._currentDependency.parser.parsingPaused) {
            this._currentDependency.parser._iResumeParsingAfterDependencies();
            this._stack.pop();
        } else if (this._stack.length) {
            var prev = this._currentDependency;

            this._currentDependency = this._stack.pop();

            if (prev._iSuccess)
                prev.resolve();

            this.retrieveNext(parser);
        } else {
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
            } else {
                this.parseDependency(dependency);
            }
        } else {
            // Resolve URL and start loading
            dependency.request.url = this.resolveDependencyUrl(dependency);

            if (dependency.retrieveAsRawData) {
                // Always use binary for raw data loading
                dependency._iLoader.dataFormat = URLLoaderDataFormat.BINARY;
            } else {
                if (!dependency.parser)
                    dependency._iSetParser(this.getParserFromSuffix(dependency.request.url));

                if (dependency.parser) {
                    dependency._iLoader.dataFormat = dependency.parser.dataFormat;
                } else {
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
        } else if (scheme_re.test(url)) {
            // If overriding full URLs, get rid of scheme (e.g. "http://")
            // and replace with the dependencyBaseUrl defined by user.
            if (this._context && this._context.overrideFullURLs) {
                var noscheme_url = url.replace(scheme_re, '');
                return this.joinUrl(this._context.dependencyBaseUrl, noscheme_url);
            }
        }

        // Since not absolute, just get rid of base file name to find it's
        // folder and then concatenate dynamic URL
        if (this._context && this._context.dependencyBaseUrl) {
            base = this._context.dependencyBaseUrl;
            return this.joinUrl(base, url);
        } else {
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
        var loader = event.target;

        this.removeEventListeners(loader);

        if (this.hasEventListener(IOErrorEvent.IO_ERROR)) {
            this.dispatchEvent(event);
            handled = true;
        } else {
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
            } else {
                // Either this was the base file (last left in the stack) or
                // default behavior was prevented by the handlers, and hence
                // there is nothing more to do than clean up and bail.
                this.dispose();
                return;
            }
        } else {
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
        } else {
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
        } else {
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
        } else {
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
        } else {
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
    AssetLoader._parsers = new Array(Texture2DParser, CubeTextureParser);
    return AssetLoader;
})(EventDispatcher);

module.exports = AssetLoader;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbGlicmFyeS9Bc3NldExvYWRlci50cyJdLCJuYW1lcyI6WyJBc3NldExvYWRlciIsIkFzc2V0TG9hZGVyLmNvbnN0cnVjdG9yIiwiQXNzZXRMb2FkZXIuZW5hYmxlUGFyc2VyIiwiQXNzZXRMb2FkZXIuZW5hYmxlUGFyc2VycyIsIkFzc2V0TG9hZGVyLmxvYWQiLCJBc3NldExvYWRlci5sb2FkRGF0YSIsIkFzc2V0TG9hZGVyLnJldHJpZXZlTmV4dCIsIkFzc2V0TG9hZGVyLnJldHJpZXZlRGVwZW5kZW5jeSIsIkFzc2V0TG9hZGVyLmpvaW5VcmwiLCJBc3NldExvYWRlci5yZXNvbHZlRGVwZW5kZW5jeVVybCIsIkFzc2V0TG9hZGVyLnJldHJpZXZlUGFyc2VyRGVwZW5kZW5jaWVzIiwiQXNzZXRMb2FkZXIucmVzb2x2ZVBhcnNlckRlcGVuZGVuY2llcyIsIkFzc2V0TG9hZGVyLm9uTG9hZEVycm9yIiwiQXNzZXRMb2FkZXIub25QYXJzZUVycm9yIiwiQXNzZXRMb2FkZXIub25Bc3NldENvbXBsZXRlIiwiQXNzZXRMb2FkZXIub25SZWFkeUZvckRlcGVuZGVuY2llcyIsIkFzc2V0TG9hZGVyLm9uTG9hZENvbXBsZXRlIiwiQXNzZXRMb2FkZXIub25QYXJzZUNvbXBsZXRlIiwiQXNzZXRMb2FkZXIub25UZXh0dXJlU2l6ZUVycm9yIiwiQXNzZXRMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcnMiLCJBc3NldExvYWRlci5yZW1vdmVFdmVudExpc3RlbmVycyIsIkFzc2V0TG9hZGVyLnN0b3AiLCJBc3NldExvYWRlci5kaXNwb3NlIiwiQXNzZXRMb2FkZXIuX2lBZGRQYXJzZUVycm9ySGFuZGxlciIsIkFzc2V0TG9hZGVyLl9pQWRkRXJyb3JIYW5kbGVyIiwiQXNzZXRMb2FkZXIuZ2V0UGFyc2VyRnJvbURhdGEiLCJBc3NldExvYWRlci5wYXJzZURlcGVuZGVuY3kiLCJBc3NldExvYWRlci5nZXRQYXJzZXJGcm9tU3VmZml4Il0sIm1hcHBpbmdzIjoiOzs7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RURBLE9BQU9BLElBQUlBO0lBQ1pBLENBQUNBO0lBemxCRDNCLHVCQUFxQ0EsSUFBSUEsS0FBS0EsQ0FBTUEsZUFBZUEsRUFBRUEsaUJBQWlCQSxDQUFDQTtJQTBsQnhGQSxtQkFBQ0E7QUFBREEsQ0FBQ0EsRUFubkJ5QixlQUFlLEVBbW5CeEM7O0FBRUQsNEJBQXFCLENBQUEiLCJmaWxlIjoiY29yZS9saWJyYXJ5L0Fzc2V0TG9hZGVyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5pbXBvcnQgQXNzZXRMb2FkZXJDb250ZXh0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvQXNzZXRMb2FkZXJDb250ZXh0XCIpO1xuaW1wb3J0IEFzc2V0TG9hZGVyVG9rZW5cdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0Fzc2V0TG9hZGVyVG9rZW5cIik7XG5pbXBvcnQgVVJMTG9hZGVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9uZXQvVVJMTG9hZGVyXCIpO1xuaW1wb3J0IFVSTExvYWRlckRhdGFGb3JtYXRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbmV0L1VSTExvYWRlckRhdGFGb3JtYXRcIik7XG5pbXBvcnQgVVJMUmVxdWVzdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbmV0L1VSTFJlcXVlc3RcIik7XG5pbXBvcnQgRXJyb3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9FcnJvclwiKTtcbmltcG9ydCBBc3NldEV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0Fzc2V0RXZlbnRcIik7XG5pbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcbmltcG9ydCBFdmVudERpc3BhdGNoZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiKTtcbmltcG9ydCBJT0Vycm9yRXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvSU9FcnJvckV2ZW50XCIpO1xuaW1wb3J0IExvYWRlckV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0xvYWRlckV2ZW50XCIpO1xuaW1wb3J0IFBhcnNlckV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL1BhcnNlckV2ZW50XCIpO1xuaW1wb3J0IEN1YmVUZXh0dXJlUGFyc2VyXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL0N1YmVUZXh0dXJlUGFyc2VyXCIpO1xuaW1wb3J0IFBhcnNlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlckJhc2VcIik7XG5pbXBvcnQgUmVzb3VyY2VEZXBlbmRlbmN5XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1Jlc291cmNlRGVwZW5kZW5jeVwiKTtcbmltcG9ydCBUZXh0dXJlMkRQYXJzZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcGFyc2Vycy9UZXh0dXJlMkRQYXJzZXJcIik7XG5cbi8qKlxuICogRGlzcGF0Y2hlZCB3aGVuIGFueSBhc3NldCBmaW5pc2hlcyBwYXJzaW5nLiBBbHNvIHNlZSBzcGVjaWZpYyBldmVudHMgZm9yIGVhY2hcbiAqIGluZGl2aWR1YWwgYXNzZXQgdHlwZSAobWVzaGVzLCBtYXRlcmlhbHMgZXQgYy4pXG4gKlxuICogQGV2ZW50VHlwZSBhd2F5LmV2ZW50cy5Bc3NldEV2ZW50XG4gKi9cbi8vW0V2ZW50KG5hbWU9XCJhc3NldENvbXBsZXRlXCIsIHR5cGU9XCJhd2F5M2QuZXZlbnRzLkFzc2V0RXZlbnRcIildXG5cblxuLyoqXG4gKiBEaXNwYXRjaGVkIHdoZW4gYSBmdWxsIHJlc291cmNlIChpbmNsdWRpbmcgZGVwZW5kZW5jaWVzKSBmaW5pc2hlcyBsb2FkaW5nLlxuICpcbiAqIEBldmVudFR5cGUgYXdheS5ldmVudHMuTG9hZGVyRXZlbnRcbiAqL1xuLy9bRXZlbnQobmFtZT1cInJlc291cmNlQ29tcGxldGVcIiwgdHlwZT1cImF3YXkzZC5ldmVudHMuTG9hZGVyRXZlbnRcIildXG5cblxuLyoqXG4gKiBEaXNwYXRjaGVkIHdoZW4gYSBzaW5nbGUgZGVwZW5kZW5jeSAod2hpY2ggbWF5IGJlIHRoZSBtYWluIGZpbGUgb2YgYSByZXNvdXJjZSlcbiAqIGZpbmlzaGVzIGxvYWRpbmcuXG4gKlxuICogQGV2ZW50VHlwZSBhd2F5LmV2ZW50cy5Mb2FkZXJFdmVudFxuICovXG4vL1tFdmVudChuYW1lPVwiZGVwZW5kZW5jeUNvbXBsZXRlXCIsIHR5cGU9XCJhd2F5M2QuZXZlbnRzLkxvYWRlckV2ZW50XCIpXVxuXG5cbi8qKlxuICogRGlzcGF0Y2hlZCB3aGVuIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgbG9hZGluZy4gSVxuICpcbiAqIEBldmVudFR5cGUgYXdheS5ldmVudHMuTG9hZGVyRXZlbnRcbiAqL1xuLy9bRXZlbnQobmFtZT1cImxvYWRFcnJvclwiLCB0eXBlPVwiYXdheTNkLmV2ZW50cy5Mb2FkZXJFdmVudFwiKV1cblxuXG4vKipcbiAqIERpc3BhdGNoZWQgd2hlbiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHBhcnNpbmcuXG4gKlxuICogQGV2ZW50VHlwZSBhd2F5LmV2ZW50cy5QYXJzZXJFdmVudFxuICovXG4vL1tFdmVudChuYW1lPVwicGFyc2VFcnJvclwiLCB0eXBlPVwiYXdheTNkLmV2ZW50cy5QYXJzZXJFdmVudFwiKV1cblxuLyoqXG4gKiBEaXNwYXRjaGVkIHdoZW4gYW4gaW1hZ2UgYXNzZXQgZGltZW5zaW9ucyBhcmUgbm90IGEgcG93ZXIgb2YgMlxuICpcbiAqIEBldmVudFR5cGUgYXdheS5ldmVudHMuQXNzZXRFdmVudFxuICovXG4vL1tFdmVudChuYW1lPVwidGV4dHVyZVNpemVFcnJvclwiLCB0eXBlPVwiYXdheTNkLmV2ZW50cy5Bc3NldEV2ZW50XCIpXVxuXG4vKipcbiAqIEFzc2V0TG9hZGVyIGNhbiBsb2FkIGFueSBmaWxlIGZvcm1hdCB0aGF0IGF3YXkuc3VwcG9ydHMgKG9yIGZvciB3aGljaCBhIHRoaXJkLXBhcnR5IHBhcnNlclxuICogaGFzIGJlZW4gcGx1Z2dlZCBpbikgYW5kIGl0J3MgZGVwZW5kZW5jaWVzLiBFdmVudHMgYXJlIGRpc3BhdGNoZWQgd2hlbiBhc3NldHMgYXJlIGVuY291bnRlcmVkXG4gKiBhbmQgZm9yIHdoZW4gdGhlIHJlc291cmNlIChvciBpdCdzIGRlcGVuZGVuY2llcykgaGF2ZSBiZWVuIGxvYWRlZC5cbiAqXG4gKiBUaGUgQXNzZXRMb2FkZXIgd2lsbCBub3QgbWFrZSBhc3NldHMgYXZhaWxhYmxlIGluIGFueSBvdGhlciB3YXkgdGhhbiB0aHJvdWdoIHRoZSBkaXNwYXRjaGVkXG4gKiBldmVudHMuIFRvIHN0b3JlIGFzc2V0cyBhbmQgbWFrZSB0aGVtIGF2YWlsYWJsZSBhdCBhbnkgcG9pbnQgZnJvbSBhbnkgbW9kdWxlIGluIGFuIGFwcGxpY2F0aW9uLFxuICogdXNlIHRoZSBBc3NldExpYnJhcnkgdG8gbG9hZCBhbmQgbWFuYWdlIGFzc2V0cy5cbiAqXG4gKiBAc2VlIGF3YXkubGlicmFyeS5Bc3NldExpYnJhcnlcbiAqL1xuY2xhc3MgQXNzZXRMb2FkZXIgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcbntcblx0cHJpdmF0ZSBfY29udGV4dDpBc3NldExvYWRlckNvbnRleHQ7XG5cdHByaXZhdGUgX3Rva2VuOkFzc2V0TG9hZGVyVG9rZW47XG5cdHByaXZhdGUgX3VyaTpzdHJpbmc7XG5cdHByaXZhdGUgX2NvbnRlbnQ6RGlzcGxheU9iamVjdDtcblx0cHJpdmF0ZSBfbWF0ZXJpYWxNb2RlOm51bWJlcjtcblxuXHRwcml2YXRlIF9lcnJvckhhbmRsZXJzOkFycmF5PEZ1bmN0aW9uPjtcblx0cHJpdmF0ZSBfcGFyc2VFcnJvckhhbmRsZXJzOkFycmF5PEZ1bmN0aW9uPjtcblxuXHRwcml2YXRlIF9zdGFjazpBcnJheTxSZXNvdXJjZURlcGVuZGVuY3k+O1xuXHRwcml2YXRlIF9iYXNlRGVwZW5kZW5jeTpSZXNvdXJjZURlcGVuZGVuY3k7XG5cdHByaXZhdGUgX2N1cnJlbnREZXBlbmRlbmN5OlJlc291cmNlRGVwZW5kZW5jeTtcblx0cHJpdmF0ZSBfbmFtZXNwYWNlOnN0cmluZztcblxuXHRwcml2YXRlIF9vblJlYWR5Rm9yRGVwZW5kZW5jaWVzRGVsZWdhdGU6KGV2ZW50OlBhcnNlckV2ZW50KSA9PiB2b2lkO1xuXHRwcml2YXRlIF9vblBhcnNlQ29tcGxldGVEZWxlZ2F0ZTooZXZlbnQ6UGFyc2VyRXZlbnQpID0+IHZvaWQ7XG5cdHByaXZhdGUgX29uUGFyc2VFcnJvckRlbGVnYXRlOihldmVudDpQYXJzZXJFdmVudCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfb25Mb2FkQ29tcGxldGVEZWxlZ2F0ZTooZXZlbnQ6RXZlbnQpID0+IHZvaWQ7XG5cdHByaXZhdGUgX29uTG9hZEVycm9yRGVsZWdhdGU6KGV2ZW50OklPRXJyb3JFdmVudCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfb25UZXh0dXJlU2l6ZUVycm9yRGVsZWdhdGU6KGV2ZW50OkFzc2V0RXZlbnQpID0+IHZvaWQ7XG5cdHByaXZhdGUgX29uQXNzZXRDb21wbGV0ZURlbGVnYXRlOihldmVudDpBc3NldEV2ZW50KSA9PiB2b2lkO1xuXG5cdC8vIEltYWdlIHBhcnNlciBvbmx5IHBhcnNlciB0aGF0IGlzIGFkZGVkIGJ5IGRlZmF1bHQsIHRvIHNhdmUgZmlsZSBzaXplLlxuXHRwcml2YXRlIHN0YXRpYyBfcGFyc2VyczpBcnJheTxhbnk+ID0gbmV3IEFycmF5PGFueT4oVGV4dHVyZTJEUGFyc2VyLCBDdWJlVGV4dHVyZVBhcnNlcik7XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgYSBzcGVjaWZpYyBwYXJzZXIuXG5cdCAqIFdoZW4gbm8gc3BlY2lmaWMgcGFyc2VyIGlzIHNldCBmb3IgYSBsb2FkaW5nL3BhcnNpbmcgb3BwZXJhdGlvbixcblx0ICogbG9hZGVyM2QgY2FuIGF1dG9zZWxlY3QgdGhlIGNvcnJlY3QgcGFyc2VyIHRvIHVzZS5cblx0ICogQSBwYXJzZXIgbXVzdCBoYXZlIGJlZW4gZW5hYmxlZCwgdG8gYmUgY29uc2lkZXJlZCB3aGVuIGF1dG9zZWxlY3RpbmcgdGhlIHBhcnNlci5cblx0ICpcblx0ICogQHBhcmFtIHBhcnNlciBUaGUgcGFyc2VyIGNsYXNzIHRvIGVuYWJsZS5cblx0ICpcblx0ICogQHNlZSBhd2F5LnBhcnNlcnMuUGFyc2Vyc1xuXHQgKi9cblx0cHVibGljIHN0YXRpYyBlbmFibGVQYXJzZXIocGFyc2VyKVxuXHR7XG5cdFx0aWYgKEFzc2V0TG9hZGVyLl9wYXJzZXJzLmluZGV4T2YocGFyc2VyKSA8IDApXG5cdFx0XHRBc3NldExvYWRlci5fcGFyc2Vycy5wdXNoKHBhcnNlcik7XG5cdH1cblxuXHQvKipcblx0ICogRW5hYmxlcyBhIGxpc3Qgb2YgcGFyc2Vycy5cblx0ICogV2hlbiBubyBzcGVjaWZpYyBwYXJzZXIgaXMgc2V0IGZvciBhIGxvYWRpbmcvcGFyc2luZyBvcHBlcmF0aW9uLFxuXHQgKiBBc3NldExvYWRlciBjYW4gYXV0b3NlbGVjdCB0aGUgY29ycmVjdCBwYXJzZXIgdG8gdXNlLlxuXHQgKiBBIHBhcnNlciBtdXN0IGhhdmUgYmVlbiBlbmFibGVkLCB0byBiZSBjb25zaWRlcmVkIHdoZW4gYXV0b3NlbGVjdGluZyB0aGUgcGFyc2VyLlxuXHQgKlxuXHQgKiBAcGFyYW0gcGFyc2VycyBBIFZlY3RvciBvZiBwYXJzZXIgY2xhc3NlcyB0byBlbmFibGUuXG5cdCAqIEBzZWUgYXdheS5wYXJzZXJzLlBhcnNlcnNcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgZW5hYmxlUGFyc2VycyhwYXJzZXJzOkFycmF5PE9iamVjdD4pXG5cdHtcblx0XHRmb3IgKHZhciBjOm51bWJlciA9IDA7IGMgPCBwYXJzZXJzLmxlbmd0aDsgYysrKVxuXHRcdFx0QXNzZXRMb2FkZXIuZW5hYmxlUGFyc2VyKHBhcnNlcnNbIGMgXSk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgYmFzZSBkZXBlbmRlbmN5IG9mIHRoZSBsb2FkZXJcblx0ICovXG5cdHB1YmxpYyBnZXQgYmFzZURlcGVuZGVuY3koKTpSZXNvdXJjZURlcGVuZGVuY3lcblx0e1xuXHRcdHJldHVybiB0aGlzLl9iYXNlRGVwZW5kZW5jeTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgUmVzb3VyY2VMb2FkU2Vzc2lvbiBvYmplY3QuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihtYXRlcmlhbE1vZGU6bnVtYmVyID0gMClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9tYXRlcmlhbE1vZGUgPSBtYXRlcmlhbE1vZGU7XG5cblx0XHR0aGlzLl9zdGFjayA9IG5ldyBBcnJheTxSZXNvdXJjZURlcGVuZGVuY3k+KCk7XG5cdFx0dGhpcy5fZXJyb3JIYW5kbGVycyA9IG5ldyBBcnJheTxGdW5jdGlvbj4oKTtcblx0XHR0aGlzLl9wYXJzZUVycm9ySGFuZGxlcnMgPSBuZXcgQXJyYXk8RnVuY3Rpb24+KCk7XG5cblx0XHR0aGlzLl9vblJlYWR5Rm9yRGVwZW5kZW5jaWVzRGVsZWdhdGUgPSAoZXZlbnQ6UGFyc2VyRXZlbnQpID0+IHRoaXMub25SZWFkeUZvckRlcGVuZGVuY2llcyhldmVudCk7XG5cdFx0dGhpcy5fb25QYXJzZUNvbXBsZXRlRGVsZWdhdGUgPSAoZXZlbnQ6UGFyc2VyRXZlbnQpID0+IHRoaXMub25QYXJzZUNvbXBsZXRlKGV2ZW50KTtcblx0XHR0aGlzLl9vblBhcnNlRXJyb3JEZWxlZ2F0ZSA9IChldmVudDpQYXJzZXJFdmVudCkgPT4gdGhpcy5vblBhcnNlRXJyb3IoZXZlbnQpO1xuXHRcdHRoaXMuX29uTG9hZENvbXBsZXRlRGVsZWdhdGUgPSAoZXZlbnQ6RXZlbnQpID0+IHRoaXMub25Mb2FkQ29tcGxldGUoZXZlbnQpO1xuXHRcdHRoaXMuX29uTG9hZEVycm9yRGVsZWdhdGUgPSAoZXZlbnQ6SU9FcnJvckV2ZW50KSA9PiB0aGlzLm9uTG9hZEVycm9yKGV2ZW50KTtcblx0XHR0aGlzLl9vblRleHR1cmVTaXplRXJyb3JEZWxlZ2F0ZSA9IChldmVudDpBc3NldEV2ZW50KSA9PiB0aGlzLm9uVGV4dHVyZVNpemVFcnJvcihldmVudCk7XG5cdFx0dGhpcy5fb25Bc3NldENvbXBsZXRlRGVsZWdhdGUgPSAoZXZlbnQ6QXNzZXRFdmVudCkgPT4gdGhpcy5vbkFzc2V0Q29tcGxldGUoZXZlbnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIExvYWRzIGEgZmlsZSBhbmQgKG9wdGlvbmFsbHkpIGFsbCBvZiBpdHMgZGVwZW5kZW5jaWVzLlxuXHQgKlxuXHQgKiBAcGFyYW0gcmVxIFRoZSBVUkxSZXF1ZXN0IG9iamVjdCBjb250YWluaW5nIHRoZSBVUkwgb2YgdGhlIGZpbGUgdG8gYmUgbG9hZGVkLlxuXHQgKiBAcGFyYW0gY29udGV4dCBBbiBvcHRpb25hbCBjb250ZXh0IG9iamVjdCBwcm92aWRpbmcgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciBsb2FkaW5nXG5cdCAqIEBwYXJhbSBucyBBbiBvcHRpb25hbCBuYW1lc3BhY2Ugc3RyaW5nIHVuZGVyIHdoaWNoIHRoZSBmaWxlIGlzIHRvIGJlIGxvYWRlZCwgYWxsb3dpbmcgdGhlIGRpZmZlcmVudGlhdGlvbiBvZiB0d28gcmVzb3VyY2VzIHdpdGggaWRlbnRpY2FsIGFzc2V0c1xuXHQgKiBAcGFyYW0gcGFyc2VyIEFuIG9wdGlvbmFsIHBhcnNlciBvYmplY3QgZm9yIHRyYW5zbGF0aW5nIHRoZSBsb2FkZWQgZGF0YSBpbnRvIGEgdXNhYmxlIHJlc291cmNlLiBJZiBub3QgcHJvdmlkZWQsIEFzc2V0TG9hZGVyIHdpbGwgYXR0ZW1wdCB0byBhdXRvLWRldGVjdCB0aGUgZmlsZSB0eXBlLlxuXHQgKi9cblx0cHVibGljIGxvYWQocmVxOlVSTFJlcXVlc3QsIGNvbnRleHQ6QXNzZXRMb2FkZXJDb250ZXh0ID0gbnVsbCwgbnM6c3RyaW5nID0gbnVsbCwgcGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKTpBc3NldExvYWRlclRva2VuXG5cdHtcblx0XHRpZiAoIXRoaXMuX3Rva2VuKSB7XG5cdFx0XHR0aGlzLl90b2tlbiA9IG5ldyBBc3NldExvYWRlclRva2VuKHRoaXMpO1xuXG5cdFx0XHR0aGlzLl91cmkgPSByZXEudXJsID0gcmVxLnVybC5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKTtcblx0XHRcdHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuXHRcdFx0dGhpcy5fbmFtZXNwYWNlID0gbnM7XG5cblx0XHRcdHRoaXMuX2Jhc2VEZXBlbmRlbmN5ID0gbmV3IFJlc291cmNlRGVwZW5kZW5jeSgnJywgcmVxLCBudWxsLCBwYXJzZXIsIG51bGwpO1xuXHRcdFx0dGhpcy5yZXRyaWV2ZURlcGVuZGVuY3kodGhpcy5fYmFzZURlcGVuZGVuY3kpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5fdG9rZW47XG5cdFx0fVxuXG5cdFx0Ly8gVE9ETzogVGhyb3cgZXJyb3IgKGFscmVhZHkgbG9hZGluZylcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBMb2FkcyBhIHJlc291cmNlIGZyb20gYWxyZWFkeSBsb2FkZWQgZGF0YS5cblx0ICpcblx0ICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHJlc291cmNlIGluZm9ybWF0aW9uLlxuXHQgKiBAcGFyYW0gY29udGV4dCBBbiBvcHRpb25hbCBjb250ZXh0IG9iamVjdCBwcm92aWRpbmcgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciBsb2FkaW5nXG5cdCAqIEBwYXJhbSBucyBBbiBvcHRpb25hbCBuYW1lc3BhY2Ugc3RyaW5nIHVuZGVyIHdoaWNoIHRoZSBmaWxlIGlzIHRvIGJlIGxvYWRlZCwgYWxsb3dpbmcgdGhlIGRpZmZlcmVudGlhdGlvbiBvZiB0d28gcmVzb3VyY2VzIHdpdGggaWRlbnRpY2FsIGFzc2V0c1xuXHQgKiBAcGFyYW0gcGFyc2VyIEFuIG9wdGlvbmFsIHBhcnNlciBvYmplY3QgZm9yIHRyYW5zbGF0aW5nIHRoZSBsb2FkZWQgZGF0YSBpbnRvIGEgdXNhYmxlIHJlc291cmNlLiBJZiBub3QgcHJvdmlkZWQsIEFzc2V0TG9hZGVyIHdpbGwgYXR0ZW1wdCB0byBhdXRvLWRldGVjdCB0aGUgZmlsZSB0eXBlLlxuXHQgKi9cblx0cHVibGljIGxvYWREYXRhKGRhdGE6YW55LCBpZDpzdHJpbmcsIGNvbnRleHQ6QXNzZXRMb2FkZXJDb250ZXh0ID0gbnVsbCwgbnM6c3RyaW5nID0gbnVsbCwgcGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKTpBc3NldExvYWRlclRva2VuXG5cdHtcblx0XHRpZiAoIXRoaXMuX3Rva2VuKSB7XG5cdFx0XHR0aGlzLl90b2tlbiA9IG5ldyBBc3NldExvYWRlclRva2VuKHRoaXMpO1xuXG5cdFx0XHR0aGlzLl91cmkgPSBpZDtcblx0XHRcdHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuXHRcdFx0dGhpcy5fbmFtZXNwYWNlID0gbnM7XG5cblx0XHRcdHRoaXMuX2Jhc2VEZXBlbmRlbmN5ID0gbmV3IFJlc291cmNlRGVwZW5kZW5jeShpZCwgbnVsbCwgZGF0YSwgcGFyc2VyLCBudWxsKTtcblx0XHRcdHRoaXMucmV0cmlldmVEZXBlbmRlbmN5KHRoaXMuX2Jhc2VEZXBlbmRlbmN5KTtcblxuXHRcdFx0cmV0dXJuIHRoaXMuX3Rva2VuO1xuXHRcdH1cblxuXHRcdC8vIFRPRE86IFRocm93IGVycm9yIChhbHJlYWR5IGxvYWRpbmcpXG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogUmVjdXJzaXZlbHkgcmV0cmlldmVzIHRoZSBuZXh0IHRvLWJlLWxvYWRlZCBhbmQgcGFyc2VkIGRlcGVuZGVuY3kgb24gdGhlIHN0YWNrLCBvciBwb3BzIHRoZSBsaXN0IG9mZiB0aGVcblx0ICogc3RhY2sgd2hlbiBjb21wbGV0ZSBhbmQgY29udGludWVzIG9uIHRoZSB0b3Agc2V0LlxuXHQgKiBAcGFyYW0gcGFyc2VyIFRoZSBwYXJzZXIgdGhhdCB3aWxsIHRyYW5zbGF0ZSB0aGUgZGF0YSBpbnRvIGEgdXNhYmxlIHJlc291cmNlLlxuXHQgKi9cblx0cHJpdmF0ZSByZXRyaWV2ZU5leHQocGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5LmRlcGVuZGVuY2llcy5sZW5ndGgpIHtcblxuXHRcdFx0dmFyIG5leHQ6UmVzb3VyY2VEZXBlbmRlbmN5ID0gdGhpcy5fY3VycmVudERlcGVuZGVuY3kuZGVwZW5kZW5jaWVzLnBvcCgpO1xuXG5cdFx0XHR0aGlzLl9zdGFjay5wdXNoKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5KTtcblx0XHRcdHRoaXMucmV0cmlldmVEZXBlbmRlbmN5KG5leHQpO1xuXG5cdFx0fSBlbHNlIGlmICh0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5wYXJzZXIgJiYgdGhpcy5fY3VycmVudERlcGVuZGVuY3kucGFyc2VyLnBhcnNpbmdQYXVzZWQpIHtcblxuXHRcdFx0dGhpcy5fY3VycmVudERlcGVuZGVuY3kucGFyc2VyLl9pUmVzdW1lUGFyc2luZ0FmdGVyRGVwZW5kZW5jaWVzKCk7XG5cdFx0XHR0aGlzLl9zdGFjay5wb3AoKTtcblxuXHRcdH0gZWxzZSBpZiAodGhpcy5fc3RhY2subGVuZ3RoKSB7XG5cblx0XHRcdHZhciBwcmV2OlJlc291cmNlRGVwZW5kZW5jeSA9IHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5O1xuXG5cdFx0XHR0aGlzLl9jdXJyZW50RGVwZW5kZW5jeSA9IHRoaXMuX3N0YWNrLnBvcCgpO1xuXG5cdFx0XHRpZiAocHJldi5faVN1Y2Nlc3MpXG5cdFx0XHRcdHByZXYucmVzb2x2ZSgpO1xuXG5cdFx0XHR0aGlzLnJldHJpZXZlTmV4dChwYXJzZXIpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTG9hZGVyRXZlbnQoTG9hZGVyRXZlbnQuUkVTT1VSQ0VfQ09NUExFVEUsIHRoaXMuX3VyaSwgdGhpcy5fYmFzZURlcGVuZGVuY3kucGFyc2VyLmNvbnRlbnQsIHRoaXMuX2Jhc2VEZXBlbmRlbmN5LmFzc2V0cykpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZXMgYSBzaW5nbGUgZGVwZW5kZW5jeS5cblx0ICogQHBhcmFtIHBhcnNlciBUaGUgcGFyc2VyIHRoYXQgd2lsbCB0cmFuc2xhdGUgdGhlIGRhdGEgaW50byBhIHVzYWJsZSByZXNvdXJjZS5cblx0ICovXG5cdHByaXZhdGUgcmV0cmlldmVEZXBlbmRlbmN5KGRlcGVuZGVuY3k6UmVzb3VyY2VEZXBlbmRlbmN5KVxuXHR7XG5cdFx0dmFyIGRhdGE6YW55O1xuXG5cdFx0aWYgKHRoaXMuX2NvbnRleHQgJiYgdGhpcy5fY29udGV4dC5tYXRlcmlhbE1vZGUgIT0gMClcblx0XHRcdHRoaXMuX21hdGVyaWFsTW9kZSA9IHRoaXMuX2NvbnRleHQubWF0ZXJpYWxNb2RlO1xuXG5cdFx0dGhpcy5fY3VycmVudERlcGVuZGVuY3kgPSBkZXBlbmRlbmN5O1xuXG5cdFx0ZGVwZW5kZW5jeS5faUxvYWRlciA9IG5ldyBVUkxMb2FkZXIoKTtcblxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoZGVwZW5kZW5jeS5faUxvYWRlcik7XG5cblx0XHQvLyBHZXQgYWxyZWFkeSBsb2FkZWQgKG9yIG1hcHBlZCkgZGF0YSBpZiBhdmFpbGFibGVcblx0XHRkYXRhID0gZGVwZW5kZW5jeS5kYXRhO1xuXG5cdFx0aWYgKHRoaXMuX2NvbnRleHQgJiYgZGVwZW5kZW5jeS5yZXF1ZXN0ICYmIHRoaXMuX2NvbnRleHQuX2lIYXNEYXRhRm9yVXJsKGRlcGVuZGVuY3kucmVxdWVzdC51cmwpKVxuXHRcdFx0ZGF0YSA9IHRoaXMuX2NvbnRleHQuX2lHZXREYXRhRm9yVXJsKGRlcGVuZGVuY3kucmVxdWVzdC51cmwpO1xuXG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGlmIChkYXRhLmNvbnN0cnVjdG9yID09PSBGdW5jdGlvbilcblx0XHRcdFx0ZGF0YSA9IG5ldyBkYXRhKCk7XG5cblx0XHRcdGRlcGVuZGVuY3kuX2lTZXREYXRhKGRhdGEpO1xuXG5cdFx0XHRpZiAoZGVwZW5kZW5jeS5yZXRyaWV2ZUFzUmF3RGF0YSkge1xuXHRcdFx0XHQvLyBObyBuZWVkIHRvIHBhcnNlLiBUaGUgcGFyZW50IHBhcnNlciBpcyBleHBlY3RpbmcgdGhpc1xuXHRcdFx0XHQvLyB0byBiZSByYXcgZGF0YSBzbyBpdCBjYW4gYmUgcGFzc2VkIGRpcmVjdGx5LlxuXHRcdFx0XHRkZXBlbmRlbmN5LnJlc29sdmUoKTtcblxuXHRcdFx0XHQvLyBNb3ZlIG9uIHRvIG5leHQgZGVwZW5kZW5jeVxuXHRcdFx0XHR0aGlzLnJldHJpZXZlTmV4dCgpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnBhcnNlRGVwZW5kZW5jeShkZXBlbmRlbmN5KTtcblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBSZXNvbHZlIFVSTCBhbmQgc3RhcnQgbG9hZGluZ1xuXHRcdFx0ZGVwZW5kZW5jeS5yZXF1ZXN0LnVybCA9IHRoaXMucmVzb2x2ZURlcGVuZGVuY3lVcmwoZGVwZW5kZW5jeSk7XG5cblx0XHRcdGlmIChkZXBlbmRlbmN5LnJldHJpZXZlQXNSYXdEYXRhKSB7XG5cdFx0XHRcdC8vIEFsd2F5cyB1c2UgYmluYXJ5IGZvciByYXcgZGF0YSBsb2FkaW5nXG5cdFx0XHRcdGRlcGVuZGVuY3kuX2lMb2FkZXIuZGF0YUZvcm1hdCA9IFVSTExvYWRlckRhdGFGb3JtYXQuQklOQVJZO1xuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRpZiAoIWRlcGVuZGVuY3kucGFyc2VyKVxuXHRcdFx0XHRcdGRlcGVuZGVuY3kuX2lTZXRQYXJzZXIodGhpcy5nZXRQYXJzZXJGcm9tU3VmZml4KGRlcGVuZGVuY3kucmVxdWVzdC51cmwpKTtcblxuXHRcdFx0XHRpZiAoZGVwZW5kZW5jeS5wYXJzZXIpIHtcblx0XHRcdFx0XHRkZXBlbmRlbmN5Ll9pTG9hZGVyLmRhdGFGb3JtYXQgPSBkZXBlbmRlbmN5LnBhcnNlci5kYXRhRm9ybWF0O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEFsd2F5cyB1c2UgQklOQVJZIGZvciB1bmtub3duIGZpbGUgZm9ybWF0cy4gVGhlIHRob3JvdWdoXG5cdFx0XHRcdFx0Ly8gZmlsZSB0eXBlIGNoZWNrIHdpbGwgZGV0ZXJtaW5lIGZvcm1hdCBhZnRlciBsb2FkLCBhbmQgaWZcblx0XHRcdFx0XHQvLyBiaW5hcnksIGEgdGV4dCBsb2FkIHdpbGwgaGF2ZSBicm9rZW4gdGhlIGZpbGUgZGF0YS5cblx0XHRcdFx0XHRkZXBlbmRlbmN5Ll9pTG9hZGVyLmRhdGFGb3JtYXQgPSBVUkxMb2FkZXJEYXRhRm9ybWF0LkJJTkFSWTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRkZXBlbmRlbmN5Ll9pTG9hZGVyLmxvYWQoZGVwZW5kZW5jeS5yZXF1ZXN0KTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGpvaW5VcmwoYmFzZTpzdHJpbmcsIGVuZDpzdHJpbmcpOnN0cmluZ1xuXHR7XG5cdFx0aWYgKGVuZC5jaGFyQXQoMCkgPT0gJy8nKVxuXHRcdFx0ZW5kID0gZW5kLnN1YnN0cigxKTtcblxuXHRcdGlmIChiYXNlLmxlbmd0aCA9PSAwKVxuXHRcdFx0cmV0dXJuIGVuZDtcblxuXHRcdGlmIChiYXNlLmNoYXJBdChiYXNlLmxlbmd0aCAtIDEpID09ICcvJylcblx0XHRcdGJhc2UgPSBiYXNlLnN1YnN0cigwLCBiYXNlLmxlbmd0aCAtIDEpO1xuXG5cdFx0cmV0dXJuIGJhc2UuY29uY2F0KCcvJywgZW5kKTtcblxuXHR9XG5cblx0cHJpdmF0ZSByZXNvbHZlRGVwZW5kZW5jeVVybChkZXBlbmRlbmN5OlJlc291cmNlRGVwZW5kZW5jeSk6c3RyaW5nXG5cdHtcblx0XHR2YXIgc2NoZW1lX3JlOlJlZ0V4cDtcblx0XHR2YXIgYmFzZTpzdHJpbmc7XG5cdFx0dmFyIHVybDpzdHJpbmcgPSBkZXBlbmRlbmN5LnJlcXVlc3QudXJsO1xuXG5cdFx0Ly8gSGFzIHRoZSB1c2VyIHJlLW1hcHBlZCB0aGlzIFVSTD9cblx0XHRpZiAodGhpcy5fY29udGV4dCAmJiB0aGlzLl9jb250ZXh0Ll9pSGFzTWFwcGluZ0ZvclVybCh1cmwpKVxuXHRcdFx0cmV0dXJuIHRoaXMuX2NvbnRleHQuX2lHZXRSZW1hcHBlZFVybCh1cmwpO1xuXG5cdFx0Ly8gVGhpcyBpcyB0aGUgXCJiYXNlXCIgZGVwZW5kZW5jeSwgaS5lLiB0aGUgYWN0dWFsIHJlcXVlc3RlZCBhc3NldC5cblx0XHQvLyBXZSB3aWxsIG5vdCB0cnkgdG8gcmVzb2x2ZSB0aGlzIHNpbmNlIHRoZSB1c2VyIGNhbiBwcm9iYWJseSBiZVxuXHRcdC8vIHRocnVzdGVkIHRvIGtub3cgdGhpcyBVUkwgYmV0dGVyIHRoYW4gb3VyIGF1dG9tYXRpYyByZXNvbHZlci4gOilcblx0XHRpZiAodXJsID09IHRoaXMuX3VyaSlcblx0XHRcdHJldHVybiB1cmw7XG5cblxuXHRcdC8vIEFic29sdXRlIFVSTD8gQ2hlY2sgaWYgc3RhcnRzIHdpdGggc2xhc2ggb3IgYSBVUkxcblx0XHQvLyBzY2hlbWUgZGVmaW5pdGlvbiAoZS5nLiBmdHA6Ly8sIGh0dHA6Ly8sIGZpbGU6Ly8pXG5cdFx0c2NoZW1lX3JlID0gbmV3IFJlZ0V4cCgnL15bYS16QS1aXXszLDR9OlxcL1xcLy8nKTtcblxuXHRcdGlmICh1cmwuY2hhckF0KDApID09ICcvJykge1xuXHRcdFx0aWYgKHRoaXMuX2NvbnRleHQgJiYgdGhpcy5fY29udGV4dC5vdmVycmlkZUFic29sdXRlUGF0aHMpXG5cdFx0XHRcdHJldHVybiB0aGlzLmpvaW5VcmwodGhpcy5fY29udGV4dC5kZXBlbmRlbmN5QmFzZVVybCwgdXJsKTsgZWxzZVxuXHRcdFx0XHRyZXR1cm4gdXJsO1xuXHRcdH0gZWxzZSBpZiAoc2NoZW1lX3JlLnRlc3QodXJsKSkge1xuXHRcdFx0Ly8gSWYgb3ZlcnJpZGluZyBmdWxsIFVSTHMsIGdldCByaWQgb2Ygc2NoZW1lIChlLmcuIFwiaHR0cDovL1wiKVxuXHRcdFx0Ly8gYW5kIHJlcGxhY2Ugd2l0aCB0aGUgZGVwZW5kZW5jeUJhc2VVcmwgZGVmaW5lZCBieSB1c2VyLlxuXHRcdFx0aWYgKHRoaXMuX2NvbnRleHQgJiYgdGhpcy5fY29udGV4dC5vdmVycmlkZUZ1bGxVUkxzKSB7XG5cblx0XHRcdFx0dmFyIG5vc2NoZW1lX3VybCA6IHN0cmluZyAgPSB1cmwucmVwbGFjZSggc2NoZW1lX3JlICwgJycgKTsvL3VybFsncmVwbGFjZSddKHNjaGVtZV9yZSk7XG5cdFx0XHRcdHJldHVybiB0aGlzLmpvaW5VcmwodGhpcy5fY29udGV4dC5kZXBlbmRlbmN5QmFzZVVybCwgPHN0cmluZz4gbm9zY2hlbWVfdXJsKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBTaW5jZSBub3QgYWJzb2x1dGUsIGp1c3QgZ2V0IHJpZCBvZiBiYXNlIGZpbGUgbmFtZSB0byBmaW5kIGl0J3Ncblx0XHQvLyBmb2xkZXIgYW5kIHRoZW4gY29uY2F0ZW5hdGUgZHluYW1pYyBVUkxcblx0XHRpZiAodGhpcy5fY29udGV4dCAmJiB0aGlzLl9jb250ZXh0LmRlcGVuZGVuY3lCYXNlVXJsKSB7XG5cdFx0XHRiYXNlID0gdGhpcy5fY29udGV4dC5kZXBlbmRlbmN5QmFzZVVybDtcblx0XHRcdHJldHVybiB0aGlzLmpvaW5VcmwoYmFzZSwgdXJsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YmFzZSA9IHRoaXMuX3VyaS5zdWJzdHJpbmcoMCwgdGhpcy5fdXJpLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcblx0XHRcdHJldHVybiB0aGlzLmpvaW5VcmwoYmFzZSwgdXJsKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJldHJpZXZlUGFyc2VyRGVwZW5kZW5jaWVzKClcblx0e1xuXHRcdGlmICghdGhpcy5fY3VycmVudERlcGVuZGVuY3kpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR2YXIgcGFyc2VyRGVwZW5kYW5jaWVzID0gdGhpcy5fY3VycmVudERlcGVuZGVuY3kucGFyc2VyLmRlcGVuZGVuY2llc1xuXHRcdHZhciBpOm51bWJlciwgbGVuOm51bWJlciA9IHBhcnNlckRlcGVuZGFuY2llcy5sZW5ndGg7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5kZXBlbmRlbmNpZXNbaV0gPSBwYXJzZXJEZXBlbmRhbmNpZXNbaV07XG5cblxuXHRcdC8vIFNpbmNlIG1vcmUgZGVwZW5kZW5jaWVzIG1pZ2h0IGJlIGFkZGVkIGV2ZW50dWFsbHksIGVtcHR5IHRoaXNcblx0XHQvLyBsaXN0IHNvIHRoYXQgdGhlIHNhbWUgZGVwZW5kZW5jeSBpc24ndCByZXRyaWV2ZWQgbW9yZSB0aGFuIG9uY2UuXG5cdFx0cGFyc2VyRGVwZW5kYW5jaWVzLmxlbmd0aCA9IDA7XG5cblx0XHR0aGlzLl9zdGFjay5wdXNoKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5KTtcblxuXHRcdHRoaXMucmV0cmlldmVOZXh0KCk7XG5cdH1cblxuXHRwcml2YXRlIHJlc29sdmVQYXJzZXJEZXBlbmRlbmNpZXMoKVxuXHR7XG5cdFx0dGhpcy5fY3VycmVudERlcGVuZGVuY3kuX2lTdWNjZXNzID0gdHJ1ZTtcblxuXHRcdC8vIFJldHJpZXZlIGFueSBsYXN0IGRlcGVuZGVuY2llcyByZW1haW5pbmcgb24gdGhpcyBwYXJzZXIsIG9yXG5cdFx0Ly8gaWYgbm9uZSBleGlzdHMsIGp1c3QgbW92ZSBvbi5cblx0XHRpZiAodGhpcy5fY3VycmVudERlcGVuZGVuY3kucGFyc2VyICYmIHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5LnBhcnNlci5kZXBlbmRlbmNpZXMubGVuZ3RoICYmICghdGhpcy5fY29udGV4dCB8fCB0aGlzLl9jb250ZXh0LmluY2x1ZGVEZXBlbmRlbmNpZXMpKS8vY29udGV4dCBtYXkgYmUgbnVsbFxuXHRcdFx0dGhpcy5yZXRyaWV2ZVBhcnNlckRlcGVuZGVuY2llcygpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMucmV0cmlldmVOZXh0KCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gYSBzaW5nbGUgZGVwZW5kZW5jeSBsb2FkaW5nIGZhaWxlZCwgYW5kIHB1c2hlcyBmdXJ0aGVyIGRlcGVuZGVuY2llcyBvbnRvIHRoZSBzdGFjay5cblx0ICogQHBhcmFtIGV2ZW50XG5cdCAqL1xuXHRwcml2YXRlIG9uTG9hZEVycm9yKGV2ZW50OklPRXJyb3JFdmVudClcblx0e1xuXHRcdHZhciBoYW5kbGVkOmJvb2xlYW47XG5cdFx0dmFyIGlzRGVwZW5kZW5jeTpib29sZWFuID0gKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5ICE9IHRoaXMuX2Jhc2VEZXBlbmRlbmN5KTtcblx0XHR2YXIgbG9hZGVyOlVSTExvYWRlciA9IDxVUkxMb2FkZXI+IGV2ZW50LnRhcmdldDsvL1RPRE86IGtlZXAgb24gZXllIG9uIHRoaXMgb25lXG5cblx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKGxvYWRlcik7XG5cblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKElPRXJyb3JFdmVudC5JT19FUlJPUiApKSB7XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdFx0aGFuZGxlZCA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIFRPRE86IENvbnNpZGVyIG5vdCBkb2luZyB0aGlzIGV2ZW4gd2hlbiBBc3NldExvYWRlciBkb2VzIGhhdmUgaXQncyBvd24gTE9BRF9FUlJPUiBsaXN0ZW5lclxuXHRcdFx0dmFyIGk6bnVtYmVyLCBsZW46bnVtYmVyID0gdGhpcy5fZXJyb3JIYW5kbGVycy5sZW5ndGg7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHRcdGlmICghaGFuZGxlZClcblx0XHRcdFx0XHRoYW5kbGVkID0gPGJvb2xlYW4+IHRoaXMuX2Vycm9ySGFuZGxlcnNbaV0oZXZlbnQpO1xuXHRcdH1cblxuXHRcdGlmIChoYW5kbGVkKSB7XG5cblx0XHRcdC8vaWYgKGlzRGVwZW5kZW5jeSAmJiAhIGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG5cdFx0XHRpZiAoaXNEZXBlbmRlbmN5KSB7IC8vIFRPRE86IEpTIC8gQVMzIENoYW5nZSAtIHdlIGRvbid0IGhhdmUgaXNEZWZhdWx0UHJldmVudGVkIC0gc28gd2lsbCB0aGlzIHdvcmtcblxuXHRcdFx0XHR0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5yZXNvbHZlRmFpbHVyZSgpO1xuXHRcdFx0XHR0aGlzLnJldHJpZXZlTmV4dCgpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBFaXRoZXIgdGhpcyB3YXMgdGhlIGJhc2UgZmlsZSAobGFzdCBsZWZ0IGluIHRoZSBzdGFjaykgb3Jcblx0XHRcdFx0Ly8gZGVmYXVsdCBiZWhhdmlvciB3YXMgcHJldmVudGVkIGJ5IHRoZSBoYW5kbGVycywgYW5kIGhlbmNlXG5cdFx0XHRcdC8vIHRoZXJlIGlzIG5vdGhpbmcgbW9yZSB0byBkbyB0aGFuIGNsZWFuIHVwIGFuZCBiYWlsLlxuXHRcdFx0XHR0aGlzLmRpc3Bvc2UoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIEVycm9yIGV2ZW50IHdhcyBub3QgaGFuZGxlZCBieSBsaXN0ZW5lcnMgZGlyZWN0bHkgb24gQXNzZXRMb2FkZXIgb3Jcblx0XHRcdC8vIG9uIGFueSBvZiB0aGUgc3Vic2NyaWJlZCBsb2FkZXJzIChpbiB0aGUgbGlzdCBvZiBlcnJvciBoYW5kbGVycy4pXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gYSBkZXBlbmRlbmN5IHBhcnNpbmcgZmFpbGVkLCBhbmQgZGlzcGF0Y2hlcyBhIDxjb2RlPlBhcnNlckV2ZW50LlBBUlNFX0VSUk9SPC9jb2RlPlxuXHQgKiBAcGFyYW0gZXZlbnRcblx0ICovXG5cdHByaXZhdGUgb25QYXJzZUVycm9yKGV2ZW50OlBhcnNlckV2ZW50KVxuXHR7XG5cdFx0dmFyIGhhbmRsZWQ6Ym9vbGVhbjtcblxuXHRcdHZhciBpc0RlcGVuZGVuY3k6Ym9vbGVhbiA9ICh0aGlzLl9jdXJyZW50RGVwZW5kZW5jeSAhPSB0aGlzLl9iYXNlRGVwZW5kZW5jeSk7XG5cblx0XHR2YXIgbG9hZGVyOlVSTExvYWRlciA9IDxVUkxMb2FkZXI+ZXZlbnQudGFyZ2V0O1xuXG5cdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVycyhsb2FkZXIpO1xuXG5cdFx0aWYgKHRoaXMuaGFzRXZlbnRMaXN0ZW5lcihQYXJzZXJFdmVudC5QQVJTRV9FUlJPUikpIHtcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0XHRoYW5kbGVkID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gVE9ETzogQ29uc2lkZXIgbm90IGRvaW5nIHRoaXMgZXZlbiB3aGVuIEFzc2V0TG9hZGVyIGRvZXNcblx0XHRcdC8vIGhhdmUgaXQncyBvd24gTE9BRF9FUlJPUiBsaXN0ZW5lclxuXHRcdFx0dmFyIGk6bnVtYmVyLCBsZW46bnVtYmVyID0gdGhpcy5fcGFyc2VFcnJvckhhbmRsZXJzLmxlbmd0aDtcblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0XHRpZiAoIWhhbmRsZWQpXG5cdFx0XHRcdFx0aGFuZGxlZCA9IDxib29sZWFuPiB0aGlzLl9wYXJzZUVycm9ySGFuZGxlcnNbaV0oZXZlbnQpO1xuXHRcdH1cblxuXHRcdGlmIChoYW5kbGVkKSB7XG5cdFx0XHR0aGlzLmRpc3Bvc2UoKTtcblx0XHRcdHJldHVybjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gRXJyb3IgZXZlbnQgd2FzIG5vdCBoYW5kbGVkIGJ5IGxpc3RlbmVycyBkaXJlY3RseSBvbiBBc3NldExvYWRlciBvclxuXHRcdFx0Ly8gb24gYW55IG9mIHRoZSBzdWJzY3JpYmVkIGxvYWRlcnMgKGluIHRoZSBsaXN0IG9mIGVycm9yIGhhbmRsZXJzLilcblx0XHRcdHRocm93IG5ldyBFcnJvcihldmVudC5tZXNzYWdlKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIG9uQXNzZXRDb21wbGV0ZShldmVudDpBc3NldEV2ZW50KVxuXHR7XG5cdFx0Ly8gQWRkIGxvYWRlZCBhc3NldCB0byBsaXN0IG9mIGFzc2V0cyByZXRyaWV2ZWQgYXMgcGFydFxuXHRcdC8vIG9mIHRoZSBjdXJyZW50IGRlcGVuZGVuY3kuIFRoaXMgbGlzdCB3aWxsIGJlIGluc3BlY3RlZFxuXHRcdC8vIGJ5IHRoZSBwYXJlbnQgcGFyc2VyIHdoZW4gZGVwZW5kZW5jeSBpcyByZXNvbHZlZFxuXHRcdGlmICh0aGlzLl9jdXJyZW50RGVwZW5kZW5jeSlcblx0XHRcdHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5LmFzc2V0cy5wdXNoKGV2ZW50LmFzc2V0KTtcblxuXHRcdGV2ZW50LmFzc2V0LnJlc2V0QXNzZXRQYXRoKGV2ZW50LmFzc2V0Lm5hbWUsIHRoaXMuX25hbWVzcGFjZSk7XG5cblx0XHRpZiAoIXRoaXMuX2N1cnJlbnREZXBlbmRlbmN5LnN1cHByZXNBc3NldEV2ZW50cylcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdH1cblxuXHRwcml2YXRlIG9uUmVhZHlGb3JEZXBlbmRlbmNpZXMoZXZlbnQ6UGFyc2VyRXZlbnQpXG5cdHtcblx0XHR2YXIgcGFyc2VyOlBhcnNlckJhc2UgPSA8UGFyc2VyQmFzZT4gZXZlbnQudGFyZ2V0O1xuXG5cdFx0aWYgKHRoaXMuX2NvbnRleHQgJiYgIXRoaXMuX2NvbnRleHQuaW5jbHVkZURlcGVuZGVuY2llcylcblx0XHRcdHBhcnNlci5faVJlc3VtZVBhcnNpbmdBZnRlckRlcGVuZGVuY2llcygpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMucmV0cmlldmVQYXJzZXJEZXBlbmRlbmNpZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgd2hlbiBhIHNpbmdsZSBkZXBlbmRlbmN5IHdhcyBwYXJzZWQsIGFuZCBwdXNoZXMgZnVydGhlciBkZXBlbmRlbmNpZXMgb250byB0aGUgc3RhY2suXG5cdCAqIEBwYXJhbSBldmVudFxuXHQgKi9cblx0cHJpdmF0ZSBvbkxvYWRDb21wbGV0ZShldmVudDpFdmVudClcblx0e1xuXHRcdHZhciBsb2FkZXI6VVJMTG9hZGVyID0gPFVSTExvYWRlcj4gZXZlbnQudGFyZ2V0O1xuXG5cdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVycyhsb2FkZXIpO1xuXG5cdFx0Ly8gUmVzb2x2ZSB0aGlzIGRlcGVuZGVuY3lcblx0XHR0aGlzLl9jdXJyZW50RGVwZW5kZW5jeS5faVNldERhdGEobG9hZGVyLmRhdGEpO1xuXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5LnJldHJpZXZlQXNSYXdEYXRhKSB7XG5cdFx0XHQvLyBObyBuZWVkIHRvIHBhcnNlIHRoaXMgZGF0YSwgd2hpY2ggc2hvdWxkIGJlIHJldHVybmVkIGFzIGlzXG5cdFx0XHR0aGlzLnJlc29sdmVQYXJzZXJEZXBlbmRlbmNpZXMoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5wYXJzZURlcGVuZGVuY3kodGhpcy5fY3VycmVudERlcGVuZGVuY3kpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgd2hlbiBwYXJzaW5nIGlzIGNvbXBsZXRlLlxuXHQgKi9cblx0cHJpdmF0ZSBvblBhcnNlQ29tcGxldGUoZXZlbnQ6UGFyc2VyRXZlbnQpOnZvaWRcblx0e1xuXHRcdHZhciBwYXJzZXI6UGFyc2VyQmFzZSA9IDxQYXJzZXJCYXNlPiBldmVudC50YXJnZXQ7XG5cblx0XHR0aGlzLnJlc29sdmVQYXJzZXJEZXBlbmRlbmNpZXMoKTsvL3Jlc29sdmUgaW4gZnJvbnQgb2YgcmVtb3ZpbmcgbGlzdGVuZXJzIHRvIGFsbG93IGFueSByZW1haW5pbmcgYXNzZXQgZXZlbnRzIHRvIHByb3BhZ2F0ZVxuXG5cdFx0cGFyc2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoUGFyc2VyRXZlbnQuUkVBRFlfRk9SX0RFUEVOREVOQ0lFUywgdGhpcy5fb25SZWFkeUZvckRlcGVuZGVuY2llc0RlbGVnYXRlKTtcblx0XHRwYXJzZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihQYXJzZXJFdmVudC5QQVJTRV9DT01QTEVURSwgdGhpcy5fb25QYXJzZUNvbXBsZXRlRGVsZWdhdGUpO1xuXHRcdHBhcnNlci5yZW1vdmVFdmVudExpc3RlbmVyKFBhcnNlckV2ZW50LlBBUlNFX0VSUk9SLCB0aGlzLl9vblBhcnNlRXJyb3JEZWxlZ2F0ZSk7XG5cdFx0cGFyc2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5URVhUVVJFX1NJWkVfRVJST1IsIHRoaXMuX29uVGV4dHVyZVNpemVFcnJvckRlbGVnYXRlKTtcblx0XHRwYXJzZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCB0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gYW4gaW1hZ2UgaXMgdG9vIGxhcmdlIG9yIGl0J3MgZGltZW5zaW9ucyBhcmUgbm90IGEgcG93ZXIgb2YgMlxuXHQgKiBAcGFyYW0gZXZlbnRcblx0ICovXG5cdHByaXZhdGUgb25UZXh0dXJlU2l6ZUVycm9yKGV2ZW50OkFzc2V0RXZlbnQpXG5cdHtcblx0XHRldmVudC5hc3NldC5uYW1lID0gdGhpcy5fY3VycmVudERlcGVuZGVuY3kucmVzb2x2ZU5hbWUoZXZlbnQuYXNzZXQpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0fVxuXG5cdHByaXZhdGUgYWRkRXZlbnRMaXN0ZW5lcnMobG9hZGVyOlVSTExvYWRlcilcblx0e1xuXHRcdGxvYWRlci5hZGRFdmVudExpc3RlbmVyKEV2ZW50LkNPTVBMRVRFLCB0aGlzLl9vbkxvYWRDb21wbGV0ZURlbGVnYXRlKTtcblx0XHRsb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihJT0Vycm9yRXZlbnQuSU9fRVJST1IsIHRoaXMuX29uTG9hZEVycm9yRGVsZWdhdGUpO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVFdmVudExpc3RlbmVycyhsb2FkZXI6VVJMTG9hZGVyKVxuXHR7XG5cdFx0bG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoRXZlbnQuQ09NUExFVEUsIHRoaXMuX29uTG9hZENvbXBsZXRlRGVsZWdhdGUpO1xuXHRcdGxvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKElPRXJyb3JFdmVudC5JT19FUlJPUiwgdGhpcy5fb25Mb2FkRXJyb3JEZWxlZ2F0ZSk7XG5cdH1cblxuXHRwdWJsaWMgc3RvcCgpXG5cdHtcblx0XHR0aGlzLmRpc3Bvc2UoKTtcblx0fVxuXG5cdHByaXZhdGUgZGlzcG9zZSgpXG5cdHtcblx0XHR0aGlzLl9lcnJvckhhbmRsZXJzID0gbnVsbDtcblx0XHR0aGlzLl9wYXJzZUVycm9ySGFuZGxlcnMgPSBudWxsO1xuXHRcdHRoaXMuX2NvbnRleHQgPSBudWxsO1xuXHRcdHRoaXMuX3Rva2VuID0gbnVsbDtcblx0XHR0aGlzLl9zdGFjayA9IG51bGw7XG5cblx0XHRpZiAodGhpcy5fY3VycmVudERlcGVuZGVuY3kgJiYgdGhpcy5fY3VycmVudERlcGVuZGVuY3kuX2lMb2FkZXIpXG5cdFx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5Ll9pTG9hZGVyKTtcblxuXHRcdHRoaXMuX2N1cnJlbnREZXBlbmRlbmN5ID0gbnVsbDtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgYnkgb3RoZXIgbG9hZGVyIGNsYXNzZXMgKGUuZy4gTG9hZGVyM0QgYW5kIEFzc2V0TGlicmFyeUJ1bmRsZSkgdG9cblx0ICogYWRkIGVycm9yIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgQXNzZXRMb2FkZXIgaW5zdGFuY2UuIFRoaXMgc3lzdGVtIGlzIHVzZWQgaW5zdGVhZCBvZlxuXHQgKiB0aGUgcmVndWxhciBFdmVudERpc3BhdGNoZXIgc3lzdGVtIHNvIHRoYXQgdGhlIEFzc2V0TGlicmFyeSBlcnJvciBoYW5kbGVyIGNhbiBiZSBzdXJlXG5cdCAqIHRoYXQgaWYgaGFzRXZlbnRMaXN0ZW5lcigpIHJldHVybnMgdHJ1ZSwgaXQncyBjbGllbnQgY29kZSB0aGF0J3MgbGlzdGVuaW5nIGZvciB0aGVcblx0ICogZXZlbnQuIFNlY29uZGx5LCBmdW5jdGlvbnMgYWRkZWQgYXMgZXJyb3IgaGFuZGxlciB0aHJvdWdoIHRoaXMgY3VzdG9tIG1ldGhvZCBhcmVcblx0ICogZXhwZWN0ZWQgdG8gcmV0dXJuIGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGV2ZW50IHdhcyBoYW5kbGVkIChpLmUuXG5cdCAqIHdoZXRoZXIgdGhleSBpbiB0dXJuIGhhZCBhbnkgY2xpZW50IGNvZGUgbGlzdGVuaW5nIGZvciB0aGUgZXZlbnQuKSBJZiBubyBoYW5kbGVyc1xuXHQgKiByZXR1cm4gdHJ1ZSwgdGhlIEFzc2V0TG9hZGVyIGtub3dzIHRoYXQgdGhlIGV2ZW50IHdhc24ndCBoYW5kbGVkIGFuZCB3aWxsIHRocm93IGFuIFJURS5cblx0ICovXG5cblx0cHVibGljIF9pQWRkUGFyc2VFcnJvckhhbmRsZXIoaGFuZGxlcilcblx0e1xuXHRcdGlmICh0aGlzLl9wYXJzZUVycm9ySGFuZGxlcnMuaW5kZXhPZihoYW5kbGVyKSA8IDApXG5cdFx0XHR0aGlzLl9wYXJzZUVycm9ySGFuZGxlcnMucHVzaChoYW5kbGVyKTtcblx0fVxuXG5cdHB1YmxpYyBfaUFkZEVycm9ySGFuZGxlcihoYW5kbGVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2Vycm9ySGFuZGxlcnMuaW5kZXhPZihoYW5kbGVyKSA8IDApXG5cdFx0XHR0aGlzLl9lcnJvckhhbmRsZXJzLnB1c2goaGFuZGxlcik7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBHdWVzc2VzIHRoZSBwYXJzZXIgdG8gYmUgdXNlZCBiYXNlZCBvbiB0aGUgZmlsZSBjb250ZW50cy5cblx0ICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gYmUgcGFyc2VkLlxuXHQgKiBAcGFyYW0gdXJpIFRoZSB1cmwgb3IgaWQgb2YgdGhlIG9iamVjdCB0byBiZSBwYXJzZWQuXG5cdCAqIEByZXR1cm4gQW4gaW5zdGFuY2Ugb2YgdGhlIGd1ZXNzZWQgcGFyc2VyLlxuXHQgKi9cblx0cHJpdmF0ZSBnZXRQYXJzZXJGcm9tRGF0YShkYXRhOmFueSk6UGFyc2VyQmFzZVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSBBc3NldExvYWRlci5fcGFyc2Vycy5sZW5ndGg7XG5cblx0XHQvLyBnbyBpbiByZXZlcnNlIG9yZGVyIHRvIGFsbG93IGFwcGxpY2F0aW9uIG92ZXJyaWRlIG9mIGRlZmF1bHQgcGFyc2VyIGFkZGVkIGluIGF3YXkucHJvcGVyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSBsZW4gLSAxOyBpID49IDA7IGktLSlcblx0XHRcdGlmIChBc3NldExvYWRlci5fcGFyc2Vyc1tpXS5zdXBwb3J0c0RhdGEoZGF0YSkpXG5cdFx0XHRcdHJldHVybiBuZXcgQXNzZXRMb2FkZXIuX3BhcnNlcnNbaV0oKTtcblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblxuXHQvKipcblx0ICogSW5pdGlhdGVzIHBhcnNpbmcgb2YgdGhlIGxvYWRlZCBkZXBlbmRlbmN5LlxuXHQgKlxuXHQgKiBAcGFyYW0gVGhlIGRlcGVuZGVuY3kgdG8gYmUgcGFyc2VkLlxuXHQgKi9cblx0cHJpdmF0ZSBwYXJzZURlcGVuZGVuY3koZGVwZW5kZW5jeTpSZXNvdXJjZURlcGVuZGVuY3kpOnZvaWRcblx0e1xuXHRcdHZhciBwYXJzZXI6UGFyc2VyQmFzZSA9IGRlcGVuZGVuY3kucGFyc2VyO1xuXG5cdFx0Ly8gSWYgbm8gcGFyc2VyIGhhcyBiZWVuIGRlZmluZWQsIHRyeSB0byBmaW5kIG9uZSBieSBsZXR0aW5nXG5cdFx0Ly8gYWxsIHBsdWdnZWQgaW4gcGFyc2VycyBpbnNwZWN0IHRoZSBhY3R1YWwgZGF0YS5cblx0XHRpZiAoIXBhcnNlcilcblx0XHRcdGRlcGVuZGVuY3kuX2lTZXRQYXJzZXIocGFyc2VyID0gdGhpcy5nZXRQYXJzZXJGcm9tRGF0YShkZXBlbmRlbmN5LmRhdGEpKTtcblxuXHRcdGlmIChwYXJzZXIpIHtcblx0XHRcdHBhcnNlci5hZGRFdmVudExpc3RlbmVyKFBhcnNlckV2ZW50LlJFQURZX0ZPUl9ERVBFTkRFTkNJRVMsIHRoaXMuX29uUmVhZHlGb3JEZXBlbmRlbmNpZXNEZWxlZ2F0ZSk7XG5cdFx0XHRwYXJzZXIuYWRkRXZlbnRMaXN0ZW5lcihQYXJzZXJFdmVudC5QQVJTRV9DT01QTEVURSwgdGhpcy5fb25QYXJzZUNvbXBsZXRlRGVsZWdhdGUpO1xuXHRcdFx0cGFyc2VyLmFkZEV2ZW50TGlzdGVuZXIoUGFyc2VyRXZlbnQuUEFSU0VfRVJST1IsIHRoaXMuX29uUGFyc2VFcnJvckRlbGVnYXRlKTtcblx0XHRcdHBhcnNlci5hZGRFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuVEVYVFVSRV9TSVpFX0VSUk9SLCB0aGlzLl9vblRleHR1cmVTaXplRXJyb3JEZWxlZ2F0ZSk7XG5cdFx0XHRwYXJzZXIuYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCB0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSk7XG5cblx0XHRcdGlmIChkZXBlbmRlbmN5LnJlcXVlc3QgJiYgZGVwZW5kZW5jeS5yZXF1ZXN0LnVybClcblx0XHRcdFx0cGFyc2VyLl9pRmlsZU5hbWUgPSBkZXBlbmRlbmN5LnJlcXVlc3QudXJsO1xuXG5cdFx0XHRwYXJzZXIubWF0ZXJpYWxNb2RlID0gdGhpcy5fbWF0ZXJpYWxNb2RlO1xuXG5cdFx0XHRwYXJzZXIucGFyc2VBc3luYyhkZXBlbmRlbmN5LmRhdGEpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBtZXNzYWdlOnN0cmluZyA9IFwiTm8gcGFyc2VyIGRlZmluZWQuIFRvIGVuYWJsZSBhbGwgcGFyc2VycyBmb3IgYXV0by1kZXRlY3Rpb24sIHVzZSBQYXJzZXJzLmVuYWJsZUFsbEJ1bmRsZWQoKVwiXG5cdFx0XHRpZih0aGlzLmhhc0V2ZW50TGlzdGVuZXIoUGFyc2VyRXZlbnQuUEFSU0VfRVJST1IpKVxuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFBhcnNlckV2ZW50KFBhcnNlckV2ZW50LlBBUlNFX0VSUk9SLCBtZXNzYWdlKSk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR3Vlc3NlcyB0aGUgcGFyc2VyIHRvIGJlIHVzZWQgYmFzZWQgb24gdGhlIGZpbGUgZXh0ZW5zaW9uLlxuXHQgKiBAcmV0dXJuIEFuIGluc3RhbmNlIG9mIHRoZSBndWVzc2VkIHBhcnNlci5cblx0ICovXG5cdHByaXZhdGUgZ2V0UGFyc2VyRnJvbVN1ZmZpeCh1cmw6c3RyaW5nKTpQYXJzZXJCYXNlXG5cdHtcblx0XHQvLyBHZXQgcmlkIG9mIHF1ZXJ5IHN0cmluZyBpZiBhbnkgYW5kIGV4dHJhY3QgZXh0ZW5zaW9uXG5cdFx0dmFyIGJhc2U6c3RyaW5nID0gKHVybC5pbmRleE9mKCc/JykgPiAwKT8gdXJsLnNwbGl0KCc/JylbMF0gOiB1cmw7XG5cdFx0dmFyIGZpbGVFeHRlbnNpb246c3RyaW5nID0gYmFzZS5zdWJzdHIoYmFzZS5sYXN0SW5kZXhPZignLicpICsgMSkudG9Mb3dlckNhc2UoKTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gQXNzZXRMb2FkZXIuX3BhcnNlcnMubGVuZ3RoO1xuXG5cdFx0Ly8gZ28gaW4gcmV2ZXJzZSBvcmRlciB0byBhbGxvdyBhcHBsaWNhdGlvbiBvdmVycmlkZSBvZiBkZWZhdWx0IHBhcnNlciBhZGRlZCBpbiBhd2F5LnByb3BlclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gbGVuIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdHZhciBwYXJzZXJDbGFzczphbnkgPSBBc3NldExvYWRlci5fcGFyc2Vyc1tpXTtcblx0XHRcdGlmIChwYXJzZXJDbGFzcy5zdXBwb3J0c1R5cGUoZmlsZUV4dGVuc2lvbikpXG5cdFx0XHRcdHJldHVybiBuZXcgcGFyc2VyQ2xhc3MoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5leHBvcnQgPSBBc3NldExvYWRlcjsiXX0=