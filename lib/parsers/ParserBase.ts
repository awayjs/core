import { IAsset } from '../library/IAsset';
import { URLRequest } from '../net/URLRequest';
import { AbstractMethodError } from '../errors/AbstractMethodError';
import { AssetEvent } from '../events/AssetEvent';
import { EventDispatcher } from '../events/EventDispatcher';
import { ParserEvent } from '../events/ParserEvent';
import { TimerEvent } from '../events/TimerEvent';
import { ParserUtils } from '../parsers/ParserUtils';
import { ResourceDependency } from '../parsers/ResourceDependency';
import { ByteArray } from '../utils/ByteArray';
import { getTimer } from '../utils/getTimer';
import { RequestAnimationFrame } from '../utils/RequestAnimationFrame';

/**
 * <code>ParserBase</code> provides an abstract base export class for objects
 * that convert blocks of data to data structures supported by away.
 *
 * If used by <code>Loader</code> to automatically determine the parser type,
 * two public static methods should be implemented, with the following
 * signatures:
 *
 * <code>public static supportsType(extension : string) : boolean</code>
 * Indicates whether or not a given file extension is supported by the parser.
 *
 * <code>public static supportsData(data : *) : boolean</code> Tests whether a
 * data block can be parsed by the parser.
 *
 * Furthermore, for any concrete subtype, the method <code>initHandle</code>
 * should be overridden to immediately create the object that will contain the
 * parsed data. This allows <code>ResourceManager</code> to return an object
 * handle regardless of whether the object was loaded or not.
 *
 * @see Loader
 */
export class ParserBase extends EventDispatcher {
	private _isParsing: boolean;
	private _dataFormat: string;
	private _data: any;
	private _frameLimit: number;
	private _onIntervalDelegate: (event: TimerEvent) => void;
	private static _lastFrameTime: number = 0;

	protected _content: IAsset;

	public fileName: string;

	public materialMode: number;

	//------------------------------------------------------------------------------------------------------------------
	// TODO: add error checking for the following ( could cause a problem if
	// this function is not implemented )
	//------------------------------------------------------------------------------------------------------------------
	// Needs to be implemented in all Parsers (<code>public static
	//supportsType(extension : string) : boolean</code>
	//* Indicates whether or not a given file extension is supported by the
	//  parser.
	//  ----------------------------------------------------------------------------------------------------------------

	public static supportsType(extension: string): boolean {
		throw new AbstractMethodError();
	}

	private _dependencies: Array<ResourceDependency>;
	private _parsingPaused: boolean;
	private _parsingComplete: boolean;
	private _parsingFailure: boolean;
	private _timer: RequestAnimationFrame;

	public get content(): IAsset {
		return this._content;
	}

	/**
	 * Creates a new ParserBase object
	 * @param format The data format of the file data to be parsed. Can be
	 * either <code>ParserDataFormat.BINARY</code> or
	 * <code>ParserDataFormat.PLAIN_TEXT</code>, and should be provided by the
	 * concrete subtype.
	 *
	 * @see away.loading.parsers.ParserDataFormat
	 */
	constructor(format: string) {
		super();

		this.materialMode = 0;
		this._dataFormat = format;
		this._dependencies = new Array<ResourceDependency>();

		this._onIntervalDelegate = (event: TimerEvent) => this._onInterval(event);

		this._timer = new RequestAnimationFrame(this._onIntervalDelegate, this);
	}

	public set parsingFailure(b: boolean) {
		this._parsingFailure = b;
	}

	public get parsingFailure(): boolean {
		return this._parsingFailure;
	}

	public get parsingPaused(): boolean {
		return this._parsingPaused;
	}

	public get parsingComplete(): boolean {
		return this._parsingComplete;
	}

	public get data(): any {
		return this._data;
	}

	/**
	 * The data format of the file data to be parsed. Options are
	 * <code>URLLoaderDataFormat.BINARY</code>,
	 * <code>URLLoaderDataFormat.ARRAY_BUFFER</code>,
	 * <code>URLLoaderDataFormat.BLOB</code>,
	 * <code>URLLoaderDataFormat.VARIABLES</code> or
	 * <code>URLLoaderDataFormat.TEXT</code>.
	 */
	public get dataFormat(): string {
		return this._dataFormat;
	}

	/**
	 * Parse data (possibly containing bytearry, plain text or BitmapAsset)
	 * asynchronously, meaning that the parser will periodically stop parsing so
	 * that the AVM may proceed to the next frame.
	 *
	 * @param data The untyped data object in which the loaded data resides.
	 * @param frameLimit number of milliseconds of parsing allowed per frame.
	 * The actual time spent on a frame can exceed this number since time-checks
	 * can only be performed between logical sections of the parsing procedure.
	 */
	public parseAsync(data: any, frameLimit: number = 30): void {
		this._data = data;
		this.startParsing(frameLimit);
	}

