import { AsteriaError, AsteriaErrorCode, AbstractAsteriaObject } from '../../../gaia/gaia.index';

/**
 * A utility class for building <code>AsteriaError</code> objects, available as a singleton.
 */
export class OuranosErrorBuilder extends AbstractAsteriaObject {

    /**
     * Stores the static reference to this singleton.
     */
    private static _instance: OuranosErrorBuilder = null;

    /**
     * Creates a new <code>AsteriaErrorBuilder</code> instance.
     */
    private constructor() {
        super('com.asteria.ouranos.util.builder::OuranosErrorBuilder');
    }

    /**
     * Return the reference to this singleton.
     * 
     * @returns {AsteriaEOuranosErrorBuilderrrorBuilder} the reference to this singleton.
     */
    public static getInstance(): OuranosErrorBuilder {
        return OuranosErrorBuilder._instance || (OuranosErrorBuilder._instance = new OuranosErrorBuilder());
    }

    /**
     * Build and return a new <code>AsteriaError</code> instance.
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
