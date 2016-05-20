import {Matrix3D}					from "../geom/Matrix3D";
import {Rectangle}				from "../geom/Rectangle";
import {Vector3D}					from "../geom/Vector3D";
import {EventDispatcher}			from "../events/EventDispatcher";
import {ProjectionEvent}			from "../events/ProjectionEvent";
import {AbstractMethodError}		from "../errors/AbstractMethodError";
import {IProjection}				from "../projections/IProjection";

export class ProjectionBase extends EventDispatcher implements IProjection
{
	public _pMatrix:Matrix3D = new Matrix3D();
	public _pScissorRect:Rectangle = new Rectangle();
	public _pViewPort:Rectangle = new Rectangle();
	public _pNear:number = 20;
	public _pFar:number = 3000;
	public _pAspectRatio:number = 1;

	public _pMatrixInvalid:boolean = true;
	public _pFrustumCorners:number[] = [];
	public _pCoordinateSystem:string;
	public _pOriginX:number = 0.5;
	public _pOriginY:number = 0.5;

	private _unprojection:Matrix3D;
	private _unprojectionInvalid:boolean = true;

	constructor(coordinateSystem:string = "leftHanded")
	{
		super();

		this.coordinateSystem = coordinateSystem;
	}

	/**
	 * The handedness of the coordinate system projection. The default is LEFT_HANDED.
	 */
	public get coordinateSystem():string
	{
		return this._pCoordinateSystem;
	}

	public set coordinateSystem(value:string)
	{
		if (this._pCoordinateSystem == value)
			return;

		this._pCoordinateSystem = value;

		this.pInvalidateMatrix();
	}

	public get frustumCorners():number[]
	{
		return this._pFrustumCorners;
	}

	public set frustumCorners(frustumCorners:number[])
	{
		this._pFrustumCorners = frustumCorners;
	}

	public get matrix():Matrix3D
	{
		if (this._pMatrixInvalid) {
			this.pUpdateMatrix();
			this._pMatrixInvalid = false;
		}
		return this._pMatrix;
	}

	public set matrix(value:Matrix3D)
	{
		this._pMatrix = value;
		this.pInvalidateMatrix();
	}

	public get near():number
	{
		return this._pNear;
	}

	public set near(value:number)
	{
		if (value == this._pNear) {
			return;
		}
		this._pNear = value;
		this.pInvalidateMatrix();
	}

	public get originX():number
	{
		return this._pOriginX;
	}

	public set originX(value:number)
	{
		if (this._pOriginX == value)
			return;

		this._pOriginX = value;
	}

	public get originY():number
	{
		return this._pOriginY;
	}

	public set originY(value:number)
	{
		if (this._pOriginY == value)
			return;

		this._pOriginY = value;
	}

	public get far():number
	{
		return this._pFar;
	}

	public set far(value:number)
	{
		if (value == this._pFar) {
			return;
		}
		this._pFar = value;
		this.pInvalidateMatrix();
	}

	public project(point3d:Vector3D):Vector3D
	{
		var v:Vector3D = this.matrix.transformVector(point3d);
		v.x = v.x/v.w;
		v.y = -v.y/v.w;

		//z is unaffected by transform
		v.z = point3d.z;

		return v;
	}

	public get unprojectionMatrix():Matrix3D
	{
		if (this._unprojectionInvalid) {
			if (!this._unprojection)
				this._unprojection = new Matrix3D();

			this._unprojection.copyFrom(this.matrix);
			this._unprojection.invert();
			this._unprojectionInvalid = false;
		}
		return this._unprojection;
	}

	public unproject(nX:number, nY:number, sZ:number):Vector3D
	{
		throw new AbstractMethodError();
	}

	public clone():ProjectionBase
	{
		throw new AbstractMethodError();
	}

	public get _iAspectRatio():number
	{
		return this._pAspectRatio;
	}

	public set _iAspectRatio(value:number)
	{
		if (this._pAspectRatio == value)
			return;

		this._pAspectRatio = value;

		this.pInvalidateMatrix();
	}

	public pInvalidateMatrix():void
	{
		this._pMatrixInvalid = true;
		this._unprojectionInvalid = true;
		this.dispatchEvent(new ProjectionEvent(ProjectionEvent.MATRIX_CHANGED, this));
	}

	public pUpdateMatrix():void
	{
		throw new AbstractMethodError();
	}

	public _iUpdateScissorRect(x:number, y:number, width:number, height:number):void
	{
		this._pScissorRect.x = x;
		this._pScissorRect.y = y;
		this._pScissorRect.width = width;
		this._pScissorRect.height = height;
		this.pInvalidateMatrix();
	}

	public _iUpdateViewport(x:number, y:number, width:number, height:number):void
	{
		this._pViewPort.x = x;
		this._pViewPort.y = y;
		this._pViewPort.width = width;
		this._pViewPort.height = height;
		this.pInvalidateMatrix();
	}
}