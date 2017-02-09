import {StreamingAudioChannel}	from "../managers/StreamingAudioChannel";
import {WebAudioChannel}			from "../managers/WebAudioChannel";
import {IAudioChannel}			from "../managers/IAudioChannel";
import {IAudioChannelClass}		from "../managers/IAudioChannelClass";

export class AudioManager
{
	//todo: make AudioPlaybackManager keep track of active sounds + implement global playback control
	private static _externalSoundInterface:any=null;
	public static setExternalSoundInterface(new_obj:any):number
	{
		if(new_obj.startSound == null){
			console.log("Could not set the externalSoundInterface, because it does not provide a 'startSound' function");
			return;
		}
		if(new_obj.stopSound == null){
			console.log("Could not set the externalSoundInterface, because it does not provide a 'stopSound' function");
			return;
		}
		AudioManager._externalSoundInterface=new_obj;
	}

	public static getExternalSoundInterface():any
	{
		return AudioManager._externalSoundInterface;
	}


	public static getChannel(byteLength:number):IAudioChannel
	{
		//choose best audio channel by bytelength
		//todo: StreamingAudioChannel doesnt seem to be working. no error, but also no sound is playing
		var channelClass:IAudioChannelClass = (byteLength > 50000)? StreamingAudioChannel : WebAudioChannel;
		//var channelClass:IAudioChannelClass = WebAudioChannel;

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