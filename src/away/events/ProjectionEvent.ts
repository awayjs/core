///<reference path="../_definitions.ts"/>
/**
 * @module away.events
 */
module away.events
{
	export class ProjectionEvent extends away.events.Event
	{
		public static MATRIX_CHANGED:string = "matrixChanged";

		private _projection:away.projections.IProjection;

		constructor(type:string, projection:away.projections.IProjection)
		{
			super(type);
			this._projection = projection;
		}

		public get projection():away.projections.IProjection
		{
			return this._projection;
		}
	}
}