import {EventBase} from "../events/EventBase";
import {ProjectionBase} from "../projections/ProjectionBase";

export class ProjectionEvent extends EventBase
{
	public static MATRIX_CHANGED:string = "matrixChanged";

	private _projection:ProjectionBase;

	constructor(type:string, projection:ProjectionBase)
	{
		super(type);
		this._projection = projection;
	}

	public get projection():ProjectionBase
	{
		return this._projection;
	}
}