import {Transform} from "../base/Transform";
import {Matrix3D} from "../geom/Matrix3D";
import {Vector3D} from "../geom/Vector3D";

import {CoordinateSystem} from "./CoordinateSystem";
import {ProjectionBase} from "./ProjectionBase";

export class PerspectiveProjection extends ProjectionBase
{
	private _fieldOfView:number = 60;
	private _focalLength:number = 1000;
	private _hFieldOfView:number = 60;
	private _hFocalLength:number = 1000;
	private _preserveAspectRatio:boolean = true;
	private _preserveFocalLength:boolean = false;

	constructor(fieldOfView:number = 60, coordinateSystem:CoordinateSystem = CoordinateSystem.LEFT_HANDED)
	{
		super(coordinateSystem);

		this.fieldOfView = fieldOfView;
	}

	/**
	 *
	 */
	public get preserveAspectRatio():boolean
	{
		return this._preserveAspectRatio;
	}

	public set preserveAspectRatio(value:boolean)
	{
		if (this._preserveAspectRatio == value)
			return;

		this._preserveAspectRatio = value;

		if (this._preserveAspectRatio)
			this._invalidateFrustumMatrix3D();
	}

	/**
	 *
	 */
	public get preserveFocalLength():boolean
	{
		return this._preserveFocalLength;
	}

	public set preserveFocalLength(value:boolean)
	{
		if (this._preserveFocalLength == value)
			return;

		this._preserveFocalLength = value;

		this._invalidateFrustumMatrix3D();
	}

	/**
	 *
	 */
	public get fieldOfView():number
	{
		if (this._frustumMatrix3DDirty && this._preserveFocalLength)
			this._updateFrustumMatrix3D();

		return this._fieldOfView;
	}

	public set fieldOfView(value:number)
	{
		if (this._fieldOfView == value)
			return;

		this._fieldOfView = value;

		this._invalidateFrustumMatrix3D();
	}

	/**
	 *
	 */
	public get focalLength():number
	{
		if (this._frustumMatrix3DDirty && !this._preserveFocalLength)
			this._updateFrustumMatrix3D();

		return this._focalLength;
	}

	public set focalLength(value:number)
	{
		if (this._focalLength == value)
			return;

		this._focalLength = value;

		this._invalidateFrustumMatrix3D();
	}

	/**
	 *
	 */
	public get hFieldOfView():number
	{
		if (this._frustumMatrix3DDirty && this._preserveFocalLength)
			this._updateFrustumMatrix3D();

		return this._hFieldOfView;
	}

	public set hFieldOfView(value:number)
	{
		if (this._hFieldOfView == value)
			return;

		this._hFieldOfView = value;

		this._hFocalLength = 1/Math.tan(this._hFieldOfView*Math.PI/360);

		this._invalidateFrustumMatrix3D();
	}

	/**
	 *
	 */
	public get hFocalLength():number
	{
		if (this._frustumMatrix3DDirty && !this._preserveFocalLength)
			this._updateFrustumMatrix3D();

		return this._hFocalLength;
	}

	public set hFocalLength(value:number)
	{
		if (this._hFocalLength == value)
			return;

		this._hFocalLength = value;

		this._invalidateFrustumMatrix3D();
	}


	//@override
	public unproject(nX:number, nY:number, sZ:number):Vector3D
	{
		var v:Vector3D = new Vector3D(nX*sZ, -nY*sZ, (this._far + this._near)/(this._far - this._near)*sZ - 2*this._far*this._near/(this._far - this._near), sZ);

		v = this.inverseViewMatrix3D.transformVector(v, v);

		v.w = 1;

		return v;
	}

	/**
	 *
	 * @returns {PerspectiveProjection}
	 */
	public clone():ProjectionBase
	{
		var clone:PerspectiveProjection = new PerspectiveProjection(this._fieldOfView, this._coordinateSystem);

		clone._hFieldOfView = this.hFieldOfView;
		clone._preserveAspectRatio = this._preserveAspectRatio;
		clone._preserveFocalLength = this._preserveFocalLength;
		clone._near = this._near;
		clone._far = this._far;
		clone._aspectRatio = this._aspectRatio;
		clone._coordinateSystem = this._coordinateSystem;

		return clone;
	}

	/**
	 *
	 * @private
	 */
	protected _updateFrustumMatrix3D():void
	{
		super._updateFrustumMatrix3D();

		var raw:Float32Array = Matrix3D.CALCULATION_MATRIX._rawData;

		if (this._preserveFocalLength) {
			if (this._preserveAspectRatio)
				this._hFocalLength = this._focalLength;

			this._fieldOfView = Math.atan(0.5*this._viewRect.height/this._focalLength)*360/Math.PI;
			this._hFieldOfView = Math.atan(0.5*this._viewRect.width/this._hFocalLength)*360/Math.PI;
		} else {
			this._focalLength = 0.5*this._viewRect.height/Math.tan(this._fieldOfView*Math.PI/360);

			if (this._preserveAspectRatio)
				this._hFocalLength = this._focalLength;
			else
				this._hFocalLength = 0.5*this._viewRect.width/Math.tan(this._hFieldOfView*Math.PI/360);
		}

		// assume scissored frustum
		var right:number = (this._viewRect.x + this._originX*this._viewRect.width)/this._hFocalLength;
		var top:number = -(this._viewRect.y + this._originY*this._viewRect.height)/this._focalLength;

		var left:number = right - this._stageRect.width/this._hFocalLength;
		var bottom:number = top + this._stageRect.height/this._focalLength;

		raw[0] = 2/(right - left);
		raw[5] = 2/(bottom - top);
		raw[8] = (right + left)/(right - left);
		raw[9] = (bottom + top)/(bottom - top);
		raw[10] = (this._far + this._near)/(this._far - this._near);
		raw[11] = 1;
		raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[12] = raw[13] = raw[15] = 0;
		raw[14] = -2*this._far*this._near/(this._far - this._near);

		if (this._coordinateSystem == CoordinateSystem.RIGHT_HANDED)
			raw[5] = -raw[5];

		this._frustumMatrix3D.copyRawDataFrom(raw);

		this._frustumCorners[0] = this._frustumCorners[9] = this._near*left;
		this._frustumCorners[3] = this._frustumCorners[6] = this._near*right;
		this._frustumCorners[1] = this._frustumCorners[4] = this._near*top;
		this._frustumCorners[7] = this._frustumCorners[10] = this._near*bottom;

		this._frustumCorners[12] = this._frustumCorners[21] = this._far*left;
		this._frustumCorners[15] = this._frustumCorners[18] = this._far*right;
		this._frustumCorners[13] = this._frustumCorners[16] = this._far*top;
		this._frustumCorners[19] = this._frustumCorners[22] = this._far*bottom;

		this._frustumCorners[2] = this._frustumCorners[5] = this._frustumCorners[8] = this._frustumCorners[11] = this._near;
		this._frustumCorners[14] = this._frustumCorners[17] = this._frustumCorners[20] = this._frustumCorners[23] = this._far;
	}
}