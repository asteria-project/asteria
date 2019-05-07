import { AsteriaFilter, FilterOperator, AbstractAsteriaObject, FilterOperatorNotation } from '../../../gaia/gaia.index';

/**
 * The <code>LikeFilter</code> filter determines whether an object property string contains the characters of a
 * specified string.
 */
export class LikeFilter extends AbstractAsteriaObject implements AsteriaFilter {

    /**
     * @inheritdoc
     */
    public readonly operators: Array<FilterOperator|FilterOperatorNotation|string> = [FilterOperator.LIKE];
    
    /**
     * Create a new <code>LikeFilter</code> instance.
     */
    constructor() {
        super('com.asteria.ouranos.filter.impl::LikeFilter');
    }

    /**
     * @inheritdoc
     */
    public apply(obj: any, property: string, value: any): boolean {
        const prop: any = obj[property];
        return prop ? prop.indexOf(value) !== -1 : false;
    }
}
