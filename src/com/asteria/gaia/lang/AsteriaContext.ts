import { AsteriaProcessManager } from '../process/im/AsteriaProcessManager';

/**
 * The <code>AsteriaContext</code> interface represents an execution context for an Asteria session. Asteria context is
 * the threadsafe way to share Asteria sessions information between JavaScript Web workers.
 */
export interface AsteriaContext {

    /**
     * Returns the ID for this Asteria session associated with this context.
     * 
     * @return {string} the ID for this Asteria session associated with this context.
     */
    getSessionId(): string;

    /**
     * Returns the name for this Asteria session associated with this context.
     * 
     * @return {string} the name for this Asteria session associated with this context.
     */
    getSessionName(): string;

    /**
     * Returns the process manager associated with the current context.
     * 
     * @returns {AsteriaProcessManager} the process manager associated with the current context.
     */
    getProcessManager(): AsteriaProcessManager;
}