///<reference path="../../_definitions.ts"/>

/**
 * @module away.pool
 */
module away.pool
{
	/**
	 * IRenderableClass is an interface for the constructable class definition IRenderable that is used to
	 * create renderable objects in the rendering pipeline to render the contents of a partition
	 *
	 * @class away.render.IRenderableClass
	 */
	export interface IRenderableClass
	{
		/**
		 *
		 */
		id:string;

		/**
		 *
		 */
		new(pool:RenderablePool, materialOwner:away.base.IMaterialOwner):IRenderable;
	}
}
