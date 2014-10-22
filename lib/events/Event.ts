class Event
{

	public static COMPLETE:string = 'complete';
	public static OPEN:string = 'open';

	public static ENTER_FRAME:string = 'enterFrame';
	public static EXIT_FRAME:string = 'exitFrame';


	public static RESIZE:string = "resize";
	public static ERROR:string = "error";
	public static CHANGE:string = "change";

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
	public clone():Event
	{
		return new Event(this.type);
	}
}

export = Event;