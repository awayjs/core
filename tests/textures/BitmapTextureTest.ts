///<reference path="../../build/AME.next.d.ts" />

module tests.textures
{
	import Delegate				= away.utils.Delegate;


    export class BitmapTextureTest
    {

        private mipLoader       : away.net.URLLoader;
        private bitmapData      : away.base.BitmapData;
        private target          : away.textures.BitmapTexture;
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

            var rect    : away.geom.Rectangle       = new away.geom.Rectangle( 0 , 0 , image.width , image.height );

            console.log( 'away.events.Event.COMPLETE' , image );

            this.bitmapData                         = new away.base.BitmapData( image.width , image.height );
            this.bitmapData.drawImage( image , rect ,  rect );

            this.target                             = new away.textures.BitmapTexture( this.bitmapData , true );//new away.textures.HTMLImageElementTexture( loader.image , false );

            away.Debug.log( 'away.base.BitmapData'           , this.bitmapData );
            away.Debug.log( 'away.textures.BitmapTexture'       , this.target );

        }

    }
}
