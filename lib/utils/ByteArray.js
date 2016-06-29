"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ByteArrayBase_1 = require("../utils/ByteArrayBase");
var ByteArray = (function (_super) {
    __extends(ByteArray, _super);
    function ByteArray(maxlength) {
        if (maxlength === void 0) { maxlength = 4; }
        _super.call(this);
        this._mode = "Typed array";
        this.maxlength = Math.max((maxlength + 255) & (~255), 4);
        this.arraybytes = new ArrayBuffer(this.maxlength);
        this.unalignedarraybytestemp = new ArrayBuffer(16);
    }
    ByteArray.prototype.ensureWriteableSpace = function (n) {
        this.ensureSpace(n + this.position);
    };
    ByteArray.prototype.setArrayBuffer = function (aBuffer) {
        this.ensureSpace(aBuffer.byteLength);
        this.length = aBuffer.byteLength;
        var inInt8AView = new Int8Array(aBuffer);
        var localInt8View = new Int8Array(this.arraybytes, 0, this.length);
        localInt8View.set(inInt8AView);
        this.position = 0;
    };
    ByteArray.prototype.getBytesAvailable = function () {
        return (this.length) - (this.position);
    };
    ByteArray.prototype.ensureSpace = function (n) {
        if (n > this.maxlength) {
            var newmaxlength = (n + 255) & (~255);
            var newarraybuffer = new ArrayBuffer(newmaxlength);
            var view = new Uint8Array(this.arraybytes, 0, this.length);
            var newview = new Uint8Array(newarraybuffer, 0, this.length);
            newview.set(view); // memcpy
            this.arraybytes = newarraybuffer;
            this.maxlength = newmaxlength;
        }
    };
    ByteArray.prototype.writeByte = function (b) {
        this.ensureWriteableSpace(1);
        var view = new Int8Array(this.arraybytes);
        view[this.position++] = (~~b); // ~~ is cast to int in js...
        if (this.position > this.length) {
            this.length = this.position;
        }
    };
    ByteArray.prototype.readByte = function () {
        if (this.position >= this.length)
            throw "ByteArray out of bounds read. Positon=" + this.position + ", Length=" + this.length;
        var view = new Int8Array(this.arraybytes);
        return view[this.position++];
    };
    ByteArray.prototype.readBytes = function (bytes, offset, length) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = 0; }
        if (length == null)
            length = bytes.length;
        bytes.ensureWriteableSpace(offset + length);
        var byteView = new Int8Array(bytes.arraybytes);
        var localByteView = new Int8Array(this.arraybytes);
        byteView.set(localByteView.subarray(this.position, this.position + length), offset);
        this.position += length;
        if (length + offset > bytes.length)
            bytes.length += (length + offset) - bytes.length;
    };
    ByteArray.prototype.writeUnsignedByte = function (b) {
        this.ensureWriteableSpace(1);
        var view = new Uint8Array(this.arraybytes);
        view[this.position++] = (~~b) & 0xff; // ~~ is cast to int in js...
        if (this.position > this.length)
            this.length = this.position;
    };
    ByteArray.prototype.readUnsignedByte = function () {
        if (this.position >= this.length)
            throw "ByteArray out of bounds read. Positon=" + this.position + ", Length=" + this.length;
        var view = new Uint8Array(this.arraybytes);
        return view[this.position++];
    };
    ByteArray.prototype.writeUnsignedShort = function (b) {
        this.ensureWriteableSpace(2);
        if ((this.position & 1) == 0) {
            var view = new Uint16Array(this.arraybytes);
            view[this.position >> 1] = (~~b) & 0xffff; // ~~ is cast to int in js...
        }
        else {
            var view = new Uint16Array(this.unalignedarraybytestemp, 0, 1);
            view[0] = (~~b) & 0xffff;
            var view2 = new Uint8Array(this.arraybytes, this.position, 2);
            var view3 = new Uint8Array(this.unalignedarraybytestemp, 0, 2);
            view2.set(view3);
        }
        this.position += 2;
        if (this.position > this.length)
            this.length = this.position;
    };
    ByteArray.prototype.readUTFBytes = function (len) {
        var value = "";
        var max = this.position + len;
        var data = new DataView(this.arraybytes);
        // utf8-encode
        while (this.position < max) {
            var c = data.getUint8(this.position++);
            if (c < 0x80) {
                if (c == 0)
                    break;
                value += String.fromCharCode(c);
            }
            else if (c < 0xE0) {
                value += String.fromCharCode(((c & 0x3F) << 6) | (data.getUint8(this.position++) & 0x7F));
            }
            else if (c < 0xF0) {
                var c2 = data.getUint8(this.position++);
                value += String.fromCharCode(((c & 0x1F) << 12) | ((c2 & 0x7F) << 6) | (data.getUint8(this.position++) & 0x7F));
            }
            else {
                var c2 = data.getUint8(this.position++);
                var c3 = data.getUint8(this.position++);
                value += String.fromCharCode(((c & 0x0F) << 18) | ((c2 & 0x7F) << 12) | ((c3 << 6) & 0x7F) | (data.getUint8(this.position++) & 0x7F));
            }
        }
        return value;
    };
    ByteArray.prototype.readInt = function () {
        var data = new DataView(this.arraybytes);
        var int = data.getInt32(this.position, true);
        this.position += 4;
        return int;
    };
    ByteArray.prototype.readShort = function () {
        var data = new DataView(this.arraybytes);
        var short = data.getInt16(this.position, true);
        this.position += 2;
        return short;
    };
    ByteArray.prototype.readDouble = function () {
        var data = new DataView(this.arraybytes);
        var double = data.getFloat64(this.position, true);
        this.position += 8;
        return double;
    };
    ByteArray.prototype.readUnsignedShort = function () {
        if (this.position > this.length + 2)
            throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
        if ((this.position & 1) == 0) {
            var view = new Uint16Array(this.arraybytes);
            var pa = this.position >> 1;
            this.position += 2;
            return view[pa];
        }
        else {
            var view = new Uint16Array(this.unalignedarraybytestemp, 0, 1);
            var view2 = new Uint8Array(this.arraybytes, this.position, 2);
            var view3 = new Uint8Array(this.unalignedarraybytestemp, 0, 2);
            view3.set(view2);
            this.position += 2;
            return view[0];
        }
    };
    ByteArray.prototype.writeUnsignedInt = function (b) {
        this.ensureWriteableSpace(4);
        if ((this.position & 3) == 0) {
            var view = new Uint32Array(this.arraybytes);
            view[this.position >> 2] = (~~b) & 0xffffffff; // ~~ is cast to int in js...
        }
        else {
            var view = new Uint32Array(this.unalignedarraybytestemp, 0, 1);
            view[0] = (~~b) & 0xffffffff;
            var view2 = new Uint8Array(this.arraybytes, this.position, 4);
            var view3 = new Uint8Array(this.unalignedarraybytestemp, 0, 4);
            view2.set(view3);
        }
        this.position += 4;
        if (this.position > this.length)
            this.length = this.position;
    };
    ByteArray.prototype.readUnsignedInt = function () {
        if (this.position > this.length + 4)
            throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
        if ((this.position & 3) == 0) {
            var view = new Uint32Array(this.arraybytes);
            var pa = this.position >> 2;
            this.position += 4;
            return view[pa];
        }
        else {
            var view = new Uint32Array(this.unalignedarraybytestemp, 0, 1);
            var view2 = new Uint8Array(this.arraybytes, this.position, 4);
            var view3 = new Uint8Array(this.unalignedarraybytestemp, 0, 4);
            view3.set(view2);
            this.position += 4;
            return view[0];
        }
    };
    ByteArray.prototype.writeFloat = function (b) {
        this.ensureWriteableSpace(4);
        if ((this.position & 3) == 0) {
            var view = new Float32Array(this.arraybytes);
            view[this.position >> 2] = b;
        }
        else {
            var view = new Float32Array(this.unalignedarraybytestemp, 0, 1);
            view[0] = b;
            var view2 = new Uint8Array(this.arraybytes, this.position, 4);
            var view3 = new Uint8Array(this.unalignedarraybytestemp, 0, 4);
            view2.set(view3);
        }
        this.position += 4;
        if (this.position > this.length)
            this.length = this.position;
    };
    ByteArray.prototype.readFloat = function () {
        if (this.position > this.length + 4)
            throw "ByteArray out of bounds read. Positon=" + this.position + ", Length=" + this.length;
        if ((this.position & 3) == 0) {
            var view = new Float32Array(this.arraybytes);
            var pa = this.position >> 2;
            this.position += 4;
            return view[pa];
        }
        else {
            var view = new Float32Array(this.unalignedarraybytestemp, 0, 1);
            var view2 = new Uint8Array(this.arraybytes, this.position, 4);
            var view3 = new Uint8Array(this.unalignedarraybytestemp, 0, 4);
            view3.set(view2);
            this.position += 4;
            return view[0];
        }
    };
    return ByteArray;
}(ByteArrayBase_1.ByteArrayBase));
exports.ByteArray = ByteArray;
