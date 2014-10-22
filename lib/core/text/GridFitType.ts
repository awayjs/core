/**
 * The GridFitType class defines values for grid fitting in the TextField class.
 */
class GridFitType
{
	/**
	 * Doesn't set grid fitting. Horizontal and vertical lines in the glyphs are
	 * not forced to the pixel grid. This constant is used in setting the
	 * <code>gridFitType</code> property of the TextField class. This is often a
	 * good setting for animation or for large font sizes. Use the syntax
	 * <code>GridFitType.NONE</code>.
	 */
	public static NONE:string = "none";

	/**
	 * Fits strong horizontal and vertical lines to the pixel grid. This constant
	 * is used in setting the <code>gridFitType</code> property of the TextField
	 * class. This setting only works for left-justified text fields and acts
	 * like the <code>GridFitType.SUBPIXEL</code> constant in static text. This
	 * setting generally provides the best readability for left-aligned text. Use
	 * the syntax <code>GridFitType.PIXEL</code>.
	 */
	public static PIXEL:string = "pixel";

	/**
	 * Fits strong horizontal and vertical lines to the sub-pixel grid on LCD
	 * monitors. (Red, green, and blue are actual pixels on an LCD screen.) This
	 * is often a good setting for right-aligned or center-aligned dynamic text,
	 * and it is sometimes a useful tradeoff for animation vs. text quality. This
	 * constant is used in setting the <code>gridFitType</code> property of the
	 * TextField class. Use the syntax <code>GridFitType.SUBPIXEL</code>.
	 */
	public static SUBPIXEL:string = "subpixel";
}

export = GridFitType;