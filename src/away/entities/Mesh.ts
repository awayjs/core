///<reference path="../_definitions.ts"/>

module away.entities
{
	import IAnimator					= away.animators.IAnimator;
	import SubGeometryBase				= away.base.SubGeometryBase;
	import SubGeometry					= away.base.TriangleSubGeometry;
	import ISubMesh						= away.base.ISubMesh;
	import ISubMeshClass				= away.base.ISubMeshClass;
	import Geometry						= away.base.Geometry;
	import GeometryEvent				= away.events.GeometryEvent;
	import UVTransform					= away.geom.UVTransform;
	import MaterialBase					= away.materials.MaterialBase;
	import EntityNode					= away.partition.EntityNode;
	import IRenderer					= away.render.IRenderer;

	/**
	 * Mesh is an instance of a Geometry, augmenting it with a presence in the scene graph, a material, and an animation
	 * state. It consists out of SubMeshes, which in turn correspond to SubGeometries. SubMeshes allow different parts
	 * of the geometry to be assigned different materials.
	 */
	export class Mesh extends away.containers.DisplayObjectContainer implements IEntity
	{
		private _uvTransform:UVTransform;

		private _subMeshes:Array<ISubMesh>;
		private _geometry:Geometry;
		private _material:MaterialBase;
		private _animator:IAnimator;
		private _castsShadows:boolean = true;
		private _shareAnimationGeometry:boolean = true;

		private _onGeometryBoundsInvalidDelegate:Function;
		private _onSubGeometryAddedDelegate:Function;
		private _onSubGeometryRemovedDelegate:Function;

		/**
		 * Defines the animator of the mesh. Act on the mesh's geometry.  Default value is <code>null</code>.
		 */
		public get animator():IAnimator
		{
			return this._animator;
		}

		public set animator(value:IAnimator)
		{
			if (this._animator)
				this._animator.removeOwner(this);

			this._animator = value;

			var len:number = this._subMeshes.length;
			var subMesh:away.base.ISubMesh;

			for (var i:number = 0; i < len; ++i) {
				subMesh = this._subMeshes[i];

				// cause material to be unregistered and registered again to work with the new animation type (if possible)
				if (subMesh.material) {
					subMesh.material.iRemoveOwner(subMesh);
					subMesh.material.iAddOwner(subMesh);
				}

				//invalidate any existing renderables in case they need to pull new geometry
				subMesh._iInvalidateRenderableGeometry();
			}

			if (this._animator)
				this._animator.addOwner(this);
		}

		/**
		 *
		 */
		public get assetType():string
		{
			return away.library.AssetType.MESH;
		}

		/**
		 * Indicates whether or not the Mesh can cast shadows. Default value is <code>true</code>.
		 */
		public get castsShadows():boolean
		{
			return this._castsShadows;
		}

		public set castsShadows(value:boolean)
		{
			this._castsShadows = value;
		}

		/**
		 * The geometry used by the mesh that provides it with its shape.
		 */
		public get geometry():Geometry
		{
			if (this._iSourcePrefab)
				this._iSourcePrefab._iValidate();

			return this._geometry;
		}

		public set geometry(value:Geometry)
		{
			var i:number;

			if (this._geometry) {
				this._geometry.removeEventListener(GeometryEvent.BOUNDS_INVALID, this._onGeometryBoundsInvalidDelegate);
				this._geometry.removeEventListener(GeometryEvent.SUB_GEOMETRY_ADDED, this._onSubGeometryAddedDelegate);
				this._geometry.removeEventListener(GeometryEvent.SUB_GEOMETRY_REMOVED, this._onSubGeometryRemovedDelegate);

				for (i = 0; i < this._subMeshes.length; ++i)
					this._subMeshes[i].dispose();

				this._subMeshes.length = 0;
			}

			this._geometry = value;

			if (this._geometry) {

				this._geometry.addEventListener(GeometryEvent.BOUNDS_INVALID, this._onGeometryBoundsInvalidDelegate);
				this._geometry.addEventListener(GeometryEvent.SUB_GEOMETRY_ADDED, this._onSubGeometryAddedDelegate);
				this._geometry.addEventListener(GeometryEvent.SUB_GEOMETRY_REMOVED, this._onSubGeometryRemovedDelegate);

				var subGeoms:Array<SubGeometryBase> = this._geometry.subGeometries;

				for (i = 0; i < subGeoms.length; ++i)
					this.addSubMesh(subGeoms[i]);
			}
		}

