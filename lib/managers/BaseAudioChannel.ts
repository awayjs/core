import { IAudioChannel } from './IAudioChannel';
import { EventDispatcher } from '../events/EventDispatcher';
import { EventBase } from '../events/EventBase';
import { WaveAudio } from '../audio/WaveAudio';

export abstract class BaseAudioChannel extends EventDispatcher implements IAudioChannel {
	public static COMPLETE = 'complete';
	public static RESTART = 'restart';
	public static STOP = 'stop';
	public static ERROR = 'error';

	protected static RESTART_EVENT = new EventBase(BaseAudioChannel.RESTART);
	protected static COMPLETE_EVENT = new EventBase(BaseAudioChannel.COMPLETE);
	protected static STOP_EVENT = new EventBase(BaseAudioChannel.STOP);
	protected static ERROR_EVENT = new EventBase(BaseAudioChannel.ERROR);

	public currentTime: number;
	public duration: number;
	public groupID: number;
	public groupPan: number;
	public groupVolume: number;
	public pan: number;
	public volume: number;
	public owner: WaveAudio;

	public get stopped() {
		return this._stopped;
	}

	protected _stopped: boolean = false;

	protected _loops: number = 0;

	protected _id: number = -1;

	protected _isLooping: boolean = false;

	protected _isPlaying: boolean = false;

	protected _isDecoding: boolean = false;

	/**
	 * @deprecated This is deprecated, use a `addEventListener`
	 * @param v
	 */
	public set onSoundComplete(v: (e?: EventBase) => void) {
		if (!v) {
			return;
		}

		this.addEventListener(BaseAudioChannel.COMPLETE, v);
	}

	public isLooping() {
		return this._isLooping;
	}

	public isPlaying() {
		return this._isPlaying;
	}

	public isDecoding(): boolean {
		return this._isDecoding;
	}

	public play(
		buffer: ArrayBuffer,
		offset?: number,
		loop?: boolean | number,
		id?: number,
		meta?: any
	): void {
		this.loops = loop;
		this._id = id || -1;
		this._isLooping = this.loops > 0;
	}

	public abstract stop(): void;

	protected abstract restart(): boolean;

	protected set loops (v: number | boolean) {
		this._loops = typeof v === 'number' ? v : v ? 1000 : 0;
	}

	protected get loops() {
		return this._loops;
	}

	protected dispatchRestart(): void {
		this.dispatchEvent(BaseAudioChannel.RESTART_EVENT);
	}

	/**
	 * Check loop and try restart it
	 * @protected
	 */
	protected tryRestartLoop(): boolean {
		if (this._loops <= 0) {
			return  false;
		}

		this._loops--;

		if (this.restart()) {
			return true;
		}

		this._loops = 0;

		return false;
	}

	protected completeInternally (dispatchComplete = true, tryRestart = true) {
		if (tryRestart && this.tryRestartLoop()) {
			return;
		}

		if (dispatchComplete) {
			this.dispatchEvent(BaseAudioChannel.COMPLETE_EVENT);
		}
	}

	protected dispatchComplete() {
		this.dispatchEvent(BaseAudioChannel.COMPLETE_EVENT);
	}

	protected dispatchStop(error = false) {

		this.dispatchEvent(error ?
			BaseAudioChannel.ERROR_EVENT :
			BaseAudioChannel.STOP_EVENT
		);

		// now channel can't be restarted;
		this.owner = null;
		this._stopped = true;
		this.removeAllEventListeners();
	}
}