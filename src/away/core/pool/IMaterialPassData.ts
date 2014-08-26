///<reference path="../../_definitions.ts"/>

/**
 * @module away.pool
 */
module away.pool
{
	import IMaterialPass				= away.materials.IMaterialPass;

	/**
	 * IMaterialPassData is an interface for classes that are used in the rendering pipeline to render the
	 * contents of a material pass
	 *
	 * @class away.pool.IMaterialPassData
	 */
	export interface IMaterialPassData
	{
		/**
		 *
		 */
		materialPass:IMaterialPass;

		/**
		 *
		 */
		dispose();

		/**
		 *
		 */
		invalidate();
	}
}
