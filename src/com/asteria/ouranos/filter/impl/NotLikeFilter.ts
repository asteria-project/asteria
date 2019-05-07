import { AsteriaFilter, FilterOperator, AbstractAsteriaObject, FilterOperatorNotation } from '../../../gaia/gaia.index';

/**
 * The <code>NotLikeFilter</code> filter determines whether an object property string does not contain the characters of
 * a specified string.
 */
export class NotLikeFilter extends AbstractAsteriaObject implements AsteriaFilter {

    /**
     * @inheritdoc
     */
    public readonly operators: Array<FilterOperator|FilterOperatorNotation|string> = [FilterOperator.NOT_LIKE];
    
    /**
     * Create a new <code>NotLikeFilter</code> instance.
     */
    constructor() {
        super('com.asteria.ouranos.filter.impl::NotLikeFilter');
    }

    /**
     * @inheritdoc
     */
    public apply(obj: any, property: string, value: any): boolean {
        const prop: any = obj[property];
        return prop ? prop.indexOf(value) === -1 : true;
    }
}
