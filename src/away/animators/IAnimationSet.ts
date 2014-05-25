///<reference path="../_definitions.ts"/>

module away.animators
{
	import IAsset						= away.library.IAsset;

	/**
	 * Provides an interface for data set classes that hold animation data for use in animator classes.
	 *
	 * @see away3d.animators.AnimatorBase
	 */
	export interface IAnimationSet extends IAsset
	{
		/**
		 * Check to determine whether a state is registered in the animation set under the given name.
		 *
		 * @param stateName The name of the animation state object to be checked.
		 */
		hasAnimation(name:string):boolean;

		/**
		 * Retrieves the animation state object registered in the animation data set under the given name.
		 *
		 * @param stateName The name of the animation state object to be retrieved.
		 */
		getAnimation(name:string):AnimationNodeBase;

		/**
		 * Indicates whether the properties of the animation data contained within the set combined with
		 * the vertex registers aslready in use on shading materials allows the animation data to utilise
		 * GPU calls.
		 */
		usesCPU:boolean; // GET

		/**
		 * Called by the material to reset the GPU indicator before testing whether register space in the shader
		 * is available for running GPU-based animation code.
		 *
		 * @private
		 */
		resetGPUCompatibility();

		/**
		 * Called by the animator to void the GPU indicator when register space in the shader
		 * is no longer available for running GPU-based animation code.
		 *
		 * @private
		 */
		cancelGPUCompatibility();
	}
}
