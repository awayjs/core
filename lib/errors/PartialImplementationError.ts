import {ErrorBase}				from "../errors/ErrorBase";

/**
 * AbstractMethodError is thrown when an abstract method is called. The method in question should be overridden
 * by a concrete subclass.
 */
export class PartialImplementationError extends ErrorBase
{
	/**
	 * Create a new AbstractMethodError.
	 * @param message An optional message to override the default error message.
	 * @param id The id of the error.
	 */
	constructor(dependency:string = '', id:number = 0)
	{
		super("PartialImplementationError - this function is in development. Required Dependency: " + dependency, id);
	}
}