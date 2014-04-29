///<reference path="../_definitions.ts"/>
module away.events
{

	/**
	 * Dispatched to notify changes in a sub geometry object's state.
	 *
	 * @class away.events.SubGeometryEvent
	 * @see away3d.core.base.Geometry
	 */
	export class SubGeometryEvent extends away.events.Event
	{
		/**
		 * Dispatched when a TriangleSubGeometry's index data has been updated.
		 */
		public static INDICES_UPDATED:string = "indicesUpdated";

		/**
		 * Dispatched when a TriangleSubGeometry's vertex data has been updated.
		 */
		public static VERTICES_UPDATED:string = "verticesUpdated";

		private _dataType:string;

		/**
		 * Create a new GeometryEvent
		 * @param type The event type.
		 * @param dataType An optional data type of the vertex data being updated.
		 */
		constructor(type:string, dataType:string = "")
		{
			super(type);
			this._dataType = dataType;
		}

		/**
		 * The data type of the vertex data.
		 */
		public get dataType():string
		{
			return this._dataType;
		}

		/**
		 * Clones the event.
		 *
		 * @return An exact duplicate of the current object.
		 */
		public clone():Event
		{
			return new SubGeometryEvent(this.type, this._dataType);
		}
	}
}
