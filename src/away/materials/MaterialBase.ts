///<reference path="../_definitions.ts"/>

module away.materials
{
	import IAnimationSet				= away.animators.IAnimationSet;
	import IAnimator					= away.animators.IAnimator;
	import BlendMode					= away.base.BlendMode;
	import IMaterialOwner				= away.base.IMaterialOwner;
	import Stage						= away.base.Stage;
	import Camera						= away.entities.Camera;
	import Event						= away.events.Event;
	import Matrix3D						= away.geom.Matrix3D;
	import AssetType					= away.library.AssetType;
	import IMaterialPass				= away.materials.IMaterialPass;
	import IRenderable					= away.pool.IRenderable;
	import IMaterialData				= away.pool.IMaterialData;
	import IMaterialPassData			= away.pool.IMaterialPassData;

	/**
	 * MaterialBase forms an abstract base class for any material.
	 * A material consists of several passes, each of which constitutes at least one render call. Several passes could
	 * be used for special effects (render lighting for many lights in several passes, render an outline in a separate
	 * pass) or to provide additional render-to-texture passes (rendering diffuse light to texture for texture-space
	 * subsurface scattering, or rendering a depth map for specialized self-shadowing).
	 *
	 * Away3D provides default materials trough SinglePassMaterialBase and TriangleMaterial, which use modular
	 * methods to build the shader code. MaterialBase can be extended to build specific and high-performant custom
	 * shaders, or entire new material frameworks.
	 */
	export class MaterialBase extends away.library.NamedAssetBase implements away.library.IAsset
	{
		private _materialPassData:Array<IMaterialPassData> = new Array<IMaterialPassData>();
		private _materialData:Array<IMaterialData> = new Array<IMaterialData>();

		public _pAlphaThreshold:number = 0;
		public _pAnimateUVs:boolean = false;
		private _enableLightFallOff:boolean = true;
		private _specularLightSources:number = 0x01;
		private _diffuseLightSources:number = 0x03;

		/**
		 * An object to contain any extra data.
		 */
		public extra:Object;

		/**
		 * A value that can be used by materials that only work with a given type of renderer. The renderer can test the
		 * classification to choose which render path to use. For example, a deferred material could set this value so
		 * that the deferred renderer knows not to take the forward rendering path.
		 *
		 * @private
		 */
		public _iClassification:string;


		/**
		 * An id for this material used to sort the renderables by shader program, which reduces Program state changes.
		 *
		 * @private
		 */
		public _iMaterialId:number = 0;

		public _iBaseScreenPassIndex:number = 0;

		private _bothSides:boolean = false; // update
		private _animationSet:IAnimationSet;
		public _pScreenPassesInvalid:boolean = true;

		/**
		 * A list of material owners, renderables or custom Entities.
		 */
		private _owners:Array<IMaterialOwner>;

		private _alphaPremultiplied:boolean;

		public _pBlendMode:string = BlendMode.NORMAL;

		private _numPasses:number = 0;
		private _passes:Array<IMaterialPass>;

		private _mipmap:boolean = false;
		private _smooth:boolean = true;
		private _repeat:boolean = false;

		public _pLightPicker:LightPickerBase;

		public _pHeight:number = 1;
		public _pWidth:number = 1;
		public _pRequiresBlending:boolean = false;

		private _onPassChangeDelegate:(event:Event) => void;
		private _onLightChangeDelegate:(event:Event) => void;

		/**
		 * Creates a new MaterialBase object.
		 */
		constructor()
		{
			super();

			this._iMaterialId = Number(this.id);

			this._owners = new Array<IMaterialOwner>();
			this._passes = new Array<IMaterialPass>();

			this._onPassChangeDelegate = (event:Event) => this.onPassChange(event);
			this._onLightChangeDelegate = (event:Event) => this.onLightsChange(event);

			this.alphaPremultiplied = false; //TODO: work out why this is different for WebGL
		}

		/**
		 * @inheritDoc
		 */
		public get assetType():string
		{
			return AssetType.MATERIAL;
		}

		/**
		 *
		 */
		public get height():number
		{
			return this._pHeight;
		}

		/**
		 *
		 */
		public get animationSet():IAnimationSet
		{
			return this._animationSet;
		}


		/**
		 * The light picker used by the material to provide lights to the material if it supports lighting.
		 *
		 * @see LightPickerBase
		 * @see StaticLightPicker
		 */
		public get lightPicker():LightPickerBase
		{
			return this._pLightPicker;
		}

