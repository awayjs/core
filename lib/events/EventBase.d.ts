export declare class EventBase {
    /**
     * Type of event
     * @property type
     * @type String
     */
    type: string;
    /**
     * Reference to target object
     * @property target
     * @type Object
     */
    target: any;
    constructor(type: string);
    /**
     * Clones the current event.
     * @return An exact duplicate of the current event.
     */
    clone(): EventBase;
}
