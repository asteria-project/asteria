import { AsteriaData } from '../AsteriaData';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.gaia.data.impl::AsteriaDataBase';

/**
 * The default implementation of the <code>AsteriaData</code> interface.
 */
export class AsteriaDataBase<T> implements AsteriaData<T> {

    /**
     * @inheritdoc
     */
    public data: T = null;
}