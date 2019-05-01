import { AsteriaError } from '../../../gaia/gaia.index';

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
     * @param {number} code the data set defined by the new <code>AsteriaData</code> instance. 
     * 
     * @return {AsteriaError} a new <code>AsteriaError</code> instance.
     */
    public build(code: number, message: string, stack: string): AsteriaError {
        const error: AsteriaError = new AsteriaError(code, message, stack);
        return error;
    }
}