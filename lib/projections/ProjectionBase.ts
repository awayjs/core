import {Transform} from "../base/Transform";
import {Matrix3D} from "../geom/Matrix3D";
import {Plane3D} from "../geom/Plane3D";
import {Rectangle} from "../geom/Rectangle";
import {Vector3D} from "../geom/Vector3D";
import {EventDispatcher} from "../events/EventDispatcher";
import {ProjectionEvent} from "../events/ProjectionEvent";
import {TransformEvent} from "../events/TransformEvent";
import {AbstractMethodError} from "../errors/AbstractMethodError";

import {CoordinateSystem} from "./CoordinateSystem";

export class ProjectionBase extends EventDispatcher
{
	protected _viewMatrix3D:Matrix3D = new Matrix3D();
	protected _inverseViewMatrix3D:Matrix3D = new Matrix3D();
	protected _frustumMatrix3D:Matrix3D = new Matrix3D();
	protected _viewRect:Rectangle = new Rectangle();
	protected _stageRect:Rectangle = new Rectangle();
	protected _near:number = 20;
	protected _far:number = 3000;
	protected _frustumCorners:number[] = [];
	protected _transform:Transform;
	protected _coordinateSystem:CoordinateSystem;
	protected _originX:number = 0.5;
	protected _originY:number = 0.5;

	protected _propertiesDirty:boolean;
	private _viewMatrix3DDirty:boolean = true;
	private _inverseViewMatrix3DDirty:boolean = true;
	protected _frustumMatrix3DDirty:boolean = true;
	private _frustumPlanes:Array<Plane3D>;
	private _frustumPlanesDirty:boolean = true;
	private _onInvalidateConcatenatedMatrix3DDelegate:(event:TransformEvent) => void;
	
	constructor(coordinateSystem:CoordinateSystem = CoordinateSystem.LEFT_HANDED)
	{
		super();

		this._coordinateSystem = coordinateSystem;

		this._onInvalidateConcatenatedMatrix3DDelegate = (event:TransformEvent) => this._onInvalidateConcatenatedMatrix3D(event);
	}

	public get transform():Transform
	{
		return this._transform;
	}

	public set transform(value:Transform)
	{
		if (this._transform == value)
			return;

		if (this._transform)
			this._transform.removeEventListener(TransformEvent.INVALIDATE_CONCATENATED_MATRIX3D, this._onInvalidateConcatenatedMatrix3DDelegate);
		
		this._transform = value;

		if (this._transform)
			this._transform.addEventListener(TransformEvent.INVALIDATE_CONCATENATED_MATRIX3D, this._onInvalidateConcatenatedMatrix3DDelegate);
		
		this._invalidateViewMatrix3D();
	}
	
	/**
	 * The handedness of the coordinate system projection. The default is LEFT_HANDED.
	 */
	public get coordinateSystem():CoordinateSystem
	{
		return this._coordinateSystem;
	}

	public set coordinateSystem(value:CoordinateSystem)
	{
		if (this._coordinateSystem == value)
			return;

		this._coordinateSystem = value;

		this._invalidateFrustumMatrix3D();
	}

	/**
	 * 
	 * @returns {number[]}
	 */
	public get frustumCorners():number[]
	{
		return this._frustumCorners;
	}

	/**
	 * 
	 * @returns {Matrix3D}
	 */
	public get frustumMatrix3D():Matrix3D
	{
		if (this._frustumMatrix3DDirty)
			this._updateFrustumMatrix3D();
		
		return this._frustumMatrix3D;
	}

	public set frustumMatrix3D(value:Matrix3D)
	{
		this._frustumMatrix3D = value;

		this._invalidateViewMatrix3D();
		this._invalidateProperties();
	}

	/**
	 * 
	 * @returns {number}
	 */
	public get near():number
	{
		if (this._propertiesDirty)
			this._updateProperties();

		return this._near;
	}

	public set near(value:number)
	{
		if (value == this._near)
			return;
		
		this._near = value;
		
		this._invalidateFrustumMatrix3D();
	}

	/**
	 * 
	 * @returns {number}
	 */
	public get originX():number
	{
		if (this._propertiesDirty)
			this._updateProperties();

		return this._originX;
	}

	public set originX(value:number)
	{
		if (this._originX == value)
			return;

		this._originX = value;

		this._invalidateFrustumMatrix3D();
	}

	/**
	 * 
	 * @returns {number}
	 */
	public get originY():number
	{
		if (this._propertiesDirty)
			this._updateProperties();

		return this._originY;
	}

	public set originY(value:number)
	{
		if (this._originY == value)
			return;

		this._originY = value;

		this._invalidateFrustumMatrix3D();
	}

	/**
	 * 
	 * @returns {number}
	 */
	public get far():number
	{
		if (this._propertiesDirty)
			this._updateProperties();

		return this._far;
	}

	public set far(value:number)
	{
		if (value == this._far)
			return;
		
		this._far = value;
		
		this._invalidateFrustumMatrix3D();
	}

	/*
	
	 */
	public project(vector3D:Vector3D):Vector3D
	{
		var v:Vector3D = this.viewMatrix3D.transformVector(vector3D);
		v.x = v.x/v.w;
		v.y = -v.y/v.w;

		//z is remapped to w
		v.z = v.w;
		v.w = 1;

		return v;
	}

	public get viewMatrix3D():Matrix3D
	{
		if (this._viewMatrix3DDirty) {
			this._viewMatrix3DDirty = false;

			if (this._transform) {
				this._viewMatrix3D.copyFrom(this._transform.inverseConcatenatedMatrix3D);
				this._viewMatrix3D.append(this.frustumMatrix3D);
			} else {
				this._viewMatrix3D.copyFrom(this.frustumMatrix3D);
			}
		}

		return this._viewMatrix3D;
	}
	
