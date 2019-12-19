export class WebAudioChannel
{
	public static maxChannels:number = 64; // for icycle: 128;

	public static _channels:Array<WebAudioChannel> = new Array<WebAudioChannel>();

	public static _decodeCache:Object = new Object();
	public static _errorCache:Object = new Object();

	public static _audioCtx;

	public static getAudioContext()
	{
		if (!WebAudioChannel._audioCtx && (window["AudioContext"] || window["webkitAudioContext"]))
			WebAudioChannel._audioCtx = new (window["AudioContext"] || window["webkitAudioContext"])();
                     
        if(WebAudioChannel._audioCtx && WebAudioChannel._audioCtx.state=="suspended")
            WebAudioChannel._audioCtx.resume();

		return WebAudioChannel._audioCtx;
	}

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
	private _groupID:number = 0;
	private _groupVolume:number = 1;
	private _groupPan:number = 0;
	private _startTime:number = 0;
	private _duration:number;
	public onSoundComplete:Function;

	private _onEndedDelegate : (event:any) => void;

	public static stopAllSounds(channelGroup:number=-1){
		var len: number = WebAudioChannel._channels.length;
		if(channelGroup<0){
			for (var j: number = 0; j < len; j++) {
				WebAudioChannel._channels[j].stop();
			}
			WebAudioChannel._channels.length=0;
			return;
		}
		var aliveChannels:WebAudioChannel[]=[];
		for (var j: number = 0; j < len; j++) {
			if(WebAudioChannel._channels[j].groupID==channelGroup){
				WebAudioChannel._channels[j].stop();
			}
			else{
				aliveChannels[aliveChannels.length]=WebAudioChannel._channels[j];
			}
		}
		WebAudioChannel._channels=aliveChannels;
	}

	public static setChannelGroupVolume(value:number, channelGroup:number=-1){
		var len: number = WebAudioChannel._channels.length;
		if(channelGroup<0){
			for (var j: number = 0; j < len; j++) {
				WebAudioChannel._channels[j].groupVolume=value;
			}
			return;
		}
		for (var j: number = 0; j < len; j++) {
			if(WebAudioChannel._channels[j].groupID==channelGroup){
				WebAudioChannel._channels[j].groupVolume=value;
			}
		}
	}

	public get duration():number
	{
		return this._duration;
	}

	public get currentTime():number
	{
		return this._audioCtx.currentTime - this._startTime;
	}

	public get groupID():number
	{
		return this._groupID;
	}

	public set groupID(value:number)
	{
		this._groupID=value;
	}
	public get groupVolume():number
	{
		return this._groupVolume;
	}

	public set groupVolume(value:number)
	{
		if (this._groupVolume == value)
			return;

		this._groupVolume = value;

		this._gainNode.gain.value = this._groupVolume * this._volume;
	}

	public get groupPan():number
	{
		return this._groupPan;
	}

	public set groupPan(value:number)
	{
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

		this._gainNode.gain.value = this._groupVolume * this._volume;
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

	constructor(groupID:number=0, groupVolume:number=1, groupPan:number=1)
	{
		this._groupID=groupID;
		this._groupVolume=groupVolume;
		this._groupPan=groupPan;

		this._audioCtx = WebAudioChannel.getAudioContext();

		this._usingNativePanner = typeof this._audioCtx.createStereoPanner === 'function';

		this._gainNode = this._audioCtx.createGain();
		this._gainNode.gain.value = this._groupVolume * this._volume;

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
		buffer=buffer.slice(0);
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
		// for AVM1 it is a bug to stop a audio thats currently decoding.
		// when we call stopAllASounds() during audio-decode, this audio should still play
		//if(this._isDecoding){
		//	return;
		//}
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
		this._pan=0;
		this._startTime = this._audioCtx.currentTime - this._currentTime;
		this._source.onended = this._onEndedDelegate;
		try {
			this._gainNode.gain.value = this._groupVolume * this._volume;
			if (this._usingNativePanner)
				this._pannerNode.pan.value = this._pan;
			else
				this._pannerNode.setPosition(Math.sin(this._pan*(Math.PI/2)), 0, Math.cos(this._pan*(Math.PI/2)));
			// TODO: offset / startTime make problem in dino-run game:
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
		if(this.onSoundComplete){
			this.onSoundComplete();
		}
		this.stop();
	}

	private _disposeSource():void
	{
		//clean up
		this._source.onended = null;
		this._source.stop(this._audioCtx.currentTime);
		this._source.disconnect();
		// delete this._source.buffer;
		// delete this._source;
		this._source = null;
	}
}

var audioCtx = WebAudioChannel.getAudioContext();

// context state at this time is `undefined` in iOS8 Safari
if (audioCtx && audioCtx.state === 'suspended') {
	var resume = () => {
		audioCtx.resume();

		//create empty buffer
		var buffer = audioCtx.createBuffer(1, 1, 22050);
		var source = audioCtx.createBufferSource();
		source.buffer = buffer;
		source.connect(audioCtx.destination);
		source.start();

		setTimeout(() => {
			if (audioCtx.state === 'running') {
				document.removeEventListener('touchend', resume, false);
			}
		}, 0);
	};

	document.addEventListener('touchend', resume, false);
}