///<reference path="../_definitions.ts"/>

module away.textures
{
	//import flash.base.*;
	//import flash.gl.textures.CubeTexture;
	//import flash.gl.textures.Texture;
	//import flash.gl.textures.TextureBase;
	//import flash.geom.*;

	/**
	 * MipmapGenerator is a helper class that uploads BitmapData to a Texture including mipmap levels.
	 */
	export class MipmapGenerator
	{
		private static _mipMaps = [];
		private static _mipMapUses = [];
		
		private static _matrix:away.geom.Matrix = new away.geom.Matrix();
		private static _rect:away.geom.Rectangle = new away.geom.Rectangle();
		private static _source:away.base.BitmapData;

		/**
		 * Uploads a BitmapData with mip maps to a target Texture object.
		 * @param source
		 * @param mipmap An optional mip map holder to avoids creating new instances for fe animated materials.
		 * @param alpha Indicate whether or not the uploaded bitmapData is transparent.
		 */
		public static generateHTMLImageElementMipMaps(source:HTMLImageElement, output:Array<away.base.BitmapData> = null, alpha:boolean = false)
		{
			MipmapGenerator._rect.width = source.width;
			MipmapGenerator._rect.height = source.height;

			MipmapGenerator._source = new away.base.BitmapData(source.width, source.height, alpha);
			MipmapGenerator._source.drawImage(source, MipmapGenerator._rect, MipmapGenerator._rect);

			MipmapGenerator.generateMipMaps(MipmapGenerator._source, output, alpha);

			MipmapGenerator._source.dispose();
			MipmapGenerator._source = null;
		}

		/**
		 * Uploads a BitmapData with mip maps to a target Texture object.
		 * @param source The source BitmapData to upload.
		 * @param target The target Texture to upload to.
		 * @param mipmap An optional mip map holder to avoids creating new instances for fe animated materials.
		 * @param alpha Indicate whether or not the uploaded bitmapData is transparent.
		 */
		public static generateMipMaps(source:away.base.BitmapData, output:Array<away.base.BitmapData> = null, alpha:boolean = false)
		{
			var w:number = source.width;
			var h:number = source.height;
			var i:number = 0;

			var mipmap:away.base.BitmapData;

			MipmapGenerator._rect.width = w;
			MipmapGenerator._rect.height = h;

			while (w >= 1 || h >= 1) {

				mipmap = output[i] = MipmapGenerator._getMipmapHolder(output[i], w, h);
				
				if (alpha)
					mipmap.fillRect(MipmapGenerator._rect, 0);

				MipmapGenerator._matrix.a = MipmapGenerator._rect.width/source.width;
				MipmapGenerator._matrix.d = MipmapGenerator._rect.height/source.height;

				mipmap.draw(source, MipmapGenerator._matrix); //TODO: smoothing?

				w >>= 1;
				h >>= 1;

				MipmapGenerator._rect.width = w > 1? w : 1;
				MipmapGenerator._rect.height = h > 1? h : 1;

				i++;
			}
		}

		private static _getMipmapHolder(mipMapHolder:away.base.BitmapData, newW:number, newH:number):away.base.BitmapData
		{
			if (mipMapHolder) {
				if (mipMapHolder.width == newW && mipMapHolder.height == newH)
					return mipMapHolder;

				MipmapGenerator.freeMipMapHolder(mipMapHolder);
			}

			if (!MipmapGenerator._mipMaps[newW]) {
				MipmapGenerator._mipMaps[newW] = [];
				MipmapGenerator._mipMapUses[newW] = [];
			}

			if (!MipmapGenerator._mipMaps[newW][newH]) {
				mipMapHolder = MipmapGenerator._mipMaps[newW][newH] = new away.base.BitmapData(newW, newH, true);
				MipmapGenerator._mipMapUses[newW][newH] = 1;
			} else {
				MipmapGenerator._mipMapUses[newW][newH] = MipmapGenerator._mipMapUses[newW][newH] + 1;
				mipMapHolder = MipmapGenerator._mipMaps[newW][newH];
			}

			return mipMapHolder;
		}

		public static freeMipMapHolder(mipMapHolder:away.base.BitmapData)
		{
			var holderWidth:number = mipMapHolder.width;
			var holderHeight:number = mipMapHolder.height;

			if (--MipmapGenerator._mipMapUses[holderWidth][holderHeight] == 0) {
				MipmapGenerator._mipMaps[holderWidth][holderHeight].dispose();
				MipmapGenerator._mipMaps[holderWidth][holderHeight] = null;
			}
		}
	}
}
