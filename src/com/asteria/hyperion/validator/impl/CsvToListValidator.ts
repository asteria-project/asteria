import { HyperionValidator } from '../HyperionValidator';
import { HyperionProcessConfig } from '../../config/HyperionProcessConfig';
import { AsteriaError } from '../../../gaia/gaia.index';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.hyperion.validator.impl::ReadFileValidator';

/**
 * The <code>CsvToListValidator</code> class is the inplementation for the <code>csv-to-list</code> process.
 */
export class CsvToListValidator implements HyperionValidator {

    /**
     * @inheritdoc
     */
    public validate(config: HyperionProcessConfig, result: (err: AsteriaError)=> void): void {
        let error: AsteriaError = null;
        result(error);
    }
}