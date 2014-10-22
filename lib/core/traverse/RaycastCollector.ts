import Vector3D						= require("awayjs-core/lib/core/geom/Vector3D");
import NodeBase						= require("awayjs-core/lib/core/partition/NodeBase");
import CollectorBase				= require("awayjs-core/lib/core/traverse/CollectorBase");
import Camera						= require("awayjs-core/lib/entities/Camera");
import IEntity						= require("awayjs-core/lib/entities/IEntity");

/**
 * The RaycastCollector class is a traverser for scene partitions that collects all scene graph entities that are
 * considered intersecting with the defined ray.
 *
 * @see away.partition.Partition
 * @see away.entities.IEntity
 *
 * @class away.traverse.RaycastCollector
 */
class RaycastCollector extends CollectorBase
{
	private _rayPosition:Vector3D = new Vector3D();
	private _rayDirection:Vector3D = new Vector3D();

	public _iCollectionMark:number = 0;

	/**
	 * Provides the starting position of the ray.
	 */
	public get rayPosition():Vector3D
	{
		return this._rayPosition;
	}

	public set rayPosition(value:Vector3D)
	{
		this._rayPosition = value;
	}

	/**
	 * Provides the direction vector of the ray.
	 */
	public get rayDirection():Vector3D
	{
		return this._rayDirection;
	}

	public set rayDirection(value:Vector3D)
	{
		this._rayDirection = value;
	}

	/**
	 * Creates a new RaycastCollector object.
	 */
	constructor()
	{
		super();
	}

	/**
	 * Returns true if the current node is at least partly in the frustum. If so, the partition node knows to pass on the traverser to its children.
	 *
	 * @param node The Partition3DNode object to frustum-test.
	 */
	public enterNode(node:NodeBase):boolean
	{
		return node.isIntersectingRay(this._rayPosition, this._rayDirection);
	}
}

export = RaycastCollector;