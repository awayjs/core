import { ImageBase } from "../image/ImageBase";
import { Rectangle } from "../geom/Rectangle";
export declare class Image2D extends ImageBase {
    static assetType: string;
    _rect: Rectangle;
    private _powerOfTwo;
    /**
     *
     * @returns {string}
     */
    readonly assetType: string;
    /**
     * The height of the image in pixels.
     */
    height: number;
    /**
     * The rectangle that defines the size and location of the bitmap image. The
     * top and left of the rectangle are 0; the width and height are equal to the
     * width and height in pixels of the BitmapData object.
     */
    readonly rect: Rectangle;
    /**
     * The width of the bitmap image in pixels.
     */
    width: number;
    /**
     *
     */
    constructor(width: number, height: number, powerOfTwo?: boolean);
    /**
     *
     * @param width
     * @param height
     * @private
     */
    _setSize(width: number, height: number): void;
    /**
     *
     * @private
     */
    private _testDimensions();
    /**
     * Enable POT texture size validation
     * @returns {boolean}
     */
    powerOfTwo: boolean;
}
