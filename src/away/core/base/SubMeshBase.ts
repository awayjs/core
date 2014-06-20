///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.base
{
	import IAnimator					= away.animators.IAnimator;
	import Camera						= away.entities.Camera;
	import Mesh							= away.entities.Mesh;
	import Matrix3D						= away.geom.Matrix3D;
	import UVTransform					= away.geom.UVTransform;
	import MaterialBase					= away.materials.MaterialBase;
	import IRenderable					= away.pool.IRenderable;

	/**
	 * SubMeshBase wraps a TriangleSubGeometry as a scene graph instantiation. A SubMeshBase is owned by a Mesh object.
	 *
	 *
	 * @see away.base.TriangleSubGeometry
	 * @see away.entities.Mesh
	 *
	 * @class away.base.SubMeshBase
	 */
	export class SubMeshBase extends away.library.NamedAssetBase
	{
		public _pParentMesh:Mesh;
		public _uvTransform:UVTransform;

		public _iIndex:number = 0;

		public _material:MaterialBase;
		private _renderables:Array<IRenderable> = new Array<IRenderable>();

		//TODO test shader picking
//		public get shaderPickingDetails():boolean
//		{
//
//			return this.sourceEntity.shaderPickingDetails;
//		}

		/**
		 * The animator object that provides the state for the TriangleSubMesh's animation.
		 */
		public get animator():IAnimator
		{
			return this._pParentMesh.animator;
		}

		/**
		 * The material used to render the current TriangleSubMesh. If set to null, its parent Mesh's material will be used instead.
		 */
		public get material():MaterialBase
		{
			return this._material || this._pParentMesh.material;
		}

		public set material(value:MaterialBase)
		{
			if (this.material)
				this.material.iRemoveOwner(this);

			this._material = value;

			if (this.material)
				this.material.iAddOwner(this);
		}

		/**
		 * The scene transform object that transforms from model to world space.
		 */
		public get sceneTransform():Matrix3D
		{
			return this._pParentMesh.sceneTransform;
		}

		/**
		 * The entity that that initially provided the IRenderable to the render pipeline (ie: the owning Mesh object).
		 */
		public get parentMesh():Mesh
		{
			return this._pParentMesh;
		}

		/**
		 *
		 */
		public get uvTransform():UVTransform
		{
			return this._uvTransform || this._pParentMesh.uvTransform;
		}

		public set uvTransform(value:UVTransform)
		{
			this._uvTransform = value;
		}

		/**
		 * Creates a new SubMeshBase object
		 */
		constructor()
		{
			super();
		}

		/**
		 * 
		 */
		public dispose()
		{
			this.material = null;

			var len:number = this._renderables.length;
			for (var i:number = 0; i < len; i++)
				this._renderables[i].dispose();
		}

		/**
		 *
		 * @param camera
		 * @returns {away.geom.Matrix3D}
		 */
		public getRenderSceneTransform(camera:Camera):Matrix3D
		{
			return this._pParentMesh.getRenderSceneTransform(camera);
		}

		public _iAddRenderable(renderable:IRenderable):IRenderable
		{
			this._renderables.push(renderable);

			return renderable;
		}


		public _iRemoveRenderable(renderable:IRenderable):IRenderable
		{
			var index:number = this._renderables.indexOf(renderable);

			this._renderables.splice(index, 1);

			return renderable;
		}

		public _iInvalidateRenderableGeometry()
		{
			var len:number = this._renderables.length;
			for (var i:number = 0; i < len; i++)
				this._renderables[i].invalidateGeometry();
		}

		public _iCollectRenderable(renderer:away.render.IRenderer)
		{
			throw new away.errors.AbstractMethodError();
		}

		public _iGetExplicitMaterial():MaterialBase
		{
			return this._material;
		}
	}
}
