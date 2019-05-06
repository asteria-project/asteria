import { StreamProcessType } from './StreamProcessType';
import { AsteriaStream } from '../core/AsteriaStream';
import { StreamProcessConfig } from '../config/StreamProcessConfig';
import { AsteriaObject } from '../common/lang/AsteriaObject';
import { AsteriaContext } from '../core/AsteriaContext';

/**
 * The <code>StreamProcess</code> interface defines processes that are consumed by an Asteria stream processor.
 */
export interface StreamProcess extends AsteriaObject {

    /**
     * Return the config for this process.
     * 
     * @returns {StreamProcessConfig} the config for this process.
     */
    getConfig(): StreamProcessConfig;

    /**
     * Set the config for this process.
     * 
     * @param {StreamProcessConfig} config the config for this process.
     */
    setConfig(config: StreamProcessConfig): void;

    /**
     * Return the type of this process.
     * 
     * @returns {string} the type of this process.
     */
    getType(): StreamProcessType;

    /**
     * Create and return the stream object associated with this process.
     * 
     * @param {AsteriaContext} context the reference to the context in which this process is executed.
     * 
     * @returns {AsteriaStream} the stream object associated with this process.
     */
    create(context: AsteriaContext): AsteriaStream;
}
