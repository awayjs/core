///<reference path="../_definitions.ts" />

module away.controllers
{
	export class LookAtController extends away.controllers.ControllerBase
	{
		public _pLookAtPosition:away.geom.Vector3D;
		public _pLookAtObject:away.base.DisplayObject;
		public _pOrigin:away.geom.Vector3D = new away.geom.Vector3D(0.0, 0.0, 0.0);

		private _onLookAtObjectChangedDelegate:Function;

		constructor(targetObject:away.entities.IEntity = null, lookAtObject:away.base.DisplayObject = null)
		{
			super(targetObject);

			this._onLookAtObjectChangedDelegate = away.utils.Delegate.create(this, this.onLookAtObjectChanged);

			if (lookAtObject) {
				this.lookAtObject = lookAtObject;
			} else {
				this.lookAtPosition = new away.geom.Vector3D();
			}
		}

		public get lookAtPosition():away.geom.Vector3D
		{
			return this._pLookAtPosition;
		}

		public set lookAtPosition(val:away.geom.Vector3D)
		{
			if (this._pLookAtObject) {
				this._pLookAtObject.removeEventListener(away.events.DisplayObjectEvent.SCENETRANSFORM_CHANGED, this._onLookAtObjectChangedDelegate);
				this._pLookAtObject = null;
			}

			this._pLookAtPosition = val;
			this.pNotifyUpdate();
		}

		public get lookAtObject():away.base.DisplayObject
		{
			return this._pLookAtObject;
		}

		public set lookAtObject(val:away.base.DisplayObject)
		{
			if (this._pLookAtPosition) {
				this._pLookAtPosition = null;
			}

			if (this._pLookAtObject == val) {
				return;
			}

			if (this._pLookAtObject) {
				this._pLookAtObject.removeEventListener(away.events.DisplayObjectEvent.SCENETRANSFORM_CHANGED, this._onLookAtObjectChangedDelegate);
			}
			this._pLookAtObject = val;

			if (this._pLookAtObject) {
				this._pLookAtObject.addEventListener(away.events.DisplayObjectEvent.SCENETRANSFORM_CHANGED, this._onLookAtObjectChangedDelegate);
			}

			this.pNotifyUpdate();
		}

		//@override
		public update(interpolate:boolean = true)
		{
			if (this._pTargetObject) {
				if (this._pLookAtPosition)
					this._pTargetObject.lookAt(this._pLookAtPosition);
				else if (this._pLookAtObject)
					this._pTargetObject.lookAt(this._pLookAtObject.scene? this._pLookAtObject.scenePosition : this._pLookAtObject.transform.position);
			}
		}

		private onLookAtObjectChanged(event:away.events.DisplayObjectEvent)
		{
			this.pNotifyUpdate();
		}

	}
}