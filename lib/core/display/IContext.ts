import Rectangle				= require("awayjs-core/lib/core/geom/Rectangle");

/**
 *
 * @class away.base.IContext
 */
interface IContext
{
	container:HTMLElement;

	clear(red?: number, green?: number, blue?: number, alpha?: number, depth?: number, stencil?: number, mask?: number);

	configureBackBuffer(width:number, height:number, antiAlias:number, enableDepthAndStencil?:boolean);

	dispose();

	present();

	setScissorRectangle(rect:Rectangle);
}

export = IContext;