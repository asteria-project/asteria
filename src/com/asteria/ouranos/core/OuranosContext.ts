import { AbstractAsteriaObject, AsteriaContext, StreamProcessor, AsteriaLogger } from '../../gaia/gaia.index';
import { OuranosProcessor } from '../process/OuranosProcessor';
import { OuranosLogger } from '../util/logging/OuranosLogger';

/**
 * The <code>OuranosContext</code> class is the default implementation fo the <code>AsteriaContext</code> interface.
 */
export class OuranosContext extends AbstractAsteriaObject implements AsteriaContext {

    /**
     * The GUID of the Asteria application session associated with this context.
     */
    private readonly NAME: string;

    /**
     * The GUID of the Asteria application session associated with this context.
     */
    private readonly GUID: string;

    /**
     * The stream processor associated with this context.
     */
    private readonly PROCESSOR: StreamProcessor;

    /**
     * Create a new <code>OuranosContext</code> instance.
     * 
     * @param {string} name the name of this Asteria application session.
     */
    constructor(name: string, uuid: string) {
        super('com.asteria.ouranos.core::OuranosContext');
        this.GUID = uuid;
        this.NAME = name;
        this.PROCESSOR = new OuranosProcessor(this);
    }

    /**
     * Return the logger associated with this context.
     * 
     * @returns {AsteriaLogger} the logger associated with this context.
     */
    public getLogger(): AsteriaLogger {
        return OuranosLogger.getLogger();
    }

    /**
     * @inheritdoc
     */
    public getName(): string {
        return this.NAME;
    }
    
    /**
     * @inheritdoc
     */
    public getId(): string {
        return this.GUID;
    }
    
    /**
     * @inheritdoc
     */
    public getProcessor(): StreamProcessor {
        return this.PROCESSOR;
    }
}
