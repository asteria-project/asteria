import { AsteriaFilter, FilterOperator, AsteriaObject } from '../../../gaia/gaia.index';

/**
 * The <code>GreaterThanFilter</code> filter determines whether an object property value is greater than the specified
 * comparator.
 */
export class GreaterThanFilter extends AsteriaObject implements AsteriaFilter {

    /**
     * @inheritdoc
     */
    public readonly operator: FilterOperator = FilterOperator.GREATER_THAN;
    
    /**
     * Creates a new <code>GreaterThanFilter</code> instance.
     */
    constructor() {
        super('com.asteria.ouranos.filter.impl::GreaterThanFilter');
    }

    /**
     * @inheritdoc
     */
    public apply(obj: any, property: string, value: any): boolean {
        const prop: any = obj[property];
        return prop ? prop > value : false;
    }
}