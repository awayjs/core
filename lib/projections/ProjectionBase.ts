import { Transform } from '../base/Transform';
import { Matrix3D } from '../geom/Matrix3D';
import { Vector3D } from '../geom/Vector3D';
import { EventDispatcher } from '../events/EventDispatcher';
import { ProjectionEvent } from '../events/ProjectionEvent';
import { TransformEvent } from '../events/TransformEvent';
import { AbstractMethodError } from '../errors/AbstractMethodError';

import { CoordinateSystem } from './CoordinateSystem';
import { Rectangle } from '../geom/Rectangle';
import { Plane3D } from '../geom/Plane3D';

export class ProjectionBase extends EventDispatcher {
	protected _viewMatrix3D: Matrix3D = new Matrix3D();
	protected _inverseViewMatrix3D: Matrix3D = new Matrix3D();
	protected _frustumMatrix3D: Matrix3D = new Matrix3D();
	protected _near: number = 20;
	protected _far: number = 3000;
	protected _scale: number = 1;
	protected _ratio: number = 1;
	protected _transform: Transform;
	protected _coordinateSystem: CoordinateSystem;
	protected _originX: number = 0;
	protected _originY: number = 0;
	protected _frustumRect: Rectangle = new Rectangle();
	private _viewFrustumCorners: number[] = [];
	private _viewFrustumPlanes: Array<Plane3D>;

	private _propertiesDirty: boolean;
	private _viewMatrix3DDirty: boolean = true;
	private _inverseViewMatrix3DDirty: boolean = true;
	protected _frustumMatrix3DDirty: boolean = true;
	private _viewFrustumCornersDirty: boolean = true;
	private _viewFrustumPlanesDirty: boolean = true;
	private _onInvalidateConcatenatedMatrix3DDelegate: (event: TransformEvent) => void;

	constructor(coordinateSystem: CoordinateSystem = CoordinateSystem.LEFT_HANDED) {
		super();

		this._coordinateSystem = coordinateSystem;

		this._onInvalidateConcatenatedMatrix3DDelegate =
			(event: TransformEvent) => this._onInvalidateConcatenatedMatrix3D(event);
	}

	public get transform(): Transform {
		if (!this._transform)
			this.transform = new Transform();

		return this._transform;
	}

	public set transform(value: Transform) {
		if (this._transform == value)
			return;

		if (this._transform)
			this._transform.removeEventListener(TransformEvent.INVALIDATE_MATRIX3D,
				this._onInvalidateConcatenatedMatrix3DDelegate);

		this._transform = value;

		if (this._transform)
			this._transform.addEventListener(TransformEvent.INVALIDATE_MATRIX3D,
				this._onInvalidateConcatenatedMatrix3DDelegate);

		this._invalidateViewMatrix3D();
	}

	/**
	 * The handedness of the coordinate system projection. The default is LEFT_HANDED.
	 */
	public get coordinateSystem(): CoordinateSystem {
		return this._coordinateSystem;
	}

	public set coordinateSystem(value: CoordinateSystem) {
		if (this._coordinateSystem == value)
			return;

		this._coordinateSystem = value;

		this._invalidateFrustumMatrix3D();
	}

	/**
	 *
	 */
	public get scale(): number {
		if (this._propertiesDirty)
			this._updateProperties();

		return this._scale;
	}

	public set scale(value: number) {
		if (this._scale == value)
			return;

		this._scale = value;

		this._invalidateFrustumMatrix3D();
	}

	/**
	 *
	 */
	public get ratio(): number {
		if (this._propertiesDirty)
			this._updateProperties();

		return this._ratio;
	}

	public set ratio(value: number) {
		if (this._ratio == value)
			return;

		this._ratio = value;

		this._invalidateFrustumMatrix3D();
	}

	/**
	 *
	 * @returns {Matrix3D}
	 */
	public get frustumMatrix3D(): Matrix3D {
		if (this._frustumMatrix3DDirty)
			this._updateFrustumMatrix3D();

		return this._frustumMatrix3D;
	}

	public set frustumMatrix3D(value: Matrix3D) {
		this._frustumMatrix3D = value;

		this._invalidateViewMatrix3D();
		this._invalidateProperties();
	}

