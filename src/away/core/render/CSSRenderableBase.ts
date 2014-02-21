///<reference path="../../_definitions.ts"/>

/**
 * @module away.data
 */
module away.render
{
	/**
	 * @class away.pool.RenderableListItem
	 */
	export class CSSRenderableBase implements away.pool.IRenderable
	{
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
		public material:away.materials.CSSMaterialBase;

		/**
		 *
		 */
		public animator:away.animators.IAnimator;

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
		constructor(sourceEntity:away.entities.IEntity, material:away.materials.CSSMaterialBase, animator:away.animators.IAnimator)
		{
			this.sourceEntity = sourceEntity;
			this.material = material;
			this.animator = animator;
		}
	}
}