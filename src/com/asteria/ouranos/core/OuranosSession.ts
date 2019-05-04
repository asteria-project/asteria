import { AbstractAsteriaObject, AsteriaSession, AsteriaContext, AsteriaSessionConfig } from '../../gaia/gaia.index';
import { OuranosContext } from './OuranosContext';
import { Uuid } from '../lang/Uuid';

/**
 * The <code>OuranosSession</code> class is the default implementation fo the <code>AsteriaSession</code> interface.
 */
export class OuranosSession extends AbstractAsteriaObject implements AsteriaSession {

    /**
     * The context that describes this Asteria application session.
     */
    private readonly CONTEXT: OuranosContext;

    /**
     * Create a new <code>OuranosSession</code> instance.
     * 
     * @param {AsteriaSessionConfig} config the config of this Asteria application session.
     */
    constructor(config: AsteriaSessionConfig) {
        super('com.asteria.ouranos.core::OuranosSession');
        const name: string = config.name;
        const id: string = Uuid.v4();
        this.CONTEXT = new OuranosContext(name, id);
        this.CONTEXT.getLogger().info(`asteria session "${name}" created with the ID "${id}"`);
    }

    /**
     * @inheritdoc
     */
    public getContext(): AsteriaContext {
        return this.CONTEXT;
    }
}
