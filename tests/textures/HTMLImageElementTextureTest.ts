///<reference path="../../build/AME.next.d.ts" />

module tests.textures
{
	import Delegate				= away.utils.Delegate;

    export class HTMLImageElementTextureTest
    {

        private mipLoader       : away.net.IMGLoader;
        private target          : away.textures.HTMLImageElementTexture;
        private texture         : away.displayGL.Texture;

        constructor()
        {

            //---------------------------------------
            // Load a PNG

            var mipUrlRequest = new away.net.URLRequest( 'assets/1024x1024.png');
            this.mipLoader  = new away.net.IMGLoader();
            this.mipLoader.load( mipUrlRequest );
            this.mipLoader.addEventListener( away.events.Event.COMPLETE , Delegate.create(this, this.mipImgLoaded) );

        }

        private mipImgLoaded( e )
        {

            var stage       : away.display.Stage        = new away.display.Stage();
            var stage3D     : away.display.StageGL      = stage.getStageGLAt( 0 );
            var context3D   : away.displayGL.ContextGL  = new away.displayGL.ContextGL( stage3D.canvas );
            var loader      : away.net.IMGLoader        = <away.net.IMGLoader > e.target;

            console.log( 'away.events.Event.COMPLETE' , loader );

            this.texture    = new away.displayGL.Texture( context3D._gl , loader.width , loader.height );
            this.target     = new away.textures.HTMLImageElementTexture( loader.image , false );

            console.log( 'away.display3D.Texture - Created' , this.texture );
            console.log( 'away.textures.HTMLImageElementTexture - Created' , this.target );

            away.textures.MipmapGenerator.generateHTMLImageElementMipMaps( this.target.htmlImageElement , <away.displayGL.TextureBase> this.texture );

        }

    }

}
