import { StreamProcessConfig } from '../../gaia/gaia.index';

/**
 * The <code>HyperionConfigAdapter</code> interface defines methods for converting Hyperion process config objects
 * to Asteria process config objects.
 */
export interface HyperionConfigAdapter {

    /**
     * Convert the specified Hyperion config object into an Asteria process config object.
     * 
     * @param {any} config the Hyperion config object to adapt.
     * 
     * @returns {StreamProcessConfig} an Asteria process config object built for the specified Hyperion config object.
     */
    convert(config: any): StreamProcessConfig;
}