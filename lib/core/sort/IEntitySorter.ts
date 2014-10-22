import IRenderable					= require("awayjs-core/lib/core/pool/IRenderable");

/**
 * @interface away.sort.IEntitySorter
 */
interface IEntitySorter
{
	sortBlendedRenderables(head:IRenderable):IRenderable;

	sortOpaqueRenderables(head:IRenderable):IRenderable;
}

export = IEntitySorter;