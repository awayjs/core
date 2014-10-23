import Box							= require("awayjs-core/lib/geom/Box");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Plane3D						= require("awayjs-core/lib/geom/Plane3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");
import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");

class BoundingVolumeBase
{
	public _aabb:Box;
	public _pAabbPoints:Array<number> = new Array<number>();
	public _pAabbPointsDirty:boolean = true;

	constructor()
	{
		this._aabb = new Box();
	}

	public get aabb():Box
	{
		return this._aabb;
	}

	public get aabbPoints():Array<number>
	{
		if (this._pAabbPointsDirty)
			this.pUpdateAABBPoints();

		return this._pAabbPoints;
	}

	public nullify()
	{
		this._aabb.x = this._aabb.y = this._aabb.z = 0;
		this._aabb.width = this._aabb.height = this._aabb.depth = 0;
		this._pAabbPointsDirty = true;
	}

	public fromVertices(vertices:Array<number>)
	{
		var i:number;
		var len:number = vertices.length;
		var minX:number, minY:number, minZ:number;
		var maxX:number, maxY:number, maxZ:number;

		if (len == 0) {
			this.nullify();
			return;
		}

		var v:number;

		minX = maxX = vertices[i++];
		minY = maxY = vertices[i++];
		minZ = maxZ = vertices[i++];

		while (i < len) {
			v = vertices[i++];
			if (v < minX)
				minX = v; else if (v > maxX)
				maxX = v;
			v = vertices[i++];
			if (v < minY)
				minY = v; else if (v > maxY)
				maxY = v;
			v = vertices[i++];
			if (v < minZ)
				minZ = v; else if (v > maxZ)
				maxZ = v;
		}

		this.fromExtremes(minX, minY, minZ, maxX, maxY, maxZ);
	}

	public fromSphere(center:Vector3D, radius:number)
	{
		this.fromExtremes(center.x - radius, center.y - radius, center.z - radius, center.x + radius, center.y + radius, center.z + radius);
	}

	public fromExtremes(minX:number, minY:number, minZ:number, maxX:number, maxY:number, maxZ:number)
	{
		this._aabb.x = minX;
		this._aabb.y = maxY;
		this._aabb.z = minZ;
		this._aabb.width = maxX - minX;
		this._aabb.height = maxY - minY;
		this._aabb.depth = maxZ - minZ;
		this._pAabbPointsDirty = true;
	}

	public isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean
	{
		throw new AbstractMethodError();
	}

	public overlaps(bounds:BoundingVolumeBase):boolean
	{
		return this._aabb.intersects(bounds.aabb);
	}

	public clone():BoundingVolumeBase
	{
		throw new AbstractMethodError();
	}

	public rayIntersection(position:Vector3D, direction:Vector3D, targetNormal:Vector3D):number
	{
		return -1;
	}

	public containsPoint(position:Vector3D):boolean
	{
		return false;
	}

	public pUpdateAABBPoints()
	{
		var minX:number = this._aabb.x;
		var minY:number = this._aabb.y - this._aabb.height;
		var minZ:number = this._aabb.z;
		var maxX:number = this._aabb.x + this._aabb.width;
		var maxY:number = this._aabb.y;
		var maxZ:number = this._aabb.z + this._aabb.depth;

		this._pAabbPoints[0] = minX;
		this._pAabbPoints[1] = minY;
		this._pAabbPoints[2] = minZ;
		this._pAabbPoints[3] = maxX;
		this._pAabbPoints[4] = minY;
		this._pAabbPoints[5] = minZ;
		this._pAabbPoints[6] = minX;
		this._pAabbPoints[7] = maxY;
		this._pAabbPoints[8] = minZ;
		this._pAabbPoints[9] = maxX;
		this._pAabbPoints[10] = maxY;
		this._pAabbPoints[11] = minZ;
		this._pAabbPoints[12] = minX;
		this._pAabbPoints[13] = minY;
		this._pAabbPoints[14] = maxZ;
		this._pAabbPoints[15] = maxX;
		this._pAabbPoints[16] = minY;
		this._pAabbPoints[17] = maxZ;
		this._pAabbPoints[18] = minX;
		this._pAabbPoints[19] = maxY;
		this._pAabbPoints[20] = maxZ;
		this._pAabbPoints[21] = maxX;
		this._pAabbPoints[22] = maxY;
		this._pAabbPoints[23] = maxZ;
		this._pAabbPointsDirty = false;
	}

	public classifyToPlane(plane:Plane3D):number
	{
		throw new AbstractMethodError();
	}

	public transformFrom(bounds:BoundingVolumeBase, matrix:Matrix3D)
	{
		throw new AbstractMethodError();
	}
}

export = BoundingVolumeBase;