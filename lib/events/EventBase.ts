export class EventBase {
	/**
	 * Type of event
	 * @property type
	 * @type String
	 */
	public type: string;

	/**
	 * Reference to target object
	 * @property target
	 * @type Object
	 */
	public target: any;

	/**
	 * Reference to currentTarget object
	 * @property currentTarget
	 * @type Object
	 */
	 public currentTarget: any;

	constructor(type: string) {
		this.type = type;
	}

	/**
	 * Clones the current event.
	 * @return An exact duplicate of the current event.
	 */
	public clone(): EventBase {
		return new EventBase(this.type);
	}

	public _iAllowedToPropagate: boolean = true;
	public _iAllowedToImmediatlyPropagate: boolean = true;
}