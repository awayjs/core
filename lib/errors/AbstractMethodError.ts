import ErrorBase				= require("awayjs-core/lib/errors/ErrorBase");

/**
 * AbstractMethodError is thrown when an abstract method is called. The method in question should be overridden
 * by a concrete subclass.
 */
class AbstractMethodError extends ErrorBase
{
	/**
	 * Create a new AbstractMethodError.
	 * @param message An optional message to override the default error message.
	 * @param id The id of the error.
	 */
	constructor(message:string = null, id:number = 0)
	{
		super(message || "An abstract method was called! Either an instance of an abstract class was created, or an abstract method was not overridden by the subclass.", id);
	}
}

export = AbstractMethodError;