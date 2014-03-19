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
		numEntities:number;

		/**
		 *
		 */
		numInteractiveEntities:number;

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
		applyDirectionalLight(entity:away.entities.IEntity);

		/**
		 *
		 * @param entity
		 */
		applyEntity(entity:away.entities.IEntity);

		/**
		 *
		 * @param entity
		 */
		applyLightProbe(entity:away.entities.IEntity);

		/**
		 *
		 * @param entity
		 */
		applyPointLight(entity:away.entities.IEntity);
	}
}