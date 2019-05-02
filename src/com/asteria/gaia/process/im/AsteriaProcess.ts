import { AsteriaData } from '../../data/AsteriaData';
import { AsteriaModuleConfig } from '../../config/AsteriaModuleConfig';
import { AsteriaModule } from '../../module/AsteriaModule';

/**
 * The <code>AsteriaProcess</code> interface provides information about a process executed by the Asteria environment.
 */
export interface AsteriaProcess<T> {

    /**
     * The data input for this process.
     */
    input: AsteriaData<T>;

    /**
     * The configuration associated with this process.
     */
    config: AsteriaModuleConfig;

    /**
     * The module associated with this process.
     */
    module: AsteriaModule;
}