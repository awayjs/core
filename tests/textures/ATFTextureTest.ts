///<reference path="../../build/AME.next.d.ts" />

module tests.textures
{
	import Delegate				= away.utils.Delegate;

    export class ATFTextureTest
    {

        private mipLoader       : away.net.URLLoader;
        private target          : away.textures.ATFTexture;
        private texture         : away.gl.Texture;

        constructor()
        {

            //---------------------------------------
            // Load a PNG

            var mipUrlRequest = new away.net.URLRequest( 'assets/fire.atf');
            this.mipLoader  = new away.net.URLLoader();
            this.mipLoader.load( mipUrlRequest );
            this.mipLoader.addEventListener( away.events.Event.COMPLETE , Delegate.create(this, this.mipImgLoaded) );

        }

        private mipImgLoaded( e )
        {

            var stage       : away.base.Stage        = new away.base.Stage();
            var stage3D     : away.base.StageGL      = stage.getStageGLAt( 0 );
            var context3D   : away.gl.ContextGL  = new away.gl.ContextGL( stage3D.canvas );
            var loader      : away.net.URLLoader        = <away.net.URLLoader > e.target;

            console.log( 'away.events.Event.COMPLETE' , loader );

            this.target     = new away.textures.ATFTexture( loader.data );

            console.log( 'away.textures.ATFTexture - Created' , this.target );

        }

    }

}
