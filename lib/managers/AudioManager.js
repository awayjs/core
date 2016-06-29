"use strict";
var StreamingAudioChannel_1 = require("../managers/StreamingAudioChannel");
var WebAudioChannel_1 = require("../managers/WebAudioChannel");
var AudioManager = (function () {
    function AudioManager() {
    }
    AudioManager.setExternalSoundInterface = function (new_obj) {
        if (new_obj.startSound == null) {
            console.log("Could not set the externalSoundInterface, because it does not provide a 'startSound' function");
            return;
        }
        if (new_obj.stopSound == null) {
            console.log("Could not set the externalSoundInterface, because it does not provide a 'stopSound' function");
            return;
        }
        AudioManager._externalSoundInterface = new_obj;
    };
    AudioManager.getExternalSoundInterface = function () {
        return AudioManager._externalSoundInterface;
    };
    AudioManager.getChannel = function (byteLength) {
        //choose best audio channel by bytelength
        //todo: StreamingAudioChannel doesnt seem to be working. no error, but also no sound is playing
        var channelClass = (byteLength > 50000) ? StreamingAudioChannel_1.StreamingAudioChannel : WebAudioChannel_1.WebAudioChannel;
        //var channelClass:IAudioChannelClass = WebAudioChannel;
        var i = 0;
        while (channelClass._channels[i] && channelClass._channels[i].isPlaying())
            i++;
        if (i == channelClass.maxChannels) {
            //pick the oldest channel to reuse, ignoring looping channels
            var channel;
            var len = channelClass._channels.length;
            for (var j = 0; j < len; j++) {
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
    };
    //todo: make AudioPlaybackManager keep track of active sounds + implement global playback control
    AudioManager._externalSoundInterface = null;
    return AudioManager;
}());
exports.AudioManager = AudioManager;
