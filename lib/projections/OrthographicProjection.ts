import {Transform} from "../base/Transform";
import {Matrix3D} from "../geom/Matrix3D";
import {Vector3D} from "../geom/Vector3D";

import {ProjectionBase} from "./ProjectionBase";

export class OrthographicProjection extends ProjectionBase
{

	private _projectionHeight:number;
	private _xMax:number;
	private _yMax:number;

	constructor(projectionHeight:number = 500)
	{
		super();

		this._projectionHeight = projectionHeight;
	}

	public get projectionHeight():number
	{
		return this._projectionHeight;
	}

	public set projectionHeight(value:number)
	{
		if (value == this._projectionHeight)
			return;

		this._projectionHeight = value;

		this._invalidateFrustumMatrix3D();
	}

	//@override
	public unproject(nX:number, nY:number, sZ:number):Vector3D
	{
		var v:Vector3D = new Vector3D(nX + this.viewMatrix3D._rawData[12], -nY + this.viewMatrix3D._rawData[13], sZ, 1.0);
		v = this.inverseViewMatrix3D.transformVector(v);

		//z is unaffected by transform
		v.z = sZ;

		return v;
	}

	//@override
	public clone():ProjectionBase
	{
		var clone:OrthographicProjection = new OrthographicProjection();
		clone._near = this._near;
		clone._far = this._far;
		clone.projectionHeight = this._projectionHeight;
		return clone;
	}

	//@override
	public _updateFrustumMatrix3D():void
	{
		super._updateFrustumMatrix3D();

		var raw:Float32Array = Matrix3D.CALCULATION_MATRIX._rawData;
		this._yMax = this._projectionHeight*.5;
		this._xMax = this._yMax*this._viewRect.width/this._viewRect.height;

		var left:number;
		var right:number;
		var top:number;
		var bottom:number;

		if (this._viewRect.x == 0 && this._viewRect.y == 0 && this._viewRect.width == this._stageRect.width && this._viewRect.height == this._stageRect.height) {
			// assume symmetric frustum

			left = -this._xMax;
			right = this._xMax;
			top = -this._yMax;
			bottom = this._yMax;

			raw[0] = 2/(this._projectionHeight*this._viewRect.width/this._viewRect.height);
			raw[5] = 2/this._projectionHeight;
			raw[10] = 1/(this._far - this._near);
			raw[14] = this._near/(this._near - this._far);
			raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[11] = raw[12] = raw[13] = 0;
			raw[15] = 1;

		} else {

			var xWidth:number = this._xMax*(this._stageRect.width/this._viewRect.width);
			var yHgt:number = this._yMax*(this._stageRect.height/this._viewRect.height);
			var center:number = this._xMax*(this._viewRect.x*2 - this._stageRect.width)/this._viewRect.width + this._xMax;
			var middle:number = -this._yMax*(this._viewRect.y*2 - this._stageRect.height)/this._viewRect.height - this._yMax;

			left = center - xWidth;
			right = center + xWidth;
			top = middle - yHgt;
			bottom = middle + yHgt;

			raw[0] = 2*1/(right - left);
			raw[5] = -2*1/(top - bottom);
			raw[10] = 1/(this._far - this._near);

			raw[12] = (right + left)/(right - left);
			raw[13] = (bottom + top)/(bottom - top);
			raw[14] = this._near/(this.near - this.far);

			raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[11] = 0;
			raw[15] = 1;
		}

		this._frustumCorners[0] = this._frustumCorners[9] = this._frustumCorners[12] = this._frustumCorners[21] = left;
		this._frustumCorners[3] = this._frustumCorners[6] = this._frustumCorners[15] = this._frustumCorners[18] = right;
		this._frustumCorners[1] = this._frustumCorners[4] = this._frustumCorners[13] = this._frustumCorners[16] = top;
		this._frustumCorners[7] = this._frustumCorners[10] = this._frustumCorners[19] = this._frustumCorners[22] = bottom;
		this._frustumCorners[2] = this._frustumCorners[5] = this._frustumCorners[8] = this._frustumCorners[11] = this._near;
		this._frustumCorners[14] = this._frustumCorners[17] = this._frustumCorners[20] = this._frustumCorners[23] = this._far;

		this._frustumMatrix3D.copyRawDataFrom(raw);
	}
}