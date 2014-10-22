import NodeBase						= require("awayjs-core/lib/core/partition/NodeBase");
import EntityNode					= require("awayjs-core/lib/core/partition/EntityNode");
import ICollector					= require("awayjs-core/lib/core/traverse/ICollector");
import IEntity						= require("awayjs-core/lib/entities/IEntity");

/**
 * @class away.partition.PointLightNode
 */
class PointLightNode extends EntityNode
{
	private _pointLight:IEntity;

	/**
	 *
	 * @param pointLight
	 */
	constructor(pointLight:IEntity)
	{
		super(pointLight);

		this._pointLight = pointLight;
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:ICollector)
	{
		if (traverser.enterNode(<NodeBase> this))
			traverser.applyPointLight(this._pointLight);
	}

	/**
	 *
	 * @returns {boolean}
	 */
	public isCastingShadow():boolean
	{
		return false;
	}
}

export = PointLightNode;