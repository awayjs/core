

export interface IAudioChannel
{
	duration:number;

	currentTime:number;

	volume:number;

	isPlaying():boolean;

	isLooping():boolean;

	isDecoding():boolean;

	play(buffer:ArrayBuffer, offset?:number, loop?:boolean, id?:number);

	stop();
}