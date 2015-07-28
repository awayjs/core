import ColorUtils			= require("awayjs-core/lib/utils/ColorUtils");
import EventDispatcher		= require("awayjs-core/lib/events/EventDispatcher");
import Event				= require("awayjs-core/lib/events/Event");

/**
 * The ColorTransform class lets you adjust the color values in a display
 * object. The color adjustment or <i>color transformation</i> can be applied
 * to all four channels: red, green, blue, and alpha transparency.
 *
 * <p>When a ColorTransform object is applied to a display object, a new value
 * for each color channel is calculated like this:</p>
 *
 * <ul>
 *   <li>New red value = (old red value * <code>redMultiplier</code>) +
 * <code>redOffset</code></li>
 *   <li>New green value = (old green value * <code>greenMultiplier</code>) +
 * <code>greenOffset</code></li>
 *   <li>New blue value = (old blue value * <code>blueMultiplier</code>) +
 * <code>blueOffset</code></li>
 *   <li>New alpha value = (old alpha value * <code>alphaMultiplier</code>) +
 * <code>alphaOffset</code></li>
 * </ul>
 *
 * <p>If any of the color channel values is greater than 255 after the
 * calculation, it is set to 255. If it is less than 0, it is set to 0.</p>
 *
 * <p>You can use ColorTransform objects in the following ways:</p>
 *
 * <ul>
 *   <li>In the <code>colorTransform</code> parameter of the
 * <code>colorTransform()</code> method of the BitmapData class</li>
 *   <li>As the <code>colorTransform</code> property of a Transform object
 * (which can be used as the <code>transform</code> property of a display
 * object)</li>
 * </ul>
 *
 * <p>You must use the <code>new ColorTransform()</code> constructor to create
 * a ColorTransform object before you can call the methods of the
 * ColorTransform object.</p>
 *
 * <p>Color transformations do not apply to the background color of a movie
 * clip(such as a loaded SWF object). They apply only to graphics and symbols
 * that are attached to the movie clip.</p>
 */
class ColorTransform extends EventDispatcher
{
	/**
	 * A decimal value that is multiplied with the alpha transparency channel
	 * value.
	 *
	 * <p>If you set the alpha transparency value of a display object directly by
	 * using the <code>alpha</code> property of the DisplayObject instance, it
	 * affects the value of the <code>alphaMultiplier</code> property of that
	 * display object's <code>transform.colorTransform</code> property.</p>
	 */
	private _alphaMultiplier:number;

	/**
	 * A number from -255 to 255 that is added to the alpha transparency channel
	 * value after it has been multiplied by the <code>alphaMultiplier</code>
	 * value.
	 */
    private _alphaOffset:number;

	/**
	 * A decimal value that is multiplied with the blue channel value.
	 */
    private _blueMultiplier:number;

	/**
	 * A number from -255 to 255 that is added to the blue channel value after it
	 * has been multiplied by the <code>blueMultiplier</code> value.
	 */
    private _blueOffset:number;

	/**
	 * A decimal value that is multiplied with the green channel value.
	 */
    private _greenMultiplier:number;

	/**
	 * A number from -255 to 255 that is added to the green channel value after
	 * it has been multiplied by the <code>greenMultiplier</code> value.
	 */
    private _greenOffset:number;

	/**
	 * A decimal value that is multiplied with the red channel value.
	 */
    private _redMultiplier:number;

	/**
	 * A number from -255 to 255 that is added to the red channel value after it
	 * has been multiplied by the <code>redMultiplier</code> value.
	 */
    private _redOffset:number;


    private _changeEvent:Event = new Event(Event.CHANGE);

    public get alphaMultiplier():number
    {
        return this._alphaMultiplier;
    }

    public set alphaMultiplier(value:number)
    {
        this._alphaMultiplier = value;
        this._invalidate();
    }

    public get alphaOffset():number
    {
        return this._alphaOffset;
    }

    public set alphaOffset(value:number)
    {
        this._alphaOffset = value;
        this._invalidate();
    }

    public get redMultiplier():number
    {
        return this._redMultiplier;
    }

    public set redMultiplier(value:number)
    {
        this._redMultiplier = value;
        this._invalidate();
    }

    public get redOffset():number
    {
        return this._redOffset;
    }

    public set redOffset(value:number)
    {
        this._redOffset = value;
        this._invalidate();
    }

    public get greenMultiplier():number
    {
        return this._greenMultiplier;
    }

    public set greenMultiplier(value:number)
    {
        this._greenMultiplier = value;
        this._invalidate();
    }

    public get greenOffset():number
    {
        return this._greenOffset;
    }

    public set greenOffset(value:number)
    {
        this._greenOffset = value;
        this._invalidate();
    }

    public get blueMultiplier():number
    {
        return this._blueMultiplier;
    }

    public set blueMultiplier(value:number)
    {
        this._blueMultiplier = value;
        this._invalidate();
    }

    public get blueOffset():number
    {
        return this._blueOffset;
    }

