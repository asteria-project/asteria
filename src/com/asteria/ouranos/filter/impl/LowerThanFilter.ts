import { AsteriaFilter, FilterOperator, AbstractAsteriaObject, FilterOperatorNotation } from '../../../gaia/gaia.index';

/**
 * The <code>LowerThanFilter</code> filter determines whether an object property value is lower than the specified
 * comparator.
 */
export class LowerThanFilter extends AbstractAsteriaObject implements AsteriaFilter {

    /**
     * @inheritdoc
     */
    public readonly operators: Array<FilterOperator|FilterOperatorNotation|string> = 
        [FilterOperator.LOWER_THAN, FilterOperatorNotation.LOWER_THAN];
    
    /**
     * Create a new <code>LowerThanFilter</code> instance.
     */
    constructor() {
        super('com.asteria.ouranos.filter.impl::LowerThanFilter');
    }

    /**
     * @inheritdoc
     */
    public apply(obj: any, property: string, value: any): boolean {
        const prop: any = obj[property];
        return prop ? prop < value : false;
    }
}
