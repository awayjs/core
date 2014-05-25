///<reference path="../../_definitions.ts"/>

/**
 * @module away.partition
 */
module away.partition
{
	import IEntity						= away.entities.IEntity;
	import ICollector					= away.traverse.ICollector;

	/**
	 * @class away.partition.CameraNode
	 */
	export class CameraNode extends EntityNode
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
}