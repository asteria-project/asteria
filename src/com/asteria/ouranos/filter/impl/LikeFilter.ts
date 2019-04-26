import { AsteriaFilter } from '../../../spec/filter/AsteriaFilter';
import { FilterOperator } from '../../../spec/filter/FilterOperator';

/**
 * The <code>LikeFilter</code> filter determines whether an object property string contains the characters of a
 * specified string.
 */
export class LikeFilter implements AsteriaFilter {

    /**
     * @inheritdoc
     */
    public readonly operator: string = FilterOperator.LIKE;
    
    /**
     * @inheritdoc
     */
    public apply(obj: any, property: string, value: any): boolean {
        return obj && obj[property] ? obj[property].indexOf(value) !== -1 : false;
    }
}