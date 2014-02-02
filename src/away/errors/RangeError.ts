///<reference path="../_definitions.ts"/>

module away.errors
{


	/**
	 * RangeError is thrown when an index is accessed out of range of the number of
	 * available indices on an Array.
	 */
	export class RangeError extends away.errors.Error
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
}
