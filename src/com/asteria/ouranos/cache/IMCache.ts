import { AsteriaCache, AsteriaData, AsteriaObject } from '../../gaia/gaia.index';
import { Uuid } from '../lang/Uuid';

/**
 * An <code>AsteriaCache</code> interface implementation that provides "in memory" data storage.
 */
export class IMCache extends AsteriaObject implements AsteriaCache {

    /**
     * The reference to the identifier for this cache object.
     */
    private readonly ID: string;

    /**
     * A map that stores all objects chached within this cache.
     */
    private readonly CACHED_OBJ: Map<string, any>;

    /**
     * Creates a new <code>IMCache</code> instance.
     */
    constructor() {
        super('com.asteria.ouranos.cache::IMCache');
        this.ID = Uuid.v4();
        this.CACHED_OBJ = new Map<string, any>();
    }

    /**
     * @inheritdoc
     */
    public getId(): string {
        return this.ID;
    }

    /**
     * @inheritdoc
     */
    public add(key: string, obj: AsteriaData<any>): void {
        this.CACHED_OBJ.set(key, obj);
    }

    /**
     * @inheritdoc
     */
    public get(key: string): AsteriaData<any> {
        return this.CACHED_OBJ.get(key);
    }

    /**
     * @inheritdoc
     */
    public has(key: string): boolean {
        return this.CACHED_OBJ.has(key);
    }
}