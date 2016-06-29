import { AttributesBuffer } from "../attributes/AttributesBuffer";
import { AssetBase } from "../library/AssetBase";
import { IArrayBufferViewClass } from "../utils/IArrayBufferViewClass";
export declare class AttributesView extends AssetBase {
    static assetType: string;
    /**
     *
     */
    readonly assetType: string;
    _cloneCache: AttributesView;
    _attributesBuffer: AttributesBuffer;
    _bufferDirty: boolean;
    private _size;
    private _dimensions;
    private _unsigned;
    _index: number;
    _arrayClass: IArrayBufferViewClass;
    normalized: boolean;
    readonly attributesBuffer: AttributesBuffer;
    /**
     *
     * @returns {number}
     */
    size: number;
    /**
     *
     * @returns {number}
     */
    dimensions: number;
    readonly unsigned: boolean;
    count: number;
    readonly offset: number;
    readonly length: number;
    readonly stride: number;
    /**
     *
     */
    constructor(arrayClass: IArrayBufferViewClass, dimensions: number, count?: number, unsigned?: boolean);
    constructor(arrayClass: IArrayBufferViewClass, dimensions: number, attributesBuffer?: AttributesBuffer, unsigned?: boolean);
    set(array: Array<number>, offset?: number): any;
    set(arrayBufferView: ArrayBufferView, offset?: number): any;
    get(count: number, offset?: number): ArrayBufferView;
    _internalClone(attributesBuffer: AttributesBuffer): AttributesView;
    clone(attributesBuffer?: AttributesBuffer): AttributesView;
    /**
     * @inheritDoc
     */
    dispose(): void;
}
