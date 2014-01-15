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

		private listeners:Object[] = new Array<Object>();
		private lFncLength:number;

		/**
		 * Add an event listener
		 * @method addEventListener
		 * @param {String} Name of event to add a listener for
		 * @param {Function} Callback function
		 */
		public addEventListener(type:string, listener:Function)
		{

			if (this.listeners[ type ] === undefined) {

				this.listeners[ type ] = new Array<EventData>();

			}

			if (this.getEventListenerIndex(type, listener) === -1) {

				var d:EventData = new EventData();
				d.listener = listener;
				d.type = type;

				this.listeners[ type ].push(d);

			}

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

			if (index !== -1) {

				this.listeners[ type ].splice(index, 1);

			}

		}

		/**
		 * Dispatch an event
		 * @method dispatchEvent
		 * @param {Event} Event to dispatch
		 */
		public dispatchEvent(event:Event)
		{

			var listenerArray:Array<EventData> = this.listeners[ event.type ];

			if (listenerArray !== undefined) {

				this.lFncLength = listenerArray.length;
				event.target = this;

				var eventData:EventData;

				for (var i = 0, l = this.lFncLength; i < l; i++) {

					eventData = listenerArray[i];
					eventData["listener"](event);

				}
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

				var a:Array<EventData> = this.listeners[ type ];
				var l:number = a.length;
				var d:EventData;

				for (var c:number = 0; c < l; c++) {

					d = a[c];

					if (listener == d.listener) {

						return c;

					}

				}


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

				if (this.listeners[ type ] !== undefined) {

					var a:Array<EventData> = this.listeners[ type ];
					return ( a.length > 0 );

				}

				return false;


			}

			return false;

		}


	}
	/**
	 * Event listener data container
	 */
	class EventData
	{

		public listener:Function;
		public type:string;

	}

}