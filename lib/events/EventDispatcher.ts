import EventBase					= require("awayjs-core/lib/events/EventBase");

/**
 * Base class for dispatching events
*
* @class away.events.EventDispatcher
*
*/
class EventDispatcher
{
	private listeners:Array<Array<(event:EventBase) => void>> = new Array<Array<(event:EventBase) => void>>();
	private target:any;

	constructor(target:any = null)
	{
		this.target = target || this;
	}

	/**
	 * Add an event listener
	 * @method addEventListener
	 * @param {String} Name of event to add a listener for
	 * @param {Function} Callback function
	 */
	public addEventListener(type:string, listener:(event:EventBase) => void)
	{
		if (this.listeners[type] === undefined)
			this.listeners[type] = new Array<(event:EventBase) => void>();

		if (this.getEventListenerIndex(type, listener) === -1)
			this.listeners[type].push(listener);
	}

	/**
	 * Remove an event listener
	 * @method removeEventListener
	 * @param {String} Name of event to remove a listener for
	 * @param {Function} Callback function
	 */
	public removeEventListener(type:string, listener:(event:EventBase) => void)
	{
		var index:number = this.getEventListenerIndex(type, listener);

		if (index !== -1)
			this.listeners[type].splice(index, 1);
	}

	/**
	 * Dispatch an event
	 * @method dispatchEvent
	 * @param {Event} Event to dispatch
	 */
	public dispatchEvent(event:EventBase)
	{
		var listenerArray:Array<(event:EventBase) => void> = this.listeners[event.type];

		if (listenerArray !== undefined) {
			var l:number = listenerArray.length;

			event.target = this.target;

			for (var i:number = 0; i < l; i++)
				listenerArray[i](event);
		}
	}

	/**
	 * get Event Listener Index in array. Returns -1 if no listener is added
	 * @method getEventListenerIndex
	 * @param {String} Name of event to remove a listener for
	 * @param {Function} Callback function
	 */
	private getEventListenerIndex(type:string, listener:(event:EventBase) => void):number
	{
		if (this.listeners[type] !== undefined) {
			var a:Array<(event:EventBase) => void> = this.listeners[type];
			var l:number = a.length;

			for (var i:number = 0; i < l; i++)
				if (listener == a[i])
					return i;
		}

		return -1;
	}

	/**
	 * check if an object has an event listener assigned to it
	 * @method hasListener
	 * @param {String} Name of event to remove a listener for
	 * @param {Function} Callback function
	 */
	public hasEventListener(type:string, listener?:(event:EventBase) => void):boolean
	{
		if (listener != null) {
			return ( this.getEventListenerIndex(type, listener) !== -1 );
		} else {
			if (this.listeners[type] !== undefined)
				return ( this.listeners[type].length > 0 );

			return false;
		}

		return false;
	}
}

export = EventDispatcher;