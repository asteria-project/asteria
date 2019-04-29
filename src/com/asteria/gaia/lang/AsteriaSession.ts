import { AsteriaContext } from './AsteriaContext';

/**
 * The <code>AsteriaSession</code> interface represents the main container that holds all processes executed within an
 * Asteria application.
 */
export interface AsteriaSession {

    /**
     * Returns the context for this Asteria session.
     * 
     * @returns {AsteriaContext} the context for this Asteria session.
     */
    getContext(): AsteriaContext;
}