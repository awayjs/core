import { IAsset } from "../library/IAsset";
import { EventBase } from "../events/EventBase";
export declare class LoaderEvent extends EventBase {
    /**
     * Dispatched when the loading of a session and all of its dependencies is complete.
     */
    static LOAD_COMPLETE: string;
    private _url;
    private _content;
    private _assets;
    /**
     * Create a new LoaderEvent object.
     *
     * @param type The event type.
     * @param url The url of the loaded resource.
     * @param assets The assets of the loaded resource.
     */
    constructor(type: string, url?: string, content?: IAsset, assets?: Array<IAsset>);
    /**
     * The content returned if the resource has been loaded inside a <code>Loader</code> object.
     */
    readonly content: IAsset;
    /**
     * The url of the loaded resource.
     */
    readonly url: string;
    /**
     * The error string on loadError.
     */
    readonly assets: IAsset[];
    /**
     * Clones the current event.
     * @return An exact duplicate of the current event.
     */
    clone(): LoaderEvent;
}
