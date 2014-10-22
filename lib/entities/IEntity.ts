import BoundingVolumeBase			= require("awayjs-core/lib/bounds/BoundingVolumeBase");
import Scene						= require("awayjs-core/lib/containers/Scene");
import ControllerBase				= require("awayjs-core/lib/controllers/ControllerBase");
import Matrix3D						= require("awayjs-core/lib/core/geom/Matrix3D");
import Transform					= require("awayjs-core/lib/core/geom/Transform");
import Vector3D						= require("awayjs-core/lib/core/geom/Vector3D");
import IAsset						= require("awayjs-core/lib/core/library/IAsset");
import Partition					= require("awayjs-core/lib/core/partition/Partition");
import EntityNode					= require("awayjs-core/lib/core/partition/EntityNode");
import IPickingCollider				= require("awayjs-core/lib/core/pick/IPickingCollider");
import PickingCollisionVO			= require("awayjs-core/lib/core/pick/PickingCollisionVO");
import IRenderer					= require("awayjs-core/lib/core/render/IRenderer");
import Camera						= require("awayjs-core/lib/entities/Camera");

interface IEntity extends IAsset
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
	bounds:BoundingVolumeBase;

	/**
	 *
	 */
	castsShadows:boolean;

	/**
	 *
	 */
	inverseSceneTransform:Matrix3D;

	/**
	 *
	 */
	partitionNode:EntityNode;

	/**
	 *
	 */
	pickingCollider:IPickingCollider;

	/**
	 *
	 */
	transform:Transform;

	/**
	 *
	 */
	scene:Scene;

	/**
	 *
	 */
	scenePosition:Vector3D;

	/**
	 *
	 */
	sceneTransform:Matrix3D;

	/**
	 *
	 */
	worldBounds:BoundingVolumeBase;

	/**
	 *
	 */
	zOffset:number

	/**
	 *
	 */
	isIntersectingRay(rayPosition:Vector3D, rayDirection:Vector3D):boolean;

	/**
	 *
	 *
	 * @param target
	 * @param upAxis
	 */
	lookAt(target:Vector3D, upAxis?:Vector3D);

	/**
	 * @internal
	 */
	_iPickingCollisionVO:PickingCollisionVO;

	/**
	 * @internal
	 */
	_iController:ControllerBase;

	/**
	 * @internal
	 */
	_iAssignedPartition:Partition;

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
	getRenderSceneTransform(camera:Camera):Matrix3D;

	/**
	 *
	 * @param renderer
	 * @private
	 */
	_iCollectRenderables(renderer:IRenderer);
}

export = IEntity;