
class WebAudioChannel
{
	public static maxChannels:number = 32;

	public static _channels:Array<WebAudioChannel> = new Array<WebAudioChannel>();

	private static _audioCtx;
	private _audioCtx;

	private _gainNode;
	private _source;
	
	private _isPlaying:boolean = false;
	private _isLooping:boolean = false;

	private _isDecoded:boolean = false;
	private _currentTime:number;
	private _volume:number = 1;
	private _startTime:number = 0;
	private _duration:number;

	private _onEndedDelegate : (event:any) => void;

	public get duration():number
	{
		return this._duration;
	}

	public get currentTime():number
	{
		if (!this._isPlaying)
			return this._currentTime;

		return this._audioCtx.currentTime - this._startTime;
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

		this._gainNode.gain.value = this._volume;
	}


	public isPlaying():boolean
	{
		return this._isPlaying;
	}

	public isLooping():boolean
	{
		return this._isLooping;
	}

	constructor()
	{
		this._audioCtx = WebAudioChannel._audioCtx || (WebAudioChannel._audioCtx = new (window["AudioContext"] || window["webkitAudioContext"])());
		
		this._gainNode = this._audioCtx.createGain();
		this._gainNode.gain.value = this._volume;

		this._gainNode.connect(this._audioCtx.destination);

		this._onEndedDelegate = (event) => this._onEnded(event);
	}
	
	public play(buffer:ArrayBuffer, offset:number = 0, loop:boolean = false)
	{
		this._isPlaying = true;
		this._isLooping = loop;

		this._currentTime = offset;

		this._isDecoded = false;

		this._audioCtx.decodeAudioData(buffer, (buffer) => this._onDecodeComplete(buffer), (event) => this._onError(event));
	}

	public stop()
	{
		if (!this._isPlaying)
			return;

		this._isPlaying = false;

		if (this._isDecoded) {
			this._currentTime = this._audioCtx.currentTime - this._startTime;
			this._source.stop(this._audioCtx.currentTime);
		}

		if (this._source)
			this._disposeSource();
	}

	public _onDecodeComplete(buffer)
	{
		if (!this._isPlaying)
			return;

		this._isDecoded = true;

		if (this._source)
			this._disposeSource();

		this._source = this._audioCtx.createBufferSource();

		this._source.loop = this._isLooping;
		this._source.connect(this._gainNode);

		this._source.buffer = buffer;
		this._duration = buffer.duration;

		this._startTime = this._audioCtx.currentTime - this._currentTime;
		this._source.addEventListener("ended", this._onEndedDelegate);
		this._source.start(this._audioCtx.currentTime, this._currentTime);
	}

	public _onError(event)
	{
	}

	private _onEnded(event):void
	{
		this.stop();
	}

	private _disposeSource()
	{
		//clean up
		this._source.removeEventListener("ended", this._onEndedDelegate);
		this._source.disconnect();
		delete this._source.buffer;
		delete this._source;
		this._source = null;
	}
}

export = WebAudioChannel;