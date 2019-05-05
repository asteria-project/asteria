import { HyperionValidator } from '../../HyperionValidator';
import { HyperionProcessConfig } from '../../../config/HyperionProcessConfig';
import { AsteriaError, AsteriaErrorCode, PrimitiveType } from '../../../../gaia/gaia.index';
import { OuranosErrorBuilder } from '../../../../ouranos/ouranos.index';
import { AbstractHyperionValidator } from '../../AbstractHyperionValidator';

/**
 * The <code>ReadFileValidator</code> class is the inplementation for the <code>read-file</code> process.
 */
export class ReadFileValidator extends AbstractHyperionValidator implements HyperionValidator {

    /**
     * Create a new <code>ReadFileValidator</code> instance.
     */
    constructor() {
        super('com.asteria.hyperion.validator.impl.file::ReadFileValidator');
    }

    /**
     * @inheritdoc
     */
    public validate(config: HyperionProcessConfig, result: (err: AsteriaError)=> void): void {
        let error: AsteriaError = null;
        const param: any = config.config;
        if (param === null || param === undefined) {
            error = OuranosErrorBuilder.getInstance().build(
                AsteriaErrorCode.MISSING_PARAMETER,
                this.getClassName(),
                '\'config\' paramater is missing'
            );
        } else if (typeof param !== PrimitiveType.STRING) {
            error = OuranosErrorBuilder.getInstance().build(
                AsteriaErrorCode.INVALID_PARAMETER,
                this.getClassName(),
                '\'config\' paramater must be of the type of \'string\''
            );
        }
        result(error);
    }
}