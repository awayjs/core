export declare class ByteArrayBase {
    position: number;
    length: number;
    _mode: string;
    static Base64Key: string;
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
    toFloatBits(x: number): void;
    readFloat(b: number): void;
    fromFloatBits(x: number): void;
    getBytesAvailable(): number;
    toString(): string;
    compareEqual(other: any, count: any): boolean;
    writeBase64String(s: string): void;
    dumpToConsole(): void;
    readBase64String(count: number): string;
    static internalGetBase64String(count: any, getUnsignedByteFunc: any, self: any): string;
}
