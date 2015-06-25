import URLLoader			= require("awayjs-core/lib/net/URLLoader");
import URLLoaderDataFormat	= require("awayjs-core/lib/net/URLLoaderDataFormat");
import URLRequest			= require("awayjs-core/lib/net/URLRequest");
import Event				= require("awayjs-core/lib/events/Event");
import IOErrorEvent			= require("awayjs-core/lib/events/IOErrorEvent");
import ParserUtils			= require("awayjs-core/lib/parsers/ParserUtils");

class IMGLoaderTest
{
	private pngLoader:URLLoader;
	private jpgLoader:URLLoader;
	private noAnImageLoader:URLLoader;
	private wrongURLLoader:URLLoader;

	constructor()
	{

		//-----------------------------------------------------------------------------------------------
		// load a png
		//-----------------------------------------------------------------------------------------------
		
		this.pngLoader = new URLLoader();
		this.pngLoader.dataFormat = URLLoaderDataFormat.BLOB;
		this.pngLoader.addEventListener(Event.COMPLETE , (event:Event) => this.pngLoaderComplete(event));
		this.pngLoader.addEventListener(IOErrorEvent.IO_ERROR , (event:IOErrorEvent) => this.ioError(event));
		this.pngLoader.load(new URLRequest('assets/2.png'));

		//-----------------------------------------------------------------------------------------------
		// Load a jpg
		//-----------------------------------------------------------------------------------------------
		
		this.jpgLoader = new URLLoader();
		this.jpgLoader.dataFormat = URLLoaderDataFormat.BLOB;
		this.jpgLoader.addEventListener(Event.COMPLETE , (event:Event) => this.jpgLoaderComplete(event));
		this.jpgLoader.addEventListener(IOErrorEvent.IO_ERROR , (event:IOErrorEvent) => this.ioError(event));
		this.jpgLoader.load(new URLRequest('assets/1.jpg'));

		//-----------------------------------------------------------------------------------------------
		// Load file of wrong format
		//-----------------------------------------------------------------------------------------------
		
		this.noAnImageLoader = new URLLoader();
		this.noAnImageLoader.dataFormat = URLLoaderDataFormat.BLOB;
		this.noAnImageLoader.addEventListener(Event.COMPLETE , (event:Event) => this.noAnImageLoaderComplete(event));
		this.noAnImageLoader.addEventListener(IOErrorEvent.IO_ERROR , (event:IOErrorEvent) => this.ioError(event));
		this.noAnImageLoader.load(new URLRequest('assets/data.txt'));

		//-----------------------------------------------------------------------------------------------
		// Load image that does not exist
		//-----------------------------------------------------------------------------------------------
		
		this.wrongURLLoader = new URLLoader();
		this.wrongURLLoader.dataFormat = URLLoaderDataFormat.BLOB;
		this.wrongURLLoader.addEventListener(Event.COMPLETE , (event:Event) => this.wrongURLLoaderComplete(event));
		this.wrongURLLoader.addEventListener(IOErrorEvent.IO_ERROR , (event:IOErrorEvent) => this.ioError(event));
		this.wrongURLLoader.load(new URLRequest('assets/iDontExist.png'));
	}

	private pngLoaderComplete(e:Event)
	{
		this.logSuccessfullLoad(e);
		
		var imgLoader:URLLoader = <URLLoader> e.target;
		document.body.appendChild(ParserUtils.blobToImage(imgLoader.data));
	}

	private jpgLoaderComplete(e:Event)
	{
		this.logSuccessfullLoad(e);

		var imgLoader:URLLoader = <URLLoader> e.target;
		document.body.appendChild(ParserUtils.blobToImage(imgLoader.data));
	}

	private noAnImageLoaderComplete(e:Event)
	{
		this.logSuccessfullLoad(e);
	}

	private wrongURLLoaderComplete(e:Event)
	{
		this.logSuccessfullLoad(e);
	}

	private logSuccessfullLoad(event:Event)
	{
		var imgLoader:URLLoader = <URLLoader> event.target;
		console.log('IMG.Event.Complete', imgLoader.url);
	}

	private ioError(event:IOErrorEvent)
	{
		var imgLoader:URLLoader = <URLLoader> event.target;
		console.log('ioError', imgLoader.url);
	}

	private abortError(event:Event)
	{
		var imgLoader:URLLoader = <URLLoader> event.target;
		console.log('abortError', imgLoader.url);
	}
}