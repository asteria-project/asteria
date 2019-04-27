import { AsteriaData } from '../AsteriaData';

/**
 * The default implementation of the <code>AsteriaData</code> interface.
 */
export class AsteriaDataBase<T> implements AsteriaData<T> {

    /**
     * @inheritdoc
     */
    public data: T = null;
}