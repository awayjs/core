class ImageData {
    public width: number;
    public data: number[];
    public height: number;

    constructor(width:number, height:number) {
        this.width = width;
        this.height = height;
        this.data = new Uint8Array(width*height*4);
    }
}
export = ImageData;