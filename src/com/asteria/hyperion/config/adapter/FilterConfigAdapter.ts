import { FilterListModuleConfig } from '../../../crios/crios.index';
import { HyperionConfigAdapter } from '../HyperionConfigAdapter';
import { AsqlParser, AsqlToken, FilterQueryAdapter, AsqlFilterDefinition } from '../../../japet/japet.index';
import { AsteriaFilter, AsteriaError, AsteriaErrorCode, AsteriaLogger, AsteriaObject } from '../../../gaia/gaia.index';
import { AsteriaErrorBuilder, OuranosLogger, PrimitiveType } from '../../../ouranos/ouranos.index';

// Static logger reference:
const LOGGER: AsteriaLogger = OuranosLogger.getLogger();

/**
 * The <code>FilterConfigAdapter</code> class allows to convert <code>filter</code> config objects.
 */
export class FilterConfigAdapter extends AsteriaObject implements HyperionConfigAdapter {

    /**
     * Creates a new <code>FilterConfigAdapter</code> instance.
     */
    constructor() {
        super('com.asteria.hyperion.config.adapter::FilterConfigAdapter');
    }

    /**
     * @inheritdoc
     */
    public convert(config: any): FilterListModuleConfig {
        let error: AsteriaError = null;
        let result: FilterListModuleConfig = null;
        if (!config) {
            error = AsteriaErrorBuilder.getInstance().build(
                AsteriaErrorCode.MISSING_ASQL_QUERY,
                this.getClassName(),
                'filter query is missing'
            );
            LOGGER.error(error.toString());
        } else if (typeof config !== PrimitiveType.STRING) {
            error = AsteriaErrorBuilder.getInstance().build(
                AsteriaErrorCode.INVALID_ASQL_QUERY,
                this.getClassName(),
                'filter query must be of the type of \'string\''
            );
        } else {
            const parser: AsqlParser = new AsqlParser();
            const tokens: Array<AsqlToken> = parser.parse(config);
            const adapter: FilterQueryAdapter = new FilterQueryAdapter();
            const filterDef: AsqlFilterDefinition = adapter.adapt(tokens);
            result = {
                condition: filterDef.condition,
                filters: filterDef.filters
            };
        }
        return result;
    }
}