import EventBase				= require("awayjs-core/lib/events/EventBase");

class TimerEvent extends EventBase
{
	/**
	 *
	 */
	public static TIMER:string = "timer";

	/**
	 *
	 */
	public static TIMER_COMPLETE:string = "timerComplete";

	constructor(type:string)
	{
		super(type);

	}
}

export = TimerEvent