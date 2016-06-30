import {WaveAudio}				from "../audio/WaveAudio";
import {IAsset}					from "../library/IAsset";
import {URLLoaderDataFormat}		from "../net/URLLoaderDataFormat";
import {ParserBase}				from "../parsers/ParserBase";
import {ParserUtils}				from "../parsers/ParserUtils";
import {ByteArray}				from "../utils/ByteArray";

export class WaveAudioParser extends ParserBase
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

	public _pStartParsing(frameLimit:number):void
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


		//old mp3 detections
		// This does not seem to work for all my mp3 files (i tested different mp3 encoders)
		// I leave it in, because it might work for mp3 data that i do not have here to test
		ba.position = 0;
		if ((ba.readUnsignedShort() & 0xFFE0) == 0xFFE0) {
			return 'mp3'; // test for MP3 syncword
		}

		// new mp3 detection
		// this from is-mp3 npm module,
		// but still i have mp3 files that are not detected by this
		// i added the hack: (byte_1 === 255 && byte_2 === 243 && byte_3 === 130) 	to catch those mp3s
		// todo: find a more foolproof way to detect al mp3 (my hack might collide with detection for other filetypes)
		ba.position = 0;
		var byte_1:number=ba.readUnsignedByte();
		var byte_2:number=ba.readUnsignedByte();
		var byte_3:number=ba.readUnsignedByte();
		if ((byte_1 === 73 && byte_2 === 68 && byte_3 === 51)
			|| (byte_1 === 255 && byte_2 === 251)
			|| (byte_1 === 255 && byte_2 === 243 && byte_3 === 130)){
			return 'mp3';
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