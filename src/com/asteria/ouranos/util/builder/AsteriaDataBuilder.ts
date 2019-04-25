import { AsteriaData } from '../../../spec/data/AsteriaData';
import { AsteriaDataImpl } from '../../data/AsteriaDataImpl';

/**
 * A utility class for building <code>AsteriaData</code> objects, available as
 * a singleton.
 */
export class AsteriaDataBuilder {

    /**
     * Stores the static reference to this singleton.
     */
    private static _instance: AsteriaDataBuilder = null;

    /**
     * Creates a new <code>AsteriaDataBuilder</code> instance.
     */
    private constructor() {}

    /**
     * Returns the reference to this singleton.
     * 
     * @returns {AsteriaDataBuilder} the reference to this singleton.
     */
    public static getInstance(): AsteriaDataBuilder {
        return AsteriaDataBuilder._instance ||
               (AsteriaDataBuilder._instance = new AsteriaDataBuilder());
    }

    /**
     * Builds and returns a new <code>AsteriaData</code> instance.
     * 
     * @param {any} data the data set defined by the new 
     *                   <code>AsteriaData</code> instance. 
     * 
     * @return {AsteriaData<T>} a new <code>AsteriaData</code> instance.
     */
    public build<T>(data: any): AsteriaData<T> {
        const asteriaData: AsteriaData<T> = new AsteriaDataImpl<T>();
        asteriaData.data = data;
        return asteriaData;
    }
}