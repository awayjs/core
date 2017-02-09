export interface IArrayBufferViewClass
{
	BYTES_PER_ELEMENT:number;

	new (length: number): ArrayBufferView;
	new (array: ArrayLike<number>): ArrayBufferView;
	new (buffer: ArrayBuffer, byteOffset?: number, length?: number): ArrayBufferView;
}