import { HyperionValidator } from '../HyperionValidator';
import { HyperionProcessConfig } from '../../config/HyperionProcessConfig';
import { AsteriaError, AsteriaErrorCode } from '../../../gaia/gaia.index';
import { AsteriaErrorBuilder, PrimitiveType } from '../../../ouranos/ouranos.index';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.hyperion.validator.impl::ReadFileValidator';

/**
 * The <code>ReadFileValidator</code> class is the inplementation for the <code>read-file</code> process.
 */
export class ReadFileValidator implements HyperionValidator {

    /**
     * @inheritdoc
     */
    public validate(config: HyperionProcessConfig, result: (err: AsteriaError)=> void): void {
        let error: AsteriaError = null;
        const param: any = config.config;
        if (param === null || param === undefined) {
            error = AsteriaErrorBuilder.getInstance().build(
                AsteriaErrorCode.MISSING_PARAMETER,
                CLASS_NAME,
                '\'config\' paramater is missing'
            );
        } else if (typeof param !== PrimitiveType.STRING) {
            error = AsteriaErrorBuilder.getInstance().build(
                AsteriaErrorCode.INVALID_PARAMETER,
                CLASS_NAME,
                '\'config\' paramater must be of the type of \'string\''
            );
        }
        result(error);
    }
}