import {EventBase} from "./EventBase";

export class TimerEvent extends EventBase
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