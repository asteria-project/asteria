import { AsteriaModuleConfig } from './AsteriaModuleConfig';
import { FilterDefinition } from '../filter/FilterDefinition';
import { FilterCondition } from '../filter/FilterCondition';

/**
 * The <code>FilterListModuleConfig</code> interface defines the common
 * functionality implemented by context configuration objects applyed to
 * <code>FilterListModule</code> modules.
 */
export interface FilterListModuleConfig extends AsteriaModuleConfig {

    /**
     * The condition to be applyed to filter a list of objects. Default value is
     * <code>FilterCondition.OR</code>.
     */
    condition?: FilterCondition;

    /**
     * The list of filters to be applyed to a list of objects.
     */
    filters: Array<FilterDefinition>;
}