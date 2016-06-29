import { EventBase } from "../events/EventBase";
/**
 * Base export class for dispatching events
*
* @export class away.events.EventDispatcher
*
*/
export declare class EventDispatcher {
    private listenerObjects;
    private target;
    constructor(target?: any);
    /**
     * Add an event listener
     * @method addEventListener
     * @param {String} Name of event to add a listener for
     * @param {Function} Callback function
     */
    addEventListener(type: string, listener: (event: EventBase) => void): void;
    /**
     * Remove an event listener
     * @method removeEventListener
     * @param {String} Name of event to remove a listener for
     * @param {Function} Callback function
     */
    removeEventListener(type: string, listener: (event: EventBase) => void): void;
    /**
     * Dispatch an event
     * @method dispatchEvent
     * @param {Event} Event to dispatch
     */
    dispatchEvent(event: EventBase): void;
    /**
     * check if an object has an event listener assigned to it
     * @method hasListener
     * @param {String} Name of event to remove a listener for
     * @param {Function} Callback function
     */
    hasEventListener(type: string, listener?: (event: EventBase) => void): boolean;
}
export declare class ListenerObject {
    index: number;
    listeners: Array<(event: EventBase) => void>;
    numListeners: number;
    addEventListener(listener: (event: EventBase) => void): void;
    removeEventListener(listener: (event: EventBase) => void): void;
    dispatchEvent(event: EventBase): void;
    /**
     * get Event Listener Index in array. Returns -1 if no listener is added
     * @method getEventListenerIndex
     * @param {String} Name of event to remove a listener for
     * @param {Function} Callback function
     */
    getEventListenerIndex(listener: (event: EventBase) => void): number;
}
export default EventDispatcher;
