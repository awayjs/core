///<reference path="../_definitions.ts"/>

module away.materials
{
	import BlendMode					= away.base.BlendMode;
	import Event						= away.events.Event;
	import Matrix3D						= away.geom.Matrix3D;
	import AssetType					= away.library.AssetType;
	import Delegate						= away.utils.Delegate;

	import IMaterialOwner				= away.base.IMaterialOwner;
	import CSSRenderableBase			= away.render.CSSRenderableBase;

	/**
	 * MaterialBase forms an abstract base class for any material.
	 * A material consists of several passes, each of which constitutes at least one render call. Several passes could
	 * be used for special effects (render lighting for many lights in several passes, render an outline in a separate
	 * pass) or to provide additional render-to-texture passes (rendering diffuse light to texture for texture-space
	 * subsurface scattering, or rendering a depth map for specialized self-shadowing).
	 *
	 * Away3D provides default materials trough SinglePassMaterialBase and MultiPassMaterialBase, which use modular
	 * methods to build the shader code. MaterialBase can be extended to build specific and high-performant custom
	 * shaders, or entire new material frameworks.
	 */
	export class CSSMaterialBase extends away.library.NamedAssetBase implements away.library.IAsset, IMaterial
	{

		/**
		 * An object to contain any extra data.
		 */
		public extra:Object;

		/**
		 * An id for this material used to sort the renderables by shader program, which reduces Program state changes.
		 *
		 * @private
		 */
		public _iMaterialId:number;

		/**
		 * An id for this material used to sort the renderables by shader program, which reduces Program state changes.
		 *
		 * @private
		 */
		public _iRenderOrderId:number = 0;

		/**
		 * The same as _renderOrderId, but applied to the depth shader passes.
		 *
		 * @private
		 */
		public _iDepthPassId:number;

		private _bothSides:boolean = false; // update

		/**
		 * A list of material owners, renderables or custom Entities.
		 */
		private _owners:Array<IMaterialOwner>;

		public _pBlendMode:string = BlendMode.NORMAL;

		private _imageElement:HTMLImageElement;
		private _repeat:boolean = false;
		private _smooth:boolean = true;
		private _texture:away.textures.Texture2DBase;

		public get imageElement():HTMLImageElement
		{
			return this._imageElement;
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
			this._repeat = value;

			//TODO
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
			this._smooth = value;

			//TODO
		}

		/**
		 * The texture object to use for the albedo colour.
		 */
		public get texture():away.textures.Texture2DBase
		{
			return this._texture;
		}

		public set texture(value:away.textures.Texture2DBase)
		{
			if (this._texture == value)
				return;

			this._texture = value;

			if (value instanceof away.textures.ImageTexture)
				this._imageElement = (<away.textures.ImageTexture> value).htmlImageElement;
		}

		/**
		 * Creates a new MaterialBase object.
		 */
		constructor(texture:away.textures.Texture2DBase = null, smooth:boolean = true, repeat:boolean = false)
		{
			super();

			this._iMaterialId = Number(this.id);

			this.texture = texture;

			this.smooth = smooth;
			this.repeat = repeat;

			this._owners = new Array<IMaterialOwner>();
		}

		/**
		 * @inheritDoc
		 */
		public get assetType():string
		{
			return AssetType.MATERIAL;
		}

		/**
		 * Cleans up resources owned by the material, including passes. Textures are not owned by the material since they
		 * could be used by other materials and will not be disposed.
		 */
		public dispose()
		{
			//TODO

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
			this._bothSides = value;

			//TODO

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
			this._pBlendMode = value;

			//TODO
		}

		/**
		 * Indicates whether or not the material requires alpha blending during rendering.
		 */
		public get requiresBlending():boolean
		{
			return this._pBlendMode != away.base.BlendMode.NORMAL;

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
		 * @private
		 */
		public iAddOwner(owner:away.base.IMaterialOwner)
		{
			this._owners.push(owner);

			//TODO
		}

		/**
		 * Removes an IMaterialOwner as owner.
		 * @param owner
		 *
		 * @internal
		 */
		public iRemoveOwner(owner:away.base.IMaterialOwner)
		{
			//TODO
		}

		/**
		 * A list of the IMaterialOwners that use this material
		 *
		 * @internal
		 */
		public get iOwners():Array<IMaterialOwner>
		{
			return this._owners;
		}
	}
}
