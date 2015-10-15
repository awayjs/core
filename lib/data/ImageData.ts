class ImageData {
    public width: number;
    public data: number[] = [];
    public height: number;

    constructor(width:number, height:number) {
        this.width = width;
        this.height = height;
    }
}
export = ImageData;