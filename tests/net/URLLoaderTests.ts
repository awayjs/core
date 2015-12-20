import URLLoader			= require("awayjs-core/lib/net/URLLoader");
import URLLoaderDataFormat	= require("awayjs-core/lib/net/URLLoaderDataFormat");
import URLRequest			= require("awayjs-core/lib/net/URLRequest");
import URLRequestMethod		= require("awayjs-core/lib/net/URLRequestMethod");
import URLVariables			= require("awayjs-core/lib/net/URLVariables");
import URLLoaderEvent		= require("awayjs-core/lib/events/URLLoaderEvent");

/**
 * 
 */
class URLLoaderTests
{

	private urlLoaderPostURLVars:URLLoader;
	private urlLoaderGetCSV:URLLoader;
	private urlLoaderErrorTest:URLLoader;
	private urlLoaderGetURLVars:URLLoader;
	private urlLoaderBinary:URLLoader;
	private urlLoaderBlob:URLLoader;
	private urlLoaderArrb:URLLoader;

	constructor()
	{

		console.log( 'start');

		//---------------------------------------------------------------------------------------------------------------------------------------------------------
		// POST URL Variables to PHP script
		//---------------------------------------------------------------------------------------------------------------------------------------------------------

		this.urlLoaderPostURLVars = new URLLoader();
		this.urlLoaderPostURLVars.dataFormat = URLLoaderDataFormat.VARIABLES;

		var urlStr:string = 'fname=karim&lname=' + Math.floor( Math.random() * 100 );
		var urlVars = new URLVariables( urlStr );

		var req = new URLRequest( 'assets/saveData.php' );
			req.method = URLRequestMethod.POST;
			req.data = urlVars;

		this.urlLoaderPostURLVars.addEventListener(URLLoaderEvent.LOAD_COMPLETE, (event:URLLoaderEvent) => this.postURLTestComplete(event));
		this.urlLoaderPostURLVars.addEventListener(URLLoaderEvent.LOAD_ERROR, (event:URLLoaderEvent) => this.ioError(event));
		this.urlLoaderPostURLVars.load( req );

		//---------------------------------------------------------------------------------------------------------------------------------------------------------
		// GET CSV File
		//---------------------------------------------------------------------------------------------------------------------------------------------------------

		var csrReq = new URLRequest( 'assets/airports.csv' );

		this.urlLoaderGetCSV = new URLLoader();
		this.urlLoaderGetCSV.dataFormat = URLLoaderDataFormat.TEXT;
		this.urlLoaderGetCSV.addEventListener(URLLoaderEvent.LOAD_COMPLETE, (event:URLLoaderEvent) => this.getCsvComplete(event));
		this.urlLoaderGetCSV.addEventListener(URLLoaderEvent.LOAD_START, (event:URLLoaderEvent) => this.getCsvOpen(event));
		this.urlLoaderGetCSV.addEventListener(URLLoaderEvent.LOAD_ERROR, (event:URLLoaderEvent) => this.ioError(event));
		this.urlLoaderGetCSV.load( csrReq );

		//---------------------------------------------------------------------------------------------------------------------------------------------------------
		// ERROR test - load a non-existing object
		//---------------------------------------------------------------------------------------------------------------------------------------------------------

		var errorReq = new URLRequest( 'assets/generatingError' );

		this.urlLoaderErrorTest = new URLLoader();
		this.urlLoaderErrorTest.dataFormat = URLLoaderDataFormat.TEXT;
		this.urlLoaderErrorTest.addEventListener(URLLoaderEvent.LOAD_COMPLETE, (event:URLLoaderEvent) =>  this.errorComplete(event));
		this.urlLoaderErrorTest.addEventListener(URLLoaderEvent.LOAD_ERROR, (event:URLLoaderEvent) => this.ioError(event));
		this.urlLoaderErrorTest.addEventListener(URLLoaderEvent.HTTP_STATUS, (event:URLLoaderEvent) => this.httpStatusChange(event));
		this.urlLoaderErrorTest.load( errorReq );

		//---------------------------------------------------------------------------------------------------------------------------------------------------------
		// GET URL Vars - get URL variables
		//---------------------------------------------------------------------------------------------------------------------------------------------------------

		var csrReq = new URLRequest( 'assets/getUrlVars.php' );

		this.urlLoaderGetURLVars = new URLLoader();
		this.urlLoaderGetURLVars.dataFormat = URLLoaderDataFormat.VARIABLES;
		this.urlLoaderGetURLVars.addEventListener(URLLoaderEvent.LOAD_ERROR, (event:URLLoaderEvent) => this.ioError(event));
		this.urlLoaderGetURLVars.addEventListener(URLLoaderEvent.LOAD_COMPLETE, (event:URLLoaderEvent) => this.getURLVarsComplete(event));
		this.urlLoaderGetURLVars.load( csrReq );

		//---------------------------------------------------------------------------------------------------------------------------------------------------------
		// LOAD Binary file
		//---------------------------------------------------------------------------------------------------------------------------------------------------------

		var binReq = new URLRequest( 'assets/suzanne.awd' );

		this.urlLoaderBinary = new URLLoader(  );
		this.urlLoaderBinary.dataFormat = URLLoaderDataFormat.BINARY;
		this.urlLoaderBinary.addEventListener(URLLoaderEvent.LOAD_ERROR, (event:URLLoaderEvent) => this.ioError(event));
		this.urlLoaderBinary.addEventListener(URLLoaderEvent.LOAD_COMPLETE, (event:URLLoaderEvent) => this.binFileLoaded(event));
		this.urlLoaderBinary.load( binReq );

		//---------------------------------------------------------------------------------------------------------------------------------------------------------
		// LOAD Blob file
		//---------------------------------------------------------------------------------------------------------------------------------------------------------

		var blobReq = new URLRequest( 'assets/2.png' );

		this.urlLoaderBlob = new URLLoader(  );
		this.urlLoaderBlob.dataFormat = URLLoaderDataFormat.BLOB;
		this.urlLoaderBlob.addEventListener(URLLoaderEvent.LOAD_COMPLETE, (event:URLLoaderEvent) => this.blobFileLoaded(event));
		this.urlLoaderBlob.load( blobReq );

		//---------------------------------------------------------------------------------------------------------------------------------------------------------
		// ARRAY_BUFFER Test
		//---------------------------------------------------------------------------------------------------------------------------------------------------------

		var arrBReq = new URLRequest( 'assets/1.jpg' );

		this.urlLoaderArrb = new URLLoader(  );
		this.urlLoaderArrb.dataFormat = URLLoaderDataFormat.ARRAY_BUFFER;
		this.urlLoaderArrb.addEventListener(URLLoaderEvent.LOAD_COMPLETE, (event:URLLoaderEvent) => this.arrayBufferLoaded(event));
		this.urlLoaderArrb.load( arrBReq );
	}

