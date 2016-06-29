import { BitmapImage2D } from "../image/BitmapImage2D";
export declare class MipmapGenerator {
    private static _mipMaps;
    private static _mipMapUses;
    private static _matrix;
    private static _rect;
    private static _source;
    /**
     * Uploads a BitmapImage2D with mip maps to a target Texture object.
     * @param source The source to upload.
     * @param target The target Texture to upload to.
     * @param mipmap An optional mip map holder to avoids creating new instances for fe animated materials.
     * @param alpha Indicate whether or not the uploaded bitmapData is transparent.
     */
    static _generateMipMaps(source: HTMLElement, output?: Array<BitmapImage2D>, alpha?: boolean): any;
    static _generateMipMaps(source: BitmapImage2D, output?: Array<BitmapImage2D>, alpha?: boolean): any;
    private static _getMipmapHolder(mipMapHolder, newW, newH);
    static _freeMipMapHolder(mipMapHolder: BitmapImage2D): void;
    static downsampleImage(bitmap: ImageData, destBitmap: ImageData): ImageData;
}
export declare class PolyphaseKernel {
    len: number;
    width: number;
    windowSize: number;
    data: number[];
    constructor(f: BoxFilter, srcLength: number, dstLength: number, samples: number);
    valueAt(column: number, x: number): number;
}
export declare class BoxFilter {
    readonly width: number;
    sampleBox(x: number, scale: number, samples: number): number;
    evaluate(x: number): number;
}
export default MipmapGenerator;
