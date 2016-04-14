import BitmapImage2D		from "awayjs-core/lib/image/BitmapImage2D";
import AssetEvent			from "awayjs-core/lib/events/AssetEvent";
import LoaderEvent			from "awayjs-core/lib/events/LoaderEvent";
import AssetLibrary			from "awayjs-core/lib/library/AssetLibrary";
import Loader				from "awayjs-core/lib/library/Loader";
import IAsset				from "awayjs-core/lib/library/IAsset";
import URLRequest			from "awayjs-core/lib/net/URLRequest";
import ParserBase			from "awayjs-core/lib/parsers/ParserBase";
import ParserDataFormat		from "awayjs-core/lib/parsers/ParserDataFormat";
import ResourceDependency	from "awayjs-core/lib/parsers/ResourceDependency";

class AssetLibraryTest
{

	private height : number = 0;
	
	constructor()
	{
		var session:Loader;
		
		AssetLibrary.enableParser(JSONTextureParser);

		session = AssetLibrary.getLoader();
		session.addEventListener( LoaderEvent.LOAD_COMPLETE , (event:LoaderEvent) => this.onResourceComplete(event) );
		session.addEventListener(AssetEvent.ASSET_COMPLETE , (event:AssetEvent) => this.onAssetComplete(event) );
		session.load(new URLRequest('assets/JSNParserTest.json') );

		session = AssetLibrary.getLoader();
		session.addEventListener( LoaderEvent.LOAD_COMPLETE , (event:LoaderEvent) => this.onResourceComplete(event) );
		session.addEventListener(AssetEvent.ASSET_COMPLETE , (event:AssetEvent) => this.onAssetComplete(event) );
		session.load(new URLRequest('assets/1024x1024.png') );

		session = AssetLibrary.getLoader();
		session.addEventListener( LoaderEvent.LOAD_COMPLETE , (event:LoaderEvent) => this.onResourceComplete(event) );
		session.addEventListener(AssetEvent.ASSET_COMPLETE , (event:AssetEvent) => this.onAssetComplete(event) );
		session.load(new URLRequest('assets/atlas.xml') );
	}

	public onAssetComplete(event:AssetEvent)
	{

		console.log( '------------------------------------------------------------------------------');
		console.log( 'AssetEvent.ASSET_COMPLETE' , event.asset);
		console.log( '------------------------------------------------------------------------------');

		if (event.asset.isAsset(BitmapImage2D)) {
			var bitmapData : BitmapImage2D = <BitmapImage2D> event.asset;

			document.body.appendChild( bitmapData.getCanvas() );

			bitmapData.getCanvas().style.position = 'absolute';
			bitmapData.getCanvas().style.top = this.height + 'px';


			this.height += ( bitmapData.getCanvas().height + 10 ) ;
		}
	}
	public onResourceComplete(event:LoaderEvent)
	{

		var loader : Loader = <Loader> event.target;

		console.log( '------------------------------------------------------------------------------');
		console.log( 'LoaderEvent.RESOURCE_COMPLETE' , event  );
		console.log( '------------------------------------------------------------------------------');

	}

}

/**
* ImageParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
* a loader object, it wraps it in a BitmapImage2DResource so resource management can happen consistently without
* exception cases.
*/
class JSONTextureParser extends ParserBase
{
	private STATE_PARSE_DATA:number = 0;
	private STATE_LOAD_IMAGES:number = 1;
	private STATE_COMPLETE:number = 2;

	private _state:number = -1;
	private _startedParsing:boolean;
	private _doneParsing:boolean;
	private _dependencyCount:number = 0;
	private _loadedTextures:Array<BitmapImage2D>;

	/**
	 * Creates a new ImageParser object.
	 * @param uri The url or id of the data or file to be parsed.
	 * @param extra The holder for extra contextual data that the parser might need.
	 */
	constructor()
	{
		super(ParserDataFormat.PLAIN_TEXT);

		this._loadedTextures = new Array<BitmapImage2D>();
		this._state = this.STATE_PARSE_DATA;
	}

	/**
	 * Indicates whether or not a given file extension is supported by the parser.
	 * @param extension The file extension of a potential file to be parsed.
	 * @return Whether or not the given file type is supported.
	 */

	public static supportsType(extension : string) : boolean
	{
		extension = extension.toLowerCase();
		return extension == "json";
	}

	/**
	 * Tests whether a data block can be parsed by the parser.
	 * @param data The data block to potentially be parsed.
	 * @return Whether or not the given data is supported.
	 */
	public static supportsData(data : any) : boolean
	{
		try {
			var obj = JSON.parse(data);

			if (obj)
				return true;

			return false;
		} catch ( e ) {
			return false;
		}
	}

	/**
	 * @inheritDoc
	 */
	public _iResolveDependency(resourceDependency:ResourceDependency)
	{
		var resource : BitmapImage2D = <BitmapImage2D> resourceDependency.assets[0];

		this._pFinalizeAsset(<IAsset> resource, resourceDependency._iLoader.url);

		this._loadedTextures.push( resource );

		//console.log( 'JSONTextureParser._iResolveDependency' , resourceDependency );
		//console.log( 'JSONTextureParser._iResolveDependency resource: ' , resource );

		this._dependencyCount--;

		if ( this._dependencyCount == 0)
			this._state = this.STATE_COMPLETE;
	}

	/**
	 * @inheritDoc
	 */
	public _iResolveDependencyFailure(resourceDependency:ResourceDependency)
	{
		this._dependencyCount--;

		if ( this._dependencyCount == 0)
			this._state = this.STATE_COMPLETE;
	}

	private parseJson( ) : void
	{
		if (JSONTextureParser.supportsData(this.data)) {
			try {
				var json:any = JSON.parse(this.data);
				var data:Array<any> = <Array<any>> json.data;

				var rec:any;
				var rq:URLRequest;

				for (var c : number = 0; c < data.length; c ++) {
					rec = data[c];

					var uri:string = <string> rec.image;
					var id:string = <string> rec.id;

					rq = new URLRequest(uri);

					this._pAddDependency('JSON_ID_' + id, rq, false, null, true);
				}

				this._dependencyCount = data.length;
				this._state = this.STATE_LOAD_IMAGES;

				this._pPauseAndRetrieveDependencies();

			} catch (e) {
				this._state = this.STATE_COMPLETE;
			}
		}
	}
	/**
	 * @inheritDoc
	 */
	public _pProceedParsing() : boolean
	{
		console.log( 'JSONTextureParser._pProceedParsing' , this._state );

		switch (this._state) {
			case this.STATE_PARSE_DATA:
				this.parseJson();
				return ParserBase.MORE_TO_PARSE;
			case this.STATE_LOAD_IMAGES:
				break;
			case this.STATE_COMPLETE:
				return ParserBase.PARSING_DONE;
		}

		return ParserBase.MORE_TO_PARSE;
	}
}