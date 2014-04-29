///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.base
{
	/**
	 *
	 * Geometry is a collection of SubGeometries, each of which contain the actual geometrical data such as vertices,
	 * normals, uvs, etc. It also contains a reference to an animation class, which defines how the geometry moves.
	 * A Geometry object is assigned to a Mesh, a scene graph occurence of the geometry, which in turn assigns
	 * the SubGeometries to its respective TriangleSubMesh objects.
	 *
	 *
	 *
	 * @see away.core.base.SubGeometry
	 * @see away.entities.Mesh
	 *
	 * @class away.base.Geometry
	 */
	export class Geometry extends away.library.NamedAssetBase implements away.library.IAsset
	{
		private _subGeometries:away.base.SubGeometryBase[];//Vector.<SubGeometryBase>;//private var _subGeometries:Vector.<SubGeometryBase>;

		public get assetType():string
		{
			return away.library.AssetType.GEOMETRY;
		}

		/**
		 * A collection of TriangleSubGeometry objects, each of which contain geometrical data such as vertices, normals, etc.
		 */
		public get subGeometries():away.base.SubGeometryBase[]//Vector.<SubGeometryBase>
		{
			return this._subGeometries;
		}

		public getSubGeometries():away.base.SubGeometryBase[]//Vector.<SubGeometryBase>
		{
			return this._subGeometries;
		}

		/**
		 * Creates a new Geometry object.
		 */
		constructor()
		{
			super();

			this._subGeometries = new Array<away.base.SubGeometryBase>();
		}

		public applyTransformation(transform:away.geom.Matrix3D)
		{
			var len:number = this._subGeometries.length;
			for (var i:number = 0; i < len; ++i)
				this._subGeometries[i].applyTransformation(transform);
		}

		/**
		 * Adds a new TriangleSubGeometry object to the list.
		 * @param subGeometry The TriangleSubGeometry object to be added.
		 */
		public addSubGeometry(subGeometry:away.base.SubGeometryBase)
		{
			this._subGeometries.push(subGeometry);

			subGeometry.parentGeometry = this;

			if (this.hasEventListener(away.events.GeometryEvent.SUB_GEOMETRY_ADDED))
				this.dispatchEvent(new away.events.GeometryEvent(away.events.GeometryEvent.SUB_GEOMETRY_ADDED, subGeometry));

			this.iInvalidateBounds(subGeometry);
		}

		/**
		 * Removes a new TriangleSubGeometry object from the list.
		 * @param subGeometry The TriangleSubGeometry object to be removed.
		 */
		public removeSubGeometry(subGeometry:SubGeometryBase)
		{
			this._subGeometries.splice(this._subGeometries.indexOf(subGeometry), 1);

			subGeometry.parentGeometry = null;

			if (this.hasEventListener(away.events.GeometryEvent.SUB_GEOMETRY_REMOVED))
				this.dispatchEvent(new away.events.GeometryEvent(away.events.GeometryEvent.SUB_GEOMETRY_REMOVED, subGeometry));

			this.iInvalidateBounds(subGeometry);
		}

		/**
		 * Clones the geometry.
		 * @return An exact duplicate of the current Geometry object.
		 */
		public clone():Geometry
		{
			var clone:Geometry = new Geometry();
			var len:number = this._subGeometries.length;

			for (var i:number = 0; i < len; ++i)
				clone.addSubGeometry(this._subGeometries[i].clone());

			return clone;
		}

		/**
		 * Scales the geometry.
		 * @param scale The amount by which to scale.
		 */
		public scale(scale:number)
		{
			var numSubGeoms:number = this._subGeometries.length;
			for (var i:number = 0; i < numSubGeoms; ++i)
				this._subGeometries[i].scale(scale);
		}

		/**
		 * Clears all resources used by the Geometry object, including SubGeometries.
		 */
		public dispose()
		{
			var numSubGeoms:number = this._subGeometries.length;

			for (var i:number = 0; i < numSubGeoms; ++i) {
				var subGeom:SubGeometryBase = this._subGeometries[0];
				this.removeSubGeometry(subGeom);
				subGeom.dispose();
			}
		}

		/**
		 * Scales the uv coordinates (tiling)
		 * @param scaleU The amount by which to scale on the u axis. Default is 1;
		 * @param scaleV The amount by which to scale on the v axis. Default is 1;
		 */
		public scaleUV(scaleU:number = 1, scaleV:number = 1)
		{
			var numSubGeoms:number = this._subGeometries.length;

			for (var i:number = 0; i < numSubGeoms; ++i)
				this._subGeometries[i].scaleUV(scaleU, scaleV);
		}

		public iInvalidateBounds(subGeom:SubGeometryBase)
		{
			if (this.hasEventListener(away.events.GeometryEvent.BOUNDS_INVALID))
				this.dispatchEvent(new away.events.GeometryEvent(away.events.GeometryEvent.BOUNDS_INVALID, subGeom));
		}
	}
}
