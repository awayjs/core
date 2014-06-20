///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.base
{
	import IAnimator					= away.animators.IAnimator;
	import UVTransform					= away.geom.UVTransform;
	import MaterialBase					= away.materials.MaterialBase;
	import IRenderable					= away.pool.IRenderable;
	import IRenderer					= away.render.IRenderer;

	/**
	 * IMaterialOwner provides an interface for objects that can use materials.
	 *
	 * @interface away.base.IMaterialOwner
	 */
	export interface IMaterialOwner extends away.library.IAsset
	{
		/**
		 * The animation used by the material owner to assemble the vertex code.
		 */
		animator:IAnimator;

		/**
		 * The material with which to render the object.
		 */
		material:MaterialBase;

		/**
		 *
		 */
		uvTransform:UVTransform;

		/**
		 *
		 * @param renderable
		 * @private
		 */
		_iAddRenderable(renderable:IRenderable):IRenderable;


		/**
		 *
		 * @param renderable
		 * @private
		 */
		_iRemoveRenderable(renderable:IRenderable):IRenderable;

		/**
		 *
		 * @param renderer
		 * @private
		 */
		_iCollectRenderable(renderer:IRenderer)
	}
}