	/**
	 *
	 * @returns {number[]}
	 */
	public get viewFrustumCorners(): number[] {
		if (this._viewFrustumCornersDirty) {
			this._viewFrustumCornersDirty = false;

			if (this._frustumMatrix3DDirty)
				this._updateFrustumMatrix3D();

			const left: number = this._frustumRect.left;
			const right: number = this._frustumRect.right;
			const top: number = this._frustumRect.top;
			const bottom: number = this._frustumRect.bottom;

			if (this._propertiesDirty)
				this._updateProperties();

			const near: number = this._near;
			const far: number = this._far;
			const vfc: number[] = this._viewFrustumCorners;

			vfc[0] = vfc[9] = near * left;
			vfc[3] = vfc[6] = near * right;
			vfc[1] = vfc[4] = near * top;
			vfc[7] = vfc[10] = near * bottom;

			vfc[12] = vfc[21] = far * left;
			vfc[15] = vfc[18] = far * right;
			vfc[13] = vfc[16] = far * top;
			vfc[19] = vfc[22] = far * bottom;

			vfc[2] = vfc[5] = vfc[8] = vfc[11] = near;
			vfc[14] = vfc[17] = vfc[20] = vfc[23] = far;

			if (this._transform)
				this._transform.matrix3D.transformVectors(vfc, vfc);
		}

		return this._viewFrustumCorners;
	}

	/**
	 *
	 */
	public get viewFrustumPlanes(): Array<Plane3D> {
		if (this._viewFrustumPlanesDirty) {
			this._viewFrustumPlanesDirty = false;

			if (!this._viewFrustumPlanes) {
				this._viewFrustumPlanes = [];

				for (let i: number = 0; i < 6; ++i)
					this._viewFrustumPlanes[i] = new Plane3D();
			}

			const raw: Float32Array = this.viewMatrix3D._rawData;
			let invLen: number;

			const c11: number = raw[0], c12: number = raw[4], c13: number = raw[8], c14: number = raw[12];
			const c21: number = raw[1], c22: number = raw[5], c23: number = raw[9], c24: number = raw[13];
			const c31: number = raw[2], c32: number = raw[6], c33: number = raw[10], c34: number = raw[14];
			const c41: number = raw[3], c42: number = raw[7], c43: number = raw[11], c44: number = raw[15];

			let a: number, b: number, c: number, p: Plane3D;

			// left plane
			p = this._viewFrustumPlanes[0];
			a = c41 + c11;
			b = c42 + c12;
			c = c43 + c13;
			invLen = 1 / Math.sqrt(a * a + b * b + c * c);
			p.a = a * invLen;
			p.b = b * invLen;
			p.c = c * invLen;
			p.d = -(c44 + c14) * invLen;

			// right plane
			p = this._viewFrustumPlanes[1];
			a = c41 - c11;
			b = c42 - c12;
			c = c43 - c13;
			invLen = 1 / Math.sqrt(a * a + b * b + c * c);
			p.a = a * invLen;
			p.b = b * invLen;
			p.c = c * invLen;
			p.d = (c14 - c44) * invLen;

			// bottom
			p = this._viewFrustumPlanes[2];
			a = c41 + c21;
			b = c42 + c22;
			c = c43 + c23;
			invLen = 1 / Math.sqrt(a * a + b * b + c * c);
			p.a = a * invLen;
			p.b = b * invLen;
			p.c = c * invLen;
			p.d = -(c44 + c24) * invLen;

			// top
			p = this._viewFrustumPlanes[3];
			a = c41 - c21;
			b = c42 - c22;
			c = c43 - c23;
			invLen = 1 / Math.sqrt(a * a + b * b + c * c);
			p.a = a * invLen;
			p.b = b * invLen;
			p.c = c * invLen;
			p.d = (c24 - c44) * invLen;

			// near
			p = this._viewFrustumPlanes[4];
			a = c31;
			b = c32;
			c = c33;
			invLen = 1 / Math.sqrt(a * a + b * b + c * c);
			p.a = a * invLen;
			p.b = b * invLen;
			p.c = c * invLen;
			p.d = -c34 * invLen;

			// far
			p = this._viewFrustumPlanes[5];
			a = c41 - c31;
			b = c42 - c32;
			c = c43 - c33;
			invLen = 1 / Math.sqrt(a * a + b * b + c * c);
			p.a = a * invLen;
			p.b = b * invLen;
			p.c = c * invLen;
			p.d = (c34 - c44) * invLen;
		}

		return this._viewFrustumPlanes;
	}

