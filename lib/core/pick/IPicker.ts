import Scene						= require("awayjs-core/lib/containers/Scene");
import View							= require("awayjs-core/lib/containers/View");
import Vector3D						= require("awayjs-core/lib/core/geom/Vector3D");
import PickingCollisionVO			= require("awayjs-core/lib/core/pick/PickingCollisionVO");

/**
 * Provides an interface for picking objects that can pick 3d objects from a view or scene.
 *
 * @interface away.pick.IPicker
 */
interface IPicker
{
	/**
	 * Gets the collision object from the screen coordinates of the picking ray.
	 *
	 * @param x The x coordinate of the picking ray in screen-space.
	 * @param y The y coordinate of the picking ray in screen-space.
	 * @param view The view on which the picking object acts.
	 */
	getViewCollision(x:number, y:number, view:View):PickingCollisionVO;

	/**
	 * Gets the collision object from the scene position and direction of the picking ray.
	 *
	 * @param position The position of the picking ray in scene-space.
	 * @param direction The direction of the picking ray in scene-space.
	 * @param scene The scene on which the picking object acts.
	 */
	getSceneCollision(position:Vector3D, direction:Vector3D, scene:Scene):PickingCollisionVO;

	/**
	 * Determines whether the picker takes account of the mouseEnabled properties of entities. Defaults to true.
	 */
	onlyMouseEnabled:boolean; // GET / SET

	/**
	 * Disposes memory used by the IPicker object
	 */
	dispose();
}

export = IPicker;