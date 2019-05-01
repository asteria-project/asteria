import { AsteriaModuleConfig } from '../../gaia/gaia.index';

/**
 * The <code>HyperionConfigAdapter</code> interface defines methods for converting Hyperion process config objects
 * to Asteria process config objects.
 */
export interface HyperionConfigAdapter {

    /**
     * Converts the specified Hyperion config object into an Asteria module config object.
     * 
     * @param {any} config the Hyperion config object to adapt.
     * 
     * @returns {AsteriaModuleConfig} an Asteria module config object built for the specified Hyperion config object.
     */
    convert(config: any): AsteriaModuleConfig;
}