	/**
	 *
	 * @returns {number}
	 */
	public get near(): number {
		if (this._propertiesDirty)
			this._updateProperties();

		return this._near;
	}

	public set near(value: number) {
		if (value == this._near)
			return;

		this._near = value;

		this._invalidateFrustumMatrix3D();
	}

	/**
	 *
	 * @returns {number}
	 */
	public get originX(): number {
		if (this._propertiesDirty)
			this._updateProperties();

		return this._originX;
	}

	public set originX(value: number) {
		if (this._originX == value)
			return;

		this._originX = value;

		this._invalidateFrustumMatrix3D();
	}

	/**
	 *
	 * @returns {number}
	 */
	public get originY(): number {
		if (this._propertiesDirty)
			this._updateProperties();

		return this._originY;
	}

	public set originY(value: number) {
		if (this._originY == value)
			return;

		this._originY = value;

		this._invalidateFrustumMatrix3D();
	}

	/**
	 *
	 * @returns {number}
	 */
	public get far(): number {
		if (this._propertiesDirty)
			this._updateProperties();

		return this._far;
	}

	public set far(value: number) {
		if (value == this._far)
			return;

		this._far = value;

		this._invalidateFrustumMatrix3D();
	}

	public get frustumRect(): Rectangle {
		if (this._frustumMatrix3DDirty)
			this._updateFrustumMatrix3D();

		return this._frustumRect;
	}

	/**
	 *
	 * @param position
	 * @param target
	 */
	public project(position: Vector3D, target: Vector3D = null): Vector3D {
		throw new AbstractMethodError();
	}

	/**
	 *
	 * @param nX
	 * @param nY
	 * @param sZ
	 * @param target
	 */
	public unproject(nX: number, nY: number, sZ: number, target: Vector3D = null): Vector3D {
		throw new AbstractMethodError();
	}

	public get viewMatrix3D(): Matrix3D {
		if (this._viewMatrix3DDirty) {
			this._viewMatrix3DDirty = false;

			if (this._transform) {
				this._viewMatrix3D.copyFrom(this._transform.inverseMatrix3D);
				this._viewMatrix3D.append(this.frustumMatrix3D);
			} else {
				this._viewMatrix3D.copyFrom(this.frustumMatrix3D);
			}
		}

		return this._viewMatrix3D;
	}

	public get inverseViewMatrix3D(): Matrix3D {
		if (this._inverseViewMatrix3DDirty) {
			this._inverseViewMatrix3DDirty = false;
			this._inverseViewMatrix3D.copyFrom(this.viewMatrix3D);
			this._inverseViewMatrix3D.invert();
		}

		return this._inverseViewMatrix3D;
	}

	public clone(): ProjectionBase {
		throw new AbstractMethodError();
	}

	private _invalidateProperties(): void {
		this._propertiesDirty = true;
	}

	private _invalidateViewMatrix3D(): void {
		this._viewMatrix3DDirty = true;
		this._inverseViewMatrix3DDirty = true;
		this._viewFrustumCornersDirty = true;
		this._viewFrustumPlanesDirty = true;

		this.dispatchEvent(new ProjectionEvent(ProjectionEvent.INVALIDATE_VIEW_MATRIX3D, this));
	}

	protected _invalidateFrustumMatrix3D(): void {
		if (this._propertiesDirty)
			this._updateProperties();

		this._frustumMatrix3DDirty = true;

		this.dispatchEvent(new ProjectionEvent(ProjectionEvent.INVALIDATE_FRUSTUM_MATRIX3D, this));

		this._invalidateViewMatrix3D();
	}

	protected _updateFrustumMatrix3D(): void {
		this._frustumMatrix3DDirty = false;
	}

	protected _updateProperties(): void {
		this._propertiesDirty = false;
	}

	private _onInvalidateConcatenatedMatrix3D(event: TransformEvent): void {
		this._invalidateViewMatrix3D();
	}
}