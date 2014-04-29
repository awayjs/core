///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.base
{
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
		animator:away.animators.IAnimator; // in most cases, this will in fact be null

		/**
		 * The material with which to render the object.
		 */
		material:away.materials.IMaterial; // GET / SET

		/**
		 *
		 */
		uvTransform:away.geom.UVTransform; // GET / SET

		/**
		 *
		 * @param renderable
		 * @private
		 */
		_iAddRenderable(renderable:away.pool.IRenderable):away.pool.IRenderable;


		/**
		 *
		 * @param renderable
		 * @private
		 */
		_iRemoveRenderable(renderable:away.pool.IRenderable):away.pool.IRenderable;

		/**
		 *
		 * @param renderer
		 * @private
		 */
		_iCollectRenderable(renderer:away.render.IRenderer)
	}
}
