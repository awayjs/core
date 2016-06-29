import { ErrorBase } from "../errors/ErrorBase";
/**
 * AbstractMethodError is thrown when an abstract method is called. The method in question should be overridden
 * by a concrete subclass.
 */
export declare class AbstractMethodError extends ErrorBase {
    /**
     * Create a new AbstractMethodError.
     * @param message An optional message to override the default error message.
     * @param id The id of the error.
     */
    constructor(message?: string, id?: number);
}
