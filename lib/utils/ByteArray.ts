import ByteArrayBase			= require("awayjs-core/lib/utils/ByteArrayBase");

class ByteArray extends ByteArrayBase
{
	private _maxLength:number;
	private _arrayBuffer:ArrayBuffer;
	private _swapBuffer:ArrayBuffer;

	private _uint8Swap:Uint8Array;

	private _uint16Swap:Uint16Array;
	private _int16Swap:Int16Array;
	private _uint32Swap:Uint32Array;
	private _int32Swap:Int32Array;
	private _float32Swap:Float32Array;
	private _float64Swap:Float64Array;

	private _uint8Array:Uint8Array;
	private _int8Array:Int8Array;
	private _uint16Array:Uint16Array;
	private _int16Array:Int16Array;
	private _uint32Array:Uint32Array;
	private _int32Array:Int32Array;
	private _float32Array:Float32Array;
	private _float64Array:Float64Array;
	
	public get arrayBufferView():Uint8Array
	{
		return this._uint8Array;
	}
	
	constructor(length:number = 8)
	{
		super();
		this.length = length;
		this._mode = "Typed array";
		this._maxLength = length;
		this._arrayBuffer = new ArrayBuffer(this._maxLength);

		this._swapBuffer = new ArrayBuffer(16);
		
		this._uint8Swap = new Uint8Array(this._swapBuffer);
		this._uint16Swap = new Uint16Array(this._swapBuffer);
		this._int16Swap = new Int16Array(this._swapBuffer);
		this._uint32Swap = new Uint32Array(this._swapBuffer);
		this._int32Swap = new Int32Array(this._swapBuffer);
		this._float32Swap = new Float32Array(this._swapBuffer);
		this._float64Swap = new Float64Array(this._swapBuffer);
		
		this._updateViews();
	}

	public setArrayBuffer(aBuffer:ArrayBuffer):void
	{
		this.ensureSpace(aBuffer.byteLength);

		this.length = aBuffer.byteLength;
		
		this._uint8Array.set(new Uint8Array(aBuffer));

		this.position = 0;

	}

	public getBytesAvailable():number
	{
		return this.length - this.position;
	}

	public ensureSpace(n:number)
	{
		if (n > this._maxLength) {
			var newMaxLength:number = (n + 255) & (~255); //rounds up to the nearest multiple of 255 (or 8 bytes)
			var newArrayBuffer = new ArrayBuffer(newMaxLength);
			var newView = new Uint8Array(newArrayBuffer, 0, newMaxLength);
			newView.set(this._uint8Array);      // memcpy
			this._arrayBuffer = newArrayBuffer;
			this._maxLength = newMaxLength;

			this._updateViews();
		}
	}

	public writeByte(b:number)
	{
		this.ensureSpace(this.position + 1);

		this._int8Array[this.position++] = (~~b); // ~~ is cast to int in js...
		
		if (this.length < this.position)
			this.length = this.position;
	}

	public readByte():number
	{
		if (this.position + 1 > this.length)
			throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
		
		return this._int8Array[this.position++];
	}

	public readBytes(bytes:ByteArray, offset:number = 0, length:number = 0)
	{
		if (length == null)
			length = bytes.length;

		bytes.ensureSpace(this.position + offset + length);
		
		bytes.arrayBufferView.set(this._uint8Array.subarray(this.position, this.position + length), offset);

		this.position += length;

		if (length + offset > bytes.length)
			bytes.length += ( length + offset ) - bytes.length;
	}

	public writeUnsignedByte(b:number)
	{
		this.ensureSpace(this.position + 1);
		
		this._uint8Array[this.position++] = (~~b) & 0xff; // ~~ is cast to int in js...
		
		if (this.length < this.position)
			this.length = this.position;
	}

	public readUnsignedByte()
	{
		if (this.position + 1 > this.length)
			throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
		
		return this._uint8Array[this.position++];
	}

	public readUTFBytes(len:number):string
	{
		var value:string = "";
		var max:number = this.position + len;
		var data:DataView = new DataView(this._arrayBuffer);

		// utf8-encode
		while (this.position < max) {

			var c:number = data.getUint8(this.position++);

			if (c < 0x80) {

				if (c == 0) break;
				value += String.fromCharCode(c);

			} else if (c < 0xE0) {

				value += String.fromCharCode(((c & 0x3F) << 6) | (data.getUint8(this.position++) & 0x7F));

			} else if (c < 0xF0) {

				var c2 = data.getUint8(this.position++);
				value += String.fromCharCode(((c & 0x1F) << 12) | ((c2 & 0x7F) << 6) | (data.getUint8(this.position++) & 0x7F));

			} else {

				var c2 = data.getUint8(this.position++);
				var c3 = data.getUint8(this.position++);

				value += String.fromCharCode(((c & 0x0F) << 18) | ((c2 & 0x7F) << 12) | ((c3 << 6) & 0x7F) | (data.getUint8(this.position++) & 0x7F));

			}

		}

		return value;

	}


