import {EventBase}				from "../events/EventBase";

/**
 * Base interface for dispatching events
 *
 * @interface away.events.IEventDispatcher
 *
 */
export interface IEventDispatcher
{
	/**
	 * Add an event listener
	 * @method addEventListener
	 * @param {String} Name of event to add a listener for
	 * @param {Function} Callback function
	 */
	addEventListener(type:string, listener:(event:EventBase) => void);

	/**
	 * Remove an event listener
	 * @method removeEventListener
	 * @param {String} Name of event to remove a listener for
	 * @param {Function} Callback function
	 */
	removeEventListener(type:string, listener:(event:EventBase) => void);

	/**
	 * Dispatch an event
	 * @method dispatchEvent
	 * @param {Event} Event to dispatch
	 */
	dispatchEvent(event:EventBase);

	/**
	 * check if an object has an event listener assigned to it
	 * @method hasListener
	 * @param {String} Name of event to remove a listener for
	 * @param {Function} Callback function
	 * @param {Object} Target object listener is added to
	 */
	hasEventListener(type:string, listener?:(event:EventBase) => void) : boolean;
}