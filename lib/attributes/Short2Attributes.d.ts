import { AttributesBuffer } from "../attributes/AttributesBuffer";
import { AttributesView } from "../attributes/AttributesView";
export declare class Short2Attributes extends AttributesView {
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
    set(typedArray: Uint16Array, offset?: number): any;
    set(typedArray: Int16Array, offset?: number): any;
    get(count: number, offset?: number): Uint16Array;
    get(count: number, offset?: number): Int16Array;
    _internalClone(attributesBuffer: AttributesBuffer): Short2Attributes;
    clone(attributesBuffer?: AttributesBuffer): Short2Attributes;
}
