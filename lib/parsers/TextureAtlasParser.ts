import {Sampler2D}				from "../image/Sampler2D";
import {BitmapImage2D}			from "../image/BitmapImage2D";
import {Rectangle}				from "../geom/Rectangle";
import {IAsset}					from "../library/IAsset";
import {URLLoaderDataFormat}		from "../net/URLLoaderDataFormat";
import {URLRequest}				from "../net/URLRequest";
import {ParserBase}				from "../parsers/ParserBase";
import {ParserUtils}				from "../parsers/ParserUtils";
import {ResourceDependency}		from "../parsers/ResourceDependency";
import {XmlUtils}					from "../utils/XmlUtils";

/**
 * TextureAtlasParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
 * a loader object, it wraps it in a BitmapImage2DResource so resource management can happen consistently without
 * exception cases.
 */
export class TextureAtlasParser extends ParserBase
{
	private _doc:Node;
	private _imagePath:string;
	private _imageData:BitmapImage2D;
	private _subTextureNodes:NodeList;
	private _parseState:number = 0;

	/**
	 * Creates a new TextureAtlasParser object.
	 * @param uri The url or id of the data or file to be parsed.
	 * @param extra The holder for extra contextual data that the parser might need.
	 */
	constructor()
	{
		super(URLLoaderDataFormat.TEXT);
	}

	/**
	 * Indicates whether or not a given file extension is supported by the parser.
	 * @param extension The file extension of a potential file to be parsed.
	 * @return Whether or not the given file type is supported.
	 */

	public static supportsType(extension:string):boolean
	{
		extension = extension.toLowerCase();
		return extension == "xml";
	}

	/**
	 * Tests whether a data block can be parsed by the parser.
	 * @param data The data block to potentially be parsed.
	 * @return Whether or not the given data is supported.
	 */
	public static supportsData(data:any):boolean
	{
		try {
			var content:string = ParserUtils.toString(data);
			if(content.indexOf("TextureAtlas") != -1 || content.indexOf("textureatlas") != -1)
				return true;

			return false;
		} catch (e) {
			return false;
		}
	}

	/**
	 * @inheritDoc
	 */
	public _iResolveDependency(resourceDependency:ResourceDependency):void
	{
		if(resourceDependency.assets.length) {
			this._imageData = <BitmapImage2D> resourceDependency.assets[0];
			this._pFinalizeAsset(this._imageData);
			this._parseState = TextureAtlasParserState.PARSE_SUBTEXTURES;
		} else {
			this._parseState = TextureAtlasParserState.PARSE_COMPLETE;
		}
	}

	/**
	 * @inheritDoc
	 */
	public _iResolveDependencyFailure(resourceDependency:ResourceDependency):void
	{
		this._parseState = TextureAtlasParserState.PARSE_COMPLETE;
	}

	/**
	 * @inheritDoc
	 */
	public _pProceedParsing():boolean
	{
		var nodes:NodeList;

		switch(this._parseState) {
			case TextureAtlasParserState.PARSE_XML:
				try {
					this._doc = XmlUtils.getChildrenWithTag(XmlUtils.strToXml(this._pGetTextData()), "TextureAtlas")[0];

					this._imagePath = XmlUtils.readAttributeValue(this._doc, "imagePath");

					this._subTextureNodes = XmlUtils.getChildrenWithTag(this._doc, "SubTexture");

					this._parseState = TextureAtlasParserState.PARSE_IMAGE;

				} catch(Error) {
					return ParserBase.PARSING_DONE;
				}
				break;

			case TextureAtlasParserState.PARSE_IMAGE:
				if (this._imagePath){
					this._pAddDependency(this._imagePath, new URLRequest(this._imagePath));
					this._pPauseAndRetrieveDependencies();
				} else {
					return ParserBase.PARSING_DONE;
				}

				break;

			case TextureAtlasParserState.PARSE_SUBTEXTURES:
				var sampler:Sampler2D;
				var element:Node;
				var x:string;
				var y:string;
				var width:string;
				var height:string;
				var len:number = this._subTextureNodes.length;
				for (var i:number = 0; i < len; i++) {
					element = this._subTextureNodes[i];
					sampler = new Sampler2D();

					//setup subtexture rect
					x = XmlUtils.readAttributeValue(element, "x");
					y = XmlUtils.readAttributeValue(element, "y");
					width = XmlUtils.readAttributeValue(element, "width");
					height = XmlUtils.readAttributeValue(element, "height");
					if (x || y || width || height)
						sampler.imageRect = new Rectangle(parseInt(x)/this._imageData.width, parseInt(y)/this._imageData.height, parseInt(width)/this._imageData.width, parseInt(height)/this._imageData.height);

					//setup frame rect
					x = XmlUtils.readAttributeValue(element, "frameX");
					y = XmlUtils.readAttributeValue(element, "frameY");
					width = XmlUtils.readAttributeValue(element, "frameWidth");
					height = XmlUtils.readAttributeValue(element, "frameHeight");
					if (x || y || width || height)
						sampler.frameRect = new Rectangle(parseInt(x), parseInt(y), parseInt(width), parseInt(height));

					this._pFinalizeAsset(sampler, XmlUtils.readAttributeValue(element, "name"));
				}

				this._parseState = TextureAtlasParserState.PARSE_COMPLETE;

				break;

			case TextureAtlasParserState.PARSE_COMPLETE:
				return ParserBase.PARSING_DONE;
		}

		return ParserBase.MORE_TO_PARSE;
	}
}

export class TextureAtlasParserState {
	public static PARSE_XML:number = 0;
	public static PARSE_IMAGE:number = 1;
	public static PARSE_SUBTEXTURES:number = 2;
	public static PARSE_COMPLETE:number = 3;
}