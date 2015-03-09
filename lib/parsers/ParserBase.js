var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var AssetEvent = require("awayjs-core/lib/events/AssetEvent");
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var ParserEvent = require("awayjs-core/lib/events/ParserEvent");
var TimerEvent = require("awayjs-core/lib/events/TimerEvent");
var ParserUtils = require("awayjs-core/lib/parsers/ParserUtils");
var ResourceDependency = require("awayjs-core/lib/parsers/ResourceDependency");
var TextureUtils = require("awayjs-core/lib/utils/TextureUtils");
var Timer = require("awayjs-core/lib/utils/Timer");
var getTimer = require("awayjs-core/lib/utils/getTimer");
/**
 * <code>ParserBase</code> provides an abstract base class for objects that convert blocks of data to data structures
 * supported by away.
 *
 * If used by <code>AssetLoader</code> to automatically determine the parser type, two public static methods should
 * be implemented, with the following signatures:
 *
 * <code>public static supportsType(extension : string) : boolean</code>
 * Indicates whether or not a given file extension is supported by the parser.
 *
 * <code>public static supportsData(data : *) : boolean</code>
 * Tests whether a data block can be parsed by the parser.
 *
 * Furthermore, for any concrete subtype, the method <code>initHandle</code> should be overridden to immediately
 * create the object that will contain the parsed data. This allows <code>ResourceManager</code> to return an object
 * handle regardless of whether the object was loaded or not.
 *
 * @see AssetLoader
 */
