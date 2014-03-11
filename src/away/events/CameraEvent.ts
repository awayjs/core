///<reference path="../_definitions.ts"/>

/**
 * @module away.events
 */
module away.events
{
	/**
	 * @class away.events.CameraEvent
	 */
	export class CameraEvent extends away.events.Event
	{
		public static PROJECTION_CHANGED:string = "projectionChanged";

		private _camera:away.entities.Camera;

		constructor(type:string, camera:away.entities.Camera)
		{
			super(type);

			this._camera = camera;
		}

		public get camera():away.entities.Camera
		{
			return this._camera;
		}
	}
}