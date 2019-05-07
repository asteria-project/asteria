/**
 * The <code>FilterOperator</code> enum defines a list of operators that can be used by an Asteria stream process to 
 * filter objects.
 */
export enum FilterOperator {

    /**
     * The <code>EQUAL</code> operator allows apply strict equality over an object property.
     */
    EQUAL = 'EQUAL',

    /**
     * The <code>NOT_EQUAL</code> operator allows apply strict inequality over an object property.
     */
    NOT_EQUAL = 'NOT_EQUAL',

    /**
     * The <code>LIKE</code> operator allows to search for a specified pattern in an object property.
     */
    LIKE = 'LIKE',

    /**
     * The <code>NOT_LIKE</code> operator allows to search wethter a specified pattern is not a part of an object 
     * property.
     */
    NOT_LIKE = 'NOT_LIKE',

    /**
     * The <code>STARTS_WITH</code> operator allows to search for an object property value that starts with the 
     * specified pattern.
     */
    STARTS_WITH = 'STARTS_WITH',

    /**
     * The <code>ENDS_WITH</code> operator allows to search for an object property value that ends with the 
     * specified pattern.
     */
    ENDS_WITH = 'ENDS_WITH',

    /**
     * The <code>GREATER_THAN</code> operator is used find object properties that are greater than the specified
     * operand.
     */
    GREATER_THAN = 'GREATER_THAN',

    /**
     * The <code>LOWER_THAN</code> operator is used find object properties that are lower than the specified operand.
     */
    LOWER_THAN = 'LOWER_THAN'
}
