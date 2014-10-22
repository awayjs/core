import EventDispatcher			= require("away/events/EventDispatcher");
import Debug					= require("away/utils/Debug");

Debug.THROW_ERRORS = false;
Debug.LOG_PI_ERRORS = false;

class AwayJSCore extends EventDispatcher
{
	constructor()
	{
		super();
	}
}

export = AwayJSCore;