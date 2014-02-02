///<reference path="../../_definitions.ts"/>
/**
 * The TextFormatAlign class provides values for text alignment in the
 * TextFormat class.
 */
module away.text
{
	export class TextFormatAlign
	{
		/**
		 * Constant; centers the text in the text field. Use the syntax
		 * <code>TextFormatAlign.CENTER</code>.
		 */
		public CENTER:string = "center";

		/**
		 * Constant; justifies text within the text field. Use the syntax
		 * <code>TextFormatAlign.JUSTIFY</code>.
		 */
		public JUSTIFY:string = "justify";

		/**
		 * Constant; aligns text to the left within the text field. Use the syntax
		 * <code>TextFormatAlign.LEFT</code>.
		 */
		public LEFT:string = "left";

		/**
		 * Constant; aligns text to the right within the text field. Use the syntax
		 * <code>TextFormatAlign.RIGHT</code>.
		 */
		public RIGHT:string = "right";
	}
}
