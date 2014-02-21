///<reference path="../_definitions.ts"/>
/**
 * @module away.events
 */
module away.events
{
	export class DisplayObjectEvent extends Event
	{
		public static VISIBLITY_UPDATED:string = "visiblityUpdated";
		public static SCENETRANSFORM_CHANGED:string = "scenetransformChanged";
		public static SCENE_CHANGED:string = "sceneChanged";
		public static POSITION_CHANGED:string = "positionChanged";
		public static ROTATION_CHANGED:string = "rotationChanged";
		public static SCALE_CHANGED:string = "scaleChanged";

		public object:away.base.DisplayObject;

		constructor(type:string, object:away.base.DisplayObject)
		{
			super(type);
			this.object = object;
		}
	}
}