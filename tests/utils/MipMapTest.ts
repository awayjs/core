import BitmapImage2D		= require("awayjs-core/lib/image/BitmapImage2D");
import Matrix				= require("awayjs-core/lib/geom/Matrix");
import Rectangle			= require("awayjs-core/lib/geom/Rectangle");
import URLLoader			= require("awayjs-core/lib/net/URLLoader");
import URLLoaderDataFormat	= require("awayjs-core/lib/net/URLLoaderDataFormat");
import URLRequest			= require("awayjs-core/lib/net/URLRequest");
import URLLoaderEvent		= require("awayjs-core/lib/events/URLLoaderEvent");
import ParserUtils			= require("awayjs-core/lib/parsers/ParserUtils");
import ImageUtils			= require("awayjs-core/lib/utils/ImageUtils");

class MipMapTest
{

	private mipLoader       : URLLoader;
	private sourceBitmap    : BitmapImage2D;
	private mipMap          : BitmapImage2D;
	private _rect           : Rectangle = new Rectangle();
	private _matrix         : Matrix = new Matrix();
	private w               : number;
	private h               : number;

	constructor()
	{
		//---------------------------------------
		// Load a PNG

		var mipUrlRequest = new URLRequest( 'assets/1024x1024.png');
		this.mipLoader  = new URLLoader();
		this.mipLoader.dataFormat = URLLoaderDataFormat.BLOB;
		this.mipLoader.load( mipUrlRequest );
		this.mipLoader.addEventListener( URLLoaderEvent.LOAD_COMPLETE , (event:URLLoaderEvent) => this.mipImgLoaded(event) );

		document.onmousedown = ( e ) => this.onMouseDown( e );
	}

	private mipImgLoaded(event:URLLoaderEvent)
	{
		var loader  : URLLoader        = <URLLoader > event.target;
		var image : HTMLImageElement = ParserUtils.blobToImage(loader.data);
		image.onload = ( event ) => this.onImageLoad( event );
	}

	private onImageLoad (event)
	{
		var image : HTMLImageElement = <HTMLImageElement> event.target;
		alert( 'Each click will generate a level of MipMap');

		this.sourceBitmap                        = new BitmapImage2D( 1024 , 1024 , true , 0xff0000 );
		this.sourceBitmap.draw(image);
		this.sourceBitmap.getCanvas().style.position  = 'absolute';
		this.sourceBitmap.getCanvas().style.left      = '0px';
		this.sourceBitmap.getCanvas().style.top       = '1030px';

		//document.body.appendChild( this.sourceBitmap.canvas );

		this.mipMap = new BitmapImage2D( 1024 , 1024 , true , 0xff0000 );
		this.mipMap.getCanvas().style.position  = 'absolute';
		this.mipMap.getCanvas().style.left      = '0px';
		this.mipMap.getCanvas().style.top       = '0px';

		document.body.appendChild( this.mipMap.getCanvas() );

		this._rect.width    = this.sourceBitmap.width;
		this._rect.height   = this.sourceBitmap.height;

		this.w = this.sourceBitmap.width;
		this.h = this.sourceBitmap.height;

	}

	private onMouseDown( e )
	{
		this.generateMipMap( this.sourceBitmap ,  this.mipMap );
	}
	
	public generateMipMap( source : BitmapImage2D , mipmap : BitmapImage2D = null, alpha:boolean = false, side:number = -1)
	{
		var c:number = this.w;
		var i:number;

		console['time']('MipMap' + c);
		
		if ((this.w >= 1 ) || (this.h >= 1)) {

			if (alpha)
				mipmap.fillRect(this._rect, 0);

			this._matrix.a = this._rect.width / source.width;
			this._matrix.d = this._rect.height / source.height;

			mipmap.width = this.w;
			mipmap.height= this.h;
			mipmap.copyPixels( source , source.rect , new Rectangle( 0 , 0 , this.w , this.h ) );

			this.w >>= 1;
			this.h >>= 1;

			this._rect.width = this.w > 1? this.w : 1;
			this._rect.height = this.h > 1? this.h : 1;
		}

		console.log( 'ImageUtils.isBitmapImage2DValid: ' , ImageUtils.isImage2DValid( mipmap ));

		console['timeEnd']('MipMap' + c);

	}
}