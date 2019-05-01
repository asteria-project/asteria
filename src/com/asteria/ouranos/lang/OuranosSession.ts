import { AsteriaSession, AsteriaContext } from '../../gaia/gaia.index';
import { OuranosContext } from './OuranosContext';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.ouranos.lang::OuranosSession';

/**
 * The Ouranos implementation of the <code>AsteriaSession</code> interface.
 */
export class OuranosSession implements AsteriaSession {

    /**
     * The context associated with this session.
     */
    private readonly CONTEXT: AsteriaContext = null;

    /**
     * Creates a new <code>OuranosSession</code> instance.
     */
    constructor(name: string) {
        this.CONTEXT = new OuranosContext(name);
    }

    /**
     * @inheritdoc
     */
    public getContext(): AsteriaContext {
        return this.CONTEXT;
    }
}