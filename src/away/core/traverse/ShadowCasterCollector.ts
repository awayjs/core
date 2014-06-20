///<reference path="../../_definitions.ts"/>

/**
 * @module away.traverse
 */
module away.traverse
{
	import NodeBase					= away.partition.NodeBase;

	/**
	 * @class away.traverse.ShadowCasterCollector
	 */
	export class ShadowCasterCollector extends CollectorBase
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
}