export declare class ErrorBase {
    private _errorID;
    private _messsage;
    private _name;
    constructor(message?: string, id?: number, _name?: string);
    /**
     *
     * @returns {string}
     */
    /**
     *
     * @param value
     */
    message: string;
    /**
     *
     * @returns {string}
     */
    /**
     *
     * @param value
     */
    name: string;
    /**
     *
     * @returns {number}
     */
    readonly errorID: number;
}
