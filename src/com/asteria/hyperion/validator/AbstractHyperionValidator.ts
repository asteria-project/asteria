import { HyperionProcessConfig } from '../config/HyperionProcessConfig';
import { AsteriaError, AbstractAsteriaObject } from '../../gaia/gaia.index';
import { HyperionValidator } from './HyperionValidator';

/**
 * The <code>HyperionValidator</code> interface defines the set of APIs you must define to create a Hyperion config
 * validator.
 */
export abstract class AbstractHyperionValidator extends AbstractAsteriaObject implements HyperionValidator {

    /**
     * Create a new <code>AbstractHyperionValidator</code> instance.
     * 
     * @param {string} className the fully qualified class name for this object.
     */
    constructor(className: string) {
        super(className);
    }

    /**
     * @inheritdoc
     */
    abstract validate(config: HyperionProcessConfig, result: (err: AsteriaError)=> void): void;
}