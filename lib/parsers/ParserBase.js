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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlckJhc2UudHMiXSwibmFtZXMiOlsiUGFyc2VyQmFzZSIsIlBhcnNlckJhc2UuY29uc3RydWN0b3IiLCJQYXJzZXJCYXNlLnN1cHBvcnRzVHlwZSIsIlBhcnNlckJhc2UuY29udGVudCIsIlBhcnNlckJhc2UuaXNCaXRtYXBEYXRhVmFsaWQiLCJQYXJzZXJCYXNlLnBhcnNpbmdGYWlsdXJlIiwiUGFyc2VyQmFzZS5wYXJzaW5nUGF1c2VkIiwiUGFyc2VyQmFzZS5wYXJzaW5nQ29tcGxldGUiLCJQYXJzZXJCYXNlLm1hdGVyaWFsTW9kZSIsIlBhcnNlckJhc2UuZGF0YSIsIlBhcnNlckJhc2UuZGF0YUZvcm1hdCIsIlBhcnNlckJhc2UucGFyc2VBc3luYyIsIlBhcnNlckJhc2UuZGVwZW5kZW5jaWVzIiwiUGFyc2VyQmFzZS5faVJlc29sdmVEZXBlbmRlbmN5IiwiUGFyc2VyQmFzZS5faVJlc29sdmVEZXBlbmRlbmN5RmFpbHVyZSIsIlBhcnNlckJhc2UuX2lSZXNvbHZlRGVwZW5kZW5jeU5hbWUiLCJQYXJzZXJCYXNlLl9pUmVzdW1lUGFyc2luZ0FmdGVyRGVwZW5kZW5jaWVzIiwiUGFyc2VyQmFzZS5fcEZpbmFsaXplQXNzZXQiLCJQYXJzZXJCYXNlLl9wUHJvY2VlZFBhcnNpbmciLCJQYXJzZXJCYXNlLl9wRGllV2l0aEVycm9yIiwiUGFyc2VyQmFzZS5fcEFkZERlcGVuZGVuY3kiLCJQYXJzZXJCYXNlLl9wUGF1c2VBbmRSZXRyaWV2ZURlcGVuZGVuY2llcyIsIlBhcnNlckJhc2UuX3BIYXNUaW1lIiwiUGFyc2VyQmFzZS5fcE9uSW50ZXJ2YWwiLCJQYXJzZXJCYXNlLl9wU3RhcnRQYXJzaW5nIiwiUGFyc2VyQmFzZS5fcEZpbmlzaFBhcnNpbmciLCJQYXJzZXJCYXNlLl9wR2V0VGV4dERhdGEiLCJQYXJzZXJCYXNlLl9wR2V0Qnl0ZURhdGEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLElBQU8sbUJB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LE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1lBQ2pCQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0E7WUFDN0VBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBQ3BCQSxDQUFDQTtRQUVEQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUNuQkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUU3QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsV0FBV0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDakVBLENBQUNBO0lBRUR6Qjs7OztPQUlHQTtJQUNJQSxrQ0FBYUEsR0FBcEJBO1FBRUMwQixNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtJQUN6Q0EsQ0FBQ0E7SUFFRDFCOzs7O09BSUdBO0lBQ0lBLGtDQUFhQSxHQUFwQkE7UUFFQzJCLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO0lBQzVDQSxDQUFDQTtJQXRSRDNCOztPQUVHQTtJQUNXQSx1QkFBWUEsR0FBV0EsSUFBSUEsQ0FBQ0E7SUFDMUNBLGVBQWVBO0lBRWZBOztPQUVHQTtJQUNXQSx3QkFBYUEsR0FBV0EsS0FBS0EsQ0FBQ0E7SUE4UTdDQSxpQkFBQ0E7QUFBREEsQ0FoVUEsQUFnVUNBLEVBaFV3QixlQUFlLEVBZ1V2QztBQUVELEFBQW9CLGlCQUFYLFVBQVUsQ0FBQyIsImZpbGUiOiJwYXJzZXJzL1BhcnNlckJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJpdG1hcERhdGFcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9iYXNlL0JpdG1hcERhdGFcIik7XHJcbmltcG9ydCBJQXNzZXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xyXG5pbXBvcnQgVVJMUmVxdWVzdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxSZXF1ZXN0XCIpO1xyXG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XHJcbmltcG9ydCBBc3NldEV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0Fzc2V0RXZlbnRcIik7XHJcbmltcG9ydCBFdmVudERpc3BhdGNoZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiKTtcclxuaW1wb3J0IFBhcnNlckV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL1BhcnNlckV2ZW50XCIpO1xyXG5pbXBvcnQgVGltZXJFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9UaW1lckV2ZW50XCIpO1xyXG5pbXBvcnQgUGFyc2VyVXRpbHNcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlclV0aWxzXCIpO1xyXG5pbXBvcnQgUmVzb3VyY2VEZXBlbmRlbmN5XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1Jlc291cmNlRGVwZW5kZW5jeVwiKTtcclxuaW1wb3J0IEJ5dGVBcnJheVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL0J5dGVBcnJheVwiKTtcclxuaW1wb3J0IFRleHR1cmVVdGlsc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL1RleHR1cmVVdGlsc1wiKTtcclxuaW1wb3J0IFRpbWVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi91dGlscy9UaW1lclwiKTtcclxuaW1wb3J0IGdldFRpbWVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi91dGlscy9nZXRUaW1lclwiKTtcclxuXHJcbi8qKlxyXG4gKiA8Y29kZT5QYXJzZXJCYXNlPC9jb2RlPiBwcm92aWRlcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBvYmplY3RzIHRoYXQgY29udmVydCBibG9ja3Mgb2YgZGF0YSB0byBkYXRhIHN0cnVjdHVyZXNcclxuICogc3VwcG9ydGVkIGJ5IGF3YXkuXHJcbiAqXHJcbiAqIElmIHVzZWQgYnkgPGNvZGU+QXNzZXRMb2FkZXI8L2NvZGU+IHRvIGF1dG9tYXRpY2FsbHkgZGV0ZXJtaW5lIHRoZSBwYXJzZXIgdHlwZSwgdHdvIHB1YmxpYyBzdGF0aWMgbWV0aG9kcyBzaG91bGRcclxuICogYmUgaW1wbGVtZW50ZWQsIHdpdGggdGhlIGZvbGxvd2luZyBzaWduYXR1cmVzOlxyXG4gKlxyXG4gKiA8Y29kZT5wdWJsaWMgc3RhdGljIHN1cHBvcnRzVHlwZShleHRlbnNpb24gOiBzdHJpbmcpIDogYm9vbGVhbjwvY29kZT5cclxuICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gZmlsZSBleHRlbnNpb24gaXMgc3VwcG9ydGVkIGJ5IHRoZSBwYXJzZXIuXHJcbiAqXHJcbiAqIDxjb2RlPnB1YmxpYyBzdGF0aWMgc3VwcG9ydHNEYXRhKGRhdGEgOiAqKSA6IGJvb2xlYW48L2NvZGU+XHJcbiAqIFRlc3RzIHdoZXRoZXIgYSBkYXRhIGJsb2NrIGNhbiBiZSBwYXJzZWQgYnkgdGhlIHBhcnNlci5cclxuICpcclxuICogRnVydGhlcm1vcmUsIGZvciBhbnkgY29uY3JldGUgc3VidHlwZSwgdGhlIG1ldGhvZCA8Y29kZT5pbml0SGFuZGxlPC9jb2RlPiBzaG91bGQgYmUgb3ZlcnJpZGRlbiB0byBpbW1lZGlhdGVseVxyXG4gKiBjcmVhdGUgdGhlIG9iamVjdCB0aGF0IHdpbGwgY29udGFpbiB0aGUgcGFyc2VkIGRhdGEuIFRoaXMgYWxsb3dzIDxjb2RlPlJlc291cmNlTWFuYWdlcjwvY29kZT4gdG8gcmV0dXJuIGFuIG9iamVjdFxyXG4gKiBoYW5kbGUgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZSBvYmplY3Qgd2FzIGxvYWRlZCBvciBub3QuXHJcbiAqXHJcbiAqIEBzZWUgQXNzZXRMb2FkZXJcclxuICovXHJcbmNsYXNzIFBhcnNlckJhc2UgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcclxue1xyXG5cdHB1YmxpYyBfaUZpbGVOYW1lOnN0cmluZztcclxuXHRwcml2YXRlIF9kYXRhRm9ybWF0OnN0cmluZztcclxuXHRwcml2YXRlIF9kYXRhOmFueTtcclxuXHRwcml2YXRlIF9mcmFtZUxpbWl0Om51bWJlcjtcclxuXHRwcml2YXRlIF9sYXN0RnJhbWVUaW1lOm51bWJlcjtcclxuXHRwcml2YXRlIF9wT25JbnRlcnZhbERlbGVnYXRlOihldmVudDpUaW1lckV2ZW50KSA9PiB2b2lkO1xyXG5cdHB1YmxpYyBfcENvbnRlbnQ6SUFzc2V0O1xyXG5cclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBUT0RPOiBhZGQgZXJyb3IgY2hlY2tpbmcgZm9yIHRoZSBmb2xsb3dpbmcgKCBjb3VsZCBjYXVzZSBhIHByb2JsZW0gaWYgdGhpcyBmdW5jdGlvbiBpcyBub3QgaW1wbGVtZW50ZWQgKVxyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIE5lZWRzIHRvIGJlIGltcGxlbWVudGVkIGluIGFsbCBQYXJzZXJzIChcclxuXHQvLzxjb2RlPnB1YmxpYyBzdGF0aWMgc3VwcG9ydHNUeXBlKGV4dGVuc2lvbiA6IHN0cmluZykgOiBib29sZWFuPC9jb2RlPlxyXG5cdC8vKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgYSBnaXZlbiBmaWxlIGV4dGVuc2lvbiBpcyBzdXBwb3J0ZWQgYnkgdGhlIHBhcnNlci5cclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0cHVibGljIHN0YXRpYyBzdXBwb3J0c1R5cGUoZXh0ZW5zaW9uOnN0cmluZyk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XHJcblx0fVxyXG5cclxuXHQvKiBUT0RPOiBJbXBsZW1lbnQgUGFyc2VyVXRpbHM7XHJcblx0IHB1YmxpYyBfcEdldFRleHREYXRhKCk6c3RyaW5nXHJcblx0IHtcclxuXHQgcmV0dXJuIFBhcnNlclV0aWxzLnRvU3RyaW5nKF9kYXRhKTtcclxuXHQgfVxyXG5cclxuXHQgcHVibGljIF9wR2V0Qnl0ZURhdGEoKTpCeXRlQXJyYXlcclxuXHQge1xyXG5cdCByZXR1cm4gUGFyc2VyVXRpbHMudG9CeXRlQXJyYXkoX2RhdGEpO1xyXG5cdCB9XHJcblx0ICovXHJcblx0cHJpdmF0ZSBfZGVwZW5kZW5jaWVzOkFycmF5PFJlc291cmNlRGVwZW5kZW5jeT47XHJcblx0cHJpdmF0ZSBfcGFyc2luZ1BhdXNlZDpib29sZWFuO1xyXG5cdHByaXZhdGUgX3BhcnNpbmdDb21wbGV0ZTpib29sZWFuO1xyXG5cdHByaXZhdGUgX3BhcnNpbmdGYWlsdXJlOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfdGltZXI6VGltZXI7XHJcblx0cHJpdmF0ZSBfbWF0ZXJpYWxNb2RlOm51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJuZWQgYnkgPGNvZGU+cHJvY2VlZFBhcnNpbmc8L2NvZGU+IHRvIGluZGljYXRlIG5vIG1vcmUgcGFyc2luZyBpcyBuZWVkZWQuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBQQVJTSU5HX0RPTkU6Ym9vbGVhbiA9IHRydWU7XHJcblx0LyogUHJvdGVjdGVkICovXHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybmVkIGJ5IDxjb2RlPnByb2NlZWRQYXJzaW5nPC9jb2RlPiB0byBpbmRpY2F0ZSBtb3JlIHBhcnNpbmcgaXMgbmVlZGVkLCBhbGxvd2luZyBhc3luY2hyb25vdXMgcGFyc2luZy5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIE1PUkVfVE9fUEFSU0U6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cdC8qIFByb3RlY3RlZCAqL1xyXG5cclxuXHJcblx0cHVibGljIGdldCBjb250ZW50KCk6SUFzc2V0XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BDb250ZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBQYXJzZXJCYXNlIG9iamVjdFxyXG5cdCAqIEBwYXJhbSBmb3JtYXQgVGhlIGRhdGEgZm9ybWF0IG9mIHRoZSBmaWxlIGRhdGEgdG8gYmUgcGFyc2VkLiBDYW4gYmUgZWl0aGVyIDxjb2RlPlBhcnNlckRhdGFGb3JtYXQuQklOQVJZPC9jb2RlPiBvciA8Y29kZT5QYXJzZXJEYXRhRm9ybWF0LlBMQUlOX1RFWFQ8L2NvZGU+LCBhbmQgc2hvdWxkIGJlIHByb3ZpZGVkIGJ5IHRoZSBjb25jcmV0ZSBzdWJ0eXBlLlxyXG5cdCAqXHJcblx0ICogQHNlZSBhd2F5LmxvYWRpbmcucGFyc2Vycy5QYXJzZXJEYXRhRm9ybWF0XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoZm9ybWF0OnN0cmluZylcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuX21hdGVyaWFsTW9kZSA9IDA7XHJcblx0XHR0aGlzLl9kYXRhRm9ybWF0ID0gZm9ybWF0O1xyXG5cdFx0dGhpcy5fZGVwZW5kZW5jaWVzID0gbmV3IEFycmF5PFJlc291cmNlRGVwZW5kZW5jeT4oKTtcclxuXHJcblx0XHR0aGlzLl9wT25JbnRlcnZhbERlbGVnYXRlID0gKGV2ZW50OlRpbWVyRXZlbnQpID0+IHRoaXMuX3BPbkludGVydmFsKGV2ZW50KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFZhbGlkYXRlcyBhIGJpdG1hcERhdGEgbG9hZGVkIGJlZm9yZSBhc3NpZ25pbmcgdG8gYSBkZWZhdWx0IEJpdG1hcE1hdGVyaWFsXHJcblx0ICovXHJcblxyXG5cdHB1YmxpYyBpc0JpdG1hcERhdGFWYWxpZChiaXRtYXBEYXRhOkJpdG1hcERhdGEpOmJvb2xlYW5cclxuXHR7XHJcblx0XHR2YXIgaXNWYWxpZDpib29sZWFuID0gVGV4dHVyZVV0aWxzLmlzQml0bWFwRGF0YVZhbGlkKGJpdG1hcERhdGEpO1xyXG5cclxuXHRcdGlmICghaXNWYWxpZCkge1xyXG5cclxuXHRcdFx0Y29uc29sZS5sb2coXCI+PiBCaXRtYXAgbG9hZGVkIGlzIG5vdCBoYXZpbmcgcG93ZXIgb2YgMiBkaW1lbnNpb25zIG9yIGlzIGhpZ2hlciB0aGFuIDIwNDhcIik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGlzVmFsaWQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHBhcnNpbmdGYWlsdXJlKGI6Ym9vbGVhbilcclxuXHR7XHJcblx0XHR0aGlzLl9wYXJzaW5nRmFpbHVyZSA9IGI7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHBhcnNpbmdGYWlsdXJlKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wYXJzaW5nRmFpbHVyZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgcGFyc2luZ1BhdXNlZCgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcGFyc2luZ1BhdXNlZDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgcGFyc2luZ0NvbXBsZXRlKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wYXJzaW5nQ29tcGxldGU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG1hdGVyaWFsTW9kZShuZXdNYXRlcmlhbE1vZGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX21hdGVyaWFsTW9kZSA9IG5ld01hdGVyaWFsTW9kZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgbWF0ZXJpYWxNb2RlKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsTW9kZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgZGF0YSgpOmFueVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9kYXRhO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGRhdGEgZm9ybWF0IG9mIHRoZSBmaWxlIGRhdGEgdG8gYmUgcGFyc2VkLiBPcHRpb25zIGFyZSA8Y29kZT5VUkxMb2FkZXJEYXRhRm9ybWF0LkJJTkFSWTwvY29kZT4sIDxjb2RlPlVSTExvYWRlckRhdGFGb3JtYXQuQVJSQVlfQlVGRkVSPC9jb2RlPiwgPGNvZGU+VVJMTG9hZGVyRGF0YUZvcm1hdC5CTE9CPC9jb2RlPiwgPGNvZGU+VVJMTG9hZGVyRGF0YUZvcm1hdC5WQVJJQUJMRVM8L2NvZGU+IG9yIDxjb2RlPlVSTExvYWRlckRhdGFGb3JtYXQuVEVYVDwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIGdldCBkYXRhRm9ybWF0KCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2RhdGFGb3JtYXQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBQYXJzZSBkYXRhIChwb3NzaWJseSBjb250YWluaW5nIGJ5dGVhcnJ5LCBwbGFpbiB0ZXh0IG9yIEJpdG1hcEFzc2V0KSBhc3luY2hyb25vdXNseSwgbWVhbmluZyB0aGF0XHJcblx0ICogdGhlIHBhcnNlciB3aWxsIHBlcmlvZGljYWxseSBzdG9wIHBhcnNpbmcgc28gdGhhdCB0aGUgQVZNIG1heSBwcm9jZWVkIHRvIHRoZVxyXG5cdCAqIG5leHQgZnJhbWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZGF0YSBUaGUgdW50eXBlZCBkYXRhIG9iamVjdCBpbiB3aGljaCB0aGUgbG9hZGVkIGRhdGEgcmVzaWRlcy5cclxuXHQgKiBAcGFyYW0gZnJhbWVMaW1pdCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIG9mIHBhcnNpbmcgYWxsb3dlZCBwZXIgZnJhbWUuIFRoZVxyXG5cdCAqIGFjdHVhbCB0aW1lIHNwZW50IG9uIGEgZnJhbWUgY2FuIGV4Y2VlZCB0aGlzIG51bWJlciBzaW5jZSB0aW1lLWNoZWNrcyBjYW5cclxuXHQgKiBvbmx5IGJlIHBlcmZvcm1lZCBiZXR3ZWVuIGxvZ2ljYWwgc2VjdGlvbnMgb2YgdGhlIHBhcnNpbmcgcHJvY2VkdXJlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwYXJzZUFzeW5jKGRhdGE6YW55LCBmcmFtZUxpbWl0Om51bWJlciA9IDMwKVxyXG5cdHtcclxuXHRcdHRoaXMuX2RhdGEgPSBkYXRhO1xyXG5cdFx0dGhpcy5fcFN0YXJ0UGFyc2luZyhmcmFtZUxpbWl0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgbGlzdCBvZiBkZXBlbmRlbmNpZXMgdGhhdCBuZWVkIHRvIGJlIGxvYWRlZCBhbmQgcmVzb2x2ZWQgZm9yIHRoZSBvYmplY3QgYmVpbmcgcGFyc2VkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgZGVwZW5kZW5jaWVzKCk6QXJyYXk8UmVzb3VyY2VEZXBlbmRlbmN5PlxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9kZXBlbmRlbmNpZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNvbHZlIGEgZGVwZW5kZW5jeSB3aGVuIGl0J3MgbG9hZGVkLiBGb3IgZXhhbXBsZSwgYSBkZXBlbmRlbmN5IGNvbnRhaW5pbmcgYW4gSW1hZ2VSZXNvdXJjZSB3b3VsZCBiZSBhc3NpZ25lZFxyXG5cdCAqIHRvIGEgTWVzaCBpbnN0YW5jZSBhcyBhIEJpdG1hcE1hdGVyaWFsLCBhIHNjZW5lIGdyYXBoIG9iamVjdCB3b3VsZCBiZSBhZGRlZCB0byBpdHMgaW50ZW5kZWQgcGFyZW50LiBUaGVcclxuXHQgKiBkZXBlbmRlbmN5IHNob3VsZCBiZSBhIG1lbWJlciBvZiB0aGUgZGVwZW5kZW5jaWVzIHByb3BlcnR5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHJlc291cmNlRGVwZW5kZW5jeSBUaGUgZGVwZW5kZW5jeSB0byBiZSByZXNvbHZlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgX2lSZXNvbHZlRGVwZW5kZW5jeShyZXNvdXJjZURlcGVuZGVuY3k6UmVzb3VyY2VEZXBlbmRlbmN5KVxyXG5cdHtcclxuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNvbHZlIGEgZGVwZW5kZW5jeSBsb2FkaW5nIGZhaWx1cmUuIFVzZWQgYnkgcGFyc2VyIHRvIGV2ZW50dWFsbHkgcHJvdmlkZSBhIGRlZmF1bHQgbWFwXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcmVzb3VyY2VEZXBlbmRlbmN5IFRoZSBkZXBlbmRlbmN5IHRvIGJlIHJlc29sdmVkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaVJlc29sdmVEZXBlbmRlbmN5RmFpbHVyZShyZXNvdXJjZURlcGVuZGVuY3k6UmVzb3VyY2VEZXBlbmRlbmN5KVxyXG5cdHtcclxuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNvbHZlIGEgZGVwZW5kZW5jeSBuYW1lXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcmVzb3VyY2VEZXBlbmRlbmN5IFRoZSBkZXBlbmRlbmN5IHRvIGJlIHJlc29sdmVkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaVJlc29sdmVEZXBlbmRlbmN5TmFtZShyZXNvdXJjZURlcGVuZGVuY3k6UmVzb3VyY2VEZXBlbmRlbmN5LCBhc3NldDpJQXNzZXQpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBhc3NldC5uYW1lO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pUmVzdW1lUGFyc2luZ0FmdGVyRGVwZW5kZW5jaWVzKClcclxuXHR7XHJcblx0XHR0aGlzLl9wYXJzaW5nUGF1c2VkID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3RpbWVyKVxyXG5cdFx0XHR0aGlzLl90aW1lci5zdGFydCgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9wRmluYWxpemVBc3NldChhc3NldDpJQXNzZXQsIG5hbWU6c3RyaW5nID0gbnVsbClcclxuXHR7XHJcblx0XHR2YXIgdHlwZV9ldmVudDpzdHJpbmc7XHJcblx0XHR2YXIgdHlwZV9uYW1lOnN0cmluZztcclxuXHJcblx0XHRpZiAobmFtZSAhPSBudWxsKVxyXG5cdFx0XHRhc3NldC5uYW1lID0gbmFtZTtcclxuXHJcblx0XHQvLyBJZiB0aGUgYXNzZXQgaGFzIG5vIG5hbWUsIGdpdmUgaXRcclxuXHRcdC8vIGEgcGVyLXR5cGUgZGVmYXVsdCBuYW1lLlxyXG5cdFx0aWYgKCFhc3NldC5uYW1lKVxyXG5cdFx0XHRhc3NldC5uYW1lID0gYXNzZXQuYXNzZXRUeXBlO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQXNzZXRFdmVudChBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCBhc3NldCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUGFyc2UgdGhlIG5leHQgYmxvY2sgb2YgZGF0YS5cclxuXHQgKiBAcmV0dXJuIFdoZXRoZXIgb3Igbm90IG1vcmUgZGF0YSBuZWVkcyB0byBiZSBwYXJzZWQuIENhbiBiZSA8Y29kZT5QYXJzZXJCYXNlLlBhcnNlckJhc2UuUEFSU0lOR19ET05FPC9jb2RlPiBvclxyXG5cdCAqIDxjb2RlPlBhcnNlckJhc2UuUGFyc2VyQmFzZS5NT1JFX1RPX1BBUlNFPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgX3BQcm9jZWVkUGFyc2luZygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9wRGllV2l0aEVycm9yKG1lc3NhZ2U6c3RyaW5nID0gJ1Vua25vd24gcGFyc2luZyBlcnJvcicpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3RpbWVyKSB7XHJcblx0XHRcdHRoaXMuX3RpbWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoVGltZXJFdmVudC5USU1FUiwgdGhpcy5fcE9uSW50ZXJ2YWxEZWxlZ2F0ZSk7XHJcblx0XHRcdHRoaXMuX3RpbWVyLnN0b3AoKTtcclxuXHRcdFx0dGhpcy5fdGltZXIgPSBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgUGFyc2VyRXZlbnQoUGFyc2VyRXZlbnQuUEFSU0VfRVJST1IsIG1lc3NhZ2UpKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcEFkZERlcGVuZGVuY3koaWQ6c3RyaW5nLCByZXE6VVJMUmVxdWVzdCwgcmV0cmlldmVBc1Jhd0RhdGE6Ym9vbGVhbiA9IGZhbHNlLCBkYXRhOmFueSA9IG51bGwsIHN1cHByZXNzRXJyb3JFdmVudHM6Ym9vbGVhbiA9IGZhbHNlKTpSZXNvdXJjZURlcGVuZGVuY3lcclxuXHR7XHJcblx0XHR2YXIgZGVwZW5kZW5jeTpSZXNvdXJjZURlcGVuZGVuY3kgPSBuZXcgUmVzb3VyY2VEZXBlbmRlbmN5KGlkLCByZXEsIGRhdGEsIG51bGwsIHRoaXMsIHJldHJpZXZlQXNSYXdEYXRhLCBzdXBwcmVzc0Vycm9yRXZlbnRzKTtcclxuXHRcdHRoaXMuX2RlcGVuZGVuY2llcy5wdXNoKGRlcGVuZGVuY3kpO1xyXG5cclxuXHRcdHJldHVybiBkZXBlbmRlbmN5O1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9wUGF1c2VBbmRSZXRyaWV2ZURlcGVuZGVuY2llcygpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3RpbWVyKVxyXG5cdFx0XHR0aGlzLl90aW1lci5zdG9wKCk7XHJcblxyXG5cdFx0dGhpcy5fcGFyc2luZ1BhdXNlZCA9IHRydWU7XHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFBhcnNlckV2ZW50KFBhcnNlckV2ZW50LlJFQURZX0ZPUl9ERVBFTkRFTkNJRVMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRlc3RzIHdoZXRoZXIgb3Igbm90IHRoZXJlIGlzIHN0aWxsIHRpbWUgbGVmdCBmb3IgcGFyc2luZyB3aXRoaW4gdGhlIG1heGltdW0gYWxsb3dlZCB0aW1lIGZyYW1lIHBlciBzZXNzaW9uLlxyXG5cdCAqIEByZXR1cm4gVHJ1ZSBpZiB0aGVyZSBpcyBzdGlsbCB0aW1lIGxlZnQsIGZhbHNlIGlmIHRoZSBtYXhpbXVtIGFsbG90dGVkIHRpbWUgd2FzIGV4Y2VlZGVkIGFuZCBwYXJzaW5nIHNob3VsZCBiZSBpbnRlcnJ1cHRlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgX3BIYXNUaW1lKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiAoKGdldFRpbWVyKCkgLSB0aGlzLl9sYXN0RnJhbWVUaW1lKSA8IHRoaXMuX2ZyYW1lTGltaXQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbGVkIHdoZW4gdGhlIHBhcnNpbmcgcGF1c2UgaW50ZXJ2YWwgaGFzIHBhc3NlZCBhbmQgcGFyc2luZyBjYW4gcHJvY2VlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgX3BPbkludGVydmFsKGV2ZW50OlRpbWVyRXZlbnQgPSBudWxsKVxyXG5cdHtcclxuXHRcdHRoaXMuX2xhc3RGcmFtZVRpbWUgPSBnZXRUaW1lcigpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wUHJvY2VlZFBhcnNpbmcoKSAmJiAhdGhpcy5fcGFyc2luZ0ZhaWx1cmUpXHJcblx0XHRcdHRoaXMuX3BGaW5pc2hQYXJzaW5nKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplcyB0aGUgcGFyc2luZyBvZiBkYXRhLlxyXG5cdCAqIEBwYXJhbSBmcmFtZUxpbWl0IFRoZSBtYXhpbXVtIGR1cmF0aW9uIG9mIGEgcGFyc2luZyBzZXNzaW9uLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcFN0YXJ0UGFyc2luZyhmcmFtZUxpbWl0Om51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLl9mcmFtZUxpbWl0ID0gZnJhbWVMaW1pdDtcclxuXHRcdHRoaXMuX3RpbWVyID0gbmV3IFRpbWVyKHRoaXMuX2ZyYW1lTGltaXQsIDApO1xyXG5cdFx0dGhpcy5fdGltZXIuYWRkRXZlbnRMaXN0ZW5lcihUaW1lckV2ZW50LlRJTUVSLCB0aGlzLl9wT25JbnRlcnZhbERlbGVnYXRlKTtcclxuXHRcdHRoaXMuX3RpbWVyLnN0YXJ0KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGaW5pc2ggcGFyc2luZyB0aGUgZGF0YS5cclxuXHQgKi9cclxuXHRwdWJsaWMgX3BGaW5pc2hQYXJzaW5nKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fdGltZXIpIHtcclxuXHRcdFx0dGhpcy5fdGltZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihUaW1lckV2ZW50LlRJTUVSLCB0aGlzLl9wT25JbnRlcnZhbERlbGVnYXRlKTtcclxuXHRcdFx0dGhpcy5fdGltZXIuc3RvcCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3RpbWVyID0gbnVsbDtcclxuXHRcdHRoaXMuX3BhcnNpbmdDb21wbGV0ZSA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBQYXJzZXJFdmVudChQYXJzZXJFdmVudC5QQVJTRV9DT01QTEVURSkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHVibGljIF9wR2V0VGV4dERhdGEoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gUGFyc2VyVXRpbHMudG9TdHJpbmcodGhpcy5fZGF0YSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BHZXRCeXRlRGF0YSgpOkJ5dGVBcnJheVxyXG5cdHtcclxuXHRcdHJldHVybiBQYXJzZXJVdGlscy50b0J5dGVBcnJheSh0aGlzLl9kYXRhKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFBhcnNlckJhc2U7Il19