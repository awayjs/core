import { AttributesBuffer } from "../attributes/AttributesBuffer";
import { AttributesView } from "../attributes/AttributesView";
export declare class Byte4Attributes extends AttributesView {
    static assetType: string;
    /**
     *
     * @returns {string}
     */
    readonly assetType: string;
    /**
     *
     */
    constructor(length?: number, unsigned?: boolean);
    constructor(attributesBuffer?: AttributesBuffer, unsigned?: boolean);
    set(array: Array<number>, offset?: number): any;
    set(typedArray: Float32Array, offset?: number): any;
    set(typedArray: Uint8Array, offset?: number): any;
    set(typedArray: Int8Array, offset?: number): any;
    get(count: number, offset?: number): Uint8Array;
    get(count: number, offset?: number): Int8Array;
    _internalClone(attributesBuffer: AttributesBuffer): Byte4Attributes;
    clone(attributesBuffer?: AttributesBuffer): Byte4Attributes;
}
