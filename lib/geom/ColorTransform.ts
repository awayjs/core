import {ColorUtils}			from "../utils/ColorUtils";

/**
 * The ColorTransform export class lets you adjust the color values in a display
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
export class ColorTransform
{
	public rawData:Float32Array = new Float32Array(8);
	
	/**
	 * A decimal value that is multiplied with the alpha transparency channel
	 * value.
	 *
	 * <p>If you set the alpha transparency value of a display object directly by
	 * using the <code>alpha</code> property of the DisplayObject instance, it
	 * affects the value of the <code>alphaMultiplier</code> property of that
	 * display object's <code>transform.colorTransform</code> property.</p>
	 */
	public get alphaMultiplier():number
	{
		return this.rawData[3];
	}

	public set alphaMultiplier(value:number)
	{
		this.rawData[3] = value;
	}

	/**
	 * A number from -255 to 255 that is added to the alpha transparency channel
	 * value after it has been multiplied by the <code>alphaMultiplier</code>
	 * value.
	 */
	public get alphaOffset():number
	{
		return this.rawData[7]*0xFF;
	}

	public set alphaOffset(value:number)
	{
		this.rawData[7] = value/0xFF;
	}

	/**
	 * A decimal value that is multiplied with the blue channel value.
	 */
	public get blueMultiplier():number
	{
		return this.rawData[2];
	}

	public set blueMultiplier(value:number)
	{
		this.rawData[2] = value;
	}

	/**
	 * A number from -255 to 255 that is added to the blue channel value after it
	 * has been multiplied by the <code>blueMultiplier</code> value.
	 */
	public get blueOffset():number
	{
		return this.rawData[6]*0xFF;
	}

	public set blueOffset(value:number)
	{
		this.rawData[6] = value/0xFF;
	}

	/**
	 * A decimal value that is multiplied with the green channel value.
	 */
	public get greenMultiplier():number
	{
		return this.rawData[1];
	}

	public set greenMultiplier(value:number)
	{
		this.rawData[1] = value;
	}

	/**
	 * A number from -255 to 255 that is added to the green channel value after
	 * it has been multiplied by the <code>greenMultiplier</code> value.
	 */
	public get greenOffset():number
	{
		return this.rawData[5]*0xFF;
	}

	public set greenOffset(value:number)
	{
		this.rawData[5] = value/0xFF;
	}

	/**
	 * A decimal value that is multiplied with the red channel value.
	 */
	public get redMultiplier():number
	{
		return this.rawData[0];
	}

	public set redMultiplier(value:number)
	{
		this.rawData[0] = value;
	}

	/**
	 * A number from -255 to 255 that is added to the red channel value after it
	 * has been multiplied by the <code>redMultiplier</code> value.
	 */
	public get redOffset():number
	{
		return this.rawData[4]*0xFF;
	}

	public set redOffset(value:number)
	{
		this.rawData[4] = value/0xFF;
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
		return((this.rawData[0] << 16) | ( this.rawData[1] << 8) | this.rawData[2]);
	}

	public set color(value:number)
	{
		var argb:number[] = ColorUtils.float32ColorToARGB(value);

		this.rawData[4] = argb[1];  //(value >> 16) & 0xFF;
		this.rawData[5] = argb[2];  //(value >> 8) & 0xFF;
		this.rawData[6] = argb[3];  //value & 0xFF;

		this.rawData[0] = 0;
		this.rawData[1] = 0;
		this.rawData[2] = 0;
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
	constructor(rawData:Float32Array);
	constructor(redMultiplier?:number, greenMultiplier?:number, blueMultiplier?:number, alphaMultiplier?:number, redOffset?:number, greenOffset?:number, blueOffset?:number, alphaOffset?:number);
	constructor(redMultiplier:number | Float32Array = 1, greenMultiplier:number = 1, blueMultiplier:number = 1, alphaMultiplier:number = 1, redOffset:number = 0, greenOffset:number = 0, blueOffset:number = 0, alphaOffset:number = 0)
	{
		if (redMultiplier instanceof Float32Array) {
			this.copyRawDataFrom(redMultiplier);
		} else {
			this.redMultiplier = Number(redMultiplier);
			this.greenMultiplier = greenMultiplier;
			this.blueMultiplier = blueMultiplier;
			this.alphaMultiplier = alphaMultiplier;
			this.redOffset = redOffset;
			this.greenOffset = greenOffset;
			this.blueOffset = blueOffset;
			this.alphaOffset = alphaOffset;
		}
	}

	public copyRawDataFrom(vector:Float32Array, index:number = 0):void
	{
		for (var c:number = 0; c < 8; c++)
			this.rawData[c] = vector[c + index];
	}

    public clear()
    {
        this.rawData[0] = 1;
        this.rawData[1] = 1;
        this.rawData[2] = 1;
        this.rawData[3] = 1;
        this.rawData[4] = 0;
        this.rawData[5] = 0;
        this.rawData[6] = 0;
        this.rawData[7] = 0;
    }

    public clone():ColorTransform
    {
        return new ColorTransform(this.rawData);
    }

    public copyFrom(source:ColorTransform)
    {
		for (var c:number = 0; c < 8; c++)
			this.rawData[c] = source.rawData[c];
    }

    public copyTo(destination:ColorTransform)
    {
        destination.copyFrom(this);
    }

    public prepend(ct:ColorTransform)
    {
        this.rawData[4] += ct.rawData[4] * this.rawData[0];
        this.rawData[5] += ct.rawData[5] * this.rawData[1];
        this.rawData[6] += ct.rawData[6] * this.rawData[2];
        this.rawData[7] += ct.rawData[7] * this.rawData[3];

        this.redMultiplier *= ct.redMultiplier;
        this.greenMultiplier *= ct.greenMultiplier;
        this.blueMultiplier *= ct.blueMultiplier;
        this.alphaMultiplier *= ct.alphaMultiplier;
    }
	
	public _isRenderable():boolean
	{
		return this.rawData[3] != 0 || this.rawData[7] > 0;
	}
}