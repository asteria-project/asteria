/**
 * The <code>FilterOperator</code> enum defines a list of operators that can be
 * used by an Asteria module to filter objects.
 */
export enum FilterOperator {

    /**
     * The <code>LIKE</code> operator is used in to search for a specified
     * pattern in an object property.
     */
    LIKE = 'LIKE',

    /**
     * The <code>START_WITH</code> operator is used in to search for a specified
     * pattern in an object property.
     */
    START_WITH = 'START_WITH'
}