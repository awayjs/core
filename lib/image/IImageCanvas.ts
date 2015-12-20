interface IImageCanvas {
    width: number;

    height: number;

    getContext(contextId:string): CanvasRenderingContext2D;

}

export = IImageCanvas;