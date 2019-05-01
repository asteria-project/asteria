import { FilterListModuleConfig } from '../../../crios/crios.index';
import { HyperionConfigAdapter } from '../HyperionConfigAdapter';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.hyperion.config.adapter::FilterConfigAdapter';

/**
 * The <code>FilterConfigAdapter</code> class allows to convert <code>filter</code> config objects.
 */
export class FilterConfigAdapter implements HyperionConfigAdapter {

    /**
     * @inheritdoc
     */
    public convert(config: any): FilterListModuleConfig {
        let result: FilterListModuleConfig = null;
        return result;
    }
}