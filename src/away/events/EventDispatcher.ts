///<reference path="../_definitions.ts"/>

/**
 * @module away.events
 */
module away.events
{

	/**
	 * Base class for dispatching events
	 *
	 * @class away.events.EventDispatcher
	 *
	 */
	export class EventDispatcher
	{
		private listeners:Array<Array<Function>> = new Array<Array<Function>>();

		/**
		 * Add an event listener
		 * @method addEventListener
		 * @param {String} Name of event to add a listener for
		 * @param {Function} Callback function
		 */
		public addEventListener(type:string, listener:Function)
		{
			if (this.listeners[ type ] === undefined)
				this.listeners[ type ] = new Array<Function>();

			if (this.getEventListenerIndex(type, listener) === -1)
				this.listeners[ type ].push(listener);
		}

		/**
		 * Remove an event listener
		 * @method removeEventListener
		 * @param {String} Name of event to remove a listener for
		 * @param {Function} Callback function
		 */
		public removeEventListener(type:string, listener:Function)
		{
			var index:number = this.getEventListenerIndex(type, listener);

			if (index !== -1)
				this.listeners[ type ].splice(index, 1);
		}

		/**
		 * Dispatch an event
		 * @method dispatchEvent
		 * @param {Event} Event to dispatch
		 */
		public dispatchEvent(event:Event)
		{
			var listenerArray:Array<Function> = this.listeners[ event.type ];

			if (listenerArray !== undefined) {
				var l:number = listenerArray.length;

				event.target = this;

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
		private getEventListenerIndex(type:string, listener:Function):number
		{
			if (this.listeners[ type ] !== undefined) {
				var a:Array<Function> = this.listeners[ type ];
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
		public hasEventListener(type:string, listener?:Function):boolean
		{
			if (this.listeners != null) {
				return ( this.getEventListenerIndex(type, listener) !== -1 );
			} else {
				if (this.listeners[ type ] !== undefined)
					return ( this.listeners[ type ].length > 0 );

				return false;
			}

			return false;
		}
	}
}