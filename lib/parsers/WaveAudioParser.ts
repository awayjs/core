import WaveAudio				= require("awayjs-core/lib/data/WaveAudio");
import IAsset					= require("awayjs-core/lib/library/IAsset");
import URLLoaderDataFormat		= require("awayjs-core/lib/net/URLLoaderDataFormat");
import ParserBase				= require("awayjs-core/lib/parsers/ParserBase");
import ParserUtils				= require("awayjs-core/lib/parsers/ParserUtils");
import ByteArray				= require("awayjs-core/lib/utils/ByteArray");

class WaveAudioParser extends ParserBase
{
	constructor()
	{
		super(URLLoaderDataFormat.BLOB);
	}

	public static supportsType(extension:string):boolean
	{

		extension = extension.toLowerCase();
		return extension == "wav" || extension == "mp3" || extension == "ogg";

	}

	public static supportsData(data:any):boolean
	{
		if (!(data instanceof ByteArray))
			return false;

		var ba:ByteArray = <ByteArray> data;
		var filetype : string = WaveAudioParser.parseFileType(ba);
		return filetype? true : false;
	}

	public _pStartParsing(frameLimit:number)
	{
		//clear content
		delete this._pContent;
		this._pContent = null;

		super._pStartParsing(frameLimit);
	}

	public _pProceedParsing():boolean
	{
		if (this.data instanceof ByteArray) { // Parse a ByteArray
			this._pContent = new WaveAudio(this.data.arraybytes);
			this._pFinalizeAsset(this._pContent, this._iFileName);
		} else if (this.data instanceof ArrayBuffer) {// Parse an ArrayBuffer
			this._pContent = new WaveAudio(this.data);
			this._pFinalizeAsset(this._pContent, this._iFileName);
		}

		return ParserBase.PARSING_DONE;

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