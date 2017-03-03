import {Transform} from "../base/Transform";
import {Matrix3D} from "../geom/Matrix3D";

import {PerspectiveProjection} from "./PerspectiveProjection";
import {ProjectionBase} from "./ProjectionBase";

export class FreeMatrixProjection extends ProjectionBase
{
	constructor()
	{
		super();

		this._frustumMatrix3D.copyFrom(new PerspectiveProjection().frustumMatrix3D);
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

		this._invalidateFrustumMatrix3D();
	}

	//@override
	public clone():FreeMatrixProjection
	{
		var clone:FreeMatrixProjection = new FreeMatrixProjection();
		clone.transform = this._transform.clone();
		clone.frustumMatrix3D.copyFrom(this._frustumMatrix3D);
		return clone;
	}
}