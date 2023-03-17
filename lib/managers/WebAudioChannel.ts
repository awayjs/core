import { IWaveAudioMeta } from '../audio/WaveAudio';
import { BaseAudioChannel } from './BaseAudioChannel';
import { IAudioChannel } from './IAudioChannel';

export class WebAudioChannel extends BaseAudioChannel implements IAudioChannel {
	public static maxChannels: number = 64; // for icycle: 128;
	public static _channels: Array<WebAudioChannel> = new Array<WebAudioChannel>();
	public static _decodeCache: Record<string, AudioBuffer> = {};
	public static _errorCache: Record<string, any> = {};
	public static _audioCtx: AudioContext;

	public static getOfflineContext (channels: number = 1, samples: number = 0, rate: number = 44100) {
		// eslint-disable-next-line max-len
		const Context = <typeof OfflineAudioContext> (self.OfflineAudioContext || (<any>self).webkitOfflineAudioContext);

		return Context ? new Context(channels, samples, rate) : null;
	}

	public static getAudioContext() {
		// eslint-disable-next-line max-len
		const Context = <typeof AudioContext> (self.AudioContext || (<any>self).webkitAudioContext);

		if (!WebAudioChannel._audioCtx && Context)
			WebAudioChannel._audioCtx = new Context();

		if (WebAudioChannel._audioCtx && WebAudioChannel._audioCtx.state == 'suspended')
			WebAudioChannel._audioCtx.resume();

		return WebAudioChannel._audioCtx;
	}

	private _audioCtx: AudioContext;
	private _usingNativePanner: boolean;

	private _gainNode: GainNode;
	private _pannerNode: PannerNode | StereoPannerNode;
	private _source: AudioBufferSourceNode;

	private _currentTime: number;
	private _volume: number = 1;
	private _pan: number = -1;
	private _groupID: number = 0;
	private _groupVolume: number = 1;
	private _groupPan: number = 0;
	private _startTime: number = 0;
	private _duration: number;

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

		if (this._usingNativePanner) {
			(<StereoPannerNode> this._pannerNode).pan.value = this._pan;
		} else {
			const pan = this._pan * (Math.PI / 2);
			(<PannerNode> this._pannerNode).setPosition(Math.sin(pan), 0,Math.cos(pan));
		}
	}

	constructor(groupID: number = 0, groupVolume: number = 1, groupPan: number = 1) {
		super();

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

	public restart(): boolean {
		this._isPlaying = false;

		if (this._stopped) {
			throw 'You can\'t restart channel that was fully stopped';
		}

		const buffer = WebAudioChannel._decodeCache[this._id];

		if (!buffer) {
			return  false;
		}

		this._isPlaying = true;
		this.executeBuffer(buffer);
		this.dispatchRestart();

		return true;
	}

	public play(
		buffer: ArrayBuffer,
		offset: number = 0,
		loop: boolean | number = false,
		id: number = 0,
		meta?: IWaveAudioMeta
	): void {

		if (buffer.byteLength === 0) {
			console.warn('[WabAudioChannel] Input buffer is empty');
			return;
		}

		super.play(buffer, offset, loop, id, meta);

		this._isPlaying = true;
		this._currentTime = offset;
		this._isDecoding = true;

		//fast path for short sounds
		if (WebAudioChannel._decodeCache[id]) {
			this.executeBuffer(WebAudioChannel._decodeCache[id]);
		} else if (!WebAudioChannel._errorCache[id]) {
			this._decodeAndExecute(buffer, meta);
		} else {
			this.stopInternally(false);
			this.dispatchStop(true);
		}
	}

	private stopInternally(emitComplete = true) {
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

		if (this._source) {
			this._disposeSource();
		}

		// will be try restart
		super.completeInternally(emitComplete, emitComplete);
	}

	public stop(): void {
		this.stopInternally(false);
		this.dispatchStop(false);
	}

	private _decodeAndExecute(buffer: ArrayBuffer, meta?: IWaveAudioMeta) {
		let ctx: AudioContext | OfflineAudioContext = this._audioCtx;

		// try to transcode to RIGHT target
		// with RIGHT sample rate, to increase quality
		try {
			if (meta && meta.sampleRate && meta.sampleRate !== this._audioCtx.sampleRate && meta.samplesCount) {
				ctx = WebAudioChannel.getOfflineContext(2, meta.samplesCount + meta.startOffset, meta.sampleRate);
			}
		} catch (e) {
			console.warn('[WebAudioChannel] Error when try create Offline Context:',e.message, meta);
		}

		const promise = ctx.decodeAudioData(
			buffer.slice(0),
			(buffer) => this._onDecodeComplete(buffer, meta),
			(event) => this._onError(event)
		);

		// when decodeAudioData is Promise - it not emit error to callback, need catch promise
		// @ts-ignore
		if (promise instanceof self.Promise) {
			promise.catch((e) => this._onError(e));
		}
	}

	public _onDecodeComplete(buffer: AudioBuffer, meta: IWaveAudioMeta): void {
		if (!WebAudioChannel._decodeCache[this._id]) {

			// transform mp3 buffer, because it has silent regions
			// IS VERY IMPORTANT FOR FLASH
			if (meta && meta.startOffset > 0) {
				buffer = this.removeSilent(
					buffer,
					meta.startOffset,
					meta.samplesCount,
					meta.sampleRate
				);
			}

			WebAudioChannel._decodeCache[this._id] = buffer;
		}

		buffer = WebAudioChannel._decodeCache[this._id];

		if (!this._isPlaying)
			return;

		this.executeBuffer(buffer);
	}

	private executeBuffer (buffer: AudioBuffer) {
		if (this._source)
			this._disposeSource();

		this._isDecoding = false;
		this._source = this._audioCtx.createBufferSource();
		//this._source.loop = this._isLooping;
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
			console.warn('[WebAudioChannel] Error starting audio: ' + error);

			this.dispatchStop(true);
			this._disposeSource();
		}
	}

	public _onError(_event: any): void {
		console.warn('[WebAudioChannel] Error with decoding audio data:', _event);

		WebAudioChannel._errorCache[this._id] = true;

		this._isDecoding = false;
		this.stopInternally(false);
		this.dispatchStop(true);
	}

	private _onEnded(_event: any): void {
		// we dispatch STOP only for manually stopped and if channel still alive
		this.stopInternally(true);
	}

	private _disposeSource(): void {
		//clean up
		this._source.onended = null;
		this._source.stop(this._audioCtx.currentTime);
		this._source.disconnect();
		this._source = null;
	}

	private removeSilent (
		buffer: AudioBuffer,
		begin: number = 0,
		length: number = 0,
		originalRate: number = 0
	): AudioBuffer {

		length = length || buffer.length;
		originalRate = originalRate || buffer.sampleRate;

		// we should transform to buffer rate
		begin = Math.ceil ((buffer.sampleRate * begin) / originalRate);
		length = ((buffer.sampleRate * length) / originalRate) | 0;

		const end = Math.min(buffer.length, length + begin);

		const res = this._audioCtx.createBuffer(
			buffer.numberOfChannels,
			length,
			buffer.sampleRate,
		);

		for (let i = 0; i < buffer.numberOfChannels; i++) {
			// interate over channels and copy part of channel
			res.copyToChannel(
				buffer.getChannelData(i).subarray(begin, end), i, 0
			);
		}

		return res;
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