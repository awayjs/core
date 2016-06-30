import {EventBase}					from "../events/EventBase";

/**
 * Base export class for dispatching events
*
* @export class away.events.EventDispatcher
*
*/
export class EventDispatcher
{
	private listenerObjects:Array<ListenerObject> = new Array<ListenerObject>();
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
	public addEventListener(type:string, listener:(event:EventBase) => void):void
	{
		var l:ListenerObject = this.listenerObjects[type];

		if (l === undefined)
			l = this.listenerObjects[type] = new ListenerObject();

		l.addEventListener(listener);
	}

	/**
	 * Remove an event listener
	 * @method removeEventListener
	 * @param {String} Name of event to remove a listener for
	 * @param {Function} Callback function
	 */
	public removeEventListener(type:string, listener:(event:EventBase) => void):void
	{
		var l:ListenerObject = this.listenerObjects[type];

		if (l) {
			l.removeEventListener(listener);

			if (l.numListeners == 0)
				delete this.listenerObjects[type];
		}
	}

	/**
	 * Dispatch an event
	 * @method dispatchEvent
	 * @param {Event} Event to dispatch
	 */
	public dispatchEvent(event:EventBase):void
	{
		var l:ListenerObject = this.listenerObjects[event.type];

		if (l) {
			event.target = this.target;
			l.dispatchEvent(event);
		}
	}

	/**
	 * check if an object has an event listener assigned to it
	 * @method hasListener
	 * @param {String} Name of event to remove a listener for
	 * @param {Function} Callback function
	 */
	public hasEventListener(type:string, listener?:(event:EventBase) => void):boolean
	{
		if (this.listenerObjects[type] === undefined)
			return false;

		if (listener != null)
			return this.listenerObjects[type].getEventListenerIndex(listener) !== -1;

		return this.listenerObjects[type].numListeners > 0;
	}
}

export class ListenerObject
{
	public index:number = 0;

	public listeners:Array<(event:EventBase) => void> = new Array<(event:EventBase) => void>();

	public numListeners:number = 0;

	public addEventListener(listener:(event:EventBase) => void):void
	{
		//check if listener already added
		if (this.getEventListenerIndex(listener) !== -1)
			return;

		this.listeners.push(listener);
		this.numListeners++;
	}

	public removeEventListener(listener:(event:EventBase) => void):void
	{
		//check if listener exists
		var index:number = this.getEventListenerIndex(listener);

		if (index === -1)
			return;

		this.listeners.splice(index, 1);
		if (index <= this.index)
			this.index--;

		this.numListeners--;
	}

	public dispatchEvent(event:EventBase):void
	{
		var len:number = this.numListeners;
		for (this.index = 0; this.index < len && this.index < this.numListeners; this.index++)
			this.listeners[this.index](event);
	}

	/**
	 * get Event Listener Index in array. Returns -1 if no listener is added
	 * @method getEventListenerIndex
	 * @param {String} Name of event to remove a listener for
	 * @param {Function} Callback function
	 */
	public getEventListenerIndex(listener:(event:EventBase) => void):number
	{
		for (var index:number = 0; index < this.numListeners; index++)
			if (listener == this.listeners[index])
				return index;

		return -1;
	}
}
export default EventDispatcher;