///<reference path="../../build/awayjs.next.d.ts" />

module tests.utils
{
	import Delegate				= away.utils.Delegate;

    export class MipMapTest
    {

        private mipLoader       : away.net.URLLoader;
        private sourceBitmap    : away.base.BitmapData;
        private mipMap          : away.base.BitmapData;
        private _rect           : away.geom.Rectangle = new away.geom.Rectangle();
        private _matrix         : away.geom.Matrix = new away.geom.Matrix();
        private w               : number;
        private h               : number;

        constructor()
        {

            //---------------------------------------
            // Load a PNG

            var mipUrlRequest = new away.net.URLRequest( 'assets/1024x1024.png');
            this.mipLoader  = new away.net.URLLoader();
			this.mipLoader.dataFormat = away.net.URLLoaderDataFormat.BLOB;
            this.mipLoader.load( mipUrlRequest );
            this.mipLoader.addEventListener( away.events.Event.COMPLETE , Delegate.create(this, this.mipImgLoaded) );

            document.onmousedown = ( e ) => this.onMouseDown( e );

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
            alert( 'Each click will generate a level of MipMap');

            this.sourceBitmap                        = new away.base.BitmapData( 1024 , 1024 , true , 0xff0000 );
            this.sourceBitmap.drawImage( image , this.sourceBitmap.rect , this.sourceBitmap.rect );
            this.sourceBitmap.canvas.style.position  = 'absolute';
            this.sourceBitmap.canvas.style.left      = '0px';
            this.sourceBitmap.canvas.style.top       = '1030px';

            //document.body.appendChild( this.sourceBitmap.canvas );

            this.mipMap = new away.base.BitmapData( 1024 , 1024 , true , 0xff0000 );
            this.mipMap.canvas.style.position  = 'absolute';
            this.mipMap.canvas.style.left      = '0px';
            this.mipMap.canvas.style.top       = '0px';

            document.body.appendChild( this.mipMap.canvas );

            this._rect.width    = this.sourceBitmap.width;
            this._rect.height   = this.sourceBitmap.height;

            this.w = this.sourceBitmap.width;
            this.h = this.sourceBitmap.height;

        }

        private onMouseDown( e )
        {

            this.generateMipMap( this.sourceBitmap ,  this.mipMap );

        }




        public generateMipMap( source : away.base.BitmapData , mipmap : away.base.BitmapData = null, alpha:boolean = false, side:number = -1)
        {

            var c : number = this.w;
            var i:number;

            console['time']('MipMap' + c);


            if ( (this.w >= 1 ) || (this.h >= 1) )
            {

                if (alpha){

                    mipmap.fillRect(this._rect, 0);

                }

                this._matrix.a = this._rect.width / source.width;
                this._matrix.d = this._rect.height / source.height;

                mipmap.width = this.w;
                mipmap.height= this.h;
                mipmap.copyPixels( source , source.rect , new away.geom.Rectangle( 0 , 0 , this.w , this.h ) );

                this.w >>= 1;
                this.h >>= 1;

                this._rect.width = this.w > 1? this.w : 1;
                this._rect.height = this.h > 1? this.h : 1;

            }

            console.log( 'away.utils.TextureUtils.isBitmapDataValid: ' , away.utils.TextureUtils.isBitmapDataValid( mipmap ));

            console['timeEnd']('MipMap' + c);

        }

    }

}