import BitmapData				= require("awayjs-core/lib/base/BitmapData");
import Matrix					= require("awayjs-core/lib/geom/Matrix");
import Rectangle				= require("awayjs-core/lib/geom/Rectangle");

/**
 * MipmapGenerator is a helper class that uploads BitmapData to a Texture including mipmap levels.
 */
class MipmapGenerator
{
	private static _mipMaps = [];
	private static _mipMapUses = [];

	private static _matrix:Matrix = new Matrix();
	private static _rect:Rectangle = new Rectangle();
	private static _source:BitmapData;

	/**
	 * Uploads a BitmapData with mip maps to a target Texture object.
	 * @param source The source to upload.
	 * @param target The target Texture to upload to.
	 * @param mipmap An optional mip map holder to avoids creating new instances for fe animated materials.
	 * @param alpha Indicate whether or not the uploaded bitmapData is transparent.
	 */
	public static generateMipMaps(source:HTMLImageElement, output?:Array<BitmapData>, alpha?:boolean);
	public static generateMipMaps(source:BitmapData, output?:Array<BitmapData>, alpha?:boolean);
	public static generateMipMaps(source:any, output?:Array<BitmapData>, alpha:boolean = false)
	{
		var w:number = source.width;
		var h:number = source.height;
		var i:number = 0;

		var mipmap:BitmapData;

		MipmapGenerator._rect.width = w;
		MipmapGenerator._rect.height = h;

		while (w >= 1 || h >= 1) {

			mipmap = output[i] = MipmapGenerator._getMipmapHolder(output[i], MipmapGenerator._rect.width, MipmapGenerator._rect.height);

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

	private static _getMipmapHolder(mipMapHolder:BitmapData, newW:number, newH:number):BitmapData
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
			mipMapHolder = MipmapGenerator._mipMaps[newW][newH] = new BitmapData(newW, newH, true);
			MipmapGenerator._mipMapUses[newW][newH] = 1;
		} else {
			MipmapGenerator._mipMapUses[newW][newH] = MipmapGenerator._mipMapUses[newW][newH] + 1;
			mipMapHolder = MipmapGenerator._mipMaps[newW][newH];
		}

		return mipMapHolder;
	}

	public static freeMipMapHolder(mipMapHolder:BitmapData)
	{
		var holderWidth:number = mipMapHolder.width;
		var holderHeight:number = mipMapHolder.height;

		if (--MipmapGenerator._mipMapUses[holderWidth][holderHeight] == 0) {
			MipmapGenerator._mipMaps[holderWidth][holderHeight].dispose();
			MipmapGenerator._mipMaps[holderWidth][holderHeight] = null;
		}
	}
}

export = MipmapGenerator;