import { AsteriaModule, AsteriaData, AsteriaModuleConfig, AsteriaProcess, AsteriaObject } from '../../../gaia/gaia.index';

/**
 * The Ouranos implementation of the <code>AsteriaProcess</code> interface.
 */
export class OuranosProcess<T> extends AsteriaObject implements AsteriaProcess<T> {

    /**
     * Creates a new <code>OuranosProcess</code> instance.
     */
    constructor() {
        super('com.asteria.ouranos.process::OuranosProcess');
    }

    /**
     * @inheritdoc
     */
    public input: AsteriaData<T> = null;
    
    /**
     * @inheritdoc
     */
    public config: AsteriaModuleConfig = null;
    
    /**
     * @inheritdoc
     */
    public module: AsteriaModule = null;
}