export class WebAudioChannel
{
	public static maxChannels:number = 64;

	public static _channels:Array<WebAudioChannel> = new Array<WebAudioChannel>();

	public static _decodeCache:Object = new Object();
	public static _errorCache:Object = new Object();

	private static _audioCtx;
	private _audioCtx;
	private _usingNativePanner:boolean;

	private _gainNode;
	private _pannerNode;
	private _source;

	private _isPlaying:boolean = false;
	private _isLooping:boolean = false;
	private _isDecoding:boolean = false;
	private _currentTime:number;
	private _id:number;
	private _volume:number = 1;
	private _pan:number = 0;
	private _startTime:number = 0;
	private _duration:number;

	private _onEndedDelegate : (event:any) => void;

	public static stopAllSounds(){
		var len:number = WebAudioChannel._channels.length;
		for (var j:number = 0; j < len; j++) {
			WebAudioChannel._channels[j].stop();
		}
		WebAudioChannel._channels.length=0;
	}
	public get duration():number
	{
		return this._duration;
	}

	public get currentTime():number
	{
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

	public get pan():number
	{
		return this._pan;
	}

	public set pan(value:number)
	{
		if (this._pan == value)
			return;

		this._pan = value;

		if (this._usingNativePanner)
			this._pannerNode.pan.value = this._pan;
		else
			this._pannerNode.setPosition(Math.sin(this._pan*(Math.PI/2)), 0, Math.cos(this._pan*(Math.PI/2)));
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
		return this._isDecoding;
	}

	constructor()
	{
		this._audioCtx = WebAudioChannel._audioCtx || (WebAudioChannel._audioCtx = new (window["AudioContext"] || window["webkitAudioContext"])());

		this._usingNativePanner = typeof this._audioCtx.createStereoPanner === 'function';

		this._gainNode = this._audioCtx.createGain();
		this._gainNode.gain.value = this._volume;

		this._pannerNode = this._usingNativePanner? this._audioCtx.createStereoPanner() : this._audioCtx.createPanner();

		if (this._usingNativePanner)
			this._pannerNode.pan.value = this._pan;
		else
			this._pannerNode.setPosition(Math.sin(this._pan*(Math.PI/2)), 0, Math.cos(this._pan*(Math.PI/2)));

		this._gainNode.connect(this._pannerNode);
		this._pannerNode.connect(this._audioCtx.destination);


		this._onEndedDelegate = (event) => this._onEnded(event);
	}

	public play(buffer:ArrayBuffer, offset:number = 0, loop:boolean = false, id:number = 0):void
	{
		this._isPlaying = true;
		this._isLooping = loop;

		this._currentTime = offset;

		this._id = id;

		this._isDecoding = true;

		//fast path for short sounds
		if (WebAudioChannel._decodeCache[id])
			this._onDecodeComplete(WebAudioChannel._decodeCache[id]);
		else if (!WebAudioChannel._errorCache[id])
			this._audioCtx.decodeAudioData(buffer, (buffer) => this._onDecodeComplete(buffer), (event) => this._onError(event));
		else
			this.stop();
	}

	public stop():void
	{
		if (!this._isPlaying)
			return;

		this._isPlaying = false;
		this._isLooping = false;
		this._isDecoding = false;

		if (this._source)
			this._disposeSource();
	}

	public _onDecodeComplete(buffer):void
	{
		if (!this._isPlaying)
			return;

		this._isDecoding = false;

		//if (buffer.duration < 2) //cache all buffers?
		WebAudioChannel._decodeCache[this._id] = buffer;

		if (this._source)
			this._disposeSource();

		this._source = this._audioCtx.createBufferSource();

		this._source.loop = this._isLooping;
		this._source.connect(this._gainNode);

		this._source.buffer = buffer;
		this._duration = buffer.duration;

		this._startTime = this._audioCtx.currentTime - this._currentTime;
		this._source.onended = this._onEndedDelegate;
		try {
			this._source.start(this._audioCtx.currentTime, this._currentTime);
		} catch (error) {
			console.log("Error starting audio: " + error);
			this._disposeSource();
		}
	}

	public _onError(event):void
	{
		console.log("Error with decoding audio data");
		WebAudioChannel._errorCache[this._id] = true;
		this.stop();
	}

	private _onEnded(event):void
	{
		this.stop();
	}

	private _disposeSource():void
	{
		//clean up
		this._source.stop(this._audioCtx.currentTime);
		this._source.onended = null;
		this._source.disconnect();
		delete this._source.buffer;
		delete this._source;
		this._source = null;
	}
}