import IAnimationSet				= require("awayjs-core/lib/animators/IAnimationSet");
import IAnimator					= require("awayjs-core/lib/animators/IAnimator");
import IStage						= require("awayjs-core/lib/core/base/IStage");
import BlendMode					= require("awayjs-core/lib/core/base/BlendMode");
import Rectangle					= require("awayjs-core/lib/core/geom/Rectangle");
import Matrix3D						= require("awayjs-core/lib/core/geom/Matrix3D");
import IMaterialPassData			= require("awayjs-core/lib/core/pool/IMaterialPassData");
import IRenderable					= require("awayjs-core/lib/core/pool/IRenderable");
import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");
import ArgumentError				= require("awayjs-core/lib/errors/ArgumentError");
import Camera						= require("awayjs-core/lib/entities/Camera");
import Event						= require("awayjs-core/lib/events/Event");
import IEventDispatcher				= require("awayjs-core/lib/events/IEventDispatcher");
import LightPickerBase				= require("awayjs-core/lib/materials/lightpickers/LightPickerBase");
import TextureProxyBase				= require("awayjs-core/lib/textures/TextureProxyBase");

/**
 * MaterialPassBase provides an abstract base class for material shader passes. A material pass constitutes at least
 * a render call per required renderable.
 */
interface IMaterialPass extends IEventDispatcher
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
	_iRender(pass:IMaterialPassData, renderable:IRenderable, stage:IStage, camera:Camera, viewProjection:Matrix3D);

	/**
	 * Sets the render state for the pass that is independent of the rendered object. This needs to be called before
	 * calling renderPass. Before activating a pass, the previously used pass needs to be deactivated.
	 * @param stage The Stage object which is currently used for rendering.
	 * @param camera The camera from which the scene is viewed.
	 * @private
	 */
	_iActivate(pass:IMaterialPassData, stage:IStage, camera:Camera);

	/**
	 * Clears the render state for the pass. This needs to be called before activating another pass.
	 * @param stage The Stage used for rendering
	 *
	 * @private
	 */
	_iDeactivate(pass:IMaterialPassData, stage:IStage);

	/**
	 * The light picker used by the material to provide lights to the material if it supports lighting.
	 *
	 * @see away.materials.LightPickerBase
	 * @see away.materials.StaticLightPicker
	 */
	lightPicker:LightPickerBase;
}

export = IMaterialPass;