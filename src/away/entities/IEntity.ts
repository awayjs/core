///<reference path="../_definitions.ts"/>

module away.entities
{
	export interface IEntity extends away.library.IAsset
	{
		x:number;
		y:number;
		z:number;

		rotationX:number;
		rotationY:number;
		rotationZ:number;

		scaleX:number;
		scaleY:number;
		scaleZ:number;

		/**
		 *
		 */
		bounds:away.bounds.BoundingVolumeBase;

		/**
		 *
		 */
		castsShadows:boolean;

		/**
		 *
		 */
		inverseSceneTransform:away.geom.Matrix3D;

		/**
		 *
		 */
		partitionNode:away.partition.EntityNode;

		/**
		 *
		 */
		pickingCollider:away.pick.IPickingCollider;

		/**
		 *
		 */
		transform:away.geom.Transform;

		/**
		 *
		 */
		scene:away.containers.Scene;

		/**
		 *
		 */
		scenePosition:away.geom.Vector3D;

		/**
		 *
		 */
		sceneTransform:away.geom.Matrix3D;

		/**
		 *
		 */
		worldBounds:away.bounds.BoundingVolumeBase;

		/**
		 *
		 */
		zOffset:number

		/**
		 *
		 */
		isIntersectingRay(rayPosition:away.geom.Vector3D, rayDirection:away.geom.Vector3D):boolean;

		/**
		 *
		 *
		 * @param target
		 * @param upAxis
		 */
		lookAt(target:away.geom.Vector3D, upAxis?:away.geom.Vector3D);

		/**
		 * @internal
		 */
		_iPickingCollisionVO:away.pick.PickingCollisionVO;

		/**
		 * @internal
		 */
		_iController:away.controllers.ControllerBase;

		/**
		 * @internal
		 */
		_iAssignedPartition:away.partition.Partition;

		/**
		 * //TODO
		 *
		 * @param shortestCollisionDistance
		 * @param findClosest
		 * @returns {boolean}
		 *
		 * @internal
		 */
		_iTestCollision(shortestCollisionDistance:number, findClosest:boolean):boolean;

		/**
		 * @internal
		 */
		_iIsMouseEnabled():boolean

		/**
		 * @internal
		 */
		_iIsVisible():boolean

		_iInternalUpdate()

		/**
		 * The transformation matrix that transforms from model to world space, adapted with any special operations needed to render.
		 * For example, assuring certain alignedness which is not inherent in the scene transform. By default, this would
		 * return the scene transform.
		 */
		getRenderSceneTransform(camera:away.entities.Camera):away.geom.Matrix3D;
	}
}