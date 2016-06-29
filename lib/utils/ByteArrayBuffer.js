"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ByteArrayBase_1 = require("../utils/ByteArrayBase");
var ByteArrayBuffer = (function (_super) {
    __extends(ByteArrayBuffer, _super);
    function ByteArrayBuffer() {
        _super.call(this);
        this._bytes = [];
        this._mode = "Array";
    }
    ByteArrayBuffer.prototype.writeByte = function (b) {
        var bi = ~~b;
        this._bytes[this.position++] = bi;
        if (this.position > this.length) {
            this.length = this.position;
        }
    };
    ByteArrayBuffer.prototype.readByte = function () {
        if (this.position >= this.length) {
            throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
        }
        return this._bytes[this.position++];
    };
    ByteArrayBuffer.prototype.writeUnsignedByte = function (b) {
        var bi = ~~b;
        this._bytes[this.position++] = bi & 0xff;
        if (this.position > this.length) {
            this.length = this.position;
        }
    };
    ByteArrayBuffer.prototype.readUnsignedByte = function () {
        if (this.position >= this.length) {
            throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
        }
        return this._bytes[this.position++];
    };
    ByteArrayBuffer.prototype.writeUnsignedShort = function (b) {
        var bi = ~~b;
        this._bytes[this.position++] = bi & 0xff;
        this._bytes[this.position++] = (bi >> 8) & 0xff;
        if (this.position > this.length) {
            this.length = this.position;
        }
    };
    ByteArrayBuffer.prototype.readUnsignedShort = function () {
        if (this.position + 2 > this.length)
            throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
        var r = this._bytes[this.position] | (this._bytes[this.position + 1] << 8);
        this.position += 2;
        return r;
    };
    ByteArrayBuffer.prototype.writeUnsignedInt = function (b) {
        var bi = ~~b;
        this._bytes[this.position++] = bi & 0xff;
        this._bytes[this.position++] = (bi >>> 8) & 0xff;
        this._bytes[this.position++] = (bi >>> 16) & 0xff;
        this._bytes[this.position++] = (bi >>> 24) & 0xff;
        if (this.position > this.length) {
            this.length = this.position;
        }
    };
    ByteArrayBuffer.prototype.readUnsignedInt = function () {
        if (this.position + 4 > this.length) {
            throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
        }
        var r = this._bytes[this.position] | (this._bytes[this.position + 1] << 8) | (this._bytes[this.position + 2] << 16) | (this._bytes[this.position + 3] << 24);
        this.position += 4;
        return r >>> 0;
    };
    ByteArrayBuffer.prototype.writeFloat = function (b) {
        // this is crazy slow and silly, but as a fallback...
        this.writeUnsignedInt(this.toFloatBits(Number(b)));
    };
    ByteArrayBuffer.prototype.toFloatBits = function (x) {
        // don't handle inf/nan yet
        // special case zero
        if (x == 0) {
            return 0;
        }
        // remove the sign, after this we only deal with positive numbers
        var sign = 0;
        if (x < 0) {
            x = -x;
            sign = 1;
        }
        else {
            sign = 0;
        }
        // a float value is now defined as: x = (1+(mantissa*2^-23))*(2^(exponent-127))
        var exponent = Math.log(x) / Math.log(2); // rough exponent
        exponent = Math.floor(exponent);
        x = x * Math.pow(2, 23 - exponent); // normalize to 24 bits
        var mantissa = Math.floor(x) - 0x800000;
        exponent = exponent + 127;
        return ((sign << 31) >>> 0) | (exponent << 23) | mantissa;
    };
    ByteArrayBuffer.prototype.readFloat = function (b) {
        return this.fromFloatBits(this.readUnsignedInt());
    };
    ByteArrayBuffer.prototype.fromFloatBits = function (x) {
        if (x == 0) {
            return 0;
        }
        var exponent = (x >>> 23) & 0xff;
        var mantissa = (x & 0x7fffff) | 0x800000;
        var y = Math.pow(2, (exponent - 127) - 23) * mantissa;
        if (x >>> 31 != 0) {
            y = -y;
        }
        return y;
    };
    return ByteArrayBuffer;
}(ByteArrayBase_1.ByteArrayBase));
exports.ByteArrayBuffer = ByteArrayBuffer;
