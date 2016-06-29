"use strict";
var AbstractMethodError_1 = require("../errors/AbstractMethodError");
var ByteArrayBase = (function () {
    function ByteArrayBase() {
        this.position = 0;
        this.length = 0;
        this._mode = "";
    }
    ByteArrayBase.prototype.writeByte = function (b) {
        throw "Virtual method";
    };
    ByteArrayBase.prototype.readByte = function () {
        throw "Virtual method";
    };
    ByteArrayBase.prototype.writeUnsignedByte = function (b) {
        throw "Virtual method";
    };
    ByteArrayBase.prototype.readUnsignedByte = function () {
        throw "Virtual method";
    };
    ByteArrayBase.prototype.writeUnsignedShort = function (b) {
        throw "Virtual method";
    };
    ByteArrayBase.prototype.readUnsignedShort = function () {
        throw "Virtual method";
    };
    ByteArrayBase.prototype.writeUnsignedInt = function (b) {
        throw "Virtual method";
    };
    ByteArrayBase.prototype.readUnsignedInt = function () {
        throw "Virtual method";
    };
    ByteArrayBase.prototype.writeFloat = function (b) {
        throw "Virtual method";
    };
    ByteArrayBase.prototype.toFloatBits = function (x) {
        throw "Virtual method";
    };
    ByteArrayBase.prototype.readFloat = function (b) {
        throw "Virtual method";
    };
    ByteArrayBase.prototype.fromFloatBits = function (x) {
        throw "Virtual method";
    };
    ByteArrayBase.prototype.getBytesAvailable = function () {
        throw new AbstractMethodError_1.AbstractMethodError('ByteArrayBase, getBytesAvailable() not implemented ');
    };
    ByteArrayBase.prototype.toString = function () {
        return "[ByteArray] ( " + this._mode + " ) position=" + this.position + " length=" + this.length;
    };
    ByteArrayBase.prototype.compareEqual = function (other, count) {
        if (count == undefined || count > this.length - this.position)
            count = this.length - this.position;
        if (count > other.length - other.position)
            count = other.length - other.position;
        var co0 = count;
        var r = true;
        while (r && count >= 4) {
            count -= 4;
            if (this.readUnsignedInt() != other.readUnsignedInt())
                r = false;
        }
        while (r && count >= 1) {
            count--;
            if (this.readUnsignedByte() != other.readUnsignedByte())
                r = false;
        }
        var c0;
        this.position -= (c0 - count);
        other.position -= (c0 - count);
        return r;
    };
    ByteArrayBase.prototype.writeBase64String = function (s) {
        for (var i = 0; i < s.length; i++) {
            var v = s.charAt(i);
        }
    };
    ByteArrayBase.prototype.dumpToConsole = function () {
        var oldpos = this.position;
        this.position = 0;
        var nstep = 8;
        function asHexString(x, digits) {
            var lut = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
            var sh = "";
            for (var d = 0; d < digits; d++) {
                sh = lut[(x >> (d << 2)) & 0xf] + sh;
            }
            return sh;
        }
        for (var i = 0; i < this.length; i += nstep) {
            var s = asHexString(i, 4) + ":";
            for (var j = 0; j < nstep && i + j < this.length; j++) {
                s += " " + asHexString(this.readUnsignedByte(), 2);
            }
            console.log(s);
        }
        this.position = oldpos;
    };
    ByteArrayBase.prototype.readBase64String = function (count) {
        if (count == undefined || count > this.length - this.position)
            count = this.length - this.position;
        if (!(count > 0))
            return "";
        return ByteArrayBase.internalGetBase64String(count, this.readUnsignedByte, this);
    };
    ByteArrayBase.internalGetBase64String = function (count, getUnsignedByteFunc, self) {
        var r = "";
        var b0, b1, b2, enc1, enc2, enc3, enc4;
        var base64Key = ByteArrayBase.Base64Key;
        while (count >= 3) {
            b0 = getUnsignedByteFunc.apply(self);
            b1 = getUnsignedByteFunc.apply(self);
            b2 = getUnsignedByteFunc.apply(self);
            enc1 = b0 >> 2;
            enc2 = ((b0 & 3) << 4) | (b1 >> 4);
            enc3 = ((b1 & 15) << 2) | (b2 >> 6);
            enc4 = b2 & 63;
            r += base64Key.charAt(enc1) + base64Key.charAt(enc2) + base64Key.charAt(enc3) + base64Key.charAt(enc4);
            count -= 3;
        }
        // pad
        if (count == 2) {
            b0 = getUnsignedByteFunc.apply(self);
            b1 = getUnsignedByteFunc.apply(self);
            enc1 = b0 >> 2;
            enc2 = ((b0 & 3) << 4) | (b1 >> 4);
            enc3 = ((b1 & 15) << 2);
            r += base64Key.charAt(enc1) + base64Key.charAt(enc2) + base64Key.charAt(enc3) + "=";
        }
        else if (count == 1) {
            b0 = getUnsignedByteFunc.apply(self);
            enc1 = b0 >> 2;
            enc2 = ((b0 & 3) << 4);
            r += base64Key.charAt(enc1) + base64Key.charAt(enc2) + "==";
        }
        return r;
    };
    ByteArrayBase.Base64Key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    return ByteArrayBase;
}());
exports.ByteArrayBase = ByteArrayBase;
