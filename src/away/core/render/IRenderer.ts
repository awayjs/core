///<reference path="../../_definitions.ts"/>

/**
 * @module away.render
 */
module away.render
{
	/**
	 * IRenderer is an interface for classes that are used in the rendering pipeline to render the
	 * contents of a partition
	 *
	 * @class away.render.IRenderer
	 */
	export interface IRenderer extends away.events.IEventDispatcher
	{
		/**
		 *
		 */
		renderableSorter:away.sort.IEntitySorter;

		/**
		 *
		 */
		shareContext:boolean;

		/**
		 *
		 */
		x:number /*uint*/;

		/**
		 *
		 */
		y:number /*uint*/;

		/**
		 *
		 */
		width:number /*uint*/;

		/**
		 *
		 */
		height:number /*uint*/;

		/**
		 *
		 */
		viewPort:away.geom.Rectangle;

		/**
		 *
		 */
		scissorRect:away.geom.Rectangle;

		/**
		 *
		 * @param billboard
		 */
		applyBillboard(billboard:away.entities.Billboard);

		/**
		 *
		 * @param triangleSubMesh
		 */
		applyLineSubMesh(triangleSubMesh:away.base.LineSubMesh);

		/**
		 *
		 * @param skybox
		 */
		applySkybox(skybox:away.entities.Skybox);

		/**
		 *
		 * @param triangleSubMesh
		 */
		applyTriangleSubMesh(triangleSubMesh:away.base.TriangleSubMesh);

		/**
		 *
		 */
		dispose();

		/**
		 *
		 * @param entityCollector
		 */
		render(entityCollector:away.traverse.ICollector);

		/**
		 * @internal
		 */
		_iBackgroundR:number /*uint*/;

		/**
		 * @internal
		 */
		_iBackgroundG:number /*uint*/;

		/**
		 * @internal
		 */
		_iBackgroundB:number /*uint*/;

		/**
		 * @internal
		 */
		_iBackgroundAlpha:number;

		/**
		 * @internal
		 */
		_iCreateEntityCollector():away.traverse.ICollector;
	}
}
