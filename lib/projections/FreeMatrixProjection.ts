import {PerspectiveProjection}	from "../projections/PerspectiveProjection";
import {ProjectionBase}			from "../projections/ProjectionBase";

export class FreeMatrixProjection extends ProjectionBase
{
	constructor()
	{
		super();

		this._pMatrix.copyFrom(new PerspectiveProjection().matrix);
	}

	//@override
	public set near(value:number)
	{
		this._pNear = value;
	}

	//@override
	public set far(value:number)
	{
		this._pFar = value;
	}

	//@override
	public set iAspectRatio(value:number)
	{
		this._pAspectRatio = value;
	}

	//@override
	public clone():ProjectionBase
	{
		var clone:FreeMatrixProjection = new FreeMatrixProjection();
		clone._pMatrix.copyFrom(this._pMatrix);
		clone._pNear = this._pNear;
		clone._pFar = this._pFar;
		clone._pAspectRatio = this._pAspectRatio;
		clone.pInvalidateMatrix();
		return clone;
	}

	//@override
	public pUpdateMatrix():void
	{
		this._pMatrixInvalid = false;
	}
}