    public set blueOffset(value:number)
    {
        this._blueOffset = value;
        this._invalidate();
    }

	/**
	 * The RGB color value for a ColorTransform object.
	 *
	 * <p>When you set this property, it changes the three color offset values
	 * (<code>redOffset</code>, <code>greenOffset</code>, and
	 * <code>blueOffset</code>) accordingly, and it sets the three color
	 * multiplier values(<code>redMultiplier</code>,
	 * <code>greenMultiplier</code>, and <code>blueMultiplier</code>) to 0. The
	 * alpha transparency multiplier and offset values do not change.</p>
	 *
	 * <p>When you pass a value for this property, use the format
	 * 0x<i>RRGGBB</i>. <i>RR</i>, <i>GG</i>, and <i>BB</i> each consist of two
	 * hexadecimal digits that specify the offset of each color component. The 0x
	 * tells the ActionScript compiler that the number is a hexadecimal
	 * value.</p>
	 */
	public get color():number
	{
		return((this._redOffset << 16) | ( this._greenOffset << 8) | this._blueOffset);
	}

	public set color(value:number)
	{
		var argb:number[] = ColorUtils.float32ColorToARGB(value);

		this._redOffset = argb[1];  //(value >> 16) & 0xFF;
		this._greenOffset = argb[2];  //(value >> 8) & 0xFF;
		this._blueOffset = argb[3];  //value & 0xFF;

		this._redMultiplier = 0;
		this._greenMultiplier = 0;
		this._blueMultiplier = 0;

        this._invalidate();
	}

	/**
	 * Creates a ColorTransform object for a display object with the specified
	 * color channel values and alpha values.
	 *
	 * @param redMultiplier   The value for the red multiplier, in the range from
	 *                        0 to 1.
	 * @param greenMultiplier The value for the green multiplier, in the range
	 *                        from 0 to 1.
	 * @param blueMultiplier  The value for the blue multiplier, in the range
	 *                        from 0 to 1.
	 * @param alphaMultiplier The value for the alpha transparency multiplier, in
	 *                        the range from 0 to 1.
	 * @param redOffset       The offset value for the red color channel, in the
	 *                        range from -255 to 255.
	 * @param greenOffset     The offset value for the green color channel, in
	 *                        the range from -255 to 255.
	 * @param blueOffset      The offset for the blue color channel value, in the
	 *                        range from -255 to 255.
	 * @param alphaOffset     The offset for alpha transparency channel value, in
	 *                        the range from -255 to 255.
	 */
	constructor(redMultiplier:number = 1, greenMultiplier:number = 1, blueMultiplier:number = 1, alphaMultiplier:number = 1, redOffset:number = 0, greenOffset:number = 0, blueOffset:number = 0, alphaOffset:number = 0)
	{
        super();

		this._redMultiplier = redMultiplier;
		this._greenMultiplier = greenMultiplier;
		this._blueMultiplier = blueMultiplier;
		this._alphaMultiplier = alphaMultiplier;
		this._redOffset = redOffset;
		this._greenOffset = greenOffset;
		this._blueOffset = blueOffset;
		this._alphaOffset = alphaOffset;
	}

    public clear()
    {
        this._redMultiplier = 1;
        this._greenMultiplier = 1;
        this._blueMultiplier = 1;
        this._alphaMultiplier = 1;
        this._redOffset = 0;
        this._greenOffset = 0;
        this._blueOffset = 0;
        this._alphaOffset = 0;
    }

    public clone():ColorTransform
    {
        return new ColorTransform(this._redMultiplier, this._greenMultiplier, this._blueMultiplier, this._alphaMultiplier, this._redOffset, this._greenOffset, this._blueOffset, this._alphaOffset);
    }

    public copyFrom(source:ColorTransform)
    {
        this._redMultiplier = source.redMultiplier;
        this._greenMultiplier = source.greenMultiplier;
        this._blueMultiplier = source.blueMultiplier;
        this._alphaMultiplier = source.alphaMultiplier;
        this._redOffset = source.redOffset;
        this._greenOffset = source.greenOffset;
        this._blueOffset = source.blueOffset;
        this._alphaOffset = source.alphaOffset;
    }

    public copyTo(destination:ColorTransform)
    {
        destination.copyFrom(this);
    }

    private _invalidate()
    {
        this.dispatchEvent(this._changeEvent);
    }

    public prepend(ct:ColorTransform)
    {
        this._redOffset += ct.redOffset * this._redMultiplier;
        this._greenOffset += ct.greenOffset * this._greenMultiplier;
        this._blueOffset += ct.blueOffset * this._blueMultiplier;
        this._alphaOffset += ct.alphaOffset * this._alphaMultiplier;

        this._redMultiplier *= ct.redMultiplier;
        this._greenMultiplier *= ct.greenMultiplier;
        this._blueMultiplier *= ct.blueMultiplier;
        this._alphaMultiplier *= ct.alphaMultiplier;

        this._invalidate();
    }
}

export = ColorTransform;