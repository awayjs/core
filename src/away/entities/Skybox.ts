///<reference path="../_definitions.ts"/>

module away.entities
{
	import IMaterialOwner				= away.base.IMaterialOwner;
	import BoundingVolumeBase			= away.bounds.BoundingVolumeBase;
	import NullBounds					= away.bounds.NullBounds;
	import IAnimator					= away.animators.IAnimator;
	import UVTransform					= away.geom.UVTransform;
	import MaterialBase					= away.materials.MaterialBase;
	import SkyboxNode					= away.partition.SkyboxNode;
	import IRenderer					= away.render.IRenderer;

	/**
	 * A Skybox class is used to render a sky in the scene. It's always considered static and 'at infinity', and as
	 * such it's always centered at the camera's position and sized to exactly fit within the camera's frustum, ensuring
	 * the sky box is always as large as possible without being clipped.
	 */
	export class Skybox extends away.base.DisplayObject implements IEntity, away.base.IMaterialOwner
	{
		private _uvTransform:UVTransform;

		private _material:MaterialBase;
		private _animator:IAnimator;

		public get animator():IAnimator
		{
			return this._animator;
		}

		/**
		 *
		 */
		public get uvTransform():UVTransform
		{
			return this._uvTransform;
		}

		public set uvTransform(value:UVTransform)
		{
			this._uvTransform = value;
		}

		/**
		 * Create a new Skybox object.
		 *
		 * @param material	The material with which to render the Skybox.
		 */
		constructor(material:MaterialBase)
		{
			super();

			this._pIsEntity = true;

			this.material = material;
		}

	/**
	 * The material with which to render the Skybox.
	 */
		public get material():MaterialBase
		{
			return this._material;
		}

		public set material(value:MaterialBase)
		{
			if (value == this._material)
				return;

			if (this._material)
				this._material.iRemoveOwner(<IMaterialOwner> this);

			this._material = value;

			if (this._material)
				this._material.iAddOwner(<IMaterialOwner> this);
		}

		public get assetType():string
		{
			return away.library.AssetType.SKYBOX;
		}

		/**
		 * @protected
		 */
		public pInvalidateBounds()
		{
			// dead end
		}

		/**
		 * @protected
		 */
		public pCreateEntityPartitionNode():SkyboxNode
		{
			return new SkyboxNode(this);
		}

		/**
		 * @protected
		 */
		public pGetDefaultBoundingVolume():BoundingVolumeBase
		{
			return <BoundingVolumeBase> new NullBounds();
		}

		/**
		 * @protected
		 */
		public pUpdateBounds()
		{
			this._pBoundsInvalid = false;
		}

		public get castsShadows():boolean
		{
			return false; //TODO
		}

		public _iCollectRenderables(renderer:IRenderer)
		{
			//skybox do not get collected in the standard entity list
		}

		public _iCollectRenderable(renderer:IRenderer)
		{

		}
	}
}
