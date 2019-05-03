/**
 * The <code>AsteriaObject</code> class is the base class for all Asteria project objects.
 */
export abstract class AsteriaObject {

    /**
     * Stores the reference to the fully qualified class name for this object.
     */
    private readonly _className: string;

    /**
     * Creates a new <code>AsteriaObject</code> instance.
     * 
     * @param {string} className the fully qualified class name for this object.
     */
    constructor(className: string) {
        this._className = className;
    }

    /**
     * Returns the reference to the fully qualified class name for this object.
     * 
     * @returns {string} the qualified class name for this object.
     */
    public getClassName(): string {
        return this._className;
    }
}