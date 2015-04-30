import BitmapImage2D			= require("awayjs-core/lib/data/BitmapImage2D");
import IAsset					= require("awayjs-core/lib/library/IAsset");
import URLRequest				= require("awayjs-core/lib/net/URLRequest");
import AbstractMethodError		= require("awayjs-core/lib/errors/AbstractMethodError");
import AssetEvent				= require("awayjs-core/lib/events/AssetEvent");
import EventDispatcher			= require("awayjs-core/lib/events/EventDispatcher");
import ParserEvent				= require("awayjs-core/lib/events/ParserEvent");
import TimerEvent				= require("awayjs-core/lib/events/TimerEvent");
import ParserUtils				= require("awayjs-core/lib/parsers/ParserUtils");
import ResourceDependency		= require("awayjs-core/lib/parsers/ResourceDependency");
import ByteArray				= require("awayjs-core/lib/utils/ByteArray");
import ImageUtils				= require("awayjs-core/lib/utils/ImageUtils");
import Timer					= require("awayjs-core/lib/utils/Timer");
import getTimer					= require("awayjs-core/lib/utils/getTimer");

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
class ParserBase extends EventDispatcher
{
	public _iFileName:string;
	private _dataFormat:string;
	private _data:any;
	private _frameLimit:number;
	private _lastFrameTime:number;
	private _pOnIntervalDelegate:(event:TimerEvent) => void;
	public _pContent:IAsset;

	//----------------------------------------------------------------------------------------------------------------------------------------------------------------
	// TODO: add error checking for the following ( could cause a problem if this function is not implemented )
	//----------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Needs to be implemented in all Parsers (
	//<code>public static supportsType(extension : string) : boolean</code>
	//* Indicates whether or not a given file extension is supported by the parser.
	//----------------------------------------------------------------------------------------------------------------------------------------------------------------

	public static supportsType(extension:string):boolean
	{
		throw new AbstractMethodError();
	}

	private _dependencies:Array<ResourceDependency>;
	private _parsingPaused:boolean;
	private _parsingComplete:boolean;
	private _parsingFailure:boolean;
	private _timer:Timer;
	private _materialMode:number;

	/**
	 * Returned by <code>proceedParsing</code> to indicate no more parsing is needed.
	 */
	public static PARSING_DONE:boolean = true;
	/* Protected */

	/**
	 * Returned by <code>proceedParsing</code> to indicate more parsing is needed, allowing asynchronous parsing.
	 */
	public static MORE_TO_PARSE:boolean = false;
	/* Protected */


	public get content():IAsset
	{
		return this._pContent;
	}

	/**
	 * Creates a new ParserBase object
	 * @param format The data format of the file data to be parsed. Can be either <code>ParserDataFormat.BINARY</code> or <code>ParserDataFormat.PLAIN_TEXT</code>, and should be provided by the concrete subtype.
	 *
	 * @see away.loading.parsers.ParserDataFormat
	 */
	constructor(format:string)
	{
		super();

		this._materialMode = 0;
		this._dataFormat = format;
		this._dependencies = new Array<ResourceDependency>();

		this._pOnIntervalDelegate = (event:TimerEvent) => this._pOnInterval(event);
	}

	/**
	 * Validates a bitmapData loaded before assigning to a default BitmapMaterial
	 */

	public isBitmapImage2DValid(bitmapImage2D:BitmapImage2D):boolean
	{
		var isValid:boolean = ImageUtils.isImage2DValid(bitmapImage2D);

		if (!isValid) {

			console.log(">> Bitmap loaded is not having power of 2 dimensions or is higher than 2048");
		}

		return isValid;
	}

	public set parsingFailure(b:boolean)
	{
		this._parsingFailure = b;
	}

	public get parsingFailure():boolean
	{
		return this._parsingFailure;
	}

	public get parsingPaused():boolean
	{
		return this._parsingPaused;
	}

	public get parsingComplete():boolean
	{
		return this._parsingComplete;
	}

	public set materialMode(newMaterialMode:number)
	{
		this._materialMode = newMaterialMode;
	}

	public get materialMode():number
	{
		return this._materialMode;
	}

	public get data():any
	{
		return this._data;
	}

	/**
	 * The data format of the file data to be parsed. Options are <code>URLLoaderDataFormat.BINARY</code>, <code>URLLoaderDataFormat.ARRAY_BUFFER</code>, <code>URLLoaderDataFormat.BLOB</code>, <code>URLLoaderDataFormat.VARIABLES</code> or <code>URLLoaderDataFormat.TEXT</code>.
	 */
	public get dataFormat():string
	{
		return this._dataFormat;
	}

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
	public parseAsync(data:any, frameLimit:number = 30)
	{
		this._data = data;
		this._pStartParsing(frameLimit);
	}

