import { ByteArrayBase } from "../utils/ByteArrayBase";
export declare class ByteArray extends ByteArrayBase {
    maxlength: number;
    arraybytes: any;
    unalignedarraybytestemp: any;
    constructor(maxlength?: number);
    ensureWriteableSpace(n: number): void;
    setArrayBuffer(aBuffer: ArrayBuffer): void;
    getBytesAvailable(): number;
    ensureSpace(n: number): void;
    writeByte(b: number): void;
    readByte(): number;
    readBytes(bytes: ByteArray, offset?: number, length?: number): void;
    writeUnsignedByte(b: number): void;
    readUnsignedByte(): number;
    writeUnsignedShort(b: number): void;
    readUTFBytes(len: number): string;
    readInt(): number;
    readShort(): number;
    readDouble(): number;
    readUnsignedShort(): number;
    writeUnsignedInt(b: number): void;
    readUnsignedInt(): number;
    writeFloat(b: number): void;
    readFloat(): number;
}
