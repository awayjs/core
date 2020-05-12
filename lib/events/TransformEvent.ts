import {Transform} from "../base/Transform";

import {EventBase} from "./EventBase";

export class TransformEvent extends EventBase
{
	private _transform:Transform;

	/**
	 *
	 */
	public static INVALIDATE_MATRIX3D:string = "invalidateMatrix3D";

	/**
	 *
	 */
	public static INVALIDATE_CONCATENATED_MATRIX3D:string = "invalidateConcatenatedMatrix3D";

	/**
	 *
	 */
	public static UPDATE_CONCATENATED_MATRIX3D:string = "updateConcatenatedMatrix3D";

	/**
	 *
	 */
	public static INVALIDATE_COLOR_TRANSFORM:string = "invalidateColorTransform";

	/**
	 *
	 * @returns {Transform}
	 */
	public get transform():Transform
	{
		return this._transform;
	}

	constructor(type:string, transform:Transform)
	{
		super(type);

		this._transform = transform;
	}

	/**
	 * Clones the event.
	 * @return An exact duplicate of the current object.
	 */
	public clone():TransformEvent
	{
		return new TransformEvent(this.type, this._transform);
	}
}