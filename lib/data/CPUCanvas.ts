import IImageCanvas                = require("awayjs-core/lib/data/IImageCanvas");
import CPURenderingContext2D = require('awayjs-core/lib/data/CPURenderingContext2D');
import ImageData = require('awayjs-core/lib/data/ImageData');

class CPUCanvas implements IImageCanvas {
    public width:number = 1;
    public height:number = 1;

    private imageData:ImageData;

    getContext(contextId:string):CanvasRenderingContext2D {
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
                this.imageData.data.length = 0;
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
export = CPUCanvas;