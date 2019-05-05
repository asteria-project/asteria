import { HyperionValidator } from '../../HyperionValidator';
import { HyperionProcessConfig } from '../../../config/HyperionProcessConfig';
import { AsteriaError } from '../../../../gaia/gaia.index';
import { AbstractHyperionValidator } from '../../AbstractHyperionValidator';

/**
 * The <code>ListToCsvValidator</code> class is the inplementation for the <code>list-to-csv</code> process.
 */
export class ListToCsvValidator extends AbstractHyperionValidator implements HyperionValidator {

    /**
     * Create a new <code>ListToCsvValidator</code> instance.
     */
    constructor() {
        super('com.asteria.hyperion.validator.impl.data::ListToCsvValidator');
    }

    /**
     * @inheritdoc
     */
    public validate(config: HyperionProcessConfig, result: (err: AsteriaError)=> void): void {
        let error: AsteriaError = null;
        result(error);
    }
}