import BitmapData			= require("awayjs-core/lib/core/base/BitmapData");
import Matrix				= require("awayjs-core/lib/core/geom/Matrix");
import Rectangle			= require("awayjs-core/lib/core/geom/Rectangle");
import URLLoader			= require("awayjs-core/lib/core/net/URLLoader");
import URLLoaderDataFormat	= require("awayjs-core/lib/core/net/URLLoaderDataFormat");
import URLRequest			= require("awayjs-core/lib/core/net/URLRequest");
import Event				= require("awayjs-core/lib/events/Event");
import ParserUtils			= require("awayjs-core/lib/parsers/ParserUtils");
import TextureUtils			= require("awayjs-core/lib/utils/TextureUtils");

class MipMapTest
{

	private mipLoader       : URLLoader;
	private sourceBitmap    : BitmapData;
	private mipMap          : BitmapData;
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
		this.mipLoader.addEventListener( Event.COMPLETE , (event:Event) => this.mipImgLoaded(event) );

		document.onmousedown = ( e ) => this.onMouseDown( e );
	}

	private mipImgLoaded(event:Event)
	{
		var loader  : URLLoader        = <URLLoader > event.target;
		var image : HTMLImageElement = ParserUtils.blobToImage(loader.data);
		image.onload = ( event ) => this.onImageLoad( event );
	}

	private onImageLoad (event)
	{
		var image : HTMLImageElement = <HTMLImageElement> event.target;
		alert( 'Each click will generate a level of MipMap');

		this.sourceBitmap                        = new BitmapData( 1024 , 1024 , true , 0xff0000 );
		this.sourceBitmap.drawImage( image , this.sourceBitmap.rect , this.sourceBitmap.rect );
		this.sourceBitmap.canvas.style.position  = 'absolute';
		this.sourceBitmap.canvas.style.left      = '0px';
		this.sourceBitmap.canvas.style.top       = '1030px';

		//document.body.appendChild( this.sourceBitmap.canvas );

		this.mipMap = new BitmapData( 1024 , 1024 , true , 0xff0000 );
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
	
	public generateMipMap( source : BitmapData , mipmap : BitmapData = null, alpha:boolean = false, side:number = -1)
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

		console.log( 'TextureUtils.isBitmapDataValid: ' , TextureUtils.isBitmapDataValid( mipmap ));

		console['timeEnd']('MipMap' + c);

	}
}