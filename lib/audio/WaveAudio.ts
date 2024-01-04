import { AssetBase } from '../library/AssetBase';
import { AudioManager } from '../managers/AudioManager';
import { ByteArray } from '../utils/ByteArray';
import { BaseAudioChannel } from '../managers/BaseAudioChannel';
import { EventBase } from '../events/EventBase';
import { IAudioChannel } from '../managers/IAudioChannel';

// TODO: Audio should probably be an interface containing play/stop/seek functionality
export class WaveAudio extends AssetBase {
	public static assetType: string = '[asset WaveAudio]';

	private _audioChannel: IAudioChannel;
	private _volume: number = 1;
	private _pan: number = 0;
	private _data: WaveAudioData;
	private _channelGroup: number;
	private _audioChannels: IAudioChannel[] = [];
	private _channelsPlaying: number = 0;

	public get isPlaying(): boolean {
		return (this._channelsPlaying > 0);
	}

	/**
	 *
	 * @returns {string}
	 */
	public get assetType(): string {
		return WaveAudio.assetType;
	}

	private detachChannel(channel: IAudioChannel) {
		if (!channel) {
			return;
		}

		channel.removeEventListener(BaseAudioChannel.COMPLETE, this.onChannelCompleteStopError);
		channel.removeEventListener(BaseAudioChannel.STOP, this.onChannelCompleteStopError);
		channel.removeEventListener(BaseAudioChannel.ERROR, this.onChannelCompleteStopError);
	}

	private attachChannel(channel: IAudioChannel) {
		if (!channel) {
			return;
		}

		channel.owner = this;
		channel.addEventListener(BaseAudioChannel.COMPLETE, this.onChannelCompleteStopError);
		channel.addEventListener(BaseAudioChannel.STOP, this.onChannelCompleteStopError);
		channel.addEventListener(BaseAudioChannel.ERROR, this.onChannelCompleteStopError);
	}

	private onChannelCompleteStopError(e: EventBase): void {
		const channel = <IAudioChannel> e.target;
		const index = this._audioChannels.indexOf(channel);

		if (index >= 0) {
			this.detachChannel(channel);
			this._audioChannels.splice(index, 1);
			this._channelsPlaying--;
		}

		if (this._channelsPlaying !== 0) {
			return;
		}

		// we stop channels
		this.stopInternal(false);
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

		this.onChannelCompleteStopError = this.onChannelCompleteStopError.bind(this);
	}

	public dispose(): void {
		this.stop();
	}

	public play(offset: number, loop: boolean | number = false): IAudioChannel {
		this._audioChannel = <IAudioChannel> AudioManager.getChannel(this._data.size, this.channelGroup);

		if (this._audioChannel) {
			this._channelsPlaying++;
			this._audioChannels.push(this._audioChannel);
			this._audioChannel.volume = this._volume;

			this.attachChannel(this._audioChannel);

			this._data.play(this._audioChannel, offset, loop, this.id);
		}

		return  this._audioChannel;
	}

	private stopInternal(stopChannels = false) {
		// we not unlink channels for case when it can be restarted
		for (const channel of this._audioChannels) {

			// detach died channels
			if (channel.stopped || stopChannels) {
				// detach channels, now it can't be restarted
				this.detachChannel(channel);
			}

			if (stopChannels) {
				channel.stop();
			}
		}

		this._channelsPlaying = 0;
		this._audioChannels.length = 0;

		this._audioChannel = null;
	}

	public stop(): void {
		this.stopInternal(true);
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

	public play(audioChannel: IAudioChannel, offset: number, loop: boolean | number, id: number): void {
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

	private _blobConverted(event, audioChannel: IAudioChannel, offset: number, loop: boolean | number, id: number) {
		this._buffer = event.target.result;

		audioChannel.play(this._buffer, offset, loop, id, this.meta);
	}
}