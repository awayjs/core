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
		ba.position = 0;

		/*
		old mp3 detections doesnt seem to work anymore (why doid it work earlier?  i tested multiple mp3 formats...)
		if ((ba.readUnsignedShort() & 0xFFE0) == 0xFFE0) {
			return 'mp3'; // test for MP3 syncword
		}
		*/

		var byte_1:number=ba.readUnsignedByte();
		var byte_2:number=ba.readUnsignedByte();
		var byte_3:number=ba.readUnsignedByte();
		if ((byte_1 === 73 && byte_2 === 68 && byte_3 === 51)
			|| (byte_1 === 255 && byte_2 === 251)){
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