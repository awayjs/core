///<reference path="../_definitions.ts"/>
module away.base
{

	export class Stage extends away.events.EventDispatcher
	{

		constructor(width:number = 640, height:number = 480)
		{
			super();
		}
	}
}