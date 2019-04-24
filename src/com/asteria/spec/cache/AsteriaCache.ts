import { AsteriaData } from '../data/AsteriaData';

/**
 * The <code>AsteriaCache</code> interface represents a cache object of any
 * Asteria framework.
 */
export interface AsteriaCache {

    /**
     * Returns the ID for this cache.
     * 
     * @returns {string} the ID for this cache.
     */
    getId(): string;

    /**
     * Adds the specified object to this cache.
     *
     * @param {string} key the string used to retreive the object added to this
     *                     cache.
     * @param {AsteriaData<T>} obj the object to add to this cache.
     */
    add<T>(key: string, obj: AsteriaData<T>): void;
    
    /**
     * Returns the object associated with the specified key.
     *
     * @param {string} key the key associated with the object to get.
     * 
     * @returns {AsteriaData<T>} the object associated with the specified key.
     */
    get<T>(key: string): AsteriaData<T>;
}