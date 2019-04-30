import { AsteriaModuleConfig, FilterDefinition, FilterCondition } from '../../../gaia/gaia.index';

/**
 * The <code>FilterListModuleConfig</code> interface defines the common functionality implemented by context
 * configuration objects applyed to <code>FilterListModule</code> modules.
 */
export interface FilterListModuleConfig extends AsteriaModuleConfig {

    /**
     * The condition to be applyed to filter a list of objects. Default value is <code>FilterCondition.OR</code>.
     */
    condition?: FilterCondition;

    /**
     * The list of filters to be applyed to a list of objects.
     */
    filters: Array<FilterDefinition>;
}