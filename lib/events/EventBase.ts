export class EventBase
{
	/**
	 * Type of event
	 * @property type
	 * @type String
	 */
	public type:string = undefined;

	/**
	 * Reference to target object
	 * @property target
	 * @type Object
	 */
	public target:any = undefined;

	constructor(type:string)
	{
		this.type = type;
	}

	/**
	 * Clones the current event.
	 * @return An exact duplicate of the current event.
	 */
	public clone():EventBase
	{
		return new EventBase(this.type);
	}
}