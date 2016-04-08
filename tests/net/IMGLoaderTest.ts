import URLLoader			from "awayjs-core/lib/net/URLLoader";
import URLLoaderDataFormat	from "awayjs-core/lib/net/URLLoaderDataFormat";
import URLRequest			from "awayjs-core/lib/net/URLRequest";
import URLLoaderEvent		from "awayjs-core/lib/events/URLLoaderEvent";
import ParserUtils			from "awayjs-core/lib/parsers/ParserUtils";

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
		this.pngLoader.addEventListener(URLLoaderEvent.LOAD_COMPLETE, (event:URLLoaderEvent) => this.pngLoaderComplete(event));
		this.pngLoader.addEventListener(URLLoaderEvent.LOAD_ERROR, (event:URLLoaderEvent) => this.ioError(event));
		this.pngLoader.load(new URLRequest('assets/2.png'));

		//-----------------------------------------------------------------------------------------------
		// Load a jpg
		//-----------------------------------------------------------------------------------------------
		
		this.jpgLoader = new URLLoader();
		this.jpgLoader.dataFormat = URLLoaderDataFormat.BLOB;
		this.jpgLoader.addEventListener(URLLoaderEvent.LOAD_COMPLETE, (event:URLLoaderEvent) => this.jpgLoaderComplete(event));
		this.jpgLoader.addEventListener(URLLoaderEvent.LOAD_ERROR, (event:URLLoaderEvent) => this.ioError(event));
		this.jpgLoader.load(new URLRequest('assets/1.jpg'));

		//-----------------------------------------------------------------------------------------------
		// Load file of wrong format
		//-----------------------------------------------------------------------------------------------
		
		this.noAnImageLoader = new URLLoader();
		this.noAnImageLoader.dataFormat = URLLoaderDataFormat.BLOB;
		this.noAnImageLoader.addEventListener(URLLoaderEvent.LOAD_COMPLETE, (event:URLLoaderEvent) => this.noAnImageLoaderComplete(event));
		this.noAnImageLoader.addEventListener(URLLoaderEvent.LOAD_ERROR, (event:URLLoaderEvent) => this.ioError(event));
		this.noAnImageLoader.load(new URLRequest('assets/data.txt'));

		//-----------------------------------------------------------------------------------------------
		// Load image that does not exist
		//-----------------------------------------------------------------------------------------------
		
		this.wrongURLLoader = new URLLoader();
		this.wrongURLLoader.dataFormat = URLLoaderDataFormat.BLOB;
		this.wrongURLLoader.addEventListener(URLLoaderEvent.LOAD_COMPLETE, (event:URLLoaderEvent) => this.wrongURLLoaderComplete(event));
		this.wrongURLLoader.addEventListener(URLLoaderEvent.LOAD_ERROR, (event:URLLoaderEvent) => this.ioError(event));
		this.wrongURLLoader.load(new URLRequest('assets/iDontExist.png'));
	}

	private pngLoaderComplete(e:URLLoaderEvent)
	{
		this.logSuccessfullLoad(e);
		
		var imgLoader:URLLoader = e.target;
		document.body.appendChild(ParserUtils.blobToImage(imgLoader.data));
	}

	private jpgLoaderComplete(e:URLLoaderEvent)
	{
		this.logSuccessfullLoad(e);

		var imgLoader:URLLoader = e.target;
		document.body.appendChild(ParserUtils.blobToImage(imgLoader.data));
	}

	private noAnImageLoaderComplete(e:URLLoaderEvent)
	{
		this.logSuccessfullLoad(e);
	}

	private wrongURLLoaderComplete(e:URLLoaderEvent)
	{
		this.logSuccessfullLoad(e);
	}

	private logSuccessfullLoad(event:URLLoaderEvent)
	{
		var imgLoader:URLLoader = event.target;
		console.log('IMG.Event.Complete', imgLoader.url);
	}

	private ioError(event:URLLoaderEvent)
	{
		var imgLoader:URLLoader = event.target;
		console.log('ioError', imgLoader.url);
	}

	private abortError(event:URLLoaderEvent)
	{
		var imgLoader:URLLoader = event.target;
		console.log('abortError', imgLoader.url);
	}
}