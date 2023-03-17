import { WaveAudio } from '../audio/WaveAudio';
import { IEventDispatcher } from '../events/IEventDispatcher';

export interface IAudioChannel extends IEventDispatcher
{
	stopped: boolean;

	duration: number;

	currentTime: number;

	volume: number;

	pan: number;

	groupVolume: number;

	groupPan: number;

	groupID: number;

	onSoundComplete: Function;

	owner: WaveAudio;

	isPlaying(): boolean;

	isLooping(): boolean;

	isDecoding(): boolean;

	play(buffer: ArrayBuffer, offset?: number, loop?: boolean | number, id?: number, meta?: any): void;

	/*restart(): boolean;*/

	stop(): void;
}