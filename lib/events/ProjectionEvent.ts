import {EventBase}				from "../events/EventBase";
import {IProjection}				from "../projections/IProjection";

export class ProjectionEvent extends EventBase
{
	public static MATRIX_CHANGED:string = "matrixChanged";

	private _projection:IProjection;

	constructor(type:string, projection:IProjection)
	{
		super(type);
		this._projection = projection;
	}

	public get projection():IProjection
	{
		return this._projection;
	}
}