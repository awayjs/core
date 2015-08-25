

interface IAudioChannel
{
	duration:number;

	currentTime:number;

	volume:number;

	isPlaying():boolean;

	isLooping():boolean;

	play(buffer:ArrayBuffer, offset?:number, loop?:boolean);

	stop();
}

export = IAudioChannel;