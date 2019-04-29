import { AsteriaModule } from '../../gaia/module/AsteriaModule';
import { AsteriaData } from '../../gaia/data/AsteriaData';
import { AsteriaModuleConfig } from '../../gaia/config/AsteriaModuleConfig';
import { AsteriaProcess } from '../../gaia/process/AsteriaProcess';

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