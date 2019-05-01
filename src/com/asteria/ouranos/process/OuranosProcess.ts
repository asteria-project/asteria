import { AsteriaModule, AsteriaData, AsteriaModuleConfig, AsteriaProcess } from '../../gaia/gaia.index';

/**
 * The Ouranos implementation of the <code>AsteriaProcess</code> interface.
 */
export class OuranosProcess<T> implements AsteriaProcess<T> {

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