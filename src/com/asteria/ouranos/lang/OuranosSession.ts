import { AsteriaSession, AsteriaContext, AsteriaObject } from '../../gaia/gaia.index';
import { OuranosContext } from './OuranosContext';

/**
 * The Ouranos implementation of the <code>AsteriaSession</code> interface.
 */
export class OuranosSession extends AsteriaObject implements AsteriaSession {

    /**
     * The context associated with this session.
     */
    private readonly CONTEXT: AsteriaContext = null;

    /**
     * Creates a new <code>OuranosSession</code> instance.
     */
    constructor(name: string) {
        super('com.asteria.ouranos.lang::OuranosSession');
        this.CONTEXT = new OuranosContext(name);
    }

    /**
     * @inheritdoc
     */
    public getContext(): AsteriaContext {
        return this.CONTEXT;
    }
}