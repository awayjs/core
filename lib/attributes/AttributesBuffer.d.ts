import { AttributesView } from "../attributes/AttributesView";
import { AssetBase } from "../library/AssetBase";
export declare class AttributesBuffer extends AssetBase {
    static assetType: string;
    private _count;
    private _stride;
    private _newStride;
    private _buffer;
    private _bufferView;
    private _contentDirty;
    private _lengthDirty;
    private _viewVOs;
    /**
     *
     * @returns {string}
     */
    readonly assetType: string;
    stride: number;
    count: number;
    readonly buffer: ArrayBuffer;
    bufferView: Uint8Array;
    readonly length: number;
    /**
     *
     */
    constructor(stride?: number, count?: number);
    /**
     *
     */
    invalidate(): void;
    /**
     *
     * @private
     */
    resize(): void;
    clone(): AttributesBuffer;
    getView(index: number): AttributesView;
    _setAttributes(viewIndex: number, arrayBufferView: ArrayBufferView, offset?: number): void;
    _addView(view: AttributesView): void;
    _removeView(view: AttributesView): void;
    _getOffset(viewIndex: number): number;
    _updateLength(): void;
}
