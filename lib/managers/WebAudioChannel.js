"use strict";
var WebAudioChannel = (function () {
    function WebAudioChannel() {
        var _this = this;
        this._isPlaying = false;
        this._isLooping = false;
        this._isDecoding = false;
        this._volume = 1;
        this._startTime = 0;
        this._audioCtx = WebAudioChannel._audioCtx || (WebAudioChannel._audioCtx = new (window["AudioContext"] || window["webkitAudioContext"])());
        this._gainNode = this._audioCtx.createGain();
        this._gainNode.gain.value = this._volume;
        this._gainNode.connect(this._audioCtx.destination);
        this._onEndedDelegate = function (event) { return _this._onEnded(event); };
    }
    Object.defineProperty(WebAudioChannel.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebAudioChannel.prototype, "currentTime", {
        get: function () {
            return this._audioCtx.currentTime - this._startTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebAudioChannel.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (value) {
            if (this._volume == value)
                return;
            this._volume = value;
            this._gainNode.gain.value = this._volume;
        },
        enumerable: true,
        configurable: true
    });
    WebAudioChannel.prototype.isPlaying = function () {
        return this._isPlaying;
    };
    WebAudioChannel.prototype.isLooping = function () {
        return this._isLooping;
    };
    WebAudioChannel.prototype.isDecoding = function () {
        return this._isDecoding;
    };
    WebAudioChannel.prototype.play = function (buffer, offset, loop, id) {
        var _this = this;
        if (offset === void 0) { offset = 0; }
        if (loop === void 0) { loop = false; }
        if (id === void 0) { id = 0; }
        this._isPlaying = true;
        this._isLooping = loop;
        this._currentTime = offset;
        this._id = id;
        this._isDecoding = true;
        //fast path for short sounds
        if (WebAudioChannel._decodeCache[id])
            this._onDecodeComplete(WebAudioChannel._decodeCache[id]);
        else if (!WebAudioChannel._errorCache[id])
            this._audioCtx.decodeAudioData(buffer, function (buffer) { return _this._onDecodeComplete(buffer); }, function (event) { return _this._onError(event); });
        else
            this.stop();
    };
    WebAudioChannel.prototype.stop = function () {
        if (!this._isPlaying)
            return;
        this._isPlaying = false;
        this._isLooping = false;
        this._isDecoding = false;
        if (this._source)
            this._disposeSource();
    };
    WebAudioChannel.prototype._onDecodeComplete = function (buffer) {
        if (!this._isPlaying)
            return;
        this._isDecoding = false;
        //if (buffer.duration < 2) //cache all buffers?
        WebAudioChannel._decodeCache[this._id] = buffer;
        if (this._source)
            this._disposeSource();
        this._source = this._audioCtx.createBufferSource();
        this._source.loop = this._isLooping;
        this._source.connect(this._gainNode);
        this._source.buffer = buffer;
        this._duration = buffer.duration;
        this._startTime = this._audioCtx.currentTime - this._currentTime;
        this._source.onended = this._onEndedDelegate;
        try {
            this._source.start(this._audioCtx.currentTime, this._currentTime);
        }
        catch (error) {
            console.log("Error starting audio: " + error);
            this._disposeSource();
        }
    };
    WebAudioChannel.prototype._onError = function (event) {
        console.log("Error with decoding audio data");
        WebAudioChannel._errorCache[this._id] = true;
        this.stop();
    };
    WebAudioChannel.prototype._onEnded = function (event) {
        this.stop();
    };
    WebAudioChannel.prototype._disposeSource = function () {
        //clean up
        this._source.stop(this._audioCtx.currentTime);
        this._source.onended = null;
        this._source.disconnect();
        delete this._source.buffer;
        delete this._source;
        this._source = null;
    };
    WebAudioChannel.maxChannels = 64;
    WebAudioChannel._channels = new Array();
    WebAudioChannel._decodeCache = new Object();
    WebAudioChannel._errorCache = new Object();
    return WebAudioChannel;
}());
exports.WebAudioChannel = WebAudioChannel;
