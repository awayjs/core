import { URLRequest } from "../net/URLRequest";
import { EventDispatcher } from "../events/EventDispatcher";
/**
 * The URLLoader is used to load a single file, as part of a resource.
 *
 * While URLLoader can be used directly, e.g. to create a third-party asset
 * management system, it's recommended to use any of the classes Loader3D, Loader
 * and AssetLibrary instead in most cases.
 *
 * @see Loader
 * @see away.library.AssetLibrary
 */
export declare class URLLoader extends EventDispatcher {
    private _XHR;
    private _status;
    private _bytesLoaded;
    private _bytesTotal;
    private _dataFormat;
    private _loadError;
    private _request;
    private _data;
    private _loadStartEvent;
    private _loadErrorEvent;
    private _loadCompleteEvent;
    private _progressEvent;
    private _statusEvent;
    /**
     * Creates a new URLLoader object.
     */
    constructor();
    /**
     *
     */
    readonly url: string;
    /**
     *
     */
    readonly data: any;
    /**
     *
     * URLLoaderDataFormat.BINARY
     * URLLoaderDataFormat.TEXT
     * URLLoaderDataFormat.VARIABLES
     *
     * @param format
     */
    dataFormat: string;
    /**
     *
     * @returns {number}
     */
    readonly bytesLoaded: number;
    /**
     *
     * @returns {number}
     */
    readonly bytesTotal: number;
    /**
     * Load a resource from a file.
     *
     * @param request The URLRequest object containing the URL of the object to be loaded.
     */
    load(request: URLRequest): void;
    isSupported(): boolean;
    /**
     *
     */
    close(): void;
    /**
     *
     */
    dispose(): void;
    /**
     *
     * @param xhr
     * @param responseType
     */
    private setResponseType(xhr, responseType);
    /**
     *
     * @param request {URLRequest}
     */
    private getRequest(request);
    /**
     *
     * @param request {URLRequest}
     */
    private postRequest(request);
    /**
     *
     * @param error {XMLHttpRequestException}
     */
    private handleXmlHttpRequestException(error);
    /**
     *
     */
    private initXHR();
    /**
     *
     */
    private disposeXHR();
    /**
     *
     * @param source
     */
    decodeURLVariables(source: string): Object;
    /**
     * When XHR state changes
     * @param event
     */
    private onReadyStateChange(event);
    /**
     * When the request has completed, regardless of whether or not it was successful.
     * @param event
     */
    private onLoadEnd(event);
    /**
     * When the author specified timeout has passed before the request could complete.
     * @param event
     */
    private onTimeOut(event);
    /**
     * When the request has been aborted, either by invoking the abort() method or navigating away from the page.
     * @param event
     */
    private onAbort(event);
    /**
     * While loading and sending data.
     * @param event
     */
    private onProgress(event);
    /**
     * When the request starts.
     * @param event
     */
    private onLoadStart(event);
    /**
     * When the request has successfully completed.
     * @param event
     */
    private onLoadComplete(event);
    /**
     * When the request has failed. ( due to network issues ).
     * @param event
     */
    private onLoadError(event);
}
