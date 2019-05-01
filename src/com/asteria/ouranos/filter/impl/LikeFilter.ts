import { AsteriaFilter, FilterOperator } from '../../../gaia/gaia.index';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.ouranos.filter.impl::LikeFilter';

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