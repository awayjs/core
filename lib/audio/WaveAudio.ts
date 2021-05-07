import { AssetBase } from '../library/AssetBase';

import { IAudioChannel } from '../managers/IAudioChannel';
import { AudioManager } from '../managers/AudioManager';

import { ByteArray } from '../utils/ByteArray';

// TODO: Audio should probably be an interface containing play/stop/seek functionality
export class WaveAudio extends AssetBase {
	public static assetType: string = '[asset WaveAudio]';

	private _audioChannel: IAudioChannel;
	private _volume: number = 1;
	private _pan: number = 0;
	private _data: WaveAudioData;
	private _channelGroup: number;
	private _onSoundComplete: Function;
	private _audioChannels: IAudioChannel[] = [];
	private _loopsToPlay: number = 0;
	private _isPlaying: boolean = false;
	private _channelsPlaying: number = 0;

	public get isPlaying(): boolean {
		if (!this._audioChannel)
			return false;

		return this._audioChannel.isPlaying();
	}

	/**
	 *
	 * @returns {string}
	 */
	public get assetType(): string {
		return WaveAudio.assetType;
	}

	public get loopsToPlay(): number {
		return this._loopsToPlay;
	}

	public set loopsToPlay(value: number) {
		if (this._loopsToPlay == value)
			return;

		this._loopsToPlay = value;

		if (this._audioChannel)
			this._audioChannel.onSoundComplete = () => this._soundCompleteInternal();
	}

	private _soundCompleteInternal(): void {
		this._loopsToPlay--;

		if (this._loopsToPlay > 0) {
			this.stop();
			this.play(0, false);
		} else {
			if (this._channelsPlaying > 0)
				this._channelsPlaying--;

			if (this._channelsPlaying == 0)
				this._isPlaying = false;

			if (this._onSoundComplete)
				this._onSoundComplete();
		}
	}

	public get pan(): number {
		return this._pan;
	}

	public set pan(value: number) {
		if (this._pan == value)
			return;

		this._pan = value;

		if (this._audioChannel)
			this._audioChannel.pan = this._pan;
	}

	public get channelGroup(): number {
		return this._channelGroup;
	}

	public set channelGroup(value: number) {
		if (this._channelGroup == value)
			return;

		this._channelGroup = value;

		const groupVolume: number = AudioManager.getVolume(value);

		for (let i: number = 0; i < this._audioChannels.length; i++)
			this._audioChannels[i].groupVolume = groupVolume;
	}

	public get volume(): number {
		return this._volume;
	}

	public set volume(value: number) {
		if (this._volume == value)
			return;

		this._volume = value;

		if (this._audioChannel)
			this._audioChannel.volume = this._volume;

		for (let i: number = 0; i < this._audioChannels.length; i++)
			this._audioChannels[i].volume = this._volume;
	}

	public get currentTime(): number {
		if (this._audioChannel)
			return this._audioChannel.currentTime;

		return 0;
	}

	public get duration(): number {
		if (this._audioChannel)
			return this._audioChannel.duration;

		return 0;
	}

	/**
	 *
	 */
	constructor(data: WaveAudioData, channelGroup: number = 0) {
		super();

		this._data = data;

		this._channelGroup = channelGroup;
	}

	public dispose(): void {
		this._isPlaying = false;
		this.stop();
	}

	public play(offset: number, loop: boolean = false): void {
		this._isPlaying = true;

		this._audioChannel = AudioManager.getChannel(this._data.size, this.channelGroup);

		if (this._audioChannel) {
			this._channelsPlaying++;
			this._audioChannels.push(this._audioChannel);
			this._audioChannel.volume = this._volume;
			this._audioChannel.onSoundComplete = () => this._soundCompleteInternal();
			this._data.play(this._audioChannel, offset, loop, this.id);
		}
	}

	public set onSoundComplete(value: Function) {
		this._onSoundComplete = value;

		if (this._audioChannel)
			this._audioChannel.onSoundComplete = () => this._soundCompleteInternal();
	}

	public stop(): void {
		this._isPlaying = false;

		for (let i: number = 0; i < this._audioChannels.length; i++) {
			this._audioChannels[i].stop();
			delete this._audioChannels[i];
		}

		this._channelsPlaying = 0;
		this._audioChannels.length = 0;

		this._audioChannel = null;
	}

	public clone(): WaveAudio {
		const newInstance: WaveAudio = new WaveAudio(this._data);
		newInstance.name = this.name;
		return newInstance;
	}
}

export interface IWaveAudioMeta {
	samplesCount?: number; // real samples count, required for MP3 looping
	sampleRate?: number; // original rate, MUST BE SETTED when startOffset is present
	startOffset?: number; // silent region, for mp3 looping, in samples
}
export class WaveAudioData {
	private _loading: boolean;
	private _blob: Blob;
	private _buffer: ArrayBuffer;
	public readonly meta?: IWaveAudioMeta;

	public get size(): number {
		if (this._buffer)
			return this._buffer.byteLength;

		return this._blob.size;
	}

	public play(audioChannel: IAudioChannel, offset: number, loop: boolean, id: number): void {
		if (this._buffer) {
			audioChannel.play(this._buffer, offset, loop, id, this.meta);
		} else if (!this._loading) {
			this._loading = true;
			const fileReader = new FileReader();
			fileReader.onload = (event) => this._blobConverted(event, audioChannel, offset, loop, id);
			fileReader.readAsArrayBuffer(this._blob);
		}
	}

	constructor(data: ArrayBuffer | ByteArray | Blob, meta?: IWaveAudioMeta) {
		if (data instanceof Blob) {
			this._blob = data;
		} else if (data instanceof ByteArray) {
			this._buffer = data.arraybytes;
		} else if (ArrayBuffer.isView(data)) {
			this._buffer = data.buffer;
		} else {
			this._buffer = data;
		}

		this.meta = meta;
	}

	private _blobConverted(event, audioChannel: IAudioChannel, offset: number, loop: boolean, id: number) {
		this._buffer = event.target.result;

		audioChannel.play(this._buffer, offset, loop, id, this.meta);
	}
}