	public get inverseViewMatrix3D():Matrix3D
	{
		if (this._inverseViewMatrix3DDirty) {
			this._inverseViewMatrix3DDirty = false;
			this._inverseViewMatrix3D.copyFrom(this.viewMatrix3D);
			this._inverseViewMatrix3D.invert();
		}
		
		return this._inverseViewMatrix3D;
	}

	public unproject(nX:number, nY:number, sZ:number, target:Vector3D = null):Vector3D
	{
		throw new AbstractMethodError();
	}

	public clone():ProjectionBase
	{
		throw new AbstractMethodError();
	}

	private _invalidateProperties():void
	{
		this._propertiesDirty = true;
	}

	private _invalidateViewMatrix3D():void
	{
		this._viewMatrix3DDirty = true;
		this._inverseViewMatrix3DDirty = true;
		this._frustumPlanesDirty = true;

		this.dispatchEvent(new ProjectionEvent(ProjectionEvent.MATRIX_CHANGED, this));
	}

	protected _invalidateFrustumMatrix3D():void
	{
		if (this._propertiesDirty)
			this._updateProperties();

		this._frustumMatrix3DDirty = true;

		this._invalidateViewMatrix3D();
	}

	public setViewRect(x:number, y:number, width:number, height:number):void
	{
		this._viewRect.x = x;
		this._viewRect.y = y;
		this._viewRect.width = width;
		this._viewRect.height = height;
		
		this._invalidateFrustumMatrix3D();
	}

	public setStageRect(x:number, y:number, width:number, height:number):void
	{
		this._stageRect.x = x;
		this._stageRect.y = y;
		this._stageRect.width = width;
		this._stageRect.height = height;
		
		this._invalidateFrustumMatrix3D();
	}

	protected _updateFrustumMatrix3D():void
	{
		this._frustumMatrix3DDirty = false;
	}

	protected _updateProperties():void
	{
		this._propertiesDirty = false;
	}


	public get frustumPlanes():Array<Plane3D>
	{
		if (this._frustumPlanesDirty)
			this._updateFrustumPlanes();

		return this._frustumPlanes;
	}

	private _updateFrustumPlanes():void
	{
		this._frustumPlanesDirty = false;

		if (!this._frustumPlanes) {
			this._frustumPlanes = [];

			for (var i:number = 0; i < 6; ++i)
				this._frustumPlanes[i] = new Plane3D();
		}

		var a:number, b:number, c:number;
		//var d : Number;
		var c11:number, c12:number, c13:number, c14:number;
		var c21:number, c22:number, c23:number, c24:number;
		var c31:number, c32:number, c33:number, c34:number;
		var c41:number, c42:number, c43:number, c44:number;
		var p:Plane3D;
		var raw:Float32Array = this.viewMatrix3D._rawData;
		var invLen:number;

		c11 = raw[0];
		c12 = raw[4];
		c13 = raw[8];
		c14 = raw[12];
		c21 = raw[1];
		c22 = raw[5];
		c23 = raw[9];
		c24 = raw[13];
		c31 = raw[2];
		c32 = raw[6];
		c33 = raw[10];
		c34 = raw[14];
		c41 = raw[3];
		c42 = raw[7];
		c43 = raw[11];
		c44 = raw[15];

		// left plane
		p = this._frustumPlanes[0];
		a = c41 + c11;
		b = c42 + c12;
		c = c43 + c13;
		invLen = 1/Math.sqrt(a*a + b*b + c*c);
		p.a = a*invLen;
		p.b = b*invLen;
		p.c = c*invLen;
		p.d = -(c44 + c14)*invLen;

		// right plane
		p = this._frustumPlanes[1];
		a = c41 - c11;
		b = c42 - c12;
		c = c43 - c13;
		invLen = 1/Math.sqrt(a*a + b*b + c*c);
		p.a = a*invLen;
		p.b = b*invLen;
		p.c = c*invLen;
		p.d = (c14 - c44)*invLen;

		// bottom
		p = this._frustumPlanes[2];
		a = c41 + c21;
		b = c42 + c22;
		c = c43 + c23;
		invLen = 1/Math.sqrt(a*a + b*b + c*c);
		p.a = a*invLen;
		p.b = b*invLen;
		p.c = c*invLen;
		p.d = -(c44 + c24)*invLen;

		// top
		p = this._frustumPlanes[3];
		a = c41 - c21;
		b = c42 - c22;
		c = c43 - c23;
		invLen = 1/Math.sqrt(a*a + b*b + c*c);
		p.a = a*invLen;
		p.b = b*invLen;
		p.c = c*invLen;
		p.d = (c24 - c44)*invLen;

		// near
		p = this._frustumPlanes[4];
		a = c31;
		b = c32;
		c = c33;
		invLen = 1/Math.sqrt(a*a + b*b + c*c);
		p.a = a*invLen;
		p.b = b*invLen;
		p.c = c*invLen;
		p.d = -c34*invLen;

		// far
		p = this._frustumPlanes[5];
		a = c41 - c31;
		b = c42 - c32;
		c = c43 - c33;
		invLen = 1/Math.sqrt(a*a + b*b + c*c);
		p.a = a*invLen;
		p.b = b*invLen;
		p.c = c*invLen;
		p.d = (c34 - c44)*invLen;
	}
	
	private _onInvalidateConcatenatedMatrix3D(event:TransformEvent):void
	{
		this._invalidateViewMatrix3D();
	}
	
}