	private arrayBufferLoaded( event:URLLoaderEvent ):void
	{
		var arrayBuffer = this.urlLoaderArrb.data;
		var byteArray = new Uint8Array(arrayBuffer);

		console.log( 'URLLoaderTests.arrayBufferLoaded' , byteArray[1]);

		for (var i = 0; i < byteArray.byteLength; i++) {
			//console.log( byteArray[i] );
		}
	}

	private blobFileLoaded( event:URLLoaderEvent ):void
	{
		var blob= new Blob([this.urlLoaderBlob.data], {type: 'image/png'});
		var img = document.createElement('img');
			img.src  = this.createObjectURL( blob );//window['URL']['createObjectURL'](blob);
			img.onload  = function(e) {
				window['URL']['revokeObjectURL'](img.src); // Clean up after yourself.
			};

		console.log( 'URLLoaderTests.blobFileLoaded' , blob );

		document.body.appendChild( img );
	}

	private createObjectURL( fileBlob )
	{
		// For some reason TypeScript has "window.URL.createObjectURL" in it's dictionary -
		// but window.URL causes an error
		// cannot make my own .d.ts file either ( results in duplicate definition error )
		// This HACK gets it to work: window['URL']['createObjectURL']
		if( window['URL'] ){
			if ( window['URL']['createObjectURL'] ) {
				return window['URL']['createObjectURL']( fileBlob );
			}
		} else {
			if ( window['webkitURL'] ){
				return window['webkitURL']['createObjectURL']( fileBlob );
			}
		}

		return null;
	}

	private binFileLoaded(event:URLLoaderEvent):void
	{
		var loader:URLLoader = event.target;
		console.log( 'URLLoaderTests.binFileLoaded' , loader.data.length );
	}

	private getURLVarsComplete(event:URLLoaderEvent):void
	{
		var loader:URLLoader = event.target;
		console.log( 'URLLoaderTests.getURLVarsComplete' , loader.data );
	}

	private httpStatusChange(event:URLLoaderEvent):void
	{
		console.log( 'URLLoaderTests.httpStatusChange' , event.target.status );
	}

	private ioError(event:URLLoaderEvent):void
	{
		var loader:URLLoader = event.target;
		console.log( 'URLLoaderTests.ioError' , loader.url );
	}

	private errorComplete( event ):void
	{
		var loader:URLLoader = event.target;
		console.log( 'Loader.errorComplete' );//, loader.data );
	}

	private postURLTestComplete(event:URLLoaderEvent):void
	{
		var loader:URLLoader = event.target;
		console.log( 'URLLoaderTests.postURLTestComplete' , loader.data );
	}

	private getCsvComplete(event:URLLoaderEvent):void
	{
		var loader:URLLoader = event.target;
		console.log( 'URLLoaderTests.getCsvComplete' );//, loader.data );
	}

	private getCsvOpen(event:URLLoaderEvent):void
	{
		var loader:URLLoader = event.target;
		console.log( 'URLLoaderTests.getCsvStart' );
	}
}