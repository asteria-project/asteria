import { AsteriaFilter, AbstractAsteriaObject } from '../../gaia/gaia.index';
import { StartsWithFilter } from './impl/StartsWithFilter';
import { LikeFilter } from './impl/LikeFilter';
import { GreaterThanFilter } from './impl/GreaterThanFilter';

/**
 * Provides functionality to work with new <code>AsteriaFilter</code> instances through a singleton implementation.
 */
export class OuranosFilterManager extends AbstractAsteriaObject {

    /**
     * The static reference to this singleton.
     */
    private static _instance: OuranosFilterManager = null;

    /**
     * The collection of filters registered for this filter manager.
     */
    private _filterMap: Map<string, AsteriaFilter> = null;

    /**
     * Create a new <code>OuranosFilterManager</code> instance.
     */
    private constructor() {
        super('com.asteria.ouranos.filter::OuranosFilterManager');
        this.init();
    }

    /**
     * Returns the reference to this singleton.
     * 
     * @returns {OuranosFilterManager} the reference to this singleton.
     */
    public static getInstance(): OuranosFilterManager {
        return OuranosFilterManager._instance || (OuranosFilterManager._instance = new OuranosFilterManager());
    }

    /**
     * Initialize this object.
     */
    private init(): void {
        this._filterMap = new Map<string, AsteriaFilter>();
        this.register(new StartsWithFilter());
        this.register(new LikeFilter());
        this.register(new GreaterThanFilter());
    }

    /**
     * Register the specified filter into this manager.
     * 
     * @param {AsteriaFilter} filter the filter to register into this manager.
     */
    public register(filter: AsteriaFilter): void {
        this._filterMap.set(filter.operator, filter);
    }

    /**
     * Return the filter associated with the specified operator.
     * 
     * @param {string} operator the operation associated with the filter to get.
     * 
     * @param {AsteriaFilter} the filter associated with the specified operator.
     */
    public getFilter(operator: string): AsteriaFilter {
        return this._filterMap.get(operator);
    }
}