import { AsteriaFilter, FilterOperator } from '../../../gaia/gaia.index';

/**
 * The <code>StartsWithFilter</code> filter determines whether an object property string begins with the characters of
 * a specified string.
 */
export class StartsWithFilter implements AsteriaFilter {

    /**
     * @inheritdoc
     */
    public readonly operator: FilterOperator = FilterOperator.START_WITH;
    
    /**
     * @inheritdoc
     */
    public apply(obj: any, property: string, value: any): boolean {
        const prop: any = obj[property];
        return prop ? prop.startsWith(value) : false;
    }
}