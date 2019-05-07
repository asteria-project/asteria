import { AsteriaFilter, FilterOperator, AbstractAsteriaObject, FilterOperatorNotation } from '../../../gaia/gaia.index';

/**
 * The <code>EndsWithFilter</code> filter determines whether an object property string ends with the characters of a
 * specified string.
 */
export class EndsWithFilter extends AbstractAsteriaObject implements AsteriaFilter {

    /**
     * @inheritdoc
     */
    public readonly operators: Array<FilterOperator|FilterOperatorNotation|string> = [FilterOperator.ENDS_WITH];
    
    /**
     * Create a new <code>EndsWithFilter</code> instance.
     */
    constructor() {
        super('com.asteria.ouranos.filter.impl::EndsWithFilter');
    }

    /**
     * @inheritdoc
     */
    public apply(obj: any, property: string, value: any): boolean {
        const prop: any = obj[property];
        return prop ? prop.endsWith(value) : false;
    }
}
