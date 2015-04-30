import BitmapImage2D			= require("awayjs-core/lib/data/BitmapImage2D");
import Matrix					= require("awayjs-core/lib/geom/Matrix");
import Rectangle				= require("awayjs-core/lib/geom/Rectangle");

class MipmapGenerator
{
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
	public static _generateMipMaps(source:HTMLElement, alpha?:boolean);
	public static _generateMipMaps(source:BitmapImage2D, alpha?:boolean);
	public static _generateMipMaps(source:any, alpha:boolean = false):Array<BitmapImage2D>
	{
		var w:number = source.width;
		var h:number = source.height;
		var i:number = 0;

		var mipmap:BitmapImage2D;
		var output:Array<BitmapImage2D> = new Array<BitmapImage2D>();

		MipmapGenerator._rect.width = w;
		MipmapGenerator._rect.height = h;

		//use (OR) to create non-square texture mipmaps
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

		return output;
	}

	private static _getMipmapHolder(mipMapHolder:BitmapImage2D, newW:number, newH:number):BitmapImage2D
	{
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

	public static _freeMipMapHolder(mipMapHolder:BitmapImage2D)
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