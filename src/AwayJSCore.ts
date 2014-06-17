///<reference path="away/_definitions.ts"/>

away.Debug.THROW_ERRORS = false;
away.Debug.LOG_PI_ERRORS = false;

module away
{
	export class AwayJSCore extends away.events.EventDispatcher
	{
		constructor()
		{
			super();
		}
	}
}