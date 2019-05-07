/**
 * The <code>FilterOperatorNotation</code> enum defines a list of operators that can be used by an Asteria stream 
 * process to filter objects. Contrary to the <code>FilterOperator</code> enum, values of 
 * <code>FilterOperatorNotation</code> only represent mathematical notations.
 */
export enum FilterOperatorNotation {

    /**
     * The <code>EQUAL</code> operator represents the <code>=</code> notation.
     */
    EQUAL = '=',

    /**
     * The <code>NOT_EQUAL</code> operator represents the <code>!=</code> notation.
     */
    NOT_EQUAL = '!=',

    /**
     * The <code>GREATER_THAN</code> operator represents the <code>&gt;</code> notation.
     */
    GREATER_THAN = '>',

    /**
     * The <code>LOWER_THAN</code> operator represents the <code>&lt;</code> notation.
     */
    LOWER_THAN = '<'
}