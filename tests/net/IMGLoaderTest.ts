import URLLoader			= require("awayjs-core/lib/core/net/URLLoader");
import URLLoaderDataFormat	= require("awayjs-core/lib/core/net/URLLoaderDataFormat");
import URLRequest			= require("awayjs-core/lib/core/net/URLRequest");
import Event				= require("awayjs-core/lib/events/Event");
import IOErrorEvent			= require("awayjs-core/lib/events/IOErrorEvent");
import ParserUtils			= require("awayjs-core/lib/parsers/ParserUtils");

class IMGLoaderTest
{

	private pngLoader       : URLLoader;
	private jpgLoader       : URLLoader;
	private noAnImageLoader : URLLoader;
	private wrongURLLoader  : URLLoader;

	constructor()
	{

		//-----------------------------------------------------------------------------------------------
		// load a png
		//-----------------------------------------------------------------------------------------------

		var pngURLrq            = new URLRequest( 'assets/2.png');

		this.pngLoader          = new URLLoader();
		this.pngLoader.dataFormat = URLLoaderDataFormat.BLOB;
		this.pngLoader.addEventListener( Event.COMPLETE , ( event : Event) => this.pngLoaderComplete(event) );
		this.pngLoader.addEventListener( IOErrorEvent.IO_ERROR , ( event : IOErrorEvent ) => this.ioError(event) );
		this.pngLoader.load( pngURLrq );

		//-----------------------------------------------------------------------------------------------
		// Load a jpg
		//-----------------------------------------------------------------------------------------------

		var jpgURLrq            = new URLRequest( 'assets/1.jpg');

		this.jpgLoader          = new URLLoader();
		this.jpgLoader.dataFormat = URLLoaderDataFormat.BLOB;
		this.jpgLoader.addEventListener( Event.COMPLETE , ( event : Event) => this.jpgLoaderComplete(event) );
		this.jpgLoader.addEventListener( IOErrorEvent.IO_ERROR , ( event : IOErrorEvent ) => this.ioError(event) );
		this.jpgLoader.load( jpgURLrq );

		//-----------------------------------------------------------------------------------------------
		// Load file of wrong format
		//-----------------------------------------------------------------------------------------------

		var notURLrq            = new URLRequest( 'assets/data.txt');

		this.noAnImageLoader    = new URLLoader();
		this.noAnImageLoader.dataFormat = URLLoaderDataFormat.BLOB;
		this.noAnImageLoader.addEventListener( Event.COMPLETE , ( event : Event) => this.noAnImageLoaderComplete(event) );
		this.noAnImageLoader.addEventListener( IOErrorEvent.IO_ERROR , ( event : IOErrorEvent ) => this.ioError(event) );
		this.noAnImageLoader.load( notURLrq )

		//-----------------------------------------------------------------------------------------------
		// Load image that does not exist
		//-----------------------------------------------------------------------------------------------

		var wrongURLrq            = new URLRequest( 'assets/iDontExist.png');

		this.wrongURLLoader     = new URLLoader();
		this.wrongURLLoader.dataFormat = URLLoaderDataFormat.BLOB;
		this.wrongURLLoader.addEventListener( Event.COMPLETE , ( event : Event) => this.wrongURLLoaderComplete(event) );
		this.wrongURLLoader.addEventListener( IOErrorEvent.IO_ERROR , ( event : IOErrorEvent ) => this.ioError(event) );
		this.wrongURLLoader.load( wrongURLrq );
	}

	private pngLoaderComplete ( e : Event ) : void
	{

		this.logSuccessfullLoad( e );


		var imgLoader : URLLoader = <URLLoader> e.target;
		document.body.appendChild( ParserUtils.blobToImage(imgLoader.data) );

	}

	private jpgLoaderComplete ( e : Event ) : void
	{

		this.logSuccessfullLoad( e );

		var imgLoader : URLLoader = <URLLoader> e.target;
		document.body.appendChild( ParserUtils.blobToImage(imgLoader.data) );

	}

	private noAnImageLoaderComplete ( e : Event ) : void
	{

		this.logSuccessfullLoad( e );

	}

	private wrongURLLoaderComplete ( e : Event ) : void
	{

		this.logSuccessfullLoad( e );

	}

	private logSuccessfullLoad( event : Event) : void
	{

		var imgLoader : URLLoader = <URLLoader> event.target;
		console.log( 'IMG.Event.Complete' , imgLoader.url );

	}

	private ioError ( event : IOErrorEvent ) : void
	{

		var imgLoader : URLLoader = <URLLoader> event.target;
		console.log( 'ioError' , imgLoader.url );

	}

	private abortError ( event : Event ) : void
	{

		var imgLoader : URLLoader = <URLLoader> event.target;
		console.log( 'abortError' , imgLoader.url );

	}

}