	/**
	 * A list of dependencies that need to be loaded and resolved for the object being parsed.
	 */
	public get dependencies():Array<ResourceDependency>
	{
		return this._dependencies;
	}

	/**
	 * Resolve a dependency when it's loaded. For example, a dependency containing an ImageResource would be assigned
	 * to a Mesh instance as a BitmapMaterial, a scene graph object would be added to its intended parent. The
	 * dependency should be a member of the dependencies property.
	 *
	 * @param resourceDependency The dependency to be resolved.
	 */
	public _iResolveDependency(resourceDependency:ResourceDependency)
	{
		throw new AbstractMethodError();
	}

	/**
	 * Resolve a dependency loading failure. Used by parser to eventually provide a default map
	 *
	 * @param resourceDependency The dependency to be resolved.
	 */
	public _iResolveDependencyFailure(resourceDependency:ResourceDependency)
	{
		throw new AbstractMethodError();
	}

	/**
	 * Resolve a dependency name
	 *
	 * @param resourceDependency The dependency to be resolved.
	 */
	public _iResolveDependencyName(resourceDependency:ResourceDependency, asset:IAsset):string
	{
		return asset.name;
	}

	public _iResumeParsingAfterDependencies()
	{
		this._parsingPaused = false;

		if (this._timer)
			this._timer.start();
	}

	public _pFinalizeAsset(asset:IAsset, name:string = null)
	{
		var type_event:string;
		var type_name:string;

		if (name != null)
			asset.name = name;

		// If the asset has no name, give it
		// a per-type default name.
		if (!asset.name)
			asset.name = asset.assetType;

		this.dispatchEvent(new AssetEvent(AssetEvent.ASSET_COMPLETE, asset));
	}

	/**
	 * Parse the next block of data.
	 * @return Whether or not more data needs to be parsed. Can be <code>ParserBase.ParserBase.PARSING_DONE</code> or
	 * <code>ParserBase.ParserBase.MORE_TO_PARSE</code>.
	 */
	public _pProceedParsing():boolean
	{
		throw new AbstractMethodError();
	}

	public _pDieWithError(message:string = 'Unknown parsing error')
	{
		if (this._timer) {
			this._timer.removeEventListener(TimerEvent.TIMER, this._pOnIntervalDelegate);
			this._timer.stop();
			this._timer = null;
		}

		this.dispatchEvent(new ParserEvent(ParserEvent.PARSE_ERROR, message));
	}

	public _pAddDependency(id:string, req:URLRequest, retrieveAsRawData:boolean = false, data:any = null, suppressErrorEvents:boolean = false, sub_id:number=0):ResourceDependency
	{
		var dependency:ResourceDependency = new ResourceDependency(id, req, data, null, this, retrieveAsRawData, suppressErrorEvents, sub_id);
		this._dependencies.push(dependency);

		return dependency;
	}

	public _pPauseAndRetrieveDependencies()
	{
		if (this._timer)
			this._timer.stop();

		this._parsingPaused = true;
		this.dispatchEvent(new ParserEvent(ParserEvent.READY_FOR_DEPENDENCIES));
	}

	/**
	 * Tests whether or not there is still time left for parsing within the maximum allowed time frame per session.
	 * @return True if there is still time left, false if the maximum allotted time was exceeded and parsing should be interrupted.
	 */
	public _pHasTime():boolean
	{
		return ((getTimer() - this._lastFrameTime) < this._frameLimit);
	}

	/**
	 * Called when the parsing pause interval has passed and parsing can proceed.
	 */
	public _pOnInterval(event:TimerEvent = null)
	{
		this._lastFrameTime = getTimer();

		if (this._pProceedParsing() && !this._parsingFailure)
			this._pFinishParsing();
	}

	/**
	 * Initializes the parsing of data.
	 * @param frameLimit The maximum duration of a parsing session.
	 */
	public _pStartParsing(frameLimit:number)
	{
		this._frameLimit = frameLimit;
		this._timer = new Timer(this._frameLimit, 0);
		this._timer.addEventListener(TimerEvent.TIMER, this._pOnIntervalDelegate);
		this._timer.start();
	}

	/**
	 * Finish parsing the data.
	 */
	public _pFinishParsing()
	{
		if (this._timer) {
			this._timer.removeEventListener(TimerEvent.TIMER, this._pOnIntervalDelegate);
			this._timer.stop();
		}

		this._timer = null;
		this._parsingComplete = true;

		this.dispatchEvent(new ParserEvent(ParserEvent.PARSE_COMPLETE));
	}

	/**
	 *
	 * @returns {string}
	 * @private
	 */
	public _pGetTextData():string
	{
		return ParserUtils.toString(this._data);
	}

	/**
	 *
	 * @returns {string}
	 * @private
	 */
	public _pGetByteData():ByteArray
	{
		return ParserUtils.toByteArray(this._data);
	}
}

export = ParserBase;