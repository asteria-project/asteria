import { AsteriaModule } from '../../spec/module/AsteriaModule';
import { AsteriaData } from '../../spec/data/AsteriaData';
import { AsteriaModuleConfig } from '../../spec/config/AsteriaModuleConfig';
import { AsteriaProcess } from '../../spec/process/AsteriaProcess';

/**
 * The default implementation of the <code>AsteriaProcess</code> interface.
 */
export class AsteriaProcessImpl<T> implements AsteriaProcess<T> {

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