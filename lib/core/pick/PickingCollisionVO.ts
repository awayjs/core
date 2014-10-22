import DisplayObject				= require("awayjs-core/lib/core/base/DisplayObject");
import IMaterialOwner				= require("awayjs-core/lib/core/base/IMaterialOwner");
import Point						= require("awayjs-core/lib/core/geom/Point");
import Vector3D						= require("awayjs-core/lib/core/geom/Vector3D");

/**
 * Value object for a picking collision returned by a picking collider. Created as unique objects on display objects
 *
 * @see away.base.DisplayObject#pickingCollisionVO
 * @see away.core.pick.IPickingCollider
 *
 * @class away.pick.PickingCollisionVO
 */
class PickingCollisionVO
{
	/**
	 * The display object to which this collision object belongs.
	 */
	public displayObject:DisplayObject;

	/**
	 * The local position of the collision on the entity's surface.
	 */
	public localPosition:Vector3D;

	/**
	 * The local normal vector at the position of the collision.
	 */
	public localNormal:Vector3D;

	/**
	 * The uv coordinate at the position of the collision.
	 */
	public uv:Point;

	/**
	 * The index of the face where the event took pl ace.
	 */
	public index:number;

	/**
	 * The index of the subGeometry where the event took place.
	 */
//		public subGeometryIndex:number;

	/**
	 * The starting position of the colliding ray in local coordinates.
	 */
	public localRayPosition:Vector3D;

	/**
	 * The direction of the colliding ray in local coordinates.
	 */
	public localRayDirection:Vector3D;

	/**
	 * The starting position of the colliding ray in scene coordinates.
	 */
	public rayPosition:Vector3D;

	/**
	 * The direction of the colliding ray in scene coordinates.
	 */
	public rayDirection:Vector3D;

	/**
	 * Determines if the ray position is contained within the entity bounds.
	 *
	 * @see away3d.entities.Entity#bounds
	 */
	public rayOriginIsInsideBounds:boolean;

	/**
	 * The distance along the ray from the starting position to the calculated intersection entry point with the entity.
	 */
	public rayEntryDistance:number;

	/**
	 * The material ownwer associated with a collision.
	 */
	public materialOwner:IMaterialOwner;

	/**
	 * Creates a new <code>PickingCollisionVO</code> object.
	 *
	 * @param entity The entity to which this collision object belongs.
	 */
	constructor(displayObject:DisplayObject)
	{
		this.displayObject = displayObject;
	}

}

export = PickingCollisionVO;