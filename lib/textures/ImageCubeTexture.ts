import Error					= require("awayjs-core/lib/errors/Error");
import CubeTextureBase			= require("awayjs-core/lib/textures/CubeTextureBase");
import TextureUtils				= require("awayjs-core/lib/utils/TextureUtils");

class ImageCubeTexture extends CubeTextureBase
{
	private _htmlImageElements:Array<HTMLImageElement> = new Array<HTMLImageElement>(6);

	/**
	 * The texture on the cube's right face.
	 */
	public get positiveX():HTMLImageElement
	{
		return this._htmlImageElements[0];
	}

	public set positiveX(value:HTMLImageElement)
	{
		this._testSize(value);
		this.invalidateContent();
		this._pSetSize(value.width);
		this._htmlImageElements[0] = value;
	}

	/**
	 * The texture on the cube's left face.
	 */
	public get negativeX():HTMLImageElement
	{
		return this._htmlImageElements[1];
	}

	public set negativeX(value:HTMLImageElement)
	{
		this._testSize(value);
		this.invalidateContent();
		this._pSetSize(value.width);
		this._htmlImageElements[1] = value;
	}

	/**
	 * The texture on the cube's top face.
	 */
	public get positiveY():HTMLImageElement
	{
		return this._htmlImageElements[2];
	}

	public set positiveY(value:HTMLImageElement)
	{
		this._testSize(value);
		this.invalidateContent();
		this._pSetSize(value.width);
		this._htmlImageElements[2] = value;
	}

	/**
	 * The texture on the cube's bottom face.
	 */
	public get negativeY():HTMLImageElement
	{
		return this._htmlImageElements[3];
	}

	public set negativeY(value:HTMLImageElement)
	{
		this._testSize(value);
		this.invalidateContent();
		this._pSetSize(value.width);
		this._htmlImageElements[3] = value;
	}

	/**
	 * The texture on the cube's far face.
	 */
	public get positiveZ():HTMLImageElement
	{
		return this._htmlImageElements[4];
	}

	public set positiveZ(value:HTMLImageElement)
	{
		this._testSize(value);
		this.invalidateContent();
		this._pSetSize(value.width);
		this._htmlImageElements[4] = value;
	}

	/**
	 * The texture on the cube's near face.
	 */
	public get negativeZ():HTMLImageElement
	{
		return this._htmlImageElements[5];
	}

	public set negativeZ(value:HTMLImageElement)
	{
		this._testSize(value);
		this.invalidateContent();
		this._pSetSize(value.width);
		this._htmlImageElements[5] = value;
	}

	constructor(posX:HTMLImageElement, negX:HTMLImageElement, posY:HTMLImageElement, negY:HTMLImageElement, posZ:HTMLImageElement, negZ:HTMLImageElement)
	{
		super();

		this._testSize(this._htmlImageElements[0] = posX);
		this._testSize(this._htmlImageElements[1] = negX);
		this._testSize(this._htmlImageElements[2] = posY);
		this._testSize(this._htmlImageElements[3] = negY);
		this._testSize(this._htmlImageElements[4] = posZ);
		this._testSize(this._htmlImageElements[5] = negZ);

		this.invalidateContent();

		this._pSetSize(posX.width);
	}

	private _testSize(value:HTMLImageElement)
	{
		if (value.width != value.height)
			throw new Error("BitmapData should have equal width and height!");
		if (!TextureUtils.isHTMLImageElementValid(value))
			throw new Error("Invalid bitmapData: Width and height must be power of 2 and cannot exceed 2048");
	}

	public _iGetTextureData(side:number):HTMLImageElement
	{
		return this._htmlImageElements[side];
	}
}

export = ImageCubeTexture;