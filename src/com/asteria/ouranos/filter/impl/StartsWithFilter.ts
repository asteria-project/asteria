import { AsteriaFilter, FilterOperator, AbstractAsteriaObject, FilterOperatorNotation } from '../../../gaia/gaia.index';

/**
 * The <code>StartsWithFilter</code> filter determines whether an object property string begins with the characters of
 * a specified string.
 */
export class StartsWithFilter extends AbstractAsteriaObject implements AsteriaFilter {

    /**
     * @inheritdoc
     */
    public readonly operators: Array<FilterOperator|FilterOperatorNotation|string> = [FilterOperator.STARTS_WITH];
    
    /**
     * Create a new <code>StartsWithFilter</code> instance.
     */
    constructor() {
        super('com.asteria.ouranos.filter.impl::StartsWithFilter');
    }

    /**
     * @inheritdoc
     */
    public apply(obj: any, property: string, value: any): boolean {
        const prop: any = obj[property];
        return prop ? prop.startsWith(value) : false;
    }
}
