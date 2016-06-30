import {ParserUtils}				from "../parsers/ParserUtils";

export class EventAudioChannel
{
	public static maxChannels:number = 4;

	public static _channels:Array<EventAudioChannel> = new Array<EventAudioChannel>();

	public static _base64Cache:Object = new Object();

	private _isPlaying:boolean = false;
	private _isLooping:boolean = false;
	private _volume:number;
	private _startTime:number = 0;
	private _duration:number;
	
	private _audio:HTMLAudioElement;

	public get duration():number
	{
		return this._duration;
	}

	public get currentTime():number
	{
		return this._audio.currentTime - this._startTime;
	}


	public get volume():number
	{
		return this._volume;
	}

	public set volume(value:number)
	{
		if (this._volume == value)
			return;

		this._volume = value;

		this._audio.volume = this._volume;
	}

	public isPlaying():boolean
	{
		return this._isPlaying;
	}

	public isLooping():boolean
	{
		return this._isLooping;
	}

	public isDecoding():boolean
	{
		return false;
	}

	constructor()
	{
		this._audio = new Audio();
		this._audio.ontimeupdate = (event) => this._onTimeUpdate(event);
	}
	
	public play(buffer:ArrayBuffer, offset:number = 0, loop:boolean = false, id:number = 0):void
	{
		this._isPlaying = true;
		this._isLooping = loop;

		this._audio.src = EventAudioChannel._base64Cache[id] || (EventAudioChannel._base64Cache[id] = ParserUtils.arrayBufferToBase64(buffer, "audio/mp3"));
		this._audio.loop = this._isLooping;

		this._audio.currentTime = offset;
		this._audio.play();
	}

	public stop():void
	{
		this._audio.pause();
		this._isPlaying = false;
		this._isLooping = false;
	}

	private _onTimeUpdate(event):void
	{
		//TODO: more accurate end detection
		if (!this._isLooping && this._duration < this._audio.currentTime - this._startTime + 0.1)
			this.stop();
	}
}