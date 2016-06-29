"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WaveAudio_1 = require("../audio/WaveAudio");
var URLLoaderDataFormat_1 = require("../net/URLLoaderDataFormat");
var ParserBase_1 = require("../parsers/ParserBase");
var ByteArray_1 = require("../utils/ByteArray");
var WaveAudioParser = (function (_super) {
    __extends(WaveAudioParser, _super);
    function WaveAudioParser() {
        _super.call(this, URLLoaderDataFormat_1.URLLoaderDataFormat.BLOB);
    }
    WaveAudioParser.supportsType = function (extension) {
        extension = extension.toLowerCase();
        return extension == "wav" || extension == "mp3" || extension == "ogg";
    };
    WaveAudioParser.supportsData = function (data) {
        if (!(data instanceof ByteArray_1.ByteArray))
            return false;
        var ba = data;
        var filetype = WaveAudioParser.parseFileType(ba);
        return filetype ? true : false;
    };
    WaveAudioParser.prototype._pStartParsing = function (frameLimit) {
        //clear content
        delete this._pContent;
        this._pContent = null;
        _super.prototype._pStartParsing.call(this, frameLimit);
    };
    WaveAudioParser.prototype._pProceedParsing = function () {
        if (this.data instanceof ByteArray_1.ByteArray) {
            this._pContent = new WaveAudio_1.WaveAudio(this.data.arraybytes);
            this._pFinalizeAsset(this._pContent, this._iFileName);
        }
        else if (this.data instanceof ArrayBuffer) {
            this._pContent = new WaveAudio_1.WaveAudio(this.data);
            this._pFinalizeAsset(this._pContent, this._iFileName);
        }
        return ParserBase_1.ParserBase.PARSING_DONE;
    };
    WaveAudioParser.parseFileType = function (ba) {
        //old mp3 detections
        // This does not seem to work for all my mp3 files (i tested different mp3 encoders)
        // I leave it in, because it might work for mp3 data that i do not have here to test
        ba.position = 0;
        if ((ba.readUnsignedShort() & 0xFFE0) == 0xFFE0) {
            return 'mp3'; // test for MP3 syncword
        }
        // new mp3 detection
        // this from is-mp3 npm module,
        // but still i have mp3 files that are not detected by this
        // i added the hack: (byte_1 === 255 && byte_2 === 243 && byte_3 === 130) 	to catch those mp3s
        // todo: find a more foolproof way to detect al mp3 (my hack might collide with detection for other filetypes)
        ba.position = 0;
        var byte_1 = ba.readUnsignedByte();
        var byte_2 = ba.readUnsignedByte();
        var byte_3 = ba.readUnsignedByte();
        if ((byte_1 === 73 && byte_2 === 68 && byte_3 === 51)
            || (byte_1 === 255 && byte_2 === 251)
            || (byte_1 === 255 && byte_2 === 243 && byte_3 === 130)) {
            return 'mp3';
        }
        ba.position = 0;
        if (ba.readUTFBytes(4) == 'RIFF')
            return 'wav';
        ba.position = 0;
        if (ba.readUTFBytes(4) == 'OggS')
            return 'ogg';
        ba.position = 0;
        return null;
    };
    return WaveAudioParser;
}(ParserBase_1.ParserBase));
exports.WaveAudioParser = WaveAudioParser;
