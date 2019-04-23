import { AsteriaFilter } from '../../spec/filter/AsteriaFilter';
import { StartsWithFilter } from './impl/StartsWithFilter';
import { LikeFilter } from './impl/LikeFilter';

/**
 * Provides functionality to work with new <code>AsteriaFilter</code> 
 * instances through a singleton implementation.
 */
export class AsteriaFilterManager {

    /**
     * Stores the static reference to this singleton.
     */
    private static _instance: AsteriaFilterManager = null;

    /**
     * Stores all filters registered for this filter manager.
     */
    private _filterMap: Map<string, AsteriaFilter> = null;

    /**
     * Creates a new <code>AsteriaFilterManager</code> instance.
     */
    private constructor() {
        this.init();
    }

    /**
     * Returns the reference to this singleton.
     * 
     * @returns {AsteriaFilterManager} the reference to this singleton.
     */
    public static getInstance(): AsteriaFilterManager {
        return AsteriaFilterManager._instance ||
               (AsteriaFilterManager._instance = new AsteriaFilterManager());
    }

    /**
     * Initializes this object.
     */
    private init(): void {
        this._filterMap = new Map<string, AsteriaFilter>();
        this.register(new StartsWithFilter());
        this.register(new LikeFilter());
    }

    /**
     * Registers the specified filter into this manager.
     * 
     * @param {AsteriaFilter} filter the filter to register into this manager.
     */
    public register(filter: AsteriaFilter): void {
        this._filterMap.set(filter.operator, filter);
    }

    /**
     * Returns the filter associated with the specified operator.
     * 
     * @param {string} operator the operation associated with the filter to get.
     * 
     * @param {AsteriaFilter} the filter associated with the specified operator.
     */
    public getFilter(operator: string): AsteriaFilter {
        return this._filterMap.get(operator);
    }
}