///<reference path="../_definitions.ts"/>
/**
 * @module away.events
 */
module away.events
{
	export class MaterialEvent extends Event
	{
		public static SIZE_CHANGED:string = "sizeChanged";

		constructor(type:string)
		{
			super(type);
		}
	}
}