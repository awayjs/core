import { BitmapImage2D } from "../image/BitmapImage2D";
import { Image2D } from "../image/Image2D";
/**
 *
 */
export declare class SpecularImage2D extends Image2D {
    static assetType: string;
    private _specularSource;
    private _glossSource;
    private _output;
    /**
     *
     * @returns {string}
     */
    readonly assetType: string;
    specularSource: BitmapImage2D;
    glossSource: BitmapImage2D;
    /**
     *
     */
    constructor(specularSource?: BitmapImage2D, glossSource?: BitmapImage2D);
    /**
     * Returns a new SpecularImage2D object that is a clone of the original instance
     * with an exact copy of the contained bitmap.
     *
     * @return A new SpecularImage2D object that is identical to the original.
     */
    clone(): SpecularImage2D;
    /**
     * Frees memory that is used to store the SpecularImage2D object.
     *
     * <p>When the <code>dispose()</code> method is called on an image, the width
     * and height of the image are set to 0. All subsequent calls to methods or
     * properties of this SpecularImage2D instance fail, and an exception is thrown.
     * </p>
     *
     * <p><code>SpecularImage2D.dispose()</code> releases the memory occupied by the
     * actual bitmap data, immediately(a bitmap can consume up to 64 MB of
     * memory). After using <code>SpecularImage2D.dispose()</code>, the SpecularImage2D
     * object is no longer usable and an exception may be thrown if
     * you call functions on the SpecularImage2D object. However,
     * <code>SpecularImage2D.dispose()</code> does not garbage collect the SpecularImage2D
     * object(approximately 128 bytes); the memory occupied by the actual
     * SpecularImage2D object is released at the time the SpecularImage2D object is
     * collected by the garbage collector.</p>
     *
     */
    dispose(): void;
    /**
     *
     * @returns {ImageData}
     */
    getImageData(): ImageData;
    /**
     *
     * @returns {HTMLCanvasElement}
     */
    getCanvas(): HTMLCanvasElement;
    /**
     *
     * @param width
     * @param height
     * @private
     */
    _setSize(width: number, height: number): void;
    private _testSize();
}
