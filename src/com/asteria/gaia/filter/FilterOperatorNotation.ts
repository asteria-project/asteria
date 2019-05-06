/**
 * The <code>FilterOperatorNotation</code> enum defines a list of operators that can be used by an Asteria stream 
 * process to filter objects. Contrary to the <code>FilterOperator</code> enum, values of 
 * <code>FilterOperatorNotation</code> only represent mathematical notations.
 */
export enum FilterOperatorNotation {

    /**
     * The <code>LIKE</code> operator represents the <code>=</code> notation.
     */
    LIKE = '=',

    /**
     * The <code>GREATER_THAN</code> operator represents the <code>&gt;</code> notation.
     */
    GREATER_THAN = '>'
}