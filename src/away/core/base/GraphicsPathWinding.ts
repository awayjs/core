///<reference path="../../_definitions.ts"/>

/**
 * The GraphicsPathWinding class provides values for the
 * <code>flash.display.GraphicsPath.winding</code> property and the
 * <code>flash.display.Graphics.drawPath()</code> method to determine the
 * direction to draw a path. A clockwise path is positively wound, and a
 * counter-clockwise path is negatively wound:
 *
 * <p> When paths intersect or overlap, the winding direction determines the
 * rules for filling the areas created by the intersection or overlap:</p>
 */
module away.base
{
	export class GraphicsPathWinding
	{
		public static EVEN_ODD:string = "evenOdd";
		public static NON_ZERO:string = "nonZero";
	}
}
