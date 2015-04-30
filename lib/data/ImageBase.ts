import BlendMode				= require("awayjs-core/lib/data/BlendMode");
import ColorTransform			= require("awayjs-core/lib/geom/ColorTransform");
import Matrix					= require("awayjs-core/lib/geom/Matrix");
import Rectangle				= require("awayjs-core/lib/geom/Rectangle");
import IAsset					= require("awayjs-core/lib/library/IAsset");
import AssetBase				= require("awayjs-core/lib/library/AssetBase");
import IImageObject				= require("awayjs-core/lib/pool/IImageObject");
import ColorUtils				= require("awayjs-core/lib/utils/ColorUtils");

class ImageBase extends AssetBase implements IAsset
{
	private _imageObject:Array<IImageObject> = new Array<IImageObject>();

	/**
	 *
	 */
	constructor()
	{
		super();
	}

	/**
	 *
	 */
	public invalidateContent():void
	{
		var len:number = this._imageObject.length;
		for (var i:number = 0; i < len; i++)
			this._imageObject[i].invalidate();
	}

	/**
	 *
	 * @private
	 */
	public invalidateSize():void
	{
		while (this._imageObject.length)
			this._imageObject[0].dispose();
	}

	/**
	 * @inheritDoc
	 */
	public dispose()
	{
		while (this._imageObject.length)
			this._imageObject[0].dispose();
	}


	public _iAddImageObject(ImageObject:IImageObject):IImageObject
	{
		this._imageObject.push(ImageObject);

		return ImageObject;
	}

	public _iRemoveImageObject(ImageObject:IImageObject):IImageObject
	{
		this._imageObject.splice(this._imageObject.indexOf(ImageObject), 1);

		return ImageObject;
	}
}

export = ImageBase;