import {PlaneClassification}	from "../geom/PlaneClassification";
import {Vector3D}				from "../geom/Vector3D";

export class Sphere
{
	/**
	 *
	 */
	public x:number;

	/**
	 *
	 */
	public y:number;

	/**
	 *
	 */
	public z:number;

	/**
	 *
	 */
	public radius:number;

	/**
	 * Create a Sphere with ABCD coefficients
	 */
	constructor(x:number = 0, y:number = 0, z:number = 0, radius:number = 0)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.radius = radius;

	}

	public rayIntersection(position:Vector3D, direction:Vector3D, targetNormal:Vector3D):number
	{
		if (this.containsPoint(position))
			return 0;

		var px:number = position.x - this.x, py:number = position.y - this.y, pz:number = position.z - this.z;
		var vx:number = direction.x, vy:number = direction.y, vz:number = direction.z;
		var rayEntryDistance:number;

		var a:number = vx*vx + vy*vy + vz*vz;
		var b:number = 2*( px*vx + py*vy + pz*vz );
		var c:number = px*px + py*py + pz*pz - this.radius*this.radius;
		var det:number = b*b - 4*a*c;

		if (det >= 0) { // ray goes through sphere
			var sqrtDet:number = Math.sqrt(det);
			rayEntryDistance = ( -b - sqrtDet )/( 2*a );
			if (rayEntryDistance >= 0) {
				targetNormal.x = px + rayEntryDistance*vx;
				targetNormal.y = py + rayEntryDistance*vy;
				targetNormal.z = pz + rayEntryDistance*vz;
				targetNormal.normalize();

				return rayEntryDistance;
			}
		}

		// ray misses sphere
		return -1;
	}

	public containsPoint(position:Vector3D):boolean
	{
		var px:number = position.x - this.x;
		var py:number = position.y - this.y;
		var pz:number = position.z - this.z;
		var distance:number = Math.sqrt(px*px + py*py + pz*pz);
		return distance <= this.radius;
	}

	public toString():string
	{
		return "Sphere [x:" + this.x + ", y:" + this.y + ", z:" + this.z + ", radius:" + this.radius + "]";
	}
}