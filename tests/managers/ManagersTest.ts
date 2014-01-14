///<reference path="../../build/AME.next.d.ts" />

module tests.managers
{

    export class ManagersTest
    {

        private stage       : away.display.Stage;
        private sProxy      : away.managers.StageGLProxy;

        private rttBfrA     : away.managers.RTTBufferManager;
        private rttBfrB     : away.managers.RTTBufferManager;

        constructor()
        {

            away.Debug.THROW_ERRORS = false;

            this.stage = new away.display.Stage();

            var manager : away.managers.StageGLManager = away.managers.StageGLManager.getInstance( this.stage );

            this.sProxy = manager.getStageGLProxy( 0 );
            this.sProxy.addEventListener( away.events.StageGLEvent.CONTEXT3D_CREATED , this.onContextCreated , this );
            this.sProxy.addEventListener( away.events.StageGLEvent.CONTEXT3D_RECREATED, this.onContextReCreated , this );
            this.sProxy.addEventListener( away.events.StageGLEvent.CONTEXT3D_DISPOSED, this.onContextDisposed , this );

            this.rttBfrA = away.managers.RTTBufferManager.getInstance( this.sProxy )
            this.rttBfrB = away.managers.RTTBufferManager.getInstance( this.sProxy )

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