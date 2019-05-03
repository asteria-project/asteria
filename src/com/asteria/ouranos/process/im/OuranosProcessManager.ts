import { AsteriaData, AsteriaProcessManager, AsteriaProcess, AsteriaLogger, AsteriaError, CommonChar, AsteriaObject } from '../../../gaia/gaia.index';
import { OuranosLogger } from '../../util/logging/OuranosLogger';

// Static logger reference:
const LOGGER: AsteriaLogger = OuranosLogger.getLogger();

/**
 * The Ouranos implementation of the <code>AsteriaProcessManager</code> interface.
 */
export class OuranosProcessManager extends AsteriaObject implements AsteriaProcessManager {

    /**
     * The list of <code>AsteriaModule</code> objects registered whithin this Asteria module processor.
     */
    private readonly PROCESSES: AsteriaProcess<any>[] = new Array<AsteriaProcess<any>>();

    /**
     * The internal position that indicates the current module to be processed.
     */
    private _cursor: number = -1;

    /**
     * Stores an internal reference of the computed data at the current cursor
     * position.
     */
    private _data: AsteriaData<any> = null;

    /**
     * Stores the global data processing start time.
     */
    private _timestamp: number = 0;

    /**
     * Stores the current module data processing start time.
     */
    private _processTimestamp: number = 0;

    /**
     * Creates a new <code>OuranosProcessManager</code> instance.
     */
    constructor() {
        super('com.asteria.ouranos.process::OuranosProcessManager');
    }

    /**
     * @inheritdoc
     */
    public add(process: AsteriaProcess<any>): AsteriaProcessManager {
        this.PROCESSES.push(process);
        return this;
    }

    /**
     * @inheritdoc
     */
    public remove(process: AsteriaProcess<any>): AsteriaProcessManager {
        this.PROCESSES.splice(this.getProcessIndex(process), 1);
        return this;
    }

    /**
     * @inheritdoc
     */
    public reset(): void {
        this._data = null;
        this._cursor = -1;
        this._processTimestamp = this._timestamp = 0;
    }
    
    /**
     * @inheritdoc
     */
    public run(): Promise<AsteriaData<any>> {
        this._timestamp = Date.now();
        const len: number = this.PROCESSES.length;
        LOGGER.info('asteria processing start');
        LOGGER.info(`processing ${len} module${ len !== 1 ? 's' : CommonChar.EMPTY}`);
        const result: Promise<AsteriaData<any>> = new Promise<AsteriaData<any>>(
            (resolve: Function, reject: Function)=> {
                this.resolveProcess(resolve, reject);
            }
        );
        return result;
    }

    private resolveProcess(resolve: Function, reject: Function): void {
        if (this._cursor === -1) {
            this._processTimestamp = Date.now();
        } else {
            const currTime: number = Date.now();
            LOGGER.info(`process duration: ${currTime - this._processTimestamp} ms`);
        }
        if (this.hasNext()) {
            this._processTimestamp = Date.now();
            this.processNext()
                .then((output: AsteriaData<any>)=> {
                    this._data = output;
                    this.resolveProcess(resolve, reject);
                }).catch((err: AsteriaError)=> {
                    LOGGER.fatal(err.toString());
                    reject(err);
                });
        } else {
            const completeTs: number = Date.now() - this._timestamp;
            LOGGER.info(`asteria processing completed in ${completeTs} ms`);
            resolve(this._data);
            this.reset();
        }
    }

    /**
     * Runs the nex process in the processes stack.
     * 
     * @returns {Promise<AsteriaData<any>>} the promise that holds the result of the operation.
     */
    private processNext(): Promise<AsteriaData<any>> {
        const next: AsteriaProcess<any> = this.PROCESSES[++this._cursor];
        const input: AsteriaData<any> = next.input || this._data;
        LOGGER.info(`running module #${this._cursor + 1}: ${next.module.name}`);
        return next.module.process(input, next.config);       
    }

    /**
     * Returns a boolean that indicates whether this manager has processes to be executed (<code>true</code>), or not
     * (<code>false</code>).
     * 
     * @returns {boolean} <code>true</code> whether this manager has processes  to be executed; <code>false</code>
     *                    otherwise.
     */
    private hasNext(): boolean {
        return (this._cursor + 1) < this.PROCESSES.length;
    }

    /**
     * Returns the index of the specified Asteria process.
     * 
     * @param {AsteriaProcess<any>} process the process for which to get the index.
     * 
     * @returns {number} the index of the specified Asteria process.
     */
    private getProcessIndex(process: AsteriaProcess<any>): number {
        return this.PROCESSES.indexOf(process);
    }
}