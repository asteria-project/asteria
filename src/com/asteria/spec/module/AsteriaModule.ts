import { AsteriaModuleConfig } from '../config/AsteriaModuleConfig';
import { AsteriaData } from '../data/AsteriaData';

/**
 * The <code>AsteriaModule</code> interface defines the common functionality
 * implemented by Asteria modules.
 */
export interface AsteriaModule {

    /**
     * Represents the name of the module.
     */
    name: string;

    /**
     * 
     * @param {AsteriaData<any>} input 
     * @param {AsteriaModuleConfig} config 
     * 
     * @return {Promise<AsteriaData<any>>}
     */
    process(input: AsteriaData<any>,
            config?: AsteriaModuleConfig): Promise<AsteriaData<any>>;
}