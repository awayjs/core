import BitmapImage2D		= require("awayjs-core/lib/image/BitmapImage2D");
import AssetEvent			= require("awayjs-core/lib/events/AssetEvent");
import LoaderEvent			= require("awayjs-core/lib/events/LoaderEvent");
import ParserEvent			= require("awayjs-core/lib/events/ParserEvent");
import Loader				= require("awayjs-core/lib/library/Loader");
import IAsset				= require("awayjs-core/lib/library/IAsset");
import URLRequest			= require("awayjs-core/lib/net/URLRequest");
import ParserBase			= require("awayjs-core/lib/parsers/ParserBase");
import ParserDataFormat		= require("awayjs-core/lib/parsers/ParserDataFormat");
import ResourceDependency	= require("awayjs-core/lib/parsers/ResourceDependency");

class LoaderTest
{
	private alJson:Loader;
	private alImage:Loader;
	private alErrorImage:Loader;

	constructor()
	{
		//---------------------------------------------------------------------------------------------------------------------
		// Enable Custom Parser ( JSON file format with multiple texture dependencies )
		Loader.enableParser(JSONTextureParser);

		//---------------------------------------------------------------------------------------------------------------------
		// LOAD A SINGLE IMAGE

		this.alImage  = new Loader();
		this.alImage.addEventListener(AssetEvent.ASSET_COMPLETE, (event:AssetEvent) => this.onAssetComplete(event));
		this.alImage.addEventListener(AssetEvent.TEXTURE_SIZE_ERROR, (event:AssetEvent) => this.onTextureSizeError(event));
		this.alImage.load(new URLRequest('assets/1024x1024.png'));

		//---------------------------------------------------------------------------------------------------------------------
		// LOAD A SINGLE IMAGE - With wrong dimensions

		this.alErrorImage = new Loader();
		this.alErrorImage.addEventListener(AssetEvent.ASSET_COMPLETE, (event:AssetEvent) => this.onAssetComplete(event));
		this.alErrorImage.addEventListener(AssetEvent.TEXTURE_SIZE_ERROR, (event:AssetEvent) => this.onTextureSizeError(event));
		this.alErrorImage.load(new URLRequest('assets/2.png'));

		//---------------------------------------------------------------------------------------------------------------------
		// LOAD WITH A JSON PARSER

		this.alJson = new Loader();
		this.alJson.addEventListener( AssetEvent.ASSET_COMPLETE, (event:AssetEvent) => this.onAssetComplete(event));
		this.alJson.addEventListener( AssetEvent.TEXTURE_SIZE_ERROR, (event:AssetEvent) => this.onTextureSizeError(event));
		this.alJson.addEventListener( ParserEvent.PARSE_COMPLETE, (event:ParserEvent) => this.onParseComplete(event));
		this.alJson.load(new URLRequest('assets/JSNParserTest.json'));
	}

	public onParseComplete(event:ParserEvent):void
	{
		console.log( '--------------------------------------------------------------------------------');
		console.log( 'LoaderTest.onParseComplete' , event );
		console.log( '--------------------------------------------------------------------------------');
	}

	public onTextureSizeError(event:AssetEvent):void
	{
		var assetLoader:Loader = <Loader> event.target;

		console.log( '--------------------------------------------------------------------------------');
		console.log( 'LoaderTest.onTextureSizeError' , assetLoader.baseDependency._iLoader.url , event );
		console.log( '--------------------------------------------------------------------------------');
	}

	public onAssetComplete(event:AssetEvent):void
	{
		var assetLoader:Loader = <Loader> event.target;

		console.log( '--------------------------------------------------------------------------------');
		console.log( 'LoaderTest.onAssetComplete', assetLoader.baseDependency._iLoader.url , event );
		console.log( '--------------------------------------------------------------------------------');
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

		return false;
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
				break;
			case this.STATE_LOAD_IMAGES:
				break;
			case this.STATE_COMPLETE:
				return ParserBase.PARSING_DONE;
				break;
		}

		return ParserBase.MORE_TO_PARSE;
	}
}