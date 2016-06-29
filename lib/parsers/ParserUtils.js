"use strict";
var BitmapImage2D_1 = require("../image/BitmapImage2D");
var ByteArray_1 = require("../utils/ByteArray");
var ParserUtils = (function () {
    function ParserUtils() {
    }
    ParserUtils.arrayBufferToBase64 = function (data, mimeType) {
        var byteStr = '';
        var bytes = new Uint8Array(data);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++)
            byteStr += String.fromCharCode(bytes[i]);
        var base64Image = window.btoa(byteStr);
        return 'data:' + mimeType + ';base64,' + base64Image;
    };
    ParserUtils.arrayBufferToAudio = function (data, fileType) {
        var str = ParserUtils.arrayBufferToBase64(data, 'audio/' + fileType);
        var audio = new Audio();
        audio.src = str;
        return audio;
    };
    /**
     * Converts an ArrayBuffer to a base64 string
     *
     * @param image data as a ByteArray
     *
     * @return HTMLImageElement
     *
     */
    ParserUtils.arrayBufferToImage = function (data) {
        var str = ParserUtils.arrayBufferToBase64(data, 'image/png');
        var img = new Image();
        img.src = str;
        return img;
    };
    /**
     * Converts an ByteArray to an Image - returns an HTMLImageElement
     *
     * @param image data as a ByteArray
     *
     * @return HTMLImageElement
     *
     */
    ParserUtils.byteArrayToImage = function (data) {
        var str = ParserUtils.arrayBufferToBase64(data.arraybytes, 'image/png');
        var img = new Image();
        img.src = str;
        return img;
    };
    ParserUtils.byteArrayToAudio = function (data, filetype) {
        var str = ParserUtils.arrayBufferToBase64(data.arraybytes, 'audio/' + filetype);
        var audio = new Audio();
        audio.src = str;
        return audio;
    };
    /**
     * Converts an Blob to an Image - returns an HTMLImageElement
     *
     * @param image data as a Blob
     *
     * @return HTMLImageElement
     *
     */
    ParserUtils.blobToImage = function (data) {
        var URLObj = window['URL'] || window['webkitURL'];
        var src = URLObj.createObjectURL(data);
        var img = new Image();
        img.src = src;
        return img;
    };
    /**
     * Converts an Blob to audio - returns an HTMLAudioElement
     *
     * @param audio data as a Blob
     *
     * @return HTMLAudioElement
     *
     */
    ParserUtils.blobToAudio = function (data) {
        var URLObj = window['URL'] || window['webkitURL'];
        var src = URLObj.createObjectURL(data);
        var img = new Audio();
        img.src = src;
        return img;
    };
    /**
     *
     */
    ParserUtils.imageToBitmapImage2D = function (img, powerOfTwo) {
        if (powerOfTwo === void 0) { powerOfTwo = true; }
        var bitmapData = new BitmapImage2D_1.BitmapImage2D(img.width, img.height, true, null, powerOfTwo);
        bitmapData.draw(img);
        return bitmapData;
    };
    /**
     * Returns a object as ByteArray, if possible.
     *
     * @param data The object to return as ByteArray
     *
     * @return The ByteArray or null
     *
     */
    ParserUtils.toByteArray = function (data) {
        var b = new ByteArray_1.ByteArray();
        b.setArrayBuffer(data);
        return b;
    };
    /**
     * Returns a object as String, if possible.
     *
     * @param data The object to return as String
     * @param length The length of the returned String
     *
     * @return The String or null
     *
     */
    ParserUtils.toString = function (data, length) {
        if (length === void 0) { length = 0; }
        if (typeof data === 'string') {
            var s = data;
            if (s['substr'] != null)
                return s.substr(0, s.length);
        }
        if (data instanceof ByteArray_1.ByteArray) {
            var ba = data;
            ba.position = 0;
            return ba.readUTFBytes(Math.min(ba.getBytesAvailable(), length));
        }
        return null;
        /*
         var ba:ByteArray;

         length ||= uint.MAX_VALUE;

         if (data is String)
         return String(data).substr(0, length);

         ba = toByteArray(data);
         if (ba) {
         ba.position = 0;
         return ba.readUTFBytes(Math.min(ba.bytesAvailable, length));
         }

         return null;

         */
    };
    return ParserUtils;
}());
exports.ParserUtils = ParserUtils;
