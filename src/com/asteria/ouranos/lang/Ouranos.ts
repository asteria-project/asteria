import { OuranosSession } from './OuranosSession';
import { AsteriaSession, AsteriaObject } from '../../gaia/gaia.index';

/**
 * The <code>Ouranos</code> static class represents the entry point for creating as Asteria application.
 */
export class Ouranos extends AsteriaObject {

    /**
     * Creates a new <code>Ouranos</code> instance.
     */
    constructor() {
        super('com.asteria.ouranos.lang::Ouranos');
    }

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