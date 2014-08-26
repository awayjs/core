///<reference path="../../_definitions.ts"/>

/**
 * @module away.pool
 */
module away.pool
{
	/**
	 * IMaterialData is an interface for classes that are used in the rendering pipeline to render the
	 * contents of a texture
	 *
	 * @class away.pool.IMaterialData
	 */
	export interface IMaterialData
	{
		/**
		 *
		 */
		dispose();

		/**
		 *
		 */
		invalidateMaterial();

		/**
		 *
		 */
		invalidateAnimation();
	}
}
