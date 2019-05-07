import { AsteriaFilter, FilterOperator, AbstractAsteriaObject, FilterOperatorNotation } from '../../../gaia/gaia.index';

/**
 * The <code>NotEqualFilter</code> filter determines whether an object property is not equal to the specified value.
 */
export class NotEqualFilter extends AbstractAsteriaObject implements AsteriaFilter {

    /**
     * @inheritdoc
     */
    public readonly operators: Array<FilterOperator|FilterOperatorNotation|string> =
        [FilterOperator.NOT_EQUAL, FilterOperatorNotation.NOT_EQUAL];
    
    /**
     * Create a new <code>NotEqualFilter</code> instance.
     */
    constructor() {
        super('com.asteria.ouranos.filter.impl::NotEqualFilter');
    }

    /**
     * @inheritdoc
     */
    public apply(obj: any, property: string, value: any): boolean {
        const prop: any = obj[property];
        return prop ? (prop !== value) : true;
    }
}
