import {BitmapImage2D}			from "../image/BitmapImage2D";
import {WaveAudio}				from "../audio/WaveAudio";
import {ByteArray}				from "../utils/ByteArray";

export class ParserUtils
{
	public static arrayBufferToBase64(data:ArrayBuffer, mimeType:string):string
	{
		var byteStr:string = '';
		var bytes:Uint8Array = new Uint8Array(data);
		var len:number = bytes.byteLength;

		for (var i = 0; i < len; i++)
			byteStr += String.fromCharCode(bytes[ i ])

		var base64Image:string = window.btoa(byteStr);
		return 'data:' + mimeType + ';base64,' + base64Image;
	}

	public static arrayBufferToAudio(data:ArrayBuffer, fileType:string):HTMLAudioElement
	{
		var str:string = ParserUtils.arrayBufferToBase64(data, 'audio/' + fileType);
		var audio:HTMLAudioElement = <HTMLAudioElement> new Audio();
		audio.src = str;
		return audio;
	}

	/**
	 * Converts an ArrayBuffer to a base64 string
	 *
	 * @param image data as a ByteArray
	 *
	 * @return HTMLImageElement
	 *
	 */
	public static arrayBufferToImage(data:ArrayBuffer):HTMLImageElement
	{
		var str:string = ParserUtils.arrayBufferToBase64(data, 'image/png');
		var img:HTMLImageElement = <HTMLImageElement> new Image();
		img.src = str;
		return img;
	}

	/**
	 * Converts an ByteArray to an Image - returns an HTMLImageElement
	 *
	 * @param image data as a ByteArray
	 *
	 * @return HTMLImageElement
	 *
	 */
	public static byteArrayToImage(data:ByteArray):HTMLImageElement
	{
		var str:string = ParserUtils.arrayBufferToBase64(data.arraybytes, 'image/png');
		var img:HTMLImageElement = <HTMLImageElement> new Image();
		img.src = str;
		return img;
	}

	public static byteArrayToAudio(data:ByteArray, filetype:string):HTMLAudioElement
	{
		var str:string = ParserUtils.arrayBufferToBase64(data.arraybytes, 'audio/' + filetype);
		var audio:HTMLAudioElement = <HTMLAudioElement> new Audio();
		audio.src = str;
		return audio;
	}

	/**
	 * Converts an Blob to an Image - returns an HTMLImageElement
	 *
	 * @param image data as a Blob
	 *
	 * @return HTMLImageElement
	 *
	 */
	public static blobToImage(data:Blob):HTMLImageElement
	{
		var URLObj = window['URL'] || window['webkitURL'];
		var src = URLObj.createObjectURL(data);
		var img:HTMLImageElement = <HTMLImageElement> new Image();
		img.src = src;
		return img;
	}

	/**
	 * Converts an Blob to audio - returns an HTMLAudioElement
	 *
	 * @param audio data as a Blob
	 *
	 * @return HTMLAudioElement
	 *
	 */
	public static blobToAudio(data:Blob):HTMLAudioElement
	{
		var URLObj = window['URL'] || window['webkitURL'];
		var src = URLObj.createObjectURL(data);
		var img:HTMLAudioElement = <HTMLAudioElement> new Audio();
		img.src = src;
		return img;
	}

	/**
	 *
	 */
	public static imageToBitmapImage2D(img:HTMLImageElement, powerOfTwo:boolean = true):BitmapImage2D
	{
		var bitmapData:BitmapImage2D = new BitmapImage2D(img.width, img.height, true, null, powerOfTwo);
		bitmapData.draw(img);

		return bitmapData;
	}

	/**
	 * Returns a object as ByteArray, if possible.
	 *
	 * @param data The object to return as ByteArray
	 *
	 * @return The ByteArray or null
	 *
	 */
	public static toByteArray(data:any):ByteArray
	{
		var b:ByteArray = new ByteArray();
		b.setArrayBuffer(data);
		return b;
	}

	/**
	 * Returns a object as String, if possible.
	 *
	 * @param data The object to return as String
	 * @param length The length of the returned String
	 *
	 * @return The String or null
	 *
	 */
	public static toString(data:any, length:number = 0):string
	{

		if (typeof data === 'string') {
			var s:string = <string> data;

			if (s['substr'] != null)
				return s.substr(0, s.length);
		}

		if (data instanceof ByteArray) {
			var ba:ByteArray = <ByteArray> data;
			ba.position = 0;
			return ba.readUTFBytes(Math.min(ba.getBytesAvailable(), length));
		}

		return null;

		/*
		 var ba:ByteArray;

		 length ||= uint.MAX_VALUE;

		 if (data is String)
		 return String(data).substr(0, length);

		 ba = toByteArray(data);
		 if (ba) {
		 ba.position = 0;
		 return ba.readUTFBytes(Math.min(ba.bytesAvailable, length));
		 }

		 return null;

		 */

	}
}