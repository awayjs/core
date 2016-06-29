import { AttributesBuffer } from "../attributes/AttributesBuffer";
import { AttributesView } from "../attributes/AttributesView";
export declare class Float4Attributes extends AttributesView {
    static assetType: string;
    /**
     *
     * @returns {string}
     */
    readonly assetType: string;
    /**
     *
     */
    constructor(length?: number);
    constructor(attributesBuffer?: AttributesBuffer);
    set(array: Array<number>, offset?: number): any;
    set(typedArray: Float32Array, offset?: number): any;
    get(count: number, offset?: number): Float32Array;
    _internalClone(attributesBuffer: AttributesBuffer): Float4Attributes;
    clone(attributesBuffer?: AttributesBuffer): Float4Attributes;
}
