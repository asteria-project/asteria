import { HyperionProcessConfig } from '../config/HyperionProcessConfig';
import { AsteriaError } from '../../gaia/gaia.index';

/**
 * The <code>HyperionValidator</code> interface defines the set of APIs you must define to create a Hyperion config
 * validator.
 */
export interface HyperionValidator {

    /**
     * Validates the specified config object.
     * 
     * @param {HyperionProcessConfig} config the config object to validate.
     * @param {Function} result the validation result callback; this function has an error parameter which is set to
     *                          <code>null</code> whether the config object is not valid.
     */
    validate(config: HyperionProcessConfig, result: (err: AsteriaError)=> void): void;
}
