import EntityNode					= require("awayjs-core/lib/core/partition/EntityNode");
import ICollector					= require("awayjs-core/lib/core/traverse/ICollector");
import IEntity						= require("awayjs-core/lib/entities/IEntity");

/**
 * @class away.partition.LightProbeNode
 */
class LightProbeNode extends EntityNode
{
	private _lightProbe:IEntity;

	/**
	 *
	 * @param lightProbe
	 */
	constructor(lightProbe:IEntity)
	{
		super(lightProbe);

		this._lightProbe = lightProbe;
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:ICollector)
	{
		if (traverser.enterNode(this))
			traverser.applyLightProbe(this._lightProbe);
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

export = LightProbeNode;