var ParserBase = (function (_super) {
    __extends(ParserBase, _super);
    /**
     * Creates a new ParserBase object
     * @param format The data format of the file data to be parsed. Can be either <code>ParserDataFormat.BINARY</code> or <code>ParserDataFormat.PLAIN_TEXT</code>, and should be provided by the concrete subtype.
     *
     * @see away.loading.parsers.ParserDataFormat
     */
    function ParserBase(format) {
        var _this = this;
        _super.call(this);
        this._materialMode = 0;
        this._dataFormat = format;
        this._dependencies = new Array();
        this._pOnIntervalDelegate = function (event) { return _this._pOnInterval(event); };
    }
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // TODO: add error checking for the following ( could cause a problem if this function is not implemented )
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Needs to be implemented in all Parsers (
    //<code>public static supportsType(extension : string) : boolean</code>
    //* Indicates whether or not a given file extension is supported by the parser.
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------
    ParserBase.supportsType = function (extension) {
        throw new AbstractMethodError();
    };
    Object.defineProperty(ParserBase.prototype, "content", {
        /* Protected */
        get: function () {
            return this._pContent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Validates a bitmapData loaded before assigning to a default BitmapMaterial
     */
    ParserBase.prototype.isBitmapDataValid = function (bitmapData) {
        var isValid = TextureUtils.isBitmapDataValid(bitmapData);
        if (!isValid) {
            console.log(">> Bitmap loaded is not having power of 2 dimensions or is higher than 2048");
        }
        return isValid;
    };
    Object.defineProperty(ParserBase.prototype, "parsingFailure", {
        get: function () {
            return this._parsingFailure;
        },
        set: function (b) {
            this._parsingFailure = b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParserBase.prototype, "parsingPaused", {
        get: function () {
            return this._parsingPaused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParserBase.prototype, "parsingComplete", {
        get: function () {
            return this._parsingComplete;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParserBase.prototype, "materialMode", {
        get: function () {
            return this._materialMode;
        },
        set: function (newMaterialMode) {
            this._materialMode = newMaterialMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParserBase.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParserBase.prototype, "dataFormat", {
        /**
         * The data format of the file data to be parsed. Options are <code>URLLoaderDataFormat.BINARY</code>, <code>URLLoaderDataFormat.ARRAY_BUFFER</code>, <code>URLLoaderDataFormat.BLOB</code>, <code>URLLoaderDataFormat.VARIABLES</code> or <code>URLLoaderDataFormat.TEXT</code>.
         */
        get: function () {
            return this._dataFormat;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Parse data (possibly containing bytearry, plain text or BitmapAsset) asynchronously, meaning that
     * the parser will periodically stop parsing so that the AVM may proceed to the
     * next frame.
     *
     * @param data The untyped data object in which the loaded data resides.
     * @param frameLimit number of milliseconds of parsing allowed per frame. The
     * actual time spent on a frame can exceed this number since time-checks can
     * only be performed between logical sections of the parsing procedure.
     */
    ParserBase.prototype.parseAsync = function (data, frameLimit) {
        if (frameLimit === void 0) { frameLimit = 30; }
        this._data = data;
        this._pStartParsing(frameLimit);
    };
    Object.defineProperty(ParserBase.prototype, "dependencies", {
        /**
         * A list of dependencies that need to be loaded and resolved for the object being parsed.
         */
        get: function () {
            return this._dependencies;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resolve a dependency when it's loaded. For example, a dependency containing an ImageResource would be assigned
     * to a Mesh instance as a BitmapMaterial, a scene graph object would be added to its intended parent. The
     * dependency should be a member of the dependencies property.
     *
     * @param resourceDependency The dependency to be resolved.
     */
    ParserBase.prototype._iResolveDependency = function (resourceDependency) {
        throw new AbstractMethodError();
    };
    /**
     * Resolve a dependency loading failure. Used by parser to eventually provide a default map
     *
     * @param resourceDependency The dependency to be resolved.
     */
    ParserBase.prototype._iResolveDependencyFailure = function (resourceDependency) {
        throw new AbstractMethodError();
    };
    /**
     * Resolve a dependency name
     *
     * @param resourceDependency The dependency to be resolved.
     */
    ParserBase.prototype._iResolveDependencyName = function (resourceDependency, asset) {
        return asset.name;
    };
    ParserBase.prototype._iResumeParsingAfterDependencies = function () {
        this._parsingPaused = false;
        if (this._timer)
            this._timer.start();
    };
    ParserBase.prototype._pFinalizeAsset = function (asset, name) {
        if (name === void 0) { name = null; }
        var type_event;
        var type_name;
        if (name != null)
            asset.name = name;
        // If the asset has no name, give it
        // a per-type default name.
        if (!asset.name)
            asset.name = asset.assetType;
        this.dispatchEvent(new AssetEvent(AssetEvent.ASSET_COMPLETE, asset));
    };
    /**
     * Parse the next block of data.
     * @return Whether or not more data needs to be parsed. Can be <code>ParserBase.ParserBase.PARSING_DONE</code> or
     * <code>ParserBase.ParserBase.MORE_TO_PARSE</code>.
     */
    ParserBase.prototype._pProceedParsing = function () {
        throw new AbstractMethodError();
    };
    ParserBase.prototype._pDieWithError = function (message) {
        if (message === void 0) { message = 'Unknown parsing error'; }
        if (this._timer) {
            this._timer.removeEventListener(TimerEvent.TIMER, this._pOnIntervalDelegate);
            this._timer.stop();
            this._timer = null;
        }
        this.dispatchEvent(new ParserEvent(ParserEvent.PARSE_ERROR, message));
    };
    ParserBase.prototype._pAddDependency = function (id, req, retrieveAsRawData, data, suppressErrorEvents) {
        if (retrieveAsRawData === void 0) { retrieveAsRawData = false; }
        if (data === void 0) { data = null; }
        if (suppressErrorEvents === void 0) { suppressErrorEvents = false; }
        var dependency = new ResourceDependency(id, req, data, null, this, retrieveAsRawData, suppressErrorEvents);
        this._dependencies.push(dependency);
        return dependency;
    };
    ParserBase.prototype._pPauseAndRetrieveDependencies = function () {
        if (this._timer)
            this._timer.stop();
        this._parsingPaused = true;
        this.dispatchEvent(new ParserEvent(ParserEvent.READY_FOR_DEPENDENCIES));
    };
    /**
     * Tests whether or not there is still time left for parsing within the maximum allowed time frame per session.
     * @return True if there is still time left, false if the maximum allotted time was exceeded and parsing should be interrupted.
     */
    ParserBase.prototype._pHasTime = function () {
        return ((getTimer() - this._lastFrameTime) < this._frameLimit);
    };
    /**
     * Called when the parsing pause interval has passed and parsing can proceed.
     */
    ParserBase.prototype._pOnInterval = function (event) {
        if (event === void 0) { event = null; }
        this._lastFrameTime = getTimer();
        if (this._pProceedParsing() && !this._parsingFailure)
            this._pFinishParsing();
    };
    /**
     * Initializes the parsing of data.
     * @param frameLimit The maximum duration of a parsing session.
     */
    ParserBase.prototype._pStartParsing = function (frameLimit) {
        this._frameLimit = frameLimit;
        this._timer = new Timer(this._frameLimit, 0);
        this._timer.addEventListener(TimerEvent.TIMER, this._pOnIntervalDelegate);
        this._timer.start();
    };
    /**
     * Finish parsing the data.
     */
    ParserBase.prototype._pFinishParsing = function () {
        if (this._timer) {
            this._timer.removeEventListener(TimerEvent.TIMER, this._pOnIntervalDelegate);
            this._timer.stop();
        }
        this._timer = null;
        this._parsingComplete = true;
        this.dispatchEvent(new ParserEvent(ParserEvent.PARSE_COMPLETE));
    };
    /**
     *
     * @returns {string}
     * @private
     */
    ParserBase.prototype._pGetTextData = function () {
        return ParserUtils.toString(this._data);
    };
    /**
     *
     * @returns {string}
     * @private
     */
    ParserBase.prototype._pGetByteData = function () {
        return ParserUtils.toByteArray(this._data);
    };
    /**
     * Returned by <code>proceedParsing</code> to indicate no more parsing is needed.
     */
    ParserBase.PARSING_DONE = true;
    /* Protected */
    /**
     * Returned by <code>proceedParsing</code> to indicate more parsing is needed, allowing asynchronous parsing.
     */
    ParserBase.MORE_TO_PARSE = false;
    return ParserBase;
})(EventDispatcher);
module.exports = ParserBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlckJhc2UudHMiXSwibmFtZXMiOlsiUGFyc2VyQmFzZSIsIlBhcnNlckJhc2UuY29uc3RydWN0b3IiLCJQYXJzZXJCYXNlLnN1cHBvcnRzVHlwZSIsIlBhcnNlckJhc2UuY29udGVudCIsIlBhcnNlckJhc2UuaXNCaXRtYXBEYXRhVmFsaWQiLCJQYXJzZXJCYXNlLnBhcnNpbmdGYWlsdXJlIiwiUGFyc2VyQmFzZS5wYXJzaW5nUGF1c2VkIiwiUGFyc2VyQmFzZS5wYXJzaW5nQ29tcGxldGUiLCJQYXJzZXJCYXNlLm1hdGVyaWFsTW9kZSIsIlBhcnNlckJhc2UuZGF0YSIsIlBhcnNlckJhc2UuZGF0YUZvcm1hdCIsIlBhcnNlckJhc2UucGFyc2VBc3luYyIsIlBhcnNlckJhc2UuZGVwZW5kZW5jaWVzIiwiUGFyc2VyQmFzZS5faVJlc29sdmVEZXBlbmRlbmN5IiwiUGFyc2VyQmFzZS5faVJlc29sdmVEZXBlbmRlbmN5RmFpbHVyZSIsIlBhcnNlckJhc2UuX2lSZXNvbHZlRGVwZW5kZW5jeU5hbWUiLCJQYXJzZXJCYXNlLl9pUmVzdW1lUGFyc2luZ0FmdGVyRGVwZW5kZW5jaWVzIiwiUGFyc2VyQmFzZS5fcEZpbmFsaXplQXNzZXQiLCJQYXJzZXJCYXNlLl9wUHJvY2VlZFBhcnNpbmciLCJQYXJzZXJCYXNlLl9wRGllV2l0aEVycm9yIiwiUGFyc2VyQmFzZS5fcEFkZERlcGVuZGVuY3kiLCJQYXJzZXJCYXNlLl9wUGF1c2VBbmRSZXRyaWV2ZURlcGVuZGVuY2llcyIsIlBhcnNlckJhc2UuX3BIYXNUaW1lIiwiUGFyc2VyQmFzZS5fcE9uSW50ZXJ2YWwiLCJQYXJzZXJCYXNlLl9wU3RhcnRQYXJzaW5nIiwiUGFyc2VyQmFzZS5fcEZpbmlzaFBhcnNpbmciLCJQYXJzZXJCYXNlLl9wR2V0VGV4dERhdGEiLCJQYXJzZXJCYXNlLl9wR2V0Qnl0ZURhdGEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLElBQU8sbUJB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LE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1lBQ2pCQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0E7WUFDN0VBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBQ3BCQSxDQUFDQTtRQUVEQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUNuQkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUU3QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsV0FBV0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDakVBLENBQUNBO0lBRUR6Qjs7OztPQUlHQTtJQUNJQSxrQ0FBYUEsR0FBcEJBO1FBRUMwQixNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtJQUN6Q0EsQ0FBQ0E7SUFFRDFCOzs7O09BSUdBO0lBQ0lBLGtDQUFhQSxHQUFwQkE7UUFFQzJCLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO0lBQzVDQSxDQUFDQTtJQXRSRDNCOztPQUVHQTtJQUNXQSx1QkFBWUEsR0FBV0EsSUFBSUEsQ0FBQ0E7SUFDMUNBLGVBQWVBO0lBRWZBOztPQUVHQTtJQUNXQSx3QkFBYUEsR0FBV0EsS0FBS0EsQ0FBQ0E7SUE4UTdDQSxpQkFBQ0E7QUFBREEsQ0FoVUEsQUFnVUNBLEVBaFV3QixlQUFlLEVBZ1V2QztBQUVELEFBQW9CLGlCQUFYLFVBQVUsQ0FBQyIsImZpbGUiOiJwYXJzZXJzL1BhcnNlckJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJpdG1hcERhdGFcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0JpdG1hcERhdGFcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBVUkxSZXF1ZXN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbmV0L1VSTFJlcXVlc3RcIik7XG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XG5pbXBvcnQgQXNzZXRFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9Bc3NldEV2ZW50XCIpO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCIpO1xuaW1wb3J0IFBhcnNlckV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL1BhcnNlckV2ZW50XCIpO1xuaW1wb3J0IFRpbWVyRXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvVGltZXJFdmVudFwiKTtcbmltcG9ydCBQYXJzZXJVdGlsc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3BhcnNlcnMvUGFyc2VyVXRpbHNcIik7XG5pbXBvcnQgUmVzb3VyY2VEZXBlbmRlbmN5XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1Jlc291cmNlRGVwZW5kZW5jeVwiKTtcbmltcG9ydCBCeXRlQXJyYXlcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi91dGlscy9CeXRlQXJyYXlcIik7XG5pbXBvcnQgVGV4dHVyZVV0aWxzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvVGV4dHVyZVV0aWxzXCIpO1xuaW1wb3J0IFRpbWVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi91dGlscy9UaW1lclwiKTtcbmltcG9ydCBnZXRUaW1lclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvZ2V0VGltZXJcIik7XG5cbi8qKlxuICogPGNvZGU+UGFyc2VyQmFzZTwvY29kZT4gcHJvdmlkZXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzcyBmb3Igb2JqZWN0cyB0aGF0IGNvbnZlcnQgYmxvY2tzIG9mIGRhdGEgdG8gZGF0YSBzdHJ1Y3R1cmVzXG4gKiBzdXBwb3J0ZWQgYnkgYXdheS5cbiAqXG4gKiBJZiB1c2VkIGJ5IDxjb2RlPkFzc2V0TG9hZGVyPC9jb2RlPiB0byBhdXRvbWF0aWNhbGx5IGRldGVybWluZSB0aGUgcGFyc2VyIHR5cGUsIHR3byBwdWJsaWMgc3RhdGljIG1ldGhvZHMgc2hvdWxkXG4gKiBiZSBpbXBsZW1lbnRlZCwgd2l0aCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZXM6XG4gKlxuICogPGNvZGU+cHVibGljIHN0YXRpYyBzdXBwb3J0c1R5cGUoZXh0ZW5zaW9uIDogc3RyaW5nKSA6IGJvb2xlYW48L2NvZGU+XG4gKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgYSBnaXZlbiBmaWxlIGV4dGVuc2lvbiBpcyBzdXBwb3J0ZWQgYnkgdGhlIHBhcnNlci5cbiAqXG4gKiA8Y29kZT5wdWJsaWMgc3RhdGljIHN1cHBvcnRzRGF0YShkYXRhIDogKikgOiBib29sZWFuPC9jb2RlPlxuICogVGVzdHMgd2hldGhlciBhIGRhdGEgYmxvY2sgY2FuIGJlIHBhcnNlZCBieSB0aGUgcGFyc2VyLlxuICpcbiAqIEZ1cnRoZXJtb3JlLCBmb3IgYW55IGNvbmNyZXRlIHN1YnR5cGUsIHRoZSBtZXRob2QgPGNvZGU+aW5pdEhhbmRsZTwvY29kZT4gc2hvdWxkIGJlIG92ZXJyaWRkZW4gdG8gaW1tZWRpYXRlbHlcbiAqIGNyZWF0ZSB0aGUgb2JqZWN0IHRoYXQgd2lsbCBjb250YWluIHRoZSBwYXJzZWQgZGF0YS4gVGhpcyBhbGxvd3MgPGNvZGU+UmVzb3VyY2VNYW5hZ2VyPC9jb2RlPiB0byByZXR1cm4gYW4gb2JqZWN0XG4gKiBoYW5kbGUgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZSBvYmplY3Qgd2FzIGxvYWRlZCBvciBub3QuXG4gKlxuICogQHNlZSBBc3NldExvYWRlclxuICovXG5jbGFzcyBQYXJzZXJCYXNlIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyXG57XG5cdHB1YmxpYyBfaUZpbGVOYW1lOnN0cmluZztcblx0cHJpdmF0ZSBfZGF0YUZvcm1hdDpzdHJpbmc7XG5cdHByaXZhdGUgX2RhdGE6YW55O1xuXHRwcml2YXRlIF9mcmFtZUxpbWl0Om51bWJlcjtcblx0cHJpdmF0ZSBfbGFzdEZyYW1lVGltZTpudW1iZXI7XG5cdHByaXZhdGUgX3BPbkludGVydmFsRGVsZWdhdGU6KGV2ZW50OlRpbWVyRXZlbnQpID0+IHZvaWQ7XG5cdHB1YmxpYyBfcENvbnRlbnQ6SUFzc2V0O1xuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBUT0RPOiBhZGQgZXJyb3IgY2hlY2tpbmcgZm9yIHRoZSBmb2xsb3dpbmcgKCBjb3VsZCBjYXVzZSBhIHByb2JsZW0gaWYgdGhpcyBmdW5jdGlvbiBpcyBub3QgaW1wbGVtZW50ZWQgKVxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gTmVlZHMgdG8gYmUgaW1wbGVtZW50ZWQgaW4gYWxsIFBhcnNlcnMgKFxuXHQvLzxjb2RlPnB1YmxpYyBzdGF0aWMgc3VwcG9ydHNUeXBlKGV4dGVuc2lvbiA6IHN0cmluZykgOiBib29sZWFuPC9jb2RlPlxuXHQvLyogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gZmlsZSBleHRlbnNpb24gaXMgc3VwcG9ydGVkIGJ5IHRoZSBwYXJzZXIuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdHB1YmxpYyBzdGF0aWMgc3VwcG9ydHNUeXBlKGV4dGVuc2lvbjpzdHJpbmcpOmJvb2xlYW5cblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHQvKiBUT0RPOiBJbXBsZW1lbnQgUGFyc2VyVXRpbHM7XG5cdCBwdWJsaWMgX3BHZXRUZXh0RGF0YSgpOnN0cmluZ1xuXHQge1xuXHQgcmV0dXJuIFBhcnNlclV0aWxzLnRvU3RyaW5nKF9kYXRhKTtcblx0IH1cblxuXHQgcHVibGljIF9wR2V0Qnl0ZURhdGEoKTpCeXRlQXJyYXlcblx0IHtcblx0IHJldHVybiBQYXJzZXJVdGlscy50b0J5dGVBcnJheShfZGF0YSk7XG5cdCB9XG5cdCAqL1xuXHRwcml2YXRlIF9kZXBlbmRlbmNpZXM6QXJyYXk8UmVzb3VyY2VEZXBlbmRlbmN5Pjtcblx0cHJpdmF0ZSBfcGFyc2luZ1BhdXNlZDpib29sZWFuO1xuXHRwcml2YXRlIF9wYXJzaW5nQ29tcGxldGU6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfcGFyc2luZ0ZhaWx1cmU6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfdGltZXI6VGltZXI7XG5cdHByaXZhdGUgX21hdGVyaWFsTW9kZTpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFJldHVybmVkIGJ5IDxjb2RlPnByb2NlZWRQYXJzaW5nPC9jb2RlPiB0byBpbmRpY2F0ZSBubyBtb3JlIHBhcnNpbmcgaXMgbmVlZGVkLlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBQQVJTSU5HX0RPTkU6Ym9vbGVhbiA9IHRydWU7XG5cdC8qIFByb3RlY3RlZCAqL1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5lZCBieSA8Y29kZT5wcm9jZWVkUGFyc2luZzwvY29kZT4gdG8gaW5kaWNhdGUgbW9yZSBwYXJzaW5nIGlzIG5lZWRlZCwgYWxsb3dpbmcgYXN5bmNocm9ub3VzIHBhcnNpbmcuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIE1PUkVfVE9fUEFSU0U6Ym9vbGVhbiA9IGZhbHNlO1xuXHQvKiBQcm90ZWN0ZWQgKi9cblxuXG5cdHB1YmxpYyBnZXQgY29udGVudCgpOklBc3NldFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BDb250ZW50O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgUGFyc2VyQmFzZSBvYmplY3Rcblx0ICogQHBhcmFtIGZvcm1hdCBUaGUgZGF0YSBmb3JtYXQgb2YgdGhlIGZpbGUgZGF0YSB0byBiZSBwYXJzZWQuIENhbiBiZSBlaXRoZXIgPGNvZGU+UGFyc2VyRGF0YUZvcm1hdC5CSU5BUlk8L2NvZGU+IG9yIDxjb2RlPlBhcnNlckRhdGFGb3JtYXQuUExBSU5fVEVYVDwvY29kZT4sIGFuZCBzaG91bGQgYmUgcHJvdmlkZWQgYnkgdGhlIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAqXG5cdCAqIEBzZWUgYXdheS5sb2FkaW5nLnBhcnNlcnMuUGFyc2VyRGF0YUZvcm1hdFxuXHQgKi9cblx0Y29uc3RydWN0b3IoZm9ybWF0OnN0cmluZylcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9tYXRlcmlhbE1vZGUgPSAwO1xuXHRcdHRoaXMuX2RhdGFGb3JtYXQgPSBmb3JtYXQ7XG5cdFx0dGhpcy5fZGVwZW5kZW5jaWVzID0gbmV3IEFycmF5PFJlc291cmNlRGVwZW5kZW5jeT4oKTtcblxuXHRcdHRoaXMuX3BPbkludGVydmFsRGVsZWdhdGUgPSAoZXZlbnQ6VGltZXJFdmVudCkgPT4gdGhpcy5fcE9uSW50ZXJ2YWwoZXZlbnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFZhbGlkYXRlcyBhIGJpdG1hcERhdGEgbG9hZGVkIGJlZm9yZSBhc3NpZ25pbmcgdG8gYSBkZWZhdWx0IEJpdG1hcE1hdGVyaWFsXG5cdCAqL1xuXG5cdHB1YmxpYyBpc0JpdG1hcERhdGFWYWxpZChiaXRtYXBEYXRhOkJpdG1hcERhdGEpOmJvb2xlYW5cblx0e1xuXHRcdHZhciBpc1ZhbGlkOmJvb2xlYW4gPSBUZXh0dXJlVXRpbHMuaXNCaXRtYXBEYXRhVmFsaWQoYml0bWFwRGF0YSk7XG5cblx0XHRpZiAoIWlzVmFsaWQpIHtcblxuXHRcdFx0Y29uc29sZS5sb2coXCI+PiBCaXRtYXAgbG9hZGVkIGlzIG5vdCBoYXZpbmcgcG93ZXIgb2YgMiBkaW1lbnNpb25zIG9yIGlzIGhpZ2hlciB0aGFuIDIwNDhcIik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlzVmFsaWQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHBhcnNpbmdGYWlsdXJlKGI6Ym9vbGVhbilcblx0e1xuXHRcdHRoaXMuX3BhcnNpbmdGYWlsdXJlID0gYjtcblx0fVxuXG5cdHB1YmxpYyBnZXQgcGFyc2luZ0ZhaWx1cmUoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyc2luZ0ZhaWx1cmU7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHBhcnNpbmdQYXVzZWQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyc2luZ1BhdXNlZDtcblx0fVxuXG5cdHB1YmxpYyBnZXQgcGFyc2luZ0NvbXBsZXRlKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BhcnNpbmdDb21wbGV0ZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbWF0ZXJpYWxNb2RlKG5ld01hdGVyaWFsTW9kZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9tYXRlcmlhbE1vZGUgPSBuZXdNYXRlcmlhbE1vZGU7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IG1hdGVyaWFsTW9kZSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsTW9kZTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgZGF0YSgpOmFueVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2RhdGE7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGRhdGEgZm9ybWF0IG9mIHRoZSBmaWxlIGRhdGEgdG8gYmUgcGFyc2VkLiBPcHRpb25zIGFyZSA8Y29kZT5VUkxMb2FkZXJEYXRhRm9ybWF0LkJJTkFSWTwvY29kZT4sIDxjb2RlPlVSTExvYWRlckRhdGFGb3JtYXQuQVJSQVlfQlVGRkVSPC9jb2RlPiwgPGNvZGU+VVJMTG9hZGVyRGF0YUZvcm1hdC5CTE9CPC9jb2RlPiwgPGNvZGU+VVJMTG9hZGVyRGF0YUZvcm1hdC5WQVJJQUJMRVM8L2NvZGU+IG9yIDxjb2RlPlVSTExvYWRlckRhdGFGb3JtYXQuVEVYVDwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGRhdGFGb3JtYXQoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kYXRhRm9ybWF0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnNlIGRhdGEgKHBvc3NpYmx5IGNvbnRhaW5pbmcgYnl0ZWFycnksIHBsYWluIHRleHQgb3IgQml0bWFwQXNzZXQpIGFzeW5jaHJvbm91c2x5LCBtZWFuaW5nIHRoYXRcblx0ICogdGhlIHBhcnNlciB3aWxsIHBlcmlvZGljYWxseSBzdG9wIHBhcnNpbmcgc28gdGhhdCB0aGUgQVZNIG1heSBwcm9jZWVkIHRvIHRoZVxuXHQgKiBuZXh0IGZyYW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0gZGF0YSBUaGUgdW50eXBlZCBkYXRhIG9iamVjdCBpbiB3aGljaCB0aGUgbG9hZGVkIGRhdGEgcmVzaWRlcy5cblx0ICogQHBhcmFtIGZyYW1lTGltaXQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBvZiBwYXJzaW5nIGFsbG93ZWQgcGVyIGZyYW1lLiBUaGVcblx0ICogYWN0dWFsIHRpbWUgc3BlbnQgb24gYSBmcmFtZSBjYW4gZXhjZWVkIHRoaXMgbnVtYmVyIHNpbmNlIHRpbWUtY2hlY2tzIGNhblxuXHQgKiBvbmx5IGJlIHBlcmZvcm1lZCBiZXR3ZWVuIGxvZ2ljYWwgc2VjdGlvbnMgb2YgdGhlIHBhcnNpbmcgcHJvY2VkdXJlLlxuXHQgKi9cblx0cHVibGljIHBhcnNlQXN5bmMoZGF0YTphbnksIGZyYW1lTGltaXQ6bnVtYmVyID0gMzApXG5cdHtcblx0XHR0aGlzLl9kYXRhID0gZGF0YTtcblx0XHR0aGlzLl9wU3RhcnRQYXJzaW5nKGZyYW1lTGltaXQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgbGlzdCBvZiBkZXBlbmRlbmNpZXMgdGhhdCBuZWVkIHRvIGJlIGxvYWRlZCBhbmQgcmVzb2x2ZWQgZm9yIHRoZSBvYmplY3QgYmVpbmcgcGFyc2VkLlxuXHQgKi9cblx0cHVibGljIGdldCBkZXBlbmRlbmNpZXMoKTpBcnJheTxSZXNvdXJjZURlcGVuZGVuY3k+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGVwZW5kZW5jaWVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlc29sdmUgYSBkZXBlbmRlbmN5IHdoZW4gaXQncyBsb2FkZWQuIEZvciBleGFtcGxlLCBhIGRlcGVuZGVuY3kgY29udGFpbmluZyBhbiBJbWFnZVJlc291cmNlIHdvdWxkIGJlIGFzc2lnbmVkXG5cdCAqIHRvIGEgTWVzaCBpbnN0YW5jZSBhcyBhIEJpdG1hcE1hdGVyaWFsLCBhIHNjZW5lIGdyYXBoIG9iamVjdCB3b3VsZCBiZSBhZGRlZCB0byBpdHMgaW50ZW5kZWQgcGFyZW50LiBUaGVcblx0ICogZGVwZW5kZW5jeSBzaG91bGQgYmUgYSBtZW1iZXIgb2YgdGhlIGRlcGVuZGVuY2llcyBwcm9wZXJ0eS5cblx0ICpcblx0ICogQHBhcmFtIHJlc291cmNlRGVwZW5kZW5jeSBUaGUgZGVwZW5kZW5jeSB0byBiZSByZXNvbHZlZC5cblx0ICovXG5cdHB1YmxpYyBfaVJlc29sdmVEZXBlbmRlbmN5KHJlc291cmNlRGVwZW5kZW5jeTpSZXNvdXJjZURlcGVuZGVuY3kpXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlc29sdmUgYSBkZXBlbmRlbmN5IGxvYWRpbmcgZmFpbHVyZS4gVXNlZCBieSBwYXJzZXIgdG8gZXZlbnR1YWxseSBwcm92aWRlIGEgZGVmYXVsdCBtYXBcblx0ICpcblx0ICogQHBhcmFtIHJlc291cmNlRGVwZW5kZW5jeSBUaGUgZGVwZW5kZW5jeSB0byBiZSByZXNvbHZlZC5cblx0ICovXG5cdHB1YmxpYyBfaVJlc29sdmVEZXBlbmRlbmN5RmFpbHVyZShyZXNvdXJjZURlcGVuZGVuY3k6UmVzb3VyY2VEZXBlbmRlbmN5KVxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXNvbHZlIGEgZGVwZW5kZW5jeSBuYW1lXG5cdCAqXG5cdCAqIEBwYXJhbSByZXNvdXJjZURlcGVuZGVuY3kgVGhlIGRlcGVuZGVuY3kgdG8gYmUgcmVzb2x2ZWQuXG5cdCAqL1xuXHRwdWJsaWMgX2lSZXNvbHZlRGVwZW5kZW5jeU5hbWUocmVzb3VyY2VEZXBlbmRlbmN5OlJlc291cmNlRGVwZW5kZW5jeSwgYXNzZXQ6SUFzc2V0KTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBhc3NldC5uYW1lO1xuXHR9XG5cblx0cHVibGljIF9pUmVzdW1lUGFyc2luZ0FmdGVyRGVwZW5kZW5jaWVzKClcblx0e1xuXHRcdHRoaXMuX3BhcnNpbmdQYXVzZWQgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLl90aW1lcilcblx0XHRcdHRoaXMuX3RpbWVyLnN0YXJ0KCk7XG5cdH1cblxuXHRwdWJsaWMgX3BGaW5hbGl6ZUFzc2V0KGFzc2V0OklBc3NldCwgbmFtZTpzdHJpbmcgPSBudWxsKVxuXHR7XG5cdFx0dmFyIHR5cGVfZXZlbnQ6c3RyaW5nO1xuXHRcdHZhciB0eXBlX25hbWU6c3RyaW5nO1xuXG5cdFx0aWYgKG5hbWUgIT0gbnVsbClcblx0XHRcdGFzc2V0Lm5hbWUgPSBuYW1lO1xuXG5cdFx0Ly8gSWYgdGhlIGFzc2V0IGhhcyBubyBuYW1lLCBnaXZlIGl0XG5cdFx0Ly8gYSBwZXItdHlwZSBkZWZhdWx0IG5hbWUuXG5cdFx0aWYgKCFhc3NldC5uYW1lKVxuXHRcdFx0YXNzZXQubmFtZSA9IGFzc2V0LmFzc2V0VHlwZTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQXNzZXRFdmVudChBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCBhc3NldCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnNlIHRoZSBuZXh0IGJsb2NrIG9mIGRhdGEuXG5cdCAqIEByZXR1cm4gV2hldGhlciBvciBub3QgbW9yZSBkYXRhIG5lZWRzIHRvIGJlIHBhcnNlZC4gQ2FuIGJlIDxjb2RlPlBhcnNlckJhc2UuUGFyc2VyQmFzZS5QQVJTSU5HX0RPTkU8L2NvZGU+IG9yXG5cdCAqIDxjb2RlPlBhcnNlckJhc2UuUGFyc2VyQmFzZS5NT1JFX1RPX1BBUlNFPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBfcFByb2NlZWRQYXJzaW5nKCk6Ym9vbGVhblxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdHB1YmxpYyBfcERpZVdpdGhFcnJvcihtZXNzYWdlOnN0cmluZyA9ICdVbmtub3duIHBhcnNpbmcgZXJyb3InKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3RpbWVyKSB7XG5cdFx0XHR0aGlzLl90aW1lci5yZW1vdmVFdmVudExpc3RlbmVyKFRpbWVyRXZlbnQuVElNRVIsIHRoaXMuX3BPbkludGVydmFsRGVsZWdhdGUpO1xuXHRcdFx0dGhpcy5fdGltZXIuc3RvcCgpO1xuXHRcdFx0dGhpcy5fdGltZXIgPSBudWxsO1xuXHRcdH1cblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgUGFyc2VyRXZlbnQoUGFyc2VyRXZlbnQuUEFSU0VfRVJST1IsIG1lc3NhZ2UpKTtcblx0fVxuXG5cdHB1YmxpYyBfcEFkZERlcGVuZGVuY3koaWQ6c3RyaW5nLCByZXE6VVJMUmVxdWVzdCwgcmV0cmlldmVBc1Jhd0RhdGE6Ym9vbGVhbiA9IGZhbHNlLCBkYXRhOmFueSA9IG51bGwsIHN1cHByZXNzRXJyb3JFdmVudHM6Ym9vbGVhbiA9IGZhbHNlKTpSZXNvdXJjZURlcGVuZGVuY3lcblx0e1xuXHRcdHZhciBkZXBlbmRlbmN5OlJlc291cmNlRGVwZW5kZW5jeSA9IG5ldyBSZXNvdXJjZURlcGVuZGVuY3koaWQsIHJlcSwgZGF0YSwgbnVsbCwgdGhpcywgcmV0cmlldmVBc1Jhd0RhdGEsIHN1cHByZXNzRXJyb3JFdmVudHMpO1xuXHRcdHRoaXMuX2RlcGVuZGVuY2llcy5wdXNoKGRlcGVuZGVuY3kpO1xuXG5cdFx0cmV0dXJuIGRlcGVuZGVuY3k7XG5cdH1cblxuXHRwdWJsaWMgX3BQYXVzZUFuZFJldHJpZXZlRGVwZW5kZW5jaWVzKClcblx0e1xuXHRcdGlmICh0aGlzLl90aW1lcilcblx0XHRcdHRoaXMuX3RpbWVyLnN0b3AoKTtcblxuXHRcdHRoaXMuX3BhcnNpbmdQYXVzZWQgPSB0cnVlO1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgUGFyc2VyRXZlbnQoUGFyc2VyRXZlbnQuUkVBRFlfRk9SX0RFUEVOREVOQ0lFUykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRlc3RzIHdoZXRoZXIgb3Igbm90IHRoZXJlIGlzIHN0aWxsIHRpbWUgbGVmdCBmb3IgcGFyc2luZyB3aXRoaW4gdGhlIG1heGltdW0gYWxsb3dlZCB0aW1lIGZyYW1lIHBlciBzZXNzaW9uLlxuXHQgKiBAcmV0dXJuIFRydWUgaWYgdGhlcmUgaXMgc3RpbGwgdGltZSBsZWZ0LCBmYWxzZSBpZiB0aGUgbWF4aW11bSBhbGxvdHRlZCB0aW1lIHdhcyBleGNlZWRlZCBhbmQgcGFyc2luZyBzaG91bGQgYmUgaW50ZXJydXB0ZWQuXG5cdCAqL1xuXHRwdWJsaWMgX3BIYXNUaW1lKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICgoZ2V0VGltZXIoKSAtIHRoaXMuX2xhc3RGcmFtZVRpbWUpIDwgdGhpcy5fZnJhbWVMaW1pdCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gdGhlIHBhcnNpbmcgcGF1c2UgaW50ZXJ2YWwgaGFzIHBhc3NlZCBhbmQgcGFyc2luZyBjYW4gcHJvY2VlZC5cblx0ICovXG5cdHB1YmxpYyBfcE9uSW50ZXJ2YWwoZXZlbnQ6VGltZXJFdmVudCA9IG51bGwpXG5cdHtcblx0XHR0aGlzLl9sYXN0RnJhbWVUaW1lID0gZ2V0VGltZXIoKTtcblxuXHRcdGlmICh0aGlzLl9wUHJvY2VlZFBhcnNpbmcoKSAmJiAhdGhpcy5fcGFyc2luZ0ZhaWx1cmUpXG5cdFx0XHR0aGlzLl9wRmluaXNoUGFyc2luZygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemVzIHRoZSBwYXJzaW5nIG9mIGRhdGEuXG5cdCAqIEBwYXJhbSBmcmFtZUxpbWl0IFRoZSBtYXhpbXVtIGR1cmF0aW9uIG9mIGEgcGFyc2luZyBzZXNzaW9uLlxuXHQgKi9cblx0cHVibGljIF9wU3RhcnRQYXJzaW5nKGZyYW1lTGltaXQ6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fZnJhbWVMaW1pdCA9IGZyYW1lTGltaXQ7XG5cdFx0dGhpcy5fdGltZXIgPSBuZXcgVGltZXIodGhpcy5fZnJhbWVMaW1pdCwgMCk7XG5cdFx0dGhpcy5fdGltZXIuYWRkRXZlbnRMaXN0ZW5lcihUaW1lckV2ZW50LlRJTUVSLCB0aGlzLl9wT25JbnRlcnZhbERlbGVnYXRlKTtcblx0XHR0aGlzLl90aW1lci5zdGFydCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZpbmlzaCBwYXJzaW5nIHRoZSBkYXRhLlxuXHQgKi9cblx0cHVibGljIF9wRmluaXNoUGFyc2luZygpXG5cdHtcblx0XHRpZiAodGhpcy5fdGltZXIpIHtcblx0XHRcdHRoaXMuX3RpbWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoVGltZXJFdmVudC5USU1FUiwgdGhpcy5fcE9uSW50ZXJ2YWxEZWxlZ2F0ZSk7XG5cdFx0XHR0aGlzLl90aW1lci5zdG9wKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fdGltZXIgPSBudWxsO1xuXHRcdHRoaXMuX3BhcnNpbmdDb21wbGV0ZSA9IHRydWU7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFBhcnNlckV2ZW50KFBhcnNlckV2ZW50LlBBUlNFX0NPTVBMRVRFKSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBfcEdldFRleHREYXRhKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gUGFyc2VyVXRpbHMudG9TdHJpbmcodGhpcy5fZGF0YSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBfcEdldEJ5dGVEYXRhKCk6Qnl0ZUFycmF5XG5cdHtcblx0XHRyZXR1cm4gUGFyc2VyVXRpbHMudG9CeXRlQXJyYXkodGhpcy5fZGF0YSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gUGFyc2VyQmFzZTsiXX0=