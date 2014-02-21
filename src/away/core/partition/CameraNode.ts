///<reference path="../../_definitions.ts"/>

/**
 * @module away.partition
 */
module away.partition
{
	/**
	 * @class away.partition.CameraNode
	 */
	export class CameraNode extends EntityNode
	{
		constructor(camera:away.entities.IEntity)
		{
			super(camera);
		}

		/**
		 * @inheritDoc
		 */
		public acceptTraverser(traverser:away.traverse.ICollector)
		{
			// todo: dead end for now, if it has a debug mesh, then sure accept that
		}
	}
}