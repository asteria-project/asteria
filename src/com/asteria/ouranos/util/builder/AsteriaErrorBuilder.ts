import { AsteriaError, AsteriaErrorCode } from '../../../gaia/gaia.index';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.ouranos.util.builder::AsteriaErrorBuilder';

/**
 * A utility class for building <code>AsteriaError</code> objects, available as a singleton.
 */
export class AsteriaErrorBuilder {

    /**
     * Stores the static reference to this singleton.
     */
    private static _instance: AsteriaErrorBuilder = null;

    /**
     * Creates a new <code>AsteriaErrorBuilder</code> instance.
     */
    private constructor() {}

    /**
     * Returns the reference to this singleton.
     * 
     * @returns {AsteriaErrorBuilder} the reference to this singleton.
     */
    public static getInstance(): AsteriaErrorBuilder {
        return AsteriaErrorBuilder._instance || (AsteriaErrorBuilder._instance = new AsteriaErrorBuilder());
    }

    /**
     * Builds and returns a new <code>AsteriaError</code> instance.
     * 
     * @param {AsteriaErrorCode} code the error code for this <code>AsteriaError</code> instance.
     * 
     * @return {AsteriaError} a new <code>AsteriaError</code> instance.
     */
    public build(code: AsteriaErrorCode, className: string, message: string, stack?: string): AsteriaError {
        const error: AsteriaError = new AsteriaError(code, className, message, stack);
        return error;
    }
}