		public set lightPicker(value:LightPickerBase)
		{
			if (this._pLightPicker == value)
				return;

			if (this._pLightPicker)
				this._pLightPicker.removeEventListener(Event.CHANGE, this._onLightChangeDelegate);

			this._pLightPicker = value;

			if (this._pLightPicker)
				this._pLightPicker.addEventListener(Event.CHANGE, this._onLightChangeDelegate);

			this._pInvalidateScreenPasses();
		}

		/**
		 * Indicates whether or not any used textures should use mipmapping. Defaults to true.
		 */
		public get mipmap():boolean
		{
			return this._mipmap;
		}

		public set mipmap(value:boolean)
		{
			if (this._mipmap == value)
				return;

			this._mipmap = value;

			this._pInvalidatePasses();
		}

		/**
		 * Indicates whether or not any used textures should use smoothing.
		 */
		public get smooth():boolean
		{
			return this._smooth;
		}

		public set smooth(value:boolean)
		{
			if (this._smooth == value)
				return;

			this._smooth = value;

			this._pInvalidatePasses();
		}

		/**
		 * Indicates whether or not any used textures should be tiled. If set to false, texture samples are clamped to
		 * the texture's borders when the uv coordinates are outside the [0, 1] interval.
		 */
		public get repeat():boolean
		{
			return this._repeat;
		}

		public set repeat(value:boolean)
		{
			if (this._repeat == value)
				return;

			this._repeat = value;

			this._pInvalidatePasses();
		}

		/**
		 * Specifies whether or not the UV coordinates should be animated using a transformation matrix.
		 */
		public get animateUVs():boolean
		{
			return this._pAnimateUVs;
		}

		public set animateUVs(value:boolean)
		{
			if (this._pAnimateUVs == value)
				return;

			this._pAnimateUVs = value;

			this._pInvalidatePasses();
		}

		/**
		 * Whether or not to use fallOff and radius properties for lights. This can be used to improve performance and
		 * compatibility for constrained mode.
		 */
		public get enableLightFallOff():boolean
		{
			return this._enableLightFallOff;
		}

		public set enableLightFallOff(value:boolean)
		{
			if (this._enableLightFallOff == value)
				return;

			this._enableLightFallOff = value;

			this._pInvalidatePasses();
		}

		/**
		 * Define which light source types to use for diffuse reflections. This allows choosing between regular lights
		 * and/or light probes for diffuse reflections.
		 *
		 * @see away3d.materials.LightSources
		 */
		public get diffuseLightSources():number
		{
			return this._diffuseLightSources;
		}

		public set diffuseLightSources(value:number)
		{
			if (this._diffuseLightSources == value)
				return;

			this._diffuseLightSources = value;

			this._pInvalidatePasses();
		}

		/**
		 * Define which light source types to use for specular reflections. This allows choosing between regular lights
		 * and/or light probes for specular reflections.
		 *
		 * @see away3d.materials.LightSources
		 */
		public get specularLightSources():number
		{
			return this._specularLightSources;
		}

		public set specularLightSources(value:number)
		{
			if (this._specularLightSources == value)
				return;

			this._specularLightSources = value;

			this._pInvalidatePasses();
		}

		/**
		 * Cleans up resources owned by the material, including passes. Textures are not owned by the material since they
		 * could be used by other materials and will not be disposed.
		 */
		public dispose()
		{
			var i:number;
			var len:number;

			this._pClearScreenPasses();

			len = this._materialData.length;
			for (i = 0; i < len; i++)
				this._materialData[i].dispose();

			this._materialData = new Array<IMaterialData>();

			len = this._materialPassData.length;
			for (i = 0; i < len; i++)
				this._materialPassData[i].dispose();

			this._materialPassData = new Array<IMaterialPassData>();
		}

		/**
		 * Defines whether or not the material should cull triangles facing away from the camera.
		 */
		public get bothSides():boolean
		{
			return this._bothSides;
		}

		public set bothSides(value:boolean)
		{
			if (this._bothSides = value)
				return;

			this._bothSides = value;

			this._pInvalidatePasses();
		}

