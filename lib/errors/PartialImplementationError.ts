import { ErrorBase } from './ErrorBase';

/**
 * PartialImplementationError is thrown when function was called that is not implemented yet.
 * it should never be used directly, but only by using Debug.throwPIR function
 */
export class PartialImplementationError extends ErrorBase {
	/**
	 * Create a new AbstractMethodError.
	 * @param message An optional message to override the default error message.
	 * @param id The id of the error.
	 */
	constructor(dependency: string = '', id: number = 0) {
		super('PartialImplementationError - this function is in development. Required Dependency: ' + dependency, id);
	}
}