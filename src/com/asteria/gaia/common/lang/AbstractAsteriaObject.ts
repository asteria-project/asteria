import { AsteriaObject } from './AsteriaObject';

/**
 * The base class for all <code>AsteriaObject</code> objects.
 */
export abstract class AbstractAsteriaObject implements AsteriaObject {

    /**
     * Stores the reference to the fully qualified class name for this object.
     */
    private readonly _className: string;

    /**
     * Create a new <code>AsteriaObject</code> instance.
     * 
     * @param {string} className the fully qualified class name for this object.
     */
    constructor(className: string) {
        this._className = className;
    }

    /**
     * @inheritdoc
     */
    public getClassName(): string {
        return this._className;
    }
}
