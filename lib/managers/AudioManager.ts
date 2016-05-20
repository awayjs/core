import {StreamingAudioChannel}	from "../managers/StreamingAudioChannel";
import {WebAudioChannel}			from "../managers/WebAudioChannel";
import {IAudioChannel}			from "../managers/IAudioChannel";
import {IAudioChannelClass}		from "../managers/IAudioChannelClass";

export class AudioManager
{
	public static getChannel(byteLength:number):IAudioChannel
	{
		//choose best audio channel by bytelength
		var channelClass:IAudioChannelClass = (byteLength > 50000)? StreamingAudioChannel : WebAudioChannel;

		var i:number = 0;
		while(channelClass._channels[i] && channelClass._channels[i].isPlaying())
			i++;

		if (i == channelClass.maxChannels) {
			//pick the oldest channel to reuse, ignoring looping channels
			var channel:IAudioChannel;
			var len:number = channelClass._channels.length;
			for (var j:number = 0; j < len; j++) {
				channel = channelClass._channels[j];
				if (!channel.isLooping() && !channel.isDecoding()) {
					channelClass._channels.push(channelClass._channels.splice(j, 1)[0]);
					channel.stop();
					return channel;
				}
			}

			//do not return channel until one is freed up
			return null;
		}

		return channelClass._channels[i] || (channelClass._channels[i] = new channelClass());
	}


}