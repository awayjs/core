export interface IImageCanvas {
    width: number;

    height: number;

    getContext(contextId: "2d"): CanvasRenderingContext2D;
    getContext(contextId: "experimental-webgl"): WebGLRenderingContext;
    getContext(contextId: string, ...args: any[]): CanvasRenderingContext2D | WebGLRenderingContext;

}