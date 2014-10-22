import NodeBase						= require("awayjs-core/lib/core/partition/NodeBase");
import CollectorBase				= require("awayjs-core/lib/core/traverse/CollectorBase");

/**
 * @class away.traverse.ShadowCasterCollector
 */
class ShadowCasterCollector extends CollectorBase
{
	constructor()
	{
		super();
	}

	/**
	 *
	 */
	public enterNode(node:NodeBase):boolean
	{
		var enter:boolean = this.scene._iCollectionMark != node._iCollectionMark && node.isCastingShadow();

		if (!enter) {
			node._iCollectionMark = this.scene._iCollectionMark;

			return false;
		}

		return super.enterNode(node);
	}
}

export = ShadowCasterCollector;