import {Transform} from "../base/Transform";
import {Matrix3D} from "../geom/Matrix3D";
import {Vector3D} from "../geom/Vector3D";

import {ProjectionBase} from "./ProjectionBase";

export class OrthographicOffCenterProjection extends ProjectionBase
{

	private _minX:number;
	private _maxX:number;
	private _minY:number;
	private _maxY:number;

	constructor(minX:number, maxX:number, minY:number, maxY:number)
	{
		super();
		this._minX = minX;
		this._maxX = maxX;
		this._minY = minY;
		this._maxY = maxY;
	}

	public get minX():number
	{
		return this._minX;
	}

	public set minX(value:number)
	{
		this._minX = value;
		this._invalidateFrustumMatrix3D();
	}

	public get maxX():number
	{
		return this._maxX;
	}

	public set maxX(value:number)
	{
		this._maxX = value;
		this._invalidateFrustumMatrix3D();
	}

	public get minY():number
	{
		return this._minY;
	}

	public set minY(value:number)
	{
		this._minY = value;
		this._invalidateFrustumMatrix3D();
	}

	public get maxY():number
	{
		return this._maxY;
	}

	public set maxY(value:number)
	{
		this._maxY = value;
		this._invalidateFrustumMatrix3D();
	}

	//@override
	public unproject(nX:number, nY:number, sZ:number):Vector3D
	{
		var v:Vector3D = new Vector3D(nX, -nY, sZ, 1.0);
		v = this.inverseViewMatrix3D.transformVector(v);
		//z is unaffected by transform
		v.z = sZ;

		return v;
	}

	//@override
	public clone():ProjectionBase
	{
		var clone:OrthographicOffCenterProjection = new OrthographicOffCenterProjection(this._minX, this._maxX, this._minY, this._maxY);
		clone._near = this._near;
		clone._far = this._far;
		clone._aspectRatio = this._aspectRatio;
		return clone;
	}

	//@override
	public _updateFrustumMatrix3D():void
	{
		super._updateFrustumMatrix3D();

		var raw:Float32Array = Matrix3D.CALCULATION_MATRIX._rawData;
		var w:number = 1/(this._maxX - this._minX);
		var h:number = 1/(this._maxY - this._minY);
		var d:number = 1/(this._far - this._near);

		raw[0] = 2*w;
		raw[5] = 2*h;
		raw[10] = d;
		raw[12] = -(this._maxX + this._minX)*w;
		raw[13] = -(this._maxY + this._minY)*h;
		raw[14] = -this._near*d;
		raw[15] = 1;
		raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[11] = 0;
		this._frustumMatrix3D.copyRawDataFrom(raw);

		this._frustumCorners[0] = this._frustumCorners[9] = this._frustumCorners[12] = this._frustumCorners[21] = this._minX;
		this._frustumCorners[3] = this._frustumCorners[6] = this._frustumCorners[15] = this._frustumCorners[18] = this._maxX;
		this._frustumCorners[1] = this._frustumCorners[4] = this._frustumCorners[13] = this._frustumCorners[16] = this._minY;
		this._frustumCorners[7] = this._frustumCorners[10] = this._frustumCorners[19] = this._frustumCorners[22] = this._maxY;
		this._frustumCorners[2] = this._frustumCorners[5] = this._frustumCorners[8] = this._frustumCorners[11] = this._near;
		this._frustumCorners[14] = this._frustumCorners[17] = this._frustumCorners[20] = this._frustumCorners[23] = this._far;
	}
}