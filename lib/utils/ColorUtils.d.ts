/**
 *
 */
export declare class ColorUtils {
    static float32ColorToARGB(float32Color: number): number[];
    static ARGBtoFloat32(a: number, r: number, g: number, b: number): number;
    private static componentToHex(c);
    static RGBToHexString(argb: number[]): string;
    static ARGBToHexString(argb: number[]): string;
}
