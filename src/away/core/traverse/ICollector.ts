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
		renderableSorter:away.sort.IEntitySorter;

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

		/**
		 *
		 */
		sortRenderables();

		/**
		 * //TODO
		 *
		 * @param entity
		 * @param shortestCollisionDistance
		 * @param findClosest
		 * @returns {boolean}
		 *
		 * @internal
		 */
		_iCollidesBefore(entity:away.entities.IEntity, shortestCollisionDistance:number, findClosest:boolean):boolean
	}
}