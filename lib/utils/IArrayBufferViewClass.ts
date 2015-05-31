interface IArrayBufferViewClass
{
	BYTES_PER_ELEMENT:number;

	new (length: number): ArrayBufferView;
	new (array: ArrayBufferView): ArrayBufferView;
	new (array: number[]): ArrayBufferView;
	new (buffer: ArrayBuffer, byteOffset?: number, length?: number): ArrayBufferView;
}

export = IArrayBufferViewClass;