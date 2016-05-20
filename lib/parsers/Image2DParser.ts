import {BitmapImage2D}			from "../image/BitmapImage2D";
import {IAsset}					from "../library/IAsset";
import {URLLoaderDataFormat}		from "../net/URLLoaderDataFormat";
import {ParserBase}				from "../parsers/ParserBase";
import {ParserUtils}				from "../parsers/ParserUtils";
import {ByteArray}				from "../utils/ByteArray";

/**
 * Image2DParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
 * a loader object, it wraps it in a BitmapDataResource so resource management can happen consistently without
 * exception cases.
 */
export class Image2DParser extends ParserBase
{
	private _startedParsing:boolean;
	private _doneParsing:boolean;
	private _loadingImage:boolean;
	private _htmlImageElement:HTMLImageElement;

	/**
	 * Creates a new Image2DParser object.
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

		if (ba.readUnsignedShort() == 0xd8ff)
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

		var asset:BitmapImage2D;
		var sizeError:boolean = false;

		if (this._loadingImage) {
			return ParserBase.MORE_TO_PARSE;
		} else if (this._htmlImageElement) {
			//if (ImageUtils.isHTMLImageElementValid(this._htmlImageElement)) {
				asset = ParserUtils.imageToBitmapImage2D(this._htmlImageElement, false);
				this._pFinalizeAsset(<IAsset> asset, this._iFileName);
			//}
		} else if (this.data instanceof HTMLImageElement) {// Parse HTMLImageElement
			var htmlImageElement:HTMLImageElement = <HTMLImageElement> this.data;
			//if (ImageUtils.isHTMLImageElementValid(htmlImageElement)) {

				asset = ParserUtils.imageToBitmapImage2D(htmlImageElement, false);
				this._pFinalizeAsset(<IAsset> asset, this._iFileName);
			//} else {
			//	sizeError = true;
			//}

		} else if (this.data instanceof ByteArray) { // Parse a ByteArray

			var ba:ByteArray = this.data;
			ba.position = 0;
			this._htmlImageElement = ParserUtils.byteArrayToImage(this.data);

			if (!this._htmlImageElement.complete) {
				this._htmlImageElement.onload = (event) => this.onLoadComplete(event);
				this._loadingImage = true;

				return ParserBase.MORE_TO_PARSE;
			}

			//if (ImageUtils.isHTMLImageElementValid(this._htmlImageElement)) {
				asset = ParserUtils.imageToBitmapImage2D(this._htmlImageElement, false);
				this._pFinalizeAsset(<IAsset> asset, this._iFileName);
			//} else {
			//	sizeError = true;
			//
			//}

		} else if (this.data instanceof ArrayBuffer) {// Parse an ArrayBuffer

			this._htmlImageElement = ParserUtils.arrayBufferToImage(this.data);

			asset = ParserUtils.imageToBitmapImage2D(this._htmlImageElement, false);
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

		this._pContent = asset;

		return ParserBase.PARSING_DONE;

	}

	public onLoadComplete(event):void
	{
		this._loadingImage = false;
	}
}