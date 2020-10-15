import { Matrix3D } from '../geom/Matrix3D';
import { Plane3D } from '../geom/Plane3D';
import { Vector3D } from '../geom/Vector3D';
import { ProjectionEvent } from '../events/ProjectionEvent';
import { ProjectionBase } from '../projections/ProjectionBase';

export class ObliqueNearPlaneProjection extends ProjectionBase {

	private _baseProjection: ProjectionBase;
	private _plane: Plane3D;
	private _onProjectionMatrixChangedDelegate: (event: ProjectionEvent) => void;

	constructor(baseProjection: ProjectionBase, plane: Plane3D) {
		super();

		this.baseProjection = baseProjection;
		this.plane = plane;

		this._onProjectionMatrixChangedDelegate = (event: ProjectionEvent) => this.onProjectionMatrixChanged(event);
	}

	//@override
	public get near(): number {
		return this._baseProjection.near;
	}

	//@override
	public set near(value: number) {
		this._baseProjection.near = value;
	}

	//@override
	public get far(): number {
		return this._baseProjection.far;
	}

	//@override
	public set far(value: number) {
		this._baseProjection.far = value;
	}

	public get plane(): Plane3D {
		return this._plane;
	}

	public set plane(value: Plane3D) {
		this._plane = value;

		this._invalidateFrustumMatrix3D();
	}

	public set baseProjection(value: ProjectionBase) {
		if (this._baseProjection)
			this._baseProjection.removeEventListener(ProjectionEvent.INVALIDATE_FRUSTUM_MATRIX3D, this._onProjectionMatrixChangedDelegate);

		this._baseProjection = value;

		if (this._baseProjection)
			this._baseProjection.addEventListener(ProjectionEvent.INVALIDATE_FRUSTUM_MATRIX3D, this._onProjectionMatrixChangedDelegate);

		this._invalidateFrustumMatrix3D();
	}

	private onProjectionMatrixChanged(event: ProjectionEvent): void {
		this._invalidateFrustumMatrix3D();
	}

	//@override
	public _updateFrustumMatrix3D(): void {
		super._updateFrustumMatrix3D();

		this._frustumMatrix3D.copyFrom(this._baseProjection.frustumMatrix3D);

		const cx: number = this._plane.a;
		const cy: number = this._plane.b;
		const cz: number = this._plane.c;
		const cw: number = -this._plane.d + .05;
		const signX: number = cx >= 0 ? 1 : -1;
		const signY: number = cy >= 0 ? 1 : -1;
		const p: Vector3D = new Vector3D(signX, signY, 1, 1);
		const inverse: Matrix3D = this._frustumMatrix3D.clone();
		inverse.invert();
		const q: Vector3D = inverse.transformVector(p);
		this._frustumMatrix3D.copyRowTo(3, p);
		const a: number = (q.x * p.x + q.y * p.y + q.z * p.z + q.w * p.w) / (cx * q.x + cy * q.y + cz * q.z + cw * q.w);
		this._frustumMatrix3D.copyRowFrom(2, new Vector3D(cx * a, cy * a, cz * a, cw * a));
	}
}