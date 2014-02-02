///<reference path="../../_definitions.ts"/>

/**
 * The SpreadMethod class provides values for the <code>spreadMethod</code>
 * parameter in the <code>beginGradientFill()</code> and
 * <code>lineGradientStyle()</code> methods of the Graphics class.
 *
 * <p>The following example shows the same gradient fill using various spread
 * methods:</p>
 */
module away.base
{
	export class SpreadMethod
	{
		/**
		 * Specifies that the gradient use the <i>pad</i> spread method.
		 */
		public static PAD:string = "pad";

		/**
		 * Specifies that the gradient use the <i>reflect</i> spread method.
		 */
		public static REFLECT:string = "reflect";

		/**
		 * Specifies that the gradient use the <i>repeat</i> spread method.
		 */
		public static REPEAT:string = "repeat";
	}
}