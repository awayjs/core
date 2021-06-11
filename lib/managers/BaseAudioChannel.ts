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

	protected  _stopped: boolean = false;

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

	public abstract isDecoding(): boolean;

	public abstract isLooping(): boolean;

	public abstract isPlaying(): boolean;

	public abstract play(
		buffer: ArrayBuffer,
		offset?: number,
		loop?: boolean,
		id?: number,
		meta?: any
	): void;

	public abstract restart(): boolean;

	public abstract stop(): void;

	protected dispatchRestart(): void {
		this.dispatchEvent(BaseAudioChannel.RESTART_EVENT);
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