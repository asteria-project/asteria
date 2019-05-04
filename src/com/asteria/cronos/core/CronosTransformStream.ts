import { Transform, TransformCallback, TransformOptions } from 'stream';
import { AsteriaStream } from '../../gaia/gaia.index';

/**
 * The <code>CronosTransformStream</code> class is the base class for all transformation streams in the Cronos 
 * framework.
 */
export abstract class CronosTransformStream extends Transform implements AsteriaStream {

    /**
     * Stores the reference to the fully qualified class name for this object.
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
     * 
     * 
     * @param {any} chunk 
     * @param {string} encoding 
     * @param {TransformCallback} callback 
     */
    protected abstract transform(chunk: any, encoding: string, callback: TransformCallback): void;

    /**
     * @private
     */
    _transform(chunk: any, encoding: string, callback: TransformCallback): void {
        this.transform(chunk, encoding, callback);
    }
}