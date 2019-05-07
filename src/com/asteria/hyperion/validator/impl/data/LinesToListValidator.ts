import { HyperionValidator } from '../../HyperionValidator';
import { HyperionProcessConfig } from '../../../config/HyperionProcessConfig';
import { AsteriaError } from '../../../../gaia/gaia.index';
import { AbstractHyperionValidator } from '../../AbstractHyperionValidator';

/**
 * The <code>LinesToListValidator</code> class is the inplementation for the <code>lines-to-list</code> process.
 */
export class LinesToListValidator extends AbstractHyperionValidator implements HyperionValidator {

    /**
     * Create a new <code>ListToCsvValidator</code> instance.
     */
    constructor() {
        super('com.asteria.hyperion.validator.impl.data::LinesToListValidator');
    }

    /**
     * @inheritdoc
     */
    public validate(config: HyperionProcessConfig, result: (err: AsteriaError)=> void): void {
        let error: AsteriaError = null;
        result(error);
    }
}
