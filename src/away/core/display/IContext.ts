///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.display
{
	import Rectangle						= away.geom.Rectangle;

	/**
	 *
	 * @class away.base.IContext
	 */
	export interface IContext
	{
		container:HTMLElement;

		clear(red?: number, green?: number, blue?: number, alpha?: number, depth?: number, stencil?: number, mask?: number);

		configureBackBuffer(width:number, height:number, antiAlias:number, enableDepthAndStencil?:boolean);

		dispose();

		present();

		setScissorRectangle(rect:Rectangle);
	}
}