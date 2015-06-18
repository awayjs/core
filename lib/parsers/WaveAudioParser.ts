import WaveAudio				= require("awayjs-core/lib/data/WaveAudio");
import IAsset					= require("awayjs-core/lib/library/IAsset");
import URLLoaderDataFormat		= require("awayjs-core/lib/net/URLLoaderDataFormat");
import ParserBase				= require("awayjs-core/lib/parsers/ParserBase");
import ParserUtils				= require("awayjs-core/lib/parsers/ParserUtils");
import ByteArray				= require("awayjs-core/lib/utils/ByteArray");

class WaveAudioParser extends ParserBase
{
	private _noAudio:boolean;

	private static _audioCtx;

	constructor()
	{
		super(URLLoaderDataFormat.BLOB);
	}

	public static getAudioContext()
	{
		var audioCtx = this._audioCtx || (this._audioCtx = new (window["AudioContext"] || window["webkitAudioContext"])());

		audioCtx.sampleRate = 22050;

		return audioCtx;
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
		this._noAudio = false;

		super._pStartParsing(frameLimit);
	}

	public _pProceedParsing():boolean
	{
		if (this._noAudio || this._pContent) {
			return ParserBase.PARSING_DONE;
		} else  if (this.data instanceof ByteArray) { // Parse a ByteArray
			this._pContent = new WaveAudio(this.data.arraybytes, WaveAudioParser.getAudioContext());
			this._pFinalizeAsset(this._pContent, this._iFileName);
		} else if (this.data instanceof ArrayBuffer) {// Parse an ArrayBuffer
			this._pContent = new WaveAudio(this.data, WaveAudioParser.getAudioContext());
			this._pFinalizeAsset(this._pContent, this._iFileName);
		}

		return ParserBase.PARSING_DONE;

	}

	public onLoadComplete(buffer)
	{
		this._pContent = new WaveAudio(buffer, WaveAudioParser.getAudioContext());
		this._pFinalizeAsset(this._pContent, this._iFileName);
		this._iResumeParsing();
	}

	public onError(event)
	{
		this._noAudio = true;
		this._iResumeParsing();
	}
	//
	//private _decodeData()
	//{
	//	WaveAudioParser.getAudioContext().decodeAudioData(this._buffer, (buffer) => this.onLoadComplete(buffer), (event) => this.onError(event));
	//
	//}
	//
	//private _syncStream():boolean
	//{
	//	var b = new Uint8Array(this._buffer);
	//	b["indexOf"] = Array.prototype.indexOf;
	//
	//	var i:number = 1;
	//	while(1) {
	//		i = b["indexOf"](0xFF, i);
	//
	//		if (i == -1 || (b[i+1] & 0xE0) == 0xE0)
	//			break;
	//
	//		i++;
	//	}
	//
	//	if (i != -1) {
	//		var temp = this._buffer.slice(i);
	//		delete(this._buffer);
	//		this._buffer = temp;
	//		return true;
	//	}
	//
	//	return false;
	//}

	//public _pProceedParsing():boolean
	//{
	//
	//	var asset:WaveAudio;
	//
	//	if (this._loadingImage) {
	//		return ParserBase.MORE_TO_PARSE;
	//	}
	//	else if (this._htmlAudioElement) {
	//		asset = ParserUtils.audioToWaveAudio(this._htmlAudioElement);
	//		this._pFinalizeAsset(<IAsset> asset, this._iFileName);
	//	}
	//	else if (this.data instanceof HTMLAudioElement) {// Parse HTMLImageElement
	//		var htmlAudioElement:HTMLAudioElement = <HTMLAudioElement> this.data;
	//		asset = ParserUtils.audioToWaveAudio(htmlAudioElement);
	//		this._pFinalizeAsset(<IAsset> asset, this._iFileName);
	//	}
	//	else if (this.data instanceof ByteArray) { // Parse a ByteArray
	//		var ba:ByteArray = this.data;
	//		var filetype = WaveAudioParser.parseFileType(ba);
	//		var htmlAudioElement:HTMLAudioElement = ParserUtils.byteArrayToAudio(ba, filetype);
	//		asset = ParserUtils.audioToWaveAudio(htmlAudioElement);
	//		this._pFinalizeAsset(<IAsset> asset, this._iFileName);
	//	}
	//	else if (this.data instanceof ArrayBuffer) {// Parse an ArrayBuffer
	//		var filetype = WaveAudioParser.parseFileType(this.data.arraybytes);
	//		this._htmlAudioElement = ParserUtils.arrayBufferToAudio(this.data, filetype);
	//
	//		asset = ParserUtils.audioToWaveAudio(this._htmlAudioElement);
	//		this._pFinalizeAsset(<IAsset> asset, this._iFileName);
	//
	//	}
	//	else if (this.data instanceof Blob) { // Parse a Blob
	//
	//		this._htmlAudioElement = ParserUtils.blobToAudio(this.data);
	//
	//		this._htmlAudioElement.onloadeddata = (event) => this.onLoadComplete(event);
	//		this._htmlAudioElement.onerror = (event) => this.onError(event);
	//		this._loadingImage = true;
	//
	//		return ParserBase.MORE_TO_PARSE;
	//	}
	//
	//	this._pContent = asset;
	//
	//	return ParserBase.PARSING_DONE;
	//
	//}
	//
	//public onLoadComplete(event)
	//{
	//	this._loadingImage = false;
	//}
	//
	//public onError(event)
	//{
	//	console.log(event.target.error);
	//	this._loadingImage = false;
	//}

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