///<reference path="../_definitions.ts" />

module away.bounds
{
	export class NullBounds extends BoundingVolumeBase
	{
		private _alwaysIn:boolean;

		constructor(alwaysIn:boolean = true)
		{
			super();

			this._alwaysIn = alwaysIn;

			this._aabb.width = this._aabb.height = this._aabb.depth = Number.POSITIVE_INFINITY;
			this._aabb.x = this._aabb.y = this._aabb.z = this._alwaysIn? Number.NEGATIVE_INFINITY/2 : Number.POSITIVE_INFINITY;
		}

		//@override
		public clone():away.bounds.BoundingVolumeBase
		{
			return new away.bounds.NullBounds(this._alwaysIn);
		}

		//@override
		public pCreateBoundingEntity():away.entities.IEntity
		{
			//return this._renderable || new away.primitives.WireframeSphere( 100, 16, 12, 0xffffff, 0.5 );
			return null;
		}

		//@override
		public isInFrustum(planes:Array<away.geom.Plane3D>, numPlanes:number):boolean
		{
			return this._alwaysIn;
		}

//		//@override
//		public fromGeometry(geometry:away.base.Geometry)
//		{
//		}

		//@override
		public fromSphere(center:away.geom.Vector3D, radius:number)
		{
		}

		//@override
		public fromExtremes(minX:number, minY:number, minZ:number, maxX:number, maxY:number, maxZ:number)
		{
		}

		public classifyToPlane(plane:away.geom.Plane3D):number
		{
			return away.geom.PlaneClassification.INTERSECT;
		}

		//@override
		public transformFrom(bounds:away.bounds.BoundingVolumeBase, matrix:away.geom.Matrix3D)
		{
			this._alwaysIn = (<away.bounds.NullBounds> bounds)._alwaysIn;
		}
	}
}