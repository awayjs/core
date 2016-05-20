import {ErrorBase}				from "../errors/ErrorBase";

/**
 * RangeError is thrown when an index is accessed out of range of the number of
 * available indices on an Array.
 */
export class RangeError extends ErrorBase
{
	/**
	 * Create a new RangeError.
	 *
	 * @param message An optional message to override the default error message.
	 * @param id The id of the error.
	 */
	constructor(message:string = null, id:number = 0)
	{
		super(message || "RangeError", id);
	}
}