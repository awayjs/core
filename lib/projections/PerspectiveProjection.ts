import { Vector3D } from '../geom/Vector3D';

import { CoordinateSystem } from './CoordinateSystem';
import { ProjectionBase } from './ProjectionBase';

export class PerspectiveProjection extends ProjectionBase {
	constructor(fieldOfView: number = 60, coordinateSystem: CoordinateSystem = CoordinateSystem.LEFT_HANDED) {
		super(coordinateSystem);

		this.fieldOfView = fieldOfView;
	}

	/**
	 *
	 */
	public get fieldOfView(): number {
		return Math.atan(0.5 / this.scale) * 360 / Math.PI;
	}

	public set fieldOfView(value: number) {
		this.scale = 0.5 / Math.tan(value * Math.PI / 360);
	}

	/**
	 *
	 * @param position
	 * @param target
	 */
	public project(position: Vector3D, target: Vector3D = null): Vector3D {
		const v: Vector3D = this.viewMatrix3D.transformVector(position, target);

		v.x = v.x / v.w;
		v.y = -v.y / v.w;

		//z is remapped to w
		v.z = v.w;
		v.w = 1;

		return v;
	}

	/**
	 *
	 * @param nX
	 * @param nY
	 * @param sZ
	 * @param target
	 */
	public unproject(nX: number, nY: number, sZ: number, target: Vector3D = null): Vector3D {
		if (target == null)
			target = new Vector3D();

		target.x = nX * sZ;
		target.y = -nY * sZ;
		target.z = (this._far + this._near) / (this._far - this._near) * sZ
					- 2 * this._far * this._near / (this._far - this._near);
		target.w = sZ;

		this.inverseViewMatrix3D.transformVector(target, target);

		target.w = 1;

		return target;
	}

	/**
	 *
	 * @returns {PerspectiveProjection}
	 */
	public clone(): ProjectionBase {
		const clone: PerspectiveProjection = new PerspectiveProjection(this.fieldOfView, this._coordinateSystem);

		clone._near = this._near;
		clone._far = this._far;
		clone._coordinateSystem = this._coordinateSystem;

		return clone;
	}

	/**
	 *
	 * @private
	 */
	protected _updateFrustumMatrix3D(): void {
		super._updateFrustumMatrix3D();

		const raw: Float32Array = this._frustumMatrix3D._rawData;

		const scaleV: number = this._scale;
		const scaleH: number = this._scale / this._ratio;

		this._frustumRect.left = 0.5 * (this._originX - 1) / scaleH;
		this._frustumRect.top = 0.5 * (this._originY - 1) / scaleV;

		this._frustumRect.right = this._frustumRect.left + 1 / scaleH;
		this._frustumRect.bottom = this._frustumRect.top + 1 / scaleV;

		raw[0] = 2 * scaleH; //2/(right - left);
		raw[5] = 2 * scaleV; //2/(bottom - top);
		raw[8] = this._originX; //(right + left)/(right - left)
		raw[9] = this._originY; //(bottom + top)/(bottom - top);
		raw[10] = (this._far + this._near) / (this._far - this._near);
		raw[11] = 1;
		raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[12] = raw[13] = raw[15] = 0;
		raw[14] = -2 * this._far * this._near / (this._far - this._near);

		if (this._coordinateSystem == CoordinateSystem.RIGHT_HANDED)
			raw[5] = -raw[5];

		this._frustumMatrix3D.invalidatePosition();
	}

	protected _updateProperties(): void {
		super._updateProperties();

		const rawData: Float32Array = this._frustumMatrix3D._rawData;

		this._near = rawData[14] / (-1 - rawData[10]);
		this._far = rawData[14] / (1 - rawData[10]);
		this._scale = rawData[5] / 2;
		this._ratio = 0.5 * this._scale / rawData[0];
		this._originX = rawData[8];
		this._originY = rawData[9];
	}
}