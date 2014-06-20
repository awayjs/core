///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.base
{
	import Mesh							= away.entities.Mesh;
	import AssetType					= away.library.AssetType;
	import MaterialBase					= away.materials.MaterialBase;
	import IRenderer					= away.render.IRenderer;
	
	/**
	 * TriangleSubMesh wraps a TriangleSubGeometry as a scene graph instantiation. A TriangleSubMesh is owned by a Mesh object.
	 *
	 *
	 * @see away.base.TriangleSubGeometry
	 * @see away.entities.Mesh
	 *
	 * @class away.base.TriangleSubMesh
	 */
	export class TriangleSubMesh extends SubMeshBase implements ISubMesh
	{
		private _subGeometry:TriangleSubGeometry;

		/**
		 *
		 */
		public get assetType():string
		{
			return AssetType.TRIANGLE_SUB_MESH;
		}

		/**
		 * The TriangleSubGeometry object which provides the geometry data for this TriangleSubMesh.
		 */
		public get subGeometry():TriangleSubGeometry
		{
			return this._subGeometry;
		}

		/**
		 * Creates a new TriangleSubMesh object
		 * @param subGeometry The TriangleSubGeometry object which provides the geometry data for this TriangleSubMesh.
		 * @param parentMesh The Mesh object to which this TriangleSubMesh belongs.
		 * @param material An optional material used to render this TriangleSubMesh.
		 */
		constructor(subGeometry:TriangleSubGeometry, parentMesh:Mesh, material:MaterialBase = null)
		{
			super();

			this._pParentMesh = parentMesh;
			this._subGeometry = subGeometry;
			this.material = material;
		}

		/**
		 * 
		 */
		public dispose()
		{
			super.dispose();
		}

		public _iCollectRenderable(renderer:IRenderer)
		{
			renderer.applyTriangleSubMesh(this);
		}
	}
}
