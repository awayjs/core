///<reference path="../_definitions.ts"/>

/**
 * @module away.events
 */
module away.events
{
	export class IOErrorEvent extends away.events.Event
	{

		public static IO_ERROR:string = "ioError";

		constructor(type:string)
		{
			super(type);

		}
	}
}