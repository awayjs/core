import Error					= require("awayjs-core/lib/errors/Error");

/**
 * RangeError is thrown when an index is accessed out of range of the number of
 * available indices on an Array.
 */
class RangeError extends Error
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

export = RangeError;