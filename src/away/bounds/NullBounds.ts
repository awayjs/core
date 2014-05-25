///<reference path="../_definitions.ts" />

module away.bounds
{
	import IEntity						= away.entities.IEntity;
	import Matrix3D						= away.geom.Matrix3D;
	import PlaneClassification			= away.geom.PlaneClassification;
	import Plane3D						= away.geom.Plane3D;
	import Vector3D						= away.geom.Vector3D;

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
		public clone():BoundingVolumeBase
		{
			return new NullBounds(this._alwaysIn);
		}

		//@override
		public pCreateBoundingEntity():IEntity
		{
			//return this._renderable || new away.primitives.WireframeSphere( 100, 16, 12, 0xffffff, 0.5 );
			return null;
		}

		//@override
		public isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean
		{
			return this._alwaysIn;
		}

//		//@override
//		public fromGeometry(geometry:away.base.Geometry)
//		{
//		}

		//@override
		public fromSphere(center:Vector3D, radius:number)
		{
		}

		//@override
		public fromExtremes(minX:number, minY:number, minZ:number, maxX:number, maxY:number, maxZ:number)
		{
		}

		public classifyToPlane(plane:Plane3D):number
		{
			return PlaneClassification.INTERSECT;
		}

		//@override
		public transformFrom(bounds:BoundingVolumeBase, matrix:Matrix3D)
		{
			this._alwaysIn = (<NullBounds> bounds)._alwaysIn;
		}
	}
}