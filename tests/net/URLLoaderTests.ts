import URLLoader			= require("awayjs-core/lib/core/net/URLLoader");
import URLLoaderDataFormat	= require("awayjs-core/lib/core/net/URLLoaderDataFormat");
import URLRequest			= require("awayjs-core/lib/core/net/URLRequest");
import URLRequestMethod		= require("awayjs-core/lib/core/net/URLRequestMethod");
import URLVariables			= require("awayjs-core/lib/core/net/URLVariables");
import Event				= require("awayjs-core/lib/events/Event");
import IOErrorEvent			= require("awayjs-core/lib/events/IOErrorEvent");
import HTTPStatusEvent		= require("awayjs-core/lib/events/HTTPStatusEvent");

/**
 * 
 */
class LoaderTest
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

		this.urlLoaderPostURLVars.addEventListener(Event.COMPLETE, (event:Event) => this.postURLTestComplete(event));
		this.urlLoaderPostURLVars.addEventListener(IOErrorEvent.IO_ERROR, (event:IOErrorEvent) => this.ioError(event));
		this.urlLoaderPostURLVars.load( req );

		//---------------------------------------------------------------------------------------------------------------------------------------------------------
		// GET CSV File
		//---------------------------------------------------------------------------------------------------------------------------------------------------------

		var csrReq = new URLRequest( 'assets/airports.csv' );

		this.urlLoaderGetCSV = new URLLoader();
		this.urlLoaderGetCSV.dataFormat = URLLoaderDataFormat.TEXT;
		this.urlLoaderGetCSV.addEventListener(Event.COMPLETE, (event:Event) => this.getCsvComplete(event));
		this.urlLoaderGetCSV.addEventListener(Event.OPEN, (event:Event) => this.getCsvOpen(event));
		this.urlLoaderGetCSV.addEventListener(IOErrorEvent.IO_ERROR, (event:IOErrorEvent) => this.ioError(event));
		this.urlLoaderGetCSV.load( csrReq );

		//---------------------------------------------------------------------------------------------------------------------------------------------------------
		// ERROR test - load a non-existing object
		//---------------------------------------------------------------------------------------------------------------------------------------------------------

		var errorReq = new URLRequest( 'assets/generatingError' );

		this.urlLoaderErrorTest = new URLLoader();
		this.urlLoaderErrorTest.dataFormat = URLLoaderDataFormat.TEXT;
		this.urlLoaderErrorTest.addEventListener(Event.COMPLETE, (event:Event) =>  this.errorComplete(event));
		this.urlLoaderErrorTest.addEventListener(IOErrorEvent.IO_ERROR, (event:IOErrorEvent) => this.ioError(event));
		this.urlLoaderErrorTest.addEventListener(HTTPStatusEvent.HTTP_STATUS, (event:HTTPStatusEvent) => this.httpStatusChange(event));
		this.urlLoaderErrorTest.load( errorReq );

		//---------------------------------------------------------------------------------------------------------------------------------------------------------
		// GET URL Vars - get URL variables
		//---------------------------------------------------------------------------------------------------------------------------------------------------------

		var csrReq = new URLRequest( 'assets/getUrlVars.php' );

		this.urlLoaderGetURLVars = new URLLoader();
		this.urlLoaderGetURLVars.dataFormat = URLLoaderDataFormat.VARIABLES;
		this.urlLoaderGetURLVars.addEventListener(IOErrorEvent.IO_ERROR, (event:IOErrorEvent) => this.ioError(event));
		this.urlLoaderGetURLVars.addEventListener(Event.COMPLETE, (event:Event) => this.getURLVarsComplete(event));
		this.urlLoaderGetURLVars.load( csrReq );

		//---------------------------------------------------------------------------------------------------------------------------------------------------------
		// LOAD Binary file
		//---------------------------------------------------------------------------------------------------------------------------------------------------------

		var binReq = new URLRequest( 'assets/suzanne.awd' );

		this.urlLoaderBinary = new URLLoader(  );
		this.urlLoaderBinary.dataFormat = URLLoaderDataFormat.BINARY;
		this.urlLoaderBinary.addEventListener(IOErrorEvent.IO_ERROR, (event:IOErrorEvent) => this.ioError(event));
		this.urlLoaderBinary.addEventListener(Event.COMPLETE, (event:Event) => this.binFileLoaded(event));
		this.urlLoaderBinary.load( binReq );

		//---------------------------------------------------------------------------------------------------------------------------------------------------------
		// LOAD Blob file
		//---------------------------------------------------------------------------------------------------------------------------------------------------------

		var blobReq = new URLRequest( 'assets/2.png' );

		this.urlLoaderBlob = new URLLoader(  );
		this.urlLoaderBlob.dataFormat = URLLoaderDataFormat.BLOB;
		this.urlLoaderBlob.addEventListener(Event.COMPLETE, (event:Event) => this.blobFileLoaded(event));
		this.urlLoaderBlob.load( blobReq );

		//---------------------------------------------------------------------------------------------------------------------------------------------------------
		// ARRAY_BUFFER Test
		//---------------------------------------------------------------------------------------------------------------------------------------------------------

		var arrBReq = new URLRequest( 'assets/1.jpg' );

		this.urlLoaderArrb = new URLLoader(  );
		this.urlLoaderArrb.dataFormat = URLLoaderDataFormat.ARRAY_BUFFER;
		this.urlLoaderArrb.addEventListener(Event.COMPLETE, (event:Event) => this.arrayBufferLoaded(event));
		this.urlLoaderArrb.load( arrBReq );
	}

	private arrayBufferLoaded( event:Event ):void
	{
		var arrayBuffer = this.urlLoaderArrb.data;
		var byteArray = new Uint8Array(arrayBuffer);

		console.log( 'LoaderTest.arrayBufferLoaded' , byteArray[1]);

		for (var i = 0; i < byteArray.byteLength; i++) {
			//console.log( byteArray[i] );
		}
	}

	private blobFileLoaded( event:Event ):void
	{
		var blob= new Blob([this.urlLoaderBlob.data], {type: 'image/png'});
		var img = document.createElement('img');
			img.src  = this.createObjectURL( blob );//window['URL']['createObjectURL'](blob);
			img.onload  = function(e) {
				window['URL']['revokeObjectURL'](img.src); // Clean up after yourself.
			};

		console.log( 'LoaderTest.blobFileLoaded' , blob );

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

	private binFileLoaded(event:Event):void
	{
		var loader:URLLoader = <URLLoader> event.target;
		console.log( 'LoaderTest.binFileLoaded' , loader.data.length );
	}

	private getURLVarsComplete(event:Event):void
	{
		var loader:URLLoader = <URLLoader> event.target;
		console.log( 'LoaderTest.getURLVarsComplete' , loader.data );
	}

	private httpStatusChange(event:HTTPStatusEvent):void
	{
		console.log( 'LoaderTest.httpStatusChange' , event.status );
	}

	private ioError(event:IOErrorEvent):void
	{
		var loader:URLLoader = <URLLoader> event.target;
		console.log( 'LoaderTest.ioError' , loader.url );
	}

	private errorComplete( event ):void
	{
		var loader:URLLoader = <URLLoader> event.target;
		console.log( 'Loader.errorComplete' );//, loader.data );
	}

	private postURLTestComplete(event:Event):void
	{
		var loader:URLLoader = <URLLoader> event.target;
		console.log( 'LoaderTest.postURLTestComplete' , loader.data );
	}

	private getCsvComplete(event:Event):void
	{
		var loader:URLLoader = <URLLoader> event.target;
		console.log( 'LoaderTest.getCsvComplete' );//, loader.data );
	}

	private getCsvOpen( event ):void
	{
		var loader:URLLoader = <URLLoader> event.target;
		console.log( 'LoaderTest.getCsvOpen' );
	}
}