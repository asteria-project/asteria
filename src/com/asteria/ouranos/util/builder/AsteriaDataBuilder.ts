import { AsteriaData } from '../../../gaia/data/AsteriaData';
import { AsteriaDataBase } from '../../../gaia/data/impl/AsteriaDataBase';
import { UrlData } from '../../../gaia/data/UrlData';
import { StringData } from '../../../gaia/data/StringData';
import { ListData } from '../../../gaia/gaia.index';

/**
 * A utility class for building <code>AsteriaData</code> objects, available as a singleton.
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
        return AsteriaDataBuilder._instance || (AsteriaDataBuilder._instance = new AsteriaDataBuilder());
    }

    /**
     * Builds and returns a new <code>AsteriaData</code> instance.
     * 
     * @param {T} data the data set defined by the new <code>AsteriaData</code> instance. 
     * 
     * @return {AsteriaData<T>} a new <code>AsteriaData</code> instance.
     */
    public build<T>(data: T): AsteriaData<T> {
        const asteriaData: AsteriaData<T> = new AsteriaDataBase<T>();
        asteriaData.data = data;
        return asteriaData;
    }

    public buildStringData(data: any): AsteriaData<StringData> {
        const asteriaData: AsteriaData<StringData> = new AsteriaDataBase<StringData>();
        asteriaData.data = String(data);
        return asteriaData;
    }

    public buildUrlData(data: any): AsteriaData<UrlData> {
        const asteriaData: AsteriaData<UrlData> = new AsteriaDataBase<UrlData>();
        asteriaData.data = String(data);
        return asteriaData;
    }

    public buildListData(data: any): AsteriaData<ListData<any>> {
        const asteriaData: AsteriaData<ListData<any>> = new AsteriaDataBase<ListData<any>>();
        asteriaData.data = data;
        return asteriaData;
    }
    
}