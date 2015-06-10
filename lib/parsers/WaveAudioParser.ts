import WaveAudio				= require("awayjs-core/lib/data/WaveAudio");
import IAsset					= require("awayjs-core/lib/library/IAsset");
import URLLoaderDataFormat		= require("awayjs-core/lib/net/URLLoaderDataFormat");
import ParserBase				= require("awayjs-core/lib/parsers/ParserBase");
import ParserUtils				= require("awayjs-core/lib/parsers/ParserUtils");
import ByteArray				= require("awayjs-core/lib/utils/ByteArray");

class WaveAudioParser extends ParserBase
{
	private _loadingImage:boolean;
	private _htmlAudioElement:HTMLAudioElement;

	constructor()
	{
		super(URLLoaderDataFormat.BLOB);
	}

	public static supportsType(extension:string):boolean
	{

		extension = extension.toLowerCase();
		return extension == "wav" || extension == "mp3" || extension == "ogg";//|| extension == "bmp";//|| extension == "atf";

	}

	public static supportsData(data:any):boolean
	{

		if (data instanceof HTMLAudioElement)
			return true;

		if (!(data instanceof ByteArray))
			return false;

		var ba:ByteArray = <ByteArray> data;
		var filetype : string = WaveAudioParser.parseFileType(ba);
		return filetype? true : false;

	}

	public _pProceedParsing():boolean
	{

		var asset:WaveAudio;

		if (this._loadingImage) {
			return ParserBase.MORE_TO_PARSE;
		}
		else if (this._htmlAudioElement) {
			asset = ParserUtils.audioToWaveAudio(this._htmlAudioElement);
			this._pFinalizeAsset(<IAsset> asset, this._iFileName);
		}
		else if (this.data instanceof HTMLAudioElement) {// Parse HTMLImageElement
			var htmlAudioElement:HTMLAudioElement = <HTMLAudioElement> this.data;
			asset = ParserUtils.audioToWaveAudio(htmlAudioElement);
			this._pFinalizeAsset(<IAsset> asset, this._iFileName);
		}
		else if (this.data instanceof ByteArray) { // Parse a ByteArray
			var ba:ByteArray = this.data;
			var filetype = WaveAudioParser.parseFileType(ba);
			var htmlAudioElement:HTMLAudioElement = ParserUtils.byteArrayToAudio(ba, filetype);
			asset = ParserUtils.audioToWaveAudio(htmlAudioElement);
			this._pFinalizeAsset(<IAsset> asset, this._iFileName);
		}
		else if (this.data instanceof ArrayBuffer) {// Parse an ArrayBuffer
			var filetype = WaveAudioParser.parseFileType(this.data.arraybytes);
			this._htmlAudioElement = ParserUtils.arrayBufferToAudio(this.data, filetype);

			asset = ParserUtils.audioToWaveAudio(this._htmlAudioElement);
			this._pFinalizeAsset(<IAsset> asset, this._iFileName);

		}
		else if (this.data instanceof Blob) { // Parse a Blob

			this._htmlAudioElement = ParserUtils.blobToAudio(this.data);

			this._htmlAudioElement.onload = (event) => this.onLoadComplete(event);
			this._loadingImage = true;

			return ParserBase.MORE_TO_PARSE;
		}

		this._pContent = asset;

		return ParserBase.PARSING_DONE;

	}

	public onLoadComplete(event)
	{
		this._loadingImage = false;
	}

	private static parseFileType(ba:ByteArray):string
	{
		ba.position = 0;

		ba.position = 0;
		if (ba.readUnsignedShort() & 0xFFE0) {
			return 'mp3'; // test for MP3 syncword
		}

		ba.position = 0;
		if (ba.readUTFBytes(4) == 'RIFF')
			return 'wav';

		ba.position = 0;
		if (ba.readUTFBytes(4) == 'OggS')
			return 'ogg';

		ba.position = 0;

		return null;
	}
}

export = WaveAudioParser;