import EntityNode					= require("awayjs-core/lib/core/partition/EntityNode");
import ICollector					= require("awayjs-core/lib/core/traverse/ICollector");
import IEntity						= require("awayjs-core/lib/entities/IEntity");

/**
 * @class away.partition.CameraNode
 */
class CameraNode extends EntityNode
{
	constructor(camera:IEntity)
	{
		super(camera);
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:ICollector)
	{
		// todo: dead end for now, if it has a debug mesh, then sure accept that
	}
}

export = CameraNode;