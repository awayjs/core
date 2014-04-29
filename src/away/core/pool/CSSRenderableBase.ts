///<reference path="../../_definitions.ts"/>

/**
 * @module away.data
 */
module away.pool
{
	/**
	 * @class away.pool.RenderableListItem
	 */
	export class CSSRenderableBase implements away.pool.IRenderable
	{
		/**
		 *
		 */
		private _pool:RenderablePool;

		/**
		 *
		 */
		public next:CSSRenderableBase;

		/**
		 *
		 */
		public materialId:number;

		/**
		 *
		 */
		public renderOrderId:number;

		/**
		 *
		 */
		public zIndex:number;

		/**
		 *
		 */
		public cascaded:boolean;

		/**
		 *
		 */
		public renderSceneTransform:away.geom.Matrix3D;

		/**
		 *
		 */
		public sourceEntity:away.entities.IEntity;

		/**
		 *
		 */
		public materialOwner:away.base.IMaterialOwner;

		/**
		 *
		 */
		public htmlElement:HTMLElement;

		/**
		 *
 		 * @param sourceEntity
		 * @param material
		 * @param animator
		 */
		constructor(pool:RenderablePool, sourceEntity:away.entities.IEntity, materialOwner:away.base.IMaterialOwner)
		{
			//store a reference to the pool for later disposal
			this._pool = pool;

			this.sourceEntity = sourceEntity;
			this.materialOwner = materialOwner;
		}

		/**
		 *
		 */
		public dispose()
		{
			this._pool.disposeItem(this.materialOwner);
		}

		/**
		 *
		 */
		public invalidateGeometry()
		{

		}

		/**
		 *
		 */
		public invalidateIndexData()
		{

		}

		/**
		 *
		 */
		public invalidateVertexData(dataType:string)
		{

		}
	}
}