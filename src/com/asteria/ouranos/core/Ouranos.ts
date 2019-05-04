import { AbstractAsteriaObject, AsteriaSession, AsteriaSessionConfig } from '../../gaia/gaia.index';
import { OuranosSession } from './OuranosSession';

/**
 * The <code>Ouranos</code> class is the entry point of the Ouranos framework.
 */
export class Ouranos extends AbstractAsteriaObject {

    /**
     * Create a new <code>Ouranos</code> instance.
     */
    constructor() {
        super('com.asteria.ouranos.core::Ouranos');
    }

    /**
     * Create and return a new <code>AsteriaSession</code> object.
     * 
     * @param {AsteriaSessionConfig} config the config of the new <code>AsteriaSession</code> object.
     * 
     * @returns {AsteriaSession} a new <code>AsteriaSession</code> object.
     */
    public static createSession(config: AsteriaSessionConfig): AsteriaSession {
        return new OuranosSession(config);
    }
}
