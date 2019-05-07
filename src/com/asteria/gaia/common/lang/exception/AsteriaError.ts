import { AsteriaErrorCode } from './AsteriaErrorCode';
import { CommonChar } from '../util/CommonChar';
import { AbstractAsteriaObject } from '../AbstractAsteriaObject';

/**
 * The <code>AsteriaError</code> class represents an error in an Asteria environment.
 */
export class AsteriaError extends AbstractAsteriaObject {

    /**
     * Create a new <code>AsteriaError</code> instance.
     * 
     * @param {AsteriaErrorCode} code the code reference for this error.
     * @param {string} className the fully qualified class name of the object wher the error is encountered.
     * @param {string} message a message that describe this error.
     * @param {string} stack an optional parameter that contains the non-standard trace of which functions were called
     *                       for this error.
     */
    constructor(code: AsteriaErrorCode, className: string, message: string, stack?: string) {
        super('com.asteria.gaia.common.lang::AsteriaError');
        this.code = code;
        this.className = className;
        this.message = message;
        this.stack = stack;
    }

    /**
     * The code reference for this error.
     */
    public readonly code: AsteriaErrorCode;

    /**
     * The message that describe this error.
     */
    public readonly message: string;

    /**
     * The fully qualified class name of the object wher the error is encountered.
     */
    public readonly className: string;

    /**
     * The non-standard trace of which functions were called for this error, in what order, from which line and file,
     * and with what arguments.
     */
    public readonly stack: string;

    /**
     * Return a string representation of this error.
     * 
     * @returns {string} a string representation of this error.
     */
    public toString(): string {
        const stack: string = this.stack ? `, stack=${this.message}` : CommonChar.EMPTY;
        return `[AsteriaError: code=${this.code}, class=${this.className}, message=${this.message}${stack}]`;
    }
}
