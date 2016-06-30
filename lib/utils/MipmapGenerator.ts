import {BitmapImage2D}				from "../image/BitmapImage2D";
import {CPUCanvas}					from "../image/CPUCanvas";
import {Matrix}						from "../geom/Matrix";
import {Rectangle}					from "../geom/Rectangle";

export class MipmapGenerator {
	private static _mipMaps = [];
	private static _mipMapUses = [];

	private static _matrix:Matrix = new Matrix();
	private static _rect:Rectangle = new Rectangle();
	private static _source:BitmapImage2D;

	/**
	 * Uploads a BitmapImage2D with mip maps to a target Texture object.
	 * @param source The source to upload.
	 * @param target The target Texture to upload to.
	 * @param mipmap An optional mip map holder to avoids creating new instances for fe animated materials.
	 * @param alpha Indicate whether or not the uploaded bitmapData is transparent.
	 */
	public static _generateMipMaps(source:HTMLElement, output?:Array<BitmapImage2D>, alpha?:boolean);
	public static _generateMipMaps(source:BitmapImage2D, output?:Array<BitmapImage2D>, alpha?:boolean);
	public static _generateMipMaps(source:any, output?:Array<BitmapImage2D>, alpha:boolean = false) {
		var w:number = source.width;
		var h:number = source.height;
		var i:number = 0;

		var mipmap:BitmapImage2D;

		MipmapGenerator._rect.width = w;
		MipmapGenerator._rect.height = h;

		//use (OR) to create non-square texture mipmaps
		while (w >= 1 || h >= 1) {

			mipmap = output[i] = MipmapGenerator._getMipmapHolder(output[i], MipmapGenerator._rect.width, MipmapGenerator._rect.height);

			if (alpha)
				mipmap.fillRect(MipmapGenerator._rect, 0);


			MipmapGenerator._matrix.a = MipmapGenerator._rect.width / source.width;
			MipmapGenerator._matrix.d = MipmapGenerator._rect.height / source.height;
			//todo: add support for NPOT textures
			if (document) {
				mipmap.draw(source, MipmapGenerator._matrix); //TODO: smoothing?
			} else {
				if (source.constructor.toString().indexOf("BitmapImage2D") > -1) {
					//for BitmapImage2D
					var bitmapImage:BitmapImage2D = <BitmapImage2D> source;
					bitmapImage.lock();
					mipmap.lock();
					this.downsampleImage(bitmapImage.getImageData(), mipmap.getImageData());
					mipmap.unlock();
					bitmapImage.unlock();
				}else if(source.constructor.toString().indexOf("CPUCanvas") > -1){
					this.downsampleImage(source.getImageData(), mipmap.getImageData());
				} else {
					//for imageData
					this.downsampleImage(source, mipmap.getImageData());
				}
			}

			w >>= 1;
			h >>= 1;

			MipmapGenerator._rect.width = w > 1 ? w : 1;
			MipmapGenerator._rect.height = h > 1 ? h : 1;

			i++;
		}
	}

	private static _getMipmapHolder(mipMapHolder:BitmapImage2D, newW:number, newH:number):BitmapImage2D {
		if (mipMapHolder) {
			if (mipMapHolder.width == newW && mipMapHolder.height == newH)
				return mipMapHolder;

			MipmapGenerator._freeMipMapHolder(mipMapHolder);
		}

		if (!MipmapGenerator._mipMaps[newW]) {
			MipmapGenerator._mipMaps[newW] = [];
			MipmapGenerator._mipMapUses[newW] = [];
		}

		if (!MipmapGenerator._mipMaps[newW][newH]) {
			mipMapHolder = MipmapGenerator._mipMaps[newW][newH] = new BitmapImage2D(newW, newH, true);
			MipmapGenerator._mipMapUses[newW][newH] = 1;
		} else {
			MipmapGenerator._mipMapUses[newW][newH] = MipmapGenerator._mipMapUses[newW][newH] + 1;
			mipMapHolder = MipmapGenerator._mipMaps[newW][newH];
		}

		return mipMapHolder;
	}

	public static _freeMipMapHolder(mipMapHolder:BitmapImage2D) {
		var holderWidth:number = mipMapHolder.width;
		var holderHeight:number = mipMapHolder.height;

		if (--MipmapGenerator._mipMapUses[holderWidth][holderHeight] == 0) {
			MipmapGenerator._mipMaps[holderWidth][holderHeight].dispose();
			MipmapGenerator._mipMaps[holderWidth][holderHeight] = null;
		}
	}

