import Plane3D						= require("awayjs-core/lib/core/geom/Plane3D");
import NodeBase						= require("awayjs-core/lib/core/partition/NodeBase");
import EntityNode					= require("awayjs-core/lib/core/partition/EntityNode");
import ICollector					= require("awayjs-core/lib/core/traverse/ICollector");
import IEntity						= require("awayjs-core/lib/entities/IEntity");

/**
 * SkyboxNode is a space partitioning leaf node that contains a Skybox object.
 *
 * @class away.partition.SkyboxNode
 */
class SkyboxNode extends EntityNode
{
	private _skyBox:IEntity;

	/**
	 * Creates a new SkyboxNode object.
	 * @param skyBox The Skybox to be contained in the node.
	 */
	constructor(skyBox:IEntity)
	{
		super(skyBox);

		this._skyBox = skyBox;
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:ICollector)
	{
		if (traverser.enterNode(<NodeBase> this))
			traverser.applySkybox(this._skyBox);
	}

	/**
	 *
	 * @param planes
	 * @param numPlanes
	 * @returns {boolean}
	 */
	public isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean
	{
		if (!this._skyBox._iIsVisible)
			return false;

		//a skybox is always in view unless its visibility is set to false
		return true;
	}
}

export = SkyboxNode;