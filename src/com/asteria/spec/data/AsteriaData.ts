/**
 * The <code>AsteriaData</code> interface defines the common data set consumed
 * by Asteria modules.
 */
export interface AsteriaData<T> {

    /**
     * The set of data consumed by Asteria modules.
     */
    data: T;
}