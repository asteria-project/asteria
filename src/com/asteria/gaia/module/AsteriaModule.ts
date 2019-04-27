import { AsteriaModuleConfig } from '../config/AsteriaModuleConfig';
import { AsteriaData } from '../data/AsteriaData';

/**
 * The <code>AsteriaModule</code> interface defines the common functionality implemented by Asteria modules.
 */
export interface AsteriaModule {

    /**
     * Represents the name of the module.
     */
    name: string;

    /**
     * Executes the process defined by this module and returns the result of this treatment.
     * 
     * @param {AsteriaData<any>} input the data input that must be treated by this process.
     * @param {AsteriaModuleConfig} config the options associated with this process for the current input.
     * 
     * @return {Promise<AsteriaData<any>>} result of the treatment defined by thismodule for the specified input.
     */
    process(input: AsteriaData<any>, config?: AsteriaModuleConfig): Promise<AsteriaData<any>>;
}