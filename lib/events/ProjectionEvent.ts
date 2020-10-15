import { ProjectionBase } from '../projections/ProjectionBase';

import { EventBase } from './EventBase';

export class ProjectionEvent extends EventBase {
	public static INVALIDATE_FRUSTUM_MATRIX3D: string = 'invalidateFrustumMatrix3D';

	public static INVALIDATE_VIEW_MATRIX3D: string = 'invalidateViewMatrix3D';

	private _projection: ProjectionBase;

	constructor(type: string, projection: ProjectionBase) {
		super(type);
		this._projection = projection;
	}

	public get projection(): ProjectionBase {
		return this._projection;
	}
}