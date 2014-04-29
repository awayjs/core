///<reference path="../_definitions.ts" />

module away.controllers
{
	export class ControllerBase
	{

		public _pAutoUpdate:boolean = true;
		public _pTargetObject:away.base.DisplayObject;

		constructor(targetObject:away.base.DisplayObject = null)
		{
			this.targetObject = targetObject;
		}

		public pNotifyUpdate()
		{
			if (this._pTargetObject && this._pTargetObject._iAssignedPartition && this._pAutoUpdate) {
				this._pTargetObject._iAssignedPartition.iMarkForUpdate(this._pTargetObject);
			}
		}

		public get targetObject():away.base.DisplayObject
		{
			return this._pTargetObject;
		}

		public set targetObject(val:away.base.DisplayObject)
		{
			if (this._pTargetObject == val) {
				return;
			}

			if (this._pTargetObject && this._pAutoUpdate) {
				this._pTargetObject._iController = null;
			}
			this._pTargetObject = val;

			if (this._pTargetObject && this._pAutoUpdate) {
				this._pTargetObject._iController = this;
			}
			this.pNotifyUpdate();
		}

		public get autoUpdate():boolean
		{
			return this._pAutoUpdate;
		}

		public set autoUpdate(val:boolean)
		{
			if (this._pAutoUpdate == val) {
				return;
			}
			this._pAutoUpdate = val;

			if (this._pTargetObject) {
				if (this._pTargetObject) {
					this._pTargetObject._iController = this;
				} else {
					this._pTargetObject._iController = null;
				}
			}
		}

		public update(interpolate:boolean = true)
		{
			throw new away.errors.AbstractMethodError();
		}
	}
}