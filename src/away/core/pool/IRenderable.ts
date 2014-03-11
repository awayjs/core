///<reference path="../../_definitions.ts"/>

/**
 * @module away.pool
 */
module away.pool
{
	/**
	 * IRenderable is an interface for classes that are used in the rendering pipeline to render the
	 * contents of a partition
	 *
	 * @class away.render.IRenderable
	 */
	export interface IRenderable
	{
		/**
		 *
		 */
		next:IRenderable;


		/**
		 *
		 */
		materialId:number;

		/**
		 *
		 */
		renderOrderId:number;

		/**
		 *
		 */
		zIndex:number;

		/**
		 *
		 */
		dispose();

		/**
		 *
		 */
		_iUpdate();
	}
}
