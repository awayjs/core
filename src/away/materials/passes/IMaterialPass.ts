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
	import IRenderable					= away.pool.IRenderable;
	import TextureProxyBase				= away.textures.TextureProxyBase;

	/**
	 * MaterialPassBase provides an abstract base class for material shader passes. A material pass constitutes at least
	 * a render call per required renderable.
	 */
	export interface IMaterialPass extends away.events.IEventDispatcher
	{
		/**
		 *
		 */
		_iPasses:Array<IMaterialPass>;

		/**
		 *
		 */
		_iProgramids:Array<number>;

		/**
		 * The material to which this pass belongs.
		 */
		material:MaterialBase;

		/**
		 * Indicate whether this pass should write to the depth buffer or not. Ignored when blending is enabled.
		 */
		writeDepth:boolean;

		/**
		 * Defines whether any used textures should use mipmapping.
		 */
		mipmap:boolean;

		/**
		 * Defines whether smoothing should be applied to any used textures.
		 */
		smooth:boolean;

		/**
		 * Defines whether textures should be tiled.
		 */
		repeat:boolean;

		/**
		 * Defines whether or not the material should perform backface culling.
		 */
		bothSides:boolean;

		/**
		 * Returns the animation data set adding animations to the material.
		 */
		animationSet:IAnimationSet;

		/**
		 * Specifies whether this pass renders to texture
		 */
		renderToTexture:boolean; //GET

		/**
		 * Cleans up any resources used by the current object.
		 * @param deep Indicates whether other resources should be cleaned up, that could potentially be shared across different instances.
		 */
		dispose();
		
		/**
		 * Sets up the animation state. This needs to be called before render()
		 *
		 * @private
		 */
		iUpdateAnimationState(renderable:IRenderable, stage:Stage, camera:Camera);

		/**
		 * Renders an object to the current render target.
		 *
		 * @private
		 */
		iRender(renderable:IRenderable, stage:Stage, camera:Camera, viewProjection:Matrix3D);

		/**
		 * Sets the render state for the pass that is independent of the rendered object. This needs to be called before
		 * calling renderPass. Before activating a pass, the previously used pass needs to be deactivated.
		 * @param stage The Stage object which is currently used for rendering.
		 * @param camera The camera from which the scene is viewed.
		 * @private
		 */
		iActivate(stage:Stage, camera:Camera);

		/**
		 * Clears the render state for the pass. This needs to be called before activating another pass.
		 * @param stage The Stage used for rendering
		 *
		 * @private
		 */
		iDeactivate(stage:Stage);

		/**
		 * Marks the shader program as invalid, so it will be recompiled before the next render.
		 *
		 * @param updateMaterial Indicates whether the invalidation should be performed on the entire material. Should always pass "true" unless it's called from the material itself.
		 */
		iInvalidateShaderProgram(updateMaterial?:boolean);

		/**
		 * The light picker used by the material to provide lights to the material if it supports lighting.
		 *
		 * @see away.materials.LightPickerBase
		 * @see away.materials.StaticLightPicker
		 */
		lightPicker:LightPickerBase;

		/**
		 * Indicates whether visible textures (or other pixels) used by this material have
		 * already been premultiplied. Toggle this if you are seeing black halos around your
		 * blended alpha edges.
		 */
		alphaPremultiplied:boolean;
	}
}