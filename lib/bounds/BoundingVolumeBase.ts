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

	public minX:number;
	public minY:number;
	public minZ:number;
	public maxX:number;
	public maxY:number;
	public maxZ:number;

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

		if (len == 0) {
			this.nullify();
			return;
		}

		var v:number;

		this.minX = this.maxX = vertices[i++];
		this.minY = this.maxY = vertices[i++];
		this.minZ = this.maxZ = vertices[i++];

		while (i < len) {
			v = vertices[i++];
			if (v < this.minX)
				this.minX = v; else if (v > this.maxX)
				this.maxX = v;
			v = vertices[i++];
			if (v < this.minY)
				this.minY = v; else if (v > this.maxY)
				this.maxY = v;
			v = vertices[i++];
			if (v < this.minZ)
				this.minZ = v; else if (v > this.maxZ)
				this.maxZ = v;
		}

		this.fromExtremes(this.minX, this.minY, this.minZ, this.maxX, this.maxY, this.maxZ);
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
		this.minX = this._aabb.x;
		this.minY = this._aabb.y - this._aabb.height;
		this.minZ = this._aabb.z;
		this.maxX = this._aabb.x + this._aabb.width;
		this.maxY = this._aabb.y;
		this.maxZ = this._aabb.z + this._aabb.depth;

		this._pAabbPoints[0] = this.minX;
		this._pAabbPoints[1] = this.minY;
		this._pAabbPoints[2] = this.minZ;
		this._pAabbPoints[3] = this.maxX;
		this._pAabbPoints[4] = this.minY;
		this._pAabbPoints[5] = this.minZ;
		this._pAabbPoints[6] = this.minX;
		this._pAabbPoints[7] = this.maxY;
		this._pAabbPoints[8] = this.minZ;
		this._pAabbPoints[9] = this.maxX;
		this._pAabbPoints[10] = this.maxY;
		this._pAabbPoints[11] = this.minZ;
		this._pAabbPoints[12] = this.minX;
		this._pAabbPoints[13] = this.minY;
		this._pAabbPoints[14] = this.maxZ;
		this._pAabbPoints[15] = this.maxX;
		this._pAabbPoints[16] = this.minY;
		this._pAabbPoints[17] = this.maxZ;
		this._pAabbPoints[18] = this.minX;
		this._pAabbPoints[19] = this.maxY;
		this._pAabbPoints[20] = this.maxZ;
		this._pAabbPoints[21] = this.maxX;
		this._pAabbPoints[22] = this.maxY;
		this._pAabbPoints[23] = this.maxZ;
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