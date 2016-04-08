import TimerEvent				from "awayjs-core/lib/events/TimerEvent";
import getTimer					from "awayjs-core/lib/utils/getTimer";
import Timer					from "awayjs-core/lib/utils/Timer";

/**
 * 
 */
class TimerTest
{
	private oneSecondTimer:Timer;
	private repeatTenTimes:Timer;

	constructor()
	{
		this.oneSecondTimer = new Timer(1000);
		this.oneSecondTimer.addEventListener(TimerEvent.TIMER, (event:TimerEvent) => this.onSecTimerEvent(event));
		this.oneSecondTimer.start();

		this.repeatTenTimes = new Timer(100, 10);
		this.repeatTenTimes.addEventListener(TimerEvent.TIMER, (event:TimerEvent) => this.repeatTenTimesEvent(event));
		this.repeatTenTimes.addEventListener(TimerEvent.TIMER_COMPLETE, (event:TimerEvent) => this.repeatTenTimesComplete(event));
		this.repeatTenTimes.start();
	}

	private repeatTenTimesEvent(event:TimerEvent):void
	{
		var t:Timer = <Timer> event.target;
		console.log('repeatTenTimesEvent', t.currentCount);
	}

	private repeatTenTimesComplete(event:TimerEvent):void
	{
		var t:Timer = <Timer> event.target;
		console.log('repeatTenTimesComplete', t.currentCount);
	}

	private onSecTimerEvent(event:TimerEvent):void
	{
		console.log('onSecTimerEvent, tick');
		console.log('getTimer() : ', getTimer());
	}
}