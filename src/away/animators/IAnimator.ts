///<reference path="../_definitions.ts"/>

module away.animators
{
	import SubGeometryBase				= away.base.SubGeometryBase;
	import IEntity						= away.entities.IEntity;
	import IMaterialPass				= away.materials.IMaterialPass;
	import IRenderable					= away.pool.IRenderable;

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
		animationSet:IAnimationSet;

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
		addOwner(mesh:IEntity);

		/**
		 * Used by the mesh object from which the animator is removed, unregisters the owner for internal use.
		 *
		 * @private
		 */
		removeOwner(mesh:IEntity);

		/**
		 * //TODO
		 *
		 * @param sourceSubGeometry
		 */
		getRenderableSubGeometry(renderable:IRenderable, sourceSubGeometry:SubGeometryBase):SubGeometryBase;

		/**
		 *
		 * @param pass
		 */
		testGPUCompatibility(pass:IMaterialPass)
	}
}
