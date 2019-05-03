import { ListData } from '../ListData';
import { AsteriaDataBase } from './AsteriaDataBase';

/**
 * The <code>AsteriaListData</code> class is the base implentation of the <code>AsteriaData</code> interface for all
 * list based data set.
 */
export class AsteriaListData<T> extends AsteriaDataBase<ListData<T>> {

    /**
     * Creates a new <code>AsteriaListData</code> instance.
     */
    constructor() {
        super('com.asteria.gaia.data.impl::AsteriaListData');
    }
    /**
     * @inheritdoc
     */
    data: ListData<T>;
}