import { AsteriaProcess } from './AsteriaProcess';
import { AsteriaData } from '../data/AsteriaData';

/**
 * The <code>AsteriaProcessManager</code> interface provides operations for working and processing with data as defined
 * by Asteria processes.
 */
export interface AsteriaProcessManager {

    /**
     * Adds the specified Asteria process to this manager.
     * 
     * @param {AsteriaProcess<any>} module the Asteria process to add to this manager.
     */
    add(process: AsteriaProcess<any>): void;

    /**
     * Removes the specified Asteria process from this manager.
     * 
     * @param {AsteriaProcess<any>} module the Asteria process to remove from this manager.
     */
    remove(process: AsteriaProcess<any>): void;

    /**
     * Runs all processes registered in this manager and returns the result of these operations.
     * 
     * @return {Promise<AsteriaData<any>>} the result of these operation defined by all processes registered in this
     *                                     manager.
     */
    run(): Promise<AsteriaData<any>>;
}