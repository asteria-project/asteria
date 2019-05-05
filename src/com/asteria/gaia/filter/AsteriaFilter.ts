import { FilterOperator } from './FilterOperator';

/**
 * The <code>AsteriaFilter</code> interface provides the minimum set of APIs that you must implement to create Asteria
 * filter functions.
 */
export interface AsteriaFilter {

    /**
     * The reference to the operator associated with this filter.
     */
    operator: FilterOperator;

    /**
     * Return a boolean that indicates whether the specified object matches this filter (<code>true</code>), or not
     * (<code>false</code>).
     * 
     * @param {any} obj the object to check.
     * @param {string} property the property on which to apply the filter.
     * @param {any} value the value used for comparaison.
     * 
     * @return {boolean} <code>true</code>  whether the specified object matches this filter; <code>false</code>
     *                   otherwise.
     */
    apply(obj: any, property: string, value: any): boolean;
}