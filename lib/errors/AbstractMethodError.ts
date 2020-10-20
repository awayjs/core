import { ErrorBase } from './ErrorBase';

const DEFAULT_ERROR = 'An abstract method was called! Either an instance of an abstract export class was created,'
					+ 'or an abstract method was not overridden by the subclass.';

/**
 * AbstractMethodError is thrown when an abstract method is called. The method in question should be overridden
 * by a concrete subclass.
 */
export class AbstractMethodError extends ErrorBase {
	/**
	 * Create a new AbstractMethodError.
	 * @param message An optional message to override the default error message.
	 * @param id The id of the error.
	 */
	constructor(message: string = null, id: number = 0) {
		super(message || DEFAULT_ERROR, id);
	}
}