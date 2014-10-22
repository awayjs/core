import IEntity						= require("awayjs-core/lib/entities/IEntity");

/**
 * @class away.pool.EntityListItem
 */
class EntityListItem
{
	/**
	 *
	 */
	public entity:IEntity;

	/**
	 *
	 */
	public next:EntityListItem;
}

export = EntityListItem;