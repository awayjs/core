
export class AudioChannel
{
	public static maxChannels:number = 16;

	public static _channels:Array<AudioChannel> = new Array<AudioChannel>();

	private _isPlaying:boolean = false;
	private _isLooping:boolean = false;

	private static _audioCtx;
	private _audioCtx;

	private _gainNode;

	private _audio:HTMLAudioElement;

	public get currentTime():number
	{
		return this._audio.currentTime;
	}


	public get volume():number
	{
		return this._gainNode.gain.value;
	}

	public set volume(value:number)
	{
		this._gainNode.gain.value = value;
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
		this._audioCtx = AudioChannel._audioCtx || (AudioChannel._audioCtx = new (window["AudioContext"] || window["webkitAudioContext"])());

		this._gainNode = this._audioCtx.createGain();
		this._gainNode = this._audioCtx.createGain();
		this._gainNode.connect(this._audioCtx.destination);

		this._audio = new Audio();
		this._audio.onended = (event) => this._onEnded(event);
		this._audio["crossOrigin"] = "anonymous";

		var source = this._audioCtx.createMediaElementSource(this._audio);
		source.connect(this._gainNode);
	}
	
	public play(url:string, offset:number = 0, loop:boolean = false):void
	{
		this._isPlaying = true;
		this._isLooping = loop;

		this._audio.src = url;
		this._audio.loop = loop;
		this._audio.currentTime = offset;
		this._audio.play();
	}

	public stop():void
	{
		this._audio.pause();
		this._isPlaying = false;
		this._isLooping = false;
	}

	private _onEnded(event):void
	{
		this.stop();
	}
}