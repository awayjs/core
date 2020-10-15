import { StreamingAudioChannel } from '../managers/StreamingAudioChannel';
import { WebAudioChannel } from '../managers/WebAudioChannel';
import { IAudioChannel } from '../managers/IAudioChannel';
import { EventAudioChannel } from '../managers/EventAudioChannel';
import { IAudioChannelClass } from '../managers/IAudioChannelClass';

export class AudioManager {
	private static isIE: boolean=!!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
	//todo: make AudioPlaybackManager keep track of active sounds + implement global playback control
	private static _externalSoundInterface: any=null;

	private static _channelGroupVolumes: number[]=[1];
	private static _channelGroupPanning: number[]=[0.5];

	public static setVolume(value: number, channelGroup: number = -1): void {
		if (channelGroup < 0) {
			const len: number = AudioManager._channelGroupVolumes.length;
			for (let j: number = 0; j < len; j++) {
				AudioManager._channelGroupVolumes[j] = value;
			}
		} else {
			AudioManager._channelGroupVolumes[channelGroup] = value;
		}
		WebAudioChannel.setChannelGroupVolume(value, channelGroup);
		StreamingAudioChannel.setChannelGroupVolume(value, channelGroup);
		EventAudioChannel.setChannelGroupVolume(value, channelGroup);

	}

	public static getVolume(channelGroup: number = 0): number {
		return AudioManager._channelGroupVolumes[channelGroup];
	}

	public static setExternalSoundInterface(new_obj: any): number {
		if (new_obj.startSound == null) {
			console.log('Could not set the externalSoundInterface, because it does not provide a \'startSound\' function');
			return;
		}
		if (new_obj.stopSound == null) {
			console.log('Could not set the externalSoundInterface, because it does not provide a \'stopSound\' function');
			return;
		}
		AudioManager._externalSoundInterface = new_obj;
	}

	public static getExternalSoundInterface(): any {
		return AudioManager._externalSoundInterface;
	}

	public static stopAllSounds() {
		WebAudioChannel.stopAllSounds();
		StreamingAudioChannel.stopAllSounds();
		EventAudioChannel.stopAllSounds();
		//AudioChannel.stopAllSounds();
	}

	public static getChannel(byteLength: number, channelGroup: number = 0): IAudioChannel {
		//choose best audio channel by bytelength
		//todo: StreamingAudioChannel doesnt seem to be working. no error, but also no sound is playing
		let channelClass: IAudioChannelClass = (byteLength > 50000000) ? StreamingAudioChannel : WebAudioChannel;
		if (AudioManager.isIE) {
			channelClass = EventAudioChannel;
		}
		//var channelClass:IAudioChannelClass = WebAudioChannel;

		let i: number = 0;
		while (channelClass._channels[i] && channelClass._channels[i].isPlaying())
			i++;

		if (i == channelClass.maxChannels) {
			//pick the oldest channel to reuse, ignoring looping channels
			let channel: IAudioChannel;
			const len: number = channelClass._channels.length;
			for (let j: number = 0; j < len; j++) {
				channel = channelClass._channels[j];
				if (!channel.isLooping() && !channel.isDecoding()) {
					channel.groupID = channelGroup;
					channel.groupVolume = AudioManager._channelGroupVolumes[channelGroup];
					channel.groupPan = AudioManager._channelGroupPanning[channelGroup];
					channelClass._channels.push(channelClass._channels.splice(j, 1)[0]);
					channel.stop();
					return channel;
				}
			}

			//do not return channel until one is freed up
			return null;
		}

		return  (channelClass._channels[i] = new channelClass(channelGroup, AudioManager._channelGroupVolumes[channelGroup], AudioManager._channelGroupPanning[channelGroup]));
	}

}