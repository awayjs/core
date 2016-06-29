export declare class URLRequest {
    /**
     * Object containing data to be transmited with URL Request ( URL Variables / binary / string )
     *
     */
    data: any;
    /**
     *
     * away.net.URLRequestMethod.GET
     * away.net.URLRequestMethod.POST
     *
     * @type {string}
     */
    method: string;
    /**
     * Use asynchronous XMLHttpRequest
     * @type {boolean}
     */
    async: boolean;
    /**
     *
     */
    private _url;
    /**

     * @param url
     */
    constructor(url?: string);
    /**
     *
     * @returns {string}
     */
    /**
     *
     * @param value
     */
    url: string;
    /**
     * dispose
     */
    dispose(): void;
}
