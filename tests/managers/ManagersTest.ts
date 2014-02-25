///<reference path="../../build/awayjs.next.d.ts" />

module tests.managers
{
	import Delegate				= away.utils.Delegate;

    export class ManagersTest
    {
        private stageGL      : away.base.StageGL;

        private rttBfrA     : away.managers.RTTBufferManager;
        private rttBfrB     : away.managers.RTTBufferManager;

        constructor()
        {

            away.Debug.THROW_ERRORS = false;

            var manager : away.managers.StageGLManager = away.managers.StageGLManager.getInstance();

            this.stageGL = manager.getStageGLAt( 0 );
            this.stageGL.addEventListener( away.events.StageGLEvent.CONTEXTGL_CREATED , Delegate.create(this, this.onContextCreated) );
            this.stageGL.addEventListener( away.events.StageGLEvent.CONTEXTGL_RECREATED, Delegate.create(this, this.onContextReCreated) );
            this.stageGL.addEventListener( away.events.StageGLEvent.CONTEXTGL_DISPOSED, Delegate.create(this, this.onContextDisposed) );

            this.rttBfrA = away.managers.RTTBufferManager.getInstance( this.stageGL )
            this.rttBfrB = away.managers.RTTBufferManager.getInstance( this.stageGL )

            console.log( 'this.rttBfrA' , this.rttBfrA );
            console.log( 'this.rttBfrB' , this.rttBfrB );

            this.rttBfrB.dispose();

            console.log( 'this.rttBfrA' , this.rttBfrA );
            console.log( 'this.rttBfrB' , this.rttBfrB );

        }

        public onContextCreated( e : away.events.StageGLEvent ) : void
        {

            away.Debug.log( 'onContextCreated' , e );

        }

        public onContextReCreated( e : away.events.StageGLEvent ) : void
        {

            away.Debug.log( 'onContextReCreated' , e );

        }

        public onContextDisposed( e : away.events.StageGLEvent ) : void
        {

            away.Debug.log( 'onContextDisposed' , e );

        }

    }
}