	public writeInt(b:number)
	{
		this.ensureSpace(this.position + 4);

		if ((this.position & 3) == 0) {
			this._int32Array[this.position >> 2] = (~~b); // ~~ is cast to int in js...
		} else {
			this._int32Swap[0] = (~~b);
			this._uint8Array[this.position] = this._uint8Swap[0];
			this._uint8Array[this.position + 1] = this._uint8Swap[1];
			this._uint8Array[this.position + 2] = this._uint8Swap[2];
			this._uint8Array[this.position + 3] = this._uint8Swap[3];
		}

		this.position += 4;

		if (this.length < this.position)
			this.length = this.position;
	}
	
	public readInt():number
	{
		if (this.position + 4 > this.length)
			throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;

		var view:Uint32Array;
		var pa:number;
		if ((this.position & 3) == 0) {
			view = this._int32Array;
			pa = this.position >> 2;
		} else {
			view = this._int32Swap;
			this._uint8Swap[0] = this._uint8Array[this.position];
			this._uint8Swap[1] = this._uint8Array[this.position + 1];
			this._uint8Swap[2] = this._uint8Array[this.position + 2];
			this._uint8Swap[3] = this._uint8Array[this.position + 3];
			pa = 0;
		}

		this.position += 4;

		return view[pa];
	}

	public writeShort(b:number)
	{
		this.ensureSpace(this.position + 2);

		if ((this.position & 1) == 0) {
			this._int16Array[this.position >> 1] = (~~b); // ~~ is cast to int in js...
		} else {
			this._int16Swap[0] = (~~b);
			this._uint8Array[this.position] = this._uint8Swap[0];
			this._uint8Array[this.position + 1] = this._uint8Swap[1];
		}

		this.position += 2;

		if (this.length < this.position)
			this.length = this.position;
	}

	public readShort():number
	{
		if (this.position + 2 > this.length)
			throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;

		var view:Uint16Array;
		var pa:number;
		if (( this.position & 1 ) == 0) {
			view = this._int16Array;
			pa = this.position >> 1;
		} else {
			view = this._int16Swap;
			this._uint8Swap[0] = this._uint8Array[this.position];
			this._uint8Swap[1] = this._uint8Array[this.position + 1];
			pa = 0;
		}

		this.position += 2;

		return view[pa];
	}

	public writeDouble(b:number)
	{
		this.ensureSpace(this.position + 8);

		if (( this.position & 7 ) == 0) {
			this._float64Array[this.position >> 3] = b;
		} else {
			this._float64Swap[0] = b
			this._uint8Array[this.position] = this._uint8Swap[0];
			this._uint8Array[this.position + 1] = this._uint8Swap[1];
			this._uint8Array[this.position + 2] = this._uint8Swap[2];
			this._uint8Array[this.position + 3] = this._uint8Swap[3];
			this._uint8Array[this.position + 4] = this._uint8Swap[4];
			this._uint8Array[this.position + 5] = this._uint8Swap[5];
			this._uint8Array[this.position + 6] = this._uint8Swap[6];
			this._uint8Array[this.position + 7] = this._uint8Swap[7];
		}

		this.position += 8;

		if (this.length < this.position)
			this.length = this.position;
	}
	
	public readDouble():number
	{
		if (this.position + 8 > this.length)
			throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;

		var view:Float32Array;
		var pa:number;
		if ((this.position & 7) == 0) {
			view = this._float64Array;
			pa = this.position >> 3;
		} else {
			view = this._float64Swap;
			this._uint8Swap[0] = this._uint8Array[this.position];
			this._uint8Swap[1] = this._uint8Array[this.position + 1];
			this._uint8Swap[2] = this._uint8Array[this.position + 2];
			this._uint8Swap[3] = this._uint8Array[this.position + 3];
			this._uint8Swap[4] = this._uint8Array[this.position + 4];
			this._uint8Swap[5] = this._uint8Array[this.position + 5];
			this._uint8Swap[6] = this._uint8Array[this.position + 6];
			this._uint8Swap[7] = this._uint8Array[this.position + 7];
			pa = 0;
		}

		this.position += 8;

		return view[pa];
	}

