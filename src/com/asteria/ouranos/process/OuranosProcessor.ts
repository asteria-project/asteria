import { AbstractAsteriaObject, StreamProcessor, StreamProcess, AsteriaLogger, AsteriaStream } from '../../gaia/gaia.index';
import { OuranosContext } from '../core/OuranosContext';

/**
 * The <code>OuranosProcessor</code> class is the default implementation fo the <code>StreamProcessor</code> interface.
 */
export class OuranosProcessor extends AbstractAsteriaObject implements StreamProcessor {

    /**
     * The <code>OuranosContext</code> reference associated with this processor.
     */
    private readonly CONTEXT: OuranosContext;

    /**
     * The list of <code>StreamProcess</code> objects registered whithin this processor.
     */
    private readonly PROCESSES: Array<StreamProcess> = new Array<StreamProcess>();

    /**
     * The list of <code>AsteriaStream</code> objects registered whithin this processor.
     */
    private _streams: Array<AsteriaStream> = null;

    /**
     * Stores the global data processing start time.
     */
    private _timestamp: number = 0;

    /**
     * Create a new <code>OuranosProcessor</code> instance.
     * 
     * @param {OuranosContext} context the context associated with this processor.
     */
    constructor(context: OuranosContext) {
        super('com.asteria.ouranos.process::OuranosProcessor');
        this.CONTEXT = context;
    }

    /**
     * @inheritdoc
     */
    public add(process: StreamProcess): StreamProcessor {
        const logger: AsteriaLogger = this.CONTEXT.getLogger();
        this.PROCESSES.push(process);
        logger.info(`stream process added to session processor: ${process.getClassName() }`);
        return this;
    }

    /**
     * @inheritdoc
     */
    public remove(process: StreamProcess): StreamProcessor {
        this.PROCESSES.splice(this.getProcessIndex(process), 1);
        return this;
    }

    /**
     * @inheritdoc
     */
    public run(): void {
        this._timestamp = Date.now();
        let from: AsteriaStream = null;
        this._streams = new Array<AsteriaStream>(this.PROCESSES.length);
        for (let i: number = 0; i <= this.PROCESSES.length - 1; ++i) {
            const process: StreamProcess = this.PROCESSES[i];
            let stream: AsteriaStream = null;
            stream = process.create();
            this._streams.push(stream);
            if (i !== 0) {
                (from as any).pipe(stream);
            } else {
                from = stream;
            }
        }
    }
    
    /**
     * Returns the index of the specified process.
     * 
     * @param {StreamProcess} process the process for which to get the index.
     * 
     * @returns {number} the index of the specified process.
     */
    private getProcessIndex(process: StreamProcess): number {
        return this.PROCESSES.indexOf(process);
    }
}