	// public parseSync(data: any): IAsset {
	// 	this._data = data;
	// 	let state = ParserBase.MORE_TO_PARSE;
	// 	while (state == ParserBase.MORE_TO_PARSE) {
	// 		state = this._pProceedParsing();
	// 	}
	// 	return this._pContent;
	// }

	/**
	 * A list of dependencies that need to be loaded and resolved for the object
	 * being parsed.
	 */
	public get dependencies(): Array<ResourceDependency> {
		return this._dependencies;
	}

	/**
	 * Resolve a dependency when it's loaded. For example, a dependency
	 * containing an ImageResource would be assigned to a Mesh instance as a
	 * BitmapMaterial, a scene graph object would be added to its intended
	 * parent. The dependency should be a member of the dependencies property.
	 *
	 * @param resourceDependency The dependency to be resolved.
	 */
	public resolveDependency(resourceDependency: ResourceDependency): void {
		throw new AbstractMethodError();
	}

	/**
	 * Resolve a dependency loading failure. Used by parser to eventually
	 * provide a default map
	 *
	 * @param resourceDependency The dependency to be resolved.
	 */
	public resolveDependencyFailure(resourceDependency: ResourceDependency): void {
		throw new AbstractMethodError();
	}

	/**
	 * Resolve a dependency name
	 *
	 * @param resourceDependency The dependency to be resolved.
	 */
	public resolveDependencyName(resourceDependency: ResourceDependency, asset: IAsset): string {
		return asset.name;
	}

	public resumeParsing(): void {
		this._parsingPaused = false;

		//get started!
		if (this.hasTime())
			this.proceedParsing();
	}

	protected finalizeAsset(asset: IAsset, name: string = null): void {
		// If the asset has no name, give it a per-type default name.
		asset.name = name || asset.name || asset.assetType;

		this.dispatchEvent(new AssetEvent(AssetEvent.ASSET_COMPLETE, asset));
	}

	/**
	 * Parse the next block of data.
	 * @return Whether or not more data needs to be parsed. Can be
	 * <code>ParserBase.ParserBase.PARSING_DONE</code> or
	 * <code>ParserBase.ParserBase.MORE_TO_PARSE</code>.
	 */
	protected proceedParsing(): void {
		throw new AbstractMethodError();
	}

	protected dieWithError(message: string = 'Unknown parsing error'): void {
		this._parsingFailure = true;

		this.dispatchEvent(new ParserEvent(ParserEvent.PARSE_ERROR, message));
	}

	protected addDependency(id: string,
		req: URLRequest,
		parser: ParserBase = null,
		data: any = null,
		retrieveAsRawData: boolean = false,
		suppressErrorEvents: boolean = false,
		sub_id: number = 0): ResourceDependency {
		const dependency: ResourceDependency = new ResourceDependency(
			id,
			req,
			data,
			parser,
			this,
			retrieveAsRawData,
			suppressErrorEvents,
			sub_id
		);
		this._dependencies.push(dependency);

		return dependency;
	}

	protected pauseAndRetrieveDependencies(): void {
		this._parsingPaused = true;

		this.dispatchEvent(new ParserEvent(ParserEvent.READY_FOR_DEPENDENCIES));
	}

	/**
	 * Tests whether or not there is still time left for parsing within the
	 * maximum allowed time frame per session.
	 * @return True if there is still time left, false if the maximum allotted
	 * time was exceeded and parsing should be interrupted.
	 */
	protected hasTime(): boolean {
		this._isParsing = ((getTimer() - ParserBase._lastFrameTime) < this._frameLimit);

		//If parsing has stopped due to framelimit, start RAF and wait for next animation frame
		if (!this._isParsing)
			this._timer.start();

		return this._isParsing;
	}

	/**
	 * Called when the parsing pause interval has passed and parsing can
	 * proceed.
	 */
	private _onInterval(event: TimerEvent = null): void {
		ParserBase._lastFrameTime = getTimer();
		this._isParsing = true;

		//stop RAF to continue parsing
		this._timer.stop();

		this.proceedParsing();
	}

	/**#
	 * Initializes the parsing of data.
	 * @param frameLimit The maximum duration of a parsing session.
	 */
	protected startParsing(frameLimit: number): void {
		this._frameLimit = frameLimit;

		//get started!
		if (this.hasTime())
			this.proceedParsing();
	}

	/**
	 * Finish parsing the data.
	 */
	protected finishParsing(): void {
		if (this._parsingFailure)
			return;

		this._parsingComplete = true;
		this._isParsing = false;

		this.dispatchEvent(new ParserEvent(ParserEvent.PARSE_COMPLETE));
	}

	/**
	 *
	 * @returns {string}
	 * @private
	 */
	protected getTextData(): string {
		return ParserUtils.toString(this._data);
	}

	/**
	 *
	 * @returns {ByteArray}
	 * @private
	 */
	protected getByteData(): ByteArray {
		return ParserUtils.toByteArray(this._data);
	}

	/**
	 *
	 * @returns {any}
	 * @private
	 */
	protected getData(): any {
		return this._data;
	}
}