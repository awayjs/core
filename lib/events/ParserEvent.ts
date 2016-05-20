import {EventBase}				from "../events/EventBase";

export class ParserEvent extends EventBase
{
	private _message:string;

	/**
	 * Dispatched when parsing of an asset completed.
	 */
	public static PARSE_COMPLETE:string = 'parseComplete';

	/**
	 * Dispatched when an error occurs while parsing the data (e.g. because it's
	 * incorrectly formatted.)
	 */
	public static PARSE_ERROR:string = 'parseError';


	/**
	 * Dispatched when a parser is ready to have dependencies retrieved and resolved.
	 * This is an internal event that should rarely (if ever) be listened for by
	 * external classes.
	 */
	public static READY_FOR_DEPENDENCIES:string = 'readyForDependencies';


	constructor(type:string, message:string = '')
	{
		super(type);

		this._message = message;
	}


	/**
	 * Additional human-readable message. Usually supplied for ParserEvent.PARSE_ERROR events.
	 */
	public get message():string
	{
		return this._message;
	}


	public clone():ParserEvent
	{
		return new ParserEvent(this.type, this._message);
	}
}