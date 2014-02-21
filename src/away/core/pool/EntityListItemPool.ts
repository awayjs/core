///<reference path="../../_definitions.ts"/>

/**
 * @module away.pool
 */
module away.pool
{
	/**
	 * @class away.pool.EntityListItemPool
	 */
	export class EntityListItemPool
	{
		private _pool:EntityListItem[];
		private _index:number = 0;
		private _poolSize:number = 0;

		/**
		 *
		 */
		constructor()
		{
			this._pool = [];
		}

		/**
		 *
		 */
		public getItem():EntityListItem
		{
			var item:EntityListItem;
			if (this._index == this._poolSize) {
				item = new EntityListItem();
				this._pool[this._index++] = item;
				++this._poolSize;
			} else {
				item = this._pool[this._index++];
			}
			return item;
		}

		/**
		 *
		 */
		public freeAll()
		{
			this._index = 0;
		}

		public dispose()
		{
			this._pool.length = 0;
		}
	}
}