import { URLLoader } from "../net/URLLoader";
import { EventBase } from "../events/EventBase";
export declare class URLLoaderEvent extends EventBase {
    static HTTP_STATUS: string;
    static LOAD_ERROR: string;
    static LOAD_PROGRESS: string;
    static LOAD_START: string;
    static LOAD_COMPLETE: string;
    private _urlLoader;
    constructor(type: string, urlLoader: URLLoader);
    /**
     *
     */
    readonly urlLoader: URLLoader;
    /**
     *
     */
    clone(): URLLoaderEvent;
}
