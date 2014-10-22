import IAnimator				= require("awayjs-core/lib/animators/IAnimator");
import UVTransform				= require("awayjs-core/lib/core/geom/UVTransform");
import IAsset					= require("awayjs-core/lib/core/library/IAsset");
import IRenderable				= require("awayjs-core/lib/core/pool/IRenderable");
import IRenderer				= require("awayjs-core/lib/core/render/IRenderer");
import MaterialBase				= require("awayjs-core/lib/materials/MaterialBase");

/**
 * IMaterialOwner provides an interface for objects that can use materials.
 *
 * @interface away.base.IMaterialOwner
 */
interface IMaterialOwner extends IAsset
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

export = IMaterialOwner;