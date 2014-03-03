///<reference path="../../_definitions.ts"/>

/**
 * @module away.traverse
 */
module away.traverse
{
	/**
	 * @class away.traverse.ICollector
	 */
	export interface ICollector
	{
		/**
		 *
		 */
		camera:away.entities.Camera;

		/**
		 *
		 */
		scene:away.containers.Scene;

		/**
		 *
		 */
		clear();

		/**
		 *
		 */
		entityHead;

		/**
		 *
		 * @param node
		 */
		enterNode(node:away.partition.NodeBase):boolean;

		/**
		 *
		 * @param entity
		 */
		applyEntity(entity:away.entities.IEntity);
	}
}