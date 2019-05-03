import { AsteriaCacheManager, AsteriaCache, AsteriaObject } from '../../gaia/gaia.index';
import { IMCache } from './IMCache';

/**
 * The Ouranos implementation of the <code>AsteriaCacheManager</code> interface.
 */
export class CacheManager extends AsteriaObject implements AsteriaCacheManager {

    /**
     * Stores the static reference to this singleton.
     */
    private static _instance: AsteriaCacheManager = null;

    /**
     * A map that stores all cache objects for this cache manager.
     */
    private readonly CACHE_MAP: Map<string, AsteriaCache>;

    /**
     * Stores the reference of the default cache object for this cache manager.
     */
    private readonly DEFAULT_CACHE_ID: string;

    /**
     * Creates a new <code>CacheManager</code> instance.
     */
    private constructor() {
        super('com.asteria.ouranos.cache::CacheManager');
        this.CACHE_MAP = new Map<string, AsteriaCache>();
        const defaultCache: AsteriaCache = new IMCache();
        this.DEFAULT_CACHE_ID = defaultCache.getId();
        this.CACHE_MAP.set(this.DEFAULT_CACHE_ID, defaultCache);
    }

    /**
     * Returns the reference to this singleton.
     * 
     * @returns {AsteriaCacheManager} the reference to this singleton.
     */
    public static getInstance(): AsteriaCacheManager {
        return CacheManager._instance || (CacheManager._instance = new CacheManager());
    }

    /**
     * @inheritdoc
     */
    public getCache(id?: string): AsteriaCache {
        return this.CACHE_MAP.get(id || this.DEFAULT_CACHE_ID);
    }
}