import { AsteriaFilter, FilterOperator } from '../../../gaia/gaia.index';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.ouranos.filter.impl::GreaterThanFilter';

/**
 * The <code>GreaterThanFilter</code> filter determines whether an object property value is greater than the specified
 * comparator.
 */
export class GreaterThanFilter implements AsteriaFilter {

    /**
     * @inheritdoc
     */
    public readonly operator: FilterOperator = FilterOperator.GREATER_THAN;
    
    /**
     * @inheritdoc
     */
    public apply(obj: any, property: string, value: any): boolean {
        const prop: any = obj[property];
        return prop ? prop > value : false;
    }
}