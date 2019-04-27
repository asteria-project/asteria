import { ListData } from '../ListData';

/**
 * The <code>AsteriaList</code> class is the base implentation of the <code>ListData</code> interface.
 */
export class AsteriaList<T> extends Array<T> implements ListData<T> {}