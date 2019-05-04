import { StreamProcessor } from '../process/StreamProcessor';

/**
 * The <code>AsteriaContext</code> interface represents context of an Asteria application session.
 */
export interface AsteriaContext {

    /**
     * Return the name of the Asteria session associated with this context.
     * 
     * @return {string} the name of the Asteria session associated with this context.
     */
    getName(): string;

    /**
     * Return the unique identifier of the Asteria session associated with this context.
     * 
     * @return {string} the unique identifier of the Asteria session associated with this context.
     */
    getId(): string;

    /**
     * Return the reference to the stream processor associated with this context.
     * 
     * @return {string} the reference to the stream processor associated with this context.
     */
    getProcessor(): StreamProcessor;
}
