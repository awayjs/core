export class Byte32Array
{
	private _maxLength:number = -1;
	private _arrayBuffer:ArrayBuffer;

	private _float32Array:Float32Array;
	private _int32Array:Int32Array;
	private _uint32Array:Uint32Array;

	public bytePosition:number = 0;

	public byteLength:number = -1;
	
	public get arrayBuffer():ArrayBuffer
	{
		return this._arrayBuffer;
	}
	
	public set arrayBuffer(value:ArrayBuffer)
	{
		//reset position
		this.bytePosition = 0;

		//clear length
		this.byteLength = -1;
		this._maxLength = -1;

		//calc new length
		this._ensureSpace(value.byteLength);

		//write new buffer
		this._int32Array.set(new Int32Array(value));
	}
	
	
	constructor(byteLength:number = 0)
	{
		this._ensureSpace(byteLength);
	}
	
	public readByte32Array(byte32Array:Byte32Array, byteLength:number = -1):void
	{
		if (byteLength == -1)
			byteLength = byte32Array.byteLength - byte32Array.bytePosition;

		byte32Array.writeInt32Array(this._int32Array.subarray(this.bytePosition/4, (this.bytePosition + byteLength)/4));

		this.bytePosition += byteLength;
	}

	public writeByte32Array(byte32Array:Byte32Array):void
	{
		byte32Array.bytePosition = 0;

		byte32Array.readByte32Array(this, byte32Array.byteLength);
	}

	public writeFloat32Array(float32Array:Float32Array):void
	{
		this._ensureSpace(this.bytePosition + float32Array.length*4);

		this._uint32Array.set(float32Array, this.bytePosition/4);

		this.bytePosition += float32Array.length*4;
	}
	
	public writeInt32Array(int32Array:Int32Array):void
	{
		this._ensureSpace(this.bytePosition + int32Array.length*4);

		this._uint32Array.set(int32Array, this.bytePosition/4);

		this.bytePosition += int32Array.length*4;
	}
	
	public writeUint32Array(uint32Array:Uint32Array):void
	{
		this._ensureSpace(this.bytePosition + uint32Array.length*4);

		this._uint32Array.set(uint32Array, this.bytePosition/4);
		
		this.bytePosition += uint32Array.length*4;
	}

	public readFloat32Array(float32Array:Float32Array):void
	{
		float32Array.set(this._float32Array.subarray(this.bytePosition/4, this.bytePosition/4 + float32Array.length));
	}

	public readInt32Array(int32Array:Int32Array):void
	{
		int32Array.set(this._int32Array.subarray(this.bytePosition/4, this.bytePosition/4 + int32Array.length));
	}

	public readUint32Array(uint32Array:Uint32Array):void
	{
		uint32Array.set(this._uint32Array.subarray(this.bytePosition/4, this.bytePosition/4 + uint32Array.length));
	}
	
	public getBytesAvailable():number
	{
		return this.byteLength - this.bytePosition;
	}
	
	public readUTFBytes(len:number):string
	{
		var value:string = "";
		var max:number = this.bytePosition + len;
		var data:DataView = new DataView(this._arrayBuffer);
		// utf8-encode
		while (this.bytePosition < max) {

			var c:number = data.getUint8(this.bytePosition++);

			if (c < 0x80) {

				if (c == 0) break;
				value += String.fromCharCode(c);

			} else if (c < 0xE0) {

				value += String.fromCharCode(((c & 0x3F) << 6) | (data.getUint8(this.bytePosition++) & 0x7F));

			} else if (c < 0xF0) {

				var c2 = data.getUint8(this.bytePosition++);
				value += String.fromCharCode(((c & 0x1F) << 12) | ((c2 & 0x7F) << 6) | (data.getUint8(this.bytePosition++) & 0x7F));

			} else {

				var c2 = data.getUint8(this.bytePosition++);
				var c3 = data.getUint8(this.bytePosition++);

				value += String.fromCharCode(((c & 0x0F) << 18) | ((c2 & 0x7F) << 12) | ((c3 << 6) & 0x7F) | (data.getUint8(this.bytePosition++) & 0x7F));

			}

		}

		return value;
	}

	public writeUTFBytes(s:string)
	{
		var escstr:string = encodeURIComponent(s);
		var binstr:string = escstr.replace(/%([0-9A-F]{2})/g, function(match, p1) {
			return String.fromCharCode(parseInt('0x' + p1));
		});
		
		if(binstr.length%4){
			var padding:number=binstr.length%4;
			for (var i = 0; i < padding; i++)
				binstr += "\0";
		}
		
		this._ensureSpace(this.bytePosition + 4 + binstr.length);
		
		this.writeInt(binstr.length);
		
		for (var i=0; i<binstr.length; i+=4)
			this.writeUnsignedInt((binstr.charCodeAt(i) << 24) | (binstr.charCodeAt(i+1) << 16) | (binstr.charCodeAt(i+2) << 8)| binstr.charCodeAt(i));
		
		return binstr.length;
	}
	
	public readInt():number
	{
		if (this.bytePosition > this.byteLength + 4)
			throw "ByteArray out of bounds read. Position=" + this.bytePosition + ", Length=" + this.byteLength;

		var pa:number = this.bytePosition >> 2;
		this.bytePosition += 4;
		return this._int32Array[ pa ];
	}

	public writeUnsignedInt(b:number):void
	{
		this._ensureSpace(this.bytePosition + 4);
		
		this._uint32Array[ this.bytePosition >> 2 ] = (~~b) & 0xffffffff; // ~~ is cast to int in js...

		this.bytePosition += 4;
	}

	public writeInt(b:number):void
	{
		this._ensureSpace(this.bytePosition + 4);
		
		this._int32Array[ this.bytePosition >> 2 ] = (~~b); // ~~ is cast to int in js...
		
		this.bytePosition += 4;
	}

	public readUnsignedInt():number
	{
		if (this.bytePosition > this.byteLength + 4)
			throw "ByteArray out of bounds read. Position=" + this.bytePosition + ", Length=" + this.byteLength;
		
		var pa:number = this.bytePosition >> 2;
		this.bytePosition += 4;
		return this._uint32Array[ pa ];
	}

	public writeFloat(b:number):void
	{
		this._ensureSpace(this.bytePosition + 4);
		
		this._float32Array[this.bytePosition >> 2] = b;
		
		this.bytePosition += 4;
	}

	public readFloat():number
	{
		if (this.bytePosition > this.byteLength + 4)
			throw "ByteArray out of bounds read. Positon=" + this.bytePosition + ", Length=" + this.byteLength;

		var pa:number = this.bytePosition >> 2;
		this.bytePosition += 4;
		return this._float32Array[pa];
	}

	public _ensureSpace(length:number):void
	{
		if (this.byteLength < length) {
			this.byteLength = length;

			if (this._maxLength < length) { //add additional length in minimum 255-byte increments
				this._maxLength = Math.max((length + 255) & (~255), 4);

				var newArrayBuffer:ArrayBuffer = new ArrayBuffer(this._maxLength);
				var newInt32Array:Int32Array = new Int32Array(newArrayBuffer);
				
				if (this._int32Array)
					newInt32Array.set(this._int32Array); // memcpy

				this._uint32Array = new Uint32Array(newArrayBuffer);
				this._float32Array = new Float32Array(newArrayBuffer);
				this._int32Array = newInt32Array;

				this._arrayBuffer = newArrayBuffer;
			}
		}
	}
}