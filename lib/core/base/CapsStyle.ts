/**
 * The CapsStyle class is an enumeration of constant values that specify the
 * caps style to use in drawing lines. The constants are provided for use as
 * values in the <code>caps</code> parameter of the
 * <code>flash.display.Graphics.lineStyle()</code> method. You can specify the
 * following three types of caps:
 */
class CapsStyle
{
	/**
	 * Used to specify round caps in the <code>caps</code> parameter of the
	 * <code>flash.display.Graphics.lineStyle()</code> method.
	 */
	public static ROUND:string = "round";

	/**
	 * Used to specify no caps in the <code>caps</code> parameter of the
	 * <code>flash.display.Graphics.lineStyle()</code> method.
	 */
	public static NONE:string = "none";

	/**
	 * Used to specify square caps in the <code>caps</code> parameter of the
	 * <code>flash.display.Graphics.lineStyle()</code> method.
	 */
	public static SQUARE:string = "square";
}

export = CapsStyle;