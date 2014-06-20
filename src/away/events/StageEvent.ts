///<reference path="../_definitions.ts"/>

/**
 * @module away.events
 */
module away.events
{
	export class StageEvent extends away.events.Event
	{
		public static CONTEXT_CREATED:string = "contextCreated";
		public static CONTEXT_DISPOSED:string = "contextDisposed";
		public static CONTEXT_RECREATED:string = "contextRecreated";
		public static VIEWPORT_UPDATED:string = "viewportUpdated";

		constructor(type:string)
		{
			super(type);
		}
	}
}
