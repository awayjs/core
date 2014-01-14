///<reference path="../_definitions.ts"/>

/**
 * @module away.events
 */
module away.events
{
	//import flash.events.Event;

	export class StageGLEvent extends Event
	{
		public static CONTEXTGL_CREATED:string = "ContextGLCreated";
		public static CONTEXTGL_DISPOSED:string = "ContextGLDisposed";
		public static CONTEXTGL_RECREATED:string = "ContextGLRecreated";
		public static VIEWPORT_UPDATED:string = "ViewportUpdated";

		constructor(type:string)//, bubbles:boolean = false, cancelable:boolean = false)
		{
			super(type);//, bubbles, cancelable);
		}
	}
}
