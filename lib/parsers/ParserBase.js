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

        this._pOnIntervalDelegate = function (event) {
            return _this._pOnInterval(event);
        };
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
        if (typeof frameLimit === "undefined") { frameLimit = 30; }
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
        if (typeof name === "undefined") { name = null; }
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
        if (typeof message === "undefined") { message = 'Unknown parsing error'; }
        if (this._timer) {
            this._timer.removeEventListener(TimerEvent.TIMER, this._pOnIntervalDelegate);
            this._timer.stop();
            this._timer = null;
        }

        this.dispatchEvent(new ParserEvent(ParserEvent.PARSE_ERROR, message));
    };

    ParserBase.prototype._pAddDependency = function (id, req, retrieveAsRawData, data, suppressErrorEvents) {
        if (typeof retrieveAsRawData === "undefined") { retrieveAsRawData = false; }
        if (typeof data === "undefined") { data = null; }
        if (typeof suppressErrorEvents === "undefined") { suppressErrorEvents = false; }
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
        if (typeof event === "undefined") { event = null; }
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
    ParserBase.PARSING_DONE = true;

    ParserBase.MORE_TO_PARSE = false;
    return ParserBase;
})(EventDispatcher);

module.exports = ParserBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlcnMvUGFyc2VyQmFzZS50cyJdLCJuYW1lcyI6WyJQYXJzZXJCYXNlIiwiUGFyc2VyQmFzZS5jb25zdHJ1Y3RvciIsIlBhcnNlckJhc2Uuc3VwcG9ydHNUeXBlIiwiUGFyc2VyQmFzZS5pc0JpdG1hcERhdGFWYWxpZCIsIlBhcnNlckJhc2UucGFyc2VBc3luYyIsIlBhcnNlckJhc2UuX2lSZXNvbHZlRGVwZW5kZW5jeSIsIlBhcnNlckJhc2UuX2lSZXNvbHZlRGVwZW5kZW5jeUZhaWx1cmUiLCJQYXJzZXJCYXNlLl9pUmVzb2x2ZURlcGVuZGVuY3lOYW1lIiwiUGFyc2VyQmFzZS5faVJlc3VtZVBhcnNpbmdBZnRlckRlcGVuZGVuY2llcyIsIlBhcnNlckJhc2UuX3BGaW5hbGl6ZUFzc2V0IiwiUGFyc2VyQmFzZS5fcFByb2NlZWRQYXJzaW5nIiwiUGFyc2VyQmFzZS5fcERpZVdpdGhFcnJvciIsIlBhcnNlckJhc2UuX3BBZGREZXBlbmRlbmN5IiwiUGFyc2VyQmFzZS5fcFBhdXNlQW5kUmV0cmlldmVEZXBlbmRlbmNpZXMiLCJQYXJzZXJCYXNlLl9wSGFzVGltZSIsIlBhcnNlckJhc2UuX3BPbkludGVydmFsIiwiUGFyc2VyQmFzZS5fcFN0YXJ0UGFyc2luZyIsIlBhcnNlckJhc2UuX3BGaW5pc2hQYXJzaW5nIiwiUGFyc2VyQmFzZS5fcEdldFRleHREYXRhIiwiUGFyc2VyQmFzZS5fcEdldEJ5dGVEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwrRUFJb0Y7QUFDcEYsNkRBQW9FO0FBQ3BFLHVFQUE2RTtBQUM3RSwrREFBc0U7QUFDdEUsNkRBQW9FO0FBQ3BFLGdFQUF1RTtBQUN2RSw4RUFBbUY7O0FBRW5GLGdFQUF1RTtBQUN2RSxrREFBMEQ7QUFDMUQsd0RBQWdFOztBQUVoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBa0JHO0FBQ0g7SUFBeUJBLDZCQUFlQTtJQWlFdkNBOzs7OztNQURHQTtJQUNIQSxvQkFBWUEsTUFBYUE7UUFBekJDLGlCQVNDQTtRQVBBQSxXQUFNQSxLQUFBQSxDQUFDQTs7UUFFUEEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsQ0FBQ0E7UUFDdEJBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLE1BQU1BO1FBQ3pCQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFxQkEsQ0FBQ0E7O1FBRXBEQSxJQUFJQSxDQUFDQSxvQkFBb0JBLEdBQUdBLFVBQUNBLEtBQWdCQTttQkFBS0EsS0FBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFBeEJBLENBQXdCQTtJQUMzRUEsQ0FBQ0E7SUF4RERELGtLQVJrS0E7SUFDbEtBLDJHQUEyR0E7SUFDM0dBLGtLQUFrS0E7SUFDbEtBLDJDQUEyQ0E7SUFDM0NBLHVFQUF1RUE7SUFDdkVBLCtFQUErRUE7SUFDL0VBLGtLQUFrS0E7OEJBRWxLQSxVQUEyQkEsU0FBZ0JBO1FBRTFDRSxNQUFNQSxJQUFJQSxtQkFBbUJBLENBQUNBLENBQUNBO0lBQ2hDQSxDQUFDQTs7SUFpQ0RGO1FBQUFBLGVBSGVBO2FBR2ZBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFNBQVNBO1FBQ3RCQSxDQUFDQTs7OztBQUFBQTtJQXVCREE7O01BRkdBOzZDQUVIQSxVQUF5QkEsVUFBcUJBO1FBRTdDRyxJQUFJQSxPQUFPQSxHQUFXQSxZQUFZQSxDQUFDQSxpQkFBaUJBLENBQUNBLFVBQVVBLENBQUNBOztRQUVoRUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBRUE7WUFFYkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsNkVBQTZFQSxDQUFDQTtTQUMxRkE7O1FBRURBLE9BQU9BLE9BQU9BO0lBQ2ZBLENBQUNBOzs7SUFPREg7UUFBQUEsS0FBQUE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsZUFBZUE7UUFDNUJBLENBQUNBO1FBUkRBLEtBQUFBLFVBQTBCQSxDQUFTQTtZQUVsQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsR0FBR0EsQ0FBQ0E7UUFDekJBLENBQUNBOzs7O0FBS0FBO0lBRURBO1FBQUFBLEtBQUFBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGNBQWNBO1FBQzNCQSxDQUFDQTs7OztBQUFBQTtJQUVEQTtRQUFBQSxLQUFBQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxnQkFBZ0JBO1FBQzdCQSxDQUFDQTs7OztBQUFBQTs7SUFPREE7UUFBQUEsS0FBQUE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsYUFBYUE7UUFDMUJBLENBQUNBO1FBUkRBLEtBQUFBLFVBQXdCQSxlQUFzQkE7WUFFN0NBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLGVBQWVBO1FBQ3JDQSxDQUFDQTs7OztBQUtBQTtJQUVEQTtRQUFBQSxLQUFBQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxLQUFLQTtRQUNsQkEsQ0FBQ0E7Ozs7QUFBQUE7SUFLREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFdBQVdBO1FBQ3hCQSxDQUFDQTs7OztBQUFBQTtJQVlEQTs7Ozs7Ozs7O01BREdBO3NDQUNIQSxVQUFrQkEsSUFBUUEsRUFBRUEsVUFBc0JBO1FBQXRCSSx5Q0FBQUEsVUFBVUEsR0FBVUEsRUFBRUE7QUFBQUEsUUFFakRBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBO1FBQ2pCQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxVQUFVQSxDQUFDQTtJQUNoQ0EsQ0FBQ0E7O0lBS0RKO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxhQUFhQTtRQUMxQkEsQ0FBQ0E7Ozs7QUFBQUE7SUFTREE7Ozs7OztNQURHQTsrQ0FDSEEsVUFBMkJBLGtCQUFxQ0E7UUFFL0RLLE1BQU1BLElBQUlBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7SUFDaENBLENBQUNBOztJQU9ETDs7OztNQURHQTtzREFDSEEsVUFBa0NBLGtCQUFxQ0E7UUFFdEVNLE1BQU1BLElBQUlBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7SUFDaENBLENBQUNBOztJQU9ETjs7OztNQURHQTttREFDSEEsVUFBK0JBLGtCQUFxQ0EsRUFBRUEsS0FBWUE7UUFFakZPLE9BQU9BLEtBQUtBLENBQUNBLElBQUlBO0lBQ2xCQSxDQUFDQTs7SUFFRFAsd0RBQUFBO1FBRUNRLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLEtBQUtBOztRQUUzQkEsSUFBSUEsSUFBSUEsQ0FBQ0EsTUFBTUE7WUFDZEEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDdEJBLENBQUNBOztJQUVEUix1Q0FBQUEsVUFBdUJBLEtBQVlBLEVBQUVBLElBQWtCQTtRQUFsQlMsbUNBQUFBLElBQUlBLEdBQVVBLElBQUlBO0FBQUFBLFFBRXREQSxJQUFJQSxVQUFVQTtRQUNkQSxJQUFJQSxTQUFTQTs7UUFFYkEsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUE7WUFDZkEsS0FBS0EsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7O1FBRW5CQSxvQ0FBb0NBO1FBQ3BDQSwyQkFBMkJBO1FBQzNCQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQTtZQUNkQSxLQUFLQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxTQUFTQSxDQUFDQTs7UUFFOUJBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLFVBQVVBLENBQUNBLFVBQVVBLENBQUNBLGNBQWNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO0lBQ3JFQSxDQUFDQTs7SUFPRFQ7Ozs7TUFER0E7NENBQ0hBO1FBRUNVLE1BQU1BLElBQUlBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7SUFDaENBLENBQUNBOztJQUVEVixzQ0FBQUEsVUFBc0JBLE9BQXdDQTtRQUF4Q1csc0NBQUFBLE9BQU9BLEdBQVVBLHVCQUF1QkE7QUFBQUEsUUFFN0RBLElBQUlBLElBQUlBLENBQUNBLE1BQU1BLENBQUVBO1lBQ2hCQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0E7WUFDNUVBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ2xCQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQTtTQUNsQkE7O1FBRURBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLFdBQVdBLENBQUNBLFdBQVdBLENBQUNBLFdBQVdBLEVBQUVBLE9BQU9BLENBQUNBLENBQUNBO0lBQ3RFQSxDQUFDQTs7SUFFRFgsdUNBQUFBLFVBQXVCQSxFQUFTQSxFQUFFQSxHQUFjQSxFQUFFQSxpQkFBaUNBLEVBQUVBLElBQWVBLEVBQUVBLG1CQUFtQ0E7UUFBdkZZLGdEQUFBQSxpQkFBaUJBLEdBQVdBLEtBQUtBO0FBQUFBLFFBQUVBLG1DQUFBQSxJQUFJQSxHQUFPQSxJQUFJQTtBQUFBQSxRQUFFQSxrREFBQUEsbUJBQW1CQSxHQUFXQSxLQUFLQTtBQUFBQSxRQUV4SUEsSUFBSUEsVUFBVUEsR0FBc0JBLElBQUlBLGtCQUFrQkEsQ0FBQ0EsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsaUJBQWlCQSxFQUFFQSxtQkFBbUJBLENBQUNBO1FBQzdIQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTs7UUFFbkNBLE9BQU9BLFVBQVVBO0lBQ2xCQSxDQUFDQTs7SUFFRFosc0RBQUFBO1FBRUNhLElBQUlBLElBQUlBLENBQUNBLE1BQU1BO1lBQ2RBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBOztRQUVwQkEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUE7UUFDMUJBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLFdBQVdBLENBQUNBLFdBQVdBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0E7SUFDeEVBLENBQUNBOztJQU1EYjs7O01BREdBO3FDQUNIQTtRQUVDYyxPQUFPQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtJQUMvREEsQ0FBQ0E7O0lBS0RkOztNQURHQTt3Q0FDSEEsVUFBb0JBLEtBQXVCQTtRQUF2QmUsb0NBQUFBLEtBQUtBLEdBQWNBLElBQUlBO0FBQUFBLFFBRTFDQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQTs7UUFFaENBLElBQUlBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUE7WUFDbkRBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBLENBQUNBO0lBQ3pCQSxDQUFDQTs7SUFNRGY7OztNQURHQTswQ0FDSEEsVUFBc0JBLFVBQWlCQTtRQUV0Q2dCLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLFVBQVVBO1FBQzdCQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUM1Q0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBO1FBQ3pFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtJQUNwQkEsQ0FBQ0E7O0lBS0RoQjs7TUFER0E7MkNBQ0hBO1FBRUNpQixJQUFJQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFFQTtZQUNoQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBO1lBQzVFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtTQUNsQkE7O1FBRURBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBO1FBQ2xCQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBOztRQUU1QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsV0FBV0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0E7SUFDaEVBLENBQUNBOztJQU9EakI7Ozs7TUFER0E7eUNBQ0hBO1FBRUNrQixPQUFPQSxXQUFXQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUN4Q0EsQ0FBQ0E7O0lBT0RsQjs7OztNQURHQTt5Q0FDSEE7UUFFQ21CLE9BQU9BLFdBQVdBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO0lBQzNDQSxDQUFDQTtJQW5SRG5CLDBCQUFxQ0EsSUFBSUE7O0lBTXpDQSwyQkFBc0NBLEtBQUtBO0lBOFE1Q0Esa0JBQUNBO0FBQURBLENBQUNBLEVBaFV3QixlQUFlLEVBZ1V2Qzs7QUFFRCwyQkFBb0IsQ0FBQSIsImZpbGUiOiJwYXJzZXJzL1BhcnNlckJhc2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQml0bWFwRGF0YVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9CaXRtYXBEYXRhXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IFVSTFJlcXVlc3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL25ldC9VUkxSZXF1ZXN0XCIpO1xuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xuaW1wb3J0IEFzc2V0RXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvQXNzZXRFdmVudFwiKTtcbmltcG9ydCBFdmVudERpc3BhdGNoZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiKTtcbmltcG9ydCBQYXJzZXJFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9QYXJzZXJFdmVudFwiKTtcbmltcG9ydCBUaW1lckV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL1RpbWVyRXZlbnRcIik7XG5pbXBvcnQgUGFyc2VyVXRpbHNcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlclV0aWxzXCIpO1xuaW1wb3J0IFJlc291cmNlRGVwZW5kZW5jeVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcGFyc2Vycy9SZXNvdXJjZURlcGVuZGVuY3lcIik7XG5pbXBvcnQgQnl0ZUFycmF5XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvQnl0ZUFycmF5XCIpO1xuaW1wb3J0IFRleHR1cmVVdGlsc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL1RleHR1cmVVdGlsc1wiKTtcbmltcG9ydCBUaW1lclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvVGltZXJcIik7XG5pbXBvcnQgZ2V0VGltZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL2dldFRpbWVyXCIpO1xuXG4vKipcbiAqIDxjb2RlPlBhcnNlckJhc2U8L2NvZGU+IHByb3ZpZGVzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIG9iamVjdHMgdGhhdCBjb252ZXJ0IGJsb2NrcyBvZiBkYXRhIHRvIGRhdGEgc3RydWN0dXJlc1xuICogc3VwcG9ydGVkIGJ5IGF3YXkuXG4gKlxuICogSWYgdXNlZCBieSA8Y29kZT5Bc3NldExvYWRlcjwvY29kZT4gdG8gYXV0b21hdGljYWxseSBkZXRlcm1pbmUgdGhlIHBhcnNlciB0eXBlLCB0d28gcHVibGljIHN0YXRpYyBtZXRob2RzIHNob3VsZFxuICogYmUgaW1wbGVtZW50ZWQsIHdpdGggdGhlIGZvbGxvd2luZyBzaWduYXR1cmVzOlxuICpcbiAqIDxjb2RlPnB1YmxpYyBzdGF0aWMgc3VwcG9ydHNUeXBlKGV4dGVuc2lvbiA6IHN0cmluZykgOiBib29sZWFuPC9jb2RlPlxuICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gZmlsZSBleHRlbnNpb24gaXMgc3VwcG9ydGVkIGJ5IHRoZSBwYXJzZXIuXG4gKlxuICogPGNvZGU+cHVibGljIHN0YXRpYyBzdXBwb3J0c0RhdGEoZGF0YSA6ICopIDogYm9vbGVhbjwvY29kZT5cbiAqIFRlc3RzIHdoZXRoZXIgYSBkYXRhIGJsb2NrIGNhbiBiZSBwYXJzZWQgYnkgdGhlIHBhcnNlci5cbiAqXG4gKiBGdXJ0aGVybW9yZSwgZm9yIGFueSBjb25jcmV0ZSBzdWJ0eXBlLCB0aGUgbWV0aG9kIDxjb2RlPmluaXRIYW5kbGU8L2NvZGU+IHNob3VsZCBiZSBvdmVycmlkZGVuIHRvIGltbWVkaWF0ZWx5XG4gKiBjcmVhdGUgdGhlIG9iamVjdCB0aGF0IHdpbGwgY29udGFpbiB0aGUgcGFyc2VkIGRhdGEuIFRoaXMgYWxsb3dzIDxjb2RlPlJlc291cmNlTWFuYWdlcjwvY29kZT4gdG8gcmV0dXJuIGFuIG9iamVjdFxuICogaGFuZGxlIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGUgb2JqZWN0IHdhcyBsb2FkZWQgb3Igbm90LlxuICpcbiAqIEBzZWUgQXNzZXRMb2FkZXJcbiAqL1xuY2xhc3MgUGFyc2VyQmFzZSBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxue1xuXHRwdWJsaWMgX2lGaWxlTmFtZTpzdHJpbmc7XG5cdHByaXZhdGUgX2RhdGFGb3JtYXQ6c3RyaW5nO1xuXHRwcml2YXRlIF9kYXRhOmFueTtcblx0cHJpdmF0ZSBfZnJhbWVMaW1pdDpudW1iZXI7XG5cdHByaXZhdGUgX2xhc3RGcmFtZVRpbWU6bnVtYmVyO1xuXHRwcml2YXRlIF9wT25JbnRlcnZhbERlbGVnYXRlOihldmVudDpUaW1lckV2ZW50KSA9PiB2b2lkO1xuXHRwdWJsaWMgX3BDb250ZW50OkRpc3BsYXlPYmplY3Q7XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFRPRE86IGFkZCBlcnJvciBjaGVja2luZyBmb3IgdGhlIGZvbGxvd2luZyAoIGNvdWxkIGNhdXNlIGEgcHJvYmxlbSBpZiB0aGlzIGZ1bmN0aW9uIGlzIG5vdCBpbXBsZW1lbnRlZCApXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBOZWVkcyB0byBiZSBpbXBsZW1lbnRlZCBpbiBhbGwgUGFyc2VycyAoXG5cdC8vPGNvZGU+cHVibGljIHN0YXRpYyBzdXBwb3J0c1R5cGUoZXh0ZW5zaW9uIDogc3RyaW5nKSA6IGJvb2xlYW48L2NvZGU+XG5cdC8vKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgYSBnaXZlbiBmaWxlIGV4dGVuc2lvbiBpcyBzdXBwb3J0ZWQgYnkgdGhlIHBhcnNlci5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0cHVibGljIHN0YXRpYyBzdXBwb3J0c1R5cGUoZXh0ZW5zaW9uOnN0cmluZyk6Ym9vbGVhblxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdC8qIFRPRE86IEltcGxlbWVudCBQYXJzZXJVdGlscztcblx0IHB1YmxpYyBfcEdldFRleHREYXRhKCk6c3RyaW5nXG5cdCB7XG5cdCByZXR1cm4gUGFyc2VyVXRpbHMudG9TdHJpbmcoX2RhdGEpO1xuXHQgfVxuXG5cdCBwdWJsaWMgX3BHZXRCeXRlRGF0YSgpOkJ5dGVBcnJheVxuXHQge1xuXHQgcmV0dXJuIFBhcnNlclV0aWxzLnRvQnl0ZUFycmF5KF9kYXRhKTtcblx0IH1cblx0ICovXG5cdHByaXZhdGUgX2RlcGVuZGVuY2llczpBcnJheTxSZXNvdXJjZURlcGVuZGVuY3k+O1xuXHRwcml2YXRlIF9wYXJzaW5nUGF1c2VkOmJvb2xlYW47XG5cdHByaXZhdGUgX3BhcnNpbmdDb21wbGV0ZTpib29sZWFuO1xuXHRwcml2YXRlIF9wYXJzaW5nRmFpbHVyZTpib29sZWFuO1xuXHRwcml2YXRlIF90aW1lcjpUaW1lcjtcblx0cHJpdmF0ZSBfbWF0ZXJpYWxNb2RlOm51bWJlcjtcblxuXHQvKipcblx0ICogUmV0dXJuZWQgYnkgPGNvZGU+cHJvY2VlZFBhcnNpbmc8L2NvZGU+IHRvIGluZGljYXRlIG5vIG1vcmUgcGFyc2luZyBpcyBuZWVkZWQuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIFBBUlNJTkdfRE9ORTpib29sZWFuID0gdHJ1ZTtcblx0LyogUHJvdGVjdGVkICovXG5cblx0LyoqXG5cdCAqIFJldHVybmVkIGJ5IDxjb2RlPnByb2NlZWRQYXJzaW5nPC9jb2RlPiB0byBpbmRpY2F0ZSBtb3JlIHBhcnNpbmcgaXMgbmVlZGVkLCBhbGxvd2luZyBhc3luY2hyb25vdXMgcGFyc2luZy5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgTU9SRV9UT19QQVJTRTpib29sZWFuID0gZmFsc2U7XG5cdC8qIFByb3RlY3RlZCAqL1xuXG5cblx0cHVibGljIGdldCBjb250ZW50KCk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BDb250ZW50O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgUGFyc2VyQmFzZSBvYmplY3Rcblx0ICogQHBhcmFtIGZvcm1hdCBUaGUgZGF0YSBmb3JtYXQgb2YgdGhlIGZpbGUgZGF0YSB0byBiZSBwYXJzZWQuIENhbiBiZSBlaXRoZXIgPGNvZGU+UGFyc2VyRGF0YUZvcm1hdC5CSU5BUlk8L2NvZGU+IG9yIDxjb2RlPlBhcnNlckRhdGFGb3JtYXQuUExBSU5fVEVYVDwvY29kZT4sIGFuZCBzaG91bGQgYmUgcHJvdmlkZWQgYnkgdGhlIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAqXG5cdCAqIEBzZWUgYXdheS5sb2FkaW5nLnBhcnNlcnMuUGFyc2VyRGF0YUZvcm1hdFxuXHQgKi9cblx0Y29uc3RydWN0b3IoZm9ybWF0OnN0cmluZylcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9tYXRlcmlhbE1vZGUgPSAwO1xuXHRcdHRoaXMuX2RhdGFGb3JtYXQgPSBmb3JtYXQ7XG5cdFx0dGhpcy5fZGVwZW5kZW5jaWVzID0gbmV3IEFycmF5PFJlc291cmNlRGVwZW5kZW5jeT4oKTtcblxuXHRcdHRoaXMuX3BPbkludGVydmFsRGVsZWdhdGUgPSAoZXZlbnQ6VGltZXJFdmVudCkgPT4gdGhpcy5fcE9uSW50ZXJ2YWwoZXZlbnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFZhbGlkYXRlcyBhIGJpdG1hcERhdGEgbG9hZGVkIGJlZm9yZSBhc3NpZ25pbmcgdG8gYSBkZWZhdWx0IEJpdG1hcE1hdGVyaWFsXG5cdCAqL1xuXG5cdHB1YmxpYyBpc0JpdG1hcERhdGFWYWxpZChiaXRtYXBEYXRhOkJpdG1hcERhdGEpOmJvb2xlYW5cblx0e1xuXHRcdHZhciBpc1ZhbGlkOmJvb2xlYW4gPSBUZXh0dXJlVXRpbHMuaXNCaXRtYXBEYXRhVmFsaWQoYml0bWFwRGF0YSk7XG5cblx0XHRpZiAoIWlzVmFsaWQpIHtcblxuXHRcdFx0Y29uc29sZS5sb2coXCI+PiBCaXRtYXAgbG9hZGVkIGlzIG5vdCBoYXZpbmcgcG93ZXIgb2YgMiBkaW1lbnNpb25zIG9yIGlzIGhpZ2hlciB0aGFuIDIwNDhcIik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlzVmFsaWQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHBhcnNpbmdGYWlsdXJlKGI6Ym9vbGVhbilcblx0e1xuXHRcdHRoaXMuX3BhcnNpbmdGYWlsdXJlID0gYjtcblx0fVxuXG5cdHB1YmxpYyBnZXQgcGFyc2luZ0ZhaWx1cmUoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyc2luZ0ZhaWx1cmU7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHBhcnNpbmdQYXVzZWQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyc2luZ1BhdXNlZDtcblx0fVxuXG5cdHB1YmxpYyBnZXQgcGFyc2luZ0NvbXBsZXRlKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BhcnNpbmdDb21wbGV0ZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbWF0ZXJpYWxNb2RlKG5ld01hdGVyaWFsTW9kZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9tYXRlcmlhbE1vZGUgPSBuZXdNYXRlcmlhbE1vZGU7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IG1hdGVyaWFsTW9kZSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsTW9kZTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgZGF0YSgpOmFueVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2RhdGE7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGRhdGEgZm9ybWF0IG9mIHRoZSBmaWxlIGRhdGEgdG8gYmUgcGFyc2VkLiBPcHRpb25zIGFyZSA8Y29kZT5VUkxMb2FkZXJEYXRhRm9ybWF0LkJJTkFSWTwvY29kZT4sIDxjb2RlPlVSTExvYWRlckRhdGFGb3JtYXQuQVJSQVlfQlVGRkVSPC9jb2RlPiwgPGNvZGU+VVJMTG9hZGVyRGF0YUZvcm1hdC5CTE9CPC9jb2RlPiwgPGNvZGU+VVJMTG9hZGVyRGF0YUZvcm1hdC5WQVJJQUJMRVM8L2NvZGU+IG9yIDxjb2RlPlVSTExvYWRlckRhdGFGb3JtYXQuVEVYVDwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGRhdGFGb3JtYXQoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kYXRhRm9ybWF0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnNlIGRhdGEgKHBvc3NpYmx5IGNvbnRhaW5pbmcgYnl0ZWFycnksIHBsYWluIHRleHQgb3IgQml0bWFwQXNzZXQpIGFzeW5jaHJvbm91c2x5LCBtZWFuaW5nIHRoYXRcblx0ICogdGhlIHBhcnNlciB3aWxsIHBlcmlvZGljYWxseSBzdG9wIHBhcnNpbmcgc28gdGhhdCB0aGUgQVZNIG1heSBwcm9jZWVkIHRvIHRoZVxuXHQgKiBuZXh0IGZyYW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0gZGF0YSBUaGUgdW50eXBlZCBkYXRhIG9iamVjdCBpbiB3aGljaCB0aGUgbG9hZGVkIGRhdGEgcmVzaWRlcy5cblx0ICogQHBhcmFtIGZyYW1lTGltaXQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBvZiBwYXJzaW5nIGFsbG93ZWQgcGVyIGZyYW1lLiBUaGVcblx0ICogYWN0dWFsIHRpbWUgc3BlbnQgb24gYSBmcmFtZSBjYW4gZXhjZWVkIHRoaXMgbnVtYmVyIHNpbmNlIHRpbWUtY2hlY2tzIGNhblxuXHQgKiBvbmx5IGJlIHBlcmZvcm1lZCBiZXR3ZWVuIGxvZ2ljYWwgc2VjdGlvbnMgb2YgdGhlIHBhcnNpbmcgcHJvY2VkdXJlLlxuXHQgKi9cblx0cHVibGljIHBhcnNlQXN5bmMoZGF0YTphbnksIGZyYW1lTGltaXQ6bnVtYmVyID0gMzApXG5cdHtcblx0XHR0aGlzLl9kYXRhID0gZGF0YTtcblx0XHR0aGlzLl9wU3RhcnRQYXJzaW5nKGZyYW1lTGltaXQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgbGlzdCBvZiBkZXBlbmRlbmNpZXMgdGhhdCBuZWVkIHRvIGJlIGxvYWRlZCBhbmQgcmVzb2x2ZWQgZm9yIHRoZSBvYmplY3QgYmVpbmcgcGFyc2VkLlxuXHQgKi9cblx0cHVibGljIGdldCBkZXBlbmRlbmNpZXMoKTpBcnJheTxSZXNvdXJjZURlcGVuZGVuY3k+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGVwZW5kZW5jaWVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlc29sdmUgYSBkZXBlbmRlbmN5IHdoZW4gaXQncyBsb2FkZWQuIEZvciBleGFtcGxlLCBhIGRlcGVuZGVuY3kgY29udGFpbmluZyBhbiBJbWFnZVJlc291cmNlIHdvdWxkIGJlIGFzc2lnbmVkXG5cdCAqIHRvIGEgTWVzaCBpbnN0YW5jZSBhcyBhIEJpdG1hcE1hdGVyaWFsLCBhIHNjZW5lIGdyYXBoIG9iamVjdCB3b3VsZCBiZSBhZGRlZCB0byBpdHMgaW50ZW5kZWQgcGFyZW50LiBUaGVcblx0ICogZGVwZW5kZW5jeSBzaG91bGQgYmUgYSBtZW1iZXIgb2YgdGhlIGRlcGVuZGVuY2llcyBwcm9wZXJ0eS5cblx0ICpcblx0ICogQHBhcmFtIHJlc291cmNlRGVwZW5kZW5jeSBUaGUgZGVwZW5kZW5jeSB0byBiZSByZXNvbHZlZC5cblx0ICovXG5cdHB1YmxpYyBfaVJlc29sdmVEZXBlbmRlbmN5KHJlc291cmNlRGVwZW5kZW5jeTpSZXNvdXJjZURlcGVuZGVuY3kpXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlc29sdmUgYSBkZXBlbmRlbmN5IGxvYWRpbmcgZmFpbHVyZS4gVXNlZCBieSBwYXJzZXIgdG8gZXZlbnR1YWxseSBwcm92aWRlIGEgZGVmYXVsdCBtYXBcblx0ICpcblx0ICogQHBhcmFtIHJlc291cmNlRGVwZW5kZW5jeSBUaGUgZGVwZW5kZW5jeSB0byBiZSByZXNvbHZlZC5cblx0ICovXG5cdHB1YmxpYyBfaVJlc29sdmVEZXBlbmRlbmN5RmFpbHVyZShyZXNvdXJjZURlcGVuZGVuY3k6UmVzb3VyY2VEZXBlbmRlbmN5KVxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXNvbHZlIGEgZGVwZW5kZW5jeSBuYW1lXG5cdCAqXG5cdCAqIEBwYXJhbSByZXNvdXJjZURlcGVuZGVuY3kgVGhlIGRlcGVuZGVuY3kgdG8gYmUgcmVzb2x2ZWQuXG5cdCAqL1xuXHRwdWJsaWMgX2lSZXNvbHZlRGVwZW5kZW5jeU5hbWUocmVzb3VyY2VEZXBlbmRlbmN5OlJlc291cmNlRGVwZW5kZW5jeSwgYXNzZXQ6SUFzc2V0KTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBhc3NldC5uYW1lO1xuXHR9XG5cblx0cHVibGljIF9pUmVzdW1lUGFyc2luZ0FmdGVyRGVwZW5kZW5jaWVzKClcblx0e1xuXHRcdHRoaXMuX3BhcnNpbmdQYXVzZWQgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLl90aW1lcilcblx0XHRcdHRoaXMuX3RpbWVyLnN0YXJ0KCk7XG5cdH1cblxuXHRwdWJsaWMgX3BGaW5hbGl6ZUFzc2V0KGFzc2V0OklBc3NldCwgbmFtZTpzdHJpbmcgPSBudWxsKVxuXHR7XG5cdFx0dmFyIHR5cGVfZXZlbnQ6c3RyaW5nO1xuXHRcdHZhciB0eXBlX25hbWU6c3RyaW5nO1xuXG5cdFx0aWYgKG5hbWUgIT0gbnVsbClcblx0XHRcdGFzc2V0Lm5hbWUgPSBuYW1lO1xuXG5cdFx0Ly8gSWYgdGhlIGFzc2V0IGhhcyBubyBuYW1lLCBnaXZlIGl0XG5cdFx0Ly8gYSBwZXItdHlwZSBkZWZhdWx0IG5hbWUuXG5cdFx0aWYgKCFhc3NldC5uYW1lKVxuXHRcdFx0YXNzZXQubmFtZSA9IGFzc2V0LmFzc2V0VHlwZTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQXNzZXRFdmVudChBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCBhc3NldCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnNlIHRoZSBuZXh0IGJsb2NrIG9mIGRhdGEuXG5cdCAqIEByZXR1cm4gV2hldGhlciBvciBub3QgbW9yZSBkYXRhIG5lZWRzIHRvIGJlIHBhcnNlZC4gQ2FuIGJlIDxjb2RlPlBhcnNlckJhc2UuUGFyc2VyQmFzZS5QQVJTSU5HX0RPTkU8L2NvZGU+IG9yXG5cdCAqIDxjb2RlPlBhcnNlckJhc2UuUGFyc2VyQmFzZS5NT1JFX1RPX1BBUlNFPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBfcFByb2NlZWRQYXJzaW5nKCk6Ym9vbGVhblxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdHB1YmxpYyBfcERpZVdpdGhFcnJvcihtZXNzYWdlOnN0cmluZyA9ICdVbmtub3duIHBhcnNpbmcgZXJyb3InKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3RpbWVyKSB7XG5cdFx0XHR0aGlzLl90aW1lci5yZW1vdmVFdmVudExpc3RlbmVyKFRpbWVyRXZlbnQuVElNRVIsIHRoaXMuX3BPbkludGVydmFsRGVsZWdhdGUpO1xuXHRcdFx0dGhpcy5fdGltZXIuc3RvcCgpO1xuXHRcdFx0dGhpcy5fdGltZXIgPSBudWxsO1xuXHRcdH1cblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgUGFyc2VyRXZlbnQoUGFyc2VyRXZlbnQuUEFSU0VfRVJST1IsIG1lc3NhZ2UpKTtcblx0fVxuXG5cdHB1YmxpYyBfcEFkZERlcGVuZGVuY3koaWQ6c3RyaW5nLCByZXE6VVJMUmVxdWVzdCwgcmV0cmlldmVBc1Jhd0RhdGE6Ym9vbGVhbiA9IGZhbHNlLCBkYXRhOmFueSA9IG51bGwsIHN1cHByZXNzRXJyb3JFdmVudHM6Ym9vbGVhbiA9IGZhbHNlKTpSZXNvdXJjZURlcGVuZGVuY3lcblx0e1xuXHRcdHZhciBkZXBlbmRlbmN5OlJlc291cmNlRGVwZW5kZW5jeSA9IG5ldyBSZXNvdXJjZURlcGVuZGVuY3koaWQsIHJlcSwgZGF0YSwgbnVsbCwgdGhpcywgcmV0cmlldmVBc1Jhd0RhdGEsIHN1cHByZXNzRXJyb3JFdmVudHMpO1xuXHRcdHRoaXMuX2RlcGVuZGVuY2llcy5wdXNoKGRlcGVuZGVuY3kpO1xuXG5cdFx0cmV0dXJuIGRlcGVuZGVuY3k7XG5cdH1cblxuXHRwdWJsaWMgX3BQYXVzZUFuZFJldHJpZXZlRGVwZW5kZW5jaWVzKClcblx0e1xuXHRcdGlmICh0aGlzLl90aW1lcilcblx0XHRcdHRoaXMuX3RpbWVyLnN0b3AoKTtcblxuXHRcdHRoaXMuX3BhcnNpbmdQYXVzZWQgPSB0cnVlO1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgUGFyc2VyRXZlbnQoUGFyc2VyRXZlbnQuUkVBRFlfRk9SX0RFUEVOREVOQ0lFUykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRlc3RzIHdoZXRoZXIgb3Igbm90IHRoZXJlIGlzIHN0aWxsIHRpbWUgbGVmdCBmb3IgcGFyc2luZyB3aXRoaW4gdGhlIG1heGltdW0gYWxsb3dlZCB0aW1lIGZyYW1lIHBlciBzZXNzaW9uLlxuXHQgKiBAcmV0dXJuIFRydWUgaWYgdGhlcmUgaXMgc3RpbGwgdGltZSBsZWZ0LCBmYWxzZSBpZiB0aGUgbWF4aW11bSBhbGxvdHRlZCB0aW1lIHdhcyBleGNlZWRlZCBhbmQgcGFyc2luZyBzaG91bGQgYmUgaW50ZXJydXB0ZWQuXG5cdCAqL1xuXHRwdWJsaWMgX3BIYXNUaW1lKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICgoZ2V0VGltZXIoKSAtIHRoaXMuX2xhc3RGcmFtZVRpbWUpIDwgdGhpcy5fZnJhbWVMaW1pdCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gdGhlIHBhcnNpbmcgcGF1c2UgaW50ZXJ2YWwgaGFzIHBhc3NlZCBhbmQgcGFyc2luZyBjYW4gcHJvY2VlZC5cblx0ICovXG5cdHB1YmxpYyBfcE9uSW50ZXJ2YWwoZXZlbnQ6VGltZXJFdmVudCA9IG51bGwpXG5cdHtcblx0XHR0aGlzLl9sYXN0RnJhbWVUaW1lID0gZ2V0VGltZXIoKTtcblxuXHRcdGlmICh0aGlzLl9wUHJvY2VlZFBhcnNpbmcoKSAmJiAhdGhpcy5fcGFyc2luZ0ZhaWx1cmUpXG5cdFx0XHR0aGlzLl9wRmluaXNoUGFyc2luZygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemVzIHRoZSBwYXJzaW5nIG9mIGRhdGEuXG5cdCAqIEBwYXJhbSBmcmFtZUxpbWl0IFRoZSBtYXhpbXVtIGR1cmF0aW9uIG9mIGEgcGFyc2luZyBzZXNzaW9uLlxuXHQgKi9cblx0cHVibGljIF9wU3RhcnRQYXJzaW5nKGZyYW1lTGltaXQ6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fZnJhbWVMaW1pdCA9IGZyYW1lTGltaXQ7XG5cdFx0dGhpcy5fdGltZXIgPSBuZXcgVGltZXIodGhpcy5fZnJhbWVMaW1pdCwgMCk7XG5cdFx0dGhpcy5fdGltZXIuYWRkRXZlbnRMaXN0ZW5lcihUaW1lckV2ZW50LlRJTUVSLCB0aGlzLl9wT25JbnRlcnZhbERlbGVnYXRlKTtcblx0XHR0aGlzLl90aW1lci5zdGFydCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZpbmlzaCBwYXJzaW5nIHRoZSBkYXRhLlxuXHQgKi9cblx0cHVibGljIF9wRmluaXNoUGFyc2luZygpXG5cdHtcblx0XHRpZiAodGhpcy5fdGltZXIpIHtcblx0XHRcdHRoaXMuX3RpbWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoVGltZXJFdmVudC5USU1FUiwgdGhpcy5fcE9uSW50ZXJ2YWxEZWxlZ2F0ZSk7XG5cdFx0XHR0aGlzLl90aW1lci5zdG9wKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fdGltZXIgPSBudWxsO1xuXHRcdHRoaXMuX3BhcnNpbmdDb21wbGV0ZSA9IHRydWU7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFBhcnNlckV2ZW50KFBhcnNlckV2ZW50LlBBUlNFX0NPTVBMRVRFKSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBfcEdldFRleHREYXRhKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gUGFyc2VyVXRpbHMudG9TdHJpbmcodGhpcy5fZGF0YSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBfcEdldEJ5dGVEYXRhKCk6Qnl0ZUFycmF5XG5cdHtcblx0XHRyZXR1cm4gUGFyc2VyVXRpbHMudG9CeXRlQXJyYXkodGhpcy5fZGF0YSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gUGFyc2VyQmFzZTsiXX0=