import {BitmapImage2D}			from "../image/BitmapImage2D";
import {BitmapImageChannel}		from "../image/BitmapImageChannel";
import {Image2D}					from "../image/Image2D";
import {Point}					from "../geom/Point";

/**
 *
 */
export class SpecularImage2D extends Image2D
{
	public static assetType:string = "[asset SpecularImage2D]";

	private _specularSource:BitmapImage2D;
	private _glossSource:BitmapImage2D;
	private _output:BitmapImage2D;

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return SpecularImage2D.assetType;
	}

	public get specularSource():BitmapImage2D
	{
		return this._specularSource;
	}

	public set specularSource(value:BitmapImage2D)
	{
		if (this._specularSource == value)
			return;

		this._specularSource = value;

		this.invalidate();

		this._testSize();
	}


	public get glossSource():BitmapImage2D
	{
		return this._glossSource;
	}

	public set glossSource(value:BitmapImage2D)
	{
		if (this._glossSource == value)
			return;

		this._glossSource = value;

		this.invalidate();

		this._testSize();
	}

	/**
	 *
	 */
	constructor(specularSource:BitmapImage2D = null, glossSource:BitmapImage2D = null)
	{
		super(1, 1);

		this._specularSource = specularSource;
		this._glossSource = glossSource;

		this._output = new BitmapImage2D(1, 1, false, 0xffffff);

		this._testSize();
	}

	/**
	 * Returns a new SpecularImage2D object that is a clone of the original instance
	 * with an exact copy of the contained bitmap.
	 *
	 * @return A new SpecularImage2D object that is identical to the original.
	 */
	public clone():SpecularImage2D
	{
		return new SpecularImage2D(this._specularSource, this._glossSource);
	}

	/**
	 * Frees memory that is used to store the SpecularImage2D object.
	 *
	 * <p>When the <code>dispose()</code> method is called on an image, the width
	 * and height of the image are set to 0. All subsequent calls to methods or
	 * properties of this SpecularImage2D instance fail, and an exception is thrown.
	 * </p>
	 *
	 * <p><code>SpecularImage2D.dispose()</code> releases the memory occupied by the
	 * actual bitmap data, immediately(a bitmap can consume up to 64 MB of
	 * memory). After using <code>SpecularImage2D.dispose()</code>, the SpecularImage2D
	 * object is no longer usable and an exception may be thrown if
	 * you call functions on the SpecularImage2D object. However,
	 * <code>SpecularImage2D.dispose()</code> does not garbage collect the SpecularImage2D
	 * object(approximately 128 bytes); the memory occupied by the actual
	 * SpecularImage2D object is released at the time the SpecularImage2D object is
	 * collected by the garbage collector.</p>
	 *
	 */
	public dispose():void
	{
		super.dispose();

		this._rect = null;

		this._output.dispose();
	}

	/**
	 *
	 * @returns {ImageData}
	 */
	public getImageData():ImageData
	{
		var origin:Point = new Point();

		this._output.fillRect(this._rect, 0xffffff);

		if (this._glossSource)
			this._output.copyChannel(this._glossSource, this._rect, origin, BitmapImageChannel.GREEN, BitmapImageChannel.GREEN);

		if (this._specularSource)
			this._output.copyChannel(this._specularSource, this._rect, origin, BitmapImageChannel.RED, BitmapImageChannel.RED);

		return this._output.getImageData();
	}

	/**
	 *
	 * @returns {HTMLCanvasElement}
	 */
	public getCanvas():HTMLCanvasElement
	{
		return this._output.getCanvas();
	}

	/**
	 *
	 * @param width
	 * @param height
	 * @private
	 */
	public _setSize(width:number, height:number):void
	{
		super._setSize(width, height);

		this._output._setSize(width, height);
	}

	private _testSize():void
	{
		var w:number, h:number;

		if (this._specularSource) {
			w = this._specularSource.width;
			h = this._specularSource.height;
		} else if (this._glossSource) {
			w = this._glossSource.width;
			h = this._glossSource.height;
		} else {
			w = 1;
			h = 1;
		}

		if (w != this._output.width && h != this._output.height) {
			this._output.dispose();
			this._output = new BitmapImage2D(w, h, false, 0xffffff);
		}

		this._setSize(w, h);
	}
}