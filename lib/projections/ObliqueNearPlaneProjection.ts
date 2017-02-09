import {Matrix3D}					from "../geom/Matrix3D";
import {Plane3D}					from "../geom/Plane3D";
import {Vector3D}					from "../geom/Vector3D";
import {ProjectionEvent}			from "../events/ProjectionEvent";
import {IProjection}				from "../projections/IProjection";
import {ProjectionBase}			from "../projections/ProjectionBase";

export class ObliqueNearPlaneProjection extends ProjectionBase
{

	private _baseProjection:IProjection;
	private _plane:Plane3D;
	private _onProjectionMatrixChangedDelegate:(event:ProjectionEvent) => void;

	constructor(baseProjection:IProjection, plane:Plane3D)
	{
		super();
		this.baseProjection = baseProjection;
		this.plane = plane;

		this._onProjectionMatrixChangedDelegate = (event:ProjectionEvent) => this.onProjectionMatrixChanged(event);
	}

	//@override
	public get frustumCorners():number[]
	{
		return this._baseProjection.frustumCorners;
	}

	//@override
	public get near():number
	{
		return this._baseProjection.near;
	}

	//@override
	public set near(value:number)
	{
		this._baseProjection.near = value;
	}

	//@override
	public get far():number
	{
		return this._baseProjection.far;
	}

	//@override
	public set far(value:number)
	{
		this._baseProjection.far = value;
	}

	//@override
	public get iAspectRatio():number
	{
		return this._baseProjection._iAspectRatio;
	}

	//@override
	public set iAspectRatio(value:number)
	{
		this._baseProjection._iAspectRatio = value;
	}

	public get plane():Plane3D
	{
		return this._plane;
	}

	public set plane(value:Plane3D)
	{
		this._plane = value;
		this.pInvalidateMatrix();
	}

	public set baseProjection(value:IProjection)
	{
		if (this._baseProjection) {
			this._baseProjection.removeEventListener(ProjectionEvent.MATRIX_CHANGED, this._onProjectionMatrixChangedDelegate);
		}
		this._baseProjection = value;

		if (this._baseProjection) {
			this._baseProjection.addEventListener(ProjectionEvent.MATRIX_CHANGED, this._onProjectionMatrixChangedDelegate);
		}
		this.pInvalidateMatrix();
	}

	private onProjectionMatrixChanged(event:ProjectionEvent):void
	{
		this.pInvalidateMatrix();
	}

	//@override
	public pUpdateMatrix():void
	{
		this._pMatrix.copyFrom(this._baseProjection.matrix);

		var cx:number = this._plane.a;
		var cy:number = this._plane.b;
		var cz:number = this._plane.c;
		var cw:number = -this._plane.d + .05;
		var signX:number = cx >= 0? 1 : -1;
		var signY:number = cy >= 0? 1 : -1;
		var p:Vector3D = new Vector3D(signX, signY, 1, 1);
		var inverse:Matrix3D = this._pMatrix.clone();
		inverse.invert();
		var q:Vector3D = inverse.transformVector(p);
		this._pMatrix.copyRowTo(3, p);
		var a:number = (q.x*p.x + q.y*p.y + q.z*p.z + q.w*p.w)/(cx*q.x + cy*q.y + cz*q.z + cw*q.w);
		this._pMatrix.copyRowFrom(2, new Vector3D(cx*a, cy*a, cz*a, cw*a));
	}
}