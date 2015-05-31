import AttributesView			= require("awayjs-core/lib/attributes/AttributesView");
import Event					= require("awayjs-core/lib/events/Event");

/**
 * Dispatched to notify changes in a sub geometry object's state.
 *
 * @class away.events.SubGeometryEvent
 * @see away.core.base.Geometry
 */
class SubGeometryEvent extends Event
{
	/**
	 * Dispatched when a SubGeometry's index data has been updated.
	 */
	public static INDICES_UPDATED:string = "indicesUpdated";

	/**
	 * Dispatched when a SubGeometry's index data has been disposed.
	 */
	public static INDICES_DISPOSED:string = "indicesDisposed";
	
	/**
	 * Dispatched when a SubGeometry's vertex data has been updated.
	 */
	public static VERTICES_UPDATED:string = "verticesUpdated";

	/**
	 * Dispatched when a SubGeometry's vertex data has been disposed.
	 */
	public static VERTICES_DISPOSED:string = "verticesDisposed";

	
	private _attributesView:AttributesView;

	/**
	 * Create a new GeometryEvent
	 * @param type The event type.
	 * @param attributesView An optional data type of the vertex data being updated.
	 */
	constructor(type:string, attributesView:AttributesView)
	{
		super(type);

		this._attributesView = attributesView;
	}

	/**
	 * The attributes view of the vertex data.
	 */
	public get attributesView():AttributesView
	{
		return this._attributesView;
	}

	/**
	 * Clones the event.
	 *
	 * @return An exact duplicate of the current object.
	 */
	public clone():Event
	{
		return new SubGeometryEvent(this.type, this._attributesView);
	}
}

export = SubGeometryEvent;