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
		x:number /*uint*/;
		y:number /*uint*/;
		width:number /*uint*/;
		height:number /*uint*/;

		viewPort:away.geom.Rectangle;

		scissorRect:away.geom.Rectangle;

		dispose();

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