	public static downsampleImage(bitmap:ImageData, destBitmap:ImageData):ImageData {
		var box:BoxFilter = new BoxFilter();
		var xkernel:PolyphaseKernel = new PolyphaseKernel(box, bitmap.width, destBitmap.width, 4);
		var ykernel:PolyphaseKernel = new PolyphaseKernel(box, bitmap.height, destBitmap.height, 4);

		var tempBitmap:number[] = [];//destBitmap.width, bitmap.height

		var scale:number = 0;
		var iscale:number = 0;
		var kernelLength:number = 0;
		var kernelWidth:number = 0;
		var kernelWindowSize:number = 0;
		var sumR:number = 0;
		var sumG:number = 0;
		var sumB:number = 0;
		var sumA:number = 0;
		var center:number;
		var left:number;
		var i:number = 0;
		var j:number = 0;
		var index:number = 0;

		for (var y:number = 0; y < bitmap.height; y++) {
			kernelLength = xkernel.len;
			scale = kernelLength / bitmap.width;
			iscale = 1.0 / scale;
			kernelWidth = xkernel.width;
			kernelWindowSize = xkernel.windowSize;

			for (i = 0; i < kernelLength; i++) {
				center = (0.5 + i) * iscale;
				left = Math.floor(center - kernelWidth);
				sumR = 0;
				sumG = 0;
				sumB = 0;
				sumA = 0;
				for (var j:number = 0; j < kernelWindowSize; ++j) {
					index = (y * bitmap.width + (left + j) ) * 4;
					var colorR:number = bitmap.data[index];
					var colorG:number = bitmap.data[index + 1];
					var colorB:number = bitmap.data[index + 2];
					var colorA:number = bitmap.data[index + 3];

					var value:number = xkernel.valueAt(i, j);
					sumR += value * colorR;
					sumG += value * colorG;
					sumB += value * colorB;
					sumA += value * colorA;
				}

				index = (y * destBitmap.width + i) * 4;
				tempBitmap[index] = sumR;
				tempBitmap[index + 1] = sumG;
				tempBitmap[index + 2] = sumB;
				tempBitmap[index + 3] = sumA;
			}
		}

		for (var x:number = 0; x < destBitmap.width; x++) {
			kernelLength = ykernel.len;
			scale = kernelLength / bitmap.height;
			iscale = 1.0 / scale;
			kernelWidth = ykernel.width;
			kernelWindowSize = ykernel.windowSize;

			for (i = 0; i < kernelLength; i++) {
				center = (0.5 + i) * iscale;

				left = Math.floor(center - kernelWidth);

				sumR = 0;
				sumG = 0;
				sumB = 0;
				sumA = 0;
				for (j = 0; j < kernelWindowSize; ++j) {
					index = ((j + left) * destBitmap.width + x) * 4;
					var colorR:number = tempBitmap[index];
					var colorG:number = tempBitmap[index + 1];
					var colorB:number = tempBitmap[index + 2];
					var colorA:number = tempBitmap[index + 3];

					var value:number = ykernel.valueAt(i, j);
					sumR += value * colorR;
					sumG += value * colorG;
					sumB += value * colorB;
					sumA += value * colorA;
				}

				index = (i * destBitmap.width + x) * 4;
				destBitmap.data[index] = sumR;
				destBitmap.data[index + 1] = sumG;
				destBitmap.data[index + 2] = sumB;
				destBitmap.data[index + 3] = sumA;
			}
		}

		return destBitmap;
	}
}
export class PolyphaseKernel {
	public len:number;
	public width:number;
	public windowSize:number;
	public data:number[];

	constructor(f:BoxFilter, srcLength:number, dstLength:number, samples:number) {

		var scale:number = dstLength / srcLength;
		var iscale:number = 1.0 / scale;

		if (scale > 1) {
			// Upsampling.
			samples = 1;
			scale = 1;
		}

		this.len = dstLength;
		this.width = f.width * iscale;
		this.windowSize = Math.ceil(this.width * 2);

		this.data = [];

		for (var i:number = 0; i < this.len; i++) {
			var center:number = (0.5 + i) * iscale;

			var left:number = Math.floor(center - this.width);

			var total:number = 0.0;
			for (var j:number = 0; j < this.windowSize; j++) {
				var sample:number = f.sampleBox(left + j - center, scale, samples);

				//printf("%f %X\n", sample, *(uint32 *)&sample);

				this.data[i * this.windowSize + j] = sample;
				total += sample;
			}

			// normalize weights.
			for (var j:number = 0; j < this.windowSize; j++) {
				this.data[i * this.windowSize + j] /= total;
			}
		}
	}

	public valueAt(column:number, x:number):number {
		return this.data[column * this.windowSize + x];
	}
}

export class BoxFilter {
	public get width():number {
		return 0.5;
	}

	public sampleBox(x:number, scale:number, samples:number):number {
		var sum:number = 0;
		var isamples:number = 1.0 / samples;

		for (var s:number = 0; s < samples; s++) {
			var p:number = (x + (s + 0.5) * isamples) * scale;
			var value:number = this.evaluate(p);
			sum += value;
		}

		return sum * isamples;
	}

	public evaluate(x:number):number {
		if (Math.abs(x) <= this.width) return 1.0;
		else return 0.0;
	}
}
export default MipmapGenerator;