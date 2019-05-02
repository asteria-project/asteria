import { AsqlTokenType } from './AsqlTokenType';

/**
 * Represents a element of the Asteria Query Lanquage.
 */
export interface AsqlToken {
    
    /**
     * The type of this AsQL token.
     */
    type: AsqlTokenType;

    /**
     * The value for this AsQL token
     */
    value: any;
}