import { FilterOperator } from './FilterOperator';

/**
 * The <code>FilterDefinition</code> interface defines a filter that can be
 * applyed over a collection of objects in an Asteria module.
 */
export interface FilterDefinition {

    /**
     * The property on which to perform filtering.
     */
    property: string;

    /**
     * The operator for this filter.
     */
    operator: FilterOperator;

    /**
     * The value to be compared by this filter.
     */
    value: any;
}