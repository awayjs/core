export class ImageData {
    public width: number;
    public data: any;
    public height: number;

    constructor(width:number, height:number) {
        this.width = width;
        this.height = height;
        this.data = new Uint8Array(width*height*4);
    }
}
export default ImageData;