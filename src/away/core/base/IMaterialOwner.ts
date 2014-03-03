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
	export interface IMaterialOwner
	{
		/**
		 * The animation used by the material to assemble the vertex code.
		 */
		animator:away.animators.IAnimator; // in most cases, this will in fact be null

		/**
		 *
		 */
		id:string;

		/**
		 * The material with which to render the object.
		 */
		material:away.materials.IMaterial; // GET / SET

		/**
		 *
		 */
		uvTransform:away.geom.UVTransform; // GET

		/**
		 *
		 */
		_iSetUVMatrixComponents(offsetU:number, offsetV:number, scaleU:number, scaleV:number, rotationUV:number);

		/**
		 *
		 */
		_iAddRenderable(renderable:away.pool.IRenderable):away.pool.IRenderable;

		/**
		 *
		 */
		_iRemoveRenderable(renderable:away.pool.IRenderable):away.pool.IRenderable;
	}
}
