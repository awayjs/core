import IAudioChannel			= require("awayjs-core/lib/managers/IAudioChannel");

interface IAudioChannelClass
{
	maxChannels:number;

	_channels:Array<IAudioChannel>;

	/**
	 *
	 */
	new():IAudioChannel;
}

export = IAudioChannelClass;