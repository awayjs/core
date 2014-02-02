///<reference path="../../_definitions.ts"/>

/**
 * The GradientType class provides values for the <code>type</code> parameter
 * in the <code>beginGradientFill()</code> and
 * <code>lineGradientStyle()</code> methods of the flash.display.Graphics
 * class.
 */
module away.base
{
	export class GradientType
	{
		/**
		 * Value used to specify a linear gradient fill.
		 */
		public static LINEAR:string = "linear";

		/**
		 * Value used to specify a radial gradient fill.
		 */
		public static RADIAL:string = "radial";
	}
}
