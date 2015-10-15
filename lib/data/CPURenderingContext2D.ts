import ImageData = require('awayjs-core/lib/data/ImageData');
import CPUCanvas = require('awayjs-core/lib/data/CPUCanvas');
import BitmapImage2D = require("awayjs-core/lib/data/BitmapImage2D");
import Matrix = require("awayjs-core/lib/geom/Matrix");
import Point = require("awayjs-core/lib/geom/Point");

//TODO: implement all methods
class CPURenderingContext2D implements CanvasRenderingContext2D {
    public miterLimit:number;
    public font:string;
    public globalCompositeOperation:string;
    public msFillRule:string;
    public lineCap:string;
    public msImageSmoothingEnabled:boolean;
    public lineDashOffset:number;
    public shadowColor:string;
    public lineJoin:string;
    public shadowOffsetX:number;
    public lineWidth:number;
    public canvas:HTMLCanvasElement;
    public strokeStyle:any;
    public globalAlpha:number;
    public shadowOffsetY:number;
    public fillStyle:any;
    public shadowBlur:number;
    public textAlign:string;
    public textBaseline:string;

    public cpuCanvas:CPUCanvas;

    private matrix:Matrix;

    constructor(cpuCanvas:CPUCanvas) {
        this.cpuCanvas = cpuCanvas;
    }

    public restore():void {
        this.matrix = null;
    }

    public setTransform(m11:number, m12:number, m21:number, m22:number, dx:number, dy:number):void {
        this.matrix = new Matrix(m11, m12, m21, m22, dx, dy);
    }

    public save():void {
    }

    public arc(x:number, y:number, radius:number, startAngle:number, endAngle:number, anticlockwise:boolean):void {
    }

    public measureText(text:string):TextMetrics {
        return undefined;
    }

    public isPointInPath(x:number, y:number, fillRule:string):boolean {
        return undefined;
    }

    public quadraticCurveTo(cpx:number, cpy:number, x:number, y:number):void {
    }

    public putImageData(imagedata:ImageData, dx:number, dy:number, dirtyX:number, dirtyY:number, dirtyWidth:number, dirtyHeight:number):void {
    }

    public rotate(angle:number):void {
    }

    public fillText(text:string, x:number, y:number, maxWidth:number):void {
    }

    public translate(x:number, y:number):void {
    }

    public scale(x:number, y:number):void {
    }

    public createRadialGradient(x0:number, y0:number, r0:number, x1:number, y1:number, r1:number):CanvasGradient {
        return undefined;
    }

    public lineTo(x:number, y:number):void {
    }

    public getLineDash():number[] {
        return undefined;
    }

    public fill(fillRule:string):void {
    }

    public createImageData(imageDataOrSw:any, sh:number):ImageData {
        return undefined;
    }

    public createPattern(image:HTMLElement, repetition:string):CanvasPattern {
        return undefined;
    }

    public closePath():void {
    }

    public rect(x:number, y:number, w:number, h:number):void {
    }

    public clip(fillRule:string):void {
    }

    public clearRect(x:number, y:number, w:number, h:number):void {
    }

    public moveTo(x:number, y:number):void {
    }

    public getImageData(sx:number, sy:number, sw:number, sh:number):ImageData {
        //var result:ImageData = new ImageData(sw, sh);
        //var i:number = 0;
        //
        //for (i = 0; i < sw * sh * 4; i += 4) {
        //    result.data[i] = 255;
        //    result.data[i + 1] = 255;
        //    result.data[i + 2] = 255;
        //    result.data[i + 3] = 255;
        //}
        //
        //var imageData:ImageData = this.cpuCanvas.getImageData();
        //for (i = sx; i < sx + sw; i++) {
        //    for (var j:number = sy; j < sy + sh; j++) {
        //        this.copyPixel32(result, i - sx, i - sy, imageData, i, j);
        //    }
        //}
        return this.cpuCanvas.getImageData();
    }

    private point:Point = new Point();

    private copyPixel32(target:ImageData, x:number, y:number, source:ImageData, fromX:number, fromY:number) {
        x = Math.floor(x);
        y = Math.floor(y);
        fromX = Math.floor(fromX);
        fromY = Math.floor(fromY);

        if (x < 0 || x >= target.width || y >= target.height || y < 0) return;
        if (fromX < 0 || fromX >= source.width || fromY >= source.height || fromY < 0) return;
        var index:number = (x + y * target.width) * 4;
        var fromIndex:number = (fromX + fromY * source.width) * 4;
        target.data[index] = source.data[fromIndex];
        target.data[index + 1] = source.data[fromIndex + 1];
        target.data[index + 2] = source.data[fromIndex + 2];
        target.data[index + 3] = source.data[fromIndex + 3];
    }

    private parsedFillStyle:string;
    private parsedA:number;
    private parsedR:number;
    private parsedG:number;
    private parsedB:number;

    public fillRect(x:number, y:number, w:number, h:number):void {
        if (this.fillStyle) {
            if (this.parsedFillStyle != this.fillStyle) {
                var colorStrings:string[] = this.fillStyle.substring(5, this.fillStyle.lastIndexOf(")")).split(",");
                this.parsedA = parseFloat(colorStrings[3]) * 255;
                this.parsedR = parseInt(colorStrings[0]);
                this.parsedG = parseInt(colorStrings[1]);
                this.parsedB = parseInt(colorStrings[2]);
                this.parsedFillStyle = this.fillStyle;
            }

            var imageData:ImageData = this.cpuCanvas.getImageData();
            for (var i:number = x; i < x + w; i++) {
                for (var j:number = y; j < y + h; j++) {

                    var index:number = (x + y * imageData.width) * 4;
                    imageData.data[index] = this.parsedR;
                    imageData.data[index + 1] = this.parsedG;
                    imageData.data[index + 2] = this.parsedB;
                    imageData.data[index + 3] = this.parsedA;
                }
            }
        }
    }

