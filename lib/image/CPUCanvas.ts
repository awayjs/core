import {IImageCanvas}					from "../image/IImageCanvas";
import {CPURenderingContext2D}		from "../image/CPURenderingContext2D";
import {ImageData}					from "../image/ImageData";

export class CPUCanvas implements IImageCanvas {
	public width:number = 1;
	public height:number = 1;

	private imageData:ImageData;

	getContext(contextId: "2d"): CanvasRenderingContext2D;
	getContext(contextId: "experimental-webgl"): WebGLRenderingContext;
	getContext(contextId: string, ...args: any[]): CanvasRenderingContext2D | WebGLRenderingContext;
	getContext(contextId: string, ...args: any[]): any
	{
		return new CPURenderingContext2D(this);
	}

	constructor() {
		this.reset();
	}

	public reset() {
		if (!this.imageData) {
			this.imageData = new ImageData(this.width, this.height);
		}else{
			this.imageData.width = this.width;
			this.imageData.height = this.height;

			if(this.imageData.data) {
				//this.imageData.data.length = 0;
				this.imageData.data = null;
			}
			this.imageData.data = new Uint8Array(this.width*this.height*4);
		}

		for (var i:number = 0; i < this.width * this.height * 4; i += 4) {
			this.imageData.data[i] = 255;
			this.imageData.data[i + 1] = 255;
			this.imageData.data[i + 2] = 255;
			this.imageData.data[i + 3] = 255;
		}
	}

	public getImageData():ImageData {
		if (this.imageData.width != this.width || this.imageData.height != this.height) {
			this.reset();
		}
		return this.imageData;
	}


}
export default CPUCanvas;