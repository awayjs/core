import { EventBase } from "../events/EventBase";
export declare class ParserEvent extends EventBase {
    private _message;
    /**
     * Dispatched when parsing of an asset completed.
     */
    static PARSE_COMPLETE: string;
    /**
     * Dispatched when an error occurs while parsing the data (e.g. because it's
     * incorrectly formatted.)
     */
    static PARSE_ERROR: string;
    /**
     * Dispatched when a parser is ready to have dependencies retrieved and resolved.
     * This is an internal event that should rarely (if ever) be listened for by
     * external classes.
     */
    static READY_FOR_DEPENDENCIES: string;
    constructor(type: string, message?: string);
    /**
     * Additional human-readable message. Usually supplied for ParserEvent.PARSE_ERROR events.
     */
    readonly message: string;
    clone(): ParserEvent;
}
