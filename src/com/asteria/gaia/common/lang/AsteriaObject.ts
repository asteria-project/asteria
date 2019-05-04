/**
 * The <code>AsteriaObject</code> interface defines the minimum set of APIs you must implement to create Asteria project
 * objects.
 */
export interface AsteriaObject {

    /**
     * Return the reference to the fully qualified class name for this object.
     * 
     * @returns {string} the qualified class name for this object.
     */
    getClassName(): string;
}
