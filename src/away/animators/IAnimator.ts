///<reference path="../_definitions.ts"/>

module away.animators
{
	/**
	 * Provides an interface for animator classes that control animation output from a data set subtype of <code>AnimationSetBase</code>.
	 *
	 * @see away.animators.IAnimationSet
	 */
	export interface IAnimator extends away.library.IAsset
	{
		/**
		 *
		 */
		animationSet:away.animators.IAnimationSet;

		/**
		 *
		 */
		clone():IAnimator;

		/**
		 *
		 */
		dispose();

		/**
		 * Used by the entity object to which the animator is applied, registers the owner for internal use.
		 *
		 * @private
		 */
		addOwner(mesh:away.entities.IEntity);

		/**
		 * Used by the mesh object from which the animator is removed, unregisters the owner for internal use.
		 *
		 * @private
		 */
		removeOwner(mesh:away.entities.IEntity);

		/**
		 * //TODO
		 *
		 * @param sourceSubGeometry
		 */
		getRenderableSubGeometry(renderable:away.pool.IRenderable, sourceSubGeometry:away.base.SubGeometryBase):away.base.SubGeometryBase;
	}
}
