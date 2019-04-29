import { AsteriaContext } from '../../gaia/lang/AsteriaContext';
import { Uuid } from './Uuid';
import { AsteriaProcessManager } from '../../gaia/process/AsteriaProcessManager';
import { AsteriaManagerFactory } from '../factory/AsteriaManagerFactory';
import { OuranosLogger } from '../../ouranos/util/logging/OuranosLogger';
import { AsteriaLogger } from '../../gaia/util/logging/AsteriaLogger';

// Static logger reference:
const LOGGER: AsteriaLogger = OuranosLogger.getLogger();

/**
 * The Ouranos implementation of the <code>AsteriaContext</code> interface.
 */
export class OuranosContext implements AsteriaContext {

    /**
     * The context associated with this session.
     */
    private readonly PROCESS_MANAGER: AsteriaProcessManager = null;

    /**
     * The ID of the session associated with this context.
     */
    private readonly SESSION_ID: string = null;

    /**
     * The name of the session associated with this context.
     */
    private readonly SESSION_NAME: string = null;

    /**
     * Creates a new <code>OuranosSession</code> instance.
     * 
     * @param {string} the name of the session associated with this context.
     */
    constructor(name: string) {
        this.SESSION_ID = Uuid.v4();
        this.SESSION_NAME = name;
        this.PROCESS_MANAGER = AsteriaManagerFactory.getInstance().getManager();
        LOGGER.info(`asteria session "${this.SESSION_NAME}" created with the ID "${this.SESSION_ID}"`);
    }

    /**
     * @inheritdoc
     */
    public getSessionId(): string {
        return this.SESSION_ID;
    }

    /**
     * @inheritdoc
     */
    public getSessionName(): string{
        return this.SESSION_NAME;
    }

    /**
     * @inheritdoc
     */
    public getProcessManager(): AsteriaProcessManager {
        return this.PROCESS_MANAGER;
    }
}