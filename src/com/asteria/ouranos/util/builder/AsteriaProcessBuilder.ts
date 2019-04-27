import { AsteriaData } from '../../../gaia/data/AsteriaData';
import { AsteriaProcess } from '../../../gaia/process/AsteriaProcess';
import { AsteriaProcessImpl } from '../../process/AsteriaProcessImpl';
import { AsteriaModule } from '../../../gaia/module/AsteriaModule';
import { AsteriaModuleConfig } from '../../../gaia/config/AsteriaModuleConfig';

/**
 * A utility class for building <code>AsteriaProcess</code> objects, available as a singleton.
 */
export class AsteriaProcessBuilder {

    /**
     * Stores the static reference to this singleton.
     */
    private static _instance: AsteriaProcessBuilder = null;

    /**
     * Creates a new <code>AsteriaDataBuilder</code> instance.
     */
    private constructor() {}

    /**
     * Returns the reference to this singleton.
     * 
     * @returns {AsteriaProcessBuilder} the reference to this singleton.
     */
    public static getInstance(): AsteriaProcessBuilder {
        return AsteriaProcessBuilder._instance || (AsteriaProcessBuilder._instance = new AsteriaProcessBuilder());
    }

    /**
     * Builds and returns a new <code>AsteriaProcess</code> object.
     * 
     * @param {AsteriaModule} module the module associated with the new <code>AsteriaProcess</code> object.
     * @param {AsteriaModuleConfig} config the module config associated with the new <code>AsteriaProcess</code> object. 
     * @param {AsteriaData} input the data associated with the new <code>AsteriaProcess</code> object. 
     * 
     * @return {AsteriaProcess<T>} a new <code>AsteriaProcess</code> object.
     */
    public build<T>(module: AsteriaModule, config?: AsteriaModuleConfig, input?: AsteriaData<T>): AsteriaProcess<T> {
        const process: AsteriaProcess<T> = new AsteriaProcessImpl<T>();
        process.module = module;
        process.input = input;
        process.config = config;
        return process;
    }
}