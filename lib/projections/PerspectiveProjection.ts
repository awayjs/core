import {Matrix3DUtils}			from "../geom/Matrix3DUtils";
import {Vector3D}					from "../geom/Vector3D";
import {CoordinateSystem}			from "../projections/CoordinateSystem";
import {ProjectionBase}			from "../projections/ProjectionBase";

export class PerspectiveProjection extends ProjectionBase
{
	private _fieldOfView:number = 60;
	private _focalLength:number = 1000;
	private _hFieldOfView:number = 60;
	private _hFocalLength:number = 1000;
	private _preserveAspectRatio:boolean = true;
	private _preserveFocalLength:boolean = false;

	constructor(fieldOfView:number = 60, coordinateSystem:string = "leftHanded")
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
			this.pInvalidateMatrix();
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

		this.pInvalidateMatrix();
	}

	/**
	 *
	 */
	public get fieldOfView():number
	{
		return this._fieldOfView;
	}

	public set fieldOfView(value:number)
	{
		if (this._fieldOfView == value)
			return;

		this._fieldOfView = value;

		this.pInvalidateMatrix();
	}

	/**
	 *
	 */
	public get focalLength():number
	{
		return this._focalLength;
	}

	public set focalLength(value:number)
	{
		if (this._focalLength == value)
			return;

		this._focalLength = value;

		this.pInvalidateMatrix();
	}

	/**
	 *
	 */
	public get hFieldOfView():number
	{
		return this._hFieldOfView;
	}

	public set hFieldOfView(value:number)
	{
		if (this._hFieldOfView == value)
			return;

		this._hFieldOfView = value;

		this._hFocalLength = 1/Math.tan(this._hFieldOfView*Math.PI/360);

		this.pInvalidateMatrix();
	}

	/**
	 *
	 */
	public get hFocalLength():number
	{
		return this._hFocalLength;
	}

	public set hFocalLength(value:number)
	{
		if (this._hFocalLength == value)
			return;

		this._hFocalLength = value;

		this.pInvalidateMatrix();
	}


	//@override
	public unproject(nX:number, nY:number, sZ:number):Vector3D
	{
		var v:Vector3D = new Vector3D(nX, -nY, sZ, 1.0);

		v.x *= sZ;
		v.y *= sZ;

		v = this.unprojectionMatrix.transformVector(v);

		//z is unaffected by transform
		v.z = sZ;

		return v;
	}

	//@override
	public clone():ProjectionBase
	{
		var clone:PerspectiveProjection = new PerspectiveProjection(this._fieldOfView);
		clone._pNear = this._pNear;
		clone._pFar = this._pFar;
		clone._pAspectRatio = this._pAspectRatio;
		clone._pCoordinateSystem = this._pCoordinateSystem;
		return clone;
	}

	//@override
	public pUpdateMatrix():void
	{
		var raw:Float32Array = Matrix3DUtils.RAW_DATA_CONTAINER;

		if (this._preserveFocalLength) {
			if (this._preserveAspectRatio)
				this._hFocalLength = this._focalLength;

			this._fieldOfView = Math.atan(0.5*this._pScissorRect.height/this._focalLength)*360/Math.PI;
			this._hFieldOfView = Math.atan(0.5*this._pScissorRect.width/this._hFocalLength)*360/Math.PI;
		} else {
			this._focalLength = 0.5*this._pScissorRect.height/Math.tan(this._fieldOfView*Math.PI/360);

			if (this._preserveAspectRatio)
				this._hFocalLength = this._focalLength;
			else
				this._hFocalLength = 0.5*this._pScissorRect.width/Math.tan(this._hFieldOfView*Math.PI/360);
		}

		var tanMinX = -this._pOriginX/this._hFocalLength;
		var tanMaxX = (1 - this._pOriginX)/this._hFocalLength;
		var tanMinY = -this._pOriginY/this._focalLength;
		var tanMaxY = (1 - this._pOriginY)/this._focalLength;

		var left:number;
		var right:number;
		var top:number;
		var bottom:number;

		// assume scissored frustum
		var center:number = -((tanMinX - tanMaxX)*this._pScissorRect.x + tanMinX*this._pScissorRect.width);
		var middle:number = ((tanMinY - tanMaxY)*this._pScissorRect.y + tanMinY*this._pScissorRect.height);

		left = center - (tanMaxX - tanMinX)*this._pViewPort.width;
		right = center;
		top = middle;
		bottom = middle + (tanMaxY - tanMinY)*this._pViewPort.height;

		raw[0] = 2/(right - left);
		raw[5] = 2/(bottom - top);
		raw[8] = (right + left)/(right - left);
		raw[9] = (bottom + top)/(bottom - top);
		raw[10] = (this._pFar + this._pNear)/(this._pFar - this._pNear);
		raw[11] = 1;
		raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[12] = raw[13] = raw[15] = 0;
		raw[14] = -2*this._pFar*this._pNear/(this._pFar - this._pNear);

		if (this._pCoordinateSystem == CoordinateSystem.RIGHT_HANDED)
			raw[5] = -raw[5];

		this._pMatrix.copyRawDataFrom(raw);

		this._pFrustumCorners[0] = this._pFrustumCorners[9] = this._pNear*left;
		this._pFrustumCorners[3] = this._pFrustumCorners[6] = this._pNear*right;
		this._pFrustumCorners[1] = this._pFrustumCorners[4] = this._pNear*top;
		this._pFrustumCorners[7] = this._pFrustumCorners[10] = this._pNear*bottom;

		this._pFrustumCorners[12] = this._pFrustumCorners[21] = this._pFar*left;
		this._pFrustumCorners[15] = this._pFrustumCorners[18] = this._pFar*right;
		this._pFrustumCorners[13] = this._pFrustumCorners[16] = this._pFar*top;
		this._pFrustumCorners[19] = this._pFrustumCorners[22] = this._pFar*bottom;

		this._pFrustumCorners[2] = this._pFrustumCorners[5] = this._pFrustumCorners[8] = this._pFrustumCorners[11] = this._pNear;
		this._pFrustumCorners[14] = this._pFrustumCorners[17] = this._pFrustumCorners[20] = this._pFrustumCorners[23] = this._pFar;

		this._pMatrixInvalid = false;


	}
}