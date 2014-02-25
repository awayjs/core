///<reference path="../../build/awayjs.next.d.ts" />

module tests.utils
{

	import Delegate				= away.utils.Delegate;

    export class TimerTest
    {

        private oneSecondTimer  : away.utils.Timer;
        private repeatTenTimes  : away.utils.Timer;

        constructor()
        {

            this.oneSecondTimer = new away.utils.Timer( 1000 );
            this.oneSecondTimer.addEventListener(away.events.TimerEvent.TIMER , Delegate.create(this, this.onSecTimerEvent) );
            this.oneSecondTimer.start();

            this.repeatTenTimes = new away.utils.Timer( 100 , 10 );
            this.repeatTenTimes.addEventListener(away.events.TimerEvent.TIMER , Delegate.create(this, this.repeatTenTimesEvent) );
            this.repeatTenTimes.addEventListener(away.events.TimerEvent.TIMER_COMPLETE, Delegate.create(this, this.repeatTenTimesComplete) );
            this.repeatTenTimes.start();

        }

        private repeatTenTimesEvent( e : away.events.TimerEvent ) : void
        {


            var t : away.utils.Timer = <away.utils.Timer> e.target;
            console.log('repeatTenTimesEvent' , t.currentCount );

        }

        private repeatTenTimesComplete( e : away.events.TimerEvent ) : void
        {

            var t : away.utils.Timer = <away.utils.Timer> e.target;
            console.log('repeatTenTimesComplete' , t.currentCount );

        }

        private onSecTimerEvent( e : away.events.TimerEvent ) : void
        {

            console.log('onSecTimerEvent, tick');
            console.log( 'getTimer() : ' , away.utils.getTimer() );

        }

    }

}