import { HyperionValidator } from '../../HyperionValidator';
import { HyperionProcessConfig } from '../../../config/HyperionProcessConfig';
import { AsteriaError } from '../../../../gaia/gaia.index';
import { AbstractHyperionValidator } from '../../AbstractHyperionValidator';

/**
 * The <code>CsvToListValidator</code> class is the inplementation for the <code>csv-to-list</code> process.
 */
export class CsvToListValidator extends AbstractHyperionValidator implements HyperionValidator {

    /**
     * Create a new <code>CsvToListValidator</code> instance.
     */
    constructor() {
        super('com.asteria.hyperion.validator.impl.data::CsvToListValidator');
    }

    /**
     * @inheritdoc
     */
    public validate(config: HyperionProcessConfig, result: (err: AsteriaError)=> void): void {
        let error: AsteriaError = null;
        result(error);
    }
}
