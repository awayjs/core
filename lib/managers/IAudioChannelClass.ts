import IAudioChannel			from "awayjs-core/lib/managers/IAudioChannel";

interface IAudioChannelClass
{
	maxChannels:number;

	_channels:Array<IAudioChannel>;

	/**
	 *
	 */
	new():IAudioChannel;
}

export default IAudioChannelClass;