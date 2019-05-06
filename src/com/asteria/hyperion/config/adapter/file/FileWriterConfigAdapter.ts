import { FileReaderConfig } from '../../../../cronos/cronos.index';
import { HyperionConfigAdapter } from '../../HyperionConfigAdapter';
import { AsteriaError, AsteriaErrorCode, AsteriaLogger, AbstractAsteriaObject, PrimitiveType } from '../../../../gaia/gaia.index';
import { OuranosErrorBuilder, OuranosLogger } from '../../../../ouranos/ouranos.index';

// Static logger reference:
const LOGGER: AsteriaLogger = OuranosLogger.getLogger();

/**
 * The <code>FileWriterConfigAdapter</code> class allows to convert <code>write-file</code> config objects.
 */
export class FileWriterConfigAdapter extends AbstractAsteriaObject implements HyperionConfigAdapter {

    /**
     * Create a new <code>FileWriterConfigAdapter</code> instance.
     */
    constructor() {
        super('com.asteria.hyperion.config.adapter.file::FileWriterConfigAdapter');
    }

    /**
     * @inheritdoc
     */
    public convert(config: any): FileReaderConfig {
        let error: AsteriaError = null;
        let result: FileReaderConfig = null;
        if (!config) {
            error = OuranosErrorBuilder.getInstance().build(
                AsteriaErrorCode.MISSING_ASQL_QUERY,
                this.getClassName(),
                'file path is missing'
            );
            LOGGER.error(error.toString());
        } else if (typeof config !== PrimitiveType.STRING) {
            error = OuranosErrorBuilder.getInstance().build(
                AsteriaErrorCode.INVALID_ASQL_QUERY,
                this.getClassName(),
                'file path must be of the type of \'string\''
            );
        } else {
            result = { path: config };
        }
        return result;
    }
}