		/**
		 * The blend mode to use when drawing this renderable. The following blend modes are supported:
		 * <ul>
		 * <li>BlendMode.NORMAL: No blending, unless the material inherently needs it</li>
		 * <li>BlendMode.LAYER: Force blending. This will draw the object the same as NORMAL, but without writing depth writes.</li>
		 * <li>BlendMode.MULTIPLY</li>
		 * <li>BlendMode.ADD</li>
		 * <li>BlendMode.ALPHA</li>
		 * </ul>
		 */
		public get blendMode():string
		{
			return this._pBlendMode;
		}

		public set blendMode(value:string)
		{
			if (this._pBlendMode == value)
				return;

			this._pBlendMode = value;

			this._pInvalidatePasses();
		}

		/**
		 * Indicates whether visible textures (or other pixels) used by this material have
		 * already been premultiplied. Toggle this if you are seeing black halos around your
		 * blended alpha edges.
		 */
		public get alphaPremultiplied():boolean
		{
			return this._alphaPremultiplied;
		}

		public set alphaPremultiplied(value:boolean)
		{
			if (this._alphaPremultiplied == value)
				return;

			this._alphaPremultiplied = value;

			this._pInvalidatePasses();
		}

		/**
		 * The minimum alpha value for which pixels should be drawn. This is used for transparency that is either
		 * invisible or entirely opaque, often used with textures for foliage, etc.
		 * Recommended values are 0 to disable alpha, or 0.5 to create smooth edges. Default value is 0 (disabled).
		 */
		public get alphaThreshold():number
		{
			return this._pAlphaThreshold;
		}

		public set alphaThreshold(value:number)
		{
			if (value < 0)
				value = 0;
			else if (value > 1)
				value = 1;

			if (this._pAlphaThreshold == value)
				return;

			this._pAlphaThreshold = value;

			this._pInvalidatePasses();
		}

		/**
		 * Indicates whether or not the material requires alpha blending during rendering.
		 */
		public get requiresBlending():boolean
		{
			return this._pRequiresBlending;
		}

		/**
		 *
		 */
		public get width():number
		{
			return this._pWidth;
		}

		/**
		 * Sets the render state for a pass that is independent of the rendered object. This needs to be called before
		 * calling renderPass. Before activating a pass, the previously used pass needs to be deactivated.
		 * @param pass The pass data to activate.
		 * @param stage The Stage object which is currently used for rendering.
		 * @param camera The camera from which the scene is viewed.
		 * @private
		 */
		public _iActivatePass(pass:IMaterialPassData, stage:Stage, camera:Camera) // ARCANE
		{
			pass.materialPass._iActivate(pass, stage, camera);
		}

		/**
		 * Clears the render state for a pass. This needs to be called before activating another pass.
		 * @param pass The pass to deactivate.
		 * @param stage The Stage used for rendering
		 *
		 * @internal
		 */
		public _iDeactivatePass(pass:IMaterialPassData, stage:Stage) // ARCANE
		{
			pass.materialPass._iDeactivate(pass, stage);
		}

		/**
		 * Renders the current pass. Before calling renderPass, activatePass needs to be called with the same index.
		 * @param pass The pass used to render the renderable.
		 * @param renderable The IRenderable object to draw.
		 * @param stage The Stage object used for rendering.
		 * @param entityCollector The EntityCollector object that contains the visible scene data.
		 * @param viewProjection The view-projection matrix used to project to the screen. This is not the same as
		 * camera.viewProjection as it includes the scaling factors when rendering to textures.
		 *
		 * @internal
		 */
		public _iRenderPass(pass:IMaterialPassData, renderable:IRenderable, stage:Stage, camera:Camera, viewProjection:Matrix3D)
		{
			if (this._pLightPicker)
				this._pLightPicker.collectLights(renderable);

			pass.materialPass._iRender(pass, renderable, stage, camera, viewProjection);
		}

		//
		// MATERIAL MANAGEMENT
		//
		/**
		 * Mark an IMaterialOwner as owner of this material.
		 * Assures we're not using the same material across renderables with different animations, since the
		 * Programs depend on animation. This method needs to be called when a material is assigned.
		 *
		 * @param owner The IMaterialOwner that had this material assigned
		 *
		 * @internal
		 */
		public iAddOwner(owner:IMaterialOwner)
		{
			this._owners.push(owner);

			var animationSet:IAnimationSet;
			var animator:IAnimator = <IAnimator> owner.animator;

			if (animator)
				animationSet = <IAnimationSet> animator.animationSet;

			if (owner.animator) {
				if (this._animationSet && animationSet != this._animationSet) {
					throw new Error("A Material instance cannot be shared across material owners with different animation sets");
				} else {
					if (this._animationSet != animationSet) {

						this._animationSet = animationSet;

						this.invalidateAnimation();
					}
				}
			}
		}

