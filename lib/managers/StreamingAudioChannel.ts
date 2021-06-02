import { IAudioChannel } from './IAudioChannel';

export class StreamingAudioChannel implements IAudioChannel {
	public static maxChannels: number = 4;

	public static _channels: Array<StreamingAudioChannel> = new Array<StreamingAudioChannel>();

	private _sourceOpenDelegate: (event) => void;
	private _updateEndDelegate: (event) => void;
	private _sourceBuffer: SourceBuffer;
	private _sourceDirty: boolean;
	private _isPlaying: boolean = false;
	private _isLooping: boolean = false;
	private _isQueuing: boolean;
	private _isOpening: boolean;
	private _buffer: ArrayBuffer;
	private _offset: number;
	private _volume: number;
	private _groupID: number = 0;
	private _groupVolume: number = 1;
	private _groupPan: number = 0;
	private _startTime: number = 0;
	private _duration: number;

	private _audio: HTMLAudioElement;
	public onSoundComplete: Function;

	private _mediaSource: MediaSource;
	private _urlString: string;

	public static stopAllSounds(channelGroup: number = -1) {
		const len: number = StreamingAudioChannel._channels.length;
		if (channelGroup < 0) {
			for (let j: number = 0; j < len; j++) {
				StreamingAudioChannel._channels[j].stop();
			}
			StreamingAudioChannel._channels.length = 0;
			return;
		}
		const aliveChannels: StreamingAudioChannel[] = [];
		for (let j: number = 0; j < len; j++) {
			if (StreamingAudioChannel._channels[j].groupID == channelGroup) {
				StreamingAudioChannel._channels[j].stop();
			} else {
				aliveChannels[aliveChannels.length] = StreamingAudioChannel._channels[j];
			}
		}
		StreamingAudioChannel._channels = aliveChannels;
	}

	public static setChannelGroupVolume(value: number, channelGroup: number = -1) {
		const len: number = StreamingAudioChannel._channels.length;
		if (channelGroup < 0) {
			for (let j: number = 0; j < len; j++) {
				StreamingAudioChannel._channels[j].groupVolume = value;
			}
			return;
		}
		for (let j: number = 0; j < len; j++) {
			if (StreamingAudioChannel._channels[j].groupID == channelGroup) {
				StreamingAudioChannel._channels[j].groupVolume = value;
			}
		}
	}

	public get duration(): number {
		return this._duration;
	}

	public get currentTime(): number {
		return this._audio.currentTime - this._startTime;
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

		this._audio.volume = this._groupVolume * this._volume;
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

		this._audio.volume = this._volume;
	}

	public isPlaying(): boolean {
		return this._isPlaying;
	}

	public isLooping(): boolean {
		return this._isLooping;
	}

	public isDecoding(): boolean {
		return false;
	}

	public get pan(): number {
		//todo
		return 0;
	}

	public set pan(value: number) {
		//todo
	}

	constructor(groupID: number = 0, groupVolume: number = 1, groupPan: number = 1) {
		this._groupID = groupID;
		this._groupVolume = groupVolume;
		this._groupPan = groupPan;

		this._sourceOpenDelegate = (event) => this._sourceOpen(event);
		this._updateEndDelegate = (event) => this._updateEnd(event);

		this._audio = new Audio();
		this._audio.ontimeupdate = (event) => this._onTimeUpdate(event);

		this._updateSource();

	}

	public restart(): boolean {
		console.warn('[StreamingAudioChannel] Restart not implemented');
		return  false;
	}

	public play(buffer: ArrayBuffer, offset: number = 0, loop: boolean = false): void {
		this._isPlaying = true;

		if (this._isLooping || this._isLooping != loop) {
			this._isLooping = loop;
			this._sourceDirty = true;
		}

		if (this._sourceDirty)
			this._updateSource();

		this._buffer = buffer;
		this._offset = offset;
		this._audio.volume = this._groupVolume * this._volume;

		if (!this._isQueuing && !this._isOpening)
			this._queueBuffer();
	}

	public stop(): void {
		this._audio.pause();
		this._isPlaying = false;
		this._isLooping = false;
	}

	private _sourceOpen(event): void {
		this._isOpening = false;

		//TODO: find out how in the name of all that is holy how this can be
		//executed more than once on a MediaSource object
		if (this._mediaSource.activeSourceBuffers.length) {
			console.log('ERR: double sourceopen event called');
			return;
		}

		this._sourceBuffer = this._mediaSource.addSourceBuffer('audio/mpeg');
		this._sourceBuffer.addEventListener('updateend', this._updateEndDelegate);

		if (this._isPlaying)
			this._queueBuffer();
	}

	private _queueBuffer(): void {
		this._isQueuing = true;

		this._startTime = this._sourceBuffer.timestampOffset;
		this._sourceBuffer.appendBuffer(this._buffer);
	}

	private _updateEnd(event): void {
		this._isQueuing = false;

		if (this._isLooping)
			this._mediaSource.endOfStream();

		this._duration = this._sourceBuffer.timestampOffset - this._startTime;

		this._audio.currentTime = this._startTime + this._offset;
		this._audio.play();
	}

	private _onTimeUpdate(event): void {
		//TODO: more accurate end detection
		if (!this._isLooping && this._duration < this._audio.currentTime - this._startTime + 0.1)
			this.stop();
	}

	private _updateSource(): void {
		if (this._mediaSource)
			this._disposeSource();

		this._isQueuing = false;
		this._isOpening = true;

		this._mediaSource = new MediaSource();
		this._mediaSource.addEventListener('sourceopen', this._sourceOpenDelegate);
		this._urlString = URL.createObjectURL(this._mediaSource);
		this._audio.src = this._urlString;
		this._audio.loop = this._isLooping;

		this._sourceDirty = false;
	}

	private _disposeSource(): void {
		if (!this._isOpening) {
			if (this._sourceBuffer.timestampOffset)
				this._sourceBuffer.remove(0, this._sourceBuffer.timestampOffset);

			this._sourceBuffer.removeEventListener('updateend', this._updateEndDelegate);
			this._mediaSource.removeSourceBuffer(this._sourceBuffer);
			delete this._sourceBuffer;
			this._sourceBuffer = null;
		}

		this._mediaSource.removeEventListener('sourceopen', this._sourceOpenDelegate);
		URL.revokeObjectURL(this._urlString);
		delete this._mediaSource;
		this._mediaSource = null;
	}
}