		/**
		 * The material with which to render the Mesh.
		 */
		public get material():MaterialBase
		{
			return this._material;
		}

		public set material(value:MaterialBase)
		{
			if (value == this._material)
				return;

			var i:number;
			var len:number = this._subMeshes.length;
			var subMesh:ISubMesh;

			for (i = 0; i < len; i++)
				if (this._material && (subMesh = this._subMeshes[i]).material == this._material)
					this._material.iRemoveOwner(subMesh);

			this._material = value;

			for (i = 0; i < len; i++)
				if (this._material && (subMesh = this._subMeshes[i]).material == this._material)
					this._material.iAddOwner(subMesh);
		}

		/**
		 * Indicates whether or not the mesh share the same animation geometry.
		 */
		public get shareAnimationGeometry():boolean
		{
			return this._shareAnimationGeometry;
		}

		public set shareAnimationGeometry(value:boolean)
		{
			this._shareAnimationGeometry = value;
		}

		/**
		 * The SubMeshes out of which the Mesh consists. Every SubMesh can be assigned a material to override the Mesh's
		 * material.
		 */
		public get subMeshes():Array<ISubMesh>
		{
			// Since this getter is invoked every iteration of the render loop, and
			// the prefab construct could affect the sub-meshes, the prefab is
			// validated here to give it a chance to rebuild.
			if (this._iSourcePrefab)
				this._iSourcePrefab._iValidate();

			return this._subMeshes;
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
		 * Create a new Mesh object.
		 *
		 * @param geometry                    The geometry used by the mesh that provides it with its shape.
		 * @param material    [optional]        The material with which to render the Mesh.
		 */
		constructor(geometry:Geometry, material:MaterialBase = null)
		{
			super();

			this._pIsEntity = true;

			this._subMeshes = new Array<ISubMesh>();

			this._onGeometryBoundsInvalidDelegate = (event:GeometryEvent) => this.onGeometryBoundsInvalid(event);
			this._onSubGeometryAddedDelegate = (event:GeometryEvent) => this.onSubGeometryAdded(event);
			this._onSubGeometryRemovedDelegate = (event:GeometryEvent) => this.onSubGeometryRemoved(event);

			//this should never happen, but if people insist on trying to create their meshes before they have geometry to fill it, it becomes necessary
			this.geometry = geometry || new Geometry();

			this.material = material;
		}

		/**
		 *
		 */
		public bakeTransformations()
		{
			this.geometry.applyTransformation(this._iMatrix3D);
			this._iMatrix3D.identity();
		}

		/**
		 * @inheritDoc
		 */
		public dispose()
		{
			super.dispose();

			this.material = null;
			this.geometry = null;
		}

		/**
		 * Disposes mesh including the animator and children. This is a merely a convenience method.
		 * @return
		 */
		public disposeWithAnimatorAndChildren()
		{
			this.disposeWithChildren();

			 if (this._animator)
			 	this._animator.dispose();
		}

		/**
		 * Clones this Mesh instance along with all it's children, while re-using the same
		 * material, geometry and animation set. The returned result will be a copy of this mesh,
		 * containing copies of all of it's children.
		 *
		 * Properties that are re-used (i.e. not cloned) by the new copy include name,
		 * geometry, and material. Properties that are cloned or created anew for the copy
		 * include subMeshes, children of the mesh, and the animator.
		 *
		 * If you want to copy just the mesh, reusing it's geometry and material while not
		 * cloning it's children, the simplest way is to create a new mesh manually:
		 *
		 * <code>
		 * var clone : Mesh = new Mesh(original.geometry, original.material);
		 * </code>
		 */
		public clone():away.base.DisplayObject
		{
			var clone:Mesh = new Mesh(this._geometry, this._material);

			clone._iMatrix3D = this._iMatrix3D;
			clone.pivot = this.pivot;
			clone.partition = this.partition;
			clone.bounds = this.bounds.clone();


			clone.name = this.name;
			clone.castsShadows = this.castsShadows;
			clone.shareAnimationGeometry = this.shareAnimationGeometry;
			clone.mouseEnabled = this.mouseEnabled;
			clone.mouseChildren = this.mouseChildren;
			//this is of course no proper cloning
			//maybe use this instead?: http://blog.another-d-mention.ro/programming/how-to-clone-duplicate-an-object-in-actionscript-3/
			clone.extra = this.extra;

			var len:number = this._subMeshes.length;
			for (var i:number = 0; i < len; ++i)
				clone._subMeshes[i].material = this._subMeshes[i]._iGetExplicitMaterial();


			len = this.numChildren;
			var obj:any;

			for (i = 0; i < len; ++i) {
				obj = this.getChildAt(i).clone();
				clone.addChild(<away.containers.DisplayObjectContainer> obj);
			}

			if (this._animator)
				clone.animator = this._animator.clone();

			return clone;
		}

		/**
		 * //TODO
		 *
		 * @param subGeometry
		 * @returns {SubMeshBase}
		 */
		public getSubMeshFromSubGeometry(subGeometry:SubGeometry):ISubMesh
		{
			return this._subMeshes[this._geometry.subGeometries.indexOf(subGeometry)];
		}

		/**
		 * @protected
		 */
		public pCreateEntityPartitionNode():away.partition.EntityNode
		{
			return new away.partition.EntityNode(this);
		}

		/**
		 * //TODO
		 *
		 * @protected
		 */
		public pUpdateBounds()
		{
			this._pBounds.fromGeometry(this._geometry);

			super.pUpdateBounds();
		}

		/**
		 * //TODO
		 *
		 * @private
		 */
		private onGeometryBoundsInvalid(event:GeometryEvent)
		{
			this.pInvalidateBounds();
		}

		/**
		 * Called when a SubGeometry was added to the Geometry.
		 *
		 * @private
		 */
		private onSubGeometryAdded(event:GeometryEvent)
		{
			this.addSubMesh(event.subGeometry);
		}

		/**
		 * Called when a SubGeometry was removed from the Geometry.
		 *
		 * @private
		 */
		private onSubGeometryRemoved(event:GeometryEvent)
		{
			var subMesh:ISubMesh;
			var subGeom:SubGeometryBase = event.subGeometry;
			var len:number = this._subMeshes.length;
			var i:number;

			// Important! This has to be done here, and not delayed until the
			// next render loop, since this may be caused by the geometry being
			// rebuilt IN THE RENDER LOOP. Invalidating and waiting will delay
			// it until the NEXT RENDER FRAME which is probably not desirable.
			for (i = 0; i < len; ++i) {

				subMesh = this._subMeshes[i];

				if (subMesh.subGeometry == subGeom) {
					subMesh.dispose();

					this._subMeshes.splice(i, 1);

					break;
				}
			}

			--len;
			for (; i < len; ++i)
				this._subMeshes[i]._iIndex = i;
		}

		/**
		 * Adds a SubMeshBase wrapping a SubGeometry.
		 *
		 * @param subGeometry
		 */
		private addSubMesh(subGeometry:SubGeometryBase)
		{
			var SubMeshClass:ISubMeshClass = subGeometry.subMeshClass;

			var subMesh:ISubMesh = new SubMeshClass(subGeometry, this, null);
			var len:number = this._subMeshes.length;

			subMesh._iIndex = len;

			this._subMeshes[len] = subMesh;

			this.pInvalidateBounds();
		}

		/**
		 * //TODO
		 *
		 * @param shortestCollisionDistance
		 * @param findClosest
		 * @returns {boolean}
		 *
		 * @internal
		 */
		public _iTestCollision(shortestCollisionDistance:number, findClosest:boolean):boolean
		{
			return this._pPickingCollider.testMeshCollision(this, this._pPickingCollisionVO, shortestCollisionDistance, findClosest);
		}

		/**
		 *
		 * @param renderer
		 *
		 * @internal
		 */
		public _iCollectRenderables(renderer:IRenderer)
		{
			// Since this getter is invoked every iteration of the render loop, and
			// the prefab construct could affect the sub-meshes, the prefab is
			// validated here to give it a chance to rebuild.
			if (this._iSourcePrefab)
				this._iSourcePrefab._iValidate();

			var len:number /*uint*/ = this._subMeshes.length;
			for (var i:number /*uint*/ = 0; i < len; i++)
				this._subMeshes[i]._iCollectRenderable(renderer);
		}

		public _iInvalidateRenderableGeometries()
		{
			var len:number = this._subMeshes.length;
			for (var i:number = 0; i < len; ++i)
				this._subMeshes[i]._iInvalidateRenderableGeometry();
		}
	}
}
