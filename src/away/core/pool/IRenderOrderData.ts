///<reference path="../../_definitions.ts"/>

/**
 * @module away.pool
 */
module away.pool
{
	/**
	 * IRenderOrderData is an interface for classes that are used in the rendering pipeline to render the
	 * contents of a texture
	 *
	 * @class away.pool.IRenderOrderData
	 */
	export interface IRenderOrderData
	{
		/**
		 *
		 */
		dispose();

		/**
		 *
		 */
		reset();

		/**
		 *
		 */
		invalidate();
	}
}
