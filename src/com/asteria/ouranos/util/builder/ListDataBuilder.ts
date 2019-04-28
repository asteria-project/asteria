import { ListData } from '../../../gaia/data/ListData';

/**
 * A utility class for building <code>ListData</code> objects, available as a singleton.
 */
export class ListDataBuilder {

    /**
     * Stores the static reference to this singleton.
     */
    private static _instance: ListDataBuilder = null;

    /**
     * Creates a new <code>ListDataBuilder</code> instance.
     */
    private constructor() {}

    /**
     * Returns the reference to this singleton.
     * 
     * @returns {ListDataBuilder} the reference to this singleton.
     */
    public static getInstance(): ListDataBuilder {
        return ListDataBuilder._instance || (ListDataBuilder._instance = new ListDataBuilder());
    }

    /**
     * Builds and returns a new <code>ListData</code> object.
     * 
     * @return {ListData<T>} a new <code>ListData</code> object.
     */
    public build<T>(): ListData<T> {
        return new Array<T>();
    }
}