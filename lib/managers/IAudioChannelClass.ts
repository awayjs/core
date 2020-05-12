import {IAudioChannel} from "../managers/IAudioChannel";

export interface IAudioChannelClass
{
	maxChannels:number;

	_channels:Array<IAudioChannel>;

	/**
	 *
	 */
	new(channelGroupID:number, channelGroupVolume:number, channelGroupPan:number):IAudioChannel;
}