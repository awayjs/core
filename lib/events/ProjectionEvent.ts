import Event					= require("awayjs-core/lib/events/Event");
import IProjection				= require("awayjs-core/lib/projections/IProjection");

class ProjectionEvent extends Event
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

export = ProjectionEvent;