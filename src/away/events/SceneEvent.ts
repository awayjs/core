///<reference path="../_definitions.ts"/>

/**
 * @module away.events
 */
module away.events
{
	export class SceneEvent extends away.events.Event
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
		public displayObject:away.base.DisplayObject;

		constructor(type:string, displayObject:away.base.DisplayObject)
		{
			this.displayObject = displayObject;
			super(type);
		}
	}
}