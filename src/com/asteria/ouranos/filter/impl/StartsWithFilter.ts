import { AsteriaFilter, FilterOperator, AsteriaObject } from '../../../gaia/gaia.index';

/**
 * The <code>StartsWithFilter</code> filter determines whether an object property string begins with the characters of
 * a specified string.
 */
export class StartsWithFilter extends AsteriaObject implements AsteriaFilter {

    /**
     * @inheritdoc
     */
    public readonly operator: FilterOperator = FilterOperator.START_WITH;
    
    /**
     * Creates a new <code>LikeFilter</code> instance.
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