"use strict";
var StreamingAudioChannel = (function () {
    function StreamingAudioChannel() {
        var _this = this;
        this._isPlaying = false;
        this._isLooping = false;
        this._startTime = 0;
        this._sourceOpenDelegate = function (event) { return _this._sourceOpen(event); };
        this._updateEndDelegate = function (event) { return _this._updateEnd(event); };
        this._audio = new Audio();
        this._audio.ontimeupdate = function (event) { return _this._onTimeUpdate(event); };
        this._updateSource();
    }
    Object.defineProperty(StreamingAudioChannel.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamingAudioChannel.prototype, "currentTime", {
        get: function () {
            return this._audio.currentTime - this._startTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamingAudioChannel.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (value) {
            if (this._volume == value)
                return;
            this._volume = value;
            this._audio.volume = this._volume;
        },
        enumerable: true,
        configurable: true
    });
    StreamingAudioChannel.prototype.isPlaying = function () {
        return this._isPlaying;
    };
    StreamingAudioChannel.prototype.isLooping = function () {
        return this._isLooping;
    };
    StreamingAudioChannel.prototype.isDecoding = function () {
        return false;
    };
    StreamingAudioChannel.prototype.play = function (buffer, offset, loop) {
        if (offset === void 0) { offset = 0; }
        if (loop === void 0) { loop = false; }
        this._isPlaying = true;
        if (this._isLooping || this._isLooping != loop) {
            this._isLooping = loop;
            this._sourceDirty = true;
        }
        if (this._sourceDirty)
            this._updateSource();
        this._buffer = buffer;
        this._offset = offset;
        if (!this._isQueuing && !this._isOpening)
            this._queueBuffer();
    };
    StreamingAudioChannel.prototype.stop = function () {
        this._audio.pause();
        this._isPlaying = false;
        this._isLooping = false;
    };
    StreamingAudioChannel.prototype._sourceOpen = function (event) {
        this._isOpening = false;
        //TODO: find out how in the name of all that is holy how this can be executed more than once on a MediaSource object
        if (this._mediaSource.activeSourceBuffers.length) {
            console.log("ERR: double sourceopen event called");
            return;
        }
        this._sourceBuffer = this._mediaSource.addSourceBuffer('audio/mpeg');
        this._sourceBuffer.addEventListener("updateend", this._updateEndDelegate);
        if (this._isPlaying)
            this._queueBuffer();
    };
    StreamingAudioChannel.prototype._queueBuffer = function () {
        this._isQueuing = true;
        this._startTime = this._sourceBuffer.timestampOffset;
        this._sourceBuffer.appendBuffer(this._buffer);
    };
    StreamingAudioChannel.prototype._updateEnd = function (event) {
        this._isQueuing = false;
        if (this._isLooping)
            this._mediaSource.endOfStream();
        this._duration = this._sourceBuffer.timestampOffset - this._startTime;
        this._audio.currentTime = this._startTime + this._offset;
        this._audio.play();
    };
    StreamingAudioChannel.prototype._onTimeUpdate = function (event) {
        //TODO: more accurate end detection
        if (!this._isLooping && this._duration < this._audio.currentTime - this._startTime + 0.1)
            this.stop();
    };
    StreamingAudioChannel.prototype._updateSource = function () {
        if (this._mediaSource)
            this._disposeSource();
        this._isQueuing = false;
        this._isOpening = true;
        this._mediaSource = new MediaSource();
        this._mediaSource.addEventListener("sourceopen", this._sourceOpenDelegate);
        this._urlString = URL.createObjectURL(this._mediaSource);
        this._audio.src = this._urlString;
        this._audio.loop = this._isLooping;
        this._sourceDirty = false;
    };
    StreamingAudioChannel.prototype._disposeSource = function () {
        if (!this._isOpening) {
            if (this._sourceBuffer.timestampOffset)
                this._sourceBuffer.remove(0, this._sourceBuffer.timestampOffset);
            this._sourceBuffer.removeEventListener("updateend", this._updateEndDelegate);
            this._mediaSource.removeSourceBuffer(this._sourceBuffer);
            delete this._sourceBuffer;
            this._sourceBuffer = null;
        }
        this._mediaSource.removeEventListener("sourceopen", this._sourceOpenDelegate);
        URL.revokeObjectURL(this._urlString);
        delete this._mediaSource;
        this._mediaSource = null;
    };
    StreamingAudioChannel.maxChannels = 4;
    StreamingAudioChannel._channels = new Array();
    return StreamingAudioChannel;
}());
exports.StreamingAudioChannel = StreamingAudioChannel;
