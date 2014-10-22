import IAsset					= require("awayjs-core/lib/core/library/IAsset");
import URLLoaderDataFormat		= require("awayjs-core/lib/core/net/URLLoaderDataFormat");
import Billboard				= require("awayjs-core/lib/entities/Billboard");
import CSSMaterialBase			= require("awayjs-core/lib/materials/CSSMaterialBase");
import ParserBase				= require("awayjs-core/lib/parsers/ParserBase");
import ParserUtils				= require("awayjs-core/lib/parsers/ParserUtils");
import ImageTexture				= require("awayjs-core/lib/textures/ImageTexture");
import Texture2DBase			= require("awayjs-core/lib/textures/Texture2DBase");
import ByteArray				= require("awayjs-core/lib/utils/ByteArray");
import TextureUtils				= require("awayjs-core/lib/utils/TextureUtils");

/**
 * Texture2DParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
 * a loader object, it wraps it in a BitmapDataResource so resource management can happen consistently without
 * exception cases.
 */
class Texture2DParser extends ParserBase
{
	private _startedParsing:boolean;
	private _doneParsing:boolean;
	private _loadingImage:boolean;
	private _htmlImageElement:HTMLImageElement;

	/**
	 * Creates a new Texture2DParser object.
	 * @param uri The url or id of the data or file to be parsed.
	 * @param extra The holder for extra contextual data that the parser might need.
	 */
	constructor()
	{
		super(URLLoaderDataFormat.BLOB);
	}

	/**
	 * Indicates whether or not a given file extension is supported by the parser.
	 * @param extension The file extension of a potential file to be parsed.
	 * @return Whether or not the given file type is supported.
	 */
	public static supportsType(extension:string):boolean
	{

		extension = extension.toLowerCase();
		return extension == "jpg" || extension == "jpeg" || extension == "png" || extension == "gif";//|| extension == "bmp";//|| extension == "atf";

	}

	/**
	 * Tests whether a data block can be parsed by the parser.
	 * @param data The data block to potentially be parsed.
	 * @return Whether or not the given data is supported.
	 */
	public static supportsData(data:any):boolean
	{

		if (data  instanceof HTMLImageElement)
			return true;

		if (!(data instanceof ByteArray))
			return false;

		var ba:ByteArray = <ByteArray> data;
		ba.position = 0;

		if (ba.readUnsignedShort() == 0xffd8)
			return true; // JPEG, maybe check for "JFIF" as well?

		ba.position = 0;
		if (ba.readShort() == 0x424D)
			return true; // BMP

		ba.position = 1;
		if (ba.readUTFBytes(3) == 'PNG')
			return true;

		ba.position = 0;
		if (ba.readUTFBytes(3) == 'GIF' && ba.readShort() == 0x3839 && ba.readByte() == 0x61)
			return true;

		ba.position = 0;
		if (ba.readUTFBytes(3) == 'ATF')
			return true;

		return false;

	}

	/**
	 * @inheritDoc
	 */
	public _pProceedParsing():boolean
	{

		var asset:Texture2DBase;
		var sizeError:boolean = false;

		if (this._loadingImage) {
			return ParserBase.MORE_TO_PARSE;
		} else if (this._htmlImageElement) {
			if (TextureUtils.isHTMLImageElementValid(this._htmlImageElement)) {
				asset = new ImageTexture(this._htmlImageElement);
				this._pFinalizeAsset(<IAsset> asset, this._iFileName);
			}
		} else if (this.data instanceof HTMLImageElement) {// Parse HTMLImageElement

			if (TextureUtils.isHTMLImageElementValid(<HTMLImageElement> this.data)) {
				asset = new ImageTexture(<HTMLImageElement> this.data);
				this._pFinalizeAsset(<IAsset> asset, this._iFileName);
			} else {
				sizeError = true;
			}

		} else if (this.data instanceof ByteArray) { // Parse a ByteArray

			var ba:ByteArray = this.data;
			ba.position = 0;
			var htmlImageElement:HTMLImageElement = ParserUtils.byteArrayToImage(this.data);

			if (TextureUtils.isHTMLImageElementValid(htmlImageElement)) {
				asset = new ImageTexture(htmlImageElement);
				this._pFinalizeAsset(<IAsset> asset, this._iFileName);
			} else {
				sizeError = true;
			}

		} else if (this.data instanceof ArrayBuffer) {// Parse an ArrayBuffer

			this._htmlImageElement = ParserUtils.arrayBufferToImage(this.data);

			asset = new ImageTexture(this._htmlImageElement);
			this._pFinalizeAsset(<IAsset> asset, this._iFileName);

		} else if (this.data instanceof Blob) { // Parse a Blob

			this._htmlImageElement = ParserUtils.blobToImage(this.data);

			this._htmlImageElement.onload = (event) => this.onLoadComplete(event);
			this._loadingImage = true;

			return ParserBase.MORE_TO_PARSE;
		}

		if (sizeError == true) // Generate new Checkerboard texture material
		{
//				asset = new BitmapTexture(DefaultMaterialManager.createCheckeredBitmapData(), false);
//				this._pFinalizeAsset(<IAsset> asset, this._iFileName);
//				this.dispatchEvent(new away.events.AssetEvent(away.events.AssetEvent.TEXTURE_SIZE_ERROR, <IAsset> asset));
		}

		this._pContent = new Billboard(new CSSMaterialBase(asset));

		return ParserBase.PARSING_DONE;

	}

	public onLoadComplete(event)
	{
		this._loadingImage = false;
	}
}

export = Texture2DParser;