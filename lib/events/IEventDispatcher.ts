import { EventBase } from './EventBase';

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
	 * @param {String} type of event to add a listener for
	 * @param {Function} listener function
	 */
	addEventListener(type: string, listener: (event: EventBase) => void);

	/**
	 * Remove an event listener
	 * @method removeEventListener
	 * @param {String} type of event to remove a listener for
	 * @param {Function} listener function
	 */
	removeEventListener(type: string, listener: (event: EventBase) => void);

	/**
	 * Dispatch an event
	 * @method dispatchEvent
	 * @param {Event} event to dispatch
	 */
	dispatchEvent(event: EventBase, target?: any);

	/**
	 * check if an object has an event listener assigned to it
	 * @method hasListener
	 * @param {String} type of event to remove a listener for
	 * @param {Function} listener function
	 */
	hasEventListener(type: string, listener?: (event: EventBase) => void): boolean;
}