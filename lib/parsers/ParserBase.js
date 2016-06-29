"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractMethodError_1 = require("../errors/AbstractMethodError");
var AssetEvent_1 = require("../events/AssetEvent");
var EventDispatcher_1 = require("../events/EventDispatcher");
var ParserEvent_1 = require("../events/ParserEvent");
var TimerEvent_1 = require("../events/TimerEvent");
var ParserUtils_1 = require("../parsers/ParserUtils");
var ResourceDependency_1 = require("../parsers/ResourceDependency");
var ImageUtils_1 = require("../utils/ImageUtils");
var Timer_1 = require("../utils/Timer");
var getTimer_1 = require("../utils/getTimer");
/**
 * <code>ParserBase</code> provides an abstract base export class for objects that convert blocks of data to data structures
 * supported by away.
 *
 * If used by <code>Loader</code> to automatically determine the parser type, two public static methods should
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
 * @see Loader
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
        throw new AbstractMethodError_1.AbstractMethodError();
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
    ParserBase.prototype.isBitmapImage2DValid = function (bitmapImage2D) {
        var isValid = ImageUtils_1.ImageUtils.isImage2DValid(bitmapImage2D);
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
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    /**
     * Resolve a dependency loading failure. Used by parser to eventually provide a default map
     *
     * @param resourceDependency The dependency to be resolved.
     */
    ParserBase.prototype._iResolveDependencyFailure = function (resourceDependency) {
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    /**
     * Resolve a dependency name
     *
     * @param resourceDependency The dependency to be resolved.
     */
    ParserBase.prototype._iResolveDependencyName = function (resourceDependency, asset) {
        return asset.name;
    };
    ParserBase.prototype._iResumeParsing = function () {
        this._parsingPaused = false;
        if (this._timer)
            this._timer.start();
        //get started!
        if (!this._isParsing)
            this._pOnInterval();
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
        this.dispatchEvent(new AssetEvent_1.AssetEvent(AssetEvent_1.AssetEvent.ASSET_COMPLETE, asset));
    };
    /**
     * Parse the next block of data.
     * @return Whether or not more data needs to be parsed. Can be <code>ParserBase.ParserBase.PARSING_DONE</code> or
     * <code>ParserBase.ParserBase.MORE_TO_PARSE</code>.
     */
    ParserBase.prototype._pProceedParsing = function () {
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    ParserBase.prototype._pDieWithError = function (message) {
        if (message === void 0) { message = 'Unknown parsing error'; }
        if (this._timer) {
            this._timer.removeEventListener(TimerEvent_1.TimerEvent.TIMER, this._pOnIntervalDelegate);
            this._timer.stop();
            this._timer = null;
        }
        this.dispatchEvent(new ParserEvent_1.ParserEvent(ParserEvent_1.ParserEvent.PARSE_ERROR, message));
    };
    ParserBase.prototype._pAddDependency = function (id, req, retrieveAsRawData, data, suppressErrorEvents, sub_id) {
        if (retrieveAsRawData === void 0) { retrieveAsRawData = false; }
        if (data === void 0) { data = null; }
        if (suppressErrorEvents === void 0) { suppressErrorEvents = false; }
        if (sub_id === void 0) { sub_id = 0; }
        var dependency = new ResourceDependency_1.ResourceDependency(id, req, data, null, this, retrieveAsRawData, suppressErrorEvents, sub_id);
        this._dependencies.push(dependency);
        return dependency;
    };
    ParserBase.prototype._pPauseAndRetrieveDependencies = function () {
        this._pPauseParsing();
        this.dispatchEvent(new ParserEvent_1.ParserEvent(ParserEvent_1.ParserEvent.READY_FOR_DEPENDENCIES));
    };
    ParserBase.prototype._pPauseParsing = function () {
        if (this._timer)
            this._timer.stop();
        this._parsingPaused = true;
    };
    /**
     * Tests whether or not there is still time left for parsing within the maximum allowed time frame per session.
     * @return True if there is still time left, false if the maximum allotted time was exceeded and parsing should be interrupted.
     */
    ParserBase.prototype._pHasTime = function () {
        return ((getTimer_1.getTimer() - this._lastFrameTime) < this._frameLimit);
    };
    /**
     * Called when the parsing pause interval has passed and parsing can proceed.
     */
    ParserBase.prototype._pOnInterval = function (event) {
        if (event === void 0) { event = null; }
        this._lastFrameTime = getTimer_1.getTimer();
        this._isParsing = true;
        if (this._pProceedParsing() && !this._parsingFailure)
            this._pFinishParsing();
        this._isParsing = false;
    };
    /**
     * Initializes the parsing of data.
     * @param frameLimit The maximum duration of a parsing session.
     */
    ParserBase.prototype._pStartParsing = function (frameLimit) {
        this._frameLimit = frameLimit;
        this._timer = new Timer_1.Timer(this._frameLimit, 0);
        this._timer.addEventListener(TimerEvent_1.TimerEvent.TIMER, this._pOnIntervalDelegate);
        this._timer.start();
        //get started!
        this._pOnInterval();
    };
    /**
     * Finish parsing the data.
     */
    ParserBase.prototype._pFinishParsing = function () {
        if (this._timer) {
            this._timer.removeEventListener(TimerEvent_1.TimerEvent.TIMER, this._pOnIntervalDelegate);
            this._timer.stop();
        }
        this._timer = null;
        this._parsingComplete = true;
        this._isParsing = false;
        this.dispatchEvent(new ParserEvent_1.ParserEvent(ParserEvent_1.ParserEvent.PARSE_COMPLETE));
    };
    /**
     *
     * @returns {string}
     * @private
     */
    ParserBase.prototype._pGetTextData = function () {
        return ParserUtils_1.ParserUtils.toString(this._data);
    };
    /**
     *
     * @returns {ByteArray}
     * @private
     */
    ParserBase.prototype._pGetByteData = function () {
        return ParserUtils_1.ParserUtils.toByteArray(this._data);
    };
    /**
     *
     * @returns {any}
     * @private
     */
    ParserBase.prototype._pGetData = function () {
        return this._data;
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
}(EventDispatcher_1.EventDispatcher));
exports.ParserBase = ParserBase;
