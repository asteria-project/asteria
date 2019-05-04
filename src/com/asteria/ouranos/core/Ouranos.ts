import { AbstractAsteriaObject, AsteriaSession, AsteriaSessionConfig, StreamProcess, StreamProcessConfig } from '../../gaia/gaia.index';
import { OuranosSession } from './OuranosSession';
import { OuranosProcessBuilder } from '../util/builder/OuranosProcessBuilder';

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

    /**
     * Build and return a new <code>StreamProcess</code> object.
     * 
     * @param {any} processClass the type of the new <code>StreamProcess</code> object.
     * @param {StreamProcessConfig} config the config associated with the new <code>StreamProcess</code> object. 
     * 
     * @return {StreamProcess} a new <code>StreamProcess</code> object.
     */
    public static buildProcess(processClass: any, config?: StreamProcessConfig): StreamProcess {
        return OuranosProcessBuilder.getInstance().build(processClass, config);
    }
}
