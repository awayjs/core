"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AudioManager_1 = require("../managers/AudioManager");
var AssetBase_1 = require("../library/AssetBase");
// TODO: Audio should probably be an interface containing play/stop/seek functionality
var WaveAudio = (function (_super) {
    __extends(WaveAudio, _super);
    /**
     *
     */
    function WaveAudio(buffer) {
        _super.call(this);
        this._volume = 1;
        this._buffer = buffer;
    }
    Object.defineProperty(WaveAudio.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return WaveAudio.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WaveAudio.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (value) {
            if (this._volume == value)
                return;
            this._volume = value;
            if (this._audioChannel)
                this._audioChannel.volume = this._volume;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WaveAudio.prototype, "currentTime", {
        get: function () {
            if (this._audioChannel)
                return this._audioChannel.currentTime;
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WaveAudio.prototype, "duration", {
        get: function () {
            if (this._audioChannel)
                return this._audioChannel.duration;
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    WaveAudio.prototype.dispose = function () {
        this.stop();
    };
    WaveAudio.prototype.play = function (offset, loop) {
        if (loop === void 0) { loop = false; }
        this._audioChannel = AudioManager_1.AudioManager.getChannel(this._buffer.byteLength);
        if (this._audioChannel) {
            this._audioChannel.volume = this._volume;
            this._audioChannel.play(this._buffer, offset, loop, this.id);
        }
    };
    WaveAudio.prototype.stop = function () {
        if (this._audioChannel)
            this._audioChannel.stop();
        delete this._audioChannel;
        this._audioChannel = null;
    };
    WaveAudio.prototype.clone = function () {
        var newInstance = new WaveAudio(this._buffer);
        newInstance.name = this.name;
        return newInstance;
    };
    WaveAudio.assetType = "[asset WaveAudio]";
    return WaveAudio;
}(AssetBase_1.AssetBase));
exports.WaveAudio = WaveAudio;
