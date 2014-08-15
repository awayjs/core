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
	import IRenderOrderData				= away.pool.IRenderOrderData;
	import ICollector					= away.traverse.ICollector;

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
		private _renderOrderData:Array<IRenderOrderData> = new Array<IRenderOrderData>();
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

		/**
		 * An id for this material used to sort the renderables by shader program, which reduces Program state changes.
		 *
		 * @private
		 */
		private _renderOrderId:Array<number> = new Array<number>(0, 0, 0, 0, 0, 0, 0, 0);

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

		public _pMipmap:boolean = false; // Update
		private _smooth:boolean = true;
		private _repeat:boolean = false; // Update

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

			this.pInvalidateScreenPasses();
			this.pResetRenderOrder();
		}

		/**
		 * Indicates whether or not any used textures should use mipmapping. Defaults to true.
		 */
		public get mipmap():boolean
		{
			return this._pMipmap;
		}

		public set mipmap(value:boolean)
		{
			if (this._pMipmap == value)
				return;

			this._pMipmap = value;

			this.iInvalidatePasses(null);
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

			this.iInvalidatePasses(null);
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

			this.iInvalidatePasses(null);
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

			this.iInvalidatePasses(null);
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

			this.iInvalidatePasses(null);
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

			this.iInvalidatePasses(null);
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

			this.iInvalidatePasses(null);
		}

		/**
		 * Cleans up resources owned by the material, including passes. Textures are not owned by the material since they
		 * could be used by other materials and will not be disposed.
		 */
		public dispose()
		{
			var i:number;

			for (i = 0; i < this._numPasses; ++i)
				this._passes[i].dispose();

			this._passes = null;

			var len:number = this._renderOrderData.length;
			for (i = 0; i < len; i++)
				this._renderOrderData[i].dispose();

			this._renderOrderData = null;
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

			this.iInvalidatePasses(null);
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

			this.iInvalidatePasses(null);
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

			this.iInvalidatePasses(null);
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

			this.iInvalidatePasses(null);
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
		 * The amount of passes used by the material.
		 *
		 * @private
		 */
		public getNumPasses():number
		{
			return this._numPasses;
		}

		/**
		 *
		 * @param index
		 * @returns {IMaterialPass}
		 */
		public getPass(index:number):IMaterialPass
		{
			return this._passes[index];
		}

		/**
		 * Indicates whether or not the pass with the given index renders to texture or not.
		 * @param index The index of the pass.
		 * @return True if the pass renders to texture, false otherwise.
		 *
		 * @internal
		 */
		public iPassRendersToTexture(index:number):boolean
		{
			return this._passes[index].renderToTexture;
		}

		/**
		 * Sets the render state for a pass that is independent of the rendered object. This needs to be called before
		 * calling renderPass. Before activating a pass, the previously used pass needs to be deactivated.
		 * @param index The index of the pass to activate.
		 * @param stage The Stage object which is currently used for rendering.
		 * @param camera The camera from which the scene is viewed.
		 * @private
		 */
		public iActivatePass(index:number, stage:Stage, camera:Camera) // ARCANE
		{
			this._passes[index].iActivate(this, stage, camera);
		}

		/**
		 * Clears the render state for a pass. This needs to be called before activating another pass.
		 * @param index The index of the pass to deactivate.
		 * @param stage The Stage used for rendering
		 *
		 * @internal
		 */
		public iDeactivatePass(index:number, stage:Stage) // ARCANE
		{
			this._passes[index].iDeactivate(this, stage);
		}

		/**
		 * Renders the current pass. Before calling renderPass, activatePass needs to be called with the same index.
		 * @param index The index of the pass used to render the renderable.
		 * @param renderable The IRenderable object to draw.
		 * @param stage The Stage object used for rendering.
		 * @param entityCollector The EntityCollector object that contains the visible scene data.
		 * @param viewProjection The view-projection matrix used to project to the screen. This is not the same as
		 * camera.viewProjection as it includes the scaling factors when rendering to textures.
		 *
		 * @internal
		 */
		public iRenderPass(index:number, renderable:IRenderable, stage:Stage, entityCollector:ICollector, viewProjection:Matrix3D)
		{
			if (this._pLightPicker)
				this._pLightPicker.collectLights(renderable, entityCollector);

			this._passes[index].iRender(renderable, stage, entityCollector.camera, viewProjection);
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

						this.iInvalidateAnimation();
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

				this.iInvalidateAnimation();
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
		 * A list of the passes used in this material
		 *
		 * @private
		 */
		public get iPasses():Array<IMaterialPass>
		{
			return this._passes;
		}

		/**
		 * Performs any processing that needs to occur before any of its passes are used.
		 *
		 * @private
		 */
		public iUpdateMaterial()
		{
		}

		/**
		 * Deactivates the last pass of the material.
		 *
		 * @private
		 */
		public iDeactivate(stage:Stage)
		{
			//TODO discover why this is needed for shadows
			this._passes[this._numPasses - 1].iDeactivate(this, stage);
		}

		/**
		 * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
		 * @param triggerPass The pass triggering the invalidation, if any. This is passed to prevent invalidating the
		 * triggering pass, which would result in an infinite loop.
		 *
		 * @private
		 */
		public iInvalidatePasses(triggerPass:IMaterialPass)
		{
			for (var i:number = 0; i < this._numPasses; ++i) {
				// only invalidate the pass if it wasn't the triggering pass
				if (this._passes[i] != triggerPass)
					this._passes[i].iInvalidateShaderProgram(false);
			}
		}

		public iInvalidateAnimation()
		{
			var len:number = this._renderOrderData.length;
			for (var i:number = 0; i < len; i++)
				this._renderOrderData[i].invalidate();
		}

		/**
		 * Removes a pass from the material.
		 * @param pass The pass to be removed.
		 */
		public pRemovePass(pass:IMaterialPass)
		{
			pass.removeEventListener(Event.CHANGE, this._onPassChangeDelegate);
			this._passes.splice(this._passes.indexOf(pass), 1);
			pass._iRemoveOwner(this);
			--this._numPasses;
		}

		/**
		 * Removes all passes from the material
		 */
		public pClearPasses()
		{
			for (var i:number = 0; i < this._numPasses; ++i) {
				this._passes[i].removeEventListener(Event.CHANGE, this._onPassChangeDelegate);
				this._passes[i]._iRemoveOwner(this);
			}

			this._passes.length = 0;
			this._numPasses = 0;
		}

		/**
		 * Adds a pass to the material
		 * @param pass
		 */
		public pAddPass(pass:IMaterialPass)
		{
			this._passes[this._numPasses++] = pass;

			pass.lightPicker = this._pLightPicker;
			pass.addEventListener(Event.CHANGE, this._onPassChangeDelegate);

			pass._iAddOwner(this);

			this.iInvalidatePasses(null);
		}


		/**
		 * Adds any additional passes on which the given pass is dependent.
		 * @param pass The pass that my need additional passes.
		 */
		public pAddChildPassesFor(pass:IMaterialPass)
		{
			if (!pass)
				return;

			if (pass._iPasses) {
				var len:number = pass._iPasses.length;

				for (var i:number = 0; i < len; ++i)
					this.pAddPass(pass._iPasses[i]);
			}
		}

		/**
		 * Listener for when a pass's shader code changes. It recalculates the render order id.
		 */
		private onPassChange(event:Event)
		{
			this.pResetRenderOrder();
		}

		/**
		 * Flags that the screen passes have become invalid.
		 */
		public pInvalidateScreenPasses()
		{
			this._pScreenPassesInvalid = true;
		}

		public pResetRenderOrder()
		{
			var len:number = this._renderOrderData.length;
			for (var i:number = 0; i < len; i++)
				this._renderOrderData[i].reset();
		}

		/**
		 * Called when the light picker's configuration changed.
		 */
		private onLightsChange(event:Event)
		{
			this.pInvalidateScreenPasses();
			this.pResetRenderOrder();
		}


		public _iAddRenderOrderData(renderOrderData:IRenderOrderData):IRenderOrderData
		{
			this._renderOrderData.push(renderOrderData);

			return renderOrderData;
		}

		public _iRemoveRenderOrderData(renderOrderData:IRenderOrderData):IRenderOrderData
		{
			this._renderOrderData.splice(this._renderOrderData.indexOf(renderOrderData), 1);

			return renderOrderData;
		}
	}
}