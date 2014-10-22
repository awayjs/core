import DisplayObject			= require("awayjs-core/lib/core/base/DisplayObject");
import AbstractMethodError		= require("awayjs-core/lib/errors/AbstractMethodError");

class ControllerBase
{

	public _pAutoUpdate:boolean = true;
	public _pTargetObject:DisplayObject;

	constructor(targetObject:DisplayObject = null)
	{
		this.targetObject = targetObject;
	}

	public pNotifyUpdate()
	{
		if (this._pTargetObject && this._pTargetObject._iAssignedPartition && this._pAutoUpdate) {
			this._pTargetObject._iAssignedPartition.iMarkForUpdate(this._pTargetObject);
		}
	}

	public get targetObject():DisplayObject
	{
		return this._pTargetObject;
	}

	public set targetObject(val:DisplayObject)
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
		throw new AbstractMethodError();
	}
}

export = ControllerBase;