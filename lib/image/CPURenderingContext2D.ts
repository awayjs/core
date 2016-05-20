import {ImageData}					from "../image/ImageData";
import {CPUCanvas}					from "../image/CPUCanvas";
import {BitmapImage2D}				from "../image/BitmapImage2D";
import {Matrix}						from "../geom/Matrix";
import {Point}						from "../geom/Point";

//TODO: implement all methods
export class CPURenderingContext2D implements CanvasRenderingContext2D
{
	public miterLimit:number;
	public font:string;
	public globalCompositeOperation:string;
	public msFillRule:string;
	public lineCap:string;
	public msImageSmoothingEnabled:boolean;
	public mozImageSmoothingEnabled:boolean;
	public webkitImageSmoothingEnabled:boolean;
	public oImageSmoothingEnabled:boolean;
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

	constructor(cpuCanvas:CPUCanvas)
	{
		this.cpuCanvas = cpuCanvas;
	}

	public restore():void
	{
		this.matrix = null;
	}

	public setTransform(m11:number, m12:number, m21:number, m22:number, dx:number, dy:number):void
	{
		this.matrix = new Matrix(m11, m12, m21, m22, dx, dy);
	}

	public save():void
	{
	}

	public arc(x:number, y:number, radius:number, startAngle:number, endAngle:number, anticlockwise:boolean):void
	{
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

	public ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void
	{

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
		var imageData:ImageData = this.cpuCanvas.getImageData();
		for (var i:number = x; i < x + w; i++) {
			for (var j:number = y; j < y + h; j++) {

				var index:number = (i + j * imageData.width) * 4;
				imageData.data[index] = 0;
				imageData.data[index + 1] = 0;
				imageData.data[index + 2] = 0;
				imageData.data[index + 3] = 0;
			}
		}
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
	private point2:Point = new Point();

	private applyPixel32(target:ImageData, x:number, y:number, color:number[]) {
		//todo: blending support

		x = Math.floor(x);
		y = Math.floor(y);

		if (x < 0 || x >= target.width || y >= target.height || y < 0) return;
		var index:number = (x + y * target.width) * 4;
		//var alpha:number = color[3] / 255;
		target.data[index] += color[0];
		target.data[index + 1] += color[1];
		target.data[index + 2] += color[2];
		target.data[index + 3] += color[3];

		//target.data[index] = color[0];
		//target.data[index + 1] = color[1];
		//target.data[index + 2] = color[2];
		//target.data[index + 3] = color[3];

		target.data[index] = target.data[index] & 0xFF;
		target.data[index + 1] = target.data[index + 1] & 0xFF;
		target.data[index + 2] = target.data[index + 2] & 0xFF;
		target.data[index + 3] = target.data[index + 3] & 0xFF;
	}

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

					var index:number = (i + j * imageData.width) * 4;
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
		if (image.constructor.toString().indexOf("BitmapImage2D") > -1) {
			var bitmap:BitmapImage2D = <BitmapImage2D> b;
			bitmap.lock();

			this.drawBitmap(bitmap, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, canvasImageWidth, canvasImageHeight);

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
			this.drawBitmap(canvas, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, canvasImageWidth, canvasImageHeight);
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

	private drawBitmap(bitmap:any, offsetX:number, offsetY:number, width:number, height:number, canvasOffsetX:number, canvasOffsetY:number, canvasImageWidth:number, canvasImageHeight:number) {
		if (!width || width == 0) {
			width = bitmap.width;
			height = bitmap.height;
		}

		if (!canvasOffsetX || canvasOffsetX == 0) {
			canvasOffsetX = 0;
			canvasOffsetY = 0;
		}

		if (!canvasImageWidth || canvasImageWidth == 0 || this.matrix) { //todo: if matrix? should we reset canvasImageWidth
			canvasImageWidth = width;
			canvasImageHeight = height;
		}

		//console.log("CPURenderingContext2D:drawBitmap(width: " + width + " height: " + height + " canvasImageWidth: " + canvasImageWidth + " canvasImageHeight: " + canvasImageHeight);

		var sourceData:ImageData = bitmap.getImageData();
		var canvasImageData:ImageData = this.cpuCanvas.getImageData();

		if (this.matrix || (canvasImageWidth != width || canvasImageHeight != height)) {
			var matrix:Matrix = this.matrix;
			if (!matrix) {
				matrix = new Matrix();
				matrix.scale(canvasImageWidth / width, canvasImageHeight / height);
			}

			var scaleX:number = Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b);
			var scaleY:number = Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d);

			canvasImageWidth = width * scaleX;
			canvasImageHeight = height * scaleY;

			matrix.tx += canvasOffsetX;
			matrix.ty += canvasOffsetY;

			canvasOffsetX = Math.floor(matrix.tx);
			canvasOffsetY = Math.floor(matrix.ty);

			matrix.invert();

			if (scaleX >= 1 || scaleY >= 1) {
				var p:Point = new Point();
				for (var i:number = canvasOffsetX; i < canvasOffsetX + canvasImageWidth; i++) {
					for (var j:number = canvasOffsetY; j < canvasOffsetY + canvasImageHeight; j++) {
						p.x = i;
						p.y = j;
						p = matrix.transformPoint(p);

						var color:number[] = CPURenderingContext2D.sampleBilinear(p.x, p.y, sourceData);
						this.applyPixel32(canvasImageData, i, j, color);
					}
				}
			} else {
				//decimate
				var p1:Point = this.point;
				var p2:Point = this.point2;
				for (var i:number = canvasOffsetX; i < canvasOffsetX + canvasImageWidth; i++) {
					for (var j:number = canvasOffsetY; j < canvasOffsetY + canvasImageHeight; j++) {
						p1.x = i;
						p1.y = j;
						p1 = matrix.transformPoint(p1);

						p2.x = i + 1;
						p2.y = j + 1;
						p2 = matrix.transformPoint(p2);

						var color:number[] = CPURenderingContext2D.sampleBox(p1.x + offsetX, p1.y + offsetY, p2.x + offsetX, p2.y + offsetY, sourceData);
						this.applyPixel32(canvasImageData, i, j, color);
					}
				}
			}

			matrix.invert();
		} else {
			for (var i:number = canvasOffsetX; i < canvasOffsetX + canvasImageWidth; i++) {
				for (var j:number = canvasOffsetY; j < canvasOffsetY + canvasImageHeight; j++) {
					var color:number[] = CPURenderingContext2D.sample(i - canvasOffsetX + offsetX, j - canvasOffsetY + offsetY, sourceData);
					this.applyPixel32(canvasImageData, i, j, color);
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

	private static sampleBilinear(u:number, v:number, texture:ImageData, texelSizeX:number = 1, texelSizeY:number = 1):number[] {
		var color00:number[] = CPURenderingContext2D.sample(u, v, texture);
		var color10:number[] = CPURenderingContext2D.sample(u + texelSizeX, v, texture);
		var color01:number[] = CPURenderingContext2D.sample(u, v + texelSizeY, texture);
		var color11:number[] = CPURenderingContext2D.sample(u + texelSizeX, v + texelSizeY, texture);

		var a:number = u;
		a = a - Math.floor(a);

		var interColor0:number[] = CPURenderingContext2D.interpolateColor(color00, color10, a);
		var interColor1:number[] = CPURenderingContext2D.interpolateColor(color01, color11, a);

		var b:number = v;
		b = b - Math.floor(b);
		return CPURenderingContext2D.interpolateColor(interColor0, interColor1, b);
	}

	private static sample(u:number, v:number, imageData:ImageData):number[] {
		u = Math.floor(u);
		v = Math.floor(v);

		var result:number[] = [0, 0, 0, 0];

		if (u < 0 || u >= imageData.width || v < 0 || v >= imageData.height) {
			return result;
		}

		var index:number = (u + v * imageData.width) * 4;
		result[0] = imageData.data[index];
		result[1] = imageData.data[index + 1];
		result[2] = imageData.data[index + 2];
		result[3] = imageData.data[index + 3];
		return result;
	}

	private static sampleBox(x0:number, y0:number, x1:number, y1:number, texture:ImageData):number[] {
		var area:number = 0;// -- total area accumulated in pixels
		var result:number[] = [0, 0, 0, 0];
		var x:number;
		var y:number;
		var xsize:number;
		var ysize:number;

		var fromY:number = Math.floor(y0);
		var toY:number = Math.ceil(y1);

		fromY = Math.max(Math.min(fromY, texture.height - 1), 0);
		toY = Math.max(Math.min(toY, texture.height - 1), 0);

		for (y = fromY; y < toY; y++) {
			ysize = 1;

			if (y < y0) {
				ysize = ysize * (1.0 - (y0 - y))
			}

			if (y > y1) {
				ysize = ysize * (1.0 - (y - y1))
			}

			var fromX:number = Math.floor(x0);
			var toX:number = Math.ceil(x1);

			fromX = Math.max(Math.min(fromX, texture.width - 1), 0);
			toX = Math.max(Math.min(toX, texture.width - 1), 0);


			for (x = fromX; x < toX; x++) {
				xsize = ysize;

				var color:number[] = CPURenderingContext2D.sample(x, y, texture);

				if (x < x0) {
					xsize = xsize * (1.0 - (x0 - x))
				}
				if (x > x1) {
					xsize = xsize * (1.0 - (x - x1))
				}
				result[0] += color[0] * xsize;
				result[1] += color[1] * xsize;
				result[2] += color[2] * xsize;
				result[3] += color[3] * xsize;
				area = area + xsize
			}
		}

		result[0] /= area;
		result[1] /= area;
		result[2] /= area;
		result[3] /= area;

		result[0] = result[0] & 0xFF;
		result[1] = result[1] & 0xFF;
		result[2] = result[2] & 0xFF;
		result[3] = result[3] & 0xFF;
		return result;
	}

	private static interpolateColor(source:number[], target:number[], a:number):number[] {
		var result:number[] = [];
		result[0] = source[0] + (target[0] - source[0]) * a;
		result[1] = source[1] + (target[1] - source[1]) * a;
		result[2] = source[2] + (target[2] - source[2]) * a;
		result[3] = source[3] + (target[3] - source[3]) * a;
		return result;
	}

}
export default CPURenderingContext2D;