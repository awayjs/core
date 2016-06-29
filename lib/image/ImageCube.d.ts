import { ImageBase } from "../image/ImageBase";
export declare class ImageCube extends ImageBase {
    static assetType: string;
    _size: number;
    /**
     *
     * @returns {string}
     */
    readonly assetType: string;
    /**
     * The size of the cube bitmap in pixels.
     */
    size: number;
    /**
     *
     */
    constructor(size: number);
    /**
     *
     * @param width
     * @param height
     * @private
     */
    _setSize(size: number): void;
    /**
     *
     * @private
     */
    private _testDimensions();
}