	public writeUnsignedShort(b:number)
	{
		this.ensureSpace(this.position + 2);

		if ((this.position & 1) == 0) {
			this._uint16Array[this.position >> 1] = (~~b) & 0xffff; // ~~ is cast to int in js...
		} else {
			this._uint16Swap[0] = (~~b) & 0xffff;
			this._uint8Array[this.position] = this._uint8Swap[0];
			this._uint8Array[this.position + 1] = this._uint8Swap[1];
		}

		this.position += 2;

		if (this.length < this.position)
			this.length = this.position;
	}
	
	public readUnsignedShort():number
	{
		if (this.position + 2 > this.length)
			throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;

		var view:Uint16Array;
		var pa:number;
		if (( this.position & 1 ) == 0) {
			view = this._uint16Array;
			pa = this.position >> 1;
		} else {
			view = this._uint16Swap;
			this._uint8Swap[0] = this._uint8Array[this.position];
			this._uint8Swap[1] = this._uint8Array[this.position + 1];
			pa = 0;
		}

		this.position += 2;

		return view[pa];
	}

	public writeUnsignedInt(b:number)
	{
		this.ensureSpace(this.position + 4);
		
		if (( this.position & 3 ) == 0) {
			this._uint32Array[this.position >> 2] = (~~b) & 0xffffffff; // ~~ is cast to int in js...
		} else {
			this._uint32Swap[0] = (~~b) & 0xffffffff;
			this._uint8Array[this.position] = this._uint8Swap[0];
			this._uint8Array[this.position + 1] = this._uint8Swap[1];
			this._uint8Array[this.position + 2] = this._uint8Swap[2];
			this._uint8Array[this.position + 3] = this._uint8Swap[3];
		}
		
		this.position += 4;

		if (this.length < this.position)
			this.length = this.position;
	}

	public readUnsignedInt():number
	{
		if (this.position + 4 > this.length)
			throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;

		var view:Uint32Array;
		var pa:number;
		if (( this.position & 3 ) == 0) {
			view = this._uint32Array;
			pa = this.position >> 2;
		} else {
			view = this._uint32Swap;
			this._uint8Swap[0] = this._uint8Array[this.position];
			this._uint8Swap[1] = this._uint8Array[this.position + 1];
			this._uint8Swap[2] = this._uint8Array[this.position + 2];
			this._uint8Swap[3] = this._uint8Array[this.position + 3];
			pa = 0;
		}

		this.position += 4;

		return view[pa];
	}

	public writeFloat(b:number)
	{
		this.ensureSpace(this.position + 4);

		var view:Float32Array;
		if (( this.position & 3 ) == 0) {
			view = this._float32Array;
			view[this.position >> 2] = b;
		} else {
			this._float32Swap[0] = b;
			this._uint8Array[this.position] = this._uint8Swap[0];
			this._uint8Array[this.position + 1] = this._uint8Swap[1];
			this._uint8Array[this.position + 2] = this._uint8Swap[2];
			this._uint8Array[this.position + 3] = this._uint8Swap[3];
		}
		
		this.position += 4;

		if (this.length < this.position)
			this.length = this.position;
	}

	public readFloat():number
	{
		if (this.position + 4 > this.length)
			throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;

		var view:Float32Array;
		var pa:number;
		if ((this.position & 3) == 0) {
			view = this._float32Array;
			pa = this.position >> 2;
		} else {
			view = this._float32Swap;
			this._uint8Swap[0] = this._uint8Array[this.position];
			this._uint8Swap[1] = this._uint8Array[this.position + 1];
			this._uint8Swap[2] = this._uint8Array[this.position + 2];
			this._uint8Swap[3] = this._uint8Array[this.position + 3];
			pa = 0;
		}

		this.position += 4;

		return view[pa];
	}
	
	private _updateViews()
	{
		this._uint8Array = new Uint8Array(this._arrayBuffer);
		this._int8Array = new Int8Array(this._arrayBuffer);
		this._uint16Array = new Uint16Array(this._arrayBuffer);
		this._int16Array = new Int16Array(this._arrayBuffer);
		this._uint32Array = new Uint32Array(this._arrayBuffer);
		this._int32Array = new Int32Array(this._arrayBuffer);
		this._float32Array = new Float32Array(this._arrayBuffer);
		this._float64Array = new Float64Array(this._arrayBuffer);
	}
}

export = ByteArray;