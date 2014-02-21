///<reference path="../_definitions.ts"/>

/**
 * @module away.events
 */
module away.events
{
	//import flash.events.Event;

	export class RendererEvent extends Event
	{
		public static VIEWPORT_UPDATED:string = "viewportUpdated";
		public static SCISSOR_UPDATED:string = "scissorUpdated";

		constructor(type:string)//, bubbles:boolean = false, cancelable:boolean = false)
		{
			super(type);//, bubbles, cancelable);
		}
	}
}
