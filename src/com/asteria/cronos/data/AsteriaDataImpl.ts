import { AsteriaData } from '../../spec/data/AsteriaData';

/**
 * The default implementation of the <code>AsteriaData</code> interface.
 */
export class AsteriaDataImpl<T> implements AsteriaData<T> {

    /**
     * @inheritdoc
     */
    public data: T = null;
}