import { BitmapImage2D } from "../image/BitmapImage2D";
import { IAsset } from "../library/IAsset";
import { URLRequest } from "../net/URLRequest";
import { EventDispatcher } from "../events/EventDispatcher";
import { TimerEvent } from "../events/TimerEvent";
import { ResourceDependency } from "../parsers/ResourceDependency";
import { ByteArray } from "../utils/ByteArray";
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
export declare class ParserBase extends EventDispatcher {
    _isParsing: boolean;
    _iFileName: string;
    private _dataFormat;
    private _data;
    private _frameLimit;
    private _lastFrameTime;
    private _pOnIntervalDelegate;
    _pContent: IAsset;
    static supportsType(extension: string): boolean;
    private _dependencies;
    private _parsingPaused;
    private _parsingComplete;
    private _parsingFailure;
    private _timer;
    private _materialMode;
    /**
     * Returned by <code>proceedParsing</code> to indicate no more parsing is needed.
     */
    static PARSING_DONE: boolean;
    /**
     * Returned by <code>proceedParsing</code> to indicate more parsing is needed, allowing asynchronous parsing.
     */
    static MORE_TO_PARSE: boolean;
    readonly content: IAsset;
    /**
     * Creates a new ParserBase object
     * @param format The data format of the file data to be parsed. Can be either <code>ParserDataFormat.BINARY</code> or <code>ParserDataFormat.PLAIN_TEXT</code>, and should be provided by the concrete subtype.
     *
     * @see away.loading.parsers.ParserDataFormat
     */
    constructor(format: string);
    /**
     * Validates a bitmapData loaded before assigning to a default BitmapMaterial
     */
    isBitmapImage2DValid(bitmapImage2D: BitmapImage2D): boolean;
    parsingFailure: boolean;
    readonly parsingPaused: boolean;
    readonly parsingComplete: boolean;
    materialMode: number;
    readonly data: any;
    /**
     * The data format of the file data to be parsed. Options are <code>URLLoaderDataFormat.BINARY</code>, <code>URLLoaderDataFormat.ARRAY_BUFFER</code>, <code>URLLoaderDataFormat.BLOB</code>, <code>URLLoaderDataFormat.VARIABLES</code> or <code>URLLoaderDataFormat.TEXT</code>.
     */
    readonly dataFormat: string;
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
    parseAsync(data: any, frameLimit?: number): void;
    /**
     * A list of dependencies that need to be loaded and resolved for the object being parsed.
     */
    readonly dependencies: Array<ResourceDependency>;
    /**
     * Resolve a dependency when it's loaded. For example, a dependency containing an ImageResource would be assigned
     * to a Mesh instance as a BitmapMaterial, a scene graph object would be added to its intended parent. The
     * dependency should be a member of the dependencies property.
     *
     * @param resourceDependency The dependency to be resolved.
     */
    _iResolveDependency(resourceDependency: ResourceDependency): void;
    /**
     * Resolve a dependency loading failure. Used by parser to eventually provide a default map
     *
     * @param resourceDependency The dependency to be resolved.
     */
    _iResolveDependencyFailure(resourceDependency: ResourceDependency): void;
    /**
     * Resolve a dependency name
     *
     * @param resourceDependency The dependency to be resolved.
     */
    _iResolveDependencyName(resourceDependency: ResourceDependency, asset: IAsset): string;
    _iResumeParsing(): void;
    _pFinalizeAsset(asset: IAsset, name?: string): void;
    /**
     * Parse the next block of data.
     * @return Whether or not more data needs to be parsed. Can be <code>ParserBase.ParserBase.PARSING_DONE</code> or
     * <code>ParserBase.ParserBase.MORE_TO_PARSE</code>.
     */
    _pProceedParsing(): boolean;
    _pDieWithError(message?: string): void;
    _pAddDependency(id: string, req: URLRequest, retrieveAsRawData?: boolean, data?: any, suppressErrorEvents?: boolean, sub_id?: number): ResourceDependency;
    _pPauseAndRetrieveDependencies(): void;
    _pPauseParsing(): void;
    /**
     * Tests whether or not there is still time left for parsing within the maximum allowed time frame per session.
     * @return True if there is still time left, false if the maximum allotted time was exceeded and parsing should be interrupted.
     */
    _pHasTime(): boolean;
    /**
     * Called when the parsing pause interval has passed and parsing can proceed.
     */
    _pOnInterval(event?: TimerEvent): void;
    /**
     * Initializes the parsing of data.
     * @param frameLimit The maximum duration of a parsing session.
     */
    _pStartParsing(frameLimit: number): void;
    /**
     * Finish parsing the data.
     */
    _pFinishParsing(): void;
    /**
     *
     * @returns {string}
     * @private
     */
    _pGetTextData(): string;
    /**
     *
     * @returns {ByteArray}
     * @private
     */
    _pGetByteData(): ByteArray;
    /**
     *
     * @returns {any}
     * @private
     */
    _pGetData(): any;
}
