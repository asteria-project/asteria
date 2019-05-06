import { AsteriaFilter, FilterOperator, AbstractAsteriaObject, FilterOperatorNotation } from '../../../gaia/gaia.index';

/**
 * The <code>EqualFilter</code> filter determines whether an object property is equal to the specified value.
 */
export class EqualFilter extends AbstractAsteriaObject implements AsteriaFilter {

    /**
     * @inheritdoc
     */
    public readonly operators: Array<FilterOperator|FilterOperatorNotation|string> =
        [FilterOperator.EQUAL, FilterOperatorNotation.EQUAL];
    
    /**
     * Create a new <code>EqualFilter</code> instance.
     */
    constructor() {
        super('com.asteria.ouranos.filter.impl::EqualFilter');
    }

    /**
     * @inheritdoc
     */
    public apply(obj: any, property: string, value: any): boolean {
        const prop: any = obj[property];
        return prop ? (prop === value) : false;
    }
}