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
		private _pool:Object = new Object();
		private _renderableClass:any;

		constructor(renderableClass:any)
		{
			this._renderableClass = renderableClass;
		}

		public getItem(materialOwner:away.base.IMaterialOwner):IRenderable
		{
			return <IRenderable> (this._pool[materialOwner.id] || (this._pool[materialOwner.id] = materialOwner._iAddRenderable(new this._renderableClass(this, materialOwner))))
		}

		public disposeItem(materialOwner:away.base.IMaterialOwner)
		{
			materialOwner._iRemoveRenderable(this._pool[materialOwner.id]);

			this._pool[materialOwner.id] = null;
		}
	}
}