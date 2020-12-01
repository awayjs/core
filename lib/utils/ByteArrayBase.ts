import { AbstractMethodError } from '../errors/AbstractMethodError';

export class ByteArrayBase {
	public position: number = 0;
	public length: number = 0;
	public _mode: string = '';

	public static Base64Key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	constructor() {
	}

	public writeByte(b: number): void {
		throw 'Virtual method';
	}

	public readByte(): number {
		throw 'Virtual method';
	}

	public writeUnsignedByte(b: number): void {
		throw 'Virtual method';
	}

	public readUnsignedByte(): number {
		throw 'Virtual method';
	}

	public writeUnsignedShort(b: number): void {
		throw 'Virtual method';
	}

	public readUnsignedShort(): number {
		throw 'Virtual method';
	}

	public writeUnsignedInt(b: number): void {
		throw 'Virtual method';
	}

	public readUnsignedInt(): number {
		throw 'Virtual method';
	}

	public writeFloat(b: number): void {
		throw 'Virtual method';
	}

	public toFloatBits(x: number): void {
		throw 'Virtual method';
	}

	public readFloat(b: number): void {
		throw 'Virtual method';
	}

	public fromFloatBits(x: number): void {
		throw 'Virtual method';
	}

	public getBytesAvailable(): number {
		throw new AbstractMethodError('ByteArrayBase, getBytesAvailable() not implemented ');
	}

	public toString(): string {
		return '[ByteArray] ( ' + this._mode + ' ) position=' + this.position + ' length=' + this.length;
	}

	public compareEqual(other, count): boolean {
		if (count == undefined || count > this.length - this.position)
			count = this.length - this.position;
		if (count > other.length - other.position)
			count = other.length - other.position;
		const c0 = count;
		let r: boolean = true;
		while (r && count >= 4) {
			count -= 4;
			if (this.readUnsignedInt() != other.readUnsignedInt()) r = false;
		}
		while (r && count >= 1) {
			count--;
			if (this.readUnsignedByte() != other.readUnsignedByte()) r = false;
		}

		this.position -= (c0 - count);
		other.position -= (c0 - count);
		return r;
	}

	public writeBase64String(s: string): void {
		// for (var i:number = 0; i < s.length; i++) {
		// 	var v = s.charAt(i);
		// }
	}

	public dumpToConsole(): void {
		const oldpos = this.position;
		this.position = 0;
		const nstep: number = 8;

		function asHexString(x, digits) {
			const lut: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
			let sh: string = '';
			for (let d: number = 0; d < digits; d++) {
				sh = lut[(x >> (d << 2)) & 0xf] + sh;
			}
			return sh;
		}

		for (let i = 0; i < this.length; i += nstep) {
			let s: string = asHexString(i, 4) + ':';
			for (let j: number = 0; j < nstep && i + j < this.length; j++) {
				s += ' ' + asHexString(this.readUnsignedByte(), 2);
			}
			console.log(s);
		}
		this.position = oldpos;
	}

	public readBase64String(count: number): string {
		if (count == undefined || count > this.length - this.position)
			count = this.length - this.position;
		if (!(count > 0)) return '';

		return ByteArrayBase.internalGetBase64String(count, this.readUnsignedByte, this);
	}

	// return base64 string of the next count bytes
	public static internalGetBase64String(count, getUnsignedByteFunc, self): string {
		let r: string = '';
		let b0, b1, b2, enc1, enc2, enc3, enc4;
		const base64Key = ByteArrayBase.Base64Key;
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
			r += base64Key.charAt(enc1) + base64Key.charAt(enc2) + base64Key.charAt(enc3) + '=';
		} else if (count == 1) {
			b0 = getUnsignedByteFunc.apply(self);
			enc1 = b0 >> 2;
			enc2 = ((b0 & 3) << 4);
			r += base64Key.charAt(enc1) + base64Key.charAt(enc2) + '==';
		}
		return r;
	}
}