import Vector3D						= require("awayjs-core/lib/core/geom/Vector3D");
import PickingCollisionVO			= require("awayjs-core/lib/core/pick/PickingCollisionVO");
import IEntity						= require("awayjs-core/lib/entities/IEntity");

/**
 * Provides an interface for picking colliders that can be assigned to individual entities in a scene for specific picking behaviour.
 * Used with the <code>RaycastPicker</code> picking object.
 *
 * @see away.entities.Entity#pickingCollider
 * @see away.pick.RaycastPicker
 *
 * @interface away.pick.IPickingCollider
 */
interface IPickingCollider
{
	/**
	 * Sets the position and direction of a picking ray in local coordinates to the entity.
	 *
	 * @param localDirection The position vector in local coordinates
	 * @param localPosition The direction vector in local coordinates
	 */
	setLocalRay(localPosition:Vector3D, localDirection:Vector3D);

	/**
	 * Tests a <code>Billboard</code> object for a collision with the picking ray.
	 *
	 * @param entity The entity instance to be tested.
	 * @param pickingCollisionVO The collision object used to store the collision results
	 * @param shortestCollisionDistance The current value of the shortest distance to a detected collision along the ray.
	 */
	testBillboardCollision(entity:IEntity, pickingCollisionVO:PickingCollisionVO, shortestCollisionDistance:number):boolean

	/**
	 * Tests a <code>Mesh</code> object for a collision with the picking ray.
	 *
	 * @param entity The entity instance to be tested.
	 * @param pickingCollisionVO The collision object used to store the collision results
	 * @param shortestCollisionDistance The current value of the shortest distance to a detected collision along the ray.
	 * @param findClosest
	 */
	testMeshCollision(entity:IEntity, pickingCollisionVO:PickingCollisionVO, shortestCollisionDistance:number, findClosest:boolean):boolean
}

export = IPickingCollider;