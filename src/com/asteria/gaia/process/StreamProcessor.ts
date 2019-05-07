import { StreamProcess } from './StreamProcess';
import { AsteriaStream } from '../core/AsteriaStream';

/**
 * The <code>StreamProcessor</code> interface provides operations for working and processing with data as defined
 * by Asteria processes.
 */
export interface StreamProcessor {

    /**
     * Add the specified stream process to this processor.
     * 
     * @param {StreamProcess} process the stream process to add to this processor.
     * 
     * @return {StreamProcessor} a reference to this <code>StreamProcessor</code> object.
     */
    add(process: StreamProcess): StreamProcessor;

    /**
     * Remove the specified stream process from this processor.
     * 
     * @param {StreamProcess} process the stream process to remove from this processor.
     * 
     * @return {StreamProcessor} a reference to this <code>StreamProcessor</code> object.
     */
    remove(process: StreamProcess): StreamProcessor;

    /**
     * Run all processes registered in this processor and return the last registered stream.
     * 
     * @return {AsteriaStream} the last stream registered in this processor.
     */
    run(): AsteriaStream;
}
