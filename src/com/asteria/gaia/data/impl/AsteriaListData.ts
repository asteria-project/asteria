import { ListData } from '../ListData';
import { AsteriaDataBase } from './AsteriaDataBase';

// Class name reference:
const CLASS_NAME: string = 'com.asteria.gaia.data.impl::AsteriaListData';

/**
 * The <code>AsteriaListData</code> class is the base implentation of the <code>AsteriaData</code> interface for all
 * list based data set.
 */
export class AsteriaListData<T> extends AsteriaDataBase<ListData<T>> {

    /**
     * @inheritdoc
     */
    data: ListData<T>;
}