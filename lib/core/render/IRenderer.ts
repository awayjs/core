import LineSubMesh					= require("awayjs-core/lib/core/base/LineSubMesh");
import TriangleSubMesh				= require("awayjs-core/lib/core/base/TriangleSubMesh");
import Rectangle					= require("awayjs-core/lib/core/geom/Rectangle");
import IEntitySorter				= require("awayjs-core/lib/core/sort/IEntitySorter");
import ICollector					= require("awayjs-core/lib/core/traverse/ICollector");
import Billboard					= require("awayjs-core/lib/entities/Billboard");
import Camera						= require("awayjs-core/lib/entities/Camera");
import Skybox						= require("awayjs-core/lib/entities/Skybox");
import IEventDispatcher				= require("awayjs-core/lib/events/IEventDispatcher");
import TextureProxyBase				= require("awayjs-core/lib/textures/TextureProxyBase");

/**
 * IRenderer is an interface for classes that are used in the rendering pipeline to render the
 * contents of a partition
 *
 * @class away.render.IRenderer
 */
interface IRenderer extends IEventDispatcher
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

export = IRenderer;