///<reference path="../../_definitions.ts"/>

/**
 * @module away.pool
 */
module away.pool
{
	/**
	 * @class away.pool.RenderablePool
	 */
	export class RenderablePool
	{
		private static _pools:Object = new Object();

		private _pool:Object = new Object();
		private _renderableClass:any;

		/**
		 * //TODO
		 *
		 * @param renderableClass
		 */
		constructor(renderableClass:any)
		{
			this._renderableClass = renderableClass;
		}

		/**
		 * //TODO
		 *
		 * @param materialOwner
		 * @returns IRenderable
		 */
		public getItem(materialOwner:away.base.IMaterialOwner):IRenderable
		{
			return <IRenderable> (this._pool[materialOwner.id] || (this._pool[materialOwner.id] = materialOwner._iAddRenderable(new this._renderableClass(this, materialOwner))))
		}

		/**
		 * //TODO
		 *
		 * @param materialOwner
		 */
		public disposeItem(materialOwner:away.base.IMaterialOwner)
		{
			materialOwner._iRemoveRenderable(this._pool[materialOwner.id]);

			this._pool[materialOwner.id] = null;
		}

		/**
		 * //TODO
		 *
		 * @param renderableClass
		 * @returns RenderablePool
		 */
		public static getPool(renderableClass:any):RenderablePool
		{
			var pool:RenderablePool = RenderablePool._pools[renderableClass.id];

			if (pool != undefined)
				return pool;

			return <RenderablePool> (RenderablePool._pools[renderableClass.id] = new RenderablePool(renderableClass));
		}

		/**
		 * //TODO
		 *
		 * @param renderableClass
		 */
		public static disposePool(renderableClass:any)
		{
			if (RenderablePool._pools[renderableClass.id])
				RenderablePool._pools[renderableClass.id] = undefined;
		}
	}
}