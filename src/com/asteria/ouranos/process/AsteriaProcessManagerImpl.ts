import { AsteriaData } from '../../spec/data/AsteriaData';
import { AsteriaProcessManager } from '../../spec/process/AsteriaProcessManager';
import { AsteriaProcess } from '../../spec/process/AsteriaProcess';

/**
 * The default implementation of the <code>AsteriaProcessManager</code>
 * interface.
 */
export class AsteriaProcessManagerImpl implements AsteriaProcessManager {

    /**
     * The list of <code>AsteriaModule</code> objects registered whithin this
     * Asteria module processor.
     */
    private readonly PROCESSES: AsteriaProcess<any>[] =
                                               new Array<AsteriaProcess<any>>();

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
     * @inheritdoc
     */
    public add(process: AsteriaProcess<any>): void {
        this.PROCESSES.push(process);
    }

    /**
     * @inheritdoc
     */
    public remove(process: AsteriaProcess<any>): void {
        this.PROCESSES.splice(this.getProcessIndex(process), 1);
    }

    /**
     * @inheritdoc
     */
    public reset(): void {
        this._data = null;
        this._cursor = -1;
    }
    
    /**
     * @inheritdoc
     */
    public run(): Promise<AsteriaData<any>> {
        const result: Promise<AsteriaData<any>> = new Promise<AsteriaData<any>>(
            (resolve: Function, reject: Function)=> {
                this.resolveProcess(resolve, reject);
            }
        );
        return result;
    }

    private resolveProcess(resolve: Function, reject: Function): void {
        if (this.hasNext()) {
            this.processNext()
                .then((output: AsteriaData<any>)=> {
                    this._data = output;
                    this.resolveProcess(resolve, reject);
                }).catch((err: any)=> {
                    reject(err);
                });
        } else {
            resolve(this._data);
        }
    }

    private processNext(): Promise<AsteriaData<any>> {
        const next: AsteriaProcess<any> = this.PROCESSES[++this._cursor];
        const input: AsteriaData<any> = next.input || this._data;
        console.log("running module: " + next.module.name);
        return next.module.process(input, next.config);       
    }

    /**
     * Returns a boolean that indicates whether this manager has processes to be
     * executed (<code>true</code>), or not (<code>false</code>).
     * 
     * @returns {boolean} <code>true</code> whether this manager has processes
     *                    to be executed; <code>false</code> otherwise.
     */
    private hasNext(): boolean {
        return (this._cursor + 1) < this.PROCESSES.length;
    }

    /**
     * Returns the index of the specified Asteria process.
     * 
     * @param {AsteriaProcess<any>} process the process for which to get the
     *                                      index.
     * 
     * @returns {number} the index of the specified Asteria process.
     */
    private getProcessIndex(process: AsteriaProcess<any>): number {
        return this.PROCESSES.indexOf(process);
    }
}