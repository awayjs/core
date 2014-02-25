///<reference path="../../build/awayjs.next.d.ts" />

module tests.textures
{
	import Delegate				= away.utils.Delegate;

    export class ImageTextureTest
    {

        private mipLoader       : away.net.URLLoader;
        private target          : away.textures.ImageTexture;
        private texture         : away.gl.Texture;

        constructor()
        {

            //---------------------------------------
            // Load a PNG

            var mipUrlRequest = new away.net.URLRequest( 'assets/1024x1024.png');
            this.mipLoader  = new away.net.URLLoader();
			this.mipLoader.dataFormat = away.net.URLLoaderDataFormat.BLOB;
            this.mipLoader.load( mipUrlRequest );
            this.mipLoader.addEventListener( away.events.Event.COMPLETE , Delegate.create(this, this.mipImgLoaded) );

        }

        private mipImgLoaded( e )
        {
			var loader  : away.net.URLLoader        = <away.net.URLLoader > e.target;
			var image : HTMLImageElement = away.parsers.ParserUtils.blobToImage(loader.data);
			image.onload = ( event ) => this.onImageLoad( event );
		}

		private onImageLoad (event)
		{
			var image : HTMLImageElement = <HTMLImageElement> event.target;
            var stageGLManager       : away.managers.StageGLManager        = away.managers.StageGLManager.getInstance();
            var stage3D     : away.base.StageGL      = stageGLManager.getStageGLAt( 0 );
            var context3D   : away.gl.ContextGL  = new away.gl.ContextGL( stage3D.canvas );

            console.log( 'away.events.Event.COMPLETE' , image );

            this.texture    = new away.gl.Texture( context3D._gl , image.width , image.height );
            this.target     = new away.textures.ImageTexture( image , false );

            console.log( 'away.base3D.Texture - Created' , this.texture );
            console.log( 'away.textures.ImageTexture - Created' , this.target );

            away.textures.MipmapGenerator.generateHTMLImageElementMipMaps( this.target.htmlImageElement , <away.gl.TextureBase> this.texture );

        }

    }

}
