import DisplayObject			= require("awayjs-core/lib/core/base/DisplayObject");
import Event					= require("awayjs-core/lib/events/Event");

class SceneEvent extends Event
{
	/**
	 *
	 */
	public static ADDED_TO_SCENE:string = "addedToScene";

	/**
	 *
	 */
	public static REMOVED_FROM_SCENE:string = "removedFromScene";

	/**
	 *
	 */
	public static PARTITION_CHANGED:string = "partitionChanged";

	/**
	 *
	 */
	public displayObject:DisplayObject;

	constructor(type:string, displayObject:DisplayObject)
	{
		super(type);

		this.displayObject = displayObject;
	}
}

export = SceneEvent;