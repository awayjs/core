export class WebAudioChannel {
	public static maxChannels: number = 64; // for icycle: 128;

	public static _channels: Array<WebAudioChannel> = new Array<WebAudioChannel>();

	public static _decodeCache: Object = new Object();
	public static _errorCache: Object = new Object();
	public static _audioCtx: AudioContext;

	public static getAudioContext() {
		if (!WebAudioChannel._audioCtx && (window['AudioContext'] || window['webkitAudioContext']))
			WebAudioChannel._audioCtx = new (window['AudioContext'] || window['webkitAudioContext'])();

		if (WebAudioChannel._audioCtx && WebAudioChannel._audioCtx.state == 'suspended')
			WebAudioChannel._audioCtx.resume();

		return WebAudioChannel._audioCtx;
	}

	private _audioCtx: AudioContext;
	private _usingNativePanner: boolean;

	private _gainNode: GainNode;
	private _pannerNode: PannerNode | StereoPannerNode;
	private _source: AudioBufferSourceNode;

	private _isPlaying: boolean = false;
	private _isLooping: boolean = false;
	private _isDecoding: boolean = false;
	private _currentTime: number;
	private _id: number;
	private _volume: number = 1;
	private _pan: number = -1;
	private _groupID: number = 0;
	private _groupVolume: number = 1;
	private _groupPan: number = 0;
	private _startTime: number = 0;
	private _duration: number;
	public onSoundComplete: Function;

	private _onEndedDelegate: (event: any) => void;

	public static stopAllSounds(channelGroup: number = -1) {
		const len: number = WebAudioChannel._channels.length;
		if (channelGroup < 0) {
			for (let j: number = 0; j < len; j++) {
				WebAudioChannel._channels[j].stop();
			}
			WebAudioChannel._channels.length = 0;
			return;
		}
		const aliveChannels: WebAudioChannel[] = [];
		for (let j: number = 0; j < len; j++) {
			if (WebAudioChannel._channels[j].groupID == channelGroup) {
				WebAudioChannel._channels[j].stop();
			} else {
				aliveChannels[aliveChannels.length] = WebAudioChannel._channels[j];
			}
		}
		WebAudioChannel._channels = aliveChannels;
	}

	public static setChannelGroupVolume(value: number, channelGroup: number = -1) {
		const len: number = WebAudioChannel._channels.length;
		if (channelGroup < 0) {
			for (let j: number = 0; j < len; j++) {
				WebAudioChannel._channels[j].groupVolume = value;
			}
			return;
		}
		for (let j: number = 0; j < len; j++) {
			if (WebAudioChannel._channels[j].groupID == channelGroup) {
				WebAudioChannel._channels[j].groupVolume = value;
			}
		}
	}

	public get duration(): number {
		return this._duration;
	}

	public get currentTime(): number {
		if (this._isDecoding) {
			return this._currentTime;
		}
		return this._audioCtx.currentTime - this._startTime;
	}

	public get groupID(): number {
		return this._groupID;
	}

	public set groupID(value: number) {
		this._groupID = value;
	}

	public get groupVolume(): number {
		return this._groupVolume;
	}

	public set groupVolume(value: number) {
		if (this._groupVolume == value)
			return;

		this._groupVolume = value;

		this._gainNode.gain.value = this._groupVolume * this._volume;
	}

	public get groupPan(): number {
		return this._groupPan;
	}

	public set groupPan(value: number) {
	}

	public get volume(): number {
		return this._volume;
	}

	public set volume(value: number) {
		if (this._volume == value)
			return;

		this._volume = value;

		this._gainNode.gain.value = this._groupVolume * this._volume;
	}

	public get pan(): number {
		return this._pan;
	}

	public set pan(value: number) {
		if (this._pan == value)
			return;

		this._pan = value;

		if (this._pannerNode instanceof window.StereoPannerNode) {
			this._pannerNode.pan.value = this._pan;
		} else {
			const pan = this._pan * (Math.PI / 2);
			this._pannerNode.setPosition(Math.sin(pan), 0,Math.cos(pan));
		}
	}

	public isPlaying(): boolean {
		return this._isPlaying;
	}

	public isLooping(): boolean {
		return this._isLooping;
	}

	public isDecoding(): boolean {
		return this._isDecoding;
	}

	constructor(groupID: number = 0, groupVolume: number = 1, groupPan: number = 1) {
		this._groupID = groupID;
		this._groupVolume = groupVolume;
		this._groupPan = groupPan;

		this._audioCtx = WebAudioChannel.getAudioContext();

		this._usingNativePanner = typeof this._audioCtx.createStereoPanner === 'function';

		this._gainNode = this._audioCtx.createGain();
		this._gainNode.gain.value = this._groupVolume * this._volume;

		this._pannerNode = this._usingNativePanner ?
			this._audioCtx.createStereoPanner() :
			this._audioCtx.createPanner();

		this.pan = 0;

		this._gainNode.connect(this._pannerNode);
		this._pannerNode.connect(this._audioCtx.destination);

		this._onEndedDelegate = (event) => this._onEnded(event);
	}

	public play(buffer: ArrayBuffer, offset: number = 0, loop: boolean = false, id: number = 0): void {
		this._isPlaying = true;
		this._isLooping = loop;

		if (buffer.byteLength === 0) {
			console.warn('[WabAudioChannel] Input buffer is empty');
			return;
		}

		this._currentTime = offset;
		//console.log("play with offset time", offset)
		this._id = id;

		this._isDecoding = true;
		buffer = buffer.slice(0);
		//fast path for short sounds
		if (WebAudioChannel._decodeCache[id]) {
			this._onDecodeComplete(WebAudioChannel._decodeCache[id]);
		} else if (!WebAudioChannel._errorCache[id]) {
			try {
				this._audioCtx.decodeAudioData(
					buffer,
					(buffer) => this._onDecodeComplete(buffer),
					(event) => this._onError(event)
				);
			} catch (e) {
				this._onError(e);
			}
		} else {
			this.stop();
		}
	}

	public stop(): void {
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

	public _onDecodeComplete(buffer: AudioBuffer): void {
		if (!this._isPlaying)
			return;

		this._isDecoding = false;

		if (this._source)
			this._disposeSource();

		//if (buffer.duration < 2) //cache all buffers?
		WebAudioChannel._decodeCache[this._id] = buffer;

		this._source = this._audioCtx.createBufferSource();

		this._source.loop = this._isLooping;
		this._source.connect(this._gainNode);

		this._source.buffer = buffer;
		this._duration = buffer.duration;
		this._pan = 0;
		this._startTime = this._audioCtx.currentTime - this._currentTime;
		this._source.onended = this._onEndedDelegate;

		try {
			// retrig setter by reset cache
			const vol = this._groupVolume;
			const pan = this._pan;

			this._groupVolume = -1;
			this._pan = -1;

			this.groupVolume = vol;
			this.pan = pan;

			// TODO: offset / startTime make problem in dino-run game:
			this._source.start(this._audioCtx.currentTime, this._currentTime);
		} catch (error) {
			console.log('Error starting audio: ' + error);
			this._disposeSource();
		}
	}

	public _onError(_event: any): void {
		console.log('Error with decoding audio data:', _event);
		WebAudioChannel._errorCache[this._id] = true;
		this.stop();
	}

	private _onEnded(_event: any): void {
		if (this.onSoundComplete) {
			this.onSoundComplete();
		}
		this.stop();
	}

	private _disposeSource(): void {
		//clean up
		this._source.onended = null;
		this._source.stop(this._audioCtx.currentTime);
		this._source.disconnect();
		// delete this._source.buffer;
		// delete this._source;
		this._source = null;
	}
}

const audioCtx = WebAudioChannel.getAudioContext();

// context state at this time is `undefined` in iOS8 Safari
if (audioCtx && audioCtx.state === 'suspended') {
	const resume = () => {
		audioCtx.resume();

		//create empty buffer
		const buffer = audioCtx.createBuffer(1, 1, 22050);
		const source = audioCtx.createBufferSource();
		source.buffer = buffer;
		source.connect(audioCtx.destination);
		source.start();

		setTimeout(() => {
			if (audioCtx.state === 'running') {
				document.removeEventListener('mousedown', resume, false);
			}
		}, 0);
	};

	document.addEventListener('mousedown', resume, false);
}