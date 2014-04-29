///<reference path="../_definitions.ts"/>

module away.entities
{
	import IAnimator					= away.animators.IAnimator;
	import UVTransform					= away.geom.UVTransform;
	import IMaterial					= away.materials.IMaterial;

	/**
	 * A Skybox class is used to render a sky in the scene. It's always considered static and 'at infinity', and as
	 * such it's always centered at the camera's position and sized to exactly fit within the camera's frustum, ensuring
	 * the sky box is always as large as possible without being clipped.
	 */
	export class Skybox extends away.base.DisplayObject implements IEntity, away.base.IMaterialOwner
	{
		private _uvTransform:UVTransform;

		private _material:IMaterial;
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

		public set uvTransform(value:away.geom.UVTransform)
		{
			this._uvTransform = value;
		}

		/**
		 * Create a new Skybox object.
		 *
		 * @param material	The material with which to render the Skybox.
		 */
		constructor(material:IMaterial)
		{
			super();

			this._pIsEntity = true;

			this.material = material;
		}

	/**
	 * The material with which to render the Skybox.
	 */
		public get material():IMaterial
		{
			return this._material;
		}

		public set material(value:IMaterial)
		{
			if (value == this._material)
				return;

			if (this._material)
				this._material.iRemoveOwner(<away.base.IMaterialOwner> this);

			this._material = value;

			if (this._material)
				this._material.iAddOwner(<away.base.IMaterialOwner> this);
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
		public pCreateEntityPartitionNode():away.partition.EntityNode
		{
			return new away.partition.SkyboxNode(this);
		}

		/**
		 * @protected
		 */
		public pGetDefaultBoundingVolume():away.bounds.BoundingVolumeBase
		{
			return <away.bounds.BoundingVolumeBase> new away.bounds.NullBounds();
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

		public _iCollectRenderables(renderer:away.render.IRenderer)
		{
			// Since this getter is invoked every iteration of the render loop, and
			// the prefab construct could affect the sub-meshes, the prefab is
			// validated here to give it a chance to rebuild.
			if (this._iSourcePrefab)
				this._iSourcePrefab._iValidate();

			this._iCollectRenderable(renderer);
		}

		public _iCollectRenderable(renderer:away.render.IRenderer)
		{
			renderer.applySkybox(this);
		}
	}
}
