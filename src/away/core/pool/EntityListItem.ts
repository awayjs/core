///<reference path="../../_definitions.ts"/>

/**
 * @module away.pool
 */
module away.pool
{
	/**
	 * @class away.pool.EntityListItem
	 */
	export class EntityListItem
	{
		/**
		 *
		 */
		public entity:away.entities.IEntity;

		/**
		 *
		 */
		public next:EntityListItem;
	}
}