///<reference path="../../_definitions.ts"/>

/**
 * @module away.sort
 */
module away.sort
{
	/**
	 * @interface away.sort.IEntitySorter
	 */
	export interface IEntitySorter
	{
		sortBlendedRenderables(head:away.pool.IRenderable):away.pool.IRenderable;

		sortOpaqueRenderables(head:away.pool.IRenderable):away.pool.IRenderable;
	}
}