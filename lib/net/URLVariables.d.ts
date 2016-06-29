export declare class URLVariables {
    private _variables;
    /**
     *
     * @param source
     */
    constructor(source?: string);
    /**
     *
     * @param source
     */
    decode(source: string): void;
    /**
     *
     * @returns {string}
     */
    toString(): string;
    /**
     *
     * @returns {Object}
     */
    /**
     *
     * @returns {Object}
     */
    variables: Object;
    /**
     *
     * @returns {Object}
     */
    readonly formData: FormData;
}
