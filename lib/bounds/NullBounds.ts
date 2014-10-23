import BoundingVolumeBase			= require("awayjs-core/lib/bounds/BoundingVolumeBase");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import PlaneClassification			= require("awayjs-core/lib/geom/PlaneClassification");
import Plane3D						= require("awayjs-core/lib/geom/Plane3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");

class NullBounds extends BoundingVolumeBase
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

export = NullBounds;