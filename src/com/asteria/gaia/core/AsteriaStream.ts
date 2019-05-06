import { AsteriaObject } from '../common/lang/AsteriaObject';
import { StreamProcessConfig } from '../config/StreamProcessConfig';
import { AsteriaContext } from './AsteriaContext';

/**
 * The <code>AsteriaStream</code> interface represents stream object in an Asteria application session.
 */
export interface AsteriaStream extends AsteriaObject {

    /**
     * Initialize this stream by using the associated process config.
     * 
     * @param {StreamProcessConfig} config the process config used to initialize this stream.
     * @param {AsteriaContext} context the reference to the context in which this stream is executed.
     */
    init(config: StreamProcessConfig, context: AsteriaContext): void;
}