    public bezierCurveTo(cp1x:number, cp1y:number, cp2x:number, cp2y:number, x:number, y:number):void {
    }

    public drawImage(image:HTMLElement, offsetX:number, offsetY:number, width:number, height:number, canvasOffsetX:number, canvasOffsetY:number, canvasImageWidth:number, canvasImageHeight:number):void {
        var b:any = image;
        if (image.constructor.toString().indexOf("BitmapImage2D")>-1) {
            var bitmap:BitmapImage2D = <BitmapImage2D> b;
            bitmap.lock();

            this.drawBitmap(bitmap, offsetX, offsetY, width, height);

            //if (!width || width == 0) {
            //    width = bitmap.width;
            //    height = bitmap.height;
            //}
            //
            //var sourceData:ImageData = bitmap.getImageData();
            //var scaleX:number = width / sourceData.width;
            //var scaleY:number = height / sourceData.height;
            //
            //var imageData:ImageData = this.cpuCanvas.getImageData();
            //for (var i:number = offsetX; i < offsetX + width; i++) {
            //    for (var j:number = offsetY; j < offsetY + height; j++) {
            //        this.copyPixel32(imageData, i, j, sourceData, (i - offsetX) * scaleX, (j - offsetY) * scaleY);
            //    }
            //}

            bitmap.unlock();
        } else if (image.constructor.toString().indexOf("HTMLImage") > -1) {
            var htmlImage:HTMLImageElement = <HTMLImageElement> image;
            var htmlCanvas:HTMLCanvasElement = <HTMLCanvasElement> document.createElement("canvas");
            htmlCanvas.width = htmlImage.width;
            htmlCanvas.height = htmlImage.height;
            var htmlContext:CanvasRenderingContext2D = htmlCanvas.getContext("2d");
            htmlContext.drawImage(htmlImage, 0, 0);
            var htmlImageData:ImageData = htmlContext.getImageData(0, 0, htmlImage.width, htmlImage.height);

            var resultBitmap:BitmapImage2D = new BitmapImage2D(htmlImage.width, htmlImage.height, true, 0, false);
            resultBitmap.getImageData().data = htmlImageData.data;
            var passBitmap:any = resultBitmap;
            this.drawImage(passBitmap, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, canvasImageWidth, canvasImageHeight);
        } else if (image.constructor.toString().indexOf("CPUCanvas") > -1) {
            //
            var canvas:CPUCanvas = <CPUCanvas> b;
            this.drawBitmap(canvas, offsetX, offsetY, width, height);
            //
            //if (!width || width == 0) {
            //    width = canvas.width;
            //    height = canvas.height;
            //}
            //
            //var sourceData:ImageData = canvas.getImageData();
            //var scaleX:number = width / sourceData.width;
            //var scaleY:number = height / sourceData.height;
            //
            //var imageData:ImageData = this.cpuCanvas.getImageData();
            //for (var i:number = offsetX; i < offsetX + width; i++) {
            //    for (var j:number = offsetY; j < offsetY + height; j++) {
            //        this.copyPixel32(imageData, i, j, sourceData, (i - offsetX) * scaleX, (j - offsetY) * scaleY);
            //    }
            //}
        }
    }

    private drawBitmap(bitmap:any, offsetX:number, offsetY:number, width:number, height:number) {
        if (!width || width == 0) {
            width = bitmap.width;
            height = bitmap.height;
        }

        var sourceData:ImageData = bitmap.getImageData();

        if (this.matrix) {
            width *= this.matrix.a;
            height *= this.matrix.d;

            this.matrix.tx += offsetX;
            this.matrix.ty += offsetY;

            offsetX = this.matrix.tx;
            offsetY = this.matrix.ty;

            this.matrix.invert();

            var imageData:ImageData = this.cpuCanvas.getImageData();
            for (var i:number = offsetX; i < offsetX + width; i++) {
                for (var j:number = offsetY; j < offsetY + height; j++) {
                    this.point.x = i;
                    this.point.y = j;
                    this.point = this.matrix.transformPoint(this.point);
                    this.copyPixel32(imageData, i, j, sourceData, this.point.x, this.point.y);
                }
            }
        } else {
            var scaleX:number = width / sourceData.width;
            var scaleY:number = height / sourceData.height;

            var imageData:ImageData = this.cpuCanvas.getImageData();
            for (var i:number = offsetX; i < offsetX + width; i++) {
                for (var j:number = offsetY; j < offsetY + height; j++) {
                    this.copyPixel32(imageData, i, j, sourceData, (i - offsetX) * scaleX, (j - offsetY) * scaleY);
                }
            }
        }

    }

    public transform(m11:number, m12:number, m21:number, m22:number, dx:number, dy:number):void {
    }

    public stroke():void {
    }

    public strokeRect(x:number, y:number, w:number, h:number):void {
    }

    public setLineDash(segments:number[]):void {
    }

    public strokeText(text:string, x:number, y:number, maxWidth:number):void {
    }

    public beginPath():void {
    }

    public arcTo(x1:number, y1:number, x2:number, y2:number, radius:number):void {
    }

    public createLinearGradient(x0:number, y0:number, x1:number, y1:number):CanvasGradient {
        return undefined;
    }
}
export = CPURenderingContext2D;