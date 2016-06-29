import { ByteArrayBase } from "../utils/ByteArrayBase";
export declare class ByteArrayBuffer extends ByteArrayBase {
    _bytes: number[];
    constructor();
    writeByte(b: number): void;
    readByte(): number;
    writeUnsignedByte(b: number): void;
    readUnsignedByte(): number;
    writeUnsignedShort(b: number): void;
    readUnsignedShort(): number;
    writeUnsignedInt(b: number): void;
    readUnsignedInt(): number;
    writeFloat(b: number): void;
    toFloatBits(x: number): number;
    readFloat(b: number): number;
    fromFloatBits(x: number): number;
}
