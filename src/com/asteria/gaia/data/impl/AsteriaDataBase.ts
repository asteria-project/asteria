import { AsteriaData } from '../AsteriaData';
import { AsteriaObject } from '../../lang/AsteriaObject';

/**
 * The default implementation of the <code>AsteriaData</code> interface.
 */
export class AsteriaDataBase<T> extends AsteriaObject implements AsteriaData<T> {

    /**
     * Creates a new <code>AsteriaDataBase</code> instance.
     * 
     * @param {string} className the fully qualified class name for this object.
     */
    constructor(className: string) {
        super(className || 'com.asteria.gaia.data.impl::AsteriaDataBase');
    }

    /**
     * @inheritdoc
     */
    public data: T = null;
}