		/**
		 * Removes an IMaterialOwner as owner.
		 * @param owner
		 *
		 * @internal
		 */
		public iRemoveOwner(owner:IMaterialOwner)
		{
			this._owners.splice(this._owners.indexOf(owner), 1);

			if (this._owners.length == 0) {
				this._animationSet = null;

				this.invalidateAnimation();
			}
		}

		/**
		 * A list of the IMaterialOwners that use this material
		 *
		 * @private
		 */
		public get iOwners():Array<IMaterialOwner>
		{
			return this._owners;
		}

		/**
		 * The amount of passes used by the material.
		 *
		 * @private
		 */
		public _iNumScreenPasses():number
		{
			return this._numPasses;
		}

		/**
		 * A list of the screen passes used in this material
		 *
		 * @private
		 */
		public get _iScreenPasses():Array<IMaterialPass>
		{
			return this._passes;
		}

		/**
		 * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
		 *
		 * @private
		 */
		public _pInvalidatePasses()
		{
			var len:number = this._materialData.length;
			for (var i:number = 0; i < len; i++)
				this._materialData[i].invalidatePasses();

			len = this._materialPassData.length;
			for (i = 0; i < len; i++)
				this._materialPassData[i].invalidate();
		}

		/**
		 * Flags that the screen passes have become invalid and need possible re-ordering / adding / deleting
		 */
		public _pInvalidateScreenPasses()
		{
			this._pScreenPassesInvalid = true;
		}

		/**
		 * Removes a pass from the material.
		 * @param pass The pass to be removed.
		 */
		public _pRemoveScreenPass(pass:IMaterialPass)
		{
			pass.removeEventListener(Event.CHANGE, this._onPassChangeDelegate);
			this._passes.splice(this._passes.indexOf(pass), 1);

			this._numPasses--;
		}

		/**
		 * Removes all passes from the material
		 */
		public _pClearScreenPasses()
		{
			for (var i:number = 0; i < this._numPasses; ++i)
				this._passes[i].removeEventListener(Event.CHANGE, this._onPassChangeDelegate);

			this._passes.length = this._numPasses = 0;
		}

		/**
		 * Adds a pass to the material
		 * @param pass
		 */
		public _pAddScreenPass(pass:IMaterialPass)
		{
			this._passes[this._numPasses++] = pass;

			pass.lightPicker = this._pLightPicker;
			pass.addEventListener(Event.CHANGE, this._onPassChangeDelegate);

			this.invalidateMaterial();
		}

		public _iAddMaterialData(materialData:IMaterialData):IMaterialData
		{
			this._materialData.push(materialData);

			return materialData;
		}

		public _iRemoveMaterialData(materialData:IMaterialData):IMaterialData
		{
			this._materialData.splice(this._materialData.indexOf(materialData), 1);

			return materialData;
		}

		/**
		 * Performs any processing that needs to occur before any of its passes are used.
		 *
		 * @private
		 */
		public _iUpdateMaterial()
		{
		}
		
		/**
		 * Listener for when a pass's shader code changes. It recalculates the render order id.
		 */
		private onPassChange(event:Event)
		{
			this.invalidateMaterial();
		}

		private invalidateAnimation()
		{
			var len:number = this._materialData.length;
			for (var i:number = 0; i < len; i++)
				this._materialData[i].invalidateAnimation();
		}
		
		private invalidateMaterial()
		{
			var len:number = this._materialData.length;
			for (var i:number = 0; i < len; i++)
				this._materialData[i].invalidateMaterial();
		}

		/**
		 * Called when the light picker's configuration changed.
		 */
		private onLightsChange(event:Event)
		{
			this._pInvalidateScreenPasses();
		}


		public _iAddMaterialPassData(materialPassData:IMaterialPassData):IMaterialPassData
		{
			this._materialPassData.push(materialPassData);

			return materialPassData;
		}

		public _iRemoveMaterialPassData(materialPassData:IMaterialPassData):IMaterialPassData
		{
			this._materialPassData.splice(this._materialPassData.indexOf(materialPassData), 1);

			return materialPassData;
		}
	}
}