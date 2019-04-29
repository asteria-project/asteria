import { AsteriaProcessManager } from '../../gaia/process/AsteriaProcessManager';
import { OuranosProcessManager } from '../process/OuranosProcessManager';

/**
 * Provides functionality to create new <code>AsteriaProcessManager</code> instances through a singleton implementation.
 */
export class AsteriaManagerFactory {

    /**
     * Stores the static reference to this singleton.
     */
    private static _instance: AsteriaManagerFactory = null;

    /**
     * Creates a new <code>AsteriaManagerFactory</code> instance.
     */
    private constructor() {}

    /**
     * Returns the reference to this singleton.
     * 
     * @returns {AsteriaProcessManager} the reference to this singleton.
     */
    public static getInstance(): AsteriaManagerFactory {
        return AsteriaManagerFactory._instance || (AsteriaManagerFactory._instance = new AsteriaManagerFactory());
    }

    /**
     * Returns a new <code>AsteriaProcessManager</code> object.
     * 
     * @returns {AsteriaProcessManager} a new <code>AsteriaProcessManager</code> object.
     */
    public getManager(): AsteriaProcessManager {
        return new OuranosProcessManager();
    }
}