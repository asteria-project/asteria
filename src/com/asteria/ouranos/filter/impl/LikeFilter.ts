import { AsteriaFilter, FilterOperator } from '../../../gaia/gaia.index';

/**
 * The <code>LikeFilter</code> filter determines whether an object property string contains the characters of a
 * specified string.
 */
export class LikeFilter implements AsteriaFilter {

    /**
     * @inheritdoc
     */
    public readonly operator: FilterOperator = FilterOperator.LIKE;
    
    /**
     * @inheritdoc
     */
    public apply(obj: any, property: string, value: any): boolean {
        const prop: any = obj[property];
        return prop ? prop.indexOf(value) !== -1 : false;
    }
}