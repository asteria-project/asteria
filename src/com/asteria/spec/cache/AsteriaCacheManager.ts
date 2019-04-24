import { AsteriaCache } from './AsteriaCache';

/**
 * The <code>AsteriaCacheManager</code> interface defines the API that must be
 * implementaed by a cache manager in an Asteria framework.
 */
export interface AsteriaCacheManager {

    /**
     * Returns the cache object with the specified ID, or the default cache 
     * whether no ID is defined.
     * 
     * @param {string} id the ID of the cache object to retreive.
     * 
     * @returns {AsteriaCache} the cache object with the specified ID, or the  
     *                         default cache whether no ID is defined.
     */
    getCache(id?: string): AsteriaCache;
}