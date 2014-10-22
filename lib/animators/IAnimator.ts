import IAnimationSet			= require("awayjs-core/lib/animators/IAnimationSet");
import SubGeometryBase			= require("awayjs-core/lib/core/base/SubGeometryBase");
import IAsset					= require("awayjs-core/lib/core/library/IAsset");
import IRenderable				= require("awayjs-core/lib/core/pool/IRenderable");
import IEntity					= require("awayjs-core/lib/entities/IEntity");
import IMaterialPass			= require("awayjs-core/lib/materials/passes/IMaterialPass");

/**
 * Provides an interface for animator classes that control animation output from a data set subtype of <code>AnimationSetBase</code>.
 *
 * @see away.animators.IAnimationSet
 */
interface IAnimator extends IAsset
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
}

export = IAnimator;