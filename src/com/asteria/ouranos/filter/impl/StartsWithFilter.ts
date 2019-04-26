import { AsteriaFilter } from '../../../spec/filter/AsteriaFilter';
import { FilterOperator } from '../../../spec/filter/FilterOperator';

/**
 * The <code>StartsWithFilter</code> filter determines whether an object property string begins with the characters of
 * a specified string.
 */
export class StartsWithFilter implements AsteriaFilter {

    /**
     * @inheritdoc
     */
    public readonly operator: string = FilterOperator.START_WITH;
    
    /**
     * @inheritdoc
     */
    public apply(obj: any, property: string, value: any): boolean {
        return obj && obj[property] ? obj[property].startsWith(value) : false;
    }
}