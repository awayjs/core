///<reference path="../_definitions.ts"/>

/**
 * @module away.events
 */
module away.events
{
	//import flash.events.Event;

	export class StageGLEvent extends Event
	{
		public static CONTEXTGL_CREATED:string = "contextGLCreated";
		public static CONTEXTGL_DISPOSED:string = "contextGLDisposed";
		public static CONTEXTGL_RECREATED:string = "contextGLRecreated";
		public static VIEWPORT_UPDATED:string = "viewportUpdated";

		constructor(type:string)//, bubbles:boolean = false, cancelable:boolean = false)
		{
			super(type);//, bubbles, cancelable);
		}
	}
}
