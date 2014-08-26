///<reference path="../../_definitions.ts"/>

module away.materials
{
	import IAnimationSet				= away.animators.IAnimationSet;
	import IAnimator					= away.animators.IAnimator;
	import Stage						= away.base.Stage;
	import BlendMode					= away.base.BlendMode;
	import Camera						= away.entities.Camera;
	import AbstractMethodError			= away.errors.AbstractMethodError;
	import ArgumentError				= away.errors.ArgumentError;
	import Event						= away.events.Event;
	import Rectangle					= away.geom.Rectangle;
	import Matrix3D						= away.geom.Matrix3D;
	import LightPickerBase				= away.materials.LightPickerBase;
	import IMaterialPassData			= away.pool.IMaterialPassData;
	import IRenderable					= away.pool.IRenderable;
	import TextureProxyBase				= away.textures.TextureProxyBase;

	/**
	 * MaterialPassBase provides an abstract base class for material shader passes. A material pass constitutes at least
	 * a render call per required renderable.
	 */
	export interface IMaterialPass extends away.events.IEventDispatcher
	{
		/**
		 * Cleans up any resources used by the current object.
		 * @param deep Indicates whether other resources should be cleaned up, that could potentially be shared across different instances.
		 */
		dispose();

		/**
		 * Renders an object to the current render target.
		 *
		 * @private
		 */
		_iRender(pass:IMaterialPassData, renderable:IRenderable, stage:Stage, camera:Camera, viewProjection:Matrix3D);

		/**
		 * Sets the render state for the pass that is independent of the rendered object. This needs to be called before
		 * calling renderPass. Before activating a pass, the previously used pass needs to be deactivated.
		 * @param stage The Stage object which is currently used for rendering.
		 * @param camera The camera from which the scene is viewed.
		 * @private
		 */
		_iActivate(pass:IMaterialPassData, stage:Stage, camera:Camera);

		/**
		 * Clears the render state for the pass. This needs to be called before activating another pass.
		 * @param stage The Stage used for rendering
		 *
		 * @private
		 */
		_iDeactivate(pass:IMaterialPassData, stage:Stage);

		/**
		 * The light picker used by the material to provide lights to the material if it supports lighting.
		 *
		 * @see away.materials.LightPickerBase
		 * @see away.materials.StaticLightPicker
		 */
		lightPicker:LightPickerBase;
	}
}