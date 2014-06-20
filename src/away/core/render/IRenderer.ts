///<reference path="../../_definitions.ts"/>

/**
 * @module away.render
 */
module away.render
{
	import LineSubMesh				= away.base.LineSubMesh;
	import TriangleSubMesh			= away.base.TriangleSubMesh;
	import Billboard				= away.entities.Billboard;
	import Camera					= away.entities.Camera;
	import Skybox					= away.entities.Skybox;
	import Rectangle				= away.geom.Rectangle;
	import IEntitySorter			= away.sort.IEntitySorter;
	import TextureProxyBase			= away.textures.TextureProxyBase;
	import ICollector				= away.traverse.ICollector;

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
		renderableSorter:IEntitySorter;

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
		viewPort:Rectangle;

		/**
		 *
		 */
		scissorRect:Rectangle;

		/**
		 *
		 * @param billboard
		 */
		applyBillboard(billboard:Billboard);

		/**
		 *
		 * @param triangleSubMesh
		 */
		applyLineSubMesh(triangleSubMesh:LineSubMesh);

		/**
		 *
		 * @param triangleSubMesh
		 */
		applyTriangleSubMesh(triangleSubMesh:TriangleSubMesh);

		/**
		 *
		 */
		dispose();

		/**
		 *
		 * @param entityCollector
		 */
		render(entityCollector:ICollector);

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
		_iCreateEntityCollector():ICollector;

		_iRender(entityCollector:ICollector, target?:TextureProxyBase, scissorRect?:Rectangle, surfaceSelector?:number);

		_iRenderCascades(entityCollector:ICollector, target:TextureProxyBase, numCascades:number, scissorRects:Array<Rectangle>, cameras:Array<Camera>)
	}
}
