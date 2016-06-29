import { IImageCanvas } from "../image/IImageCanvas";
import { ImageData } from "../image/ImageData";
export declare class CPUCanvas implements IImageCanvas {
    width: number;
    height: number;
    private imageData;
    getContext(contextId: "2d"): CanvasRenderingContext2D;
    getContext(contextId: "experimental-webgl"): WebGLRenderingContext;
    getContext(contextId: string, ...args: any[]): CanvasRenderingContext2D | WebGLRenderingContext;
    constructor();
    reset(): void;
    getImageData(): ImageData;
}
export default CPUCanvas;
