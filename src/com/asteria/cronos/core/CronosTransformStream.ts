import { Transform, TransformCallback, TransformOptions } from 'stream';
import { AsteriaStream, StreamProcessConfig } from '../../gaia/gaia.index';

/**
 * The <code>CronosTransformStream</code> class is the base class for all transformation streams in the Cronos 
 * framework.
 */
export abstract class CronosTransformStream extends Transform implements AsteriaStream {

    /**
     * Store the reference to the fully qualified class name for this object.
     */
    private readonly _className: string;

    /**
     * Create a new <code>AsteriaObject</code> instance.
     * 
     * @param {string} className the fully qualified class name for this object.
     * @param {TransformOptions} opts the list of options for this stream.
     */
    protected constructor(className: string, opts?: TransformOptions) {
        super(opts);
        this._className = className;
    }

    /**
     * @inheritdoc
     */
    public getClassName(): string {
        return this._className;
    }

    /**
     * @inheritdoc
     */
    public abstract init(config: StreamProcessConfig): void;
}