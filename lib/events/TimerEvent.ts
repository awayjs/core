import Event					= require("awayjs-core/lib/events/Event");

class TimerEvent extends Event
{

	public static TIMER:string = "timer";
	public static TIMER_COMPLETE:string = "timerComplete";

	constructor(type:string)
	{
		super(type);

	}
}

export = TimerEvent