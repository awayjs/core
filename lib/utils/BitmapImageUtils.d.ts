import { BlendMode } from "../image/BlendMode";
import { ColorTransform } from "../geom/ColorTransform";
import { Matrix } from "../geom/Matrix";
import { Rectangle } from "../geom/Rectangle";
export declare class BitmapImageUtils {
    static _fillRect(context: CanvasRenderingContext2D, rect: Rectangle, color: number, transparent: boolean): void;
    static _copyPixels(context: CanvasRenderingContext2D, bmpd: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, sourceRect: Rectangle, destRect: Rectangle): void;
    static _draw(context: CanvasRenderingContext2D, source: any, matrix: Matrix, colorTransform: ColorTransform, blendMode: BlendMode, clipRect: Rectangle, smoothing: boolean): void;
}
