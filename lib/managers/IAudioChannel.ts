export interface IAudioChannel
{
	duration:number;

	currentTime:number;

	volume:number;

	pan:number;

	onSoundComplete:Function;
	
	isPlaying():boolean;

	isLooping():boolean;

	isDecoding():boolean;

	play(buffer:ArrayBuffer, offset?:number, loop?:boolean, id?:number);

	stop();
}