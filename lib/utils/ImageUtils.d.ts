import { Image2D } from "../image/Image2D";
export declare class ImageUtils {
    private static MAX_SIZE;
    static isImage2DValid(image2D: Image2D): boolean;
    static isHTMLImageElementValid(image: HTMLImageElement): boolean;
    static isDimensionValid(d: number, powerOfTwo?: boolean): boolean;
    static isPowerOfTwo(value: number): boolean;
    static getBestPowerOf2(value: number): number;
}
export default ImageUtils;
