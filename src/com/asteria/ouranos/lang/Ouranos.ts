import { OuranosSession } from './OuranosSession';
import { AsteriaSession } from '../../gaia/gaia.index';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.ouranos.lang::Ouranos';

/**
 * The <code>Ouranos</code> static class represents the entry point for creating as Asteria application.
 */
export class Ouranos {

    /**
     * Builds and returns a new <code>AsteriaSession</code> object.
     * 
     * @param {string} name the name of the new <code>AsteriaSession</code> object.
     * 
     * @return {AsteriaSession} a new <code>AsteriaSession</code> object.
     */
    public static buildSession(name: string): AsteriaSession {
        const session: AsteriaSession = new OuranosSession(name);
        return session;
    }
}