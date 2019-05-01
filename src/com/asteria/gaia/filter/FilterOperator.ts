// Class name reference:
const CLASS_NAME: string = 'com.asteria.gaia.filter::FilterOperator';

/**
 * The <code>FilterOperator</code> enum defines a list of operators that can be  used by an Asteria module to filter
 * objects.
 */
export enum FilterOperator {

    /**
     * The <code>LIKE</code> operator allows to search for a specified pattern in an object property.
     */
    LIKE = 'LIKE',

    /**
     * The <code>START_WITH</code> operator allows to search for an object property value that starts with the specified
     * pattern.
     */
    START_WITH = 'START_WITH',

    /**
     * The <code>GREATER_THAN</code> operator is used find object properties that are greater than the specified
     * operand.
     */
    GREATER_THAN = 'GREATER_THAN'
}