import Scene						= require("awayjs-core/lib/containers/Scene");
import View							= require("awayjs-core/lib/containers/View");
import Vector3D						= require("awayjs-core/lib/core/geom/Vector3D");
import IPicker						= require("awayjs-core/lib/core/pick/IPicker");
import PickingCollisionVO			= require("awayjs-core/lib/core/pick/PickingCollisionVO");
import EntityListItem				= require("awayjs-core/lib/core/pool/EntityListItem");
import ICollector					= require("awayjs-core/lib/core/traverse/ICollector");
import RaycastCollector				= require("awayjs-core/lib/core/traverse/RaycastCollector");
import IEntity						= require("awayjs-core/lib/entities/IEntity");

/**
 * Picks a 3d object from a view or scene by 3D raycast calculations.
 * Performs an initial coarse boundary calculation to return a subset of entities whose bounding volumes intersect with the specified ray,
 * then triggers an optional picking collider on individual entity objects to further determine the precise values of the picking ray collision.
 *
 * @class away.pick.RaycastPicker
 */
class RaycastPicker implements IPicker
{
	private _findClosestCollision:boolean;
	private _raycastCollector:RaycastCollector;
	private _ignoredEntities = [];
	private _onlyMouseEnabled:boolean = true;

	private _entities:Array<IEntity>;
	private _numEntities:number = 0;
	private _hasCollisions:boolean;

	/**
	 * @inheritDoc
	 */
	public get onlyMouseEnabled():boolean
	{
		return this._onlyMouseEnabled;
	}

	public set onlyMouseEnabled(value:boolean)
	{
		this._onlyMouseEnabled = value;
	}

	/**
	 * Creates a new <code>RaycastPicker</code> object.
	 *
	 * @param findClosestCollision Determines whether the picker searches for the closest bounds collision along the ray,
	 * or simply returns the first collision encountered. Defaults to false.
	 */
	constructor(findClosestCollision:boolean = false)
	{
		this._raycastCollector = new RaycastCollector();

		this._findClosestCollision = findClosestCollision;
		this._entities = new Array<IEntity>();
	}

	/**
	 * @inheritDoc
	 */
	public getViewCollision(x:number, y:number, view:View):PickingCollisionVO
	{
		//update ray
		var rayPosition:Vector3D = view.unproject(x, y, 0);
		var rayDirection:Vector3D = view.unproject(x, y, 1).subtract(rayPosition);

		return this.getSceneCollision(rayPosition, rayDirection, view.scene);
	}

	/**
	 * @inheritDoc
	 */
	public getSceneCollision(rayPosition:Vector3D, rayDirection:Vector3D, scene:Scene):PickingCollisionVO
	{
		//clear collector
		this._raycastCollector.clear();

		//setup ray vectors
		this._raycastCollector.rayPosition = rayPosition;
		this._raycastCollector.rayDirection = rayDirection;

		// collect entities to test
		scene.traversePartitions(this._raycastCollector);

		this._numEntities = 0;
		var node:EntityListItem = this._raycastCollector.entityHead;
		var entity:IEntity;

		while (node) {
			if (!this.isIgnored(entity = node.entity))
				this._entities[this._numEntities++] = entity;

			node = node.next;
		}

		//early out if no collisions detected
		if (!this._numEntities)
			return null;

		return this.getPickingCollisionVO(this._raycastCollector);
	}

//		public getEntityCollision(position:Vector3D, direction:Vector3D, entities:Array<IEntity>):PickingCollisionVO
//		{
//			this._numEntities = 0;
//
//			var entity:IEntity;
//			var l:number = entities.length;
//
//			for (var c:number = 0; c < l; c++) {
//				entity = entities[c];
//
//				if (entity.isIntersectingRay(position, direction))
//					this._entities[this._numEntities++] = entity;
//			}
//
//			return this.getPickingCollisionVO(this._raycastCollector);
//		}

	public setIgnoreList(entities)
	{
		this._ignoredEntities = entities;
	}

	private isIgnored(entity:IEntity):boolean
	{
		if (this._onlyMouseEnabled && !entity._iIsMouseEnabled())
			return true;

		var len:number = this._ignoredEntities.length;
		for (var i:number = 0; i < len; i++)
			if (this._ignoredEntities[i] == entity)
				return true;

		return false;
	}

	private sortOnNearT(entity1:IEntity, entity2:IEntity):number
	{
		return entity1._iPickingCollisionVO.rayEntryDistance > entity2._iPickingCollisionVO.rayEntryDistance? 1 : -1;
	}

	private getPickingCollisionVO(collector:ICollector):PickingCollisionVO
	{
		// trim before sorting
		this._entities.length = this._numEntities;

		// Sort entities from closest to furthest.
		this._entities = this._entities.sort(this.sortOnNearT); // TODO - test sort filter in JS

		// ---------------------------------------------------------------------
		// Evaluate triangle collisions when needed.
		// Replaces collision data provided by bounds collider with more precise data.
		// ---------------------------------------------------------------------

		var shortestCollisionDistance:number = Number.MAX_VALUE;
		var bestCollisionVO:PickingCollisionVO;
		var pickingCollisionVO:PickingCollisionVO;
		var entity:IEntity;
		var i:number;

		for (i = 0; i < this._numEntities; ++i) {
			entity = this._entities[i];
			pickingCollisionVO = entity._iPickingCollisionVO;
			if (entity.pickingCollider) {
				// If a collision exists, update the collision data and stop all checks.
				if ((bestCollisionVO == null || pickingCollisionVO.rayEntryDistance < bestCollisionVO.rayEntryDistance) && entity._iTestCollision(shortestCollisionDistance, this._findClosestCollision)) {
					shortestCollisionDistance = pickingCollisionVO.rayEntryDistance;
					bestCollisionVO = pickingCollisionVO;
					if (!this._findClosestCollision) {
						this.updateLocalPosition(pickingCollisionVO);
						return pickingCollisionVO;
					}
				}
			} else if (bestCollisionVO == null || pickingCollisionVO.rayEntryDistance < bestCollisionVO.rayEntryDistance) { // A bounds collision with no triangle collider stops all checks.
				// Note: a bounds collision with a ray origin inside its bounds is ONLY ever used
				// to enable the detection of a corresponsding triangle collision.
				// Therefore, bounds collisions with a ray origin inside its bounds can be ignored
				// if it has been established that there is NO triangle collider to test
				if (!pickingCollisionVO.rayOriginIsInsideBounds) {
					this.updateLocalPosition(pickingCollisionVO);
					return pickingCollisionVO;
				}
			}
		}

		return bestCollisionVO;
	}

	private updateLocalPosition(pickingCollisionVO:PickingCollisionVO)
	{
		var collisionPos:Vector3D = ( pickingCollisionVO.localPosition == null )? new Vector3D() : pickingCollisionVO.localPosition;

		var rayDir:Vector3D = pickingCollisionVO.localRayDirection;
		var rayPos:Vector3D = pickingCollisionVO.localRayPosition;
		var t:number = pickingCollisionVO.rayEntryDistance;
		collisionPos.x = rayPos.x + t*rayDir.x;
		collisionPos.y = rayPos.y + t*rayDir.y;
		collisionPos.z = rayPos.z + t*rayDir.z;
	}

	public dispose()
	{
		//TODO
	}
}

export = RaycastPicker;